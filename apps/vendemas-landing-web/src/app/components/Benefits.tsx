import React from 'react';

/**
 * Benefits Component - Showcases key business benefits with interactive cards
 *
 * This component displays three main benefits of VendeMás in an accessible,
 * visually appealing card layout. Each card represents a core value proposition
 * with clear CTAs and maintains consistent styling across light and dark modes.
 *
 * Features:
 * - Accessible design with ARIA labels and semantic HTML
 * - Responsive grid layout (3 columns on desktop, stacked on mobile)
 * - Interactive CTAs with proper focus management
 * - Consistent visual design across themes
 * - Enterprise section for advanced solutions
 *
 * Accessibility:
 * - Screen reader friendly with proper ARIA relationships
 * - Keyboard navigation support
 * - High contrast focus indicators
 * - Semantic HTML structure with proper headings
 */
export default function Benefits(): React.JSX.Element {
  // Benefit cards data - each represents a core value proposition
  const plans = [
    {
      // Card 1: Commission-free payments (Secondary/Blue theme)
      name: 'Cobra sin comisiones',
      headline: 'Ahorra en cada venta',
      description: 'Cada peso es tuyo.',
      badge: 'Gratis para siempre',
      badgeColor: 'bg-secondary-500',
      popular: false,
      primaryCta: 'Inicia gratis',
      secondaryCta: 'Ver más',
      gradient: 'from-secondary-100 via-secondary-50 to-white',
      borderColor: 'border-secondary-200',
      primaryCtaColor: 'bg-secondary-500 hover:bg-secondary-600',
      accentColor: 'secondary',
    },
    {
      // Card 2: AI-powered growth (Tertiary/Orange theme)
      name: 'IA para ganar más',
      headline: 'Analiza y Crece',
      description: 'Promos automáticas con IA.',
      primaryCta: 'Prueba gratis',
      secondaryCta: 'Ver más',
      gradient: 'from-tertiary-100 via-tertiary-50 to-white',
      borderColor: 'border-tertiary-200',
      primaryCtaColor: 'bg-tertiary-500 hover:bg-tertiary-600',
      accentColor: 'tertiary',
    },
    {
      // Card 3: Offline selling capability (Primary/Green theme)
      name: 'Vende sin internet',
      headline: 'Nunca te detengas',
      description: 'Ventas seguras, aún offline.',
      badge: 'Más popular',
      badgeColor: 'bg-primary-500',
      popular: true,
      primaryCta: 'Inicia gratis',
      secondaryCta: 'Ver más',
      gradient: 'from-primary-100 via-primary-50 to-white',
      borderColor: 'border-primary-200',
      primaryCtaColor: 'bg-primary-500 hover:bg-primary-600',
      accentColor: 'primary',
    },
  ];

  return (
    <section
      id='beneficios'
      className='py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header - Main value proposition */}
        <div className='text-center mb-20'>
          <h2 className='text-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
            Beneficios que transforman tu negocio
          </h2>
          <p className='text-body text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8'>
            Con VendeMás, cada venta suma más.
          </p>
        </div>

        {/* Benefits Cards Grid - Responsive 3-column layout */}
        <div
          className='grid lg:grid-cols-3 gap-8 mb-20'
          role='list'
          aria-label='Beneficios disponibles'
        >
          {plans.map((plan, index) => (
            <article
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg card-border flex flex-col h-full ${
                plan.accentColor === 'primary'
                  ? 'border-primary-500'
                  : plan.accentColor === 'secondary'
                    ? 'border-secondary-500'
                    : plan.accentColor === 'tertiary'
                      ? 'border-tertiary-500'
                      : 'border-gray-200'
              } ${plan.popular ? 'ring-2 ring-primary-500 ring-opacity-50' : ''}`}
              role='listitem'
              aria-labelledby={`benefit-${index}-title`}
              aria-describedby={`benefit-${index}-description`}
            >
              {/* Gradient Background Overlay - Creates visual depth and brand consistency */}
              <div
                className='absolute inset-0 opacity-60 rounded-2xl'
                style={{
                  background:
                    plan.accentColor === 'secondary'
                      ? 'linear-gradient(180deg, rgb(219 234 254) 0%, rgb(239 246 255) 25%, rgb(248 250 252) 50%, rgb(252 252 252) 75%, rgb(255 255 255) 100%)'
                      : plan.accentColor === 'primary'
                        ? 'linear-gradient(180deg, rgb(220 252 231) 0%, rgb(240 253 244) 25%, rgb(247 254 231) 50%, rgb(252 252 252) 75%, rgb(255 255 255) 100%)'
                        : 'linear-gradient(180deg, rgb(255 237 213) 0%, rgb(255 247 237) 25%, rgb(255 251 235) 50%, rgb(252 252 252) 75%, rgb(255 255 255) 100%)',
                }}
              ></div>

              {/* Card Content Container - Relative positioning for overlay */}
              <div className='relative p-8 flex flex-col h-full'>
                {/* Card Header - Title and main value proposition */}
                <header className='mb-8'>
                  {/* Headline - Main title */}
                  <h3
                    id={`benefit-${index}-title`}
                    className='text-display text-3xl font-bold text-gray-900 mb-4'
                  >
                    {plan.name}
                  </h3>

                  {/* Subheadline - Accent colored text with increased size */}
                  {plan.headline && (
                    <div
                      className={`text-5xl font-bold ${
                        plan.accentColor === 'primary'
                          ? 'text-primary-500'
                          : plan.accentColor === 'secondary'
                            ? 'text-secondary-500'
                            : plan.accentColor === 'tertiary'
                              ? 'text-tertiary-500'
                              : 'text-gray-900'
                      }`}
                      aria-label={`Beneficio: ${plan.headline}`}
                    >
                      {plan.headline}
                    </div>
                  )}

                  {/* Illustration - Fixed height container for consistent alignment */}
                  <div className='flex justify-center'>
                    <div className='flex items-center justify-center w-full'>
                      <img
                        src={
                          index === 0
                            ? '/images/illustrations/benefir_1_opcemz_c_scale,w_1024.png'
                            : index === 1
                              ? '/images/illustrations/benefit_2_cyre6w_c_scale,w_1024.png'
                              : '/images/illustrations/benefit_3_f3kmhs_c_scale,w_1024.png'
                        }
                        alt={
                          index === 0
                            ? 'Ilustración de cobro sin comisiones - dinero y monedas representando ahorro'
                            : index === 1
                              ? 'Ilustración de IA para ganar más - cerebro con engranajes representando inteligencia artificial'
                              : 'Ilustración de venta sin internet - dispositivo móvil procesando pagos offline'
                        }
                        className='w-[70%] h-auto max-w-[320px] mx-auto object-contain'
                        loading='lazy'
                      />
                    </div>
                  </div>
                </header>

                {/* Card Description - Perfectly aligned descriptions */}
                <div className='mb-4 -mt-16 flex items-center justify-center h-16'>
                  <p
                    id={`benefit-${index}-description`}
                    className='text-base text-gray-700 leading-6 text-center font-medium'
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Call-to-Action Buttons - Perfectly aligned at bottom */}
                <div
                  className='flex gap-3 mt-auto'
                  role='group'
                  aria-label={`Acciones para ${plan.name}`}
                >
                  {/* Primary CTA - Main action button with brand colors */}
                  <button
                    className={`${plan.primaryCtaColor} text-white font-medium px-5 py-3 !rounded-[14px] transition-all duration-200 hover:shadow-md flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                    aria-label={`${plan.primaryCta} - ${plan.name}`}
                    type='button'
                  >
                    {plan.primaryCta}
                  </button>
                  {/* Secondary CTA - Alternative action with outlined style */}
                  <button
                    className={`border-2 ${
                      plan.accentColor === 'primary'
                        ? 'border-primary-200 text-primary-700 hover:bg-primary-50 focus:ring-primary-500'
                        : plan.accentColor === 'secondary'
                          ? 'border-secondary-200 text-secondary-700 hover:bg-secondary-50 focus:ring-secondary-500'
                          : plan.accentColor === 'tertiary'
                            ? 'border-tertiary-200 text-tertiary-700 hover:bg-tertiary-50 focus:ring-tertiary-500'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
                    } font-medium px-5 py-3 !rounded-[14px] transition-all duration-200 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    aria-label={`${plan.secondaryCta} - ${plan.name}`}
                    type='button'
                  >
                    {plan.secondaryCta}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
