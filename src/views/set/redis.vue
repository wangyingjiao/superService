<template>
    <div class="redis_box">
        <el-form v-if="loginState" :model="form" status-icon  ref="form" label-width="100px" class="redis_form">
            <el-form-item label="密码 : " prop="pass">
                <el-input type="password" placeholder="请输入登录redis的密码" v-model="form.pass" ></el-input>
            </el-form-item>
            <el-form-item>
                <div  class="button-large" @click="submitForm('form')">提交</div>
            </el-form-item>
        </el-form>
        <div v-else class="redis_list">
            <el-row>
                <el-col :span="12">
                        <el-row>
                            <el-col :span="6">
                            <span class="redis_span">查询redis:</span>
                            </el-col>
                            <el-col :span="16">
                                <el-input
                                    placeholder="请输入查询的内容"
                                    v-model="redis.inquiryKey">
                                </el-input>
                            </el-col>
                        </el-row>
                        <br>
                        <el-row >
                            <el-col :offset="6">
                                <button class="button-large" @click="handleGet">查 询</button>
                            </el-col>
                        </el-row>
                        <br>
                        <el-row>
                            <el-col :span="16" :offset="6">
                              <el-input v-if="textareaState" type="textarea" :rows='3' :autosize='true' v-model="textarea"></el-input>
                            </el-col>
                        </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                            <el-col :span="6">
                            <span class="redis_span">写入redis:</span>
                            </el-col>
                            <el-col :span="16">
                                <el-row>
                                    <el-col :span="4"><span class="redis_span"> key：</span></el-col>
                                    <el-col :span="16">
                                        <el-input
                                    placeholder="请输入key"
                                    v-model="redis.key">
                                    
                                   </el-input>
                                </el-col>
                                </el-row>
                                <br>
                                <el-row>
                                    <el-col :span="4"> <span class="redis_span"> value：</span> </el-col>
                                    <el-col :span="16">
                                        <el-input
                                    placeholder="请输入value"
                                    v-model="redis.value">
                                    
                                   </el-input>
                                </el-col>
                                </el-row>
                                <br>
                                <el-row >
                                    <el-col :offset="4">
                                        <button class="button-large" @click="handleSave">写 入</button>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        
                </el-col>
            </el-row>
            
        </div>
    </div>
</template>

<script>
import { getRedisValue, saveRedisValue, checkPassword } from "@/api/set";
import util from "@/utils/date";
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "redis",
  directives: {
    waves
  },
  data() {
    return {
      loginState: true,
      textareaState: false,
      form: {
        pass: ""
      },
      redis: {
        inquiryKey: "",
        key: "",
        value: ""
      },
      textarea: ""
    };
  },
  created() {
    // this.open3()
  },
  methods: {
    submitForm(formName) {
      console.log(this.form);
      if (this.form.pass) {
        checkPassword({ password: this.form.pass }).then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.loginState = false;
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "密码不能为空"
        });
      }
    },
    handleGet() {
      console.log(this.redis);
      if (this.redis.inquiryKey) {
        getRedisValue({ key: this.redis.inquiryKey }).then(res => {
          if (res.data.code == 1) {
            this.redis.inquiryKey = "";
            this.textareaState = true;
            this.textarea = JSON.stringify(res.data.data);
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "查询内容不能为空"
        });
      }
    },
    handleSave() {
      console.log(this.redis);
      if (this.redis.key) {
        if (this.redis.value) {
          saveRedisValue({ key: this.redis.key, value: this.redis.value }).then(
            res => {
              if (res.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "写入成功!"
                });
                this.redis.key = "";
                this.redis.value = "";
              }
            }
          );
        } else {
          this.$message({
            type: "error",
            message: "value不能为空"
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "key不能为空"
        });
      }
    }
  }
};
</script>
<style>
.redis_box {
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
}
.redis_form {
  width: 50%;
  margin: 100px auto;
}
.redis_list {
  height: 100vh;
  margin: 100px 0;
}
.redis_content {
  margin-top: 10px;
  height: 100px;
  border: 1px solid #333;
}
.redis_span {
  font-size: 15px;
  display: block;
  line-height: 34px;
  text-align: right;
  padding-right: 10px;
}
</style>
