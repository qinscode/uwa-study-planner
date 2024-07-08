import React from 'react'
import { Card, Tag } from 'antd'
import { useDrag } from 'react-dnd'
import { Course } from '../types'

interface CourseItemProps {
  course: Course
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'COURSE',
    item: () => {
      console.log('dragging', course)
      return { course }
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', marginBottom: 8 }}>
      <Card
        size="small"
        title={course.code}
        extra={
          <Tag
            color={
              course.recommendedSemester === 'S1'
                ? 'blue'
                : course.recommendedSemester === 'S2'
                ? 'green'
                : 'purple'
            }
          >
            {course.recommendedSemester}
          </Tag>
        }
      >
        <p>{course.name}</p>
        {course.note && <p style={{ fontSize: '12px', color: '#888' }}>{course.note}</p>}
      </Card>
    </div>
  )
}

export default CourseItem
