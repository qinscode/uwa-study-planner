import React from 'react'
import { Card, Typography, Space } from 'antd'
import styles from '../styles/InstructionCard.module.scss'

const { Text } = Typography

interface Instruction {
  icon: React.ElementType
  color: string
  title: string
  desc: string[]
}

const InstructionCard: React.FC<{ item: Instruction; isMobile: boolean }> = ({
  item,
  isMobile,
}) => {
  return (
    <Card
      hoverable
      cover={
        <item.icon
          className={`${styles.cardIcon} ${isMobile ? styles.mobile : styles.desktop}`}
          style={{ color: item.color }}
        />
      }
      className={styles.instructionCard}
    >
      <Card.Meta
        title={
          <span className={`${styles.cardTitle} ${isMobile ? styles.mobile : styles.desktop}`}>
            {item.title}
          </span>
        }
        description={
          <Space direction="vertical">
            {item.desc.map((text: string, i: number) => (
              <Text
                key={i}
                className={`${styles.cardDescription} ${isMobile ? styles.mobile : styles.desktop}`}
              >
                {text}
              </Text>
            ))}
          </Space>
        }
      />
    </Card>
  )
}

export default InstructionCard
