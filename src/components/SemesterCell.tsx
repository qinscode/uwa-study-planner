import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { Card, Tag } from 'antd'
import { RootState } from '../redux/store'
import { addCourseToSemester, removeCourseFromSemester } from '../redux/courseSlice'
import { Course } from '../types'

interface SemesterCellProps {
  semesterId: string
  courseIndex: number
}

const SemesterCell: React.FC<SemesterCellProps> = ({ semesterId, courseIndex }) => {
  const dispatch = useDispatch()
  const selectedCourses = useSelector((state: RootState) =>
    state.courses.selectedCourses.filter(course => course.semesterId === semesterId)
  )

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COURSE',
    drop: (item: { course: Course }) => {
      dispatch(addCourseToSemester({ semesterId, course: item.course }))
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
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
        minHeight: 100,
        border: '1px dashed #ccc',
        borderRadius: 4,
        padding: 4,
        background: isOver ? '#f0f0f0' : 'white',
      }}
    >
      {course && (
        <Card
          size="small"
          title={`${course.course.code}: ${course.course.name}`}
          extra={
            <Tag color={course.course.recommendedSemester === 'S1' ? 'blue' : 'green'}>
              {course.course.recommendedSemester}
            </Tag>
          }
          style={{ width: '100%' }}
          onClick={handleRemoveCourse}
        >
          {course.course.note && <p>{course.course.note}</p>}
        </Card>
      )}
    </div>
  )
}

export default SemesterCell
