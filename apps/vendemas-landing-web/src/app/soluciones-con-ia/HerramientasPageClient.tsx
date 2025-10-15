'use client';

import { useState } from 'react';
import CyclingFeatureCard, {
  FeatureNavigationDots,
} from '../components-site/CyclingFeatureCard';

export default function HerramientasPageClient(): JSX.Element {
  const [currentTitle, setCurrentTitle] = useState(
    'Todo lo que tu negocio necesita'
  );
  const [currentSubtitle, setCurrentSubtitle] = useState(
    'Organiza, cobra y crece sin complicaciones.'
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCategoryChange = (category: {
    name: string;
    subtitle: string;
  }): void => {
    setCurrentTitle(category.name);
    setCurrentSubtitle(category.subtitle);
  };

  return (
    <main className='relative overflow-hidden'>
      {/* Background gradient + noise */}
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_0%,_theme(colors.indigo.50/80),_transparent_60%)] dark:bg-[radial-gradient(1200px_600px_at_50%_0%,_theme(colors.indigo.900/20),_transparent_60%)]'
      />
      <div
        aria-hidden='true'
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,theme(colors.violet.50/80),theme(colors.white))] dark:bg-[linear-gradient(to_bottom,theme(colors.violet.900/20),theme(colors.gray.900))] mix-blend-normal'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 opacity-[0.06] dark:opacity-[0.03] bg-[url("/assets/noise.png")] bg-repeat'
      />

      {/* Page gradient background - full viewport width */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-tertiary-50/30 dark:from-primary-900/20 dark:via-transparent dark:to-tertiary-900/20 pointer-events-none' />

      <div className='mx-auto max-w-7xl relative'>
        {/* Headline - Fixed height to prevent layout shifts */}
        <div className='mx-auto max-w-3xl text-center pt-20 pb-12 md:pt-28 md:pb-16 px-4 sm:px-6'>
          <div className='h-32 md:h-36 flex flex-col justify-center'>
            <h1 className='font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl text-gray-800 dark:text-gray-100 transition-all duration-500'>
              {currentTitle}
            </h1>
            <p className='mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 transition-all duration-500'>
              {currentSubtitle}
            </p>
          </div>
        </div>

        {/* Showcase */}
        <div className='relative pb-12 lg:pb-20 px-4 sm:px-6'>
          <div className='grid lg:grid-cols-[2fr_1fr] gap-8 items-start lg:items-stretch'>
            {/* Left blurred dashboard */}
            <div className='relative order-2 lg:order-1'>
              <div className='relative rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.10)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.30)]'>
                <img
                  src='/assets/mockups/dashboard.png'
                  alt='Vista de VendeMás en acción'
                  className='w-full h-auto opacity-90 dark:opacity-80 blur-[2px]'
                />
              </div>
              <div
                aria-hidden='true'
                className='absolute -inset-6 -z-10 blur-3xl opacity-40 dark:opacity-20 bg-[radial-gradient(600px_300px_at_40%_30%,theme(colors.violet.200),transparent)] dark:bg-[radial-gradient(600px_300px_at_40%_30%,theme(colors.violet.600),transparent)]'
              />
            </div>

            {/* Right config card */}
            <aside className='order-1 lg:order-2 relative'>
              <CyclingFeatureCard
                onCategoryChange={handleCategoryChange}
                currentIndex={currentIndex}
                onIndexChange={setCurrentIndex}
              />

              {/* Navigation Dots - Positioned to the right of the card */}
              <div className='absolute -right-12 top-1/2 transform -translate-y-1/2 hidden lg:block'>
                <FeatureNavigationDots
                  currentIndex={currentIndex}
                  onIndexChange={setCurrentIndex}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
