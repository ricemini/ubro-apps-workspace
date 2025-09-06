import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todas las funciones — VendeMás',
  description:
    'Cobros CoDi, catálogo desde una foto, inventario, promociones y estadísticas con IA, facturación y más.',
  openGraph: {
    title: 'Todas las funciones — VendeMás',
    description:
      'Cobros CoDi, catálogo desde una foto, inventario, promociones y estadísticas con IA, facturación y más.',
  },
  alternates: {
    canonical: '/caracteristicas',
  },
};

const features = [
  {
    id: 'cobros-codi',
    title: 'Cobros por CoDi',
    description: 'Acepta pagos digitales sin comisiones bancarias',
    bullets: [
      'QR efímero por venta, pago en segundos',
      'Sin comisiones bancarias por transacción',
      'Comprobante por WhatsApp o email',
    ],
    image: '/mockups/codi.webp',
  },
  {
    id: 'catalogo-desde-una-foto',
    title: 'Catálogo desde una foto',
    description: 'IA que convierte fotos de menús en catálogos digitales',
    bullets: [
      'Escanea tu menú físico con la cámara',
      'IA detecta productos y precios automáticamente',
      'Edita y personaliza antes de publicar',
    ],
    image: '/mockups/ai-scan.webp',
  },
  {
    id: 'inventario',
    title: 'Inventario inteligente',
    description: 'Control automático de stock y alertas',
    bullets: [
      'Seguimiento en tiempo real de productos',
      'Alertas cuando se agota el inventario',
      'Predicciones de demanda con IA',
    ],
    image: '/mockups/inventory.webp',
  },
  {
    id: 'promos-con-ia',
    title: 'Promos con IA',
    description: 'Promociones inteligentes que aumentan ventas',
    bullets: [
      'IA sugiere combos y descuentos óptimos',
      'Promociones automáticas por temporada',
      'A/B testing de ofertas',
    ],
    image: '/mockups/promos.webp',
  },
  {
    id: 'estadisticas-con-ia',
    title: 'Estadísticas con IA',
    description: 'Insights inteligentes para hacer crecer tu negocio',
    bullets: [
      'Análisis predictivo de ventas',
      'Recomendaciones personalizadas',
      'Reportes automáticos por WhatsApp',
    ],
    image: '/mockups/analytics.webp',
  },
  {
    id: 'facturacion',
    title: 'Facturación automática',
    description: 'Cumple con el SAT sin complicaciones',
    bullets: [
      'Facturas electrónicas automáticas',
      'Cumplimiento fiscal garantizado',
      'Integración con contadores',
    ],
    image: '/mockups/billing.webp',
  },
  {
    id: 'mapa',
    title: 'Mapa de ubicaciones',
    description: 'Ayuda a tus clientes a encontrarte',
    bullets: [
      'Comparte tu ubicación en tiempo real',
      'Rutas optimizadas para vendedores móviles',
      'Historial de ubicaciones más rentables',
    ],
    image: '/mockups/map.webp',
  },
  {
    id: 'offline',
    title: 'Modo offline',
    description: 'Vende sin internet, sincroniza después',
    bullets: [
      'Funciona completamente sin conexión',
      'Sincronización automática al conectarse',
      'Respaldo seguro en la nube',
    ],
    image: '/mockups/offline.webp',
  },
  {
    id: 'cuentas-abiertas',
    title: 'Cuentas abiertas',
    description: 'Maneja clientes frecuentes y crédito',
    bullets: [
      'Sistema de crédito para clientes de confianza',
      'Recordatorios automáticos de pago',
      'Historial completo por cliente',
    ],
    image: '/mockups/accounts.webp',
  },
  {
    id: 'colaboradores',
    title: 'Gestión de colaboradores',
    description: 'Administra tu equipo desde una sola app',
    bullets: [
      'Múltiples usuarios con permisos específicos',
      'Seguimiento de ventas por empleado',
      'Horarios y turnos automatizados',
    ],
    image: '/mockups/team.webp',
  },
];

const filterChips = [
  'Cobros CoDi',
  'Catálogo desde una foto',
  'Inventario',
  'Promos con IA',
  'Estadísticas con IA',
  'Facturación',
  'Mapa',
  'Offline',
  'Cuentas abiertas',
  'Colaboradores',
];

const faqs = [
  {
    question: '¿Todas las funciones están incluidas en el plan gratuito?',
    answer:
      'El plan gratuito incluye funciones básicas. Las funciones con IA y avanzadas requieren suscripción.',
  },
  {
    question: '¿Qué tan precisa es la IA para escanear menús?',
    answer:
      'Nuestra IA tiene 95% de precisión. Siempre puedes revisar y editar antes de confirmar.',
  },
  {
    question: '¿Puedo usar VendeMás sin internet?',
    answer:
      'Sí, todas las funciones principales funcionan offline y se sincronizan cuando hay conexión.',
  },
  {
    question: '¿Hay límite en el número de productos?',
    answer:
      'El plan gratuito permite hasta 100 productos. Los planes pagos no tienen límite.',
  },
];

export default function FeaturesPage() {
  return (
    <main className='mx-auto max-w-7xl px-6 py-12 space-y-12'>
      <header className='space-y-4 text-center'>
        <h1 className='text-display text-4xl sm:text-5xl text-secondary-500'>
          Todas las funciones
        </h1>
        <p className='text-body text-xl text-secondary-500/80 max-w-3xl mx-auto'>
          Todo lo que necesitas para tu MiPyME, en una sola plataforma.
        </p>
      </header>

      <section className='flex flex-wrap justify-center gap-3'>
        {filterChips.map(chip => (
          <a
            key={chip}
            href={`#${chip.toLowerCase().replace(/\s+/g, '-')}`}
            className='rounded-full bg-secondary-500/10 hover:bg-secondary-500/20 text-secondary-500 px-4 py-2 text-sm font-medium transition-colors duration-200 btn-focus'
          >
            {chip}
          </a>
        ))}
      </section>

      {/* Feature sections */}
      <div className='space-y-16'>
        {features.map((feature, index) => (
          <section
            key={feature.id}
            id={feature.id}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}
          >
            <div
              className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
            >
              <div>
                <h2 className='text-display text-3xl text-secondary-500 mb-3'>
                  {feature.title}
                </h2>
                <p className='text-body text-lg text-secondary-500/80 mb-6'>
                  {feature.description}
                </p>
              </div>

              <ul className='space-y-3'>
                {feature.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className='flex items-start space-x-3'>
                    <div className='w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0'></div>
                    <span className='text-body text-secondary-500/90'>
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href='/signup'
                className='inline-block rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 transition-colors duration-200 btn-focus'
              >
                Comenzar gratis
              </a>
            </div>

            <div
              className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
            >
              <div className='relative'>
                <div className='aspect-video bg-gradient-to-br from-primary-100 to-tertiary-100 rounded-2xl shadow-xl flex items-center justify-center'>
                  <div className='text-center space-y-3'>
                    <div className='w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto'>
                      <div className='w-8 h-8 bg-primary-500 rounded-lg'></div>
                    </div>
                    <p className='text-secondary-500 font-medium'>
                      {feature.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* FAQ Section */}
      <section className='bg-gray-50 rounded-2xl p-12'>
        <h2 className='text-display text-3xl text-secondary-500 text-center mb-12'>
          Preguntas frecuentes sobre funciones
        </h2>

        <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {faqs.map((faq, index) => (
            <div key={index} className='space-y-3'>
              <h3 className='text-display text-lg font-semibold text-secondary-500'>
                {faq.question}
              </h3>
              <p className='text-body text-secondary-500/80'>{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <a
            href='/faq'
            className='inline-block border-2 border-primary-500 text-primary-500 hover:bg-primary-50 font-semibold px-8 py-3 rounded-lg transition-all duration-200 btn-focus'
          >
            Ver todas las preguntas frecuentes
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className='bg-gradient-primary rounded-2xl p-12 text-center text-white'>
        <h2 className='text-display text-3xl font-bold mb-4'>
          ¿Listo para modernizar tu negocio?
        </h2>
        <p className='text-lg opacity-90 mb-8 max-w-2xl mx-auto'>
          Comienza gratis y descubre cómo VendeMás puede transformar tu MiPyME.
        </p>
        <a
          href='/signup'
          className='inline-block bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors duration-200 btn-focus text-lg'
        >
          Comenzar gratis ahora
        </a>
      </section>
    </main>
  );
}
