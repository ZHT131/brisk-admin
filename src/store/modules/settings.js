import Cookies from "js-cookie";
import skin from "../../settings/skin";
import settings from "../../settings/settings";
const state = {
  appName: settings.APP_NAME, //logo名称
  logogram: settings.LOGO_GRAM, //logo名称简写
  skinChoose: Cookies.get("skinChoose")
    ? skin[Cookies.get("skinChoose")]
    : skin[settings.SKIN_CHOOSE],
  // tagsView: true, //是否需要标签栏
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
      if (key === "skinChoose") {
        Cookies.set("skinChoose", value.className);
      }
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
