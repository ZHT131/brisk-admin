const skin = {
  aside_white_nav_white: {
    asideBackground: "#ffffff",
    asideColor: "#000000",
    navBackgroud: "#ffffff",
    navColor: "#000000",
  },
  aside_black_nav_white: {
    asideBackground: "#222d32",
    asideColor: "#ffffff",
    navBackgroud: "#ffffff",
    navColor: "#000000",
  },
  aside_black_nav_black: {
    asideBackground: "#222d32",
    asideColor: "#ffffff",
    navBackgroud: "#222d32",
    navColor: "#ffffff",
  },
  aside_purple_nav_white: {
    asideBackground: "#605ca8",
    asideColor: "#ffffff",
    navBackgroud: "#ffffff",
    navColor: "#000000",
  },
};

const state = {
  appName: "T-Admin", //logo名称
  logogram: "T", //logo名称简写
  skinChoose: skin.aside_white_nav_white,
  /**
   * @type {boolean} true | false
   * @description 是否需要标签栏
   */
  tagsView: true,
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
