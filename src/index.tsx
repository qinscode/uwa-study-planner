import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { store } from './redux/store'
import App from './App'
import 'antd/dist/reset.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <ConfigProvider locale={zhCN}>
          <App />
        </ConfigProvider>
      </DndProvider>
    </Provider>
  </React.StrictMode>
)
