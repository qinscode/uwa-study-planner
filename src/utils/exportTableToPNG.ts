import html2canvas from 'html2canvas'
import type { RefObject } from 'react'

export function exportTableToPNG(captureRef: RefObject<HTMLDivElement>): void {
  if (captureRef.current) {
    const clonedNode = captureRef.current.cloneNode(true) as HTMLElement
    const wrapper = document.createElement('div')
    wrapper.style.padding = '20px'
    wrapper.style.backgroundColor = 'white'
    wrapper.appendChild(clonedNode)
    document.body.appendChild(wrapper)

    html2canvas(wrapper, {
      onclone: clonedDocument => {
        const elements = clonedDocument.querySelectorAll('*')
        elements.forEach(element => {
          if (element instanceof HTMLElement) {
            const style = getComputedStyle(element)

            // 简化颜色函数
            if (style.color.startsWith('color(')) {
              element.style.color = '#000000' // 替换为安全的黑色
            }
            if (style.backgroundColor.startsWith('color(')) {
              element.style.backgroundColor = '#ffffff' // 替换为安全的白色
            }

            // 移除可能导致问题的样式
            element.style.boxShadow = 'none'
            element.style.textShadow = 'none'

            // 简化字体
            element.style.fontFamily = 'Arial, sans-serif'

            // 移除任何可能的动画或过渡效果
            element.style.transition = 'none'
            element.style.animation = 'none'
          }
        })
      },
      scale: 2, // 提高输出质量
      useCORS: true, // 允许加载跨域图片
      logging: true, // 启用日志以便调试
    })
      .then(canvas => {
        // 创建一个新的canvas元素来添加白色背景
        const finalCanvas = document.createElement('canvas')
        finalCanvas.width = canvas.width
        finalCanvas.height = canvas.height
        const context = finalCanvas.getContext('2d')

        if (context) {
          // 填充白色背景
          context.fillStyle = '#ffffff'
          context.fillRect(0, 0, finalCanvas.width, finalCanvas.height)

          // 在白色背景上绘制原始canvas内容
          context.drawImage(canvas, 0, 0)

          // 将canvas转换为PNG并触发下载
          const link = document.createElement('a')
          link.href = finalCanvas.toDataURL('image/png')
          link.download = 'study_plan.png'
          link.click()
        }

        document.body.removeChild(wrapper)
      })
      .catch(error => {
        console.error('截图捕获时发生错误:', error)
        alert('无法生成截图。请稍后再试或联系支持团队。')
      })
  } else {
    console.error('captureRef is null')
    alert('无法找到要捕获的元素。请刷新页面后重试。')
  }
}
