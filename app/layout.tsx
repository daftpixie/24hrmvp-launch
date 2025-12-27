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

// Base URL for absolute paths - CRITICAL for social sharing
const BASE_URL = 'https://launch.24hrmvp.xyz';

// Metadata
export const metadata: Metadata = {
  // CRITICAL: metadataBase converts relative URLs to absolute
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
  
  // OpenGraph - Primary social sharing (Facebook, LinkedIn, Discord)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: '24HRMVP',
    title: '24HRMVP | The MVP DAO',
    description: 'Where community ideas become production-ready products in 24 hours. Join beta testers shaping the future.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        secureUrl: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: '24HRMVP Launch - The MVP DAO',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter/X Card
  twitter: {
    card: 'summary_large_image',
    site: '@24hrmvp',
    creator: '@24hrmvp',
    title: '24HRMVP | The MVP DAO',
    description: 'Where community ideas become production-ready products in 24 hours.',
    images: {
      url: `${BASE_URL}/twitter-card.png`,
      alt: '24HRMVP Launch - Join Beta Testers',
    },
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
  
  // Icons & Favicons - Using only files that exist
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico', // Fallback until you add apple-touch-icon.png
  },
  
  // Farcaster Mini App Frame Metadata
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
