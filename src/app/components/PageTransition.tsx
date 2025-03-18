'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  isTransitioning: boolean;
}

const PageTransition = ({ children, isTransitioning }: PageTransitionProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for mobile and reduced motion preferences
    const checkDevicePreferences = () => {
      setIsMobile(window.innerWidth <= 768);
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
    };

    checkDevicePreferences();
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      checkDevicePreferences();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  const welcomeText = "Welcome to Rial's Portfolio".split('');
  const particleCount = isMobile ? 30 : 100;

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="transition"
            className="fixed inset-0 z-[150] pointer-events-none"
          >
            {/* Welcome Text */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
            >
              <div className="relative">
                {/* Text Background Glow */}
                <motion.div
                  className="absolute inset-0 blur-2xl sm:blur-3xl opacity-50"
                  style={{
                    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: isMobile ? 1.5 : 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Animated Text */}
                <div className={`relative flex gap-[2px] overflow-hidden ${
                  isMobile ? 'text-2xl sm:text-3xl' : 'text-4xl md:text-6xl'
                } font-bold text-white tracking-wider`}>
                  {welcomeText.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -100, opacity: 0 }}
                      transition={{
                        duration: isMobile ? 0.6 : 0.8,
                        delay: index * (isMobile ? 0.03 : 0.04),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                      style={{
                        textShadow: '0 0 20px rgba(255,255,255,0.5)',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Initial Flash Effect */}
            {!isReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{
                  duration: isMobile ? 0.5 : 0.7,
                  times: [0, 0.15, 1],
                  ease: "easeInOut"
                }}
              />
            )}

            {/* Galaxy Explosion Effect */}
            <motion.div
              className="absolute inset-0 backdrop-blur-2xl sm:backdrop-blur-3xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0]
              }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ 
                duration: isMobile ? 1.2 : 1.5, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-blue-900/60" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  background: [
                    'radial-gradient(circle at center, rgba(147,51,234,0.7) 0%, rgba(59,130,246,0.7) 100%)',
                    'radial-gradient(circle at center, rgba(236,72,153,0.7) 0%, rgba(147,51,234,0.7) 100%)',
                    'radial-gradient(circle at center, rgba(147,51,234,0.7) 0%, rgba(59,130,246,0.7) 100%)',
                  ]
                }}
                transition={{ 
                  duration: isMobile ? 4 : 6, 
                  repeat: Infinity, 
                  ease: 'linear' 
                }}
              />
            </motion.div>

            {/* Animated Rings - Only show on non-mobile */}
            {!isMobile && !isReducedMotion && (
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`ring-${i}`}
                    className="absolute rounded-full border border-white/25"
                    style={{
                      width: `${800 + i * 160}px`,
                      height: `${800 + i * 160}px`,
                      left: `calc(50% - ${400 + i * 80}px)`,
                      top: `calc(50% - ${400 + i * 80}px)`,
                    }}
                    initial={{ scale: 2.4, opacity: 0 }}
                    animate={{
                      scale: [2.4, 1.4, 0.98, 1],
                      opacity: [0, 0.6, 0.4],
                      rotate: [0, 360],
                    }}
                    exit={{ scale: 2.4, opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                ))}
              </div>
            )}

            {/* Particle Explosion - Reduced particles on mobile */}
            {!isReducedMotion && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: isMobile ? 1.5 : 2 }}
              >
                {[...Array(particleCount)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className={`absolute rounded-full ${
                      isMobile ? 'w-1 h-1' : 'w-2 h-2'
                    } bg-white`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      x: [(Math.random() - 0.5) * (isMobile ? 100 : 200), (Math.random() - 0.5) * (isMobile ? 200 : 400)],
                      y: [(Math.random() - 0.5) * (isMobile ? 100 : 200), (Math.random() - 0.5) * (isMobile ? 200 : 400)],
                    }}
                    transition={{
                      duration: isMobile ? 1.5 : 2,
                      delay: Math.random() * (isMobile ? 0.4 : 0.6),
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Rocket Effect - Simplified on mobile */}
            {!isReducedMotion && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                initial={{ y: "110vh", opacity: 0 }}
                animate={{ 
                  y: [null, "80vh", "40vh", "-10vh"],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: isMobile ? 1.8 : 2.2,
                  times: [0, 0.25, 0.75, 1],
                  delay: 0.2,
                  ease: "easeInOut"
                }}
              >
                <div className={`relative ${isMobile ? 'scale-75' : 'scale-100'}`}>
                  {/* Rocket Body */}
                  <div className={`${
                    isMobile ? 'w-8 h-16' : 'w-12 h-24'
                  } bg-white rounded-full relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500" />
                  </div>
                  {/* Rocket Window */}
                  <div className={`absolute ${
                    isMobile ? 'top-4 w-4 h-4' : 'top-5 w-6 h-6'
                  } left-1/2 -translate-x-1/2 bg-blue-200 rounded-full`} />
                  {/* Rocket Fins */}
                  <div className={`absolute bottom-0 ${
                    isMobile ? '-left-3 w-4 h-4' : '-left-4 w-5 h-6'
                  } bg-purple-500 -skew-x-[30deg]`} />
                  <div className={`absolute bottom-0 ${
                    isMobile ? '-right-3 w-4 h-4' : '-right-4 w-5 h-6'
                  } bg-purple-500 skew-x-[30deg]`} />
                  {/* Rocket Flame */}
                  <motion.div
                    className={`absolute ${
                      isMobile ? '-bottom-8' : '-bottom-12'
                    } left-1/2 -translate-x-1/2`}
                    animate={{
                      scaleY: [1, 1.5, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className={`${
                      isMobile ? 'w-6 h-12' : 'w-8 h-16'
                    } bg-gradient-to-b from-yellow-500 via-orange-500 to-transparent rounded-full`} />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Wrapper */}
      <motion.div
        key="content"
        className="relative z-[100]"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: isTransitioning ? 0 : 1,
          scale: isTransitioning ? 1.1 : 1,
        }}
        transition={{
          duration: isMobile ? 0.5 : 0.8,
          delay: isMobile ? 0.4 : 0.6,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>

      {/* Subtle Mouse Trail - Only on non-mobile */}
      {!isMobile && !isReducedMotion && (
        <motion.div
          key="mouse-trail"
          className="fixed inset-0 z-[90] pointer-events-none"
          style={{
            background: `
              radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(29, 78, 216, 0.15), 
                transparent 40%),
              radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(121, 40, 202, 0.08), 
                transparent 50%),
              radial-gradient(1000px at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(236, 72, 153, 0.05), 
                transparent 60%),
              radial-gradient(1200px at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(14, 165, 233, 0.03), 
                transparent 70%)
            `,
            mixBlendMode: 'screen'
          }}
        />
      )}
    </>
  );
};

export default PageTransition;