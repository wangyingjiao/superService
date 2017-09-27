<template>
    <section class="content">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">

          <el-form-item>
            <el-input v-model="filters.name" placeholder="用户名" @keyup.13.native="getUsers"></el-input>
          </el-form-item>
            <el-form-item>
                <el-input v-model="filters.create" placeholder="创建人" @keyup.13.native="getUsers"></el-input>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="getUsers">查询</el-button>
          </el-form-item>

          <el-form-item class="right">
            <el-button type="primary" @click="handleAdd">新增用户</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table style="margin:10px 0 20px 0;"
                    ref="multipleTable"
                    :data="users"
                    border
                    v-loading="listLoading"
                    @selection-change="selsChange"
                    tooltip-effect="dark"

          >
            <el-table-column
              type="selection"
              width="55"
              align="center">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="ID"
                    width="80"
                    align="center"
                    v-if="dshow">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建日期"
                    width="200"
                    align="center"
                    :formatter="dateFormat">

            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名"
              width="120"
              align="center">
            </el-table-column>

            <el-table-column
              prop="createUser"
              label="创建人"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="更新日期"
              prop="updateTime"
              width="200"
              align="center"
              :formatter="dateFormat"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <el-button type="primary" size="small" @click="handleLook(scope.$index, scope.row)">查看</el-button>
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->

        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
        </el-pagination>
      </el-col>
      <!--编辑-->
      <el-dialog title="编辑用户" v-model="editFormVisible" :close-on-click-modal="false" >
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="editForm.userName" auto-complete="off" :disabled=!this.dshow></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="editForm.phone" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item  label="角色权限:">
            <el-radio-group v-model="editForm.radio2" >
              <el-radio :label="item.id" v-for="(item,index) in roleJurisdiction" :key="index">{{item.roleName}}</el-radio>

            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="resetEdit('editForm')">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog title="查看用户" v-model="lookFormVisible" :close-on-click-modal="false">
        <el-form :model="lookForm" ref="lookForm"  label-width="100px" >

          <el-form-item prop="userName" label="用户名:" >
            <el-input type="text" v-model="lookForm.userName" auto-complete="off" placeholder="用户名称" :disabled=!this.dshow></el-input>
          </el-form-item>
          <el-form-item prop="createTime" label="创建时间:" >
            <el-input type="text" v-model="lookForm.createTime" auto-complete="off" placeholder="创建时间" :disabled=!this.dshow></el-input>
          </el-form-item>
          <el-form-item prop="createUser" label="创建人:" >
            <el-input type="text" v-model="lookForm.createUser" auto-complete="off" placeholder="创建人" :disabled=!this.dshow></el-input>
          </el-form-item>
          <el-form-item prop="updateTime" label="更新时间:" >
            <el-input type="text" v-model="lookForm.updateTime" auto-complete="off" placeholder="更新时间" :disabled=!this.dshow></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="电话号码:" >
            <el-input type="text" v-model="lookForm.phone" auto-complete="off" placeholder="电话号码" :disabled=!this.dshow></el-input>
          </el-form-item>
          <el-form-item  label="角色权限:" prop="role" >
            <el-input type="text" v-model="lookForm.role" auto-complete="off" placeholder="角色权限" :disabled=!this.dshow></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">

            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="lookFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="新增用户" v-model="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" :rules="addRules" ref="addForm"  label-width="100px" >

          <el-form-item prop="userName" label="用户名:" >
            <el-input type="text" v-model="addForm.userName" auto-complete="off" placeholder="用户名称"></el-input>
          </el-form-item>
          <el-form-item prop="userPassword" label="密码:" >
            <el-input type="password" v-model="addForm.userPassword" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="userTel" label="电话号码:" >
            <el-input type="text" v-model="addForm.userTel" auto-complete="off" placeholder="电话号码"></el-input>
          </el-form-item>

          <el-form-item  label="角色权限:">
            <el-radio-group v-model="addForm.radio2" >
              <el-radio :label="item.id" v-for="(item,index) in roleJurisdiction" :key="index" @keyup.13.native="handleSubmit2">{{item.roleName}}</el-radio>

            </el-radio-group>
          </el-form-item>

          <el-form-item style="width:100%;">

            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="resetSubmit('addForm')">取消</el-button>
          <el-button type="primary"  @click.native.prevent="handleSubmit2" :loading="logining">保存</el-button>
        </div>
      </el-dialog>
    </section>
</template>
<style scoped lang="scss">
.form-inline .control-label {
    padding-top: 7px;
    margin-bottom: 0;
    text-align: right;
}
</style>
<script>
    import moment from 'moment';
    import { requestUserList,requestUserInfo,requestRoleInfo,addUserInfo,editUserInfo,removeUser} from '../../api/api';
    export default {
        data() {
          var checkTel=(rule,value,callback)=>{
            if(value === '' || value.toString().length != 11){
              callback(new Error('请输入11位手机号码'));
            }else if(!/^1\d{10}$/.test(value)){
              callback(new Error('请输入纯正确的手机号码'));
            }else {
              callback();
            }
          };
          return{
             listLoading: false,
             filters: {
					name: '',
					create:''
				},
			 total: 0,
			 page: 1,
			 dshow:false,
			 EditUserId:'',
			 roleJurisdiction:[],
			 sels: [],//列表选中列
			 lookFormVisible:  false,//查看界面是否显示
			 editFormVisible: false,//编辑界面是否显示
			 addFormVisible: false,//新增界面是否显示
			 logining: false,
			 editLoading: false,
			 //编辑界面数据
             editForm: {
                userName: '',
                phone: '',
                radio2:1
             },
             users: [],
             editFormRules: {
                phone: [
                    { required: true, validator: checkTel,  trigger: 'blur' }
                ]
             },
             //新增用户
             addForm:{
                userName:'',
                userPassword:'',
                userTel:'',
                radio2:1


             },
             //查看用户
             lookForm: {
                userName:'',
                createTime:'',
                createUser:'',
                updateTime:'',
                phone:'',
                role:3
             },
             addRules: {
                userName: [
                  { required: true, message: '请输入用户名称', trigger: 'blur' }
                ],
                userPassword:[
                  { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                userTel:[
                   { required: true, validator: checkTel, trigger: 'blur' }
                ],
             },

          }

        },

        components: {

        },
        methods: {
          //表格格式化日期
          dateFormat: function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                  return "";
                }
                //console.log(date);
                return moment(date).format("YYYY-MM-DD HH:mm:ss");

              },
           //格式化日期
           dateFormat1(date){
             return moment(date).format("YYYY-MM-DD HH:mm:ss");
           },
          //查询方法
           getUsers (){
            let para = {
                page: this.page,
                userName: this.filters.name,
                createUser:this.filters.create
            };
            this.listLoading = true;
             requestUserList(para).then(res => {
             this.listLoading = false;
             let { msg, code ,data} = res;
             if(code !==1){
                this.$message({
                  message: msg,
                  type: 'error'
                });
             }else{
                this.total=data.total;
                this.users=data.list;
                this.editForm.phone = data.list.phone;
             }

             //console.log(res)
             });
             //console.log(this.editForm.phone);
          },
          resetSubmit(from1){
                this.addFormVisible=false;
                this.$refs[from1].resetFields();
			},
			resetEdit(from1){
                this.editFormVisible=false;
                this.$refs[from1].resetFields();
			},
          //查询角色权限列表
          getRoles(){
            this.listLoading = true;
            requestRoleInfo().then(res=>{
              this.listLoading = false;
              let { msg, code ,data} = res;
               if(code !==1){
                  this.$message({
                    message: msg,
                    type: 'error'
                  });
               }else{
                  this.roleJurisdiction=data;
               }
              //console.log(this.roleJurisdiction);
            })
          },
          //新增方法
          handleAdd(){
             this.addFormVisible = true;
             this.getRoles();
             //addUser
          },
          //新增用户点击保存
          handleSubmit2(ev){
            this.$refs.addForm.validate((valid) => {
              if (valid) {
                this.logining = true;
                let para={userName:this.addForm.userName,password:this.addForm.userPassword,phone:this.addForm.userTel,roleIds:this.addForm.radio2};
                addUserInfo(para).then(res=>{
                  this.logining = false;
                  let { msg, code ,data} = res;
                   if(code !==1){
                      this.$message({
                        message: msg,
                        type: 'error'
                      });
                   }else{
                     this.$message({
                      message: msg,
                      type: 'success'
                     });
                     this.$refs['addForm'].resetFields();
                     this.addFormVisible = false;
                     this.getUsers();
                   }
                })

              }
            });
          },
          //表格是否有数据导致批量删除是否显示
          selsChange(sels){
            this.sels = sels;
          },
          //批量删除
          batchRemove(){
            var ids=this.sels.map(item=>item.id)
            //console.log(ids.toString());
          },
          //删除每一项
          handleDel: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                let para = { id: row.id };
                removeUser(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    if(res.code!==1){
                        this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                     return false;
                    };
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.getUsers();
                });
            }).catch(() => {

            });
		  },
          //编辑页面
          async handleEdit(index,row){
            this.editFormVisible = true;
            //this.editForm = Object.assign({}, row);
            this.EditUserId=row.id;
            await requestUserInfo({id:row.id}).then(function(res){
            //console.log(res);
               this.editForm.userName=res.data.userName;
               this.editForm.phone=res.data.phone;
               this.editForm.radio2=res.data.roles[0].id;
            }.bind(this));
             this.getRoles();
          },
          //编辑提交用户
          editSubmit(ev){
            this.$refs.editForm.validate((valid) => {
              if (valid) {
                this.editLoading = true;
                let para={ id:this.EditUserId, userName: this.editForm.userName,phone :this.editForm.phone,roleIds:this.editForm.radio2};
                editUserInfo(para).then(res=>{
                  this.editLoading = false;
                  if(res.code!==1){
                    this.$message({
                      message:msg,
                      type:'error'
                    });
                    this.$refs['editForm'].resetFields();
                  }else{
                  this.$message({
                      message: res.msg,
                      type: 'success'
                  });
                      this.$refs['editForm'].resetFields();
                      this.editFormVisible = false;
                      this.getUsers();
                  }
                })
              }
            })
          },
          handleCurrentChange(val) {
              this.page = val;
              this.getUsers();
          },
          //查看方法
          handleLook(index,row){
            let para = {
                id: row.id
            };
             this.lookFormVisible = true;
             requestUserInfo(para).then(res => {
              let { msg, code ,data} = res;
              if(code!==1){
                this.$message({
                  message:msg,
                  type:'error'
                });
              }else{
                //console.log(data);
                this.lookForm=data;
                this.lookForm.createTime=this.dateFormat1(data.createTime);
                if(this.lookForm.updateTime!==''||this.lookForm.updateTime!==null||this.lookForm.updateTime!==undefined){
                  this.dateFormat1(data.updateTime);
                };
                this.lookForm.role=data.roles[0].roleName

              }
             })
          }
        },
        created() {
          this.getUsers();

        }

    }
</script>
