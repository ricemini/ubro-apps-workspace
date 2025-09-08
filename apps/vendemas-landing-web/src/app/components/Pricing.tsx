import { Check, ArrowRight } from 'lucide-react';
import React from 'react';

export default function Pricing(): React.JSX.Element {
  const plans = [
    {
      name: 'Plan Ambularnte',
      price: 'Gratis para siempre',
      headline: 'Perfecto para empezar',
      badge: 'Gratis para siempre',
      badgeColor: 'bg-secondary-500',
      popular: false,
      features: [
        'Hasta 100 productos',
        'Ventas ilimitadas',
        'Pagos en efectivo',
        'Modo offline',
        '',
        '',
      ],
      primaryCta: 'Comenzar gratis',
      secondaryCta: 'Ver más',
      gradient: 'from-secondary-100 via-secondary-50 to-white',
      borderColor: 'border-secondary-200',
      primaryCtaColor: 'bg-secondary-500 hover:bg-secondary-600',
      accentColor: 'secondary',
    },
    {
      name: 'Plan Pro PyME',
      price: '$299 MXN/mes',
      headline: 'Para negocios en crecimiento',
      badge: 'Más popular',
      badgeColor: 'bg-primary-500',
      popular: true,
      features: [
        'Productos ilimitados',
        'CoDi certificado',
        'Inventario inteligente',
        'Promos con IA',
        'Facturas electrónicas',
      ],
      primaryCta: 'Prueba gratis',
      secondaryCta: 'Ver más',
      gradient: 'from-primary-100 via-primary-50 to-white',
      borderColor: 'border-primary-200',
      primaryCtaColor: 'bg-primary-500 hover:bg-primary-600',
      accentColor: 'primary',
    },
    {
      name: 'Plan Empresarial',
      price: 'Contáctanos',
      headline: 'Para múltiples puntos de venta',
      features: [
        'Todo del Plan Profesional',
        'Usuarios ilimitados',
        'Múltiples sucursales',
        'API personalizada',
        'Reportes avanzados',
      ],
      primaryCta: 'Hablar con ventas',
      secondaryCta: 'Ver más',
      gradient: 'from-tertiary-100 via-tertiary-50 to-white',
      borderColor: 'border-tertiary-200',
      primaryCtaColor: 'bg-tertiary-500 hover:bg-tertiary-600',
      accentColor: 'tertiary',
    },
  ];

  return (
    <section
      id='precios'
      className='py-24 bg-gradient-to-br from-gray-50 to-white'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-20'>
          <h2 className='text-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6'>
            Planes que se adaptan a tu negocio
          </h2>
          <p className='text-body text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
            Comienza gratis y escala conforme crece tu negocio. Sin sorpresas,
            sin letra chica.
          </p>
        </div>

        {/* Pricing cards */}
        <div className='grid lg:grid-cols-3 gap-8 mb-20'>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg card-border ${
                plan.accentColor === 'primary'
                  ? 'border-primary-500'
                  : plan.accentColor === 'secondary'
                    ? 'border-secondary-500'
                    : plan.accentColor === 'tertiary'
                      ? 'border-tertiary-500'
                      : 'border-gray-200'
              } ${plan.popular ? 'ring-2 ring-primary-500 ring-opacity-50' : ''}`}
            >
              {/* Gradient background overlay */}
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

              <div className='relative p-8'>
                {/* Plan header */}
                <div className='mb-8'>
                  <div className='mb-4'>
                    <h3 className='text-display text-xl font-bold text-gray-900'>
                      {plan.name}
                    </h3>
                  </div>

                  <h4 className='text-2xl font-bold text-gray-900 mb-3'>
                    {plan.headline}
                  </h4>

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
                  >
                    {plan.price}
                  </div>
                </div>

                {/* Features */}
                <div className='mb-8'>
                  <div className='space-y-3'>
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className='flex items-center space-x-3'
                      >
                        {feature && (
                          <div
                            className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                              plan.accentColor === 'primary'
                                ? 'bg-primary-100'
                                : plan.accentColor === 'secondary'
                                  ? 'bg-secondary-100'
                                  : plan.accentColor === 'tertiary'
                                    ? 'bg-tertiary-100'
                                    : 'bg-gray-100'
                            }`}
                          >
                            {React.createElement(Check, {
                              className: `h-3 w-3 ${
                                plan.accentColor === 'primary'
                                  ? 'text-primary-600'
                                  : plan.accentColor === 'secondary'
                                    ? 'text-secondary-600'
                                    : plan.accentColor === 'tertiary'
                                      ? 'text-tertiary-600'
                                      : 'text-gray-600'
                              }`,
                            })}
                          </div>
                        )}
                        <span className='text-body text-gray-700 text-sm'>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className='flex gap-3'>
                  <button
                    className={`${plan.primaryCtaColor} text-white font-semibold px-6 py-3 !rounded-[14px] transition-all duration-200 hover:shadow-md`}
                  >
                    {plan.primaryCta}
                  </button>
                  <button
                    className={`border-2 ${
                      plan.accentColor === 'primary'
                        ? 'border-primary-200 text-primary-700 hover:bg-primary-50'
                        : plan.accentColor === 'secondary'
                          ? 'border-secondary-200 text-secondary-700 hover:bg-secondary-50'
                          : plan.accentColor === 'tertiary'
                            ? 'border-tertiary-200 text-tertiary-700 hover:bg-tertiary-50'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    } font-semibold px-6 py-3 !rounded-[14px] transition-all duration-200`}
                  >
                    {plan.secondaryCta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise section */}
        <div className='bg-gradient-to-br from-secondary-500 via-secondary-600 to-primary-600 rounded-3xl p-12 text-center text-white shadow-2xl'>
          <div className='max-w-4xl mx-auto'>
            <h3 className='text-display text-3xl sm:text-4xl font-bold mb-6'>
              ¿Necesitas algo más personalizado?
            </h3>
            <p className='text-body text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed'>
              Para cadenas de vendedores o necesidades específicas, creamos
              soluciones a medida con soporte dedicado.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <button className='bg-white text-secondary-600 hover:bg-gray-100 font-bold px-10 py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'>
                Hablar con ventas
              </button>
              <button className='border-2 border-white text-white hover:bg-white hover:text-secondary-600 font-bold px-10 py-4 rounded-2xl transition-all duration-200 transform hover:scale-105'>
                Ver casos de éxito
              </button>
            </div>
            <div className='text-center'>
              <a
                href='/faq'
                className='inline-flex items-center text-white hover:text-tertiary-300 font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:bg-white/10'
              >
                ¿Tienes más preguntas? Ver FAQ completo
                {React.createElement(ArrowRight, { className: 'h-5 w-5 ml-2' })}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
