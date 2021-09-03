<template>
  <el-menu-item v-if="(!item.children || item.children.length <= 1) && !item.alwaysShow" :index="getPath()">
    <i :class="item.meta.icon" :style="{'color':activeRoute==getPath()?skinChoose.activeColor:skinChoose.asideColor}"></i>
    <template #title>{{ $t(item.name + "." + item.meta.title) }}</template>
  </el-menu-item>
  <el-submenu v-else :index="item.path">
    <template #title>
      <i :class="item.meta.icon" :style="{'color':activeRoute==getPath()?skinChoose.activeColor:skinChoose.asideColor}"></i>
      <span>{{ $t(item.name + "." + item.meta.title) }}</span>
    </template>
    <menuItem v-for="child in item.children" :key="child.path" :item="child" :parentPath="getPath()" />
  </el-submenu>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "menuItem",
  props: {
    item: {
      type: Object,
      default: {},
    },
    parentPath: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState({
      activeRoute: (state) => state.user.activeRoute,
      skinChoose: (state) => state.settings.skinChoose,
    }),
  },
  methods: {
    getPath() {
      if (!this.item.alwaysShow && this.item.redirect) {
        return this.item.redirect;
      } else {
        if (this.parentPath) {
          return this.parentPath + "/" + this.item.path;
        }
        return this.item.path;
      }
    },
  },
};
</script>

<style>
</style>