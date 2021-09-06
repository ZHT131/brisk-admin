<template>
  <div class="ym-body">
    <el-config-provider :locale="language == 'en' ? enLocale : zhLocale">
      <el-container style="height: 100%">
        <asideLayout />
        <settingLayout />
        <el-container>
          <el-header :style="{'background':skinChoose.navBackground}">
            <headerLayout @refRoute="refRoute" />
          </el-header>
          <el-main>
            <div class="ym-breadcrumb">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,index) in levelList" :key="index">
                  {{$t(item.name + "." + item.meta.title)}}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <router-view v-slot="{ Component }" v-if="routeStatus">
              <transition appear name="fade-transform" mode="out-in">
                <keep-alive v-if="keepAliveRoutes" :include="keepAliveRoutes">
                  <component :is="Component" :key="key" />
                </keep-alive>
                <component v-else :is="Component" :key="key" />
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
import enLocale from "element-plus/lib/locale/lang/en";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";

export default {
  name:'layout',
  mixins: [ResizeMixin],
  components: {
    headerLayout,
    asideLayout,
    settingLayout,
  },
  data() {
    return {
      enLocale: enLocale,
      zhLocale: zhLocale,
      levelList: [],
      routeStatus: true,
    };
  },
  watch: {
    $route(route) {
      this.getBreadcrumb();
    },
  },
  created() {
    console.log(this.keepAliveRoutes)
    this.getBreadcrumb();
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      language: (state) => state.app.language,
      skinChoose: (state) => state.settings.skinChoose,
      keepAliveRoutes: (state) => state.user.keepAliveRoutes,
    }),
    key() {
      return this.$route.path;
    },
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched;
      this.levelList = matched;
    },
    //刷新当前页
    refRoute() {
      this.routeStatus = false;
      this.$nextTick(() => {
        this.routeStatus = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ym-body {
  position: relative;
  height: 100%;
  width: 100%;
}

.el-main {
  background-color: #e9eef3;
}
.ym-breadcrumb {
  padding-bottom: 20px;
}
</style>
<style>
.is-horizontal {
  display: none !important;
}
.el-dropdown {
  font-size: 12px;
  margin-left: 20px;
}
</style>