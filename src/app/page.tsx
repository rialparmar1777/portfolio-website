'use client';

import { useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import ContactForm from './components/ContactForm';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <AnimatedBackground />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="h-screen flex items-center justify-center relative"
        >
          <div className="text-center">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold gradient-text mb-6"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              Rial Parmar
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Junior Software Developer & Designer
            </motion.p>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section 
          className="min-h-screen flex items-center justify-center py-20 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
          className="min-h-screen py-20 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
          className="min-h-screen flex items-center justify-center py-20 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 gradient-text text-center">Get in Touch</h2>
            <ContactForm />
          </div>
        </motion.section>
      </div>
    </>
  );
}
