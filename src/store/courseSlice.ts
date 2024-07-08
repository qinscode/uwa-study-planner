// src/store/courseSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Course } from '../types/course'

interface Semester {
  id: string
  courses: Course[]
}

interface CourseState {
  availableCourses: Course[]
  semesters: Semester[]
}

const initialCourses: Course[] = [
  // Conversion Units
  { id: 'CITS1003', name: 'Introduction to Cybersecurity', type: 'conversion', semester: 'S1' },
  {
    id: 'CITS1401',
    name: 'Computational Thinking with Python',
    type: 'conversion',
    semester: 'S1',
  },
  {
    id: 'CITS1402',
    name: 'Relational Database Management Systems',
    type: 'conversion',
    semester: 'S2',
  },
  {
    id: 'CITS2002',
    name: 'Systems Programming',
    type: 'conversion',
    semester: 'S2',
    note: 'Choose one of CITS2002 or CITS2005',
  },
  {
    id: 'CITS2005',
    name: 'Object Oriented Programming',
    type: 'conversion',
    semester: 'S1',
    note: 'Choose one of CITS2002 or CITS2005',
  },

  // Core Units
  { id: 'CITS4401', name: 'Software Requirements and Design', type: 'core', semester: 'S1' },
  { id: 'CITS5505', name: 'Agile Web Development', type: 'core', semester: 'S2' },
  {
    id: 'CITS5206',
    name: 'Information Technology Capstone Project',
    type: 'core',
    semester: 'S1S2',
  },
  { id: 'CITS5501', name: 'Software Testing and Quality Assurance', type: 'core', semester: 'S2' },
  { id: 'CITS5506', name: 'The Internet of Things', type: 'core', semester: 'S1' },
  { id: 'CITS5503', name: 'Cloud Computing', type: 'core', semester: 'S2' },
  { id: 'CITS4407', name: 'Open Source Tools and Scripting', type: 'core', semester: 'S1' },
  {
    id: 'GENG5505',
    name: 'Project Management and Engineering Practice',
    type: 'core',
    semester: 'S1S2',
  },

  // Core Option Units
  {
    id: 'AUTO4508',
    name: 'Mobile Robots',
    type: 'option',
    semester: 'S1',
    prerequisites: ['CITS1401'],
  },
  { id: 'CITS4009', name: 'Computational Data Analysis', type: 'option', semester: 'S2' },
  {
    id: 'CITS4012',
    name: 'Natural Language Processing',
    type: 'option',
    semester: 'S1',
    prerequisites: ['CITS1401'],
  },
  { id: 'CITS4403', name: 'Computational Modelling', type: 'option', semester: 'S1' },
  {
    id: 'CITS4404',
    name: 'Artificial Intelligence and Adaptive Systems',
    type: 'option',
    semester: 'S2',
    prerequisites: ['CITS1401', 'CITS4009'],
    alternativePrerequisites: ['CITS2002', 'CITS2005'],
  },
  { id: 'CITS4419', name: 'Mobile and Wireless Computing', type: 'option', semester: 'S1' },
  {
    id: 'CITS5504',
    name: 'Data Warehousing',
    type: 'option',
    semester: 'S1',
    prerequisites: ['CITS1401', 'CITS1402'],
  },
  {
    id: 'CITS5507',
    name: 'High Performance Computing',
    type: 'option',
    semester: 'S2',
    prerequisites: ['CITS1401', 'CITS4009'],
    alternativePrerequisites: ['CITS2002', 'CITS2005'],
  },
  {
    id: 'CITS5508',
    name: 'Machine Learning',
    type: 'option',
    semester: 'S1',
    prerequisites: ['CITS1401'],
  },
  {
    id: 'ENVT4411',
    name: 'Geographic Information System Applications',
    type: 'option',
    semester: 'S1S2',
  },
  {
    id: 'GENG5507',
    name: 'Risk, Reliability and Safety',
    type: 'option',
    semester: 'S1S2',
    prerequisites: ['MATH1011', 'MATH1012'],
  },
  { id: 'INMT5518', name: 'Supply Chain Analytics', type: 'option', semester: 'S1' },
  {
    id: 'INMT5526',
    name: 'Business Intelligence',
    type: 'option',
    semester: 'S2',
    prerequisites: ['INMT5518'],
    alternativePrerequisites: ['BUSN5002', 'BUSN5101'],
  },
  { id: 'MGMT5504', name: 'Data Analysis and Decision Making', type: 'option', semester: 'S1' },
  {
    id: 'CITS5017',
    name: 'Deep Learning',
    type: 'option',
    semester: 'S2',
    prerequisites: ['CITS5508'],
  },
]

const initialState: CourseState = {
  availableCourses: initialCourses,
  semesters: [
    { id: '1', courses: [] },
    { id: '2', courses: [] },
    { id: '3', courses: [] },
    { id: '4', courses: [] },
  ],
}

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.availableCourses.push(action.payload)
    },
    moveCourse: (
      state,
      action: PayloadAction<{ courseId: string; fromSemester: string | null; toSemester: string }>
    ) => {
      const { courseId, fromSemester, toSemester } = action.payload
      let course: Course | undefined

      if (fromSemester === null) {
        // Moving from available courses
        course = state.availableCourses.find(c => c.id === courseId)
        if (course) {
          state.availableCourses = state.availableCourses.filter(c => c.id !== courseId)
        }
      } else {
        // Moving from one semester to another
        const fromSemesterIndex = state.semesters.findIndex(s => s.id === fromSemester)
        if (fromSemesterIndex !== -1) {
          const courseIndex = state.semesters[fromSemesterIndex].courses.findIndex(
            c => c.id === courseId
          )
          if (courseIndex !== -1) {
            course = state.semesters[fromSemesterIndex].courses[courseIndex]
            state.semesters[fromSemesterIndex].courses.splice(courseIndex, 1)
          }
        }
      }

      if (course) {
        const toSemesterIndex = state.semesters.findIndex(s => s.id === toSemester)
        if (toSemesterIndex !== -1) {
          state.semesters[toSemesterIndex].courses.push(course)
        }
      }
    },
    removeCourse: (state, action: PayloadAction<{ courseId: string; semesterId: string }>) => {
      const { courseId, semesterId } = action.payload
      const semesterIndex = state.semesters.findIndex(s => s.id === semesterId)
      if (semesterIndex !== -1) {
        const courseIndex = state.semesters[semesterIndex].courses.findIndex(c => c.id === courseId)
        if (courseIndex !== -1) {
          const removedCourse = state.semesters[semesterIndex].courses.splice(courseIndex, 1)[0]
          state.availableCourses.push(removedCourse)
        }
      }
    },
  },
})

export const { addCourse, moveCourse, removeCourse } = courseSlice.actions
export default courseSlice.reducer
