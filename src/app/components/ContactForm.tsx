import { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        timestamp: new Date().toISOString()
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <motion.input 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-white"
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>
      <div>
        <motion.input 
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-white"
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>
      <div>
        <motion.textarea 
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          required
          rows={6}
          className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-white"
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>
      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        className={`w-full py-4 rounded-lg font-bold text-lg ${
          status === 'submitting' 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-500 to-blue-500'
        } text-white`}
        whileHover={{ scale: status !== 'submitting' ? 1.02 : 1 }}
        whileTap={{ scale: status !== 'submitting' ? 0.98 : 1 }}
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </motion.button>

      {/* Status Messages */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-500 text-center"
        >
          Message sent successfully!
        </motion.div>
      )}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-center"
        >
          Error sending message. Please try again.
        </motion.div>
      )}
    </form>
  );
};

export default ContactForm; 