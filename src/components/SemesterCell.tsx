// components/SemesterCell.tsx
import React from 'react'
import { Card, Tag, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { removeCourseFromSemester } from '../redux/courseSlice'
import { useDragAndDrop } from '../hooks/useDragAndDrop'
import { SemesterCourse } from '../types'
import styles from '../styles/SemesterCell.module.scss'

const { Text, Paragraph } = Typography
type CourseType = 'conversion' | 'core' | 'option'

const typeColors: Record<CourseType, string> = {
  conversion: '#e6f7ff',
  core: '#fff7e6',
  option: '#f6ffed',
}

interface SemesterCellProps {
  semesterId: string
  position: number
  course?: SemesterCourse
  allowedSemester: 'S1' | 'S2' | 'S1S2'
  startWithS2: boolean
}

const SemesterCell: React.FC<SemesterCellProps> = ({
  semesterId,
  position,
  course,
  allowedSemester,
  startWithS2,
}) => {
  const dispatch = useDispatch()
  const { isDragging, isOver, canDrop, drag, drop } = useDragAndDrop(
    semesterId,
    position,
    allowedSemester,
    startWithS2,
    course?.course
  )

  const handleRemoveCourse = () => {
    if (course) {
      dispatch(removeCourseFromSemester({ id: course.id }))
    }
  }

  const backgroundColor =
    course?.course.type && course.course.type in typeColors
      ? typeColors[course.course.type as CourseType]
      : 'white'

  return (
    <div
      ref={node => drag(drop(node))}
      className={`${styles.semesterCell} ${isDragging ? styles.isDragging : ''} ${
        canDrop ? styles.canDrop : ''
      } ${isOver ? styles.isOver : ''}`}
    >
      {course ? (
        <Card
          size="small"
          title={
            <div className={styles.cardTitle}>
              <Paragraph className={styles.paragraph}>{course.course.code}</Paragraph>
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
          onClick={handleRemoveCourse}
        >
          {course.course.name} <br />
          {course.course.note && <Text type="secondary">{course.course.note}</Text>}
        </Card>
      ) : null}
    </div>
  )
}

export default SemesterCell
