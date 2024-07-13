/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Modal, Row, Col, Typography } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DragOutlined,
  TableOutlined,
  CheckSquareOutlined,
  BulbOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import InstructionCard from './InstructionCard'
import styles from '../styles/InstructionsModal.module.scss'
import sharedStyles from '../styles/App.module.scss'

const { Text, Title, Paragraph } = Typography

interface Instruction {
  icon: React.ElementType
  color: string
  title: string
  desc: string[]
}

const InstructionsModal: React.FC<{
  isVisible: boolean
  onClose: () => void
  isMobile: boolean
}> = ({ isVisible, onClose, isMobile }) => {
  const instructions: Instruction[] = [
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
        'Try Load Study Plan for recommendations',
        'Choose start year, semester, and specialization',
      ],
    },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Modal
            title={
              <Title level={isMobile ? 3 : 3} className={sharedStyles.modalTitle}>
                Welcome to UWA MIT Study Planner!
              </Title>
            }
            open={isVisible}
            onOk={onClose}
            onCancel={onClose}
            footer={null}
            width={isMobile ? '80%' : 800}
            className={`${styles.instructionsModal} ${isMobile ? styles.mobile : styles.desktop}`}
          >
            <Paragraph
              className={`${styles.instructionsText} ${isMobile ? styles.mobile : styles.desktop}`}
            >
              Plan your Master of Information Technology journey at UWA with ease. Here's how to get
              started:
            </Paragraph>
            <Row gutter={[16, 16]}>
              {instructions.map((item, index) => (
                <Col span={isMobile ? 24 : 12} key={index}>
                  <InstructionCard item={item} isMobile={isMobile} />
                </Col>
              ))}
            </Row>
            <Paragraph
              className={`${styles.footerText} ${isMobile ? styles.mobile : styles.desktop}`}
            >
              Remember: Always check the official UWA handbook and consult your advisor to confirm
              your course choices.
            </Paragraph>
            <Text className={`${styles.tipText} ${isMobile ? styles.mobile : styles.desktop}`}>
              Tip: If you need to see these instructions again, click the
              <QuestionCircleOutlined /> button in the bottom right corner of the screen.
            </Text>
          </Modal>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InstructionsModal
