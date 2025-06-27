'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';
import { useThemeStyles } from '../hooks/useThemeStyles';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const { isDark, getGradient, colors } = useThemeStyles();

  useEffect(() => {
    setCurtainOpen(false);
    setIsLoading(true);
    setShowLogo(true);

    // Optional launch sound
    // const audio = new Audio('/sounds/launch-whoosh.mp3');
    // audio.volume = 0.3;
    // audio.play();

    const openCurtain = setTimeout(() => {
      setCurtainOpen(true);
      setTimeout(() => setShowLogo(false), 1000);
    }, 1000);

    const finish = setTimeout(() => setIsLoading(false), 2200);

    return () => {
      clearTimeout(openCurtain);
      clearTimeout(finish);
    };
  }, []);

  const LayeredStars = () => (
    <>
      {Array.from({ length: 3 }).map((_, layerIndex) => (
        <div key={layerIndex} className={`absolute inset-0 z-${10 + layerIndex} overflow-hidden`}>
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: 1 + layerIndex,
                height: 1 + layerIndex,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.5,
                filter: 'blur(0.5px)',
              }}
              animate={{
                y: [0, 10 + layerIndex * 4],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 6,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
      ))}
    </>
  );

  // Sparkle effect for rocket
  const Sparkles = () => (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: 2 + Math.random() * 2,
            height: 2 + Math.random() * 2,
            left: `${30 + Math.random() * 40}%`,
            top: `${30 + Math.random() * 40}%`,
            opacity: 0.18 + Math.random() * 0.18,
            filter: 'blur(0.5px)',
            zIndex: 1,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 1.2 + Math.random() * 0.8,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="curtain"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: curtainOpen ? 1 : 1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900"
          >
            {/* Starfield */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: curtainOpen ? 0 : 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="absolute inset-0 z-10 pointer-events-none"
            >
              <LayeredStars />
            </motion.div>

            {/* Left Curtain */}
            <motion.div
              className="absolute top-0 left-0 h-full w-1/2 z-40 overflow-hidden"
              style={{
                background: getGradient('glass'),
                boxShadow: '16px 0 64px 0 rgba(0,0,0,0.32)',
                borderTopRightRadius: '36px',
                borderBottomRightRadius: '36px',
                borderRight: `2.5px solid ${colors.primary}`,
                position: 'absolute',
              }}
              initial={{ x: 0 }}
              animate={curtainOpen ? { x: '-100%' } : { x: 0 }}
              transition={{ duration: 1.4, ease: [0.7, 0, 0.84, 0] }}
            >
              {/* Glass highlight edge */}
              <motion.div
                className="absolute top-0 left-0 w-1/6 h-full bg-white opacity-10 pointer-events-none"
                style={{ filter: 'blur(8px)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Light sweep */}
              <motion.div
                className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-white/30 to-transparent opacity-30 pointer-events-none"
                style={{ filter: 'blur(12px)' }}
                animate={{ x: ['-120%', '180%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Right Curtain (staggered open) */}
            <motion.div
              className="absolute top-0 right-0 h-full w-1/2 z-40 overflow-hidden"
              style={{
                background: getGradient('glass'),
                boxShadow: '-16px 0 64px 0 rgba(0,0,0,0.32)',
                borderTopLeftRadius: '36px',
                borderBottomLeftRadius: '36px',
                borderLeft: `2.5px solid ${colors.primary}`,
                position: 'absolute',
              }}
              initial={{ x: 0 }}
              animate={curtainOpen ? { x: '100%' } : { x: 0 }}
              transition={{ duration: 1.4, delay: 0.12, ease: [0.7, 0, 0.84, 0] }}
            >
              {/* Glass highlight edge */}
              <motion.div
                className="absolute top-0 right-0 w-1/6 h-full bg-white opacity-10 pointer-events-none"
                style={{ filter: 'blur(8px)' }}
                animate={{ x: ['120%', '-180%'] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Light sweep */}
              <motion.div
                className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-white/30 to-transparent opacity-30 pointer-events-none"
                style={{ filter: 'blur(12px)' }}
                animate={{ x: ['120%', '-180%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Rocket Launch Animation */}
            {showLogo && (
              <motion.div
                className="relative z-50 flex flex-col items-center justify-center"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: [-10, -20, -60], opacity: [1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* Glowing animated ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: getGradient('primary'),
                      filter: 'blur(18px)',
                      opacity: 0.32,
                    }}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.13, 1], opacity: [0.32, 0.5, 0.32] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  {/* Sparkles */}
                  <Sparkles />
                  {/* Rocket */}
                  <motion.div
                    className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg flex items-center justify-center"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    <FaRocket className="text-white text-2xl" />
                  </motion.div>
                  {/* Exhaust Flames */}
                  <motion.div
                    className="absolute -bottom-6 w-4 h-8 rounded-full bg-yellow-400 blur-sm"
                    initial={{ scaleY: 1, opacity: 0.8 }}
                    animate={{ scaleY: [1, 1.4, 1], opacity: [0.8, 0.5, 0.8] }}
                    transition={{ duration: 0.4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-8 w-2 h-6 rounded-full bg-orange-500 blur-sm"
                    initial={{ scaleY: 1, opacity: 0.8 }}
                    animate={{ scaleY: [1, 1.2, 1], opacity: [0.8, 0.4, 0.8] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  />
                </div>
                {/* Launching Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-4 text-white text-base font-medium tracking-wide"
                >
                  Preparing launch...
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="relative z-0 w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;