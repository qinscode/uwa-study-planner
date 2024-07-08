import React, { useState } from 'react'
import { Tabs, List, Space } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import CourseItem from './CourseItem'

const CourseSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'conversion' | 'core' | 'option'>('conversion')
  const availableCourses = useSelector((state: RootState) => state.courses.availableCourses)

  const filteredCourses = availableCourses.filter(course => course.type === activeTab)

  const items = [
    {
      key: 'conversion',
      label: 'Conversion',
      children: (
        <List
          dataSource={filteredCourses}
          renderItem={course => <CourseItem course={course} />}
          split={false}
          itemLayout="vertical"
        />
      ),
    },
    {
      key: 'core',
      label: 'Core',
      children: (
        <List
          dataSource={filteredCourses}
          renderItem={course => <CourseItem course={course} />}
          split={false}
          itemLayout="vertical"
        />
      ),
    },
    {
      key: 'option',
      label: 'Option',
      children: (
        <List
          dataSource={filteredCourses}
          renderItem={course => <CourseItem course={course} />}
          split={false}
          itemLayout="vertical"
        />
      ),
    },
  ]

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Tabs
        activeKey={activeTab}
        onChange={key => setActiveTab(key as 'conversion' | 'core' | 'option')}
        items={items}
      />
    </Space>
  )
}

export default CourseSelector
