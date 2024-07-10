import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { Card, Tag, Typography } from 'antd'
import { RootState } from '../redux/store'
import { addCourseToSemester, removeCourseFromSemester } from '../redux/courseSlice'
import { Course } from '../types'

const { Text, Paragraph } = Typography

type CourseType = 'conversion' | 'core' | 'option'

const typeColors: Record<CourseType, string> = {
  conversion: '#e6f7ff',
  core: '#fff7e6',
  option: '#f6ffed',
}

interface SemesterCellProps {
  semesterId: string
  courseIndex: number
  allowedSemester: 'S1' | 'S2' | 'S1S2'
  startWithS2: boolean
}

const SemesterCell: React.FC<SemesterCellProps> = ({
  semesterId,
  courseIndex,
  allowedSemester,
  startWithS2,
}) => {
  const dispatch = useDispatch()
  const selectedCourses = useSelector((state: RootState) =>
    state.courses.selectedCourses.filter(course => course.semesterId === semesterId)
  )

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'COURSE',
      canDrop: (item: { course: Course }) => {
        const courseAllowedSemester = item.course.recommendedSemester
        if (courseAllowedSemester === 'S1S2') return true

        if (startWithS2) {
          // If starting with S2, we need to flip the semesters
          return (
            (allowedSemester === 'S2' && courseAllowedSemester === 'S2') ||
            (allowedSemester === 'S1' && courseAllowedSemester === 'S1')
          )
        } else {
          // If starting with S1, semesters align normally
          return allowedSemester === courseAllowedSemester
        }
      },
      drop: (item: { course: Course }) => {
        dispatch(addCourseToSemester({ semesterId, course: item.course }))
      },
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [semesterId, allowedSemester, startWithS2]
  )

  const course = selectedCourses[courseIndex]

  const handleRemoveCourse = () => {
    if (course) {
      dispatch(removeCourseFromSemester({ semesterId, course: course.course }))
    }
  }

  const backgroundColor =
    course && course.course.type && course.course.type in typeColors
      ? typeColors[course.course.type as CourseType]
      : 'white'

  return (
    <div
      ref={drop}
      style={{
        height: '100%',
        minHeight: 120,
        border: '1px dashed #ccc',
        borderRadius: 4,
        padding: 8,
        background: isOver && canDrop ? '#e6f7ff' : canDrop ? '#f0f5ff' : 'white',
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
