import { h } from "vue";
import { isExternal } from "./validate";
//先进行views下所有vue文件动态导入声明，以便后台动态返回路由进行本地动态导入,目前这个只支持一层文件夹，如需多层请追加 /*
const modules = import.meta.glob("../views/*/*.vue");
/**
 * 转化路由component实例化本地文件
 * @param routes asyncRoutes
 */
export function filterAsyncRoutes(routes) {
  const res = [];
  routes.forEach((route) => {
    let tmp = { ...route };
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children);
    }
    if (tmp.component == "noComponent") {
      tmp.component = modules[`../views/layout/nestedComponent.vue`];
    } else {
      tmp.component = modules[`../views/${route.component}`];
    }
    res.push(tmp);
  });
  return res;
}

/**
 * 嵌套路由超过3级后的平到第三级
 * @param routes asyncRoutes
 */
export function sameLevelRoutes(routes) {
  var res = [];
  for (let i = 0; i < routes.length; i++) {
    const level1 = routes[i];
    if (level1.children) {
      for (let j = 0; j < level1.children.length; j++) {
        const level2 = level1.children[j];
        if (level2.children) {
          for (let k = 0; k < level2.children.length; k++) {
            const level3 = level2.children[k];
            if (level3.children) {
              // console.log(level3.children);
              const childs = singleAsyncRoutes(level3.children);
              routes[i].children[j].children.concat(childs);
            }
          }
        }
      }
    }
  }
  // console.log(routes);
  return res;
}

/**
 * 多维路由转化一维
 * @param routes asyncRoutes
 */
export function singleAsyncRoutes(routes) {
  var res = [];
  routes.forEach((route) => {
    let tmp = {
      ...route,
    };
    res.push(tmp);
    let path_text = tmp.path;
    if (tmp.children) {
      let arr = singleAsyncRoutes(tmp.children);
      arr.forEach((child) => {
        //判断是否是外部链接
        if (!isExternal(child.path)) {
          //判断path最后一位是否为/
          if (path_text.substr(path_text.length - 1, 1) != "/") {
            child.path = path_text + "/" + child.path;
          } else {
            child.path = path_text + child.path;
          }
        }
      });
      res = res.concat(arr);
    }
  });
  return res;
}
