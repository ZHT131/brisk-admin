<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="6" style="margin-bottom: 10px">
        <div class="ym-card">
          <div class="title">总用户数</div>
          <div class="number">6666</div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" style="margin-bottom: 10px">
        <div class="ym-card">
          <div class="title">总访问量</div>
          <div class="number">6666</div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" style="margin-bottom: 10px">
        <div class="ym-card">
          <div class="title">总订单数</div>
          <div class="number">6666</div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" style="margin-bottom: 10px">
        <div class="ym-card">
          <div class="title">总销售金额</div>
          <div class="number">6666</div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="14" style="margin-top: 10px">
        <div class="canvasbox">
          <div id="container1"></div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" style="margin-top: 10px">
        <div class="canvasbox">
          <div id="container2"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ResizeMixin from "../../layout/mixin/ResizeHandler";
import { mapState } from "vuex";
import { Chart, registerShape } from "@antv/g2";

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
    // console.log(this.device);
  },
  mounted() {
    const e = document.createEvent("Event");
    e.initEvent("resize", true, true);
    window.dispatchEvent(e);
    this.$nextTick(() => {
      this.zChart();
      this.bChart();
    });
  },
  methods: {
    zChart() {
      const data = [
        { name: "销售额（元）", month: "1", num: 18.9 },
        { name: "销售额（元）", month: "2", num: 28.8 },
        { name: "销售额（元）", month: "3", num: 39.3 },
        { name: "销售额（元）", month: "4", num: 81.4 },
        { name: "销售额（元）", month: "5", num: 47 },
        { name: "销售额（元）", month: "6", num: 20.3 },
        { name: "销售额（元）", month: "7", num: 24 },
        { name: "销售额（元）", month: "8", num: 35.6 },
        { name: "订单数（笔）", month: "1", num: 12.4 },
        { name: "订单数（笔）", month: "2", num: 23.2 },
        { name: "订单数（笔）", month: "3", num: 34.5 },
        { name: "订单数（笔）", month: "4", num: 99.7 },
        { name: "订单数（笔）", month: "5", num: 52.6 },
        { name: "订单数（笔）", month: "6", num: 35.5 },
        { name: "订单数（笔）", month: "7", num: 37.4 },
        { name: "订单数（笔）", month: "8", num: 42.4 },
      ];

      const chart = new Chart({
        container: "container1",
        autoFit: true,
        height: 450,
      });

      chart.data(data);
      chart.scale("month", {
        formatter: (val) => `${val}月`,
      });
      chart.scale("num", {
        nice: true,
      });
      chart.tooltip({
        showMarkers: false,
        shared: true,
      });

      chart
        .interval()
        .position("month*num")
        .color("name")
        .adjust([
          {
            type: "dodge",
            marginRatio: 0,
          },
        ]);

      chart.interaction("active-region");

      chart.render();
    },
    bChart() {
      const data = [
        { type: "微信支付", value: 20 },
        { type: "支付宝支付", value: 18 },
        { type: "钱包支付", value: 32 },
        { type: "其他", value: 15 },
      ];

      // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
      const sliceNumber = 0.01;

      // 自定义 other 的图形，增加两条线
      registerShape("interval", "slice-shape", {
        draw(cfg, container) {
          const points = cfg.points;
          let path = [];
          path.push(["M", points[0].x, points[0].y]);
          path.push(["L", points[1].x, points[1].y - sliceNumber]);
          path.push(["L", points[2].x, points[2].y - sliceNumber]);
          path.push(["L", points[3].x, points[3].y]);
          path.push("Z");
          path = this.parsePath(path);
          return container.addShape("path", {
            attrs: {
              fill: cfg.color,
              path,
            },
          });
        },
      });

      const chart = new Chart({
        container: "container2",
        autoFit: true,
        height: 450,
      });

      chart.data(data);
      chart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.6,
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      chart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type")
        .shape("slice-shape");

      chart.render();
    },
  },
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
.canvasbox {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
}
</style>
