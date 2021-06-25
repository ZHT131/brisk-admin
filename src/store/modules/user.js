import Cookies from 'js-cookie'

const state = {
    token: Cookies.get('token'),
    userinfo: null,
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERINFO: (state, userinfo) => {
        state.userinfo = userinfo
    },
}

const actions = {
    loginSet({ commit }, userinfo) {
        commit('SET_TOKEN', userinfo.token);
        commit('SET_USERINFO', userinfo);
        Cookies.set('token', userinfo.token);
    },
    loginOutSet({ commit }) {
        commit('SET_TOKEN', null);
        commit('SET_USERINFO', null);
        Cookies.remove('token');
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
