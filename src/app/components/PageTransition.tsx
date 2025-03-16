'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [initialLoad, setInitialLoad] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Prevent scroll during animation
    const preventScroll = () => {
      if (initialLoad || isNavigating) {
        window.scrollTo(0, 0);
      }
    };

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHashChange = async () => {
      setIsNavigating(true);
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      setShowFlash(true);
      await new Promise(resolve => setTimeout(resolve, 250));
      setShowFlash(false);
      await new Promise(resolve => setTimeout(resolve, 1800));
      setIsNavigating(false);
      document.body.style.overflow = '';
    };

    // Handle initial load sequence
    const sequence = async () => {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 100));
      setShowFlash(true);
      await new Promise(resolve => setTimeout(resolve, 250));
      setShowFlash(false);
      await new Promise(resolve => setTimeout(resolve, 1800));
      setInitialLoad(false);
      document.body.style.overflow = '';
    };
    sequence();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', preventScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', preventScroll);
      document.body.style.overflow = '';
    };
  }, [initialLoad, isNavigating]);

  const generateParticles = () => {
    if (!dimensions.width) return [];
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      initialX: dimensions.width / 2,
      initialY: dimensions.height / 2,
      targetX: dimensions.width / 2 + (Math.random() - 0.5) * dimensions.width * 0.8,
      targetY: dimensions.height / 2 + (Math.random() - 0.5) * dimensions.height * 0.8,
      delay: Math.random() * 0.3,
    }));
  };

  if (!mounted) return null;

  return (
    <>
      {/* Zoom and flash effect */}
      <AnimatePresence mode="wait">
        {(showFlash || initialLoad) && (
          <motion.div
            key="flash"
            initial={{ opacity: 0, scale: 2.6 }}
            animate={{ 
              opacity: [0, 0.2, 1, 1, 0],
              scale: [2.6, 2.2, 1.8, 1.4, 1],
            }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ 
              duration: 0.65,
              times: [0, 0.2, 0.4, 0.7, 1],
              ease: [0.22, 1, 0.36, 1]
            }}
            className="fixed inset-0 z-[200] pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at center, 
                  white 0%, 
                  rgba(255,255,255,0.98) 25%, 
                  rgba(255,255,255,0.90) 35%,
                  rgba(255,255,255,0.6) 45%, 
                  transparent 65%
                )
              `,
              mixBlendMode: 'plus-lighter',
              backdropFilter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Main transition overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: isNavigating || initialLoad ? 1 : 0,
          scale: isNavigating || initialLoad ? 1 : 0.98,
        }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2
        }}
        className="fixed inset-0 z-[150] pointer-events-none"
      >
        {/* Gradient background */}
        <motion.div
          className="absolute inset-0 backdrop-blur-3xl"
          initial={{ scale: 2.4, opacity: 0 }}
          animate={{ 
            scale: isNavigating || initialLoad ? [2.4, 1] : 2.4,
            opacity: isNavigating || initialLoad ? [0, 1] : 0
          }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-blue-900/60" />
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.6, 0.8, 0.6],
              background: [
                'radial-gradient(circle at center, rgba(147,51,234,0.7) 0%, rgba(59,130,246,0.7) 100%)',
                'radial-gradient(circle at center, rgba(236,72,153,0.7) 0%, rgba(147,51,234,0.7) 100%)',
                'radial-gradient(circle at center, rgba(147,51,234,0.7) 0%, rgba(59,130,246,0.7) 100%)',
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Animated rings */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
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
                scale: (isNavigating || initialLoad) ? [2.4, 1.4, 0.98, 1] : 2.4,
                opacity: (isNavigating || initialLoad) ? [0, 0.6, 0.4] : 0,
                rotate: (isNavigating || initialLoad) ? [0, 360] : 0,
              }}
              transition={{
                duration: 2.2,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </div>

        {/* Particles */}
        <AnimatePresence mode="wait">
          {(isNavigating || initialLoad) && dimensions.width > 0 && (
            <motion.div
              key="particles"
              className="fixed inset-0 z-[160] pointer-events-none"
              initial={{ opacity: 0, scale: 2.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2 }}
            >
              {generateParticles().map((particle) => (
                <motion.div
                  key={`particle-${particle.id}`}
                  className="absolute"
                  initial={{ 
                    opacity: 0,
                    x: particle.initialX,
                    y: particle.initialY,
                    scale: 2.4
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [2.4, 1.6, 0],
                    x: particle.targetX,
                    y: particle.targetY,
                  }}
                  transition={{
                    duration: 1.8,
                    delay: particle.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div 
                    className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                    style={{
                      boxShadow: '0 0 30px rgba(147,51,234,1)',
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Content wrapper */}
      <motion.div
        key="content"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ 
          opacity: isNavigating || initialLoad ? 0 : 1,
          scale: isNavigating || initialLoad ? 1.15 : 1,
        }}
        transition={{
          duration: 1.2,
          delay: initialLoad ? 0.8 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-[100]"
      >
        {children}
      </motion.div>

      {/* Subtle mouse trail */}
      <motion.div
        key="mouse-trail"
        className="fixed inset-0 z-[90] pointer-events-none mix-blend-soft-light"
        style={{
          background: `radial-gradient(1200px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(29, 78, 216, 0.22), 
            transparent 90%)`
        }}
      />
    </>
  );
};

export default PageTransition; 