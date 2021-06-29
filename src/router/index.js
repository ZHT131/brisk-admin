//1.引入vue-router
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import Cookies from 'js-cookie'
import store from '../store'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401/index.vue'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'dashboard',
        meta: { title: '控制台', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'admin',
        component: () => import('@/views/admin/index.vue'),
        name: 'admin',
        meta: { title: '控制台', icon: 'admin' }
      }
    ]
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

//处理路由
export function filterAsyncRoutes(routes) {
  const res = []

  routes.forEach(route => {
    let tmp = { ...route }
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children)
    }
    tmp.component = () => import(route.component);
    res.push(tmp)
  })

  return res
}
//5.此处可以添加全局路由守卫以方便鉴权，也可以独立鉴权文件然后在main.js引入即可！
//我在这里直接放在路由文件中

// 前置守卫：路由跳转之前
// to 要进入的路由
// from 从那个路由过来的
router.beforeEach(async (to, form, next) => {
  /* 必须调用 `next` */
  // 动态修改网页标题
  document.title = to.meta.title
  //执行登录鉴权
  if (!Cookies.get('token')) {
    if (to.path == '/login') {
      // in the free login whitelist, go directly
      next()
    } else {
      next(`/login`)
    }
  }
  //获取用户对应菜单权限
  const accessRoutes = await store.dispatch('user/getUserRoutes');
  // roles must be a non-empty array
  if (!accessRoutes || accessRoutes.length <= 0) {
    console.log('getInfo: roles must be a non-null array!')
  }
  let routes = filterAsyncRoutes(accessRoutes);
  routes.forEach((item) => {
    router.addRoute(item);
  })
  next()
})

// 全局解析守卫: 同时在所有组件内守卫和异步路由组件被解析之后 和beforeEach区别是在导航被确认之前
router.beforeResolve((to, form, next) => {
  /* 必须调用 `next` */
  next()
})

// 后置守卫：路由跳转之后
router.afterEach((to, form) => {

})

export default router