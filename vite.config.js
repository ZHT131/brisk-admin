import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '/@': resolve(__dirname, 'src'),
    }
  },
  base: './',
  server: {
    host: '127.0.0.1',
    port: 8086,
    open: true,
    // 反向代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:80/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/element-variables.scss";`
        //引用公共样式，使用vite搭建项目只安装sass即可，不需要安装node-sass,sass-loader
      }
    }
  }
})