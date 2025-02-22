/**
 * SemesterCard Component
 *
 * Represents a semester card, displaying semester information and contained courses.
 * Uses SemesterCell components to show courses at each position.
 *
 * Key Features:
 *
 * 1. Card Layout and Animation
 *    - Utilizes the Card component for layout
 *    - Implements animation effects using the framer-motion library
 *
 * 2. Course Filtering
 *    - Filters courses for the current semester based on semesterId
 *
 * 3. Integration with SemesterCell Component
 *    - Renders a grid containing multiple SemesterCell components
 */

import React from 'react'
import SemesterCell from './SemesterCell'
import { motion } from 'framer-motion'
import { useCourses } from '../../hooks/useCourse'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SemesterCardProps {
  semester: string
  semesterIndex: number
  startWithS2: boolean
}

const SemesterCard: React.FC<SemesterCardProps> = ({ semester, semesterIndex, startWithS2 }) => {
  const { selectedCourses } = useCourses()
  const semesterId = `${startWithS2 ? 'S2' : 'S1'}-${Math.floor(semesterIndex / 2)}-${semester}`
  const coursesInSemester = selectedCourses.filter(course => course.semesterId === semesterId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: semesterIndex * 0.1 }}
    >
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">
            Year {Math.floor(semesterIndex / 2) + 1} Semester {semester}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[0, 1, 2, 3].map(position => (
              <motion.div
                key={position}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <SemesterCell
                  semesterId={semesterId}
                  position={position}
                  course={coursesInSemester.find(c => c.position === position)}
                  allowedSemester={semester as 'S1' | 'S2' | 'S1S2'}
                  startWithS2={startWithS2}
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default SemesterCard
