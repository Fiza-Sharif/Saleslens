'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface IconPopProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function IconPop({ children, delay = 0, className = '' }: IconPopProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.08, rotate: 2 }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 18,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
