import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig(({mode,command})=>{
  const alias ={
    '@': path.resolve(__dirname, './src'),
  }
  const env = loadEnv(mode,process.cwd())
  return {
    plugins: [vue()],
    resolve: {
      alias
    },
    server: { //主要是加上这段代码
      proxy: {
        [env.VITE_BASE_API]: {
          target: env.VITE_BASE_URL+":"+env.VITE_BASE_PORT,	//实际请求地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    }
  }
})
