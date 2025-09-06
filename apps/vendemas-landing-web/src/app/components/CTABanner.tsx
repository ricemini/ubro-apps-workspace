import { ArrowRight, CheckCircle } from 'lucide-react';

export default function CTABanner() {
  const benefits = [
    'Configuración gratuita',
    'Soporte en español',
    'Sin permanencia',
    'Prueba 30 días gratis',
  ];

  return (
    <section className='py-20 bg-gradient-primary'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center text-white'>
          {/* Main heading */}
          <h2 className='text-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6'>
            Moderniza tu negocio hoy mismo
          </h2>

          <p className='text-body text-xl lg:text-2xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed'>
            Únete a más de 1,000 vendedores que ya aumentaron sus ingresos con
            VendeMás
          </p>

          {/* Benefits */}
          <div className='flex flex-wrap justify-center gap-6 mb-12'>
            {benefits.map((benefit, index) => (
              <div key={index} className='flex items-center space-x-2'>
                <CheckCircle className='h-5 w-5 text-tertiary-500' />
                <span className='text-body font-medium'>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className='flex flex-col sm:flex-row gap-6 justify-center mb-12'>
            <button className='card-border !rounded-[14px] bg-white text-primary-500 hover:bg-gray-100 font-bold px-12 py-5 transition-all duration-200 btn-focus text-xl shadow-xl hover:shadow-2xl transform hover:scale-105'>
              Comenzar gratis ahora
            </button>
            <button className='border-3 border-white text-white hover:bg-white hover:text-primary-500 font-bold px-12 py-5 rounded-xl transition-all duration-200 btn-focus text-xl inline-flex items-center'>
              Ver demostración
              <ArrowRight className='h-5 w-5 ml-2' />
            </button>
          </div>

          {/* Testimonial */}
          <div className='max-w-2xl mx-auto'>
            <blockquote className='text-body text-lg italic opacity-90 mb-4'>
              "Desde que uso VendeMás, mis ventas aumentaron 40%. Ya no pierdo
              clientes por no tener cambio y el control de inventario me ahorra
              mucho tiempo."
            </blockquote>
            <div className='flex items-center justify-center space-x-4'>
              <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center'>
                <span className='text-white font-bold'>MR</span>
              </div>
              <div className='text-left'>
                <div className='font-semibold'>María Rodríguez</div>
                <div className='text-sm opacity-75'>
                  Taquería La Bonita, CDMX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className='relative mt-20'>
        <svg
          className='absolute bottom-0 w-full h-20 text-white'
          preserveAspectRatio='none'
          viewBox='0 0 1200 120'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
            opacity='.25'
            fill='currentColor'
          />
          <path
            d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
            opacity='.5'
            fill='currentColor'
          />
          <path
            d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
            fill='currentColor'
          />
        </svg>
      </div>
    </section>
  );
}
