<template>
<div>

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
           
          <el-form-item label="链接:">
            <el-input
           class="form_item"
            placeholder="请输入2-15位的权限标识" v-model.trim="temp.href"></el-input>
          </el-form-item>

          <el-form-item label="图标:">
            <el-input
           class="form_item"
            placeholder="请输入2-15位的权限标识" v-model.trim="temp.icon"></el-input>
          </el-form-item>

           <el-form-item label="是否显示:">
             <el-radio v-model="temp.isShow" label="1">是</el-radio>
             <el-radio v-model="temp.isShow" label="0">否</el-radio>
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
        update: "编辑菜单",
        create: "新增子菜单"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      temp: {
        id: "",
        parentId: "",
        parentIds: "",
        name: "",
        href: "",
        permission: "",
        isShow: "",
        icon: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入 2 到 10 位的分类名称",
            trigger: "blur"
          },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        permission: [
          {
            required: true,
            message: "请输入2-15位的权限标识",
            trigger: "blur"
          },
          { min: 2, max: 15, message: "请输入2-15位的权限标识" }
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
    // 新增子菜单
    handleCreate(row) {
      this.temp.isShow = "1";
      if (row.parentId) {
        this.temp.parentId = row.id;
      } else {
        this.temp.parentId = "1";
      }
      if (row.parentIds) {
        this.temp.parentIds = row.parentIds + row.id;
      } else {
        this.temp.parentIds = "0,1,";
      }
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    // 编辑菜单
    handleUpdate(row) {
      this.listLoading = true;
      this.dialogStatus = "update";
      this.selectState = true;
      var obj = {
        id: row.id
      };
      // 请求回显的数据
      handleUpMenu(obj).then(res => {
        this.listLoading = true;
        if (res.data.code == 1) {
          var data = res.data.data;
          this.listLoading = false;
          this.rowId = row.id;
          this.temp = Object.assign({ parent: row.parentId }, row);
          this.dialogFormVisible = true;
        } else {
          this.listLoading = false;
        }
      });
    },
    // 点击删除
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
          delMenu(obj)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除菜单成功!"
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
        parent: this.temp.parentId,
        parentIds: this.temp.parentIds,
        name: this.temp.name,
        permission: this.temp.permission,
        href: this.temp.href,
        icon: this.temp.icon,
        isShow: this.temp.isShow
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          addMenu(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code === 1) {
                this.dialogFormVisible = false;
                this.resetTemp();
                this.$refs[formName].resetFields();
                this.getList();
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
    },
    update(formName) {
      var obj = {
        id: this.temp.id,
        parent: this.temp.parent,
        parentIds: this.temp.parentIds,
        name: this.temp.name,
        permission: this.temp.permission,
        href: this.temp.href,
        icon: this.temp.icon,
        isShow: this.temp.isShow
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          upMenu(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code === 1) {
                this.dialogFormVisible = false;
                this.resetTemp();
                this.$refs[formName].resetFields();
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
        id: "",
        parentId: "",
        parentIds: "",
        name: "",
        href: "",
        permission: "",
        isShow: "",
        icon: ""
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
