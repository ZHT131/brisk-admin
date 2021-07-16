//1.引入vue-router
import { createRouter, createWebHashHistory } from 'vue-router'
import Cookies from 'js-cookie'
import store from '../store'
import { filterAsyncRoutes } from '../utils/index'
import i18n from '../lang/index'
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: { title: 'login', icon: 'el-icon-menu' },
    component: () => import('/@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    meta: { title: '401', icon: 'el-icon-menu' },
    component: () => import('/@/views/401/index.vue'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404', icon: 'el-icon-menu' },
    component: () => import('/@/views/404/index.vue'),
    hidden: true,
  }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes: constantRoutes,
})

//导航守卫中不会删除路由的白名单,对应上面constantRoutes(本地默认路由)名称
const WhiteList = ['login', '401', '404'];
//5.此处可以添加全局路由守卫以方便鉴权，也可以独立鉴权文件然后在main.js引入即可！
//我在这里直接放在路由文件中

// 前置守卫：路由跳转之前
// to 要进入的路由
// from 从那个路由过来的
router.beforeEach(async (to, form) => {
  /* 必须调用 `next` */
  // 动态修改网页标题
  if(to.meta.title){
    const { t } = i18n.global;
    document.title = t(`${to.meta.title}.${to.meta.title}`)
  }
  //执行登录鉴权，未登录跳转登录页
  if (!Cookies.get('token')) {
    if (to.path == '/login') {
      return;
    } else {
      return '/login';
    }
  }
  //已登录，如果地址为login执行跳转至控制台
  if (to.path == '/login') {
    return '/dashboard';
  }
  //获取用户对应菜单权限
  const accessRoutes = await store.dispatch('user/getUserRoutes');
  // routes must be a non-empty array
  if (!accessRoutes || accessRoutes.length <= 0) {
    console.log('routes must be a non-null array!')
  }
  let routes = filterAsyncRoutes(accessRoutes);
  //添加之前判断要跳转的路由是否存在
  let has_route = router.hasRoute(to.name);
  //根据权限添加路由
  let allRoutes = router.getRoutes();
  routes.forEach((item) => {
    // 防止重复添加路由
    if (
      allRoutes.findIndex(
        (value) => value.path === item.path
      ) == -1
    ) {
      router.addRoute(item);
    }
  })
  //删除用户权限中已不存在的路由
  let newallRoutes = router.getRoutes();
  let singleRoutes = store.state.user.singleRoutes;
  newallRoutes.forEach((item) => {
    if (
      singleRoutes.findIndex(
        (value) => value.path === item.path
      ) == -1
    ) {
      if (!WhiteList.includes(item.name)) {
        router.removeRoute(item.name);
      }
    }
  })
  //判断是否存在执行重定向避免刷新页面404
  if (has_route) {
    return;
  } else {
    //判断最新路由数组中是否含有当前即将跳转页面
    if (
      router.getRoutes().findIndex(
        (value) => value.path === to.fullPath
      ) == -1
    ) {
      //不存在，返回404页面
      return '/404';
    } else {
      //重定向
      return to.fullPath;
    }
  }
})

// 全局解析守卫: 同时在所有组件内守卫和异步路由组件被解析之后 和beforeEach区别是在导航被确认之前
router.beforeResolve((to, form) => {

})

// 后置守卫：路由跳转之后
router.afterEach((to, form) => {

})

export default router