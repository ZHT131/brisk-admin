<template>
  <div>
    <el-menu-item
      v-if="(!item.children || item.children.length <= 1) && !item.alwaysShow"
      :index="getPath()"
    >
      <i :class="item.meta.icon"></i>
      <template #title>{{ $t(item.name + "." + item.meta.title) }}</template>
    </el-menu-item>
    <el-submenu v-else :index="item.path">
      <template #title>
        <i :class="item.meta.icon"></i>
        <span>{{ $t(item.name + "." + item.meta.title) }}</span>
      </template>
      <menuItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :parentPath="getPath()"
      />
    </el-submenu>
  </div>
</template>

<script>
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
  methods: {
    getPath() {
      if (this.parentPath) {
        return this.parentPath + "/" + this.item.path;
      }
      return this.item.path;
    },
  },
};
</script>

<style>
</style>