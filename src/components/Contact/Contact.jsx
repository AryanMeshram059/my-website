import React from 'react'
import { motion } from 'framer-motion'
import AnimatedText from '../shared/AnimatedText'
import ContactForm from './ContactForm'
import SocialLinks from './SocialLinks'
import SectionDivider from '../shared/SectionDivider'
import { downloadFile } from '../shared/downloadResume'
import { useState } from 'react'

function Contact() {
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
    <div className='min-h-[140vh] w-full bg-black text-white py-20 px-4'>
      <div className='max-w-6xl mx-auto pt-16'>
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedText className="text-5xl mb-6" delay={0.2}>
            Get In Touch
          </AnimatedText>
          <motion.p
            className="text-[#B2A8A8] outfit text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Let's create something amazing together.
          </motion.p>
        </div>

        {/* Main Content */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h4 className="text-2xl font-semibold text-white outfit mb-4">
            Ready to start your project?
          </h4>
          <p className="text-[#B2A8A8] outfit mb-8 max-w-xl mx-auto">
            Whether you need a complete web application, a stunning frontend, 
            or just want to discuss ideas, I'm here to help bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=aryanmeshram0509@gmail.com&su=Let%27s%20work%20together&body=Hi%20Aryan,"
              target="_blank"
              rel="noopener noreferrer"              
              className="px-8 py-4 bg-gradient-to-r from-[#A87F17] to-[#D4AF37] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#A87F17]/25 transition-all duration-300 outfit"
            >
              📧 Email Me Directly
            </a>
            <a
              className="px-8 py-4 bg-transparent border-2 border-[#A87F17] text-[#A87F17] font-semibold rounded-xl hover:bg-[#A87F17] hover:text-black transition-all duration-300 outfit"
              onClick={downloadResume}
            >
              📄 Download Resume
            </a>
          </div>
        </motion.div>

        <SectionDivider className="mt-20" />

        {/* Footer CTA */}
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 items-start">
          
          {/* Contact Form- will add this later*/}
          {/* <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-white outfit mb-8 text-center lg:text-left">
              Send me a message
            </h3>
            <ContactForm />
          </motion.div> */}

          {/* Social Links & Info */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <SocialLinks />
          </motion.div>

        </div>
        {/* Final Note */}
        <motion.div
          className="text-center mt-16 pt-8 border-t border-neutral-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-[#B2A8A8] outfit text-sm">
            Built with ❤️ using React, Framer Motion, and Tailwind CSS
          </p>
          <p className="text-[#B2A8A8] outfit text-sm mt-2">
            © 2024 Aryan. All rights reserved.
          </p>
        </motion.div>

      </div>
    </div>
  )
}

export default Contact