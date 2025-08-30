'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, ChevronDown } from 'lucide-react';
import { PRIMARY, SECONDARY } from '../data/nav';
import VendeMasLogo from './branding/VendeMasLogo';
import MobileMenu from './layout/MobileMenu';
import ThemeToggle from './theme/ThemeToggle';

export default function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md supports-[backdrop-filter]:bg-white/80 border-b border-secondary/10 dark:supports-[backdrop-filter]:bg-gray-900/80 dark:border-secondary/20'
          : 'bg-transparent'
      }`}
    >
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3'>
        {/* Logo */}
        <div className='flex lg:flex-1'>
          <VendeMasLogo size='sm' className='lg:hidden' asLink />
          <VendeMasLogo size='md' className='hidden lg:block' asLink />
        </div>

        {/* Desktop nav */}
        <nav className='hidden items-center gap-6 md:flex'>
          {PRIMARY.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className='text-sm font-medium text-secondary-700 hover:text-secondary-900 transition-colors duration-200 dark:text-secondary-300 dark:hover:text-white'
            >
              {item.label}
            </Link>
          ))}

          {/* More dropdown */}
          <details className='relative group'>
            <summary className='cursor-pointer list-none text-sm text-secondary-600 hover:text-secondary-800 transition-colors duration-200 dark:text-secondary-400 dark:hover:text-secondary-200'>
              <span className='flex items-center gap-1'>
                Más
                <ChevronDown className='h-4 w-4 transition-transform duration-200 group-open:rotate-180' />
              </span>
            </summary>
            <div className='absolute right-0 mt-2 w-56 rounded-lg border border-secondary/200 bg-white p-2 shadow-lg dark:border-secondary-700 dark:bg-gray-800'>
              {SECONDARY.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className='block rounded px-3 py-2 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors duration-200 dark:text-secondary-300 dark:hover:bg-secondary-800'
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>

          <ThemeToggle />
          <Link
            href='/signup'
            className='ml-2 inline-flex items-center rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:hover:bg-primary-600'
            data-analytics='nav_cta_signup'
          >
            Comenzar gratis
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label='Abrir menú'
          className='md:hidden p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200'
          onClick={() => setOpen(true)}
        >
          <Menu className='h-6 w-6 text-secondary-700 dark:text-secondary-300' />
        </button>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
