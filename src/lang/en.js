//en
import error_page_en from "./error_page/index_en"
import dashboard_en from "./dashboard/index_en"
import admin_en from "./admin/index_en"
import adminGroup_en from "./adminGroup/index_en"
import adminLog_en from "./adminLog/index_en"
import adminRule_en from "./adminRule/index_en"
import auth_en from "./auth/index_en"
import crud_en from "./crud/index_en"
export default {
    app:{
        home:'home'
    },
    userDropdown: {
        userinfo: 'userinfo',
        loginout: 'loginout',
    },
    login: {
        login:'login',
        username: 'username',
        password: 'password',
        usernamePlaceholder: 'please enter user name',
        passwordPlaceholder: 'Please enter the password',
        loginBtn: 'login'
    },
    ...error_page_en,
    ...dashboard_en,
    ...admin_en,
    ...adminGroup_en,
    ...adminLog_en,
    ...adminRule_en,
    ...auth_en,
    ...crud_en,
}