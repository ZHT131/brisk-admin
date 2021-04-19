<template>
  <div class="ym-body">
    <el-container style="height: 100%">
      <el-aside
        :width="isCollapse ? 'auto' : '200px'"
        style="height: 100%; overflow: hidden"
      >
        <div class="logo">
          <span v-if="!isCollapse">ymadmin</span>
          <span v-else>YM</span>
        </div>
        <el-scrollbar>
          <el-menu
            default-active="1-4-1"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template #title>
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template #title>分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template #title>选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
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
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header>
          <div class="ym-header">
            <div class="header-left">
              <div class="header-tool" @click="outSide">
                <i class="el-icon-s-fold" style="font-size: 22px"></i>
              </div>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }"
                  >首页</el-breadcrumb-item
                >
                <el-breadcrumb-item
                  ><a href="/">活动管理</a></el-breadcrumb-item
                >
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="header-right">
              <el-dropdown>
                <span class="el-dropdown-link">
                  中文<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>中文</el-dropdown-item>
                    <el-dropdown-item>english</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-dropdown>
                <span class="el-dropdown-link">
                  admin<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>个人资料</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    ...mapState({
      device: (state) => state.app.device,
    }),
  },
  created() {
    console.log(this.device);
  },
  methods: {
    outSide() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="scss" scoped>
.ym-body {
  position: relative;
  height: 100%;
  width: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-menu-vertical {
  text-align: left;
  width: 200px;
}
.el-aside {
  overflow-x: hidden !important;
}
.ym-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .el-breadcrumb {
    font-size: 12px;
  }
  .header-tool {
    padding-right: 20px;
  }
  .header-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
  }
  .header-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
  }
}
.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
}
</style>
<style>
.is-horizontal {
  display: none !important;
}
.el-dropdown {
  font-size: 12px;
  margin-left: 20px;
}
</style>