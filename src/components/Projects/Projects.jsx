import React from 'react'
import { motion } from 'framer-motion'
import AnimatedText from '../shared/AnimatedText'

function Projects() {

  return (
    <div className='min-h-[140vh] w-full bg-zinc-950 text-white py-20 px-4'>
      <div className='max-w-7xl mx-auto pt-16'>
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedText className="text-5xl mb-6" delay={0.2}>
            My Projects
          </AnimatedText>
          <motion.p
            className="text-[#B2A8A8] outfit text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A collection of projects that showcase my skills in web development, 
            from frontend interfaces to full-stack applications.
          </motion.p>
        </div>

        {/* Stay Tuned Message */}
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#A87F17] to-[#D4AF37] p-1"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8, type: "spring", bounce: 0.3 }}
          >
            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
              <span className="text-5xl">🚀</span>
            </div>
          </motion.div>
          
          <motion.h3
            className="text-4xl font-bold text-white mb-4 outfit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Stay Tuned!
          </motion.h3>
          
          <motion.p
            className="text-[#B2A8A8] outfit text-lg max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            I'm currently working on some exciting projects that will showcase my skills in web development. 
            Check back soon to see my latest work in action!
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 text-sm text-[#A87F17] outfit font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <span className="px-4 py-2 border border-[#A87F17]/30 rounded-full">React Applications</span>
            <span className="px-4 py-2 border border-[#A87F17]/30 rounded-full">Full-Stack Projects</span>
            <span className="px-4 py-2 border border-[#A87F17]/30 rounded-full">UI/UX Designs</span>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <p className="text-[#B2A8A8] outfit mb-6">
            Want to collaborate on something amazing?
          </p>
          <motion.a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#A87F17] to-[#D4AF37] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#A87F17]/25 transition-all duration-300 outfit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
          </motion.a>
        </motion.div>

      </div>
    </div>
  )
}

export default Projects