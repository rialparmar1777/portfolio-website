'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import GlassCard from './GlassCard';

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface NavLinksProps {
  items: NavLink[];
  activeSection: string;
  onNavigate: (section: string) => void;
  className?: string;
  layout?: 'horizontal' | 'vertical';
  onLinkClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({
  items,
  activeSection,
  onNavigate,
  className = '',
  layout = 'horizontal',
  onLinkClick,
}) => {
  const { getTextColor, getBorderColor } = useThemeStyles();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  
  const containerClasses = {
    horizontal: 'flex items-center space-x-4',
    vertical: 'flex flex-col space-y-3',
  };
  
  const handleClick = (href: string) => {
    const section = href.slice(1); // Remove the # from the href
    onNavigate(section);
    onLinkClick?.();
    
    // Special handling for home section
    if (section === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className={`${containerClasses[layout]} ${className}`}>
      {items.map((item, index) => {
        const isActive = activeSection === item.href.slice(1);
        const isHovered = hoveredIndex === index;
        
        return (
          <motion.div
            key={item.href}
            className="relative"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GlassCard
              isActive={isActive}
              isHovered={isHovered}
              className={`px-4 py-2 cursor-pointer ${layout === 'vertical' ? 'w-full' : ''}`}
              onClick={() => handleClick(item.href)}
            >
              <div className="flex items-center">
                {item.icon && (
                  <motion.div 
                    className="mr-2"
                    animate={{ 
                      scale: isHovered || isActive ? 1.1 : 1,
                      color: isActive ? 'var(--color-primary)' : undefined
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                  </motion.div>
                )}
                <span 
                  className="relative z-10 font-medium"
                  style={{ 
                    color: getTextColor(isActive ? 'primary' : 'secondary'),
                    textShadow: isHovered ? '0 0 8px rgba(147, 51, 234, 0.3)' : 'none',
                  }}
                >
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
};

export default NavLinks; 