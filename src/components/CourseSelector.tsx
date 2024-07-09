import React, { useState } from 'react'
import { Tabs, List } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import CourseItem from './CourseItem'

interface CourseSelectorProps {
  onDragStart?: () => void
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ onDragStart }) => {
  const [activeTab, setActiveTab] = useState<string>('conversion')
  const availableCourses = useSelector((state: RootState) => state.courses.availableCourses)

  const filteredCourses = availableCourses.filter(course => course.type === activeTab)

  const items = [
    { key: 'conversion', label: 'Conversion' },
    { key: 'core', label: 'Core' },
    { key: 'option', label: 'Option' },
  ]

  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      items={items.map(item => ({
        ...item,
        children: (
          <List
            dataSource={filteredCourses}
            renderItem={course => <CourseItem course={course} onDragStart={onDragStart} />}
            split={false}
            itemLayout="vertical"
          />
        ),
      }))}
    />
  )
}

export default CourseSelector
