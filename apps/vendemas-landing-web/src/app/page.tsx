import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ValueProps from './components/ValueProps';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import BusinessOwnerSection from './components/BusinessOwnerSection';
import Pricing from './components/Pricing';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

export default function Home() {
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