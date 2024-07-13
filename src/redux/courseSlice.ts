/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Course, SemesterCourse, CourseState } from '../types'
import { message } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { getStudyPlan } from '../data/studyPlans'
import testCourses from '../data/availableCourse'
import { RootState } from './store'

const storedState = localStorage.getItem('courseState')
const initialState: CourseState = storedState
  ? JSON.parse(storedState)
  : {
      availableCourses: testCourses || [],
      selectedCourses: [],
      allCourses: [],
      tags: [
        { key: 'conversion', label: 'Conversion' },
        { key: 'core', label: 'Core' },
        { key: 'option', label: 'Option' },
      ],
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
    message.error('You cannot select more than 4 option units.')
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
      content: 'GENG5505 will be removed from 2025 S1.',
    })
  }

  if (newCourse.code === 'PHIL4100') {
    message.warning('PHIL4100 will be available from 2025 S1.')
  }

  if (newCourse.code === 'CITS4419') {
    message.warning('CITS4419 will be available from 2026 S1.')
  }

  if (newCourse.code === 'CITS4407') {
    message.warning('CITS4407 will be a option unit from 2025 S1.')
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
    message.error('You must select INMT5518 before INMT5526.')
    return false
  }

  if (newCourse.code === 'CITS5206') {
    const levelFourOrFiveCourses = state.selectedCourses.filter(
      sc => sc.course.code && (sc.course.code[4] === '4' || sc.course.code[4] === '5')
    )
    if (levelFourOrFiveCourses.length < 4) {
      message.error('You must select at least 4 level 4 or level 5 units before CITS5526.')
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
    message.error('You cannot select more than 4 conversion units.')
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

const updateCoursesTypes = (
  courses: Course[],
  updates: Array<{ courseCode: string; newType: string }>
): Course[] => {
  const updateMap = new Map(updates.map(update => [update.courseCode, update.newType]))
  return courses.map(course => {
    const newType = updateMap.get(course.code)
    return newType ? { ...course, type: newType } : course
  })
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

    updateTag: (state, action: PayloadAction<Array<{ key: string; label: string }>>) => {
      state.tags = action.payload
    },

    loadStudyPlan: (
      state,
      action: PayloadAction<{
        year: string
        semester: string
        startWithS2: boolean
        program: string
      }>
    ) => {
      const { year, semester, startWithS2, program } = action.payload

      if (year === '2025' && program === 'ai') {
        const updates = [
          { courseCode: '4407', newType: 'option' },

          { courseCode: 'CITS5501', newType: 'option' },
          { courseCode: 'CITS5506', newType: 'option' },
          { courseCode: 'CITS5503', newType: 'option' },
          { courseCode: 'CITS5507', newType: 'option' },
          { courseCode: 'CITS4012', newType: 'ais' },
          { courseCode: 'CITS5508', newType: 'ais' },
          { courseCode: 'CITS4404', newType: 'ais' },
          { courseCode: 'CITS5017', newType: 'ais' },
        ]
        state.tags = [
          { key: 'conversion', label: 'Conversion' },
          { key: 'core', label: 'Core' },
          { key: 'option', label: 'Option' },
          { key: 'ais', label: 'AIS' },
        ]
        state.availableCourses = updateCoursesTypes(state.availableCourses, updates)
      }
      if (year === '2025' && program === 'ss') {
        const updates = [
          { courseCode: '4407', newType: 'option' },

          { courseCode: 'CITS5501', newType: 'sss' },
          { courseCode: 'CITS5506', newType: 'sss' },
          { courseCode: 'CITS5503', newType: 'sss' },
          { courseCode: 'CITS5507', newType: 'sss' },
          { courseCode: 'CITS4012', newType: 'option' },
          { courseCode: 'CITS5508', newType: 'option' },
          { courseCode: 'CITS4404', newType: 'option' },
          { courseCode: 'CITS5017', newType: 'option' },
        ]
        state.tags = [
          { key: 'conversion', label: 'Conversion' },
          { key: 'core', label: 'Core' },
          { key: 'option', label: 'Option' },
          { key: 'sss', label: 'SSS' },
        ]
        state.availableCourses = updateCoursesTypes(state.availableCourses, updates)
        console.log('tags', state.tags)
        console.log('availableCourses', state.availableCourses)
      }
      if (year === '2024') {
        state.availableCourses = testCourses
        state.tags = [
          { key: 'conversion', label: 'Conversion' },
          { key: 'core', label: 'Core' },
          { key: 'option', label: 'Option' },
        ]
        console.log('tags', state.tags)
      }

      state.availableCourses = [
        ...state.availableCourses,
        ...(state.selectedCourses?.map(sc => sc.course) || []),
      ]
      state.selectedCourses = []

      const planCourses = getStudyPlan({ courses: state }, year, semester, program)
      console.log('planCourses', planCourses)
      if (planCourses) {
        const semesterIds = [
          `${startWithS2 ? 'S2' : 'S1'}-0-${startWithS2 ? 'S2' : 'S1'}`,
          `${startWithS2 ? 'S2' : 'S1'}-0-${!startWithS2 ? 'S2' : 'S1'}`,
          `${startWithS2 ? 'S2' : 'S1'}-1-${startWithS2 ? 'S2' : 'S1'}`,
          `${startWithS2 ? 'S2' : 'S1'}-1-${!startWithS2 ? 'S2' : 'S1'}`,
        ]

        let currentSemesterIndex = 0
        let position = 0

        planCourses.forEach((course, index) => {
          if (course === null) {
            // Skip this position
            position++
            if (position >= 4) {
              position = 0
              currentSemesterIndex++
            }
            return
          }

          const existingCourse = state.availableCourses.find(c => c.code === course.code)
          if (existingCourse) {
            if (position >= 4) {
              position = 0
              currentSemesterIndex++
            }

            if (currentSemesterIndex >= semesterIds.length) {
              message.error('Not enough semester slots available for the courses')
              return
            }

            state.availableCourses = state.availableCourses.filter(c => c.code !== course.code)
            const newSemesterCourse: SemesterCourse = {
              id: uuidv4(),
              semesterId: semesterIds[currentSemesterIndex],
              position,
              course: existingCourse,
            }
            state.selectedCourses.push(newSemesterCourse)
            position++
          }
          console.log('state.selectedCourses', state.selectedCourses)
        })
      }
    },
  },
})

export const {
  addCourseToSemester,
  removeCourseFromSemester,
  moveCourse,
  clearSelectedCourses,
  loadStudyPlan,
} = courseSlice.actions
export default courseSlice.reducer

export const selectCourseByCode =
  (code: string) =>
  (state: RootState): Course | undefined => {
    const availableCourses = state.courses?.availableCourses || []
    console.log('Available courses:', availableCourses)
    return availableCourses.find(course => course.code === code)
  }

export const selectAllAvailableCourses = (state: RootState): Course[] => {
  return state.courses?.availableCourses || []
}
