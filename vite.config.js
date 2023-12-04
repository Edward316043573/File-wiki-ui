import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
// vite 相关配置
    server: {
        port: 80,
        host: true,
        open: true,
        proxy: {
            // https://cn.vitejs.dev/config/#server-proxy
            '/dev-api': {
                target: 'http://localhost:8080', //后端地址
                changeOrigin: true,
                rewrite: (p) => p.replace(/^\/dev-api/, '') //把Dev-api 替换为空串
            }
        }
    },
})
