import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'remixicon/fonts/remixicon.css'
import router from "./router/index";
import store from "./store";
import "../mock";
import i18n from "./lang/index";
createApp(App).use(ElementPlus).use(router).use(store).use(i18n).mount("#app");
