'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { FaRocket, FaFire, FaStar } from 'react-icons/fa';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'countdown' | 'ignition' | 'launch' | 'blast' | 'done'>('idle');
  const [countdown, setCountdown] = useState(3);
  const { getBackgroundColor, getTextColor, isDark } = useThemeStyles();

  useEffect(() => {
    // Animation timeline
    setTimeout(() => setAnimationPhase('countdown'), 500); // Show countdown after welcome
    setTimeout(() => {
      setAnimationPhase('ignition'); // Ignition
      setTimeout(() => {
        setAnimationPhase('launch'); // Rocket launches
        setTimeout(() => {
          setAnimationPhase('blast'); // Blast after rocket leaves
          setTimeout(() => {
            setAnimationPhase('done'); // End transition
            setTimeout(() => setIsLoading(false), 600); // Fade out
          }, 1600); // Blast duration
        }, 2200); // Rocket launch duration
      }, 600); // Ignition duration
    }, 3200); // Countdown duration (3s)
  }, []);

  // Countdown logic
  useEffect(() => {
    if (animationPhase === 'countdown') {
      setCountdown(3);
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [animationPhase]);

  // Starfield background component
  const Starfield = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 80 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.2,
            filter: 'blur(0.5px)'
          }}
          animate={{
            y: [0, Math.random() * 10 + 10],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );

  // Nebula cloud for blast
  const NebulaCloud = () => (
    <motion.div
      className="absolute top-0 left-1/2 z-40 pointer-events-none"
      style={{
        width: 420,
        height: 420,
        transform: 'translate(-50%, 0)',
        background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(59,130,246,0.13) 40%, rgba(255,255,255,0.08) 100%)',
        filter: 'blur(32px)'
      }}
      initial={{ scale: 0.7, opacity: 0.7 }}
      animate={{ scale: [0.7, 1.2, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
  );

  // Realistic Shockwave Ring
  const RealShockwave = () => (
    <motion.div
      className="absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full z-50 pointer-events-none"
      style={{
        width: 320,
        height: 320,
        background: 'radial-gradient(circle, rgba(255,255,255,0.7) 60%, rgba(139,92,246,0.18) 80%, transparent 100%)',
        border: '6px solid rgba(147,51,234,0.18)',
        boxShadow: '0 0 80px 20px #a78bfa',
        filter: 'blur(6px)'
      }}
      initial={{ scale: 0.5, opacity: 0.9 }}
      animate={{ scale: [0.5, 2.8, 3.8], opacity: [0.9, 0.5, 0] }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    />
  );

  // Plasma/Nebula Cloud
  const PlasmaCloud = () => (
    <motion.div
      className="absolute top-0 left-1/2 z-40 pointer-events-none"
      style={{
        width: 480,
        height: 480,
        transform: 'translate(-50%, 0)',
        background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(59,130,246,0.18) 40%, rgba(255,255,255,0.10) 100%)',
        filter: 'blur(40px)'
      }}
      initial={{ scale: 0.7, opacity: 0.7, rotate: 0 }}
      animate={{ scale: [0.7, 1.3, 1.1], opacity: [0.7, 1, 0.7], rotate: [0, 30, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
  );

  // Heat Distortion Overlay
  const HeatDistortion = () => (
    <motion.div
      className="absolute top-0 left-1/2 z-50 pointer-events-none"
      style={{
        width: 320,
        height: 320,
        transform: 'translate(-50%, 0)',
        background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(139,92,246,0.08) 60%, transparent 100%)',
        filter: 'blur(18px)'
      }}
      initial={{ scale: 1, opacity: 0.5 }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ 
              background: isDark 
                ? 'radial-gradient(circle at center, rgba(17, 24, 39, 0.95), rgba(0, 0, 0, 0.98))' 
                : 'radial-gradient(circle at center, rgba(243, 244, 246, 0.95), rgba(229, 231, 235, 0.98))'
            }}
          >
            {/* Cinematic Starfield Background */}
            <Starfield />
            {/* Cinematic Nebula for blast phase */}
            {animationPhase === 'blast' && <NebulaCloud />}
            <div className="text-center max-w-md px-4 relative z-10">
              {/* Welcome Message */}
              <AnimatePresence>
                {animationPhase === 'countdown' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <motion.h2 
                      className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      Welcome to Rial's Portfolio
                    </motion.h2>
                    <motion.p 
                      className="text-lg mb-6"
                      style={{ color: getTextColor('secondary') }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Exploring the universe of web development
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Rocket Animation */}
              <div className="relative h-80 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {animationPhase === 'countdown' && (
                    <motion.div
                      key="countdown"
                      className="absolute inset-0 flex flex-col items-center justify-center z-30"
                      initial={{ opacity: 0, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(8px)' }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Countdown Ring and Pre-launch Glow */}
                      <motion.div
                        className="absolute left-1/2 top-1/2 z-20 pointer-events-none"
                        style={{
                          width: '120px',
                          height: '120px',
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        {/* SVG Circular Progress */}
                        <svg width="120" height="120">
                          <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#a78bfa"
                            strokeWidth="8"
                            opacity="0.18"
                          />
                          <motion.circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#a78bfa"
                            strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ pathLength: 1 }}
                            animate={{ pathLength: countdown / 3 }}
                            transition={{ duration: 1, ease: 'linear' }}
                            style={{ rotate: -90, originX: '60px', originY: '60px' }}
                          />
                        </svg>
                      </motion.div>
                      {/* Pre-launch Glow and Shake */}
                      <motion.div
                        className="absolute z-10 left-1/2 top-1/2 pointer-events-none"
                        style={{
                          width: '140px',
                          height: '140px',
                          background: 'radial-gradient(circle, rgba(147,51,234,0.22) 0%, rgba(59,130,246,0.13) 60%, transparent 100%)',
                          filter: 'blur(10px)',
                          transform: 'translate(-50%, -50%)',
                        }}
                        animate={{
                          scale: [1, 1.12, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ duration: 1.1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                      />
                      {/* Rocket */}
                      <motion.div
                        className="relative z-30"
                        initial={{ y: 0, rotate: 0, x: 0, scale: 1 }}
                        animate={{
                          y: [0, -4, 4, -4, 4, 0],
                          x: [0, 2, -2, 2, -2, 0],
                          rotate: [0, 2, -2, 2, -2, 0],
                          scale: 1,
                          opacity: 1,
                          transition: { duration: 0.7, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <FaRocket 
                          className="w-24 h-24 text-purple-500" 
                          style={{ 
                            filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.9))",
                            transform: "rotate(-90deg)"
                          }}
                        />
                      </motion.div>
                      {/* Countdown Number */}
                      <motion.div
                        className="absolute top-0 left-1/2 transform -translate-x-1/2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1.2, 1],
                          opacity: [0, 1, 1]
                        }}
                        exit={{ 
                          scale: [1, 1.2, 0],
                          opacity: [1, 1, 0]
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
                          {countdown}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                  {animationPhase === 'ignition' && (
                    <motion.div
                      key="ignition"
                      className="absolute inset-0 flex items-center justify-center z-40"
                      initial={{ opacity: 0, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(8px)' }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Launch Pad Smoke */}
                      <motion.div
                        className="absolute left-1/2 bottom-16 z-30 pointer-events-none"
                        style={{
                          width: '180px',
                          height: '60px',
                          background: 'radial-gradient(ellipse at center, #fff 0%, #a78bfa 60%, transparent 100%)',
                          filter: 'blur(16px)',
                          transform: 'translate(-50%, 0)'
                        }}
                        initial={{ scale: 0.7, opacity: 0.7 }}
                        animate={{ scale: [0.7, 1.2, 1.4], opacity: [0.7, 0.9, 0] }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                      {/* Ignition Flash */}
                      <motion.div
                        className="absolute left-1/2 bottom-24 z-40 pointer-events-none"
                        style={{
                          width: '180px',
                          height: '80px',
                          background: 'radial-gradient(ellipse at center, #fff 0%, #fff7 60%, transparent 100%)',
                          filter: 'blur(8px)',
                          transform: 'translate(-50%, 0)'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.5 }}
                      />
                      {/* Shockwave Ring */}
                      <motion.div
                        className="absolute left-1/2 bottom-24 z-40 pointer-events-none"
                        style={{
                          width: '80px',
                          height: '30px',
                          borderRadius: '50%',
                          border: '4px solid #fff',
                          filter: 'blur(2px)',
                          transform: 'translate(-50%, 0)'
                        }}
                        initial={{ scale: 0.5, opacity: 0.7 }}
                        animate={{ scale: [0.5, 2.5, 3.5], opacity: [0.7, 0.4, 0] }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                      {/* Ground Shake */}
                      <motion.div
                        className="absolute inset-0 z-40 pointer-events-none"
                        style={{ background: 'transparent' }}
                        initial={{ y: 0 }}
                        animate={{ y: [0, -8, 8, -4, 4, 0] }}
                        transition={{ duration: 0.5 }}
                      />
                      {/* Rocket on Pad */}
                      <motion.div
                        className="relative z-30"
                        initial={{ y: 0, scale: 1, opacity: 1 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <FaRocket 
                          className="w-24 h-24 text-purple-500" 
                          style={{ 
                            filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.9))",
                            transform: "rotate(-90deg)"
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                  {animationPhase === 'launch' && (
                    <motion.div
                      key="launch"
                      className="absolute inset-0 flex items-center justify-center z-50"
                      initial={{ opacity: 0, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(8px)' }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Camera Zoom Out */}
                      <motion.div
                        className="absolute inset-0 z-10 pointer-events-none"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.05, opacity: 0.95 }}
                        transition={{ duration: 2.3, ease: 'easeInOut' }}
                        style={{ background: 'transparent' }}
                      />
                      {/* Rocket Launch */}
                      <motion.div
                        className="relative z-30"
                        initial={{ y: 0, rotate: 0, x: 0, scale: 1, opacity: 1 }}
                        animate={{
                          y: [-20, -60, -180, -400, -700],
                          x: [0, 0, 10, 30, 40],
                          rotate: [0, -8, -12, -16, -18],
                          scale: [1, 1.05, 0.95, 0.7, 0.4],
                          opacity: [1, 1, 1, 0.8, 0.5],
                          boxShadow: [
                            '0 0 40px 10px #fff8',
                            '0 0 60px 20px #a78bfa',
                            '0 0 80px 30px #3B82F6',
                            '0 0 0px 0px transparent'
                          ],
                          transition: { duration: 2.3, ease: [0.7, 0, 0.84, 0], times: [0, 0.2, 0.5, 0.8, 1] }
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <FaRocket 
                          className="w-24 h-24 text-purple-500" 
                          style={{ 
                            filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.9))",
                            transform: "rotate(-90deg)"
                          }}
                        />
                        {/* Rocket Fire - Burst at Launch */}
                        <motion.div
                          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                          animate={{
                            scale: [1, 2.8, 1.2, 2.2, 1.1],
                            opacity: [1, 1, 0.8, 0.7, 0.9],
                            transition: { duration: 0.3, repeat: Infinity, repeatType: 'reverse' }
                          }}
                        >
                          <FaFire className="w-16 h-16 text-orange-500" />
                        </motion.div>
                        {/* Atmospheric Glow */}
                        <motion.div
                          className="absolute left-1/2 top-1/2 z-20 pointer-events-none"
                          style={{
                            width: '120px',
                            height: '120px',
                            background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(59,130,246,0.13) 60%, transparent 100%)',
                            filter: 'blur(16px)',
                            transform: 'translate(-50%, -50%)',
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                        />
                        {/* Sparkling Trail */}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute left-1/2"
                            style={{
                              bottom: `${-30 - i * 18}px`,
                              width: 8 + i * 2,
                              height: 8 + i * 2,
                              background: 'radial-gradient(circle, #fff 60%, #a78bfa 100%)',
                              borderRadius: '50%',
                              opacity: 0.18 + 0.08 * (8 - i),
                              zIndex: 2,
                              filter: 'blur(2px)',
                              transform: 'translateX(-50%)'
                            }}
                            initial={{ scale: 0.7, opacity: 0.2 }}
                            animate={{
                              scale: [0.7, 1.2, 1.5],
                              opacity: [0.2, 0.3, 0],
                              y: [0, 10 + i * 8, 700 + i * 12]
                            }}
                            transition={{
                              duration: 2.3,
                              delay: 0.18 + i * 0.13,
                              ease: 'easeOut'
                            }}
                          />
                        ))}
                        {/* Heat Shimmer */}
                        <motion.div
                          className="absolute left-1/2 top-full z-20 pointer-events-none"
                          style={{
                            width: '60px',
                            height: '40px',
                            background: 'radial-gradient(ellipse at center, #fff 0%, #a78bfa 60%, transparent 100%)',
                            filter: 'blur(8px)',
                            transform: 'translate(-50%, 0)'
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.7, 0.5],
                          }}
                          transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                        />
                      </motion.div>
                      {/* Rocket Trail and Smoke */}
                      <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10"
                        style={{
                          borderRadius: "0 0 8px 8px",
                          zIndex: 10,
                          background: "linear-gradient(to bottom, #fff 0%, #9333EA 40%, #3B82F6 80%, transparent 100%)",
                          boxShadow: '0 0 60px 20px #9333EA, 0 0 80px 30px #3B82F6'
                        }}
                        animate={{
                          height: [40, 120, 260, 400, 600],
                          opacity: [1, 0.95, 0.7, 0.5, 0],
                          y: [0, 40, 120, 400, 700],
                          transition: { duration: 2.3, ease: 'easeOut' }
                        }}
                      />
                      {Array.from({ length: 7 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute left-1/2"
                          style={{
                            bottom: `${-40 - i * 22}px`,
                            width: 22 + i * 10,
                            height: 22 + i * 10,
                            background: 'radial-gradient(circle, #fff 60%, #9333EA 100%)',
                            borderRadius: '50%',
                            opacity: 0.16 + 0.07 * (7 - i),
                            zIndex: 2,
                            filter: 'blur(3px)',
                            transform: 'translateX(-50%)'
                          }}
                          initial={{ scale: 0.7, opacity: 0.2 }}
                          animate={{
                            scale: [0.7, 1.3, 1.7],
                            opacity: [0.2, 0.3, 0],
                            y: [0, 16 + i * 10, 700 + i * 18]
                          }}
                          transition={{
                            duration: 2.3,
                            delay: 0.18 + i * 0.13,
                            ease: 'easeOut'
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                  {animationPhase === 'blast' && (
                    <motion.div
                      key="blast"
                      className="absolute inset-0 flex items-center justify-center z-50"
                      initial={{ opacity: 0, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(8px)' }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Plasma/Nebula Cloud */}
                      <PlasmaCloud />
                      {/* Blast Flash */}
                      <motion.div
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full z-50"
                        style={{
                          width: "420px",
                          height: "420px",
                          background: "radial-gradient(circle, #fff 0%, #fff7 60%, transparent 100%)",
                          filter: "blur(40px)",
                          pointerEvents: "none"
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: [0, 2.5, 4], opacity: [1, 0.8, 0] }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                      {/* Realistic Shockwave */}
                      <RealShockwave />
                      {/* Heat Distortion */}
                      <HeatDistortion />
                      {/* Blast Particles & Debris */}
                      {Array.from({ length: 60 }).map((_, i) => {
                        // Large debris
                        if (i < 10) {
                          const size = Math.random() * 32 + 16;
                          const color = [
                            '#fff', '#F59E0B', '#3B82F6', '#9333EA', '#F472B6', '#34D399', '#F87171'
                          ][i % 7];
                          return (
                            <motion.div
                              key={i}
                              className="absolute"
                              style={{
                                left: '50%',
                                top: '0%',
                                width: size,
                                height: size * 0.5,
                                background: color,
                                borderRadius: '40%',
                                filter: "blur(2px)",
                                zIndex: 20,
                                transform: 'translate(-50%, 0)'
                              }}
                              initial={{ scale: 0, opacity: 1, rotate: 0 }}
                              animate={{
                                scale: [0, 2.2, 0],
                                opacity: [1, 0.8, 0],
                                x: [0, (Math.random() - 0.5) * 800],
                                y: [0, (Math.random() - 0.5) * 400 - 200],
                                rotate: [0, Math.random() * 360]
                              }}
                              transition={{
                                duration: 2.2 + Math.random() * 0.5,
                                delay: i * 0.02
                              }}
                            />
                          );
                        }
                        // Fast sparks
                        const size = Math.random() * 8 + 4;
                        const color = [
                          '#fff', '#F59E0B', '#3B82F6', '#9333EA', '#F472B6', '#34D399', '#F87171'
                        ][i % 7];
                        const borderRadius = Math.random() > 0.7 ? '50%' : '30%';
                        const rotate = Math.random() * 360;
                        return (
                          <motion.div
                            key={i}
                            className="absolute"
                            style={{
                              left: '50%',
                              top: '0%',
                              width: size,
                              height: size,
                              background: color,
                              borderRadius,
                              filter: "blur(1.5px)",
                              zIndex: 20,
                              transform: 'translate(-50%, 0)'
                            }}
                            initial={{ scale: 0, opacity: 1, rotate }}
                            animate={{
                              scale: [0, 2.5, 0],
                              opacity: [1, 0.9, 0],
                              x: [0, (Math.random() - 0.5) * 900],
                              y: [0, (Math.random() - 0.5) * 600 - 200],
                              rotate: [rotate, rotate + Math.random() * 180]
                            }}
                            transition={{
                              duration: 1.5 + Math.random() * 0.7,
                              delay: i * 0.012
                            }}
                          />
                        );
                      })}
                      {/* Lens Flare */}
                      <motion.div
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
                        style={{
                          width: '600px',
                          height: '120px',
                          background: 'linear-gradient(90deg, transparent, #fff7 40%, #fff 50%, #fff7 60%, transparent)',
                          filter: 'blur(18px)',
                          opacity: 0.7
                        }}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: [0.7, 1.2, 1], opacity: [0, 0.7, 0] }}
                        transition={{ duration: 1.2 }}
                      />
                      {/* Screen Shake */}
                      <motion.div
                        className="absolute inset-0 z-50 pointer-events-none"
                        style={{ background: 'transparent' }}
                        initial={{ x: 0 }}
                        animate={{ x: [0, -40, 40, -20, 20, 0] }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Loading Bar */}
              {animationPhase === 'countdown' && (
                <motion.div
                  className="h-1 w-48 mx-auto rounded-full overflow-hidden mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
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