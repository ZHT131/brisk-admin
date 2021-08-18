<template>
  <el-drawer :size="300" :model-value="showSet" direction="rtl" :withHeader="false" destroy-on-close>
    <div class="drawer_title">
      <span>{{$t('app.setting_title')}}</span>
      <i class="el-icon-close" @click="handleClose"></i>
    </div>
    <div class="layoutbox">
      <span>系统皮肤</span>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="aside_white_nav_white">
            <div class="aside"></div>
            <div class="right">
              <div class="nav"></div>
              <div class="cont"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="aside_black_nav_white">
            <div class="aside"></div>
            <div class="right">
              <div class="nav"></div>
              <div class="cont"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="aside_black_nav_black">
            <div class="aside"></div>
            <div class="right">
              <div class="nav"></div>
              <div class="cont"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="aside_purple_nav_white">
            <div class="aside"></div>
            <div class="right">
              <div class="nav"></div>
              <div class="cont"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      showSet: (state) => state.app.showSet,
    }),
  },
  methods: {
    handleClose() {
      this.$store.dispatch("app/setShowSet", !this.showSet);
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer_title {
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
}
.layoutbox {
  padding: 20px;
  .el-col {
    margin-top: 20px;
  }
  .aside_white_nav_white {
    display: flex;
    flex-direction: row;
    box-shadow: 0px 0px 10px #666666;
    width: 100%;
    .aside {
      width: 20px;
      background-color: #ffffff;
      height: 100px;
      border-right: 1px solid #e6e6e6;
    }
    .right {
      display: flex;
      flex-direction: column;
      width: 100%;
      .nav {
        height: 10px;
        background-color: #ffffff;
        border-bottom: 1px solid #e6e6e6;
      }
      .cont {
        height: 89px;
        background-color: #ffffff;
      }
    }
  }
  .aside_black_nav_white {
    display: flex;
    flex-direction: row;
    box-shadow: 0px 0px 10px #666666;
    width: 100%;
    .aside {
      width: 20px;
      background-color: #222d32;
      height: 100px;
    }
    .right {
      display: flex;
      flex-direction: column;
      width: 100%;
      .nav {
        height: 10px;
        background-color: #ffffff;
        border-bottom: 1px solid #e6e6e6;
      }
      .cont {
        height: 89px;
        background-color: #ffffff;
      }
    }
  }
  .aside_black_nav_black {
    display: flex;
    flex-direction: row;
    box-shadow: 0px 0px 10px #666666;
    width: 100%;
    .aside {
      width: 20px;
      background-color: #222d32;
      height: 100px;
    }
    .right {
      display: flex;
      flex-direction: column;
      width: 100%;
      .nav {
        height: 10px;
        background-color: #222d32;
        border-bottom: 1px solid #e6e6e6;
      }
      .cont {
        height: 89px;
        background-color: #ffffff;
      }
    }
  }
  .aside_purple_nav_white {
    display: flex;
    flex-direction: row;
    box-shadow: 0px 0px 10px #666666;
    width: 100%;
    .aside {
      width: 20px;
      background-color: #605ca8;
      height: 100px;
    }
    .right {
      display: flex;
      flex-direction: column;
      width: 100%;
      .nav {
        height: 10px;
        background-color: #ffffff;
        border-bottom: 1px solid #e6e6e6;
      }
      .cont {
        height: 89px;
        background-color: #ffffff;
      }
    }
  }
}
</style>