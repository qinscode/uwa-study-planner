import React from 'react'
import { Row, Col, Typography, Space, Switch, Button, Select, Divider } from 'antd'
import './CourseSummary.scss'

const { Title } = Typography

interface CourseSummaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedCourses: any[]
  startWithS2: boolean
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

const CourseSummary: React.FC<CourseSummaryProps> = ({
  selectedCourses,
  startWithS2,
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
          <Divider />
          <div>
            <Space size="large">
              <Switch
                checkedChildren="S2 Start"
                unCheckedChildren="S1 Start"
                checked={startWithS2}
                onChange={handleSwitch}
              />
              <Button onClick={handleExportTable} type="primary">
                Download
              </Button>
              <Space size="large">
                <Button onClick={handleClearTable} danger>
                  Clear
                </Button>
              </Space>
            </Space>
          </div>
          <div style={{ marginTop: '0' }}>
            <Divider />
            <Title level={4} className="course-summary-title">
              <div>Want to Load UWA Official Study Plan from Handbook ?</div>
            </Title>
            <Space className="responsive-space">
              <Select
                value={selectedYear}
                onChange={handleYearChange}
                options={[
                  { value: '2024', label: '2024' },
                  { value: '2025', label: '2025' },
                ]}
              />
              <Select
                value={selectedSemester}
                style={{ width: 120 }}
                onChange={handleSemesterChange}
                options={[
                  { value: 's1', label: 'Semester 1' },
                  { value: 's2', label: 'Semester 2' },
                ]}
              />
              <Select
                value={selectedProgram}
                onChange={handleProgramChange}
                disabled={selectedYear === '2024'}
                options={[
                  { value: 'ss', label: 'Software Systems' },
                  { value: 'ai', label: 'Artificial Intelligence' },
                ]}
              />
              <Button type="primary" onClick={handleLoadStudyPlan}>
                Load
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CourseSummary
