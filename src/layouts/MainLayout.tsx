/**
 * MainLayout Component
 *
 * The overall layout component for the application, including the content area and footer.
 *
 * Key Features:
 *
 * 1. Content Area
 *    - Contains the SemesterGrid component for displaying the semester grid
 *
 * 2. Footer
 *    - Displays application copyright information
 *    - Shows developer contact information
 */

import type React from 'react'
import SemesterGrid from '../components/Main/SemesterGrid'

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-8">
        <SemesterGrid />
      </main>
    </div>
  )
}

export default MainLayout
