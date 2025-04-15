'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { useThemeStyles } from '../hooks/useThemeStyles';
import GlassCard from './GlassCard';

interface DownloadButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  className = '',
  onClick,
  disabled = false,
}) => {
  const { getTextColor, colors, shadows } = useThemeStyles();

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const variantStyles = {
    primary: {
      background: `linear-gradient(135deg, ${colors.primary}20, ${colors.primary}10)`,
      borderColor: `${colors.primary}40`,
      hoverBorderColor: `${colors.primary}60`,
      textColor: getTextColor('primary'),
    },
    secondary: {
      background: `linear-gradient(135deg, ${colors.secondary}20, ${colors.secondary}10)`,
      borderColor: `${colors.secondary}40`,
      hoverBorderColor: `${colors.secondary}60`,
      textColor: getTextColor('secondary'),
    },
  };

  const style = variantStyles[variant];

  return (
    <GlassCard
      className={`flex items-center justify-center gap-2 ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: style.background,
        borderColor: style.borderColor,
        color: style.textColor,
        boxShadow: shadows.sm,
        transition: 'all 0.3s ease',
      }}
    >
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ x: 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <FaDownload className="text-lg" />
        <span className="font-medium">Download CV</span>
      </motion.div>
    </GlassCard>
  );
};

export default DownloadButton; 