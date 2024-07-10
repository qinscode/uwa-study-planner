import React from 'react'
import { Card, Row, Col } from 'antd'
import SemesterCell from './SemesterCell'

interface SemesterCardProps {
  semester: string
  semesterIndex: number
  startWithS2: boolean
}

const SemesterCard: React.FC<SemesterCardProps> = ({ semester, semesterIndex, startWithS2 }) => (
  <Card
    title={`Semester ${semesterIndex + 1} (${semester})`}
    style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '16px' }}
  >
    <Row gutter={[16, 16]}>
      {[0, 1, 2, 3].map(courseIndex => (
        <Col xs={24} sm={12} md={12} lg={6} xl={6} key={courseIndex}>
          <SemesterCell
            semesterId={`${startWithS2 ? 'S2' : 'S1'}-${Math.floor(semesterIndex / 2)}-${semester}`}
            courseIndex={courseIndex}
            allowedSemester={semester as 'S1' | 'S2' | 'S1S2'}
            startWithS2={startWithS2}
          />
        </Col>
      ))}
    </Row>
  </Card>
)

export default SemesterCard
