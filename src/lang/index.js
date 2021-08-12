import { createI18n } from "vue-i18n";
import enLocale from "element-plus/lib/locale/lang/en";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";
import enLang from "./en";
import zhLang from "./zh";
import Cookies from "js-cookie";

const messages = {
  [enLocale.name]: {
    // el 这个属性很关键，一定要保证有这个属性，
    el: enLocale.el,
    // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
    ...enLang,
  },
  [zhLocale.name]: {
    el: zhLocale.el,
    // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
    ...zhLang,
  },
};

const i18n = createI18n({
  locale: Cookies.get("language") == "en" ? enLocale.name : zhLocale.name,//加入判断修复刷新页面不渲染选中语言的问题
  fallbackLocale: enLocale.name,
  messages,
});

export default i18n;
