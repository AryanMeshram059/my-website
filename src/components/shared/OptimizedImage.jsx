import { useState, useRef, useEffect } from 'react'
import { createOptimizedObserver } from '../../utils/performance'

function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = '',
  lazyLoad = true,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(!lazyLoad)
  const imgRef = useRef(null)
  const containerRef = useRef(null)

  // Lazy loading with intersection observer
  useEffect(() => {
    if (!lazyLoad) return

    const observer = createOptimizedObserver((entry) => {
      if (entry.isIntersecting) {
        setShouldLoad(true)
        observer.unobserve(entry.target)
      }
    }, { rootMargin: '50px' })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [lazyLoad])

  useEffect(() => {
    if (!shouldLoad) return

    const img = new Image()
    img.onload = () => setIsLoaded(true)
    img.onerror = () => setHasError(true)
    img.src = src
  }, [shouldLoad, src])

  if (hasError) {
    return (
      <div 
        ref={containerRef}
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        {...props}
      >
        <span className="text-gray-400">Image failed to load</span>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {placeholder && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {shouldLoad && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  )
}

export default OptimizedImage