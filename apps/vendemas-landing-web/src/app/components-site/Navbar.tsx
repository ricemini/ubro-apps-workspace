'use client';

/**
 * Navbar Component - Main navigation header with responsive design
 *
 * Features:
 * - Responsive layout: hamburger menu on mobile, full navigation on desktop
 * - Logo with responsive variants: V$ on mobile/medium, VendeMá$ on large screens
 * - Theme toggle with compact and full modes based on screen size
 * - Desktop navigation with mega menu dropdown for "Herramientas"
 * - Mobile menu with slide-in panel and focus trap
 * - Consistent 42px height for all interactive elements
 * - Card-based styling with 14px border radius throughout
 * - Accessibility: ARIA labels, keyboard navigation, screen reader support
 *
 * Responsive Behavior:
 * - Mobile (< md): Hamburger menu, compact logo, hidden when menu open
 * - Medium (md-lg): Compact theme toggle, V$ logo, full navigation
 * - Large (lg+): Full theme toggle, VendeMá$ logo, full navigation
 *
 * Styling:
 * - All buttons: 42px height with card-border and 14px border radius
 * - Logo: navbar-optimized sizing with consistent 42px container height
 * - Gaps: 8px between theme toggle and buttons, 16px between nav items
 * - Dark mode: Full support with proper contrast and theming
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import {
  Menu,
  BarChart3,
  MousePointer,
  Shield,
  SquarePlus,
  X,
  ChevronDown,
  Phone,
  PlayCircle,
  Grid3X3,
} from 'lucide-react';
import Link from 'next/link';

import VendeMasLogo from './branding/VendeMasLogo';
import ThemeToggle from './theme/ThemeToggle';
import FocusTrap from './accessibility/FocusTrap';

/**
 * Product features data for the dropdown mega menu
 * Each product represents a key feature of the VendeMás platform
 * Used in the "Herramientas" dropdown navigation
 */
const products = [
  {
    name: 'Analytics',
    description: 'Get a better understanding where your traffic is coming from',
    href: '#',
    icon: BarChart3,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers with our engagement tool',
    href: '#',
    icon: MousePointer,
  },
  {
    name: 'Security',
    description: "Your customers' data will be safe and secure",
    href: '#',
    icon: Shield,
  },
  {
    name: 'Integrations',
    description: "Your customers' data will be safe and secure",
    href: '#',
    icon: SquarePlus,
  },
];

/**
 * Call-to-action items displayed in the dropdown footer
 * Provides quick access to demo, sales contact, and product overview
 */
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircle },
  { name: 'Contact sales', href: '#', icon: Phone },
  { name: 'View all products', href: '#', icon: Grid3X3 },
];

/**
 * Navbar Component - Main navigation bar with responsive design and dropdown menus
 *
 * Features:
 * - Responsive layout: hamburger menu on mobile, full navigation on md+
 * - Dropdown mega menu for products and features with 4-column grid layout
 * - Dark mode support with consistent theming across all components
 * - Accessibility: proper ARIA labels, keyboard navigation, and screen reader support
 * - Mobile-first design with optimized 60px height for all screen sizes
 * - Dynamic logo sizing: responsive sizing + scroll-based size changes on large screens
 * - Sticky positioning: becomes fixed header when scrolling for better UX
 *
 * Responsive Behavior:
 * - Mobile (< 768px): Hamburger menu with slide-out dialog, small logo
 * - Medium (768px-1023px): Full navigation menus visible, extra small logo, compact spacing
 * - Large (≥ 1024px): Enhanced horizontal spacing, medium logo (small when scrolled), right-side CTA
 *
 * Scroll Behavior:
 * - At top: relative positioning, medium logo on large screens
 * - After 10px scroll: fixed positioning with shadow, small logo on large screens
 * - Smooth transitions for all state changes
 */
export default function Example(): React.JSX.Element {
  // State for controlling mobile menu visibility and slide-out dialog
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State for tracking dropdown menu open state
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  // Refs for focus management
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Focus management for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      // Focus the first focusable element in the mobile menu
      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [mobileMenuOpen]);

  // Handle mobile menu close with focus return
  const handleMobileMenuClose = (): void => {
    setMobileMenuOpen(false);
    // Return focus to the trigger button
    if (mobileMenuTriggerRef.current) {
      mobileMenuTriggerRef.current.focus();
    }
  };

  // Handle escape key for mobile menu
  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent): void => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        handleMobileMenuClose();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return (): void => document.removeEventListener('keydown', handleEscape);
    }

    // Return cleanup function even when mobileMenuOpen is false
    return (): void => {
      // No cleanup needed when mobileMenuOpen is false
    };
  }, [mobileMenuOpen]);

  return (
    // Main header container with fixed positioning
    // - Always fixed positioning for consistent sticky navigation
    // - Transparent background for clean overlay effect
    <header className='fixed top-0 left-0 right-0 bg-transparent isolate z-10 b-4'>
      {/* Skip link for keyboard navigation - appears only on focus */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-primary-600'
      >
        Saltar al contenido principal
      </a>

      {/* Navigation container with responsive padding and max width constraints */}
      {/* - Horizontal padding: 16px on mobile/medium, 32px on large screens */}
      {/* - Vertical padding: 8px (4px top/bottom) for consistent 60px height */}
      {/* - Max width: 7xl (1280px) with auto margins for centering */}
      <nav
        id='main-navigation'
        aria-label='Global'
        className='mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-8 lg:py-2'
      >
        {/* Logo section - responsive sizing */}
        {/* Flex behavior: none on medium+ to prevent logo from expanding and pushing content */}
        <div className='flex md:flex-none lg:flex-none'>
          {/* Logo container */}
          <div className='flex md:flex-none lg:flex-none'>
            {/* Responsive logo: VendeMá$ on mobile/medium when hamburger visible, V$ on large screens */}
            <VendeMasLogo
              isSmall={false}
              navbar
              asLink
              className={mobileMenuOpen ? 'hidden' : ''}
            />
          </div>
        </div>

        {/* Mobile menu button - hamburger icon for small screens only */}
        {/* Hidden on medium+ screens where full navigation is visible */}
        <div className='flex md:hidden'>
          <button
            ref={mobileMenuTriggerRef}
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            // Negative margins (-m-2.5) provide larger touch target while maintaining visual size
            className='-m-2.5 inline-flex items-center justify-center card-border !rounded-[14px] bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400'
            style={{
              height: '42px',
              width: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-expanded={mobileMenuOpen}
            aria-label='Abrir menú de navegación'
            aria-controls='mobile-menu'
          >
            {/* Screen reader text for accessibility */}
            <span className='sr-only'>Open main menu</span>
            {/* Hamburger icon with proper ARIA attributes */}
            <Menu aria-hidden='true' className='size-6' />
          </button>
        </div>

        {/* Desktop navigation - full navigation menus for medium+ screens */}
        {/* Responsive behavior: hidden on mobile, visible on medium+ screens */}
        {/* Layout strategy: flex-1 + justify-center to distribute navigation items evenly */}
        {/* Gap spacing: compact on medium (16px), spacious on large (16px) for optimal layout */}
        <PopoverGroup className='hidden md:flex md:flex-1 md:justify-center lg:flex-1 lg:justify-center'>
          {/* Navigation container with single card styling */}
          <div className='flex items-center card-border !rounded-[14px] bg-white dark:bg-gray-950 px-4 py-2.5 gap-x-4'>
            {/* Products dropdown with mega menu */}
            <Popover>
              <PopoverButton
                className='flex items-center gap-x-1 text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none'
                aria-label='Herramientas dropdown menu'
                aria-expanded={isProductsOpen}
                aria-haspopup='true'
              >
                Herramientas
                <ChevronDown
                  aria-hidden='true'
                  className='size-4 flex-none text-gray-400 dark:text-gray-500'
                />
              </PopoverButton>

              {/* Mega menu dropdown panel with smooth transitions and proper positioning */}
              {/* - top-12 (48px): positioned below the 60px navbar */}
              {/* - inset-x-0: spans full width of viewport for immersive experience */}
              {/* - Transition classes: smooth enter/exit animations with different durations */}
              <PopoverPanel
                transition
                className='absolute inset-x-0 top-[50px] bg-white transition data-closed:-translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in dark:bg-gray-950'
                onFocus={() => setIsProductsOpen(true)}
                onBlur={() => setIsProductsOpen(false)}
              >
                {/* Shadow overlay element for visual depth and separation */}
                {/* - top-1/2: positioned at middle of dropdown for balanced shadow */}
                {/* - Dark mode: no shadow, only ring for subtle separation */}
                <div
                  aria-hidden='true'
                  className='absolute inset-0 top-1/2 bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-950 dark:shadow-none dark:ring-white/15'
                />

                {/* Main dropdown content container */}
                <div className='relative bg-white dark:bg-gray-950'>
                  {/* Product grid with 4 columns for feature showcase */}
                  <div className='mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8'>
                    {/* Map through products to display feature cards */}
                    {products.map(item => (
                      <div
                        key={item.name}
                        className='group relative rounded-lg p-6 text-sm/6 hover:bg-gray-50 dark:hover:bg-white/5'
                      >
                        {/* Icon container with hover effects */}
                        <div className='flex size-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-gray-700/50 dark:group-hover:bg-gray-700'>
                          <item.icon
                            aria-hidden='true'
                            className='size-6 text-gray-600 group-hover:text-secondary-600 dark:text-gray-400 dark:group-hover:text-white'
                          />
                        </div>

                        {/* Feature title with full clickable area */}
                        <a
                          href={item.href}
                          className='mt-6 block font-semibold text-gray-900 dark:text-white'
                          aria-describedby={`${item.name.toLowerCase()}-description`}
                        >
                          {item.name}
                          <span className='absolute inset-0' />
                        </a>

                        {/* Feature description */}
                        <p
                          id={`${item.name.toLowerCase()}-description`}
                          className='mt-1 text-gray-600 dark:text-gray-400'
                        >
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom action section with call-to-action links */}
                  <div className='bg-gray-50 dark:bg-gray-900/50'>
                    <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                      {/* Grid layout for action items with dividers */}
                      <div className='grid grid-cols-3 divide-x divide-gray-900/5 border-x border-gray-900/5 dark:divide-white/5 dark:border-white/10'>
                        {/* Map through call-to-action items */}
                        {callsToAction.map(item => (
                          <a
                            key={item.name}
                            href={item.href}
                            className='flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800'
                            aria-label={`${item.name} - ${item.href}`}
                          >
                            <item.icon
                              aria-hidden='true'
                              className='size-5 flex-none text-gray-400 dark:text-gray-500'
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </Popover>

            {/* Direct navigation links - visible on medium+ screens */}
            <a
              href='#precios'
              className='text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none'
              aria-label='Ver beneficios de la plataforma'
            >
              Beneficios
            </a>
            <a
              href='/faq'
              className='text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none'
              aria-label='Preguntas frecuentes'
            >
              FAQ
            </a>
          </div>
        </PopoverGroup>

        {/* Right-side section: theme toggle, CTA button, and login link */}
        {/* Visibility: hidden on mobile, visible on medium+ screens */}
        {/* Layout: horizontal flex with consistent 8px gaps between elements */}
        {/* Alignment: vertically centered with the navigation items */}
        <div className='hidden md:flex md:items-center md:gap-2 lg:items-center lg:gap-2'>
          {/* Theme toggle component for light/dark mode switching */}
          {/* Compact mode on medium screens (md), normal mode on large screens (lg+) */}
          <div className='md:block lg:hidden'>
            <ThemeToggle isCompact={true} />
          </div>
          <div className='hidden lg:block'>
            <ThemeToggle isCompact={false} />
          </div>

          {/* Primary call-to-action button */}
          <Link
            href='/signup'
            className='inline-flex items-center card-border !rounded-[14px] bg-primary-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:hover:bg-primary-600'
            data-analytics='nav_cta_signup'
            aria-label='Comenzar a usar VendeMás gratis'
          >
            Regístrate
          </Link>

          {/* Secondary login link */}
          <a
            href='#'
            className='inline-flex items-center card-border !rounded-[14px] bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-secondary-800 dark:text-white dark:hover:bg-secondary-700'
            aria-label='Iniciar sesión en VendeMás'
          >
            Log in <span aria-hidden='true'>&rarr;</span>
          </a>
        </div>
      </nav>

      {/* Mobile menu dialog - slide-out panel for small screens only */}
      {/* Hidden on large screens where full navigation is always visible */}
      {/* Provides full-screen mobile experience with proper backdrop and animations */}
      <Dialog
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        className='lg:hidden'
      >
        {/* Backdrop overlay */}
        <div className='fixed inset-0 z-50' />

        {/* Mobile menu panel with slide-in animation */}
        <FocusTrap isActive={mobileMenuOpen} onEscape={handleMobileMenuClose}>
          <DialogPanel
            ref={mobileMenuRef}
            id='mobile-menu'
            className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10'
          >
            {/* Header with logo and close button */}
            <div className='flex -mt-3 -mr-0.5 justify-between'>
              {/* Logo for mobile menu - same size as navbar */}
              <VendeMasLogo navbar className='lg:hidden -ml-2 -mt-1' asLink />

              {/* Close button for mobile menu */}
              <button
                type='button'
                onClick={handleMobileMenuClose}
                className='-mt-1 -mr-4 card-border !rounded-[14px] text-gray-700 dark:text-gray-400'
                style={{
                  height: '42px',
                  width: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label='Cerrar menú de navegación'
              >
                <span className='sr-only'>Close menu</span>
                <X aria-hidden='true' className='size-6' />
              </button>
            </div>

            {/* Mobile navigation content */}
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10 dark:divide-white/10'>
                {/* Main navigation section */}
                <div className='space-y-2 py-6'>
                  {/* Primary CTA button with animation */}
                  <Link
                    href='/signup'
                    className='-mx-3 mb-4 block card-border !rounded-[14px] bg-primary-500 px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-primary-600 transition-colors duration-200 animate-pulse-custom'
                    data-analytics='nav_cta_signup'
                    aria-label='Comenzar a usar VendeMás gratis'
                  >
                    Comenzar gratis
                  </Link>
                  {/* Collapsible products section */}
                  <Disclosure as='div' className='-mx-3'>
                    <DisclosureButton className='group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'>
                      Herramientas
                      <ChevronDown
                        aria-hidden='true'
                        className='size-5 flex-none group-data-open:rotate-180'
                      />
                    </DisclosureButton>

                    {/* Collapsible content for products and actions */}
                    <DisclosurePanel className='mt-2 space-y-2'>
                      {[...products, ...callsToAction].map(item => (
                        <DisclosureButton
                          key={item.name}
                          as='a'
                          href={item.href}
                          className='block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'
                          aria-label={`${item.name} - ${item.href}`}
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>

                  {/* Direct navigation links */}
                  <a
                    href='#precios'
                    className='-mx-3 block card-border bg-white px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-600 rounded-[14px]'
                    aria-label='Ver beneficios de la plataforma'
                  >
                    Beneficios
                  </a>
                  <a
                    href='/herramientas'
                    className='-mx-3 block card-border bg-white px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-600 rounded-[14px]'
                    aria-label='Ver herramientas de la plataforma'
                  >
                    Herramientas
                  </a>
                  <a
                    href='#'
                    className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'
                    aria-label='Explorar marketplace'
                  >
                    Marketplace
                  </a>
                  <a
                    href='/faq'
                    className='-mx-3 block card-border bg-white px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-600 rounded-[14px]'
                    aria-label='Preguntas frecuentes'
                  >
                    FAQ
                  </a>
                </div>

                {/* Bottom CTA section for mobile */}
                <div className='py-6'>
                  {/* Secondary login link */}
                  <a
                    href='#'
                    className='-mx-3 block card-border bg-white px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-600 rounded-[14px]'
                    aria-label='Iniciar sesión en VendeMás'
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </FocusTrap>
      </Dialog>
    </header>
  );
}
