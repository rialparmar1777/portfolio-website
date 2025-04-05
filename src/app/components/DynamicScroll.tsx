'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';

interface DynamicScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down';
  threshold?: number;
  delay?: number;
}

const DynamicScroll: React.FC<DynamicScrollProps> = ({
  children,
  className = '',
  direction = 'up',
  threshold = 0.1,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { getTextColor } = useThemeStyles();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  // Simple transform for vertical movement
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [10, -10] : [-10, 10]
  );
  
  // Simple fade in/out effect with more gradual transitions
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );
  
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      style={{
        opacity,
        y,
      }}
    >
      {children}
    </motion.div>
  );
};

export default DynamicScroll; 