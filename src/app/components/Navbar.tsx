'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useAnimation, AnimatePresence } from 'framer-motion';

interface NavLinkProps {
  href: string;
  text: string;
  delay?: number;
  isMobile?: boolean;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
  onClick?: () => void;
}

const NavLink = ({ href, text, delay = 0, isMobile = false, onNavigate, onClick }: NavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!isMobile) {
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
    }
  }, [controls, delay, isMobile]);

  const sectionId = href.replace('#', '');

  const stringVariants = {
    initial: { 
      height: isMobile ? "0" : "2rem",
      background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)"
    },
    hover: { 
      height: isMobile ? "0" : "2.5rem",
      background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)",
      transition: { duration: 0.3 }
    }
  };

  const boxVariants = {
    initial: { y: 0 },
    hover: { 
      y: isMobile ? 0 : [0, -5, 5, -3, 0],
      rotate: isMobile ? 0 : [0, 15, -15, 10, -5, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const mobileStyles = isMobile ? {
    width: "100%",
    padding: "1rem 1.5rem",
    marginBottom: "0.5rem",
    borderRadius: "1rem",
    background: "linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15))",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  } : {};

  return (
    <div className={`relative ${isMobile ? 'pt-0 w-full' : 'pt-10'} px-2`}>
      {!isMobile && (
        <>
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
        </>
      )}
      
      <motion.div
        className="relative"
        animate={controls}
        onHoverStart={() => {
          setIsHovered(true);
          if (!isMobile) controls.stop();
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          if (!isMobile) {
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
          }
        }}
        variants={boxVariants}
        style={{ 
          originX: 0.5,
          originY: 0,
          transformStyle: 'preserve-3d',
          ...mobileStyles
        }}
      >
        <motion.a
          href={href}
          onClick={(e) => {
            onNavigate(e, sectionId);
            onClick?.();
          }}
          className="relative block no-underline"
        >
          <motion.div
            className={`
              px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 
              border border-white/20 backdrop-blur-sm shadow-lg
              hover:from-purple-500/30 hover:to-pink-500/30 hover:border-white/30
              transition-colors duration-300
              ${isMobile ? 'w-full text-center text-lg' : ''}
            `}
            whileHover={{
              scale: isMobile ? 1.02 : 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 text-white font-medium text-lg">
              {text}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-0 hover:opacity-10 transition-opacity duration-300"
            />
          </motion.div>
          {!isMobile && (
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
          )}
        </motion.a>
      </motion.div>
    </div>
  );
};

interface NavbarProps {
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false);
    } else {
      setHidden(false);
    }
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-center h-20 sm:h-36">
          <div className="hidden md:flex items-center gap-20">
            <NavLink href="#home" text="Home" delay={0} onNavigate={onNavigate} />
            <NavLink href="#about" text="About" delay={0.1} onNavigate={onNavigate} />
            <NavLink href="#projects" text="Projects" delay={0.2} onNavigate={onNavigate} />
            <NavLink href="#contact" text="Contact" delay={0.3} onNavigate={onNavigate} />
          </div>

          <motion.button
            className="md:hidden menu-button relative z-50 p-2.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-6 h-6 relative"
              animate={isOpen ? "open" : "closed"}
            >
              <motion.span
                className="absolute top-0 left-0 w-full h-0.5 bg-white rounded-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 10 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-white rounded-full"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -10 }
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden mobile-menu fixed inset-0 top-20 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-xl z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div 
              className="px-6 pt-8 pb-12 h-full flex flex-col items-center justify-start gap-4"
              variants={menuVariants}
            >
              <NavLink 
                href="#home" 
                text="Home" 
                delay={0} 
                isMobile 
                onNavigate={onNavigate} 
                onClick={() => setIsOpen(false)}
              />
              <NavLink 
                href="#about" 
                text="About" 
                delay={0.1} 
                isMobile 
                onNavigate={onNavigate} 
                onClick={() => setIsOpen(false)}
              />
              <NavLink 
                href="#projects" 
                text="Projects" 
                delay={0.2} 
                isMobile 
                onNavigate={onNavigate} 
                onClick={() => setIsOpen(false)}
              />
              <NavLink 
                href="#contact" 
                text="Contact" 
                delay={0.3} 
                isMobile 
                onNavigate={onNavigate} 
                onClick={() => setIsOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 