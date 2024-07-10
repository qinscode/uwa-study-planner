import React from 'react'
import Draggable from 'react-draggable'
import './Card.css' // 确保你有相应的CSS文件来设置卡片样式

const DraggableCard = () => {
  return (
    <div className="container">
      <Draggable>
        <div className="card">
          <h3>可拖动的卡片</h3>
          <p>在手机上拖动我！</p>
        </div>
      </Draggable>
    </div>
  )
}

export default DraggableCard
