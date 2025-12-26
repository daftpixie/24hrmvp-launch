/**
 * 24HRMVP Launch Page - Plausible Analytics Provider
 * 
 * Pre-configured wrapper for self-hosted Plausible Analytics.
 * Tracks to both launch.24hrmvp.xyz and the aggregate all.24hrmvp.xyz dashboard.
 */

import PlausibleProvider from 'next-plausible';

// ============================================================================
// CONFIGURATION
// ============================================================================

const PLAUSIBLE_CONFIG = {
  // Primary domain for this site
  domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'launch.24hrmvp.xyz',
  
  // Self-hosted Plausible instance
  customDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || 'https://analytics.24hrmvp.xyz',
  
  // Multi-domain tracking (also track to aggregate dashboard)
  trackLocalhost: false,
  
  // Track outbound link clicks automatically
  trackOutboundLinks: true,
  
  // Track file downloads automatically
  trackFileDownloads: true,
  
  // Only track in production
  enabled: process.env.NODE_ENV === 'production',
};

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Single-domain Plausible Analytics provider
 * 
 * Use this in layout.tsx for standard tracking to launch.24hrmvp.xyz
 */
export function PlausibleAnalytics() {
  return (
    <PlausibleProvider
      domain={PLAUSIBLE_CONFIG.domain}
      customDomain={PLAUSIBLE_CONFIG.customDomain}
      selfHosted={true}
      trackOutboundLinks={PLAUSIBLE_CONFIG.trackOutboundLinks}
      trackFileDownloads={PLAUSIBLE_CONFIG.trackFileDownloads}
      enabled={PLAUSIBLE_CONFIG.enabled}
    />
  );
}

/**
 * Multi-domain Plausible Analytics provider
 * 
 * Tracks to both the site-specific dashboard AND the aggregate dashboard.
 * Use this to see combined traffic across all 24HRMVP properties.
 * 
 * @example
 * ```tsx
 * // In layout.tsx <head>
 * <PlausibleMultiDomain domains={['launch.24hrmvp.xyz', 'all.24hrmvp.xyz']} />
 * ```
 */
export function PlausibleMultiDomain({ 
  domains = ['launch.24hrmvp.xyz', 'all.24hrmvp.xyz'] 
}: { 
  domains?: string[] 
}) {
  // Join domains with comma for multi-domain tracking
  const multiDomain = domains.join(',');
  
  return (
    <PlausibleProvider
      domain={multiDomain}
      customDomain={PLAUSIBLE_CONFIG.customDomain}
      selfHosted={true}
      trackOutboundLinks={PLAUSIBLE_CONFIG.trackOutboundLinks}
      trackFileDownloads={PLAUSIBLE_CONFIG.trackFileDownloads}
      enabled={PLAUSIBLE_CONFIG.enabled}
    />
  );
}

/**
 * Development-enabled Plausible provider (for testing)
 * 
 * ⚠️ Only use this for testing - will inflate production metrics!
 */
export function PlausibleDev() {
  return (
    <PlausibleProvider
      domain={PLAUSIBLE_CONFIG.domain}
      customDomain={PLAUSIBLE_CONFIG.customDomain}
      selfHosted={true}
      trackOutboundLinks={true}
      trackFileDownloads={true}
      enabled={true} // Force enabled even in dev
    />
  );
}

export default PlausibleAnalytics;
