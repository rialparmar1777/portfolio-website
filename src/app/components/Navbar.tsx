'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isHovered, setIsHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { getBackgroundColor, getTextColor, getBorderColor, getGlassStyles } = useThemeStyles();
  const menuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const navItems = [
    { href: '#home', label: 'Home', icon: <FaHome className="w-4 h-4" /> },
    { href: '#about', label: 'About', icon: <FaUser className="w-4 h-4" /> },
    { href: '#experience', label: 'Experience', icon: <FaBriefcase className="w-4 h-4" /> },
    { href: '#projects', label: 'Projects', icon: <FaProjectDiagram className="w-4 h-4" /> },
    { href: '#contact', label: 'Contact', icon: <FaEnvelope className="w-4 h-4" /> },
  ];
  
  const glassStyles = getGlassStyles(false, isScrolled);
  
  return (
    <motion.nav
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      style={{
        background: isScrolled ? glassStyles.background : 'transparent',
        borderBottom: isScrolled ? `1px solid ${getBorderColor('light')}` : 'none',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
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
              style={{ 
                color: getTextColor('primary'),
                textShadow: isLogoHovered ? '0 0 8px rgba(147, 51, 234, 0.5)' : 'none',
              }}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
            >
              <motion.div
                className="mr-2 p-2 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))',
                  border: `1px solid ${getBorderColor('light')}`,
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 font-extrabold">R</span>
              </motion.div>
              <span className="relative">
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
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks
              items={navItems}
              activeSection={activeSection}
              onNavigate={onNavigate}
            />
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l" style={{ borderColor: getBorderColor('light') }}>
              <ThemeToggle />
              <DownloadButton 
                onDownload={onDownloadResume} 
                isDownloading={isDownloading} 
              />
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              className="p-2 rounded-md focus:outline-none relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: getTextColor('primary') }}
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
            className="md:hidden absolute top-20 left-0 right-0 z-50"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              background: glassStyles.background,
              borderBottom: `1px solid ${getBorderColor('light')}`,
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
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
              <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: getBorderColor('light') }}>
                <ThemeToggle />
                <DownloadButton 
                  onDownload={onDownloadResume} 
                  isDownloading={isDownloading} 
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
  );
};

export default Navbar; 