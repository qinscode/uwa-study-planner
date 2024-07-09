import React from 'react'
import { Card, Row, Col } from 'antd'
import SemesterCell from './SemesterCell'

interface SemesterCardProps {
  semester: string
  semesterIndex: number
}

const SemesterCard: React.FC<SemesterCardProps> = ({ semester, semesterIndex }) => (
  <Card
    title={`Semester ${semesterIndex + 1} (${semester})`}
    style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: '16px' }}
  >
    <Row gutter={[16, 16]}>
      {[0, 1, 2, 3].map(courseIndex => (
        <Col xs={24} sm={12} md={12} lg={6} xl={6} key={courseIndex}>
          <SemesterCell
            semesterId={`${semester}-${semesterIndex}`}
            courseIndex={courseIndex}
            allowedSemester={semester as 'S1' | 'S2' | 'S1S2'}
          />
        </Col>
      ))}
    </Row>
  </Card>
)

export default SemesterCard
