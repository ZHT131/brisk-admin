//zh
import error_page_zh from "./error_page/index_zh";
import dashboard_zh from "./dashboard/index_zh";
import admin_zh from "./admin/index_zh";
import adminGroup_zh from "./adminGroup/index_zh";
import adminLog_zh from "./adminLog/index_zh";
import adminRule_zh from "./adminRule/index_zh";
import auth_zh from "./auth/index_zh";
import crud_zh from "./crud/index_zh";
import nested_zh from "./nested/index_zh";

export default {
  app: {
    home: "首页",
  },
  userDropdown: {
    userinfo: "个人资料",
    loginout: "退出",
  },
  login: {
    login: "登录",
    username: "用户名",
    password: "密码",
    usernamePlaceholder: "请输入用户名",
    passwordPlaceholder: "请输入密码",
    loginBtn: "登录",
  },
  401: {
    401: "401",
  },
  404: {
    404: "404",
  },
  ...error_page_zh,
  ...dashboard_zh,
  ...admin_zh,
  ...adminGroup_zh,
  ...adminLog_zh,
  ...adminRule_zh,
  ...auth_zh,
  ...crud_zh,
  ...nested_zh,
};
