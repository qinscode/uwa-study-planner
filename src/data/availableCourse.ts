import type { Course } from '../types'

const testCourses: Array<Course> = [
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
    recommendedSemester: 'S1S2',
    note: '',
  },
  {
    id: '25',
    code: 'GENG5507',
    name: 'Risk, Reliability and Safety',
    type: 'option',
    recommendedSemester: 'S1S2',
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

export default testCourses
export const getCourseByCodeAndType = (
  codeTypeArray: Array<{ code: string; type?: string }>
): Array<Course> => {
  return codeTypeArray
    .map(({ code, type = '' }) => {
      if (type) {
        return testCourses.find(course => course.code === code && course.type === type)
      } else {
        return testCourses.find(course => course.code === code)
      }
    })
    .filter(course => course !== undefined)
}

export const getCourseByCode = (codes: Array<string>): Array<Course | null> => {
  return codes.map(code => {
    if (code === '') {
      return null
    } else {
      return testCourses.find(course => course.code === code) || null
    }
  })
}
