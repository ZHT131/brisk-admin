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
      '@': resolve(__dirname, 'src')
    }
  },
  base: './',
  server: {
    host: '127.0.0.1',
    port: 8086,
    open: true,
  },
  css:{
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "./src/assets/common/common.scss";`
        //引用公共样式，使用vite搭建项目只安装sass即可，不需要安装node-sass,sass-loader
      }
    }
  }
})