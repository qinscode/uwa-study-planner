import type { RefObject } from "react";
import domtoimage from "dom-to-image-more";

export async function exportTableToPNG(
	captureRef: RefObject<HTMLDivElement>
): Promise<void> {
	if (!captureRef.current) {
		console.error("captureRef is null");
		alert("Cannot find element to capture. Please refresh and try again.");
		return;
	}

	try {
		await new Promise((resolve) => setTimeout(resolve, 500));
		const node = captureRef.current.cloneNode(true) as HTMLElement;
		document.body.appendChild(node);

		node.style.position = "absolute";
		node.style.left = "-9999px";
		const actualWidth = captureRef.current.offsetWidth;
		const actualHeight = captureRef.current.offsetHeight;

		node.style.width = `${actualWidth}px`;
		node.style.height = `${actualHeight}px`;
		node.style.backgroundColor = "#ffffff";
		node.style.padding = "20px";

		// 清理样式函数
		const cleanupElement = (element: HTMLElement) => {
			// 移除所有阴影效果
			element.style.boxShadow = "none";
			element.style.transition = "none";
			element.style.animation = "none";

			// 移除所有边框
			element.style.border = "none";
			element.style.outline = "none";

			// 保持背景色
			const computedStyle = window.getComputedStyle(element);
			const backgroundColor = computedStyle.backgroundColor;
			if (
				backgroundColor &&
				backgroundColor !== "rgba(0, 0, 0, 0)" &&
				backgroundColor !== "transparent"
			) {
				element.style.backgroundColor = backgroundColor;
			}
		};

		const options = {
			quality: 1.0,
			bgcolor: "#ffffff",
			height: actualHeight,
			width: actualWidth,
			style: {
				transform: "none",
				"transform-origin": "none",
				background: "#ffffff",
			},
			filter: (element: Node) => {
				if (element instanceof HTMLElement) {
					// 移除所有Card组件的边框
					// if (
					// 	element.classList.contains("rounded-lg") ||
					// 	element.classList.contains("border") ||
					// 	element.classList.contains("shadow-sm")
					// ) {
					// 	cleanupElement(element);
					// }

					// 保持学期标题的样式
					if (
						element.classList.contains("text-lg") &&
						element.textContent?.includes("Year")
					) {
						element.style.borderBottom = "none";
						return true;
					}

					// 保持课程卡片的样式
					if (element.classList.contains("bg-card")) {
						// 只保留圆角，移除其他边框
						// element.style.border = "none";
						// element.style.borderRadius = "8px";
						return true;
					}

					// 保持学期标签的样式
					if (
						element.classList.contains("S1") ||
						element.classList.contains("S2") ||
						element.classList.contains("S1S2")
					) {
						return true;
					}

					// // 移除空单元格的边框
					// if (
					// 	!element.textContent?.trim() &&
					// 	!element.querySelector("img") &&
					// 	!element.querySelector("svg")
					// ) {
					// 	element.style.border = "none";
					// 	element.style.boxShadow = "none";
					// }
					//
					// // 移除网格容器的边框
					// if (element.classList.contains("grid")) {
					// 	element.style.gap = "12px";
					// 	element.style.border = "none";
					// }

					// 为每个学期板块添加一点空间
					if (element.classList.contains("space-y-6")) {
						element.style.marginBottom = "24px";
					}

					cleanupElement(element);
				}
				return true;
			},
		};

		const dataUrl = await domtoimage.toPng(node, options);
		document.body.removeChild(node);

		const link = document.createElement("a");
		link.download = "study_plan.png";
		link.href = dataUrl;
		link.click();
	} catch (error) {
		console.error("Export failed:", error);
		alert("Failed to export image. Please try again later.");
	}
}
