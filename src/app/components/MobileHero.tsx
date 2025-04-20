'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import TypewriterText from './TypewriterText';
import SocialLinks from './SocialLinks';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const MobileHero = () => {
  const { getTextColor, getBackgroundColor } = useThemeStyles();
  const [showMore, setShowMore] = useState(false);

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
      className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Picture */}
      <motion.div
        className="relative w-40 h-40 mb-6"
        variants={itemVariants}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden border-4"
          style={{ borderColor: getTextColor('primary') }}>
          <Image
            src="/images/ProfilePicture.jpeg"
            alt="Rial Parmar"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Text Content */}
      <motion.div
        className="text-center max-w-sm mx-auto"
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

        {/* Skills Section */}
        <motion.div 
          className="mb-6 bg-opacity-20 rounded-lg p-4"
          style={{ backgroundColor: getBackgroundColor('paper') }}
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: getTextColor('primary') }}>
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS', 'MongoDB'].map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs rounded-full"
                style={{ 
                  backgroundColor: getBackgroundColor('default'),
                  color: getTextColor('primary'),
                  border: `1px solid ${getTextColor('secondary')}`
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Expandable Content */}
        <motion.div 
          className="mb-6 overflow-hidden"
          variants={itemVariants}
        >
          <motion.button
            onClick={toggleShowMore}
            className="flex items-center justify-center w-full gap-1 text-sm"
            style={{ color: getTextColor('secondary') }}
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
            className="w-full px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 text-center"
            whileTap={{ scale: 0.95 }}
          >
            Let's Collaborate
          </motion.a>
          <motion.a
            href="#projects"
            className="w-full px-6 py-3 rounded-lg font-medium border text-center"
            style={{ 
              color: getTextColor('primary'),
              borderColor: getTextColor('primary')
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
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