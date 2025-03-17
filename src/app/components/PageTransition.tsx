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
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="transition"
            className="fixed inset-0 z-[150] pointer-events-none"
          >
            {/* Initial Flash Effect */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 0.4,
                times: [0, 0.1, 1],
                ease: "easeInOut"
              }}
            />

            {/* Main Transition Overlay */}
            <motion.div
              className="absolute inset-0 backdrop-blur-3xl"
              initial={{ scale: 2.4, opacity: 0 }}
              animate={{ 
                scale: [2.4, 1],
                opacity: [0, 1]
              }}
              exit={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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

            {/* Animated Rings */}
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
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>

            {/* Rocket Effect */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              initial={{ y: "110vh", opacity: 0 }}
              animate={{ 
                y: [null, "80vh", "40vh", "-10vh"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 1.5,
                times: [0, 0.2, 0.6, 1],
                delay: 0.1,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                {/* Rocket Body */}
                <div className="w-12 h-24 bg-white rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500" />
                </div>
                {/* Rocket Window */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-200 rounded-full" />
                {/* Rocket Fins */}
                <div className="absolute bottom-0 -left-4 w-5 h-6 bg-purple-500 -skew-x-[30deg]" />
                <div className="absolute bottom-0 -right-4 w-5 h-6 bg-purple-500 skew-x-[30deg]" />
                {/* Rocket Flame */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2"
                  animate={{
                    scaleY: [1, 2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-8 h-16 bg-gradient-to-b from-yellow-500 via-orange-500 to-transparent rounded-full" />
                </motion.div>
              </div>
            </motion.div>

            {/* Rocket Particles */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              initial={{ y: "110vh" }}
              animate={{ y: "-10vh" }}
              transition={{
                duration: 1.5,
                delay: 0.1,
                ease: "easeInOut"
              }}
            >
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${(Math.random() - 0.5) * 50}px`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.2, 1, 0.2],
                    x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80]
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + (i * 0.04),
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Wrapper */}
      <motion.div
        key="content"
        className="relative z-[100]"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ 
          opacity: isTransitioning ? 0 : 1,
          scale: isTransitioning ? 1.15 : 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>

      {/* Subtle Mouse Trail */}
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