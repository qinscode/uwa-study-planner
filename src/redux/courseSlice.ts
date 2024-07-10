/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Course, SemesterCourse, CourseState } from '../types'
import { message } from 'antd'
import { v4 as uuidv4 } from 'uuid' // 需要安装uuid包

const testCourses: Course[] = [
  // Conversion Courses
  {
    id: '1',
    code: 'CITS1003',
    name: 'Introduction to Cybersecurity',
    type: 'conversion',
    recommendedSemester: 'S1S2',
  },
  {
    id: '2',
    code: 'CITS1401',
    name: 'Computational Thinking with Python',
    type: 'conversion',
    recommendedSemester: 'S1S2',
  },
  {
    id: '3',
    code: 'CITS1402',
    name: 'Relational Database Management Systems',
    type: 'conversion',
    recommendedSemester: 'S1S2',
  },
  {
    id: '10',
    code: 'CITS2002',
    name: 'Systems Programming',
    type: 'conversion',
    recommendedSemester: 'S2',
    note: 'Preq: CITS1401. Not compatible with CITS2005',
    prereq: ['CITS1401'],
  },
  {
    id: '11',
    code: 'CITS2005',
    name: 'Object Oriented Programming',
    type: 'conversion',
    recommendedSemester: 'S1',
    note: 'Preq: CITS1401. Not compatible with CITS2002',
    prereq: ['CITS1401'],
  },

  // Core Courses
  {
    id: '37',
    code: 'GENG5505',
    name: 'Project Management and Engineering Practice',
    type: 'core',
    recommendedSemester: 'S1S2',
  },
  {
    id: '38',
    code: 'CITS5506',
    name: 'The Internet of Things',
    type: 'core',
    recommendedSemester: 'S1S2',
    note: 'CITS1401',
    prereq: ['CITS1401'],
  },
  {
    id: '40',
    code: 'CITS4401',
    name: 'Software Requirements and Design',
    type: 'core',
    recommendedSemester: 'S1',
    note: 'CITS1401',
    prereq: ['CITS1401'],
  },
  {
    id: '41',
    code: 'CITS5505',
    name: 'Agile Web Development',
    type: 'core',
    recommendedSemester: 'S1',
    note: 'CITS1401 and advisable prior study: CITS1402',
    prereq: ['CITS1401'],
  },
  {
    id: '42',
    code: 'CITS4407',
    name: 'Open Source Tools and Scripting',
    type: 'option',
    recommendedSemester: 'S1',
  },
  {
    id: '99',
    code: 'CITS4407',
    name: 'Open Source Tools and Scripting',
    type: 'core',
    recommendedSemester: 'S1',
  },
  {
    id: '43',
    code: 'CITS5501',
    name: 'Software Testing and Quality Assurance',
    type: 'core',
    recommendedSemester: 'S2',
    note: 'CITS2002 or CITS2005',
  },
  {
    id: '44',
    code: 'CITS5503',
    name: 'Cloud Computing',
    type: 'core',
    recommendedSemester: 'S2',
    note: 'CITS2002 or CITS2005',
  },
  {
    id: '45',
    code: 'CITS5206',
    name: 'Information Technology Capstone Project',
    type: 'core',
    recommendedSemester: 'S1S2',
    note: '48 points of L4/5 units AND CITS5505',
  },
  {
    id: '46',
    code: 'PHIL4100',
    name: 'Ethics and Critical Thinking',
    type: 'core',
    recommendedSemester: 'S1S2',
  },

  // Option Courses
  {
    id: '15',
    code: 'AUTO4508',
    name: 'Mobile Robots',
    type: 'option',
    recommendedSemester: 'S1',
    note: 'CITS1401',
    prereq: ['CITS1401'],
  },
  {
    id: '16',
    code: 'CITS4009',
    name: 'Computational Data Analysis',
    type: 'option',
    recommendedSemester: 'S2',
    note: '',
  },
  {
    id: '17',
    code: 'CITS4012',
    name: 'Natural Language Processing',
    type: 'option',
    recommendedSemester: 'S1',
    note: 'CITS1401',
    prereq: ['CITS1401'],
  },
  {
    id: '18',
    code: 'CITS4403',
    name: 'Computational Modelling',
    type: 'option',
    recommendedSemester: 'S2',
    note: '',
  },
  {
    id: '19',
    code: 'CITS4404',
    name: 'Artificial Intelligence and Adaptive Systems',
    type: 'option',
    recommendedSemester: 'S2',
    note: 'CITS1401 + CITS4009 or CITS2002 or CITS2005',
    prereq: ['CITS1401'],
  },
  {
    id: '20',
    code: 'CITS4419',
    name: 'Mobile and Wireless Computing',
    type: 'option',
    recommendedSemester: 'S1',
    note: '',
  },
  {
    id: '21',
    code: 'CITS5504',
    name: 'Data Warehousing',
    type: 'option',
    recommendedSemester: 'S1',
    note: 'CITS1401 and CITS1402',
    prereq: ['CITS1401', 'CITS1402'],
  },
  {
    id: '22',
    code: 'CITS5507',
    name: 'High Performance Computing',
    type: 'option',
    recommendedSemester: 'S2',
    note: 'CITS1401 + CITS4009 or CITS2002 or CITS2005',
    prereq: ['CITS1401'],
  },
  {
    id: '23',
    code: 'CITS5508',
    name: 'Machine Learning',
    type: 'option',
    recommendedSemester: 'S1',
    note: 'CITS1401',
    prereq: ['CITS1401'],
  },
  {
    id: '24',
    code: 'ENVT4411',
    name: 'Geographic Information System Applications',
    type: 'option',
    recommendedSemester: '',
    note: '',
  },
  {
    id: '25',
    code: 'GENG5507',
    name: 'Risk, Reliability and Safety',
    type: 'option',
    recommendedSemester: '',
    note: 'MATH1011 & MATH1012',
    prereq: ['MATH1011', 'MATH1012'],
  },
  {
    id: '26',
    code: 'INMT5518',
    name: 'Supply Chain Analytics',
    type: 'option',
    recommendedSemester: 'S1',
    note: '',
  },
  {
    id: '27',
    code: 'INMT5526',
    name: 'Business Intelligence',
    type: 'option',
    recommendedSemester: 'S2',
    note: 'INMT5518 or BUSN5002 or BUSN5101',
    prereq: ['INMT5518'],
  },
  {
    id: '28',
    code: 'MGMT5504',
    name: 'Data Analysis and Decision Making',
    type: 'option',
    recommendedSemester: 'S1',
    note: '',
  },
  {
    id: '29',
    code: 'CITS5017',
    name: 'Deep Learning',
    type: 'option',
    recommendedSemester: 'S2',
    note: 'CITS5508',
    prereq: ['CITS5508'],
  },
  {
    id: '30',
    code: 'CITS5014',
    name: 'Data and Information Technologies Research Project Part 1',
    type: 'option',
    recommendedSemester: 'S1S2',
    note: 'Research program units are by invitation only. Requires a minimum WAM of 70.',
  },
  {
    id: '31',
    code: 'CITS5015',
    name: 'Data and Information Technologies Research Project Part 2',
    type: 'option',
    recommendedSemester: 'S1S2',
    note: 'Research program units are by invitation only. Requires a minimum WAM of 70.',
  },
  {
    id: '32',
    code: 'SVLG5001',
    name: 'McCusker Centre for Citizenship Internship',
    type: 'option',
    recommendedSemester: 'S1S2',
    note: 'Requires Expression of Interest (EOI) application.',
  },
  {
    id: '33',
    code: 'CITS4402',
    name: 'Computer Vision',
    type: 'option',
    recommendedSemester: 'S1',
    note: '',
  },
]

const storedState = localStorage.getItem('courseState')
const initialState: CourseState = storedState
  ? JSON.parse(storedState)
  : {
      availableCourses: testCourses,
      selectedCourses: [],
      allCourses: [],
    }

// 保存状态到 localStorage 的辅助函数
const saveStateToLocalStorage = (state: CourseState) => {
  //   localStorage.setItem('courseState', JSON.stringify(state))
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
  const hasCITS1401 = updatedSelectedCourses.some(c => c.course.code === 'CITS1401')
  const hasCITS1402 = updatedSelectedCourses.some(c => c.course.code === 'CITS1402')
  const hasCITS4009 = updatedSelectedCourses.some(c => c.course.code === 'CITS4009')
  const hasINMT5518 = updatedSelectedCourses.some(c => c.course.code === 'INMT5518')

  if (optionCount > 4) {
    message.error('You cannot select more than 4 option courses.')
    return false
  }

  if (newCourse.code === 'CITS5501' && !hasCITS2002 && !hasCITS2005) {
    message.error('You must select either CITS2002 or CITS2005 before CITS5501.')
    return false
  }

  if (newCourse.code === 'CITS5501' && !hasCITS2002 && !hasCITS2005) {
    message.error('You must select either CITS2002 or CITS2005 before CITS5501.')
  }

  if (newCourse.code === 'GENG5505') {
    message.warning({
      content:
        "GENG5505 will be removed from 2025 S1. Try to take PHIL4100 instead if you haven't taken GENG5505.",
      duration: 5,
    })
  }

  if (newCourse.code === 'PHIL4100') {
    message.warning('PHIL4100 will be available from 2025 S1.')
  }

  if (newCourse.code === 'CITS4419') {
    message.warning('CITS4419 will be available from 2026 S1.')
  }

  if (newCourse.code === 'CITS4407') {
    message.warning('CITS4407 will be option course from 2025 S1.')
  }

  if (newCourse.code === 'CITS5504' && (!hasCITS1401 || !hasCITS1402)) {
    message.error('You must select either CITS1401 and CITS1402 before CITS5503.')
    return false
  }

  if (
    newCourse.code === 'CITS4404' &&
    !hasCITS1401 &&
    (!hasCITS4009 || !hasCITS2002 || !hasCITS2005)
  ) {
    message.error('You must select 2 programming units before CITS4404.')
    return false
  }

  if (newCourse.code === 'INMT5526' && !hasINMT5518) {
    message.error('You must select INMT5518 units before INMT5526.')
    return false
  }

  if (newCourse.code === 'CITS5206') {
    const levelFourOrFiveCourses = state.selectedCourses.filter(
      sc => sc.course.code && (sc.course.code[4] === '4' || sc.course.code[4] === '5')
    )
    if (levelFourOrFiveCourses.length < 4) {
      message.error('You must select at least 4 level 4 or level 5 courses before CITS5526.')
      return false
    }
  }

  if (
    newCourse.code === 'CITS5507' &&
    !hasCITS1401 &&
    (!hasCITS4009 || !hasCITS2002 || !hasCITS2005)
  ) {
    message.error('You must select 2 programming units before CITS5507.')
    return false
  }

  if (conversionCount > 4) {
    message.error('You cannot select more than 4 conversion courses.')
    return false
  }

  if (hasCITS2002 && hasCITS2005) {
    message.error('You cannot select both CITS2002 and CITS2005.')
    return false
  }

  return true
}

const checkprerequisites = (state: CourseState, newCourse: Course): boolean => {
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

const getStringAfterSecondDash = (input: string): string => {
  const parts = input.split('-')
  return parts.length > 2 ? parts.slice(2).join('-') : ''
}

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourseToSemester: (
      state,
      action: PayloadAction<{ semesterId: string; course: Course; position: number }>
    ) => {
      const { semesterId, course, position } = action.payload
      const newSemesterCourse: SemesterCourse = {
        id: uuidv4(),
        semesterId,
        position,
        course,
      }
      if (!checkprerequisites(state, course)) {
        return
      }
      if (!isValidSelection(state, course)) {
        return
      }
      state.selectedCourses.push(newSemesterCourse)
      state.availableCourses = state.availableCourses.filter(c => c.id !== course.id)
    },
    removeCourseFromSemester: (state, action: PayloadAction<{ id: string }>) => {
      const courseToRemove = state.selectedCourses.find(c => c.id === action.payload.id)
      if (courseToRemove) {
        state.availableCourses.push(courseToRemove.course)
        state.selectedCourses = state.selectedCourses.filter(c => c.id !== action.payload.id)
      }
    },
    moveCourse: (
      state,
      action: PayloadAction<{ id: string; newSemesterId: string; newPosition: number }>
    ) => {
      const { id, newSemesterId, newPosition } = action.payload
      const courseIndex = state.selectedCourses.findIndex(c => c.id === id)
      if (courseIndex !== -1) {
        const course = state.selectedCourses[courseIndex]
        state.selectedCourses.splice(courseIndex, 1)

        const courseSemester = getStringAfterSecondDash(course.semesterId)
        const newSemester = getStringAfterSecondDash(newSemesterId)

        const recommendedSemester = course.course.recommendedSemester

        if (recommendedSemester !== 'S1S2' && recommendedSemester !== newSemester) {
          message.error(`${course.course.code} is recommended for ${recommendedSemester}.`)
          return
        }

        course.semesterId = newSemesterId

        course.position = newPosition
        state.selectedCourses.push(course)
      }
    },
    clearSelectedCourses: state => {
      state.availableCourses = [
        ...state.availableCourses,
        ...state.selectedCourses.map(sc => sc.course),
      ]
      state.selectedCourses = []
    },
  },
})

export const { addCourseToSemester, removeCourseFromSemester, moveCourse, clearSelectedCourses } =
  courseSlice.actions
export default courseSlice.reducer
