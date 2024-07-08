import React, { useState } from 'react'
import { Tabs, List, Space } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import CourseItem from './CourseItem'

const CourseSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('conversion')
  const availableCourses = useSelector((state: RootState) => state.courses.availableCourses)

  const filteredCourses = availableCourses.filter(course => course.type === activeTab)

  const items = [
    { key: 'conversion', label: 'Conversion' },
    { key: 'core', label: 'Core' },
    { key: 'option', label: 'Option' },
  ]

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        items={items.map(item => ({
          ...item,
          children: (
            <List
              dataSource={filteredCourses}
              renderItem={course => <CourseItem course={course} />}
              split={false}
              itemLayout="vertical"
            />
          ),
        }))}
      />
    </Space>
  )
}

export default CourseSelector
