import React, { useState, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Layout, Space, Drawer } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { clearSelectedCourses } from '../redux/courseSlice'
import HeaderBar from './HeaderBar'
import Sidebar from './Sidebar'
import CourseSummary from './CourseSummary'
import SemesterCard from './SemesterCard'
import ClearModal from './ClearModal'
import CourseSelector from './CourseSelector'

const { Content } = Layout

const SemesterGrid: React.FC = () => {
  const [startWithS2, setStartWithS2] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const selectedCourses = useSelector((state: RootState) => state.courses.selectedCourses)
  const dispatch = useDispatch()

  const semesters = startWithS2 ? ['S2', 'S1', 'S2', 'S1'] : ['S1', 'S2', 'S1', 'S2']

  const captureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleStartSemesterChange = (checked: boolean) => {
    setStartWithS2(checked)
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
                startWithS2={startWithS2}
                handleStartSemesterChange={handleStartSemesterChange}
                handleExportTable={handleExportTable}
                handleClearTable={handleClearTable}
              />
              {semesters.map((semester, semesterIndex) => (
                <SemesterCard
                  key={semesterIndex}
                  semester={semester}
                  semesterIndex={semesterIndex}
                  startWithS2={startWithS2} // 修改: 传递startWithS2
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
