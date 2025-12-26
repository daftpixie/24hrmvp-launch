/**
 * 24HRMVP Launch Page - Analytics Event Types
 * 
 * Type-safe definitions for all trackable events on the launch page.
 * Used with Plausible Analytics self-hosted at analytics.24hrmvp.xyz
 */

// ============================================================================
// EVENT DEFINITIONS
// ============================================================================

/**
 * All trackable events on the launch page
 */
export type LaunchPageEvent =
  // Beta Signup Events
  | 'Beta Signup Started'
  | 'Beta Signup Completed'
  | 'Beta Signup Error'
  
  // CTA Interactions
  | 'CTA Clicked'
  | 'Nav CTA Clicked'
  | 'Hero CTA Clicked'
  
  // Product Exploration
  | 'Product Card Clicked'
  | 'Product Explore Clicked'
  
  // Social & External Links
  | 'Social Link Clicked'
  | 'External Link Clicked'
  
  // Content Engagement
  | 'Scroll Depth'
  | 'Section Viewed'
  | 'Modal Opened'
  | 'Modal Closed'
  
  // Navigation
  | 'Anchor Navigation';

// ============================================================================
// EVENT PROPERTIES
// ============================================================================

/**
 * Properties for CTA click events
 */
export interface CTAClickProps {
  /** Button text or identifier */
  button: string;
  /** Location on page */
  location: 'nav' | 'hero' | 'products' | 'beta' | 'footer';
  /** Destination URL if applicable */
  destination?: string;
}

/**
 * Properties for product interaction events
 */
export interface ProductClickProps {
  /** Product identifier */
  product: 'platform' | 'wallet' | 'nft';
  /** Product display name */
  name: string;
  /** Destination URL */
  url: string;
}

/**
 * Properties for social link clicks
 */
export interface SocialLinkProps {
  /** Platform name */
  platform: 'twitter' | 'github' | 'farcaster' | 'discord' | 'telegram';
  /** Full URL */
  url: string;
}

/**
 * Properties for scroll depth tracking
 */
export interface ScrollDepthProps {
  /** Percentage milestone reached */
  depth: 25 | 50 | 75 | 100;
}

/**
 * Properties for section view tracking
 */
export interface SectionViewProps {
  /** Section identifier */
  section: 'hero' | 'products' | 'beta' | 'roadmap' | 'tech' | 'footer';
}

/**
 * Properties for modal events
 */
export interface ModalProps {
  /** Modal identifier */
  modal: 'privacy' | 'terms';
}

/**
 * Properties for beta signup events
 */
export interface BetaSignupProps {
  /** Whether Discord handle was provided */
  hasDiscord?: boolean;
  /** Error message if applicable */
  error?: string;
}

// ============================================================================
// EVENT PROPERTY MAPPING
// ============================================================================

/**
 * Maps event names to their property types for type safety
 */
export interface LaunchEventPropsMap {
  'Beta Signup Started': undefined;
  'Beta Signup Completed': BetaSignupProps;
  'Beta Signup Error': BetaSignupProps;
  'CTA Clicked': CTAClickProps;
  'Nav CTA Clicked': CTAClickProps;
  'Hero CTA Clicked': CTAClickProps;
  'Product Card Clicked': ProductClickProps;
  'Product Explore Clicked': ProductClickProps;
  'Social Link Clicked': SocialLinkProps;
  'External Link Clicked': { url: string; text?: string };
  'Scroll Depth': ScrollDepthProps;
  'Section Viewed': SectionViewProps;
  'Modal Opened': ModalProps;
  'Modal Closed': ModalProps;
  'Anchor Navigation': { target: string };
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Helper type for getting props for a specific event
 */
export type PropsForEvent<E extends LaunchPageEvent> = 
  E extends keyof LaunchEventPropsMap 
    ? LaunchEventPropsMap[E] 
    : Record<string, string | number | boolean>;
