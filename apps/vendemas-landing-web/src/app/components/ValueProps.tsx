import { TrendingUp, Shield, Clock, Users } from 'lucide-react';

export default function ValueProps() {
  const valueProps = [
    {
      icon: TrendingUp,
      title: 'Aumenta tus ventas',
      description: 'Acepta más formas de pago y nunca pierdas una venta por falta de cambio.',
      stat: '+40%',
      statLabel: 'incremento promedio en ventas'
    },
    {
      icon: Shield,
      title: 'Pagos seguros',
      description: 'Integración certificada con CoDi para pagos seguros y sin comisiones.',
      stat: '100%',
      statLabel: 'transacciones seguras'
    },
    {
      icon: Clock,
      title: 'Funciona siempre',
      description: 'Modo offline que sincroniza automáticamente cuando hay conexión.',
      stat: '24/7',
      statLabel: 'disponibilidad garantizada'
    },
    {
      icon: Users,
      title: 'Fácil de usar',
      description: 'Interfaz intuitiva que tu personal aprenderá en minutos.',
      stat: '< 5min',
      statLabel: 'tiempo de aprendizaje'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir VendeMás?
          </h2>
          <p className="text-body text-xl text-gray-600 max-w-3xl mx-auto">
            Diseñado específicamente para las necesidades de los vendedores ambulantes mexicanos
          </p>
        </div>

        {/* Value propositions grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:bg-gradient-to-br hover:from-white hover:to-primary-50"
            >
              {/* Icon */}
              <div className="bg-primary-100 group-hover:bg-primary-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
                <prop.icon className="h-8 w-8 text-primary-500 group-hover:text-white" aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="text-display text-xl font-bold text-gray-900 mb-3">
                {prop.title}
              </h3>
              <p className="text-body text-gray-600 mb-4 leading-relaxed">
                {prop.description}
              </p>

              {/* Stat */}
              <div className="border-t border-gray-100 pt-4">
                <div className="text-3xl font-bold text-primary-500 mb-1">
                  {prop.stat}
                </div>
                <div className="text-body text-sm text-gray-500">
                  {prop.statLabel}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-primary rounded-2xl p-12 text-white">
          <h3 className="text-display text-2xl sm:text-3xl font-bold mb-4">
            Únete a miles de vendedores que ya aumentaron sus ingresos
          </h3>
          <p className="text-body text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Sin costos ocultos, sin permanencia. Comienza a usar VendeMás hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus">
              Comenzar gratis
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus">
              Hablar con ventas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}