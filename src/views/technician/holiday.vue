<template>
<div>
    <div class="filter-container bgWhite">
   

      <el-select  clearable class="search" v-model="search.type" placeholder="请选择">
        <el-option v-for="item in seOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-input @keyup.enter.native="handleFilter" class="search" placeholder="请输入搜索内容" v-model="search.val">
      </el-input>

      <el-date-picker
      v-model="search.startTime"
      style="width:20%"
      format
      type="datetime"
      placeholder="年/月/日/时间">
    </el-date-picker>
    至
      <el-date-picker
      v-model="search.endTime"
      style="width:20%"
      class="search"
      type="datetime"
      placeholder="年/月/日/时间">
    </el-date-picker>
       <button class="button-large el-icon-search btn_search" @click="handleFilter"> 搜索</button>
    </div>
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

      <el-table-column align="center" label="编号" type="index" width="100">
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
      
      <el-table-column align="center" :show-overflow-tooltip="true" width="200px" label="备注" prop="remark">      
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button class="el-icon-delete ceshi3" v-if="btnShow.indexOf('holiday_delete') >= 0" @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
  </div>
</div>
</template>

<script>
import { getHoliday, delHoliday } from "@/api/tech";
import util from "@/utils/date";
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "table_demo",
  directives: {
    waves
  },
  data() {
    return {
      btnShow: this.$store.state.user.buttonshow,
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 6,
        title: undefined,
        type: undefined
      },
      pageNumber: 1,
      pageSize: 10,
      total: 1,
      search: {
        type: "",
        val: "",
        startTime: "",
        endTime: ""
      },
      seOptions: [
        { label: "姓名", value: "techName" },
        { label: "手机号", value: "techPhone" }
      ],
      tableKey: 0,
      isIndeterminate: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getHoliday({},this.pageNumber,this.pageSize).then(res => {
        console.log(res,"休假列表");
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleFilter() {
      var obj = {};
      //console.log(this.search.startTime)
      if (this.search.startTime) {
        var startTime = util.formatDate.format(
          new Date(this.search.startTime),
          "yyyy-MM-dd hh:mm:ss"
        );
        var start = {
          startTime: startTime
        };
        obj = Object.assign(obj, start);
        console.log(start);
      }
      if (this.search.endTime) {
        var endTime = util.formatDate.format(
          new Date(this.search.endTime),
          "yyyy-MM-dd hh:mm:ss"
        );
        var end = {
          endTime: endTime
        };
        obj = Object.assign(obj, end);
        console.log(end);
      }
      if (this.search.type == "techName") {
        var name = {
          techName: this.search.val
        };
        obj = Object.assign(obj, name);
      } else if(this.search.type == "techPhone"){
        var phone = {
          techPhone: this.search.val
        }
        obj = Object.assign(obj, phone);
      }else{
        var newobj = {
        }
        obj = Object.assign(obj, newobj);
      }

      console.log(obj,'搜索参数')
      this.listLoading = true;
      getHoliday(obj, this.pageNumber, this.pageSize).then(res => {
        console.log(res,"搜索")
        if (res.data.code == 1) {
          this.listQuery.page = 1;
          this.list = res.data.data.list;
          this.total = res.data.data.count;
          this.listLoading = false;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      var obj = {};
      //console.log(this.search.startTime)
      if (this.search.startTime) {
        var startTime = util.formatDate.format(
          new Date(this.search.startTime),
          "yyyy-MM-dd hh:mm:ss"
        );
        var start = {
          startTime: startTime
        };
        obj = Object.assign(obj, start);
        console.log(start);
      }
      if (this.search.endTime) {
        var endTime = util.formatDate.format(
          new Date(this.search.endTime),
          "yyyy-MM-dd hh:mm:ss"
        );
        var end = {
          endTime: endTime
        };
        obj = Object.assign(obj, end);
        console.log(end);
      }
      if (this.search.type == "techName") {
        var name = {
          techName: this.search.val
        };
        obj = Object.assign(obj, name);
      } else if(this.search.type == "techPhone"){
        var phone = {
          techPhone: this.search.val
        }
        obj = Object.assign(obj, phone);
      }else{
        var newobj = {
        }
        obj = Object.assign(obj, newobj);
      }
      this.listLoading = true;
      getHoliday(obj, this.pageNumber, this.pageSize).then(res => {
        if (res.data.code == 1) {
          this.list = res.data.data.list;
          this.total = res.data.data.count;
          this.listLoading = false;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      var obj = {};
      //console.log(this.search.startTime)
      if (this.search.startTime) {
        var startTime = util.formatDate.format(
          new Date(this.search.startTime),
          "yyyy-MM-dd hh:mm:ss"
        );
        var start = {
          startTime: startTime
        };
        obj = Object.assign(obj, start);
        console.log(start);
      }
      if (this.search.endTime) {
        var endTime = util.formatDate.format(
          new Date(this.search.endTime),
          "yyyy-MM-dd hh:mm:ss"
        );
        var end = {
          endTime: endTime
        };
        obj = Object.assign(obj, end);
        console.log(end);
      }
      if (this.search.type == "techName") {
        var name = {
          techName: this.search.val
        };
        obj = Object.assign(obj, name);
      } else if(this.search.type == "techPhone"){
        var phone = {
          techPhone: this.search.val
        }
        obj = Object.assign(obj, phone);
      }else{
        var newobj = {
        }
        obj = Object.assign(obj, newobj);
      }
      this.listLoading = true;
      getHoliday(obj, this.pageNumber, this.pageSize).then(res => {
        if (res.data.code == 1) {
          this.list = res.data.data.list;
          this.total = res.data.data.count;
          this.listLoading = false;
        }
      });
    },
    handleDelete(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(row);
          var obj = {
            id: row.id
          };
          delHoliday(obj)
            .then(res => {
              console.log(res);
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList();
              } else {
                this.$message({
                  type: "warning",
                  message: res.data.data
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "warning",
                message: "删除失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
</style>
