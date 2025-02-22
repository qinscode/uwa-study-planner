/**
 * MainContent Component
 *
 * Represents the main content area of the application. Displays unit summary
 * information and multiple semester cards.
 **
 * Key Features:
 *
 * 1. Course Summary Display
 *    - Uses CourseSummary component to show statistics of selected courses
 *    - Includes action buttons for various operations
 *
 * 2. Semester Cards Display
 *    - Renders multiple SemesterCard components based on the provided semesters array
 */

import React, { RefObject } from 'react'
import CourseSummary from './CourseSummary'
import SemesterCard from './SemesterCard'

interface MainContentProps {
  captureRef: RefObject<HTMLDivElement>
  semesters: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedCourses: any[]
  handleSwitch: () => void
  handleExportTable: () => void
  handleClearTable: () => void
  handleLoadStudyPlan: () => void
  handleYearChange: (value: string) => void
  handleSemesterChange: (value: string) => void
  handleProgramChange: (value: string) => void
  selectedYear: string
  selectedSemester: string
  selectedProgram: string
}

const MainContent: React.FC<MainContentProps> = ({
  captureRef,
  semesters,
  selectedCourses,
  handleSwitch,
  handleExportTable,
  handleClearTable,
  handleLoadStudyPlan,
  handleYearChange,
  handleSemesterChange,
  handleProgramChange,
  selectedYear,
  selectedSemester,
  selectedProgram,
}) => {
  return (
    <div ref={captureRef} className="p-4 lg:p-6 w-full max-w-[1600px] mx-auto">
      <CourseSummary
        selectedCourses={selectedCourses}
        startWithS2={semesters[0] === 'S2'}
        handleSwitch={handleSwitch}
        handleExportTable={handleExportTable}
        handleClearTable={handleClearTable}
        handleLoadStudyPlan={handleLoadStudyPlan}
        handleYearChange={handleYearChange}
        handleSemesterChange={handleSemesterChange}
        handleProgramChange={handleProgramChange}
        selectedYear={selectedYear}
        selectedSemester={selectedSemester}
        selectedProgram={selectedProgram}
      />
      <div className="mt-6 space-y-6">
        {semesters.map((semester, semesterIndex) => (
          <SemesterCard
            key={semesterIndex}
            semester={semester}
            semesterIndex={semesterIndex}
            startWithS2={semesters[0] === 'S2'}
          />
        ))}
      </div>
    </div>
  )
}

export default MainContent
