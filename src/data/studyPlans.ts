// studyPlan.ts

import { Course } from '../types'
import { selectCourseByCode } from '../redux/courseSlice'
import { RootState } from '../redux/store'

export interface StudyPlan {
  [key: string]: {
    [key: string]: {
      [key: string]: string[]
    }
  }
}

const studyPlans: StudyPlan = {
  '2024': {
    default: {
      s1: [
        'CITS1401',
        'CITS1003',
        'CITS1402',
        '',
        'GENG5505',
        'CITS5506',
        'CITS2002',
        '',
        'CITS4401',
        'CITS5505',
        'CITS4407',
        '',
        'CITS5501',
        'CITS5503',
        'CITS5206',
        '',
      ],
      s2: [
        'CITS1401',
        'CITS1003',
        'CITS1402',
        '',
        'CITS4401',
        'CITS5505',
        'CITS2005',
        '',
        'CITS5501',
        'CITS5503',
        'PHIL4100',
        '',
        'CITS4407',
        'CITS5506',
        'CITS5206',
        '',
      ],
    },
  },
  // ... 其他年份和专业的学习计划同样更新 ...
}

export default studyPlans

// 更新获取学习计划的函数

export function getStudyPlan(
  state: RootState,
  year: string,
  semester: string,
  program: string
): (Course | null)[] | undefined {
  const yearInt = parseInt(year, 10)
  let planCodes: string[] | undefined

  if (yearInt >= 2025) {
    planCodes = studyPlans[year]?.[program]?.[semester]
  } else {
    planCodes = studyPlans[year]?.default?.[semester]
  }

  if (!planCodes) return undefined

  return planCodes.map(code => {
    if (code === '') return null
    const course = selectCourseByCode(code)(state)
    return course || null
  })
}
