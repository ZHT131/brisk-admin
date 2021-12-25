import Cookies from "js-cookie";
import skin from "../../settings/skin";
import settings from "../../settings/settings";
const state = {
  appName: settings.APP_NAME, //logo名称
  logogram: settings.LOGO_GRAM, //logo名称简写
  skinChoose: localStorage.getItem("skinChoose")
    ? skin[localStorage.getItem("skinChoose")]
    : skin[settings.SKIN_CHOOSE],
  colorPrimary: localStorage.getItem("colorPrimary")
    ? localStorage.getItem("colorPrimary")
    : settings.COLOR_PRIMARY,
  // tagsView: true, //是否需要标签栏
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
      if (key === "skinChoose") {
        localStorage.setItem("skinChoose", value.className);
      }
    }
  },
  COLOR_PRIMARY: (state, color) => {
    state.color = color;
  },
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  },
  setColorPrimary({ commit }, color) {
    localStorage.setItem("colorPrimary", color);
    commit("COLOR_PRIMARY", color);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
