<template>
  <div>
    <!-- 搜索开始 -->
    <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" v-model="search.name" class="search" placeholder="请输入搜索的岗位名称" >
      </el-input>
      <el-select filterable clearable class="search" v-model="search.officeId"  placeholder="选择机构">
        <el-option v-for="item in officeIds" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <button class="button-large el-icon-search btn_search btn-color" @click="handleFilter"> 搜索</button>
    </div>
    <!-- 搜索结束 -->
    
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_pad btn-color"  v-if="btnShow.indexOf('role_insert') != -1" @click="handleCreate">新增</button>
    <!-- 列表开始 -->
    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="正在加载"
      fit
      highlight-current-row
      style="width: 100%">

      <el-table-column align="center" label="编号" width="200">
        <template scope="scope">
            {{scope.row.index + (pageNumber-1) * pageSize}}
        </template>
      </el-table-column>

      <el-table-column  label="岗位名称" align="center" prop="name" >
      </el-table-column>

      <el-table-column  label="机构名称" align="center" prop="organization.name" >
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <!-- v-if判断按钮权限 -->
          <el-button class="el-icon-edit ceshi3" v-if="btnShow.indexOf('role_update') != -1"  @click="handleUpdate(scope.row)"></el-button>
          <el-button class="el-icon-delete ceshi3"  v-if="btnShow.indexOf('role_delete') != -1" @click="handleDelete(scope.row)"></el-button>

        </template>
      </el-table-column>

    </el-table>
    <!-- 列表结束 -->
    <!-- 分页器 -->
    <div v-if="!listLoading" class="pagination-container clearfix">
      <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
   <!-- 弹窗开组件-->
    <roleDialog ref="roleDialog" :treeData = 'data2' @getlistByDia='getlistByDia'></roleDialog>
<!-- 弹框结束-->
  </div>
  </div>
</div>
</template>

<script>
import {
  getStationPage,
  addStation,
  upStation,
  delStation,
  getPower,
  getMenudata,
  getSList,
} from "@/api/staff"; //接口调用
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
import roleDialog from "../staff/roleDialog.vue";
var data = [];
const state = [{ value: "可用", key: "1" }, { value: "不可用", key: "0" }];
var loading;
export default {
  name: "role",
  directives: {
    waves
  },
  components: {
    roleDialog
  },
  data() {
    return {
      btnShow: [], //按钮权限
      btnState: false, //按钮状态，是否禁用
      selsctState: false, //下拉框状态，是否禁用
      myselfUpdate: true, //判断是否编辑自己
      // roleDiaState: false, //子组件，控制弹窗显示隐藏
      list: [], //列表数据
      officeIds: [],
      total: null,
      listLoading: false,
      state: false,
      search: {
        name: "",
        officeId: ""
      },
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined
      },
      pageNumber: 1,
      pageSize: 10,
      total: 1,
      temp: {
        name: "",
        dataScope: "10",
        check: [],
        officeId: ""
      },
      checkNode: [],
      filterText: "", //树状图过滤
      roleId: "",
      checked: [],
      station: "",
      stationName: "",
      stationLv: [
        { id: "1", value: "一级" },
        { id: "2", value: "二级" },
        { id: "3", value: "三级" },
        { id: "4", value: "四级" },
        { id: "5", value: "五级" },
        { id: "6", value: "六级" },
        { id: "7", value: "七级" },
        { id: "8", value: "八级" },
        { id: "9", value: "九级" },
        { id: "10", value: "十级" }
      ],
      roleLv: [],
      state: state,
      dialogStatus: "",
      dialogPvVisible: false,
      pvData: [],
      tableKey: 0,
      data2: [], //树状图数据
      defaultProps: {
        //树形结构参数
        children: "subMenus",
        label: "name"
      },
      powerList: [],
      isIndeterminate: true
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  created() {
    //获取列表
    if (JSON.parse(localStorage.getItem("btn"))) {
      this.btnShow = JSON.parse(localStorage.getItem("btn"));
    }
    //获取机构
    getSList({}).then(res => {
      if (res.data.data.list != undefined) {
        this.officeIds = res.data.data.list;
        if (
          localStorage.getItem("type") == "org" ||
          localStorage.getItem("type") == "station"
        ) {
          this.search.officeId = this.officeIds[0].id;
        }
      }
    });
    //获取用户等级
    var lv = localStorage.getItem("dataScope");
    for (var i = 0; i < lv; i++) {
      this.roleLv.push(this.stationLv[i]);
    }
    this.getList();
  },
  methods: {
    //点击时loading状态
    loadingClick() {
      loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".el-dialog__body")
      });
    },
    getList() {
      //获取列表
      this.listLoading = true;
      var obj = {
        //搜索参数
        name: this.search.name,
        organization: { id: this.search.officeId }
      };
      if (obj.name != "" || obj.organization.id != "") {
        getStationPage(obj, this.pageNumber, this.pageSize)
          .then(res => {
            if (res.data.code === 1) {
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
      } else {
        var obj = {};
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          if (res.data.code === 1) {
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
            setTimeout(() => {
              this.listLoading = false;
            }, 500);
          } else {
            this.listLoading = false;
          }
        });
      }
    },
    handleFilter() {
      //搜索
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.getList();
    },
    handleSizeChange(val) {
      // 切换条数
      this.pageSize = val;
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      // 切换页数
      this.pageNumber = val;
      this.getList();
    },
    
    nodeClick(a, b, c) {},
    currentChange(a, b) {},
    nodeExpand(a, b, c) {},
    nodeCollapse(a, b, c) {},
    timeFilter(time) {
      if (!time[0]) {
        this.listQuery.start = undefined;
        this.listQuery.end = undefined;
        return;
      }
      this.listQuery.start = parseInt(+time[0] / 1000);
      this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000);
    },
    getlistByDia(str,res) {
      if (str == "create") {
        this.listQuery.page = 1;
        this.pageNumber = 1;
        this.search = {
          name: "",
          officeId: ""
        };
        this.handleFilter();
      }else{
        this.getList()
      }
    },
    //点击新增时
    handleCreate() {
      // this.listLoading = true;
      this.$refs.roleDialog.handleCreate();
      
    },
    //点击编辑时
    handleUpdate(row) {
      this.$refs.roleDialog.handleUpdate(row);
      
    },
    //删除数据
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
          delStation(obj)
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
              this.listLoading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    getLv() {
    },
    getFather(data) {
      for (var i in data) {
        if (data[i].subMenus != undefined) {
          this.getFather(data[i].subMenus);
        } else {
          if (this.data2.indexOf(data[i].id) > -1) {
          }
        }
      }
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>
<style>
.btn_right {
  margin-top: 3px;
  float: right;
  width: 75px;
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
.checkBox1 .el-checkbox {
  margin-left: 0px;
  margin-right: 15px;
}
.checkBox2 .el-checkbox {
  margin-left: 0px;
  margin-right: 15px;
}
.checkBox3 .el-checkbox {
  margin-left: 0px;
  margin-right: 15px;
}
.bgWhite {
  background-color: #ffffff;
  padding: 20px 20px 20px 20px;
}
.btn_pad {
  margin: 0px 0px 20px 20px;
}
.treecss
  .el-tree-node
  .el-tree-node__children
  .el-tree-node
  .el-tree-node__children
  .el-tree-node__children
  .el-tree-node {
  float: left;
}
.treecss
  .el-tree-node
  .el-tree-node__children
  .el-tree-node__children
  .el-tree-node {
  float: left;
}
/* .el-tree-node:nth-child(1)
  .el-tree-node__children
  .el-tree-node__children
  .el-tree-node {
  float: none;
} */
.ceshi {
  height: 25px;
  width: 80px;
}

.dialog-footer {
  text-align: center;
}
.scrollBox {
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.diasize .el-dialog {
  width: 60%;
}
</style>
