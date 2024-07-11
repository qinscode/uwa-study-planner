import html2canvas from 'html2canvas'

export const captureScreenshot = (captureRef: React.RefObject<HTMLDivElement>) => {
  if (captureRef.current) {
    const clonedNode = captureRef.current.cloneNode(true) as HTMLElement
    const wrapper = document.createElement('div')
    wrapper.style.padding = '20px'
    wrapper.style.backgroundColor = 'white'
    wrapper.appendChild(clonedNode)
    document.body.appendChild(wrapper)

    html2canvas(wrapper, {
      onclone: clonedDoc => {
        const elements = clonedDoc.querySelectorAll('*')
        elements.forEach(el => {
          if (el instanceof HTMLElement) {
            const style = getComputedStyle(el)

            if (style.color.startsWith('color(')) {
              el.style.color = '#000000'
            }
            if (style.backgroundColor.startsWith('color(')) {
              el.style.backgroundColor = '#ffffff'
            }

            el.style.boxShadow = 'none'
            el.style.textShadow = 'none'
            el.style.fontFamily = 'Arial, sans-serif'
            el.style.transition = 'none'
            el.style.animation = 'none'
          }
        })
      },
      scale: 2,
      useCORS: true,
      logging: true,
    })
      .then(canvas => {
        const finalCanvas = document.createElement('canvas')
        finalCanvas.width = canvas.width
        finalCanvas.height = canvas.height
        const ctx = finalCanvas.getContext('2d')

        if (ctx) {
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height)
          ctx.drawImage(canvas, 0, 0)

          const link = document.createElement('a')
          link.href = finalCanvas.toDataURL('image/png')
          link.download = 'study_plan.png'
          link.click()
        }

        document.body.removeChild(wrapper)
      })
      .catch(error => {
        console.error('Error capturing screenshot:', error)
        alert('Unable to generate screenshot. Please try again later or contact support.')
      })
  } else {
    console.error('captureRef is null')
    alert('Unable to find the element to capture. Please refresh the page and try again.')
  }
}
