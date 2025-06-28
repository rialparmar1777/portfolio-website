'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaSearch, FaFilter, FaArrowLeft, FaArrowRight, FaChevronRight, FaCode, FaLaptop, FaMobile, FaGamepad, FaGlobe, FaStar, FaHeart, FaAward, FaArrowUp, FaRocket, FaEye, FaBrain } from 'react-icons/fa';
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
  const { getTextColor, getBackgroundColor, getBorderColor, isDark } = useThemeStyles();
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
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number, delay: number, icon: React.ReactNode}>>([]);
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
  const scale = useTransform(springProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  // Enhanced floating elements
  useEffect(() => {
    const icons = [<FaCode />, <FaRocket />, <FaStar />, <FaHeart />, <FaBrain />, <FaEye />];
    const elements = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      icon: icons[i % icons.length]
    }));
    setFloatingElements(elements);
  }, []);

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

  // Auto-advance featured projects
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeaturedIndex((prev) => (prev + 1) % Math.min(4, filteredProjects.length));
    }, 5000);

    return () => clearInterval(timer);
  }, [filteredProjects.length]);

  // Filter projects based on category and search
  useEffect(() => {
    let filtered = projects;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredProjects(filtered);
  }, [selectedCategory, searchQuery]);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const floatingVariants = {
    animate: {
      y: [0, -25, 0],
      x: [0, 12, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.15, 1],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

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
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  const featuredProjects = filteredProjects.slice(0, 4);

  return (
    <div className="h-full flex flex-col">
      {/* Enhanced Header */}
      <motion.div 
        className="sticky top-0 z-10 px-4 py-3 perspective-1000"
        style={{ 
          background: getBackgroundColor('paper'),
          borderBottom: `1px solid ${getBorderColor('light')}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
          transition: 'transform 0.1s ease-out',
          opacity,
          y,
          scale
        }}
      >
        <motion.h2 
          className="text-xl font-bold mb-2"
          style={{ color: getTextColor('primary') }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Projects
        </motion.h2>

        {/* Enhanced Scroll progress indicator */}
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

        {/* Enhanced Search and Filter */}
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            className={`flex-1 transition-all duration-300 ${
              isSearchExpanded ? 'w-full' : 'w-12'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <motion.button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="w-full p-2 rounded-lg flex items-center gap-2"
              style={{
                background: getBackgroundColor('glass'),
                border: `1px solid ${getBorderColor('light')}`,
                color: getTextColor('secondary')
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSearch className="w-4 h-4" />
              {isSearchExpanded && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: getTextColor('primary') }}
                />
              )}
            </motion.button>
          </motion.div>

          <motion.button
            onClick={() => setSelectedCategory(selectedCategory === 'all' ? 'Web Application' : 'all')}
            className="p-2 rounded-lg flex items-center gap-1"
            style={{
              background: selectedCategory !== 'all' 
                ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' 
                : getBackgroundColor('glass'),
              border: `1px solid ${getBorderColor('light')}`,
              color: selectedCategory !== 'all' ? 'white' : getTextColor('secondary')
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFilter className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Enhanced Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['all', ...categories].map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category || 'all')}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {category !== 'all' && categoryIcons[category as keyof typeof categoryIcons]}
              {category === 'all' ? 'All' : category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Content */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4 relative"
      >
        {/* Floating Elements */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute pointer-events-none"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              color: isDark ? 'rgba(147, 51, 234, 0.2)' : 'rgba(147, 51, 234, 0.1)',
            }}
            variants={floatingVariants}
            animate="animate"
            initial={{ opacity: 0, scale: 0 }}
            transition={{ delay: element.delay }}
          >
            {element.icon}
          </motion.div>
        ))}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          {/* Featured Projects Carousel */}
          {activeTab === 'featured' && featuredProjects.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: getTextColor('primary') }}>
                <FaStar className="text-yellow-500" />
                Featured Projects
              </h3>
              
              <motion.div
                className="relative h-48 rounded-2xl overflow-hidden"
                style={{
                  background: getBackgroundColor('glass'),
                  border: `1px solid ${getBorderColor('light')}`,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: index === activeFeaturedIndex ? 1 : 0,
                      scale: index === activeFeaturedIndex ? 1 : 0.9
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative w-full h-full">
                      {!imageErrors[project.title] ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(project.title)}
                          onLoad={() => handleImageLoad(project.title)}
                          onLoadStart={() => handleImageLoadStart(project.title)}
                        />
                      ) : (
                        <FallbackImage category={project.category || 'Web Application'} />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-white font-semibold mb-1">{project.title}</h4>
                        <p className="text-white/80 text-xs mb-2 line-clamp-2">{project.description}</p>
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={() => openProjectModal(project)}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Navigation Dots */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {featuredProjects.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveFeaturedIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === activeFeaturedIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* All Projects Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-4"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => openProjectModal(project)}
              >
                <div 
                  className="relative h-48 rounded-2xl overflow-hidden"
                  style={{
                    background: getBackgroundColor('glass'),
                    border: `1px solid ${getBorderColor('light')}`,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {!imageErrors[project.title] ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={() => handleImageError(project.title)}
                      onLoad={() => handleImageLoad(project.title)}
                      onLoadStart={() => handleImageLoadStart(project.title)}
                    />
                  ) : (
                    <FallbackImage category={project.category || 'Web Application'} />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                      {categoryIcons[project.category || 'Web Application']}
                      <span className="text-white text-xs">{project.category}</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-semibold mb-2">{project.title}</h4>
                    <p className="text-white/80 text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-2">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub className="w-4 h-4 text-white" />
                      </motion.a>
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaExternalLinkAlt className="w-4 h-4 text-white" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-50"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Enhanced Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeProjectModal}
            />
            
            <motion.div
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{
                background: getBackgroundColor('paper'),
                border: `1px solid ${getBorderColor('light')}`,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="relative h-48">
                {!imageErrors[selectedProject.title] ? (
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                ) : (
                  <FallbackImage category={selectedProject.category || 'Web Application'} />
                )}
                
                <motion.button
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="w-4 h-4" />
                </motion.button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: getTextColor('primary') }}>
                  {selectedProject.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: getTextColor('secondary') }}>
                  {selectedProject.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2" style={{ color: getTextColor('primary') }}>
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{
                          background: getBackgroundColor('glass'),
                          color: getTextColor('secondary'),
                          border: `1px solid ${getBorderColor('light')}`
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium"
                    style={{
                      background: getBackgroundColor('glass'),
                      color: getTextColor('primary'),
                      border: `1px solid ${getBorderColor('light')}`
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub className="w-4 h-4" />
                    GitHub
                  </motion.a>
                  
                  {selectedProject.liveUrl && (
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        color: 'white'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  )}
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