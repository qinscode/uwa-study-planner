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

import React from 'react'
import { useDispatch } from 'react-redux'
import { useDrop, useDrag } from 'react-dnd'
import { Card, Tag, Typography } from 'antd'
import { addCourseToSemester, removeCourseFromSemester, moveCourse } from '../redux/courseSlice'
import { Course, SemesterCourse } from '../types'
import { typeColors, CourseType } from '../types'

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
  const dispatch = useDispatch()

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'SEMESTER_COURSE',
      item: { id: course?.id, type: 'SEMESTER_COURSE' },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [course]
  )

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ['COURSE', 'SEMESTER_COURSE'],
      canDrop: (item: { course?: Course; type: string }) => {
        if (item.type === 'SEMESTER_COURSE') return true
        if (!item.course) return false

        const courseAllowedSemester = item.course.recommendedSemester
        if (courseAllowedSemester === 'S1S2') return true

        if (startWithS2) {
          return (
            (allowedSemester === 'S2' && courseAllowedSemester === 'S2') ||
            (allowedSemester === 'S1' && courseAllowedSemester === 'S1')
          )
        } else {
          return allowedSemester === courseAllowedSemester
        }
      },
      drop: (item: { id?: string; course?: Course; type: string }) => {
        if (item.type === 'SEMESTER_COURSE' && item.id) {
          dispatch(moveCourse({ id: item.id, newSemesterId: semesterId, newPosition: position }))
        } else if (item.course) {
          dispatch(addCourseToSemester({ semesterId, course: item.course, position }))
        }
      },
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [semesterId, position, allowedSemester, startWithS2]
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
      style={{
        height: '100%',
        minHeight: 120,
        border: '1px dashed #ccc',
        borderRadius: 4,
        padding: 8,
        background: isOver && canDrop ? '#e6f7ff' : canDrop ? '#f0f5ff' : 'white',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {course ? (
        <Card
          size="small"
          title={
            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Paragraph
                style={{
                  margin: 0,
                  whiteSpace: 'normal',
                  width: '100%',
                  overflowWrap: 'break-word',
                }}
              >
                {course.course.code}
              </Paragraph>
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
