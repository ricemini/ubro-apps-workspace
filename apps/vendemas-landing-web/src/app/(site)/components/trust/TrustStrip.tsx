'use client';

import React from 'react';
import { TRUST } from '../../data/trust';
import { Shield, Users, Star } from 'lucide-react';

const Item = ({
  icon,
  text,
  srLabel,
}: {
  icon: React.ReactNode;
  text: string;
  srLabel: string;
}): React.JSX.Element => (
  <div className='flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400 min-w-0'>
    <span
      aria-hidden
      className='inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-tertiary-50 dark:bg-tertiary-900/20'
    >
      {icon}
    </span>
    <span className='sr-only'>{srLabel}</span>
    <span className='whitespace-nowrap'>{text}</span>
  </div>
);

export default function TrustStrip(): React.JSX.Element {
  return (
    <div className='mt-4 md:mt-5 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500'>
      {/* Mobile: Stacked vertically */}
      <div className='flex flex-col space-y-3 md:hidden'>
        <Item
          icon={
            <Star
              className='h-3 w-3 text-tertiary-700 dark:text-tertiary-300'
              fill='currentColor'
            />
          }
          text={`${TRUST.rating}/5 en reseñas`}
          srLabel={`Calificación de ${TRUST.rating} estrellas de 5 en reseñas`}
        />
        <Item
          icon={
            <Users className='h-3 w-3 text-tertiary-700 dark:text-tertiary-300' />
          }
          text={`${TRUST.activeVendors}+ negocios activos`}
          srLabel={`Más de ${TRUST.activeVendors} negocios activos`}
        />
        <Item
          icon={
            <Shield className='h-3 w-3 text-tertiary-700 dark:text-tertiary-300' />
          }
          text='Pagos CoDi certificados'
          srLabel='Integración CoDi certificada y segura'
        />
      </div>

      {/* Desktop: Horizontal row with proper alignment */}
      <div className='hidden md:flex md:items-center md:justify-start md:gap-x-8'>
        <Item
          icon={
            <Star
              className='h-3 w-3 text-tertiary-700 dark:text-tertiary-300'
              fill='currentColor'
            />
          }
          text={`${TRUST.rating}/5 en reseñas`}
          srLabel={`Calificación de ${TRUST.rating} estrellas de 5 en reseñas`}
        />
        <Item
          icon={
            <Users className='h-3 w-3 text-tertiary-700 dark:text-tertiary-300' />
          }
          text={`${TRUST.activeVendors}+ negocios activos`}
          srLabel={`Más de ${TRUST.activeVendors} negocios activos`}
        />
        <Item
          icon={
            <Shield className='h-3 w-3 text-tertiary-700 dark:text-tertiary-300' />
          }
          text='Pagos CoDi certificados'
          srLabel='Integración CoDi certificada y segura'
        />
      </div>
    </div>
  );
}

export function RiskReducers(): React.JSX.Element | null {
  const pills: string[] = [];
  if (TRUST.risk.noCard) pills.push('Sin tarjeta');
  if (TRUST.risk.noLockIn) pills.push('Sin permanencia');
  if (TRUST.risk.quickStart) pills.push('Activa en 2 minutos');

  if (!pills.length) return null;

  return (
    <p className='mt-2 text-xs text-secondary-500 dark:text-secondary-400 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-safe:delay-200'>
      {pills.join(' · ')}
    </p>
  );
}
