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
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ activeSection, onNavigate }) => {
  const { getBackgroundColor, getTextColor, getBorderColor } = useThemeStyles();
  const pathname = usePathname();
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
            ? 'bg-gray-900/95 backdrop-blur-xl border-2 border-gray-700 shadow-2xl shadow-black/30' 
            : 'bg-white/95 backdrop-blur-xl border-2 border-gray-200 shadow-2xl shadow-gray-200/30'
        }`}>
          <div className="flex justify-around items-center">
            {navItems.map(({ id, icon: Icon, label }) => {
              const isActive = pathname === `/${id}`;
              return (
                <Link
                  key={id}
                  href={`/${id}`}
                  className={`group relative flex flex-col items-center justify-center w-16 h-14 transition-all duration-300 ${
                    isActive 
                      ? theme === 'dark' 
                        ? 'text-blue-400 scale-110' 
                        : 'text-blue-600 scale-110'
                      : theme === 'dark' 
                        ? 'text-gray-300 hover:text-gray-100' 
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute -top-1 w-12 h-1 rounded-full ${
                        theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon
                    className={`w-6 h-6 transition-transform duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`}
                  />
                  <span className={`text-xs mt-1 font-semibold transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                  }`}>
                    {label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className={`absolute inset-0 rounded-xl ${
                        theme === 'dark' 
                          ? 'bg-blue-400/10' 
                          : 'bg-blue-100'
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default MobileNavbar; 