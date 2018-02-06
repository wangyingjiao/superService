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
      
       <el-table-column align="center" label="编号"  width="100">
         <template scope="scope">
            {{scope.row.index + (pageNumber-1) * pageSize}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="字典描述" prop="description">
      </el-table-column>

      <el-table-column align="center" label="字典类型" prop="type">
      </el-table-column>


      <el-table-column align="center" width="200" label="操作">
        <template scope="scope">
            <el-button class="el-icon-information"   @click="handleRead(scope.row)"></el-button>
            <el-button class="el-icon-edit"   @click="handleUpdate(scope.row)"></el-button>
            <el-button class="el-icon-delete"   @click="handleDelete(scope.row)"></el-button>
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
          <el-form-item label="字典名:" prop="label">
            <el-input        
           class="form_item"
            placeholder="请输入1-6位的字典名" v-model.trim="temp.label"></el-input>
          </el-form-item>

          <el-form-item label="数据值:" prop="value">
            <el-input        
           class="form_item"
            placeholder="请输入2-15位的数据值" v-model.trim="temp.value"></el-input>
          </el-form-item>

          <el-form-item label="字典类型:" prop="type">
            <el-input
           class="form_item"
            placeholder="请输入2-15位的字典类型" v-model.trim="temp.type"></el-input>
          </el-form-item>

          <el-form-item label="描述:" prop="description">
            <el-input
           class="form_item"
            placeholder="请输入2-15位的描述" v-model.trim="temp.description"></el-input>
          </el-form-item>

          </el-form>
      
      <div slot="footer" class="dialog-footer" style="text-align: center;">   
        <button class="button-large" :loading="true" :disabled="btnState"  v-if="dialogStatus == 'update'"  @click="update('temp')">保 存</button>     
        <button class="button-large" :loading="true" v-else :disabled="btnState" @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>
     <!-- 查看弹框 -->
    <el-dialog 
      title="子菜单列表"
      :visible.sync="dialogTable" 
      :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
       class="diatable1">
          <el-button @click="handleCreate">新增</el-button>
          <el-table :data="tableData">
              <el-table-column align="center" width="80" label="编号" type="index"></el-table-column>
              <el-table-column align="center" label="字典名" prop="description"></el-table-column>
              <el-table-column align="center" label="字典类型" prop="type"></el-table-column>
              <el-table-column align="center" label="变量名" prop="label"></el-table-column>
              <el-table-column align="center" label="变量值" prop="value"></el-table-column>
              <el-table-column align="center" width="200" label="操作">
                <template scope="scope">
                    <el-button class="el-icon-edit"   @click="handleUpdate(scope.row)"></el-button>
                    <el-button class="el-icon-delete"   @click="handleDelete(scope.row)"></el-button>
                </template>
               </el-table-column>
          </el-table>
      
      <div slot="footer" class="dialog-footer" style="text-align: center;">   
        <button class="button-large"  @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>

  </div>
  </div>
</div>
</template>

<script>
import {
  getDict,
  readDict,
  addDict,
  handleUpApp,
  upApp,
  delApp
} from "@/api/set";
import util from "@/utils/date";
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "appVersion",
  directives: {
    waves
  },
  data() {
    return {
      btnState: false,
      list: [],
      tableData: [],
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
      // 搜索数据
      search: {
        type: "",
        val: "",
        startTime: "",
        endTime: ""
      },
      seOptions: [
        { label: "字典类型", value: "type" },
        { label: "描述", value: "description" }
      ],
      textMap: {
        update: "编辑",
        create: "新增"
      },
      rowId: "",
      dialogTable: false,
      dialogFormVisible: false,
      dialogStatus: "",
      temp: {
        value:"",
        label:"",
        type:"",
        directives:""
      },
      rules: {
         label: [
          { required: true, message: "请输入 1到 6 位的字典名", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
         value: [
          { required: true, message: "请输入 2 到 15 位的数据值", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入 2 到 15 位的分类名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入 2 到 15 位的描述", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ]
      },
      tableKey: 0,
      isIndeterminate: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true;
      var obj = {};
      if (this.search.type == "type") {
        var type = {
          type: this.search.val
        };
        obj = Object.assign(obj, type);
      } else if (this.search.type == "description") {
        var description = {
          description: this.search.val
        };
        obj = Object.assign(obj, description);
      }

      getDict(obj, this.pageNumber, this.pageSize)
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
    // 搜索
    handleFilter() {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.getList();
    },
    // 条数改变
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.pageSize = val;
      this.getList();
    },
    // 页数改变
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getList();
    },
    // 点击查看
    handleRead(row) {
      console.log(row, "1111111111");

      readDict({ type: row.type })
        .then(res => {
          this.tableData = res.data.data.list;
          this.dialogTable = true;
        })
        .catch(err => {});
    },
    // 点击新增
    handleCreate() {
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    // 点击编辑时
    handleUpdate(row) {
      this.listLoading = true;
      this.dialogStatus = "update";
      var obj = {
        id: row.id
      };
      // 请求回显的数据
      handleUpApp(obj).then(res => {
        this.listLoading = true;
        if (res.data.code == 1) {
          var data = res.data.data;
          // 强制类型转换
          data.build = String(data.build);
          this.listLoading = false;
          this.rowId = row.id;
          this.temp = Object.assign({}, data);
          this.dialogFormVisible = true;
        } else {
          this.listLoading = false;
        }
      });
    },
    // 点击删除时
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
          delApp(obj)
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
    // 新增保存
    create(formName) {
      if (this.dialogTable) {
        this.dialogTable = false;
      }else{

   
      var obj = {
        versionNumber: this.temp.versionNumber,
        build: this.temp.build,
        forcedUpdate: this.temp.forcedUpdate,
        upgradeContent: this.temp.upgradeContent,
        refreshAddress: this.temp.refreshAddress
      };

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          addDict(obj)
            .then(res => {
              this.btnState = false;

              if (res.data.code === 1) {
                this.dialogFormVisible = false;
                this.resetSearch();
                this.resetTemp();
                this.$refs[formName].resetFields();
                this.handleFilter();
                this.$message({
                  type: "success",
                  message: "新增成功"
                });
              } else {
              }
            })
            .catch(err => {
              this.btnState = false;
            });
        } else {
          return false;
        }
      });
    }
    },
    // 编辑保存
    update(formName) {
      var obj = {
        id: this.rowId,
        versionNumber: this.temp.versionNumber,
        build: this.temp.build,
        forcedUpdate: this.temp.forcedUpdate,
        upgradeContent: this.temp.upgradeContent,
        refreshAddress: this.temp.refreshAddress
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          upApp(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code === 1) {
                this.resetTemp();
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
                this.getList();
                this.$message({
                  type: "success",
                  message: "编辑成功"
                });
              }
            })
            .catch(err => {
              this.btnState = false;
            });
        } else {
          return false;
        }
      });
    },
    // 清空表单
    resetForm(formName) {
      if (this.dialogTable) {
        this.dialogTable = false;
      } else {
        this.resetTemp();
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      }
    },
    // 清空搜索数据
    resetSearch() {
      this.search = {
        type: "",
        val: "",
        startTime: "",
        endTime: ""
      };
    },
    // 清空v-modal
    resetTemp() {
      this.temp = {
        versionNumber: "",
        build: "",
        forcedUpdate: "",
        upgradeContent: "",
        refreshAddress: ""
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
.diatable1>.el-dialog--small {
  width: 80% !important;
}
</style>
