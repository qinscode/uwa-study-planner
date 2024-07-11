// hooks/useModal.ts
import { useState } from 'react'

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
    console.log('Modal opened', isModalOpen)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    console.log('handleCloseModal', isModalOpen)
  }

  return {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  }
}
