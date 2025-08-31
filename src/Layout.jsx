import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import AboutMe from './components/AboutMe/AboutMe'
import Contact from './components/Contact/Contact'
import Projects from './components/Projects/Projects'

function Layout() {
  return (
    <>
      <Navbar />
      <section id='home' >
        <Home />
      </section>
      <section id='aboutme'>
        <AboutMe />
      </section>
      <section id='projects'>
        <Projects />
      </section>
      <section id='contact'>
        <Contact />
      </section>
    </>
  )
}

export default Layout