import React from 'react'
import { Card, Tag, Typography } from 'antd'
import { SemesterCourse } from '../types'
import styles from '../styles/CourseCard.module.scss'

const { Text, Paragraph } = Typography

interface CourseCardProps {
  course: SemesterCourse
  backgroundColor: string
  onRemove: () => void
}

const CourseCard: React.FC<CourseCardProps> = ({ course, backgroundColor, onRemove }) => {
  return (
    <Card
      size="small"
      title={
        <div className={styles.cardTitle}>
          <Paragraph className={styles.courseCode}>{course.course.code}</Paragraph>
        </div>
      }
      extra={
        course.course.recommendedSemester && (
          <Tag
            color={
              course.course.recommendedSemester === 'S1'
                ? 'blue'
                : course.course.recommendedSemester === 'S2'
                ? 'green'
                : 'purple'
            }
          >
            {course.course.recommendedSemester}
          </Tag>
        )
      }
      style={{ width: '100%', backgroundColor }}
      onClick={onRemove}
    >
      {course.course.name} <br />
      {course.course.note && <Text type="secondary">{course.course.note}</Text>}
    </Card>
  )
}

export default CourseCard
