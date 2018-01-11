<template>
<div>
  <div class="filter-container bgWhite">

      <el-select clearable style="width: 200px" class="filter-item" @change="searchChange" v-model="search.refundStatus" placeholder="请选择">
        <el-option v-for="item in 3" :key="item.id" :label="item.value" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable style="width: 200px" class="filter-item" @change="searchChange" v-model="search.status" placeholder="请选择">
        <el-option v-for="item in 3" :key="item.id" :label="item.value" :value="item.id">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索的内容" v-model="search.value">
      </el-input>

      <button class="button-large el-icon-search btn_right" @click="handleFilter"> 搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <el-table 
    :key='tableKey' 
    :data="list" 
    v-loading="listLoading" 
    fit 
    highlight-current-row 
    element-loading-text="正在加载" 
    style="width: 100%" >
      <el-table-column align="center" label="机构编号" width="100">
         <template scope="scope">
            {{scope.row.index + (pageNumber-1) * pageSize}}
        </template>
      </el-table-column>

      <el-table-column  label="订单编号" align="center" min-width="150px" prop="name" >
      </el-table-column>

      <el-table-column  label="退款编号" align="center" min-width="200px" prop="telephone">
      </el-table-column>

      <el-table-column  label="退款金额" align="center" min-width="200px" prop="address">
      </el-table-column>

      <el-table-column  label="负责人姓名" align="center" width ="150" prop="masterName">
      </el-table-column>

      <el-table-column  label="负责人手机号" align="center" min-width="200px" prop="masterPhone">
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
           <el-button class="el-icon-edit ceshi3" v-if="btnShow.indexOf('office_update') > -1" @click="handleUpdate(scope.row)"></el-button>
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination class="fr page mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import {
  getMech,
  addMech,
  upMech,
  getSerstation,
  getMechPage,
  getCity
} from "@/api/base";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";

export default {
  name: "table_demo",
  directives: {
    waves
  },
  data() {
    return {
      btnShow: JSON.parse(localStorage.getItem('btn')),
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      pageNumber: 1,
      pageSize: 10,
      total: 1,
      tableKey: 0,
      search: {
        refundStatus:"",
        status: "",
        value: ""
      }
    };
  },
  created() {
    this.getList();   
  },
  methods: {
    getList() {
      this.listLoading = true;
      var obj = {};
      getMechPage(obj, this.pageNumber, this.pageSize).then(res => {
        console.log(res);
        this.list = res.data.data.list;
        if(this.list != undefined){
          for (var i = 0; i < this.list.length; i++) {
            this.list[i].index = i + 1;
          }

        }
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleFilter() { // 搜索
      // var value = this.search.value;
      // if (this.search.key == "name") {
      //   var obj = {
      //     name: value
      //   };
      // } else if (this.search.key == "masterName") {
      //   var obj = {
      //     masterName: value
      //   };
      // } else if (this.search.key == "masterPhone") {
      //   var obj = {
      //     masterPhone: value
      //   };
      // }else{
      //    var obj = {}
      // }
      // this.listLoading = true;
      // getMechPage(obj, this.pageNumber, this.pageSize).then(res => {
      //   console.log(res);
      //   this.list = res.data.data.list;
      //   if(this.list != undefined){
      //     for (var i = 0; i < this.list.length; i++) {
      //       this.list[i].index = i + 1;
      //     }

      //   }
      //   this.total = res.data.data.count;
      //   this.listLoading = false;
      // });
      // this.listQuery.page = 1;
      // // this.getList();
    },
    handleSizeChange(val) { //每页的个数
      // this.pageSize = val;
      // var value = this.search.value;
      // if (this.search.key == "name") {
      //   var obj = {
      //     name: value
      //   };
      // } else if (this.search.key == "masterName") {
      //   var obj = {
      //     masterName: value
      //   };
      // } else {
      //   var obj = {
      //     masterPhone: value
      //   };
      // }
      // getMechPage(obj, this.pageNumber, this.pageSize).then(res => {
      //   console.log(res);
      //   this.list = res.data.data.list;
      //   if(this.list != undefined){
      //     for (var i = 0; i < this.list.length; i++) {
      //       this.list[i].index = i + 1;
      //     }

      //   }
      //   this.total = res.data.data.count;
      //   this.listLoading = false;
      // });
    },
    handleCurrentChange(val) { // 换页
      // this.pageNumber = val;
      // var value = this.search.value;
      // if (this.search.key == "name") {
      //   var obj = {
      //     name: value
      //   };
      // } else if (this.search.key == "masterName") {
      //   var obj = {
      //     masterName: value
      //   };
      // } else {
      //   var obj = {
      //     masterPhone: value
      //   };
      // }
      // this.listLoading = true;
      // getMechPage(obj, this.pageNumber, this.pageSize).then(res => {
      //   this.list = res.data.data.list;
      //   if(this.list != undefined){
      //     for (var i = 0; i < this.list.length; i++) {
      //       this.list[i].index = i + 1;
      //     }

      //   }
      //   this.listLoading = false;
      // });
    }, 
    searchChange(val) {
      console.log(val);
    },
    
  }
};
</script>
<style scoped>
.btn_right {
  float: right;
  width: 100px;
}
.btn_left {
  width: 100px;
}
.checkRightBox {
  border: solid 1px #dcdcdc;
  padding: 10px;
}
.checkAllBox {
  padding: 10px 0;
}
.checkBox1 {
  padding: 10px 0;
  border-top: solid 1px #dcdcdc;
  border-bottom: solid 1px #dcdcdc;
}
.checkBox2 {
  padding: 10px 0;
}
.checkBox3 {
  padding: 10px 0;
  border-top: solid 1px #dcdcdc;
}
.bgWhite {
  background-color: #ffffff;
  padding: 15px 20px 20px 20px;
}
.btn_pad {
  margin: 0px 0px 15px 20px;
}
.btn_right {
  float: right;
}
.ceshi3 {
  font-size: 14px;
  color: #1d85fe;
  border: 1px solid #1d85fe;
  background-color: #ffffff;
}
.pagination-container {
  overflow: hidden;
}
</style>