import React, { useState } from 'react'
import { Card, Row, Col } from 'antd'
import SemesterCell from './SemesterCell'
import { motion } from 'framer-motion'
import { useCourses } from '../hooks/useCourses'

interface SemesterCardProps {
  semester: string
  semesterIndex: number
  startWithS2: boolean
}

const SemesterCard: React.FC<SemesterCardProps> = ({ semester, semesterIndex, startWithS2 }) => {
  const { selectedCourses } = useCourses()

  const [isHovered, setIsHovered] = useState(false)
  const semesterId = `${startWithS2 ? 'S2' : 'S1'}-${Math.floor(semesterIndex / 2)}-${semester}`
  const coursesInSemester = selectedCourses.filter(course => course.semesterId === semesterId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: semesterIndex * 0.1 }}
    >
      <Card
        title={`Semester ${semesterIndex + 1} (${semester})`}
        style={{
          boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.1)',
          marginBottom: '16px',
          transition: 'box-shadow 0.3s ease-in-out',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Row gutter={[16, 16]}>
          {[0, 1, 2, 3].map(position => (
            <Col xs={24} sm={12} md={12} lg={6} xl={6} key={position}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <SemesterCell
                  semesterId={semesterId}
                  position={position}
                  course={coursesInSemester.find(c => c.position === position)}
                  allowedSemester={semester as 'S1' | 'S2' | 'S1S2'}
                  startWithS2={startWithS2}
                />
              </motion.div>
            </Col>
          ))}
        </Row>
      </Card>
    </motion.div>
  )
}

export default SemesterCard
