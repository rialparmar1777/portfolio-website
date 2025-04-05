'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaSearch, FaFilter, FaArrowLeft, FaArrowRight, FaChevronRight } from 'react-icons/fa';
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark, getGlassStyles, getTextColor, getBackgroundColor, getBorderColor, getGradient } = useThemeStyles();
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
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
    
    if (activeCategory) {
      filtered = filtered.filter(project => project.category === activeCategory);
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
  }, [activeCategory, searchQuery]);

  // Handle project selection
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Filter by category
  const filterByCategory = (category: string | null) => {
    setActiveCategory(category);
  };
  
  // Navigation functions
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  // Theme-specific styles
  const getThemeTextColor = (baseColor: string) => {
    return isDark ? baseColor : baseColor.replace('text-gray-300', 'text-gray-700').replace('text-gray-400', 'text-gray-600');
  };

  const getThemeBgColor = (baseColor: string) => {
    return isDark ? baseColor : baseColor.replace('bg-black/90', 'bg-black/80').replace('bg-black/50', 'bg-black/40');
  };

  const getThemeBorderColor = (baseColor: string) => {
    return isDark ? baseColor : baseColor.replace('border-purple-500/30', 'border-purple-500/40');
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-start pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative" 
      ref={containerRef}
    >
      {/* Background with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: isDark 
            ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center'
        }} />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: isDark 
              ? 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
      </motion.div>

      {/* Header Section */}
      <div className="text-center mb-16 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 relative inline-block"
        >
          <span className="gradient-text">Featured Projects</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={getThemeTextColor("text-gray-400 text-lg max-w-2xl mx-auto")}
        >
          A collection of my recent work showcasing my skills in web development and design.
        </motion.p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <div 
              className={`relative flex items-center rounded-full overflow-hidden transition-all duration-300 ${
                isSearchFocused ? 'ring-2 ring-purple-500' : ''
              }`}
              style={{
                ...getGlassStyles(isSearchFocused, false),
              }}
            >
              <div className={`absolute left-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className={`w-full py-3 pl-12 pr-4 bg-transparent ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'} focus:outline-none`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => filterByCategory(null)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === null 
                  ? 'bg-purple-500 text-white' 
                  : `${isDark ? 'bg-transparent border border-purple-500/30 text-purple-300' : 'bg-transparent border border-purple-500/40 text-purple-600'} hover:bg-purple-500/20`
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => filterByCategory(category || null)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-purple-500 text-white' 
                    : `${isDark ? 'bg-transparent border border-purple-500/30 text-purple-300' : 'bg-transparent border border-purple-500/40 text-purple-600'} hover:bg-purple-500/20`
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Showcase */}
      {filteredProjects.length > 0 ? (
        <div className="relative z-10">
          {/* Featured Project */}
          <div className="mb-16">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-xl"
              style={{
                ...getGlassStyles(false, false),
                height: '500px',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Project Image */}
              <div className="absolute inset-0">
                <Image
                  src={filteredProjects[activeIndex].image}
                  alt={filteredProjects[activeIndex].title}
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className={`absolute inset-0 ${getThemeBgColor("bg-gradient-to-t from-black/90 via-black/50 to-transparent")}`} />
              </div>
              
              {/* Project Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="mb-2">
                  <span className={`px-3 py-1 text-xs ${isDark ? 'bg-purple-500/30 text-purple-200' : 'bg-purple-500/40 text-purple-700'} rounded-full`}>
                    {filteredProjects[activeIndex].category}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{filteredProjects[activeIndex].title}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-100'} mb-6 max-w-2xl`}>{filteredProjects[activeIndex].description}</p>
                
                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {filteredProjects[activeIndex].technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-sm ${isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-500/30 text-purple-700'} rounded-full border ${isDark ? 'border-purple-500/20' : 'border-purple-500/30'}`}
                    >
                      {tech}
                    </span>
                  ))}
                  {filteredProjects[activeIndex].technologies.length > 4 && (
                    <span className={`px-3 py-1 text-sm ${isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-500/30 text-purple-700'} rounded-full border ${isDark ? 'border-purple-500/20' : 'border-purple-500/30'}`}>
                      +{filteredProjects[activeIndex].technologies.length - 4} more
                    </span>
                  )}
                </div>
                
                {/* Project Links */}
                <div className="flex gap-4">
                  <a
                    href={filteredProjects[activeIndex].liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full transition-all duration-300"
                  >
                    View Live Demo
                    <FaExternalLinkAlt />
                  </a>
                  <a
                    href={filteredProjects[activeIndex].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition-all duration-300"
                  >
                    View Code
                    <FaGithub />
                  </a>
                </div>
              </div>
              
              {/* Navigation Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={goToPrev}
                  className={`p-2 rounded-full ${isDark ? 'bg-black/50 hover:bg-black/70' : 'bg-black/40 hover:bg-black/60'} text-white transition-all duration-300`}
                  aria-label="Previous project"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={goToNext}
                  className={`p-2 rounded-full ${isDark ? 'bg-black/50 hover:bg-black/70' : 'bg-black/40 hover:bg-black/60'} text-white transition-all duration-300`}
                  aria-label="Next project"
                >
                  <FaArrowRight />
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Project Thumbnails */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>All Projects</h3>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className={`flex items-center gap-1 ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} transition-colors`}
              >
                {isExpanded ? 'Show Less' : 'Show All'}
                <FaChevronRight className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
            </div>
            
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-500 ${isExpanded ? 'max-h-[2000px]' : 'max-h-[300px] overflow-hidden'}`}>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 400, damping: 10 }}
                  className={`relative h-40 rounded-xl overflow-hidden cursor-pointer shadow-md ${
                    index === activeIndex ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={320}
                    height={180}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${getThemeBgColor("bg-gradient-to-t from-black/80 to-transparent")} opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3`}>
                    <span className="text-white text-sm font-medium truncate">{project.title}</span>
                    <span className={`${isDark ? 'text-purple-300' : 'text-purple-200'} text-xs`}>{project.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {!isExpanded && filteredProjects.length > 8 && (
              <div className={`absolute bottom-0 left-0 right-0 h-20 ${getThemeBgColor("bg-gradient-to-t from-black/80 to-transparent")} pointer-events-none`} />
            )}
          </div>
          
          {/* Project Details */}
          <div className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project Description */}
              <div className="rounded-xl overflow-hidden shadow-lg" style={{...getGlassStyles(false, false)}}>
                <div className="p-6">
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>About This Project</h3>
                  <p className={getThemeTextColor("text-gray-300 mb-6")}>{filteredProjects[activeIndex].description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={filteredProjects[activeIndex].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full transition-all duration-300"
                    >
                      View Live Demo
                      <FaExternalLinkAlt />
                    </a>
                    <a
                      href={filteredProjects[activeIndex].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition-all duration-300"
                    >
                      View Code
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Technologies Used */}
              <div className="rounded-xl overflow-hidden shadow-lg" style={{...getGlassStyles(false, false)}}>
                <div className="p-6">
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {filteredProjects[activeIndex].technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 text-sm ${isDark ? 'bg-purple-500/10 text-purple-300' : 'bg-purple-500/20 text-purple-700'} rounded-full border ${isDark ? 'border-purple-500/20' : 'border-purple-500/30'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 relative z-10">
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>No projects found</h3>
          <p className={getThemeTextColor("text-gray-400")}>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Project Modal */}
      <AnimatePresence>
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
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
              style={{
                ...getGlassStyles(false, false),
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className={`absolute top-4 right-4 z-50 p-2 rounded-full ${isDark ? 'bg-purple-500/20 hover:bg-purple-500/40' : 'bg-purple-500/30 hover:bg-purple-500/50'} text-white transition-all duration-300`}
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
                  <div className={`absolute inset-0 ${getThemeBgColor("bg-gradient-to-t from-black/80 via-black/50 to-transparent")} lg:hidden`} />
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="mb-2">
                      <span className={`px-3 py-1 text-xs ${isDark ? 'bg-purple-500/30 text-purple-200' : 'bg-purple-500/40 text-purple-700'} rounded-full`}>
                        {selectedProject.category}
                      </span>
                    </div>
                    <h2 className={`text-3xl lg:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{selectedProject.title}</h2>
                    <p className={getThemeTextColor("text-gray-300 text-lg mb-8")}>{selectedProject.description}</p>
                    
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'} mb-4`}>Technologies Used</h3>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {selectedProject.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-4 py-2 text-sm ${isDark ? 'bg-purple-500/10 text-purple-300' : 'bg-purple-500/20 text-purple-700'} rounded-full border ${isDark ? 'border-purple-500/20' : 'border-purple-500/30'}`}
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
                      className="inline-flex items-center gap-2 text-white bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-full transition-all duration-300"
                    >
                      View Live Demo
                      <FaExternalLinkAlt />
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full transition-all duration-300"
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
      </AnimatePresence>
    </div>
  );
};

export default Projects; 