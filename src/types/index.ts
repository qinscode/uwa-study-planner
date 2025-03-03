export type CourseType =
	| "conversion"
	| "core"
	| "option"
	| "sss"
	| "ais"
	| "acs";

export interface Course {
	id: string;
	code: string;
	name: string;
	type: CourseType;
	recommendedSemester?: "S1" | "S2" | "S1S2";
	prereq?: Array<string>;
	note?: string;
}

// Interface for basic course selection
interface BaseCourse {
	id: string;
	course: Course;
}

// Interface for courses used in drag-and-drop and display
export interface SemesterCourse extends BaseCourse {
	semesterId: string;
	position: number;
}

// Interface for courses used in statistics and validation
export interface SelectedCourse extends BaseCourse {
	semesterId: string;
	position: number;
	semester: number;
}

export interface Tag {
	key: string;
	label: string;
}

export interface CourseState {
	availableCourses: Array<Course>;
	selectedCourses: Array<SemesterCourse>;
	allCourses: Array<Course>;
	currentCourse?: Course | null;
	currentCourses?: Array<Course>;
	tags: Array<Tag>;
}

export const typeColors: Record<CourseType, string> = {
	option: "oklch(0.987 0.026 102.212)",
	conversion: "oklch(0.936 0.032 17.717)",
	core: "oklch(0.93 0.034 272.788)",
	sss: "oklch(0.823 0.12 346.018)",
	ais: "oklch(0.917 0.08 205.041)",
	acs: "oklch(0.85 0.15 85)",
};
