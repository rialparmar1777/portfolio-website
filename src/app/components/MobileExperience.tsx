'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaLaptopCode, FaHeadset, FaIndustry, FaExternalLinkAlt, FaStar, FaCheckCircle, FaChevronDown, FaHeart, FaAward, FaLightbulb, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [visibleExperiences, setVisibleExperiences] = useState<number[]>([]);
  const { getTextColor, getBackgroundColor, getBorderColor } = useThemeStyles();

  // Auto-advance through experiences
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % experiences.length);
    }, 8000); // Change experience every 8 seconds

    return () => clearInterval(timer);
  }, []);

  // Reveal experiences one by one
  useEffect(() => {
    if (visibleExperiences.length < experiences.length) {
      const timer = setTimeout(() => {
        setVisibleExperiences((prev) => [...prev, prev.length]);
      }, 1000); // Add a new experience every second

      return () => clearTimeout(timer);
    }
  }, [visibleExperiences]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header with decorative elements */}
      <motion.div variants={itemVariants} className="text-center mb-8 relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0) 70%)' }}
        />
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Professional Journey
        </h2>
        <p className="text-sm" style={{ color: getTextColor('secondary') }}>
          My career path and achievements
        </p>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full"
          style={{ background: 'linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.8) 50%, rgba(59, 130, 246, 0) 100%)' }}
        />
      </motion.div>

      {/* Timeline with enhanced visuals */}
      <div className="relative">
        {/* Timeline line with gradient */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5"
          style={{ 
            background: `linear-gradient(to bottom, ${getBorderColor('light')}, rgba(59, 130, 246, 0.5), ${getBorderColor('light')})`,
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)'
          }}
        />

        {/* Experience items */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: visibleExperiences.includes(index) ? 1 : 0,
                y: visibleExperiences.includes(index) ? 0 : 20,
                transition: { delay: index * 0.3 }
              }}
              className={`relative pl-12 ${visibleExperiences.includes(index) ? 'block' : 'hidden'}`}
            >
              {/* Timeline dot with glow effect */}
              <div 
                className="absolute left-3 top-0 w-4 h-4 rounded-full -translate-x-1/2"
                style={{ 
                  background: activeIndex === index ? 'rgb(59, 130, 246)' : getBorderColor('light'),
                  border: `2px solid ${getBackgroundColor('default')}`,
                  boxShadow: activeIndex === index 
                    ? '0 0 0 4px rgba(59, 130, 246, 0.2), 0 0 10px rgba(59, 130, 246, 0.5)' 
                    : '0 0 0 4px rgba(59, 130, 246, 0.1)'
                }}
              />

              {/* Experience card with enhanced design */}
              <motion.div
                className="overflow-hidden rounded-2xl"
                style={{ 
                  background: getBackgroundColor('paper'),
                  border: `1px solid ${getBorderColor('light')}`,
                  boxShadow: activeIndex === index 
                    ? '0 8px 24px rgba(0, 0, 0, 0.12)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleExpand(index)}
              >
                {/* Card header with gradient accent */}
                <div className="relative">
                  <div className="absolute top-0 left-0 w-full h-1"
                    style={{ 
                      background: 'linear-gradient(90deg, rgb(59, 130, 246), rgb(147, 51, 234))',
                      opacity: activeIndex === index ? 1 : 0.7
                    }}
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="p-3 rounded-xl"
                        style={{ 
                          background: activeIndex === index 
                            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))' 
                            : getBackgroundColor('default'),
                          color: activeIndex === index ? 'rgb(59, 130, 246)' : getTextColor('primary'),
                          boxShadow: activeIndex === index 
                            ? '0 4px 12px rgba(59, 130, 246, 0.2)' 
                            : '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        {experience.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: getTextColor('primary') }}>
                          {experience.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className="text-sm" style={{ color: getTextColor('secondary') }}>
                            {experience.company}
                          </p>
                          {experience.companyUrl && (
                            <a 
                              href={experience.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FaExternalLinkAlt size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm" style={{ color: getTextColor('secondary') }}>
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt size={12} />
                        {experience.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt size={12} />
                        {experience.duration}
                      </div>
                    </div>
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
                      className="border-t"
                      style={{ borderColor: getBorderColor('light') }}
                    >
                      <div className="p-4 space-y-5">
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
                                  background: activeIndex === index 
                                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))' 
                                    : getBackgroundColor('default'),
                                  color: getTextColor('primary'),
                                  border: `1px solid ${getBorderColor('light')}`,
                                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                                }}
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expand/collapse indicator with animation */}
                <div 
                  className="p-2 text-center border-t"
                  style={{ borderColor: getBorderColor('light') }}
                >
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
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-between mt-6">
        <motion.button
          onClick={goToPrev}
          className="p-3 rounded-full"
          style={{ 
            background: getBackgroundColor('default'),
            color: getTextColor('primary'),
            border: `1px solid ${getBorderColor('light')}`,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft size={16} />
        </motion.button>
        
        <div className="flex gap-2">
          {experiences.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full"
              style={{ 
                background: activeIndex === index ? 'rgb(59, 130, 246)' : getBorderColor('light'),
                boxShadow: activeIndex === index ? '0 0 8px rgba(59, 130, 246, 0.5)' : 'none'
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        
        <motion.button
          onClick={goToNext}
          className="p-3 rounded-full"
          style={{ 
            background: getBackgroundColor('default'),
            color: getTextColor('primary'),
            border: `1px solid ${getBorderColor('light')}`,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowRight size={16} />
        </motion.button>
      </div>

      {/* Decorative footer */}
      <motion.div 
        variants={itemVariants}
        className="text-center mt-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ 
            background: getBackgroundColor('default'),
            border: `1px solid ${getBorderColor('light')}`,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}
        >
          <FaHeart className="text-red-400" size={14} />
          <span className="text-xs" style={{ color: getTextColor('secondary') }}>
            Passionate about creating impactful experiences
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileExperience; 