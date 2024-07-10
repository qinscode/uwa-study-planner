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
  id: string // 新增，用于唯一标识每个放置的课程
  semesterId: string
  position: number // 新增，表示在semester内的位置
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
