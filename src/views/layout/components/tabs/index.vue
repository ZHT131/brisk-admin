<template>
  <div class="tabs-box">
    <div class="tabs-left">
      <el-tabs :model-value="tabActive" type="card" :closable="tabsList.length>1?true:false" @tab-remove="tabRemove" @tab-click="tabClick">
        <el-tab-pane :key="item.fullPath" v-for="(item) in tabsList" :name="item.fullPath">
          <template #label>
            <i class="el-icon-date"></i>
            <span style="margin-left:3px">{{ $t(item.name + "." + item.meta.title) }}</span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dropdown placement="bottom-start">
      <div class="tabs-menu">
        <i class="el-icon-menu" style="font-size:20px"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="closeCurrent" :disabled="tabsList.length>1?false:true">关闭当前</el-dropdown-item>
          <el-dropdown-item @click="closeOther" :disabled="tabsList.length>1?false:true">关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ElMessage } from "element-plus";

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
  created() {
    this.$store.dispatch("app/initTabs");
  },
  methods: {
    tabClick(e) {
      this.$store.dispatch("app/clickTab", e.index);
    },
    tabRemove(e) {
      if (e == this.$route.fullPath) {
        return this.$store.dispatch("app/closeCurrentTab", {
          fullPath: e,
          type: "current",
        });
      }
      return this.$store.dispatch("app/closeCurrentTab", {
        fullPath: e,
        type: "other",
      });
    },
    closeCurrent() {
      if (this.tabsList.length == 1) {
        return ElMessage("最少保留一个标签哦！");
      }
      this.$store.dispatch("app/closeCurrentTab", {
        fullPath: this.$route.fullPath,
        type: "current",
      });
    },
    closeOther() {
      this.$store.dispatch("app/closeOtherTabs", {
        fullPath: this.$route.fullPath,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  .tabs-left {
    flex: 1;
    overflow: hidden;
  }
  .tabs-menu {
    padding: 9px 20px 9px 9px;
  }
}
</style>
<style>
.el-tabs__nav,
.el-tabs__item {
  border: none !important;
}
.el-tabs__header {
  margin: 0;
  border: none !important;
}
.el-tabs__item.is-active,
.el-tabs__item:hover {
  -webkit-mask-image: url("@/assets/images/tabs.png");
  -webkit-mask-size: 100% 100%;
  outline: none;
  background: #e6e6e6;
}
</style>