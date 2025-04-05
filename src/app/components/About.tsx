'use client';

import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { 
  SiJavascript, SiTypescript, SiPython, SiOpenjdk, SiKotlin,
  SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiRedux,
  SiChartdotjs, SiNodedotjs, SiExpress, SiFirebase,
  SiPostgresql, SiMongodb, SiRedis, SiDocker, SiGit, SiAmazon, SiVercel,
  SiOpsgenie, SiFastapi, SiServerless, SiDatadog,
  SiPowers, SiShell, SiPostman, SiStripe, SiGithubactions
} from 'react-icons/si';
import { TbApi, TbBrandWebflow as TbWebSocket, TbBrandAzure, TbChartBar } from 'react-icons/tb';
import { BiData as BiDatabase } from 'react-icons/bi';
import { FaGraduationCap, FaCode, FaMusic, FaBrain, FaLightbulb, FaUsers, FaRocket } from 'react-icons/fa';
import { useThemeStyles } from '../hooks/useThemeStyles';
import GlassCard from './GlassCard';
import Image from 'next/image';

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  category: "Languages" | "Frontend" | "Backend" | "Database" | "DevOps" | "Cloud" | "Monitoring" | "Automation" | "Tools";
  proficiency: number;
  description: string;
  highlights: string[];
}

const skills: Skill[] = [
  {
    name: "JavaScript",
    icon: <SiJavascript className="w-12 h-12" style={{ color: "#F7DF1E" }} />,
    color: "#F7DF1E",
    category: "Languages",
    proficiency: 95,
    description: "Modern JavaScript development with ES6+ features",
    highlights: ["ES6+", "Async/Await", "DOM", "Web APIs"]
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="w-12 h-12" style={{ color: "#3178C6" }} />,
    color: "#3178C6",
    category: "Languages",
    proficiency: 90,
    description: "Type-safe JavaScript development",
    highlights: ["Types", "Interfaces", "Generics", "Decorators"]
  },
  {
    name: "Python",
    icon: <SiPython className="w-12 h-12" style={{ color: "#3776AB" }} />,
    color: "#3776AB",
    category: "Languages",
    proficiency: 85,
    description: "Backend development and data processing",
    highlights: ["Django", "FastAPI", "Data Science", "Automation"]
  },
  {
    name: "Java",
    icon: <SiOpenjdk className="w-12 h-12" style={{ color: "#ED8B00" }} />,
    color: "#ED8B00",
    category: "Languages",
    proficiency: 80,
    description: "Enterprise application development",
    highlights: ["Spring Boot", "JPA", "Maven", "JUnit"]
  },
  {
    name: "Kotlin",
    icon: <SiKotlin className="w-12 h-12" style={{ color: "#7F52FF" }} />,
    color: "#7F52FF",
    category: "Languages",
    proficiency: 75,
    description: "Modern Android development",
    highlights: ["Coroutines", "Flow", "Android SDK", "Jetpack"]
  },
  {
    name: "React",
    icon: <SiReact className="w-12 h-12" style={{ color: "#61DAFB" }} />,
    color: "#61DAFB",
    category: "Frontend",
    proficiency: 95,
    description: "Building modern user interfaces",
    highlights: ["Hooks", "Context", "Custom Hooks", "Performance"]
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="w-12 h-12 next-logo" />,
    color: "#000000",
    category: "Frontend",
    proficiency: 90,
    description: "Full-stack React framework",
    highlights: ["SSR", "ISR", "API Routes", "Middleware"]
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="w-12 h-12" style={{ color: "#06B6D4" }} />,
    color: "#06B6D4",
    category: "Frontend",
    proficiency: 95,
    description: "Utility-first CSS framework",
    highlights: ["Responsive", "Dark Mode", "Animations", "Custom Plugins"]
  },
  {
    name: "Framer Motion",
    icon: <SiFramer className="w-12 h-12" style={{ color: "#0055FF" }} />,
    color: "#0055FF",
    category: "Frontend",
    proficiency: 85,
    description: "Production-ready animations",
    highlights: ["Gestures", "Variants", "Layout", "Exit Animations"]
  },
  {
    name: "Redux",
    icon: <SiRedux className="w-12 h-12" style={{ color: "#764ABC" }} />,
    color: "#764ABC",
    category: "Frontend",
    proficiency: 90,
    description: "State management for React",
    highlights: ["RTK", "Middleware", "Selectors", "Thunks"]
  },
  {
    name: "Chart.js",
    icon: <SiChartdotjs className="w-12 h-12" style={{ color: "#FF6384" }} />,
    color: "#FF6384",
    category: "Frontend",
    proficiency: 85,
    description: "Interactive data visualization",
    highlights: ["Responsive", "Animations", "Custom Charts", "Plugins"]
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="w-12 h-12" style={{ color: "#339933" }} />,
    color: "#339933",
    category: "Backend",
    proficiency: 90,
    description: "Server-side JavaScript runtime",
    highlights: ["Event Loop", "Streams", "Clustering", "Native Addons"]
  },
  {
    name: "Express.js",
    icon: <SiExpress className="w-12 h-12" style={{ color: "#666666" }} />,
    color: "#666666",
    category: "Backend",
    proficiency: 90,
    description: "Web application framework",
    highlights: ["Routing", "Middleware", "Error Handling", "Security"]
  },
  {
    name: "Firebase",
    icon: <SiFirebase className="w-12 h-12" style={{ color: "#FFCA28" }} />,
    color: "#FFCA28",
    category: "Backend",
    proficiency: 85,
    description: "Backend as a Service platform",
    highlights: ["Auth", "Firestore", "Functions", "Hosting"]
  },
  {
    name: "RESTful APIs",
    icon: <TbApi className="w-12 h-12" style={{ color: "#4CAF50" }} />,
    color: "#4CAF50",
    category: "Backend",
    proficiency: 95,
    description: "API design and development",
    highlights: ["REST", "OpenAPI", "Versioning", "Security"]
  },
  {
    name: "WebSocket",
    icon: <TbWebSocket className="w-12 h-12" style={{ color: "#4CAF50" }} />,
    color: "#4CAF50",
    category: "Backend",
    proficiency: 85,
    description: "Real-time communication",
    highlights: ["Socket.io", "WS", "Events", "Scaling"]
  },
  {
    name: "Prisma",
    icon: <BiDatabase className="w-12 h-12" style={{ color: "#2D3748" }} />,
    color: "#2D3748",
    category: "Database",
    proficiency: 90,
    description: "Next-generation ORM",
    highlights: ["Schema", "Migrations", "Relations", "Type Safety"]
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="w-12 h-12" style={{ color: "#4169E1" }} />,
    color: "#4169E1",
    category: "Database",
    proficiency: 85,
    description: "Advanced relational database",
    highlights: ["JSON", "Indexing", "Triggers", "Functions"]
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="w-12 h-12" style={{ color: "#47A248" }} />,
    color: "#47A248",
    category: "Database",
    proficiency: 85,
    description: "NoSQL document database",
    highlights: ["Aggregation", "Indexing", "Atlas", "Compass"]
  },
  {
    name: "Redis",
    icon: <SiRedis className="w-12 h-12" style={{ color: "#DC382D" }} />,
    color: "#DC382D",
    category: "Database",
    proficiency: 80,
    description: "In-memory data structure store",
    highlights: ["Caching", "Pub/Sub", "Lua", "Clustering"]
  },
  {
    name: "Docker",
    icon: <SiDocker className="w-12 h-12" style={{ color: "#2496ED" }} />,
    color: "#2496ED",
    category: "DevOps",
    proficiency: 85,
    description: "Container platform",
    highlights: ["Compose", "Swarm", "Networks", "Volumes"]
  },
  {
    name: "Git",
    icon: <SiGit className="w-12 h-12" style={{ color: "#F05032" }} />,
    color: "#F05032",
    category: "DevOps",
    proficiency: 95,
    description: "Version control system",
    highlights: ["Branching", "Merging", "Rebasing", "Hooks"]
  },
  {
    name: "Azure",
    icon: <TbBrandAzure className="w-12 h-12" style={{ color: "#0078D4" }} />,
    color: "#0078D4",
    category: "Cloud",
    proficiency: 85,
    description: "Microsoft Azure cloud platform expertise",
    highlights: ["Azure Fundamentals", "IaaS", "PaaS", "SaaS"]
  },
  {
    name: "AWS",
    icon: <SiAmazon className="w-12 h-12" style={{ color: "#FF9900" }} />,
    color: "#FF9900",
    category: "Cloud",
    proficiency: 80,
    description: "Amazon Web Services cloud platform",
    highlights: ["EC2", "S3", "Lambda", "RDS"]
  },
  {
    name: "Incident Management",
    icon: <SiOpsgenie className="w-12 h-12" style={{ color: "#F24C4C" }} />,
    color: "#F24C4C",
    category: "DevOps",
    proficiency: 90,
    description: "ITIL-based incident management",
    highlights: ["Response", "Resolution", "Documentation", "Analysis"]
  },
  {
    name: "FastAPI",
    icon: <SiFastapi className="w-12 h-12" style={{ color: "#009688" }} />,
    color: "#009688",
    category: "Backend",
    proficiency: 85,
    description: "Modern Python web framework",
    highlights: ["Async", "OpenAPI", "Pydantic", "Dependency Injection"]
  },
  {
    name: "Serverless",
    icon: <SiServerless className="w-12 h-12" style={{ color: "#FD5750" }} />,
    color: "#FD5750",
    category: "Backend",
    proficiency: 80,
    description: "Serverless architecture development",
    highlights: ["Lambda", "Functions", "Event-Driven", "Scalability"]
  },
  {
    name: "Azure Monitor",
    icon: <TbChartBar className="w-12 h-12" style={{ color: "#0078D4" }} />,
    color: "#0078D4",
    category: "Monitoring",
    proficiency: 85,
    description: "Cloud monitoring and analytics",
    highlights: ["Metrics", "Logs", "Alerts", "Dashboards"]
  },
  {
    name: "Performance Monitoring",
    icon: <SiDatadog className="w-12 h-12" style={{ color: "#632CA6" }} />,
    color: "#632CA6",
    category: "Monitoring",
    proficiency: 80,
    description: "System performance monitoring",
    highlights: ["Event Viewer", "Counters", "Metrics", "Analysis"]
  },
  {
    name: "PowerShell",
    icon: <SiPowers className="w-12 h-12" style={{ color: "#5391FE" }} />,
    color: "#5391FE",
    category: "Automation",
    proficiency: 85,
    description: "Windows automation and scripting",
    highlights: ["Scripting", "Automation", "Management", "Tasks"]
  },
  {
    name: "Shell Scripting",
    icon: <SiShell className="w-12 h-12" style={{ color: "#4EAA25" }} />,
    color: "#4EAA25",
    category: "Automation",
    proficiency: 85,
    description: "Unix/Linux shell scripting",
    highlights: ["Bash", "Automation", "Tasks", "System Admin"]
  },
  {
    name: "Postman",
    icon: <SiPostman className="w-12 h-12" style={{ color: "#FF6C37" }} />,
    color: "#FF6C37",
    category: "Tools",
    proficiency: 90,
    description: "API development and testing",
    highlights: ["Testing", "Documentation", "Collections", "Automation"]
  },
  {
    name: "Stripe",
    icon: <SiStripe className="w-12 h-12" style={{ color: "#6772E5" }} />,
    color: "#6772E5",
    category: "Tools",
    proficiency: 85,
    description: "Payment processing integration",
    highlights: ["Payments", "Subscriptions", "Webhooks", "API"]
  },
  {
    name: "CI/CD",
    icon: <SiGithubactions className="w-12 h-12" style={{ color: "#2088FF" }} />,
    color: "#2088FF",
    category: "Tools",
    proficiency: 85,
    description: "Continuous Integration and Deployment",
    highlights: ["GitHub Actions", "Pipelines", "Automation", "Deployment"]
  }
];

const SkillOrb = ({ skill, index, isActive, onClick }: { 
  skill: Skill; 
  index: number; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  const { getTextColor } = useThemeStyles();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: isActive ? 1.2 : 1,
      } : { opacity: 0, scale: 0.5 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100
      }}
      onClick={onClick}
      className={`relative cursor-pointer ${isActive ? 'z-10' : 'z-0'}`}
    >
      <motion.div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{ 
          backgroundColor: `${skill.color}20`,
          boxShadow: isActive 
            ? `0 0 30px ${skill.color}80, 0 0 60px ${skill.color}40` 
            : `0 0 15px ${skill.color}40`
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: `0 0 30px ${skill.color}80, 0 0 60px ${skill.color}40`
        }}
      >
        <motion.div
          animate={{ 
            rotate: isActive ? 360 : 0,
            scale: isActive ? 1.2 : 1
          }}
          transition={{ 
            duration: 1.5,
            repeat: isActive ? Infinity : 0,
            ease: "linear"
          }}
        >
          {skill.icon}
        </motion.div>
      </motion.div>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-64 p-4 rounded-lg"
            style={{ 
              backgroundColor: `${skill.color}10`,
              border: `1px solid ${skill.color}30`,
              boxShadow: `0 0 20px ${skill.color}30`
            }}
          >
            <h3 className="text-lg font-bold mb-2" style={{ color: skill.color }}>
              {skill.name}
            </h3>
            <div className="w-full h-2 bg-gray-800/50 rounded-full mb-2">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-sm mb-2" style={{ color: getTextColor('secondary') }}>
              {skill.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {skill.highlights.map((highlight, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="px-2 py-0.5 text-xs rounded-full"
                  style={{ 
                    backgroundColor: `${skill.color}20`,
                    color: skill.color
                  }}
                >
                  {highlight}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillCategory = ({ 
  category, 
  skills, 
  index, 
  activeSkill, 
  setActiveSkill 
}: { 
  category: string; 
  skills: Skill[]; 
  index: number; 
  activeSkill: string | null; 
  setActiveSkill: (skill: string | null) => void;
}) => {
  const { getTextColor } = useThemeStyles();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-16"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="text-2xl font-bold mb-8 flex items-center"
        style={{ color: getTextColor('primary') }}
      >
        <span className="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
          style={{ 
            backgroundColor: skills[0]?.color ? `${skills[0].color}20` : 'rgba(100, 100, 255, 0.2)',
            color: skills[0]?.color || '#6366f1'
          }}
        >
          {category === "Languages" && <FaCode />}
          {category === "Frontend" && <SiReact />}
          {category === "Backend" && <SiNodedotjs />}
          {category === "Database" && <BiDatabase />}
          {category === "DevOps" && <SiDocker />}
          {category === "Cloud" && <SiAmazon />}
          {category === "Monitoring" && <TbChartBar />}
          {category === "Automation" && <SiPowers />}
          {category === "Tools" && <SiPostman />}
        </span>
        {category}
      </motion.h3>
      
      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill, skillIndex) => (
          <SkillOrb
            key={skill.name}
            skill={skill}
            index={skillIndex}
            isActive={activeSkill === skill.name}
            onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
          />
        ))}
      </div>
    </motion.div>
  );
};

const MusicianSection = () => {
  const { getTextColor, getBackgroundColor } = useThemeStyles();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{ background: getBackgroundColor('default') }}
    >
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Musical Notes Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{ 
                color: i % 2 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              {i % 3 === 0 ? '♪' : i % 3 === 1 ? '♫' : '♬'}
            </motion.div>
          ))}
        </div>
        
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,purple,blue,purple)] rounded-full blur-[60px]" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg,blue,purple,blue)] rounded-full blur-[60px]" />
        </motion.div>
      </motion.div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            Beyond Code
          </h2>
          <p className="text-lg" style={{ color: getTextColor('secondary') }}>
            The intersection of technology and creativity
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/church-website.jpg"
                alt="Music Studio"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-6"
              >
                <h3 className="text-2xl font-bold mb-2" style={{ color: getTextColor('primary') }}>
                  Choir Tenor & Musician
                </h3>
                <p className="text-lg" style={{ color: getTextColor('secondary') }}>
                  Applying creative discipline to development
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-lg"
            >
              <Image
                src="/images/ProfilePicture.jpeg"
                alt="Rial Parmar"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold mb-6" style={{ color: getTextColor('primary') }}>
              The Harmony of Code & Creativity
            </h3>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-start space-x-4"
              >
                <div className="p-3 rounded-lg bg-purple-500/20 text-purple-500">
                  <FaMusic className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2" style={{ color: getTextColor('primary') }}>
                    Musical Background
                  </h4>
                  <p className="text-base" style={{ color: getTextColor('secondary') }}>
                    As a choir tenor, I've developed a keen ear for harmony and rhythm, which translates to creating balanced and well-structured code.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-start space-x-4"
              >
                <div className="p-3 rounded-lg bg-blue-500/20 text-blue-500">
                  <FaBrain className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2" style={{ color: getTextColor('primary') }}>
                    Creative Problem Solving
                  </h4>
                  <p className="text-base" style={{ color: getTextColor('secondary') }}>
                    My musical training has enhanced my ability to think creatively and approach problems from multiple angles, leading to innovative solutions.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-start space-x-4"
              >
                <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-500">
                  <FaLightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2" style={{ color: getTextColor('primary') }}>
                    Attention to Detail
                  </h4>
                  <p className="text-base" style={{ color: getTextColor('secondary') }}>
                    Just as a musician must pay attention to every note and timing, I bring this precision to my code, ensuring every detail is considered.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex items-start space-x-4"
              >
                <div className="p-3 rounded-lg bg-pink-500/20 text-pink-500">
                  <FaUsers className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2" style={{ color: getTextColor('primary') }}>
                    Collaborative Mindset
                  </h4>
                  <p className="text-base" style={{ color: getTextColor('secondary') }}>
                    Choir experience has taught me the importance of collaboration and listening, skills that are essential in agile development teams.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const SkillsSection = () => {
  const { getTextColor } = useThemeStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  
  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  
  return (
    <section id="skills" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Technical Skills
          </h2>
          <p className="text-lg" style={{ color: getTextColor('secondary') }}>
            A comprehensive overview of my technical expertise
          </p>
        </motion.div>
        
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <SkillCategory
              key={category}
              category={category}
              skills={skills.filter(skill => skill.category === category)}
              index={categoryIndex}
              activeSkill={activeSkill}
              setActiveSkill={setActiveSkill}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const IntroductionSection = () => {
  const { getTextColor, getBackgroundColor } = useThemeStyles();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen py-20 px-4 relative overflow-hidden flex items-center"
      style={{ background: getBackgroundColor('default') }}
    >
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,purple,blue,purple)] rounded-full blur-[60px]" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg,blue,purple,blue)] rounded-full blur-[60px]" />
        </motion.div>
      </motion.div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: getTextColor('primary') }}>
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Innovative
              </span>{" "}
              Full-Stack Developer
            </h1>
            
            <div className="flex items-center mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mr-4"></div>
              <h2 className="text-2xl font-semibold" style={{ color: getTextColor('secondary') }}>
                Cloud & Performance Optimizer
              </h2>
            </div>
            
            <p className="text-lg mb-8" style={{ color: getTextColor('secondary') }}>
              I combine technical expertise with creative problem-solving to build exceptional digital experiences. My background in both technology and music gives me a unique perspective on creating harmonious, efficient, and user-friendly applications.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-center space-x-2"
              >
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-500">
                  <FaCode className="w-5 h-5" />
                </div>
                <span style={{ color: getTextColor('secondary') }}>Full-Stack Development</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-center space-x-2"
              >
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-500">
                  <FaRocket className="w-5 h-5" />
                </div>
                <span style={{ color: getTextColor('secondary') }}>Performance Optimization</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center space-x-2"
              >
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-500">
                  <FaMusic className="w-5 h-5" />
                </div>
                <span style={{ color: getTextColor('secondary') }}>Musician & Creative Thinker</span>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/ProfilePicture.jpeg"
                alt="Rial Parmar"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-6"
              >
                <h3 className="text-2xl font-bold mb-2" style={{ color: getTextColor('primary') }}>
                  Problem Solver
                </h3>
                <p className="text-lg" style={{ color: getTextColor('secondary') }}>
                  Turning complex challenges into elegant solutions
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-lg"
            >
              <Image
                src="/images/ProfilePicture.jpeg"
                alt="Rial Parmar"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const About = () => {
  return (
    <div id="about" className="min-h-screen">
      <IntroductionSection />
      <SkillsSection />
      <MusicianSection />
    </div>
  );
};

export default About; 