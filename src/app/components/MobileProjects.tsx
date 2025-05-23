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
    technologies: ["React", "TailwindCSS", "Chart.js", "Firebase", "Node.js"],
    githubUrl: "https://github.com/rialparmar/stocks-dashboard",
    liveUrl: "https://stocks-dashboard01.vercel.app/dashboard",
    image: "/images/stocks-dashboard.jpg",
    category: "Web Application"
  },
  {
    title: "Modern Marketing Website",
    description: "A responsive marketing website with modern design and smooth animations.",
    technologies: ["React", "Framer Motion", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/rialparmar/marketing-website",
    liveUrl: "https://marketing-website-tech.vercel.app/",
    image: "/images/marketing-website.jpg",
    category: "Website"
  },
  {
    title: "Disney+ Clone",
    description: "A web application that replicates the Disney+ streaming platform interface.",
    technologies: ["React", "Firebase", "Firestore", "Firebase Auth"],
    githubUrl: "https://github.com/rialparmar/disney-clone",
    liveUrl: "https://disney-clone-rial1777.vercel.app/",
    image: "/images/disney-clone.jpg",
    category: "Web Application"
  },
  {
    title: "Food Ordering System",
    description: "A full-stack food ordering system with payment integration and real-time order tracking.",
    technologies: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Stripe"],
    githubUrl: "https://github.com/rialparmar/food-ordering",
    liveUrl: "https://food-ordering-system.vercel.app/",
    image: "/images/food-ordering.jpg",
    category: "Web Application"
  },
  {
    title: "Church Organization Website",
    description: "A church website with event management, donation system, and community features.",
    technologies: ["Next.js", "React", "Tailwind CSS", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/rialparmar/church-website",
    liveUrl: "https://church-website.vercel.app/",
    image: "/images/church-website.jpg",
    category: "Website"
  },
  {
    title: "Real-time Chat Application",
    description: "A real-time messaging system built with Java and Firebase, featuring secure authentication and push notifications.",
    technologies: ["Java", "Android", "Firebase", "XML"],
    githubUrl: "https://github.com/rialparmar/chat-app",
    liveUrl: "https://github.com/rialparmar/chat-app",
    image: "/images/chat-app.png",
    category: "Mobile App"
  },
  {
    title: "Q-Game Mind Puzzle",
    description: "An engaging mind games puzzle built with C#, challenging players with strategic thinking and problem-solving scenarios.",
    technologies: ["C#", "Windows Forms", ".NET"],
    githubUrl: "https://github.com/rialparmar/q-game",
    liveUrl: "https://github.com/rialparmar/q-game",
    image: "/images/q-game.png",
    category: "Game"
  },
  {
    title: "Block Puzzle Game",
    description: "A challenging and addictive Block 3 Puzzle game that tests your strategic skills.",
    technologies: ["C#", "Windows Forms", ".NET"],
    githubUrl: "https://github.com/rialparmar/block-puzzle",
    liveUrl: "https://github.com/rialparmar/block-puzzle",
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

// Add a fallback image component
const FallbackImage = ({ category }: { category: string }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Web Application":
        return "bg-blue-500";
      case "Website":
        return "bg-green-500";
      case "Mobile App":
        return "bg-purple-500";
      case "Game":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`w-full h-full flex items-center justify-center ${getCategoryColor(category)}`}>
      <div className="text-center">
        <FaCode className="w-12 h-12 text-white mb-2" />
        <span className="text-white text-sm font-medium">{category}</span>
      </div>
    </div>
  );
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

  // Enhanced image error handling
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  const handleImageError = (projectId: string) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
    setImageLoading(prev => ({ ...prev, [projectId]: false }));
  };

  const handleImageLoad = (projectId: string) => {
    setImageLoading(prev => ({ ...prev, [projectId]: false }));
  };

  const handleImageLoadStart = (projectId: string) => {
    setImageLoading(prev => ({ ...prev, [projectId]: true }));
  };

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

  // Enhanced project filtering
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
    
    // Sort projects by category for better organization
    filtered.sort((a, b) => {
      if (a.category === b.category) return 0;
      return a.category! > b.category! ? 1 : -1;
    });
    
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
  
  // Enhanced scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (projectsRef.current) {
        const position = projectsRef.current.scrollTop;
        setScrollPosition(position);
        setShowScrollTop(position > 300);
        
        // Update scroll progress
        const { scrollHeight, clientHeight } = projectsRef.current;
        const progress = (position / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress);
        setScrollDirection(progress > scrollProgress ? 'down' : 'up');
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

  // Enhanced modal handling
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    // Restore background scrolling
    document.body.style.overflow = 'auto';
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
                onClick={() => openProjectModal(project)}
              >
                <div className="relative h-48">
                  {imageErrors[project.title] ? (
                    <FallbackImage category={project.category || "Web Application"} />
                  ) : (
                    <>
                      {imageLoading[project.title] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                        </div>
                      )}
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                        onError={() => handleImageError(project.title)}
                        onLoad={() => handleImageLoad(project.title)}
                        onLoadStart={() => handleImageLoadStart(project.title)}
                      />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <motion.h3 
                      className="text-lg font-semibold text-white"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {project.title}
                    </motion.h3>
                    <div className="flex items-center gap-2 mt-1">
                      {categoryIcons[project.category!]}
                      <span className="text-sm text-white/80">{project.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Project modal with scroll-based reveal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl rounded-2xl overflow-hidden"
              style={{ 
                background: getBackgroundColor('paper'),
                border: `1px solid ${getBorderColor('light')}`,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64">
                {imageErrors[selectedProject.title] ? (
                  <FallbackImage category={selectedProject.category || "Web Application"} />
                ) : (
                  <>
                    {imageLoading[selectedProject.title] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                      </div>
                    )}
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                      onError={() => handleImageError(selectedProject.title)}
                      onLoad={() => handleImageLoad(selectedProject.title)}
                      onLoadStart={() => handleImageLoadStart(selectedProject.title)}
                    />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 p-2 rounded-full"
                  style={{ 
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white'
                  }}
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: getTextColor('primary') }}>
                  {selectedProject.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: getTextColor('secondary') }}>
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{ 
                        background: 'rgba(0, 0, 0, 0.1)',
                        color: getTextColor('secondary')
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ 
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      color: 'white'
                    }}
                  >
                    <FaGithub className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full"
                      style={{ 
                        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                        color: 'white'
                      }}
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 p-3 rounded-full"
            style={{ 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileProjects; 