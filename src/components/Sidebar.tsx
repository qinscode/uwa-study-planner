import React from 'react'
import { Layout, Typography } from 'antd'
import CourseSelector from './CourseSelector'
import { motion } from 'framer-motion'

const { Sider } = Layout
const { Title } = Typography

interface SidebarProps {
  width: string
  handleDragStart: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ width, handleDragStart }) => (
  <motion.div
    initial={{ x: -300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      type: 'tween',
      duration: 0.5,
      ease: 'easeOut',
    }}
  >
    <Sider
      width={width}
      theme="light"
      style={{
        overflow: 'auto',
        height: 'calc(100vh - 64px)',
        position: 'fixed',
        left: 0,
        top: 64,
        bottom: 0,
        background: '#fff',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ padding: '16px' }}
      >
        <Title level={3}>Course Selector</Title>
        <CourseSelector onDragStart={handleDragStart} />
      </motion.div>
    </Sider>
  </motion.div>
)

export default Sidebar
