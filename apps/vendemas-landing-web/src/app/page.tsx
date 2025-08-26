import React from 'react';
import Hero from './(site)/components/Hero';
import Navigation from './components/Navigation';
import ValueProps from './components/ValueProps';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import BusinessOwnerSection from './components/BusinessOwnerSection';
import Pricing from './components/Pricing';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

export default function Home(): React.JSX.Element {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ValueProps />
        <HowItWorks />
        <Features />
        <BusinessOwnerSection />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
