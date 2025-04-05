'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import DynamicScroll from './DynamicScroll';

interface ScrollSectionProps {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  stickyHeight?: string;
  parallaxSpeed?: number;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  title,
  subtitle,
  content,
  className = '',
  backgroundColor = 'transparent',
  textColor,
  stickyHeight = '100vh',
  parallaxSpeed = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getTextColor } = useThemeStyles();
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  // Smooth spring animation for the scroll effect
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  // Parallax effect for the content
  const y = useTransform(
    smoothProgress,
    [0, 1],
    [0, -100 * parallaxSpeed]
  );
  
  // Fade in effect for the title
  const titleOpacity = useTransform(
    smoothProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [0, 1, 1, 1, 1, 0]
  );
  
  // Scale effect for the title
  const titleScale = useTransform(
    smoothProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [0.8, 1, 1, 1, 1, 0.8]
  );
  
  // Check if the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ backgroundColor }}
    >
      {/* Sticky container */}
      <div
        className="sticky top-0 z-10 flex items-center justify-center"
        style={{ height: stickyHeight }}
      >
        <motion.div
          className="text-center max-w-4xl mx-auto px-4"
          style={{
            opacity: titleOpacity,
            scale: titleScale,
          }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: textColor || getTextColor('primary') }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-xl md:text-2xl"
              style={{ color: textColor || getTextColor('secondary') }}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
      
      {/* Content with parallax effect */}
      <motion.div
        className="relative z-0"
        style={{ y }}
      >
        {content}
      </motion.div>
    </div>
  );
};

export default ScrollSection; 