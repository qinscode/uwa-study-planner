export interface Course {
  id: string
  code: string
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
  currentCourse: Course | null // 新增字段
  currentCourses: Course[] // 新增字段
  tags: Array<{ key: string; label: string }>
}

export interface CourseState {
  availableCourses: Course[]
  selectedCourses: SemesterCourse[]
}

export type CourseType = 'conversion' | 'core' | 'option' | 'sss' | 'ais'

export const typeColors: Record<CourseType, string> = {
  option: '#e6f7ff', // 浅蓝色
  conversion: '#fff2cd', // 浅橙色
  core: '#f6ffed', // 浅绿色

  sss: '#fbe4d5', // 浅黄色
  ais: '#fbe4d5', // 浅黄色
}
