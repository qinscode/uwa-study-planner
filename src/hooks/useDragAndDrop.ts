// hooks/useDragAndDrop.ts
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { addCourseToSemester, moveCourse } from '../redux/courseSlice'
import { Course } from '../types'

export const useDragAndDrop = (
  semesterId: string,
  position: number,
  allowedSemester: 'S1' | 'S2' | 'S1S2',
  startWithS2: boolean,
  course?: Course
) => {
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

  return { isDragging, isOver, canDrop, drag, drop }
}
