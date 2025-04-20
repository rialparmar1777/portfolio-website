'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { FaGraduationCap, FaCode, FaMusic, FaBrain, FaLightbulb, FaUsers, FaRocket, FaHeart, FaStar, FaAward, FaHtml5, FaCss3, FaServer, FaCloud, FaCheckCircle, FaGithub } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiDocker, SiGit, SiAmazon, SiVercel, SiExpress, SiPostgresql, SiJest, SiTestinglibrary, SiCypress } from 'react-icons/si';
import { useTheme } from 'next-themes';

interface ProgressBarProps {
  proficiency: number;
  theme?: string;
}

const ProgressBar = ({ proficiency, theme }: ProgressBarProps) => (
  <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full">
    <div
      className="h-full bg-black dark:bg-white rounded-full transition-all duration-500"
      style={{ width: `${proficiency}%` }}
    />
  </div>
);

const MobileAbout = () => {
  const { getTextColor, getBackgroundColor, getBorderColor } = useThemeStyles();
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'interests'>('about');
  const { theme } = useTheme();

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

  const tabVariants = {
    inactive: { scale: 1 },
    active: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  // Skills data
  const skills = [
    // Frontend
    { name: "JavaScript", icon: <SiJavascript className="w-5 h-5" style={{ color: "#F7DF1E" }} />, color: "#F7DF1E", proficiency: 95, category: "Frontend" },
    { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" style={{ color: "#3178C6" }} />, color: "#3178C6", proficiency: 90, category: "Frontend" },
    { name: "React", icon: <SiReact className="w-5 h-5" style={{ color: "#61DAFB" }} />, color: "#61DAFB", proficiency: 95, category: "Frontend" },
    { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5" style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }} />, color: "#7928CA", proficiency: 90, category: "Frontend" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" style={{ color: "#06B6D4" }} />, color: "#06B6D4", proficiency: 95, category: "Frontend" },
    { name: "HTML5", icon: <FaHtml5 className="w-5 h-5" style={{ color: "#E34F26" }} />, color: "#E34F26", proficiency: 95, category: "Frontend" },
    { name: "CSS3", icon: <FaCss3 className="w-5 h-5" style={{ color: "#1572B6" }} />, color: "#1572B6", proficiency: 90, category: "Frontend" },
    
    // Backend
    { name: "Node.js", icon: <SiNodedotjs className="w-5 h-5" style={{ color: "#339933" }} />, color: "#339933", proficiency: 90, category: "Backend" },
    { name: "Python", icon: <SiPython className="w-5 h-5" style={{ color: "#3776AB" }} />, color: "#3776AB", proficiency: 85, category: "Backend" },
    { name: "Express.js", icon: <SiExpress className="w-5 h-5" style={{ color: "#000000" }} />, color: "#000000", proficiency: 90, category: "Backend" },
    { name: "MongoDB", icon: <SiMongodb className="w-5 h-5" style={{ color: "#47A248" }} />, color: "#47A248", proficiency: 85, category: "Backend" },
    { name: "PostgreSQL", icon: <SiPostgresql className="w-5 h-5" style={{ color: "#336791" }} />, color: "#336791", proficiency: 80, category: "Backend" },
    
    // DevOps & Tools
    { name: "Docker", icon: <SiDocker className="w-5 h-5" style={{ color: "#2496ED" }} />, color: "#2496ED", proficiency: 85, category: "DevOps" },
    { name: "Git", icon: <SiGit className="w-5 h-5" style={{ color: "#F05032" }} />, color: "#F05032", proficiency: 95, category: "DevOps" },
    { name: "AWS", icon: <SiAmazon className="w-5 h-5" style={{ color: "#FF9900" }} />, color: "#FF9900", proficiency: 80, category: "DevOps" },
    { name: "Vercel", icon: <SiVercel className="w-5 h-5" style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }} />, color: "#FF0080", proficiency: 90, category: "DevOps" },
    { name: "GitHub", icon: <FaGithub className="w-5 h-5" style={{ color: "#181717" }} />, color: "#181717", proficiency: 95, category: "DevOps" },
    
    // Testing & Quality
    { name: "Jest", icon: <SiJest className="w-5 h-5" style={{ color: "#C21325" }} />, color: "#C21325", proficiency: 85, category: "Testing" },
    { name: "React Testing", icon: <SiTestinglibrary className="w-5 h-5" style={{ color: "#E33332" }} />, color: "#E33332", proficiency: 80, category: "Testing" },
    { name: "Cypress", icon: <SiCypress className="w-5 h-5" style={{ color: "#17202C" }} />, color: "#17202C", proficiency: 75, category: "Testing" }
  ];

  const renderAboutContent = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero Card */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl"
        style={{ 
          background: `linear-gradient(135deg, ${getBackgroundColor('paper')}, ${getBackgroundColor('default')})`,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
          style={{ 
            background: `radial-gradient(circle, ${getTextColor('primary')} 0%, transparent 70%)`,
            transform: 'translate(30%, -30%)'
          }}
        />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10"
          style={{ 
            background: `radial-gradient(circle, ${getTextColor('primary')} 0%, transparent 70%)`,
            transform: 'translate(-30%, 30%)'
          }}
        />
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full" 
              style={{ 
                background: getBackgroundColor('default'),
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
            >
              <FaCode className="w-6 h-6" style={{ color: getTextColor('primary') }} />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: getTextColor('primary') }}>
              About Me
            </h2>
          </div>
          <p className="text-base leading-relaxed mb-4" style={{ color: getTextColor('secondary') }}>
            I'm a passionate Full Stack Developer with a strong foundation in both frontend and backend technologies. 
            My journey in software development began with a curiosity for creating things that live on the internet.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium" 
              style={{ 
                background: getBackgroundColor('default'),
                color: getTextColor('primary')
              }}
            >
              Full Stack
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium" 
              style={{ 
                background: getBackgroundColor('default'),
                color: getTextColor('primary')
              }}
            >
              React
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium" 
              style={{ 
                background: getBackgroundColor('default'),
                color: getTextColor('primary')
              }}
            >
              Node.js
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium" 
              style={{ 
                background: getBackgroundColor('default'),
                color: getTextColor('primary')
              }}
            >
              TypeScript
            </span>
          </div>
        </div>
      </motion.div>

      {/* Approach Card */}
      <motion.div 
        variants={itemVariants}
        className="p-6 rounded-3xl overflow-hidden"
        style={{ 
          background: getBackgroundColor('paper'),
          border: `1px solid ${getBorderColor('light')}`,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full" 
            style={{ 
              background: getBackgroundColor('default'),
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}
          >
            <FaLightbulb className="w-5 h-5" style={{ color: getTextColor('primary') }} />
          </div>
          <h3 className="text-lg font-semibold" style={{ color: getTextColor('primary') }}>
            My Approach
          </h3>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: getTextColor('secondary') }}>
          I believe in writing clean, maintainable code and building scalable applications that solve real-world problems. 
          I'm constantly learning and exploring new technologies to stay at the forefront of web development.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl" style={{ background: getBackgroundColor('default') }}>
            <div className="flex items-center gap-2 mb-1">
              <FaStar className="w-3 h-3" style={{ color: getTextColor('primary') }} />
              <span className="text-xs font-medium" style={{ color: getTextColor('primary') }}>Clean Code</span>
            </div>
            <p className="text-xs" style={{ color: getTextColor('secondary') }}>Writing readable and maintainable code</p>
          </div>
          <div className="p-3 rounded-xl" style={{ background: getBackgroundColor('default') }}>
            <div className="flex items-center gap-2 mb-1">
              <FaAward className="w-3 h-3" style={{ color: getTextColor('primary') }} />
              <span className="text-xs font-medium" style={{ color: getTextColor('primary') }}>Best Practices</span>
            </div>
            <p className="text-xs" style={{ color: getTextColor('secondary') }}>Following industry standards and patterns</p>
          </div>
        </div>
      </motion.div>

      {/* Education Card */}
      <motion.div 
        variants={itemVariants}
        className="p-6 rounded-3xl overflow-hidden"
        style={{ 
          background: getBackgroundColor('paper'),
          border: `1px solid ${getBorderColor('light')}`,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full" 
            style={{ 
              background: getBackgroundColor('default'),
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}
          >
            <FaGraduationCap className="w-5 h-5" style={{ color: getTextColor('primary') }} />
          </div>
          <h3 className="text-lg font-semibold" style={{ color: getTextColor('primary') }}>
            Education & Background
          </h3>
        </div>
        <div className="space-y-3">
          <div className="p-4 rounded-xl" 
            style={{ 
              background: getBackgroundColor('default'),
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <p className="text-sm font-medium" style={{ color: getTextColor('primary') }}>
              Diploma in Computer Programming - IT
            </p>
            <p className="text-xs mt-1" style={{ color: getTextColor('secondary') }}>
              Conestoga College | Jan 2023 - Aug 2024
            </p>
            <div className="mt-2 flex items-center gap-1">
              <FaStar className="w-3 h-3" style={{ color: getTextColor('primary') }} />
              <FaStar className="w-3 h-3" style={{ color: getTextColor('primary') }} />
              <FaStar className="w-3 h-3" style={{ color: getTextColor('primary') }} />
              <FaStar className="w-3 h-3" style={{ color: getTextColor('primary') }} />
              <FaStar className="w-3 h-3" style={{ color: getTextColor('primary') }} />
            </div>
          </div>
          <div className="p-4 rounded-xl" 
            style={{ 
              background: getBackgroundColor('default'),
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <p className="text-sm font-medium" style={{ color: getTextColor('primary') }}>
              Bachelor of Computer Applications
            </p>
            <p className="text-xs mt-1" style={{ color: getTextColor('secondary') }}>
              Manipal Institute of Technology
            </p>
            <div className="mt-2 flex items-center gap-1">
              <FaStar className="w-3 h-3" style={{ color: getTextColor('primary') }} />
              <FaStar className="w-3 h-3" style={{ color: getTextColor('primary') }} />
              <FaStar className="w-3 h-3" style={{ color: getTextColor('primary') }} />
              <FaStar className="w-3 h-3" style={{ color: getTextColor('primary') }} />
              <FaStar className="w-3 h-3 opacity-30" style={{ color: getTextColor('primary') }} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderSkillsContent = () => {
    const categories = ['Frontend', 'Backend', 'DevOps', 'Testing'];
    
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: getTextColor('primary') }}>
            Technical Skills
          </h2>
          
          {categories.map((category, categoryIndex) => (
            <motion.div 
              key={category}
              variants={itemVariants}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full" 
                  style={{ 
                    background: getBackgroundColor('default'),
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {category === 'Frontend' && <FaCode className="w-4 h-4" style={{ color: getTextColor('primary') }} />}
                  {category === 'Backend' && <FaServer className="w-4 h-4" style={{ color: getTextColor('primary') }} />}
                  {category === 'DevOps' && <FaCloud className="w-4 h-4" style={{ color: getTextColor('primary') }} />}
                  {category === 'Testing' && <FaCheckCircle className="w-4 h-4" style={{ color: getTextColor('primary') }} />}
                </div>
                <h3 className="text-lg font-semibold" style={{ color: getTextColor('primary') }}>
                  {category}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      className="p-4 rounded-3xl overflow-hidden"
                      style={{ 
                        background: getBackgroundColor('paper'),
                        border: `1px solid ${getBorderColor('light')}`,
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-full" 
                          style={{ 
                            background: getBackgroundColor('default'),
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                          }}
                        >
                          {skill.icon}
                        </div>
                        <h3 className="text-base font-semibold" style={{ color: getTextColor('primary') }}>
                          {skill.name}
                        </h3>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" 
                        style={{ background: getBackgroundColor('default') }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ 
                            width: `${skill.proficiency}%`,
                            background: skill.color
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                        />
                      </div>
                      <p className="text-xs mt-2 text-right" style={{ color: getTextColor('secondary') }}>
                        {skill.proficiency}%
                      </p>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  };

  const renderInterestsContent = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-6" style={{ color: getTextColor('primary') }}>
          Beyond Coding
        </h2>
        
        <div className="space-y-5">
          {/* Music Card */}
          <motion.div 
            variants={itemVariants}
            className="p-6 rounded-3xl overflow-hidden"
            style={{ 
              background: getBackgroundColor('paper'),
              border: `1px solid ${getBorderColor('light')}`,
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full" 
                style={{ 
                  background: getBackgroundColor('default'),
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                <FaMusic className="w-5 h-5" style={{ color: getTextColor('primary') }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: getTextColor('primary') }}>
                Music & Creativity
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: getTextColor('secondary') }}>
              I play guitar and piano, finding parallels between music composition and code structure.
              The rhythm and patterns in music often inspire my approach to problem-solving.
            </p>
            <div className="flex items-center gap-2">
              <FaHeart className="w-4 h-4" style={{ color: getTextColor('primary') }} />
              <span className="text-xs" style={{ color: getTextColor('secondary') }}>
                Favorite genres: Jazz, Classical, Electronic
              </span>
            </div>
          </motion.div>
          
          {/* Problem Solving Card */}
          <motion.div 
            variants={itemVariants}
            className="p-6 rounded-3xl overflow-hidden"
            style={{ 
              background: getBackgroundColor('paper'),
              border: `1px solid ${getBorderColor('light')}`,
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full" 
                style={{ 
                  background: getBackgroundColor('default'),
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                <FaBrain className="w-5 h-5" style={{ color: getTextColor('primary') }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: getTextColor('primary') }}>
                Problem Solving
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: getTextColor('secondary') }}>
              I enjoy tackling complex challenges and finding elegant solutions.
              I often participate in coding competitions and hackathons to sharpen my skills.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl" style={{ background: getBackgroundColor('default') }}>
                <div className="flex items-center gap-2 mb-1">
                  <FaAward className="w-3 h-3" style={{ color: getTextColor('primary') }} />
                  <span className="text-xs font-medium" style={{ color: getTextColor('primary') }}>Hackathons</span>
                </div>
                <p className="text-xs" style={{ color: getTextColor('secondary') }}>3 awards in 2023</p>
              </div>
              <div className="p-3 rounded-xl" style={{ background: getBackgroundColor('default') }}>
                <div className="flex items-center gap-2 mb-1">
                  <FaStar className="w-3 h-3" style={{ color: getTextColor('primary') }} />
                  <span className="text-xs font-medium" style={{ color: getTextColor('primary') }}>Competitions</span>
                </div>
                <p className="text-xs" style={{ color: getTextColor('secondary') }}>Top 10% in 5 contests</p>
              </div>
            </div>
          </motion.div>
          
          {/* Community Card */}
          <motion.div 
            variants={itemVariants}
            className="p-6 rounded-3xl overflow-hidden"
            style={{ 
              background: getBackgroundColor('paper'),
              border: `1px solid ${getBorderColor('light')}`,
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full" 
                style={{ 
                  background: getBackgroundColor('default'),
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                <FaUsers className="w-5 h-5" style={{ color: getTextColor('primary') }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: getTextColor('primary') }}>
                Community Involvement
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: getTextColor('secondary') }}>
              I contribute to open-source projects and mentor aspiring developers.
              I believe in giving back to the community that has helped me grow.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium" 
                style={{ 
                  background: getBackgroundColor('default'),
                  color: getTextColor('primary')
                }}
              >
                Open Source
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium" 
                style={{ 
                  background: getBackgroundColor('default'),
                  color: getTextColor('primary')
                }}
              >
                Mentoring
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium" 
                style={{ 
                  background: getBackgroundColor('default'),
                  color: getTextColor('primary')
                }}
              >
                Tech Talks
              </span>
            </div>
          </motion.div>
          
          {/* Learning Card */}
          <motion.div 
            variants={itemVariants}
            className="p-6 rounded-3xl overflow-hidden"
            style={{ 
              background: getBackgroundColor('paper'),
              border: `1px solid ${getBorderColor('light')}`,
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full" 
                style={{ 
                  background: getBackgroundColor('default'),
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                <FaRocket className="w-5 h-5" style={{ color: getTextColor('primary') }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: getTextColor('primary') }}>
                Continuous Learning
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: getTextColor('secondary') }}>
              I'm always exploring new technologies and methodologies.
              Currently learning about AI/ML integration in web applications.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium" 
                style={{ 
                  background: getBackgroundColor('default'),
                  color: getTextColor('primary')
                }}
              >
                AI/ML
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium" 
                style={{ 
                  background: getBackgroundColor('default'),
                  color: getTextColor('primary')
                }}
              >
                Web3
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium" 
                style={{ 
                  background: getBackgroundColor('default'),
                  color: getTextColor('primary')
                }}
              >
                Cloud Native
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="py-6">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-full" 
          style={{ 
            background: getBackgroundColor('default'),
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
        >
          {(['about', 'skills', 'interests'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-sm font-medium capitalize rounded-full ${
                activeTab === tab ? '' : ''
              }`}
              style={{ 
                color: activeTab === tab ? getTextColor('primary') : getTextColor('secondary'),
                background: activeTab === tab ? getBackgroundColor('paper') : 'transparent'
              }}
              variants={tabVariants}
              animate={activeTab === tab ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'about' && renderAboutContent()}
        {activeTab === 'skills' && renderSkillsContent()}
        {activeTab === 'interests' && renderInterestsContent()}
      </AnimatePresence>
    </div>
  );
};

export default MobileAbout; 