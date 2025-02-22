import { message } from 'antd'
import type { Course, CourseState } from '../types'

export const checkprerequisites = (state: CourseState, newCourse: Course): boolean => {
  if (newCourse.prereq && newCourse.prereq.length > 0) {
    for (const prereq of newCourse.prereq) {
      if (!state.selectedCourses.some(sc => sc.course.code === prereq)) {
        message.error(`Prerequisite not met: ${prereq} must be completed before ${newCourse.code}`)
        return false
      }
    }
  }
  return true
}
