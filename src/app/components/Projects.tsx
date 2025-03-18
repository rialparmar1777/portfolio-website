'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  liveDemo: string;
  techStack: {
    frontend: string[];
    backend?: string[];
  };
  features?: string[];
}

const projects: Project[] = [
  {
    title: "Stocks Dashboard",
    description: "A real-time stock market dashboard with interactive charts, portfolio tracking, and market analysis tools.",
    image: "/images/stocks-dashboard.jpg",
    link: "https://stocks-dashboard01.vercel.app/dashboard",
    liveDemo: "https://stocks-dashboard01.vercel.app/dashboard",
    techStack: {
      frontend: [
        "React with Vite",
        "TailwindCSS",
        "Chart.js",
        "Firebase Authentication",
        "Axios",
        "WebSocket"
      ],
      backend: [
        "Node.js & Express",
        "WebSocket Server",
        "Finnhub API",
        "Node-Cache",
        "Rate limiting",
        "CORS"
      ]
    },
    features: [
      "Real-time stock data updates",
      "Interactive charts and graphs",
      "Portfolio tracking",
      "Market analysis tools",
      "User authentication",
      "Watchlist management"
    ]
  },
  {
    title: "Modern Marketing Website",
    description: "A responsive marketing website with modern design and smooth animations.",
    image: "/images/marketing-website.jpg",
    link: "https://marketing-website-tech.vercel.app/",
    liveDemo: "https://marketing-website-tech.vercel.app/",
    techStack: {
      frontend: [
        "React 19.0.0",
        "Framer Motion",
        "React Router DOM",
        "React Icons",
        "React Intersection Observer",
        "React Scroll",
        "HeroIcons",
        "Lucide React"
      ],
      backend: [
        "Node.js",
        "Express",
        "MongoDB",
        "JWT Authentication"
      ]
    },
    features: [
      "Responsive design",
      "Smooth animations",
      "Contact form integration",
      "Blog section",
      "Service showcase",
      "Testimonial carousel"
    ]
  },
  {
    title: "Disney+ Clone",
    description: "A web application that replicates the Disney+ streaming platform interface.",
    image: "/images/disney-clone.jpg",
    link: "https://disney-clone-rial1777.vercel.app/",
    liveDemo: "https://disney-clone-rial1777.vercel.app/",
    techStack: {
      frontend: [
        "React 18",
        "Vite",
        "React Router DOM",
        "Axios",
        "React Icons",
        "ESLint"
      ],
      backend: [
        "Firebase",
        "Firestore",
        "Firebase Auth"
      ]
    },
    features: [
      "Modern and responsive user interface",
      "React-based frontend architecture",
      "Dynamic content loading",
      "Seamless navigation",
      "User authentication",
      "Content categorization"
    ]
  },
  {
    title: "Food Ordering System",
    description: "A full-stack food ordering system with payment integration and real-time order tracking.",
    image: "/images/food-ordering.jpg",
    link: "https://github.com/rialparmar1777/Food-Order",
    liveDemo: "https://food-ordering-system.vercel.app/",
    techStack: {
      frontend: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "TSParticles",
        "Lucide React"
      ],
      backend: [
        "PostgreSQL",
        "Prisma",
        "Stripe Payments",
        "Node.js",
        "Express"
      ]
    },
    features: [
      "Menu management",
      "Cart functionality",
      "Payment processing",
      "Order tracking",
      "User authentication",
      "Admin dashboard"
    ]
  },
  {
    title: "Church Organization Website",
    description: "A church website with event management, donation system, and community features.",
    image: "/images/church-website.jpg",
    link: "https://github.com/rialparmar1777/churchwebsite",
    liveDemo: "https://church-website.vercel.app/",
    techStack: {
      frontend: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "React Icons",
        "React Query"
      ],
      backend: [
        "Node.js",
        "Express",
        "MongoDB",
        "Stripe Payments"
      ]
    },
    features: [
      "Event management system",
      "Donation integration",
      "Prayer request form",
      "News and updates",
      "Gallery section",
      "Contact information"
    ]
  },
  {
    title: "Real-time Chat Application",
    description: "A real-time messaging system built with Java and Firebase, featuring secure authentication and push notifications. The application supports multiple concurrent users with optimized performance and reduced latency.",
    image: "/images/chat-app.png",
    link: "https://github.com/rialparmar1777/Real-time-Chat-Application/tree/master",
    liveDemo: "https://github.com/rialparmar1777/Real-time-Chat-Application/tree/master",
    techStack: {
      frontend: [
        "Java",
        "Android Studio",
        "XML Layouts",
        "Material Design",
        "Push Notifications",
        "Real-time Updates"
      ],
      backend: [
        "Firebase Realtime Database",
        "Firebase Authentication",
        "Firebase Cloud Messaging",
        "Firebase Analytics",
        "Cloud Functions"
      ]
    },
    features: [
      "Real-time messaging system",
      "Secure user authentication",
      "Push notifications",
      "Concurrent user support",
      "Optimized performance",
      "40% reduced latency"
    ]
  },
  {
    title: "Q-Game Mind Puzzle",
    description: "An engaging mind games puzzle built with C#, challenging players with strategic thinking and problem-solving scenarios. Features a clean, intuitive interface and progressive difficulty levels.",
    image: "/images/q-game.png",
    link: "https://github.com/rialparmar1777/QGame",
    liveDemo: "https://github.com/rialparmar1777/QGame",
    techStack: {
      frontend: [
        "C#",
        "Windows Forms",
        ".NET Framework",
        "Custom Controls",
        "Game Logic"
      ]
    },
    features: [
      "Strategic puzzle gameplay",
      "Progressive difficulty levels",
      "Intuitive user interface",
      "Score tracking system",
      "Level editor",
      "Achievement system"
    ]
  },
  {
    title: "Block Puzzle Game",
    description: "A challenging and addictive Block 3 Puzzle game that tests your strategic skills. Built with C#, featuring smooth animations and engaging gameplay mechanics.",
    image: "/images/block-puzzle.webp",
    link: "https://github.com/rialparmar1777/Block-Puzzle-Game",
    liveDemo: "https://github.com/rialparmar1777/Block-Puzzle-Game",
    techStack: {
      frontend: [
        "C#",
        "Windows Forms",
        ".NET Framework",
        "Custom Graphics",
        "Animation System",
        "Game State Management"
      ]
    },
    features: [
      "Engaging puzzle mechanics",
      "Multiple difficulty levels",
      "Score tracking",
      "High score system",
      "Smooth animations",
      "Progressive challenges"
    ]
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
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

  return (
    <div className="min-h-screen flex flex-col justify-start pt-10 pb-20 px-4 sm:px-6 lg:px-8" ref={containerRef}>
      {/* Enhanced Background Effects */}
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

      {/* Enhanced Header Section */}
      <div className="text-center mb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl -z-10" />
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 relative inline-block"
        >
          <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">
            Featured Projects
          </span>
          <motion.div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
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
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          A collection of my recent work showcasing my skills in web development and design.
        </motion.p>
      </div>

      {/* Enhanced Projects Grid */}
      <div className="space-y-32">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`flex flex-col ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } gap-8 items-center`}
          >
            {/* Enhanced Project Image */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                className="relative w-full h-[400px] rounded-2xl overflow-hidden group bg-black/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Border */}
                <motion.div
                  className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  priority={index === 0}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Enhanced Hover Content */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0.9 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 space-y-4">
                    <Link
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white bg-purple-500/80 hover:bg-purple-500 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
                    >
                      View Live Demo
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white bg-blue-500/80 hover:bg-blue-500 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ml-4"
                    >
                      View Code
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced Project Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-4xl font-bold text-white mb-4 hover:text-purple-400 transition-colors group">
                  {project.title}
                  <motion.div 
                    className="w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              {/* Enhanced Tech Stack */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.frontend.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="px-4 py-2 text-sm bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 hover:bg-purple-500/20 hover:scale-105 transition-all duration-300 cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.techStack.backend?.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="px-4 py-2 text-sm bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300 cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Features */}
              {project.features && (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-2 gap-4">
                    {project.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-3 text-sm text-gray-400 group/item hover:text-purple-300 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <svg className="w-4 h-4 text-purple-400 transform group-hover/item:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="group-hover/item:translate-x-1 transition-transform">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add gradient animation */}
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
    </div>
  );
};

export default Projects;