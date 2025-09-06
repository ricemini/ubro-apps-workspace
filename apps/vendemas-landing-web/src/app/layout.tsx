import React from 'react';
import './global.css';
import { inter, jakarta } from './fonts';
import type { Metadata } from 'next';
import { ThemeProvider } from './components-site/theme/ThemeProvider';
import GoogleAnalytics from './components/GoogleAnalytics';
import FirebaseAnalytics from './components/FirebaseAnalytics';
import Navbar from './components-site/Navbar';

export const metadata: Metadata = {
  title: 'VendeMás - POS Móvil para Vendedores Ambulantes | México y LATAM',
  description:
    'Sistema de punto de venta móvil diseñado especialmente para vendedores ambulantes en México y Latinoamérica. Pagos CoDi, funciona sin internet, fácil de usar.',
  keywords:
    'POS móvil, vendedores ambulantes, CoDi, punto de venta, México, LATAM, sin internet, comercio ambulante',
  authors: [{ name: 'VendeMás' }],
  creator: 'VendeMás',
  publisher: 'VendeMás',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vendemas.mx'),
  openGraph: {
    title: 'VendeMás - POS Móvil para Vendedores Ambulantes',
    description:
      'Sistema de punto de venta móvil diseñado especialmente para vendedores ambulantes en México y Latinoamérica. Pagos CoDi, funciona sin internet, fácil de usar.',
    url: 'https://vendemas.mx',
    siteName: 'VendeMás',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VendeMás - POS Móvil para Vendedores Ambulantes',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VendeMás - POS Móvil para Vendedores Ambulantes',
    description:
      'Sistema de punto de venta móvil diseñado especialmente para vendedores ambulantes en México y Latinoamérica.',
    images: ['/twitter-card.jpg'],
    creator: '@VendeMas',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='es-MX'
      className={`${inter.variable} ${jakarta.variable} scroll-smooth bg-white dark:bg-gray-950 scheme-light dark:scheme-dark`}
    >
      <head>
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
        <link rel='sitemap' type='application/xml' href='/sitemap.xml' />
        <link rel='canonical' href='https://vendemas.mx' />
        <meta name='theme-color' content='#4CAF50' />
      </head>
      <body className='font-body antialiased'>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
        {/* Analytics Components */}
        <GoogleAnalytics />
        <FirebaseAnalytics />
      </body>
    </html>
  );
}
