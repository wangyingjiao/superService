<template>
  <div class="box">
    <!-- 技能搜索开始 -->
    <div class="filter-container bgWhite padBot20">
      <el-select clearable class="search"  v-model="mechanism" filterable placeholder="选择机构" >
          <el-option v-for="item in mechanismOptions" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
      </el-select>      
      <el-input  class="search" placeholder="请输入搜索的技能名称" v-model="localSearch"></el-input>
      <button @click="search" class="search-button btn_search el-icon-search btn-color"> 搜索</button>
    </div>
    <!-- 技能搜索结束-->
    <!-- 技能列表展示开始 -->
    <div class="app-container calendar-list-container">
      <div class="">
        <div class="bgWhite bgbot70" >
          <button class="button-small btn_pad btn-color" v-if="btnShow.indexOf('skill_insert') != -1" @click="add('add')">新增</button>
          <div style="padding-top:15px;">
              <el-table  :data="getListdata" v-loading="listLoading"  highlight-current-row element-loading-text="正在加载"
                style="width: 100% ;">
                      <el-table-column align="center" label="编号" width="100">
                          <template scope="scope">
                            {{scope.row.index+(pageNumber-1)*pageSize}}
                          </template>
                      </el-table-column>
                      <el-table-column
                      align="center"
                      prop="orgName"         
                      label="服务机构"
                      v-if=" userType != 'org' && userType != 'station'"
                      >
                      </el-table-column>                       
                      <el-table-column label="技能名称" align="center" prop="name"></el-table-column>
                      <el-table-column label="技师个数" align="center" prop="techNum"> </el-table-column>
                      <el-table-column align="center" label="操作" min-width="100px">
                        <template scope="scope">
                            <el-button class="el-icon-edit ceshi3"  v-if="btnShow.indexOf('skill_update') != -1" @click="add('edit',scope.row)"></el-button>
                            <el-button class="el-icon-delete ceshi3" v-if="btnShow.indexOf('skill_delete') != -1" @click="handleDelete(scope.row)"></el-button>
                        </template>
                      </el-table-column>
              </el-table>
              <div v-if="!listLoading" class="pagination-container techPag clearfix">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync='jumpPage'
                  layout="total, sizes, prev, pager, next, jumper" :page-size="pageSize" :page-sizes="[5,10,15,20]" :total="total">
                </el-pagination>
              </div>
          </div>          
        </div>
        <!-- 技能列表展示结束 -->
        <!-- 弹出层新增技能开始 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" :modal-append-to-body="false"  id="diatable"  :close-on-click-modal="false">
          <el-form :model="ruleForm2" 
             :rules="rules" 
             ref="ruleForm2" 
             label-width="160px" 
             class="demo-ruleForm dia_form" 
             label-position="left">
            <el-form-item v-if=" userType == 'sys' || userType == 'platform'" label="选择机构"  prop="orgId">
              <el-select v-model="ruleForm2.orgId" :disabled='mechanismFlag' filterable placeholder="请选择机构"  class="kill form_item" @change="mechChage">  
                <el-option
                  v-for="item in mechanismOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
              </el-select>
            </el-form-item>              
            <el-form-item label="技能名称" prop="name">
              <el-input  v-model.trim="ruleForm2.name"  class="form_item"  placeholder="请输入2-15位技能名称"></el-input>
            </el-form-item>
            <el-form-item label="选择分类" prop="staffClass">
              <el-select v-model="ruleForm2.staffClass" multiple filterable placeholder="请选择分类"  class="kill form_item">  
                <el-option
                  v-for="item in Options2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
              </el-select>
            </el-form-item>            
            <el-form-item v-if=" userType == 'org' || userType == 'station'" label="选择技师" prop="technicians" class="selfst3">
              <div class="tech-order-jnsk selfst2 form_item" style="width:100%">
                    <div class="tech-order-btnsk selfst1"  @click="orderTech"> &#10010 请选择</div>
              </div>
            </el-form-item>
            <el-form-item v-if=" (userType == 'sys' && mechanism1 !='' ) || (userType == 'platform'  && mechanism1 !='' )" label="选择技师" prop="technicians" class="selfst3">
              <div class="tech-order-jnsk selfst2 form_item" style="width:100%">
                    <div class="tech-order-btnsk selfst1"  @click="orderTech"> &#10010 请选择</div>
              </div>
            </el-form-item>            
            <el-form-item label="" >
                  <div v-if="tabOptions.length !=0" class="techWrap">
                      <div class="tabWrap" v-for="item in tabOptions" :key="item.techId">
                        <div><span class="techNameStyle1">{{item.techName}}</span> <i class="self-el-close el-icon-close"  @click="selfErrorClose(item)"></i></div>
                        
                        <!-- <div class="closePic" @click="selfErrorClose(item)">&#10005</div> -->
                      </div>                     
                  </div>              
            </el-form-item>           
          </el-form>    
          <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button  class="button-large btn-color"  :disabled="submitFlag"  @click="submitForm('ruleForm2')">保存</button>
              <button class="button-cancel btn-color-cancel"  @click="resetForm('ruleForm2')">取消</button>
          </div>          
        </el-dialog>
        <!-- 弹出层新增技能结束 -->
        <!-- 选择技师弹出层开始 -->
        <el-dialog title="选择服务人员":visible.sync="ordertech" :modal="false" :modal-append-to-body="false" :close-on-click-modal="false"  class="selfDialogWidth">
              <div class="selfFLOLeft" style="width:40%">
                <el-input placeholder="输入要搜索的姓名" v-model="techName"  style="margin-left:15px;width:96%"></el-input>                
              </div>
              <div class="selfFLOLeft" style="width:40%">
                <el-select clearable placeholder="请选择服务站" filterable v-model="techStationId" style="margin-left:22px;width:96%">
                  <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div  class="selfFLORight"><button class="button-large" @click="searchTeh">查询</button></div>
              <div class="NowTabs">当前选择标签：</div> 
              <el-collapse-transition>
                <div class="selfpromMessageTab" v-if="middleA.length !=0 || middleB.length !=0">                   
                    <div v-if="dialogStatus == 'add'" class="tabWrap1" v-for="item in middleA" :key="item.techId">
                      <span class="techNameStyle">{{item.techName}}</span>
                    </div>                    
                    <div v-if="dialogStatus == 'edit'" class="tabWrap1" v-for="item in middleB" :key="item.techId">
                      <span class="techNameStyle">{{item.techName}}</span>
                    </div>                                              
                </div>
              </el-collapse-transition>                           
              <div class="selfFLOLeft selfOVerflow1">
                    <div class="table-d">
                      <table  class="selfTable">
                          <tr class="tableHeader">
                            <td  class="selfTdStyle" align="center" width="73px">选择</td>
                            <td  class="selfTdStyle"  align="center" width="100px">头像</td>
                            <td  class="selfTdStyle"  align="center" width="178px">姓名</td>
                            <td  class="selfTdStyle"  align="center" width="73px">性别</td>
                            <td  class="selfTdStyle"  align="center" width="200px">服务站</td>							
                          </tr>                
                        <div class="skillMarginTop60">
                          <tr v-for="item in listTech" :key="item.techId"  ref="tableItem1" class="selfTdStyle1">
                            <td   width="72px" align="center"><el-checkbox :disabled="item.jobStatus=='leave'"  v-model="item.techChecked" @change="testTech(item)"></el-checkbox></td>
                            <td  width="99px"  align="center"><img class="imgStyle" :src="imgSrc+item.headPic+picWidth60"/></td>
                            <td  width="180px" align="center"><div class="selftechNameStyle">{{item.techName}}</div></td>
                            <td  width="73px" align="center">
                              <span v-if="item.techSex =='male'">男</span>
                              <span v-if="item.techSex =='female'">女</span>									
                            </td>
                            <td  width="198px" align="center"><div class="selftechStationNameStyle">{{item.techStationName}}</div></td>							
                          </tr>
                        </div>
                      </table>
                      <div v-if="listTech.length == 0" class="selfTabProm">暂无数据</div>
                    </div>            
              </div>             
              <div slot="footer" class="dialog-footer selfFooter">
                  <button class="button-large btn-color"   @click="submitForm2()">保存</button>
                  <button  class="button-cancel btn-color-cancel"  @click="resetForm2()">取消</button>
              </div>           
        </el-dialog>
        <!-- 选择技师弹出层结束 -->
      </div>
    </div>
  </div>
</template>
<script>
import {
  getListdata,
  orderServer,
  saveServer,
  techDelet,
  editTech,
  upDataTech
} from "@/api/serviceManage";
import {getFuwu,getSList } from "@/api/staff";
//挂载数据
var loading;
export default {
  name: "skill",
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入2-15位技能名称"));
      } else {
        if (value.length >= 2 && value.length <= 15) {
          callback();
        } else {
          callback(new Error("请输入2-15位技能名称"));
        }
      }
    };
    return {
      userType:'',
      mechanismFlag:false,
      mechanismOptions: [],
      mechanism: "",
      mechanism1: "",       
      Options2: [],
      submitFlag: false,
      jumpPage: 1,
      title: "新增技能",
      btnShow: [],
      promShow: false,
      promShow1: false,
      checkAll: false,
      localSearch: "",
      tabOptions: [],
      techShow: false,
      techName: "",
      techStationId: "",
      rules: {
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        orgId:[{required: true, message: "请选择机构", trigger: "change"}],
        staffClass: [
          {
            required: true,
            type: "array",
            message: "请选择分类",
            trigger: "change"
          }
        ]
      },
      ruleForm2: {
        name: "",
        staffClass: [], //选择分类下拉对象
        technicians: [],
        orgId:'',
      },
      commodityse: {},
      options: [],
      checkbox: false,
      getListdata: [],
      ordertech: false,
      xingmu: "",
      listTech: [],
      checked: false,
      ortech: false,
      total: null,
      pageSize: 10,
      pageNumber: 1,
      listLoading: true,
      dialogVisible: false,
      flagserver: false,
      dialogFormVisible: false,
      dialogStatus: "add",
      id: "",
      promInf1: "搜索内容不存在!",
      middleA: [],
      middleB: [],
      middleC: [],
      middleD: []
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("btn"))) {
      this.btnShow = JSON.parse(localStorage.getItem("btn"));
    }
  },
  methods: {
    //服务机构变换
    mechChage(val){
      if(this.mechanismFlag){

      }else{
        this.tabOptions=[];
        this.middleA=[];
        this.listTech=[];
        this.ruleForm2.technicians=[];
        this.Options2=[];
        this.ruleForm2.staffClass=[]         
      }      

      if(val !=''){
        this.mechanism1=val
        this.getseverStion(val)
        var obj={
          orgId:this.mechanism1
        }
        orderServer(obj)
          .then(res => {
            if (res.data.code === 1) {
              if(!this.mechanismFlag){
                this.Options2 = res.data.data.list;
              }                          
              this.listTech = res.data.data.techs;
            } else {
              this.dialogVisible = false;
            }
          })
          .catch(res => {
          });        
      }

      
    },
    // 服务机构
    getoffice() {
      getSList({}).then(res => {
        if(res.data.data.list != undefined){        
          if (res.data.data.list[0].id == '0' ) {
            res.data.data.list.remove(res.data.data.list[0]);
          } 
          if(res.data.data.list.length >= 2){
            if(res.data.data.list[1].id == '0'){
              res.data.data.list.remove(res.data.data.list[1]);
              res.data.data.list.remove(res.data.data.list[0]);
            }
          }         
            this.mechanismOptions = res.data.data.list;
            if(this.userType == 'org' || this.userType == 'station'){
              this.mechanism=this.mechanismOptions[0].id;
            }
        }
      });
    },    
    loadingClick() {
      loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".el-dialog__body")
      });
    },
    //全局搜索按钮
    search() {
      var obj = {
        name: this.localSearch,
        orgId: this.mechanism
      };
      this.pageNumber = 1;
      this.jumpPage = 1;
      this.getList(obj, this.pageNumber, this.pageSize);
    },
    //存储选择技师对象
    testTech(obj) {
      if (this.dialogStatus == "add") {
        if (obj.techChecked) {
          this.middleA.push(obj);
        } else {
          for (var a1 = 0; a1 < this.middleA.length; a1++) {
            if (this.middleA[a1].techId == obj.techId) {
              this.middleA.remove(this.middleA[a1]);
            }
          }
        }
      }

      if (this.dialogStatus == "edit") {
        if (obj.techChecked == true) {
          this.middleB.push(obj);
        }
        if (obj.techChecked == false) {
          for (var a = 0; a < this.middleB.length; a++) {
            if (this.middleB[a].techId == obj.techId) {
              this.middleB.remove(this.middleB[a]);
            }
          }
        }
      }
    },
    //技师列表中服务站下拉列表获取
    getseverStion(val){
        if(val != ''){
          var obj1 = {
            orgId: val
          };
        }else{
          var obj1={ }
        }
        getFuwu(obj1).then(res => {
          if (res.data.code === 1) {
            if(res.data.data){
              if (res.data.data[0].id == 0) {
                res.data.data.remove(res.data.data[0]);
              }
              this.options=res.data.data;           
            }

          } else {

          }
        });       
    },
    //全局新增按钮
    add(status, row) {
      this.mechanism1='';      
      this.middleA = [];
      this.middleB = [];
      this.middleD = [];
      this.ruleForm2.orgId='';
      this.listLoading = true;
      this.dialogStatus = status;
      this.tabOptions = [];      
      if (this.dialogStatus == "add") {
        this.title = "新增技能";
        this.Options2=[];
        this.mechanismFlag=false;       
        //新增操作
        this.id = "";
        this.listLoading = false;
        this.dialogVisible = true;
        //服务技师与分类、服务站获取
      if(this.userType =='org' || this.userType == 'station'){
        this.getseverStion('')
        var obj = {};
        orderServer(obj)
          .then(res => {
            if (res.data.code === 1) {
              this.Options2 = res.data.data.list;                           
              this.listTech = res.data.data.techs;
              this.dialogVisible = true;
              this.listLoading = false;
            } else {
              this.listLoading = false;
              this.dialogVisible = false;
            }
          })
          .catch(res => {
            this.listLoading = false;
          });        
      }else{
        // var obj ={
        //   orgId:this.mechanism1
        // }
      }        

      } else if (this.dialogStatus == "edit") {
        this.title = "编辑技能";
        this.mechanismFlag=true;  
        this.Options2=[];      
        //编辑操作
        this.id = row.id;
        var obj1 = {
          id: this.id
        };
        editTech(obj1)
          .then(res => {
            if (res.data.code === 1) {
              this.listTech = res.data.data.techs;
              this.Options2 =  res.data.data.list;
              this.listLoading = false;
              this.dialogVisible = true;
              this.ruleForm2.name = res.data.data.info.name;
              this.ruleForm2.orgId =res.data.data.info.orgId;
              this.mechanism1=res.data.data.info.orgId;              
              if (res.data.data.info.sortIds != undefined) {
                this.ruleForm2.staffClass = res.data.data.info.sortIds;
              }
              if (res.data.data.info.technicians != undefined) {
                this.tabOptions = res.data.data.info.technicians;
                this.selectionreturn1();
              }
            } else {
              this.listLoading = false;
              this.dialogVisible = false;
            }
          })
          .catch(res => {
            this.listLoading = false;
          });
      }
    },
    //技师数据回显二级选中
    selectionreturn1() {
      if (this.tabOptions.length != undefined) {
        for (var a = 0; a < this.listTech.length; a++) {
          for (var b = 0; b < this.tabOptions.length; b++) {
            if (this.tabOptions[b].techId == this.listTech[a].techId) {
              this.listTech[a].techChecked = true;
              this.middleB.push(this.listTech[a]);
            }
          }
        }
      }
    },
    //新增或编辑弹窗保存
    submitForm(formName) {
      this.ruleForm2.technicians = this.tabOptions;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loadingClick();
          this.saveFlag = true;
          var obj = {
            id: this.id,
            name: this.ruleForm2.name,
            technicians: this.ruleForm2.technicians,
            sortIds: this.ruleForm2.staffClass,
            orgId: this.ruleForm2.orgId
          };
          if (this.dialogStatus == "add") {
            saveServer(obj)
              .then(res => {
                if (res.data.code === 1) {
                  this.$message({
                    type: "success",
                    message: "新增成功!"
                  });
                  loading.close();
                  this.saveFlag = false;
                  this.$refs["ruleForm2"].resetFields();
                  this.ruleForm2.name = "";
                  this.ruleForm2.staffClass = [];
                  this.middleA = [];
                  this.middleB = [];
                  this.middleD = [];
                  this.localSearch = "";
                  this.mechanism='';
                  var obj1 = {};
                  this.dialogVisible = false;
                  this.listLoading = false;
                  this.pageNumber = 1;
                  this.jumpPage = 1;
                  this.getList(obj1, this.pageNumber, this.pageSize);
                } else {
                  loading.close();
                  this.middleB = [];
                  this.middleD = [];
                }
              })
              .catch(res => {
                loading.close();
                this.listLoading = false;
                this.saveFlag = false;
              });
          }
          if (this.dialogStatus == "edit") {
            upDataTech(obj)
              .then(res => {
                this.saveFlag = false;
                if (res.data.code === 1) {
                  this.$message({
                    type: "success",
                    message: "编辑成功!"
                  });
                  loading.close();
                  this.$refs["ruleForm2"].resetFields();
                  this.ruleForm2.name = "";
                  this.ruleForm2.staffClass = [];
                  this.middleA = [];
                  this.middleB = [];
                  this.middleD = [];
                  this.dialogVisible = false;
                  var obj1 = {
                    name: this.localSearch,
                    orgId: this.mechanism
                  };
                  this.listLoading = false;
                  this.getList(obj1, this.pageNumber, this.pageSize);
                } else {
                  loading.close();
                }
              })
              .catch(res => {
                loading.close();
                this.listLoading = false;
                this.dialogVisible = false;
              });
          }
        } else {
          var errArr = this.$refs[formName]._data.fields;
          var errMes = [];
          for (var i = 0; i < errArr.length; i++) {
            if (errArr[i].validateMessage != "") {
              errMes.push(errArr[i].validateMessage);
            }
          }
          this.$message({
            type: "error",
            message: errMes[0]
          });
          return false;
        }
      });
    },
    //新增或编辑弹窗cancel
    resetForm(formName) {
      if (this.dialogStatus == "add") {
        this.$refs[formName].resetFields();
        this.ruleForm2.name = "";
        this.Options2=[];
        this.ruleForm2.staffClass = [];
      }
      if (this.dialogStatus == "edit") {
        this.$refs[formName].resetFields();
        this.ruleForm2.name = "";
        this.ruleForm2.staffClass = [];
      }
      this.dialogVisible = false;
    },
    //新增或编辑弹窗选择技师回传TAB删除
    selfErrorClose(obj) {
      if (this.tabOptions != undefined && this.tabOptions.length != 0) {
        for (var a = 0; a < this.listTech.length; a++) {
          if (obj.techId == this.listTech[a].techId) {
            this.listTech[a].techChecked = false;
          }
        }
        if (this.dialogStatus == "add") {
          for (var b = 0; b < this.middleA.length; b++) {
            if (obj.techId == this.middleA[b].techId) {
              this.middleA.remove(this.middleA[b]);
            }
          }
        }
        if (this.dialogStatus == "edit") {
          for (var c = 0; c < this.middleB.length; c++) {
            if (obj.techId == this.middleB[c].techId) {
              this.middleB.remove(this.middleB[c]);
            }
          }
        }
        this.tabOptions.remove(obj);
      } else {
      }
    },
    //选择技师弹出层保存
    submitForm2() {
      this.techName = "";
      this.techStationId = "";
      //先遍历数据中选中的再保存
      if (this.dialogStatus == "add") {
        var arr = [];
        if (this.middleA != undefined && this.middleA.length != 0) {
          for (var a = 0; a < this.middleA.length; a++) {
            if (this.middleA[a].techChecked == true) {
              arr.push(this.middleA[a]);
            }
          }
        }
        this.tabOptions = Object.assign([], arr);
      }
      if (this.dialogStatus == "edit") {
        var arr1 = [];
        if (this.middleB != undefined && this.middleB.length != 0) {
          for (var b = 0; b < this.middleB.length; b++) {
            if (this.middleB[b].techChecked == true) {
              arr1.push(this.middleB[b]);
            }
          }
        }
        this.tabOptions = arr1;
      }
      this.ordertech = false;
    },
    //选择技师弹出层cancel
    resetForm2() {
      this.techName = "";
      this.techStationId = "";
      if (this.dialogStatus == "add") {
        this.middleA = Object.assign([], this.tabOptions);
      }
      if (this.dialogStatus == "edit") {
        this.middleB = this.middleC;
        var arr1 = [];
        if (this.middleC != undefined && this.middleC.length != 0) {
          for (var b = 0; b < this.middleC.length; b++) {
            if (this.middleC[b].techChecked == true) {
              arr1.push(this.middleC[b]);
            }
          }
        }
        this.tabOptions = arr1;
      }
      for (var a = 0; a < this.listTech.length; a++) {
        this.listTech[a].techChecked = false;
      }
      this.ordertech = false;
    },
    //表格数据获取
    getList(pramsObj, pageNo, pageSize) {
      this.listLoading = true;
      var obj = pramsObj;
      getListdata(obj, pageNo, pageSize)
        .then(res => {
          if (res.data.code === 1) {
            this.total = res.data.data.count;
            this.getListdata = res.data.data.list;
            this.pageNumber = res.data.data.pageNo;
            this.jumpPage = res.data.data.pageNo;
            this.pageSize = res.data.data.pageSize;
            if (res.data.data.list != undefined) {
              for (var a = 0; a < this.getListdata.length; a++) {
                this.getListdata[a].index = a + 1;
              }
            }
          }
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    //改变一页多少行
    handleSizeChange(val) {
      this.pageNumber = 1;
      this.jumpPage = 1;
      this.pageSize = val;
      var obj = {
        name: this.localSearch,
        orgId: this.mechanism
      };
      this.getList(obj, this.pageNumber, this.pageSize);
    },
    //改变当前页
    handleCurrentChange(val) {
      this.pageNumber = val;
      var obj = {
        name: this.localSearch,
        orgId: this.mechanism
      };
      this.getList(obj, this.pageNumber, this.pageSize);
    },
    //总数据删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false
      })
        .then(() => {
          var obj = {
            id: row.id
          };
          techDelet(obj)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                var obj = {
                  name: this.localSearch,
                  orgId: this.mechanism
                };
                this.getList(obj, this.pageNumber, this.pageSize);
              }
            })
            .catch(() => {});
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    //选择技师按钮
    orderTech() {
      if(this.userType =='org' || this.userType == 'station'){
        this.getseverStion('')
        var obj = {
          techName: "",
          techStationId: ""
        };
      }else{
        var obj = {
          techName: "",
          techStationId: "",
          orgId:this.mechanism1
        };
        this.getseverStion(this.mechanism1)        
      }       
      //服务技师获取
      orderServer(obj)
        .then(res => {
          if (res.data.code === 1) {
            this.listTech = res.data.data.techs;
            this.ordertech = true;
            if (this.dialogStatus == "add") {
              for (var b = 0; b < this.middleA.length; b++) {
                for (var a = 0; a < this.listTech.length; a++) {
                  if (this.listTech[a].techId == this.middleA[b].techId) {
                    this.listTech[a].techChecked = true;
                  }
                }
              }
            }
            if (this.dialogStatus == "edit") {
              for (var b = 0; b < this.middleB.length; b++) {
                for (var a = 0; a < this.listTech.length; a++) {
                  if (this.listTech[a].techId == this.middleB[b].techId) {
                    this.listTech[a].techChecked = true;
                  }
                }
              }
            }
          }
        })
        .catch(res => {});
        if (this.dialogStatus == "edit") {
          this.middleC = Object.assign([], this.middleB);
          for (var b = 0; b < this.middleB.length; b++) {
            for (var a = 0; a < this.listTech.length; a++) {
              if (this.listTech[a].techId == this.middleB[b].techId) {
                this.listTech[a].techChecked = true;
              }
            }
          }
        }
        if (this.dialogStatus == "add") {
          for (var d = 0; d < this.middleA.length; d++) {
            for (var e = 0; e < this.listTech.length; e++) {
              if (this.listTech[e].techId == this.middleA[d].techId) {
                this.listTech[e].techChecked = true;
              }
            }
          }
        }
      
    },
    //选择技师弹出层查询按钮
    searchTeh() {
      var obj = {
        techName: this.techName,
        techStationId: this.techStationId,
        orgId:this.mechanism1
      };
      //服务技师获取
      orderServer(obj)
        .then(res => {
          if (res.data.code === 1) {
            this.listTech = res.data.data.techs;
            if (this.dialogStatus == "add") {
              for (var b = 0; b < this.middleA.length; b++) {
                for (var a = 0; a < this.listTech.length; a++) {
                  if (this.listTech[a].techId == this.middleA[b].techId) {
                    this.listTech[a].techChecked = true;
                  }
                }
              }
            }
            if (this.dialogStatus == "edit") {
              for (var b = 0; b < this.middleB.length; b++) {
                for (var a = 0; a < this.listTech.length; a++) {
                  if (this.listTech[a].techId == this.middleB[b].techId) {
                    this.listTech[a].techChecked = true;
                  }
                }
              }
            }
          }
        })
        .catch(res => {});
    }
  },
  mounted() {
    this.getList({}, 1, 10);
    this.getoffice();
    this.userType=localStorage.getItem("type")
  }
};
</script>
<style  scoped>
.kill .el-select__tags .el-select .el-tag {
  line-height: 23px !important;
}
.selfTabProm {
  width: 100%;
  text-align: center;
  height: 200px;
  line-height: 200px;
}
.NowTabs{
  color:#576475;float:left;width:100%;font-size:14px;margin-top:15px;margin-bottom:10px;margin-left: 15px;
}
.techNameStyle {
  width: 74px;
  display:inline-block;
  /* height: 25px;
  line-height: 25px; */
  font-size:14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.techNameStyle1 {
  width: 90px;
  display:inline-block;
  font-size:14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.padBot20 {
  padding-bottom: 20px;
}
.width200 {
  width: 200px;
}
.width220 {
  width: 220px;
}
.width300 {
  width: 300px;
}
.selfMarLef10 {
  margin-left: 10px;
}
.selfInmpotInf {
  font-size: 12px;
  margin-top: 10px;
  color: red;
}
.selfFLORight {
  float: right;
  margin-top:2px;
  margin-right: 20px;
}
.selfpromMessageTab {
  position: relative;
  width: 100%;
  margin-top: 60px;
  margin-left: 10px;
}
.selfFLOLeft {
  float: left;
}
.width120 {
  width: 120px;
}
.height70 {
  height: 70px;
}
.selfFooter {
  text-align: center;
}
.selfTdStyle {
  background: #eef1f6;
  height: 46px;
  line-height: 46px;
  border: none !important;
}
.tableHeader {
  position: absolute;
  z-index: 99999;
  top: 0px;
  margin: 0px;
  margin-top: -1px;
}
.selfTdStyle1 {
  vertical-align: middle;
  height: 70px;
  line-height: 70px;
}
.selftechNameStyle {
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.skillMarginTop60 {
  margin-top: 44px;
}
.selftechStationNameStyle {
  width: 174px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.imgStyle {
  border: none;
  display: block;
}
.selfOVerflow {
  float: left;
  margin-top: 20px;
  width: 100%;
  margin-bottom: 20px;
  height: 300px;
  overflow-y: scroll;
}
.selfOVerflow1 {
  margin-top: 20px;
  overflow: hidden;
  width: 660px;
  height: 280px;
  position: relative;
}
.table-d {
  width: 677px;
  overflow-y: scroll;
  height: 276px;
  margin-left: 15px;
}
.selfst1 {
  background: none;
}
.selfst2 {
  float: left;
  width: 500px;
}
.selfst3 {
  margin-top: 30px;
}
.techPag {
  float: right;
  margin-top: 20px;
}
.showRules {
  font-size: 12px;
  color: red;
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: inline-block;
}
.active {
  background: #ddd;
}
.selfTable,
.selfTable tr th,
.selfTable tr td {
  border: 1px solid #eee;
}
.selfTable {
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
  padding: 2px;
}
.techWrap {
  border: 1px solid #ccc;
  border-top: none;
  margin-top: -23.5px;
  padding-top: 10px;
}
.tabWrap {
  width: 156px;
  padding: 0 5px;
  font-size: 12px;
  display: inline-block;
  height: 32px;
  text-align: center;
  line-height: 32px;
  margin:3px 0 3px 6px;
  background:#f0f4f5;
  color:#7a838a;
  font-size:14px;
  position: relative;
  border:1px solid #bfcbd9
}
.tabWrap1 {
  width: 84px;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
  padding: 0 5px;
  font-size: 12px;
  display: inline-block;
  height: 32px;
  text-align: center;
  line-height: 32px;
  margin:3px 0 3px 6px;
  background:#f0f4f5;
  color:#7a838a;
  position: relative;
  border:1px solid #bfcbd9
}
.self-el-close{
    border-radius: 50%;
    text-align: center;
    float: right;
    cursor: pointer;
    font-size: 12px;
    transform: scale(0.75, 0.75);
    height: 22px;
    width: 22px;
    line-height: 22px;
    vertical-align: middle;
    margin-top: 5px;
}
.self-el-close:hover {
  background:#6989F3;
  color:#fff;
}
.closePic {
  cursor: pointer;
  color: #bfcbd9;
  font-size: 12px;
  position: absolute;
  margin-left: 80px;
  top: 0px;
}
.closePic:hover {
  color: #333;
}
.bgWhite {
  background-color: #ffffff;
  padding: 20px;
}
.bgbot70 {
  padding-bottom: 70px;
}
.btn_pad {
  margin: 0px 0px 20px 20px;
}

.btn_right {
  float: right;
}

.tech-order-jnsk {
  width: 300px;
  height: 36px;
  border: 1px solid #bfcbd9;
  position: relative;
  line-height: 36px;
}

.tech-order-btnsk {
  color: #4c70e8;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 10px;
}
.skill-delte {
  border: none;
  background: none;
  width: 100px;
  height: 50px;
  color: red;
  outline: none;
  cursor: pointer;
}

.role-table {
  list-style: none;
  border: 1px solid #e0e0e0;
  border-bottom: none;
  padding: 0;
  position: relative;
}

.header {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e7e7e7;
  background: #f8f8f9;
  text-align: center;
}

.vertical-line {
  width: 1px;
  height: 100%;
  background: #ddd;
  position: absolute;
  left: 30%;
  top: 0;
}

.left {
  width: 30%;
  float: left;
  padding-left: 10px;
  text-align: left;
  user-select: none;
  cursor: pointer;
}

.one {
  padding-left: 20px;
}

.right {
  width: 70%;
  float: left;
  padding-left: 10px;
}

.item-icon {
  margin-left: -5px;
  padding: 5px;
}

.line {
  clear: both;
  width: 100%;
  height: 1px;
  background: #e0e0e0;
}
.h40 {
  height: 39px;
  line-height: 39px;
}
[v-cloak] {
  display: none;
}
</style>

