import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import * as THREE from 'three'
import AnimatedText from '../shared/AnimatedText'
import SectionDivider from '../shared/SectionDivider'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { projectsData } from '../../data/projectsData'

const gold = '#d4af37'

// How much extra scroll (in vh) is allocated to move from one card to the next.
// Bigger number = slower/more deliberate scroll-through; smaller = snappier.
const CARD_SCROLL_VH = 70

function createProjectTexture(project, index) {
  const canvas = document.createElement('canvas')
  canvas.width = 960
  canvas.height = 560
  const ctx = canvas.getContext('2d')
  const palette = project.palette

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8

  // Everything is drawn inside this function so it can be re-run once (and if)
  // the project's photo finishes loading — that's what lets us swap a plain
  // illustration for the real, gold-tinted photo without changing the rest
  // of the card.
  const draw = (loadedImage) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const background = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    background.addColorStop(0, palette[0])
    background.addColorStop(0.55, '#161412')
    background.addColorStop(1, palette[1])
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
    for (let i = 0; i < 9; i += 1) {
      const x = 58 + i * 104
      ctx.fillRect(x, 90, 1.5, 360)
    }
    for (let i = 0; i < 6; i += 1) {
      const y = 106 + i * 62
      ctx.fillRect(58, y, 820, 1.5)
    }

    ctx.fillStyle = 'rgba(13, 12, 11, 0.72)'
    roundRect(ctx, 58, 58, 844, 444, 32)
    ctx.fill()

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)'
    ctx.lineWidth = 3
    roundRect(ctx, 58, 58, 844, 444, 32)
    ctx.stroke()

    ctx.fillStyle = 'rgba(212, 175, 55, 0.15)'
    roundRect(ctx, 90, 88, 172, 36, 18)
    ctx.fill()
    ctx.fillStyle = gold
    ctx.font = '700 18px Outfit, Arial'
    ctx.letterSpacing = '2px'
    ctx.fillText(project.category.toUpperCase(), 112, 113)

    if (loadedImage) {
      drawTintedImage(ctx, loadedImage, 90, 132, 780, 258)
    } else if (project.visual === 'dashboard') {
      drawDashboard(ctx)
    } else if (project.visual === 'commerce') {
      drawCommerce(ctx)
    } else if (project.visual === 'portfolio') {
      drawPortfolio(ctx)
    } else if (project.visual === 'travel') {
      drawTravel(ctx)
    } else {
      drawMedia(ctx)
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)'
    ctx.font = '800 44px Outfit, Arial'
    ctx.fillText(project.title, 90, 442)
    ctx.fillStyle = 'rgba(178, 168, 168, 0.95)'
    ctx.font = '500 22px Outfit, Arial'
    ctx.fillText(project.cardCaption, 90, 474)

    ctx.fillStyle = 'rgba(212, 175, 55, 0.82)'
    ctx.beginPath()
    ctx.arc(836, 100, 24 + index * 2, 0, Math.PI * 2)
    ctx.fill()

    texture.needsUpdate = true
  }

  // Draw immediately (with the procedural illustration, or a blank photo slot)
  // so the card isn't empty while the real photo is still loading.
  draw(null)

  // project.image is optional — set it in projectsData.js to a path/URL and
  // that photo will replace the illustration, gold-tinted, once it loads.
  if (project.image) {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => draw(img)
    img.onerror = () => {
      console.warn(`Could not load image for "${project.title}": ${project.image}`)
    }
    img.src = project.image
  }

  return texture
}

// Draws `img` into the given rect using "cover" fit (fills the box, cropping
// overflow), converts it to grayscale, then tints it gold using the 'color'
// canvas blend mode — this keeps the photo's actual light/shadow detail
// (its luminosity) while replacing its hue/saturation with the card's gold,
// producing a duotone look consistent with the rest of the design.
function drawTintedImage(ctx, img, x, y, w, h) {
  ctx.save()
  roundRect(ctx, x, y, w, h, 20)
  ctx.clip()

  const imgRatio = img.width / img.height
  const boxRatio = w / h
  let drawW
  let drawH
  let offsetX
  let offsetY
  if (imgRatio > boxRatio) {
    drawH = h
    drawW = h * imgRatio
    offsetX = x - (drawW - w) / 2
    offsetY = y
  } else {
    drawW = w
    drawH = w / imgRatio
    offsetX = x
    offsetY = y - (drawH - h) / 2
  }

  ctx.filter = 'grayscale(100%) contrast(1.08) brightness(1.05)'
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH)
  ctx.filter = 'none'

  // Tint the grayscale photo gold, keeping its luminosity/detail.
  ctx.globalCompositeOperation = 'color'
  ctx.fillStyle = gold
  ctx.fillRect(x, y, w, h)
  ctx.globalCompositeOperation = 'source-over'

  // Subtle mood gradient so the photo blends into the rest of the card
  // instead of looking like a flat pasted-in rectangle.
  const mood = ctx.createLinearGradient(x, y, x, y + h)
  mood.addColorStop(0, 'rgba(20, 16, 8, 0.12)')
  mood.addColorStop(1, 'rgba(10, 8, 4, 0.46)')
  ctx.fillStyle = mood
  ctx.fillRect(x, y, w, h)

  ctx.restore()

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)'
  ctx.lineWidth = 2
  roundRect(ctx, x, y, w, h, 20)
  ctx.stroke()
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

function drawDashboard(ctx) {
  const bars = [128, 202, 150, 284, 238, 328, 270]
  bars.forEach((height, i) => {
    ctx.fillStyle = i % 2 ? 'rgba(212, 175, 55, 0.72)' : 'rgba(81, 214, 164, 0.72)'
    roundRect(ctx, 130 + i * 74, 372 - height, 34, height, 12)
    ctx.fill()
  })
  ctx.strokeStyle = 'rgba(81, 214, 164, 0.9)'
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.moveTo(112, 318)
  ;[236, 268, 218, 266, 188, 230, 162].forEach((y, i) => ctx.lineTo(156 + i * 96, y))
  ctx.stroke()
}

function drawCommerce(ctx) {
  ctx.fillStyle = 'rgba(255, 246, 198, 0.92)'
  roundRect(ctx, 118, 134, 258, 198, 20)
  ctx.fill()
  ctx.fillStyle = 'rgba(212, 175, 55, 0.64)'
  roundRect(ctx, 424, 116, 316, 46, 18)
  ctx.fill()
  ;[196, 258, 320].forEach((y, i) => {
    ctx.fillStyle = i === 1 ? 'rgba(212, 175, 55, 0.34)' : 'rgba(255, 255, 255, 0.16)'
    roundRect(ctx, 424, y, 356 - i * 32, 34, 14)
    ctx.fill()
  })
  ctx.strokeStyle = 'rgba(255, 246, 198, 0.72)'
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.moveTo(156, 284)
  ctx.lineTo(214, 206)
  ctx.lineTo(274, 258)
  ctx.lineTo(334, 174)
  ctx.stroke()
}

function drawPortfolio(ctx) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'
  roundRect(ctx, 122, 122, 276, 248, 28)
  ctx.fill()
  ctx.fillStyle = 'rgba(212, 175, 55, 0.76)'
  ctx.beginPath()
  ctx.arc(260, 222, 82, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)'
  roundRect(ctx, 462, 132, 290, 34, 16)
  ctx.fill()
  ;[206, 258, 310].forEach((y, i) => {
    ctx.fillStyle = i === 0 ? 'rgba(212, 175, 55, 0.55)' : 'rgba(255, 255, 255, 0.12)'
    roundRect(ctx, 462, y, 232 + i * 28, 26, 12)
    ctx.fill()
  })
}

function drawTravel(ctx) {
  const sky = ctx.createLinearGradient(0, 92, 0, 380)
  sky.addColorStop(0, 'rgba(56, 189, 248, 0.35)')
  sky.addColorStop(1, 'rgba(212, 175, 55, 0.22)')
  ctx.fillStyle = sky
  roundRect(ctx, 104, 104, 710, 286, 28)
  ctx.fill()
  ctx.fillStyle = 'rgba(16, 185, 129, 0.54)'
  ctx.beginPath()
  ctx.moveTo(118, 354)
  ctx.quadraticCurveTo(292, 214, 462, 336)
  ctx.quadraticCurveTo(592, 238, 802, 352)
  ctx.lineTo(802, 390)
  ctx.lineTo(118, 390)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255, 246, 198, 0.86)'
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.moveTo(172, 330)
  ctx.bezierCurveTo(292, 268, 478, 268, 712, 316)
  ctx.stroke()
}

function drawMedia(ctx) {
  ctx.fillStyle = 'rgba(212, 175, 55, 0.18)'
  roundRect(ctx, 118, 112, 680, 286, 28)
  ctx.fill()
  ;[154, 268, 382, 496, 610].forEach((x, i) => {
    ctx.fillStyle = i % 2 ? 'rgba(244, 114, 182, 0.42)' : 'rgba(212, 175, 55, 0.56)'
    roundRect(ctx, x, 162 + (i % 2) * 38, 74, 154, 18)
    ctx.fill()
  })
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.beginPath()
  ctx.moveTo(438, 216)
  ctx.lineTo(438, 304)
  ctx.lineTo(514, 260)
  ctx.closePath()
  ctx.fill()
}

// --- CHANGED: reads a continuous scroll-driven "float index" from a ref every
// frame (instead of a discrete activeIndex prop), so motion is smoothly tied to
// scroll position rather than snapping between fixed states. Also scales the
// focused card up noticeably larger than before.
function ProjectMesh({ project, index, progressRef, onFocus }) {
  const meshRef = useRef(null)
  const materialRef = useRef(null)
  const texture = useMemo(() => createProjectTexture(project, index), [project, index])

  useEffect(() => () => texture.dispose(), [texture])

  useFrame((_, delta) => {
    if (!meshRef.current) return

    const diff = index - progressRef.current
    const absDiff = Math.abs(diff)
    const targetX = diff * 12.3
    const targetZ = -absDiff * 7.35
    const targetY = absDiff > 2 ? -0.08 : 0
    // Focused card (absDiff ~ 0) scales up to 2.1x — noticeably larger than neighbors.
    const targetScale = Math.max(5.1 - absDiff * 0.55, 0.45)

    meshRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), delta * 7)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, -diff * 0.26, delta * 7)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, absDiff * -0.035, delta * 7)
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 7)

    if (materialRef.current) {
      const targetEmissive = absDiff < 0.5 ? 0.18 : 0.04
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        targetEmissive,
        delta * 7
      )
    }
  })

  return (
    <Float speed={1.35} rotationIntensity={0.08} floatIntensity={0.12}>
      <mesh
        ref={meshRef}
        onPointerDown={() => onFocus(index)}
        onDoubleClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
      >
        <planeGeometry args={[2.4, 1.4, 16, 16]} />
        <meshStandardMaterial
          ref={materialRef}
          map={texture}
          color="#fff4bd"
          roughness={0.38}
          metalness={0.18}
          emissive="#1c1607"
          emissiveIntensity={0.04}
        />
      </mesh>
    </Float>
  )
}

function ProjectCarousel({ progressRef, onFocus }) {
  return (
    <Canvas camera={{ position: [0, 0.2, 9.2], fov: 52 }} dpr={[1, 1.8]}>
      <ambientLight intensity={1.35} />
      <spotLight position={[0, 5, 4]} angle={0.42} penumbra={0.9} intensity={5.2} color="#fff0b2" />
      <pointLight position={[-4, -1.5, 2]} intensity={1.8} color="#d4af37" />
      <group>
        {projectsData.map((project, index) => (
          <ProjectMesh
            key={project.id}
            project={project}
            index={index}
            progressRef={progressRef}
            onFocus={onFocus}
          />
        ))}
      </group>
      <Environment preset="night" />
    </Canvas>
  )
}

function Projects() {
  // --- CHANGED: isVisible now watches the sticky inner viewport (always exactly
  // 1 screen tall) instead of the tall outer pinned section. The outer section
  // can be several screens tall (100vh + N*CARD_SCROLL_VH), so a 30%-visibility
  // observer on it would almost never fire — that was why the cards/info were
  // stuck at opacity: 0 and invisible.
  const { elementRef, isVisible } = useScrollAnimation(0.3)
  const sectionRef = useRef(null) // outer tall section, used only for scroll-distance math
  const progressRef = useRef(0) // continuous float index, read by r3f every frame — not React state
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projectsData[activeIndex]
  const totalCards = projectsData.length

  // --- NEW: this replaces the old wheel-hijacking approach entirely.
  // The section is rendered taller than 100vh and its inner content is
  // `sticky top-0 h-screen`. As the user scrolls through that extra height,
  // we read how far we've scrolled into it and convert that into a
  // continuous card index. This works identically for mouse wheel, trackpad,
  // and touch scrolling, and it's driven purely by scroll position — not by
  // where the cursor happens to be.
  useEffect(() => {
    let frame = null

    const handleScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = null
        const section = sectionRef.current
        if (!section) return

        const rect = section.getBoundingClientRect()
        const scrollDistance = (totalCards - 1) * window.innerHeight * (CARD_SCROLL_VH / 100)
        const scrolledIntoSection = -rect.top
        const progress = scrollDistance > 0
          ? Math.min(Math.max(scrolledIntoSection / scrollDistance, 0), 1)
          : 0

        const floatIndex = progress * (totalCards - 1)
        progressRef.current = floatIndex

        const rounded = Math.round(floatIndex)
        setActiveIndex((current) => (current === rounded ? current : rounded))
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [totalCards])

  // Smoothly scrolls the page to the exact scroll offset for a given card index.
  // Used by card clicks and the mobile arrow buttons so they stay in sync with
  // the scroll-driven state instead of fighting it.
  const scrollToIndex = useCallback((index) => {
    const section = sectionRef.current
    if (!section) return

    const clamped = Math.min(Math.max(index, 0), totalCards - 1)
    const scrollDistance = (totalCards - 1) * window.innerHeight * (CARD_SCROLL_VH / 100)
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    const targetScrollY = totalCards > 1
      ? sectionTop + (clamped / (totalCards - 1)) * scrollDistance
      : sectionTop

    window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
  }, [totalCards])

  return (
    <>
      <section
        ref={sectionRef}
        style={{ height: `calc(100vh + ${(totalCards - 1) * CARD_SCROLL_VH}vh)` }}
        className="relative w-full bg-neutral-950 text-white"
      >
        <div ref={elementRef} className="sticky top-0 h-screen w-full overflow-hidden px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(168,127,23,0.13),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.58))]" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center">
            <div className="mb-4 text-center">
              <AnimatedText className="mb-3 text-4xl sm:text-5xl md:text-6xl" delay={0.2}>
                My Projects
              </AnimatedText>
            </div>

            <Motion.div
              className="relative mx-auto h-[19rem] w-full max-w-6xl sm:h-[24rem] lg:h-[27rem]"
              initial={{ opacity: 0, y: 32 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              role="region"
              aria-label="Scroll through project carousel"
            >
              <ProjectCarousel progressRef={progressRef} onFocus={scrollToIndex} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent" />
            </Motion.div>

            <div className="mx-auto -mt-2 flex max-w-4xl items-center justify-center gap-3 sm:hidden">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="grid h-11 w-11 place-items-center rounded-full border border-[#d4af37]/35 bg-[#1c1b1b]/85 text-[#d4af37] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="outfit min-w-20 text-center text-sm font-semibold text-[#B2A8A8]">
                {activeIndex + 1} / {projectsData.length}
              </div>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={activeIndex === projectsData.length - 1}
                className="grid h-11 w-11 place-items-center rounded-full border border-[#d4af37]/35 bg-[#1c1b1b]/85 text-[#d4af37] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <Motion.div
              className="mx-auto mt-4 max-w-3xl text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, delay: 0.72 }}
            >
              <AnimatePresence mode="wait">
                <Motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
                  transition={{ duration: 0.32 }}
                >
                  <h3 className="outfit mb-3 text-2xl font-bold text-[#d4af37] sm:text-3xl">
                    {activeProject.title}
                  </h3>
                  <p className="outfit mx-auto max-w-2xl text-base leading-relaxed text-[#d8d0bd] sm:text-lg">
                    {activeProject.description}
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {activeProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="outfit rounded-full border border-[#d4af37]/25 bg-[#1c1b1b]/75 px-3 py-1 text-xs font-semibold text-[#d4af37]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="outfit inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-black shadow-lg shadow-black/25 transition duration-300 hover:bg-[#d4af37]"
                    >
                      <Github size={18} />
                      GitHub
                    </a>
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="outfit inline-flex items-center gap-2 rounded-full border border-[#d4af37]/45 bg-[#1c1b1b]/75 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#d4af37] transition duration-300 hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                    >
                      <ExternalLink size={18} />
                      Demo
                    </a>
                  </div>
                </Motion.div>
              </AnimatePresence>
            </Motion.div>
          </div>
        </div>
      </section>

      <div className="bg-black px-4 pb-12">
        <div className="mx-auto max-w-7xl">
          <SectionDivider />
        </div>
      </div>
    </>
  )
}

export default Projects