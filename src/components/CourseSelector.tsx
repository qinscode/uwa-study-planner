import React from 'react'
import { Tabs, List, Typography, Tag } from 'antd'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useCourses } from '../hooks/useCourses'
import { Course } from '../types/course'

const { TabPane } = Tabs
const { Text } = Typography

const CourseSelector: React.FC = () => {
  const { activeTab, setActiveTab, filteredCourses } = useCourses()

  return (
    <Tabs
      activeKey={activeTab}
      onChange={key => setActiveTab(key as 'conversion' | 'core' | 'option')}
    >
      <TabPane tab="Conversion" key="conversion">
        <CourseList courses={filteredCourses} />
      </TabPane>
      <TabPane tab="Core" key="core">
        <CourseList courses={filteredCourses} />
      </TabPane>
      <TabPane tab="Option" key="option">
        <CourseList courses={filteredCourses} />
      </TabPane>
    </Tabs>
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
