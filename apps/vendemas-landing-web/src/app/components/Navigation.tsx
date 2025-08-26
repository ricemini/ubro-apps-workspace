'use client';

import { useState } from 'react';
import { Menu, X, Smartphone } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#caracteristicas', label: 'Características' },
    { href: '#mi-negocio', label: 'Mi Negocio' },
    { href: '#precios', label: 'Precios' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Smartphone className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <span className="app-name text-2xl">VendeMás</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-body text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200 btn-focus py-2 px-3 rounded-md"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-body text-primary-500 hover:text-primary-600 font-medium btn-focus px-4 py-2 rounded-lg">
              Ver demo
            </button>
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 btn-focus">
              Comenzar gratis
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-500 btn-focus"
            aria-expanded={isMenuOpen}
            aria-label="Abrir menú de navegación"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-body text-gray-700 hover:text-primary-500 font-medium btn-focus py-2 px-3 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                <button className="text-body text-primary-500 hover:text-primary-600 font-medium btn-focus px-4 py-2 rounded-lg text-center">
                  Ver demo
                </button>
                <button className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 btn-focus">
                  Comenzar gratis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}