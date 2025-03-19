'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TypewriterText from './TypewriterText';
import { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { ref: containerRef, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    rootMargin: "-100px",
  });
  const controls = useAnimation();

  return (
    <div className="h-full flex items-center justify-center relative px-4 overflow-hidden">
      {/* Background Decorative Elements */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto w-full relative z-10">
        {/* Text Content */}
        <motion.div 
          className="text-center lg:text-left lg:flex-1 max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative mb-8">
            <motion.span
              className="absolute -top-10 left-0 lg:left-2 text-sm sm:text-base lg:text-lg text-purple-400/80 font-mono"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Hello, I'm
            </motion.span>
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-9xl font-bold gradient-text relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
            >
              Rial Parmar
              <motion.span 
                className="absolute -bottom-3 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </motion.h1>
          </div>

          <motion.div 
            className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <TypewriterText />
          </motion.div>

          {/* Professional Summary */}
          <motion.p
            className="text-base sm:text-lg text-gray-300/90 mb-6 sm:mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            An Accomplished Full Stack Developer with expertise in both Front-End and Back-End Technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
          >
            <motion.a 
              href="#projects"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 text-white font-semibold overflow-hidden w-full sm:w-auto text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.a>
            <motion.a 
              href="#contact"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 text-white font-semibold overflow-hidden w-full sm:w-auto text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Contact Me</span>
              <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.a>
            
            {/* Download CV Button */}
            <motion.button 
              className="group relative px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white font-semibold overflow-hidden flex items-center justify-center gap-2 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Download CV
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Profile Picture */}
        <motion.div 
          className="relative lg:flex-1 w-full max-w-md flex justify-center items-center mt-8 sm:mt-12 lg:mt-24"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="relative w-[250px] h-[250px] sm:w-[320px] sm:h-[320px] rounded-full"
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
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <div className="relative w-full h-full rounded-full overflow-hidden backdrop-blur-sm">
                <Image
                  src="/images/ProfilePicture.jpeg"
                  alt="Rial Parmar"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500"
                  priority
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(to right, #a855f7, #3b82f6, #a855f7);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
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