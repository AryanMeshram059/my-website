import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function Navbar() {
  const [scrolled, setscrolled] = useState(false);
  const [activesection, setactivesection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handlescroll = () => {
      setscrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handlescroll);

    return () => window.removeEventListener('scroll', handlescroll);
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');

      const observer = new IntersectionObserver(
        entries => {
          // Find the section with the largest intersection ratio
          let maxRatio = 0;
          let activeSection = 'home';

          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              activeSection = entry.target.id;
            }
          });

          // Only update if we found a section with meaningful visibility
          if (maxRatio > 0.1) {
            setactivesection(activeSection);
          }
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: '0px 0px 0px 0px'
        }
      );

      sections.forEach(section => observer.observe(section));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [])

  const handleNavClick = (sectionId) => {
    setactivesection(sectionId);
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }



  return (
    <>
      <div className={`w-full max-w-[99%] h-[10%] flex items-center fixed rounded-lg top-[10px] left-1/2 -translate-x-1/2 z-30 px-2 ${scrolled ? 'glass' : ''}`}>
        {/* Logo/Home */}
        <div className='h-[40px] min-w-[80px] text-white flex items-center justify-center'>
          <motion.button
            onClick={() => handleNavClick('home')}
            className={`relative space-grotesk h-full w-full flex items-center justify-center rounded-lg transition-all duration-300 ${activesection === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activesection === 'home' && (
              <motion.div
                className="absolute inset-0 glass rounded-lg border border-white/20"
                layoutId="activeNavItem"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">Home</span>
          </motion.button>
        </div>
        {/* Hamburger for mobile */}
        <div className="ml-auto flex md:hidden">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-400 focus:outline-none"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Desktop Menu */}
        <div className='w-[50%] flex items-center justify-center relative left-[45%] hidden md:flex'>
          <ul className='flex w-full h-full justify-evenly gap-2'>
            <li className='h-[40px] w-[20%] text-white flex items-center justify-center'>
              <motion.button
                onClick={() => handleNavClick('aboutme')}
                className={`relative space-grotesk h-full w-full flex items-center justify-center rounded-lg transition-all duration-300 ${activesection === 'aboutme' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activesection === 'aboutme' && (
                  <motion.div
                    className="absolute inset-0 glass rounded-lg border border-white/20"
                    layoutId="activeNavItem"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">About Me</span>
              </motion.button>
            </li>
            <li className='h-[40px] w-[20%] text-white flex items-center justify-center'>
              <motion.button
                onClick={() => handleNavClick('projects')}
                className={`relative space-grotesk h-full w-full flex items-center justify-center rounded-lg transition-all duration-300 ${activesection === 'projects' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activesection === 'projects' && (
                  <motion.div
                    className="absolute inset-0 glass rounded-lg border border-white/20"
                    layoutId="activeNavItem"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">Projects</span>
              </motion.button>
            </li>
            <li className='h-[40px] w-[20%] text-white flex items-center justify-center'>
              <motion.button
                onClick={() => handleNavClick('contact')}
                className={`relative space-grotesk h-full w-full flex items-center justify-center rounded-lg transition-all duration-300 ${activesection === 'contact' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activesection === 'contact' && (
                  <motion.div
                    className="absolute inset-0 glass rounded-lg border border-white/20"
                    layoutId="activeNavItem"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">Contact</span>
              </motion.button>
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-[100px] left-[1%] w-[98%] glass z-40 flex flex-col items-center py-6 md:hidden">
          <ul className="w-full flex flex-col items-center gap-6">
            <li className="w-full text-center">
              <button
                onClick={() => handleNavClick('aboutme')}
                className={`w-full py-2 text-lg font-semibold ${activesection === 'aboutme' ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}
              >About Me</button>
            </li>
            <li className="w-full text-center">
              <button
                onClick={() => handleNavClick('projects')}
                className={`w-full py-2 text-lg font-semibold ${activesection === 'projects' ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}
              >Projects</button>
            </li>
            <li className="w-full text-center">
              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full py-2 text-lg font-semibold ${activesection === 'contact' ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}
              >Contact</button>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar