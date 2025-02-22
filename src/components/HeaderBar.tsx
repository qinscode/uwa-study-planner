/**
 * HeaderBar Component
 *
 * A fixed navigation bar at the top of the application, displaying the app title.
 * On mobile devices, it includes a button to open the sidebar.
 *
 * Key Features:
 *
 * 1. Fixed Top Bar
 *    - Uses Ant Design's Header component fixed at the top of the page
 *    - Provides consistent navigation experience
 *
 * 2. Mobile Device Support
 *    - Displays a button on mobile devices to open the sidebar
 *
 * 3. Application Title
 *    - Shows the application title "MIT Study Planner V5.1"
 *
 * 4. Animation
 *    - Uses framer-motion to animate the header sliding in from the top
 *
 * Implementation Details:
 *
 * - Uses Ant Design components: Layout, Button, Typography
 * - Implements responsive design with conditional rendering for mobile
 * - Applies custom styling for layout and appearance
 * - Utilizes framer-motion for entrance animation
 *
 * @param {boolean} isMobile - Indicates if the app is being viewed on a mobile device
 * @param {function} setDrawerVisible - Function to toggle the visibility of the sidebar drawer
 */

import type React from 'react'
import { motion } from 'framer-motion'
import { Menu, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderBarProps {
  isMobile: boolean
  setDrawerVisible: (visible: boolean) => void
}

const HeaderBar: React.FC<HeaderBarProps> = ({ isMobile, setDrawerVisible }) => (
  <motion.div
    animate={{ y: 0, opacity: 1 }}
    className="fixed top-0 left-0 right-0 z-50"
    initial={{ y: -100, opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <header
      className={cn(
        'h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        'border-b',
        'flex items-center justify-between px-6'
      )}
    >
      <div className="flex items-center gap-3">
        {isMobile && (
          <Button
            className="mr-2"
            size="icon"
            variant="ghost"
            onClick={() => { setDrawerVisible(true); }}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-primary tracking-tight">
            UWA Study Planner
          </h2>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        Master of Information Technology
      </div>
    </header>
  </motion.div>
)

export default HeaderBar
