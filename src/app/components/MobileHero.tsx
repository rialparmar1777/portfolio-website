'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import TypewriterText from './TypewriterText';
import SocialLinks from './SocialLinks';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const MobileHero = () => {
  const { getTextColor, getBackgroundColor } = useThemeStyles();
  const [showMore, setShowMore] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Profile Picture with 3D Effect */}
      <motion.div
        className="relative w-40 h-40 mb-6 perspective-1000"
        variants={itemVariants}
        style={{
          transform: `rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
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
      </motion.div>

      {/* Text Content */}
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
          style={{ backgroundColor: getBackgroundColor('paper') }}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: getTextColor('primary') }}>
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
                  border: `1px solid ${getTextColor('secondary')}`
                }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: getTextColor('primary'),
                  color: getBackgroundColor('default')
                }}
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
          
          <motion.div
            initial={false}
            animate={{ 
              height: showMore ? 'auto' : 0,
              opacity: showMore ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-sm text-left"
            style={{ color: getTextColor('secondary') }}
          >
            <p className="mb-3">
              With over 5 years of experience in web development, I specialize in building scalable applications that solve real-world problems.
            </p>
            <p className="mb-3">
              My approach combines technical excellence with user-centered design, ensuring that every project delivers both functionality and delight.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, contributing to open-source projects, and sharing my knowledge with the developer community.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3 mb-6"
          variants={itemVariants}
        >
          <motion.a
            href="#contact"
            className="w-full px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 text-center relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Let's Collaborate</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.a>
          <motion.a
            href="#projects"
            className="w-full px-6 py-3 rounded-lg font-medium border text-center relative overflow-hidden group"
            style={{ 
              color: getTextColor('primary'),
              borderColor: getTextColor('primary')
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.a>
        </motion.div>

        <motion.div
          className="flex justify-center"
          variants={itemVariants}
        >
          <SocialLinks size="md" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MobileHero; 