<template>
  <div class="tabs-box">
    <div class="tabs-left">
      <el-tabs :model-value="tabActive" type="card" :closable="tabsList.length>1?true:false" @tab-remove="tabRemove" @tab-click="tabClick">
        <el-tab-pane :key="item.fullPath" v-for="(item) in tabsList" :name="item.fullPath">
          <template #label>
            <div class="tab-label">
              <i :class="item.meta.icon"></i>
              <span style="margin-left:5px">{{ $t(item.name + "." + item.meta.title) }}</span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dropdown placement="bottom-start">
      <div class="tabs-menu">
        <i class="ri-apps-fill" style="font-size:20px"></i>
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
      keepAliveRoutes: (state) => state.user.keepAliveRoutes,
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
      let keeps = this.keepAliveRoutes;
      const tabindex = this.tabsList.findIndex((item) => item.fullPath == e);
      let routeName = this.tabsList[tabindex].name;
      const keepindex = keeps.findIndex((item) => item == routeName);
      keeps.splice(keepindex, 1);
      this.$store.dispatch("user/setKeepAlive", keeps);
      if (e == this.$route.fullPath) {
        this.$store.dispatch("app/closeCurrentTab", {
          fullPath: e,
          type: "current",
        });
      } else {
        this.$store.dispatch("app/closeCurrentTab", {
          fullPath: e,
          type: "other",
        });
      }
    },
    closeCurrent() {
      if (this.tabsList.length == 1) {
        return ElMessage("最少保留一个标签哦！");
      }
      let keeps = this.keepAliveRoutes;
      const keepindex = keeps.findIndex((item) => item == this.$route.name);
      keeps.splice(keepindex, 1);
      this.$store.dispatch("user/setKeepAlive", keeps);
      this.$store.dispatch("app/closeCurrentTab", {
        fullPath: this.$route.fullPath,
        type: "current",
      });
    },
    closeOther() {
      this.$store.dispatch("user/setKeepAlive", [this.$route.name]);
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
  border-bottom: 1px solid #e6e6e6;
  .tabs-left {
    flex: 1;
    overflow: hidden;
    .tab-label {
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      font-size: 13px;
    }
  }
  .tabs-menu {
    padding: 8px 20px 8px 8px;
  }
}
</style>
<style lang="scss">
.tabs-left {
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
    -webkit-mask-image: url("~/assets/images/tabs.png");
    -webkit-mask-size: 100% 100%;
    outline: none;
    background: #e6e6e6;
  }
}
</style>