<template>
  <section class="content">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.code" placeholder="角色编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>

        <el-form-item class="right">
          <el-button type="primary" @click="handleAdd">新增角色</el-button>
        </el-form-item>

      </el-form>
    </el-col>
    <el-table style="margin:20px 0;"
              ref="multipleTable"
              :data="roleUsers"
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
              prop="creationTime"
              label="创建日期"
              width="200"
              align="center"
              :formatter="dateFormat">
      </el-table-column>
      <el-table-column
              prop="roleName"
              label="角色名称"
              width="150"
              align="center">
      </el-table-column>
      <el-table-column
              prop="roleCode"
              label="角色编码"
              width="150"
              align="center">
      </el-table-column>
      <el-table-column
              prop="creationUserName"
              label="创建人"
              align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
    <!--  <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->

      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑角色" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm"  ref="editForm"  label-width="100px" >

        <el-form-item prop="roleName" label="角色名称:" >
          <el-input type="text" v-model="editForm.roleName"  auto-complete="off" placeholder="角色名称" :disabled=this.flag></el-input>
        </el-form-item>
        <el-form-item prop="roleCode" label="角色编码:" >
          <el-input type="text" v-model="editForm.roleCode" auto-complete="off" placeholder="角色编码" :disabled=this.flag></el-input>
        </el-form-item>
        <el-form-item  label="角色权限:">
          <el-tree
                  :data="editFormData"
                  show-checkbox
                  node-key="id"
                  ref="tree"
                  highlight-current
                  :props="defaultProps">
          </el-tree>
        </el-form-item>

        <el-form-item style="width:100%;">

          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary"  @click.native.prevent="editSubmit" :loading="editLoading">保存</el-button>
      </div>
    </el-dialog>
    <!--新增界面-->
    <el-dialog title="新增角色" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="roleForm" :rules="addRules" ref="roleForm"  label-width="100px" >

        <el-form-item prop="roleName" label="角色名称:" >
          <el-input type="text" v-model="roleForm.roleName" id="roleName" auto-complete="off" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item prop="roleCode" label="角色编码:" >
          <el-input type="text" v-model="roleForm.roleCode" auto-complete="off" placeholder="角色编码"></el-input>
        </el-form-item>
        <el-form-item  label="角色权限:">
          <el-tree
                  :data="data2"
                  show-checkbox
                  node-key="id"
                  ref="tree"
                  h
                  :props="defaultProps">ighlight-current
          </el-tree>
        </el-form-item>

        <el-form-item style="width:100%;">

          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
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
    import { requestRoleList,requestRole,saveRole,removeRole} from '../../api/api';
    export default {
        data() {
          return{
             filters: {
					name: '',
					code:''
				},
			 total: 0,
			 page: 1,
			 flag:false,
			 dshow:false,
			 //新增角色时第一次roleId为空
			 roleId:'',
			 roleEditId:'',
			 ids:'',
			 logining: false,
			 listLoading: false,
			 sels: [],//列表选中列
			 selsTree:[],
			 addFormVisible: false,//新增界面是否显示
			 editFormVisible: false,//编辑界面是否显示
			 editLoading: false,

			 //编辑界面数据
             editForm: {
                roleName: '',
                roleCode: ''
             },
             //新增角色
             roleForm: {
                roleName:'',
                roleCode:''

             },
             addRules: {
                roleName: [
                  { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                roleCode: [
                  { required: true, message: '请输入角色编码', trigger: 'blur' }
                ]
             },
              //以下是tree用到的属性
             data2: [],
             editFormData:[],
              defaultProps: {
                children: 'children',
                label: 'name'
             },
             //加载角色用户列表
             roleUsers: []
          }

        },

        components: {

        },
        methods: {
          //获取tree的节点id
          getCheckedKeys() {
            this.ids=this.$refs.tree.getCheckedKeys().toString();
            console.log(this.ids);
          },
          //设置tree的节点id
          setCheckedKeys() {
            this.$refs.tree.setCheckedKeys(this.selsTree);
          },
          //格式化日期
          dateFormat: function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                  return "";
                }
                //console.log(date);
                return moment(date).format("YYYY-MM-DD HH:mm:ss");

              },
          //查询方法
         getUsers (){
          let para = {
              page: this.page,
              roleName: this.filters.name,
              roleCode: this.filters.code
          };
          this.listLoading = true;
           requestRoleList(para).then(res => {
           this.listLoading = false;
           let { msg, code ,data} = res;
           if(code !==1){
              this.$message({
                message: msg,
                type: 'error'
              });
           }else{
              this.total=data.total;
              this.roleUsers=data.list;
           }
             console.log(res)
           });
          },
          //新增方法
          handleAdd(){
            this.addFormVisible = true;
            let roleParams={ roleId:this.roleId};
                requestRole(roleParams).then((data,textStatus) => {
                  this.data2=data.menus;
                }).catch(error=>{console.log(error)})
          },
          //新增角色点击保存
           handleSubmit2(ev){
            this.$refs.roleForm.validate((valid) => {
              if (valid) {
                this.logining = true;
                this.getCheckedKeys();
                let para={menuIds:this.ids, roleId:'', roleName: this.roleForm.roleName,roleCode:this.roleForm.roleCode};
                saveRole(para).then(data=>{
                  //console.log(data);
                  this.logining = false;
                  this.$message({
                      message: data.msg,
                      type: 'success'
                  });
                  this.$refs['roleForm'].resetFields();
                  this.addFormVisible = false;
                  this.getUsers();
                }).catch(error=>{console.log(error)})


              }
            })
          },
          //删除每一项
          handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { roleId: row.id };
					removeRole(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: res.msg,
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
		  },
		  //表格是否有数据导致批量删除是否显示
          selsChange(sels){
            this.sels = sels;
          },
          //批量删除
          batchRemove(){
            var ids=this.sels.map(item=>item.id)
            console.log(ids.toString());
          },
          //分页方法
          handleCurrentChange(val) {
          alert(val);
              this.page = val;
              this.getUsers();
          },
          //显示编辑界面
          handleEdit(index,row){
            this.editFormVisible=true;
            this.editForm=Object.assign({},row);
            this.flag=true;
            let roleParams={ roleId:row.id};
                this.roleEditId=row.id;
                requestRole(roleParams).then((data,textStatus) => {
                  this.editFormData=data.menus;
                  this.selsTree=data.checked;
                  this.setCheckedKeys();
                }).catch(error=>{console.log(error)})
          },
          editSubmit(ev){
            this.$refs.editForm.validate((valid) => {
              if (valid) {
                this.editLoading = true;
                this.getCheckedKeys();
                let para={menuIds:this.ids, roleId:this.roleEditId, roleName: this.editForm.roleName,roleCode:this.editForm.roleCode};
                saveRole(para).then(data=>{
                  //console.log(data);
                  this.editLoading = false;
                  this.$message({
                      message: data.msg,
                      type: 'success'
                  });
                  this.$refs['editForm'].resetFields();
                  this.editFormVisible = false;
                  this.getUsers();
                }).catch(error=>{console.log(error)})


              }
            })
          }



        },
        mounted() {
          this.getUsers();
        }

    }
</script>
