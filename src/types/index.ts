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
	option: "#e6f7ff", // Light blue
	conversion: "#fff2cd", // Light yellow
	core: "#f6ffed", // Light green
	sss: "#fbe4d5", // Light orange
	ais: "#fbe4d5", // Light orange
	acs: "#fbe4d5", // Light orange (assuming similar to sss and ais)
};
