import React from 'react'
import { motion } from 'framer-motion'

function AnimatedText({ 
  children, 
  className = '', 
  gradient = true,
  delay = 0,
  duration = 1,
  ...props 
}) {
  const baseClasses = gradient 
    ? 'bg-gradient-to-br from-[#A87F17] to-[#FFFFFF] bg-clip-text text-transparent outfit font-bold'
    : 'text-white outfit'

  return (
    <motion.div
      className={`${baseClasses} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedText