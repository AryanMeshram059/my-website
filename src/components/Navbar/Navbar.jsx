import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { throttle, createOptimizedObserver } from '../../utils/performance'

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // Optimized scroll handler using performance utils
  const handleScroll = useCallback(
    throttle(() => {
      setScrolled(window.scrollY > 50);
    }, 16),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll])

  useEffect(() => {
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');

      const observer = createOptimizedObserver(
        (entry) => {
          setActiveSection(entry.target.id);
        },
        {
          threshold: [0.1, 0.5],
          rootMargin: '-20% 0px -20% 0px'
        }
      );

      sections.forEach(section => observer.observe(section));
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [])

  const handleNavClick = useCallback((sectionId) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-btn')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);



  return (
    <>
      <motion.nav 
        className={`fixed top-2 left-1/2 -translate-x-1/2 z-30 w-[98%] max-w-none transition-all duration-300 ${
          scrolled ? 'glass backdrop-blur-xl' : 'bg-transparent'
        } rounded-2xl px-4 py-2`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between h-12">
          {/* Logo/Home */}
          <motion.button
            onClick={() => handleNavClick('home')}
            className={`relative space-grotesk px-4 py-2 rounded-xl transition-all duration-300 ${
              activeSection === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeSection === 'home' && (
              <motion.div
                className="absolute inset-0 glass rounded-xl border border-white/20"
                layoutId="activeNavItem"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 font-semibold">Home</span>
          </motion.button>

          {/* Hamburger for mobile */}
          <button
            className="hamburger-btn md:hidden inline-flex items-center justify-center p-2 rounded-xl text-white hover:text-yellow-400 focus:outline-none transition-colors duration-200"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.div
              animate={menuOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                className="w-6 h-0.5 bg-current block"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 2 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-current block mt-1"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-current block mt-1"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -2 }
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </button>
          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-2'>
            {[
              { id: 'aboutme', label: 'About Me' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative space-grotesk px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeSection === item.id && (
                  <motion.div
                    className="absolute inset-0 glass rounded-xl border border-white/20"
                    layoutId="activeNavItem"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-menu fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass backdrop-blur-xl z-40 rounded-2xl overflow-hidden md:hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="py-4">
              {[
                { id: 'aboutme', label: 'About Me' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full py-4 px-6 text-left text-lg font-medium transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'text-yellow-400 bg-white/5' 
                      : 'text-white hover:text-yellow-400 hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar