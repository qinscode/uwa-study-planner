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
    s1: getCourseByCode(['CITS1003', 'CITS1401', 'CITS1402', 'MGMT5504', 'CITS2002']) as Course[],
    s2: getCourseByCode(['CITS1003', 'CITS1401']) as Course[],
  },
  '2025': {},
}

export default studyPlans
