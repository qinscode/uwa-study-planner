export interface Course {
  id: string
  code?: string
  name?: string
  type?: string
  recommendedSemester?: string
  prereq?: string[]
  note?: string
}

export interface SemesterCourse {
  semesterId: string
  course: Course
}

export interface CourseState {
  allCourses: Course[]
  selectedCourses: SemesterCourse[]
}

export interface CourseState {
  availableCourses: Course[]
  selectedCourses: SemesterCourse[]
}
