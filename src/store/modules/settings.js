import Cookies from "js-cookie";
import skin from "../../utils/skin";

const state = {
  appName: "Brisk-Admin", //logo名称
  logogram: "Brisk", //logo名称简写
  skinChoose: Cookies.get("skinChoose")
    ? skin[Cookies.get("skinChoose")]
    : skin.aside_white_nav_white,
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
