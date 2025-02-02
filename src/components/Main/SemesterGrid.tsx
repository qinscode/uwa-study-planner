/**
 * SemesterGrid Component
 *
 * The main layout component of the application, responsible for:
 * - Rendering the entire page layout (header, sidebar, main content)
 * - Managing global state
 * - Providing user interaction functionalities
 *
 * Key Features:
 *
 * 1. Layout and State Management
 *    - Uses useState and useRef for internal state and references
 *
 * 2. Redux Integration
 *    - Utilizes useSelector to retrieve state from Redux store
 *    - Employs useDispatch for dispatching actions
 *
 * 3. Responsive Design
 *    - Dynamically shows/hides sidebar and drawer based on screen size
 *
 * 4. User Interaction Functionalities
 *    - Loading study plans
 *    - Switching between semesters
 *    - Clearing the table
 *    - Exporting table data
 */

import React, { useRef, useState } from 'react'
import { Layout, Drawer } from 'antd'
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
    const newSemesters = startWithS2 ? ['S2', 'S1', 'S2', 'S1'] : ['S1', 'S2', 'S1', 'S2']

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

  const siderWidth = 'max(205px, 20vw)'

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <HeaderBar isMobile={isMobile} setDrawerVisible={setDrawerVisible} />
      <Layout style={{ marginTop: 64, background: '#fff' }}>
        {!isMobile && <Sidebar width={siderWidth} handleDragStart={handleDragStart} />}
        <Layout style={{ marginLeft: isMobile ? 0 : siderWidth, background: '#fff' }}>
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
        </Layout>
      </Layout>
      <Drawer
        title="Unit Selector"
        placement="left"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={350}
        style={{ position: 'absolute' }}
      >
        <CourseSelector onDragStart={() => setDrawerVisible(false)} />
      </Drawer>
      <ClearModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
    </Layout>
  )
}

export default SemesterGrid
