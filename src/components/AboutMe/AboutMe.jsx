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

      </div>
    </div>
  )
}

export default AboutMe