import html2canvas from 'html2canvas'
import type { RefObject } from 'react'

// 复制所有样式
function copyStyles(source: HTMLElement, target: HTMLElement) {
  const computedStyle = window.getComputedStyle(source)
  
  // 复制基本样式
  Array.from(computedStyle).forEach(key => {
    target.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key))
  })
  
  // 确保文本样式正确
  target.style.whiteSpace = 'pre-wrap'
  target.style.wordBreak = 'break-word'
  target.style.overflow = 'visible'
  target.style.textOverflow = 'clip'
  
  // 移除可能影响渲染的样式
  target.style.transform = 'none'
  target.style.transition = 'none'
  target.style.animation = 'none'
  target.style.boxShadow = 'none'
  target.style.textShadow = 'none'
}

// 递归复制所有元素的样式
function copyAllStyles(sourceParent: HTMLElement, targetParent: HTMLElement) {
  const sourceChildren = sourceParent.children
  const targetChildren = targetParent.children
  
  for (let i = 0; i < sourceChildren.length; i++) {
    const sourceChild = sourceChildren[i] as HTMLElement
    const targetChild = targetChildren[i] as HTMLElement
    
    if (sourceChild && targetChild) {
      copyStyles(sourceChild, targetChild)
      copyAllStyles(sourceChild, targetChild)
    }
  }
}

export function exportTableToPNG(captureRef: RefObject<HTMLDivElement>): void {
  if (captureRef.current) {
    const originalElement = captureRef.current
    
    // 创建一个新的包装器
    const wrapper = document.createElement('div')
    wrapper.style.position = 'fixed'
    wrapper.style.left = '-9999px'
    wrapper.style.top = '0'
    wrapper.style.backgroundColor = '#ffffff'
    wrapper.style.width = `${originalElement.offsetWidth}px`
    wrapper.style.maxWidth = `${originalElement.offsetWidth}px`
    wrapper.style.padding = '20px'
    wrapper.style.margin = '0'
    wrapper.style.boxSizing = 'border-box'
    
    // 克隆节点
    const clonedNode = originalElement.cloneNode(true) as HTMLElement
    
    // 设置克隆节点的基本样式
    clonedNode.style.width = '100%'
    clonedNode.style.maxWidth = '100%'
    clonedNode.style.margin = '0'
    clonedNode.style.padding = '0'
    clonedNode.style.boxSizing = 'border-box'
    
    // 添加到DOM
    wrapper.appendChild(clonedNode)
    document.body.appendChild(wrapper)

    // 应用样式
    copyAllStyles(originalElement, clonedNode)

    // 给样式应用一些时间
    setTimeout(() => {
      const options = {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: wrapper.offsetWidth,
        height: wrapper.offsetHeight,
        windowWidth: wrapper.offsetWidth,
        windowHeight: wrapper.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        foreignObjectRendering: true,
        removeContainer: false,
        logging: false,
      }

      html2canvas(wrapper, options)
        .then(canvas => {
          try {
            // 创建下载链接
            const link = document.createElement('a')
            link.download = 'study_plan.png'
            link.href = canvas.toDataURL('image/png', 1.0)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          } catch (e) {
            console.error('导出图片失败:', e)
            alert('导出图片失败，请重试')
          } finally {
            // 清理临时元素
            if (document.body.contains(wrapper)) {
              document.body.removeChild(wrapper)
            }
          }
        })
        .catch(error => {
          console.error('截图捕获时发生错误:', error)
          alert('无法生成截图。请稍后再试或联系支持团队。')
          
          // 清理临时元素
          if (document.body.contains(wrapper)) {
            document.body.removeChild(wrapper)
          }
        })
    }, 100)
  } else {
    console.error('captureRef is null')
    alert('无法找到要捕获的元素。请刷新页面后重试。')
  }
}
