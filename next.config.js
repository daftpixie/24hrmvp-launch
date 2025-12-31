/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output configuration for Railway deployment
  output: 'standalone',
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize images
  images: {
    domains: [
      '24hrmvp.xyz',
      'punks.24hrmvp.xyz',
      'api.24hrmvp.xyz',
      'placehold.co',
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Cache static assets
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirects for legacy URLs
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.launch.24hrmvp.xyz',
          },
        ],
        destination: 'https://launch.24hrmvp.xyz/:path*',
        permanent: true,
      },
    ];
  },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Experimental features
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.24hrmvp.xyz',
    NEXT_PUBLIC_PUNKS_URL: process.env.NEXT_PUBLIC_PUNKS_URL || 'https://punks.24hrmvp.xyz',
    NEXT_PUBLIC_MAIN_URL: process.env.NEXT_PUBLIC_MAIN_URL || 'https://24hrmvp.xyz',
    NEXT_PUBLIC_LAUNCH_DATE: process.env.NEXT_PUBLIC_LAUNCH_DATE || '2025-01-201T10:00:00Z',
    // Google Sheets webhook for beta signups
    NEXT_PUBLIC_GSHEET_WEBHOOK_URL: process.env.NEXT_PUBLIC_GSHEET_WEBHOOK_URL || '',
  },
};

module.exports = nextConfig;
