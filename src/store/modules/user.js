import Cookies from "js-cookie";
import { authRoutes } from "~/api";
import { singleAsyncRoutes } from "../../utils/index";

const state = {
  token: Cookies.get("token"),
  userinfo: Cookies.get("userinfo") ? JSON.parse(Cookies.get("userinfo")) : {},
  routes: [],
  singleRoutes: [],
  activeRoute: Cookies.get("activeRoute") ? Cookies.get("activeRoute") : "/",
  keepAliveRoutes: [],
  getIsDynamicRoute: false,
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo;
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes;
  },
  SET_SINGLEROUTES: (state, routes) => {
    state.singleRoutes = routes;
  },
  SET_KEEPALIVEROUTES: (state, routes) => {
    state.keepAliveRoutes = routes;
  },
  SET_ACTIVEROUTE: (state, activeRoute) => {
    state.activeRoute = activeRoute;
  },
  SET_DYNAMICROUTE: (state, status) => {
    state.getIsDynamicRoute = status;
  },
};

const actions = {
  loginSet({ commit }, userinfo) {
    commit("SET_TOKEN", userinfo.token);
    commit("SET_USERINFO", userinfo);
    Cookies.set("token", userinfo.token);
    Cookies.set("userinfo", JSON.stringify(userinfo));
  },
  loginOutSet({ commit }) {
    commit("SET_TOKEN", null);
    commit("SET_USERINFO", null);
    Cookies.remove("token");
  },
  activeRoute({ commit }, path) {
    commit("SET_ACTIVEROUTE", path);
    Cookies.set("activeRoute", path);
  },
  getUserRoutes({ state, commit, dispatch }) {
    let userinfo = state.userinfo;
    return new Promise((resolve, reject) => {
      authRoutes({
        group: userinfo.group,
      })
        .then((res) => {
          let routes = res.data;
          commit("SET_ROUTES", routes);
          let single = singleAsyncRoutes(routes);
          commit("SET_SINGLEROUTES", single);
          commit("SET_DYNAMICROUTE", true);
          dispatch("getKeepAlive");
          resolve(routes);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
  getKeepAlive({ state, commit }) {
    let keepAliveRoutes = [];
    state.singleRoutes.map((item) => {
      if (item.meta.keepAlive) {
        keepAliveRoutes.push(item.name);
      }
    });
    commit("SET_KEEPALIVEROUTES", keepAliveRoutes);
  },
  setKeepAlive({ commit }, keepAliveRoutes) {
    commit("SET_KEEPALIVEROUTES", keepAliveRoutes);
  },
  setDynamicRoute({ commit }, status) {
    commit("SET_DYNAMICROUTE", status);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
