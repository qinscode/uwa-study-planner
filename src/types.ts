export interface Course {
  type: 'core' | 'option' | 'conversion' | 'sss' | 'ais'
  code: string
  name: string
  recommendedSemester?: 'S1' | 'S2' | 'S1S2'
  note?: string
}

export interface SelectedCourse {
  course: Course
  semester: number
  semesterId: string
}

export interface SemesterCourse {
  id: string
  course: Course
}

export interface Tag {
  key: string
  label: string
}

export interface CourseState {
  availableCourses: Course[]
  selectedCourses: SelectedCourse[]
  allCourses: Course[]
  tags: Tag[]
} 