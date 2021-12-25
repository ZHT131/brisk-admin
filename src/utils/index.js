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
 * 将多层嵌套路由处理成平级
 * @param routes asyncRoutes
 */
export function sameLevelRoutes(routes, breadcrumb, baseUrl = "") {
  let res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (tmp.children) {
      let childrenBaseUrl = "";
      if (baseUrl == "") {
        childrenBaseUrl = tmp.path;
      } else if (tmp.path != "") {
        childrenBaseUrl = `${baseUrl}/${tmp.path}`;
      }
      let childrenBreadcrumb = deepClone(breadcrumb);
      if (route.meta.breadcrumb !== false) {
        childrenBreadcrumb.push({
          path: childrenBaseUrl,
          title: route.meta.title,
        });
      }
      let tmpRoute = deepClone(route);
      tmpRoute.path = childrenBaseUrl;
      tmpRoute.meta.breadcrumbNeste = childrenBreadcrumb;
      delete tmpRoute.children;
      res.push(tmpRoute);
      let childrenRoutes = sameLevelRoutes(
        tmp.children,
        childrenBreadcrumb,
        childrenBaseUrl
      );
      childrenRoutes.map((item) => {
        // 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
        if (res.some((v) => v.path == item.path)) {
          res.forEach((v, i) => {
            if (v.path == item.path) {
              res[i] = item;
            }
          });
        } else {
          res.push(item);
        }
      });
    } else {
      if (baseUrl != "") {
        if (tmp.path != "") {
          tmp.path = `${baseUrl}/${tmp.path}`;
        } else {
          tmp.path = baseUrl;
        }
      }
      // 处理面包屑导航
      let tmpBreadcrumb = deepClone(breadcrumb);
      if (tmp.meta.breadcrumb !== false) {
        tmpBreadcrumb.push({
          path: tmp.path,
          title: tmp.meta.title,
        });
      }
      tmp.meta.breadcrumbNeste = tmpBreadcrumb;
      res.push(tmp);
    }
  });
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
/**
 * 深拷贝
 */
export function deepClone(target) {
  // 定义一个变量
  let result;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === "object") {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]));
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
}
//用户修复element-plus主题色变更某些组件不改变问题
export const mix = (color1, color2, weight) => {
  weight = Math.max(Math.min(Number(weight), 1), 0);
  let r1 = parseInt(color1.substring(1, 3), 16);
  let g1 = parseInt(color1.substring(3, 5), 16);
  let b1 = parseInt(color1.substring(5, 7), 16);
  let r2 = parseInt(color2.substring(1, 3), 16);
  let g2 = parseInt(color2.substring(3, 5), 16);
  let b2 = parseInt(color2.substring(5, 7), 16);
  let r = Math.round(r1 * (1 - weight) + r2 * weight);
  let g = Math.round(g1 * (1 - weight) + g2 * weight);
  let b = Math.round(b1 * (1 - weight) + b2 * weight);
  r = ("0" + (r || 0).toString(16)).slice(-2);
  g = ("0" + (g || 0).toString(16)).slice(-2);
  b = ("0" + (b || 0).toString(16)).slice(-2);
  return "#" + r + g + b;
}