/**
 * MainContent Component
 *
 * Represents the main content area of the application. Displays course summary
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
import { Layout, Space } from 'antd'
import CourseSummary from './CourseSummary'
import SemesterCard from './SemesterCard'

const { Content } = Layout

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
    <Content
      ref={captureRef}
      style={{ margin: '0 16px 0', overflow: 'initial', background: '#fff' }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
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
        {semesters.map((semester, semesterIndex) => (
          <SemesterCard
            key={semesterIndex}
            semester={semester}
            semesterIndex={semesterIndex}
            startWithS2={semesters[0] === 'S2'}
          />
        ))}
      </Space>
    </Content>
  )
}

export default MainContent
