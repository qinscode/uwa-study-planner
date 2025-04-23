import type React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { SemesterCourse } from "@/types";
import { useDispatch, useSelector } from 'react-redux'
import { togglePrerequisiteCheck } from '@/redux/courseSlice'
import type { RootState } from '@/redux/store'

interface CourseSummaryProps {
	selectedCourses: Array<SemesterCourse>;
	startWithS2: boolean;
	handleSwitch: (checked: boolean) => void;
	handleExportTable: () => void;
	handleClearTable: () => void;
	handleLoadStudyPlan: () => void;
	handleYearChange: (value: string) => void;
	handleSemesterChange: (value: string) => void;
	handleProgramChange: (value: string) => void;
	selectedYear: string;
	selectedSemester: string;
	selectedProgram: string;
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
	const dispatch = useDispatch()
	const disablePrerequisites = useSelector((state: RootState) => state.courses.disablePrerequisites)

	const coreUnitsCount = selectedCourses.filter(
		(course) => course["course"].type === "core"
	).length;
	const optionUnitsCount = selectedCourses.filter(
		(course) => course["course"].type === "option"
	).length;
	const conversionUnitsCount = selectedCourses.filter(
		(course) => course["course"].type === "conversion"
	).length;

	const handlePrerequisiteToggle = (checked: boolean) => {
		dispatch(togglePrerequisiteCheck())
		// Clear all selected courses when toggling prerequisite mode
		handleClearTable()
	}

	const renderSpecializationSelect = () => {
		if (selectedYear === "2024") {
			return (
				<SelectTrigger disabled className="w-full">
					<span className="text-muted-foreground">Not available in 2024</span>
				</SelectTrigger>
			);
		}

		return (
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Select Specialization" />
			</SelectTrigger>
		);
	};

	return (
		<Card className="relative">
			<CardHeader className="pb-2 pt-4">
				<CardTitle>Unit Statistics</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
						<div className="text-2xl font-bold text-primary">
							{selectedCourses.length}
						</div>
						<div className="text-sm text-muted-foreground">Total Units</div>
					</div>
					<div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
						<div className="text-2xl font-bold text-primary">
							{conversionUnitsCount}
						</div>
						<div className="text-sm text-muted-foreground">
							Conversion Units
						</div>
					</div>
					<div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
						<div className="text-2xl font-bold text-primary">
							{coreUnitsCount}
						</div>
						<div className="text-sm text-muted-foreground">Core Units</div>
					</div>
					<div className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
						<div className="text-2xl font-bold text-primary">
							{optionUnitsCount}
						</div>
						<div className="text-sm text-muted-foreground">Optional Units</div>
					</div>
				</div>

				<Separator />

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<Switch checked={startWithS2} onCheckedChange={handleSwitch} />
							<span className="text-sm">
								{startWithS2 ? "Start with S2" : "Start with S1"}
							</span>
						</div>

						<div className="flex items-center gap-2">
							<Switch 
								checked={disablePrerequisites} 
								onCheckedChange={handlePrerequisiteToggle} 
							/>
							<span className="text-sm">
								{disablePrerequisites ? "Prerequisites Disabled" : "Prerequisites Enabled"}
							</span>
						</div>

						<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							<div className="flex flex-col gap-2">
								<label className="text-sm font-medium">Enrolled Year</label>
								<Select value={selectedYear} onValueChange={handleYearChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select Year" />
									</SelectTrigger>
									<SelectContent
										className="w-full min-w-[8rem]"
										position="popper"
										sideOffset={4}
									>
										<SelectItem value="2024">2024</SelectItem>
										<SelectItem value="2025">2025</SelectItem>
										<SelectItem value="2026">2026</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex flex-col gap-2">
								<label className="text-sm font-medium">Enrolled Semester</label>
								<Select
									value={selectedSemester}
									onValueChange={handleSemesterChange}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select Semester" />
									</SelectTrigger>
									<SelectContent
										className="w-full min-w-[8rem]"
										position="popper"
										sideOffset={4}
									>
										<SelectItem value="s1">Semester 1</SelectItem>
										<SelectItem value="s2">Semester 2</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-2">
								<label className="text-sm font-medium">Specialization</label>
								<Select
									disabled={selectedYear === "2024"}
									value={selectedYear === "2024" ? undefined : selectedProgram}
									onValueChange={handleProgramChange}
								>
									{renderSpecializationSelect()}
									<SelectContent
										className="w-full min-w-[8rem]"
										position="popper"
										sideOffset={4}
									>
										<SelectItem value="ai">Artificial Intelligence</SelectItem>
										<SelectItem value="ss">Software Systems</SelectItem>
										<SelectItem value="ac">Applied Computing</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					<div className="flex flex-wrap gap-2">
						<Button onClick={handleLoadStudyPlan}>Load Study Plan</Button>
						<Button variant="secondary" onClick={handleExportTable}>
							Save as Picture
						</Button>
						<Button variant="destructive" onClick={handleClearTable}>
							Clear Study Plan
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default CourseSummary;
