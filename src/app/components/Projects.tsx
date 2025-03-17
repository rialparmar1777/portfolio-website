'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
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
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl -z-10" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text relative">
          Featured Projects
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A collection of my recent work showcasing my skills in web development and design.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="group relative bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300"
          >
            {/* Project Image */}
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTY3LjIyOUFTRjo/Tj4yMkhiS0hHSUZJPVBVW1xbOEVJW1L/2wBDARUXFx4aHjshITtSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mt-2 line-clamp-2">
                  {project.description}
                </p>
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
            </div>

            {/* Project Content */}
            <div className="p-6 relative">
              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.frontend.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 hover:bg-purple-500/20 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.backend?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              {project.features && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-400 group/item"
                      >
                        <svg className="w-3 h-3 text-purple-400 transform group-hover/item:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="group-hover/item:text-purple-300 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Project Link */}
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group/link relative"
              >
                <span className="relative">
                  View Project
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transform scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left" />
                </span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;