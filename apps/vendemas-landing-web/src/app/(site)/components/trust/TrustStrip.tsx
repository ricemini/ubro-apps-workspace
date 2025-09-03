'use client';

import React from 'react';
import { TRUST } from '../../data/trust';
import { Shield, Users, Star } from 'lucide-react';

/**
 * Individual trust indicator item with icon and text
 *
 * @param icon - Lucide React icon component
 * @param text - Visible text for the trust indicator
 * @param srLabel - Screen reader accessible label with more context
 */
const Item = ({
  icon,
  text,
  srLabel,
}: {
  icon: React.ReactNode;
  text: string;
  srLabel: string;
}): React.JSX.Element => (
  <div className='flex items-center gap-2 text-sm text-charcoal-500 dark:text-white min-w-0'>
    {/* Icon container with background styling */}
    <span
      aria-hidden
      className='inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-tertiary-50 dark:bg-tertiary-900/20'
    >
      {icon}
    </span>
    {/* Screen reader only label for accessibility */}
    <span className='sr-only'>{srLabel}</span>
    {/* Visible text content */}
    <span className='whitespace-nowrap'>{text}</span>
  </div>
);

/**
 * TrustStrip Component - Displays trust indicators and social proof
 *
 * Features:
 * - Responsive layout: stacked on mobile, horizontal on desktop
 * - Motion-safe animations with fade-in effects
 * - Accessibility: screen reader labels for each indicator
 * - Dark mode support with appropriate color schemes
 * - Trust indicators: ratings, user count, and security features
 */
export default function TrustStrip(): React.JSX.Element {
  return (
    <div className='mt-4 md:mt-5 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500'>
      {/* Mobile layout: Stacked vertically for better mobile UX */}
      <div className='flex flex-col space-y-3 md:hidden'>
        {/* Star rating indicator */}
        <Item
          icon={
            <Star
              className='h-3 w-3 text-tertiary-700 dark:text-tertiary-200'
              fill='currentColor'
            />
          }
          text={`${TRUST.rating}/5 en reseñas`}
          srLabel={`Calificación de ${TRUST.rating} estrellas de 5 en reseñas`}
        />

        {/* Active users count indicator */}
        <Item
          icon={
            <Users className='h-3 w-3 text-tertiary-700 dark:text-tertiary-200' />
          }
          text={`${TRUST.activeVendors}+ negocios activos`}
          srLabel={`Más de ${TRUST.activeVendors} negocios activos`}
        />

        {/* Security certification indicator */}
        <Item
          icon={
            <Shield className='h-3 w-3 text-tertiary-700 dark:text-tertiary-200' />
          }
          text='CoDi certificado'
          srLabel='Integración CoDi certificada y segura'
        />
      </div>

      {/* Desktop layout: Horizontal row with proper spacing */}
      <div className='hidden md:flex md:items-center md:justify-start md:gap-x-8'>
        {/* Star rating indicator */}
        <Item
          icon={
            <Star
              className='h-3 w-3 text-tertiary-700 dark:text-tertiary-200'
              fill='currentColor'
            />
          }
          text={`${TRUST.rating}/5 en reseñas`}
          srLabel={`Calificación de ${TRUST.rating} estrellas de 5 en reseñas`}
        />

        {/* Active users count indicator */}
        <Item
          icon={
            <Users className='h-3 w-3 text-tertiary-700 dark:text-tertiary-200' />
          }
          text={`${TRUST.activeVendors}+ negocios activos`}
          srLabel={`Más de ${TRUST.activeVendors} negocios activos`}
        />

        {/* Security certification indicator */}
        <Item
          icon={
            <Shield className='h-3 w-3 text-tertiary-700 dark:text-tertiary-200' />
          }
          text='CoDi certificado'
          srLabel='Integración CoDi certificada y segura'
        />
      </div>
    </div>
  );
}

/**
 * RiskReducers Component - Displays risk mitigation factors
 *
 * Features:
 * - Conditional rendering based on available risk reducers
 * - Motion-safe animations with staggered delays
 * - Dark mode support
 * - Helps reduce user anxiety about trying the service
 */
export function RiskReducers(): React.JSX.Element | null {
  // Build array of risk reduction factors
  const pills: string[] = [];
  if (TRUST.risk.noCard) pills.push('Sin tarjeta');
  if (TRUST.risk.noLockIn) pills.push('Sin permanencia');
  if (TRUST.risk.quickStart) pills.push('Activa en 2 minutos');

  // Don't render if no risk reducers are available
  if (!pills.length) return null;

  return (
    <p className='mt-2 text-xs text-secondary-500 dark:text-white motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-safe:delay-200'>
      {pills.join(' · ')}
    </p>
  );
}
