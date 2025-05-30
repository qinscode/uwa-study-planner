/**
 * ClearModal Component
 *
 * A modal dialog for confirming the action to clear all selected courses.
 * Utilizes framer-motion for animation effects.
 *
 * Key Features:
 *
 * 1. Modal Display
 *    - Controls visibility based on the isModalOpen state
 *
 * 2. Confirmation Actions
 *    - Provides confirm and cancel buttons
 *    - Calls handleOk and handleCancel functions respectively
 */

import type React from 'react'
import { Modal, Button } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'

interface ClearModalProps {
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
  title?: string
  message?: string
}

const ClearModal: React.FC<ClearModalProps> = ({ 
  isModalOpen, 
  handleOk, 
  handleCancel,
  title = "Clear everything?",
  message = "Are you sure you want to clear all selected courses?"
}) => (
  <AnimatePresence>
    {isModalOpen && (
      <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
        <Modal
          open={isModalOpen}
          title={title}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Confirm
            </Button>,
          ]}
          onCancel={handleCancel}
          onOk={handleOk}
        >
          <motion.p
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            {message}
          </motion.p>
        </Modal>
      </motion.div>
    )}
  </AnimatePresence>
)

export default ClearModal
