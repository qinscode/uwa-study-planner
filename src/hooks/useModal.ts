/**
 * useModal Hook
 *
 * A custom hook for managing the open/close state of a modal.
 *
 * Key Features:
 *
 * 1. Modal State Management
 *    - Provides isModalOpen state
 *    - Offers functions to open and close the modal
 */

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
