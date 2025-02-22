import type React from 'react'
import { HelpCircle, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FloatButtonGroupProps {
  showInstructions: () => void
}

const FloatButtonGroup: React.FC<FloatButtonGroupProps> = ({ showInstructions }) => {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2">
      <Button
        className="rounded-full shadow-lg"
        size="icon"
        variant="outline"
        onClick={showInstructions}
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
      <Button
        className="rounded-full shadow-lg"
        size="icon"
        variant="outline"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  )
}

export default FloatButtonGroup
