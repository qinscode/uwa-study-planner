/**
 * SemesterCell Component
 *
 * Represents a single cell within a semester card. Implements drag-and-drop
 * functionality for courses using useDrag and useDrop hooks.
 *
 * Key Features:
 *
 * 1. Drag and Drop Functionality
 *    - Uses useDrag and useDrop hooks to enable course dragging between cells
 *
 * 2. Course Information Display
 *    - Shows detailed course information if a course is present in the cell
 *    - Displays course code, name, and recommended semester
 *
 * 3. Course Removal
 *    - Provides functionality to remove a course by clicking on the card
 */

// SemesterCell.tsx
import React from 'react'
import { Card, Tag, Typography } from 'antd'
import { CourseType, SemesterCourse, typeColors } from '../../types'
import { useCourseDrag } from '../../hooks/useCourseDrag'
import { useCourseDrop } from '../../hooks/useCourseDrop'
import { useDispatch } from 'react-redux'
import styles from '../../styles/SemesterCell.module.scss'
import { removeCourseFromSemester } from '../../redux/courseSlice'

const { Text, Paragraph } = Typography

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
  const { isDragging, drag } = useCourseDrag(course?.id)
  const { isOver, canDrop, drop } = useCourseDrop({
    semesterId,
    position,
    allowedSemester,
    startWithS2,
  })

  const dispatch = useDispatch() // Initialize dispatch

  const backgroundColor =
    course?.course.type && course.course.type in typeColors
      ? typeColors[course.course.type as CourseType]
      : 'white'

  const handleRemoveCourse = () => {
    if (course) {
      dispatch(removeCourseFromSemester({ id: course.id })) // Dispatch the action
    }
  }

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
          onClick={handleRemoveCourse} // Attach the click handler
        >
          {course.course.name} <br />
          {course.course.note && <Text type="secondary">{course.course.note}</Text>}
        </Card>
      ) : null}
    </div>
  )
}

export default SemesterCell
