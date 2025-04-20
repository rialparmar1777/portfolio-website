'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaSearch, FaFilter, FaArrowLeft, FaArrowRight, FaChevronRight, FaArrowUp } from 'react-icons/fa';
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

const Projects = () => {
  const { isDark } = useThemeStyles();
  const { getTextColor, getBackgroundColor, getBorderColor } = useThemeStyles();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Handle scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const position = window.scrollY;
        setShowScrollTop(position > 300);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Auto-rotate featured project
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovered, filteredProjects.length]);
  
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
    setActiveIndex(0); // Reset active index when filters change
  }, [selectedCategory, searchQuery]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
              Featured Projects
            </span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Explore my latest work and personal projects
          </p>
        </motion.div>

        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full sm:w-96"
            >
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${
                  isDark 
                    ? 'bg-gray-800/50 text-white placeholder-gray-400 border border-gray-700' 
                    : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
              />
              <FaSearch className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category || 'all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : isDark
                        ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl ${
                isDark ? 'bg-gray-800/50' : 'bg-white'
              } shadow-lg hover:shadow-xl transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDark ? 'from-gray-900/80' : 'from-gray-900/60'
                } to-transparent`} />
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    isDark 
                      ? 'bg-purple-500/20 text-purple-300' 
                      : 'bg-purple-500/10 text-purple-600'
                  }`}>
                    {project.category}
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                <p className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                } line-clamp-2`}>
                  {project.description}
                </p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 text-xs rounded-full ${
                        isDark
                          ? 'bg-gray-700/50 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isDark
                        ? 'bg-gray-700/50 text-gray-300'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-3 rounded-full ${
              isDark 
                ? 'bg-purple-500/20 hover:bg-purple-500/40' 
                : 'bg-purple-500/30 hover:bg-purple-500/50'
            } text-white transition-all duration-300 shadow-lg`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
        )}

        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl ${
                isDark ? 'bg-gray-900' : 'bg-white'
              } shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className={`absolute top-4 right-4 z-50 p-2 rounded-full ${
                  isDark 
                    ? 'bg-purple-500/20 hover:bg-purple-500/40' 
                    : 'bg-purple-500/30 hover:bg-purple-500/50'
                } text-white transition-all duration-300`}
              >
                <FaTimes />
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-[300px] lg:h-full">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                    priority
                  />
                  <div className={`absolute inset-0 ${
                    isDark 
                      ? 'bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent' 
                      : 'bg-gradient-to-t from-gray-900/60 via-gray-900/30 to-transparent'
                  } lg:hidden`} />
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="mb-2">
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        isDark 
                          ? 'bg-purple-500/30 text-purple-200' 
                          : 'bg-purple-500/40 text-purple-700'
                      }`}>
                        {selectedProject.category}
                      </span>
                    </div>
                    <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {selectedProject.title}
                    </h2>
                    <p className={`text-lg mb-8 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {selectedProject.description}
                    </p>
                    
                    <h3 className={`text-xl font-semibold mb-4 ${
                      isDark ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {selectedProject.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-4 py-2 text-sm rounded-full ${
                            isDark
                              ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                              : 'bg-purple-500/20 text-purple-700 border border-purple-500/30'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-full transition-all duration-300"
                    >
                      View Live Demo
                      <FaExternalLinkAlt />
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-full transition-all duration-300"
                    >
                      View Code
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects; 