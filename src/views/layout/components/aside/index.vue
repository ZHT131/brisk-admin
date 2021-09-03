<template>
  <el-drawer :model-value="sidebar" direction="ltr" :size="220" :show-close="false" :withHeader="false" :before-close="handleClose" destroy-on-close v-if="device == 'mobile'">
    <el-aside :width="sidebar ? 'auto' : '220px'" style="height: 100%; overflow: hidden;" :style="{'background':skinChoose.asideBackground}">
      <div class="logo">
        <span :style="{'color':skinChoose.asideColor}">{{ appName }}</span>
      </div>
      <el-scrollbar style="height:calc(100% - 60px)">
        <MenuLayout />
      </el-scrollbar>
    </el-aside>
  </el-drawer>
  <el-aside :width="sidebar ? 'auto' : '220px'" style="height: 100%; overflow: hidden;" :style="{'background':skinChoose.asideBackground}" v-else>
    <div class="logo">
      <span v-if="!sidebar" :style="{'color':skinChoose.asideColor}">{{ appName }}</span>
      <span v-else :style="{'color':skinChoose.asideColor}">{{ logogram }}</span>
    </div>
    <el-scrollbar style="height:calc(100% - 60px)">
      <MenuLayout />
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { mapState } from "vuex";
import MenuLayout from "./menu.vue";
export default {
  components: { MenuLayout },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      appName: (state) => state.settings.appName,
      logogram: (state) => state.settings.logogram,
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      skinChoose: (state) => state.settings.skinChoose,
    }),
  },
  methods: {
    handleClose() {
      this.$store.dispatch("app/toggleSidebar", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  overflow-x: hidden !important;
}
.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
}
</style>