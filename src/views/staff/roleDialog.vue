<template>
	
<!-- 弹窗开始 -->
    <el-dialog
       :title="textMap[dialogStatus]"
       :visible.sync="dialogFormVisible"
       :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
       id="diatable"
       class="diatable diasize">
      <el-form 
        class="small-space dia_form"
        :model="temp" 
        label-position="left"
        :rules="rules"
        ref="temp" 
        label-width="160px" 
        >

        <el-form-item label="所属机构:"  prop="officeId">
          <el-select :disabled="selsctState" @change="orgChange" class="form_item" filterable v-model="temp.officeId" placeholder="请选择">
            <el-option v-for="item in officeIds" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="岗位名称:" prop="name">
          <el-input v-model.trim="temp.name" class="form_item" placeholder="请输入2-15位的岗位名称"></el-input>
        </el-form-item>

        <!-- <el-form-item label="等级:" prop="dataScope">
          <el-select class="form_item"  disabled v-model="temp.dataScope" placeholder="请选择">
            <el-option v-for="item in roleLv" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
          </el-select>
          <p style="font-size: 12px;color:#8391a5">* 十级权限最高，一级权限最低</p>
        </el-form-item> -->

        <el-form-item label="权限:" class="treecss" prop="check" >
            <el-tree
            class="scrollBox form_item"
              :data="treeData"
              :indent= 30
              show-checkbox
              node-key="id"    
              v-model="temp.check"
              ref="domTree"
              :filter-node-method="filterNode"
              @check-change="handTreechange"
              @node-click="nodeClick"
              @current-change="currentChange"
              @node-expand="nodeExpand"
              @node-collapse="nodeCollapse"
              :default-expand-all = "true"
              :props="defaultProps">
            </el-tree>
  
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- v-if判断当前是编辑还是新增 -->
        <button class="button-large btn-color" :disabled="btnState" v-if="dialogStatus == 'update' && myselfUpdate"  @click="update('temp')">保 存</button>    
        <button class="button-large btn-color" :disabled="btnState" v-if="dialogStatus == 'create'" @click="create('temp')">保 存</button>    
        <button class="button-cancel btn-color-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>
	
</template>

<script>
import Cookies from "js-cookie";
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
import { getSign } from "@/api/sign";
export default {
  name: "role-dialog",
  data() {
    return {
      btnShow: JSON.parse(localStorage.getItem("btn")), //按钮权限
      btnState: false, //按钮状态，是否禁用
      selsctState: false, //下拉框状态，是否禁用
      myselfUpdate: true, //判断是否编辑自己
      officeIds: [],
      treeData: [],
      temp: {
        name: "",
        dataScope: "10",
        check: [],
        officeId: ""
      },
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
      filterText: "", //树状图过滤
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑岗位",
        create: "新增岗位"
      },
      // treeData: [], //树状图数据
      defaultProps: {
        //树形结构参数
        children: "subMenus",
        label: "name"
      },
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
  computed: {},
  created() {
    //获取权限列表
    getMenudata().then(res => {
      this.treeData = res.data.data;
    });
    //获取机构
    getSList({}).then(res => {
      if (res.data.data.list != undefined) {
        this.officeIds = res.data.data.list;
      }
    });
  },
  props: ["diaState", "rowData","getlistByDia"],
  watch: {
    filterText(val) {
      this.$refs.domTree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.type.indexOf(value) !== -1;
    },
    orgChange(val) {
      if (val == "sys") {
        this.$nextTick(() => {
          this.filterText = "";
        });
      } else {
        this.$nextTick(() => {
          this.filterText = "business";
        });
      }
    },
    handleCreate() {
      this.listLoading = true;
      getSList({})
        .then(res => {
          this.officeIds = res.data.data.list;
          getMenudata().then(res => {
            this.data2 = res.data.data;
            if (res.data.code == 1) {
              this.dialogStatus = "create";
              this.dialogFormVisible = true;
              // this.roleDiaState = true;
              if (localStorage.getItem("type") == "platform") {
                this.filterText = "";
                this.$nextTick(() => {
                  this.filterText = "business";
                });
              } else {
                this.filterText = "";
              }
              this.listLoading = false;
              if (this.officeIds.length == 1) {
                this.temp.officeId = this.officeIds[0].id;
              }
            } else {
              this.listLoading = false;
            }
          });
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
          if (res.data.data.updateOwnFlag == "yes") {
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
          setTimeout(() => {
            this.temp.officeId = a.organization.id;
          }, 50);
          if (localStorage.getItem("type") == "platform") {
            this.filterText = "";
            this.$nextTick(() => {
              this.filterText = "business";
            });
          } else {
            this.filterText = "";
          }
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
    nodeClick(a, b, c) {},
    currentChange(a, b) {},
    nodeExpand(a, b, c) {},
    nodeCollapse(a, b, c) {},
    handTreechange(a, b, c) {
      if (b) {
        // 处理订单里的查看详情
        if (
          [
            "order_time",
            "order_dispatch",
            "order_addTech",
            "order_cancel"
          ].indexOf(a.permission) > -1
        ) {
          var arr = a.parentIds.split(",");
          for (var i = 0; i < this.treeData.length; i++) {
            if (this.treeData[i].subMenus != undefined) {
              for (var j = 0; j < this.treeData[i].subMenus.length; j++) {
                if (this.treeData[i].subMenus[j].permission == "order") {
                  this.$refs.domTree.setChecked(
                    this.treeData[i].subMenus[j].subMenus[
                      this.treeData[i].subMenus[j].subMenus.length - 2
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
          for (var i = 0; i < this.treeData.length; i++) {
            if (this.treeData[i].subMenus != undefined) {
              for (var j = 0; j < this.treeData[i].subMenus.length; j++) {
                if (this.treeData[i].subMenus[j].id == arr[3]) {
                  var str = this.treeData[i].subMenus[j].subMenus[
                    this.treeData[i].subMenus[j].subMenus.length - 1
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
          for (var i = 0; i < this.treeData.length; i++) {
            if (this.treeData[i].subMenus != undefined) {
              for (var j = 0; j < this.treeData[i].subMenus.length; j++) {
                if (this.treeData[i].subMenus[j].permission == "order") {
                  var orderarr = this.treeData[i].subMenus[j];
                  for (var k = 0; k < orderarr.subMenus.length - 2; k++) {
                    if (this.temp.check.indexOf(orderarr.subMenus[k].id) > -1) {
                      this.$refs.domTree.setChecked(
                        this.treeData[i].subMenus[j].subMenus[
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
          for (var i = 0; i < this.treeData.length; i++) {
            if (this.treeData[i].subMenus != undefined) {
              for (var j = 0; j < this.treeData[i].subMenus.length; j++) {
                if (this.treeData[i].subMenus[j].id == arr1[3]) {
                  for (
                    var k = 0;
                    k < this.treeData[i].subMenus[j].subMenus.length - 1;
                    k++
                  ) {
                    if (
                      this.temp.check.indexOf(
                        this.treeData[i].subMenus[j].subMenus[k].id
                      ) > -1
                    ) {
                      this.$refs.domTree.setChecked(
                        this.treeData[i].subMenus[j].subMenus[
                          this.treeData[i].subMenus[j].subMenus.length - 1
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
    forOfTree() {
      var sysArr = [];
      for (var i of this.data2) {
        if (i.type == "sys") {
          sysArr.push(i.id);
          for (var j of i.subMenus) {
            sysArr.push(j.id);
            if (j.subMenus) {
              for (var k of j.subMenus) {
                sysArr.push(k.id);
              }
            }
          }
        }
      }
      return sysArr;
    },
    //新增
    create(formName) {
      var arr = this.$refs.domTree.getCheckedKeys();
      var str = "";
      if (this.filterText == "business") {
        var sys = this.forOfTree();
        for (var i of sys) {
          arr.remove(i);
        }
      }
      if (arr.length == 0) {
        this.temp.check = [];
      }
      for (var i = 0; i < arr.length; i++) {
        str += arr[i] + ",";
      }
      // return;
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
                this.$emit('getlistByDia','create')
                // this.listQuery.page = 1;
                // this.pageNumber = 1;
                // this.search = {
                //   name: "",
                //   officeId: ""
                // };
                // this.handleFilter();
              } else {
                // loading.close();
              }
            })
            .catch(err => {
              // loading.close();
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
     //编辑
    update(formName) {
      var arr = this.$refs.domTree.getCheckedKeys();
      var str = "";

      if (this.filterText == "business") {
        var sys = this.forOfTree();
        for (var i of sys) {
          arr.remove(i);
        }
      }
      if (arr.length == 0) {
        this.temp.check = [];
      }
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
          // this.loadingClick();
          this.btnState = true;
          upStation(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code === 1) {
                // loading.close();
                this.selsctState = false;
                this.resetTemp();
                this.$refs.domTree.setCheckedKeys([]);
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                // this.getList();
                this.$emit('getlistByDia','update')
              } else {
                // loading.close();
              }
            })
            .catch(err => {
              // loading.close();
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
    resetTemp() {
      this.temp = {
        officeId: "",
        name: "",
        dataScope: "10",
        check: []
      };
    },
    resetForm(formName) {
      this.selsctState = false;
      this.dialogFormVisible = false;
      this.$refs.domTree.setCheckedKeys([]);
      this.$refs[formName].resetFields();
      this.resetTemp();
    }
  }
};
</script>

<style>
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