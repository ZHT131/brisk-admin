import Mock from 'mockjs';

const login = (params) => {
    const data = JSON.parse(params.body);
    const users = {
        admin: {
            token: 'admin-token',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: 'Admin'
        },
        editor: {
            token: 'editor-token',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: 'Editor'
        }
    }
    if (!users[data.username]) {
        return {
            code: 0,
            message: 'Account and password are incorrect.'
        }
    }

    return {
        code: 1,
        data: users[data.username]
    };
}

const loginOut = (params) => {
    return {
        code: 1,
        data: params,
    }
}

const authRoutes = (params) => {
    // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
    // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
    // 若你想不管路由下面的 children 声明的个数都显示你的根路由
    // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
    const routes = [
        {
            path: '/',
            component: '/@/layout/index.vue',
            redirect: '/dashboard',
            meta: { title: '首页', icon: 'el-icon-menu' },
            alwaysShow: false,
            name: '/',
            children: [
                {
                    path: 'dashboard',
                    component: '/@/views/dashboard/index.vue',
                    name: 'dashboard',
                    meta: { title: '控制台', icon: 'el-icon-menu' },
                }
            ]
        },
        {
            path: '/auth',
            component: '/@/layout/index.vue',
            redirect: 'noRedirect',
            meta: { title: '权限管理', icon: 'auth' },
            alwaysShow: false,
            name: 'auth',
            children: [
                {
                    path: 'admin',
                    component: '/@/views/admin/index.vue',
                    name: 'admin',
                    meta: { title: '管理员管理', icon: 'el-icon-menu' }
                },
                {
                    path: 'adminLog',
                    component: '/@/views/adminLog/index.vue',
                    name: 'adminLog',
                    meta: { title: '管理员日志', icon: 'el-icon-menu' }
                },
                {
                    path: 'adminGroup',
                    component: '/@/views/adminGroup/index.vue',
                    name: 'adminGroup',
                    meta: { title: '管理员角色组', icon: 'el-icon-menu' }
                },
                {
                    path: 'adminRule',
                    component: '/@/views/adminRule/index.vue',
                    name: 'adminRule',
                    meta: { title: '菜单规则', icon: 'el-icon-menu' }
                }
            ]
        }
    ]
    return {
        code: 1,
        data: routes
    };
}

export {
    login,
    loginOut,
    authRoutes
}