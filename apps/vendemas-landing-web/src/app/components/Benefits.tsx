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
      price: 'Ahorra en cada venta',
      headline: '',
      badge: 'Gratis para siempre',
      badgeColor: 'bg-secondary-500',
      popular: false,
      description:
        'Cada peso es tuyo al 100%, sin bancos ni comisiones escondidas.',
      primaryCta: 'Inicia gratis',
      secondaryCta: 'Ver más',
      gradient: 'from-secondary-100 via-secondary-50 to-white',
      borderColor: 'border-secondary-200',
      primaryCtaColor: 'bg-secondary-500 hover:bg-secondary-600',
      accentColor: 'secondary',
    },
    {
      // Card 2: Offline selling capability (Primary/Green theme)
      name: 'Vende sin internet',
      price: 'Nunca te detengas',
      headline: '',
      badge: 'Más popular',
      badgeColor: 'bg-primary-500',
      popular: true,
      description:
        'Acepta pagos aun sin conexión. Tus ventas se registran y se confirman automáticamente al volver a estar en línea, siempre que el cliente tenga fondos disponibles.',
      primaryCta: 'Inicia gratis',
      secondaryCta: 'Ver más',
      gradient: 'from-primary-100 via-primary-50 to-white',
      borderColor: 'border-primary-200',
      primaryCtaColor: 'bg-primary-500 hover:bg-primary-600',
      accentColor: 'primary',
    },
    {
      // Card 3: AI-powered growth (Tertiary/Orange theme)
      name: 'IA para ganar más',
      price: 'Predice. Optimiza. Crece.',
      headline: '',
      description:
        'Nuestra IA analiza tus ventas y crea promociones inteligentes para que ganes más cada día.',
      primaryCta: 'Prueba gratis',
      secondaryCta: 'Ver más',
      gradient: 'from-tertiary-100 via-tertiary-50 to-white',
      borderColor: 'border-tertiary-200',
      primaryCtaColor: 'bg-tertiary-500 hover:bg-tertiary-600',
      accentColor: 'tertiary',
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
                <header className='mb-6'>
                  <div className='mb-4'>
                    <h3
                      id={`benefit-${index}-title`}
                      className='text-display text-3xl font-bold text-gray-900'
                    >
                      {plan.name}
                    </h3>
                  </div>

                  <h4 className='text-2xl font-bold text-gray-900 mb-3'>
                    {plan.headline}
                  </h4>

                  {/* Main Value Proposition - Large, colored text for impact */}
                  <div
                    className={`text-4xl font-bold mb-4 ${
                      plan.accentColor === 'primary'
                        ? 'text-primary-500'
                        : plan.accentColor === 'secondary'
                          ? 'text-secondary-500'
                          : plan.accentColor === 'tertiary'
                            ? 'text-tertiary-500'
                            : 'text-gray-900'
                    }`}
                    aria-label={`Beneficio: ${plan.price}`}
                  >
                    {plan.price}
                  </div>
                </header>

                {/* Card Description - Uses flex-grow to push CTAs to bottom for consistent alignment */}
                <div className='flex-grow mb-8'>
                  <p
                    id={`benefit-${index}-description`}
                    className='text-body text-gray-700 leading-relaxed'
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Call-to-Action Buttons - Always positioned at bottom with equal width */}
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
