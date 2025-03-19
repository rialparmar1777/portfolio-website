'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TypewriterText from './TypewriterText';
import { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const { ref: containerRef, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    rootMargin: "-100px",
  });
  const controls = useAnimation();

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePosition({ x, y });
    setCursorPosition({ x: clientX, y: clientY });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden bg-gradient-to-b from-black via-purple-950/20 to-black"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Background Elements */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Animated Cursor Glow */}
        <motion.div
          className="absolute w-[500px] h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.15), transparent 50%)',
            left: cursorPosition.x - 250,
            top: cursorPosition.y - 250,
            transform: 'translate3d(0, 0, 0)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Enhanced Grid Lines */}
        <div className="absolute inset-0" style={{ perspective: "1000px" }}>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] w-full"
              style={{ 
                top: `${i * 3.33}%`,
                background: `linear-gradient(90deg, 
                  transparent,
                  ${i % 2 ? 'rgba(168, 85, 247, 0.15)' : 'rgba(59, 130, 246, 0.15)'} 50%,
                  transparent
                )`,
                transform: `rotateX(${mousePosition.y * 5}deg)`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3 + i % 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Enhanced Gradient Orbs */}
        <motion.div 
          className="absolute top-0 left-0 w-[800px] h-[800px] opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,purple,blue,purple)] rounded-full blur-[120px]" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 right-0 w-[800px] h-[800px] opacity-50"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg,blue,purple,blue)] rounded-full blur-[120px]" />
        </motion.div>

        {/* Enhanced Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 2 ? 'rgba(168, 85, 247, 0.5)' : 'rgba(59, 130, 246, 0.5)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [-20, 20, -20],
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto w-full relative z-10">
        {/* Enhanced Text Content */}
        <motion.div 
          className="text-center lg:text-left lg:flex-1 max-w-2xl backdrop-blur-sm rounded-3xl p-8 bg-white/5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
            transition: "transform 0.3s ease-out",
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.1)',
          }}
        >
          <div className="relative mb-8">
            <motion.span
              className="absolute -top-10 left-0 lg:left-2 text-sm sm:text-base lg:text-lg font-mono"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                background: 'linear-gradient(to right, #a855f7, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hello, I'm
            </motion.span>
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-9xl font-bold relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
            >
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">
                  Rial Parmar
                </span>
                {/* Enhanced Name Glow */}
                <motion.div
                  className="absolute -inset-2 rounded-lg opacity-75"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.3), transparent)',
                    filter: 'blur(20px)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </span>
              {/* Enhanced Animated Underline */}
              <motion.div 
                className="absolute -bottom-3 left-0 w-full h-1.5 rounded-full overflow-hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.div
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(90deg, #a855f7, #3b82f6, #a855f7)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </motion.h1>
          </div>

          {/* Enhanced Typewriter Section */}
          <motion.div 
            className="text-xl sm:text-2xl lg:text-3xl mb-6 sm:mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="relative p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10">
              <TypewriterText />
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))',
                }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Enhanced Professional Summary */}
          <motion.p
            className="text-base sm:text-lg text-gray-300/90 mb-6 sm:mb-8 leading-relaxed relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <span className="relative inline-block p-4 rounded-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5">
              An Accomplished Full Stack Developer with expertise in both Front-End and Back-End Technologies.
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.05))',
                }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
          >
            {/* View Projects Button */}
            <motion.a 
              href="#projects"
              className="group relative px-8 py-4 text-lg rounded-xl overflow-hidden w-full sm:w-auto text-center font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(45deg, #a855f7, #3b82f6)',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(45deg, #9333ea, #2563eb)',
                }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Projects
                <motion.svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
            </motion.a>

            {/* Contact Me Button */}
            <motion.a 
              href="#contact"
              className="group relative px-8 py-4 text-lg rounded-xl overflow-hidden w-full sm:w-auto text-center font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl border border-purple-500/20"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Contact Me
                <motion.svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </motion.svg>
              </span>
            </motion.a>
            
            {/* Download CV Button */}
            <motion.button 
              className="group relative px-8 py-4 text-lg rounded-xl overflow-hidden w-full sm:w-auto text-center font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-white/10"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl border border-white/10"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Download CV
                <motion.svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  animate={{
                    y: [0, 3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced Profile Picture */}
        <motion.div 
          className="relative lg:flex-1 w-full max-w-md flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * -2}deg) rotateY(${mousePosition.x * -2}deg)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <motion.div
            className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px]"
            whileHover={{ scale: 1.02 }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Enhanced Glow Effects */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute -inset-4 rounded-full"
                style={{
                  background: `conic-gradient(from ${i * 120}deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))`,
                  transform: `rotate(${i * 120}deg)`,
                }}
                animate={{
                  rotate: [`${i * 120}deg`, `${i * 120 + 360}deg`],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <motion.div 
                className="absolute -inset-2"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))',
                  filter: 'blur(20px)',
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm group">
                <Image
                  src="/images/ProfilePicture.jpeg"
                  alt="Rial Parmar"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover scale-105 transition-transform duration-500 group-hover:scale-110"
                  priority
                />
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                  animate={{
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Enhanced Floating Particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white/70"
                    style={{
                      top: `${50 + Math.cos(i * 30) * 45}%`,
                      left: `${50 + Math.sin(i * 30) * 45}%`,
                      filter: 'blur(1px)',
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2 + i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .animate-gradient {
          animation: gradient 6s linear infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Hero; 