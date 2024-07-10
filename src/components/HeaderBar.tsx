import React from 'react'
import { Layout, Button, Typography } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

const { Header } = Layout
const { Title } = Typography

interface HeaderBarProps {
  isMobile: boolean
  setDrawerVisible: (visible: boolean) => void
}

const HeaderBar: React.FC<HeaderBarProps> = ({ isMobile, setDrawerVisible }) => (
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
      <Title level={3} style={{ margin: 0, color: 'black' }}>
        👨‍💻 UWA MIT Study Planner V5.1
      </Title>
    </div>
    {isMobile && <Button icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} />}
  </Header>
)

export default HeaderBar
