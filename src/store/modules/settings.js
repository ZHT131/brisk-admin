
const state = {
  appName: 'T-Admin',//logo名称
  logogram: 'T',//logo名称简写
  /**
   * @type {boolean} true | false
   * @description 是否显示右侧设置页
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要标签栏
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否显示logo
   */
  sidebarLogo: false,
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

