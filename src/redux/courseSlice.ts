import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Course, SemesterCourse, CourseState } from '../types'
import { message } from 'antd'

const testCourses: Course[] = [
  // Conversion Courses
  {
    id: '1',
    code: 'CITS1003',
    name: 'Introduction to Cybersecurity',
    type: 'conversion',
    recommendedSemester: 'S1',
  },
  {
    id: '2',
    code: 'CITS1401',
    name: 'Computational Thinking with Python',
    type: 'conversion',
    recommendedSemester: 'S1',
  },
  {
    id: '3',
    code: 'CITS1402',
    name: 'Relational Database Management Systems',
    type: 'conversion',
    recommendedSemester: 'S2',
  },

  // Core Courses
  {
    id: '4',
    code: 'CITS4009',
    name: 'Computational Data Analysis',
    type: 'core',
    recommendedSemester: 'S1',
  },
  {
    id: '5',
    code: 'CITS5501',
    name: 'Software Testing and Quality Assurance',
    type: 'core',
    recommendedSemester: 'S2',
  },
  {
    id: '6',
    code: 'CITS5503',
    name: 'Cloud Computing',
    type: 'core',
    recommendedSemester: 'S1',
  },

  // Option Courses
  {
    id: '7',
    code: 'CITS4401',
    name: 'Computer Vision',
    type: 'option',
    recommendedSemester: 'S2',
  },
  {
    id: '8',
    code: 'CITS4403',
    name: 'Computational Intelligence',
    type: 'option',
    recommendedSemester: 'S1',
  },
  {
    id: '9',
    code: 'CITS5505',
    name: 'Agile Web Development',
    type: 'option',
    recommendedSemester: 'S2',
  },

  // Courses with notes
  {
    id: '10',
    code: 'CITS2002',
    name: 'Systems Programming',
    type: 'conversion',
    recommendedSemester: 'S2',
    note: 'Choose one of CITS2002 or CITS2005',
  },
  {
    id: '11',
    code: 'CITS2005',
    name: 'Object Oriented Programming',
    type: 'conversion',
    recommendedSemester: 'S1',
    note: 'Choose one of CITS2002 or CITS2005',
  },
]

const initialState: CourseState = {
  availableCourses: testCourses,
  selectedCourses: [],
  allCourses: [],
}

const sortCourses = (courses: Course[]) => {
  return courses.sort((a, b) => {
    if (a.code && b.code) {
      return a.code.localeCompare(b.code)
    }
    return 0
  })
}

const isValidSelection = (state: CourseState, newCourse: Course): boolean => {
  const updatedSelectedCourses = [...state.selectedCourses, { semesterId: '', course: newCourse }]

  const conversionCount = updatedSelectedCourses.filter(c => c.course.type === 'conversion').length
  const optionCount = updatedSelectedCourses.filter(c => c.course.type === 'option').length

  const hasCITS2002 = updatedSelectedCourses.some(c => c.course.code === 'CITS2002')
  const hasCITS2005 = updatedSelectedCourses.some(c => c.course.code === 'CITS2005')

  if (conversionCount > 4) {
    message.error('You cannot select more than 4 conversion courses.')
    return false
  }

  if (optionCount > 4) {
    message.error('You cannot select more than 4 option courses.')
    return false
  }

  if (hasCITS2002 && hasCITS2005) {
    message.error('You cannot select both CITS2002 and CITS2005.')
    return false
  }

  return true
}

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourseToSemester: (state, action: PayloadAction<SemesterCourse>) => {
      if (isValidSelection(state, action.payload.course)) {
        state.selectedCourses.push(action.payload)
        state.availableCourses = sortCourses(
          state.availableCourses.filter(course => course.id !== action.payload.course.id)
        )
      }
    },
    removeCourseFromSemester: (state, action: PayloadAction<SemesterCourse>) => {
      state.selectedCourses = state.selectedCourses.filter(
        course =>
          !(
            course.semesterId === action.payload.semesterId &&
            course.course.id === action.payload.course.id
          )
      )
      state.availableCourses = sortCourses([...state.availableCourses, action.payload.course])
    },
    clearSelectedCourses: state => {
      state.availableCourses = sortCourses([
        ...state.availableCourses,
        ...state.selectedCourses.map(sc => sc.course),
      ])
      state.selectedCourses = []
    },
  },
})

export const { addCourseToSemester, removeCourseFromSemester, clearSelectedCourses } =
  courseSlice.actions
export default courseSlice.reducer
