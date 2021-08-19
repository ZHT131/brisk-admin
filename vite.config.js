import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "/@": resolve(__dirname, "src"),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',//解决dev运行警告You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
    },
  },
  base: "./",
  server: {
    host: "127.0.0.1",
    port: 8086,
    open: true,
    // 反向代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:80/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/element-variables.scss";`,
        //引用公共样式，使用vite搭建项目只安装sass即可，不需要安装node-sass,sass-loader
      },
    },
  },
});
