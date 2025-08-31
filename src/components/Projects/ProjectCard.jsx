import React from 'react'
import { motion } from 'framer-motion'

function ProjectCard({ project, delay = 0 }) {
  const { title, description, image, techStack, liveUrl, githubUrl, featured } = project

  return (
    <motion.div
      className="group relative bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#A87F17]/50 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -10 }}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-[#A87F17] to-[#D4AF37] text-black px-3 py-1 rounded-full text-xs font-semibold outfit">
          Featured
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.div
          className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {image ? (
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-6xl text-neutral-600">🚀</div>
          )}
        </motion.div>
        
        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#A87F17] text-black rounded-lg font-semibold outfit hover:bg-[#D4AF37] transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Live Demo
            </motion.a>
          )}
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold outfit hover:bg-white/30 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Source Code
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white outfit group-hover:text-[#A87F17] transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-[#B2A8A8] outfit leading-relaxed text-sm">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-neutral-800/60 text-[#A87F17] rounded-full text-xs font-medium outfit border border-neutral-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard