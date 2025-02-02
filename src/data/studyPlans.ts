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
  '2025': {
    ai: {
      s1: [
        'CITS1401',
        'CITS1003',
        'CITS1402',
        'PHIL4100',
        'CITS2002',
        'CITS4012',
        '',
        '',
        'CITS4401',
        'CITS5505',
        'CITS5508',
        'CITS4404',
        'CITS5206',
        'CITS5017',
        '',
        '',
      ],
      s2: [
        'CITS1401',
        'CITS1003',
        'CITS1402',
        'PHIL4100',
        'CITS2005',
        'CITS4401',
        'CITS5505',
        'CITS5508',
        'CITS4012',
        'CITS5017',
        '',
        '',
        'CITS5206',
        'CITS4404',
        '',
        '',
      ],
    },
    ss: {
      s1: [
        'CITS1401',
        'CITS1003',
        'CITS1402',
        'PHIL4100',
        'CITS2002',
        '',
        '',
        '',
        'CITS4401',
        'CITS5505',
        'CITS5506',
        '',
        'CITS5206',
        'CITS5507',
        'CITS5501',
        'CITS5503',
      ],
      s2: [
        'CITS1401',
        'CITS1003',
        'CITS1402',
        'PHIL4100',
        'CITS2005',
        'CITS4401',
        'CITS5505',
        'CITS5506',
        'CITS5501',
        'CITS5503',
        'CITS5507',
        '',
        'CITS5206',
        '',
        '',
        '',
      ],
    },

    ac:{
      s1: [
        'CITS1003',
        'CITS1401',
        'CITS1402',
        'PHIL4100',
        'CITS2002',
        'PHIL4100',
        'CITS2002',
        '',
        '',
        '',
        'CITS4401',
        'CITS5505',
         '',
        '',
        'CITS5206',
        '',
        '',
        '',

      ],
      s2: [
        'CITS1003',
        'CITS1401',
        'CITS1402',
        'PHIL4100',
        'CITS2002',
        'PHIL4100',
        'CITS2005',
        'CITS4401',
        'CITS5505',
        '',
        '',
        '',
         '',
        '',
        'CITS5206',
        '',
        '',
        '',
      ],
    }
  },
}

export default studyPlans

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
