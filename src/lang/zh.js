//zh
const modulesFiles = import.meta.globEager("./modules/*/index_zh.js");
const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const value = modulesFiles[modulePath];
  Object.assign(modules, value.default);
  return modules;
}, {});

export default {
  app: {
    home: "首页",
    setting_title: "应用设置",
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
  ...modules,
};
