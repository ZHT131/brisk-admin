import Cookies from "js-cookie";
import settings from "../../settings/settings";

const state = {
  sidebar: false,
  showSet: false,
  device: "desktop",
  language: Cookies.get("language") ? Cookies.get("language") : settings.LANGUAGE,
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
