declare module 'dom-to-image-more' {
  export interface DomToImageOptions {
    /** 图片质量，范围0-1 */
    quality?: number
    /** 背景色 */
    bgcolor?: string
    /** 宽度 */
    width?: number
    /** 高度 */
    height?: number
    /** 样式 */
    style?: Record<string, string>
    /** 过滤器函数 */
    filter?: (node: Node) => boolean
    /** 是否包含伪元素 */
    includePseudo?: boolean
    /** 是否使用CORS */
    useCORS?: boolean
  }

  const domtoimage: {
    toSvg: (node: Node, options?: DomToImageOptions) => Promise<string>
    toPng: (node: Node, options?: DomToImageOptions) => Promise<string>
    toJpeg: (node: Node, options?: DomToImageOptions) => Promise<string>
    toBlob: (node: Node, options?: DomToImageOptions) => Promise<Blob>
    toPixelData: (node: Node, options?: DomToImageOptions) => Promise<Uint8ClampedArray>
  }

  export default domtoimage
} 