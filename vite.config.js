import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());

  // 解析环境变量为字符串，提供默认值以避免未定义的情况
  const VITE_BASE_API = env.VITE_BASE_API || '';
  const VITE_BASE_URL = env.VITE_BASE_URL || '';
  const VITE_BASE_PORT = env.VITE_BASE_PORT || '';

  // 配置别名
  const alias = {
    '@': path.resolve(__dirname, './src'),
  };

  // 根据环境变量配置代理
  const proxyConfig =  {
    [VITE_BASE_API]: {
      target: `${VITE_BASE_URL}:${VITE_BASE_PORT}`, // 确保拼接正确的URL
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${VITE_BASE_API}`), ''),
    },
  }

  return {
    plugins: [vue()],
    resolve: {
      alias,
    },
    server: {
      proxy: proxyConfig, // 动态添加代理配置
    },
  };
});
