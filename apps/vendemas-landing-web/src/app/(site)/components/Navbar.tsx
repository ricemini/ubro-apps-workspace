'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

const NAV = [
  { name: 'Cómo funciona', href: '#como-funciona', exact: false },
  { name: 'Características', href: '/caracteristicas', exact: false },
  { name: 'Mi Negocio', href: '/mi-negocio', exact: false },
  { name: 'Precios', href: '/precios', exact: true },
  { name: 'FAQ', href: '/faq', exact: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-50',
        'backdrop-blur supports-[backdrop-filter]:bg-white/95',
        scrolled ? 'shadow-sm border-b border-secondary/10' : 'bg-white/95',
      ].join(' ')}
    >
      {/* Skip link for a11y */}
      <a
        href='#main'
        className='sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-secondary focus:px-3 focus:py-2 focus:text-white'
      >
        Saltar al contenido
      </a>

      <nav
        aria-label='Principal'
        className={[
          'mx-auto max-w-7xl px-4 sm:px-6',
          'transition-[padding,height] duration-200 ease-out',
          scrolled ? 'py-2' : 'py-3',
        ].join(' ')}
      >
        <div className='flex items-center justify-between gap-4'>
          {/* Brand */}
          <Link
            href='/'
            className='flex items-center gap-2'
            aria-label='VendeMás — inicio'
          >
            <Image
              src='/logo-mark.svg'
              alt=''
              width={28}
              height={28}
              priority
              className='rounded-md'
            />
            <span className='app-name'>VendeMás</span>
          </Link>

          {/* Desktop nav */}
          <div className='hidden lg:flex items-center gap-6'>
            <ul className='flex items-center gap-5'>
              {NAV.map(item => {
                const active = item.exact
                  ? pathname === item.href
                  : pathname?.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        'text-sm transition-colors font-medium',
                        active
                          ? 'text-secondary underline decoration-2 underline-offset-4'
                          : 'text-secondary hover:text-secondary',
                      ].join(' ')}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTAs */}
            <div className='flex items-center gap-3'>
              <Link
                href='/demo'
                className='hidden xl:inline-flex items-center gap-2 rounded-lg px-4 py-2 ring-1 ring-secondary/25 hover:ring-secondary/40 bg-white/90 backdrop-blur text-secondary'
                data-analytics='nav_demo'
              >
                <svg
                  className='h-4 w-4'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden
                >
                  <path d='M8 5v14l11-7z' />
                </svg>
                Ver demo
              </Link>

              <Link
                href='/login'
                className='text-sm text-secondary hover:text-secondary font-medium'
                data-analytics='nav_login'
              >
                Ingresar
              </Link>

              <Link
                href='/signup'
                className='rounded-lg bg-primary-500 text-primary-on px-4 py-2 shadow hover:shadow-md transition'
                data-analytics='nav_signup'
              >
                Comenzar gratis
              </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className='lg:hidden inline-flex items-center gap-2 rounded-md px-3 py-2 ring-1 ring-secondary/25 hover:ring-secondary/40 bg-white/90'
            aria-label='Abrir menú'
            aria-controls='mobile-menu'
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <svg
              className='h-5 w-5'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden
            >
              <path d='M3 6h18M3 12h18M3 18h18' />
            </svg>
            Menú
          </button>
        </div>
      </nav>

      {/* Mobile dialog */}
      {open && (
        <MobileMenu
          items={NAV}
          onClose={() => setOpen(false)}
          pathname={pathname ?? '/'}
        />
      )}
    </header>
  );
}
