/**
 * CourseSummary Component
 *
 * Displays a summary of selected courses and provides action buttons for various operations.
 *
 * Key Features:
 *
 * 1. Course Summary
 *    - Shows the total number of selected courses and counts for each course type
 *
 * 2. Action Buttons
 *    - Provides functionality to switch semesters, export table, clear table, and load study plans
 */

import React from 'react'
import { Row, Col, Typography, Space, Switch, Button, Select, Divider } from 'antd'
import '../../styles/CourseSummary.scss'

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
  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
        <Col>
          <Title level={3} className="course-summary-title" />
          <div style={{ marginTop: '16px' }}>
            <Title level={4} className="course-summary-title">
              <div>Load UWA Official Study Plan from Handbook ?</div>
            </Title>
            <Row justify="space-between" align="middle" className="responsive-space">
              <Space className="responsive-space">
                <Space size="large" className="right-aligned-buttons">
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
                </Space>

                <Space size="large" className="right-aligned-buttons">
                  <Switch
                    checkedChildren="S2 Start"
                    unCheckedChildren="S1 Start"
                    checked={startWithS2}
                    onChange={handleSwitch}
                  />
                  <Button type="primary" onClick={handleLoadStudyPlan}>
                    Load
                  </Button>
                  <Button onClick={handleExportTable} type="primary">
                    Download
                  </Button>
                  <Button onClick={handleClearTable} danger>
                    Clear
                  </Button>
                </Space>
              </Space>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CourseSummary
