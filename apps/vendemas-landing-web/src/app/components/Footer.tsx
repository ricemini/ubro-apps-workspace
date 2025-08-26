import { Smartphone, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    producto: [
      { name: 'Características', href: '/caracteristicas' },
      { name: 'Cómo funciona', href: '/#como-funciona' },
      { name: 'Precios', href: '/#precios' },
      { name: 'Casos de éxito', href: '/casos-exito' },
      { name: 'Actualizaciones', href: '/actualizaciones' }
    ],
    soporte: [
      { name: 'Centro de ayuda', href: '/ayuda' },
      { name: 'Contacto', href: '/contacto' },
      { name: 'Preguntas frecuentes', href: '/faq' },
      { name: 'Videos tutoriales', href: '/tutoriales' },
      { name: 'Estado del sistema', href: '/estado' },
      { name: 'Reportar problema', href: '/reporte' },
    ],
    empresa: [
      { name: 'Acerca de VendeMás', href: '/acerca' },
      { name: 'Carreras', href: '/carreras' },
      { name: 'Prensa', href: '/prensa' },
      { name: 'Socios', href: '/socios' },
      { name: 'Afiliados', href: '/afiliados' }
    ],
    legal: [
      { name: 'Términos de servicio', href: '/terminos' },
      { name: 'Política de privacidad', href: '/privacidad' },
      { name: 'Política de cookies', href: '/cookies' },
      { name: 'Cumplimiento', href: '/cumplimiento' },
      { name: 'GDPR', href: '/gdpr' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'YouTube', href: '#', icon: Youtube }
  ];

  return (
    <footer className="bg-secondary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <span className="app-name text-2xl text-white">VendeMás</span>
            </div>
            
            <p className="text-body text-secondary-200 mb-6 leading-relaxed">
              El sistema de punto de venta móvil diseñado especialmente para vendedores ambulantes en México y Latinoamérica. Aumenta tus ventas, acepta más formas de pago y controla tu negocio desde tu smartphone.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary-300" />
                <a href="mailto:hola@vendemas.mx" className="text-white hover:text-tertiary-500 transition-colors btn-focus rounded px-2 py-1">
                  hola@vendemas.mx
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary-300" />
                <a href="tel:+525555551234" className="text-white hover:text-tertiary-500 transition-colors btn-focus rounded px-2 py-1">
                  +52 (55) 5555-1234
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-secondary-300" />
                <span className="text-white">México, CDMX</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="bg-secondary-600 hover:bg-primary-500 p-2 rounded-lg transition-colors duration-200 btn-focus"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-8">
            <div>
              <h3 className="text-display font-semibold text-white mb-4">Producto</h3>
              <ul className="space-y-3">
                {footerLinks.producto.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-body text-white hover:text-tertiary-500 transition-colors duration-200 btn-focus rounded px-2 py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-display font-semibold text-white mb-4">Soporte</h3>
              <ul className="space-y-3">
                {footerLinks.soporte.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-body text-white hover:text-tertiary-500 transition-colors duration-200 btn-focus rounded px-2 py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <h3 className="text-display font-semibold text-white mb-4">Empresa</h3>
              <ul className="space-y-3 mb-6">
                {footerLinks.empresa.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-body text-white hover:text-tertiary-500 transition-colors duration-200 btn-focus rounded px-2 py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <h3 className="text-display font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-body text-white hover:text-tertiary-500 transition-colors duration-200 btn-focus rounded px-2 py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-secondary-400 mt-12 pt-8">
          <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            <h3 className="text-display font-semibold text-white mb-3">
              Mantente actualizado
            </h3>
            <p className="text-body text-secondary-200 mb-4">
              Recibe tips, actualizaciones y ofertas especiales directo en tu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-secondary-600 border border-secondary-400 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 btn-focus">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary-400 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="text-body text-white text-sm">
            © 2025 VendeMás. Todos los derechos reservados.
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <span className="text-white">Hecho con ❤️ para vendedores mexicanos</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-white">Todos los sistemas operando</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}