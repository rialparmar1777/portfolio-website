'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterTextProps {
  words: string[];
  className?: string;
}

const TypewriterText = ({ words, className = '' }: TypewriterTextProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDuration = 2000;

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        return;
      }

      const deleteTimer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
      return () => clearTimeout(deleteTimer);
    }

    if (currentText === words[currentWordIndex]) {
      setIsPaused(true);
      return;
    }

    const typeTimer = setTimeout(() => {
      setCurrentText(words[currentWordIndex].slice(0, currentText.length + 1));
    }, typeSpeed);
    return () => clearTimeout(typeTimer);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, isClient]);

  if (!isClient) {
    return <div className={className}>{words[0]}</div>;
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {currentText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-1 h-4 ml-1 bg-current align-middle"
          />
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default TypewriterText; 