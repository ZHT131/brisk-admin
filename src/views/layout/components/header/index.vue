<template>
  <div class="brisk-header">
    <div class="brisk-header-left">
      <div class="brisk-header-tool" @click="outSide">
        <i class="ri-indent-decrease" style="font-size: 18px" :style="{'color':skinChoose.navColor}"></i>
      </div>
      <div class="brisk-header-refresh" @click="refRoute">
        <i class="ri-refresh-line" style="font-size: 18px" :style="{'color':skinChoose.navColor}"></i>
      </div>
    </div>
    <div class="brisk-header-right">
      <div class="brisk-fullscreen">
        <i class="ri-fullscreen-fill" @click="toScreenfull" :style="{'color':skinChoose.navColor}"></i>
      </div>
      <el-dropdown style="margin-right: 20px;">
        <div class="brisk-userinfo">
          <span :style="{'color':skinChoose.navColor}">
            {{ language == "en" ? "English" : "中文" }}
          </span>
          <el-icon :color="skinChoose.navColor">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="setLang('zh-cn')">中文</el-dropdown-item>
            <el-dropdown-item @click="setLang('en')">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown>
        <div class="brisk-userinfo">
          <span :style="{'color':skinChoose.navColor}">
            {{userinfo&&userinfo.nickname}}
          </span>
          <el-icon :color="skinChoose.navColor">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toProfile()">{{
              $t("userDropdown.userinfo")
            }}</el-dropdown-item>
            <el-dropdown-item @click="loginOut()">{{
              $t("userDropdown.loginout")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="brisk-header-set" @click="changeShowSet">
        <i class="ri-settings-fill" :style="{'color':skinChoose.navColor}"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { ArrowDown } from "@element-plus/icons-vue";
import { mapState } from "vuex";
import screenfull from "screenfull";

export default {
  components: {
    ArrowDown
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      showSet: (state) => state.app.showSet,
      language: (state) => state.app.language,
      skinChoose: (state) => state.settings.skinChoose,
      userinfo: (state) =>
        typeof state.user.userinfo === "string"
          ? JSON.parse(state.user.userinfo)
          : state.user.userinfo,
    }),
  },
  created() { },
  methods: {
    outSide() {
      this.$store.dispatch("app/toggleSidebar", !this.sidebar);
    },
    loginOut() {
      this.$store.dispatch("user/loginOutSet");
      this.$router.replace("login");
    },
    setLang(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("app/setLanguage", lang);
    },
    toScreenfull() {
      screenfull.toggle();
    },
    toProfile() {
      this.$router.push("/profile");
    },
    refRoute() {
      this.$emit("refRoute");
    },
    changeShowSet() {
      this.$store.dispatch("app/setShowSet", !this.showSet);
    },
  },
};
</script>

<style lang="scss" scoped>
.brisk-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #f5f5f5;
  .brisk-header-tool {
    padding-right: 20px;
  }
  .brisk-header-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    margin-left: 20px;
  }
  .brisk-header-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
    .brisk-header-set {
      margin-left: 20px;
    }
    .brisk-fullscreen {
      margin-right: 20px;
    }
    .brisk-userinfo {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}
</style>