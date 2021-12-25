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
.ym-main {
  padding: 20px;
  background: white;
  border-radius: 10px;
}
.ym-search-box {
  background: white;
}
.bri-field-cell {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f8f8f8;
  font-size: 14px;
  .bri-field-title {
    flex: 1;
  }
  .bri-field-content {
    flex: 3;
  }
}
.bri-bg-f8f8f8 {
  background-color: #f8f8f8;
}
.bri-bg-white {
  background-color: white;
}
.ym-m-t-20 {
  margin-top: 20px;
}
.ym-p-20 {
  padding: 20px;
}
.ym-flex-row-sb {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.ym-border {
  border: 1px solid #e6e6e6;
}
.ym-iconbox {
  border: 1px solid #e6e6e6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: 22px;
  border-radius: 5px;
  cursor: pointer;
}
.ym-flex-row {
  display: flex;
  flex-direction: row;
}
.ym-flex-row-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>