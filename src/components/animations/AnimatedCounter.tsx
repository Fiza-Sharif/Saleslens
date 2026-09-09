'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  decimals = 2,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const shouldReduceMotion = useReducedMotion();
  const spring = useSpring(value, { stiffness: 120, damping: 18 });
  const display = useTransform(spring, (current) => {
    return `${prefix}${current.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;
  });

  const [formatted, setFormatted] = useState('');

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      setFormatted(latest);
    });
    return () => unsubscribe();
  }, [display]);

  if (shouldReduceMotion) {
    return (
      <span className={className}>
        {prefix}
        {value.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </span>
    );
  }

  return <motion.span className={className}>{formatted || `${prefix}${value}${suffix}`}</motion.span>;
}
