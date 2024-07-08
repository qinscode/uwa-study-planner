// src/hooks/useCourses.ts

import { useMemo, useState } from 'react'
import { useAppSelector } from './reduxHooks'
import { Course } from '../types/course'

type TabType = 'conversion' | 'core' | 'option'

export const useCourses = () => {
  const [activeTab, setActiveTab] = useState<TabType>('conversion')
  const courses = useAppSelector(state => state.courses.availableCourses)

  const filteredCourses = useMemo(() => {
    return courses.filter(course => course.type === activeTab)
  }, [courses, activeTab])

  return { activeTab, setActiveTab, filteredCourses }
}
