import { Course } from '../types'
import { getCourseByCode, getCourseByCodeAndType } from './testCourses'

interface StudyPlan {
  [key: string]: {
    [key: string]: Course[]
  }
}

// 定义 studyPlans 数据
const studyPlans: StudyPlan = {
  '2024': {
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
      'GENG5505',
      '',
      'CITS4407',
      'CITS5506',
      'CITS5206',
      '',
    ]) as Course[],
  },
  '2025': {},
}

export default studyPlans
