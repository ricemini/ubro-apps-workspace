import { Download, CreditCard, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: Download,
      title: 'Elige productos o escanea',
      description:
        'Toma una foto de tu menú y la IA creará tu catálogo automáticamente.',
      highlight: 'IA integrada',
    },
    {
      step: '02',
      icon: CreditCard,
      title: 'Muestra el código CoDi',
      description:
        'Genera códigos QR únicos para cada venta. El cliente paga desde su app bancaria.',
      highlight: 'Sin comisiones',
    },
    {
      step: '03',
      icon: TrendingUp,
      title: 'Listo (también offline)',
      description:
        'Funciona sin internet. Cuando recuperes conexión, todo se sincroniza automáticamente.',
      highlight: 'Funciona offline',
    },
  ];

  return (
    <section
      id='como-funciona'
      className='py-20 bg-gradient-to-br from-gray-50 to-white'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            ¿Cómo funciona VendeMás?
          </h2>
          <p className='text-body text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
            En 4 simples pasos tendrás tu negocio funcionando con tecnología de
            punta
          </p>
          <div className='inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium'>
            <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
            Configuración en menos de 10 minutos
          </div>
        </div>

        {/* Steps */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
          {steps.map((stepData, index) => (
            <div
              key={index}
              className='relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group'
            >
              {/* Step number */}
              <div className='absolute -top-4 -right-4 bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg'>
                {stepData.step}
              </div>

              {/* Icon */}
              <div className='bg-primary-100 group-hover:bg-primary-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300'>
                <stepData.icon
                  className='h-8 w-8 text-primary-500 group-hover:text-white'
                  aria-hidden='true'
                />
              </div>

              {/* Content */}
              <h3 className='text-display text-xl font-bold text-gray-900 mb-3'>
                {stepData.title}
              </h3>
              <p className='text-body text-gray-600 mb-4 leading-relaxed'>
                {stepData.description}
              </p>

              {/* Highlight */}
              <div className='inline-flex items-center bg-tertiary-100 text-tertiary-800 px-3 py-1 rounded-full text-sm font-medium'>
                {stepData.highlight}
              </div>

              {/* Connector line (except for last item) */}
              {index < steps.length - 1 && (
                <div className='hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-primary-300 transform -translate-y-1/2'></div>
              )}
            </div>
          ))}
        </div>

        {/* Demo section */}
        <div className='bg-secondary-500 rounded-2xl overflow-hidden'>
          <div className='grid lg:grid-cols-2 gap-0'>
            {/* Content */}
            <div className='p-12 text-white'>
              <h3 className='text-display text-2xl sm:text-3xl font-bold mb-6'>
                Ve VendeMás en acción
              </h3>
              <p className='text-body text-lg opacity-90 mb-8 leading-relaxed'>
                Mira cómo otros vendedores como tú están transformando sus
                negocios con nuestra plataforma.
              </p>

              {/* Stats */}
              <div className='grid grid-cols-2 gap-6 mb-8'>
                <div>
                  <div className='text-3xl font-bold text-tertiary-500 mb-2'>
                    2.5min
                  </div>
                  <div className='text-sm opacity-80'>
                    Tiempo promedio por venta
                  </div>
                </div>
                <div>
                  <div className='text-3xl font-bold text-tertiary-500 mb-2'>
                    99.9%
                  </div>
                  <div className='text-sm opacity-80'>
                    Disponibilidad del sistema
                  </div>
                </div>
              </div>

              <button className='bg-white text-secondary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus'>
                Ver demo interactivo
              </button>
            </div>

            {/* Video placeholder */}
            <div className='relative bg-gradient-to-br from-primary-500 to-tertiary-500 p-12 flex items-center justify-center'>
              <div className='bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-center text-white'>
                <div className='w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <div className='w-0 h-0 border-l-8 border-l-white border-y-6 border-y-transparent ml-1'></div>
                </div>
                <h4 className='font-semibold text-lg mb-2'>
                  Video demostrativo
                </h4>
                <p className='text-sm opacity-90'>
                  Ve cómo usar VendeMás paso a paso
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
