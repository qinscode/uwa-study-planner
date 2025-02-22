/**
 * CourseSelector Component
 *
 * Displays a tabbed interface for selecting different types of courses.
 * Contains multiple CourseCard components that can be dragged to semester cells.
 *
 * Key Features:
 *
 * 1. Course Type Tabs
 *    - Uses Tabs component to show different course types (Transfer, Core, Elective)
 *
 * 2. Course List
 *    - Filters and displays course list based on the selected course type
 */

import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import CourseCard from "./CourseCard";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Course } from "@/types";

interface Tag {
	key: string;
	label: string;
}

interface CourseSelectorProps {
	onDragStart?: () => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ onDragStart }) => {
	const [activeTab, setActiveTab] = useState<string>("conversion");
	const availableCourses = useSelector(
		(state: RootState) => state.courses.availableCourses
	);
	const filteredCourses = availableCourses.filter(
		(course: Course) => course.type === activeTab
	);
	const tags = useSelector((state: RootState) => state.courses.tags);

	return (
		<Tabs
			className="w-full"
			defaultValue="conversion"
			onValueChange={setActiveTab}
		>
			<TabsList className="w-full">
				{tags.map((tag: Tag) => (
					<TabsTrigger key={tag.key} className="flex-1" value={tag.key}>
						{tag.label}
					</TabsTrigger>
				))}
			</TabsList>
			<AnimatePresence mode="wait">
				<motion.div
					key={activeTab}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3 }}
				>
					<ScrollArea className="h-[calc(100vh-240px)] pr-4">
						<div className="space-y-2 pt-4">
							{filteredCourses.map((course: Course) => (
								<motion.div
									key={course.code}
									whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
								>
									<CourseCard course={course} onDragStart={onDragStart} />
								</motion.div>
							))}
						</div>
					</ScrollArea>
				</motion.div>
			</AnimatePresence>
		</Tabs>
	);
};

export default CourseSelector;
