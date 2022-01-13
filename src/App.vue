<template>
  <router-view></router-view>
</template>
<script>
import { mapState } from "vuex";
import { mix } from "~/utils/index.js";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      colorPrimary: (state) => state.settings.colorPrimary,
    }),
  },
  created() {
    // 变量前缀
    const pre = "--el-color-primary";
    // 白色混合色
    const mixWhite = "#ffffff";
    // 黑色混合色
    const mixBlack = "#000000";
    const el = document.documentElement;
    el.style.setProperty(pre, this.colorPrimary);
    // 这里是覆盖原有颜色的核心代码
    for (let i = 1; i < 10; i += 1) {
      el.style.setProperty(`${pre}-light-${i}`, mix(this.colorPrimary, mixWhite, i * 0.1));
    }
    el.style.setProperty("--el-color-primary-dark", mix(this.colorPrimary, mixBlack, 0.1));
  },
}
</script>
<style lang="scss">
.brisk-main {
  padding: 20px;
  background: white;
  border-radius: 10px;
}
.brisk-search-box {
  background: white;
}
/**修复table悬浮右侧操作栏后偏差不出现边框问题 */
.el-table-fixed-column--right {
  right: unset !important;
}
</style>