<template>
  <div class="dn-login-page pr" :style="myHeight">
    <div class="login-box">
      <div class="login-header pa">
        <img src="../assets/img/logo.png"/>
        <em>国安服务管理系统</em>
      </div>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">

        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码" @keyup.13.native="handleSubmit2"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%; " @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '111111qQ'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { userName: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(res => {
              this.logining = false;
              //NProgress.done();
              let { msg, code ,data} = res;
              //let { userName } =data.data;
              if (code !== 1) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                console.log(data);
                sessionStorage.setItem('user', JSON.stringify(data));
                this.$router.push({ path: '/roleList' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    computed: {
      myHeight () {
        return { height: (document.documentElement.clientHeight || document.body.clientHeight) + "px" }
      }
    }
  }

</script>

<style lang="scss" scoped>

  .dn-login-page{
    background: url("../assets/img/login-bg.png");
    position: relative;
    .login-box{
      width:500px;
      height:420px;
      position: absolute;
      left:0;
      top:0;
      right: 0;
      bottom: 0;
      margin:auto;
      .login-header{

        width:380px;
        height:100px;
        margin-left:50px;
        em{
          color: #6797c0;
          margin-top:-50px;
          position: absolute;
          top:70px;
          margin-left:10px;
          font: 20px/30px "\5BF0\E1BF\848B\95C6\5474\7CA6"; ;
        }
      }
      .login-container {
        background: url("../assets/img/login-bg-opacity.png");
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
       margin-top:70px;
        width: 500px;
        height: 350px;
        padding:50px 70px;
        box-sizing: border-box;



        .remember {
          margin: 0px 0px 35px 0px;
          color:#fff;
        }
      }
    }


  }


</style>