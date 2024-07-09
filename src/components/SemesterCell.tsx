import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { Card, Tag, Typography } from 'antd'
import { RootState } from '../redux/store'
import { addCourseToSemester, removeCourseFromSemester } from '../redux/courseSlice'
import { Course } from '../types'

const { Text, Paragraph } = Typography

interface SemesterCellProps {
  semesterId: string
  courseIndex: number
  allowedSemester: 'S1' | 'S2' | 'S1S2'
}

const SemesterCell: React.FC<SemesterCellProps> = ({
  semesterId,
  courseIndex,
  allowedSemester,
}) => {
  const dispatch = useDispatch()
  const selectedCourses = useSelector((state: RootState) =>
    state.courses.selectedCourses.filter(course => course.semesterId === semesterId)
  )

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'COURSE',
    canDrop: (item: { course: Course }) =>
      item.course.recommendedSemester === allowedSemester ||
      item.course.recommendedSemester === 'S1S2',
    drop: (item: { course: Course }) => {
      dispatch(addCourseToSemester({ semesterId, course: item.course }))
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }))

  const course = selectedCourses[courseIndex]

  const handleRemoveCourse = () => {
    if (course) {
      dispatch(removeCourseFromSemester({ semesterId, course: course.course }))
    }
  }

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
          }
          style={{ width: '100%' }}
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
