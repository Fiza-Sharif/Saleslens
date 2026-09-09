'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({ children, className = '', hoverEffect = false, ...props }: CardProps) {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles = `bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm ${
    hoverEffect ? 'transition-shadow duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700' : ''
  } ${className}`;

  if (hoverEffect && !shouldReduceMotion) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={baseStyles}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseStyles} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-4 flex flex-col gap-1 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-bold text-slate-900 dark:text-white tracking-tight ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-xs text-slate-500 dark:text-slate-400 leading-relaxed ${className}`}>{children}</p>;
}
