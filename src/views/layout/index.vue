<template>
  <div class="brisk-body">
    <el-config-provider :locale="locale">
      <el-container style="height: 100%">
        <asideLayout />
        <settingLayout />
        <el-container>
          <el-header height="45px" style="padding:0;" :style="{'background':skinChoose.navBackground}">
            <headerLayout @refRoute="refRoute" />
          </el-header>
          <tabsLayout />
          <el-main>
            <router-view v-slot="{ Component , route }">
              <transition appear name="fade-transform" mode="out-in">
                <keep-alive :include="keepAliveRoutes">
                  <component :is="Component" :key="route.fullPath===refRoutePath?'':route.fullPath" />
                </keep-alive>
              </transition>
            </router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-config-provider>
  </div>
</template>

<script>
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";
import headerLayout from "./components/header/index.vue";
import asideLayout from "./components/aside/index.vue";
import settingLayout from "./components/setting/index.vue";
import tabsLayout from "./components/tabs/index.vue";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";
export default {
  name: "layout",
  mixins: [ResizeMixin],
  components: {
    headerLayout,
    asideLayout,
    settingLayout,
    tabsLayout,
  },
  data() {
    return {
      levelList: [],
      refRoutePath: "",
      locale: zhLocale,
    };
  },
  watch: {
    $route(route) {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      skinChoose: (state) => state.settings.skinChoose,
      keepAliveRoutes: (state) => state.user.keepAliveRoutes,
    }),
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched;
      this.levelList = matched;
    },
    //刷新当前页
    refRoute() {
      let keeps = this.keepAliveRoutes;
      const keepindex = keeps.findIndex((item) => item == this.$route.name);
      if (keepindex > -1) {
        keeps.splice(keepindex, 1);
        this.$store.dispatch("user/setKeepAlive", keeps);
      }
      this.refRoutePath = this.$route.fullPath;
      this.$nextTick(() => {
        this.refRoutePath = "";
        if (keepindex > -1) {
          //恢复原始keepalive
          this.$store.dispatch("user/getKeepAlive");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.brisk-body {
  position: relative;
  height: 100%;
  width: 100%;
}

.el-main {
  background-color: #e9eef3;
  padding: 15px;
}
// :deep{
//   .is-horizontal {
//     display: none !important;
//   }
// }
</style>