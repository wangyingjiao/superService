<template>
<div>
  <!-- 搜索开始 -->
    <div class="filter-container bgWhite">
       <el-select filterable  class="search-min" clearable @change="searchOffice"  v-model="search.orgId" placeholder="请选择机构">
        <el-option v-for="item in mechanismCheck" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
       
      <el-select filterable class="search-min" clearable  v-model="search.stationId" placeholder="请选择服务站">
        <el-option v-for="item in servicestationSearch" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>

      <el-select filterable class="search-min" clearable  v-model="search.payStatus" placeholder="请选择支付状态">
        <el-option v-for="(val,key,index) in payState" :key="key" :label="val" :value="key">
        </el-option>
      </el-select>

      <el-input @keyup.enter.native="handleFilter" style="width:30%;margin-right:2%" placeholder="请输入要搜索的内容" v-model="search.val">
        <el-select  clearable slot="prepend" style="width:100px" v-model="search.type" placeholder="请选择">
          <el-option v-for="(val,key,index) in seOptions" :key="key" :label="val" :value="key">
          </el-option>
        </el-select>
      </el-input>

     

       <button class="button-large el-icon-search btn_search" @click="handleFilter"> 搜索</button>
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

      <el-table-column align="center" label="订单编号" min-width="130" prop="orderNumber">      
      </el-table-column>

      <el-table-column align="center" label="支付编号" min-width="130" prop="payNumber">      
      </el-table-column>

      <el-table-column v-if="userType =='sys'||userType =='platform'" align="center" width="220" :render-header="renderHeader">
            <template scope="rowObj">
              <p>{{rowObj.row.orgName}}</p>
              <p>{{rowObj.row.stationName}}</p>
            </template>                    
      </el-table-column>

      <el-table-column v-if="userType == 'org'"  align="center" label="服务站" prop="stationName">
       
      </el-table-column>

      <el-table-column align="center" label="支付金额" prop="payAccount">      
      </el-table-column>

      <el-table-column align="center" label="支付状态" prop="payStatus" >
        <template scope="scope">
           <span v-if="scope.row.payStatus=='waitpay'">待支付</span>
           <span v-if="scope.row.payStatus=='payed'">已支付</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="收款人" prop="payTechName">      
      </el-table-column>

      <el-table-column align="center" label="支付时间" prop="payTime">
      </el-table-column>

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
import { getPay } from "@/api/order";
import { getSList, getFuwu } from "@/api/staff";
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
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined
      },
      mechanismCheck: "",
      servicestationSearch: "",
      pageNumber: 1,
      userType: localStorage.getItem("type"),
      listLoading: true,
      pageSize: 10,
      total: 1,
      seOptions: {
        orderNumber: "订单编号",
        payNumber: "支付编号"
      },
      payState: {
        waitpay: "待支付",
        payed: "已支付"
      },
      //搜索数据
      search: {
        type: "",
        val: "",
        orgId: "",
        payStatus: "",
        stationId: ""
      },
      tableKey: 0,
      isIndeterminate: true
    };
  },
  created() {
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
          this.search.orgId = this.mechanismCheck[0].id;
        }
      }
    });
    this.getList();
  },
  methods: {
    renderHeader(h) {
      return [h("p", {}, ["服务机构"]), h("p", {}, ["服务站"])];
    },
    // 获取列表
    getList() {
      this.listLoading = true;
      var obj = {};
      if (this.search.payStatus) {
        obj = Object.assign(obj, { payStatus: this.search.payStatus });
      }
      if (this.search.orgId) {
        obj = Object.assign(obj, { orgId: this.search.orgId });
      }
      if (this.search.stationId) {
        obj = Object.assign(obj, { stationId: this.search.stationId });
      }
      if (this.search.type == "orderNumber") {
        var orderNumber = {
          orderNumber: this.search.val
        };
        obj = Object.assign(obj, orderNumber);
      } else if (this.search.type == "payNumber") {
        var payNumber = {
          payNumber: this.search.val
        };
        obj = Object.assign(obj, payNumber);
      }
      getPay(obj, this.pageNumber, this.pageSize)
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
  width: 155px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
