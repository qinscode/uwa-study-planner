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

/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import SemesterGrid from '../components/Main/SemesterGrid'

interface MainLayoutProps {
  isMobile: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ isMobile }) => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-8">
        <SemesterGrid />
      </main>
      <footer className="border-t py-6 text-center">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            UWA MIT Study Planner • ©2024 Created by Jack Qin
          </p>
          <p className="text-sm text-muted-foreground">
            React • Redux • Shadcn/ui
          </p>
          <p className="text-sm text-muted-foreground">
            jack@fudongs.com
          </p>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
