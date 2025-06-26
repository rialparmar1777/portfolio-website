'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { FaHome, FaUser, FaBriefcase, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import GlassCard from './GlassCard';
import ThemeToggle from './ThemeToggle';
import SocialLinks from './SocialLinks';
import DownloadButton from './DownloadButton';
import NavLinks from './NavLinks';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  onDownloadResume: () => void;
  isDownloading: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection,
  onDownloadResume,
  isDownloading,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { isDark, getBackgroundColor, getBorderColor, getShadow } = useThemeStyles();
  const menuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  
  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  const navItems = [
    { href: '#home', label: 'Home', icon: <FaHome className="w-4 h-4" /> },
    { href: '#about', label: 'About', icon: <FaUser className="w-4 h-4" /> },
    { href: '#experience', label: 'Experience', icon: <FaBriefcase className="w-4 h-4" /> },
    { href: '#projects', label: 'Projects', icon: <FaProjectDiagram className="w-4 h-4" /> },
    { href: '#contact', label: 'Contact', icon: <FaEnvelope className="w-4 h-4" /> },
  ];
  
  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />
      
      <motion.nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-40 w-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        style={{
          background: isScrolled
            ? isDark
              ? 'linear-gradient(120deg, #101828 80%, #0f172a 100%)'
              : 'rgba(255, 255, 255, 0.7)'
            : 'transparent',
          borderBottom: isScrolled
            ? `1px solid ${getBorderColor('light')}`
            : 'none',
          boxShadow: isScrolled
            ? isDark
              ? getShadow('glass')
              : getShadow('md')
            : 'none',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsLogoHovered(true)}
              onHoverEnd={() => setIsLogoHovered(false)}
            >
              <a 
                href="#home" 
                className="text-2xl font-bold relative group flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <motion.div
                  className="mr-3 p-2.5 rounded-xl shadow-lg"
                  style={{
                    background: isDark
                      ? getBackgroundColor('glass')
                      : getBackgroundColor('paper'),
                    border: `1px solid ${getBorderColor('light')}`,
                    boxShadow: isDark ? '0 0 24px 0 #38bdf833' : getShadow('md'),
                  }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className={`text-2xl font-extrabold ${
                    isDark
                      ? 'text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)]'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600'
                  } ${isDark ? '' : 'text-transparent bg-clip-text'}`}>
                    R
                  </span>
                </motion.div>
                <span className={`relative ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Portfolio
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: isLogoHovered ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </a>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLinks
                items={navItems}
                activeSection={activeSection}
                onNavigate={onNavigate}
              />
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-opacity-20" 
                style={{ 
                  borderColor: getBorderColor('light'),
                  boxShadow: isDark ? '0 2px 16px 0 #38bdf822' : getShadow('sm'),
                  background: isDark ? getBackgroundColor('glass') : 'transparent',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <ThemeToggle />
                <DownloadButton 
                  onClick={onDownloadResume} 
                  disabled={isDownloading} 
                />
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                className={`p-2.5 rounded-xl backdrop-blur-sm transition-colors ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-white'
                    : 'bg-black/5 hover:bg-black/10 text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoCloseOutline className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoMenuOutline className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              className="md:hidden fixed inset-x-0 top-20 z-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                background: isDark
                  ? 'linear-gradient(to right, rgba(13, 40, 44, 0.98), rgba(22, 78, 99, 0.98))'
                  : 'rgba(255, 255, 255, 0.9)',
                borderBottom: `1px solid ${isDark ? 'rgba(45, 212, 191, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
                boxShadow: isDark
                  ? '0 4px 30px rgba(13, 40, 44, 0.3)'
                  : '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="px-4 py-6 space-y-6">
                <NavLinks
                  items={navItems}
                  activeSection={activeSection}
                  onNavigate={(section) => {
                    onNavigate(section);
                    setIsMenuOpen(false);
                  }}
                  layout="vertical"
                  onLinkClick={() => setIsMenuOpen(false)}
                />
                <div className="flex items-center justify-between pt-6 border-t border-opacity-20"
                  style={{ 
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <ThemeToggle />
                  <DownloadButton 
                    onClick={onDownloadResume} 
                    disabled={isDownloading} 
                  />
                </div>
                <div className="pt-4">
                  <SocialLinks className="justify-center" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar; 