import Cookies from "js-cookie";
import { authRoutes } from "@/api";
import { singleAsyncRoutes } from "../../utils/index";

const state = {
  token: Cookies.get("token"),
  userinfo: Cookies.get("userinfo"),
  routes: [],
  singleRoutes: [],
  activeRoute: Cookies.get("activeRoute") ? Cookies.get("activeRoute") : "/",
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
  SET_ACTIVEROUTE: (state, activeRoute) => {
    state.activeRoute = activeRoute;
  },
};

const actions = {
  loginSet({ commit }, userinfo) {
    commit("SET_TOKEN", userinfo.token);
    commit("SET_USERINFO", userinfo);
    Cookies.set("token", userinfo.token);
    Cookies.set("userinfo", userinfo);
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
  getUserRoutes({ state, commit }) {
    let userinfo = state.userinfo;
    if (typeof state.userinfo === "string") {
      userinfo = JSON.parse(userinfo);
    }
    return new Promise((resolve, reject) => {
      authRoutes({
        group: userinfo.group,
      })
        .then((res) => {
          let routes = res.data;
          commit("SET_ROUTES", routes);
          let single = singleAsyncRoutes(routes);
          commit("SET_SINGLEROUTES", single);
          resolve(routes);
        })
        .catch((err) => {
          reject(false);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
