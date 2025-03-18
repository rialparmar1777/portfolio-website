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

  const welcomeText = "Welcome to Rial's Portfolio".split('');

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
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                {/* Text Background Glow */}
                <motion.div
                  className="absolute inset-0 blur-3xl opacity-50"
                  style={{
                    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Animated Text */}
                <div className="relative flex gap-[2px] overflow-hidden text-4xl md:text-6xl font-bold text-white tracking-wider">
                  {welcomeText.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -100, opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.03,
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

            {/* Galaxy Explosion Effect */}
            <motion.div
              className="absolute inset-0 backdrop-blur-3xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 1],
                opacity: [0, 1, 0]
              }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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

            {/* Particle Explosion */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 400],
                    y: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 400],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: Math.random() * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>

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