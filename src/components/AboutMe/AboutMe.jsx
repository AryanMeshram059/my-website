import React from 'react'
import { motion } from 'framer-motion'
import ProfileCard from './ProfileCard'
import SkillsGrid from './SkillsGrid'
import ExperienceTimeline from './ExperienceTimeline'
import SectionDivider from '../shared/SectionDivider'

function AboutMe() {
  return (
    <div className='min-h-[140vh] w-full bg-neutral-950 text-white py-20 px-4'>
      <div className='max-w-7xl mx-auto space-y-20 pt-16'>

        {/* Profile Section */}
        <motion.div
          className='flex flex-col lg:flex-row items-center lg:items-start gap-12'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Profile Card */}
          <div className='lg:w-1/3 flex justify-center'>
            <ProfileCard />
          </div>

          {/* Skills Grid */}
          <div className='lg:w-2/3'>
            <SkillsGrid />
          </div>
        </motion.div>

        <SectionDivider />

        {/* Experience Timeline */}
        <div className='w-full'>
          <ExperienceTimeline />
        </div>

        {/* connect button */}
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

        <SectionDivider/>

      </div>
    </div>
  )
}

export default AboutMe