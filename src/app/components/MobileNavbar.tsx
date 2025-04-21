'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { 
  HomeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  FolderIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';
import { useTheme } from '@/app/context/ThemeContext';

interface MobileNavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ activeSection, onNavigate }) => {
  const { getBackgroundColor, getTextColor, getBorderColor } = useThemeStyles();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'about', icon: UserIcon, label: 'About' },
    { id: 'experience', icon: BriefcaseIcon, label: 'Experience' },
    { id: 'projects', icon: FolderIcon, label: 'Projects' },
    { id: 'contact', icon: EnvelopeIcon, label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-3'
      }`}
    >
      <div className="mx-auto max-w-md px-4">
        <div className={`relative rounded-2xl p-2 ${
          theme === 'dark' 
            ? 'bg-gray-900/95 backdrop-blur-lg border border-gray-700 shadow-xl shadow-black/30 ring-1 ring-gray-800/50' 
            : 'bg-white/95 backdrop-blur-lg border border-gray-200 shadow-xl shadow-gray-300/50 ring-1 ring-gray-100/50'
        }`}>
          <div className="flex justify-around items-center">
            {navItems.map(({ id, icon: Icon }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className={`group relative flex flex-col items-center justify-center w-16 h-14 transition-all duration-300 ${
                    isActive 
                      ? 'text-blue-500 scale-110' 
                      : theme === 'dark' 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute -top-1 w-12 h-1 rounded-full ${
                        theme === 'dark' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]'
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center">
                    <Icon
                      className={`w-6 h-6 transition-transform duration-300 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                      style={{ color: isActive ? getTextColor('primary') : getTextColor('secondary') }}
                    />
                    <span className={`text-xs mt-1 font-medium transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                    }`}>
                      {id}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className={`absolute inset-0 rounded-xl ${
                        theme === 'dark' 
                          ? 'bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.2)]' 
                          : 'bg-blue-100 shadow-[0_0_10px_rgba(37,99,235,0.2)]'
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default MobileNavbar; 