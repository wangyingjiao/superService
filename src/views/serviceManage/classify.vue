<template>
<div>
  <!-- 搜索 -->
  <div class="filter-container tabStyle">
    <!-- 选项卡 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="保洁" name="clean"></el-tab-pane>
      <el-tab-pane label="家修" name="repair"></el-tab-pane>
    </el-tabs>
      <el-input @keyup.enter.native="handleFilter" class="search" placeholder="请输入分类名称" v-model="search.name">
      </el-input>
      <button class="button-large el-icon-search btn_search" @click="handleFilter"> 搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_pad" style="width:80px" @click="handleCreate"  v-if="btnShow.indexOf('class_insert') != -1">新增</button>
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

      <el-table-column  label="所属类型" align="center">
        <template scope="scope">
            <span v-if="scope.row.majorSort == 'clean'">保洁</span>
            <span v-if="scope.row.majorSort == 'repair'">家修</span>
        </template>
      </el-table-column>


      <el-table-column  label="分类名称" align="center" prop="name">
      </el-table-column>

      <el-table-column align="center" label="操作">
         <template scope="scope">
            <el-button class="el-icon-edit ceshi3"  v-if="btnShow.indexOf('class_update') != -1 && scope.row.id.length >= 3"  @click="handleUpdate(scope.row)"></el-button>
            <el-button class="el-icon-delete ceshi3"  v-if="btnShow.indexOf('class_delete') != -1 && scope.row.id.length >= 3"  @click="handleDelete(scope.row)"></el-button>
          </template>
      </el-table-column>

    </el-table>
<!-- 分页器 -->
   <div v-if="!listLoading" class="pagination-container clearfix">
      <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
<!-- 弹窗 -->
    <el-dialog 
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible" 
      :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
      >
          <el-form        
            class="small-space dia_form" 
            ref="temp" 
            :rules="rules" 
            :model="temp" 
            label-position="left" 
            label-width="100px"
            >
          
          <el-form-item label="所属类型:" prop="majorSort" >
            <el-select :disabled="selectState" class="form_item" @change="majorChange" v-model="temp.majorSort" placeholder="请选择分类">
              <el-option v-for="(item,key,index) in majorSorts" :key="index" :label="item" :value="key">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分类名称:" prop="name" >
            <el-input        
           class="form_item"
            placeholder="请输入2-10位的分类名" v-model.trim="temp.name"></el-input>
          </el-form-item>
           

          </el-form>
      
      <div slot="footer" class="dialog-footer" style="text-align: center;">   
        <button class="button-large" :disabled="btnState" v-if="dialogStatus == 'update'"  @click="update('temp')">保 存</button>     
        <button class="button-large" v-else :disabled="btnState" @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>

  </div>
  </div>
</div>
</template>

<script>
import {
  getClass,
  addClass,
  delClass,
  setClass,
  upClass
} from "@/api/serviceManage";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
//挂载数据

export default {
  name: "class",
  directives: {
    waves
  },
  data() {
    return {
      btnShow: [],
      btnState: false,
      selectState: false,
      active: true,
      list: [],
      total: null,
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
      majorSorts: [],
      temp: {
        name: "",
        majorSort: ""
      },
      search: {
        name: ""
      },
      rules: {
        majorSort: [
          { required: true, message: "所属类型不能为空", trigger: "change" }
        ],
        name: [
          {
            required: true,
            message: "请输入 2 到 10 位的分类名称",
            trigger: "blur"
          },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑服务分类",
        create: "新增服务分类"
      },
      tableKey: 0,
      activeName: "all",
      rowId: "",
      dis: "1"
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
    this.getList();
    if (JSON.parse(localStorage.getItem("btn"))) {
      this.btnShow = JSON.parse(localStorage.getItem("btn"));
    }
    // 字典表中获取分类
    var dict = require("../../../static/dict.json");
    this.majorSorts = dict.order_majorSort;
  },
  methods: {
    majorChange(val) {},
    getList() {
      // 获取列表
      this.listLoading = true;
      var obj = {
        name: this.search.name,
        majorSort: this.activeName
      };
      getClass(obj, this.pageNumber, this.pageSize)
        .then(res => {
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
          }, 1000);
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    handleFilter() {
      // 搜索
      var obj = {
        name: this.search.name,
        majorSort: this.activeName
      };

      this.listLoading = true;
      this.listQuery.page = 1;
      this.pageNumber = 1;
      getClass(obj, this.pageNumber, this.pageSize).then(res => {
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
        }, 1000);
      });
    },
    //页数变化
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.pageSize = val;
      // this.getList();
      var obj = {
        name: this.search.name,
        majorSort: this.activeName
      };
      this.listLoading = true;
      getClass(obj, this.pageNumber, this.pageSize)
        .then(res => {
          this.list = res.data.data.list;
          this.pageSize = res.data.data.pageSize;
          if (this.list != undefined) {
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].index = i + 1;
            }
          }
          //this.total = res.data.data.count;
          setTimeout(() => {
            this.listLoading = false;
          }, 1000);
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    //页码变化
    handleCurrentChange(val) {
      this.pageNumber = val;
      var obj = {
        name: this.search.name,
        majorSort: this.activeName
      };

      this.listLoading = true;
      getClass(obj, this.pageNumber, this.pageSize)
        .then(res => {
          this.total = res.data.data.count;
          this.list = res.data.data.list;
          // this.pageNumber = res.data.data.pageNo
          // this.pageSize = res.data.data.pageSize

          if (this.list != undefined) {
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].index = i + 1;
            }
          }
          setTimeout(() => {
            this.listLoading = false;
          }, 1000);
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    //点击新增
    handleCreate() {
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    // 点击编辑
    handleUpdate(row) {
      this.listLoading = true;
      this.dialogStatus = "update";
      this.selectState = true;
      var obj = {
        id: row.id
      };
      // 请求回显的数据
      setClass(obj).then(res => {
        this.listLoading = true;
        if (res.data.code == 1) {
          var data = res.data.data;
          this.listLoading = false;
          this.rowId = row.id;
          this.temp = Object.assign({}, row);
          this.dialogFormVisible = true;
        } else {
          this.listLoading = false;
        }
      });
    },
    // 点击删除
    handleDelete(row) {
      //删除

      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false
      })
        .then(() => {
          var obj = {
            id: row.id
          };
          delClass(obj)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除服务分类成功!"
                });
                this.getList();
              } else {
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
      var obj = {
        majorSort: this.temp.majorSort,
        name: this.temp.name
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          addClass(obj)
            .then(res => {
              this.btnState = false;

              if (res.data.code === 1) {
                this.dialogFormVisible = false;
                this.activeName = "all";
                this.resetSearch();
                this.resetTemp();
                this.$refs[formName].resetFields();
                this.handleFilter();
                this.$message({
                  type: "success",
                  message: "新增成功"
                });
              }
            })
            .catch(err => {
              this.btnState = false;
            });
        } else {
          var errArr = this.$refs[formName]._data.fields;
          var errMes = [];
          for (var i = 0; i < errArr.length; i++) {
            if (errArr[i].validateMessage != "") {
              errMes.push(errArr[i].validateMessage);
            }
          }
          this.$message({
            type: "error",
            message: errMes[0]
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      //清空列表
      this.selectState = false;
      this.resetTemp();
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    resetSearch() {
      //清空搜索信息
      this.search = {
        name: "",
        majorSort: ""
      };
    },
    // 编辑保存
    update(formName) {
      var obj = {
        id: this.rowId,
        majorSort: this.temp.majorSort,
        name: this.temp.name
      };

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          upClass(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code === 1) {
                this.resetTemp();
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
                this.selectState = false;
                this.getList();
                this.$message({
                  type: "success",
                  message: "编辑成功"
                });
              } else {
                //this.dialogFormVisible = false;
                //this.selectState = false;
              }
            })
            .catch(err => {
              this.btnState = false;
            });
        } else {
          var errArr = this.$refs[formName]._data.fields;
          var errMes = [];
          for (var i = 0; i < errArr.length; i++) {
            if (errArr[i].validateMessage != "") {
              errMes.push(errArr[i].validateMessage);
            }
          }
          this.$message({
            type: "error",
            message: errMes[0]
          });
          return false;
        }
      });
    },
    // 清空v-modle绑定的值
    resetTemp() {
      this.temp = {
        name: "",
        majorSort: ""
      };
    },
    // tab切换
    handleClick(tab, event) {
      this.handleFilter();
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
  padding: 20px 20px 20px 20px;
}
.btn_pad {
  margin: 0px 0px 20px 20px;
}
.word {
  font-size: 10px;
  color: #aeaeae;
  line-height: 15px;
}
.tabLeft {
  width: 15%;
}
.tabLeft .tabBtn {
  display: block;
  width: 100%;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.tabBtnclick {
  background-color: #6d8dfc;
  color: #ffffff;
}

.tabRight {
  width: 85%;
  height: 100%;
  border-left: 1px #f5f5f5 solid;
  padding-top: 10px;
  background-color: #ffffff;
}
.el-tabs {
  background-color: #ffffff;
  color: #333;
}
.el-radio-button {
  width: 100%;
}
.el-radio-button__inner {
  width: 100%;
  color: #333333;
  border: 0px solid #bfcbd9;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  background-color: #4c70e8;
  border-color: #4c70e8;
  box-shadow: -1px 0 0 0 #4c70e8;
}
</style>