import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options = {}) {
  const [entries, setEntries] = useState([])
  const observer = useRef(null)

  const { threshold = 0.1, rootMargin = '0px', root = null } = options

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (observedEntries) => {
        setEntries(observedEntries)
      },
      {
        threshold,
        rootMargin,
        root
      }
    )

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [threshold, rootMargin, root])

  const observe = (element) => {
    if (element && observer.current) {
      observer.current.observe(element)
    }
  }

  const unobserve = (element) => {
    if (element && observer.current) {
      observer.current.unobserve(element)
    }
  }

  return { entries, observe, unobserve }
}