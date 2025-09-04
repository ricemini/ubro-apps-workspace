'use client';

import {
  TrendingUp,
  Brain,
  ShieldCheck,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';

/**
 * ValueProps Component
 *
 * Displays the core value propositions of VendeMás in an accessible,
 * conversion-optimized grid layout with scroll-triggered animations. Each card highlights a key benefit
 * with clear statistics and compelling descriptions.
 *
 * Animation Features:
 * - Intersection Observer for scroll-triggered entrance animations
 * - Staggered card entrance with subtle slide-in and fade effects
 * - Respects user's motion preferences (prefers-reduced-motion)
 * - One-time animation trigger to prevent re-animations
 *
 * Accessibility Features:
 * - Semantic HTML with proper ARIA labels and descriptions
 * - Keyboard navigation support for all interactive elements
 * - Screen reader friendly content relationships
 * - Focus management with visible indicators
 * - Dark mode support for all visual elements
 * - Animation respects accessibility preferences
 */
export default function ValueProps(): React.JSX.Element {
  // State to track if the section is in view for scroll-triggered animations
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Analytics hook for tracking user interactions
  const { trackValuePropositionView, trackCTAClick } = useAnalytics();

  // Intersection Observer to trigger scroll-based entrance animations
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);

          // Track value propositions section view
          valueProps.forEach((prop, index) => {
            trackValuePropositionView(index, prop.title);
          });

          // Disconnect observer after first trigger to prevent re-animations
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -100px 0px', // Start animation when section is closer to viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [trackValuePropositionView]);

  // Core value propositions data - optimized for conversion and readability
  // Each object contains: icon, title, description, stat, and statLabel
  const valueProps: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    stat: string;
    statLabel: string;
  }> = [
    {
      icon: TrendingUp,
      title: 'Aumenta tus ventas',
      description: 'Acepta más formas de pago y nunca pierdas una venta.',
      stat: '+40%',
      statLabel: 'de aumento en ventas',
    },
    {
      icon: Brain,
      title: 'Inteligencia para Vender Más',
      description:
        'Entiende a tus clientes y optimiza tu catálogo con nuestro asistente de IA.',
      stat: 'Asistente IA',
      statLabel: 'Análisis y Decisiones Inteligente',
    },
    {
      icon: ShieldCheck,
      title: 'Pagos seguros y sin límites',
      description:
        'Transacciones rápidas y protegidas, con o sin conexión a internet.',
      stat: '100%',
      statLabel: 'de transacciones seguras',
    },
    {
      icon: Smartphone,
      title: 'Fácil de usar, siempre disponible',
      description:
        'Una interfaz intuitiva que funciona en cualquier dispositivo, en cualquier momento.',
      stat: '< 5 minutos',
      statLabel: 'Tiempo de aprendizaje',
    },
  ];

  return (
    // Main section with responsive padding, dark mode support, and intersection observer ref
    <section
      id='por-que-vendemas'
      ref={sectionRef}
      className='py-20 bg-white dark:bg-gray-900'
    >
      {/* Container with max width and responsive padding */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header - Main title and subtitle */}
        <div className='text-center mb-16'>
          <h2 className='text-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            ¿Por qué elegir VendeMás?
          </h2>
          <p className='text-body text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Diseñado para las necesidades de las PyMES y Vendedores Ambulantes
            de México y Latinoamérica
          </p>
        </div>

        {/* Value Propositions Grid - Responsive layout with accessibility */}
        <div
          className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
          role='region'
          aria-label='Características principales de VendeMás'
        >
          {/* Individual Value Proposition Card - Accessible, interactive, with scroll-triggered animations */}
          {valueProps.map((prop, index) => (
            <article
              key={index}
              // Comprehensive styling with hover effects, focus states, dark mode, and conditional scroll animations
              className={`group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-200 hover:bg-gradient-to-br hover:from-white hover:to-primary-50 dark:hover:from-gray-800 dark:hover:to-gray-700 flex flex-col h-full focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900 ${
                isInView ? 'animate-slide-in-fade' : 'opacity-0 translate-y-3'
              }`}
              tabIndex={0}
              role='article'
              // ARIA attributes for screen reader accessibility
              aria-labelledby={`title-${index}`}
              aria-describedby={`desc-${index} stats-${index}`}
              // Staggered animation timing - only applies when section is in view
              style={{
                animationDelay: isInView ? `${index * 80}ms` : '0ms',
                animationDuration: '600ms',
                animationFillMode: 'both',
              }}
            >
              {/* Icon Container - Centered with hover effects and accessibility */}
              <div
                className='bg-primary-100 group-hover:bg-primary-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto transition-colors duration-300'
                aria-hidden='true'
              >
                {/* Lucide React icon with responsive sizing and color transitions */}
                <prop.icon
                  className='h-8 w-8 text-primary-500 group-hover:text-white'
                  aria-hidden='true'
                />
              </div>

              {/* Content Section - Title and description with proper IDs for ARIA */}
              <div className='flex-1'>
                {/* Card title - Linked to aria-labelledby for screen readers */}
                <h3
                  id={`title-${index}`}
                  className='text-display text-xl font-bold text-gray-900 dark:text-white mb-3 text-center'
                >
                  {prop.title}
                </h3>
                {/* Card description - Linked to aria-describedby for screen readers */}
                <p
                  id={`desc-${index}`}
                  className='text-body text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-center'
                >
                  {prop.description}
                </p>
              </div>

              {/* Statistics Section - Key metrics with visual separator and ARIA support */}
              <div
                id={`stats-${index}`}
                className='border-t border-gray-100 dark:border-gray-700 pt-4 mb-4'
              >
                {/* Main statistic - Large, prominent display */}
                <div className='text-3xl font-bold text-primary-500 mb-1'>
                  {prop.stat}
                </div>
                {/* Statistic label - Context for the main number */}
                <div className='text-body text-sm text-gray-500 dark:text-gray-400'>
                  {prop.statLabel}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Secondary CTA Button - Quick start action with animated arrow */}
        <div className='mt-12 text-center'>
          {/* Quick start button with hover animations and accessibility */}
          <button
            type='button'
            className='group rounded-full bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20 flex items-center gap-2 mx-auto transition-all duration-200'
            aria-label='Comenzar a usar VendeMás de forma gratuita en minutos'
            onClick={() =>
              trackCTAClick('secondary', 'value_props_quick_start')
            }
          >
            {/* Button text - Clear call to action */}
            Empieza gratis en minutos
            {/* Animated arrow icon - Grows and moves on hover for visual feedback */}
            <ArrowRight className='h-5 w-5 transition-all duration-200 group-hover:scale-110 group-hover:translate-x-0.5' />
          </button>
        </div>

        {/* Call-to-Action Section - Conversion-focused with compelling messaging */}
        <div className='mt-16 text-center bg-gradient-primary rounded-2xl p-12 text-white'>
          {/* CTA headline - Clear value proposition for conversion */}
          <h3 className='text-display text-2xl sm:text-3xl font-bold mb-4'>
            Únete a miles de vendedores que ya aumentaron sus ingresos
          </h3>
          {/* CTA description - Addresses common concerns and creates urgency */}
          <p className='text-body text-lg opacity-90 mb-8 max-w-2xl mx-auto'>
            Sin costos ocultos, sin permanencia. Comienza a usar VendeMás hoy
            mismo.
          </p>
          {/* Action Buttons - Primary and secondary CTAs with accessibility */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            {/* Primary CTA - Free trial button with enhanced focus states */}
            <button
              className='bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500'
              aria-label='Comenzar a usar VendeMás de forma gratuita'
              onClick={() => trackCTAClick('trial', 'value_props_main_cta')}
            >
              Comenzar gratis
            </button>
            {/* Secondary CTA - Sales contact button with hover effects */}
            <button
              className='border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500'
              aria-label='Contactar con el equipo de ventas de VendeMás'
              onClick={() => trackCTAClick('contact', 'value_props_sales_cta')}
            >
              Hablar con ventas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
