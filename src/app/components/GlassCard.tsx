'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  isHovered?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  whileHover?: any;
  whileTap?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  style?: React.CSSProperties;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  isActive = false,
  isHovered = false,
  onClick,
  disabled = false,
  whileHover = { scale: 1.02 },
  whileTap = { scale: 0.98 },
  initial,
  animate,
  exit,
  transition,
  onHoverStart,
  onHoverEnd,
  style,
}) => {
  const { getGlassStyles, getTextColor, getGradient } = useThemeStyles();
  const styles = getGlassStyles(isActive, isHovered);
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg backdrop-blur-sm ${className}`}
      style={{
        ...styles,
        ...style,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'auto',
        backdropFilter: 'blur(8px)',
      }}
      onClick={disabled ? undefined : onClick}
      whileHover={whileHover}
      whileTap={whileTap}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: isActive 
            ? getGradient('glassActive')
            : isHovered
              ? getGradient('glassHover')
              : getGradient('glass'),
        }}
        animate={{ 
          opacity: isActive || isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Border gradient */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: isActive 
            ? getGradient('glassActive')
            : isHovered
              ? getGradient('glassHover')
              : getGradient('glass'),
          maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: '1px',
        }}
        animate={{ 
          opacity: isActive || isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${getTextColor('primary')}20, transparent)`,
          transform: 'translateX(-100%)',
        }}
        animate={{ 
          opacity: isHovered ? [0, 0.5, 0] : 0,
          x: isHovered ? ['-100%', '100%', '100%'] : '-100%',
        }}
        transition={{ 
          duration: 1.5,
          ease: 'easeInOut',
          times: [0, 0.5, 1],
        }}
      />
    </motion.div>
  );
};

export default GlassCard; 