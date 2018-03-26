<template>
<div>
  <!-- 搜索开始 -->
    <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width:30%;margin-right:2%" placeholder="请输入搜索内容" v-model="search.val">
        <el-select  clearable slot="prepend" style="width:90px" v-model="search.type" placeholder="请选择">
          <el-option v-for="item in seOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-input>

    <el-date-picker
      v-model="search.time"
      style="width:20%"
      type="daterange"
      placeholder="选择日期">
    </el-date-picker>
      
    </el-date-picker>
       <button class="button-large el-icon-search btn_search btn-color" @click="handleFilter"> 搜索</button>
    </div>
    <!-- 搜索结束 -->
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <el-table 
      :key='tableKey' 
      :data="list" 
      v-loading="listLoading" 
      element-loading-text="正在加载" 
      fit 
      tooltip-effect='light'
      highlight-current-row 
      style="width: 100%">

      <el-table-column align="center" label="编号"  width="100">
         <template scope="scope">
            {{scope.row.index + (pageNumber-1) * pageSize}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="姓名" prop="techName">      
      </el-table-column>
      
      <el-table-column align="center" label="手机号" prop="techPhone">      
      </el-table-column>
      
      <el-table-column align="center" label="服务站" prop="techStationName">      
      </el-table-column>
      
      <el-table-column align="center" label="开始时间" prop="startTime">     
      </el-table-column>
      
      <el-table-column align="center" label="结束时间" prop="endTime">      
      </el-table-column>
      
      <el-table-column align="center" :show-overflow-tooltip="true" width="150px" label="备注">      
        <template scope="scope">
           <el-tooltip placement="left" :disabled="scope.row.remark.length < 10" :content="scope.row.remark">
             <div class="tool" >{{scope.row.remark}}</div>
           </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="180">
        <template scope="scope">
          <!-- <el-button class="ceshi3" v-if="btnShow.indexOf('holiday_delete') >= 0" @click="handleCheck(scope.row)">审核</el-button> -->
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

          <el-form-item label="审核休假:" prop="reviewStatus">
            <el-select class="form_item"  v-model="temp.reviewStatus">
              <el-option v-for="item in holidayState" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="temp.reviewStatus == 'no'" label="未通过原因:" prop="failReason">
            <el-input 
            class="form_item"
              type="textarea" 
              :rows="2" 
              placeholder="请输入0 - 100 字休假未通过原因"
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
import { getHoliday, delHoliday } from "@/api/tech";
import util from "@/utils/date";
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "holiday",
  directives: {
    waves
  },
  data() {
    return {
      btnShow: JSON.parse(localStorage.getItem("btn")),
      list: [],
      total: null,
      listLoading: true,
      dialogForm: false,
      btnState: false,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined
      },
      pageNumber: 1,
      pageSize: 10,
      total: 1,
      search: {
        type: "techName",
        val: "",
        time: ""
      },
      temp: {
        reviewStatus: "",
        failReason: ""
      },
      rules: {
        reviewStatus: [
          { required: true, message: "请选择审核状态", trigger: "change" }
        ],
        failReason: [
          { required: true, message: "请填写休假未通过原因", trigger: "blur" },
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
    this.getList();
  },
  methods: {
    //请求列表数据
    getList() {
      var obj = {};
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
      getHoliday(obj, this.pageNumber, this.pageSize)
        .then(res => {
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
            this.listLoading = false;
          } else {
            this.listLoading = false;
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
    handleCheck() {
      this.dialogForm = true;
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
          checkHoliday(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code === 1) {
                this.resetTemp();
                this.$message({
                  type: "success",
                  message: "审核成功"
                });
                this.resetSearch();
                this.handleFilter();
                this.dialogForm = false;
              } else {
              }
            })
            .catch(err => {
              this.btnState = false;
            });
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
    resetForm(formName) {
      this.dialogForm = false;
      this.resetTemp();
      this.$refs[formName].resetFields();
    },
    resetTemp() {
      this.temp = {
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
  width: 115px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
