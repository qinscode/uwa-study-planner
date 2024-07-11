/**
 * useResponsive Hook
 *
 * A custom hook for detecting window size and determining if the device is mobile.
 *
 * Key Features:
 *
 * 1. Responsive Design
 *    - Determines if the device is mobile based on window size
 *    - Returns isMobile state
 */

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
