'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

type Item = { name: string; href: string; exact?: boolean };

export default function MobileMenu({
  items,
  pathname,
  onClose,
}: {
  items: Item[];
  pathname: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on ESC; basic focus trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a,button,[tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (document.activeElement === last && !e.shiftKey) {
          e.preventDefault();
          first.focus();
        }
        if (document.activeElement === first && e.shiftKey) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    // focus first focusable on open
    const first = dialogRef.current?.querySelector<HTMLElement>('a,button');
    first?.focus();
  }, []);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
      className="fixed inset-0 z-50 grid lg:hidden"
      onClick={onClose}
    >
      <div className="bg-black/50 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        className="absolute top-0 right-0 h-full w-[88vw] max-w-sm bg-white shadow-xl p-6 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="text-display text-lg text-secondary">Menú</span>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 ring-1 ring-secondary/20 hover:ring-secondary/40"
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1">
          <ul className="flex flex-col gap-3">
            {items.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={[
                      'block rounded-md px-3 py-2 text-base',
                      active
                        ? 'bg-secondary/5 text-secondary underline decoration-2 underline-offset-4'
                        : 'text-secondary/90 hover:text-secondary hover:bg-secondary/5',
                    ].join(' ')}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <Link
            href="/demo"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 ring-1 ring-secondary/25 hover:ring-secondary/40 bg-white/90 text-secondary"
            data-analytics="nav_demo_mobile"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            Ver demo
          </Link>
          <div className="flex gap-3">
            <Link
              href="/login"
              onClick={onClose}
              className="flex-1 rounded-lg px-4 py-2 ring-1 ring-secondary/25 hover:ring-secondary/40 text-center text-secondary"
              data-analytics="nav_login_mobile"
            >
              Ingresar
            </Link>
            <Link
              href="/signup"
              onClick={onClose}
              className="flex-1 rounded-lg bg-primary-500 text-primary-on px-4 py-2 text-center shadow hover:shadow-md"
              data-analytics="nav_signup_mobile"
            >
              Comenzar gratis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
