// hooks/useCourses.ts
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { addCourseToSemester, removeCourseFromSemester, moveCourse } from '../redux/courseSlice'
import { Course } from '../types'

export const useCourses = () => {
  const dispatch = useDispatch()
  const selectedCourses = useSelector((state: RootState) => state.courses.selectedCourses)
  const availableCourses = useSelector((state: RootState) => state.courses.availableCourses)

  const handleAddCourse = (semesterId: string, course: Course, position: number) => {
    dispatch(addCourseToSemester({ semesterId, course, position }))
  }

  const handleRemoveCourse = (courseId: string) => {
    dispatch(removeCourseFromSemester({ id: courseId }))
  }

  const handleMoveCourse = (courseId: string, newSemesterId: string, newPosition: number) => {
    dispatch(moveCourse({ id: courseId, newSemesterId, newPosition }))
  }

  return {
    selectedCourses,
    availableCourses,
    handleAddCourse,
    handleRemoveCourse,
    handleMoveCourse,
  }
}
