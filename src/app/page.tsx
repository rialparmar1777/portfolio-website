'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStyles } from './hooks/useThemeStyles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import PageTransition from './components/PageTransition';
import MobileHome from './components/MobileHome';
import { Toaster } from 'react-hot-toast';
import DynamicScroll from './components/DynamicScroll';

const MainContent = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const { getBackgroundColor, getTextColor, getBorderColor } = useThemeStyles();
  
  useEffect(() => {
    setIsClient(true);
    
    // Check if there's a hash in the URL and navigate to that section
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'about', 'experience', 'projects', 'contact'].includes(hash)) {
      setActiveSection(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } else {
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }

    // Check for mobile screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const offset = window.scrollY;
          
          if (top + offset <= scrollPosition && bottom + offset >= scrollPosition) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  
  const handleNavigation = (section: string) => {
    if (!isClient) return;

    if (section === 'home') {
      // Special handling for home section
      scrollToTop();
      setActiveSection('home');
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', '#home');
      }
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(section);
        if (typeof window !== 'undefined') {
          window.history.pushState(null, '', `#${section}`);
        }
      }
    }
  };
  
  const handleDownloadResume = async () => {
    setIsDownloading(true);
    try {
      // Add your resume download logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated download
      if (typeof window !== 'undefined') {
        window.open('/Resume.pdf', '_blank');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
    } finally {
      setIsDownloading(false);
    }
  };
  
  if (!isClient) {
    return null;
  }

  return (
    <PageTransition>
      {isMobile ? (
        <MobileHome />
      ) : (
        <main
          ref={mainRef}
          className="min-h-screen"
          style={{ background: getBackgroundColor('default') }}
        >
          <Navbar
            onNavigate={handleNavigation}
            activeSection={activeSection}
            onDownloadResume={handleDownloadResume}
            isDownloading={isDownloading}
          />
          
          <div className="pt-16">
            {/* Hero Section */}
            <section id="home" className="min-h-screen relative z-10">
              <Hero />
            </section>
            
            {/* About Section */}
            <section id="about" className="min-h-screen py-10 relative z-0">
              <DynamicScroll direction="up" threshold={0.2} className="about">
                <About />
              </DynamicScroll>
            </section>
            
            {/* Experience Section */}
            <section id="experience" className="min-h-screen py-10 relative z-0">
              <DynamicScroll direction="down" threshold={0.2} className="experience">
                <Experience />
              </DynamicScroll>
            </section>
            
            {/* Projects Section */}
            <section id="projects" className="min-h-screen py-10 relative z-0">
              <DynamicScroll direction="up" threshold={0.2} className="projects">
                <Projects />
              </DynamicScroll>
            </section>
            
            {/* Contact Section */}
            <section id="contact" className="min-h-screen py-10 relative z-0">
              <DynamicScroll direction="down" threshold={0.2} className="contact">
                <Contact />
              </DynamicScroll>
            </section>
          </div>
          
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: getBackgroundColor('paper'),
                color: getTextColor('primary'),
                border: `1px solid ${getBorderColor('light')}`,
              },
            }}
          />
        </main>
      )}
    </PageTransition>
  );
};

export default function Home() {
  return <MainContent />;
}