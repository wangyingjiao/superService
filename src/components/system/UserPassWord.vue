<template>
  <section class="content">


        <el-form :model="passwordForm" :rules="rules2" ref="passwordForm" style="margin:20px auto; width:30%;" label-position="left" label-width="100px" class="demo-ruleForm login-container">

          <el-form-item prop="oldPassword" label="原密码:">
            <el-input type="password" v-model="passwordForm.oldPassword" auto-complete="off" placeholder="原密码"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="新密码:">
            <el-input type="password" v-model="passwordForm.newPassword" auto-complete="off" placeholder="新密码"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="确认密码:">
            <el-input type="password" v-model="passwordForm.password" auto-complete="off" placeholder="确认密码" @keyup.13.native.prevent="handleSubmit2"></el-input>
          </el-form-item>

          <el-form-item style="width:100%;">
            <el-button type="primary"  @click.native.prevent="handleSubmit2" :loading="logining">保存</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
          </el-form-item>
        </el-form>
  </section>
</template>
<style>

</style>
<script>
    import { fixPassWord} from '../../api/api';
    export default {
        data() {
             var validatePass = (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入密码'));
                } else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value)){
                  callback(new Error('请输入8-16位数字英文混合密码'));
                }else {
                  if (this.passwordForm.password !== '') {
                    this.$refs.passwordForm.validateField('password');
                  }
                  callback();
                }
             };
            //两次密码验证
             var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordForm.newPassword) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
              };
            return {
                logining: false,
                passwordForm: {
                  oldPassword:'',
                  newPassword:'',
                  password:''
                },
                rules2: {
                  oldPassword: [
                    { required: true, message: '请输入当前密码', trigger: 'blur' }
                  ],
                  newPassword: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                  ],
                  password: [
                    { required: true,  validator: validatePass2, trigger: 'blur' }
                  ]
                }
            }
        },

        methods: {
          handleSubmit2(ev){
            this.$refs.passwordForm.validate((valid) => {
              if (valid) {
                this.logining = true;
                let para={oldPassword:this.passwordForm.oldPassword, newPassword : this.passwordForm.newPassword};
                 fixPassWord(para).then(data=>{
                  console.log(data);
                  this.logining = false;
                  if(data.code!==1){
                    this.$message({
                      message: data.msg,
                      type: 'error'
                  });
                  this.passwordForm.oldPassword='';
                  this.passwordForm.newPassword='';
                  this.passwordForm.password='';
                  return false;
                  }
                  this.$message({
                      message: data.msg,
                      type: 'success'
                  });
                  this.$router.push('/login');
                }).catch(error=>{console.log(error)});

              }
            })
          }
        },
        created() {

        }

    }
</script>
