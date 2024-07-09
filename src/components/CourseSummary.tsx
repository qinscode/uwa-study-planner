import React from 'react'
import { Row, Col, Typography, Space, Switch, Button } from 'antd'
import './CourseSummary.scss' // 引入自定义的SCSS文件

const { Title } = Typography

interface CourseSummaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedCourses: any[]
  startWithS2: boolean
  handleStartSemesterChange: (checked: boolean) => void
  handleExportTable: () => void
  handleClearTable: () => void
}

const CourseSummary: React.FC<CourseSummaryProps> = ({
  selectedCourses,
  startWithS2,
  handleStartSemesterChange,
  handleExportTable,
  handleClearTable,
}) => {
  const coreCoursesCount = selectedCourses.filter(course => course['course'].type === 'core').length
  const optionCoursesCount = selectedCourses.filter(
    course => course['course'].type === 'option'
  ).length
  const conversionCoursesCount = selectedCourses.filter(
    course => course['course'].type === 'conversion'
  ).length

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
        <Col>
          <Title level={3} className="course-summary-title">
            <Space direction="vertical" size="small" className="course-summary-space">
              <div>Selected Units: {selectedCourses.length}</div>
              <div>Conversion: {conversionCoursesCount}</div>
              <div>Core: {coreCoursesCount}</div>
              <div>Option: {optionCoursesCount}</div>
            </Space>
          </Title>
          <div>
            <Space size="large">
              <Switch
                checkedChildren="S2 Start"
                unCheckedChildren="S1 Start"
                checked={startWithS2}
                onChange={handleStartSemesterChange}
              />
              <Button onClick={handleExportTable} type="primary">
                Export
              </Button>
            </Space>
          </div>
        </Col>
        <Col>
          <Space size="large">
            <Button onClick={handleClearTable} danger>
              Clear
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  )
}

export default CourseSummary
