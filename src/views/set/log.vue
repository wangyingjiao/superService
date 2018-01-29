<template>
<div>
  <!-- 搜索开始 -->
    <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width:30%;margin-right:2%" placeholder="请输入搜索内容" v-model="search.val">
        <el-select  clearable slot="prepend" style="width:100px" v-model="search.type" placeholder="请选择">
          <el-option v-for="(val,key,index) in seOptions" :key="key" :label="val" :value="key">
          </el-option>
        </el-select>
      </el-input>

      <el-date-picker
      v-model="search.createDate"
      style="width:20%"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>

       <button class="button-large el-icon-search btn_search" @click="handleFilter"> 搜索</button>
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

      <!-- <el-table-column align="center" label="编号"  width="100">
         <template scope="scope">
            {{scope.row.index + (pageNumber-1) * pageSize}}
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="ID" prop="id">      
      </el-table-column>

      <el-table-column align="center" label="请求方式" prop="method">      
      </el-table-column>

      <el-table-column align="center" label="请求地址" prop="requestUri">      
      </el-table-column>

      <el-table-column align="center" label="创建时间" prop="createDate">      
      </el-table-column>

      <el-table-column align="center" label="操作IP地址" prop="remoteAddr">      
      </el-table-column>

      <el-table-column align="center" label="日志标题" prop="title">      
      </el-table-column>

      <el-table-column align="center" label="日志类型" prop="type">      
      </el-table-column>

      <el-table-column align="center" label="异常信息" prop="exceptions">      
      </el-table-column>

      <el-table-column align="center" width="150px" label="提交数据" prop="params">    
          <template scope="scope">
           <el-tooltip placement="left" :disabled="scope.row.params.length < 10" :content="scope.row.params">
             <div class="tool" >{{scope.row.params}}</div>
           </el-tooltip>
        </template>
      </el-table-column>
      
      <!-- <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button class="el-icon-delete ceshi3"  @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column> -->

    </el-table>

    <!-- 分页器 -->
    <div v-if="!listLoading" class="pagination-container">
      <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import { getLog } from "@/api/set";
import util from "@/utils/date";
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "log",
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined
      },
      pageNumber: 1,
      pageSize: 10,
      total: 1,
      seOptions: {
        type: "分类",
        title: "title"
      },
      search: {
        type: "",
        val: "",
        createDate: ""
      },

      tableKey: 0,
      isIndeterminate: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      if(this.search.createDate){
         var time = util.formatDate.format(
        new Date(this.search.createDate),
        "yyyy-MM-dd hh:mm:ss"
      );
      }
      
      if (this.search.type == "type") {
        var obj = {
          type: this.search.val,
          createDate: time
        };
      } else if (this.search.type == "title") {
        var obj = {
          title: this.search.val,
          createDate: time
        };
      } else {
        var obj = {
          createDate: time
        };
      }
      getLog(obj, this.pageNumber, this.pageSize)
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
    //搜索
    handleFilter() {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      if(this.search.createDate){
         var time = util.formatDate.format(
        new Date(this.search.createDate),
        "yyyy-MM-dd hh:mm:ss"
      );
      }
      
      if (this.search.type == "type") {
        var obj = {
          type: this.search.val,
          createDate: time
        };
      } else if (this.search.type == "title") {
        var obj = {
          title: this.search.val,
          createDate: time
        };
      } else {
        var obj = {
          createDate: time
        };
      }
      console.log(obj);
      getLog(obj, this.pageNumber, this.pageSize)
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
    //切换条数
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.pageSize = val;
      this.listLoading = true;
      if(this.search.createDate){
         var time = util.formatDate.format(
        new Date(this.search.createDate),
        "yyyy-MM-dd hh:mm:ss"
      );
      }
      
      if (this.search.type == "type") {
        var obj = {
          type: this.search.val,
          createDate: time
        };
      } else if (this.search.type == "title") {
        var obj = {
          title: this.search.val,
          createDate: time
        };
      } else {
        var obj = {
          createDate: time
        };
      }
      getLog(obj, this.pageNumber, this.pageSize)
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
    //翻页
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.listLoading = true;
      if(this.search.createDate){
         var time = util.formatDate.format(
        new Date(this.search.createDate),
        "yyyy-MM-dd hh:mm:ss"
      );
      }
      
      if (this.search.type == "type") {
        var obj = {
          type: this.search.val,
          createDate: time
        };
      } else if (this.search.type == "title") {
        var obj = {
          title: this.search.val,
          createDate: time
        };
      } else {
        var obj = {
          createDate: time
        };
      }
      getLog(obj, this.pageNumber, this.pageSize)
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
    //删除
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
          return;
        })
        .catch(() => {
          this.$message({
            type: "warning",
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
.tool {
  width: 115px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
