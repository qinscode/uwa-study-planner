import React from 'react'
import { Card, Tag } from 'antd'
import { useDrag } from 'react-dnd'
import { Course } from '../types'

interface CourseItemProps {
  course: Course
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COURSE',
    item: { course },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', marginBottom: 8 }}>
      <Card size="small" title={`${course.code}: ${course.name}`}>
        <Tag color="blue">{course.recommendedSemester}</Tag>
        {course.note && <p style={{ fontSize: '12px', color: '#888' }}>{course.note}</p>}
      </Card>
    </div>
  )
}

export default CourseItem
