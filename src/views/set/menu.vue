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
    <!-- 表格开始 -->
    <el-table 
      :key='tableKey' 
      :data="list" 
      v-loading="listLoading" 
      element-loading-text="正在加载" 
      fit 
      tooltip-effect='light'
      highlight-current-row 
      style="width: 100%">
     <!-- 第二层表格开始 -->
      <el-table-column type="expand">
        <template scope="scope" >
          <el-table 
            v-if="scope.row.subMenus" 
            :data="scope.row.subMenus" 
            class="demo-table-expand">

            <!-- 第三层表格开始 -->
             <el-table-column type="expand">
                <template scope="scope" >
                  <el-table v-if="scope.row.subMenus" :data="scope.row.subMenus" class="demo-table-expand">
                    <el-table-column align="center" width="100" label="菜单等级">
                        <template scope="scope">
                          <span>3</span>
                        </template>
                    </el-table-column>
                    
                    <el-table-column align="center" label="名称" prop="name">

                    </el-table-column>

                    <el-table-column align="center" label="ID" prop="id">

                    </el-table-column>

                    <el-table-column align="center" label="permission" prop="permission">

                    </el-table-column>
                    <el-table-column align="center" width="240" label="操作">
                      <template scope="scope">
                        <el-button class="btn_menu"  @click="handleUpdate(scope.row)">编辑</el-button>
                        <el-button class="btn_menu"  @click="handleDelete(scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                    
                  </el-table>
                  <!-- 第三层表格结束 -->
              </template>
            </el-table-column> 
            <el-table-column align="center" width="100" label="菜单等级">
                <template scope="scope">
                  <span>2</span>
                </template>
            </el-table-column>
            
            <el-table-column align="center" label="名称" prop="name">

            </el-table-column>

            <el-table-column align="center" label="ID" prop="id">

            </el-table-column>

            <el-table-column align="center" label="permission" prop="permission">

            </el-table-column>
            <el-table-column align="center" width="240" label="操作">
              <template scope="scope">
                <el-button class="btn_menu"  @click="handleCreate(scope.row)">新增</el-button>
                <el-button class="btn_menu"  @click="handleUpdate(scope.row)">编辑</el-button>
                <el-button class="btn_menu"  @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
            
          </el-table>
          <!-- 第二层表格结束 -->
      </template>
    </el-table-column> 
    
     
      <el-table-column align="center" width="100" label="菜单等级">
          <template scope="scope">
            <span>1</span>
          </template>
      </el-table-column>
     

      <el-table-column align="center" label="名称" prop="name">

      </el-table-column>

      <el-table-column align="center" label="ID" prop="id">

      </el-table-column>

      <el-table-column align="center" label="permission" prop="permission">

      </el-table-column>
      
      

      <el-table-column align="center" width="240" label="操作">
        <template scope="scope">
          <el-button class="btn_menu"  @click="handleCreate(scope.row)">新增</el-button>
          <el-button class="btn_menu"  @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button class="btn_menu"  @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
<!-- 表格结束 -->
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
          <el-form-item label="菜单名称:" prop="name" >
            <el-input        
           class="form_item"
            placeholder="请输入2-6位的菜单名称" v-model.trim="temp.name"></el-input>
          </el-form-item>
           
          <el-form-item label="权限标识:" prop="permission" >
            <el-input        
           class="form_item"
            placeholder="请输入2-15位的权限标识" v-model.trim="temp.permission"></el-input>
          </el-form-item>
           
          <el-form-item label="链接:" prop="permission">
            <el-input
           class="form_item"
            placeholder="请输入2-15位的权限标识" v-model.trim="temp.permission"></el-input>
          </el-form-item>

          <el-form-item label="图标:">
            <el-input
           class="form_item"
            placeholder="请输入2-15位的权限标识" v-model.trim="temp.icon"></el-input>
          </el-form-item>

           <el-form-item label="是否显示:">
             <el-radio v-model="temp.isShow" label="yes">是</el-radio>
             <el-radio v-model="temp.isShow" label="no">否</el-radio>
          </el-form-item>

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
import { getMenu, addMenu, handleUpMenu, upMenu, delMenu } from "@/api/set";
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
      temp: {
        parent: "",
        parentIds: "",
        name: "",
        href: "",
        permission: "",
        isShow: "",
        icon: ""
      },
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
            //this.total = res.data.data.count;
            this.list = res.data.data;
            // this.pageNumber = res.data.data.pageNo;
            // this.pageSize = res.data.data.pageSize;
            // this.listQuery.page = res.data.data.pageNo;

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
    handleCreate() {
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    handleUpdate(row) {
      return;
      this.listLoading = true;
      this.dialogStatus = "update";
      this.selectState = true;
      var obj = {
        id: row.id
      };
      // 请求回显的数据
      // setClass(obj).then(res => {
      //   this.listLoading = true;
      //   if (res.data.code == 1) {
      //     var data = res.data.data;
      //     this.listLoading = false;
      //     this.rowId = row.id;
      //     this.temp = Object.assign({}, row);
      //     this.dialogFormVisible = true;
      //    } else {
      //      this.listLoading = false;

      //    }
      // });
    },
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
    update() {},
    //清空列表
    resetForm(formName) {
      this.selectState = false;
      this.resetTemp();
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    //清空绑定
    resetTemp() {
      this.temp = {
        name: "",
        majorSort: ""
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
.btn_menu {
  font-size: 12px;
  color: #1d85fe;
  border: 1px solid #1d85fe;
  background-color: #ffffff;
}
</style>
