<template>
  <div class="ym-header">
    <div class="header-left">
      <div class="header-tool" @click="outSide">
        <i class="ri-indent-decrease" style="font-size: 18px" :style="{'color':skinChoose.navColor}"></i>
      </div>
      <div class="header-refresh" @click="refRoute">
        <i class="ri-refresh-line" style="font-size: 18px" :style="{'color':skinChoose.navColor}"></i>
      </div>
    </div>
    <div class="header-right">
      <i class="ri-fullscreen-fill" @click="toScreenfull" :style="{'color':skinChoose.navColor}"></i>
      <el-dropdown>
        <span :style="{'color':skinChoose.navColor}">
          {{ language == "en" ? "English" : "中文" }}
          <el-icon :color="skinChoose.navColor"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="setLang('zh-cn')">中文</el-dropdown-item>
            <el-dropdown-item @click="setLang('en')">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown>
        <span :style="{'color':skinChoose.navColor}">
          {{userinfo&&userinfo.nickname}}
        </span>
        <el-icon :color="skinChoose.navColor"><arrow-down /></el-icon>
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
      <div class="header-set" @click="changeShowSet">
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
  components:{
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
  created() {},
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
.ym-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
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
    .header-set {
      margin-left: 20px;
    }
  }
}
</style>