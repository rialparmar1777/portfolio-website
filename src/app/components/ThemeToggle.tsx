'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useThemeStyles } from '../hooks/useThemeStyles';
import GlassCard from './GlassCard';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', size = 'md' }) => {
  const { theme, toggleTheme } = useTheme();
  const { getTextColor } = useThemeStyles();
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  return (
    <GlassCard
      className={`flex items-center justify-center ${sizeClasses[size]} ${className}`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ color: getTextColor('primary') }}
      >
        {theme === 'dark' ? (
          <FaSun className={iconSizes[size]} />
        ) : (
          <FaMoon className={iconSizes[size]} />
        )}
      </motion.div>
    </GlassCard>
  );
};

export default ThemeToggle; 