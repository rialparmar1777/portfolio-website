'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaTools, FaGraduationCap, FaLightbulb, FaAward, FaStar, FaHeart, FaArrowUp, FaCheckCircle } from 'react-icons/fa';
import { useThemeStyles } from '../hooks/useThemeStyles';

interface Skill {
  name: string;
  proficiency: number;
  color: string;
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
}

interface ProgressBarProps {
  proficiency: number;
  color: string;
}

const ProgressBar = ({ proficiency, color }: ProgressBarProps) => (
  <motion.div 
    className="w-full h-2 rounded-full overflow-hidden"
    style={{ background: 'rgba(0, 0, 0, 0.1)' }}
  >
    <motion.div
      className="h-full rounded-full"
      style={{ background: color }}
      initial={{ width: 0 }}
      animate={{ width: `${proficiency}%` }}
      transition={{ duration: 0.8, delay: 0.2 }}
    />
  </motion.div>
);

const MobileAbout = () => {
  const { getTextColor, getBackgroundColor, getBorderColor } = useThemeStyles();
  const [activeTab, setActiveTab] = useState<string>('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, mass: 0.8 };
  const springProgress = useSpring(scrollYProgress, springConfig);

  // Transform scroll progress to opacity and y position
  const opacity = useTransform(springProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(springProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

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

  // Skills data with proper typing
  const skills: SkillCategory[] = [
    {
      name: "Frontend",
      icon: <FaCode className="w-5 h-5" />,
      skills: [
        { name: "React", proficiency: 90, color: "#61DAFB" },
        { name: "Next.js", proficiency: 85, color: "#000000" },
        { name: "TypeScript", proficiency: 80, color: "#3178C6" },
        { name: "Tailwind CSS", proficiency: 95, color: "#06B6D4" }
      ]
    },
    {
      name: "Backend",
      icon: <FaServer className="w-5 h-5" />,
      skills: [
        { name: "Node.js", proficiency: 85, color: "#339933" },
        { name: "Express", proficiency: 80, color: "#000000" },
        { name: "MongoDB", proficiency: 75, color: "#47A248" },
        { name: "PostgreSQL", proficiency: 70, color: "#336791" }
      ]
    },
    {
      name: "DevOps",
      icon: <FaTools className="w-5 h-5" />,
      skills: [
        { name: "Docker", proficiency: 75, color: "#2496ED" },
        { name: "AWS", proficiency: 70, color: "#FF9900" },
        { name: "Git", proficiency: 90, color: "#F05032" },
        { name: "CI/CD", proficiency: 75, color: "#000000" }
      ]
    }
  ];

  // Education data
  const education = [
    {
      degree: "Diploma in Computer Programming - IT",
      institution: "Conestoga College",
      duration: "Jan 2023 - Aug 2024"
    },
    {
      degree: "Bachelor of Computer Applications",
      institution: "Manipal Institute of Technology",
      duration: ""
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header with scroll-based reveal */}
      <motion.div 
        className="sticky top-0 z-10 px-4 py-3 perspective-1000"
        style={{ 
          background: getBackgroundColor('paper'),
          borderBottom: `1px solid ${getBorderColor('light')}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
          transition: 'transform 0.1s ease-out',
          opacity,
          y
        }}
      >
        <motion.h2 
          className="text-xl font-bold mb-2"
          style={{ color: getTextColor('primary') }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          About Me
        </motion.h2>

        {/* Scroll progress indicator */}
        <motion.div 
          className="h-1 rounded-full overflow-hidden mb-3"
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

        {/* Tabs with enhanced animations */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['about', 'skills', 'education'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {tab === 'about' && <FaLightbulb size={14} />}
              {tab === 'skills' && <FaCode size={14} />}
              {tab === 'education' && <FaGraduationCap size={14} />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content with scroll-based reveal */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        <motion.div 
          className="space-y-8"
          style={{ 
            transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* About Me Section */}
          <AnimatePresence mode="wait">
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Hero Card */}
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
                >
                  <div className="p-6">
                    <motion.div 
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div
                        className="p-2 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FaLightbulb className="w-5 h-5 text-white" />
                      </motion.div>
                      <motion.h3 
                        className="text-lg font-semibold"
                        style={{ color: getTextColor('primary') }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        Who Am I?
                      </motion.h3>
                    </motion.div>
                    <motion.p 
                      className="text-sm leading-relaxed"
                      style={{ color: getTextColor('secondary') }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      I'm a passionate full-stack developer with a strong foundation in both frontend and backend technologies. My journey in software development is driven by a constant desire to learn, innovate, and create impactful solutions. I specialize in building modern, scalable web applications with a focus on user experience and performance.
                    </motion.p>
                  </div>
                </motion.div>

                {/* Approach Card */}
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
                >
                  <div className="p-6">
                    <motion.div 
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div
                        className="p-2 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FaHeart className="w-5 h-5 text-white" />
                      </motion.div>
                      <motion.h3 
                        className="text-lg font-semibold"
                        style={{ color: getTextColor('primary') }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        My Approach
                      </motion.h3>
                    </motion.div>
                    <motion.p 
                      className="text-sm leading-relaxed"
                      style={{ color: getTextColor('secondary') }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      I believe in writing clean, maintainable code and following best practices. My development process focuses on:
                    </motion.p>
                    <motion.ul 
                      className="mt-3 space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {[
                        "User-centered design and intuitive interfaces",
                        "Performance optimization and scalability",
                        "Clean code architecture and best practices",
                        "Continuous learning and staying updated with new technologies"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <FaStar className="w-3 h-3 mt-1" style={{ color: getTextColor('primary') }} />
                          <span className="text-sm" style={{ color: getTextColor('secondary') }}>
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>

                {/* Values Card */}
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
                >
                  <div className="p-6">
                    <motion.div 
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div
                        className="p-2 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FaAward className="w-5 h-5 text-white" />
                      </motion.div>
                      <motion.h3 
                        className="text-lg font-semibold"
                        style={{ color: getTextColor('primary') }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        My Values
                      </motion.h3>
                    </motion.div>
                    <motion.p 
                      className="text-sm leading-relaxed"
                      style={{ color: getTextColor('secondary') }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      I am committed to:
                    </motion.p>
                    <motion.ul 
                      className="mt-3 space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {[
                        "Delivering high-quality, well-tested code",
                        "Collaborating effectively with team members",
                        "Solving complex problems with innovative solutions",
                        "Maintaining a growth mindset and continuous improvement"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <FaCheckCircle className="w-3 h-3 mt-1" style={{ color: getTextColor('primary') }} />
                          <span className="text-sm" style={{ color: getTextColor('secondary') }}>
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Skills Section */}
            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {skills.map((category, index) => (
                  <motion.div
                    key={index}
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
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        {category.icon}
                        <motion.h3 
                          className="text-lg font-semibold"
                          style={{ color: getTextColor('primary') }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {category.name}
                        </motion.h3>
                      </div>
                      <div className="space-y-3">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            className="flex items-center justify-between"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: skillIndex * 0.1 }}
                          >
                            <span className="text-sm" style={{ color: getTextColor('secondary') }}>
                              {skill.name}
                            </span>
                            <ProgressBar 
                              proficiency={skill.proficiency} 
                              color={skill.color}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Education Section */}
            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {education.map((item, index) => (
                  <motion.div
                    key={index}
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
                  >
                    <div className="p-6">
                      <motion.h3 
                        className="text-lg font-semibold mb-2"
                        style={{ color: getTextColor('primary') }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.degree}
                      </motion.h3>
                      <motion.p 
                        className="text-sm mb-2"
                        style={{ color: getTextColor('secondary') }}
                      >
                        {item.institution}
                      </motion.p>
                      <motion.p 
                        className="text-sm"
                        style={{ color: getTextColor('secondary') }}
                      >
                        {item.duration}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileAbout; 