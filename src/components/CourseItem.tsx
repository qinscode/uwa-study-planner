import React from 'react'
import { Card, Tag } from 'antd'
import { useDrag } from 'react-dnd'
import { Course } from '../types'
import { motion } from 'framer-motion'

// 定义课程类型
type CourseType = 'conversion' | 'core' | 'option'

// 定义颜色映射
const typeColors: Record<CourseType, string> = {
  conversion: '#e6f7ff', // 浅蓝色
  core: '#fff7e6', // 浅橙色
  option: '#f6ffed', // 浅绿色
}

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

  // 根据课程类型选择背景颜色
  const backgroundColor =
    course.type && course.type in typeColors ? typeColors[course.type as CourseType] : 'white'

  return (
    <motion.div
      ref={preview}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        marginBottom: 8,
      }}
      initial={{ scale: 1, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div ref={drag}>
        <Card
          size="small"
          title={course.code}
          extra={
            course.recommendedSemester && (
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
            )
          }
          style={{
            backgroundColor,
            transition: 'all 0.3s ease',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <p>{course.name}</p>
          {course.note && <p style={{ fontSize: '12px', color: '#888' }}>{course.note}</p>}
        </Card>
      </div>
    </motion.div>
  )
}

export default CourseItem
