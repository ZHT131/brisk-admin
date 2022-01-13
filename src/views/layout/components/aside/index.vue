<template>
  <el-drawer custom-class="menudrawer" :model-value="sidebar" direction="ltr" :size="220" :show-close="false" :withHeader="false" :before-close="handleClose" destroy-on-close v-if="device == 'mobile'">
    <el-aside :width="sidebar ? 'auto' : '220px'" class="brisk-el-aside-mobile">
      <div class="brisk-logo" :style="{'background':skinChoose.logoBackground}">
        <span :style="{'color':skinChoose.logoColor}">{{ appName }}</span>
      </div>
      <el-scrollbar class="brisk-menu-box" :style="{'background':skinChoose.asideBackground}">
        <MenuLayout />
      </el-scrollbar>
    </el-aside>
  </el-drawer>
  <el-aside :width="sidebar ? 'auto' : '220px'" class="brisk-el-aside-pc" v-else>
    <div :style="{'background':skinChoose.navBackground}">
      <div class="brisk-logo" :style="{'background':skinChoose.logoBackground}">
        <span v-if="!sidebar" :style="{'color':skinChoose.logoColor}">{{ appName }}</span>
        <span v-else :style="{'color':skinChoose.logoColor}">{{ logogram }}</span>
      </div>
    </div>
    <el-scrollbar class="brisk-menu-box" :style="{'background':skinChoose.asideBackground}">
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
<style lang="scss">
.el-drawer__body {
  padding: 0;
}
.menudrawer{
  background-color:transparent !important;
  // aside圆角效果
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
<style lang="scss" scoped>
.el-aside {
  overflow-x: hidden !important;
}
.brisk-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  // aside圆角效果
  border-top-right-radius: 20px;
}
.brisk-el-aside-mobile {
  height: calc(100vh);
  overflow: hidden;
}
.brisk-el-aside-pc {
  height: calc(100vh);
  overflow: hidden;
  background-color: #e9eef3;
}
.brisk-menu-box {
  height: calc(100vh - 60px);
  // aside圆角效果
  border-bottom-right-radius: 20px;
}
</style>