<template>
  <el-menu
    default-active="0"
    :collapse="device == 'desktop' ? sidebar : false"
  >
    <el-menu-item index="0">
      <i class="el-icon-menu"></i>
      <template #title>控制台</template>
    </el-menu-item>
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <template #title>导航二</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <template #title>导航三</template>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <template #title>导航四</template>
    </el-menu-item>
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
    }),
  },
};
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  text-align: left;
  width: 200px;
}
</style>