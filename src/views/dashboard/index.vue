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
      <el-col :xs="24" :sm="24" :md="14">
        <div id="container1"></div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10">
        <div id="container2"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ResizeMixin from "../../layout/mixin/ResizeHandler";
import { mapState } from "vuex";
import { Chart, registerShape } from '@antv/g2';

export default {
  mixins: [ResizeMixin],
  data () {
    return {};
  },
  computed: {
    ...mapState({
      device: (state) => state.app.device,
    }),
  },
  created () {
    // console.log(this.device);
  },
  mounted () {
    const e = document.createEvent('Event')
    e.initEvent('resize', true, true)
    window.dispatchEvent(e)
    this.$nextTick(() => {
      this.zChart();
      this.bChart();
    })
  },
  methods: {
    zChart () {
      const data = [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 },
      ];
      const chart = new Chart({
        container: 'container1',
        autoFit: true,
        height: 300,
      });

      chart.data(data);
      chart.scale('sales', {
        nice: true,
      });

      chart.tooltip({
        showMarkers: false
      });
      chart.interaction('active-region');

      chart.interval().position('year*sales');

      chart.render();
    },
    bChart () {
      const data = [
        { type: '分类一', value: 20 },
        { type: '分类二', value: 18 },
        { type: '分类三', value: 32 },
        { type: '分类四', value: 15 },
        { type: 'Other', value: 15 },
      ];

      // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
      const sliceNumber = 0.01;

      // 自定义 other 的图形，增加两条线
      registerShape('interval', 'slice-shape', {
        draw (cfg, container) {
          const points = cfg.points;
          let path = [];
          path.push(['M', points[0].x, points[0].y]);
          path.push(['L', points[1].x, points[1].y - sliceNumber]);
          path.push(['L', points[2].x, points[2].y - sliceNumber]);
          path.push(['L', points[3].x, points[3].y]);
          path.push('Z');
          path = this.parsePath(path);
          return container.addShape('path', {
            attrs: {
              fill: cfg.color,
              path,
            },
          });
        },
      });

      const chart = new Chart({
        container: 'container2',
        autoFit: true,
        height: 300,
      });

      chart.data(data);
      chart.coordinate('theta', {
        radius: 0.75,
        innerRadius: 0.6,
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      chart
        .interval()
        .adjust('stack')
        .position('value')
        .color('type')
        .shape('slice-shape');

      chart.render();
    }
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
</style>
