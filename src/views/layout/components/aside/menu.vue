<template>
  <el-menu
    :default-active="activeRoute"
    router
    :collapse="device == 'desktop' ? sidebar : false"
    @select="selectMenu"
  >
    <template v-for="item in routes" :key="item.path">
      <el-menu-item
        v-if="item.children.length <= 1 && !item.alwaysShow"
        :index="item.path"
      >
        <i :class="item.meta.icon"></i>
        <template #title>{{ $t(item.name + "." + item.meta.title) }}</template>
      </el-menu-item>
      <el-submenu v-else :index="item.path">
        <template #title>
          <i :class="item.meta.icon"></i>
          <span>{{ $t(item.name + "." + item.meta.title) }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="child in item.children"
            :key="child.path"
            :index="item.path + '/' + child.path"
            >{{ $t(child.name + "." + child.meta.title) }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
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