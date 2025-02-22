/**
 * Sidebar Component
 *
 * Represents the sidebar of the application, used for displaying the unit selector.
 * Allows users to choose units and drag them into semester cells.
 *
 * Key Features:
 *
 * 1. Sidebar Display
 *    - Uses responsive width for different screen sizes
 *
 * 2. Unit Selector
 *    - Contains UnitSelector component for displaying available units
 */

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import CourseSelector from './CourseSelector'

interface SidebarProps {
  width: string
  handleDragStart: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ width, handleDragStart }) => (
  <motion.div
    initial={{ x: -300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      type: 'tween',
      duration: 0.5,
      ease: 'easeOut',
    }}
    className="fixed left-0 top-16 bottom-0 z-40 min-w-[280px]"
    style={{ width: 'min(90vw, 360px)' }}
  >
    <div className="h-full overflow-auto bg-background border-r">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="p-4 sm:p-6"
      >
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Unit Selection</h3>
        </div>
        <CourseSelector onDragStart={handleDragStart} />
      </motion.div>
    </div>
  </motion.div>
)

export default Sidebar
