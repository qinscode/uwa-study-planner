import React, { useState, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Layout, Space, Drawer } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { clearSelectedCourses, loadStudyPlan } from '../redux/courseSlice'
import HeaderBar from './HeaderBar'
import Sidebar from './Sidebar'
import CourseSummary from './CourseSummary'
import SemesterCard from './SemesterCard'
import ClearModal from './ClearModal'
import CourseSelector from './CourseSelector'

const { Content } = Layout

const SemesterGrid: React.FC = () => {
  const [semesters, setSemesters] = useState(['S1', 'S2', 'S1', 'S2'])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedSemester, setSelectedSemester] = useState('s1')
  const selectedCourses = useSelector((state: RootState) => state.courses.selectedCourses)
  const dispatch = useDispatch()

  const captureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLoadStudyPlan = () => {
    dispatch(
      loadStudyPlan({
        year: selectedYear,
        semester: selectedSemester,
        startWithS2: semesters[0] === 'S2',
      })
    )
  }

  const handleYearChange = (value: string) => {
    setSelectedYear(value)
  }

  const handleSemesterChange = (value: string) => {
    setSelectedSemester(value)
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
    setIsModalOpen(true)
  }

  const handleExportTable = () => {
    if (captureRef.current) {
      const clonedNode = captureRef.current.cloneNode(true) as HTMLElement
      const wrapper = document.createElement('div')
      wrapper.style.padding = '20px'
      wrapper.style.backgroundColor = 'white'
      wrapper.appendChild(clonedNode)
      document.body.appendChild(wrapper)

      html2canvas(wrapper).then(canvas => {
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'screenshot.png'
        link.click()

        document.body.removeChild(wrapper)
      })
    }
  }

  const handleOk = () => {
    dispatch(clearSelectedCourses())
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
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
                selectedYear={selectedYear}
                selectedSemester={selectedSemester}
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
        </Layout>
      </Layout>
      <Drawer
        title="Course Selector"
        placement="left"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={300}
        style={{ position: 'absolute' }}
      >
        <CourseSelector onDragStart={() => setDrawerVisible(false)} />
      </Drawer>
      <ClearModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
    </Layout>
  )
}

export default SemesterGrid
