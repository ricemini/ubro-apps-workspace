import { Metadata } from 'next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GoogleAnalytics from '../components/GoogleAnalytics';
import FirebaseAnalytics from '../components/FirebaseAnalytics';
import {
  BarChart3,
  Users,
  Shield,
  Smartphone,
  TrendingUp,
  Clock,
  Settings,
  Bell,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Para Dueños de Negocio — VendeMás | Control Total de tu Empresa',
  description:
    'Supervisa y controla tu negocio desde cualquier lugar. Dashboard ejecutivo, gestión de personal, análisis de crecimiento y herramientas de administración.',
  keywords:
    'dueños de negocio, dashboard ejecutivo, gestión de personal, supervisión empresarial, análisis de ventas, control remoto',
  openGraph: {
    title: 'Para Dueños de Negocio — VendeMás',
    description:
      'Supervisa y controla tu negocio desde cualquier lugar. Dashboard ejecutivo, gestión de personal, análisis de crecimiento y herramientas de administración.',
  },
  alternates: {
    canonical: '/mi-negocio',
  },
};

export default function BusinessOwnerPage() {
  const ownerFeatures = [
    {
      icon: BarChart3,
      title: 'Dashboard Ejecutivo',
      description:
        'Ve el desempeño de tu negocio en tiempo real desde cualquier lugar.',
    },
    {
      icon: Users,
      title: 'Control de Personal',
      description:
        'Gestiona empleados, horarios y permisos con facilidad total.',
    },
    {
      icon: Shield,
      title: 'Supervisión Segura',
      description: 'Monitorea todas las transacciones con alertas automáticas.',
    },
    {
      icon: TrendingUp,
      title: 'Análisis de Crecimiento',
      description:
        'Identifica oportunidades y optimiza tus estrategias de venta.',
    },
  ];

  const managementTools = [
    {
      icon: Clock,
      title: 'Horarios y Turnos',
      features: [
        'Asignación automática',
        'Control de asistencia',
        'Reportes de productividad',
      ],
    },
    {
      icon: Settings,
      title: 'Configuración Remota',
      features: [
        'Cambios desde tu casa',
        'Actualizaciones instantáneas',
        'Backup automático',
      ],
    },
    {
      icon: Bell,
      title: 'Alertas Inteligentes',
      features: ['Ventas inusuales', 'Inventario bajo', 'Problemas de sistema'],
    },
    {
      icon: Smartphone,
      title: 'App del Dueño',
      features: [
        'Vista gerencial',
        'Reportes ejecutivos',
        'Control remoto total',
      ],
    },
  ];

  const faqs = [
    {
      question: '¿Puedo supervisar múltiples puestos desde una sola cuenta?',
      answer:
        'Sí, VendeMás te permite gestionar varios puntos de venta desde un solo dashboard ejecutivo.',
    },
    {
      question: '¿Qué tipo de reportes puedo generar?',
      answer:
        'Tienes acceso a reportes de ventas, inventario, personal, y análisis de crecimiento en tiempo real.',
    },
    {
      question: '¿Puedo configurar alertas personalizadas?',
      answer:
        'Sí, puedes configurar alertas para ventas inusuales, inventario bajo, y cualquier métrica importante.',
    },
    {
      question: '¿Es seguro el control remoto?',
      answer:
        'Absolutamente. Todas las conexiones están encriptadas y tienes control total sobre los permisos de acceso.',
    },
  ];

  return (
    <>
      <Navigation />
      <main className='mx-auto max-w-7xl px-6 py-12 space-y-16'>
        {/* Header */}
        <header className='text-center space-y-6'>
          <div className='inline-flex items-center bg-secondary-500 text-white px-6 py-3 rounded-full text-sm font-medium'>
            <Users className='h-5 w-5 mr-2' />
            Para Dueños de Negocio
          </div>
          <h1 className='text-display text-4xl sm:text-5xl font-bold text-gray-900'>
            Controla tu negocio desde cualquier lugar
          </h1>
          <p className='text-body text-xl text-gray-600 max-w-3xl mx-auto'>
            Con VendeMás tienes supervisión total, sin importar si estás en el
            puesto o en casa
          </p>
        </header>

        {/* Main features section */}
        <section className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Left side - Features */}
          <div className='space-y-8'>
            <h2 className='text-display text-3xl font-bold text-gray-900'>
              Administra con confianza
            </h2>
            <div className='space-y-8'>
              {ownerFeatures.map((feature, index) => (
                <div key={index} className='flex items-start space-x-6 group'>
                  <div className='bg-white group-hover:bg-primary-500 w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300 flex-shrink-0'>
                    <feature.icon className='h-8 w-8 text-primary-500 group-hover:text-white' />
                  </div>
                  <div>
                    <h3 className='text-display text-xl font-semibold text-gray-900 mb-3'>
                      {feature.title}
                    </h3>
                    <p className='text-body text-gray-600 leading-relaxed'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Mock dashboard */}
          <div className='relative'>
            <div className='bg-white rounded-2xl shadow-2xl p-8 border border-gray-200'>
              {/* Dashboard header */}
              <div className='flex justify-between items-center mb-6'>
                <h4 className='text-display text-lg font-semibold'>
                  Mi Negocio - Hoy
                </h4>
                <div className='flex items-center space-x-2'>
                  <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                  <span className='text-sm text-gray-600'>En línea</span>
                </div>
              </div>

              {/* Stats cards */}
              <div className='grid grid-cols-2 gap-4 mb-6'>
                <div className='bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-lg'>
                  <div className='text-2xl font-bold'>$2,340</div>
                  <div className='text-sm opacity-90'>Ventas del día</div>
                </div>
                <div className='bg-gradient-to-r from-tertiary-500 to-tertiary-600 text-black p-4 rounded-lg'>
                  <div className='text-2xl font-bold'>156</div>
                  <div className='text-sm opacity-90'>Transacciones</div>
                </div>
              </div>

              {/* Chart placeholder */}
              <div className='bg-gray-50 rounded-lg p-4 mb-6'>
                <h5 className='text-sm font-medium text-gray-700 mb-3'>
                  Ventas por hora
                </h5>
                <div className='flex items-end space-x-1 h-20'>
                  {[40, 65, 45, 80, 60, 90, 75, 85].map((height, i) => (
                    <div
                      key={i}
                      className='bg-primary-500 rounded-t'
                      style={{ height: `${height}%`, width: '12%' }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div>
                <h5 className='text-sm font-medium text-gray-700 mb-3'>
                  Actividad reciente
                </h5>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Venta - Tacos x3</span>
                    <span className='text-green-600 font-medium'>+$45.00</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Pago CoDi recibido</span>
                    <span className='text-green-600 font-medium'>+$60.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <div className='absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium'>
              ¡Inventario bajo en Refrescos!
            </div>
          </div>
        </section>

        {/* Management tools section */}
        <section>
          <div className='text-center mb-12'>
            <h2 className='text-display text-3xl font-bold text-gray-900 mb-4'>
              Herramientas de Gestión
            </h2>
            <p className='text-body text-lg text-gray-600 max-w-2xl mx-auto'>
              Todo lo que necesitas para administrar tu negocio de manera
              eficiente
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {managementTools.map((tool, index) => (
              <div
                key={index}
                className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'
              >
                <div className='bg-secondary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4'>
                  <tool.icon className='h-6 w-6 text-secondary-500' />
                </div>
                <h3 className='text-display text-lg font-semibold text-gray-900 mb-3'>
                  {tool.title}
                </h3>
                <ul className='space-y-2'>
                  {tool.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className='flex items-center space-x-2'
                    >
                      <div className='w-1.5 h-1.5 bg-secondary-500 rounded-full'></div>
                      <span className='text-body text-sm text-gray-600'>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className='bg-gray-50 rounded-2xl p-12'>
          <h2 className='text-display text-3xl text-gray-900 text-center mb-12'>
            Preguntas frecuentes para dueños
          </h2>

          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {faqs.map((faq, index) => (
              <div key={index} className='space-y-3'>
                <h3 className='text-display text-lg font-semibold text-gray-900'>
                  {faq.question}
                </h3>
                <p className='text-body text-gray-600'>{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className='text-center mt-12'>
            <a
              href='/preguntas-frecuentes'
              className='inline-block border-2 border-primary-500 text-primary-500 hover:bg-primary-50 font-semibold px-8 py-3 rounded-lg transition-all duration-200 btn-focus'
            >
              Ver todas las preguntas frecuentes
            </a>
          </div>
        </section>

        {/* CTA section */}
        <section className='bg-secondary-500 rounded-2xl p-12 text-center text-white'>
          <h2 className='text-display text-3xl font-bold mb-4'>
            Toma el control total de tu negocio
          </h2>
          <p className='text-lg opacity-90 mb-8 max-w-2xl mx-auto'>
            Configura VendeMás una vez y supervisa todo desde tu teléfono.
            Perfecto para dueños con múltiples puestos.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-secondary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus'>
              Ver demo para dueños
            </button>
            <button className='border-2 border-white text-white hover:bg-white hover:text-secondary-500 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus'>
              Hablar con especialista
            </button>
          </div>
        </section>
      </main>
      <Footer />
      {/* Analytics Components */}
      <GoogleAnalytics />
      <FirebaseAnalytics />
    </>
  );
}
