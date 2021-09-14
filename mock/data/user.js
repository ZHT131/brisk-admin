import Mock from "mockjs";

const login = (params) => {
  const data = JSON.parse(params.body);
  const users = {
    admin: {
      token: "admin-token",
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      nickname: "Admin",
      group: "admin",
    },
    editor: {
      token: "editor-token",
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      nickname: "Editor",
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
    // 你可以设置 keepAlive: true，这样它就会缓存页面
    const routes = [
      {
        path: "/",
        component: "layout/index.vue",
        redirect: "/dashboard",
        meta: {
          title: "home",
          icon: "ri-home-line",
          keepAlive: false,
          tabShow: false,
        },
        alwaysShow: false,
        name: "app",
        children: [
          {
            path: "dashboard",
            component: "dashboard/index.vue",
            name: "dashboard",
            meta: {
              title: "dashboard",
              icon: "ri-home-line",
              keepAlive: true,
              tabShow: true,
            },
            redirect: null,
            alwaysShow: false,
          },
        ],
      },
      {
        path: "/profile",
        component: "layout/index.vue",
        redirect: "/profile/index",
        meta: {
          title: "profile",
          icon: "ri-home-line",
          keepAlive: false,
          tabShow: false,
        },
        name: "profile",
        alwaysShow: false,
        hidden: true,
        children: [
          {
            path: "index",
            component: "profile/index.vue",
            name: "profileIndex",
            meta: {
              title: "profileIndex",
              icon: "ri-home-line",
              keepAlive: true,
              tabShow: true,
            },
            redirect: null,
            alwaysShow: false,
          },
        ],
      },
      {
        path: "/auth",
        component: "layout/index.vue",
        redirect: null,
        meta: {
          title: "auth",
          icon: "ri-file-user-line",
          keepAlive: false,
          tabShow: false,
        },
        alwaysShow: true,
        name: "auth",
        children: [
          {
            path: "admin",
            component: "admin/index.vue",
            name: "admin",
            meta: {
              title: "admin",
              icon: "ri-admin-line",
              keepAlive: true,
              tabShow: true,
            },
            redirect: null,
            alwaysShow: false,
          },
          {
            path: "adminLog",
            component: "adminLog/index.vue",
            name: "adminLog",
            meta: {
              title: "adminLog",
              icon: "ri-file-list-line",
              keepAlive: true,
              tabShow: true,
            },
            alwaysShow: false,
            redirect: null,
          },
          {
            path: "adminGroup",
            component: "adminGroup/index.vue",
            name: "adminGroup",
            meta: {
              title: "adminGroup",
              icon: "ri-group-line",
              keepAlive: true,
              tabShow: true,
            },
            alwaysShow: false,
            redirect: null,
          },
          {
            path: "adminRule",
            component: "adminRule/index.vue",
            name: "adminRule",
            meta: {
              title: "adminRule",
              icon: "ri-menu-line",
              keepAlive: true,
              tabShow: true,
            },
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
        meta: {
          title: "error_page",
          icon: "ri-error-warning-line",
          keepAlive: false,
          tabShow: false,
        },
        alwaysShow: true,
        children: [
          {
            path: "401",
            component: "401/index.vue",
            name: "page401",
            meta: {
              title: "page401",
              icon: "ri-error-warning-line",
              keepAlive: true,
              tabShow: true,
            },
            redirect: null,
            alwaysShow: false,
          },
          {
            path: "404",
            component: "404/index.vue",
            name: "page404",
            meta: {
              title: "page404",
              icon: "ri-error-warning-line",
              keepAlive: true,
              tabShow: true,
            },
            redirect: null,
            alwaysShow: false,
          },
        ],
      },
      //嵌套路由示例
      {
        path: "/nested",
        component: "layout/index.vue",
        name: "nested",
        redirect: null,
        meta: {
          title: "nested",
          icon: "ri-stack-fill",
          keepAlive: false,
          tabShow: false,
        },
        alwaysShow: true,
        children: [
          {
            path: "menu",
            component: "noComponent",
            name: "menu",
            meta: {
              title: "menu",
              icon: "ri-apps-2-fill",
              keepAlive: false,
              tabShow: false,
            },
            redirect: null,
            alwaysShow: true,
            children: [
              {
                path: "menu2",
                component: "noComponent",
                name: "menu2",
                meta: {
                  title: "menu2",
                  icon: "ri-apps-2-fill",
                  keepAlive: false,
                  tabShow: false,
                },
                redirect: null,
                alwaysShow: true,
                children: [
                  {
                    path: "menu4",
                    component: "menu4/index.vue",
                    name: "menu4",
                    meta: {
                      title: "menu4",
                      icon: "ri-apps-2-fill",
                      keepAlive: true,
                      tabShow: true,
                    },
                    redirect: null,
                    alwaysShow: false,
                  },
                ],
              },
              {
                path: "menu3",
                component: "menu3/index.vue",
                name: "menu3",
                meta: {
                  title: "menu3",
                  icon: "ri-apps-2-fill",
                  keepAlive: true,
                  tabShow: true,
                },
                redirect: null,
                alwaysShow: false,
              },
            ],
          },
          {
            path: "menu1",
            component: "menu1/index.vue",
            name: "menu1",
            meta: {
              title: "menu1",
              icon: "ri-apps-2-fill",
              keepAlive: true,
              tabShow: true,
            },
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
    // 你可以设置 keepAlive: true，这样它就会缓存页面
    const routes = [
      {
        path: "/",
        component: "layout/index.vue",
        redirect: "/dashboard",
        meta: {
          title: "home",
          icon: "ri-home-line",
          keepAlive: false,
          tabShow: false,
        },
        alwaysShow: false,
        name: "app",
        children: [
          {
            path: "dashboard",
            component: "dashboard/index.vue",
            name: "dashboard",
            meta: {
              title: "dashboard",
              icon: "ri-home-line",
              keepAlive: true,
              tabShow: true,
            },
            redirect: null,
            alwaysShow: false,
          },
        ],
      },
      {
        path: "/profile",
        component: "layout/index.vue",
        redirect: "/profile/index",
        meta: {
          title: "profile",
          icon: "ri-home-line",
          keepAlive: false,
          tabShow: false,
        },
        name: "profile",
        alwaysShow: false,
        hidden: true,
        children: [
          {
            path: "index",
            component: "profile/index.vue",
            name: "profileIndex",
            meta: {
              title: "profileIndex",
              icon: "ri-home-line",
              keepAlive: true,
              tabShow: true,
            },
            redirect: null,
            alwaysShow: false,
          },
        ],
      },
      {
        path: "/auth",
        component: "layout/index.vue",
        redirect: null,
        meta: {
          title: "auth",
          icon: "ri-file-user-line",
          keepAlive: false,
          tabShow: false,
        },
        alwaysShow: true,
        name: "auth",
        children: [
          {
            path: "admin",
            component: "admin/index.vue",
            name: "admin",
            meta: {
              title: "admin",
              icon: "ri-admin-line",
              keepAlive: true,
              tabShow: true,
            },
            redirect: null,
            alwaysShow: false,
          },
          {
            path: "adminLog",
            component: "adminLog/index.vue",
            name: "adminLog",
            meta: {
              title: "adminLog",
              icon: "ri-file-list-line",
              keepAlive: true,
              tabShow: true,
            },
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
        meta: {
          title: "error_page",
          icon: "ri-error-warning-line",
          keepAlive: false,
          tabShow: false,
        },
        alwaysShow: true,
        children: [
          {
            path: "401",
            component: "401/index.vue",
            name: "page401",
            meta: {
              title: "page401",
              icon: "ri-error-warning-line",
              keepAlive: true,
              tabShow: true,
            },
            redirect: null,
            alwaysShow: false,
          },
          {
            path: "404",
            component: "404/index.vue",
            name: "page404",
            meta: {
              title: "page404",
              icon: "ri-error-warning-line",
              keepAlive: true,
              tabShow: true,
            },
            redirect: null,
            alwaysShow: false,
          },
        ],
      },
      //嵌套路由示例
      {
        path: "/nested",
        component: "layout/index.vue",
        name: "nested",
        redirect: null,
        meta: {
          title: "nested",
          icon: "ri-stack-fill",
          keepAlive: false,
          tabShow: false,
        },
        alwaysShow: true,
        children: [
          {
            path: "menu",
            component: "noComponent",
            name: "menu",
            meta: {
              title: "menu",
              icon: "ri-apps-2-fill",
              keepAlive: false,
              tabShow: false,
            },
            redirect: null,
            alwaysShow: true,
            children: [
              {
                path: "menu2",
                component: "noComponent",
                name: "menu2",
                meta: {
                  title: "menu2",
                  icon: "ri-apps-2-fill",
                  keepAlive: false,
                  tabShow: false,
                },
                redirect: null,
                alwaysShow: true,
                children: [
                  {
                    path: "menu4",
                    component: "menu4/index.vue",
                    name: "menu4",
                    meta: {
                      title: "menu4",
                      icon: "ri-apps-2-fill",
                      keepAlive: true,
                      tabShow: true,
                    },
                    redirect: null,
                    alwaysShow: false,
                  },
                ],
              },
              {
                path: "menu3",
                component: "menu3/index.vue",
                name: "menu3",
                meta: {
                  title: "menu3",
                  icon: "ri-apps-2-fill",
                  keepAlive: true,
                  tabShow: true,
                },
                redirect: null,
                alwaysShow: false,
              },
            ],
          },
          {
            path: "menu1",
            component: "menu1/index.vue",
            name: "menu1",
            meta: {
              title: "menu1",
              icon: "ri-apps-2-fill",
              keepAlive: true,
              tabShow: true,
            },
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
