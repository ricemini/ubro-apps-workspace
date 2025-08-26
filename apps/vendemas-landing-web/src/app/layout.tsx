import './global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VendeMás - POS Móvil para Vendedores Ambulantes | México y LATAM',
  description: 'Sistema de punto de venta móvil diseñado especialmente para vendedores ambulantes en México y Latinoamérica. Pagos CoDi, funciona sin internet, fácil de usar.',
  keywords: 'POS móvil, vendedores ambulantes, CoDi, punto de venta, México, LATAM, sin internet, comercio ambulante',
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
    description: 'Sistema de punto de venta móvil diseñado especialmente para vendedores ambulantes en México y Latinoamérica. Pagos CoDi, funciona sin internet, fácil de usar.',
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
    description: 'Sistema de punto de venta móvil diseñado especialmente para vendedores ambulantes en México y Latinoamérica.',
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
    <html lang="es-MX" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Montserrat:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="canonical" href="https://vendemas.mx" />
        <meta name="theme-color" content="#4CAF50" />
      </head>
      <body className="font-body text-body bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}