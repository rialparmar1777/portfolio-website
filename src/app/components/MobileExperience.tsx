'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaLaptopCode, FaHeadset, FaIndustry, FaExternalLinkAlt, FaStar, FaCheckCircle, FaChevronDown, FaHeart, FaAward, FaLightbulb, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useThemeStyles } from '../hooks/useThemeStyles';

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  skills: string[];
  icon: React.ReactNode;
  companyUrl?: string;
  achievements?: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: 'Customer Service Representative',
    company: 'Redberry Restaurants',
    duration: 'Mar 2023 - Present',
    location: 'Waterloo, Ontario, Canada',
    description: [
      'Provided exceptional customer service, addressing inquiries and resolving issues in a fast-paced environment',
      'Assisted customers with order processing, payments, and issue resolution, ensuring high satisfaction',
      'Maintained professionalism while handling high-volume interactions, including calls and in-person queries',
      'Tracked and updated customer interactions using internal systems to ensure accuracy',
      'Collaborated with team members to meet service goals and maintain a positive workplace environment',
      'Followed company policies and industry standards to ensure compliance and security'
    ],
    achievements: [
      'Maintained a 95% customer satisfaction rating',
      'Resolved 200+ customer issues per month',
      'Trained 3 new team members on company procedures'
    ],
    skills: ['Customer Service', 'Problem Solving', 'Communication', 'Team Collaboration', 'Order Processing'],
    icon: <FaHeadset className="w-5 h-5" />,
    companyUrl: 'https://redberryrestaurants.com'
  },
  {
    title: 'Software Developer Internship',
    company: 'Agastya International Foundation',
    duration: 'Nov 2024 - Feb 2025',
    location: 'Ahmedabad, Gujarat, India',
    description: [
      'Designed high-reliability RESTful APIs (95% uptime), reducing system errors by 25%',
      'Developed responsive web apps with React.js/Node.js, accelerating feature delivery by 20% via Agile',
      'Debugged and optimized 15+ critical performance issues in collaboration with senior developers',
      'Provided tech support for 100+ users (Windows/macOS), resolving 50+ monthly tickets and reducing repeat issues by 30% via documentation',
      'Optimized UI performance, reducing latency by 25% through lazy loading and caching strategies'
    ],
    achievements: [
      'Reduced API response time by 40% through optimization',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
      'Created comprehensive documentation reducing onboarding time by 50%'
    ],
    skills: ['React.js', 'Node.js', 'RESTful APIs', 'Agile', 'Performance Optimization', 'Technical Support'],
    icon: <FaLaptopCode className="w-5 h-5" />,
    companyUrl: 'https://agastya.org'
  },
  {
    title: 'Raw Meat Production Operator',
    company: "Piller's Fine Foods, a division of PBOLP",
    duration: 'Sep 2024 - Dec 2024',
    location: 'Waterloo, Ontario, Canada',
    description: [
      'Prepared and packaged products by removing items from racks and feeding them into packaging lines',
      'Inspected products, packages, and date codes to identify and remove defects, ensuring compliance with quality standards',
      'Packaged products into boxes, scaled boxes, and applied accurate labels for distribution',
      'Palletized finished products onto skids, wrapped securely, and moved to the staging area for shipment',
      'Maintained a clean and organized work area by sweeping floors, changing garbages, and preparing packages for rework',
      'Assisted with line changeovers, equipment washdowns, and setup to ensure seamless production transitions',
      'Completed production and QA paperwork accurately, ensuring compliance with regulatory and company standards',
      'Adhered to HACCP, GMP, and SOPs, reporting food safety issues or hazards to QA immediately',
      'Promoted a safe work environment by following the Occupational Health & Safety Act, reporting hazards, accidents, and near misses to supervisors'
    ],
    achievements: [
      'Maintained 100% compliance with food safety standards',
      'Reduced packaging errors by 15% through improved attention to detail',
      'Completed all required safety training with perfect scores'
    ],
    skills: ['Food Safety', 'Quality Control', 'Production Operations', 'HACCP', 'GMP', 'SOPs', 'Team Collaboration'],
    icon: <FaIndustry className="w-5 h-5" />,
    companyUrl: 'https://pillers.com'
  }
];

const MobileExperience = () => {
  const { getTextColor, getBackgroundColor, getBorderColor } = useThemeStyles();
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress);
        setScrollDirection(progress > scrollProgress ? 'down' : 'up');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollProgress]);

  // Auto-advance through experiences
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % experiences.length);
    }, 8000); // Change experience every 8 seconds

    return () => clearInterval(timer);
  }, []);

  // Reveal experiences one by one
  useEffect(() => {
    if (scrollProgress < 100) {
      const timer = setTimeout(() => {
        setScrollProgress((prev) => prev + 1);
      }, 100); // Add a new experience every 100ms

      return () => clearTimeout(timer);
    }
  }, [scrollProgress]);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with enhanced 3D effect */}
      <motion.div 
        className="sticky top-0 z-10 px-4 py-3 perspective-1000"
        style={{ 
          background: getBackgroundColor('paper'),
          borderBottom: `1px solid ${getBorderColor('light')}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <motion.h2 
          className="text-xl font-bold mb-2"
          style={{ color: getTextColor('primary') }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Experience
        </motion.h2>
    <motion.div
          className="h-1 rounded-full overflow-hidden"
          style={{ background: getBackgroundColor('default') }}
        >
          <motion.div 
            className="h-full rounded-full"
            style={{ 
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              width: `${scrollProgress}%`
            }}
            transition={{ duration: 0.3 }}
        />
        </motion.div>
      </motion.div>

      {/* Timeline container with enhanced scroll effects */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        <motion.div 
          ref={timelineRef}
          className="relative"
          style={{ 
            transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Animated timeline line */}
          <motion.div 
            className="absolute left-4 top-0 bottom-0 w-0.5"
          style={{ 
            background: `linear-gradient(to bottom, ${getBorderColor('light')}, rgba(59, 130, 246, 0.5), ${getBorderColor('light')})`,
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)'
          }}
            animate={{
              background: [
                `linear-gradient(to bottom, ${getBorderColor('light')}, rgba(59, 130, 246, 0.5), ${getBorderColor('light')})`,
                `linear-gradient(to bottom, ${getBorderColor('light')}, rgba(147, 51, 234, 0.5), ${getBorderColor('light')})`,
                `linear-gradient(to bottom, ${getBorderColor('light')}, rgba(59, 130, 246, 0.5), ${getBorderColor('light')})`,
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
        />

          {/* Experience items with enhanced 3D effects */}
          <div className="space-y-8 pl-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
              animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: index * 0.2,
                    duration: 0.5,
                    ease: "easeOut"
                  }
              }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
            >
                {/* Timeline dot with enhanced glow effect */}
                <motion.div 
                  className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                style={{ 
                  background: activeIndex === index ? 'rgb(59, 130, 246)' : getBorderColor('light'),
                  border: `2px solid ${getBackgroundColor('default')}`,
                  }}
                  animate={{
                  boxShadow: activeIndex === index 
                      ? ['0 0 0 4px rgba(59, 130, 246, 0.2)', '0 0 0 8px rgba(59, 130, 246, 0.1)', '0 0 0 4px rgba(59, 130, 246, 0.2)']
                      : ['0 0 0 4px rgba(59, 130, 246, 0.1)', '0 0 0 4px rgba(59, 130, 246, 0.1)'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
              />

                {/* Experience card with enhanced 3D effect */}
              <motion.div
                  className="overflow-hidden rounded-2xl perspective-1000"
                style={{ 
                  background: getBackgroundColor('paper'),
                  border: `1px solid ${getBorderColor('light')}`,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
                    transition: 'transform 0.1s ease-out'
                }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)',
                    transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale(1.02)`
                  }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleExpand(index)}
              >
                  {/* Card header with animated gradient */}
                  <motion.div 
                    className="p-4"
                    animate={{
                      background: [
                        'linear-gradient(90deg, rgb(59, 130, 246), rgb(147, 51, 234))',
                        'linear-gradient(90deg, rgb(147, 51, 234), rgb(59, 130, 246))',
                        'linear-gradient(90deg, rgb(59, 130, 246), rgb(147, 51, 234))',
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="p-2 rounded-xl"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: 'white'
                        }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {experience.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {experience.title}
                        </h3>
                        <p className="text-sm text-white/80">
                            {experience.company}
                          </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card content with enhanced animations */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt size={12} style={{ color: getTextColor('secondary') }} />
                        <span style={{ color: getTextColor('secondary') }}>
                        {experience.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt size={12} style={{ color: getTextColor('secondary') }} />
                        <span style={{ color: getTextColor('secondary') }}>
                        {experience.duration}
                        </span>
                  </div>
                </div>

                {/* Expandable content with enhanced animations */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                          className="space-y-4"
                    >
                        {/* Description with icon */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <FaLightbulb className="text-yellow-400" size={16} />
                            <h4 className="text-sm font-semibold" style={{ color: getTextColor('primary') }}>
                              Key Responsibilities
                            </h4>
                          </div>
                          <div className="space-y-2">
                            {experience.description.map((item, i) => (
                              <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: i * 0.05 }}
                                className="flex items-start text-sm"
                                style={{ color: getTextColor('secondary') }}
                              >
                                <span className="mr-2 text-blue-400">•</span>
                                {item}
                              </motion.p>
                            ))}
                          </div>
                        </div>

                        {/* Achievements with icon */}
                        {experience.achievements && (
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <FaAward className="text-amber-400" size={16} />
                              <h4 className="text-sm font-semibold" style={{ color: getTextColor('primary') }}>
                                Key Achievements
                              </h4>
                            </div>
                            <div className="space-y-2">
                              {experience.achievements.map((item, i) => (
                                <motion.p
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: i * 0.05 }}
                                  className="flex items-start text-sm"
                                  style={{ color: getTextColor('secondary') }}
                                >
                                  <span className="mr-2 text-green-400">✓</span>
                                  {item}
                                </motion.p>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Skills with icon */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <FaStar className="text-purple-400" size={16} />
                            <h4 className="text-sm font-semibold" style={{ color: getTextColor('primary') }}>
                              Skills & Technologies
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: i * 0.05 }}
                                className="px-3 py-1 rounded-full text-xs"
                                style={{ 
                                    background: getBackgroundColor('default'),
                                  color: getTextColor('primary'),
                                    border: `1px solid ${getBorderColor('light')}`
                                }}
                              >
                                {skill}
                              </motion.span>
                            ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expand/collapse indicator with animation */}
                    <div className="flex justify-center mt-4">
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown 
                      size={14} 
                      style={{ color: expandedIndex === index ? 'rgb(59, 130, 246)' : getTextColor('secondary') }}
                    />
                  </motion.div>
                </div>
                  </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        </motion.div>
      </div>

      {/* Navigation buttons with enhanced effects */}
      <motion.div 
        className="flex justify-center gap-4 p-4"
        style={{ 
          background: getBackgroundColor('paper'),
          borderTop: `1px solid ${getBorderColor('light')}`
        }}
      >
        <motion.button
          onClick={goToPrev}
          className="p-3 rounded-full"
          style={{ 
            background: getBackgroundColor('default'),
            color: getTextColor('primary'),
            border: `1px solid ${getBorderColor('light')}`
          }}
          whileHover={{ 
            scale: 1.1,
            backgroundColor: getTextColor('primary'),
            color: getBackgroundColor('default')
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaArrowLeft size={16} />
        </motion.button>
        <motion.button
          onClick={goToNext}
          className="p-3 rounded-full"
          style={{ 
            background: getBackgroundColor('default'),
            color: getTextColor('primary'),
            border: `1px solid ${getBorderColor('light')}`
          }}
          whileHover={{ 
            scale: 1.1,
            backgroundColor: getTextColor('primary'),
            color: getBackgroundColor('default')
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaArrowRight size={16} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default MobileExperience; 