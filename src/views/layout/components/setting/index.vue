<template>
  <el-drawer :size="300" :model-value="showSet" direction="rtl" :withHeader="false" :before-close="handleClose" destroy-on-close>
    <div class="drawer_title">
      <span>系统设置</span>
      <el-icon @click="handleClose">
        <Close />
      </el-icon>
    </div>
    <div class="layoutbox">
      <div>系统主题色</div>
      <div class="colorbox">
        <el-color-picker style="margin-top:20px" v-model="systeamColor" @change="colorChange" />
      </div>
    </div>
    <div class="layoutbox">
      <span>系统皮肤</span>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="aside_white_nav_white" @click="changeSkin('aside_white_nav_white')">
            <div class="aside">
              <div class="logo"></div>
            </div>
            <div class="right">
              <div class="nav"></div>
              <div class="cont"></div>
            </div>
            <div class="skin-select" v-if="skinChoose.className=='aside_white_nav_white'">
              <el-icon>
                <Check />
              </el-icon>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="aside_black_nav_white" @click="changeSkin('aside_black_nav_white')">
            <div class="aside">
              <div class="logo"></div>
            </div>
            <div class="right">
              <div class="nav"></div>
              <div class="cont"></div>
            </div>
            <div class="skin-select" v-if="skinChoose.className=='aside_black_nav_white'">
              <el-icon>
                <Check />
              </el-icon>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="aside_white_nav_black" @click="changeSkin('aside_white_nav_black')">
            <div class="aside">
              <div class="logo"></div>
            </div>
            <div class="right">
              <div class="nav"></div>
              <div class="cont"></div>
            </div>
            <div class="skin-select" v-if="skinChoose.className=='aside_white_nav_black'">
              <el-icon>
                <Check />
              </el-icon>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="aside_purple_nav_white" @click="changeSkin('aside_purple_nav_white')">
            <div class="aside">
              <div class="logo"></div>
            </div>
            <div class="right">
              <div class="nav"></div>
              <div class="cont"></div>
            </div>
            <div class="skin-select" v-if="skinChoose.className=='aside_purple_nav_white'">
              <el-icon>
                <Check />
              </el-icon>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="aside_yellow_nav_white" @click="changeSkin('aside_yellow_nav_white')">
            <div class="aside">
              <div class="logo"></div>
            </div>
            <div class="right">
              <div class="nav"></div>
              <div class="cont"></div>
            </div>
            <div class="skin-select" v-if="skinChoose.className=='aside_yellow_nav_white'">
              <el-icon>
                <Check />
              </el-icon>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="aside_white_nav_yellow" @click="changeSkin('aside_white_nav_yellow')">
            <div class="aside">
              <div class="logo"></div>
            </div>
            <div class="right">
              <div class="nav"></div>
              <div class="cont"></div>
            </div>
            <div class="skin-select" v-if="skinChoose.className=='aside_white_nav_yellow'">
              <el-icon>
                <Check />
              </el-icon>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-drawer>
</template>
<script>
import { Check, Close } from "@element-plus/icons-vue";
import { mapState } from "vuex";
import skin from "~/settings/skin.js";
import { mix } from "~/utils/index.js";
export default {
  components: {
    Check,
    Close
  },
  data() {
    const el = document.documentElement;
    return {
      systeamColor: getComputedStyle(el).getPropertyValue(`--el-color-primary`),
    };
  },
  computed: {
    ...mapState({
      showSet: (state) => state.app.showSet,
      skinChoose: (state) => state.settings.skinChoose,
    }),
  },
  methods: {
    handleClose() {
      this.$store.dispatch("app/setShowSet", !this.showSet);
    },
    changeSkin(type) {
      this.$store.dispatch("settings/changeSetting", {
        key: "skinChoose",
        value: skin[type],
      });
    },
    colorChange(e) {
      // 变量前缀
      const pre = "--el-color-primary";
      // 白色混合色
      const mixWhite = "#ffffff";
      // 黑色混合色
      const mixBlack = "#000000";
      const el = document.documentElement;
      el.style.setProperty(pre, e);
      // 这里是覆盖原有颜色的核心代码
      for (let i = 1; i < 10; i += 1) {
        el.style.setProperty(`${pre}-light-${i}`, mix(e, mixWhite, i * 0.1));
      }
      el.style.setProperty("--el-color-primary-dark", mix(e, mixBlack, 0.1));
      this.$store.dispatch("settings/setColorPrimary", e);
    }
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
  .colorbox {
    position: relative;
  }
  .el-col {
    margin-top: 20px;
  }
  .skin-select {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: var(--el-color-primary);
  }
  .aside_white_nav_white {
    display: flex;
    flex-direction: row;
    box-shadow: 0px 0px 10px #666666;
    width: 100%;
    position: relative;
    .aside {
      width: 20px;
      background-color: #ffffff;
      height: 100px;
      border-right: 1px solid #e6e6e6;
      .logo {
        width: 20px;
        height: 10px;
        background-color: #ffffff;
      }
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
    position: relative;
    .aside {
      width: 20px;
      background-color: #222d32;
      height: 100px;
      .logo {
        width: 20px;
        height: 10px;
        background-color: #222d32;
      }
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
  .aside_white_nav_black {
    display: flex;
    flex-direction: row;
    box-shadow: 0px 0px 10px #666666;
    width: 100%;
    position: relative;
    .aside {
      width: 20px;
      background-color: #ffffff;
      height: 100px;
      .logo {
        width: 20px;
        height: 10px;
        background-color: #222d32;
      }
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
    position: relative;
    .aside {
      width: 20px;
      background-color: #605ca8;
      height: 100px;
      .logo {
        width: 20px;
        height: 10px;
        background-color: #605ca8;
      }
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
  .aside_yellow_nav_white {
    display: flex;
    flex-direction: row;
    box-shadow: 0px 0px 10px #666666;
    width: 100%;
    position: relative;
    .aside {
      width: 20px;
      background-color: #f39c12;
      height: 100px;
      .logo {
        width: 20px;
        height: 10px;
        background-color: #f39c12;
      }
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
  .aside_white_nav_yellow {
    display: flex;
    flex-direction: row;
    box-shadow: 0px 0px 10px #666666;
    width: 100%;
    position: relative;
    .aside {
      width: 20px;
      background-color: #ffffff;
      height: 100px;
      .logo {
        width: 20px;
        height: 10px;
        background-color: #f39c12;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      width: 100%;
      .nav {
        height: 10px;
        background-color: #f39c12;
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