import React, { useState } from 'react'
import { Table, Typography, Space, Switch, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { clearSelectedCourses } from '../redux/courseSlice'
import SemesterCell from './SemesterCell'

const { Title } = Typography

const SemesterTable: React.FC = () => {
  const [startWithS2, setStartWithS2] = useState(false)
  const dispatch = useDispatch()
  const selectedCourses = useSelector((state: RootState) => state.courses.selectedCourses)

  const columns = [
    { title: 'Semester', dataIndex: 'semester', key: 'semester', width: 100 },
    { title: 'Course 1', dataIndex: 'course1', key: 'course1', width: 300 },
    { title: 'Course 2', dataIndex: 'course2', key: 'course2', width: 300 },
    { title: 'Course 3', dataIndex: 'course3', key: 'course3', width: 300 },
    { title: 'Course 4', dataIndex: 'course4', key: 'course4', width: 300 },
  ]

  const semesters = startWithS2 ? ['S2', 'S1', 'S2', 'S1'] : ['S1', 'S2', 'S1', 'S2']

  const data = semesters.map((semester, index) => ({
    key: `${semester}-${index}`,
    semester,
    course1: <SemesterCell semesterId={`${semester}-${index}`} courseIndex={0} />,
    course2: <SemesterCell semesterId={`${semester}-${index}`} courseIndex={1} />,
    course3: <SemesterCell semesterId={`${semester}-${index}`} courseIndex={2} />,
    course4: <SemesterCell semesterId={`${semester}-${index}`} courseIndex={3} />,
  }))

  const conversionCount = selectedCourses.filter(
    course => course.course.type === 'conversion'
  ).length
  const coreCount = selectedCourses.filter(course => course.course.type === 'core').length
  const optionCount = selectedCourses.filter(course => course.course.type === 'option').length

  const handleStartSemesterChange = (checked: boolean) => {
    setStartWithS2(checked)
    dispatch(clearSelectedCourses())
  }

  const handleClearTable = () => {
    dispatch(clearSelectedCourses())
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space>
        <Switch
          checkedChildren="S2 Start"
          unCheckedChildren="S1 Start"
          checked={startWithS2}
          onChange={handleStartSemesterChange}
        />
        <Button onClick={handleClearTable}>Clear Table</Button>
      </Space>
      <Title level={3}>
        Selected Courses: {selectedCourses.length} (Conversion: {conversionCount}, Core: {coreCount}
        , Option: {optionCount})
      </Title>
      <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 1500 }} />
    </Space>
  )
}

export default SemesterTable
