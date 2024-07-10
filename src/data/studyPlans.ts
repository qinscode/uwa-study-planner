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
      'CITS1003',
      'CITS1401',
      'CITS1402',
      'CITS5014',
      'CITS5015',
      'PHIL4100',
      'SVLG5001',
    ]) as Course[],
    s2: getCourseByCode([
      'CITS1003',
      'CITS1401',
      'CITS1402',
      'CITS5014',
      'CITS5015',
      'PHIL4100',
      'SVLG5001',
    ]) as Course[],
  },
  '2025': {},
}

export default studyPlans
