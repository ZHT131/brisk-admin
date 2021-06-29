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
    const routes = [
        {
            path: '/auth',
            component: '/@/layout/index.vue',
            meta: {},
            children: [
                {
                    path: 'admin',
                    component: '/@/views/admin/index.vue',
                    name: 'admin',
                    meta: { title: '管理员管理', icon: 'admin' }
                },
                {
                    path: 'adminLog',
                    component: '/@/views/adminLog/index.vue',
                    name: 'adminLog',
                    meta: { title: '管理员日志', icon: 'adminlog' }
                },
                {
                    path: 'adminGroup',
                    component: '/@/views/adminGroup/index.vue',
                    name: 'adminGroup',
                    meta: { title: '管理员角色组', icon: 'adminGroup' }
                },
                {
                    path: 'adminRule',
                    component: '/@/views/adminRule/index.vue',
                    name: 'adminRule',
                    meta: { title: '菜单规则', icon: 'adminRule' }
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