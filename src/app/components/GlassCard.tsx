'use client';

import React from 'react';
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
}) => {
  const { getGlassStyles, getTextColor } = useThemeStyles();
  const styles = getGlassStyles(isActive, isHovered);
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg backdrop-blur-sm ${className}`}
      style={{
        ...styles,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: isActive 
          ? `1px solid ${getTextColor('primary')}40` 
          : isHovered 
            ? `1px solid ${getTextColor('primary')}20` 
            : '1px solid transparent',
        boxShadow: isActive 
          ? `0 0 15px ${getTextColor('primary')}20` 
          : isHovered 
            ? `0 0 10px ${getTextColor('primary')}10` 
            : 'none',
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
            ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))' 
            : 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
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
            ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3))' 
            : 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
          maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: '1px',
        }}
        animate={{ 
          opacity: isActive ? 1 : isHovered ? 0.5 : 0 
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default GlassCard; 