import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ElementPlus from "unplugin-element-plus/vite";
const { resolve } = require("path");
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
      ElementPlus({
        useSource: true,
      }),
    ],
    resolve: {
      alias: {
        "~/": `${resolve(__dirname, "src")}/`,
      },
    },
    // base: "./",
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
          additionalData: `@use "~/styles/element/index.scss" as *;`,
        },
      },
    },
  };
});
