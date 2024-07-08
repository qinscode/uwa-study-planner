import React from 'react'
import { Layout, Typography, Space } from 'antd'
import CourseSelector from './components/CourseSelector'
import SemesterTable from './components/SemesterTable'

const { Header, Sider, Content } = Layout
const { Title } = Typography

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 20px' }}>
        <Title level={2}>IT Program Course Scheduler</Title>
      </Header>
      <Layout>
        <Sider
          width={350}
          theme="light"
          style={{ padding: '20px', overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
        >
          <CourseSelector />
        </Sider>
        <Layout style={{ marginLeft: 350 }}>
          <Content style={{ margin: '24px', padding: '24px', background: '#fff', minHeight: 280 }}>
            <SemesterTable />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
