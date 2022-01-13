<template>
  <div class="tabs-box">
    <div class="tabs-left">
      <el-tabs :model-value="tabActive" type="card" :closable="tabsList.length>1?true:false" @tab-remove="tabRemove" @tab-click="tabClick">
        <el-tab-pane :key="item.fullPath" v-for="(item) in tabsList" :name="item.fullPath">
          <template #label>
            <div class="tab-label">
              <i :class="item.meta.icon" style="vertical-align:middle;"></i>
              <span style="margin-left:5px">{{ $t(item.name + "." + item.meta.title) }}</span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dropdown placement="bottom-start">
      <div class="tabs-menu">
        <i class="ri-apps-fill" style="vertical-align:middle;"></i>
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
  border-bottom: 1px solid #f5f5f5;
  padding: 0 20px;
  .tabs-left {
    flex: 1;
    overflow: hidden;
    background: #f6f6f6;
    .tab-label {
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
      margin-top: -2px;
    }
  }
  .tabs-menu {
    height: 40px;
    display: inline-block;
    vertical-align: middle;
    line-height: 40px;
    font-size: 20px;
    margin-left: 10px;
  }
}
:deep {
  .el-tabs--card > .el-tabs__header {
    border: none;
    margin: 0;
    .el-tabs__nav {
      padding: 5px 0;
      border: none !important;
    }
    .el-tabs__nav-prev {
      height: 30px;
      line-height: 30px;
      background: white;
      padding: 5px 0;
      .el-icon {
        font-size: 20px;
        vertical-align: middle;
      }
    }
    .el-tabs__nav-next {
      height: 30px;
      line-height: 30px;
      background: white;
      padding: 5px 0;
      .el-icon {
        font-size: 20px;
        vertical-align: middle;
      }
    }
    .el-tabs__nav-scroll {
      height: 40px;
    }
    .el-tabs__item {
      height: 30px;
      line-height: 30px;
      border-radius: 3px;
      font-size: 12px;
      background-color: var(--el-color-white);
      padding: 0 10px;
      margin-left: 5px;
      margin-right: 5px;
    }
    .el-tabs__item.is-active {
      color: var(--el-color-white);
      border: 1px solid var(--el-color-primary);
      background-color: var(--el-color-primary);
    }
    .el-tabs__item:hover {
      border: 1px solid var(--el-color-primary);
    }
  }
}
</style>