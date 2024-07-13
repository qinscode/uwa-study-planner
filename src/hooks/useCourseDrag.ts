import { useDrag } from 'react-dnd'

export const useCourseDrag = (courseId: string | undefined) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'SEMESTER_COURSE',
      item: { id: courseId, type: 'SEMESTER_COURSE' },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [courseId]
  )

  return { isDragging, drag }
}
