import React from 'react';
import type { Metadata, Viewport } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: 'Vendemás - Mobile Sales Toolkit for Street Vendors',
    template: '%s | Vendemás',
  },
  description:
    'Empower street vendors to sell more with less friction. Mobile-first sales toolkit with QR/barcode checkout, live location, and daily sales insights.',
  keywords: [
    'street vendors',
    'mobile sales',
    'POS system',
    'QR payments',
    'Mexico',
    'LATAM',
    'micro-retail',
  ],
  authors: [{ name: 'Vendemás Team' }],
  creator: 'Vendemás',
  publisher: 'Vendemás',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vendemas.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'es-MX': '/es-MX',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vendemas.com',
    title: 'Vendemás - Mobile Sales Toolkit for Street Vendors',
    description:
      'Empower street vendors to sell more with less friction. Mobile-first sales toolkit with QR/barcode checkout, live location, and daily sales insights.',
    siteName: 'Vendemás',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vendemás - Mobile Sales Toolkit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendemás - Mobile Sales Toolkit for Street Vendors',
    description: 'Empower street vendors to sell more with less friction.',
    images: ['/og-image.jpg'],
    creator: '@vendemas',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link rel='dns-prefetch' href='//fonts.googleapis.com' />
        <link rel='dns-prefetch' href='//fonts.gstatic.com' />
      </head>
      <body>
        <div className='wrapper'>
          <div className='container'>{children}</div>
        </div>
      </body>
    </html>
  );
}
