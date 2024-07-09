import React from 'react'
import { Layout, Typography, FloatButton } from 'antd'
import { BookOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import SemesterGrid from './components/SemesterGrid'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const { Content, Footer } = Layout
const { Text } = Typography

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Layout style={{ minHeight: '100vh' }}>
          <Content style={{ padding: '24px' }}>
            <SemesterGrid />
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              background: '#fff',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              padding: '20px 0',
            }}
          >
            <Text type="secondary">
              UWA MIT Study Planner ©2024 Created by Jack Qin <br /> React Redux AntDesign
            </Text>
          </Footer>
        </Layout>
        <FloatButton.Group shape="circle" style={{ right: 24 }}>
          <FloatButton icon={<QuestionCircleOutlined />} />
          <FloatButton.BackTop visibilityHeight={0} />
        </FloatButton.Group>
      </DndProvider>
    </Provider>
  )
}

export default App
