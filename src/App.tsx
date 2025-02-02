import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { useMediaQuery } from 'react-responsive'
import MainLayout from './layouts/MainLayout'
import { store } from './redux/store'
import FloatButtonGroup from './components/FloatButtonGroup'
import InstructionsModal from './components/Modals/InstructionsModal'

const App: React.FC = () => {
  const [isInstructionsModalVisible, setIsInstructionsModalVisible] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const showInstructions = () => {
    setIsInstructionsModalVisible(true)
  }

  const handleInstructionsModalClose = () => {
    setIsInstructionsModalVisible(false)
  }



  return (
    <Provider store={store}>
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <MainLayout isMobile={isMobile} />
        <FloatButtonGroup showInstructions={showInstructions} />
        <InstructionsModal
          isVisible={isInstructionsModalVisible}
          onClose={handleInstructionsModalClose}
          isMobile={isMobile}
        />
      </DndProvider>
    </Provider>
  )
}

export default App
