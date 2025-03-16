'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useAnimation } from 'framer-motion';
import Link from 'next/link';

const NavLink = ({ href, text, delay = 0 }: { href: string; text: string; delay?: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Initial swing animation
    controls.start({
      rotate: [0, 2, -2, 1.5, -1.5, 0],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        delay: delay // Offset each link's animation
      }
    });
  }, [controls, delay]);

  const stringVariants = {
    initial: { 
      height: "2rem",
      background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)"
    },
    hover: { 
      height: "2.5rem",
      background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)",
      transition: { duration: 0.3 }
    }
  };

  const boxVariants = {
    initial: { y: 0 },
    hover: { 
      y: [0, -5, 5, -3, 0],
      rotate: [0, 15, -15, 10, -5, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  return (
    <div className="relative pt-10 px-2">
      {/* String */}
      <motion.div 
        className="absolute top-0 left-1/2 w-[1px] origin-top"
        initial="initial"
        animate={{
          scaleY: [1, 1.02, 0.98, 1],
          transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
        whileHover="hover"
        variants={stringVariants}
        style={{ 
          background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)",
          transformOrigin: "top"
        }}
      />
      
      {/* Knot */}
      <motion.div
        className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-white/40 shadow-glow"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="relative"
        animate={controls}
        onHoverStart={() => {
          setIsHovered(true);
          controls.stop();
          controls.start("hover");
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          controls.start({
            rotate: [0, 2, -2, 1.5, -1.5, 0],
            transition: {
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: delay
            }
          });
        }}
        variants={boxVariants}
        style={{ 
          originX: 0.5,
          originY: 0,
          transformStyle: 'preserve-3d'
        }}
      >
        <Link href={href} className="relative block no-underline">
          <motion.div
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                       border-2 border-white/20 backdrop-blur-sm shadow-lg
                       hover:from-purple-500/30 hover:to-pink-500/30 hover:border-white/30
                       transition-colors duration-300"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <span className="relative z-10 text-white font-medium text-lg">
              {text}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-0 hover:opacity-10 transition-opacity duration-300"
            />
          </motion.div>
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-lg"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror"
              }
            }}
          />
        </Link>
      </motion.div>
    </div>
  );
};

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-36">
          <div className="hidden md:flex items-center gap-20">
            <NavLink href="#home" text="Home" delay={0} />
            <NavLink href="#about" text="About" delay={0.1} />
            <NavLink href="#projects" text="Projects" delay={0.2} />
            <NavLink href="#contact" text="Contact" delay={0.3} />
          </div>

          <motion.div
            className="md:hidden"
            whileTap={{ scale: 0.95 }}
          >
            <button className="text-white p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="md:hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-8 sm:px-3">
          <NavLink href="#home" text="Home" delay={0} />
          <NavLink href="#about" text="About" delay={0.1} />
          <NavLink href="#projects" text="Projects" delay={0.2} />
          <NavLink href="#contact" text="Contact" delay={0.3} />
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar; 