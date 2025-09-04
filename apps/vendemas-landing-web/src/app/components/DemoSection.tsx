/**
 * DemoSection Component
 *
 * A comprehensive demo showcase section that combines compelling content with
 * a visual placeholder for video demonstrations. Features a two-column layout
 * with statistics, persuasive copy, and a prominent CTA button.
 *
 * Key Features:
 * - Two-column responsive layout (content + video placeholder)
 * - Compelling statistics to build trust and urgency
 * - Gradient backgrounds for visual appeal
 * - Video placeholder with play button design
 * - Prominent CTA button for user engagement
 * - Responsive design that stacks on mobile
 * - Professional styling with shadows and gradients
 *
 * Content Strategy:
 * - Headline that creates curiosity about the demo
 * - Descriptive text that explains the value proposition
 * - Key statistics (2.5min average, 99.9% uptime) for credibility
 * - Clear call-to-action to view the interactive demo
 *
 * Visual Design:
 * - Secondary color background for brand consistency
 * - White text on colored background for high contrast
 * - Gradient video placeholder for visual interest
 * - Play button icon to indicate video content
 * - Professional card-based layout
 *
 * Responsive Behavior:
 * - Desktop: Side-by-side two-column layout
 * - Mobile: Stacked layout with content on top
 * - Maintains readability and usability across all screen sizes
 *
 * Usage:
 * - Typically placed after feature explanations
 * - Used to bridge the gap between features and conversion
 * - Provides social proof through statistics
 * - Encourages deeper engagement with the product
 */
export default function DemoSection(): React.JSX.Element {
  return (
    <div className='bg-secondary-500 rounded-2xl overflow-hidden'>
      <div className='grid lg:grid-cols-2 gap-0'>
        {/* Content */}
        <div className='p-12 text-white'>
          <h3 className='text-display text-2xl sm:text-3xl font-bold mb-6'>
            Ve VendeMás en acción
          </h3>
          <p className='text-body text-lg opacity-90 mb-8 leading-relaxed'>
            Mira cómo otros vendedores como tú están transformando sus negocios
            con nuestra plataforma.
          </p>

          {/* Stats */}
          <div
            className='grid grid-cols-2 gap-6 mb-8'
            role='region'
            aria-label='Estadísticas de rendimiento'
          >
            <div>
              <div
                className='text-3xl font-bold text-tertiary-500 mb-2'
                aria-label='2.5 minutos'
              >
                2.5min
              </div>
              <div className='text-sm opacity-80'>
                Tiempo promedio por venta
              </div>
            </div>
            <div>
              <div
                className='text-3xl font-bold text-tertiary-500 mb-2'
                aria-label='99.9 por ciento'
              >
                99.9%
              </div>
              <div className='text-sm opacity-80'>
                Disponibilidad del sistema
              </div>
            </div>
          </div>

          <button
            className='bg-white text-secondary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-200 btn-focus focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2'
            aria-label='Ver demostración interactiva de VendeMás en acción'
          >
            Ver demo interactivo
          </button>
        </div>

        {/* Video placeholder */}
        <div
          className='relative bg-gradient-to-br from-primary-500 to-tertiary-500 p-12 flex items-center justify-center'
          role='img'
          aria-label='Vista previa del video demostrativo de VendeMás'
        >
          <div className='bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-center text-white'>
            <div
              className='w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4'
              role='img'
              aria-label='Botón de reproducción'
            >
              <div className='w-0 h-0 border-l-8 border-l-white border-y-6 border-y-transparent ml-1'></div>
            </div>
            <h4 className='font-semibold text-lg mb-2'>Video demostrativo</h4>
            <p className='text-sm opacity-90'>
              Ve cómo usar VendeMás paso a paso
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
