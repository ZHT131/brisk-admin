<template>
  <el-tabs :model-value="tabActive" type="card" closable @tab-remove="tabRemove" @tab-click="tabClick">
    <el-tab-pane :key="item.fullPath" v-for="(item) in tabsList" :name="item.fullPath">
      <template #label>
        <i class="el-icon-date"></i>
        <span style="margin-left:3px">{{ $t(item.name + "." + item.meta.title) }}</span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tabActive: (state) => state.app.tabActive,
      tabsList: (state) => state.app.tabsList,
    }),
  },
  watch: {
    $route(to, from) {
      //这里可以加你监听到路由改变时要触发的方法
      this.$store.dispatch("app/addTabs", {
        fullPath: to.fullPath,
        name: to.name,
        meta: to.meta,
      });
    },
  },
  created() {
    this.$store.dispatch("app/initTabs");
  },
  methods: {
    tabClick(e) {
      this.$store.dispatch("app/clickTab", e.index);
    },
    tabRemove(e) {
      this.$store.dispatch("app/closeCurrentTab", e);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>