import Cookies from 'js-cookie'
import { authRoutes } from "@/api";

const state = {
    token: Cookies.get('token'),
    userinfo: null,
    routes: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERINFO: (state, userinfo) => {
        state.userinfo = userinfo
    },
    SET_ROUTES: (state, routes) => {
        state.routes = routes
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
    getUserRoutes({ commit }) {
        return new Promise((resolve, reject) => {
            authRoutes().then((res) => {
                let routes = res.data;
                commit('SET_ROUTES', routes)
                resolve(routes);
            }).catch((err) => {
                reject(false);
            });
        });
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
