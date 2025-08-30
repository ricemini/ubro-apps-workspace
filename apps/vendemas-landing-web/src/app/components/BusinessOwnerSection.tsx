import { BarChart3, Users, Shield, Smartphone, TrendingUp, Clock, Settings, Bell } from 'lucide-react';

export default function BusinessOwnerSection() {
  const ownerFeatures = [
    {
      icon: BarChart3,
      title: 'Dashboard Ejecutivo',
      description: 'Ve el desempeño de tu negocio en tiempo real desde cualquier lugar.',
    },
    {
      icon: Users,
      title: 'Control de Personal',
      description: 'Gestiona empleados, horarios y permisos con facilidad total.',
    },
    {
      icon: Shield,
      title: 'Supervisión Segura',
      description: 'Monitorea todas las transacciones con alertas automáticas.',
    },
    {
      icon: TrendingUp,
      title: 'Análisis de Crecimiento',
      description: 'Identifica oportunidades y optimiza tus estrategias de venta.',
    }
  ];

  const managementTools = [
    {
      icon: Clock,
      title: 'Horarios y Turnos',
      features: ['Asignación automática', 'Control de asistencia', 'Reportes de productividad']
    },
    {
      icon: Settings,
      title: 'Configuración Remota',
      features: ['Cambios desde tu casa', 'Actualizaciones instantáneas', 'Backup automático']
    },
    {
      icon: Bell,
      title: 'Alertas Inteligentes',
      features: ['Ventas inusuales', 'Inventario bajo', 'Problemas de sistema']
    },
    {
      icon: Smartphone,
      title: 'App del Dueño',
      features: ['Vista gerencial', 'Reportes ejecutivos', 'Control remoto total']
    }
  ];

  return (
    <section id="mi-negocio" className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-secondary-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="h-4 w-4 mr-2" />
            Para Dueños de Negocio
          </div>
          <h2 className="text-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Controla tu negocio desde cualquier lugar
          </h2>
          <p className="text-body text-xl text-gray-600 max-w-3xl mx-auto">
            Con VendeMás tienes supervisión total, sin importar si estás en el puesto o en casa
          </p>
        </div>

        {/* Main features */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left side - Features */}
          <div>
            <h3 className="text-display text-2xl font-bold text-gray-900 mb-8">
              Administra con confianza
            </h3>
            <div className="space-y-6">
              {ownerFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="bg-white group-hover:bg-primary-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-primary-500 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-display text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-body text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Mock dashboard */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              {/* Dashboard header */}
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-display text-lg font-semibold">Mi Negocio - Hoy</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">En línea</span>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-lg">
                  <div className="text-2xl font-bold">$2,340</div>
                  <div className="text-sm opacity-90">Ventas del día</div>
                </div>
                <div className="bg-gradient-to-r from-tertiary-500 to-tertiary-600 text-black p-4 rounded-lg">
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm opacity-90">Transacciones</div>
                </div>
              </div>

              {/* Chart placeholder */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Ventas por hora</h5>
                <div className="flex items-end space-x-1 h-20">
                  {[40, 65, 45, 80, 60, 90, 75, 85].map((height, i) => (
                    <div
                      key={i}
                      className="bg-primary-500 rounded-t"
                      style={{ height: `${height}%`, width: '12%' }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3">Actividad reciente</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Venta - Tacos x3</span>
                    <span className="text-green-600 font-medium">+$45.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pago CoDi recibido</span>
                    <span className="text-green-600 font-medium">+$60.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
              ¡Inventario bajo en Refrescos!
            </div>
          </div>
        </div>

        {/* Management tools */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {managementTools.map((tool, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="bg-secondary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <tool.icon className="h-6 w-6 text-secondary-500" />
              </div>
              <h4 className="text-display text-lg font-semibold text-gray-900 mb-3">
                {tool.title}
              </h4>
              <ul className="space-y-2">
                {tool.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full"></div>
                    <span className="text-body text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="bg-secondary-500 rounded-2xl p-12 text-center text-white">
          <h3 className="text-display text-2xl sm:text-3xl font-bold mb-4">
            Toma el control total de tu negocio
          </h3>
          <p className="text-body text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Configura VendeMás una vez y supervisa todo desde tu teléfono. Perfecto para dueños con múltiples puestos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-secondary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus">
              Ver demo para dueños
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-secondary-500 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus">
              Hablar con especialista
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}