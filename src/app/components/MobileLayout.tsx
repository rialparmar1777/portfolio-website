'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import MobileNavbar from './MobileNavbar';
import ThemeToggle from './ThemeToggle';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home');
  const { getBackgroundColor, getTextColor, getBorderColor } = useThemeStyles();

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full"
      style={{ background: getBackgroundColor('default') }}
    >
      {/* Mobile-specific navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b"
        style={{ borderColor: getBorderColor('light') }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold" style={{ color: getTextColor('primary') }}>Rial's Portfolio</h1>
            <ThemeToggle size="sm" />
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <MobileNavbar activeSection={activeSection} onNavigate={handleNavigation} />
    </motion.div>
  );
};

export default MobileLayout; 