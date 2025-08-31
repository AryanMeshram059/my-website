import React from 'react'
import { motion } from 'framer-motion'

function ProjectFilter({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'backend', label: 'Backend' }
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {filters.map((filter, index) => (
        <motion.button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`relative px-6 py-3 rounded-xl font-medium outfit transition-all duration-300 ${activeFilter === filter.id
            ? 'text-black'
            : 'text-[#B2A8A8] hover:text-white border border-neutral-700 hover:border-[#A87F17]/50'
            }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Active Background */}
          {activeFilter === filter.id && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#A87F17] to-[#D4AF37] rounded-xl glass"
              layoutId="activeFilter"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}

          {/* Button Text */}
          <span className="relative z-10">
            {filter.label}
          </span>
        </motion.button>
      ))}
    </div>
  )
}

export default ProjectFilter