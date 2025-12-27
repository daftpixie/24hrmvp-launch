import type { Metadata, Viewport } from 'next';
import { Orbitron, Space_Grotesk, DM_Sans, Space_Mono } from 'next/font/google';
import { PlausibleMultiDomain } from '@/components/analytics/PlausibleProvider';
import './globals.css';

// Font Configuration
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
  weight: ['400', '700'],
});

// Base URL for absolute paths
const BASE_URL = 'https://launch.24hrmvp.xyz';

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: '24HRMVP | The MVP DAO - Community Ideas to Products in 24 Hours',
  description: 'Join the first community-governed platform where software ideas become production-ready MVPs in 24 hours. Vote on ideas, earn HOPE tokens, and shape the future of building.',
  keywords: [
    '24HRMVP',
    'MVP DAO',
    'community building',
    'web3',
    'Farcaster',
    'Dogecoin',
    'NFT governance',
    'HOPE token',
    'decentralized',
    'open source',
  ],
  authors: [{ name: '24HRMVP Team' }],
  creator: 'Matty Adams',
  publisher: '24HRMVP',
  
  // OpenGraph - Primary social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: '24HRMVP',
    title: '24HRMVP | The 24HRMVP DAO',
    description: 'Where community ideas become production-ready products in 24 hours. Join beta testers shaping the future.',
    images: [
      {
        url: '/og-image.png', // Ensure file in /public is named "og-image.png"
        width: 1200,
        height: 630,
        alt: '24HRMVP Launch - The 24HRMVP DAO',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter/X Card
  twitter: {
    card: 'summary_large_image',
    site: '@24hrmvp',
    creator: '@24hrmvp',
    title: '24HRMVP | The 24HRMVP DAO',
    description: 'Where community ideas become production-ready products in 24 hours.',
    images: [
      {
        url: '/twitter-card.png', // Ensure file in /public is named "twitter-card.png"
        width: 1200,
        height: 628,
        alt: '24HRMVP Launch - Join Beta Testers',
      },
      // Fallback/Secondary image if large fails or for other contexts
      {
        url: '/twitter-summary.png', 
        width: 500, // Assuming square/smaller format based on filename
        height: 500,
        alt: '24HRMVP Logo',
      },
    ],
  },
  
  // PWA / Mobile App Capabilities
  appleWebApp: {
    capable: true,
    title: '24HRMVP',
    statusBarStyle: 'black-translucent',
    startupImage: [
      {
        url: '/splash.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },

  // Search engine directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Icons & Favicons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  
  // Web App Manifest
  manifest: '/site.webmanifest',
  
  // Farcaster & Custom Platform Metadata
  other: {
    // Farcaster Frame v2
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: `${BASE_URL}/farcaster-frame.png`,
      button: {
        title: '🚀 Join Beta',
        action: {
          type: 'launch_frame',
          name: '24HRMVP Launch',
          url: BASE_URL,
          splashImageUrl: `${BASE_URL}/splash.png`,
          splashBackgroundColor: '#0B192A',
        },
      },
    }),
    // REMOVED DUPLICATE og:* tags here to avoid conflicts with openGraph object above
    
    // Discord-specific (uses OG but explicitly defined here for safety)
    'discord:image': `${BASE_URL}/discord-embed.png`,
    // LinkedIn
    'linkedin:image': `${BASE_URL}/linkedin-share.png`,
  },
};

export const viewport: Viewport = {
  themeColor: '#0B192A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`
        ${orbitron.variable} 
        ${spaceGrotesk.variable} 
        ${dmSans.variable} 
        ${spaceMono.variable}
      `}
    >
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://auth.farcaster.xyz" />
        {/* Preconnect to self-hosted analytics */}
        <link rel="preconnect" href="https://analytics.24hrmvp.xyz" />
        
        {/* Plausible Analytics (self-hosted, privacy-first) */}
        {/* Tracks to both launch.24hrmvp.xyz and all.24hrmvp.xyz aggregate dashboard */}
        <PlausibleMultiDomain domains={['launch.24hrmvp.xyz', 'all.24hrmvp.xyz']} />
      </head>
      <body 
        className={`${dmSans.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
