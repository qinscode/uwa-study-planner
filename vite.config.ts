import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    preview: {
    port: 3031 // 你可以修改为任意可用端口
  },
  plugins: [react()],
  build: {
    outDir: 'build', // 将输出目录更改为 build
    rollupOptions: {
      output: {
        // 自定义 chunk 的拆分策略
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // 调整 chunk size 警告限制
  },
})
