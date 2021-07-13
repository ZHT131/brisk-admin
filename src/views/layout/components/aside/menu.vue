<template>
  <el-menu
    :default-active="activeRoute"
    router
    :collapse="device == 'desktop' ? sidebar : false"
    @select="selectMenu"
  >
    <menuItem v-for="item in routes" :key="item.path" :item="item" />
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
    }),
  },
  created() {
    // console.log(this.sidebar);
    // console.log(this.device);
    // console.log(this.$store.state.user.routes);
  },
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
</style>