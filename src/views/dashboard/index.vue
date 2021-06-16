<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="6" style="margin-bottom:10px">
        <div class="ym-card">
          <div class="title">统计名称</div>
          <div class="number">6666</div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" style="margin-bottom:10px">
        <div class="ym-card">
          <div class="title">统计名称</div>
          <div class="number">6666</div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" style="margin-bottom:10px">
        <div class="ym-card">
          <div class="title">统计名称</div>
          <div class="number">6666</div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" style="margin-bottom:10px">
        <div class="ym-card">
          <div class="title">统计名称</div>
          <div class="number">6666</div>
        </div>
      </el-col>
    </el-row>
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
.ym-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  .title {
    font-size: 14px;
    color: #666666;
  }
  .number {
    font-size: 28px;
    font-weight: 600;
    color: $--color-primary;
    margin-top: 20px;
  }
}
</style>
