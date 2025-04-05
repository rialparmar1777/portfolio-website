'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import GlassCard from './GlassCard';
import { useThemeStyles } from '../hooks/useThemeStyles';

interface SocialLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface SocialLinksProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  links?: SocialLink[];
}

const defaultLinks: SocialLink[] = [
  { href: 'https://github.com/rialparmar1777', icon: FaGithub, label: 'GitHub' },
  { href: 'https://linkedin.com/in/rial-p-886b38145/', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'mailto:rialparmar007@gmail.com', icon: MdEmail, label: 'Email' },
];

const SocialLinks: React.FC<SocialLinksProps> = ({
  className = '',
  size = 'md',
  layout = 'horizontal',
  links = defaultLinks,
}) => {
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
  
  const containerClasses = {
    horizontal: 'flex items-center space-x-4',
    vertical: 'flex flex-col items-center space-y-4',
  };
  
  return (
    <div className={`${containerClasses[layout]} ${className}`}>
      {links.map((link: SocialLink) => (
        <GlassCard
          key={link.label}
          className={`flex items-center justify-center ${sizeClasses[size]}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
            aria-label={link.label}
            style={{ color: getTextColor('primary') }}
          >
            <link.icon className={iconSizes[size]} />
          </a>
        </GlassCard>
      ))}
    </div>
  );
};

export default SocialLinks; 