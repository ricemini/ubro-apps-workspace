import { Metadata } from 'next';
import HerramientasPageClient from './HerramientasPageClient';

export const metadata: Metadata = {
  title: 'Herramientas para tu negocio — VendeMás',
  description:
    'Herramientas completas para PyMES: cobros CoDi, catálogo desde una foto, inventario, promociones con IA, facturación y más.',
  openGraph: {
    title: 'Herramientas para tu negocio — VendeMás',
    description:
      'Herramientas completas para PyMES: cobros CoDi, catálogo desde una foto, inventario, promociones con IA, facturación y más.',
  },
  alternates: {
    canonical: '/soluciones-con-ia',
  },
};

// const features = [
//   {
//     id: 'cobros-codi',
//     title: 'Cobros por CoDi',
//     description: 'Acepta pagos digitales sin comisiones bancarias',
//     bullets: [
//       'QR efímero por venta, pago en segundos',
//       'Sin comisiones bancarias por transacción',
//       'Comprobante por WhatsApp o email',
//     ],
//     image: '/mockups/codi.webp',
//   },
//   {
//     id: 'catalogo-desde-una-foto',
//     title: 'Catálogo desde una foto',
//     description: 'IA que convierte fotos de menús en catálogos digitales',
//     bullets: [
//       'Escanea tu menú físico con la cámara',
//       'IA detecta productos y precios automáticamente',
//       'Edita y personaliza antes de publicar',
//     ],
//     image: '/mockups/ai-scan.webp',
//   },
//   {
//     id: 'inventario',
//     title: 'Inventario inteligente',
//     description: 'Control automático de stock y alertas',
//     bullets: [
//       'Seguimiento en tiempo real de productos',
//       'Alertas cuando se agota el inventario',
//       'Predicciones de demanda con IA',
//     ],
//     image: '/mockups/inventory.webp',
//   },
//   {
//     id: 'promos-con-ia',
//     title: 'Promos con IA',
//     description: 'Promociones inteligentes que aumentan ventas',
//     bullets: [
//       'IA sugiere combos y descuentos óptimos',
//       'Promociones automáticas por temporada',
//       'A/B testing de ofertas',
//     ],
//     image: '/mockups/promos.webp',
//   },
//   {
//     id: 'estadisticas-con-ia',
//     title: 'Estadísticas con IA',
//     description: 'Insights inteligentes para hacer crecer tu negocio',
//     bullets: [
//       'Análisis predictivo de ventas',
//       'Recomendaciones personalizadas',
//       'Reportes automáticos por WhatsApp',
//     ],
//     image: '/mockups/analytics.webp',
//   },
//   {
//     id: 'facturacion',
//     title: 'Facturación automática',
//     description: 'Cumple con el SAT sin complicaciones',
//     bullets: [
//       'Facturas electrónicas automáticas',
//       'Cumplimiento fiscal garantizado',
//       'Integración con contadores',
//     ],
//     image: '/mockups/billing.webp',
//   },
//   {
//     id: 'mapa',
//     title: 'Mapa de ubicaciones',
//     description: 'Ayuda a tus clientes a encontrarte',
//     bullets: [
//       'Comparte tu ubicación en tiempo real',
//       'Rutas optimizadas para vendedores móviles',
//       'Historial de ubicaciones más rentables',
//     ],
//     image: '/mockups/map.webp',
//   },
//   {
//     id: 'offline',
//     title: 'Modo offline',
//     description: 'Vende sin internet, sincroniza después',
//     bullets: [
//       'Funciona completamente sin conexión',
//       'Sincronización automática al conectarse',
//       'Respaldo seguro en la nube',
//     ],
//     image: '/mockups/offline.webp',
//   },
//   {
//     id: 'cuentas-abiertas',
//     title: 'Cuentas abiertas',
//     description: 'Maneja clientes frecuentes y crédito',
//     bullets: [
//       'Sistema de crédito para clientes de confianza',
//       'Recordatorios automáticos de pago',
//       'Historial completo por cliente',
//     ],
//     image: '/mockups/accounts.webp',
//   },
//   {
//     id: 'colaboradores',
//     title: 'Gestión de colaboradores',
//     description: 'Administra tu equipo desde una sola app',
//     bullets: [
//       'Múltiples usuarios con permisos específicos',
//       'Seguimiento de ventas por empleado',
//       'Horarios y turnos automatizados',
//     ],
//     image: '/mockups/team.webp',
//   },
// ];

// const filterChips = [
//   'Cobros CoDi',
//   'Catálogo desde una foto',
//   'Inventario',
//   'Promos con IA',
//   'Estadísticas con IA',
//   'Facturación',
//   'Mapa',
//   'Offline',
//   'Cuentas abiertas',
//   'Colaboradores',
// ];

// const faqs = [
//   {
//     question: '¿Todas las funciones están incluidas en el plan gratuito?',
//     answer:
//       'El plan gratuito incluye funciones básicas. Las funciones con IA y avanzadas requieren suscripción.',
//   },
//   {
//     question: '¿Qué tan precisa es la IA para escanear menús?',
//     answer:
//       'Nuestra IA tiene 95% de precisión. Siempre puedes revisar y editar antes de confirmar.',
//   },
//   {
//     question: '¿Puedo usar VendeMás sin internet?',
//     answer:
//       'Sí, todas las funciones principales funcionan offline y se sincronizan cuando hay conexión.',
//   },
//   {
//     question: '¿Hay límite en el número de productos?',
//     answer:
//       'El plan gratuito permite hasta 100 productos. Los planes pagos no tienen límite.',
//   },
// ];

export default function HerramientasPage(): JSX.Element {
  return <HerramientasPageClient />;
}
