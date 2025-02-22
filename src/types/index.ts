export type CourseType = 'conversion' | 'core' | 'option' | 'sss' | 'ais' | 'acs'

export interface Course {
  id: string
  code: string
  name: string
  type: CourseType
  recommendedSemester?: 'S1' | 'S2' | 'S1S2'
  prereq?: Array<string>
  note?: string
}

// 基础课程选择接口
interface BaseCourse {
  id: string
  course: Course
}

// 用于拖放和显示的课程接口
export interface SemesterCourse extends BaseCourse {
  semesterId: string
  position: number
}

// 用于统计和验证的课程接口
export interface SelectedCourse extends BaseCourse {
  semesterId: string
  position: number
  semester: number
}

export interface Tag {
  key: string
  label: string
}

export interface CourseState {
  availableCourses: Array<Course>
  selectedCourses: Array<SemesterCourse>
  allCourses: Array<Course>
  currentCourse?: Course | null
  currentCourses?: Array<Course>
  tags: Array<Tag>
}

export const typeColors: Record<CourseType, string> = {
  option: '#e6f7ff',    // 浅蓝色
  conversion: '#fff2cd', // 浅橙色
  core: '#f6ffed',      // 浅绿色
  sss: '#fbe4d5',       // 浅黄色
  ais: '#fbe4d5',       // 浅黄色
  acs: '#fbe4d5'        // 浅黄色
}
