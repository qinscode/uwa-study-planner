import React from 'react'
import { Layout, Typography } from 'antd'
import CourseSelector from './components/CourseSelector'
import SemesterTable from './components/SemesterTable'

const { Header, Sider, Content } = Layout
const { Title } = Typography

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 20px ',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          boxShadow:
            ' rgba(0, 0, 0, 0.03) 0px 1px 2px 0px, rgba(0, 0, 0, 0.02) 0px 1px 6px -1px, rgba(0, 0, 0, 0.02) 0px 2px 4px 0px', // 标题栏下方阴影
        }}
      >
        <Title level={2} style={{ color: '#000', margin: 0 }}>
          UWA MIT Study Planner
        </Title>
      </Header>
      <Layout>
        <Sider
          width={350}
          theme="light"
          style={{
            padding: '0 20px',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            background: '#fafafa', // 左边栏颜色
            borderRight: '1px solid rgba(0, 0, 0, 0.1)', // 左侧阴影边框
          }}
        >
          <Title
            level={4}
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              color: 'rgb(29, 29, 29)',
              marginTop: '0',
            }}
          >
            Course Selector
          </Title>
          <CourseSelector />
        </Sider>
        <Layout style={{ marginLeft: 350 }}>
          <Content
            style={{
              padding: '0 36px',
              background: '#fff',
              minHeight: 280,
              // borderRadius: '8px',
              // boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)', // 右侧阴影边框
            }}
          >
            {/* <Title
              level={3}
              style={{ marginBottom: '24px', marginTop: '0', color: 'rgb(29, 29, 29)' }}
            >
              Semester Plan
            </Title> */}
            <SemesterTable />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
