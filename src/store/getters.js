const getters = {
  language: state => state.app.language,
  device: state => state.app.device,
  sidebar: state => state.app.sidebar,
  showSet: state => state.app.showSet,
  routes: state => state.user.routes,
  singleRoutes: state => state.user.singleRoutes,
  activeRoute: state => state.user.activeRoute,
}
export default getters
