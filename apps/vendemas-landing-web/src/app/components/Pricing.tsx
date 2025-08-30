import { Check, X, Star, ArrowRight } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Básico',
      description: 'Perfecto para empezar',
      price: 'Gratis',
      period: 'para siempre',
      popular: false,
      features: {
        included: [
          'Hasta 100 productos',
          'Ventas ilimitadas',
          'Pagos en efectivo',
          'Reportes básicos',
          'Modo offline',
          'Soporte por chat',
        ],
        excluded: [
          'Pagos CoDi',
          'Múltiples usuarios',
          'Reportes avanzados',
          'Integración contable',
        ],
      },
      cta: 'Comenzar gratis',
      ctaStyle: 'secondary',
    },
    {
      name: 'Profesional',
      description: 'Para negocios en crecimiento',
      price: '$299',
      period: '/mes',
      popular: true,
      features: {
        included: [
          'Productos ilimitados',
          'Ventas ilimitadas',
          'Todos los métodos de pago',
          'Pagos CoDi certificados',
          'Hasta 3 usuarios',
          'Reportes avanzados',
          'Inventario inteligente',
          'Soporte prioritario',
          'Facturas electrónicas',
          'Dashboard ejecutivo',
        ],
        excluded: ['Usuarios ilimitados', 'API personalizada'],
      },
      cta: 'Comenzar prueba gratis',
      ctaStyle: 'primary',
    },
    {
      name: 'Empresarial',
      description: 'Para múltiples puntos de venta',
      price: '$799',
      period: '/mes',
      popular: false,
      features: {
        included: [
          'Todo del plan Profesional',
          'Usuarios ilimitados',
          'Múltiples ubicaciones',
          'API personalizada',
          'Integración ERP',
          'Soporte telefónico 24/7',
          'Capacitación personalizada',
          'Gerente de cuenta dedicado',
          'Reportes personalizados',
          'Cumplimiento fiscal avanzado',
        ],
        excluded: [],
      },
      cta: 'Contactar ventas',
      ctaStyle: 'secondary',
    },
  ];

  return (
    <section id='precios' className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            Planes que se adaptan a tu negocio
          </h2>
          <p className='text-body text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
            Comienza gratis y escala conforme crece tu negocio. Sin sorpresas,
            sin letra chica.
          </p>
          <div className='inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium'>
            <Star className='h-4 w-4 mr-2' />
            30 días de prueba gratis en planes pagos
          </div>
        </div>

        {/* Pricing cards */}
        <div className='grid lg:grid-cols-3 gap-8 mb-16'>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-primary-500 scale-105'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              {plan.popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <span className='bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium'>
                    Más popular
                  </span>
                </div>
              )}

              <div className='p-8'>
                {/* Plan header */}
                <div className='text-center mb-8'>
                  <h3 className='text-display text-xl font-bold text-gray-900 mb-2'>
                    {plan.name}
                  </h3>
                  <p className='text-body text-gray-600 mb-4'>
                    {plan.description}
                  </p>
                  <div className='flex items-baseline justify-center'>
                    <span className='text-4xl font-bold text-gray-900'>
                      {plan.price}
                    </span>
                    <span className='text-gray-600 ml-2'>{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className='mb-8'>
                  <div className='space-y-3'>
                    {plan.features.included.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className='flex items-center space-x-3'
                      >
                        <Check className='h-5 w-5 text-green-500 flex-shrink-0' />
                        <span className='text-body text-gray-700'>
                          {feature}
                        </span>
                      </div>
                    ))}
                    {plan.features.excluded.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className='flex items-center space-x-3 opacity-50'
                      >
                        <X className='h-5 w-5 text-gray-400 flex-shrink-0' />
                        <span className='text-body text-gray-500'>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full font-semibold px-6 py-4 rounded-xl transition-all duration-200 btn-focus ${
                    plan.ctaStyle === 'primary'
                      ? 'bg-primary-500 hover:bg-primary-600 text-white'
                      : 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise section */}
        <div className='bg-gradient-secondary rounded-2xl p-12 text-center text-white'>
          <h3 className='text-display text-2xl sm:text-3xl font-bold mb-4'>
            ¿Necesitas algo más personalizado?
          </h3>
          <p className='text-body text-lg opacity-90 mb-8 max-w-2xl mx-auto'>
            Para cadenas de vendedores o necesidades específicas, creamos
            soluciones a medida.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-6'>
            <button className='bg-white text-secondary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus'>
              Hablar con ventas
            </button>
            <button className='border-2 border-white text-white hover:bg-white hover:text-secondary-500 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus'>
              Ver casos de éxito
            </button>
          </div>
          <div className='text-center'>
            <a
              href='/faq'
              className='inline-flex items-center text-white hover:text-tertiary-500 font-medium btn-focus px-4 py-2 rounded-lg transition-colors duration-200'
            >
              ¿Tienes más preguntas? Ver FAQ completo
              <ArrowRight className='h-4 w-4 ml-2' />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
