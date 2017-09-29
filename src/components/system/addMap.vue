<template>
  <section class="content">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" >
       <el-form-item class="right">
          <el-button type="primary" @click="handleAdd" id="addABC">新增角色</el-button>
        </el-form-item>
      </el-form>
    </el-col>


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
        <el-button @click.native="clearSubmit">abc</el-button>
        <el-button @click.native="clearSubmit1">取消</el-button>
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
    export default {
         data() {
          return{
             abc:'',
             zoom:14,
             map:null,
             markers:[],
             marker:null,
             markers222:[],
             mapCenter: [116.63942,40.137844],
             show:false,
             plugin: [{
                pName: 'ToolBar',
                events: {
                  init(instance) {
                  //  console.log(instance);
                  }
                }
              }],
             events: {
              init: (o) => {
              console.log(o);
              this.map=o;

               var that=this;
               var contextMenu = new AMap.ContextMenu();

                //右键添加Marker标记
                contextMenu.addItem("门店位置", function(e) {
                    if(that.marker){
                      console.log(that.marker);
                      that.marker.setMap(null);
                       that.marker = null;
                    };
                    if(that.addFormVisible == false){
                     alert("1");
                      for(var i=0;i<that.markers222.length;i++){
                        that.markers222[i].setMap(null);
                     }

                    }


                    that.marker = new AMap.Marker({
                      map: o,
                      position: o.contextMenuPositon, //基点位置
                      icon: new AMap.Icon({
                          size: new AMap.Size(40, 53),  //图标大小
                          image: "https://gemini.guoanshequ.wang/gemini/static/img/icon/store.png",
                          imageOffset: new AMap.Pixel(0, 0)
                      })
                    });
                    console.log(that.marker);
                    that.markers222.push(that.marker);
                    console.log("======="+that.markers222);
                    let geocoder=new AMap.Geocoder({
                      city:"010"
                    });
                    let lnglatXY=[o.contextMenuPositon.lng, o.contextMenuPositon.lat];

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

			 logining: false,
			 listLoading: false,
			 addFormVisible: false,//新增界面是否显示
             amapManager,


             addRules: {
                roleName: [
                  { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                roleCode: [
                  { required: true, message: '请输入角色编码', trigger: 'blur' }
                ]
             },
             roleForm: {
                roleName:'',
                roleCode:''

             },

          }

        },


        methods: {
            clearSubmit(){
              if (!this.markers222.length) return;
              this.markers222.splice(0,this.markers222.length);
              console.log(this.markers222);
              //this.markers222.splice(0,this.markers222.length);
              //this.addFormVisible = false;
              //console.log(this.addFormVisible);
            },
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
          //debugger;

            this.roleForm={
              roleName:'',
              roleCode:''
            },
            this.abc='',
            this.markers=[]

            //this.marker=null
          },
          //删除地图标志

          //新增方法
          handleAdd(){
            //this.markers222.splice(0,this.markers222.length);
           //this.map.remove(markers);
            this.resetTemp();
            this.addFormVisible = true;

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
        },
        mounted() {
          //this.getUsers();

        }

    }
</script>
