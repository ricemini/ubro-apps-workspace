'use client';

import { useState } from 'react';
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
    description: 'Your customers’ data will be safe and secure',
    href: '#',
    icon: Shield,
  },
  {
    name: 'Integrations',
    description: 'Your customers’ data will be safe and secure',
    href: '#',
    icon: SquarePlus,
  },
];
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircle },
  { name: 'Contact sales', href: '#', icon: Phone },
  { name: 'View all products', href: '#', icon: Grid3X3 },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='relative isolate z-10 bg-white dark:bg-gray-950'>
      <nav
        aria-label='Global'
        className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
      >
        {/* Logo */}
        <div className='flex lg:flex-1'>
          <div className='flex lg:flex-1'>
            <VendeMasLogo size='sm' className='lg:hidden' asLink />
            <VendeMasLogo size='md' className='hidden lg:block' asLink />
          </div>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400'
          >
            <span className='sr-only'>Open main menu</span>
            <Menu aria-hidden='true' className='size-6' />
          </button>
        </div>
        <PopoverGroup className='hidden lg:flex lg:gap-x-12'>
          <Popover>
            <PopoverButton className='flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 dark:text-white'>
              Herramientas
              <ChevronDown
                aria-hidden='true'
                className='size-5 flex-none text-gray-400 dark:text-gray-500'
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className='absolute inset-x-0 top-16 bg-white transition data-closed:-translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in dark:bg-gray-950'
            >
              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
              <div
                aria-hidden='true'
                className='absolute inset-0 top-1/2 bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-950 dark:shadow-none dark:ring-white/15'
              />
              <div className='relative bg-white dark:bg-gray-950'>
                <div className='mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8'>
                  {products.map(item => (
                    <div
                      key={item.name}
                      className='group relative rounded-lg p-6 text-sm/6 hover:bg-gray-50 dark:hover:bg-white/5'
                    >
                      <div className='flex size-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-gray-700/50 dark:group-hover:bg-gray-700'>
                        <item.icon
                          aria-hidden='true'
                          className='size-6 text-gray-600 group-hover:text-secondary-600 dark:text-gray-400 dark:group-hover:text-white'
                        />
                      </div>
                      <a
                        href={item.href}
                        className='mt-6 block font-semibold text-gray-900 dark:text-white'
                      >
                        {item.name}
                        <span className='absolute inset-0' />
                      </a>
                      <p className='mt-1 text-gray-600 dark:text-gray-400'>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className='bg-gray-50 dark:bg-gray-900/50'>
                  <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                    <div className='grid grid-cols-3 divide-x divide-gray-900/5 border-x border-gray-900/5 dark:divide-white/5 dark:border-white/10'>
                      {callsToAction.map(item => (
                        <a
                          key={item.name}
                          href={item.href}
                          className='flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800'
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

          <a
            href='#'
            className='text-sm/6 font-semibold text-gray-900 dark:text-white'
          >
            Planes
          </a>
          <a
            href='#'
            className='text-sm/6 font-semibold text-gray-900 dark:text-white'
          >
            FAQ
          </a>
        </PopoverGroup>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <ThemeToggle />
          <Link
            href='/signup'
            className='ml-4 inline-flex items-center rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:hover:bg-primary-600'
            data-analytics='nav_cta_signup'
          >
            Comenzar gratis
          </Link>
          <a
            href='#'
            className='ml-4 mt-2 text-sm/6 font-semibold text-gray-900 dark:text-white'
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
        <div className='fixed inset-0 z-50' />
        <DialogPanel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10'>
          <div className='flex items-center justify-between'>
            <VendeMasLogo size='xs' className='lg:hidden' asLink />

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
                    Herramientas
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
                        className='block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href='#'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'
                >
                  Features
                </a>
                <a
                  href='#'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'
                >
                  Marketplace
                </a>
                <a
                  href='#'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5'
                >
                  Company
                </a>
              </div>
              <div className='py-6'>
                <Link
                  href='/signup'
                  className='-mx-3 mb-4 block rounded-lg bg-primary-500 px-3 py-2.5 text-base/7 font-semibold text-white shadow-sm hover:bg-primary-600 transition-colors duration-200 animate-pulse-custom'
                  data-analytics='nav_cta_signup'
                >
                  Comenzar gratis
                </Link>
                <a
                  href='#'
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
