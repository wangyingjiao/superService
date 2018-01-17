<template>
  <div class="box">
    <!-- 技能搜索开始 -->
    <div class="filter-container bgWhite padBot20">
      <el-input  class="search" placeholder="请输入搜索的技能名称" v-model="localSearch"></el-input>
      <button @click="search" class="search-button btn_search el-icon-search"> 搜索</button>
    </div>
    <!-- 技能搜索结束-->
    <!-- 技能列表展示开始 -->
    <div class="app-container calendar-list-container">
      <div class="">
        <div class="bgWhite bgbot70" >
          <button class="button-small btn_pad" v-if="btnShow.indexOf('skill_insert') != -1" @click="add('add')">新增</button>
          <div style="padding-top:15px;">
              <el-table  :data="getListdata" v-loading="listLoading"  highlight-current-row element-loading-text="正在加载"
                style="width: 100% ;">
                      <el-table-column align="center" label="编号" width="100">
                          <template scope="scope">
                            {{scope.row.index+(pageNumber-1)*pageSize}}
                          </template>
                      </el-table-column>
                      <el-table-column label="技能名称" align="center" prop="name"></el-table-column>
                      <el-table-column label="技师个数" align="center" prop="techNum"> </el-table-column>
                      <el-table-column align="center" label="操作" min-width="100px">
                        <template scope="scope">
                            <el-button class="el-icon-edit"  v-if="btnShow.indexOf('skill_update') != -1" @click="add('edit',scope.row)"></el-button>
                            <el-button class="el-icon-delete" v-if="btnShow.indexOf('skill_delete') != -1" @click="handleDelete(scope.row)"></el-button>
                        </template>
                      </el-table-column>
              </el-table>
              <div v-if="!listLoading" class="pagination-container techPag">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync='jumpPage'
                  layout="total, sizes, prev, pager, next, jumper" :page-size="pageSize" :page-sizes="[5,10,15,20]" :total="total">
                </el-pagination>
              </div>
          </div>          
        </div>
        <!-- 技能列表展示结束 -->
        <!-- 弹出层新增技能开始 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" :modal-append-to-body="false" :close-on-click-modal="false">
          <el-form :model="ruleForm2" 
             :rules="rules" 
             ref="ruleForm2" 
             label-width="160px" 
             class="demo-ruleForm dia_form" 
             label-position="left">
            <el-form-item label="技能名称" prop="name">
              <el-input  v-model.trim="ruleForm2.name"  class="form_item"  placeholder="请输入2-15位技能名称"></el-input>
            </el-form-item>
            <!-- @change="testChange" -->
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
            <el-form-item label="选择技师" prop="technicians" class="selfst3">
             <div class="tech-order-jnsk selfst2 form_item" style="width:100%">
                  <div class="tech-order-btnsk selfst1"  @click="orderTech"> &#10010 请选择</div>
            </div>
            </el-form-item>
            <el-form-item label="">
                  <div v-if="tabOptions.length !=0" class="techWrap">
                      <div class="tabWrap" v-for="item in tabOptions" :key="item.techId">
                        <div class="techNameStyle">{{item.techName}}</div>
                        <div class="closePic" @click="selfErrorClose(item)">&#10005</div>
                      </div>                     
                  </div> 
             
            </el-form-item>           
          </el-form>    
          <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button  class="button-large"  :disabled="submitFlag"  @click="submitForm('ruleForm2')">保存</button>
              <button class="button-cancel"  @click="resetForm('ruleForm2')">取消</button>
          </div>          
        </el-dialog>
        <!-- 弹出层新增技能结束 -->
        <!-- 选择技师弹出层开始 -->
        <el-dialog title="选择服务人员" :visible.sync="ordertech" :modal="false" :modal-append-to-body="false" :close-on-click-modal="false" class="selfDialogWidth">
              <div class="selfFLOLeft width120">
                <el-input placeholder="输入要搜索的姓名" v-model="techName"  style="margin-left:15px;width:180px;"></el-input>                
              </div>
              <div class="selfFLOLeft">
                <el-select clearable placeholder="请选择服务站" filterable v-model="techStationId" style="margin-left:95px;">
                  <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div  class="selfFLORight"><button class="button-large" @click="searchTeh">查询</button></div>
              <el-collapse-transition>
                <div class="selfpromMessageTab" v-if="middleA.length !=0 || middleB.length !=0">                    
                    <div v-if="dialogStatus == 'add'" class="tabWrap1" v-for="item in middleA" :key="item.techId">
                      <div class="techNameStyle">{{item.techName}}</div>
                    </div>                    
                    <div v-if="dialogStatus == 'edit'" class="tabWrap1" v-for="item in middleB" :key="item.techId">
                      <div class="techNameStyle">{{item.techName}}</div>
                    </div>                                              
                </div>
              </el-collapse-transition>                           
              <div class="selfFLOLeft selfOVerflow1">
                    <div class="table-d">
                      <table  class="selfTable">
                          <tr class="tableHeader">
                            <td  class="selfTdStyle" align="center" width="73px">选择</td>
                            <td  class="selfTdStyle"  align="center" width="128px">头像</td>
                            <td  class="selfTdStyle"  align="center" width="150px">姓名</td>
                            <td  class="selfTdStyle"  align="center" width="73px">性别</td>
                            <td  class="selfTdStyle"  align="center" width="200px">服务站</td>							
                          </tr>                
                        <div style="margin-top:60px;">
                          <tr v-for="item in listTech" :key="item.techId"  ref="tableItem1" class="selfTdStyle1">
                            <td   width="72px" align="center"><el-checkbox   v-model="item.techChecked" @change="testTech(item)"></el-checkbox></td>
                            <td  width="127px"  align="center"><img class="imgStyle" :src="imgSrc+item.headPic+picWidth60"/></td>
                            <td  width="152px" align="center"><div class="selftechNameStyle">{{item.techName}}</div></td>
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
                  <button class="button-large"   @click="submitForm2()">保存</button>
                  <button  class="button-cancel"  @click="resetForm2()">取消</button>
                  <!-- <button v-if="dialogStatus == 'edit'" v-if="dialogStatus == 'add'" class="button-cancel"  @click="resetForm2()">关闭</button> -->
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
} from "@/api/skill";
//挂载数据
export default {
  name: "",
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
      Options2: [],
      submitFlag: false,
      jumpPage: 1,
      title: "新增技能",
      btnShow: JSON.parse(localStorage.getItem('btn')),
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
        staffClass: [
          { required: true, type: "array", message: "请选择分类", trigger: "change" }
        ]
      },
      ruleForm2: {
        name: "",
        staffClass: [], //选择分类下拉对象
        technicians: []
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
      listLoading: false,
      dialogVisible: false,
      flagserver: false,
      dialogFormVisible: false,
      dialogStatus: "add",
      id: "",
      promInf1: "搜索内容不存在!",
      middleA: [],
      middleB: [],
      middleC: []
    };
  },
  methods: {
    //全局搜索按钮
    search() {
      var obj = {
        name:this.localSearch
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
    //全局新增按钮
    add(status, row) {
      var obj = {};
      this.middleA = [];
      this.middleB = [];
      this.listLoading = true;
      this.dialogStatus = status;
      this.tabOptions = [];
      if (this.dialogStatus == "add") {
        this.title = "新增技能";
        //新增操作
        this.id = "";
        //服务技师与分类、服务站获取
        orderServer(obj)
          .then(res => {
            if (res.data.code === 1) {
              this.Options2 = res.data.data.list;
              this.options = res.data.data.stations;
              this.listTech = res.data.data.techs;
              this.dialogVisible = true;
              this.listLoading = false;
            } else {
              this.listLoading = false;
              this.dialogVisible = false;
              this.$message({
                type: "error",
                message: "请求错误！"
              });
            }
          })
          .catch(res => {});
      } else if (this.dialogStatus == "edit") {
        this.title = "编辑技能";
        //编辑操作
        this.id = row.id;
        var obj = {
          id: this.id
        };
        editTech(obj)
          .then(res => {
            if (res.data.code === 1) {
              this.listTech = res.data.data.techs;
              this.options = res.data.data.stations;
              this.Options2 = res.data.data.list;
              this.listLoading = false;
              this.dialogVisible = true;
              this.ruleForm2.name = res.data.data.info.name;
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
              this.$message({
                type: "error",
                message: "请求错误！"
              });
            }
          })
          .catch(res => {});
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
          this.saveFlag=true;
          var obj = {
            id: this.id,
            name: this.ruleForm2.name,
            technicians: this.ruleForm2.technicians,
            sortIds: this.ruleForm2.staffClass
          };
          if (this.dialogStatus == "add") {
            saveServer(obj)
              .then(res => {
                this.dialogVisible = false;
                if (res.data.code === 1) {
                  this.$message({
                    type: "success",
                    message: "新增成功!"
                  });
                  this.saveFlag=false;
                  this.$refs["ruleForm2"].resetFields();
                  this.ruleForm2.name = "";
                  this.ruleForm2.staffClass=[];
                  this.middleA = [];
                  this.middleB = [];
                  this.localSearch = "";
                  var obj1 = {};
                  this.listLoading = false;
                  this.pageNumber = 1;
                  this.jumpPage = 1;
                  this.getList(obj1, this.pageNumber, this.pageSize);
                } else {
                  this.$refs["ruleForm2"].resetFields();
                  this.middleA = [];
                  this.middleB = [];
                  this.$message({
                    type: "warning",
                    message: res.data.data
                  });
                }
              })
              .catch(res => {
                this.listLoading = false;
                this.saveFlag=false;
              });
          }
          if (this.dialogStatus == "edit") {
            upDataTech(obj)
              .then(res => {
                this.saveFlag=false;
                if (res.data.code === 1) {
                  this.$message({
                    type: "success",
                    message: "编辑成功!"
                  });
                  
                  this.$refs["ruleForm2"].resetFields();
                  this.ruleForm2.name = "";
                  this.ruleForm2.staffClass=[];
                  this.middleA = [];
                  this.middleB = [];
                  this.dialogVisible = false;
                  var obj1 = {
                    name: this.localSearch
                  };
                  this.listLoading = false;
                  this.getList(obj1, this.pageNumber, this.pageSize);
                } else {
                  this.$message({
                    type: "warning",
                    message: res.data.data
                  });
                }
              })
              .catch(res => {
                this.listLoading = false;
                this.dialogVisible = false;
              });
          }
        } else {
          return false;
        }
      });
    },
    //新增或编辑弹窗cancel
    resetForm(formName) {
      if (this.dialogStatus == "add") {
        this.$refs[formName].resetFields();
        this.ruleForm2.name = "";
        this.ruleForm2.staffClass=[];
      }
      if (this.dialogStatus == "edit") {
        this.$refs[formName].resetFields();
        this.ruleForm2.name='';
        this.ruleForm2.staffClass=[];
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
        this.tabOptions = arr;
        this.middleA=arr
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
        this.tabOptions=[];
        this.middleA=[];
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
      this.ordertech = false;
    },
    //表格数据获取
    getList(pramsObj, pageNo, pageSize) {
      this.listLoading = true;
      var obj = pramsObj;
      getListdata(obj, pageNo, pageSize)
        .then(res => {
          if (res.data.code === 1) {
            this.getListdata = res.data.data.list;
            if (res.data.data.list != undefined) {
              for (var a = 0; a < this.getListdata.length; a++) {
                this.getListdata[a].index = a + 1;
              }
            }
            this.total = res.data.data.count;
          }
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    handleSizeChange(val) {
      this.pageNumber=1;
      this.jumpPage=1;
      this.pageSize = val;
      var obj = {
        name: this.localSearch
      };
      this.getList(obj, this.pageNumber, this.pageSize);
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      var obj = {
        name: this.localSearch
      };
      this.getList(obj, this.pageNumber, this.pageSize);
    },
    //总数据删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
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
                  name: this.localSearch
                };
                this.getList(obj, this.pageNumber, this.pageSize);
              } else {
                this.$message({
                  type: "warning",
                  message: res.data.data
                });
              }
            })
            .catch(() => console.log("未知错误"));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //选择技师按钮
    orderTech() {
      this.ordertech = true;      
      var obj = {
        techName: "",
        techStationId: ""
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
        techStationId: this.techStationId
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
    this.getList();
  }
};
</script>
<style  scoped>
.kill .el-select__tags .el-select .el-tag{
  line-height:23px !important;
}
.selfTabProm {
  width: 100%;
  text-align: center;
  height: 200px;
  line-height: 200px;
}
.techNameStyle {
  width: 80px;
  height: 25px;
  line-height: 25px;
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
  margin-right:20px;
}
.selfpromMessageTab{
    position:relative;width:100%;margin-top:60px;margin-left:10px;
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
  margin-top: 30px;
}
.selfTdStyle {
  background: #eef1f6;
  height: 60px;
  line-height:60px;
  border:none !important;
}
.tableHeader{position:absolute;z-index:99999;top:0px;margin:0px;margin-top:-1px;}
.selfTdStyle1 {
  vertical-align:middle;
  height: 70px;
  line-height:70px;
}
.selftechNameStyle{
    width:130px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;
}
.selftechStationNameStyle{
    width:174px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;
}
.imgStyle {
  border:none;
  display:block;
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
  margin-bottom: 20px;
  height: 300px;
  position:relative;
}
.table-d{
  width: 677px;
  overflow-y: scroll;
  height: 300px;
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
  width: 100px;
  margin-right: 20px;
  margin-left: 10px;
  font-size: 12px;
  display: inline-block;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 12px;
  border: 1px solid #bfcbd9;
  position: relative;
}
.tabWrap1 {
  width: 80px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top:5px;
  font-size: 12px;
  display: inline-block;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 12px;
  border: 1px solid #bfcbd9;
  position: relative;
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

