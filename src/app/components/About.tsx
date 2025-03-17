'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { 
  SiJavascript, SiTypescript, SiPython, SiOpenjdk, SiKotlin,
  SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiRedux,
  SiChartdotjs, SiNodedotjs, SiExpress, SiFirebase,
  SiPostgresql, SiMongodb, SiRedis,
  SiDocker, SiGit, SiAmazon, SiVercel
} from 'react-icons/si';
import { TbApi, TbBrandWebflow as TbWebSocket, TbBrandWindows as TbSqlServer } from 'react-icons/tb';
import { BiData as BiDatabase } from 'react-icons/bi';
import { VscDatabase } from 'react-icons/vsc';

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  category: string;
  proficiency: number;
  description: string;
  highlights?: string[];
}

const skills: Skill[] = [
  // Programming Languages
  { 
    name: 'JavaScript',
    icon: <SiJavascript className="w-12 h-12 text-gray-400 group-hover:text-[#F7DF1E] transition-colors duration-300" />,
    color: '#F7DF1E',
    category: 'language',
    proficiency: 95,
    description: 'Modern ES6+, Async/Await, Promises',
    highlights: ['ES6+', 'TypeScript', 'Node.js']
  },
  { 
    name: 'TypeScript',
    icon: <SiTypescript className="w-12 h-12 text-gray-400 group-hover:text-[#3178C6] transition-colors duration-300" />,
    color: '#3178C6',
    category: 'language',
    proficiency: 90,
    description: 'Type Safety, Interfaces, Generics',
    highlights: ['Type Safety', 'OOP', 'Generics']
  },
  { 
    name: 'Python',
    icon: <SiPython className="w-12 h-12 text-gray-400 group-hover:text-[#3776AB] transition-colors duration-300" />,
    color: '#3776AB',
    category: 'language',
    proficiency: 85,
    description: 'Django, FastAPI, Data Analysis',
    highlights: ['Django', 'FastAPI', 'NumPy']
  },
  { 
    name: 'Java',
    icon: <SiOpenjdk className="w-12 h-12 text-gray-400 group-hover:text-[#007396] transition-colors duration-300" />,
    color: '#007396',
    category: 'language',
    proficiency: 88,
    description: 'Spring Boot, Microservices',
    highlights: ['Spring Boot', 'JPA', 'Microservices']
  },
  { 
    name: 'Kotlin',
    icon: <SiKotlin className="w-12 h-12 text-gray-400 group-hover:text-[#7F52FF] transition-colors duration-300" />,
    color: '#7F52FF',
    category: 'language',
    proficiency: 82,
    description: 'Android Development, Server-side',
    highlights: ['Android', 'Coroutines', 'Flow']
  },
  
  // Frontend Development
  { 
    name: 'React',
    icon: <SiReact className="w-12 h-12 text-gray-400 group-hover:text-[#61DAFB] transition-colors duration-300" />,
    color: '#61DAFB',
    category: 'frontend',
    proficiency: 95,
    description: 'Modern React with Hooks & Context',
    highlights: ['Hooks', 'Context', 'Redux']
  },
  { 
    name: 'Next.js',
    icon: <SiNextdotjs className="w-12 h-12 text-gray-400 group-hover:text-white transition-colors duration-300" />,
    color: '#000000',
    category: 'frontend',
    proficiency: 92,
    description: 'Full-stack React Framework',
    highlights: ['SSR', 'API Routes', 'Dynamic Pages']
  },
  { 
    name: 'Tailwind CSS',
    icon: <SiTailwindcss className="w-12 h-12 text-gray-400 group-hover:text-[#38B2AC] transition-colors duration-300" />,
    color: '#38B2AC',
    category: 'frontend',
    proficiency: 90,
    description: 'Utility-first CSS Framework',
    highlights: ['Responsive', 'Custom Themes', 'JIT']
  },
  { 
    name: 'Framer Motion',
    icon: <SiFramer className="w-12 h-12 text-gray-400 group-hover:text-[#FF4F8B] transition-colors duration-300" />,
    color: '#FF4F8B',
    category: 'frontend',
    proficiency: 85,
    description: 'Production-ready Animations',
    highlights: ['Animations', 'Gestures', 'Variants']
  },
  { 
    name: 'Redux',
    icon: <SiRedux className="w-12 h-12 text-gray-400 group-hover:text-[#764ABC] transition-colors duration-300" />,
    color: '#764ABC',
    category: 'frontend',
    proficiency: 88,
    description: 'State Management Solution',
    highlights: ['Redux Toolkit', 'RTK Query', 'Middleware']
  },
  { 
    name: 'Chart.js',
    icon: <SiChartdotjs className="w-12 h-12 text-gray-400 group-hover:text-[#FF6384] transition-colors duration-300" />,
    color: '#FF6384',
    category: 'frontend',
    proficiency: 85,
    description: 'Interactive Data Visualization',
    highlights: ['Responsive', 'Interactive', 'Customizable']
  },
  
  // Backend Development
  { 
    name: 'Node.js',
    icon: <SiNodedotjs className="w-12 h-12 text-gray-400 group-hover:text-[#339933] transition-colors duration-300" />,
    color: '#339933',
    category: 'backend',
    proficiency: 90,
    description: 'Server-side JavaScript Runtime',
    highlights: ['Express', 'REST APIs', 'WebSocket']
  },
  { 
    name: 'Express.js',
    icon: <SiExpress className="w-12 h-12 text-gray-400 group-hover:text-white transition-colors duration-300" />,
    color: '#000000',
    category: 'backend',
    proficiency: 88,
    description: 'Web Application Framework',
    highlights: ['Middleware', 'Routing', 'Auth']
  },
  { 
    name: 'Firebase',
    icon: <SiFirebase className="w-12 h-12 text-gray-400 group-hover:text-[#FFCA28] transition-colors duration-300" />,
    color: '#FFCA28',
    category: 'backend',
    proficiency: 85,
    description: 'Backend as a Service (BaaS)',
    highlights: ['Auth', 'Firestore', 'Functions']
  },
  { 
    name: 'RESTful APIs',
    icon: <TbApi className="w-12 h-12 text-gray-400 group-hover:text-[#FF4F8B] transition-colors duration-300" />,
    color: '#FF4F8B',
    category: 'backend',
    proficiency: 92,
    description: 'API Design & Implementation',
    highlights: ['REST', 'GraphQL', 'WebSocket']
  },
  { 
    name: 'WebSocket',
    icon: <TbWebSocket className="w-12 h-12 text-gray-400 group-hover:text-[#4353FF] transition-colors duration-300" />,
    color: '#4353FF',
    category: 'backend',
    proficiency: 85,
    description: 'Real-time Communication',
    highlights: ['Socket.io', 'Real-time', 'Events']
  },
  { 
    name: 'Prisma',
    icon: <BiDatabase className="w-12 h-12 text-gray-400 group-hover:text-[#2D3748] transition-colors duration-300" />,
    color: '#2D3748',
    category: 'backend',
    proficiency: 88,
    description: 'Next-gen ORM for Node.js & TypeScript',
    highlights: ['ORM', 'Migrations', 'Type-safe']
  },
  
  // Databases & Storage
  { 
    name: 'PostgreSQL',
    icon: <SiPostgresql className="w-12 h-12 text-gray-400 group-hover:text-[#336791] transition-colors duration-300" />,
    color: '#336791',
    category: 'database',
    proficiency: 88,
    description: 'Advanced Open Source Database',
    highlights: ['Complex Queries', 'Performance', 'ACID']
  },
  { 
    name: 'MongoDB',
    icon: <SiMongodb className="w-12 h-12 text-gray-400 group-hover:text-[#47A248] transition-colors duration-300" />,
    color: '#47A248',
    category: 'database',
    proficiency: 85,
    description: 'NoSQL Document Database',
    highlights: ['Aggregation', 'Indexing', 'Atlas']
  },
  { 
    name: 'SQL Server',
    icon: <TbSqlServer className="w-12 h-12 text-gray-400 group-hover:text-[#CC2927] transition-colors duration-300" />,
    color: '#CC2927',
    category: 'database',
    proficiency: 86,
    description: 'Enterprise Database Solution',
    highlights: ['T-SQL', 'Stored Procedures', 'SSMS']
  },
  { 
    name: 'Redis',
    icon: <SiRedis className="w-12 h-12 text-gray-400 group-hover:text-[#DC382D] transition-colors duration-300" />,
    color: '#DC382D',
    category: 'database',
    proficiency: 82,
    description: 'In-memory Data Store',
    highlights: ['Caching', 'Pub/Sub', 'Sessions']
  },
  
  // DevOps & Tools
  { 
    name: 'Docker',
    icon: <SiDocker className="w-12 h-12 text-gray-400 group-hover:text-[#2496ED] transition-colors duration-300" />,
    color: '#2496ED',
    category: 'devops',
    proficiency: 85,
    description: 'Container Platform',
    highlights: ['Containers', 'Compose', 'Swarm']
  },
  { 
    name: 'Git',
    icon: <SiGit className="w-12 h-12 text-gray-400 group-hover:text-[#F05032] transition-colors duration-300" />,
    color: '#F05032',
    category: 'devops',
    proficiency: 90,
    description: 'Version Control System',
    highlights: ['GitHub', 'GitFlow', 'CI/CD']
  },
  { 
    name: 'AWS',
    icon: <SiAmazon className="w-12 h-12 text-gray-400 group-hover:text-[#FF9900] transition-colors duration-300" />,
    color: '#FF9900',
    category: 'devops',
    proficiency: 84,
    description: 'Cloud Computing Platform',
    highlights: ['EC2', 'S3', 'Lambda']
  },
  { 
    name: 'Vercel',
    icon: <SiVercel className="w-12 h-12 text-gray-400 group-hover:text-white transition-colors duration-300" />,
    color: '#000000',
    category: 'devops',
    proficiency: 88,
    description: 'Frontend Cloud Platform',
    highlights: ['Deployment', 'Edge Functions', 'Analytics']
  }
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setRotation({
          x: Math.sin(Date.now() / 1000) * 5,
          y: Math.cos(Date.now() / 1000) * 5,
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 25,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 25,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 50,
        transition: { duration: 0.5, delay: index * 0.1 }
      }}
    >
      <motion.div
        className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 p-6 overflow-hidden cursor-pointer transform-gpu"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale3d(1.1, 1.1, 1.1)`
            : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
          transition: 'all 0.4s ease',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({ x: 0, y: 0 });
        }}
      >
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)',
                transform: 'translate3d(0, 0, 0)',
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Background Gradient */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, ${skill.color}20, transparent 70%)`
          }}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-between">
          <motion.div 
            className="text-5xl mb-4"
            animate={{
              rotateZ: isHovered ? [0, -10, 10, 0] : 0,
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {skill.icon}
          </motion.div>
          <div className="text-center">
            <motion.h3 
              className="text-xl font-semibold mb-2 text-white"
              animate={{
                color: isHovered ? skill.color : '#ffffff',
              }}
              transition={{ duration: 0.3 }}
            >
              {skill.name}
            </motion.h3>
            
            {/* Description and Highlights */}
            <motion.div
              className="text-sm text-white/60 mb-3 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                height: isHovered ? 'auto' : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-2">{skill.description}</p>
              {skill.highlights && (
                <div className="flex flex-wrap gap-1 justify-center">
                  {skill.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: `${skill.color}20`,
                        color: skill.color 
                      }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Proficiency Bar */}
            <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: '0%' }}
                animate={{ 
                  width: isInView ? `${skill.proficiency}%` : '0%',
                }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
              <motion.div
                className="absolute top-0 left-0 h-full w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${skill.color}50, transparent)`,
                }}
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
            <motion.p 
              className="text-sm mt-2"
              style={{ color: skill.color }}
            >
              {skill.proficiency}%
            </motion.p>
          </div>
        </div>

        {/* Hover Effects */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered 
              ? [
                  `0 0 20px ${skill.color}30`,
                  `0 0 30px ${skill.color}40`,
                  `0 0 20px ${skill.color}30`
                ]
              : `0 0 0px transparent`
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section className="min-h-screen py-32 relative overflow-hidden" ref={containerRef}>
      {/* Enhanced Animated Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: springY }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/10 to-blue-500/10" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center'
        }} />
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
              transform: 'translate3d(0, 0, 0)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Enhanced Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Introduction Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative"
          >
            {/* Enhanced Title with 3D Effect */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-full transform scale-150"
                animate={{
                  scale: [1.4, 1.6, 1.4],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <h1 className="relative text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient mb-6 transform hover:scale-105 transition-transform duration-300">
                Full-Stack Developer
              </h1>
            </div>

            {/* Animated Underline */}
            <motion.div 
              className="h-1 w-40 mx-auto rounded-full overflow-hidden mb-8"
              style={{
                background: 'linear-gradient(90deg, #9333EA, #3B82F6, #9333EA)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '200% 0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Enhanced Grid Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Introduction Column */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="prose prose-lg prose-invert">
                <motion.p 
                  className="text-xl text-gray-300 leading-relaxed relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.span 
                    className="absolute -left-6 top-0 text-purple-400 text-2xl"
                    animate={{
                      y: [0, -5, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  >
                    ❝
                  </motion.span>
                  Passionate about building high-performance web applications, I thrive on leveraging modern technologies to develop scalable, efficient, and user-friendly solutions. My goal is to craft experiences that are not only functional but also intuitive and engaging.
                  <motion.span 
                    className="absolute -right-6 bottom-0 text-purple-400 text-2xl"
                    animate={{
                      y: [0, 5, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  >
                    ❞
                  </motion.span>
                </motion.p>
              </div>
            </motion.div>

            {/* Beyond Code Section */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 rounded-xl backdrop-blur-sm border border-white/10 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.5), rgba(59, 130, 246, 0.5))',
                  }}
                />
                <div className="relative">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                    <motion.span 
                      className="text-3xl"
                      animate={{
                        rotate: [-10, 10, -10],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 1
                      }}
                    >
                      🎵
                    </motion.span>
                    <span className="bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">
                      Beyond Code
                    </span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Outside of tech, I'm a versatile musician & active choir member. Music enhances my creativity, precision, and teamwork—qualities that seamlessly translate into my development work.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20 relative"
        >
          <motion.div
            className="absolute inset-0 blur-3xl"
            style={{
              background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1
            }}
          />
          
          <h2 className="relative text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient mb-6">
            Skills & Expertise
          </h2>
          
          <motion.div 
            className="h-1 w-40 mx-auto rounded-full overflow-hidden mb-8"
            style={{
              background: 'linear-gradient(90deg, #9333EA, #3B82F6, #9333EA)',
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '200% 0%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1
            }}
          />
          
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto relative">
            Mastering the art of full-stack development with a passion for creating 
            seamless, innovative digital experiences.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-16">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <div key={category} className="space-y-8">
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 capitalize flex items-center gap-4"
              >
                <span>{category === 'language' ? 'Programming Languages' : category}</span>
                <motion.div 
                  className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categorySkills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default About;