// hooks/useModal.ts
import { useState } from 'react'

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  }
}
