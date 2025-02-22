// SemesterCell.tsx
import React from 'react'
import { CourseType, SemesterCourse } from '../../types'
import { useCourseDrag } from '../../hooks/useCourseDrag'
import { useCourseDrop } from '../../hooks/useCourseDrop'
import { useDispatch } from 'react-redux'
import { removeCourseFromSemester } from '../../redux/courseSlice'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SemesterCellProps {
  semesterId: string
  position: number
  course?: SemesterCourse
  allowedSemester: 'S1' | 'S2' | 'S1S2'
  startWithS2: boolean
}

const SemesterCell: React.FC<SemesterCellProps> = ({
  semesterId,
  position,
  course,
  allowedSemester,
  startWithS2,
}) => {
  const { isDragging, drag } = useCourseDrag(course?.id)
  const { isOver, canDrop, drop } = useCourseDrop({
    semesterId,
    position,
    allowedSemester,
    startWithS2,
  })

  const dispatch = useDispatch()

  const handleRemoveCourse = () => {
    if (course) {
      dispatch(removeCourseFromSemester({ id: course.id }))
    }
  }

  return (
    <div
      ref={node => drag(drop(node))}
      className={cn(
        'h-[120px] border border-dashed rounded-lg transition-all',
        isDragging && 'opacity-50',
        canDrop && 'bg-blue-50/50 border-blue-200',
        isOver && canDrop && 'bg-blue-100/50 border-blue-300',
        !course && 'hover:border-primary/50'
      )}
    >
      {course ? (
        <Card
          className={cn(
            'h-full cursor-pointer transition-all hover:shadow-md',
            {
              'bg-[#fff2cd] hover:bg-[#fff0c0]': course.course.type === 'conversion',
              'bg-[#f6ffed] hover:bg-[#f4ffe8]': course.course.type === 'core',
              'bg-[#e6f7ff] hover:bg-[#e0f5ff]': course.course.type === 'option',
              'bg-[#fbe4d5] hover:bg-[#fae0d0]':
                course.course.type === 'sss' || course.course.type === 'ais',
            }
          )}
          onClick={handleRemoveCourse}
        >
          <CardContent className="h-full p-3 flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-sm">{course.course.code}</span>
              {course.course.recommendedSemester && (
                <Badge
                  variant={course.course.recommendedSemester.toLowerCase() as 's1' | 's2' | 's1s2'}
                  className="shrink-0"
                >
                  {course.course.recommendedSemester}
                </Badge>
              )}
            </div>
            <div className="mt-1.5 flex-1 min-h-0">
              <p className="text-sm line-clamp-2">{course.course.name}</p>
              {course.course.note && (
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1 italic">
                  {course.course.note}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
         
        </div>
      )}
    </div>
  )
}

export default SemesterCell
