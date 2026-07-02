import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useTypewriter } from '../../hooks/useTypewriter'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import OptimizedVideo from '../shared/OptimizedVideo'
import heroVideo from '../../assets/heroVideo.mp4'

// Lazy load components for better performance
const SectionDivider = lazy(() => import('../shared/SectionDivider'))

function Home() {
  const { displayedText: typedtext2 } = useTypewriter("I'm Aryan !", 90, 800)
  const { elementRef, isVisible } = useScrollAnimation(0.3)

  return (
    <div ref={elementRef} className='w-full h-screen relative z-0 overflow-hidden'>
      {/* Optimized video component with lazy loading */}
      <OptimizedVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4"
        className="absolute inset-0 w-full h-full z-0"
        poster="/hero-poster.jpg"
        lazyLoad={false} // Load immediately for hero video
        preload="metadata"
      />

      {/* Content overlay with improved mobile layout */}
      <div className='absolute inset-0 z-10 flex items-center'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-3xl'>
            <div className='space-y-4 sm:space-y-6'>
              <motion.h1
                className='bg-gradient-to-br from-[#A87F17] to-[#FFFFFF] bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl outfit font-bold leading-tight'
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Hi,
              </motion.h1>

              <motion.h2
                className='bg-gradient-to-br from-[#A87F17] to-[#FFFFFF] bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl outfit font-bold leading-tight'
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                {typedtext2}
                <span className='animate-pulse text-[#A87F17]'>|</span>
              </motion.h2>

              <motion.p
                className='text-[#B2A8A8] outfit text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl pt-4 sm:pt-6 md:pt-8'
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                A full-stack web developer and problem-solver with a builder's mindset. From sleek UIs to scalable APIs, I craft digital experiences that merge design with function.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-5" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-neutral-950 z-20" />

      {/* Lazy loaded section divider */}
      <Suspense fallback={<div className="w-full h-16" />}>
        <SectionDivider />
      </Suspense>
    </div>
  )
}

export default Home