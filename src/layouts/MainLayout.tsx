/**
 * MainLayout Component
 *
 * The overall layout component for the application, including the content area and footer.
 *
 * Key Features:
 *
 * 1. Content Area
 *    - Contains the SemesterGrid component for displaying the semester grid
 *
 * 2. Footer
 *    - Displays application copyright information
 *    - Shows developer contact information
 */

/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Layout, Typography } from 'antd'

import SemesterGrid from '../components/Main/SemesterGrid'

const { Content, Footer } = Layout
const { Text } = Typography

interface MainLayoutProps {
  isMobile: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ isMobile }) => {
  const commonStyle = {
    marginLeft: isMobile ? '0' : '350px',
    fontSize: isMobile ? '14px' : '12px',
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ paddingTop: '20px', paddingBottom: '35px', background: '#fff' }}>
          <SemesterGrid />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            background: '#fff',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          {[
            'UWA MIT Study Planner • ©2024 Created by Jack Qin',
            'React • Redux • AntDesign',
            'jack@fudongs.com',
          ].map((text, index) => (
            <div key={index}>
              <Text type="secondary" style={commonStyle}>
                {text}
              </Text>
              <br />
            </div>
          ))}
        </Footer>
      </Layout>
    </>
  )
}

export default MainLayout
