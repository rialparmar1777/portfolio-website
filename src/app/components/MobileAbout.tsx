'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaTools, FaGraduationCap, FaLightbulb, FaAward, FaStar, FaHeart, FaArrowUp, FaCheckCircle, FaRocket, FaBrain, FaEye, FaGem } from 'react-icons/fa';
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
    className="w-full h-2 rounded-full overflow-hidden relative"
    style={{ background: 'rgba(0, 0, 0, 0.1)' }}
    whileHover={{ scale: 1.02 }}
  >
    <motion.div
      className="h-full rounded-full relative"
      style={{ background: color }}
      initial={{ width: 0 }}
      animate={{ width: `${proficiency}%` }}
      transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 bg-white/20"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  </motion.div>
);

const FloatingParticle = ({ delay, icon, color }: { delay: number; icon: React.ReactNode; color: string }) => (
  <motion.div
    className="absolute pointer-events-none text-2xl opacity-20"
    style={{ color }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    initial={{ opacity: 0, scale: 0 }}
  >
    {icon}
  </motion.div>
);

const MobileAbout = () => {
  const { getTextColor, getBackgroundColor, getBorderColor, isDark } = useThemeStyles();
  const [activeTab, setActiveTab] = useState<string>('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number, icon: React.ReactNode, color: string}>>([]);
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

  // Enhanced floating particles
  useEffect(() => {
    const icons = [
      <FaCode key="code" />, 
      <FaRocket key="rocket" />, 
      <FaStar key="star" />, 
      <FaHeart key="heart" />, 
      <FaBrain key="brain" />, 
      <FaEye key="eye" />,
      <FaGem key="gem" />,
      <FaAward key="award" />
    ];
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#f59e0b', '#6366f1', '#06b6d4'];
    
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      icon: icons[i % icons.length],
      color: colors[i % colors.length]
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
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
  const skills = [
    {
      name: 'Frontend Development',
      icon: <FaCode className="text-blue-500" size={20} />,
      skills: [
        { name: 'React/Next.js', proficiency: 90, color: '#3b82f6' },
        { name: 'TypeScript', proficiency: 85, color: '#8b5cf6' },
        { name: 'Tailwind CSS', proficiency: 88, color: '#06b6d4' },
        { name: 'HTML/CSS', proficiency: 92, color: '#f59e0b' }
      ]
    },
    {
      name: 'Backend Development',
      icon: <FaServer className="text-green-500" size={20} />,
      skills: [
        { name: 'Node.js', proficiency: 80, color: '#10b981' },
        { name: 'Express.js', proficiency: 75, color: '#6366f1' },
        { name: 'Python', proficiency: 70, color: '#f43f5e' },
        { name: 'REST APIs', proficiency: 85, color: '#ec4899' }
      ]
    },
    {
      name: 'Database & Tools',
      icon: <FaDatabase className="text-purple-500" size={20} />,
      skills: [
        { name: 'MongoDB', proficiency: 75, color: '#8b5cf6' },
        { name: 'PostgreSQL', proficiency: 70, color: '#3b82f6' },
        { name: 'Git/GitHub', proficiency: 85, color: '#f59e0b' },
        { name: 'Docker', proficiency: 65, color: '#06b6d4' }
      ]
    },
    {
      name: 'Additional Skills',
      icon: <FaTools className="text-orange-500" size={20} />,
      skills: [
        { name: 'Firebase', proficiency: 80, color: '#f59e0b' },
        { name: 'AWS', proficiency: 60, color: '#f43f5e' },
        { name: 'Figma', proficiency: 70, color: '#ec4899' },
        { name: 'Agile/Scrum', proficiency: 85, color: '#10b981' }
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Applications',
      institution: 'Manipal Institute of Technology - Remote',
      duration: '2024 - 2027'
    },
    {
      degree: 'Associate Degree in Computer Programming',
      institution: 'Conestoga College, Waterloo, ON, Canada',
      duration: 'Graduated - Aug 2024'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Enhanced Header with 3D effects */}
      <motion.div 
        className="sticky top-0 z-10 px-4 py-3 perspective-1000"
        style={{ 
          background: getBackgroundColor('glass'),
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${getBorderColor('light')}`,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
          transition: 'transform 0.1s ease-out',
          opacity,
          y
        }}
      >
        <motion.h2 
          className="text-xl font-bold mb-3 text-center"
          style={{ color: getTextColor('primary') }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        {/* Enhanced scroll progress indicator */}
        <motion.div 
          className="h-1 rounded-full overflow-hidden mb-3 relative"
          style={{ background: getBackgroundColor('default') }}
        >
          <motion.div 
            className="h-full rounded-full relative"
            style={{ 
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
              width: `${scrollProgress}%`
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/30"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Tabs with improved animations */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['about', 'skills', 'education'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {tab === 'about' && <FaLightbulb size={14} />}
              {tab === 'skills' && <FaCode size={14} />}
              {tab === 'education' && <FaGraduationCap size={14} />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Content with floating particles */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4 relative"
      >
        {/* Floating Particles */}
        {particles.map((particle) => (
          <FloatingParticle
            key={particle.id}
            delay={particle.delay}
            icon={particle.icon}
            color={particle.color}
          />
        ))}

        <motion.div
          className="relative z-10"
          style={{ 
            transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* About Me Section */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Hero Card */}
              <motion.div 
                className="overflow-hidden rounded-2xl perspective-1000"
                style={{ 
                  background: getBackgroundColor('paper'),
                  border: `1px solid ${getBorderColor('light')}`,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale(1.02)`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="p-6">
                  <motion.div 
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="p-3 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaLightbulb className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-semibold"
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
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale(1.02)`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="p-6">
                  <motion.div 
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      className="p-3 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaHeart className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-semibold"
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
                    transition={{ delay: 0.4 }}
                  >
                    I believe in writing clean, maintainable code and following best practices. My development process focuses on:
                  </motion.p>
                  <motion.ul 
                    className="mt-3 space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
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
                        transition={{ delay: 0.6 + index * 0.1 }}
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
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale(1.02)`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="p-6">
                  <motion.div 
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div
                      className="p-3 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaAward className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-semibold"
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
                    transition={{ delay: 0.5 }}
                  >
                    I am committed to:
                  </motion.p>
                  <motion.ul 
                    className="mt-3 space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
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
                        transition={{ delay: 0.7 + index * 0.1 }}
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
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale(1.02)`
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
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
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale(1.02)`
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
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
        </motion.div>
      </div>
    </div>
  );
};

export default MobileAbout; 