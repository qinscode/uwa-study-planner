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

import React from 'react'
import { Modal, Button } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'

interface ClearModalProps {
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
}

const ClearModal: React.FC<ClearModalProps> = ({ isModalOpen, handleOk, handleCancel }) => (
  <AnimatePresence>
    {isModalOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Are you sure you want to clear all selected courses?
          </motion.p>
        </Modal>
      </motion.div>
    )}
  </AnimatePresence>
)

export default ClearModal
