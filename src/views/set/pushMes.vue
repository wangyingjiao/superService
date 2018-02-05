<template>
<div>
  <!-- 搜索开始 -->
    <!-- <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width:30%;margin-right:2%" placeholder="请输入搜索内容" v-model="search.val">
        <el-select  clearable slot="prepend" style="width:90px" v-model="search.type" placeholder="请选择">
          <el-option v-for="item in seOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-input>

       <button class="button-large el-icon-search btn_search" @click="handleFilter"> 搜索</button>
    </div> -->
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

      <el-table-column align="center" width="150px" label="消息标题" prop="title">   
        <template scope="scope">
           <el-tooltip placement="left" :disabled="scope.row.title.length < 5" :content="scope.row.title">
             <div class="tool" >{{scope.row.title}}</div>
           </el-tooltip>
        </template>      
      </el-table-column>
      
      <el-table-column align="center" width="150px" label="消息内容" prop="message"> 
        <template scope="scope">
           <el-tooltip placement="left" :disabled="scope.row.message.length < 5" :content="scope.row.message">
             <div class="tool" >{{scope.row.message}}</div>
           </el-tooltip>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="手机号" prop="receivePhone">      
      </el-table-column>
      
      <el-table-column align="center" label="读取状态" prop="isRead">      
      </el-table-column>
      
      <el-table-column align="center" label="发送成功状态" prop="isSuccess">      
      </el-table-column>
      
      <el-table-column align="center" label="appKey" prop="appKey">      
      </el-table-column>
      
      

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button class="btn_menu"  @click="handleSend(scope.row)">重新发送</el-button>
        </template>
      </el-table-column>

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
import { getPushMes,sendPushMes } from "@/api/set";
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
      search: {
        type: "techName",
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
      var obj = {};
     
      
      getPushMes(obj, this.pageNumber, this.pageSize).then(res => { 
        if(res.data.code == 1){
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
        }else{
          this.listLoading = false
        }
        
      }).catch(()=>{
        this.listLoading = false
      });
    },
    handleFilter() {
     
    },
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.pageSize = val;
      this.listLoading = true;
      this.getList()
      
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.listLoading = true;
      this.getList()
     
    },
    handleSend(row) {
      
      var obj = {
        id:row.id
      }
      sendPushMes(obj).then(res=>{
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "发送成功!"
                });
                this.getList();
              }
            })
            .catch(() =>{
              this.listLoading = false
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
.btn_menu {
  font-size: 12px;
  color: #1d85fe;
  border: 1px solid #1d85fe;
  background-color: #ffffff;
}
</style>
