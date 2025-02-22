/**
 * CourseCard Component
 *
 * Represents a draggable unit item. Implements drag functionality using react-dnd
 * and adds animation effects with framer-motion.
 *
 * Key Features:
 *
 * 1. Drag Functionality
 *    - Uses useDrag hook to make the course draggable
 *    - Allows users to drag courses to different semester cells
 *
 * 2. Course Information Display
 *    - Shows different background colors based on course type
 *    - Displays course code, name, and recommended semester
 */

import type React from "react";
import { useDrag } from "react-dnd";
import type { Course } from "@/types";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CourseCardProps {
	course: Course;
	onDragStart?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onDragStart }) => {
	const [{ isDragging }, drag, preview] = useDrag({
		type: "COURSE",
		item: () => {
			onDragStart && onDragStart();
			return { course };
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	return (
		<motion.div
			ref={preview}
			initial={{ scale: 1 }}
			whileTap={{ scale: 0.98 }}
			className={cn(
				"transition-all rounded-lg overflow-hidden",
				isDragging && "opacity-50",
				"cursor-move"
			)}
			whileHover={{
				scale: 1.02,
				transition: { duration: 0.2 },
			}}
		>
			<div ref={drag}>
				<Card
					className={cn("w-full", {
						"bg-[#fff2cd] hover:bg-[#fff0c0]": course.type === "conversion",
						"bg-[#f6ffed] hover:bg-[#f4ffe8]": course.type === "core",
						"bg-[#e6f7ff] hover:bg-[#e0f5ff]": course.type === "option",
						"bg-[#fbe4d5] hover:bg-[#fae0d0]":
							course.type === "sss" || course.type === "ais",
						"bg-[#f3e8ff] hover:bg-[#ede4ff]": course.type === "acs", // New color for ACS
					})}
				>
					<CardHeader className="p-3 pb-2">
						<div className="flex items-center justify-between gap-2">
							<span className="font-medium">{course.code}</span>
							{course.recommendedSemester && (
								<Badge
									className="shrink-0"
									variant={
										course.recommendedSemester.toLowerCase() as
											| "s1"
											| "s2"
											| "s1s2"
									}
								>
									{course.recommendedSemester}
								</Badge>
							)}
						</div>
					</CardHeader>
					<CardContent className="p-3 pt-0">
						<p className="text-sm line-clamp-2">{course.name}</p>
						{course.note && (
							<p className="text-xs text-muted-foreground mt-1 line-clamp-1 italic">
								{course.note}
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
};

export default CourseCard;
