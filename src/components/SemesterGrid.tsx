import React, { useState, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'

import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Space,
  Switch,
  Button,
  Modal,
  message,
  Drawer,
} from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { clearSelectedCourses } from '../redux/courseSlice'
import CourseSelector from './CourseSelector'
import SemesterCell from './SemesterCell'

const { Header, Content, Sider } = Layout
const { Title } = Typography

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
      html2canvas(captureRef.current).then(canvas => {
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'screenshot.png'
        link.click()
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

  // console.log('selectedCourses', selectedCourses)
  const coreCoursesCount = selectedCourses.filter(course => course['course'].type === 'core').length
  const optionCoursesCount = selectedCourses.filter(
    course => course['course'].type === 'option'
  ).length
  const conversionCoursesCount = selectedCourses.filter(
    course => course['course'].type === 'conversion'
  ).length

  const siderWidth = 'max(205px, 20vw)'

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          background: '#fff',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          left: 0,
          top: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ margin: 0, color: 'black' }}>
            👨‍💻 UWA MIT Study Planner
          </Title>
        </div>
        {isMobile && <Button icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} />}
      </Header>
      <Layout style={{ marginTop: 64, background: '#fff' }}>
        {!isMobile && (
          <Sider
            width={siderWidth}
            theme="light"
            style={{
              overflow: 'auto',
              height: 'calc(100vh - 64px)',
              position: 'fixed',
              left: 0,
              top: 64,
              bottom: 0,
              background: '#fff',
            }}
          >
            <div style={{ padding: '16px' }}>
              <Title level={3}>Course Selector</Title>
              <CourseSelector onDragStart={handleDragStart} />
            </div>
          </Sider>
        )}
        <Layout style={{ marginLeft: isMobile ? 0 : siderWidth, background: '#fff' }}>
          <Content style={{ margin: '0 16px 0', overflow: 'initial', background: '#fff' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
                <Col>
                  <Title level={3}>
                    <Space>
                      Selected Units: {selectedCourses.length} Conversion: {conversionCoursesCount}
                      Core: {coreCoursesCount} Option: {optionCoursesCount}
                    </Space>
                  </Title>
                  <div>
                    <Space size={'large'}>
                      <Switch
                        checkedChildren="S2 Start"
                        unCheckedChildren="S1 Start"
                        checked={startWithS2}
                        onChange={handleStartSemesterChange}
                      />{' '}
                      <Button onClick={handleExportTable} type="primary">
                        Export
                      </Button>
                    </Space>
                  </div>
                </Col>
                <Col>
                  <Space size={'large'}>
                    <Button onClick={handleClearTable} danger>
                      Clear
                    </Button>
                  </Space>
                </Col>
              </Row>
              <div ref={captureRef}>
                {semesters.map((semester, semesterIndex) => (
                  <Card
                    key={semesterIndex}
                    title={`Semester ${semesterIndex + 1} (${semester})`}
                    style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                  >
                    <Row gutter={[16, 16]}>
                      {[0, 1, 2, 3].map(courseIndex => (
                        <Col xs={24} sm={12} md={12} lg={6} xl={6} key={courseIndex}>
                          <SemesterCell
                            semesterId={`${semester}-${semesterIndex}`}
                            courseIndex={courseIndex}
                            allowedSemester={semester as 'S1' | 'S2' | 'S1S2'}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Card>
                ))}
              </div>
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
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Clear everything?"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Confirm
          </Button>,
        ]}
      >
        <p>Are you sure you want to clear all selected courses?</p>
      </Modal>
    </Layout>
  )
}

export default SemesterGrid
