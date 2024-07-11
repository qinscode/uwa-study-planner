/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Layout, Typography, FloatButton, Modal, Row, Col, Card, Space } from 'antd'
import {
  QuestionCircleOutlined,
  DragOutlined,
  TableOutlined,
  CheckSquareOutlined,
  BulbOutlined,
} from '@ant-design/icons'
import SemesterGrid from './components/SemesterGrid'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'

const { Content, Footer } = Layout
const { Text, Title, Paragraph } = Typography

const App: React.FC = () => {
  const [isInstructionsModalVisible, setIsInstructionsModalVisible] = useState(false)

  const showInstructions = () => {
    setIsInstructionsModalVisible(true)
  }

  const handleInstructionsModalClose = () => {
    setIsInstructionsModalVisible(false)
  }

  return (
    <Provider store={store}>
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
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
            <Text type="secondary">
              UWA MIT Study Planner • ©2024 Created by Jack Qin
              <br /> React • Redux • AntDesign
              <br /> Email: jack@fudongs.com
            </Text>
          </Footer>
        </Layout>
        <FloatButton.Group shape="circle" style={{ right: 24 }}>
          <FloatButton icon={<QuestionCircleOutlined />} onClick={showInstructions} />
          <FloatButton.BackTop visibilityHeight={0} />
        </FloatButton.Group>
        <Modal
          title={
            <Title level={3} style={{ textAlign: 'center' }}>
              Welcome to UWA MIT Study Planner!
            </Title>
          }
          open={isInstructionsModalVisible}
          onOk={handleInstructionsModalClose}
          onCancel={handleInstructionsModalClose}
          footer={null}
          width={800}
        >
          <Paragraph style={{ textAlign: 'center', fontSize: '16px', marginBottom: '24px' }}>
            Plan your Master of Information Technology journey at UWA with ease. Here's how to get
            started:
          </Paragraph>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card
                hoverable
                cover={
                  <DragOutlined style={{ fontSize: '48px', color: '#1890ff', marginTop: '24px' }} />
                }
                style={{ textAlign: 'center' }}
              >
                <Card.Meta
                  title="1. Choose Your Courses"
                  description={
                    <Space direction="vertical">
                      <Text>Find courses in the sidebar</Text>
                      <Text>Drag courses into semester boxes</Text>
                    </Space>
                  }
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                hoverable
                cover={
                  <TableOutlined
                    style={{ fontSize: '48px', color: '#52c41a', marginTop: '24px' }}
                  />
                }
                style={{ textAlign: 'center' }}
              >
                <Card.Meta
                  title="2. Plan Your Semesters"
                  description={
                    <Space direction="vertical">
                      <Text>4 semesters, 4 courses each</Text>
                      <Text>Color-coded: Blue (Conversion), Orange (Core), Green (Option)</Text>
                    </Space>
                  }
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                hoverable
                cover={
                  <CheckSquareOutlined
                    style={{ fontSize: '48px', color: '#722ed1', marginTop: '24px' }}
                  />
                }
                style={{ textAlign: 'center' }}
              >
                <Card.Meta
                  title="3. Check Your Plan"
                  description={
                    <Space direction="vertical">
                      <Text>View course summary at the top</Text>
                      <Text>Switch between S1 and S2 starts</Text>
                      <Text>Clear plan or save as image</Text>
                    </Space>
                  }
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                hoverable
                cover={
                  <BulbOutlined style={{ fontSize: '48px', color: '#faad14', marginTop: '24px' }} />
                }
                style={{ textAlign: 'center' }}
              >
                <Card.Meta
                  title="4. Get Suggestions"
                  description={
                    <Space direction="vertical">
                      <Text>Try 'Load Study Plan' for recommendations</Text>
                      <Text>Choose start year, semester, and specialization</Text>
                    </Space>
                  }
                />
              </Card>
            </Col>
          </Row>
          <Paragraph style={{ textAlign: 'center', marginTop: '24px', fontStyle: 'italic' }}>
            Remember: Always check the official UWA handbook and consult your advisor to confirm
            your course choices.
          </Paragraph>
        </Modal>
      </DndProvider>
    </Provider>
  )
}

export default App
