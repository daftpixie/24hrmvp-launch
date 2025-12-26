'use client';

/**
 * 24HRMVP Launch Page - Analytics Hook
 * 
 * Provides type-safe event tracking for the launch page.
 * Uses Plausible Analytics self-hosted at analytics.24hrmvp.xyz
 */

import { useCallback, useEffect, useRef } from 'react';
import { usePlausible } from 'next-plausible';
import type { 
  LaunchPageEvent, 
  PropsForEvent,
  CTAClickProps,
  ProductClickProps,
  SocialLinkProps,
  ScrollDepthProps,
  SectionViewProps,
  ModalProps,
  BetaSignupProps
} from '@/types/analytics';

// ============================================================================
// MAIN HOOK
// ============================================================================

/**
 * Analytics hook for the 24HRMVP launch page
 * 
 * @example
 * ```tsx
 * const { trackEvent, trackCTA, trackScrollDepth } = useAnalytics();
 * 
 * // Track a custom event
 * trackEvent('Beta Signup Completed', { hasDiscord: true });
 * 
 * // Track CTA click
 * trackCTA('Join Beta', 'hero', '#beta');
 * ```
 */
export function useAnalytics() {
  const plausible = usePlausible();
  
  // Track scroll depth milestones (only fire once per milestone)
  const scrollMilestones = useRef<Set<number>>(new Set());

  /**
   * Track any event with type-safe props
   */
  const trackEvent = useCallback(<E extends LaunchPageEvent>(
    eventName: E,
    props?: PropsForEvent<E>
  ) => {
    plausible(eventName, { props: props as Record<string, unknown> });
  }, [plausible]);

  /**
   * Track CTA button clicks
   */
  const trackCTA = useCallback((
    button: string,
    location: CTAClickProps['location'],
    destination?: string
  ) => {
    trackEvent('CTA Clicked', { button, location, destination });
  }, [trackEvent]);

  /**
   * Track product card interactions
   */
  const trackProduct = useCallback((
    product: ProductClickProps['product'],
    name: string,
    url: string,
    action: 'card' | 'explore' = 'card'
  ) => {
    const eventName = action === 'explore' ? 'Product Explore Clicked' : 'Product Card Clicked';
    trackEvent(eventName, { product, name, url });
  }, [trackEvent]);

  /**
   * Track social link clicks
   */
  const trackSocial = useCallback((
    platform: SocialLinkProps['platform'],
    url: string
  ) => {
    trackEvent('Social Link Clicked', { platform, url });
  }, [trackEvent]);

  /**
   * Track scroll depth milestones
   */
  const trackScrollDepth = useCallback((depth: ScrollDepthProps['depth']) => {
    if (!scrollMilestones.current.has(depth)) {
      scrollMilestones.current.add(depth);
      trackEvent('Scroll Depth', { depth });
    }
  }, [trackEvent]);

  /**
   * Track section views (for intersection observer)
   */
  const trackSectionView = useCallback((section: SectionViewProps['section']) => {
    trackEvent('Section Viewed', { section });
  }, [trackEvent]);

  /**
   * Track modal interactions
   */
  const trackModal = useCallback((
    modal: ModalProps['modal'],
    action: 'open' | 'close'
  ) => {
    trackEvent(action === 'open' ? 'Modal Opened' : 'Modal Closed', { modal });
  }, [trackEvent]);

  /**
   * Track beta signup flow
   */
  const trackBetaSignup = useCallback((
    stage: 'started' | 'completed' | 'error',
    props?: BetaSignupProps
  ) => {
    const eventMap = {
      started: 'Beta Signup Started',
      completed: 'Beta Signup Completed',
      error: 'Beta Signup Error'
    } as const;
    trackEvent(eventMap[stage], props);
  }, [trackEvent]);

  return {
    trackEvent,
    trackCTA,
    trackProduct,
    trackSocial,
    trackScrollDepth,
    trackSectionView,
    trackModal,
    trackBetaSignup,
  };
}

// ============================================================================
// SCROLL DEPTH TRACKER HOOK
// ============================================================================

/**
 * Hook that automatically tracks scroll depth milestones
 * 
 * @example
 * ```tsx
 * // In your page component
 * useScrollDepthTracker();
 * ```
 */
export function useScrollDepthTracker() {
  const { trackScrollDepth } = useAnalytics();
  const tracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (window.scrollY / scrollHeight) * 100;

      const milestones = [25, 50, 75, 100] as const;
      
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !tracked.current.has(milestone)) {
          tracked.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [trackScrollDepth]);
}

// ============================================================================
// SECTION OBSERVER HOOK
// ============================================================================

/**
 * Hook that tracks when sections come into view
 * 
 * @param sectionId - The section identifier to track
 * @param ref - React ref attached to the section element
 * 
 * @example
 * ```tsx
 * const heroRef = useRef<HTMLElement>(null);
 * useSectionObserver('hero', heroRef);
 * ```
 */
export function useSectionObserver(
  sectionId: SectionViewProps['section'],
  ref: React.RefObject<HTMLElement>
) {
  const { trackSectionView } = useAnalytics();
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked.current) {
          hasTracked.current = true;
          trackSectionView(sectionId);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, sectionId, trackSectionView]);
}

export default useAnalytics;
