import Mock from "mockjs";

const login = (params) => {
  const data = JSON.parse(params.body);
  const users = {
    admin: {
      token: "admin-token",
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      name: "Admin",
      group: "admin",
    },
    editor: {
      token: "editor-token",
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      name: "Editor",
      group: "editor",
    },
  };
  if (!users[data.username]) {
    return {
      code: 0,
      message: "Account and password are incorrect.",
    };
  }

  return {
    code: 1,
    data: users[data.username],
  };
};

const loginOut = (params) => {
  return {
    code: 1,
    data: params,
  };
};

const authRoutes = (params) => {
  let body = JSON.parse(params.body);
  if (body.group == "admin") {
    // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
    // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
    // 若你想不管路由下面的 children 声明的个数都显示你的根路由
    // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
    const routes = [
      {
        path: "/",
        component: "layout/index.vue",
        redirect: "/dashboard",
        meta: { title: "home", icon: "el-icon-menu" },
        alwaysShow: false,
        name: "app",
        children: [
          {
            path: "dashboard",
            component: "dashboard/index.vue",
            name: "dashboard",
            meta: { title: "dashboard", icon: "el-icon-menu" },
            redirect: null,
            alwaysShow: false,
          },
        ],
      },
      {
        path: "/auth",
        component: "layout/index.vue",
        redirect: null,
        meta: { title: "auth", icon: "el-icon-menu" },
        alwaysShow: true,
        name: "auth",
        children: [
          {
            path: "admin",
            component: "admin/index.vue",
            name: "admin",
            meta: { title: "admin", icon: "el-icon-menu" },
            redirect: null,
            alwaysShow: false,
          },
          {
            path: "adminLog",
            component: "adminLog/index.vue",
            name: "adminLog",
            meta: { title: "adminLog", icon: "el-icon-menu" },
            alwaysShow: false,
            redirect: null,
          },
          {
            path: "adminGroup",
            component: "adminGroup/index.vue",
            name: "adminGroup",
            meta: { title: "adminGroup", icon: "el-icon-menu" },
            alwaysShow: false,
            redirect: null,
          },
          {
            path: "adminRule",
            component: "adminRule/index.vue",
            name: "adminRule",
            meta: { title: "adminRule", icon: "el-icon-menu" },
            alwaysShow: false,
            redirect: null,
          },
        ],
      },
      {
        path: "/error_page",
        component: "layout/index.vue",
        name: "error_page",
        redirect: null,
        meta: { title: "error_page", icon: "el-icon-menu" },
        alwaysShow: true,
        children: [
          {
            path: "401",
            component: "401/index.vue",
            name: "page401",
            meta: { title: "page401", icon: "el-icon-menu" },
            redirect: null,
            alwaysShow: false,
          },
          {
            path: "404",
            component: "404/index.vue",
            name: "page404",
            meta: { title: "page404", icon: "el-icon-menu" },
            redirect: null,
            alwaysShow: false,
          },
        ],
      },
    ];
    return {
      code: 1,
      data: routes,
    };
  } else {
    // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
    // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
    // 若你想不管路由下面的 children 声明的个数都显示你的根路由
    // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
    const routes = [
      {
        path: "/",
        component: "layout/index.vue",
        redirect: "/dashboard",
        meta: { title: "home", icon: "el-icon-menu" },
        alwaysShow: false,
        name: "app",
        children: [
          {
            path: "dashboard",
            component: "dashboard/index.vue",
            name: "dashboard",
            meta: { title: "dashboard", icon: "el-icon-menu" },
            redirect: null,
            alwaysShow: false,
          },
        ],
      },
      {
        path: "/auth",
        component: "layout/index.vue",
        redirect: null,
        meta: { title: "auth", icon: "el-icon-menu" },
        alwaysShow: true,
        name: "auth",
        children: [
          {
            path: "admin",
            component: "admin/index.vue",
            name: "admin",
            meta: { title: "admin", icon: "el-icon-menu" },
            redirect: null,
            alwaysShow: false,
          },
          {
            path: "adminLog",
            component: "adminLog/index.vue",
            name: "adminLog",
            meta: { title: "adminLog", icon: "el-icon-menu" },
            alwaysShow: false,
            redirect: null,
          },
        ],
      },
      {
        path: "/error_page",
        component: "layout/index.vue",
        name: "error_page",
        redirect: null,
        meta: { title: "error_page", icon: "el-icon-menu" },
        alwaysShow: true,
        children: [
          {
            path: "401",
            component: "401/index.vue",
            name: "page401",
            meta: { title: "page401", icon: "el-icon-menu" },
            redirect: null,
            alwaysShow: false,
          },
          {
            path: "404",
            component: "404/index.vue",
            name: "page404",
            meta: { title: "page404", icon: "el-icon-menu" },
            redirect: null,
            alwaysShow: false,
          },
        ],
      },
    ];
    return {
      code: 1,
      data: routes,
    };
  }
};

export { login, loginOut, authRoutes };
