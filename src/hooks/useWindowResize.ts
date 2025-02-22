/**
 * useWindowResize Hook
 *
 * A custom hook for detecting and responding to window resize events,
 * particularly for determining if the device is mobile.
 *
 * Key Features:
 *
 * 1. Initial Window Size Detection
 *    - Sets initial state based on current window width
 *    - Considers devices with width < 768px as mobile
 *
 * 2. Event Listener Management
 *    - Adds a resize event listener on component mount
 *    - Removes the listener on component unmount to prevent memory leaks
 *
 * 3. State Updates
 *    - Updates isMobile state when window size changes
 */

import { useEffect, useState } from 'react'

const useWindowResize = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize); }
  }, [])

  return isMobile
}

export default useWindowResize
