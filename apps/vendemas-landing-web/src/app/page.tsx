import React from 'react';
import Hero from './components-site/Hero';
import Navbar from './components-site/Navbar';
import ValueProps from './components/ValueProps';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

export default function Home(): React.JSX.Element {
  return (
    <>
      <Navbar />
      <main id='main'>
        {/* Container with gradient for Hero and ValueProps sections only */}
        <div className='relative'>
          {/* Gradient overlay for hero and value props sections */}
          <div
            className='absolute top-0 right-0 w-[1200px] h-[1200px] -z-5'
            style={{
              background:
                'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(236, 72, 153, 0.3) 100%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              transform: 'translateX(30%)',
            }}
            aria-hidden='true'
          />

          {/* Dark mode gradient overlay */}
          <div
            className='absolute top-0 right-0 w-[600px] h-[1200px] -z-20 dark:block hidden'
            style={{
              background:
                'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.15) 50%, rgba(236, 72, 153, 0.2) 100%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              transform: 'translateX(30%)',
            }}
            aria-hidden='true'
          />

          <Hero />
          <ValueProps />
        </div>

        <HowItWorks />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
