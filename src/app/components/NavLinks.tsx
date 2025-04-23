'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface NavLinksProps {
  items: NavItem[];
  activeSection: string;
  onNavigate: (section: string) => void;
  layout?: 'horizontal' | 'vertical';
  onLinkClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({
  items,
  activeSection,
  onNavigate,
  layout = 'horizontal',
  onLinkClick,
}) => {
  const { isDark } = useThemeStyles();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    onNavigate(section);
    onLinkClick?.();
  };
  
  return (
    <div
      className={`flex ${
        layout === 'vertical'
          ? 'flex-col space-y-4'
          : 'items-center space-x-8'
      }`}
    >
      {items.map(({ href, label, icon }) => {
        const section = href.replace('#', '');
        const isActive = activeSection === section;
        
        return (
          <motion.div
            key={href}
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={href}
              onClick={(e) => handleClick(e, section)}
              className={`flex items-center relative group ${
                layout === 'vertical' ? 'px-4 py-3' : 'px-3 py-2'
              } rounded-xl transition-all duration-300 ${
                isActive
                  ? isDark
                    ? 'bg-gradient-to-r from-teal-500/20 via-cyan-500/15 to-teal-500/20 text-white'
                    : 'bg-black/5 text-gray-900'
                  : isDark
                    ? 'text-gray-300 hover:text-teal-300 hover:bg-teal-500/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
              }`}
                  style={{ 
                backdropFilter: 'blur(8px)',
                border: isActive && isDark ? '1px solid rgba(45, 212, 191, 0.2)' : 'none',
                boxShadow: isActive && isDark ? '0 0 20px rgba(13, 40, 44, 0.2)' : 'none',
                background: isActive && isDark ? 'linear-gradient(135deg, rgba(13, 40, 44, 0.4), rgba(22, 78, 99, 0.4))' : undefined,
                  }}
                >
              <span className={`${
                isActive
                  ? isDark
                    ? 'text-white'
                    : 'text-gray-900'
                  : isDark
                    ? 'text-gray-300 group-hover:text-teal-300'
                    : 'text-gray-500 group-hover:text-gray-900'
              } transition-colors duration-300`}>
                {icon}
              </span>
              <span className={`ml-2 text-sm font-medium ${
                layout === 'vertical' ? '' : 'hidden sm:inline-block'
              }`}>
                {label}
                </span>
                
              {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                  className={`absolute ${
                    layout === 'vertical'
                      ? 'left-0 top-0 bottom-0 w-1'
                      : 'bottom-0 left-0 right-0 h-0.5'
                  } bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 rounded-full`}
                style={{
                    boxShadow: isDark ? '0 0 10px rgba(45, 212, 191, 0.3)' : 'none',
                  }}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
              />
              )}
            </a>
          </motion.div>
        );
      })}
    </div>
  );
};

export default NavLinks; 