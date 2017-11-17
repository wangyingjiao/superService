<template>
    <div class="addorder-container">
		<div class="fist-bar">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="100px" style="width:500px;">
			  <el-form-item label="密码" prop="pass" :required="true">
				<el-input type="password" v-model="ruleForm2.pass" ></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm2.checkPass"></el-input>
			  </el-form-item>
			  <el-form-item label="年龄" prop="age">
				<el-input v-model.number="ruleForm2.age"></el-input>
			  </el-form-item>

			</el-form>
		</div>

    </div>
</template>

<script>
import { staffList, addStaff, getStaff ,addMech} from "@/api/staff";
//import { parseTime } from "@/utils";
export default {
  name: "",
  data() {
 var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
              callback(new Error('error'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };  
    return {
       message:"this is message",
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }	   
    };
  },
  methods:{ 
 

  },
  mounted() {


  }
};
</script>
<style scoped>
.addorder-container{
    width:100%;
	float:left;
	background:#eef1f6;
}
.fist-bar{
  padding-top:20px;
  padding-bottom:20px;
  background:#fff;
  margin-right:20px;
 
}
</style>