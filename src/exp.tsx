import React from 'react'
import { Row, Col, Card } from 'antd'
import 'antd/dist/reset.css'
import './exp.css'

const courses = [
  {
    semester: 'S1',
    courses: [
      { id: 'GENG5505', title: 'Project Management and Engineering Practice', tag: 'S1S2' },
      { id: 'CITS4407', title: 'Open Source Tools and Scripting', tag: 'S1' },
      { id: 'CITS1003', title: 'Introduction to Cybersecurity', tag: 'S1' },
      { id: 'CITS1402', title: 'Relational Database Management Systems', tag: 'S1S2' },
    ],
  },
  {
    semester: 'S2',
    courses: [
      { id: 'CITS5503', title: 'Cloud Computing', tag: 'S2', prereq: 'CITS2002 or CITS2005' },
      {
        id: 'CITS5501',
        title: 'Software Testing and Quality Assurance',
        tag: 'S2',
        prereq: 'CITS2002 or CITS2005',
      },
      { id: 'CITS5506', title: 'The Internet of Things', tag: 'S1S2', prereq: 'CITS1401' },
      { id: 'CITS4009', title: 'Computational Data Analysis', tag: 'S2' },
    ],
  },
  {
    semester: 'S1',
    courses: [
      {
        id: 'CITS2005',
        title: 'Object Oriented Programming',
        tag: 'S1',
        prereq: 'CITS1401. Not compatible with CITS2002',
      },
      { id: 'CITS4401', title: 'Software Requirements and Design', tag: 'S1', prereq: 'CITS1401' },
      {
        id: 'CITS5206',
        title: 'Information Technology Capstone Project',
        tag: 'S1S2',
        prereq: '48 points of L4/5 units AND CITS5505',
      },
      {
        id: 'CITS5505',
        title: 'Agile Web Development',
        tag: 'S1',
        prereq: 'CITS1401 and advisable prior study: CITS1402',
      },
    ],
  },
  {
    semester: 'S2',
    courses: [
      { id: 'CITS5503', title: 'Cloud Computing', tag: 'S2', prereq: 'CITS2002 or CITS2005' },
      {
        id: 'CITS5507',
        title: 'High Performance Computing',
        tag: 'S2',
        prereq: 'CITS1401 + CITS4009 or CITS2002 or CITS2005',
      },
      {
        id: 'CITS4404',
        title: 'Artificial Intelligence and Adaptive Systems',
        tag: 'S2',
        prereq: 'CITS1401 + CITS4009 or CITS2002 or CITS2005',
      },
      { id: 'CITS4403', title: 'Computational Modelling', tag: 'S2' },
    ],
  },
]

const CourseTable: React.FC = () => {
  return (
    <div className="course-table">
      {courses.map((semester, semesterIndex) => (
        <div key={semesterIndex}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card
                className={`semester-header ${
                  semester.semester === 'S1'
                    ? 's1-header'
                    : semester.semester === 'S2'
                    ? 's2-header'
                    : ''
                }`}
                // title={`Semester ${semester.semester}`}
                bordered={false}
              >
                <p>{`Semester ${semester.semester}`}</p>
              </Card>
            </Col>
            {semester.courses.map((course, courseIndex) => (
              <Col xs={24} sm={12} md={6} key={courseIndex}>
                <Card
                  title={course.id}
                  bordered={true}
                  extra={<span className={`tag ${course.tag}`}>{course.tag}</span>}
                  className={semester.semester === 'S1' ? 'simple-card' : ''}
                >
                  <p>{course.title}</p>
                  {course.prereq && <p>Prereq: {course.prereq}</p>}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  )
}

export default CourseTable
