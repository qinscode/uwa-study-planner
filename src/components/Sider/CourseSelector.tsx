/**
 * CourseSelector Component
 *
 * Displays a tabbed interface for selecting different types of courses.
 * Contains multiple CourseCard components that can be dragged to semester cells.
 *
 * Key Features:
 *
 * 1. Course Type Tabs
 *    - Uses Tabs component to show different course types (Transfer, Core, Elective)
 *
 * 2. Course List
 *    - Filters and displays course list based on the selected course type
 */

import React, { useState } from 'react'
import { Tabs, List } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import CourseCard from './CourseCard'
import { motion, AnimatePresence } from 'framer-motion'

interface CourseSelectorProps {
  onDragStart?: () => void
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ onDragStart }) => {
  const [activeTab, setActiveTab] = useState<string>('conversion')
  const availableCourses = useSelector((state: RootState) => state.courses.availableCourses)
  const filteredCourses = availableCourses.filter(course => course.type === activeTab)
  const tags = useSelector((state: RootState) => state.courses.tags)

  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      items={tags.map(item => ({
        ...item,
        children: (
          <AnimatePresence mode="wait" key={item.key}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <List
                dataSource={filteredCourses}
                renderItem={course => (
                  <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
                    <CourseCard course={course} onDragStart={onDragStart} />
                  </motion.div>
                )}
                split={false}
                itemLayout="vertical"
                style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }} // 添加这行，确保List不覆盖子组件样式
              />
            </motion.div>
          </AnimatePresence>
        ),
      }))}
      size="small"
      style={{ minWidth: 0 }}
    />
  )
}

export default CourseSelector
