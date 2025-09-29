import { useState, useRef, useEffect } from 'react'
import { createOptimizedObserver } from '../../utils/performance'

function OptimizedVideo({ 
  src, 
  poster, 
  className = '', 
  autoPlay = true, 
  muted = true, 
  loop = true,
  playsInline = true,
  preload = "none", // Changed to 'none' for large videos
  lazyLoad = true
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(!lazyLoad)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  // Lazy loading with intersection observer
  useEffect(() => {
    if (!lazyLoad) return

    const observer = createOptimizedObserver((entry) => {
      if (entry.isIntersecting) {
        setShouldLoad(true)
        observer.unobserve(entry.target)
      }
    }, { rootMargin: '100px' })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [lazyLoad])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    const handleLoadedData = () => setIsLoaded(true)
    const handleError = () => setHasError(true)
    const handleCanPlay = () => {
      // Only autoplay when video can actually play
      if (autoPlay) {
        video.play().catch(() => {
          // Autoplay failed, which is fine
        })
      }
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)
    video.addEventListener('canplay', handleCanPlay)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [shouldLoad, autoPlay])

  if (hasError) {
    return (
      <div className={`bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center ${className}`}>
        <div className="text-white/60 text-center">
          <div className="text-4xl mb-2">🎬</div>
          <p>Video unavailable</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {(!shouldLoad || !isLoaded) && (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center">
          {shouldLoad ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/60"></div>
          ) : (
            <div className="text-white/60 text-center">
              <div className="text-4xl mb-2">🎬</div>
              <p>Loading video...</p>
            </div>
          )}
        </div>
      )}
      
      {shouldLoad && (
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={preload}
          poster={poster}
        >
          <source src={src.replace('.mp4', '.webm')} type="video/webm" />
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}

export default OptimizedVideo