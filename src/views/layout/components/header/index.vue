<template>
  <div class="ym-header">
    <div class="header-left">
      <div class="header-tool" @click="outSide">
        <i class="el-icon-s-fold" style="font-size: 22px"></i>
      </div>
      <div class="header-tab">
        <!-- 准备用来放置tab标签页 -->
      </div>
    </div>
    <div class="header-right">
      <i class="el-icon-full-screen" @click="toScreenfull"></i>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ language == "en" ? "English" : "中文" }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="setLang('zh-cn')">中文</el-dropdown-item>
            <el-dropdown-item @click="setLang('en')">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userinfo&&userinfo.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>{{
              $t("userDropdown.userinfo")
            }}</el-dropdown-item>
            <el-dropdown-item @click="loginOut()">{{
              $t("userDropdown.loginout")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import screenfull from "screenfull";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      language: (state) => state.app.language,
      userinfo: (state) => state.user.userinfo,
    }),
  },
  created(){
    console.log(this.userinfo)
  },
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
    flex: 1;
  }
}
</style>