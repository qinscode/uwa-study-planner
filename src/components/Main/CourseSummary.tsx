/**
 * CourseSummary Component
 *
 * Displays a summary of selected courses and provides action buttons for various operations.
 *
 * Key Features:
 *
 * 1. Course Summary
 *    - Shows the total number of selected courses and counts for each course type
 *
 * 2. Action Buttons
 *    - Provides functionality to switch semesters, export table, clear table, and load study plans
 */

import React from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CourseSummaryProps {
  selectedCourses: any[]
  startWithS2: boolean
  handleSwitch: (checked: boolean) => void
  handleExportTable: () => void
  handleClearTable: () => void
  handleLoadStudyPlan: () => void
  handleYearChange: (value: string) => void
  handleSemesterChange: (value: string) => void
  handleProgramChange: (value: string) => void
  selectedYear: string
  selectedSemester: string
  selectedProgram: string
}

const CourseSummary: React.FC<CourseSummaryProps> = ({
  selectedCourses,
  startWithS2,
  handleSwitch,
  handleExportTable,
  handleClearTable,
  handleLoadStudyPlan,
  handleYearChange,
  handleSemesterChange,
  handleProgramChange,
  selectedYear,
  selectedSemester,
  selectedProgram,
}) => {
  const coreUnitsCount = selectedCourses.filter(course => course['course'].type === 'core').length
  const optionUnitsCount = selectedCourses.filter(
    course => course['course'].type === 'option'
  ).length
  const conversionUnitsCount = selectedCourses.filter(
    course => course['course'].type === 'conversion'
  ).length

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Unit Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
            <div className="text-2xl font-bold text-primary">{selectedCourses.length}</div>
            <div className="text-sm text-muted-foreground">Total Units</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
            <div className="text-2xl font-bold text-primary">{conversionUnitsCount}</div>
            <div className="text-sm text-muted-foreground">Conversion Units</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
            <div className="text-2xl font-bold text-primary">{coreUnitsCount}</div>
            <div className="text-sm text-muted-foreground">Core Units</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
            <div className="text-2xl font-bold text-primary">{optionUnitsCount}</div>
            <div className="text-sm text-muted-foreground">Optional Units</div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={startWithS2} onCheckedChange={handleSwitch} />
              <span className="text-sm">{startWithS2 ? 'Start with S2' : 'Start with S1'}</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Select value={selectedYear} onValueChange={handleYearChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSemester} onValueChange={handleSemesterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s1">Semester 1</SelectItem>
                  <SelectItem value="s2">Semester 2</SelectItem>
                </SelectContent>
              </Select>

              <div className="sm:col-span-2 lg:col-span-1">
                <Select value={selectedProgram} onValueChange={handleProgramChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="ai">Artificial Intelligence</SelectItem>
                    <SelectItem value="ss">Software Systems</SelectItem>
                    <SelectItem value="ac">Advanced Computing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-start">
            <Button onClick={handleLoadStudyPlan} className="flex-1 sm:flex-none min-w-[120px]">
              Load Plan
            </Button>
            <Button variant="outline" onClick={handleExportTable} className="flex-1 sm:flex-none min-w-[120px]">
              Export
            </Button>
            <Button variant="destructive" onClick={handleClearTable} className="flex-1 sm:flex-none min-w-[120px]">
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseSummary
