'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaLaptopCode, FaHeadset, FaIndustry, FaChevronRight, FaChevronLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useThemeStyles } from '../hooks/useThemeStyles';
import GlassCard from './GlassCard';

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
    icon: <FaHeadset className="text-2xl" />,
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
    icon: <FaLaptopCode className="text-2xl" />,
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
    icon: <FaIndustry className="text-2xl" />,
    companyUrl: 'https://pillers.com'
  }
];

const TimelineItem = ({ 
  experience, 
  index, 
  isActive, 
  onClick 
}: { 
  experience: ExperienceItem; 
  index: number; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isDark, getTextColor, getGlassStyles, colors, shadows } = useThemeStyles();
  
  // Create custom glass styles without the border property
  const getCustomGlassStyles = (isActive = false, isHovered = false) => {
    if (isActive) {
      return {
        background: colors.gradient.glassActive,
        boxShadow: shadows.glassActive,
      };
    }
    
    if (isHovered) {
      return {
        background: colors.gradient.glassHover,
        boxShadow: shadows.glassHover,
      };
    }
    
    return {
      background: colors.gradient.glass,
      boxShadow: shadows.glass,
    };
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div
        className={`p-4 cursor-pointer transition-all duration-300 rounded-xl overflow-hidden ${
          isActive ? 'scale-105' : ''
        }`}
        style={{
          ...getCustomGlassStyles(isHovered || isActive, false),
          borderLeft: isActive ? `4px solid ${isDark ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.9)'}` : 'none',
          borderTop: 'none',
          borderRight: 'none',
          borderBottom: 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="flex items-start space-x-4">
          <div className={`p-2 rounded-lg ${
            isActive 
              ? isDark ? 'bg-blue-500/30' : 'bg-blue-500/40' 
              : isDark ? 'bg-gray-800/50' : 'bg-gray-700/50'
          }`}>
            {experience.icon}
          </div>
          <div>
            <h3 className={`text-xl font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {experience.title}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {experience.company}
            </p>
            <div className="flex items-center text-sm mt-2" style={{ color: getTextColor('secondary') }}>
              <FaCalendarAlt className="mr-2" />
              {experience.duration}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceDetails = ({ experience }: { experience: ExperienceItem }) => {
  const { isDark, getTextColor, getGlassStyles } = useThemeStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  return (
    <motion.div
      ref={containerRef}
      style={{ y }}
      className="relative"
    >
      <div 
        className="p-8 rounded-xl overflow-hidden"
        style={{
          ...getGlassStyles(false, false),
          boxShadow: isDark 
            ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)' 
            : '0 10px 30px -10px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="flex items-center mb-6">
          <div className={`p-3 ${isDark ? 'bg-blue-500/30' : 'bg-blue-500/40'} rounded-lg mr-4`}>
            {experience.icon}
          </div>
          <div>
            <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {experience.title}
            </h3>
            <div className="flex items-center">
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {experience.company}
              </p>
              {experience.companyUrl && (
                <a 
                  href={experience.companyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FaExternalLinkAlt size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className={`flex items-center mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <FaMapMarkerAlt className="mr-2" />
          {experience.location}
        </div>
        
        <div className="mb-8">
          <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Key Responsibilities
          </h4>
          <div className="space-y-3">
            {experience.description.map((item, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start"
                style={{ color: getTextColor('secondary') }}
              >
                <span className={`mr-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                {item}
              </motion.p>
            ))}
          </div>
        </div>
        
        {experience.achievements && experience.achievements.length > 0 && (
          <div className="mb-8">
            <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Key Achievements
            </h4>
            <div className="space-y-3">
              {experience.achievements.map((item, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start"
                  style={{ color: getTextColor('secondary') }}
                >
                  <span className={`mr-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>✓</span>
                  {item}
                </motion.p>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Skills & Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`px-3 py-1 rounded-full text-sm ${
                  isDark 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                    : 'bg-blue-500/30 text-blue-700 border border-blue-500/40'
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { isDark, getTextColor } = useThemeStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  };
  
  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };
  
  return (
    <section id="experience" className="min-h-screen py-20 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ 
          backgroundImage: isDark 
            ? 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center'
        }} />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: isDark 
              ? 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Professional Experience
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            A journey through my professional career
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-4 space-y-4">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={index}
                experience={exp}
                index={index}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          
          {/* Experience Details */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ExperienceDetails experience={experiences[activeIndex]} />
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Controls */}
            <div className="flex justify-between mt-6">
              <button
                onClick={goToPrev}
                className={`p-2 rounded-full ${
                  isDark 
                    ? 'bg-gray-800/50 hover:bg-gray-800/70 text-white' 
                    : 'bg-gray-200/50 hover:bg-gray-200/70 text-gray-800'
                } transition-all duration-300`}
                aria-label="Previous experience"
              >
                <FaChevronLeft />
              </button>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {activeIndex + 1} / {experiences.length}
              </div>
              <button
                onClick={goToNext}
                className={`p-2 rounded-full ${
                  isDark 
                    ? 'bg-gray-800/50 hover:bg-gray-800/70 text-white' 
                    : 'bg-gray-200/50 hover:bg-gray-200/70 text-gray-800'
                } transition-all duration-300`}
                aria-label="Next experience"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 