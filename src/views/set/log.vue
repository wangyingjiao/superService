<template>
<div>
  <!-- 搜索 -->
  <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" class="search" placeholder="请输入" v-model="search.name">
      </el-input>
      <button class="button-large el-icon-search btn_search" @click="handleFilter"> 搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_pad" style="width:80px" @click="handleCreate" >新增</button>
    <!-- 表格 -->
    <el-table 
    :key='tableKey' 
    :data="list" 
    v-loading="listLoading" 
    fit
    highlight-current-row
    element-loading-text="正在加载" 
    style="width: 100%" >

      <el-table-column align="center" label="编号" width="100">
        <template scope="scope">
            {{scope.row.index + (pageNumber-1) * pageSize}}
        </template>
      </el-table-column>

    </el-table>
<!-- 分页器 -->
   <div v-if="!listLoading" class="pagination-container">
      <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
<!-- 弹窗 -->
  </div>
  </div>
</div>
</template>

<script>
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
//挂载数据

export default {
  name: "log",
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      pageNumber: 1,
      pageSize: 10,
      total: 1,
    };
  },
  
  created() {
    this.getList();
  
  },
  methods: {
    getList() {
      // 获取列表
      this.listLoading = true;
      this.listLoading = false
    },
    handleFilter() {
      // 搜索
      
    },
//页数变化
    handleSizeChange(val) {
      
    },
    //页码变化
    handleCurrentChange(val) {
     
    },
    //点击新增
    handleCreate() {
    },
    
    // 点击删除
    handleDelete(row) {
      //删除
      
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
      })
        .then(() => {
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
<style >
.btn_right {
  margin-top: 3px;
  float: right;
  width: 75px;
}
.btn_left {
  width: 100px;
}

.bgWhite {
  background-color: #ffffff;
  padding: 20px 20px 20px 20px;
}
.btn_pad {
  margin: 0px 0px 20px 20px;
}
</style>