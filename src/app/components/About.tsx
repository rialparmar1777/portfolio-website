'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
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
import { FaGraduationCap, FaCode } from 'react-icons/fa';

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

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isHovered && !isMobile) {
      const interval = setInterval(() => {
        setRotation({
          x: Math.sin(Date.now() / 3000) * 2,
          y: Math.cos(Date.now() / 3000) * 2,
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHovered, isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 30,
        transition: { duration: 0.4, delay: index * 0.03, ease: [0.23, 1, 0.32, 1] }
      }}
    >
      {/* Enhanced Outer Glow */}
      <motion.div
        className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          background: [
            `radial-gradient(circle at 50% 50%, ${skill.color}20, transparent 70%)`,
            `radial-gradient(circle at 50% 0%, ${skill.color}20, transparent 70%)`,
            `radial-gradient(circle at 50% 100%, ${skill.color}20, transparent 70%)`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 p-6 overflow-hidden cursor-pointer transform-gpu"
        style={{
          transform: isMobile 
            ? isHovered 
              ? 'scale3d(1.02, 1.02, 1.02)'
              : 'scale3d(1, 1, 1)'
            : isHovered
              ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale3d(1.05, 1.05, 1.05)`
              : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={() => setShowDetails(!showDetails)}
      >
        {/* Enhanced Animated Border */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl"
          style={{
            background: `linear-gradient(90deg, transparent, ${skill.color}40, transparent)`,
          }}
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Enhanced Background Effects */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, ${skill.color}20, transparent 50%),
              linear-gradient(45deg, ${skill.color}10, transparent 60%)
            `,
            transition: 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        />

        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: skill.color,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)',
              }}
              animate={{
                y: [0, -30, 0],
                x: [-20, 20, -20],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col items-center justify-between">
          {/* Enhanced Icon Animation */}
          <motion.div 
            className="mb-4 relative"
            animate={{
              rotateZ: isHovered ? [0, -5, 5, 0] : 0,
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute -inset-4 rounded-full"
              style={{
                background: `radial-gradient(circle at center, ${skill.color}30, transparent)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {skill.icon}
          </motion.div>

          {/* Enhanced Content Section */}
          <div className="text-center w-full">
            <motion.h3 
              className="text-xl font-semibold mb-2"
              animate={{
                color: isHovered ? skill.color : '#ffffff',
              }}
              transition={{ duration: 0.3 }}
            >
              {skill.name}
            </motion.h3>

            {/* Enhanced Description */}
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: showDetails ? 'auto' : 0,
                opacity: showDetails ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm text-white/70 mb-3">{skill.description}</p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {skill.highlights.map((highlight, i) => (
                  <motion.span
                    key={highlight}
                    className="px-2 py-1 rounded-full text-xs"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    style={{ 
                      backgroundColor: `${skill.color}15`,
                      color: skill.color,
                      border: `1px solid ${skill.color}30`,
                    }}
                  >
                    {highlight}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Progress Bar */}
            <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: '0%' }}
                animate={{ width: isInView ? `${skill.proficiency}%` : '0%' }}
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

            {/* Enhanced Proficiency Display */}
            <motion.div 
              className="relative mt-2"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <span 
                className="text-sm font-medium"
                style={{ color: skill.color }}
              >
                {skill.proficiency}%
              </span>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Card Effects */}
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

const IntroTag = ({ text, index }: { text: string; index: number }) => (
  <motion.span
    className="px-6 py-2.5 rounded-full text-lg font-medium relative overflow-hidden group"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ scale: 1.05 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10"
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
    <span className="relative z-10 bg-gradient-to-r from-white to-purple-100 text-transparent bg-clip-text">
      {text}
    </span>
  </motion.span>
);

const IntroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePosition({ x, y });
  };

  return (
    <div className="mb-16 sm:mb-32 relative" onMouseMove={handleMouseMove}>
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Dynamic Grid Lines - Reduced for mobile */}
          <div className="absolute inset-0" style={{ transform: "translateZ(-50px)" }}>
            {[...Array(isMobile ? 10 : 20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
                style={{ top: `${i * (isMobile ? 10 : 5)}%` }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scaleX: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3 + i % 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              />
            ))}
            {[...Array(isMobile ? 10 : 20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
                style={{ left: `${i * (isMobile ? 10 : 5)}%` }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scaleY: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3 + i % 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Floating Orbs - Reduced for mobile */}
          {[...Array(isMobile ? 4 : 8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${isMobile ? 10 + i * 5 : 20 + i * 10}px`,
                height: `${isMobile ? 10 + i * 5 : 20 + i * 10}px`,
                background: `radial-gradient(circle at center, ${i % 2 ? '#A855F7' : '#3B82F6'}15, transparent)`,
                top: `${20 + (i * (isMobile ? 20 : 10))}%`,
                left: `${10 + (i * (isMobile ? 25 : 15))}%`,
                filter: "blur(8px)",
                transform: "translateZ(-30px)",
              }}
              animate={{
                y: [-(10 + i * 2), (10 + i * 2), -(10 + i * 2)],
                x: [-(5 + i * 2), (5 + i * 2), -(5 + i * 2)],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Enhanced Title Section */}
        <motion.div
          className="text-center relative"
          style={{
            transform: !isMobile ? `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)` : 'none',
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* Glowing Rings - Adjusted for mobile */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{
                  width: `${isMobile ? 200 + i * 50 : 400 + i * 100}px`,
                  height: `${isMobile ? 200 + i * 50 : 400 + i * 100}px`,
                  borderColor: i % 2 ? '#A855F7' : '#3B82F6',
                  opacity: 0.1,
                  left: `${isMobile ? -100 - i * 25 : -200 - i * 50}px`,
                  top: `${isMobile ? -100 - i * 25 : -200 - i * 50}px`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Enhanced Title - Adjusted for mobile */}
          <div className="relative mb-4 sm:mb-8">
            <motion.h1 
              className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="relative inline-block">
                <motion.span
                  className="block bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 text-transparent bg-clip-text"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Full-Stack
                </motion.span>
                <motion.div
                  className="absolute -inset-2 bg-purple-500/20 blur-xl rounded-full"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <div className="relative inline-block mt-1 sm:mt-2">
                <motion.span
                  className="block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Developer
                </motion.span>
                <motion.div
                  className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.h1>
          </div>

          {/* Enhanced Tags - Adjusted for mobile */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {['Problem Solver', 'Tech Enthusiast', 'Creative Developer'].map((tag, index) => (
              <motion.div
                key={tag}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Glowing Background */}
                <motion.div
                  className="absolute -inset-2 rounded-lg bg-gradient-to-r from-purple-600/50 via-blue-600/50 to-purple-600/50 blur-lg group-hover:blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Tag Content */}
                <div className="relative px-4 sm:px-8 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-xl border border-white/10">
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  <span className="relative z-10 text-base sm:text-xl font-medium bg-gradient-to-r from-white to-purple-200 text-transparent bg-clip-text">
                    {tag}
                  </span>
                </div>

                {/* Floating Particles - Reduced for mobile */}
                {[...Array(isMobile ? 2 : 3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-purple-400"
                    style={{
                      top: `${50 + (i * 20)}%`,
                      left: `${20 + (i * 30)}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      x: [-5, 5, -5],
                      opacity: [0, 0.8, 0],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Content Grid - Adjusted for mobile */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-start relative">
          {/* Quote Section */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl border border-white/10 overflow-hidden">
              {/* Enhanced Border Animation */}
              <motion.div
                className="absolute -inset-[1px] rounded-2xl"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2), transparent)`,
                }}
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Quote Content */}
              <div className="relative">
                <motion.span
                  className="absolute -left-4 sm:-left-6 -top-4 sm:-top-6 text-4xl sm:text-6xl text-purple-400 font-serif"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ❝
                </motion.span>
                <div className="space-y-3 sm:space-y-4 text-base sm:text-xl text-gray-300 leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Passionate about building high-performance web applications, I thrive on leveraging modern technologies to develop scalable, efficient, and user-friendly solutions.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    My goal is to craft experiences that are not only functional but also intuitive and engaging.
                  </motion.p>
                </div>
                <motion.span
                  className="absolute -right-4 sm:-right-6 -bottom-4 sm:-bottom-6 text-4xl sm:text-6xl text-purple-400 font-serif"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ❞
                </motion.span>
              </div>

              {/* Enhanced Floating Elements - Reduced for mobile */}
              {[...Array(isMobile ? 3 : 6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 15}%`,
                    background: `radial-gradient(circle at center, ${i % 2 ? '#A855F7' : '#3B82F6'}40, transparent)`,
                    borderRadius: '50%',
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Beyond Code Section */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl border border-white/10 overflow-hidden">
              {/* Enhanced Border Animation */}
              <motion.div
                className="absolute -inset-[1px] rounded-2xl"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2), transparent)`,
                }}
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Section Header */}
              <motion.div
                className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="relative"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 0.8, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="text-3xl sm:text-5xl">🎵</span>
                  <motion.div
                    className="absolute -inset-4 rounded-full bg-purple-500/20 blur-xl"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 text-transparent bg-clip-text animate-gradient">
                  Beyond Code
                </h3>
              </motion.div>

              {/* Content */}
              <div className="space-y-4 sm:space-y-6">
                <motion.p
                  className="text-base sm:text-xl text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Outside of tech, I'm a versatile musician & active choir member.
                </motion.p>
                <motion.p
                  className="text-base sm:text-xl text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Music enhances my creativity, precision, and teamwork—qualities that seamlessly translate into my development work.
                </motion.p>

                {/* Enhanced Skill Tags */}
                <motion.div
                  className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {['Creativity', 'Precision', 'Teamwork'].map((skill, i) => (
                    <motion.div
                      key={skill}
                      className="relative group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <motion.div
                        className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-purple-600/30 blur-lg group-hover:blur-xl"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div className="relative px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                        <span className="text-sm sm:text-lg bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">
                          {skill}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Enhanced Floating Music Notes - Reduced for mobile */}
              {[...Array(isMobile ? 3 : 6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl sm:text-3xl"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 15}%`,
                    color: i % 2 ? '#A855F7' : '#3B82F6',
                    opacity: 0.3,
                  }}
                  animate={{
                    y: [-30, 30, -30],
                    x: [-15, 15, -15],
                    rotate: [0, 10, -10, 0],
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                >
                  {i % 2 ? '♪' : '♫'}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const EducationTimeline = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative py-8 sm:py-16">
      {/* Central Timeline Line with Enhanced Gradient */}
      <div className={`absolute ${isMobile ? 'left-4' : 'left-1/2'} top-0 bottom-0 w-[2px] transform ${isMobile ? '' : '-translate-x-1/2'}`}>
        {/* Solid line background */}
        <div className="absolute inset-0 bg-white/20" />
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Decorative dots with connecting lines */}
        {[...Array(10)].map((_, i) => (
          <React.Fragment key={i}>
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full bg-white/50"
              style={{ top: `${i * 10}%`, left: isMobile ? '-3px' : '-3px' }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
            {/* Horizontal connecting line */}
            <motion.div
              className="absolute h-[1px] bg-gradient-to-r from-white/20 to-transparent"
              style={{ 
                top: `${i * 10}%`,
                left: isMobile ? '0' : (i % 2 === 0 ? '0' : 'auto'),
                right: isMobile ? 'auto' : (i % 2 === 0 ? 'auto' : '0'),
                width: isMobile ? '50px' : '100px'
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            />
          </React.Fragment>
        ))}
      </div>

      {[
        {
          title: "Diploma in Computer Programming",
          institution: "Conestoga College",
          date: "Graduated August - 2024",
          description: "Advanced programming concepts, full-stack development, and modern software practices.",
          icon: <FaGraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
          color: "purple",
          skills: ["Full-Stack Development", "Database Design", "Cloud Computing"]
        },
        {
          title: "Bachelor of Computer Applications",
          institution: "Manipal Institute of Technology",
          description: "Foundation in computer science, algorithms, and software engineering",
          icon: <FaCode className="w-6 h-6 sm:w-8 sm:h-8" />,
          color: "blue",
          skills: ["Computer Science", "Data Structures", "Software Engineering"]
        }
      ].map((education, index) => (
        <motion.div
          key={education.title}
          className={`relative flex items-center ${isMobile ? 'ml-12' : (index % 2 === 0 ? 'justify-end' : '')} mb-12 sm:mb-20`}
          initial={{ opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? 50 : -50) }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          {/* Content Card */}
          <div className={`${isMobile ? 'w-full' : `w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}`}>
            <motion.div
              className="relative p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl border border-white/10 overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Border */}
              <motion.div
                className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Connecting Lines from Corners to Timeline */}
              <motion.div
                className={`absolute top-1/2 ${isMobile ? 'left-0' : (index % 2 === 0 ? 'left-0' : 'right-0')} w-8 h-[2px]`}
                style={{
                  background: `linear-gradient(${isMobile ? 'to right' : (index % 2 === 0 ? 'to left' : 'to right')}, ${education.color === 'purple' ? '#A855F7' : '#3B82F6'}, transparent)`,
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />

              {/* Decorative Corner Accents with Connecting Lines */}
              <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8">
                <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-purple-500/30 rounded-tl-xl" />
                <motion.div
                  className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-purple-500/50"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8">
                <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-purple-500/30 rounded-tr-xl" />
                <motion.div
                  className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-purple-500/50"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </div>
              <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8">
                <div className="absolute bottom-0 left-0 w-full h-full border-b-2 border-l-2 border-purple-500/30 rounded-bl-xl" />
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-full border-b-2 border-l-2 border-purple-500/50"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8">
                <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-purple-500/30 rounded-br-xl" />
                <motion.div
                  className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-purple-500/50"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </div>

              <div className="relative">
                {/* Content */}
                <div className={`flex items-center gap-3 mb-4 ${isMobile ? '' : (index % 2 === 0 ? 'flex-row-reverse' : '')}`}>
                  <div className={`text-${education.color}-400 bg-${education.color}-500/10 p-2 sm:p-3 rounded-xl relative group-hover:scale-110 transition-transform duration-300`}>
                    {education.icon}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-white/20"
                      animate={{
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                      {education.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400">{education.institution}</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-300 mb-2">{education.description}</p>

                {education.date && (
                  <div className="relative inline-block">
                    <motion.p 
                      className="text-xs sm:text-sm text-purple-400 mb-4 px-2 sm:px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      {education.date}
                    </motion.p>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-purple-500/5"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.2, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                )}

                <div className={`flex flex-wrap gap-2 ${isMobile ? 'justify-start' : (index % 2 === 0 ? 'justify-end' : 'justify-start')}`}>
                  {education.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-${education.color}-500/10 text-${education.color}-400 border border-${education.color}-500/20`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline Node with Enhanced Design and Connecting Lines */}
          <div className={`absolute ${isMobile ? 'left-4' : 'left-1/2'} -translate-x-1/2 flex items-center justify-center`}>
            {/* Connecting line to content */}
            <motion.div
              className={`absolute w-12 sm:w-24 h-[2px] ${isMobile ? '-right-12' : (index % 2 === 0 ? '-right-24' : '-left-24')}`}
              style={{
                background: `linear-gradient(${isMobile ? 'to right' : (index % 2 === 0 ? 'to right' : 'to left')}, ${education.color === 'purple' ? '#A855F7' : '#3B82F6'}, transparent)`,
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />

            <motion.div
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-${education.color}-500 relative z-10`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
            >
              {/* Pulsing effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
            
            {/* Outer rings with connecting lines */}
            {[1, 2].map((ring) => (
              <motion.div
                key={ring}
                className={`absolute w-${ring * 4} h-${ring * 4} sm:w-${ring * 6} sm:h-${ring * 6} rounded-full border-2 border-${education.color}-500/50`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * ring }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const SkillCluster = ({ category, skills, isActive, onHover }: { 
  category: string; 
  skills: Skill[]; 
  isActive: boolean;
  onHover: (active: boolean) => void;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const clusterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(clusterRef, { once: true, margin: "-50px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={clusterRef}
      className="relative group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.8,
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHover(false);
      }}
    >
      {/* Cluster Background */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10"
        style={{
          transform: isHovered ? `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)` : 'none',
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Animated Border */}
      <motion.div
        className="absolute -inset-[1px] rounded-3xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${skills[0]?.color || '#A855F7'}40, transparent)`,
        }}
        animate={{
          x: ['-200%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="relative p-6">
        {/* Category Header */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className={`text-${skills[0]?.color || 'purple'}-400 bg-${skills[0]?.color || 'purple'}-500/10 p-2 rounded-xl`}>
            {skills[0]?.icon}
          </div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
            {category}
          </h3>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="relative group/skill"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
              }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative p-3 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                {/* Skill Icon */}
                <div className="flex items-center gap-2 mb-2">
                  <div style={{ color: skill.color }}>{skill.icon}</div>
                  <span className="text-sm font-medium text-white/90">{skill.name}</span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: isInView ? `${skill.proficiency}%` : 0 }}
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

                {/* Proficiency */}
                <motion.span 
                  className="absolute top-2 right-2 text-xs font-medium"
                  style={{ color: skill.color }}
                  animate={{
                    scale: isHovered ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  {skill.proficiency}%
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div ref={sectionRef} className="relative py-16 sm:py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1), transparent 70%)',
              'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 70%)',
              'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1), transparent 70%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0" style={{ transform: "translateZ(-50px)" }}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
              style={{ top: `${i * 5}%` }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3 + i % 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 text-transparent bg-clip-text">
              Technical Expertise
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive skill set that enables me to deliver innovative solutions
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills], index) => (
            <SkillCluster
              key={category}
              category={category}
              skills={categorySkills}
              isActive={activeCategory === category}
              onHover={(active) => setActiveCategory(active ? category : null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -50 : -150]);
  const springY = useSpring(y, { 
    stiffness: isMobile ? 100 : 50, 
    damping: isMobile ? 15 : 20,
    mass: isMobile ? 0.8 : 1
  });

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Filter skills based on selected category
  const filteredSkills = selectedCategory 
    ? skills.filter(skill => skill.category === selectedCategory)
    : skills;

  // Mobile Layout Component
  const MobileLayout = () => (
    <section 
      id="about" 
      className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-black via-purple-950/20 to-black"
    >
      {/* Mobile Background Elements */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Mobile Gradient Orbs - Reduced Size */}
        <motion.div 
          className="absolute top-0 left-0 w-[200px] h-[200px] opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,purple,blue,purple)] rounded-full blur-[30px]" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 right-0 w-[200px] h-[200px] opacity-20"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [180, 90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg,blue,purple,blue)] rounded-full blur-[30px]" />
        </motion.div>

        {/* Mobile Grid Lines - Reduced Count */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] w-full"
              style={{ 
                top: `${i * 12.5}%`,
                background: `linear-gradient(90deg, 
                  transparent,
                  ${i % 2 ? 'rgba(168, 85, 247, 0.1)' : 'rgba(59, 130, 246, 0.1)'} 50%,
                  transparent
                )`,
              }}
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2 + i % 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mobile Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              type: "spring",
              stiffness: 100
            }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">
              About Me
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-300/90 text-base sm:text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A passionate Full Stack Developer with expertise in modern web technologies
          </motion.p>
        </motion.div>

        {/* Mobile Content Stack */}
        <div className="space-y-6 sm:space-y-8">
          {/* Mobile Intro Section */}
          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <IntroSection />
          </motion.div>

          {/* Mobile Skills Section */}
          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SkillsSection />
          </motion.div>

          {/* Mobile Education Timeline */}
          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <EducationTimeline />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .animate-gradient {
          animation: gradient 4s linear infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @media (max-width: 768px) {
          .prose {
            font-size: 0.95rem;
          }
          .prose p {
            margin-bottom: 1rem;
          }
          .animate-gradient {
            animation: gradient 4s linear infinite;
          }
          .animate-shimmer {
            animation: shimmer 1.5s infinite;
          }
        }
      `}</style>
    </section>
  );

  return (
    <section className="min-h-screen py-12 sm:py-20 lg:py-32 relative overflow-hidden" ref={containerRef}>
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
        <IntroSection />
        
        {/* Education Section */}
        <div className="py-12 sm:py-20">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 text-transparent bg-clip-text">
              Education Journey
            </span>
          </motion.h2>
          <EducationTimeline />
        </div>

        {/* New Skills Section */}
        <SkillsSection />

        {/* Add shimmer animation */}
        <style jsx global>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            animation: gradient 6s linear infinite;
          }
          @media (max-width: 768px) {
            .prose {
              font-size: 0.95rem;
            }
            .prose p {
              margin-bottom: 1rem;
            }
            .animate-gradient {
              animation: gradient 4s linear infinite;
            }
            .animate-shimmer {
              animation: shimmer 1.5s infinite;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default About; 