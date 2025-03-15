import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setTrailPositions(prev => {
        const newPositions = [...prev, { x: e.clientX, y: e.clientY }];
        if (newPositions.length > 5) newPositions.shift();
        return newPositions;
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      />
      {trailPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="cursor-trail"
          initial={{ scale: 0 }}
          animate={{
            x: pos.x - 4,
            y: pos.y - 4,
            scale: 1 - (i * 0.2),
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 10
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor; 