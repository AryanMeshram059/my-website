import React from 'react'
import { motion } from 'framer-motion'
import "devicon/devicon.min.css"

function SocialLinks() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/AryanMeshram059',
      icon: 'devicon-github-original text-white',
      type: 'devicon',
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      url: 'http://www.linkedin.com/in/aryan-meshram-068a9031b',
      icon: 'devicon-linkedin-plain colored',
      type: 'devicon',
      color: 'hover:text-blue-400'
    },
    {
      name: 'X',
      url: 'https://x.com/yourusername',
      type: 'svg',
      color: 'hover:text-white',
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-8 h-8"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 
          11.24H16.17l-5.214-6.817L4.99 
          21.75H1.68l7.73-8.835L1.254 
          2.25H8.08l4.713 6.231 5.451-6.231zM17.092 
          19.695h1.833L7.02 4.185H5.054l12.038 
          15.51z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/aryan_meshram344/',
      type: 'svg',
      color: 'hover:text-pink-400',
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-8 h-8"
        >
          <path d="M7 2C4.24 2 2 4.24 2 7v10c0 
          2.76 2.24 5 5 5h10c2.76 0 
          5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 
          2h10c1.65 0 3 1.35 3 
          3v10c0 1.65-1.35 3-3 
          3H7c-1.65 0-3-1.35-3-3V7c0-1.65 
          1.35-3 3-3zm5 3c-2.76 
          0-5 2.24-5 5s2.24 5 5 
          5 5-2.24 5-5-2.24-5-5-5zm0 
          2c1.65 0 3 1.35 3 
          3s-1.35 3-3 3-3-1.35-3-3 
          1.35-3 3-3zm4.5-3c-.83 0-1.5.67-1.5 
          1.5S15.67 8 16.5 8s1.5-.67 
          1.5-1.5S17.33 4 16.5 4z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=aryanmeshram0509@gmail.com&su=Let%27s%20work%20together&body=Hi%20Aryan,',
      type: 'svg',
      color: 'hover:text-red-400',
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-8 h-8"
        >
          <path d="M20 4H4c-1.1 0-2 .9-2 
          2v12c0 1.1.9 2 2 
          2h16c1.1 0 2-.9 
          2-2V6c0-1.1-.9-2-2-2zm0 
          4l-8 5-8-5V6l8 
          5 8-5v2z"/>
        </svg>
      )
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="text-center space-y-8">
      <motion.h3
        className="text-2xl font-semibold text-white outfit"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Let's Connect
      </motion.h3>

      <motion.div
        className="flex flex-wrap justify-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            // target={link.name !== 'Email' ? '_blank' : undefined}
            target={'_blank'}
            // rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
            rel={'noopener noreferrer'}
            className={`
              group relative w-16 h-16 bg-neutral-900/60 border border-neutral-700 
              rounded-2xl flex items-center justify-center transition-all duration-300
              hover:border-[#A87F17]/50 hover:glass ${link.color}
            `}
            variants={itemVariants}
            whileHover={{ scale: 1.1, y: -5, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
              {link.type === 'devicon' ? (
                <i className={link.icon}></i>
              ) : (
                link.icon
              )}
            </span>

            {/* Tooltip */}
            <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-neutral-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 outfit pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              {link.name}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-800" />
            </motion.div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#A87F17]/20 to-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
          </motion.a>
        ))}
      </motion.div>
    </div>
  )
}

export default SocialLinks
