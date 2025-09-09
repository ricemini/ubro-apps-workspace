import {
  CreditCard,
  Wifi,
  BarChart3,
  Shield,
  Users,
  Package,
  Clock,
  Smartphone,
  Receipt,
  PieChart,
  Bell,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import React from 'react';

export default function Features() {
  const features = [
    {
      category: 'Pagos y Transacciones',
      icon: CreditCard,
      items: [
        'CoDi certificado y seguros',
        'Efectivo, tarjetas y transferencias',
        'Código QR para pagos rápidos',
        'Sin comisiones ocultas',
      ],
    },
    {
      category: 'Funcionalidad Offline',
      icon: Wifi,
      items: [
        'Funciona sin internet',
        'Sincronización automática',
        'Respaldo en la nube',
        'Nunca pierdas una venta',
      ],
    },
    {
      category: 'Gestión de Inventario',
      icon: Package,
      items: [
        'Control de stock en tiempo real',
        'Alertas de productos agotados',
        'Categorización inteligente',
        'Códigos de barras y QR',
      ],
    },
    {
      category: 'Reportes y Analytics',
      icon: BarChart3,
      items: [
        'Ventas por día, semana y mes',
        'Productos más vendidos',
        'Análisis de ganancias',
        'Exportar a Excel',
      ],
    },
    {
      category: 'Seguridad',
      icon: Shield,
      items: [
        'Encriptación bancaria',
        'Respaldos automáticos',
        'Control de acceso por usuario',
        'Cumplimiento PCI DSS',
      ],
    },
    {
      category: 'Gestión de Personal',
      icon: Users,
      items: [
        'Múltiples usuarios',
        'Permisos personalizados',
        'Seguimiento de ventas por empleado',
        'Horarios y turnos',
      ],
    },
    {
      category: 'Interfaz Móvil',
      icon: Smartphone,
      items: [
        'Optimizado para teléfonos',
        'Funciona en tablets',
        'Modo nocturno',
        'Interfaz intuitiva',
      ],
    },
    {
      category: 'Comprobantes',
      icon: Receipt,
      items: [
        'Tickets digitales',
        'Envío por WhatsApp/email',
        'Facturas electrónicas',
        'Cumplimiento SAT',
      ],
    },
    {
      category: 'Análisis Avanzado',
      icon: PieChart,
      items: [
        'Dashboard ejecutivo',
        'Predicción de ventas',
        'Análisis de temporadas',
        'KPIs del negocio',
      ],
    },
    {
      category: 'Notificaciones',
      icon: Bell,
      items: [
        'Alertas de inventario bajo',
        'Recordatorios de pagos',
        'Notificaciones de ventas',
        'Actualizaciones del sistema',
      ],
    },
    {
      category: 'Horarios Flexibles',
      icon: Clock,
      items: [
        'Configuración de horarios',
        'Registro de tiempo trabajado',
        'Pausas y descansos',
        'Reportes de productividad',
      ],
    },
    {
      category: 'Soporte 24/7',
      icon: Headphones,
      items: [
        'Chat en vivo',
        'Soporte telefónico',
        'Videos tutoriales',
        'Centro de ayuda',
      ],
    },
  ];

  return (
    <section id='funciones' className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            Todas las herramientas que necesitas
          </h2>
          <p className='text-body text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
            VendeMás incluye todo lo necesario para modernizar tu negocio
            ambulante
          </p>
          <div className='flex flex-wrap justify-center gap-3'>
            <span className='bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium'>
              + de 50 características
            </span>
            <span className='bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium'>
              Actualizaciones gratuitas
            </span>
            <span className='bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium'>
              Sin límites de uso
            </span>
          </div>
        </div>

        {/* Features grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 group'
            >
              {/* Icon and title */}
              <div className='flex items-center mb-4'>
                <div className='bg-primary-100 group-hover:bg-primary-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4 transition-colors duration-300'>
                  <feature.icon
                    className='h-6 w-6 text-primary-500 group-hover:text-white'
                    aria-hidden='true'
                  />
                </div>
                <h3 className='text-display text-lg font-bold text-gray-900'>
                  {feature.category}
                </h3>
              </div>

              {/* Feature list */}
              <ul className='space-y-2'>
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className='flex items-start space-x-2'>
                    <div className='w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0'></div>
                    <span className='text-body text-sm text-gray-600'>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Enterprise Section - Advanced solutions for larger businesses */}
        <section
          className='mt-16 bg-gradient-to-br from-secondary-500 via-secondary-600 to-primary-600 dark:from-secondary-600 dark:via-secondary-700 dark:to-primary-700 rounded-3xl p-12 text-center text-white shadow-2xl'
          aria-labelledby='enterprise-title'
          aria-describedby='enterprise-description'
        >
          <div className='max-w-4xl mx-auto'>
            {/* Enterprise Section Header */}
            <h3
              id='enterprise-title'
              className='text-display text-3xl sm:text-4xl font-bold mb-6'
            >
              ¿Necesitas algo más personalizado?
            </h3>
            <p
              id='enterprise-description'
              className='text-body text-xl opacity-90 dark:opacity-80 mb-10 max-w-3xl mx-auto leading-relaxed'
            >
              Para cadenas de vendedores o necesidades específicas, creamos
              soluciones a medida con soporte dedicado.
            </p>

            {/* Enterprise Action Buttons */}
            <div
              className='flex flex-col sm:flex-row gap-4 justify-center mb-8'
              role='group'
              aria-label='Acciones empresariales'
            >
              {/* Primary Enterprise CTA - Contact sales */}
              <button
                className='bg-white text-secondary-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-secondary-700 dark:hover:bg-gray-200 font-bold px-10 py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'
                aria-label='Contactar con el equipo de ventas para soluciones personalizadas'
                type='button'
              >
                Hablar con ventas
              </button>
              {/* Secondary Enterprise CTA - View case studies */}
              <button
                className='border-2 border-white text-white hover:bg-white hover:text-secondary-600 dark:border-gray-300 dark:hover:bg-gray-100 dark:hover:text-secondary-700 font-bold px-10 py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'
                aria-label='Ver casos de éxito de clientes empresariales'
                type='button'
              >
                Ver casos de éxito
              </button>
            </div>

            {/* FAQ Link - Additional support information */}
            <div className='text-center'>
              <a
                href='/faq'
                className='inline-flex items-center text-white hover:text-tertiary-300 dark:hover:text-tertiary-200 font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:bg-white/10 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'
                aria-label='Ver preguntas frecuentes completas'
              >
                ¿Tienes más preguntas? Ver FAQ completo
                {React.createElement(ArrowRight, {
                  className: 'h-5 w-5 ml-2',
                  'aria-hidden': 'true',
                })}
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
