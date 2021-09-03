import { createStore } from "vuex";
import getters from "./getters";

const modulesFiles = import.meta.globEager("./modules/*.js");
// console.log(Object.keys(modulesFiles));
const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/(.*\/)*([^.]+).*/gi, "$2");
  const value = modulesFiles[modulePath];
  modules[moduleName] = value.default;
  return modules;
}, {});
// console.log(modules);

const store = createStore({
  modules,
  getters,
});

export default store;
