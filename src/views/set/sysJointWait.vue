<template>
<div>
  <!-- 搜索开始 -->
    <div class="filter-container bgWhite">
      <!-- <el-input @keyup.enter.native="handleFilter" style="width:40%;margin-right:2%" placeholder="请输入搜索内容" v-model="search.val">
        <el-select  clearable slot="prepend" style="width:100px" v-model="search.type" placeholder="请选择">
          <el-option v-for="(val,key,index) in seOptions" :key="key" :label="val" :value="key">
          </el-option>
        </el-select>
      </el-input>

       <button class="button-large el-icon-search btn_search" @click="handleFilter"> 搜索</button> -->
    </div>
    <!-- 搜索结束 -->
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
      <!-- 表格 -->
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

      <el-table-column align="center" label="请求路径"  prop="url">      
      </el-table-column>

      <el-table-column align="center" label="是否多次" prop="many">      
      </el-table-column>
      <el-table-column align="center" label="请求次数" prop="num">      
      </el-table-column>
      <el-table-column align="center" label="请求类型" prop="sendType">      
      </el-table-column>

      <el-table-column align="center"   label="请求内容" prop="requestContent">     
        <template scope="scope">
           <el-tooltip placement="left" :disabled="scope.row.requestContent.length < 10" :content="scope.row.requestContent">
             <div class="tool300" >{{scope.row.requestContent}}</div>
           </el-tooltip>
        </template>
      </el-table-column>
      
      <!-- <el-table-column align="center" label="操作">
        <template scope="scope" >
          <el-button v-if="scope.row.senFlag" class="ceshi3"  @click="handleAgain(scope.row)">再次对接</el-button>
        </template>
      </el-table-column> -->

    </el-table>

    <!-- 分页器 -->
    <div v-if="!listLoading" class="pagination-container clearfix">
      <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import { getSysjoint } from "@/api/set";
import util from "@/utils/date";
import waves from "@/directive/waves/index.js";

export default {
  name: "sysjointWait",
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
      getSysjoint({}, this.pageNumber, this.pageSize)
        .then(res => {
          if (res.data.code == 1) {
            if (res.data.data) {
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
      this.getList();
    },
    //切换条数
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.pageSize = val;
      this.getList();
    },
    //翻页
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getList();
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
.tool300 {
  max-width: 275px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
