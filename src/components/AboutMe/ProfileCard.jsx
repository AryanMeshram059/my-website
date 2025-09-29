import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedText from '../shared/AnimatedText'
import Card from '../shared/Card'
import { downloadFile } from '../shared/downloadResume'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import dp from '../../assets/profilepicture.jpg'

function ProfileCard() {
  const { elementRef, isVisible } = useScrollAnimation(0.3)
  const [downloading,setDownloading]=useState(false);
  const [error, setError]=useState(null);
  const resumeURL="/Resume.pdf";
  const filename="AryanMeshramResume.pdf";
  const downloadResume = async () => {
    setError(null);
    setDownloading(true);
    try {
      await downloadFile(resumeURL, filename);
    } catch (e) {
      console.error(e);
      setError("couldn't download automatically, opened in new tab");
      window.open(resumeURL, "_blank");
    } finally {
      setDownloading(false);
    }
  };
  return (
    <div ref={elementRef}>
      <Card 
        className="w-full max-w-md mx-auto"
        delay={0.2}
      >
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Profile Image Placeholder */}
        <motion.div
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#A87F17] to-[#FFFFFF] p-1"
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
            <img src={dp} className='rounded-full'/>
          </div>
        </motion.div>

        {/* Name and Title */}
        <div className="space-y-2">
          <AnimatedText 
            className="text-2xl sm:text-3xl"
            delay={0.6}
          >
            Aryan Meshram
          </AnimatedText>
          <motion.p
            className="text-[#B2A8A8] outfit text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Computer Science Student
          </motion.p>
        </div>

        {/* Bio */}
        <motion.p
          className="text-[#B2A8A8] outfit leading-relaxed text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Passionate about creating digital experiences that merge beautiful design with powerful functionality. 
          I love solving complex problems and bringing ideas to life through code.
        </motion.p>

        {/* Download Resume Button */}
        <motion.button
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#A87F17] to-[#D4AF37] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#A87F17]/25 transition-all duration-300 outfit text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadResume}
        >
          Download Resume
        </motion.button>
      </div>
    </Card>
    </div>
  )
}

export default ProfileCard