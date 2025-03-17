'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col justify-start pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl -z-10" />
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 gradient-text relative inline-block"
        >
          Featured Projects
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
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

      {/* Projects Grid */}
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
            {/* Project Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden group bg-black/20">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  priority={index === 0}
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
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
                  </div>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-white mb-4 hover:text-purple-400 transition-colors group">
                  {project.title}
                  <div className="w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-4 mt-8">
                  <Link
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors bg-purple-500/20 px-6 py-3 rounded-full hover:bg-purple-500/30 hover:scale-105 transition-all duration-300"
                  >
                    Live Demo
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-blue-300 transition-colors bg-blue-500/20 px-6 py-3 rounded-full hover:bg-blue-500/30 hover:scale-105 transition-all duration-300"
                  >
                    View Code
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.frontend.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-sm bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 hover:bg-purple-500/20 hover:scale-105 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.backend?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-sm bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              {project.features && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-2 gap-4">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-gray-400 group/item hover:text-purple-300 transition-colors"
                      >
                        <svg className="w-4 h-4 text-purple-400 transform group-hover/item:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="group-hover/item:translate-x-1 transition-transform">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;