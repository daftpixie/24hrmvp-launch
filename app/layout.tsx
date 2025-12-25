import type { Metadata, Viewport } from 'next';
import { Orbitron, Space_Grotesk, DM_Sans, Space_Mono } from 'next/font/google';
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

// Metadata
export const metadata: Metadata = {
  title: '24HRMVP | The First MVP DAO - Community Ideas to Products in 24 Hours',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://launch.24hrmvp.xyz',
    siteName: '24HRMVP',
    title: '24HRMVP | The First MVP DAO',
    description: 'Where community ideas become production-ready products in 24 hours. Join 500 beta testers shaping the future.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '24HRMVP - The First MVP DAO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@24hrmvp',
    creator: '@24hrmvp',
    title: '24HRMVP | The First MVP DAO',
    description: 'Where community ideas become production-ready products in 24 hours.',
    images: ['/og-image.png'],
  },
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  // Farcaster Mini App Frame Metadata
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: 'https://launch.24hrmvp.xyz/og-image.png',
      button: {
        title: '🚀 Join Beta',
        action: {
          type: 'launch_frame',
          name: '24HRMVP Launch',
          url: 'https://launch.24hrmvp.xyz',
          splashImageUrl: 'https://launch.24hrmvp.xyz/splash.png',
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
        
        {/* Plausible Analytics (privacy-first) */}
        <script 
          defer 
          data-domain="launch.24hrmvp.xyz" 
          src="https://plausible.io/js/script.js"
        />
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
