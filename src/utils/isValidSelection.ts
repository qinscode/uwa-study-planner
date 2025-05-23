import { message } from "antd";
import type { Course, CourseState, SemesterCourse } from "@/types";
import { v4 as uuidv4 } from "uuid";

function calculateACSPoints(courses: Array<SemesterCourse>): {
	total: number;
	level5: number;
} {
	return courses.reduce(
		(accumulator, sc) => {
			if (sc.course.type === "acs") {
				// Each course is worth 6 points
				accumulator.total += 6;
				// Check if it's a Level 5 course
				if (sc.course.code.startsWith("CITS5")) {
					accumulator.level5 += 6;
				}
			}
			return accumulator;
		},
		{ total: 0, level5: 0 }
	);
}

function calculateAISPonts(courses: Array<SemesterCourse>): {
	total: number;
} {
	return courses.reduce(
		(accumulator, sc) => {
			if (sc.course.type === "ais") {
				accumulator.total += 6;
			}
			return accumulator;
		},
		{ total: 0 }
	);
}

function calculateSSSPonts(courses: Array<SemesterCourse>): {
	total: number;
} {
	return courses.reduce(
		(accumulator, sc) => {
			if (sc.course.type === "sss") {
				accumulator.total += 6;
			}
			return accumulator;
		},
		{ total: 0 }
	);
}

export function isValidSelection(
	state: CourseState,
	newCourse: Course
): boolean {
	// Skip all validation if prerequisites are disabled
	if (state.disablePrerequisites) {
		return true;
	}

	const newSemesterCourse: SemesterCourse = {
		id: uuidv4(),
		course: newCourse,
		semesterId: "",
		position: 0,
	};

	const updatedSelectedCourses: Array<SemesterCourse> = [
		...state.selectedCourses,
		newSemesterCourse,
	];

	const conversionCount = updatedSelectedCourses.filter(
		(c) => c.course.type === "conversion"
	).length;
	const optionCount = updatedSelectedCourses.filter(
		(c) => c.course.type === "option"
	).length;

	const hasCITS2002 = updatedSelectedCourses.some(
		(c) => c.course.code === "CITS2002"
	);
	const hasCITS2005 = updatedSelectedCourses.some(
		(c) => c.course.code === "CITS2005"
	);
	const hasCITS1401 = updatedSelectedCourses.some(
		(c) => c.course.code === "CITS1401"
	);
	const hasCITS1402 = updatedSelectedCourses.some(
		(c) => c.course.code === "CITS1402"
	);
	const hasCITS4009 = updatedSelectedCourses.some(
		(c) => c.course.code === "CITS4009"
	);
	// const hasINMT5518 = updatedSelectedCourses.some(
	// 	(c) => c.course.code === "INMT5518"
	// );

	// Check requirements for Applied Computing specialisation
	if (newCourse.type === "acs") {
		const { total, level5 } = calculateACSPoints(updatedSelectedCourses);
		if (total > 24) {
			message.error(
				"You cannot select more than 24 points of Applied Computing units."
			);
			return false;
		}
		if (total === 24 && level5 < 12) {
			message.error("You must have at least 12 points of Level 5 ACS units.");
			return false;
		}
	}

	if (newCourse.type === "ais") {
		const { total } = calculateAISPonts(updatedSelectedCourses);
		if (total > 24) {
			message.error(
				"You cannot select more than 24 points of AI stream units."
			);
			return false;
		}
	}

	if (newCourse.type === "sss") {
		const { total } = calculateSSSPonts(updatedSelectedCourses);
		if (total > 24) {
			message.error(
				"You cannot select more than 24 points of SS stream units."
			);
			return false;
		}
	}

	if (optionCount > 4 && newCourse.type === "option") {
		message.error("You cannot select more than 4 option units.");
		return false;
	}

	if (conversionCount > 4 && newCourse.type === "conversion") {
		message.error("You cannot select more than 4 conversion units.");
		return false;
	}

	if (newCourse.code === "CITS5501" && !hasCITS2002 && !hasCITS2005) {
		message.error(
			"You must select either CITS2002 or CITS2005 before CITS5501."
		);
		return false;
	}

	if (newCourse.code === "GENG5505") {
		message.warning({
			content: "GENG5505 will be removed from 2025 S1.",
		});
	}

	if (newCourse.code === "PHIL4100") {
		message.warning("PHIL4100 will be available from 2025 S1.");
	}

	if (newCourse.code === "CITS4419") {
		message.warning("CITS4419 will be available from 2026 S1.");
	}

	if (newCourse.code === "CITS4407") {
		message.warning("CITS4407 will be a option unit from 2025 S1.");
	}

	if (newCourse.code === "CITS5504" && (!hasCITS1401 || !hasCITS1402)) {
		message.error(
			"You must select either CITS1401 and CITS1402 before CITS5503."
		);
		return false;
	}

	if (
		newCourse.code === "CITS4404" &&
		!hasCITS1401 &&
		(!hasCITS4009 || !hasCITS2002 || !hasCITS2005)
	) {
		message.error("You must select 2 programming units before CITS4404.");
		return false;
	}

	// if (newCourse.code === "INMT5526" && (!hasINMT5518 || !hasCITS1401)) {
	// 	message.error("You must select INMT5518 or CITS1401 before INMT5526.");
	// 	return false;
	// }

	if (newCourse.code === "CITS5206") {
		const levelFourOrFiveCourses = state.selectedCourses.filter(
			(sc: SemesterCourse) => {
				const code = sc.course.code;
				return code && (code[4] === "4" || code[4] === "5");
			}
		);
		if (levelFourOrFiveCourses.length < 4) {
			message.error(
				"You must select at least 4 level 4 or level 5 units before CITS5526."
			);
			return false;
		}
	}

	if (
		newCourse.code === "CITS5507" &&
		!hasCITS1401 &&
		(!hasCITS4009 || !hasCITS2002 || !hasCITS2005)
	) {
		message.error("You must select 2 programming units before CITS5507.");
		return false;
	}

	if (hasCITS2002 && hasCITS2005) {
		message.error("You cannot select both CITS2002 and CITS2005.");
		return false;
	}

	return true;
}
