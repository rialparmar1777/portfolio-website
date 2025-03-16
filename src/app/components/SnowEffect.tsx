'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SnowEffect = () => {
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    size: number; 
    delay: number;
    duration: number;
    xMovement: number;
  }>>([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.2)',
          }}
          animate={{
            y: ['0vh', '100vh'],
            x: [
              `${particle.x}%`,
              `${particle.x + particle.xMovement}%`,
              `${particle.x}%`,
              `${particle.x - particle.xMovement}%`,
              `${particle.x}%`,
            ],
          }}
          transition={{
            y: {
              duration: particle.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: particle.delay,
            },
            x: {
              duration: particle.duration * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            },
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect; 