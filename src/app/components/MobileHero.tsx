'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useTransform as useTransformMotion } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import TypewriterText from './TypewriterText';
import SocialLinks from './SocialLinks';
import Image from 'next/image';
import { ChevronDownIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { FaCode, FaRocket, FaStar, FaHeart, FaLightbulb } from 'react-icons/fa';

const MobileHero = () => {
  const { getTextColor, getBackgroundColor, getBorderColor, isDark } = useThemeStyles();
  const [showMore, setShowMore] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, mass: 0.8 };
  const springProgress = useSpring(scrollYProgress, springConfig);

  const opacity = useTransform(springProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(springProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);
  const scale = useTransform(springProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  // Enhanced floating elements
  useEffect(() => {
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setFloatingElements(elements);
  }, []);

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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  const skillVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.15,
      rotate: [0, -5, 5, 0],
      backgroundColor: getTextColor('primary'),
      color: getBackgroundColor('default'),
      transition: { 
        type: "spring", 
        stiffness: 400,
        damping: 10
      }
    },
    active: { 
      scale: 1.25,
      rotate: [0, -10, 10, 0],
      backgroundColor: getTextColor('primary'),
      color: getBackgroundColor('default'),
      transition: { 
        type: "spring", 
        stiffness: 400,
        damping: 10
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS'];

  return (
    <motion.div
      ref={containerRef}
      className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ opacity, y, scale }}
    >
      {/* Enhanced Animated Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute pointer-events-none"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          variants={floatingVariants}
          animate="animate"
          initial={{ opacity: 0, scale: 0 }}
          transition={{ delay: element.delay }}
        >
          {element.id % 4 === 0 && <FaCode className="w-4 h-4 text-purple-400/30" />}
          {element.id % 4 === 1 && <FaRocket className="w-4 h-4 text-blue-400/30" />}
          {element.id % 4 === 2 && <FaStar className="w-4 h-4 text-yellow-400/30" />}
          {element.id % 4 === 3 && <FaHeart className="w-4 h-4 text-pink-400/30" />}
        </motion.div>
      ))}

      {/* Enhanced Profile Picture with Advanced 3D Effect */}
      <motion.div
        className="relative w-44 h-44 mb-8 perspective-1000"
        variants={itemVariants}
        style={{
          transform: `rotateX(${mousePosition.y * 20}deg) rotateY(${mousePosition.x * 20}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 transform-style-3d"
          style={{ borderColor: getTextColor('primary') }}>
          <Image
            src="/images/ProfilePicutre.jpeg"
            alt="Rial Parmar"
            fill
            className="object-cover"
            priority
            style={{
              objectPosition: "center 10%",
              transform: "scale(1.15)"
            }}
          />
        </div>
        
        {/* Enhanced Multi-layer Glow Effects */}
        <motion.div
          className="absolute -inset-6 bg-gradient-to-r from-purple-500/40 to-blue-500/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <motion.div
          className="absolute -inset-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-4xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1],
            rotate: [180, 360, 180],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Enhanced Orbiting Particles */}
        <motion.div
          className="absolute -inset-10"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.cos(i * (Math.PI / 6)) * 50}px`,
                top: `${Math.sin(i * (Math.PI / 6)) * 50}px`,
                background: i % 3 === 0 ? 'rgba(147, 51, 234, 0.4)' : 
                           i % 3 === 1 ? 'rgba(59, 130, 246, 0.4)' : 
                           'rgba(236, 72, 153, 0.4)',
              }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Pulsing Ring Effect */}
        <motion.div
          className="absolute -inset-2 border-2 rounded-full"
          style={{ borderColor: getTextColor('primary') }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Enhanced Text Content */}
      <motion.div
        className="text-center max-w-sm mx-auto relative z-10"
        variants={containerVariants}
      >
        <motion.h1
          className="text-3xl font-bold mb-4"
          style={{ color: getTextColor('primary') }}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          Rial Parmar
        </motion.h1>

        <motion.div
          className="mb-6"
          variants={itemVariants}
        >
          <TypewriterText
            words={['Full Stack Developer']}
            className={`text-lg font-medium ${isDark ? 'text-purple-300' : 'text-purple-600'}`}
          />
        </motion.div>

        <motion.p
          className="text-sm leading-relaxed mb-8"
          style={{ color: getTextColor('secondary') }}
          variants={itemVariants}
        >
          Passionate about creating innovative web solutions and turning ideas into reality through clean, efficient code.
        </motion.p>

        {/* Enhanced Skills Display */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          variants={itemVariants}
        >
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
              style={{
                background: getBackgroundColor('glass'),
                color: getTextColor('secondary'),
                border: `1px solid ${getBorderColor('light')}`,
              }}
              variants={skillVariants}
              initial="initial"
              whileHover="hover"
              whileTap="active"
              onClick={() => setActiveSkill(activeSkill === skill ? null : skill)}
              animate={activeSkill === skill ? "active" : "initial"}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* Enhanced Social Links */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <SocialLinks />
        </motion.div>

        {/* Enhanced Show More Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center w-full"
        >
          <motion.button
            onClick={toggleShowMore}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300"
            style={{
              background: getBackgroundColor('glass'),
              color: getTextColor('primary'),
              border: `1px solid ${getBorderColor('light')}`,
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{showMore ? 'Show Less' : 'Learn More'}</span>
            <motion.div
              animate={{ rotate: showMore ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDownIcon className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Enhanced Expanded Content */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mt-6 text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: getTextColor('primary') }}>
                    What I Do
                  </h3>
                  <p className="text-sm" style={{ color: getTextColor('secondary') }}>
                    I specialize in building modern web applications with cutting-edge technologies, 
                    focusing on performance, accessibility, and user experience.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: getTextColor('primary') }}>
                    My Approach
                  </h3>
                  <p className="text-sm" style={{ color: getTextColor('secondary') }}>
                    Clean code, responsive design, and scalable architecture are at the heart of 
                    everything I build. I believe in continuous learning and staying updated with 
                    the latest industry trends.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        variants={itemVariants}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDownIcon 
          className="w-6 h-6" 
          style={{ color: getTextColor('secondary') }}
        />
      </motion.div>
    </motion.div>
  );
};

export default MobileHero; 