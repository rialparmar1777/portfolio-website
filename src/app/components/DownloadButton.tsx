'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RiDownloadLine } from 'react-icons/ri';
import GlassCard from './GlassCard';

interface DownloadButtonProps {
  onDownload: () => void;
  isDownloading?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onDownload,
  isDownloading = false,
  className = '',
  size = 'md',
  label = 'Resume',
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  return (
    <GlassCard
      className={`flex items-center space-x-2 ${sizeClasses[size]} ${className}`}
      onClick={onDownload}
      disabled={isDownloading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={isDownloading ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <RiDownloadLine className={iconSizes[size]} />
      </motion.div>
      <span>{isDownloading ? 'Downloading...' : label}</span>
    </GlassCard>
  );
};

export default DownloadButton; 