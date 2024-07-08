import React, { useState } from 'react'
import { Table, Typography, Space, Switch, Button, Modal, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import SemesterCell from './SemesterCell'
import { clearSelectedCourses } from '../redux/courseSlice'

const { Title } = Typography

const SemesterTable: React.FC = () => {
  const [startWithS2, setStartWithS2] = useState(false)
  const selectedCourses = useSelector((state: RootState) => state.courses.selectedCourses)
  const dispatch = useDispatch()

  const columns = [
    {
      title: 'Semester',
      dataIndex: 'semester',
      key: 'semester',
      width: 100,
      align: 'center' as const,
    },
    {
      title: 'Course 1',
      dataIndex: 'course1',
      key: 'course1',
      width: 300,
      align: 'center' as const,
    },
    {
      title: 'Course 2',
      dataIndex: 'course2',
      key: 'course2',
      width: 300,
      align: 'center' as const,
    },
    {
      title: 'Course 3',
      dataIndex: 'course3',
      key: 'course3',
      width: 300,
      align: 'center' as const,
    },
    {
      title: 'Course 4',
      dataIndex: 'course4',
      key: 'course4',
      width: 300,
      align: 'center' as const,
    },
  ]

  const semesters = startWithS2 ? ['S2', 'S1', 'S2', 'S1'] : ['S1', 'S2', 'S1', 'S2']

  const data = semesters.map((semester, index) => ({
    key: `${semester}-${index}`,
    semester,
    course1: (
      <SemesterCell
        semesterId={`${semester}-${index}`}
        courseIndex={0}
        allowedSemester={semester as 'S1' | 'S2' | 'S1S2'}
      />
    ),
    course2: (
      <SemesterCell
        semesterId={`${semester}-${index}`}
        courseIndex={1}
        allowedSemester={semester as 'S1' | 'S2' | 'S1S2'}
      />
    ),
    course3: (
      <SemesterCell
        semesterId={`${semester}-${index}`}
        courseIndex={2}
        allowedSemester={semester as 'S1' | 'S2' | 'S1S2'}
      />
    ),
    course4: (
      <SemesterCell
        semesterId={`${semester}-${index}`}
        courseIndex={3}
        allowedSemester={semester as 'S1' | 'S2' | 'S1S2'}
      />
    ),
  }))

  const conversionCount = selectedCourses.filter(
    course => course.course.type === 'conversion'
  ).length
  const coreCount = selectedCourses.filter(course => course.course.type === 'core').length
  const optionCount = selectedCourses.filter(course => course.course.type === 'option').length

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    dispatch(clearSelectedCourses())
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleStartSemesterChange = (checked: boolean) => {
    setStartWithS2(checked)
    dispatch(clearSelectedCourses())
  }

  const handleClearTable = () => {
    setIsModalOpen(true)
  }

  const handleExportTable = () => {
    message.error('Export feature is not implemented yet!')
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', alignItems: 'center' }}>
      <Title level={3} style={{ marginTop: 0 }}>
        <Space>
          Selected Units : {selectedCourses.length} <br />
          Conversion : {conversionCount} Core : {coreCount} Option : {optionCount}
        </Space>
      </Title>

      <Space size={64}>
        <Switch
          checkedChildren="S2 Start"
          unCheckedChildren="S1 Start"
          checked={startWithS2}
          onChange={handleStartSemesterChange}
        />
        <Button onClick={handleClearTable} danger>
          Clear Table
        </Button>
        <Button onClick={handleExportTable} ghost>
          Export
        </Button>
      </Space>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="You are going to clear everything!"
        footer={
          <Space>
            <Button key="back" onClick={handleCancel}>
              No Way!
            </Button>
            <Button key="submit" type="primary" onClick={handleOk}>
              Yes, I Dare!
            </Button>
          </Space>
        }
      >
        <p>
          Are you absolutely, positively, 100% sure you want to clear everything? This is serious
          business!
        </p>
      </Modal>
    </Space>
  )
}

export default SemesterTable
