<template>
  <div class="ym-body">
    <el-row
      type="flex"
      class="row-bg"
      justify="center"
      align="middle"
      style="height: 100%"
    >
      <el-col :xs="18" :sm="18" :md="6">
        <div class="login-box">
          <el-image class="login-bg" src="/src/assets/loginbg.png"></el-image>
          <div class="login">
            <el-form
              class="login-form"
              ref="form"
              :model="form"
              label-width="80px"
              label-position="left"
            >
              <el-form-item label-width="50px">
                <template #label>
                  <div class="loginIcon">
                    <i class="el-icon-user"></i>
                  </div>
                </template>
                <el-input
                  v-model="form.username"
                  :placeholder="$t('login.usernamePlaceholder')"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="50px">
                <template #label>
                  <div class="loginIcon">
                    <i class="el-icon-lock"></i>
                  </div>
                </template>
                <el-input
                  v-model="form.password"
                  :placeholder="$t('login.passwordPlaceholder')"
                ></el-input>
              </el-form-item>
              <el-button class="loginbtn" type="primary" @click="onSubmit">{{
                $t("login.loginBtn")
              }}</el-button>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from "@/api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  created() {
     
  },
  methods: {
    onSubmit() {
      login(this.form).then((res) => {
        console.log(res);
        if (res.code == 1) {
          this.$store.dispatch("user/loginSet", res.data);
          this.$router.push("dashboard");
        }
      });
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
.login-box {
  -webkit-box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 30px rgb(0 0 0 / 10%);
  .login-bg {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .login {
    display: flex;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    .login-form {
      width: 100%;
      .loginIcon {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border: 1px solid #e6e6e6;
        width: 40px;
        height: 39px;
        border-radius: 4px;
      }
      .loginbtn {
        width: 100%;
      }
    }
  }
}
</style>