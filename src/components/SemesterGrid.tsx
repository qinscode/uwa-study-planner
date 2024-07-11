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
  const [selectedProgram, setSelectedProgram] = useState('Select specific program')
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
    const startWithS2 = selectedSemester === 's2'
    const newSemesters = startWithS2 ? ['S2', 'S1', 'S2', 'S1'] : ['S1', 'S2', 'S1', 'S2']

    setSemesters(newSemesters)
    dispatch(clearSelectedCourses())
    dispatch(
      loadStudyPlan({
        year: selectedYear,
        semester: selectedSemester,
        // program: selectedProgram,
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

      html2canvas(wrapper, {
        onclone: clonedDoc => {
          const elements = clonedDoc.querySelectorAll('*')
          elements.forEach(el => {
            if (el instanceof HTMLElement) {
              const style = getComputedStyle(el)

              // 简化颜色函数
              if (style.color.startsWith('color(')) {
                el.style.color = '#000000' // 替换为安全的黑色
              }
              if (style.backgroundColor.startsWith('color(')) {
                el.style.backgroundColor = '#ffffff' // 替换为安全的白色
              }

              // 移除可能导致问题的样式
              el.style.boxShadow = 'none'
              el.style.textShadow = 'none'

              // 简化字体
              el.style.fontFamily = 'Arial, sans-serif'

              // 移除任何可能的动画或过渡效果
              el.style.transition = 'none'
              el.style.animation = 'none'
            }
          })
        },
        scale: 2, // 提高输出质量
        useCORS: true, // 允许加载跨域图片
        logging: true, // 启用日志以便调试
      })
        .then(canvas => {
          // 创建一个新的canvas元素来添加白色背景
          const finalCanvas = document.createElement('canvas')
          finalCanvas.width = canvas.width
          finalCanvas.height = canvas.height
          const ctx = finalCanvas.getContext('2d')

          if (ctx) {
            // 填充白色背景
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height)

            // 在白色背景上绘制原始canvas内容
            ctx.drawImage(canvas, 0, 0)

            // 将canvas转换为PNG并触发下载
            const link = document.createElement('a')
            link.href = finalCanvas.toDataURL('image/png')
            link.download = 'study_plan.png'
            link.click()
          }

          document.body.removeChild(wrapper)
        })
        .catch(error => {
          console.error('截图捕获时发生错误:', error)
          alert('无法生成截图。请稍后再试或联系支持团队。')
        })
    } else {
      console.error('captureRef is null')
      alert('无法找到要捕获的元素。请刷新页面后重试。')
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
