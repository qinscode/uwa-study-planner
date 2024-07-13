import { useState } from 'react'

interface CourseTabItem {
  key: string
  label: string
}

const useCourseTabs = () => {
  const initialTabs: CourseTabItem[] = [
    { key: 'conversion', label: 'Conversion' },
    { key: 'core', label: 'Core' },
    { key: 'option', label: 'Option' },
  ]

  const [items, setItems] = useState(initialTabs)

  const updateTabs = (newTabs: CourseTabItem[]) => {
    setItems(newTabs)
  }

  return { items, updateTabs }
}

export default useCourseTabs
