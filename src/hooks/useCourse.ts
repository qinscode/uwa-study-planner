/**
 * useCourses Hook
 *
 * A custom hook that simplifies interactions with the Redux store for course management.
 *
 * Key Features:
 *
 * 1. State Retrieval
 *    - Uses useSelector to fetch selectedCourses and availableCourses from the store
 *
 * 2. Action Dispatching
 *    - Provides functions to add, remove, and move courses
 *    - Internally uses useDispatch to dispatch corresponding Redux actions
 */

import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { addCourseToSemester, removeCourseFromSemester, moveCourse } from '../redux/courseSlice'
import type { Course } from '../types'

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
