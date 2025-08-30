'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

// Import the base logo component
import VendeMasLogo from './VendeMasLogo';

// Types for scroll states
export type ScrollState = 'atTop' | 'scrolling' | 'fixed';

interface AnimatedLogoProps {
  scrollState: ScrollState;
  className?: string;
  asLink?: boolean;
}

// Animation variants for smooth transitions
const logoVariants = {
  atTop: {
    scale: 1,
    opacity: 1,
    y: 0,
  },
  scrolling: {
    scale: 0.9,
    opacity: 0.8,
    y: -10,
  },
  fixed: {
    scale: 1,
    opacity: 1,
    y: 0,
  },
};

export function AnimatedLogo({
  scrollState,
  className,
  asLink = false,
}: AnimatedLogoProps): React.JSX.Element {
  return (
    <motion.div
      className={clsx('relative', className)}
      variants={logoVariants}
      initial='atTop'
      animate={scrollState}
      transition={{
        duration: 0.4,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      <AnimatePresence mode='wait'>
        {scrollState === 'atTop' && (
          <motion.div
            key='md'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.3,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <VendeMasLogo size='md' asLink={asLink} />
          </motion.div>
        )}

        {scrollState === 'scrolling' && (
          <motion.div
            key='sm'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.3,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <VendeMasLogo size='sm' asLink={asLink} />
          </motion.div>
        )}

        {scrollState === 'fixed' && (
          <motion.div
            key='xs'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.3,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <VendeMasLogo size='xs' asLink={asLink} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AnimatedLogo;
