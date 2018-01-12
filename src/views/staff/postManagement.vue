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
      <button class="button-large el-icon-search btn_search" @click="handleFilter"> 搜索</button>
    </div>
    <!-- 搜索结束 -->
    
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_pad"  @click="handleCreate">新增</button>
    <!-- 列表开始 -->
    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="正在加载"
      fit
      highlight-current-row
      style="width: 100%">

      <el-table-column align="center" label="编号" width="300">
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
          <el-button class="el-icon-edit ceshi3"  @click="handleUpdate(scope.row)"></el-button>
          <el-button class="el-icon-delete ceshi3"  @click="handleDelete(scope.row)"></el-button>

        </template>
      </el-table-column>

    </el-table>
    <!-- 列表结束 -->
    <!-- 分页器 -->
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
   <!-- 弹窗开始 -->
    <el-dialog
       :title="textMap[dialogStatus]" 
       :visible.sync="dialogFormVisible" 
       :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
       class="diatable diasize">
      <el-form 
        class="small-space dia_form"
        :model="temp" 
        label-position="left"
        :rules="rules"
        ref="temp" 
        label-width="160px" 
        >

        <el-form-item label=" 所属机构:"  prop="officeId">
          <el-select class="form_item" filterable @change="aaa" v-model="temp.officeId" placeholder="请选择">
            <el-option v-for="item in officeIds" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="岗位名称:" prop="name">
          <el-input v-model.trim="temp.name"class="form_item"placeholder="请输入2-15位的岗位名称"></el-input>
        </el-form-item>

        <el-form-item label="等级:" prop="dataScope">
          <el-select class="form_item" @change="lvChange" v-model="temp.dataScope" placeholder="请选择">
            <el-option v-for="item in roleLv" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
          </el-select>
          <p style="font-size: 12px;color:#8391a5">* 十级权限最高，一级权限最低</p>
        </el-form-item>

        <el-form-item label="权限:" prop="check" >
            <el-tree
            class="scrollBox form_item"
              :data="data2"
              :indent= 10
              show-checkbox
              node-key="id"    
              v-model="temp.check"
              ref="domTree"
              @check-change="handTreechange"
              @node-click="nodeClick"
              @current-change="currentChange"
              @node-expand="nodeExpand"
              @node-collapse="nodeCollapse"
              :default-expand-all = "true"
              :props="defaultProps">
            </el-tree>
  
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select style='width: 400px;' class="filter-item" v-model="stationState">
            <el-option v-for="item in state" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="button-large" :disabled="btnState" v-if="dialogStatus == 'update'" @click="update('temp')">保 存</button>    
        <button class="button-large" :disabled="btnState" v-else @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>
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
  chkName,
  chkNameUp
} from "@/api/staff";//接口调用
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
var data = [];

const state = [{ value: "可用", key: "1" }, { value: "不可用", key: "0" }];
export default {
  name: "table_demo",
  directives: {
    waves
  },
  data() {
    //表单验证
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("岗位名不能为空"));
      } else {
        console.log(this.dialogStatus);
        if (this.dialogStatus == "create") {
          chkName(value).then(res => {
            if (res.data.code == 0) {
              callback(new Error("岗位名重复！"));
            } else {
              callback();
            }
          });
        } else {
          var obj ={
             roleId:this.roleId,
             name:value
          }
          chkNameUp(obj).then(res => {
            if (res.data.code == 0) {
              callback(new Error("岗位名重复！"));
            } else {
              callback();
            }
          });
        }
      }
    };
    return {
      btnShow: this.$store.state.user.buttonshow,
      btnState: false,
      list: [],
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
        type: undefined,
        sort: "+id"
      },
      pageNumber: 1,
      pageSize: 10,
      total: 1,
      temp: {
        name: "",
        dataScope: "",
        check: [],
        officeId: ""
      },
      checkNode: [],
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
      dialogFormVisible: false,
      state: state,
      dialogStatus: "",
      textMap: {
        update: "编辑岗位",
        create: "新增岗位"
      },
      dialogPvVisible: false,
      pvData: [],
      tableKey: 0,
      data2: [],
      defaultProps: {
        children: "subMenus",
        label: "name"
      },
      powerList: [],
      isIndeterminate: true,
      rules: {
        officeId: [{ required: true, message: "机构不能为空", trigger: "change" }],
        name: [
          {
            required: true,
            validator: validateName,
            trigger: "blur"
          },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        dataScope: [{ required: true, message: "等级不能为空", trigger: "change" }],
        check: [
          {
            type: "array",
            required: true,
            message: "权限不能为空",
            trigger: "check-change"
          }
        ]
      }
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
    this.getList();
    //获取权限列表
    getMenudata().then(res => {
      this.data2 = res.data.data;
    });
    //获取机构
    getSList({}).then(res => {
      console.log("所属机构,机构搜索");
      console.log(res);
      this.officeIds = res.data.data.list;
      console.log(this.officeIds);
    });
    //获取用户等级
    var lv = localStorage.getItem("dataScope");
    console.log(lv, "用户等级");
    for (var i = 0; i < lv; i++) {
      this.roleLv.push(this.stationLv[i]);
    }
    console.log(this.roleLv, "用户看到的等级");
  },
  methods: {
    aaa(val) {//测试函数
      console.log(val);
    },
    getList() {//获取列表
      this.listLoading = true;
      var obj = {
        name: this.search.name,
        organization: { id: this.search.officeId }
      };
      console.log(obj);
      if (obj.name != "" || obj.organization.id != "") {
        this.listLoading = true;
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.list = res.data.data.list;
            if (this.list != undefined) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].index = i + 1;
              }
            }

            this.total = res.data.data.count;
            this.listLoading = false;
          } else {
            this.listLoading = false;
            this.$message({
              type: "warning",
              message: "岗位名不存在"
            });
          }
        });
      } else {
        var obj = {};
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.list = res.data.data.list;
            if (this.list != undefined) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].index = i + 1;
              }
            }

            this.total = res.data.data.count;
            this.listLoading = false;
          }
        });
      }
    },
    handleFilter() {//搜索
      this.listQuery.page = 1;
      var obj = {
        name: this.search.name,
        organization: { id: this.search.officeId }
      };
      console.log(obj);
      if (obj.name != "" || obj.organization.id != "") {
        this.listLoading = true;
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.list = res.data.data.list;
            if (this.list != undefined) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].index = i + 1;
              }
            }

            this.total = res.data.data.count;
            this.listLoading = false;
          } else {
            this.listLoading = false;
            this.$message({
              type: "warning",
              message: "岗位名不存在"
            });
          }
        });
      } else {
        var obj = {};
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.list = res.data.data.list;
            if (this.list != undefined) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].index = i + 1;
              }
            }

            this.total = res.data.data.count;
            this.listLoading = false;
          }
        });
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      var obj = {
        name: this.search.name,
        organization: { id: this.search.officeId }
      };
      console.log(obj);
      if (obj.name != "" || obj.organization.id != "") {
        this.listLoading = true;
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.list = res.data.data.list;
            if (this.list != undefined) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].index = i + 1;
              }
            }

            this.total = res.data.data.count;
            this.listLoading = false;
          } else {
            this.listLoading = false;
            this.$message({
              type: "warning",
              message: "岗位名不存在"
            });
          }
        });
      } else {
        var obj = {};
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.list = res.data.data.list;
            if (this.list != undefined) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].index = i + 1;
              }
            }

            this.total = res.data.data.count;
            this.listLoading = false;
          }
        });
      }
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      var obj = {
        name: this.search.name,
        organization: { id: this.search.officeId }
      };
      console.log(obj);
      if (obj.name != "" || obj.organization.id != "") {
        this.listLoading = true;
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.list = res.data.data.list;
            if (this.list != undefined) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].index = i + 1;
              }
            }

            this.total = res.data.data.count;
            this.listLoading = false;
          } else {
            this.listLoading = false;
            this.$message({
              type: "warning",
              message: "岗位名不存在"
            });
          }
        });
      } else {
        var obj = {};
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.list = res.data.data.list;
            if (this.list != undefined) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].index = i + 1;
              }
            }

            this.total = res.data.data.count;
            this.listLoading = false;
          }
        });
      }
    },
    handTreechange(a, b, c) {
      console.log(this.temp.check, "check-----------------");
      console.log(a, b, c, "checkchange节点选中状态发生变化");
      if (b) {
        if (a.subMenus == undefined) {
          console.log(a.permission, "子集被勾选的权限");
          console.log(a.id, "子集被勾选的id");
          console.log(a.parentId, "子集的父级id");
          console.log(a.parentIds, "子集的父级ids");
          var arr = a.parentIds.split(",");
          console.log(arr);
          console.log(this.data2, "父元素");
          for (var i = 0; i < this.data2.length; i++) {
            if (this.data2[i].id == arr[2]) {
              console.log(i, "下标i");
            }
            if (this.data2[i].subMenus != undefined) {
              for (var j = 0; j < this.data2[i].subMenus.length; j++) {
                if (this.data2[i].subMenus[j].id == arr[3]) {
                  var str = this.data2[i].subMenus[j].subMenus[0];
                  if (str.permission != undefined) {
                    var per = str.permission;
                    var newper = per.substring(per.length - 4, per.length);
                    console.log(newper, "截取");
                    if (newper == "view") {
                      this.$refs.domTree.setChecked(str.id, true);
                    }
                  }
                  // console.log(j,'下标j')
                  // console.log(str.name,'列表名字')
                  // console.log(str.id,'列表id')
                  // console.log(str.permission,'标识符')
                }
              }
            }
          }
        } else {
          console.log(a.permission, "父级被勾选的权限");
          console.log(a.id, "父级被勾选的id");
          console.log(a.subMenus[0], "父级的第一个元素");
        }
      }
      //console.log(this.$refs.domTree.getCheckedKeys(false));
      //console.log(this.$refs.domTree.getCheckedNodes());
      this.temp.check = this.$refs.domTree.getCheckedKeys();
      //console.log(this.temp.check);
    },
    nodeClick(a, b, c) {
      console.log(a, b, c, "nodeclick节点被点击时");
    },
    currentChange(a, b) {
      console.log(a, b, "currentchange选中节点变化时");
    },
    nodeExpand(a, b, c) {
      console.log(a, b, c, "nodeexpand节点被展开时");
    },
    nodeCollapse(a, b, c) {
      console.log(a, b, c, "nodecollapse节点关闭");
    },
    timeFilter(time) {
      if (!time[0]) {
        this.listQuery.start = undefined;
        this.listQuery.end = undefined;
        return;
      }
      this.listQuery.start = parseInt(+time[0] / 1000);
      this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000);
    },
    lvChange(value) {
      // console.log(value);
      // console.log(this.temp.officeId);
      // console.log(this.temp.name);
      // console.log(this.roleId);
      // console.log(this.temp);
      // // this.temp.dataScope = value;
    },
    offChange(val) {
      console.log(val);
    },
    //点击新增时
    handleCreate() {
      //this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      if (this.officeIds.length == 1) {
        console.log(this.officeIds[0].id);
        this.temp.officeId = this.officeIds[0].id;
      }
    },
    //点击编辑时
    handleUpdate(row) {
      this.listLoading = true;
      getPower(row.id).then(res => {
        console.log(res);
        this.listLoading = false;
        if (res.data.code == 1) {
          this.dialogStatus = "update";
          this.dialogFormVisible = true;
          var a = res.data.data;
          this.roleId = a.id;
          this.temp.officeId = a.organization.id;
          this.temp.name = a.name;
          this.temp.dataScope = a.dataScope;
          this.temp.check = a.menuIdList;
          console.log(a.menuIdList);
          for (let i = 0; i < this.data2.length; i++) {
            //特殊首页处理
            if (this.data2[i].permission == "index") {
              console.log(this.data2[i].permission);
              //this.temp.check.remove(this.data2[i].id);
              //this.temp.check.push(this.data2[0].id);
            } else {
              this.temp.check.remove(this.data2[i].id);
            }

            if (this.data2[i].subMenus != undefined) {
              var child = this.data2[i];
              for (let j = 0; j < child.subMenus.length; j++) {
                console.log(child.subMenus[j].id);
                this.temp.check.remove(child.subMenus[j].id);
              }
            }
          }
          console.log(a.menuIdList);
          console.log(this.temp.check);
          this.$nextTick(() => {
            this.$refs.domTree.setCheckedKeys(this.temp.check);
          });
        } else {
          this.$message({
            type: "warning",
            message: "请求失败"
          });
        }
      });
    },
    //删除数据
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(row);
          var obj = {
            id: row.id
          };
          delStation(obj)
            .then(res => {
              console.log(res);
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList();
              } else {
                this.$message({
                  type: "warning",
                  message: res.data.data
                });
              }
            })
            .catch(() => {
              this.listLoading = false
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getLv() {
      // for (var i = 0; i < this.stationLv.length; i++) {
      //   if ("2" == this.stationLv[i].id) {
      //     return this.stationLv[i].value;
      //   }
      // }
    },
    getFather(data) {
      console.log(121233213);
      for (var i in data) {
        
        if (data[i].subMenus != undefined) {
          console.log(i);
          this.getFather(data[i].subMenus);
        } else {
          if (this.data2.indexOf(data[i].id) > -1) {
            console.log(data[i].parentId);
          }
        }
      }
    },
    //新增
    create(formName) {
      this.search = {
        name: "",
        officeId: ""
      };
      //console.log(this.temp.check);
      var arr = this.$refs.domTree.getCheckedKeys();
      var str = "";
      for (var i = 0; i < arr.length; i++) {
        str += arr[i] + ",";
      }
      //return;
      var obj = {
        name: this.temp.name,
        dataScope: this.temp.dataScope,
        menuIds: str,
        useable: "1", //状态
        organization: {
          id: this.temp.officeId
        }
      };
      console.log(obj);
    
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true
          addStation(obj).then(res => {
            this.btnState = false;
            console.log(res);
            if (res.data.code === 1) {
              this.resetTemp();
              this.$refs[formName].resetFields();
              this.$refs.domTree.setCheckedKeys([]);
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.dialogFormVisible = false;
              this.listQuery.page = 1;
              this.pageNumber = 1;
              this.handleFilter();
            } else {
              //this.$refs.domTree.setCheckedKeys([]);
              // this.resetTemp();
              this.$message({
                type: "error",
                message: res.data.data[0]
              });
            }
          }).catch(err=>{
            this.btnState = false;
          });
        } else {
          return false;
        }
      });
    },
    //编辑
    update(formName) {
      var arr = this.$refs.domTree.getCheckedKeys();
      var str = "";
      for (var i = 0; i < arr.length; i++) {
        str += arr[i] + ",";
      }
      var obj = {
        id: this.roleId,
        name: this.temp.name,
        dataScope: this.temp.dataScope,
        menuIds: str,
        useable: "1", //状态
        organization: {
          id: this.temp.officeId
        }
      };
      console.log(obj);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true
          upStation(obj).then(res => {
            this.btnState = false;
            if (res.data.code === 1) {
              this.resetTemp();
              this.$refs.domTree.setCheckedKeys([]);
              this.$refs[formName].resetFields();
              this.dialogFormVisible = false;
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.getList();
            } else {
              if (typeof res.data.data == "string") {
                this.$message({
                  type: "error",
                  message: res.data.data
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.data.data[0]
                });
              }
            }
          }).catch(err=>{
            this.btnState = false;
          });
        } else {
          return false;
        }
      });
    },
    //清空表单
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.resetTemp();
      this.$refs.domTree.setCheckedKeys([]);
      this.$refs[formName].resetFields();
    },
    //清空data
    resetTemp() {
      this.temp = {
        officeId: "",
        name: "",
        dataScope: "",
        check: []
      };
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
.el-tree-node
  .el-tree-node__children
  .el-tree-node
  .el-tree-node__children
  .el-tree-node__children
  .el-tree-node {
  float: left;
}
.el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node {
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
.ceshi3 {
  font-size: 14px;
  color: #1d85fe;
  border: 1px solid #1d85fe;
  background-color: #ffffff;
}
.dialog-footer {
  text-align: center;
}
.scrollBox {
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.diasize .el-dialog{
  width: 60%;
}
</style>
