<template>
  <section class="content">


    <el-form :model="roleForm" :rules="rules2" ref="roleForm" style="margin:20px auto; width:30%;" label-position="left" label-width="100px" class="demo-ruleForm login-container">

      <el-form-item prop="roleName" label="角色名称:" >
        <el-input type="text" v-model="roleForm.roleName" id="roleName" auto-complete="off" placeholder="角色名称"></el-input>
      </el-form-item>

      <el-form-item  label="角色权限:">
          <el-tree
                  :data="data2"
                  show-checkbox
                  node-key="id"
                  ref="tree"
                  highlight-current
                  :props="defaultProps">
          </el-tree>
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
import { requestRole } from '../../api/api';


    export default {
        data() {
            return {
                logining: false,
                roleForm: {
                  roleName:'',

                },
                rules2: {
                  roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                  ]
                },
                //以下是tree用到的属性
                data2: [],
                defaultProps: {
                  children: 'children',
                  label: 'name'
                }
            }
        },
        components: {


        },
        methods: {

        },
        beforeCreate(){

        },
        created() {












        },
        mounted(){

        }

    }
</script>

