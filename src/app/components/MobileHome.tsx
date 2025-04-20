'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MobileLayout from './MobileLayout';
import MobileHero from './MobileHero';
import MobileAbout from './MobileAbout';
import MobileExperience from './MobileExperience';
import MobileProjects from './MobileProjects';
import MobileContact from './MobileContact';

const MobileHome: React.FC = () => {
  return (
    <MobileLayout>
      <div className="space-y-16">
        {/* Hero Section */}
        <section id="home" className="min-h-[80vh] flex items-center">
          <MobileHero />
        </section>
        
        {/* About Section */}
        <section id="about" className="py-8">
          <MobileAbout />
        </section>
        
        {/* Experience Section */}
        <section id="experience" className="py-8">
          <MobileExperience />
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="py-8">
          <MobileProjects />
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-8">
          <div className="h-full">
            <MobileContact />
          </div>
        </section>
      </div>
    </MobileLayout>
  );
};

export default MobileHome; 