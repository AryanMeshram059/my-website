import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function Navbar() {
  const [scrolled, setscrolled] = useState(false);
  const [activesection, setactivesection] = useState('home');

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }



  return (
    <>
      <div className={`w-[99%] h-[10%] flex items-center fixed rounded-lg top-[10px] left-[0.5%] z-30 ${scrolled ? 'glass' : ''}`}>
        <div className='h-[40px] w-[8%] text-white relative left-[20px] flex items-center justify-center'>
          <motion.button
            onClick={() => handleNavClick('home')}
            className={`relative space-grotesk h-full w-full flex items-center justify-center rounded-lg transition-all duration-300 ${activesection === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Active Background */}
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
        <div className='w-[50%] flex items-center justify-center relative left-[45%]'>
          <ul className='flex w-full h-full justify-evenly gap-2'>
            <li className='h-[40px] w-[20%] text-white flex items-center justify-center'>
              <motion.button
                onClick={() => handleNavClick('aboutme')}
                className={`relative space-grotesk h-full w-full flex items-center justify-center rounded-lg transition-all duration-300 ${activesection === 'aboutme' ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active Background */}
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
                className={`relative space-grotesk h-full w-full flex items-center justify-center rounded-lg transition-all duration-300 ${activesection === 'projects' ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active Background */}
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
                className={`relative space-grotesk h-full w-full flex items-center justify-center rounded-lg transition-all duration-300 ${activesection === 'contact' ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active Background */}
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
    </>
  )
}

export default Navbar