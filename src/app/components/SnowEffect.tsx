'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SnowEffect = () => {
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    size: number; 
    delay: number;
    duration: number;
    xMovement: number;
  }>>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Create particles with more varied properties for smoother effect
      const newParticles = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 2 + 1.5, // Size between 1.5-3.5px for smoother look
        delay: Math.random() * 10, // Shorter initial delay for quicker start
        duration: Math.random() * 5 + 10, // Duration between 10-15s
        xMovement: Math.random() * 10 + 5, // Random movement range for natural flow
      }));
      setParticles(newParticles);
    }
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-0 bg-white rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
          }}
          animate={{
            y: ['0vh', '100vh'],
            x: [
              `${particle.x}%`,
              `${particle.x + particle.xMovement}%`,
              `${particle.x - particle.xMovement}%`,
              `${particle.x}%`,
            ],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            y: {
              duration: particle.duration,
              repeat: Infinity,
              ease: 'linear',
            },
            x: {
              duration: particle.duration * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            opacity: {
              duration: particle.duration,
              repeat: Infinity,
              ease: 'linear',
            },
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect; 