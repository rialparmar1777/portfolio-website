'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import TypewriterText from './TypewriterText';
import SocialLinks from './SocialLinks';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Hero = () => {
  const { getTextColor, getBackgroundColor, getBorderColor } = useThemeStyles();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const { scrollY } = useScroll();
  
  // Parallax effect for the hero section
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Mouse move effect for the profile picture
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };
  
  // Reset mouse position when not hovering
  const handleMouseLeave = () => {
    setMousePosition({ x: 0.5, y: 0.5 });
  };
  
  useEffect(() => {
    // Start animation after a short delay to ensure it works with PageTransition
    const timer = setTimeout(() => {
      controls.start("visible");
    }, 100);
    
    return () => clearTimeout(timer);
  }, [controls]);
  
  const containerVariants = {
    hidden: { opacity: 0.5 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: 0.5
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y, opacity }}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_50%)]" />
        
        {/* Animated circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left max-w-xl mx-auto lg:mx-0"
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ color: getTextColor('primary') }}
              variants={itemVariants}
            >
              Hi, I'm{' '}
              <span className="relative inline-block">
                Rial Parmar
                <motion.span
                  className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.5 }}
                />
              </span>
            </motion.h1>
            
            <motion.h2
              className="text-2xl md:text-3xl font-medium mb-6"
              style={{ color: getTextColor('secondary') }}
              variants={itemVariants}
            >
              <TypewriterText
                words={[
                  'Full Stack Developer',
                  'Cloud Architect',
                  'Performance Optimizer',
                  'Creative Problem Solver'
                ]}
              />
            </motion.h2>
            
            <motion.p
              className="text-lg mb-8 max-w-2xl mx-auto lg:mx-0"
              style={{ color: getTextColor('secondary') }}
              variants={itemVariants}
            >
              I craft exceptional digital experiences that combine technical expertise with creative innovation.
              Specializing in building scalable, high-performance applications that deliver real business value.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
              variants={itemVariants}
            >
              <motion.a
                href="#contact"
                className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Collaborate
              </motion.a>
              <motion.a
                href="#projects"
                className="px-6 py-3 rounded-lg font-medium border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
                style={{ color: getTextColor('primary') }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Work
              </motion.a>
            </motion.div>
            
            <motion.div
              className="flex justify-center lg:justify-start"
              variants={itemVariants}
            >
              <SocialLinks size="md" />
            </motion.div>
          </motion.div>
          
          {/* Profile Picture */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={imageVariants}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              handleMouseLeave();
            }}
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-8 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-3xl"
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                  opacity: isHovered ? [0.3, 0.5, 0.3] : 0.3,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Profile image */}
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20"
                style={{
                  transform: isHovered
                    ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 10}deg) rotateY(${(mousePosition.x - 0.5) * 10}deg)`
                    : 'none',
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <Image
                  src="/images/ProfilePicture.jpeg"
                  alt="Rial Parmar"
                  fill
                  className="object-cover"
                  priority
                  style={{
                    objectPosition: "center 20%"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                
                {/* Glasses Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 mix-blend-multiply" />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Glasses Frame */}
              <div className="absolute inset-0 rounded-full border-2 border-white/20" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-sm mb-2" style={{ color: getTextColor('secondary') }}>
          Discover More
        </span>
        <motion.div
          className="w-6 h-10 border-2 rounded-full flex justify-center p-1"
          style={{ borderColor: getBorderColor('light') }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1 h-1 rounded-full"
            style={{ background: getTextColor('primary') }}
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero; 