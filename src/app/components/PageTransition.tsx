'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { FaRocket, FaFire } from 'react-icons/fa';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const [rocketBlasted, setRocketBlasted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const { getBackgroundColor, getTextColor, isDark } = useThemeStyles();

  useEffect(() => {
    // Show welcome message first
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 500);

    // Start countdown after welcome message
    const countdownTimer = setTimeout(() => {
      setShowCountdown(true);
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            // Add a small delay before launching the rocket
            setTimeout(() => {
              setRocketLaunched(true);
              // Add a delay before the blast effect
              setTimeout(() => {
                setRocketBlasted(true);
              }, 1200);
            }, 800);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, 2000);

    // Hide loading screen after rocket launch
    const launchTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5500);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(countdownTimer);
      clearTimeout(launchTimer);
    };
  }, []);

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
            <div className="text-center max-w-md px-4">
              {/* Welcome Message */}
              <AnimatePresence>
                {showWelcome && !showCountdown && (
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
                {/* Initial Rocket */}
                <motion.div
                  className="relative z-10"
                  initial={{ y: 0 }}
                  animate={rocketLaunched ? {
                    y: [-20, -350],
                    opacity: [1, 1],
                    scale: [1, 1.2],
                    rotate: [0, 0]
                  } : {}}
                  transition={{ 
                    duration: 1.8,
                    ease: [0.16, 1, 0.3, 1] // Custom easing for more dramatic launch
                  }}
                >
                  <FaRocket 
                    className="w-20 h-20 text-purple-500" 
                    style={{ 
                      filter: "drop-shadow(0 0 15px rgba(147, 51, 234, 0.7))",
                      transform: "rotate(-90deg)"
                    }}
                  />
                  
                  {/* Rocket Fire */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                    animate={rocketLaunched ? {
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.9, 0.7]
                    } : {}}
                    transition={{ 
                      duration: 0.3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <FaFire className="w-10 h-10 text-orange-500" />
                  </motion.div>
                </motion.div>
                
                {/* Rocket Trail */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-24"
                  style={{ 
                    background: "linear-gradient(to bottom, #9333EA, transparent)",
                    borderRadius: "0 0 4px 4px"
                  }}
                  animate={rocketLaunched ? {
                    height: [24, 48, 24],
                    opacity: [1, 0.8, 0],
                    y: [0, 30, 60]
                  } : {}}
                  transition={{ 
                    duration: 1.8,
                    ease: "easeOut"
                  }}
                />
                
                {/* Blast Effect - Only appears after rocket has gone up */}
                {rocketBlasted && (
                  <>
                    {/* Blast Shockwave */}
                    <motion.div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full"
                      style={{
                        width: "250px",
                        height: "250px",
                        background: "radial-gradient(circle, rgba(147, 51, 234, 0.9) 0%, rgba(59, 130, 246, 0.7) 50%, transparent 100%)",
                        filter: "blur(10px)"
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ 
                        scale: [0, 2.5, 4],
                        opacity: [1, 0.8, 0]
                      }}
                      transition={{ 
                        duration: 1.2,
                        ease: "easeOut"
                      }}
                    />
                    
                    {/* Blast Particles */}
                    {Array.from({ length: 100 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{ 
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          background: i % 3 === 0 ? '#9333EA' : i % 3 === 1 ? '#3B82F6' : '#F59E0B',
                          filter: "blur(1px)"
                        }}
                        initial={{ 
                          scale: 0,
                          opacity: 1
                        }}
                        animate={{ 
                          scale: [0, 2, 0],
                          opacity: [1, 0.9, 0],
                          x: [0, (Math.random() - 0.5) * 400],
                          y: [0, (Math.random() - 0.5) * 400]
                        }}
                        transition={{ 
                          duration: 1.8,
                          delay: i * 0.02
                        }}
                      />
                    ))}
                    
                    {/* Rocket Blast Animation */}
                    <motion.div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20"
                      initial={{ y: -350, scale: 1.2, opacity: 1 }}
                      animate={{ 
                        y: [-350, -600],
                        scale: [1.2, 2],
                        opacity: [1, 0],
                        rotate: [0, 15]
                      }}
                      transition={{ 
                        duration: 1.8,
                        ease: "easeOut"
                      }}
                    >
                      <FaRocket 
                        className="w-20 h-20 text-purple-500" 
                        style={{ 
                          filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.9))",
                          transform: "rotate(-90deg)"
                        }}
                      />
                      
                      {/* Enhanced Rocket Fire */}
                      <motion.div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                        animate={{
                          scale: [1, 2.5, 1],
                          opacity: [1, 0.9, 0.7]
                        }}
                        transition={{ 
                          duration: 0.3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <FaFire className="w-20 h-20 text-orange-500" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Secondary Blast Wave */}
                    <motion.div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full"
                      style={{
                        width: "150px",
                        height: "150px",
                        background: "radial-gradient(circle, rgba(245, 158, 11, 0.9) 0%, rgba(239, 68, 68, 0.7) 50%, transparent 100%)",
                        filter: "blur(8px)"
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ 
                        scale: [0, 2, 3],
                        opacity: [1, 0.7, 0]
                      }}
                      transition={{ 
                        duration: 1,
                        delay: 0.3,
                        ease: "easeOut"
                      }}
                    />
                  </>
                )}
                
                {/* Countdown */}
                <AnimatePresence>
                  {showCountdown && !rocketLaunched && countdown > 0 && (
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
                  )}
                </AnimatePresence>
                
                {/* Launch Text */}
                {rocketLaunched && !rocketBlasted && (
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-purple-500 mb-2">Launching Portfolio</h3>
                    <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  </motion.div>
                )}
                
                {/* Blast Text */}
                {rocketBlasted && (
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-orange-500 mb-2">Blast Off!</h3>
                    <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
                  </motion.div>
                )}
              </div>
              
              {/* Loading Bar */}
              {showCountdown && !rocketLaunched && (
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
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