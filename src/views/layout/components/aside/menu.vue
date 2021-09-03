<template>
  <el-menu :default-active="activeRoute" router :collapse="device == 'desktop' ? sidebar : false" @select="selectMenu" :background-color="skinChoose.asideBackground" :text-color="skinChoose.asideColor" :active-text-color="skinChoose.activeColor">
    <template v-for="item in routes" :key="item.path">
      <menuItem v-if="!item.hidden" :item="item" />
    </template>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
import menuItem from "./menuItem.vue";
export default {
  components: {
    menuItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      routes: (state) => state.user.routes,
      activeRoute: (state) => state.user.activeRoute,
      skinChoose: (state) => state.settings.skinChoose,
    }),
  },
  created() {},
  methods: {
    selectMenu(index, path) {
      this.$store.dispatch("user/activeRoute", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  text-align: left;
  width: 220px;
}
.el-menu {
  border: none !important;
}
</style>