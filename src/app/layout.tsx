import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#07070b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ushort.link';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'uShort — World\'s Fastest 3D URL Shortener & Telemetry Engine',
    template: '%s | uShort',
  },
  description:
    'Free, ultra-fast 3D URL Shortener powered by Redis sub-50ms edge caching, Base62 NanoID keys, and real-time glassmorphic telemetry. Shorten, customize, and analyze links instantly.',
  keywords: [
    'URL Shortener',
    'Free URL Shortener',
    'Fastest Link Shortener',
    'Custom URL Shortener',
    'Link Management',
    'Real-time Analytics',
    'Sub-50ms Redirect',
    'Three.js 3D Web App',
    'uShort',
    'NanoID Shortener',
  ],
  authors: [{ name: 'uShort Team', url: SITE_URL }],
  creator: 'uShort Creative Engineering',
  publisher: 'uShort',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'uShort — Next-Gen 3D URL Shortener & Telemetry Engine',
    description:
      'Transform lengthy links into dimensional portals with sub-50ms redirection and real-time analytics.',
    siteName: 'uShort',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'uShort 3D URL Shortener & Analytics Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'uShort — Next-Gen 3D URL Shortener',
    description:
      'Sub-50ms Redis edge resolution, collision-free Base62 keys, and fluid physics interactions.',
    creator: '@ushort_link',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'uShort',
    url: SITE_URL,
    description:
      'High-performance 3D URL Shortener with sub-50ms Redis edge redirection, Base62 keys, and real-time telemetry.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Sub-50ms global redirection',
      'Interactive 3D WebGL hero',
      'Fluid physics-based morphing UI',
      'Real-time traffic telemetry and device breakdown',
      'Anti-SSRF & DDoS rate-limiting protection',
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-[#07070b] text-white antialiased selection:bg-neon-cyan/20 selection:text-neon-cyan`}>
        <Navbar />
        <main className="min-h-screen pt-20 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
