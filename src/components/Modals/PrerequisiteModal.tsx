import type React from 'react'
import { Modal, Button } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'

interface PrerequisiteModalProps {
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
  isPrerequisitesEnabled: boolean
}

const PrerequisiteModal: React.FC<PrerequisiteModalProps> = ({ 
  isModalOpen, 
  handleOk, 
  handleCancel,
  isPrerequisitesEnabled
}) => (
  <AnimatePresence>
    {isModalOpen && (
      <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
        <Modal
          open={isModalOpen}
          title="Toggle Prerequisites"
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
            {`Are you sure you want to ${isPrerequisitesEnabled ? 'disable' : 'enable'} prerequisites? This will clear your current course selection.`}
          </motion.p>
        </Modal>
      </motion.div>
    )}
  </AnimatePresence>
)

export default PrerequisiteModal 