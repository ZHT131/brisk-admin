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
    console.log(params);
    return params;
}

export {
    login,
    loginOut
}