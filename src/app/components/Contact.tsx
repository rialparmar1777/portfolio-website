'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
import { useThemeStyles } from '@/app/hooks/useThemeStyles';
import GlassCard from './GlassCard';

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getTextColor } = useThemeStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Initialize EmailJS
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
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
        toast.success('Message sent successfully! I will get back to you soon.');
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
    <section 
      id="contact"
      ref={containerRef}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Let's Connect
          </h2>
          <p className="text-lg" style={{ color: getTextColor('secondary') }}>
            Have an exciting project in mind? Let's bring your ideas to life!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Social Links */}
          <motion.div
            className="lg:col-span-4 space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <GlassCard className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${link.color}`}>
                        {link.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold" style={{ color: getTextColor('primary') }}>
                          {link.name}
                        </h3>
                        <p className="text-sm" style={{ color: getTextColor('secondary') }}>
                          Connect with me
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlassCard className="p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: getTextColor('primary') }}>
                      Name
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      style={{ color: getTextColor('primary') }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: getTextColor('primary') }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="reply_to"
                      value={formData.reply_to}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      style={{ color: getTextColor('primary') }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: getTextColor('primary') }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    style={{ color: getTextColor('primary') }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: getTextColor('primary') }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors resize-none"
                    style={{ color: getTextColor('primary') }}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 