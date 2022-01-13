import Cookies from "js-cookie";
import settings from "../../settings/settings";
import router from "~/router/index.js";

const state = {
  sidebar: false,
  showSet: false,
  device: "desktop",
  language: Cookies.get("language")
    ? Cookies.get("language")
    : settings.LANGUAGE,
  tabsList: [],
  tabActive: "",
};

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  TOGGLE_SIDEBAR: (state, sidebar) => {
    state.sidebar = sidebar;
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language;
    Cookies.set("language", language);
  },
  SET_SHOWSET: (state, showSet) => {
    state.showSet = showSet;
  },
  SET_TABACTIVE: (state, tabActive) => {
    state.tabActive = tabActive;
  },
  SET_TABSLIST: (state, tabsList) => {
    state.tabsList = tabsList;
  },
};

const actions = {
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
  toggleSidebar({ commit }, sidebar) {
    commit("TOGGLE_SIDEBAR", sidebar);
  },
  setLanguage({ commit }, language) {
    commit("SET_LANGUAGE", language);
  },
  setShowSet({ commit }, showSet) {
    commit("SET_SHOWSET", showSet);
  },
  //登录重置标签
  refTabs({ state, commit }) {
    let tabsList = [];
    commit("SET_TABACTIVE", "");
    commit("SET_TABSLIST", tabsList);
    localStorage.setItem("tabsList", JSON.stringify(tabsList));
    localStorage.setItem("tabActive", "");
  },
  //初始化标签
  initTabs({ state, commit }) {
    let tabsList = JSON.parse(localStorage.getItem("tabsList"));
    let tabActive = localStorage.getItem("tabActive");
    if (tabsList && tabActive) {
      commit("SET_TABACTIVE", tabActive);
      commit("SET_TABSLIST", tabsList);
    }
  },
  //添加标签
  addTabs({ state, commit }, route) {
    let tabsList = state.tabsList;
    const isExists = tabsList.some((item) => item.fullPath == route.fullPath);
    if (!isExists) {
      tabsList.push(route);
    }
    commit("SET_TABACTIVE", route.fullPath);
    commit("SET_TABSLIST", tabsList);
    localStorage.setItem("tabsList", JSON.stringify(tabsList));
    localStorage.setItem("tabActive", route.fullPath);
  },
  //点击标签切换选中
  clickTab({ state, commit }, index) {
    let tab = state.tabsList[index];
    commit("SET_TABACTIVE", tab.fullPath);
    localStorage.setItem("tabActive", tab.fullPath);
    router.push({ path: tab.fullPath });
  },
  // 关闭其他标签
  closeOtherTabs({ state, commit }, route) {
    let tabsList = state.tabsList;
    tabsList = tabsList.filter((item) => item.fullPath == route.fullPath);
    commit("SET_TABSLIST", tabsList);
    localStorage.setItem("tabsList", JSON.stringify(tabsList));
  },
  // 关闭当前页
  closeCurrentTab({ state, commit }, obj) {
    let tabsList = state.tabsList;
    const index = tabsList.findIndex((item) => item.fullPath == obj.fullPath);
    tabsList.splice(index, 1);
    commit("SET_TABSLIST", tabsList);
    localStorage.setItem("tabsList", JSON.stringify(tabsList));
    if (obj.type == "current") {
      //打开最后一个tab页面
      commit("SET_TABACTIVE", tabsList[tabsList.length - 1].fullPath);
      localStorage.setItem("tabActive", tabsList[tabsList.length - 1].fullPath);
      router.push({ path: tabsList[tabsList.length - 1].fullPath });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
