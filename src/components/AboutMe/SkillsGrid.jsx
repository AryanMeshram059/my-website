import React from 'react'
import { motion } from 'framer-motion'
import AnimatedText from '../shared/AnimatedText'
import "devicon/devicon.min.css"

function SkillsGrid() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: 'devicon-react-original colored' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
        { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored' },
        { name: 'HTML5', icon: 'devicon-html5-plain colored' },
        { name: 'CSS3', icon: 'devicon-css3-plain colored' }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
        { name: 'Express', icon: 'devicon-express-original' }, // no colored version
        { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
        { name: 'Python', icon: 'devicon-python-plain colored' }
      ]
    },
    {
      title: 'Tools',
      skills: [
        { name: 'Git', icon: 'devicon-git-plain colored' },
        { name: 'VS Code', icon: 'devicon-vscode-plain colored' },
        { name: 'Figma', icon: 'devicon-figma-plain colored' },
        { name: 'Postman', icon: 'devicon-postman-plain colored' }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="w-full space-y-8">
      <AnimatedText className="text-4xl text-center" delay={0.2}>
        Skills & Technologies
      </AnimatedText>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            className="space-y-4"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-[#A87F17] outfit text-center">
              {category.title}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-center hover:glass transition-all  cursor-pointer group"
                  whileHover={{ 
                    scale: 1.05,
                    y: -5
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.1, 
                    delay: 0
                  }}
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon.startsWith("devicon-") ? (
                      <i className={skill.icon}></i>
                    ) : (
                      skill.icon
                    )}
                  </div>
                  <p className="text-white outfit text-sm font-medium">
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default SkillsGrid