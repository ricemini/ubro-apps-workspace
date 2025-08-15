import React from 'react';
import { Metadata } from 'next';
import ContactForm from './components/ContactForm';
import VendorStats from './components/VendorStats';

export const metadata: Metadata = {
  title: 'Vendemás - Mobile Sales Toolkit for Street Vendors',
  description:
    'Vendemás - Empowering street vendors with modern mobile sales technology. QR payments, live tracking, and daily insights.',
  openGraph: {
    title: 'Vendemás - Mobile Sales Toolkit for Street Vendors',
    description: 'Empower street vendors to sell more with less friction.',
  },
};

// Server Component - No 'use client' directive for better SSR
export default async function HomePage(): Promise<React.JSX.Element> {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <h1 className='app-name'>Vendemás</h1>
            <nav className='hidden md:flex space-x-8'>
              <a
                href='#features'
                className='text-body text-gray-600 hover:text-secondary transition-colors'
              >
                Features
              </a>
              <a
                href='#pricing'
                className='text-body text-gray-600 hover:text-secondary transition-colors'
              >
                Pricing
              </a>
              <a
                href='#contact'
                className='text-body text-gray-600 hover:text-secondary transition-colors'
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='bg-gradient-primary text-white py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-display text-5xl font-bold mb-6'>
            Welcome to <span className='text-tertiary'>Vendemás</span> 👋
          </h1>
          <p className='text-body text-xl mb-8 max-w-3xl mx-auto'>
            Mobile-first sales toolkit for street vendors in Mexico/LATAM
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            <div className='flex flex-col items-center space-y-2'>
              <span className='text-3xl'>📱</span>
              <span className='text-body font-medium'>QR/Barcode Checkout</span>
            </div>
            <div className='flex flex-col items-center space-y-2'>
              <span className='text-3xl'>📍</span>
              <span className='text-body font-medium'>
                Live Location Tracking
              </span>
            </div>
            <div className='flex flex-col items-center space-y-2'>
              <span className='text-3xl'>📊</span>
              <span className='text-body font-medium'>
                Daily Sales Insights
              </span>
            </div>
          </div>
          <div className='flex justify-center space-x-4'>
            <button className='bg-secondary hover:bg-secondary-600 text-secondary-on font-medium py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2'>
              Get Started
            </button>
            <button className='bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary font-medium py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2'>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id='features' className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-display text-3xl font-bold text-gray-900 mb-4'>
              Platform Statistics
            </h2>
            <p className='text-body text-gray-600'>
              See how Vendemás is transforming street vending
            </p>
          </div>
          <VendorStats />
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className='py-16 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-display text-3xl font-bold text-gray-900 mb-4'>
              Get Started Today
            </h2>
            <p className='text-body text-gray-600'>
              Join thousands of vendors already using Vendemás
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-secondary text-secondary-on py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h3 className='app-name mb-4'>Vendemás</h3>
            <p className='text-body text-secondary-on/80'>
              © 2024 Vendemás. Empowering street vendors across Mexico and
              LATAM.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
