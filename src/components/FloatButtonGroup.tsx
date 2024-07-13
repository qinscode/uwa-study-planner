import React from 'react'
import { FloatButton } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const FloatButtonGroup: React.FC<{ showInstructions: () => void }> = ({ showInstructions }) => {
  return (
    <FloatButton.Group shape="circle" style={{ right: 24 }}>
      <FloatButton icon={<QuestionCircleOutlined />} onClick={showInstructions} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
  )
}

export default FloatButtonGroup
