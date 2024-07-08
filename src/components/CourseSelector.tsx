import React, { useState } from 'react'
import { Tabs, List, Typography, Tag } from 'antd'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useAppSelector } from '../hooks/reduxHooks'
import { Course } from '../types/course'

const { Text } = Typography

const CourseSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'conversion' | 'core' | 'option'>('conversion')
  const courses = useAppSelector(state => state.courses.availableCourses)

  const filteredCourses = courses.filter(course => course.type === activeTab)

  const items = [
    { key: 'conversion', label: 'Conversion', children: <CourseList courses={filteredCourses} /> },
    { key: 'core', label: 'Core', children: <CourseList courses={filteredCourses} /> },
    { key: 'option', label: 'Option', children: <CourseList courses={filteredCourses} /> },
  ]

  return (
    <Tabs
      activeKey={activeTab}
      onChange={key => setActiveTab(key as 'conversion' | 'core' | 'option')}
      items={items}
    />
  )
}

const CourseList: React.FC<{ courses: Course[] }> = ({ courses }) => (
  <Droppable droppableId="courses" isDropDisabled={true}>
    {provided => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        <List
          dataSource={courses}
          renderItem={(course, index) => (
            <Draggable key={course.id} draggableId={course.id} index={index}>
              {provided => (
                <List.Item
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div style={{ width: '100%' }}>
                    <Text strong>
                      {course.id}: {course.name}
                    </Text>
                    <br />
                    <Tag
                      color={
                        course.semester === 'S1'
                          ? 'blue'
                          : course.semester === 'S2'
                          ? 'green'
                          : 'purple'
                      }
                    >
                      {course.semester}
                    </Tag>
                    {course.prerequisites && (
                      <div>
                        <Text type="secondary">
                          Prerequisites: {course.prerequisites.join(', ')}
                        </Text>
                      </div>
                    )}
                    {course.alternativePrerequisites && (
                      <div>
                        <Text type="secondary">
                          Alternative Prerequisites: {course.alternativePrerequisites.join(' or ')}
                        </Text>
                      </div>
                    )}
                    {course.note && (
                      <div>
                        <Text type="secondary">Note: {course.note}</Text>
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            </Draggable>
          )}
        />
        {provided.placeholder}
      </div>
    )}
  </Droppable>
)

export default CourseSelector
