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
  const { getTextColor, getBackgroundColor, getBorderColor, getShadow, isDark } = useThemeStyles();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div
        className="p-6 cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden backdrop-blur-sm"
        style={{
          background: isActive 
            ? getBackgroundColor('glassActive')
            : getBackgroundColor('glass'),
          border: `1px solid ${isActive ? getBorderColor('medium') : getBorderColor('light')}`,
          boxShadow: isActive ? getShadow('lg') : getShadow('md'),
          transform: isActive ? 'scale(1.02)' : 'scale(1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="flex items-start space-x-4">
          <div 
            className="p-3 rounded-xl transition-colors duration-300"
            style={{
              background: isActive 
                ? isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.2)'
                : getBackgroundColor('glass'),
              color: isActive 
                ? isDark ? '#C4B5FD' : '#7C3AED'
                : getTextColor('secondary'),
            }}
          >
            {experience.icon}
          </div>
          <div>
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: getTextColor('primary') }}
            >
              {experience.title}
            </h3>
            <p 
              className="text-sm font-medium"
              style={{ color: getTextColor('secondary') }}
            >
              {experience.company}
            </p>
            <div className="flex items-center text-sm mt-3" style={{ color: getTextColor('secondary') }}>
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
  const { getTextColor, getBackgroundColor, getBorderColor, getShadow, isDark } = useThemeStyles();
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
        className="p-8 rounded-2xl overflow-hidden backdrop-blur-sm"
        style={{
          background: getBackgroundColor('paper'),
          border: `1px solid ${getBorderColor('light')}`,
          boxShadow: getShadow('xl'),
        }}
      >
        <div className="flex items-center mb-8">
          <div 
            className="p-4 rounded-xl"
            style={{
              background: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.2)',
              color: isDark ? '#C4B5FD' : '#7C3AED',
            }}
          >
            {experience.icon}
          </div>
          <div className="ml-4">
            <h2 
              className="text-2xl font-bold mb-2"
              style={{ color: getTextColor('primary') }}
            >
              {experience.title}
            </h2>
            <p 
              className="text-lg font-medium mb-1"
              style={{ color: getTextColor('secondary') }}
            >
                {experience.company}
              </p>
            <div className="flex items-center text-sm" style={{ color: getTextColor('secondary') }}>
              <FaMapMarkerAlt className="mr-2" />
              {experience.location}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: getTextColor('primary') }}
            >
            Key Responsibilities
            </h3>
            <ul className="space-y-3">
            {experience.description.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start"
                  style={{ color: getTextColor('secondary') }}
                >
                  <span className="mr-3 mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#8B5CF6' }}></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        
        <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: getTextColor('primary') }}
            >
              Key Achievements
            </h3>
            {experience.achievements && (
              <ul className="space-y-3 mb-6">
                {experience.achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start"
                    style={{ color: getTextColor('secondary') }}
                  >
                    <span className="mr-3 mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#3B82F6' }}></span>
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            )}
            
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: getTextColor('primary') }}
            >
            Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-3 py-1 text-sm rounded-full"
                  style={{
                    background: getBackgroundColor('glass'),
                    color: getTextColor('secondary'),
                    border: `1px solid ${getBorderColor('light')}`,
                  }}
              >
                {skill}
              </motion.span>
            ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { isDark } = useThemeStyles();
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
    <section id="experience" className="min-h-screen py-24 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ 
          background: isDark 
            ? 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.15), rgba(79, 70, 229, 0.15), transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1), rgba(79, 70, 229, 0.1), transparent 70%)',
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl font-bold mb-6 ${
            isDark 
              ? 'bg-gradient-to-r from-purple-400 to-blue-400'
              : 'bg-gradient-to-r from-purple-600 to-blue-600'
          } text-transparent bg-clip-text`}>
            Professional Experience
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            A journey through my professional career
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Timeline */}
          <div className="lg:col-span-4 space-y-6">
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
            <div className="flex justify-between mt-8">
              <button
                onClick={goToPrev}
                className={`p-3 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 text-white' 
                    : 'bg-white/50 hover:bg-white/70 text-gray-800'
                }`}
                aria-label="Previous experience"
              >
                <FaChevronLeft />
              </button>
              <div className={`flex items-center text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {activeIndex + 1} / {experiences.length}
              </div>
              <button
                onClick={goToNext}
                className={`p-3 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 text-white' 
                    : 'bg-white/50 hover:bg-white/70 text-gray-800'
                }`}
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