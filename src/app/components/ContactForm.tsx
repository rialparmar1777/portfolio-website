'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div className="relative">
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all duration-300"
            placeholder="Your Name"
          />
          {errors.name && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-0 text-red-400 text-sm"
            >
              {errors.name.message}
            </motion.span>
          )}
        </div>

        {/* Email Field */}
        <div className="relative">
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all duration-300"
            placeholder="Your Email"
          />
          {errors.email && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-0 text-red-400 text-sm"
            >
              {errors.email.message}
            </motion.span>
          )}
        </div>
      </div>

      {/* Subject Field */}
      <div className="relative">
        <input
          {...register('subject', { required: 'Subject is required' })}
          type="text"
          className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all duration-300"
          placeholder="Subject"
        />
        {errors.subject && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-6 left-0 text-red-400 text-sm"
          >
            {errors.subject.message}
          </motion.span>
        )}
      </div>

      {/* Message Field */}
      <div className="relative">
        <textarea
          {...register('message', { required: 'Message is required' })}
          rows={5}
          className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all duration-300 resize-none"
          placeholder="Your Message"
        />
        {errors.message && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-6 left-0 text-red-400 text-sm"
          >
            {errors.message.message}
          </motion.span>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold relative overflow-hidden group transition-all duration-300 ${
          isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-purple-700 hover:to-blue-600'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <motion.svg
                className="w-5 h-5"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </motion.svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </span>
        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </motion.button>
    </motion.form>
  );
};

export default ContactForm; 