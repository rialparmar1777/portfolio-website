'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("1wGoxATqiQHzAPMB_");
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    
    try {
      const result = await emailjs.sendForm(
        'rialparmar1777',
        'template_ra1w7ot',
        formRef.current,
        '1wGoxATqiQHzAPMB_'
      );

      if (result.text === 'OK') {
        setSubmitStatus('success');
        setFormData({ from_name: '', reply_to: '', subject: '', message: '' });
        toast.success('Message sent successfully! I will get back to you soon.');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Email error:', error);
      setSubmitStatus('error');
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: <MdEmail className="w-8 h-8" />,
      href: 'mailto:rialparmar007@gmail.com',
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-8 h-8" />,
      href: 'https://www.linkedin.com/in/rial-p-886b38145/',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'GitHub',
      icon: <FaGithub className="w-8 h-8" />,
      href: 'https://github.com/rialparmar1777',
      color: 'from-gray-600 to-gray-800'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-8 h-8" />,
      href: 'https://www.instagram.com/r.i.a.l_p.a.r.m.a.r/',
      color: 'from-pink-500 to-purple-500'
    }
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen relative overflow-hidden py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(124, 58, 237, 0.15) 0%, rgba(0, 0, 0, 0) 50%)`
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Let's Connect
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Have an exciting project in mind? Let's bring your ideas to life!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Social Links */}
          <motion.div 
            className="lg:col-span-4 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
            }}
          >
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={controls}
                variants={{
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    transition: { delay: 0.3 + index * 0.1 } 
                  }
                }}
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className={`
                    relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-lg
                    p-4 sm:p-6 border border-white/10 transition-all duration-300
                    hover:border-white/20 hover:bg-white/10
                  `}>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`
                        p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${link.color}
                        transform transition-transform duration-300
                        group-hover:scale-110 group-hover:rotate-3
                      `}>
                        {link.icon}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white">{link.name}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">Connect with me</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4 } }
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl sm:rounded-3xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="from_name" className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Name</label>
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/90 border border-white/10 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black placeholder-gray-500 text-sm sm:text-base"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="reply_to" className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Email</label>
                      <input
                        type="email"
                        id="reply_to"
                        name="reply_to"
                        value={formData.reply_to}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/90 border border-white/10 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black placeholder-gray-500 text-sm sm:text-base"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/90 border border-white/10 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black placeholder-gray-500 text-sm sm:text-base"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/90 border border-white/10 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-black placeholder-gray-500 text-sm sm:text-base"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl text-white font-medium text-sm sm:text-base
                      bg-gradient-to-r from-purple-500 to-pink-500
                      hover:from-purple-600 hover:to-pink-600
                      transition-all duration-300 relative overflow-hidden
                      ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
                    `}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    <div className="absolute inset-0 -translate-x-full hover:translate-x-0 bg-gradient-to-r from-pink-500 to-purple-500 transition-transform duration-300" />
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add shimmer animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @media (max-width: 768px) {
          /* Improve tap targets */
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
          /* Adjust form spacing */
          .space-y-4 > * + * {
            margin-top: 1rem;
          }
          /* Optimize input fields */
          input, textarea {
            font-size: 16px; /* Prevent zoom on iOS */
          }
        }
      `}</style>
    </div>
  );
};

export default Contact; 