import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import router from './router/index'
import store from './store'
import '../mock'
import i18n from './lang'
createApp(App).use(ElementPlus, { i18n: i18n.global.t }).use(router).use(store).use(i18n).mount('#app')
