import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ElementPlus from "unplugin-element-plus/vite";
const { resolve } = require("path");
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig(({ command, mode }) => {
  let vueI18n = {};
  if (command === "serve") {
    vueI18n["vue-i18n"] = "vue-i18n/dist/vue-i18n.cjs.js"; //解决dev运行警告You are running the esm-bundler build of vue-i18n.
  }
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
        ...vueI18n,
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
