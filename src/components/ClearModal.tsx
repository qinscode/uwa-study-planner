import React from 'react'
import { Modal, Button } from 'antd'

interface ClearModalProps {
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
}

const ClearModal: React.FC<ClearModalProps> = ({ isModalOpen, handleOk, handleCancel }) => (
  <Modal
    open={isModalOpen}
    onOk={handleOk}
    onCancel={handleCancel}
    title="Clear everything?"
    footer={[
      <Button key="back" onClick={handleCancel}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={handleOk}>
        Confirm
      </Button>,
    ]}
  >
    <p>Are you sure you want to clear all selected courses?</p>
  </Modal>
)

export default ClearModal
