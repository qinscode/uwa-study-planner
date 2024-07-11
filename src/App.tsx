/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'
import { Layout, Typography, FloatButton, Modal, Row, Col, Card, Space } from 'antd'
import {
  QuestionCircleOutlined,
  DragOutlined,
  TableOutlined,
  CheckSquareOutlined,
  BulbOutlined,
} from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import SemesterGrid from './components/SemesterGrid'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'

const { Content, Footer } = Layout
const { Text, Title, Paragraph } = Typography

const App: React.FC = () => {
  const [isInstructionsModalVisible, setIsInstructionsModalVisible] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore')
    if (!hasVisitedBefore) {
      setIsInstructionsModalVisible(true)
      localStorage.setItem('hasVisitedBefore', 'true')
    }
  }, [])

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
            <Text type="secondary" style={{ fontSize: isMobile ? '14px' : '12px' }}>
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
            <Title level={isMobile ? 3 : 3} style={{ textAlign: 'center' }}>
              Welcome to UWA MIT Study Planner!
            </Title>
          }
          open={isInstructionsModalVisible}
          onOk={handleInstructionsModalClose}
          onCancel={handleInstructionsModalClose}
          footer={null}
          width={isMobile ? '100%' : 800}
          style={{ top: isMobile ? 0 : 20 }}
        >
          <Paragraph
            style={{
              textAlign: 'center',
              fontSize: isMobile ? '16px' : '16px',
              marginBottom: '24px',
            }}
          >
            Plan your Master of Information Technology journey at UWA with ease. Here's how to get
            started:
          </Paragraph>
          <Row gutter={[16, 16]}>
            {[
              {
                icon: DragOutlined,
                color: '#1890ff',
                title: '1. Choose Your Courses',
                desc: ['Find courses in the sidebar', 'Drag courses into semester boxes'],
              },
              {
                icon: TableOutlined,
                color: '#52c41a',
                title: '2. Plan Your Semesters',
                desc: [
                  '4 semesters, 4 courses each',
                  'Color-coded: Blue (Conversion), Orange (Core), Green (Option)',
                ],
              },
              {
                icon: CheckSquareOutlined,
                color: '#722ed1',
                title: '3. Check Your Plan',
                desc: [
                  'View course summary at the top',
                  'Switch between S1 and S2 starts',
                  'Clear plan or save as image',
                ],
              },
              {
                icon: BulbOutlined,
                color: '#faad14',
                title: '4. Get Suggestions',
                desc: [
                  "Try 'Load Study Plan' for recommendations",
                  'Choose start year, semester, and specialization',
                ],
              },
            ].map((item, index) => (
              <Col span={isMobile ? 24 : 12} key={index}>
                <Card
                  hoverable
                  cover={
                    <item.icon
                      style={{
                        fontSize: isMobile ? '48px' : '48px',
                        color: item.color,
                        marginTop: '24px',
                      }}
                    />
                  }
                  style={{ textAlign: 'center' }}
                >
                  <Card.Meta
                    title={
                      <span style={{ fontSize: isMobile ? '20px' : '18px' }}>{item.title}</span>
                    }
                    description={
                      <Space direction="vertical">
                        {item.desc.map((text, i) => (
                          <Text key={i} style={{ fontSize: isMobile ? '16px' : '14px' }}>
                            {text}
                          </Text>
                        ))}
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Paragraph
            style={{
              textAlign: 'center',
              marginTop: '24px',
              fontStyle: 'italic',
              fontSize: isMobile ? '14px' : '14px',
            }}
          >
            Remember: Always check the official UWA handbook and consult your advisor to confirm
            your course choices.
          </Paragraph>
          <Text
            type="secondary"
            style={{
              display: 'block',
              textAlign: 'center',
              marginTop: '24px',
              fontSize: isMobile ? '14px' : '14px',
              color: '#1890ff',
              backgroundColor: '#e6f7ff',
              padding: '8px',
              borderRadius: '4px',
            }}
          >
            Tip: If you need to see these instructions again, click the <QuestionCircleOutlined />{' '}
            button in the bottom right corner of the screen.
          </Text>
        </Modal>
      </DndProvider>
    </Provider>
  )
}

export default App
