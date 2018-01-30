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

       <button class="button-large el-icon-search btn_search" @click="handleFilter"> 搜索</button>
    </div>
    <!-- 搜索结束 -->
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
      <button class="button-small btn_pad" @click="handleCreate">新增</button>
    <el-table 
      :key='tableKey' 
      :data="list" 
      v-loading="listLoading" 
      element-loading-text="正在加载" 
      fit 
      tooltip-effect='light'
      highlight-current-row 
      style="width: 100%">

      <el-table-column align="center" label="ID" prop="id">
      </el-table-column>

      <el-table-column align="center" label="版本号" prop="versionNumber">
      </el-table-column>

      <el-table-column align="center" label="build号" prop="build">      
      </el-table-column>

      <el-table-column align="center" label="强更状态" prop="forcedUpdate">      
      </el-table-column>

      <el-table-column align="center"  width="150px" label="更新提示语" prop="upgradeContent">     
        <template scope="scope">
           <el-tooltip placement="left" :disabled="scope.row.upgradeContent.length < 5" :content="scope.row.upgradeContent">
             <div class="tool" >{{scope.row.upgradeContent}}</div>
           </el-tooltip>
        </template> 
      </el-table-column>

      <el-table-column align="center"  width="150px" label="更新地址" prop="refreshAddress">   
        <template scope="scope">
           <el-tooltip placement="left" :disabled="scope.row.refreshAddress.length < 5" :content="scope.row.refreshAddress">
             <div class="tool" >{{scope.row.refreshAddress}}</div>
           </el-tooltip>
        </template>    
      </el-table-column>

    
      <el-table-column align="center" label="创建时间" prop="createDate">      
      </el-table-column>
      
     

      <el-table-column align="center" label="更新时间" prop="updateDate">      
      </el-table-column>
      
      

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button class="el-icon-delete ceshi3"  @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页器 -->
    <div v-if="!listLoading" class="pagination-container">
      <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 弹窗 -->
    <el-dialog 
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible" 
      :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
       class="diatable">
          <el-form        
            class="small-space dia_form" 
            ref="temp" 
            :rules="rules" 
            :model="temp" 
            label-position="left" 
            label-width="100px"
            >
          
          

           

          </el-form>
      
      <div slot="footer" class="dialog-footer" style="text-align: center;">   
        <button class="button-large"  v-if="dialogStatus == 'update'"  @click="update('temp')">保 存</button>     
        <button class="button-large" v-else  @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>

  </div>
  </div>
</div>
</template>

<script>
import { getMenu } from "@/api/set";
import util from "@/utils/date";
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "appVersion",
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
        type: "",
        val: "",
        startTime: "",
        endTime: ""
      },
      seOptions: [
        { label: "版本号", value: "versionNumber" },
        { label: "build号", value: "build" }
      ],
      textMap: {
        update: "编辑",
        create: "新增"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      temp: {},
      rules: {},
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
      var obj = {};
      if (this.search.startTime) {
        var startTime = util.formatDate.format(
          new Date(this.search.startTime),
          "yyyy-MM-dd hh:mm:ss"
        );
        var start = {
          startTime: startTime
        };
        obj = Object.assign(obj, start);
      }
      if (this.search.endTime) {
        var endTime = util.formatDate.format(
          new Date(this.search.endTime),
          "yyyy-MM-dd 23:59:59"
        );
        var end = {
          endTime: endTime
        };
        obj = Object.assign(obj, end);
      }

      if (this.search.type == "versionNumber") {
        var versionNumber = {
          versionNumber: this.search.val
        };
        obj = Object.assign(obj, versionNumber);
      } else if (this.search.type == "build") {
        var build = {
          build: this.search.val
        };
        obj = Object.assign(obj, build);
      } else if (this.search.type == "requestUri") {
        var requestUri = {
          requestUri: this.search.val
        };
        obj = Object.assign(obj, requestUri);
      } else if (this.search.type == "params") {
        var params = {
          params: this.search.val
        };
        obj = Object.assign(obj, params);
      }

      getMenu(obj)
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
    handleFilter() {
      var obj = {};
      if (this.search.startTime) {
        var startTime = util.formatDate.format(
          new Date(this.search.startTime),
          "yyyy-MM-dd hh:mm:ss"
        );
        var start = {
          startTime: startTime
        };
        obj = Object.assign(obj, start);
      }
      if (this.search.endTime) {
        var endTime = util.formatDate.format(
          new Date(this.search.endTime),
          "yyyy-MM-dd 23:59:59"
        );
        var end = {
          endTime: endTime
        };
        obj = Object.assign(obj, end);
      }

      if (this.search.type == "versionNumber") {
        var versionNumber = {
          versionNumber: this.search.val
        };
        obj = Object.assign(obj, versionNumber);
      } else if (this.search.type == "build") {
        var build = {
          build: this.search.val
        };
        obj = Object.assign(obj, build);
      } else if (this.search.type == "requestUri") {
        var requestUri = {
          requestUri: this.search.val
        };
        obj = Object.assign(obj, requestUri);
      } else if (this.search.type == "params") {
        var params = {
          params: this.search.val
        };
        obj = Object.assign(obj, params);
      }
      console.log(obj, "搜索条件");
      getMenu(obj, this.pageNumber, this.pageSize)
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
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getList();
    },
    handleCreate() {},
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
    },
    create() {},
    update() {}
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
