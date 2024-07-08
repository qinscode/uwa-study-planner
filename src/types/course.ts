// src/types/course.ts

export interface Course {
  id: string
  name: string
  type: 'conversion' | 'core' | 'option'
  semester: 'S1' | 'S2' | 'S1S2'
  prerequisites?: string[]
  alternativePrerequisites?: string[]
  note?: string
}
