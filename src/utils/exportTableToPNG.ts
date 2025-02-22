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
		// Wait for animations to complete
		await new Promise((resolve) => {
			setTimeout(resolve, 500);
		});
		const node = captureRef.current.cloneNode(true) as HTMLElement;
		document.body.appendChild(node);

		// Set node position and dimensions
		node.style.position = "absolute";
		node.style.left = "-9999px";
		const actualWidth = captureRef.current.offsetWidth;
		const actualHeight = captureRef.current.offsetHeight;

		node.style.width = `${actualWidth}px`;
		node.style.height = `${actualHeight}px`;
		node.style.backgroundColor = "#ffffff";
		node.style.padding = "20px";

		// Element cleanup function
		const cleanupElement = (element: HTMLElement) => {
			// Remove shadow effects
			element.style.boxShadow = "none";
			element.style.transition = "none";
			element.style.animation = "none";

			// Remove borders
			element.style.border = "none";
			element.style.outline = "none";

			// Preserve background color
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

		// Export options with quality control
		const options = {
			quality: 2.0, // Increase quality (1.0 is default)
			bgcolor: "#ffffff",
			height: actualHeight * 2, // Double the height for better quality
			width: actualWidth * 2, // Double the width for better quality
			style: {
				transform: "scale(2)", // Scale up for better quality
				"transform-origin": "top left",
				background: "#ffffff",
			},
			filter: (element: Node) => {
				if (element instanceof HTMLElement) {
					// Maintain semester title styles
					if (
						element.classList.contains("text-lg") &&
						element.textContent?.includes("Year")
					) {
						element.style.border = "none";
						return true;
					}

					// Maintain course card styles
					if (element.classList.contains("bg-card")) {
						return true;
					}

					// Maintain semester label styles
					if (
						element.classList.contains("S1") ||
						element.classList.contains("S2") ||
						element.classList.contains("S1S2")
					) {
						return true;
					}

					// Remove empty cell borders
					if (
						!element.textContent?.trim() &&
						!element.querySelector("img") &&
						!element.querySelector("svg")
					) {
						element.style.border = "none";
						element.style.boxShadow = "none";
					}

					// Remove grid container borders
					if (element.classList.contains("grid")) {
						element.style.gap = "12px";
						element.style.border = "none";
					}

					// Add spacing for semester blocks
					if (element.classList.contains("space-y-6")) {
						element.style.marginBottom = "24px";
					}

					cleanupElement(element);
				}
				return true;
			},
		};

		// Generate and download image
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
