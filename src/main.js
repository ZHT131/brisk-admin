import { createApp } from "vue";
import router from "./router/index";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./styles/color.scss";
import 'remixicon/fonts/remixicon.css'
import "../mock";
import App from "./App.vue";
const app = createApp(App);
app.use(ElementPlus, { size: "default", zIndex: 3000 });
app.use(router);
app.use(store);
app.mount("#app");
