import React from 'react'
import { Card, Tag } from 'antd'
import { useDrag } from 'react-dnd'
import { Course } from '../types'

interface CourseItemProps {
  course: Course
  onDragStart?: () => void
}

const CourseItem: React.FC<CourseItemProps> = ({ course, onDragStart }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'COURSE',
    item: () => {
      onDragStart && onDragStart()
      return { course }
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div ref={preview} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', marginBottom: 8 }}>
      <div ref={drag}>
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
    </div>
  )
}

export default CourseItem
