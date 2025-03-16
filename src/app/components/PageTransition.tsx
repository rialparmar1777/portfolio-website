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

  useEffect(() => {
    setMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={false}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[150] pointer-events-none"
          >
            {/* Gradient background */}
            <motion.div
              className="absolute inset-0 backdrop-blur-3xl"
              initial={{ scale: 2.4, opacity: 0 }}
              animate={{ 
                scale: [2.4, 1],
                opacity: [0, 1]
              }}
              exit={{ scale: 2.4, opacity: 0 }}
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
                    duration: 2.2,
                    delay: i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>

            {/* Flash effect */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 0.8,
                times: [0, 0.1, 1],
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content wrapper */}
      <motion.div
        key="content"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ 
          opacity: isTransitioning ? 0 : 1,
          scale: isTransitioning ? 1.15 : 1,
        }}
        transition={{
          duration: 1.2,
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
            rgba(29, 78, 216, 0.15), 
            transparent 80%)`
        }}
      />
    </>
  );
};

export default PageTransition; 