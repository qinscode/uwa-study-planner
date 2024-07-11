import React from 'react'
import { Layout, Button, Typography } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Header } = Layout
const { Title } = Typography

interface HeaderBarProps {
  isMobile: boolean
  setDrawerVisible: (visible: boolean) => void
}

const HeaderBar: React.FC<HeaderBarProps> = ({ isMobile, setDrawerVisible }) => (
  <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        background: '#fff',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        left: 0,
        top: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isMobile && (
          <Button
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{ border: 'none', boxShadow: 'none', marginRight: 16 }}
          />
        )}
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
          👨‍💻 MIT Study Planner V5.1
        </Title>
      </div>
    </Header>
  </motion.div>
)

export default HeaderBar
