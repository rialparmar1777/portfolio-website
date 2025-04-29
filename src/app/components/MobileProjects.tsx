'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaSearch, FaFilter, FaArrowLeft, FaArrowRight, FaChevronRight, FaCode, FaLaptop, FaMobile, FaGamepad, FaGlobe, FaStar, FaHeart, FaAward, FaArrowUp } from 'react-icons/fa';
import Image from 'next/image';
import { useThemeStyles } from '../hooks/useThemeStyles';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  category?: string;
}

const projects: Project[] = [
  {
    title: "Stocks Dashboard",
    description: "A real-time stock market dashboard with interactive charts, portfolio tracking, and market analysis tools.",
    technologies: ["React with Vite", "TailwindCSS", "Chart.js", "Firebase Authentication", "Axios", "WebSocket", "Node.js & Express", "WebSocket Server", "Finnhub API", "Node-Cache", "Rate limiting", "CORS"],
    githubUrl: "https://github.com/yourusername/stocks-dashboard",
    liveUrl: "https://stocks-dashboard01.vercel.app/dashboard",
    image: "/images/stocks-dashboard.jpg",
    category: "Web Application"
  },
  {
    title: "Modern Marketing Website",
    description: "A responsive marketing website with modern design and smooth animations.",
    technologies: ["React 19.0.0", "Framer Motion", "React Router DOM", "React Icons", "React Intersection Observer", "React Scroll", "HeroIcons", "Lucide React", "Node.js", "Express", "MongoDB", "JWT Authentication"],
    githubUrl: "https://github.com/yourusername/marketing-website",
    liveUrl: "https://marketing-website-tech.vercel.app/",
    image: "/images/marketing-website.jpg",
    category: "Website"
  },
  {
    title: "Disney+ Clone",
    description: "A web application that replicates the Disney+ streaming platform interface.",
    technologies: ["React 18", "Vite", "React Router DOM", "Axios", "React Icons", "ESLint", "Firebase", "Firestore", "Firebase Auth"],
    githubUrl: "https://github.com/yourusername/disney-clone",
    liveUrl: "https://disney-clone-rial1777.vercel.app/",
    image: "/images/disney-clone.jpg",
    category: "Web Application"
  },
  {
    title: "Food Ordering System",
    description: "A full-stack food ordering system with payment integration and real-time order tracking.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TSParticles", "Lucide React", "PostgreSQL", "Prisma", "Stripe Payments", "Node.js", "Express"],
    githubUrl: "https://github.com/yourusername/food-ordering",
    liveUrl: "https://food-ordering-system.vercel.app/",
    image: "/images/food-ordering.jpg",
    category: "Web Application"
  },
  {
    title: "Church Organization Website",
    description: "A church website with event management, donation system, and community features.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "React Icons", "React Query", "Node.js", "Express", "MongoDB", "Stripe Payments"],
    githubUrl: "https://github.com/yourusername/church-website",
    liveUrl: "https://church-website.vercel.app/",
    image: "/images/church-website.jpg",
    category: "Website"
  },
  {
    title: "Real-time Chat Application",
    description: "A real-time messaging system built with Java and Firebase, featuring secure authentication and push notifications.",
    technologies: ["Java", "Android Studio", "XML Layouts", "Material Design", "Push Notifications", "Real-time Updates", "Firebase Realtime Database", "Firebase Authentication", "Firebase Cloud Messaging", "Firebase Analytics", "Cloud Functions"],
    githubUrl: "https://github.com/yourusername/chat-app",
    liveUrl: "https://github.com/yourusername/chat-app",
    image: "/images/chat-app.png",
    category: "Mobile App"
  },
  {
    title: "Q-Game Mind Puzzle",
    description: "An engaging mind games puzzle built with C#, challenging players with strategic thinking and problem-solving scenarios.",
    technologies: ["C#", "Windows Forms", ".NET Framework", "Custom Controls", "Game Logic"],
    githubUrl: "https://github.com/yourusername/q-game",
    liveUrl: "https://github.com/yourusername/q-game",
    image: "/images/q-game.png",
    category: "Game"
  },
  {
    title: "Block Puzzle Game",
    description: "A challenging and addictive Block 3 Puzzle game that tests your strategic skills.",
    technologies: ["C#", "Windows Forms", ".NET Framework", "Custom Graphics", "Animation System", "Game State Management"],
    githubUrl: "https://github.com/yourusername/block-puzzle",
    liveUrl: "https://github.com/yourusername/block-puzzle",
    image: "/images/block-puzzle.webp",
    category: "Game"
  }
];

// Get unique categories
const categories = Array.from(new Set(projects.map(project => project.category)));

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "Web Application": <FaCode className="w-4 h-4" />,
  "Website": <FaGlobe className="w-4 h-4" />,
  "Mobile App": <FaMobile className="w-4 h-4" />,
  "Game": <FaGamepad className="w-4 h-4" />
};

const MobileProjects = () => {
  const { getTextColor, getBackgroundColor, getBorderColor } = useThemeStyles();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeTab, setActiveTab] = useState<'featured' | 'all'>('featured');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const projectsRef = useRef<HTMLDivElement>(null);
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

  // Filter projects based on category and search query
  useEffect(() => {
    let filtered = [...projects];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }
    
    setFilteredProjects(filtered);
  }, [selectedCategory, searchQuery]);
  
  // Auto-rotate featured projects
  useEffect(() => {
    if (activeTab === 'featured') {
      const interval = setInterval(() => {
        setActiveFeaturedIndex((prev) => (prev + 1) % Math.min(3, filteredProjects.length));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeTab, filteredProjects.length]);
  
  // Handle scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (projectsRef.current) {
        const position = projectsRef.current.scrollTop;
        setScrollPosition(position);
        setShowScrollTop(position > 300);
      }
    };
    
    if (projectsRef.current) {
      projectsRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (projectsRef.current) {
          projectsRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, []);
  
  const scrollToTop = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

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
        <div className="flex items-center justify-between mb-3">
          <motion.h2 
            className="text-xl font-bold"
            style={{ color: getTextColor('primary') }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Projects
          </motion.h2>
          <motion.button
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="p-2 rounded-full"
            style={{ 
              background: getBackgroundColor('default'),
              color: getTextColor('primary'),
              border: `1px solid ${getBorderColor('light')}`,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: getTextColor('primary'),
              color: getBackgroundColor('default')
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaSearch size={16} />
          </motion.button>
        </div>

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
        
        {isSearchExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3"
          >
            <motion.input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg"
              style={{ 
                background: getBackgroundColor('default'),
                color: getTextColor('primary'),
                border: `1px solid ${getBorderColor('light')}`,
              }}
              whileFocus={{ 
                scale: 1.02,
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)'
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
        )}
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <motion.button
            onClick={() => setActiveTab('featured')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'featured'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{
                rotate: activeTab === 'featured' ? [0, 360] : 0,
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            >
              <FaStar size={14} />
            </motion.div>
            Featured
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaCode size={14} />
            All Projects
          </motion.button>
        </div>
      </motion.div>
      
      {/* Projects grid with scroll-based reveal */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        <motion.div 
          className="grid grid-cols-1 gap-4"
          style={{ 
            transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {filteredProjects.map((project, index) => {
            // Calculate individual item's scroll progress
            const itemScrollProgress = useScroll({
              target: containerRef,
              offset: ["start end", "end start"]
            });

            const itemSpringProgress = useSpring(itemScrollProgress.scrollYProgress, springConfig);
            const itemOpacity = useTransform(itemSpringProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
            const itemY = useTransform(itemSpringProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

            return (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl perspective-1000"
                style={{ 
                  background: getBackgroundColor('paper'),
                  border: `1px solid ${getBorderColor('light')}`,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
                  transition: 'transform 0.1s ease-out',
                  opacity: itemOpacity,
                  y: itemY
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)',
                  transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale(1.02)`
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
              >
                {/* Project image with enhanced hover effect */}
                <motion.div 
                  className="relative h-48 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Project content with enhanced animations */}
                <motion.div className="p-4">
                  <motion.h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: getTextColor('primary') }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm mb-3"
                    style={{ color: getTextColor('secondary') }}
                  >
                    {project.description}
                  </motion.p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{ 
                          background: getBackgroundColor('default'),
                          color: getTextColor('primary'),
                          border: `1px solid ${getBorderColor('light')}`
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: getTextColor('primary'),
                          color: getBackgroundColor('default')
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Scroll to top button with scroll-based reveal */}
      <motion.div
        style={{ 
          opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1]),
          y: useTransform(scrollYProgress, [0.1, 0.2], [20, 0])
        }}
      >
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 p-3 rounded-full"
            style={{ 
              background: getBackgroundColor('default'),
              color: getTextColor('primary'),
              border: `1px solid ${getBorderColor('light')}`,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: getTextColor('primary'),
              color: getBackgroundColor('default')
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaArrowUp size={20} />
          </motion.button>
        )}
      </motion.div>
      
      {/* Project modal with scroll-based reveal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl overflow-hidden"
              style={{ 
                background: getBackgroundColor('paper'),
                border: `1px solid ${getBorderColor('light')}`,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
                transition: 'transform 0.1s ease-out',
                opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]),
                y: useTransform(scrollYProgress, [0, 0.1], [50, 0])
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                transform: `rotateX(${mousePosition.y * 7}deg) rotateY(${mousePosition.x * 7}deg) scale(1.02)`
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white"
              >
                <FaTimes />
              </button>
              
              <div className="relative h-48">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 text-xs rounded-full flex items-center gap-1"
                    style={{ 
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: 'rgb(59, 130, 246)'
                    }}
                  >
                    {categoryIcons[selectedProject.category || '']}
                    {selectedProject.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: getTextColor('primary') }}>
                  {selectedProject.title}
                </h2>
                <p className="text-base mb-6" style={{ color: getTextColor('secondary') }}>
                  {selectedProject.description}
                </p>
                
                <h3 className="text-lg font-semibold mb-3" style={{ color: getTextColor('primary') }}>
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{ 
                        background: getBackgroundColor('default'),
                        color: getTextColor('secondary'),
                        border: `1px solid ${getBorderColor('light')}`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-full transition-all duration-300"
                  >
                    View Live Demo
                    <FaExternalLinkAlt />
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-full transition-all duration-300"
                  >
                    View Code
                    <FaGithub />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileProjects; 