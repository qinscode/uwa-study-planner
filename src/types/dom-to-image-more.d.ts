declare module "dom-to-image-more" {
	export interface DomToImageOptions {
		/** Image quality, range 0-1 */
		quality?: number;
		/** Background color */
		bgcolor?: string;
		/** Width */
		width?: number;
		/** Height */
		height?: number;
		/** Style */
		style?: Record<string, string>;
		/** Filter function */
		filter?: (node: Node) => boolean;
		/** Include pseudo-elements */
		includePseudo?: boolean;
		/** Use CORS */
		useCORS?: boolean;
	}

	const domtoimage: {
		toSvg: (node: Node, options?: DomToImageOptions) => Promise<string>;
		toPng: (node: Node, options?: DomToImageOptions) => Promise<string>;
		toJpeg: (node: Node, options?: DomToImageOptions) => Promise<string>;
		toBlob: (node: Node, options?: DomToImageOptions) => Promise<Blob>;
		toPixelData: (
			node: Node,
			options?: DomToImageOptions
		) => Promise<Uint8ClampedArray>;
	};

	export default domtoimage;
}
