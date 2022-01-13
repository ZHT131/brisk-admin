import { createApp } from "vue";
import router from "./router/index";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./styles/color.scss";
import 'remixicon/fonts/remixicon.css'
import "../mock";
import i18n from "./lang/index";
import App from "./App.vue";
const app = createApp(App);
app.use(ElementPlus, { size: "default", zIndex: 3000 });
app.use(router);
app.use(store);
app.use(i18n);
app.mount("#app");
