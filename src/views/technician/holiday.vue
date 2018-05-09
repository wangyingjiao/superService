<template>
<div>
  <!-- 搜索开始 -->
    <div class="filter-container tabStyle tabStyle2">
    <!-- 选项卡 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="待审核" name="submit"></el-tab-pane>
      <el-tab-pane label="审核通过" name="yes"></el-tab-pane>
      <el-tab-pane label="审核未通过" name="no"></el-tab-pane>
    </el-tabs>

      
      <el-input @keyup.enter.native="handleFilter" style="width:30%;margin-right:2%" placeholder="请输入搜索内容" v-model="search.val">
        <el-select  clearable slot="prepend" style="width:90px" v-model="search.type" placeholder="请选择">
          <el-option v-for="item in seOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-input>

    <el-date-picker
      v-model="search.time"
      class="search-min"
      type="daterange"
      placeholder="选择日期">
    </el-date-picker>
      
    </el-date-picker>
    <el-select filterable  class="search-min" clearable @change="searchOffice"  v-model="search.officeId" placeholder="选择机构">
        <el-option v-for="item in mechanismCheck" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
       
      <el-select filterable class="search-min" clearable  v-model="search.stationId" placeholder="选择服务站">
        <el-option v-for="item in servicestationSearch" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
       <button class="button-large el-icon-search btn_search btn-color" @click="handleFilter"> 搜索</button>
    </div>
    <!-- 搜索结束 -->
  <div class="app-container calendar-list-container">
    <p class="bgWhite">
    <el-table 
      :key='tableKey' 
      :data="list" 
      v-loading="listLoading" 
      element-loading-text="正在加载" 
      fit 
      tooltip-effect='light'
      highlight-current-row 
      style="width: 100%">

      <el-table-column align="center" label="编号"  width="70">
         <template scope="scope">
            {{scope.row.index + (pageNumber-1) * pageSize}}
        </template>
      </el-table-column>
      <el-table-column v-if="userType =='sys'||userType =='platform'" min-width="150" align="center"  :render-header="renderHeader">
            <template scope="rowObj">
               <el-tooltip placement="left" :disabled="rowObj.row.orgName.length < 10" :content="rowObj.row.orgName">
                 <p :class="rowObj.row.orgName.length < 10 ? '' : 'overheidden'" >{{rowObj.row.orgName}}</p>
               </el-tooltip>
               <el-tooltip placement="left" :disabled="rowObj.row.techStationName.length < 10" :content="rowObj.row.techStationName">
                 <p :class="rowObj.row.techStationName.length < 10 ? '' : 'overheidden'" >{{rowObj.row.techStationName}}</p>
               </el-tooltip>
            </template>
      </el-table-column>
      
      <el-table-column  v-if="userType == 'org'" align="center" min-width="150" label="服务站">  
        <template scope="scope">
          <el-tooltip placement="left" :disabled="scope.row.techStationName.length < 10" :content="scope.row.techStationName">
                 <p :class="scope.row.techStationName.length < 10 ? '' : 'overheidden'" >{{scope.row.techStationName}}</p>
           </el-tooltip>
        </template>    
      </el-table-column>

      <el-table-column align="center" label="姓名" min-width="140" > 
        <template scope="rowObj">
             <el-tooltip placement="left" :disabled="rowObj.row.techName.length < 10" :content="rowObj.row.techName">
               <p :class="rowObj.row.techName.length < 10 ? '' : 'overheidden'" >{{rowObj.row.techName}}</p>
             </el-tooltip>
          </template>          
      </el-table-column>
      <el-table-column align="center" label="手机号" min-width="110" prop="techPhone">      
      </el-table-column>

      
      <el-table-column align="center" label="开始时间" min-width="150" prop="startTime">     
      </el-table-column>
      
      <el-table-column align="center" label="结束时间" min-width="150" prop="endTime">      
      </el-table-column>

      <el-table-column align="center" label="审核状态" min-width="100" prop="reviewStatus">  
        <template scope="scope">
           <span v-if="scope.row.reviewStatus=='submit'">待审核</span>
           <span v-if="scope.row.reviewStatus=='yes'">审核通过</span>
           <span v-if="scope.row.reviewStatus=='no'">不通过</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="来源" min-width="80" prop="source">   
        <template scope="scope">
           <span v-if="scope.row.source=='sys'">系统</span>
           <span v-if="scope.row.source=='app'">App</span>
        </template>   
      </el-table-column>
      
      <el-table-column align="center" :show-overflow-tooltip="true" min-width="150" label="备注">      
        <template scope="scope">
           <el-tooltip placement="left" :disabled="scope.row.remark.length < 10" :content="scope.row.remark">
             <div :class="scope.row.remark.length < 10 ? '' : 'overheidden'" >{{scope.row.remark}}</div>
           </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="180">
        <template scope="scope">
          <el-button class="ceshi3" v-if="btnShow.indexOf('holiday_review') >= 0 && scope.row.status == 'yes'" @click="handleCheck(scope.row)">审核</el-button>
          <el-button class="ceshi3" v-if="btnShow.indexOf('holiday_delete') >= 0" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页器 -->
    <div v-if="!listLoading" class="pagination-container clearfix">
      <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 弹窗 -->
    <el-dialog 
      title="审核休假"
      :visible.sync="dialogForm" 
      :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
       >
          <el-form        
            class="small-space dia_form" 
            ref="temp" 
            :rules="rules" 
            :model="temp" 
            label-position="left" 
            label-width="100px"
            >
          <el-form-item v-if="failReasonState" label="未通过原因:">
            <p style="width:100%;word-wrap:break-word;font-size: 12px;color: #8391a5;">{{temp.failReason}}</p>
          </el-form-item>
          <el-form-item label="审核休假:" prop="reviewStatus">
            <el-select class="form_item"  v-model="temp.reviewStatus" >
              <el-option v-for="item in holidayState" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="temp.reviewStatus == 'no'&& !failReasonState" label="未通过原因:" prop="failReason">
            <el-input 
            class="form_item"
              type="textarea" 
              :rows="2" 
              placeholder="请输入1 - 100 位未通过原因"
              v-model="temp.failReason"></el-input>
          </el-form-item>

         
          </el-form>
      
      <div slot="footer" class="dialog-footer" style="text-align: center;">   
        
        <button class="button-large" :disabled="btnState" @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>
    <!-- 弹框结束 -->

  </div>
  </div>
</div>
</template>

<script>
import {
  getHoliday,
  delHoliday,
  getHolidayById,
  reviewedHoliday
} from "@/api/tech";
import { getMenudata, getSList, getStation, getFuwu } from "@/api/staff"; //接口调用
import util from "@/utils/date";
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "holiday",
  directives: {
    waves
  },
  data() {
    return {
      btnShow: [],
      checkState: true, //审核按钮状态
      list: [],
      total: null,
      listLoading: true,
      dialogForm: false,
      btnState: false,
      failReasonState: false,
      activeName: "",
      userType: localStorage.getItem("type"),
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined
      },
      pageNumber: 1,
      pageSize: 10,
      total: 1,
      mechanismCheck: [], //服务机构
      servicestationSearch: [], // 服务站
      data2: [],
      search: {
        type: "techName",
        val: "",
        time: "",
        officeId: "",
        stationId: ""
      },
      temp: {
        rowId: "",
        reviewStatus: "",
        failReason: ""
      },
      rules: {
        reviewStatus: [
          { required: true, message: "请选择审核状态", trigger: "change" }
        ],
        failReason: [
          {
            required: true,
            message: "请输入1 - 100位未通过原因",
            trigger: "blur"
          },
          {
            min: 0,
            max: 100,
            message: "未通过原因长度不超过100个字符",
            trigger: "blur"
          }
        ]
      },
      seOptions: [
        { label: "姓名", value: "techName" },
        { label: "手机号", value: "techPhone" }
      ],
      holidayState: [
        { label: "通过", value: "yes" },
        { label: "不通过", value: "no" }
      ],
      tableKey: 0,
      isIndeterminate: true
    };
  },
  created() {
    this.activeName = "all";
    if (JSON.parse(localStorage.getItem("btn"))) {
      this.btnShow = JSON.parse(localStorage.getItem("btn"));
    }
    getMenudata().then(res => {
      this.data2 = res.data.data;
    });
    getSList({}).then(res => {
      // 服务机构
      if (res.data.data.list != undefined) {
        if (res.data.data.list[0].id == "0") {
          res.data.data.list.remove(res.data.data.list[0]);
        }
        if (res.data.data.list.length >= 2) {
          if (res.data.data.list[1].id == "0") {
            res.data.data.list.remove(res.data.data.list[1]);
            res.data.data.list.remove(res.data.data.list[0]);
          }
        }
        this.mechanismCheck = res.data.data.list;
        if (
          localStorage.getItem("type") == "station" ||
          localStorage.getItem("type") == "org"
        ) {
          this.search.officeId = this.mechanismCheck[0].id;
        }
      }
    });
    this.getList();
  },
  methods: {
    aaa(obj) {},
    renderHeader(h) {
      return [h("p", {}, ["服务机构"]), h("p", {}, ["服务站"])];
    },
    searchOffice(val) {
      // 搜索时机构改变
      this.search.stationId = "";
      this.servicestationSearch = [];
      if (val) {
        var obj = {
          orgId: val
        };
        getFuwu(obj).then(res => {
          // 请求服务站列表
          if (res.data.data[0].id == "0") {
            res.data.data.remove(res.data.data[0]);
          }
          this.servicestationSearch = res.data.data;
          if (localStorage.getItem("type") == "station") {
            this.search.stationId = this.servicestationSearch[0].id;
          }
        });
      }
    },
    //请求列表数据
    getList() {
      this.listLoading = true;
      var obj = {
        reviewStatus: this.activeName
      };
      if (this.search.time[0]) {
        var startTime = util.formatDate.format(
          new Date(this.search.time[0]),
          "yyyy-MM-dd hh:mm:ss"
        );
        var start = {
          startTime: startTime
        };
        obj = Object.assign(obj, start);
      }
      if (this.search.time[1]) {
        var endTime = util.formatDate.format(
          new Date(this.search.time[1]),
          "yyyy-MM-dd 23:59:59"
        );
        var end = {
          endTime: endTime
        };
        obj = Object.assign(obj, end);
      }
      if (this.search.type == "techName") {
        var name = {
          techName: this.search.val
        };
        obj = Object.assign(obj, name);
      } else if (this.search.type == "techPhone") {
        var phone = {
          techPhone: this.search.val
        };
        obj = Object.assign(obj, phone);
      } else {
        var newobj = {};
        obj = Object.assign(obj, newobj);
      }
      if (obj.reviewStatus == "all") {
        obj.reviewStatus = "";
      }
      obj = Object.assign(obj, {
        orgId: this.search.officeId,
        techStationId: this.search.stationId
      });
      getHoliday(obj, this.pageNumber, this.pageSize)
        .then(res => {
          this.$nextTick(() => {
            this.listLoading = false;
          });
          if (res.data.code == 1) {
            this.total = res.data.data.count;
            this.list = res.data.data.list;
            this.pageNumber = res.data.data.pageNo;
            this.pageSize = res.data.data.pageSize;
            this.listQuery.page = res.data.data.pageNo;
            if (this.list != undefined) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].index = i + 1;
              }
            }
          }
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    // 搜索
    handleFilter() {
      this.listLoading = true;
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.getList();
    },
    // 切换条数
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.pageSize = val;
      this.getList();
    },
    // 切换页数
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getList();
    },
    handleCheck(row) {
      this.temp.rowId = row.id;
      if (row.reviewStatus == "yes") {
        this.temp.reviewStatus = "yes";
        this.dialogForm = true;
      } else if (row.reviewStatus == "no") {
        this.listLoading = true;
        this.temp.reviewStatus = "";
        getHolidayById({ id: row.id })
          .then(res => {
            this.listLoading = false;
            if (res.data.code == "1") {
              this.holidayState = [{ label: "通过", value: "yes" }];
              this.temp.failReason = res.data.data.failReason;
              this.failReasonState = true;
              this.dialogForm = true;
            }
          })
          .catch(err => {
            this.listLoading = false;
          });
      } else {
        this.dialogForm = true;
      }
    },
    // 删除
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
          delHoliday(obj)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList();
              }
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "删除失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          if (this.temp.reviewStatus == "yes") {
            this.$confirm(
              "审核通过后不可再修改其审核状态，是否继续？",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnClickModal: false
              }
            )
              .then(() => {
                var obj = {
                  id: this.temp.rowId,
                  reviewStatus: this.temp.reviewStatus
                };
                if (obj.reviewStatus == "no") {
                  obj.failReason = this.temp.failReason;
                }
                reviewedHoliday(obj)
                  .then(res => {
                    this.btnState = false;
                    if (res.data.code === 1) {
                      this.resetForm(formName);
                      this.$message({
                        type: "success",
                        message: "审核成功"
                      });
                      this.getList();
                      this.dialogForm = false;
                    } else {
                    }
                  })
                  .catch(err => {
                    this.btnState = false;
                  });
              })
              .catch(() => {
                this.btnState = false;
              });
          } else {
            var obj = {
              id: this.temp.rowId,
              reviewStatus: this.temp.reviewStatus,
              failReason: this.temp.failReason
            };
            reviewedHoliday(obj)
              .then(res => {
                this.btnState = false;
                if (res.data.code === 1) {
                  this.resetTemp();
                  this.$refs[formName].resetFields();
                  this.$message({
                    type: "success",
                    message: "审核成功"
                  });
                  this.getList();
                  this.dialogForm = false;
                } else {
                }
              })
              .catch(err => {
                this.btnState = false;
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
    handleClick() {
      this.getList();
    },
    resetForm(formName) {
      this.holidayState = [
        { label: "通过", value: "yes" },
        { label: "不通过", value: "no" }
      ];
      this.resetTemp();
      this.$refs[formName].resetFields();
      this.failReasonState = false;
      this.dialogForm = false;
    },
    resetTemp() {
      this.temp = {
        rowId: "",
        reviewStatus: "",
        failReason: ""
      };
    },
    resetSearch() {
      this.search = {
        type: "techName",
        val: "",
        time: ""
      };
    }
  }
};
</script>
<style>
.btn_right {
  float: right;
  width: 100px;
}
.btn_left {
  width: 100px;
}
.ele-date {
  margin: 0 10px;
}
.bottom0 {
  margin-bottom: 0px;
}
.bgWhite {
  background-color: #ffffff;
  padding: 20px 20px 20px 20px;
}
.tool {
  width: 121px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tabStyle2 .el-input {
  margin-left: 0px;
  margin-bottom: 0px;
}
.tabStyle2 .el-input-group {
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>
