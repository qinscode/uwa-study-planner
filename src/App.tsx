import React from 'react'
import { FloatButton, Layout, Typography } from 'antd'
import { BookOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import CourseSelector from './components/CourseSelector'
import SemesterTable from './components/SemesterTable'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const { Header, Sider, Content, Footer } = Layout
const { Title, Text } = Typography

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <Layout style={{ minHeight: '100vh', background: '#fff' }}>
          <Header
            style={{
              background: '#fff',
              // padding: '0 20px ',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              boxShadow:
                ' rgba(0, 0, 0, 0.03) 0px 1px 2px 0px, rgba(0, 0, 0, 0.02) 0px 1px 6px -1px, rgba(0, 0, 0, 0.02) 0px 2px 4px 0px', // 标题栏下方阴影
            }}
          >
            <BookOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#000' }} />
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
                background: '#fff', // 左边栏颜色
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
                Unit List
              </Title>
              <CourseSelector />
            </Sider>
            <Layout style={{ marginLeft: 350 }}>
              <Content
                style={{
                  padding: '0 36px',
                  background: '#fff',
                  minHeight: 280,
                }}
              >
                <SemesterTable />
              </Content>
              <Footer
                style={{
                  textAlign: 'center',
                  background: '#fff', // 背景颜色
                  borderTop: '1px solid rgba(0, 0, 0, 0.1)', // 顶部边框
                  padding: '20px 0', // 内边距
                }}
              >
                <Text type="secondary">
                  UWA MIT Study Planner ©2024 Created by Jack Qin <br /> React Redux AntDesign
                </Text>
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </Provider>
      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        <FloatButton icon={<QuestionCircleOutlined />} />
        <FloatButton />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
    </>
  )
}

export default App
