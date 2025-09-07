import React from 'react';
import Hero from './components-site/Hero';
import ValueProps from './components/ValueProps';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

export default function Home(): React.JSX.Element {
  return (
    <>
      <main id='main'>
        {/* Container with gradient for Hero and ValueProps sections only */}
        <div className='relative overflow-hidden'>
          {/* Light mode gradient overlay */}
          <div
            className='absolute top-0 right-0 w-[1200px] h-[1200px] -z-20 block dark:hidden'
            style={{
              background:
                'linear-gradient(135deg, rgba(76, 175, 80, 0.3) 0%, rgba(30, 58, 95, 0.2) 50%, rgba(95, 37, 159, 0.3) 100%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              transform: 'translateX(30%)',
              maxWidth: '100vw',
            }}
            aria-hidden='true'
          />

          {/* Dark mode gradient overlay */}
          <div
            className='absolute top-0 right-0 w-[600px] h-[1200px] -z-20 hidden dark:block'
            style={{
              background:
                'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(30, 58, 95, 0.15) 50%, rgba(95, 37, 159, 0.2) 100%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              transform: 'translateX(30%)',
              maxWidth: '100vw',
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
