'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import ContactForm from './components/ContactForm';
import Navbar from './components/Navbar';
import SnowEffect from './components/SnowEffect';
import TypewriterText from './components/TypewriterText';
import PageTransition from './components/PageTransition';
import { motion } from 'framer-motion';

// Animation variants for sections
const sectionVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.95,
    transition: {
      duration: 0.4,
    },
  },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDownloading, setIsDownloading] = useState(false);
  const [showInitialTransition, setShowInitialTransition] = useState(true);

  useEffect(() => {
    // Remove initial transition after it completes
    const timer = setTimeout(() => {
      setShowInitialTransition(false);
    }, 2500); // Match this with the total duration of your transition

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownload = async () => {
    if (isDownloading) return; // Prevent multiple clicks
    
    setIsDownloading(true);
    try {
      const response = await fetch('/Resume.docx');
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Resume.docx';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      // Keep the downloading state for a minimum duration
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        .downloading .document-path {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .downloading .arrow-path {
          opacity: 1;
          transition: opacity 0.3s ease;
        }
      `}</style>

      <PageTransition isTransitioning={showInitialTransition}>
        <CustomCursor />
        <AnimatedBackground />
        <SnowEffect />
        <Navbar onNavigate={handleNavigation} />
        
        <div className="min-h-screen">
          {/* Hero Section */}
          <motion.section 
            id="home"
            variants={sectionVariants}
            initial="initial"
            animate={activeSection === 'home' ? "animate" : "initial"}
            exit="exit"
            className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden py-20"
          >
            {/* Background Decorative Elements */}
            <motion.div 
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto w-full relative z-10">
              {/* Text Content */}
              <motion.div 
                className="text-center lg:text-left lg:flex-1 max-w-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative mb-8">
                  <motion.span
                    className="absolute -top-10 left-0 lg:left-2 text-base lg:text-lg text-purple-400/80 font-mono"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Hello, I'm
                  </motion.span>
                  <motion.h1 
                    className="text-7xl lg:text-9xl font-bold gradient-text relative"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    Rial Parmar
                    <motion.span 
                      className="absolute -bottom-3 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-blue-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </motion.h1>
                </div>

                <motion.div 
                  className="text-2xl lg:text-3xl text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <TypewriterText />
                </motion.div>

                {/* Professional Summary */}
                <motion.p
                  className="text-lg text-gray-300/90 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  An Accomplished Full Stack Developer with expertise in both Front-End and Back-End Technologies.

Proficient in modern web frameworks and database management, with a track record of delivering high-performance, scalable websites and applications.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="flex flex-wrap gap-6 justify-center lg:justify-start"
                >
                  <motion.a 
                    href="#projects"
                    onClick={(e) => handleNavigation(e, 'projects')}
                    className="group relative px-8 py-4 text-lg rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 text-white font-semibold overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">View Projects</span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </motion.a>
                  <motion.a 
                    href="#contact"
                    onClick={(e) => handleNavigation(e, 'contact')}
                    className="group relative px-8 py-4 text-lg rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 text-white font-semibold overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Contact Me</span>
                    <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </motion.a>
                  
                  {/* Download CV Dropdown */}
                  <motion.div className="relative group">
                    <motion.button 
                      className="group relative px-8 py-4 text-lg rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white font-semibold overflow-hidden flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Download CV
                        <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="bg-black/50 backdrop-blur-xl rounded-xl p-2 space-y-2 border border-white/10 shadow-xl">
                        <motion.a 
                          href="/resume.pdf"
                          download="Resume.pdf"
                          className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 group/item"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="p-2 bg-purple-500/20 rounded-lg group-hover/item:bg-purple-500/30 transition-colors duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold">PDF Format</div>
                            <div className="text-sm text-gray-400">Best for viewing</div>
                          </div>
                        </motion.a>
                        <motion.a 
                          href="/Resume.docx"
                          download="Resume.docx"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsDownloading(true);
                            const link = document.createElement('a');
                            link.href = '/Resume.docx';
                            link.download = 'Resume.docx';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            setTimeout(() => setIsDownloading(false), 2000);
                          }}
                          className={`flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 group/item relative overflow-hidden ${isDownloading ? 'downloading' : ''}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="p-2 bg-blue-500/20 rounded-lg group-hover/item:bg-blue-500/30 transition-colors duration-200 relative">
                            <motion.svg 
                              className="w-5 h-5" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                              animate={isDownloading ? {
                                rotate: 360,
                                transition: {
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear"
                                }
                              } : {}}
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 15V3m0 12l-4-4m4 4l4-4M3 17v4h18v-4" 
                                className={isDownloading ? "opacity-100" : "opacity-0"}
                              />
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                                className={isDownloading ? "opacity-0" : "opacity-100"}
                              />
                            </motion.svg>
                            {isDownloading && (
                              <motion.div
                                className="absolute inset-0 bg-blue-500/30 rounded-lg"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                                style={{ transformOrigin: 'bottom' }}
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold flex items-center gap-2">
                              Word Format
                              {isDownloading && (
                                <motion.div
                                  className="w-1 h-1 rounded-full bg-blue-400"
                                  animate={{
                                    opacity: [0, 1, 0],
                                    scale: [1, 1.5, 1]
                                  }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                />
                              )}
                            </div>
                            <div className="text-sm text-gray-400">
                              {isDownloading ? 'Downloading...' : 'Best for editing'}
                            </div>
                          </div>
                          <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: "0%" }}
                            animate={isDownloading ? { width: "100%" } : { width: "0%" }}
                            transition={{ duration: 1.5 }}
                          />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Profile Picture */}
              <motion.div 
                className="relative lg:flex-1 w-full max-w-md flex justify-center items-center mt-16 lg:mt-24"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  className="relative w-[320px] h-[320px] rounded-full"
                  whileHover={{ scale: 1.02 }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <div className="relative w-full h-full rounded-full overflow-hidden backdrop-blur-sm">
                      <Image
                        src="/images/ProfilePicture.jpeg"
                        alt="Rial Parmar"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500"
                        priority
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* About Section */}
          <motion.section 
            id="about"
            variants={sectionVariants}
            initial="initial"
            animate={activeSection === 'about' ? "animate" : "initial"}
            exit="exit"
            className="min-h-screen flex items-center justify-center py-20 px-4"
          >
            <div className="max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">About Me</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                I am a passionate developer and designer who loves creating immersive digital experiences.
                With expertise in modern web technologies and creative design, I bring ideas to life through
                code and animation.
              </p>
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section 
            id="projects"
            variants={sectionVariants}
            initial="initial"
            animate={activeSection === 'projects' ? "animate" : "initial"}
            exit="exit"
            className="min-h-screen py-20 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 gradient-text text-center">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Project Cards */}
                <motion.div 
                  className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-2xl font-bold mb-4">Project 1</h3>
                  <p className="text-gray-300">Description of your amazing project goes here.</p>
                </motion.div>
                {/* Add more project cards as needed */}
              </div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section 
            id="contact"
            variants={sectionVariants}
            initial="initial"
            animate={activeSection === 'contact' ? "animate" : "initial"}
            exit="exit"
            className="min-h-screen flex items-center justify-center py-20 px-4"
          >
            <div className="max-w-4xl w-full">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 gradient-text text-center">Get in Touch</h2>
              <ContactForm />
            </div>
          </motion.section>
        </div>
      </PageTransition>
    </>
  );
}
