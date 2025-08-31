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
} from 'lucide-react';

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
    <section id='caracteristicas' className='py-20 bg-white'>
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

        {/* Bottom CTA */}
        <div className='mt-16 text-center'>
          <div className='bg-gradient-to-r from-primary-50 to-tertiary-50 rounded-2xl p-12'>
            <h3 className='text-display text-2xl sm:text-3xl font-bold text-gray-900 mb-4'>
              ¿Necesitas alguna característica específica?
            </h3>
            <p className='text-body text-lg text-gray-600 mb-8 max-w-2xl mx-auto'>
              Nuestro equipo está constantemente mejorando VendeMás basado en
              las necesidades de nuestros usuarios.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus'>
                Solicitar característica
              </button>
              <button className='border-2 border-primary-500 text-primary-500 hover:bg-primary-50 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus'>
                Ver roadmap
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
