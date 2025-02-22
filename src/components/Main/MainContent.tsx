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

import type { RefObject } from 'react'
import CourseSummary from './CourseSummary'
import SemesterCard from './SemesterCard'
import type { SelectedCourse } from '@/types'

interface MainContentProps {
  captureRef: RefObject<HTMLDivElement>
  semesters: string[]
  selectedCourses: SelectedCourse[]
  handleSwitch: (checked: boolean) => void
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
    <div ref={captureRef} className="px-4 pt-2 pb-4 lg:px-6 w-full max-w-[1600px] mx-auto">
      <CourseSummary
        handleClearTable={handleClearTable}
        handleExportTable={handleExportTable}
        handleLoadStudyPlan={handleLoadStudyPlan}
        handleProgramChange={handleProgramChange}
        handleSemesterChange={handleSemesterChange}
        handleSwitch={handleSwitch}
        handleYearChange={handleYearChange}
        selectedCourses={selectedCourses}
        selectedProgram={selectedProgram}
        selectedSemester={selectedSemester}
        selectedYear={selectedYear}
        startWithS2={semesters[0] === 'S2'}
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
