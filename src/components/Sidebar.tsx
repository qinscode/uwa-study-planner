import React from 'react'
import { Layout, Typography } from 'antd'
import CourseSelector from './CourseSelector'

const { Sider } = Layout
const { Title } = Typography

interface SidebarProps {
  width: string
  handleDragStart: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ width, handleDragStart }) => (
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
    <div style={{ padding: '16px' }}>
      <Title level={3}>Course Selector</Title>
      <CourseSelector onDragStart={handleDragStart} />
    </div>
  </Sider>
)

export default Sidebar
