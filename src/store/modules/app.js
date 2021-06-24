import Cookies from 'js-cookie'

const state = {
  sidebar: false,
  device: 'desktop',
  language: Cookies.get('language') ? Cookies.get('language') : 'zh-cn',
}

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  TOGGLE_SIDEBAR: (state, sidebar) => {
    state.sidebar = sidebar
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  }
}

const actions = {
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  toggleSidebar({ commit }, sidebar) {
    commit('TOGGLE_SIDEBAR', sidebar)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
