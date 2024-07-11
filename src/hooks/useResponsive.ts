// hooks/useResponsive.ts
import { useState, useEffect } from 'react'

export const useResponsive = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return {
    isMobile,
  }
}
