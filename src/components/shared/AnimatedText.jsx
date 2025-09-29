
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

function AnimatedText({ 
  children, 
  className = '', 
  gradient = true,
  delay = 0,
  duration = 1,
  threshold = 0.3,
  ...props 
}) {
  const { elementRef, isVisible } = useScrollAnimation(threshold)
  
  const baseClasses = gradient 
    ? 'bg-gradient-to-br from-[#A87F17] to-[#FFFFFF] bg-clip-text text-transparent outfit font-bold'
    : 'text-white outfit'

  return (
    <motion.div
      ref={elementRef}
      className={`${baseClasses} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedText