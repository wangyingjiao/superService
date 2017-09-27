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
              >
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
    <el-dialog title="门店详细信息" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="roleForm" :rules="addRules" ref="roleForm"  label-width="100px" >

        <el-form-item prop="roleName" label="门店名称:" >
          <el-input type="text" v-model="roleForm.roleName" id="roleName" auto-complete="off" placeholder="门店名称"></el-input>
        </el-form-item>
        <el-form-item prop="roleCode" label="门店编码:" >
          <el-input type="text" v-model="roleForm.roleCode" auto-complete="off" placeholder="门店编码"></el-input>
        </el-form-item>
        <div class="container">
          <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" :default="abc" ></el-amap-search-box>
          <el-amap :vid="'amap'" :center="mapCenter" :plugin="plugin" :zoom="zoom" :map-manager="amapManager" ref="map" :events="events">
            <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker>
          </el-amap>
        </div>

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
  .container{
    width: 100%;
    height:400px;
    position:relative;
  }
  .search-box {
    position: absolute;
    top: 25px;
    right: 20px;
  }
</style>
<script>
    import moment from 'moment';
    //import AMap from 'AMap'
    import {amapManager} from 'vue-amap';
    import { requestRoleList,requestRole,saveRole,removeRole} from '../../api/api';
    export default {
        data() {
          return{
             abc:'',
             zoom:14,
             markers:[],
             marker:null,
             mapCenter: [116.63942,40.137844],
             plugin: [{
                pName: 'ToolBar',
                events: {
                  init(instance) {
                    console.log(instance);
                  }
                }
              }],
             events: {
              init: (o) => {
              var that=this,marker;
               var contextMenu = new AMap.ContextMenu();

                //右键添加Marker标记
                contextMenu.addItem("门店位置", function(e) {
                    if(marker){
                      marker.setMap(null);
                      marker = null;
                    };

                      marker = new AMap.Marker({
                        map: o,
                        position: o.contextMenuPositon, //基点位置
                         icon: new AMap.Icon({
                            size: new AMap.Size(40, 53),  //图标大小
                            image: "https://gemini.guoanshequ.wang/gemini/static/img/icon/store.png",
                            imageOffset: new AMap.Pixel(0, 0)
                        })
                    });
                    this.marker=marker;

                     let geocoder=new AMap.Geocoder({
                      city:"010"
                    });
                    let lnglatXY=[o.contextMenuPositon.lng, o.contextMenuPositon.lat];
                    //console.log(lnglatXY);
                    //地图上所标点的坐标
                      geocoder.getAddress(lnglatXY, function(status, result) {
                          if (status === 'complete' && result.info === 'OK') {
                             that.roleForm.roleName=result.regeocode.formattedAddress;
                          }else{
                             alert("获取地址失败");
                          }
                      });
                }, 3);
                 o.on('rightclick', function(e) {
                    contextMenu.open(o, e.lnglat);
                    this.contextMenuPositon = e.lnglat;
                });
              },
            },
             searchOption: {
              city: '010',
              citylimit: true,
            },
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
             amapManager,

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
           onSearchResult(pois) {
            let latSum = 0;
            let lngSum = 0;
            //console.log(pois);
            if (pois.length > 0) {
                let {lng, lat} = pois[0];
                 if(this.markers){
                      this.markers=[];
                    };
                this.markers.push([lng, lat]);

              let center = {
                lng: lng,
                lat: lat
              };
              this.mapCenter = [center.lng, center.lat];
            }
          },
          //增加之前先置空表单
          resetTemp(){
            this.roleForm={
              roleName:'',
              roleCode:''
            },
            this.abc='',
            this.markers=[],
            this.marker=null
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
            // console.log(res)
           });
          },
          //新增方法
          handleAdd(){
            this.resetTemp();
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
          //this.getUsers();
        }

    }
</script>
