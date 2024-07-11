import { Course } from '../types'
import { getCourseByCode } from './testCourses'

export interface StudyPlan {
  [key: string]: {
    [key: string]: {
      [key: string]: Course[]
    }
  }
}

// Define studyPlans data
const studyPlans: StudyPlan = {
  '2024': {
    default: {
      s1: getCourseByCode([
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
      ]) as Course[],
      s2: getCourseByCode([
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
      ]) as Course[],
    },
  },
  '2025': {
    ai: {
      s1: getCourseByCode([
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
      ]) as Course[],
      s2: getCourseByCode([
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
      ]) as Course[],
    },
    ss: {
      s1: getCourseByCode([
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
      ]) as Course[],
      s2: getCourseByCode([
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
      ]) as Course[],
    },
    // Add more specializations as needed
  },
  // Add more years as needed
}

export default studyPlans

// Function to get study plan based on year, semester, and program
export function getStudyPlan(
  year: string,
  semester: string,
  program: string
): Course[] | undefined {
  const yearInt = parseInt(year, 10)
  if (yearInt >= 2025) {
    return studyPlans[year]?.[program]?.[semester]
  } else {
    return studyPlans[year]?.default?.[semester]
  }
}
