'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ScrollState } from './branding/AnimatedLogo';

interface AnimatedNavMenuProps {
  scrollState: ScrollState;
  children: React.ReactNode;
  className?: string;
}

// Animation variants for the navigation menu
const navMenuVariants = {
  atTop: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  scrolling: {
    y: -20,
    opacity: 0.9,
    scale: 0.95,
  },
  fixed: {
    y: -40,
    opacity: 1,
    scale: 1,
  },
};

export function AnimatedNavMenu({
  scrollState,
  children,
  className,
}: AnimatedNavMenuProps): React.JSX.Element {
  return (
    <motion.div
      className={className}
      variants={navMenuVariants}
      initial='atTop'
      animate={scrollState}
      transition={{
        duration: 0.4,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedNavMenu;
