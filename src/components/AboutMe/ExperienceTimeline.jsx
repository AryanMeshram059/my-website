import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import AnimatedText from '../shared/AnimatedText'

function ExperienceTimeline() {
  const containerRef = useRef(null)
  const timelineRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const timelineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])
  const isInView = useInView(containerRef, { once: false, margin: "0px 0px -200px 0px" })

  const experiences = [
    // {
    //   title: 'Full-Stack Developer',
    //   company: 'Tech Startup',
    //   period: '2023 - Present',
    //   description: 'Building scalable web applications using React, Node.js, and cloud technologies. Leading frontend development and API design.',
    //   type: 'work'
    // },
    // {
    //   title: 'Frontend Developer Intern',
    //   company: 'Digital Agency',
    //   period: '2022 - 2023',
    //   description: 'Developed responsive websites and interactive user interfaces. Collaborated with design teams to implement pixel-perfect designs.',
    //   type: 'work'
    // },
    {
      title: 'B.Tech - M.Tech Dual Degree in CSE',
      company: 'IIT Gandhinagar',
      period: '2024 - Present',
      description: "Passionate about technology and actively learning software development and algorithms through coursework and personal projects.",
      type: 'education'
    },
    {
      title: 'Design Team Member (Senior Team)',
      company: 'TEDx IIT Gandhinagar',
      period: '2025 - Present',
      description: 'Contributed to the visual identity and branding of TEDx events. Collaborated with a multidisciplinary team to design promotional material, stage visuals, and social media content.',
      type: 'work'
    }
  ]

  // Individual timeline item component with its own scroll detection
  const TimelineItem = ({ exp, index }) => {
    const itemRef = useRef(null)
    const isItemInView = useInView(itemRef, {
      once: true,
      margin: "0px 0px -100px 0px",
      threshold: 0.1
    })



    return (
      <motion.div
        ref={itemRef}
        className="relative flex items-start space-x-6"
        initial={{ opacity: 0, x: -50 }}
        animate={isItemInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        {/* Timeline Dot */}
        <motion.div
          className="relative z-10 w-4 h-4 rounded-full glass border-2 border-[#A87F17] flex-shrink-0 mt-2"
          initial={{ scale: 0, backgroundColor: "transparent" }}
          animate={isItemInView ? {
            scale: 1,
            backgroundColor: "rgba(168, 127, 23, 0.2)"
          } : {
            scale: 0,
            backgroundColor: "transparent"
          }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="absolute inset-1 rounded-full bg-[#A87F17]"
            initial={{ scale: 0 }}
            animate={isItemInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          />
        </motion.div>

        {/* Content Card */}
        <motion.div
          className="flex-1 bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-900/80 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isItemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <h3 className="text-xl font-semibold text-white outfit">
              {exp.title}
            </h3>
            <span className="text-[#A87F17] outfit font-medium text-sm">
              {exp.period}
            </span>
          </div>

          <p className="text-[#A87F17] outfit font-medium mb-3">
            {exp.company}
          </p>

          <p className="text-[#B2A8A8] outfit leading-relaxed">
            {exp.description}
          </p>

          {/* Type Badge */}
          <div className="mt-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium outfit ${exp.type === 'work'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
              {exp.type === 'work' ? 'Work Experience' : 'Education'}
            </span>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div ref={containerRef} className="w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatedText className="text-4xl text-center" delay={0.2}>
          Experience & Education
        </AnimatedText>
      </motion.div>

      <motion.div
        ref={timelineRef}
        className="relative max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Animated Timeline Line */}
        <div className="absolute left-8 top-0 w-0.5 bg-neutral-700 h-full">
          <motion.div
            className="w-full bg-gradient-to-b from-[#A87F17] via-[#A87F17] to-transparent"
            style={{ height: timelineHeight }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <TimelineItem key={index} exp={exp} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default ExperienceTimeline