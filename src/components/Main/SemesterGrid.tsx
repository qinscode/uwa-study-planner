/**
 * SemesterGrid Component
 *
 * The main layout component of the application, responsible for:
 * - Rendering the entire page layout (header, sidebar, main content)
 * - Managing global state
 * - Providing user interaction functionalities
 */

import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { clearSelectedCourses, loadStudyPlan } from '../../redux/courseSlice'
import HeaderBar from '../HeaderBar'
import Sidebar from '../Sider/Sidebar'
import MainContent from './MainContent'
import ClearModal from '../Modals/ClearModal'
import CourseSelector from '../Sider/CourseSelector'
import exportTableToPNG from '../../utils/exportTableToPNG'
import { useModal } from '../../hooks/useModal'
import { useResponsive } from '../../hooks/useResponsive'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { BookOpen } from 'lucide-react'

const SemesterGrid: React.FC = () => {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal()
  const { isMobile } = useResponsive()
  const [semesters, setSemesters] = useState(['S1', 'S2', 'S1', 'S2'])
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selectedYear, setSelectedYear] = useState('2025')
  const [selectedSemester, setSelectedSemester] = useState('s1')
  const [selectedProgram, setSelectedProgram] = useState('Select Specialization')
  const selectedCourses = useSelector((state: RootState) => state.courses.selectedCourses)
  const dispatch = useDispatch()

  const captureRef = useRef<HTMLDivElement>(null)

  const handleLoadStudyPlan = () => {
    const startWithS2 = selectedSemester === 's2'
    const newSemesters = startWithS2 ? ['S2', 'S1', 'S2', 'S1'] : ['S1', 'S2', 'S1', 'S1']

    setSemesters(newSemesters)
    dispatch(clearSelectedCourses())
    dispatch(
      loadStudyPlan({
        year: selectedYear,
        semester: selectedSemester,
        program: selectedProgram,
        startWithS2: startWithS2,
      })
    )
  }

  const handleYearChange = (value: string) => {
    setSelectedYear(value)
  }

  const handleSemesterChange = (value: string) => {
    setSelectedSemester(value)
  }

  const handleProgramChange = (value: string) => {
    setSelectedProgram(value)
  }

  const handleSwitch = () => {
    setSemesters(prevSemesters => {
      const newSemesters = [...prevSemesters]
      for (let i = 0; i < newSemesters.length; i++) {
        newSemesters[i] = newSemesters[i] === 'S1' ? 'S2' : 'S1'
      }
      return newSemesters
    })
    dispatch(clearSelectedCourses())
  }

  const handleClearTable = () => {
    handleOpenModal()
  }

  const handleExportTable = () => {
    exportTableToPNG(captureRef)
  }

  const handleOk = () => {
    dispatch(clearSelectedCourses())
    handleCloseModal()
  }

  const handleCancel = () => {
    handleCloseModal()
  }

  const handleDragStart = () => {
    if (isMobile) {
      setDrawerVisible(false)
    }
  }

  const sidebarWidth = 'min(90vw, 360px)'

  return (
    <div className="min-h-screen bg-background">
      <HeaderBar isMobile={isMobile} setDrawerVisible={setDrawerVisible} />
      
      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        {!isMobile && (
          <div style={{ width: sidebarWidth }} className="fixed left-0 top-16 bottom-0">
            <Sidebar width={sidebarWidth} handleDragStart={handleDragStart} />
          </div>
        )}

        {/* Main Content Area */}
        <main 
          className={cn(
            "flex-1 min-h-screen pt-16",
            !isMobile && `ml-[${sidebarWidth}]`
          )}
          style={!isMobile ? { marginLeft: sidebarWidth } : undefined}
        >
          <MainContent
            captureRef={captureRef}
            semesters={semesters}
            selectedCourses={selectedCourses}
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
        </main>
      </div>

      {/* Mobile Drawer */}
      <Sheet open={drawerVisible} onOpenChange={setDrawerVisible}>
        <SheetContent side="left" className="w-[80vw] sm:w-[385px] p-0">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Unit Selection</h3>
            </div>
            <CourseSelector onDragStart={() => setDrawerVisible(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <ClearModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
    </div>
  )
}

export default SemesterGrid
