'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll, useTransform as useTransformScroll } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram, FaPaperPlane, FaEnvelope, FaUser, FaAt, FaHeading, FaComment, FaArrowUp, FaCheck, FaSpinner, FaHeart, FaStar, FaRocket, FaCode, FaBrain, FaEye } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
import { useThemeStyles } from '../hooks/useThemeStyles';

const MobileContact = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number, delay: number, icon: React.ReactNode}>>([]);
  const { getTextColor, getBackgroundColor, getBorderColor, isDark } = useThemeStyles();
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    }
  }, []);

  // Enhanced floating elements
  useEffect(() => {
    const icons = [<FaCode />, <FaRocket />, <FaStar />, <FaHeart />, <FaBrain />, <FaEye />];
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      icon: icons[i % icons.length]
    }));
    setFloatingElements(elements);
  }, []);

  // Handle scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const position = containerRef.current.scrollTop;
        setShowScrollTop(position > 300);
      }
    };
    
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    
    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );

      if (result.text === 'OK') {
        setFormData({ from_name: '', reply_to: '', subject: '', message: '' });
        setIsSuccess(true);
        toast.success('Message sent successfully! I will get back to you soon.');
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Email error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: <FaEnvelope className="w-5 h-5" />,
      href: 'mailto:rialparmar007@gmail.com',
      color: isDark ? 'from-red-400 to-orange-400' : 'from-red-500 to-orange-500',
      description: 'Send me an email',
      accentColor: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/in/rial-p-886b38145/',
      color: isDark ? 'from-blue-400 to-blue-500' : 'from-blue-500 to-blue-600',
      description: 'Connect professionally',
      accentColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'
    },
    {
      name: 'GitHub',
      icon: <FaGithub className="w-5 h-5" />,
      href: 'https://github.com/rialparmar1777',
      color: isDark ? 'from-gray-400 to-gray-500' : 'from-gray-600 to-gray-800',
      description: 'Check my code',
      accentColor: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(75, 85, 99, 0.1)'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-5 h-5" />,
      href: 'https://www.instagram.com/r.i.a.l_p.a.r.m.a.r/',
      color: isDark ? 'from-pink-400 to-purple-400' : 'from-pink-500 to-purple-500',
      description: 'Follow my journey',
      accentColor: isDark ? 'rgba(236, 72, 153, 0.2)' : 'rgba(236, 72, 153, 0.1)'
    }
  ];

  const formFields = [
    {
      name: 'from_name',
      label: 'Name',
      icon: <FaUser className="w-4 h-4" />,
      type: 'text',
      placeholder: 'Your name'
    },
    {
      name: 'reply_to',
      label: 'Email',
      icon: <FaAt className="w-4 h-4" />,
      type: 'email',
      placeholder: 'your.email@example.com'
    },
    {
      name: 'subject',
      label: 'Subject',
      icon: <FaHeading className="w-4 h-4" />,
      type: 'text',
      placeholder: 'What is this about?'
    }
  ];

  const floatingVariants = {
    animate: {
      y: [0, -30, 0],
      x: [0, 15, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 8,
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

  return (
    <div 
      ref={containerRef}
      className="h-full flex flex-col overflow-y-auto relative"
    >
      {/* Enhanced Header */}
      <motion.div 
        className="sticky top-0 z-10 px-4 py-3 perspective-1000"
        style={{ 
          background: getBackgroundColor('paper'),
          borderBottom: `1px solid ${getBorderColor('light')}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
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
          Get In Touch
        </motion.h2>
        <p className="text-sm" style={{ color: getTextColor('secondary') }}>
          Let's work together on your next project
        </p>
      </motion.div>

      {/* Enhanced Content */}
      <div className="flex-1 px-4 py-4 relative">
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
          className="relative z-10 space-y-6"
        >
          {/* Enhanced Contact Form */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl backdrop-blur-sm"
            style={{
              background: getBackgroundColor('glass'),
              border: `1px solid ${getBorderColor('light')}`,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: getTextColor('primary') }}>
              <FaPaperPlane className="text-blue-500" />
              Send Message
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {formFields.map((field) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium mb-2" style={{ color: getTextColor('primary') }}>
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <div style={{ color: getTextColor('secondary') }}>
                        {field.icon}
                      </div>
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      onFocus={() => handleFocus(field.name)}
                      onBlur={handleBlur}
                      placeholder={field.placeholder}
                      className="w-full pl-10 pr-4 py-3 rounded-lg text-sm transition-all duration-300"
                      style={{
                        background: getBackgroundColor('default'),
                        color: getTextColor('primary'),
                        border: `2px solid ${activeField === field.name ? '#3b82f6' : getBorderColor('light')}`,
                        boxShadow: activeField === field.name ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none'
                      }}
                      required
                    />
                  </div>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium mb-2" style={{ color: getTextColor('primary') }}>
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <div style={{ color: getTextColor('secondary') }}>
                      <FaComment className="w-4 h-4" />
                    </div>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-sm resize-none transition-all duration-300"
                    style={{
                      background: getBackgroundColor('default'),
                      color: getTextColor('primary'),
                      border: `2px solid ${activeField === 'message' ? '#3b82f6' : getBorderColor('light')}`,
                      boxShadow: activeField === 'message' ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none'
                    }}
                    required
                  />
                </div>
              </motion.div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: isSubmitting 
                    ? 'linear-gradient(135deg, #6b7280, #9ca3af)' 
                    : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
                whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl backdrop-blur-sm"
            style={{
              background: getBackgroundColor('glass'),
              border: `1px solid ${getBorderColor('light')}`,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: getTextColor('primary') }}>
              <FaRocket className="text-purple-500" />
              Connect With Me
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl flex flex-col items-center gap-2 transition-all duration-300"
                  style={{
                    background: getBackgroundColor('default'),
                    border: `1px solid ${getBorderColor('light')}`,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredLink(link.name)}
                  onHoverEnd={() => setHoveredLink(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className={`p-3 rounded-full bg-gradient-to-r ${link.color}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {link.icon}
                  </motion.div>
                  <div className="text-center">
                    <h4 className="font-medium text-sm" style={{ color: getTextColor('primary') }}>
                      {link.name}
                    </h4>
                    <p className="text-xs" style={{ color: getTextColor('secondary') }}>
                      {link.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Success Message */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="p-4 rounded-xl flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white'
                }}
              >
                <FaCheck className="w-5 h-5" />
                <div>
                  <h4 className="font-semibold">Message Sent!</h4>
                  <p className="text-sm opacity-90">I'll get back to you soon.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
    </div>
  );
};

export default MobileContact; 