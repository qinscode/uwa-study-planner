/**
 * HeaderBar Component
 *
 * A fixed navigation bar at the top of the application, displaying the app title.
 * On mobile devices, it includes a button to open the sidebar.
 *
 * Key Features:
 *
 * 1. Fixed Top Bar
 *    - Uses Ant Design's Header component fixed at the top of the page
 *    - Provides consistent navigation experience
 *
 * 2. Mobile Device Support
 *    - Displays a button on mobile devices to open the sidebar
 *
 * 3. Application Title
 *    - Shows the application title "MIT Study Planner V5.1"
 *
 * 4. Animation
 *    - Uses framer-motion to animate the header sliding in from the top
 *
 * Implementation Details:
 *
 * - Uses Ant Design components: Layout, Button, Typography
 * - Implements responsive design with conditional rendering for mobile
 * - Applies custom styling for layout and appearance
 * - Utilizes framer-motion for entrance animation
 *
 * @param {boolean} isMobile - Indicates if the app is being viewed on a mobile device
 * @param {function} setDrawerVisible - Function to toggle the visibility of the sidebar drawer
 */

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
          👨‍💻 MIT Study Planner V6.0
        </Title>
      </div>
    </Header>
  </motion.div>
)

export default HeaderBar
