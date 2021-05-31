<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import ResizeMixin from "../../layout/mixin/ResizeHandler";
import { mapState } from "vuex";
export default {
  mixins: [ResizeMixin],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      device: (state) => state.app.device,
    }),
  },
  created() {
    console.log(this.device);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
