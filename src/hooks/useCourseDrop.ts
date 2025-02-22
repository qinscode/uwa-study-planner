import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addCourseToSemester, moveCourse, removeCourseFromSemester } from "@/redux/courseSlice";
import type { Course, SemesterCourse } from "@/types";
import type { RootState } from "@/redux/store";
import { message } from "antd";

interface UseCourseDropProps {
	semesterId: string;
	position: number;
	allowedSemester: "S1" | "S2" | "S1S2";
	startWithS2: boolean;
}

export const useCourseDrop = ({
	semesterId,
	position,
	allowedSemester,
	startWithS2,
}: UseCourseDropProps) => {
	const dispatch = useDispatch();
	const selectedCourses = useSelector(
		(state: RootState) => state.courses.selectedCourses
	);

	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: ["COURSE", "SEMESTER_COURSE"],
			canDrop: (item: { course?: Course; id?: string; type: string }) => {
				// 检查目标位置的课程
				const existingCourse = selectedCourses.find(
					(course: SemesterCourse) =>
						course.semesterId === semesterId && course.position === position
				);

				// 如果是同一个课程移动到自己的位置，允许
				if (item.type === "SEMESTER_COURSE" && existingCourse) {
					if (item.id === existingCourse.id) {
						return true;
					}
				}

				if (item.type === "SEMESTER_COURSE") {
					const course = selectedCourses.find(
						(c: SemesterCourse) => c.id === item.id
					);
					if (!course) return false;

					const courseAllowedSemester = course.course.recommendedSemester;
					if (courseAllowedSemester === "S1S2") return true;

					if (startWithS2) {
						return (
							(allowedSemester === "S2" && courseAllowedSemester === "S2") ||
							(allowedSemester === "S1" && courseAllowedSemester === "S1")
						);
					} else {
						return allowedSemester === courseAllowedSemester;
					}
				}

				if (!item.course) return false;

				const courseAllowedSemester = item.course.recommendedSemester;
				if (courseAllowedSemester === "S1S2") return true;

				if (startWithS2) {
					return (
						(allowedSemester === "S2" && courseAllowedSemester === "S2") ||
						(allowedSemester === "S1" && courseAllowedSemester === "S1")
					);
				} else {
					return allowedSemester === courseAllowedSemester;
				}
			},
			drop: (item: { id?: string; course?: Course; type: string }) => {
				// 检查目标位置是否已被占用
				const existingCourse = selectedCourses.find(
					(course: SemesterCourse) =>
						course.semesterId === semesterId && course.position === position
				);

				// 如果位置被占用，先移除原有课程
				if (existingCourse) {
					dispatch(removeCourseFromSemester({ id: existingCourse.id }));
				}

				if (item.type === "SEMESTER_COURSE" && item.id) {
					const course = selectedCourses.find(
						(c: SemesterCourse) => c.id === item.id
					);
					if (!course) return;

					if (
						course.course.recommendedSemester !== "S1S2" &&
						course.course.recommendedSemester !== allowedSemester
					) {
						message.error(
							`${course.course.code} is recommended for ${course.course.recommendedSemester}.`
						);
						return;
					}

					dispatch(
						moveCourse({
							id: item.id,
							newSemesterId: semesterId,
							newPosition: position,
						})
					);
				} else if (item.course) {
					dispatch(
						addCourseToSemester({ semesterId, course: item.course, position })
					);
				}
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[semesterId, position, allowedSemester, startWithS2, selectedCourses]
	);

	return { isOver, canDrop, drop };
};
