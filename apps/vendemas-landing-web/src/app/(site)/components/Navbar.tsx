'use client';

import React, { useState, useEffect } from 'react';
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
import VendeMasLogo from './branding/VendeMasLogo';
import {
  RotateCcw,
  Menu,
  BarChart3,
  MousePointer2,
  Shield,
  Layers,
  X,
  ChevronDown,
  PlayCircle,
  Blocks,
} from 'lucide-react';

const products = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of your traffic',
    href: '#',
    icon: BarChart3,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers',
    href: '#',
    icon: MousePointer2,
  },
  {
    name: 'Security',
    description: 'Your customers’ data will be safe and secure',
    href: '#',
    icon: Shield,
  },
  {
    name: 'Integrations',
    description: 'Connect with third-party tools',
    href: '#',
    icon: Layers,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will convert',
    href: '#',
    icon: RotateCcw,
  },
];
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircle },
  { name: 'Contact sales', href: '#', icon: Blocks },
];
const company = [
  { name: 'About us', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'Support', href: '#' },
  { name: 'Press', href: '#' },
  { name: 'Blog', href: '#' },
];

export default function Example(): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`transition-all duration-300 ${
        isScrolled
          ? 'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm dark:bg-gray-900/95'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label='Global'
        className='mx-auto flex max-w-7xl items-center justify-between p-6 md:px-8'
      >
        <div className='flex md:flex-1'>
          <VendeMasLogo size='sm' asLink />
        </div>
        <div className='flex md:hidden'>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors duration-300 ${
              isScrolled
                ? 'text-gray-700 dark:text-gray-400'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            <span className='sr-only'>Open main menu</span>
            <Menu aria-hidden='true' className='size-6' />
          </button>
        </div>
        <PopoverGroup className='hidden md:flex md:gap-x-12'>
          <Popover className='relative'>
            <PopoverButton
              className={`flex items-center gap-x-1 text-sm/6 font-semibold transition-colors duration-300 ${
                isScrolled
                  ? 'text-gray-900 dark:text-white'
                  : 'text-white dark:text-gray-200'
              }`}
            >
              Product
              <ChevronDown
                aria-hidden='true'
                className={`size-5 flex-none transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-400 dark:text-gray-500'
                    : 'text-white/70 dark:text-gray-300'
                }`}
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className='absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg outline-1 outline-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10'
            >
              <div className='p-4'>
                {products.map(item => (
                  <div
                    key={item.name}
                    className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50 dark:hover:bg-white/5'
                  >
                    <div className='flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-gray-700/50 dark:group-hover:bg-gray-700'>
                      <item.icon
                        aria-hidden='true'
                        className='size-6 text-secondary-600 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-white'
                      />
                    </div>
                    <div className='flex-auto'>
                      <a
                        href={item.href}
                        className='block font-semibold text-gray-900 dark:text-white'
                      >
                        {item.name}
                        <span className='absolute inset-0' />
                      </a>
                      <p className='mt-1 text-gray-600 dark:text-gray-400'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:divide-white/10 dark:bg-gray-700/50'>
                {callsToAction.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700/50'
                  >
                    <item.icon
                      aria-hidden='true'
                      className='size-5 flex-none text-gray-400 dark:text-gray-500'
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a
            href='#'
            className={`text-sm/6 font-semibold transition-colors duration-300 ${
              isScrolled
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            Features
          </a>
          <a
            href='#'
            className={`text-sm/6 font-semibold transition-colors duration-300 ${
              isScrolled
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            Marketplace
          </a>

          <Popover className='relative'>
            <PopoverButton
              className={`flex items-center gap-x-1 text-sm/6 font-semibold transition-colors duration-300 ${
                isScrolled
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              Company
              <ChevronDown
                aria-hidden='true'
                className={`size-5 flex-none transition-colors duration-300 ${
                  isScrolled
                    ? 'text-gray-400 dark:text-gray-500'
                    : 'text-white/70 dark:text-gray-300'
                }`}
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className='absolute left-1/2 z-10 mt-3 w-56 -translate-x-1/2 rounded-xl bg-white p-2 shadow-lg outline-1 outline-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10'
            >
              {company.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className='block rounded-lg px-3 py-2 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'
                >
                  {item.name}
                </a>
              ))}
            </PopoverPanel>
          </Popover>
        </PopoverGroup>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <a
            href='#'
            className={`text-sm/6 font-semibold transition-colors duration-300 ${
              isScrolled
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            Log in <span aria-hidden='true'>&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className='lg:hidden'
      >
        <div
          className='fixed inset-0 z-50'
          onClick={() => setMobileMenuOpen(false)}
        />
        <DialogPanel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10'>
          <div className='flex items-center justify-between'>
            <VendeMasLogo size='xs' asLink />
            <button
              type='button'
              onClick={() => setMobileMenuOpen(false)}
              className='-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400'
            >
              <span className='sr-only'>Close menu</span>
              <X aria-hidden='true' className='size-6' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10 dark:divide-white/10'>
              <div className='space-y-2 py-6'>
                <Disclosure as='div' className='-mx-3'>
                  <DisclosureButton className='group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'>
                    Product
                    <ChevronDown
                      aria-hidden='true'
                      className='size-5 flex-none group-data-open:rotate-180'
                    />
                  </DisclosureButton>
                  <DisclosurePanel className='mt-2 space-y-2'>
                    {[...products, ...callsToAction].map(item => (
                      <DisclosureButton
                        key={item.name}
                        as='a'
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className='block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <a
                  href='#'
                  onClick={() => setMobileMenuOpen(false)}
                  className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'
                >
                  Features
                </a>
                <a
                  href='#'
                  onClick={() => setMobileMenuOpen(false)}
                  className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'
                >
                  Marketplace
                </a>

                <Disclosure as='div' className='-mx-3'>
                  <DisclosureButton className='group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'>
                    Company
                    <ChevronDown
                      aria-hidden='true'
                      className='size-5 flex-none group-data-open:rotate-180'
                    />
                  </DisclosureButton>
                  <DisclosurePanel className='mt-2 space-y-2'>
                    {company.map(item => (
                      <DisclosureButton
                        key={item.name}
                        as='a'
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className='block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              </div>
              <div className='py-6'>
                <a
                  href='#'
                  onClick={() => setMobileMenuOpen(false)}
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
