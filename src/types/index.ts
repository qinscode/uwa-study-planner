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

// 基础课程选择接口
interface BaseCourse {
	id: string;
	course: Course;
}

// 用于拖放和显示的课程接口
export interface SemesterCourse extends BaseCourse {
	semesterId: string;
	position: number;
}

// 用于统计和验证的课程接口
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
	option: "oklch(0.987 0.026 102.212)", // Light yellow
	conversion: "oklch(0.936 0.032 17.717)", // red-200
	core: "oklch(0.93 0.034 272.788)", // indigo-300
	sss: "oklch(0.823 0.12 346.018)", // pink-500
	ais: "oklch(0.917 0.08 205.041)", // cyan-300
	acs: "oklch(0.85 0.15 85)", // yellow-400
};
