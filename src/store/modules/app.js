// import Cookies from 'js-cookie'
// import { getLanguage } from '@/lang/index'

const state = {
  device: 'desktop',
  // language: getLanguage(),
}

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  // SET_LANGUAGE: (state, language) => {
  //   state.language = language
  //   Cookies.set('language', language)
  // }
}

const actions = {
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  // setLanguage({ commit }, language) {
  //   commit('SET_LANGUAGE', language)
  // },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
