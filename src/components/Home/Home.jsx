import React, { use } from 'react'
import heroVideo from '../../assets/heroVideo.mp4'
import {motion} from 'framer-motion'
import { useTypewriter } from '../../hooks/useTypewriter'

function Home() {
  const typedtext2=useTypewriter("I'm Aryan !",90)

  return (
    <div className='w-full h-[80vh] relative z-0'>
      <video src={heroVideo} loop muted autoPlay className='object-cover z-0 w-full h-full'></video>
      <div className='absolute z-10 w-[50%] h-full top-[10%] left-[5%] flex flex-col justify-center'>
        <div className='space-y-4'>
          <motion.div
            className='bg-gradient-to-br from-[#A87F17] to-[#FFFFFF] bg-clip-text text-transparent text-[80px] outfit font-bold leading-tight'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >Hi,</motion.div>
          <motion.div
            className='bg-gradient-to-br from-[#A87F17] to-[#FFFFFF] bg-clip-text text-transparent text-[80px] outfit font-bold leading-tight'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {typedtext2}
            <span className='animate-pulse'>|</span>
          </motion.div>
          <motion.div
            className='text-[#B2A8A8] outfit w-[60%] pt-8 text-lg leading-relaxed'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            A full-stack web developer and problem-solver with a builder's mindset. From sleek UIs to scalable APIs, I craft digital experiences that merge design with function.
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-[0] left-0 w-full h-32 bg-gradient-to-b from-transparent to-neutral-950 z-20" />
    </div>
  )
}

export default Home