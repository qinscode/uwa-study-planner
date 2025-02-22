 
import type React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { GripHorizontal, ListChecks, ArrowUpDown, Download } from 'lucide-react'

interface InstructionsModalProps {
  isVisible: boolean
  onClose: () => void
  isMobile: boolean
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isVisible,
  onClose,
  isMobile,
}) => {
  const instructions = [
    {
      title: 'Select Units',
      description: 'Choose your desired units from the course list on the left.',
      icon: ListChecks,
    },
    {
      title: 'Drag & Drop',
      description: 'Drag units into semester slots to plan your study schedule.',
      icon: GripHorizontal,
    },
    {
      title: 'Adjust Order',
      description: 'Rearrange units between semesters as needed.',
      icon: ArrowUpDown,
    },
    {
      title: 'Export Plan',
      description: 'Save and export your study plan when complete.',
      icon: Download,
    },
  ]

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className={cn('sm:max-w-[425px]', isMobile && 'mt-16')}>
        <DialogHeader>
          <DialogTitle className="text-center">Getting Started</DialogTitle>
          <DialogDescription className="text-center">
            Follow these steps to create your study plan
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {instructions.map((instruction, index) => (
            <Card key={index} className="p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <instruction.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{instruction.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {instruction.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground italic">
          Tip: Click the help button in the bottom right corner to view these instructions again.
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default InstructionsModal
