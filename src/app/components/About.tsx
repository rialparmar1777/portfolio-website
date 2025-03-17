'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { 
  SiJavascript, SiTypescript, SiPython, SiOpenjdk, SiKotlin,
  SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiRedux,
  SiChartdotjs, SiNodedotjs, SiExpress, SiFirebase,
  SiPostgresql, SiMongodb, SiRedis, SiDocker, SiGit, SiAmazon, SiVercel
} from 'react-icons/si';
import { TbApi, TbBrandWebflow as TbWebSocket } from 'react-icons/tb';
import { BiData as BiDatabase } from 'react-icons/bi';

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  category: "Languages" | "Frontend" | "Backend" | "Database" | "DevOps";
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
    icon: <SiNextdotjs className="w-12 h-12" style={{ color: "#ffffff" }} />,
    color: "#ffffff",
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
    icon: <SiExpress className="w-12 h-12" style={{ color: "#ffffff" }} />,
    color: "#ffffff",
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
    name: "AWS",
    icon: <SiAmazon className="w-12 h-12" style={{ color: "#FF9900" }} />,
    color: "#FF9900",
    category: "DevOps",
    proficiency: 80,
    description: "Cloud computing platform",
    highlights: ["EC2", "S3", "Lambda", "RDS"]
  },
  {
    name: "Vercel",
    icon: <SiVercel className="w-12 h-12" style={{ color: "#ffffff" }} />,
    color: "#ffffff",
    category: "DevOps",
    proficiency: 90,
    description: "Frontend deployment platform",
    highlights: ["Edge", "Analytics", "CI/CD", "Serverless"]
  }
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setRotation({
          x: Math.sin(Date.now() / 2000) * 3,
          y: Math.cos(Date.now() / 2000) * 3,
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 50,
        transition: { duration: 0.8, delay: index * 0.1, ease: "easeOut" }
      }}
    >
      <motion.div
        className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 p-6 overflow-hidden cursor-pointer transform-gpu"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale3d(1.05, 1.05, 1.05)`
            : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
          transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
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
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: skill.color,
                opacity: 0.3,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Background Gradient */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, ${skill.color}20, transparent 70%)`,
            transition: 'opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-between">
          <motion.div 
            className="mb-4"
            animate={{
              rotateZ: isHovered ? [0, -5, 5, 0] : 0,
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {skill.icon}
          </motion.div>
          <div className="text-center">
            <motion.h3 
              className="text-xl font-semibold mb-2 text-white"
              animate={{
                color: isHovered ? skill.color : '#ffffff',
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className="mb-2">{skill.description}</p>
              {skill.highlights && (
                <div className="flex flex-wrap gap-1 justify-center">
                  {skill.highlights.map((highlight, i) => (
                    <motion.span
                      key={i}
                      className="px-2 py-1 rounded-full text-xs"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      style={{ 
                        backgroundColor: `${skill.color}20`,
                        color: skill.color 
                      }}
                    >
                      {highlight}
                    </motion.span>
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
                transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
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
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
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
                  `0 0 20px ${skill.color}20`,
                  `0 0 30px ${skill.color}30`,
                  `0 0 20px ${skill.color}20`
                ]
              : `0 0 0px transparent`
          }}
          transition={{ 
            duration: 2, 
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

  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const springY = useSpring(y, { 
    stiffness: 50, 
    damping: 20,
    mass: 1
  });

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
            className="absolute w-1 h-1 rounded-full bg-purple-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Introduction Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative"
          >
            {/* Glowing Effect behind title */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-full transform scale-150" />
            
            <h1 className="relative text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient mb-6">
              Full-Stack Developer
            </h1>
            <motion.div 
              className="h-1 w-40 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-8"
              animate={{
                width: ["10%", "40%", "10%"],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Enhanced Role Tags */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {['Problem Solver', 'Tech Enthusiast', 'Creative Developer'].map((tag, index) => (
              <motion.span
                key={tag}
                className="px-6 py-2 rounded-full text-lg font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm relative group overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <span className="relative z-10">{tag}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* Enhanced Main Introduction */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="prose prose-lg prose-invert">
                <motion.p 
                  className="text-xl text-gray-300 leading-relaxed relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="absolute -left-6 top-0 text-purple-400 text-2xl">❝</span>
                  Passionate about building high-performance web applications, I thrive on leveraging modern technologies to develop scalable, efficient, and user-friendly solutions. My goal is to craft experiences that are not only functional but also intuitive and engaging.
                  <span className="absolute -right-6 bottom-0 text-purple-400 text-2xl">❞</span>
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 rounded-xl backdrop-blur-sm border border-white/10 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated border gradient */}
                <motion.div
                  className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="relative">
                  <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 mb-4 flex items-center gap-3">
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
                      }}
                    >
                      🎵
                    </motion.span>
                    Beyond Code
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Outside of tech, I'm a versatile musician & active choir member. Music enhances my creativity, precision, and teamwork—qualities that seamlessly translate into my development work.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative"
        >
          {/* Glowing Effect behind title */}
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-full transform scale-150" />
          
          <h2 className="relative text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient mb-6">
            Education
          </h2>
          <motion.div 
            className="h-1 w-40 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-8"
            animate={{
              width: ["10%", "40%", "10%"],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className="space-y-8 mb-32">
          {/* Diploma */}
          <div className="relative pl-8 border-l-2 border-purple-500/20 group">
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-purple-500/20 group-hover:bg-purple-500/40 transition-colors duration-300" />
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                Diploma in Computer Programming
              </h4>
              <p className="text-gray-400">Conestoga College</p>
              <div className="flex items-center gap-2 text-sm text-purple-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Graduated August - 2024
              </div>
            </div>
          </div>

          {/* Bachelor's */}
          <div className="relative pl-8 border-l-2 border-blue-500/20 group">
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500/20 group-hover:bg-blue-500/40 transition-colors duration-300" />
            <div className="space-y-2">
              <h4 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                Bachelor of Computer Applications
              </h4>
              <p className="text-gray-400">Manipal Institute of Technology</p>
            </div>
          </div>
        </div>

        {/* Enhanced Skills Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative"
        >
          {/* Glowing Effect behind title */}
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-full transform scale-150" />
          
          <h2 className="relative text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient mb-6">
            Skills & Expertise
          </h2>
          <motion.div 
            className="h-1 w-40 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-8"
            animate={{
              width: ["10%", "40%", "10%"],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto relative">
            Mastering the art of full-stack development with a passion for creating 
            seamless, innovative digital experiences.
          </p>
        </motion.div>

        {/* Enhanced Skills Grid by Category */}
        <div className="space-y-16">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <div key={category} className="space-y-8">
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categorySkills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keep existing Custom Animations style */}
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