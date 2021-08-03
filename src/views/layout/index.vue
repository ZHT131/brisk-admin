<template>
  <div class="ym-body">
    <el-config-provider :locale="language == 'en' ? enLocale : zhLocale">
      <el-container style="height: 100%">
        <asideLayout />
        <el-container>
          <el-header>
            <headerLayout />
          </el-header>
          <el-main>
            <router-view :key="key" v-slot="{ Component }">
              <transition appear name="fade-transform" mode="out-in">
                <keep-alive>
                  <component :is="Component" />
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
import enLocale from "element-plus/lib/locale/lang/en";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";

export default {
  mixins: [ResizeMixin],
  components: {
    headerLayout,
    asideLayout,
  },
  data() {
    return {
      enLocale: enLocale,
      zhLocale: zhLocale,
    };
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      language: (state) => state.app.language,
    }),
    key() {
      return this.$route.path;
    },
  },
  methods: {},
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