import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Course, SemesterCourse, CourseState, CourseType } from "@/types";
import { message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { getStudyPlan } from "@/data/studyPlans";
import testCourses from "../data/availableCourse";
import type { RootState } from "./store";
import { isValidSelection } from "@/utils/isValidSelection";
import { checkprerequisites } from "@/utils/checkprerequisites";

const storedState = localStorage.getItem("courseState");
const initialState: CourseState = storedState
	? JSON.parse(storedState)
	: {
			availableCourses: testCourses || [],
			selectedCourses: [],
			allCourses: [],
			tags: [
				{ key: "conversion", label: "Conversion" },
				{ key: "core", label: "Core" },
				{ key: "option", label: "Option" },
			],
			disablePrerequisites: false
		};

const updateCoursesTypes = (
	courses: Array<Course>,
	updates: Array<{ courseCode: string; newType: CourseType }>
): Array<Course> => {
	const updateMap = new Map(
		updates.map((update) => [update.courseCode, update.newType])
	);
	return courses.map((course) => {
		const newType = updateMap.get(course.code);
		return newType ? { ...course, type: newType } : course;
	});
};

const getStringAfterSecondDash = (input: string): string => {
	const parts = input.split("-");
	return parts.length > 2 ? parts.slice(2).join("-") : "";
};

const courseSlice = createSlice({
	name: "courses",
	initialState,
	reducers: {
		addCourseToSemester: (
			state,
			action: PayloadAction<{
				semesterId: string;
				course: Course;
				position: number;
			}>
		) => {
			const { semesterId, course, position } = action.payload;
			const newSemesterCourse: SemesterCourse = {
				id: uuidv4(),
				semesterId,
				position,
				course,
			};
			if (!checkprerequisites(state, course)) {
				return;
			}
			if (!isValidSelection(state, course)) {
				return;
			}
			state.selectedCourses.push(newSemesterCourse);
			state.availableCourses = state.availableCourses.filter(
				(c: Course) => c.id !== course.id
			);
		},
		removeCourseFromSemester: (
			state,
			action: PayloadAction<{ id: string }>
		) => {
			const courseToRemove = state.selectedCourses.find(
				(c: SemesterCourse) => c.id === action.payload.id
			);
			if (courseToRemove) {
				state.availableCourses.push(courseToRemove.course);
				state.selectedCourses = state.selectedCourses.filter(
					(c: SemesterCourse) => c.id !== action.payload.id
				);
			}
		},
		moveCourse: (
			state,
			action: PayloadAction<{
				id: string;
				newSemesterId: string;
				newPosition: number;
			}>
		) => {
			const { id, newSemesterId, newPosition } = action.payload;
			const courseIndex = state.selectedCourses.findIndex(
				(c: SemesterCourse) => c.id === id
			);
			if (courseIndex !== -1) {
				const course = state.selectedCourses[courseIndex];
				state.selectedCourses.splice(courseIndex, 1);

				const newSemester = getStringAfterSecondDash(newSemesterId);

				const recommendedSemester = course.course.recommendedSemester;

				if (
					recommendedSemester !== "S1S2" &&
					recommendedSemester !== newSemester
				) {
					message.error(
						`${course.course.code} is recommended for ${recommendedSemester}.`
					);
					return;
				}

				course.semesterId = newSemesterId;

				course.position = newPosition;
				state.selectedCourses.push(course);
			}
		},
		clearSelectedCourses: (state) => {
			state.availableCourses = [
				...state.availableCourses,
				...state.selectedCourses.map((sc: SemesterCourse) => sc.course),
			];
			state.selectedCourses = [];
		},

		updateTag: (
			state,
			action: PayloadAction<Array<{ key: string; label: string }>>
		) => {
			state.tags = action.payload;
		},

		loadStudyPlan: (
			state,
			action: PayloadAction<{
				year: string;
				semester: string;
				startWithS2: boolean;
				program: string;
			}>
		) => {
			const { year, semester, startWithS2, program } = action.payload;

			if (program === "ai") {
				const updates: Array<{ courseCode: string; newType: CourseType }> = [
					{ courseCode: "4407", newType: "option" },
					{ courseCode: "CITS5501", newType: "option" },
					{ courseCode: "CITS5506", newType: "option" },
					{ courseCode: "CITS5503", newType: "option" },
					{ courseCode: "CITS5507", newType: "option" },
					{ courseCode: "CITS4012", newType: "ais" },
					{ courseCode: "CITS5508", newType: "ais" },
					{ courseCode: "CITS4404", newType: "ais" },
					{ courseCode: "CITS5017", newType: "ais" },
				];
				state.tags = [
					{ key: "conversion", label: "Conversion" },
					{ key: "core", label: "Core" },
					{ key: "option", label: "Option" },
					{ key: "ais", label: "AIS" },
				];
				state.availableCourses = updateCoursesTypes(
					state.availableCourses,
					updates
				);
			}
			if (program === "ss") {
				const updates: Array<{ courseCode: string; newType: CourseType }> = [
					{ courseCode: "CITS4407", newType: "option" },
					{ courseCode: "CITS5501", newType: "sss" },
					{ courseCode: "CITS5506", newType: "sss" },
					{ courseCode: "CITS5503", newType: "sss" },
					{ courseCode: "CITS5507", newType: "sss" },
					{ courseCode: "CITS4012", newType: "option" },
					{ courseCode: "CITS5508", newType: "option" },
					{ courseCode: "CITS4404", newType: "option" },
					{ courseCode: "CITS5017", newType: "option" },
				];
				state.tags = [
					{ key: "conversion", label: "Conversion" },
					{ key: "core", label: "Core" },
					{ key: "option", label: "Option" },
					{ key: "sss", label: "SSS" },
				];
				state.availableCourses = updateCoursesTypes(
					state.availableCourses,
					updates
				);
				console.log("tags", state.tags);
				console.log("availableCourses", state.availableCourses);
			}
			if (program === "ac") {
				const updates: Array<{ courseCode: string; newType: CourseType }> = [
					{ courseCode: "CITS4009", newType: "acs" },
					{ courseCode: "CITS4012", newType: "acs" },
					{ courseCode: "CITS4402", newType: "acs" },
					{ courseCode: "CITS4403", newType: "acs" },
					{ courseCode: "CITS4404", newType: "acs" },
					{ courseCode: "CITS4407", newType: "acs" },
					{ courseCode: "CITS4419", newType: "acs" },
					{ courseCode: "CITS5017", newType: "acs" },
					{ courseCode: "CITS5501", newType: "acs" },
					{ courseCode: "CITS5503", newType: "acs" },
					{ courseCode: "CITS5504", newType: "acs" },
					{ courseCode: "CITS5506", newType: "acs" },
					{ courseCode: "CITS5507", newType: "acs" },
					{ courseCode: "CITS5508", newType: "acs" },
					{ courseCode: "AUTO4508", newType: "acs" },
					{ courseCode: "CITS4407", newType: "option" },
				];
				state.tags = [
					{ key: "conversion", label: "Conversion" },
					{ key: "core", label: "Core" },
					{ key: "option", label: "Option" },
					{ key: "acs", label: "ACS" },
				];
				state.availableCourses = updateCoursesTypes(
					state.availableCourses,
					updates
				);
				console.log("tags", state.tags);
				console.log("availableCourses", state.availableCourses);
			}
			if (year === "2024") {
				state.availableCourses = testCourses;
				state.tags = [
					{ key: "conversion", label: "Conversion" },
					{ key: "core", label: "Core" },
					{ key: "option", label: "Option" },
				];
				console.log("tags", state.tags);
			}

			state.availableCourses = [
				...state.availableCourses,
				...(state.selectedCourses?.map((sc: SemesterCourse) => sc.course) ||
					[]),
			];
			state.selectedCourses = [];

			const planCourses = getStudyPlan(
				{ courses: state },
				year,
				semester,
				program
			);
			console.log("planCourses", planCourses);
			if (planCourses) {
				const semesterIds = [
					`${startWithS2 ? "S2" : "S1"}-0-${startWithS2 ? "S2" : "S1"}`,
					`${startWithS2 ? "S2" : "S1"}-0-${!startWithS2 ? "S2" : "S1"}`,
					`${startWithS2 ? "S2" : "S1"}-1-${startWithS2 ? "S2" : "S1"}`,
					`${startWithS2 ? "S2" : "S1"}-1-${!startWithS2 ? "S2" : "S1"}`,
				];

				let currentSemesterIndex = 0;
				let position = 0;

				planCourses.forEach((course, index) => {
					if (course === null) {
						position++;
						if (position >= 4) {
							position = 0;
							currentSemesterIndex++;
						}
						return;
					}

					const existingCourse = state.availableCourses.find(
						(c: Course) => c.code === course.code
					);
					if (existingCourse) {
						if (position >= 4) {
							position = 0;
							currentSemesterIndex++;
						}

						if (currentSemesterIndex >= semesterIds.length) {
							message.error(
								"Not enough semester slots available for the courses"
							);
							return;
						}

						state.availableCourses = state.availableCourses.filter(
							(c: Course) => c.code !== course.code
						);
						const newSemesterCourse: SemesterCourse = {
							id: uuidv4(),
							semesterId: semesterIds[currentSemesterIndex],
							position,
							course: existingCourse,
						};
						state.selectedCourses.push(newSemesterCourse);
						position++;
					}
					console.log("state.selectedCourses", state.selectedCourses);
				});
			}
		},
		togglePrerequisiteCheck: (state) => {
			state.disablePrerequisites = !state.disablePrerequisites
		}
	},
});

export const {
	addCourseToSemester,
	removeCourseFromSemester,
	moveCourse,
	clearSelectedCourses,
	loadStudyPlan,
	togglePrerequisiteCheck
} = courseSlice.actions;
export default courseSlice.reducer;

export const selectCourseByCode =
	(code: string) =>
	(state: RootState): Course | undefined => {
		const availableCourses = state.courses?.availableCourses || [];
		console.log("Available courses:", availableCourses);
		return availableCourses.find((course: Course) => course.code === code);
	};

export const selectAllAvailableCourses = (state: RootState): Array<Course> => {
	return state.courses?.availableCourses || [];
};
