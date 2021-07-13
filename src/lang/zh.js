//zh
import dashboard_zh from './dashboard/index_zh'
import admin_zh from "./admin/index_zh"
import adminGroup_zh from "./adminGroup/index_zh"
import adminLog_zh from "./adminLog/index_zh"
import adminRule_zh from "./adminRule/index_zh"
import auth_zh from "./auth/index_zh"
export default {
    app:{
        home:'首页'
    },
    userDropdown: {
        userinfo: '个人资料',
        loginout: '退出',
    },
    login: {
        login:'登录',
        username: '用户名',
        password: '密码',
        usernamePlaceholder: '请输入用户名',
        passwordPlaceholder: '请输入密码',
        loginBtn: '登录'
    },
    ...dashboard_zh,
    ...admin_zh,
    ...adminGroup_zh,
    ...adminLog_zh,
    ...adminRule_zh,
    ...auth_zh,
}