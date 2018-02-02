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
          <!-- v-if判断按钮权限 -->
          <el-button class="el-icon-edit ceshi3" v-if="btnShow.indexOf('role_update') != -1"  @click="handleUpdate(scope.row)"></el-button>
          <el-button class="el-icon-delete ceshi3"  v-if="btnShow.indexOf('role_delete') != -1" @click="handleDelete(scope.row)"></el-button>

        </template>
      </el-table-column>

    </el-table>
    <!-- 列表结束 -->
    <!-- 分页器 -->
    <div v-if="!listLoading" class="pagination-container">
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
          <el-select :disabled="selsctState" class="form_item" filterable @change="aaa" v-model="temp.officeId" placeholder="请选择">
            <el-option v-for="item in officeIds" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="岗位名称:" prop="name">
          <el-input v-model.trim="temp.name" class="form_item" placeholder="请输入2-15位的岗位名称"></el-input>
        </el-form-item>

        <!-- <el-form-item label="等级:" prop="dataScope">
          <el-select class="form_item" @change="lvChange" disabled v-model="temp.dataScope" placeholder="请选择">
            <el-option v-for="item in roleLv" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
          </el-select>
          <p style="font-size: 12px;color:#8391a5">* 十级权限最高，一级权限最低</p>
        </el-form-item> -->

        <el-form-item label="权限:" class="treecss" prop="check" >
            <el-tree
            class="scrollBox form_item"
              :data="data2"
              :indent= 30
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
        <button class="button-large btn-color" :disabled="btnState" v-if="dialogStatus == 'update' && myselfUpdate" @click="update('temp')">保 存</button>    
        <button class="button-large btn-color" :disabled="btnState" v-if="dialogStatus == 'create'" @click="create('temp')">保 存</button>    
        <button class="button-cancel btn-color-cancel" @click="resetForm('temp')">取 消</button>
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
} from "@/api/staff"; //接口调用
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
var data = [];

const state = [{ value: "可用", key: "1" }, { value: "不可用", key: "0" }];
export default {
  name: "role",
  directives: {
    waves
  },
  data() {
    //表单验证
    var validateName = (rule, value, callback) => {
      var that = this;
      if (!value) {
        return callback(new Error("岗位名不能为空"));
      } else {
        if (this.dialogStatus == "create") {
          var obj = {
            name: value,
            id: this.temp.officeId
          };
          chkName(obj).then(res => {
            if (res.data.code == 0) {
              callback(new Error("岗位名重复！"));
            } else {
              callback();
            }
          });
        } else {
          var obj = {
            roleId: this.roleId,
            name: value,
            id: this.temp.officeId
          };
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
      btnShow: JSON.parse(localStorage.getItem("btn")),
      btnState: false,
      selsctState: false,
      myselfUpdate: true,
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
        dataScope: "10",
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
        officeId: [
          { required: true, message: "机构不能为空", trigger: "change" }
        ],
        name: [
          {
            required: true,
            message: "岗位名称不能为空",
            trigger: "blur"
          },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        dataScope: [
          { required: true, message: "等级不能为空", trigger: "change" }
        ],
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
      this.officeIds = res.data.data.list;
    });
    //获取用户等级
    var lv = localStorage.getItem("dataScope");
    for (var i = 0; i < lv; i++) {
      this.roleLv.push(this.stationLv[i]);
    }
  },
  methods: {
    aaa(val) {
      //测试函数
    },
    getList() {
      //获取列表
      this.listLoading = true;
      var obj = {
        name: this.search.name,
        organization: { id: this.search.officeId }
      };
      if (obj.name != "" || obj.organization.id != "") {
        this.listLoading = true;
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

      var obj = {
        name: this.search.name,
        organization: { id: this.search.officeId }
      };

      this.listLoading = true;
      if (obj.name != "" || obj.organization.id != "") {
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.listLoading = true;
      var obj = {
        name: this.search.name,
        organization: { id: this.search.officeId }
      };
      if (obj.name != "" || obj.organization.id != "") {
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          if (res.data.code === 1) {
            this.total = res.data.data.count;
            this.list = res.data.data.list;
            this.pageNumber = res.data.data.pageNo;
            this.pageSize = res.data.data.pageSize;
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
      } else {
        var obj = {};
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          if (res.data.code === 1) {
            this.total = res.data.data.count;
            this.list = res.data.data.list;
            this.pageNumber = res.data.data.pageNo;
            this.pageSize = res.data.data.pageSize;
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
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.listLoading = true;
      var obj = {
        name: this.search.name,
        organization: { id: this.search.officeId }
      };
      if (obj.name != "" || obj.organization.id != "") {
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          if (res.data.code === 1) {
            this.total = res.data.data.count;
            this.list = res.data.data.list;
            this.pageNumber = res.data.data.pageNo;
            this.pageSize = res.data.data.pageSize;
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
      } else {
        var obj = {};
        getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
          if (res.data.code === 1) {
            this.total = res.data.data.count;
            this.list = res.data.data.list;
            this.pageNumber = res.data.data.pageNo;
            this.pageSize = res.data.data.pageSize;
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
    handTreechange(a, b, c) {
      if (b) {
        // 处理订单里的查看详情
        if (
          ["order_time", "order_dispatch", "order_addTech"].indexOf(
            a.permission
          ) > -1
        ) {
          var arr = a.parentIds.split(",");
          for (var i = 0; i < this.data2.length; i++) {
            if (this.data2[i].subMenus != undefined) {
              for (var j = 0; j < this.data2[i].subMenus.length; j++) {
                if (this.data2[i].subMenus[j].permission == "order") {
                  this.$refs.domTree.setChecked(
                    this.data2[i].subMenus[j].subMenus[
                      this.data2[i].subMenus[j].subMenus.length - 2
                    ].id,
                    true
                  );
                }
              }
            } else {
            }
          }
        }
        //订单详情处理完毕
        //自动勾选列表权限
        if (a.subMenus == undefined) {
          var arr = a.parentIds.split(",");
          for (var i = 0; i < this.data2.length; i++) {
            if (this.data2[i].subMenus != undefined) {
              for (var j = 0; j < this.data2[i].subMenus.length; j++) {
                if (this.data2[i].subMenus[j].id == arr[3]) {
                  var str = this.data2[i].subMenus[j].subMenus[
                    this.data2[i].subMenus[j].subMenus.length - 1
                  ];
                  if (str.permission != undefined) {
                    var per = str.permission;
                    var newper = per.substring(per.length - 4, per.length);

                    if (newper == "view") {
                      this.$refs.domTree.setChecked(str.id, true);
                    }
                  } else {
                  }
                }
              }
            }
          }
        } else {
        }
        //自动勾选列表权限结束
      } else {
        //订单的查看详情不可取消

        if (a.permission == "order_info") {
          for (var i = 0; i < this.data2.length; i++) {
            if (this.data2[i].subMenus != undefined) {
              for (var j = 0; j < this.data2[i].subMenus.length; j++) {
                if (this.data2[i].subMenus[j].permission == "order") {
                  var orderarr = this.data2[i].subMenus[j];
                  for (var k = 0; k < orderarr.subMenus.length - 2; k++) {
                    if (this.temp.check.indexOf(orderarr.subMenus[k].id) > -1) {
                      this.$refs.domTree.setChecked(
                        this.data2[i].subMenus[j].subMenus[
                          orderarr.subMenus.length - 2
                        ].id,
                        true
                      );
                      this.temp.check = this.$refs.domTree.getCheckedKeys();
                    }
                  }
                }
              }
            }
          }
        }
        //订单处理结束

        //处理列表权限不可取消
        if (
          a.permission.substring(
            a.permission.length - 4,
            a.permission.length
          ) == "view"
        ) {
          var arr1 = a.parentIds.split(",");
          for (var i = 0; i < this.data2.length; i++) {
            if (this.data2[i].subMenus != undefined) {
              for (var j = 0; j < this.data2[i].subMenus.length; j++) {
                if (this.data2[i].subMenus[j].id == arr1[3]) {
                  for (
                    var k = 0;
                    k < this.data2[i].subMenus[j].subMenus.length - 1;
                    k++
                  ) {
                    if (
                      this.temp.check.indexOf(
                        this.data2[i].subMenus[j].subMenus[k].id
                      ) > -1
                    ) {
                      this.$refs.domTree.setChecked(
                        this.data2[i].subMenus[j].subMenus[
                          this.data2[i].subMenus[j].subMenus.length - 1
                        ].id,
                        true
                      );
                    }
                  }
                }
              }
            }
          }
        }

        //列表处理完毕
      }

      this.temp.check = this.$refs.domTree.getCheckedKeys();
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
    lvChange(value) {
      
    },
    offChange(val) {},
    //点击新增时
    handleCreate() {
      //this.resetTemp();
      this.listLoading = true;
      getMenudata()
        .then(res => {
          this.data2 = res.data.data;
          if (res.data.code == 1) {
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.listLoading = false;
            if (this.officeIds.length == 1) {
              this.temp.officeId = this.officeIds[0].id;
            }
          } else {
            this.listLoading = false;
          }
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    //点击编辑时
    handleUpdate(row) {
      this.myselfUpdate = true;
      this.listLoading = true;
      getPower(row.id).then(res => {
        this.listLoading = false;
        if (res.data.code == 1) {
          //处理权限位置
          //处理订单的查看详情
          var arr = res.data.data.menuListUnion;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].subMenus != undefined) {
              var arri = arr[i].subMenus;
              for (var j = 0; j < arri.length; j++) {
                if (arri[j].subMenus != undefined) {
                  var arrj = arri[j].subMenus;
                  for (var k = 0; k < arrj.length; k++) {
                    var arrk = arrj[k];
                    if (arrk.permission != undefined) {
                      if (arrk.permission == "order_info") {
                        if (arrk.disabled == undefined) {
                          arrj.remove(arrk);
                          arrj.push(arrk);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          //处理所有列表权限
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].subMenus != undefined) {
              var arri = arr[i].subMenus;
              for (var j = 0; j < arri.length; j++) {
                if (arri[j].subMenus != undefined) {
                  var arrj = arri[j].subMenus;
                  for (var k = 0; k < arrj.length; k++) {
                    var arrk = arrj[k];
                    if (arrk.permission != undefined) {
                      if (
                        arrk.permission.substring(
                          arrk.permission.length - 4,
                          arrk.permission.length
                        ) == "view"
                      ) {
                        if (arrk.disabled == undefined) {
                          var obj = arrk;
                          arrj.remove(arrk);
                          arrj.push(arrk);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          this.data2 = arr;
          if (localStorage.getItem("roleId") == res.data.data.id) {
            this.myselfUpdate = false;
          }
          if (res.data.data.flagRoleId) {
            this.myselfUpdate = false;
            this.$nextTick(() => {
              this.myselfUpdate = false;
            });
          }
          this.dialogStatus = "update";
          this.dialogFormVisible = true;
          var a = res.data.data;
          this.roleId = a.id;
          this.temp.officeId = a.organization.id;
          this.temp.name = a.name;
          //this.temp.dataScope = a.dataScope;
          //一期默认10级
          this.temp.dataScope = "10";

          //this.temp.check = a.menuIdList;
          this.temp.check = a.menuIdListEdit;

          if (res.data.data.flag) {
            this.selsctState = true;
          }
          for (let i = 0; i < this.data2.length; i++) {
            //特殊首页处理
            if (this.data2[i].permission == "index") {
            } else {
              this.temp.check.remove(this.data2[i].id);
            }

            if (this.data2[i].subMenus != undefined) {
              var child = this.data2[i];
              for (let j = 0; j < child.subMenus.length; j++) {
                this.temp.check.remove(child.subMenus[j].id);
              }
            }
          }

          this.$nextTick(() => {
            this.$refs.domTree.setCheckedKeys(this.temp.check);
          });
        } else {
          this.listLoading = false;
          
        }
      });
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
      // for (var i = 0; i < this.stationLv.length; i++) {
      //   if ("2" == this.stationLv[i].id) {
      //     return this.stationLv[i].value;
      //   }
      // }
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
    //新增
    create(formName) {
      var arr = this.$refs.domTree.getCheckedKeys();
      var str = "";
      for (var i = 0; i < arr.length; i++) {
        str += arr[i] + ",";
      }
      //return;
      var obj = {
        name: this.temp.name,
        //dataScope: this.temp.dataScope,
        dataScope: "10",
        menuIds: str,
        useable: "1", //状态
        organization: {
          id: this.temp.officeId
        }
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          addStation(obj)
            .then(res => {
              this.btnState = false;

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
                this.search = {
                  name: "",
                  officeId: ""
                };
                this.handleFilter();
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
        //dataScope: "10",
        menuIds: str,
        useable: "1", //状态
        organization: {
          id: this.temp.officeId
        }
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          upStation(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code === 1) {
                this.selsctState = false;
                this.resetTemp();
                this.$refs.domTree.setCheckedKeys([]);
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                this.getList();
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
    //清空表单
    resetForm(formName) {
      this.selsctState = false;
      this.dialogFormVisible = false;
      this.$refs.domTree.setCheckedKeys([]);
      this.$refs[formName].resetFields();
      this.resetTemp();
      //setTimeout(() => {

      //}, 900);
    },
    //清空data
    resetTemp() {
      this.temp = {
        officeId: "",
        name: "",
        dataScope: "10",
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
.diasize .el-dialog {
  width: 60%;
}
</style>
