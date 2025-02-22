import type { RefObject } from 'react'

export async function exportTableToPNG(captureRef: RefObject<HTMLDivElement>): Promise<void> {
  if (!captureRef.current) {
    console.error('captureRef is null')
    alert('无法找到要捕获的元素。请刷新页面后重试。')
    return
  }

  try {
    // 1. 获取屏幕流
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: 'window',
      },
    })

    // 2. 创建视频元素
    const video = document.createElement('video')
    video.srcObject = stream
    await video.play()

    // 3. 创建Canvas
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('无法创建canvas上下文')
    }

    // 4. 设置Canvas尺寸
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // 5. 绘制视频帧到Canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // 6. 停止所有视频轨道
    stream.getTracks().forEach(track => track.stop())

    // 7. 创建下载链接
    const link = document.createElement('a')
    link.download = 'study_plan.png'
    link.href = canvas.toDataURL('image/png', 1.0)
    link.click()

  } catch (error) {
    console.error('截图失败:', error)
    alert('截图失败,请确保允许屏幕共享权限。')
  }
}
