'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { 
  HomeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  FolderIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';

interface MobileNavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ activeSection, onNavigate }) => {
  const { getBackgroundColor, getTextColor, getBorderColor } = useThemeStyles();

  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'about', icon: UserIcon, label: 'About' },
    { id: 'experience', icon: BriefcaseIcon, label: 'Experience' },
    { id: 'projects', icon: FolderIcon, label: 'Projects' },
    { id: 'contact', icon: EnvelopeIcon, label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ 
        background: getBackgroundColor('paper'),
        borderTop: `1px solid ${getBorderColor('light')}`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {navItems.map(({ id, icon: Icon, label }) => (
            <motion.button
              key={id}
              onClick={() => onNavigate(id)}
              className="flex flex-col items-center justify-center w-16"
              whileTap={{ scale: 0.95 }}
            >
              <Icon
                className={`w-6 h-6 mb-1 ${
                  activeSection === id ? 'text-primary' : 'text-secondary'
                }`}
                style={{ color: activeSection === id ? getTextColor('primary') : getTextColor('secondary') }}
              />
              <span
                className={`text-xs ${
                  activeSection === id ? 'text-primary' : 'text-secondary'
                }`}
                style={{ color: activeSection === id ? getTextColor('primary') : getTextColor('secondary') }}
              >
                {label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default MobileNavbar; 