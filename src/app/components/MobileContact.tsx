'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram, FaPaperPlane, FaEnvelope, FaUser, FaAt, FaHeading, FaComment, FaArrowUp, FaCheck, FaSpinner, FaHeart, FaStar, FaRocket } from 'react-icons/fa';
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
  const { getTextColor, getBackgroundColor, getBorderColor, isDark } = useThemeStyles();
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    }
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

  // Decorative elements for the background
  const decorativeElements = [
    { icon: <FaHeart className="w-4 h-4" />, color: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)', top: '10%', left: '5%' },
    { icon: <FaStar className="w-4 h-4" />, color: isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.05)', top: '15%', right: '10%' },
    { icon: <FaRocket className="w-4 h-4" />, color: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)', bottom: '20%', left: '15%' },
    { icon: <FaPaperPlane className="w-4 h-4" />, color: isDark ? 'rgba(147, 51, 234, 0.1)' : 'rgba(147, 51, 234, 0.05)', bottom: '10%', right: '5%' }
  ];

  return (
    <div 
      ref={containerRef}
      className="h-full flex flex-col overflow-y-auto relative"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {decorativeElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ 
              top: element.top, 
              left: element.left, 
              right: element.right,
              bottom: element.bottom,
              color: element.color
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2 + index * 0.5, 
              repeat: Infinity, 
              repeatType: "reverse",
              delay: index * 0.2
            }}
          >
            {element.icon}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div 
        className="sticky top-0 z-10 px-4 py-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          background: getBackgroundColor('paper'),
          borderBottom: `1px solid ${getBorderColor('light')}`,
          boxShadow: isDark 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute -top-2 -left-2 w-16 h-16 rounded-full opacity-20"
            style={{ 
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%)',
              filter: 'blur(10px)'
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text relative z-10">
            Let's Connect
          </h2>
          <p className="text-sm text-center mt-2" style={{ color: getTextColor('secondary') }}>
            Have an exciting project in mind? I'd love to hear about it!
          </p>
        </div>
      </motion.div>
      
      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-6 relative z-10">
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: isDark 
                  ? `0 10px 25px -5px ${link.accentColor}` 
                  : `0 10px 25px -5px ${link.accentColor}`
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredLink(link.name)}
              onHoverEnd={() => setHoveredLink(null)}
              className="relative"
            >
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div 
                  className="p-4 rounded-xl flex items-center gap-3 h-full relative overflow-hidden"
                  style={{ 
                    background: getBackgroundColor('paper'),
                    border: `1px solid ${getBorderColor('light')}`,
                    boxShadow: isDark 
                      ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
                      : '0 4px 12px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0"
                    style={{ 
                      background: `radial-gradient(circle at center, ${link.accentColor} 0%, transparent 70%)`,
                      zIndex: 0
                    }}
                    animate={{ 
                      opacity: hoveredLink === link.name ? 0.5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div 
                    className={`p-3 rounded-lg bg-gradient-to-br ${link.color} text-white relative z-10`}
                    style={{
                      boxShadow: hoveredLink === link.name 
                        ? `0 0 15px ${link.accentColor}` 
                        : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {link.icon}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-sm font-semibold" style={{ color: getTextColor('primary') }}>
                      {link.name}
                    </h3>
                    <p className="text-xs" style={{ color: getTextColor('secondary') }}>
                      {link.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative"
        >
          {/* Decorative background for form */}
          <motion.div
            className="absolute -inset-1 rounded-xl opacity-30"
            style={{ 
              background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5))',
              filter: 'blur(10px)',
              zIndex: -1
            }}
            animate={{ 
              opacity: [0.2, 0.3, 0.2],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div 
            className="p-5 rounded-xl relative"
            style={{ 
              background: getBackgroundColor('paper'),
              border: `1px solid ${getBorderColor('light')}`,
              boxShadow: isDark 
                ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
                : '0 8px 32px rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg" style={{ background: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)' }}>
                <FaPaperPlane className="w-4 h-4" style={{ color: isDark ? '#60A5FA' : '#3B82F6' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: getTextColor('primary') }}>
                Send me a message
              </h3>
            </div>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {formFields.map((field) => (
                <div key={field.name}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-md" style={{ background: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)' }}>
                      {field.icon}
                    </div>
                    <label className="text-sm font-medium" style={{ color: getTextColor('primary') }}>
                      {field.label}
                    </label>
                  </div>
                  <div 
                    className="relative"
                    style={{
                      border: `1px solid ${activeField === field.name 
                        ? isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)' 
                        : getBorderColor('light')}`,
                      borderRadius: '0.75rem',
                      boxShadow: activeField === field.name
                        ? isDark 
                          ? '0 0 0 2px rgba(59, 130, 246, 0.2), 0 4px 12px rgba(0, 0, 0, 0.2)' 
                          : '0 0 0 2px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)'
                        : isDark 
                          ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
                          : '0 4px 12px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      onFocus={() => handleFocus(field.name)}
                      onBlur={handleBlur}
                      required
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-lg outline-none"
                      style={{ 
                        background: getBackgroundColor('default'),
                        color: getTextColor('primary'),
                      }}
                    />
                    {activeField === field.name && (
                      <motion.div
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        style={{ 
                          border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`,
                          boxShadow: `0 0 10px ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'}`
                        }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </div>
              ))}
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-md" style={{ background: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)' }}>
                    <FaComment className="w-4 h-4" />
                  </div>
                  <label className="text-sm font-medium" style={{ color: getTextColor('primary') }}>
                    Message
                  </label>
                </div>
                <div 
                  className="relative"
                  style={{
                    border: `1px solid ${activeField === 'message' 
                      ? isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)' 
                      : getBorderColor('light')}`,
                    borderRadius: '0.75rem',
                    boxShadow: activeField === 'message'
                      ? isDark 
                        ? '0 0 0 2px rgba(59, 130, 246, 0.2), 0 4px 12px rgba(0, 0, 0, 0.2)' 
                        : '0 0 0 2px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)'
                      : isDark 
                        ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
                        : '0 4px 12px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    required
                    placeholder="Your message here..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg resize-none outline-none"
                    style={{ 
                      background: getBackgroundColor('default'),
                      color: getTextColor('primary'),
                    }}
                  />
                  {activeField === 'message' && (
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{ 
                        border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`,
                        boxShadow: `0 0 10px ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'}`
                      }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              </div>
              
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 relative overflow-hidden"
                  style={{ 
                    background: isSuccess 
                      ? 'linear-gradient(to right, #10B981, #059669)' 
                      : 'linear-gradient(to right, #3B82F6, #8B5CF6)',
                    boxShadow: isDark 
                      ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                      : '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: isDark 
                      ? '0 6px 16px rgba(0, 0, 0, 0.4)' 
                      : '0 6px 16px rgba(0, 0, 0, 0.15)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0"
                    style={{ 
                      background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
                      zIndex: 1
                    }}
                    animate={{ 
                      opacity: isSubmitting || isSuccess ? 0 : [0, 0.5, 0],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="w-4 h-4 animate-spin inline mr-2" />
                        <span>Sending...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <FaCheck className="w-4 h-4 inline mr-2" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="w-4 h-4 inline mr-2" />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-20 right-4 p-3 rounded-full z-50"
            style={{ 
              background: isDark 
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8))' 
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9))',
              boxShadow: isDark 
                ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                : '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: isDark 
                ? '0 6px 16px rgba(0, 0, 0, 0.4)' 
                : '0 6px 16px rgba(0, 0, 0, 0.25)'
            }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp size={16} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileContact; 