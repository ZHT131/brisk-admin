import { createStore } from "vuex";
import getters from "./getters";

const modulesFiles = import.meta.globEager("./modules/*.js");
const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/(.*\/)*([^.]+).*/gi, "$2");
  const value = modulesFiles[modulePath];
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = createStore({
  modules,
  getters,
});

export default store;
