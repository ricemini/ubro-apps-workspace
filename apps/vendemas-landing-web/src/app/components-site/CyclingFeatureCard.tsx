'use client';

import { useState, useEffect } from 'react';
import {
  ShoppingCart,
  CreditCard,
  Receipt,
  TrendingUp,
  FileText,
  MapPin,
  Brain,
  Target,
  Zap,
  PieChart,
  BarChart3,
  Package,
  Users,
  Settings,
  Clock,
  Shield,
  HeadphonesIcon,
  MessageSquare,
  Star,
  Link,
  Database,
  Cloud,
} from 'lucide-react';
import PrimaryCTA from './PrimaryCTA';

// Feature categories for cycling display
const featureCategories = [
  {
    name: 'Gestión y Ventas',
    subtitle:
      'Cobra sin complicaciones, vende más y controla tu negocio en un solo lugar.',
    features: [
      { icon: ShoppingCart, label: 'Punto de Venta', shortLabel: 'POS' },
      { icon: CreditCard, label: 'Pagos Digitales', shortLabel: 'Pagos' },
      { icon: Receipt, label: 'Facturación', shortLabel: 'Facturas' },
      { icon: TrendingUp, label: 'Ventas', shortLabel: 'Ventas' },
      { icon: FileText, label: 'Reportes', shortLabel: 'Reportes' },
      { icon: MapPin, label: 'Ubicaciones', shortLabel: 'Mapas' },
    ],
  },
  {
    name: 'Herramientas con IA',
    subtitle:
      'Automatiza tus tareas y deja que la inteligencia trabaje por ti.',
    features: [
      { icon: Brain, label: 'Análisis IA', shortLabel: 'IA' },
      { icon: Target, label: 'Promociones IA', shortLabel: 'Promos' },
      { icon: Zap, label: 'Automatización', shortLabel: 'Auto' },
      { icon: PieChart, label: 'Predicciones', shortLabel: 'Pred' },
      { icon: BarChart3, label: 'Insights', shortLabel: 'Data' },
    ],
  },
  {
    name: 'Gestión del Negocio',
    subtitle:
      'Administra inventario, equipos y reportes con total claridad y control.',
    features: [
      { icon: Package, label: 'Inventario', shortLabel: 'Stock' },
      { icon: Users, label: 'Personal', shortLabel: 'Team' },
      { icon: Settings, label: 'Configuración', shortLabel: 'Config' },
      { icon: Clock, label: 'Horarios', shortLabel: 'Time' },
      { icon: Shield, label: 'Seguridad', shortLabel: 'Safe' },
    ],
  },
  {
    name: 'Soporte y Comunidad',
    subtitle:
      'Nunca estás solo — aprende, crece y comparte con otros vendedores.',
    features: [
      { icon: HeadphonesIcon, label: 'Soporte 24/7', shortLabel: 'Help' },
      { icon: MessageSquare, label: 'Chat', shortLabel: 'Chat' },
      { icon: Star, label: 'Comunidad', shortLabel: 'Comm' },
    ],
  },
  {
    name: 'Integraciones y Extensiones',
    subtitle:
      'Conecta tus herramientas favoritas y haz que todo trabaje en conjunto.',
    features: [
      { icon: Link, label: 'Integraciones', shortLabel: 'API' },
      { icon: Database, label: 'Base de Datos', shortLabel: 'DB' },
      { icon: Cloud, label: 'Cloud', shortLabel: 'Cloud' },
    ],
  },
];

interface CyclingFeatureCardProps {
  onCategoryChange?: (category: { name: string; subtitle: string }) => void;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

export default function CyclingFeatureCard({
  onCategoryChange,
  currentIndex,
  onIndexChange,
}: CyclingFeatureCardProps = {}): JSX.Element {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentCategoryIndex =
    currentIndex !== undefined ? currentIndex : internalIndex;
  const [isPaused, setIsPaused] = useState(false);

  useEffect((): (() => void) | void => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const nextIndex = (currentCategoryIndex + 1) % featureCategories.length;
      if (onIndexChange) {
        onIndexChange(nextIndex);
      } else {
        setInternalIndex(nextIndex);
      }
    }, 8000); // 8 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  // Notify parent component when category changes
  useEffect((): void => {
    if (onCategoryChange) {
      const currentCategory = featureCategories[currentCategoryIndex];
      onCategoryChange({
        name: currentCategory.name,
        subtitle: currentCategory.subtitle,
      });
    }
  }, [currentCategoryIndex, onCategoryChange]);

  const currentCategory = featureCategories[currentCategoryIndex];

  return (
    <div className='rounded-2xl border border-accent-600 bg-transparent backdrop-blur-md transition-all duration-300 p-3 relative overflow-hidden min-h-[456px] max-w-[418px] flex -mt-12'>
      <div className='rounded-lg border border-accent-600 bg-white/90 transition-all duration-300 p-6 md:p-8 relative overflow-hidden w-full flex flex-col'>
        {/* Animated background pattern */}
        <div className='absolute inset-0 opacity-[0.02] pointer-events-none'>
          <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,theme(colors.green.400),transparent_50%)] animate-pulse' />
          <div
            className='absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,theme(colors.purple.400),transparent_50%)] animate-pulse'
            style={{ animationDelay: '1s' }}
          />
        </div>
        {/* Play/Pause Button and Navigation Dots - Top Right */}
        <div className='absolute top-6 right-6 z-10 flex flex-col items-end space-y-4'>
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className='group relative'
            aria-label={isPaused ? 'Reanudar animación' : 'Pausar animación'}
          >
            {/* Glow effect */}
            <div className='absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-tertiary-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300' />

            {/* Button background */}
            <div className='relative w-10 h-10 bg-white/95 backdrop-blur-md rounded-full shadow-sm border border-gray-200/60 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-focus:ring-2 group-focus:ring-primary-500 group-focus:ring-offset-2 group-active:scale-95'>
              {/* Icon with smooth transition */}
              <div className='transition-all duration-300 group-hover:scale-110'>
                {isPaused ? (
                  <svg
                    className='w-4 h-4 text-primary-600 drop-shadow-sm'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8 5v14l11-7z' />
                  </svg>
                ) : (
                  <svg
                    className='w-4 h-4 text-primary-600 drop-shadow-sm'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M6 4h4v16H6V4zm8 0h4v16h-4V4z' />
                  </svg>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Category indicator - Fixed height to prevent layout shifts */}
        <div className='h-20 flex flex-col justify-center'>
          <div className='flex items-center space-x-3'>
            <div className='w-1 h-8 bg-gradient-to-b from-primary-500 to-tertiary-500 rounded-full' />
            <h2 className='text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-500'>
              {currentCategory.name}
            </h2>
          </div>
        </div>

        {/* Features grid - Flexible container that grows */}
        <div className='flex-1 flex items-center justify-center'>
          <div className='grid grid-cols-3 gap-3 w-full max-w-sm'>
            {currentCategory.features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <button
                  key={index}
                  className='group relative flex flex-col items-center justify-center bg-white border border-gray-200/60 rounded-lg p-4 hover:border-primary-200 hover:scale-105 hover:cursor-pointer transition-all duration-100 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                  aria-label={feature.label}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '85px',
                    margin: 0,
                    padding: 0,
                    border: '1px solid #ceceea',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    transition: 'transform .1s ease, box-shadow .1s ease',
                    transform: 'scale(1) translateZ(1px)',
                    transformOrigin: 'center',
                    boxShadow: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow =
                      '0 1px 1px -.5px rgba(18, 43, 165, .04), 0 3px 3px -1.5px rgba(18, 43, 165, .04), 0 6px 6px -3px rgba(18, 43, 165, .04), 0 12px 12px -6px rgba(18, 43, 165, .04), 0 24px 24px -12px rgba(18, 43, 165, .04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Custom box shadow pseudo-element */}
                  <div
                    className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out'
                    style={{
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      display: 'block',
                      boxShadow:
                        '0 1px 1px -.5px rgba(18, 43, 165, .04), 0 3px 3px -1.5px rgba(18, 43, 165, .04), 0 6px 6px -3px rgba(18, 43, 165, .04), 0 12px 12px -6px rgba(18, 43, 165, .04), 0 24px 24px -12px rgba(18, 43, 165, .04)',
                      opacity: 0,
                      transition: 'opacity .2s ease',
                    }}
                  />

                  {/* Content */}
                  <div className='flex flex-col items-center space-y-2'>
                    <div className='w-8 h-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-300'>
                      <IconComponent className='w-4 h-4 text-primary-600 group-hover:text-primary-700 transition-colors duration-300' />
                    </div>
                    <span className='text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-center leading-tight'>
                      {feature.shortLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA Button - Fixed at bottom */}
        <div className='mt-auto pt-6'>
          <PrimaryCTA
            text='Get started'
            href='/signup'
            analytics='cta_primary_feature_card'
            ariaLabel='Comenzar a usar VendeMás con todas las características'
          />
        </div>
      </div>
    </div>
  );
}

// Navigation Dots Component
export function FeatureNavigationDots({
  currentIndex,
  onIndexChange,
}: {
  currentIndex: number;
  onIndexChange: (index: number) => void;
}): JSX.Element {
  return (
    <div className='flex flex-col space-y-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-4 shadow-sm border border-gray-200/60'>
      {featureCategories.map((_, index) => (
        <button
          key={index}
          onClick={() => onIndexChange(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 ${
            index === currentIndex
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg'
              : 'bg-gray-300 hover:bg-gray-400 hover:shadow-md'
          }`}
          aria-label={`Ir a ${featureCategories[index].name}`}
        />
      ))}
    </div>
  );
}
