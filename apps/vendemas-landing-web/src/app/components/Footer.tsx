'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';
import InActionModal from '../components-site/InActionModal';
import VendeMasLogo from '../components-site/branding/VendeMasLogo';

/**
 * Footer Component
 *
 * A comprehensive, conversion-oriented footer with MVP structure that includes:
 * - Brand logo with custom stacked layout (size="lg")
 * - Contact information with proper accessibility
 * - Organized link sections (Producto, Soporte, Empresa, Legal)
 * - Social media links with ARIA labels
 * - Newsletter subscription form with validation
 * - System status indicator
 * - Full dark mode support
 * - WCAG 2.1 AA accessibility compliance
 *
 * Features:
 * - Modal integration for "Cómo funciona" link
 * - Responsive design with mobile-first approach
 * - Keyboard navigation and focus management
 * - Screen reader friendly with proper ARIA attributes
 * - Semantic HTML structure for better SEO
 */
export default function Footer(): React.JSX.Element {
  // State for controlling the "VendeMás en acción" modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Footer navigation links organized by category for better UX and SEO
  // Each section is limited to essential MVP links to reduce cognitive load
  const footerLinks = {
    // Product-related links - core functionality and features
    producto: [
      { name: 'Todas las Herramientas', href: '/herramientas' },
      {
        name: 'Cómo funciona',
        href: '#',
        onClick: (): void => setIsModalOpen(true),
      }, // Opens modal instead of navigation
      { name: 'Beneficios', href: '#beneficios' },
      { name: 'Planes', href: '/planes' },
      { name: 'Casos de éxito', href: '/casos-de-exito' },
    ],
    // Support and help resources
    soporte: [
      { name: 'Centro de ayuda', href: '/ayuda' },
      { name: 'Preguntas frecuentes', href: '/faq' },
      { name: 'Contacto', href: '/contacto' },
    ],
    // Company information and media
    empresa: [
      { name: 'Acerca de VendeMás', href: '/acerca' },
      { name: 'Prensa', href: '/prensa' },
    ],
    // Legal and compliance documents
    legal: [
      { name: 'Términos y condiciones', href: '/legal/terminos' },
      { name: 'Política de privacidad', href: '/legal/privacidad' },
      { name: 'Política de cookies', href: '/legal/cookies' },
    ],
  };

  // Social media links with descriptive ARIA labels for accessibility
  const socialLinks = [
    { name: 'VendeMás en Facebook', href: '#', icon: Facebook },
    { name: 'VendeMás en X (Twitter)', href: '#', icon: Twitter },
    { name: 'VendeMás en Instagram', href: '#', icon: Instagram },
    { name: 'VendeMás en YouTube', href: '#', icon: Youtube },
  ];

  return (
    // Main footer container with dark mode support
    <footer className='bg-secondary-500 dark:bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8'>
        {/* Main footer content - responsive grid layout */}
        <div className='grid lg:grid-cols-5 gap-12'>
          {/* Company info section - brand logo, contact details, and social links */}
          <div className='lg:col-span-2 mt-10'>
            {/* Brand logo with custom stacked layout for footer */}
            <div className='mb-6'>
              <VendeMasLogo size='lg' asLink={true} label='VendeMás — inicio' />
            </div>

            {/* Contact information with proper accessibility and semantic markup */}
            <div className='space-y-3 mb-6'>
              <div className='flex items-center space-x-3'>
                <Mail
                  className='h-5 w-5 text-secondary-300 dark:text-gray-400'
                  aria-hidden='true'
                />
                <a
                  href='mailto:hola@vendemas.mx'
                  className='text-white hover:text-tertiary-500 transition-colors btn-focus rounded px-2 py-1'
                >
                  hola@vendemas.mx
                </a>
              </div>
              <div className='flex items-center space-x-3'>
                <Phone
                  className='h-5 w-5 text-secondary-300 dark:text-gray-400'
                  aria-hidden='true'
                />
                <a
                  href='tel:+525555551234'
                  className='text-white hover:text-tertiary-500 transition-colors btn-focus rounded px-2 py-1'
                >
                  +52 (55) 5555-1234
                </a>
              </div>
              <div className='flex items-center space-x-3'>
                <MapPin className='h-5 w-5 text-secondary-300 dark:text-gray-400' />
                <span className='text-white'>Ciudad de México, CDMX</span>
              </div>
            </div>

            {/* Social media links with larger touch targets and ARIA labels */}
            <div className='flex space-x-4'>
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  className='bg-secondary-600 dark:bg-gray-800 hover:bg-primary-500 dark:hover:bg-primary-600 p-3 rounded-lg transition-colors duration-200 btn-focus'
                  aria-label={social.name}
                >
                  <social.icon className='h-6 w-6' />
                </a>
              ))}
            </div>
          </div>

          {/* Footer navigation links organized in responsive grid */}
          <div className='grid grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-8 mt-10'>
            <div>
              <h3 className='text-display font-semibold text-white mb-4'>
                Producto
              </h3>
              <ul className='space-y-3'>
                {footerLinks.producto.map(link => (
                  <li key={link.name}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className='text-body text-white hover:text-tertiary-500 transition-colors duration-200 btn-focus rounded px-2 py-1 text-left'
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className='text-body text-white hover:text-tertiary-500 transition-colors duration-200 btn-focus rounded px-2 py-1'
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='text-display font-semibold text-white mb-4'>
                Soporte
              </h3>
              <ul className='space-y-3'>
                {footerLinks.soporte.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className='text-body text-white hover:text-tertiary-500 transition-colors duration-200 btn-focus rounded px-2 py-1'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='text-display font-semibold text-white mb-4'>
                Empresa
              </h3>
              <ul className='space-y-3'>
                {footerLinks.empresa.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className='text-body text-white hover:text-tertiary-500 transition-colors duration-200 btn-focus rounded px-2 py-1'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='text-display font-semibold text-white mb-4'>
                Legal
              </h3>
              <ul className='space-y-3'>
                {footerLinks.legal.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className='text-body text-white hover:text-tertiary-500 transition-colors duration-200 btn-focus rounded px-2 py-1'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter subscription form with proper form semantics and accessibility */}
        <div className='border-t border-secondary-400 dark:border-gray-700 mt-2'>
          <div className='max-w-md mx-auto lg:mx-0 text-center lg:text-left'>
            <h3 className='text-display font-semibold text-white mb-3'>
              Recibe novedades de VendeMás
            </h3>
            <p
              id='newsletter-description'
              className='text-body text-secondary-200 dark:text-gray-300 mb-4'
            >
              Consejos para vender más y noticias de producto.
            </p>
            {/* Accessible form with proper labels and ARIA attributes */}
            <form
              className='flex flex-col sm:flex-row gap-3'
              aria-label='Newsletter subscription'
            >
              {/* Screen reader only label for email input */}
              <label htmlFor='newsletter-email' className='sr-only'>
                Correo electrónico para newsletter
              </label>
              {/* Email input with proper accessibility attributes */}
              <input
                id='newsletter-email'
                type='email'
                placeholder='tu@email.com'
                className='flex-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                aria-describedby='newsletter-description'
                required
              />
              {/* Submit button with proper ARIA label */}
              <button
                type='submit'
                className='bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 rounded-lg transition-colors duration-200 btn-focus'
                style={{ height: '42px' }}
                aria-label='Suscribirse al boletín'
              >
                Recibir novedades
              </button>
            </form>
          </div>
        </div>

        {/* Footer bottom bar with copyright, branding, and system status */}
        <div className='border-t border-secondary-400 dark:border-gray-700 mt-4 pt-8 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0'>
          <div className='text-body text-white text-sm'>
            © 2025 VendeMás. Todos los derechos reservados.
          </div>

          <div className='text-body text-white text-sm'>
            Hecho con ❤️ en México para PyMEs y vendedores de LATAM
          </div>

          {/* System status indicator with visual and text representation */}
          <div className='flex items-center space-x-2 text-sm'>
            <div
              className='w-2 h-2 bg-green-500 rounded-full'
              aria-hidden='true'
            ></div>
            <span className='text-white'>Todos los sistemas operando</span>
          </div>
        </div>
      </div>

      {/* Conditional rendering of VendeMás en acción modal */}
      {isModalOpen && <InActionModal onClose={() => setIsModalOpen(false)} />}
    </footer>
  );
}
