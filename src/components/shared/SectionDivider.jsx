import React from 'react'
import { motion } from 'framer-motion'

function SectionDivider({ className = '' }) {
  return (
    <div className={`w-full flex justify-center py-8 ${className}`}>
      <motion.div
        className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#A87F17] to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  )
}

export default SectionDivider