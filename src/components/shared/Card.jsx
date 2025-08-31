import React from 'react'
import { motion } from 'framer-motion'

function Card({ 
  children, 
  className = '', 
  glassOnHover = false,
  glassAlways = false,
  delay = 0,
  duration = 0.6,
  ...props 
}) {
  const baseClasses = 'bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6'
  const glassClasses = glassAlways 
    ? 'glass' 
    : glassOnHover 
      ? 'hover:glass transition-all duration-300' 
      : ''

  return (
    <motion.div
      className={`${baseClasses} ${glassClasses} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      whileHover={{ y: -5 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card