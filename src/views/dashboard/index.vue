<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="6" style="margin-bottom: 10px">
        <div class="brisk-card">
          <div class="title">{{ $t("dashboard.totalUserNumber") }}</div>
          <div class="number">6666</div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" style="margin-bottom: 10px">
        <div class="brisk-card">
          <div class="title">{{ $t("dashboard.totalVisits") }}</div>
          <div class="number">6666</div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" style="margin-bottom: 10px">
        <div class="brisk-card">
          <div class="title">{{ $t("dashboard.totalOrderNumber") }}</div>
          <div class="number">6666</div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" style="margin-bottom: 10px">
        <div class="brisk-card">
          <div class="title">{{ $t("dashboard.totalSalesAmount") }}</div>
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
import ResizeMixin from "../layout/mixin/ResizeHandler";
import { mapState } from "vuex";
import { Chart, registerShape } from "@antv/g2";

export default {
  name:"dashboard",
  mixins: [ResizeMixin],
  data() {
    return {
      chart: "",
      chartB: "",
    };
  },
  computed: {
    ...mapState({
      device: (state) => state.app.device,
    }),
  },

  watch: {
    "$i18n.locale"(newValue) {
      const data = [
        { name: this.$t("dashboard.sales"), month: "1", num: 18.9 },
        { name: this.$t("dashboard.sales"), month: "2", num: 28.8 },
        { name: this.$t("dashboard.sales"), month: "3", num: 39.3 },
        { name: this.$t("dashboard.sales"), month: "4", num: 81.4 },
        { name: this.$t("dashboard.sales"), month: "5", num: 47 },
        { name: this.$t("dashboard.sales"), month: "6", num: 20.3 },
        { name: this.$t("dashboard.sales"), month: "7", num: 24 },
        { name: this.$t("dashboard.sales"), month: "8", num: 35.6 },
        { name: this.$t("dashboard.orderNumber"), month: "1", num: 12.4 },
        { name: this.$t("dashboard.orderNumber"), month: "2", num: 23.2 },
        { name: this.$t("dashboard.orderNumber"), month: "3", num: 34.5 },
        { name: this.$t("dashboard.orderNumber"), month: "4", num: 99.7 },
        { name: this.$t("dashboard.orderNumber"), month: "5", num: 52.6 },
        { name: this.$t("dashboard.orderNumber"), month: "6", num: 35.5 },
        { name: this.$t("dashboard.orderNumber"), month: "7", num: 37.4 },
        { name: this.$t("dashboard.orderNumber"), month: "8", num: 42.4 },
      ];
      this.chart.changeData(data);
      const data1 = [
        { type: this.$t("dashboard.wxPay"), value: 20 },
        { type: this.$t("dashboard.aliPay"), value: 18 },
        { type: this.$t("dashboard.walletPay"), value: 32 },
        { type: this.$t("dashboard.otherPay"), value: 15 },
      ];
      this.chartB.changeData(data1);
    },
  },
  mounted() {
    const e = new Event("resize", { "bubbles": true, "cancelable": true });
    window.dispatchEvent(e);
    this.$nextTick(() => {
      this.zChart();
      this.bChart();
    });
  },
  beforeUnmount() {
    this.chart.destroy();
    this.chartB.destroy();
  },
  methods: {
    zChart() {
      const data = [
        { name: this.$t("dashboard.sales"), month: "1", num: 18.9 },
        { name: this.$t("dashboard.sales"), month: "2", num: 28.8 },
        { name: this.$t("dashboard.sales"), month: "3", num: 39.3 },
        { name: this.$t("dashboard.sales"), month: "4", num: 81.4 },
        { name: this.$t("dashboard.sales"), month: "5", num: 47 },
        { name: this.$t("dashboard.sales"), month: "6", num: 20.3 },
        { name: this.$t("dashboard.sales"), month: "7", num: 24 },
        { name: this.$t("dashboard.sales"), month: "8", num: 35.6 },
        { name: this.$t("dashboard.orderNumber"), month: "1", num: 12.4 },
        { name: this.$t("dashboard.orderNumber"), month: "2", num: 23.2 },
        { name: this.$t("dashboard.orderNumber"), month: "3", num: 34.5 },
        { name: this.$t("dashboard.orderNumber"), month: "4", num: 99.7 },
        { name: this.$t("dashboard.orderNumber"), month: "5", num: 52.6 },
        { name: this.$t("dashboard.orderNumber"), month: "6", num: 35.5 },
        { name: this.$t("dashboard.orderNumber"), month: "7", num: 37.4 },
        { name: this.$t("dashboard.orderNumber"), month: "8", num: 42.4 },
      ];

      this.chart = new Chart({
        container: "container1",
        autoFit: true,
        height: 450,
      });

      this.chart.data(data);
      this.chart.scale("month", {
        formatter: (val) => `${val}月`,
      });
      this.chart.scale("num", {
        nice: true,
      });
      this.chart.tooltip({
        showMarkers: false,
        shared: true,
      });

      this.chart
        .interval()
        .position("month*num")
        .color("name")
        .adjust([
          {
            type: "dodge",
            marginRatio: 0,
          },
        ]);

      this.chart.interaction("active-region");

      this.chart.render();
    },
    bChart() {
      const data = [
        { type: this.$t("dashboard.wxPay"), value: 20 },
        { type: this.$t("dashboard.aliPay"), value: 18 },
        { type: this.$t("dashboard.walletPay"), value: 32 },
        { type: this.$t("dashboard.otherPay"), value: 15 },
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

      this.chartB = new Chart({
        container: "container2",
        autoFit: true,
        height: 450,
      });

      this.chartB.data(data);
      this.chartB.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.6,
      });
      this.chartB.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      this.chartB
        .interval()
        .adjust("stack")
        .position("value")
        .color("type")
        .shape("slice-shape");

      this.chartB.render();
    },
  },
};
</script>

<style lang="scss" scoped>
.brisk-card {
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
    color: var(--el-color-primary);
    margin-top: 20px;
  }
}
.canvasbox {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
}
</style>
