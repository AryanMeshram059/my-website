import { useEffect, useRef, useState, useCallback } from 'react'

export function useScrollAnimation(threshold = 0.1, rootMargin = '0px', once = true) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)
  const observerRef = useRef(null)

  const handleIntersection = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true)
      if (once) {
        setHasAnimated(true)
        // Disconnect observer after first animation to improve performance
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    } else if (!once) {
      setIsVisible(false)
    }
  }, [once])

  useEffect(() => {
    const currentElement = elementRef.current
    if (!currentElement) return

    // Skip if already animated and once is true
    if (once && hasAnimated) return

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    })

    observerRef.current.observe(currentElement)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin, hasAnimated, handleIntersection, once])

  return { elementRef, isVisible, hasAnimated }
}