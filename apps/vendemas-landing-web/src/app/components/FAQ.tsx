'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CreditCard,
  Settings,
  Shield,
} from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('general');

  const faqCategories = [
    {
      id: 'general',
      name: 'General',
      icon: HelpCircle,
      description: 'Preguntas básicas sobre VendeMás',
    },
    {
      id: 'precios',
      name: 'Precios y Planes',
      icon: CreditCard,
      description: 'Todo sobre costos y suscripciones',
    },
    {
      id: 'funcionalidad',
      name: 'Funcionalidad',
      icon: Settings,
      description: 'Cómo usar las características',
    },
    {
      id: 'seguridad',
      name: 'Seguridad',
      icon: Shield,
      description: 'Protección y respaldos',
    },
  ];

  const faqs = {
    general: [
      {
        question: '¿VendeMás realmente funciona sin internet?',
        answer:
          'Sí, VendeMás funciona completamente offline. Puedes registrar ventas, consultar inventario y generar tickets sin conexión. Cuando recuperes internet, toda la información se sincroniza automáticamente con la nube.',
      },
      {
        question: '¿Qué tan fácil es configurar el sistema?',
        answer:
          'La configuración básica toma menos de 10 minutos. Solo necesitas descargar la app, crear tu cuenta, agregar algunos productos y ¡listo! Nuestro asistente te guía paso a paso.',
      },
      {
        question: '¿Necesito equipo especial para usar VendeMás?',
        answer:
          'No, VendeMás funciona en cualquier smartphone Android o iPhone. No necesitas comprar terminales especiales, impresoras o equipo adicional para comenzar.',
      },
    ],
    precios: [
      {
        question: '¿Hay costos de configuración?',
        answer:
          'No, VendeMás no tiene costos de configuración. Puedes empezar a usar el plan gratuito inmediatamente.',
      },
      {
        question: '¿Puedo cambiar de plan después?',
        answer:
          'Sí, puedes cambiar de plan en cualquier momento. Los cambios se aplican inmediatamente y se prorratea el costo según corresponda.',
      },
      {
        question: '¿Hay permanencia mínima?',
        answer:
          'No hay permanencia mínima. Puedes cancelar tu suscripción en cualquier momento sin penalizaciones.',
      },
      {
        question: '¿Qué incluye el soporte en cada plan?',
        answer:
          'El plan gratuito incluye soporte por chat. Los planes pagos tienen soporte prioritario, telefónico y acceso a nuestro gerente de cuenta.',
      },
      {
        question: '¿Cómo funciona la prueba gratuita de 30 días?',
        answer:
          'Puedes probar cualquier plan pago gratis por 30 días completos. No se requiere tarjeta de crédito y puedes cancelar en cualquier momento sin costo.',
      },
      {
        question: '¿Hay descuentos por pago anual?',
        answer:
          'Sí, ofrecemos 2 meses gratis al pagar anualmente. También tenemos descuentos especiales para múltiples ubicaciones.',
      },
    ],
    funcionalidad: [
      {
        question: '¿Puedo usar VendeMás con varios empleados?',
        answer:
          'Sí, en los planes pagos puedes tener múltiples usuarios con diferentes permisos. Cada empleado puede tener su propia sesión y tú puedes ver las ventas de cada uno por separado.',
      },
      {
        question: '¿Cómo manejo el inventario si vendo productos variables?',
        answer:
          'VendeMás es perfecto para productos variables como tacos, tortas, etc. Puedes configurar productos sin seguimiento de inventario o usar ingredientes base para calcular disponibilidad automáticamente.',
      },
      {
        question: '¿Puedo generar facturas electrónicas?',
        answer:
          'Sí, en los planes pagos incluimos facturación electrónica cumpliendo con todos los requisitos del SAT. También puedes generar tickets simples y enviarlos por WhatsApp o email.',
      },
    ],
    seguridad: [
      {
        question: '¿Qué tan segura es mi información?',
        answer:
          'Usamos encriptación de nivel bancario para proteger tu información. Todos los datos se respaldan automáticamente en la nube y cumplimos con estándares internacionales de seguridad PCI DSS.',
      },
      {
        question: '¿Qué pasa si se me daña el teléfono?',
        answer:
          'Toda tu información está respaldada en la nube. Solo necesitas instalar VendeMás en tu nuevo dispositivo e iniciar sesión para recuperar todo: productos, ventas, configuración y reportes.',
      },
      {
        question: '¿Cómo obtengo soporte técnico?',
        answer:
          'Ofrecemos soporte por chat en vivo, centro de ayuda con videos tutoriales, y soporte telefónico en planes pagos. Nuestro equipo habla español y entiende las necesidades del comercio mexicano.',
      },
    ],
  };

  const paymentFaqs = [
    {
      question: '¿Cómo funcionan los pagos CoDi?',
      answer:
        'CoDi te permite recibir pagos directamente a tu cuenta bancaria mediante códigos QR. Es completamente seguro, certificado por Banxico y sin comisiones adicionales. El dinero llega a tu cuenta en segundos.',
    },
    {
      question: '¿VendeMás cobra comisiones por los pagos?',
      answer:
        'No cobramos comisiones por los pagos CoDi ni transferencias bancarias. Solo pagas la suscripción mensual del plan que elijas. Los pagos con tarjeta sí tienen comisiones bancarias estándar.',
    },
    {
      question: '¿Qué bancos son compatibles con CoDi?',
      answer:
        'CoDi funciona con todos los bancos mexicanos principales: BBVA, Banorte, Santander, Citibanamex, HSBC, Scotiabank, BanBajío, Banco Azteca, y muchos más.',
    },
  ];

  // Add payment FAQs to the general category for now
  faqs.general = [...faqs.general, ...paymentFaqs];

  const toggleQuestion = (questionIndex: number) => {
    setOpenIndex(openIndex === questionIndex ? null : questionIndex);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenIndex(null);
  };

  return (
    <section id='faq' className='py-20 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            Preguntas frecuentes
          </h2>
          <p className='text-body text-xl text-gray-600 max-w-2xl mx-auto'>
            Resolvemos las dudas más comunes sobre VendeMás y cómo puede ayudar
            a tu negocio
          </p>
        </div>

        {/* Category Tabs */}
        <div className='mb-12'>
          <div className='flex flex-wrap justify-center gap-2 mb-8'>
            {faqCategories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 btn-focus ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white card-border'
                    : 'bg-white text-gray-700 hover:bg-primary-50 card-border'
                }`}
              >
                <category.icon className='h-5 w-5' />
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Category Description */}
          <div className='text-center mb-8'>
            <p className='text-body text-lg text-gray-600'>
              {
                faqCategories.find(cat => cat.id === activeCategory)
                  ?.description
              }
            </p>
          </div>
        </div>

        {/* FAQ Questions */}
        <div className='space-y-4 mb-16'>
          {faqs[activeCategory as keyof typeof faqs]?.map(
            (faq, questionIndex) => {
              const isOpen = openIndex === questionIndex;

              return (
                <div
                  key={questionIndex}
                  className='bg-white rounded-xl card-border hover:shadow-md transition-shadow duration-200'
                >
                  <button
                    onClick={() => toggleQuestion(questionIndex)}
                    className='w-full px-6 py-6 text-left flex justify-between items-center btn-focus rounded-xl'
                    aria-expanded={isOpen}
                  >
                    <span className='text-display text-lg font-semibold text-gray-900 pr-6'>
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className='h-5 w-5 text-primary-500 flex-shrink-0' />
                    ) : (
                      <ChevronDown className='h-5 w-5 text-gray-500 flex-shrink-0' />
                    )}
                  </button>

                  {isOpen && (
                    <div className='px-6 pb-6'>
                      <div className='pt-2 border-t border-gray-100'>
                        <p className='text-body text-gray-600 leading-relaxed'>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>

        {/* Quick Links */}
        <div className='mb-16'>
          <h3 className='text-display text-2xl font-bold text-gray-900 text-center mb-8'>
            Enlaces rápidos
          </h3>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {faqCategories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className='bg-white rounded-xl p-6 card-border hover:shadow-md hover:border-primary-200 transition-all duration-200 text-left group'
              >
                <div className='bg-primary-100 group-hover:bg-primary-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-200'>
                  <category.icon className='h-6 w-6 text-primary-500 group-hover:text-white' />
                </div>
                <h4 className='text-display text-lg font-semibold text-gray-900 mb-2'>
                  {category.name}
                </h4>
                <p className='text-body text-sm text-gray-600'>
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Contact support */}
        <div className='mt-16 text-center bg-primary-500 rounded-2xl p-12 card-border'>
          <h3 className='text-display text-2xl font-bold text-white mb-4'>
            ¿No encontraste tu respuesta?
          </h3>
          <p className='text-body text-lg text-white opacity-90 mb-8 max-w-2xl mx-auto'>
            Nuestro equipo de soporte está listo para ayudarte con cualquier
            duda específica sobre tu negocio.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus'>
              Contactar soporte
            </button>
            <button className='border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus'>
              Agendar demostración
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
