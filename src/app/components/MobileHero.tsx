'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import TypewriterText from './TypewriterText';
import SocialLinks from './SocialLinks';
import Image from 'next/image';
import { ChevronDownIcon, SparklesIcon } from '@heroicons/react/24/outline';

const MobileHero = () => {
  const { getTextColor, getBackgroundColor, getBorderColor } = useThemeStyles();
  const [showMore, setShowMore] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, mass: 0.8 };
  const springProgress = useSpring(scrollYProgress, springConfig);

  const opacity = useTransform(springProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(springProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
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

  const skillVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      backgroundColor: getTextColor('primary'),
      color: getBackgroundColor('default'),
      transition: { type: "spring", stiffness: 300 }
    },
    active: { 
      scale: 1.2,
      backgroundColor: getTextColor('primary'),
      color: getBackgroundColor('default'),
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <motion.div
      ref={containerRef}
      className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ opacity, y }}
    >
      {/* Enhanced Background Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Enhanced Profile Picture with 3D Effect */}
      <motion.div
        className="relative w-40 h-40 mb-6 perspective-1000"
        variants={itemVariants}
        style={{
          transform: `rotateX(${mousePosition.y * 15}deg) rotateY(${mousePosition.x * 15}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 transform-style-3d"
          style={{ borderColor: getTextColor('primary') }}>
          <Image
            src="/images/ProfilePicture.jpeg"
            alt="Rial Parmar"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Enhanced Glow effect */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Additional Glow Layers */}
        <motion.div
          className="absolute -inset-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [180, 360, 180],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Floating Particles */}
        <motion.div
          className="absolute -inset-8"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-purple-500/30"
              style={{
                left: `${Math.cos(i * (Math.PI / 4)) * 40}px`,
                top: `${Math.sin(i * (Math.PI / 4)) * 40}px`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Text Content */}
      <motion.div
        className="text-center max-w-sm mx-auto relative z-10"
        variants={containerVariants}
      >
        <motion.h1
          className="text-3xl font-bold mb-2"
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
          className="text-xl font-medium mb-4"
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
          className="text-sm mb-4"
          style={{ color: getTextColor('secondary') }}
          variants={itemVariants}
        >
          I craft exceptional digital experiences that combine technical expertise with creative innovation.
        </motion.p>

        {/* Enhanced Skills Section with 3D Cards */}
        <motion.div 
          className="mb-6 bg-opacity-20 rounded-lg p-4 backdrop-blur-sm"
          style={{ 
            backgroundColor: getBackgroundColor('paper'),
            border: `1px solid ${getBorderColor('light')}`,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: getTextColor('primary') }}>
            <SparklesIcon className="w-5 h-5 text-purple-500" />
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS', 'MongoDB'].map((skill, index) => (
              <motion.span 
                key={index}
                className="px-3 py-1 text-xs rounded-full cursor-pointer"
                style={{ 
                  backgroundColor: getBackgroundColor('default'),
                  color: getTextColor('primary'),
                  border: `1px solid ${getBorderColor('light')}`
                }}
                variants={skillVariants}
                initial="initial"
                whileHover="hover"
                animate={activeSkill === skill ? "active" : "initial"}
                onHoverStart={() => setActiveSkill(skill)}
                onHoverEnd={() => setActiveSkill(null)}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Expandable Content */}
        <motion.div 
          className="mb-6 overflow-hidden"
          variants={itemVariants}
        >
          <motion.button
            onClick={toggleShowMore}
            className="flex items-center justify-center w-full gap-1 text-sm"
            style={{ color: getTextColor('secondary') }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showMore ? 'Show Less' : 'Learn More About Me'}
            <ChevronDownIcon 
              className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} 
            />
          </motion.button>
          
          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-sm text-left"
                style={{ color: getTextColor('secondary') }}
              >
                <p className="mb-3">
                  With over 2+ years of experience in web development, I specialize in building scalable applications that solve real-world problems.
                </p>
                <p className="mb-3">
                  My approach combines technical excellence with user-centered design, ensuring that every project delivers both functionality and delight.
                </p>
                <p>
                  When I'm not coding, I'm exploring new technologies, contributing to open-source projects, and sharing my knowledge with the developer community.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3 mb-6"
          variants={itemVariants}
        >
          <motion.a
            href="#contact"
            className="px-6 py-2 rounded-full text-sm font-medium text-center"
            style={{ 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 6px 16px rgba(59, 130, 246, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Let's Collaborate
          </motion.a>
          <motion.a
            href="#projects"
            className="px-6 py-2 rounded-full text-sm font-medium text-center"
            style={{ 
              background: getBackgroundColor('default'),
              color: getTextColor('primary'),
              border: `1px solid ${getBorderColor('light')}`,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            View My Projects
          </motion.a>
        </motion.div>

        <motion.div 
          className="flex justify-center items-center gap-4 mb-6"
          variants={itemVariants}
        >
          <SocialLinks />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MobileHero; 