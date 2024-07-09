import React from 'react'
import { Row, Col, Typography, Space, Switch, Button } from 'antd'

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
              />
              <Button onClick={handleExportTable} type="primary">
                Export
              </Button>{' '}
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
    </>
  )
}

export default CourseSummary
