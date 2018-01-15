<template>
  <div class="login-container">
    <div class="formBox">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">国安社区自营服务平台</h3>
      <h3 class="etitle">SERVICE MANAGEMENT SYSTEM</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="yonghuming" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="登录账号(手机号)" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="mima"></icon-svg>
        </span> 
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码(6-20位数字、字母组合)"></el-input>
      </el-form-item>
      <el-form-item class="loginitem">
        <el-button type="primary"  class="loginbtn"  :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class='tips'>
        <!-- <span style="margin-right:20px;">登录账号: 手机号</span>
        </span> 密码: 6-20w</span> -->
      </div>
    </el-form>
    </div>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";

export default {
  name: "login",
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("登录账号不能为空"));
      } else {
        if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
          callback(new Error("登录账号格式不正确！"));
        } else {
          callback();
        }
      }
    };
    var validatePassword = (rule, value, callback) => {
      console.log(value, "value");
      if (value == undefined) {
        callback();
      } else {
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)) {
          callback(new Error("密码必须由6-20位数字、字母两种组成"));
        } else {
          callback();
        }
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ required: true, message: "登录账号不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      loading: false
    };
  },
  methods: {
    handleLogin() {
      //登录
      //登录时先清空，防止非正常直接渲染
      localStorage.removeItem("name");
      localStorage.removeItem("dataScope");
      localStorage.removeItem("orgId");
      localStorage.removeItem("userId");
      localStorage.removeItem("menu");

      this.$refs.loginForm.validate(valid => {
        //console.log(valid)
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(res => {
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
$bg: #1F3264;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  @include relative;
  height: 100vh;

  background-image: url("../../../static/icon/bg.png");
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #1F3264 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #ffffff;
    height: 50px;
  }
  .el-input {
    display: inline-block;
    height: 50px;
    width: 85%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #265DC3;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-weight: normal;
    font-size: 28px;
    line-height: 40px;
    color: #ffffff;
    text-align: center;
    font-family: PingFangSC-Regular;
  }
  .etitle {
    font-weight: normal;
    font-size: 17px;
    line-height: 40px;
    color: #ffffff;
    margin: -30px 0 40px 0;
    text-align: center;
    font-family: PingFangSC-Regular;
  }
  .loginitem{
    div{
      line-height: 32px;
    }
  }
  .loginbtn{
    color: #ffffff;
    width: 100%;
    border:0px solid #CDE19E;
    background-image: linear-gradient(-163deg, #00A8E1 0%, #CDE19E 100%);
  }
  .login-form {
    position: fixed;
    right: 20%;
    bottom: 30%;
    width: 400px;
    padding: 35px 35px 15px 35px;
    
    background-color: #1F3264;
    border-radius: 3px;
  }
  
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    border-radius: 5px;
    color: #454545;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}

</style>
