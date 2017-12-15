<template>
  <div>
    <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索的岗位名称" v-model="search">
      </el-input>
      <button class="button-large el-icon-search btn_right" @click="handleFilter"> 搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_right btn_pad ceshi" v-if="btnShow.indexOf('role_insert') >= 0"  @click="handleCreate">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>
    <el-table
      :key="tableKey"
      :data="list"
      stripe
      v-loading="listLoading"
      element-loading-text="正在加载"
      fit
      highlight-current-row
      style="width: 100%">

      <el-table-column align="center" label="编号" type="index" width="300">
      </el-table-column>

      <el-table-column  label="岗位名称" align="center" prop="name" >
      </el-table-column>


      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button class="el-icon-edit ceshi3" v-if="btnShow.indexOf('role_update') >= 0" @click="handleUpdate(scope.row)"></el-button>
          <el-button class="el-icon-delete ceshi3" v-if="btnShow.indexOf('role_delete') >= 0" @click="handleDelete(scope.row)"></el-button>

        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog 
       :title="textMap[dialogStatus]" 
       :visible.sync="dialogFormVisible" 
       :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
       class="diatable">
      <el-form 
        class="small-space" 
        :model="temp" 
        label-position="left"
        :rules="rules"
        ref="temp" 
        label-width="160px" 
        style='width: 500px; margin-left:20px;'>

        <el-form-item label=" 所属机构"  prop="officeId">
          <el-select style='width: 400px;' class="filter-item" @change="aaa" v-model="temp.officeId" placeholder="请选择">
            <el-option v-for="item in officeIds" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="岗位名称" prop="name">
          <el-input v-model="temp.name" style='width: 400px;' placeholder="请输入2-15位的岗位名称"></el-input>
        </el-form-item>

        <el-form-item label="等级" prop="dataScope">
          <el-select style='width: 400px;' class="filter-item" @change="lvChange" v-model="temp.dataScope" placeholder="请选择">
            <el-option v-for="item in stationLv" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="权限" prop="check">
            <el-tree
              :data="data2"
              :indent= 10
              show-checkbox
              node-key="id"
              v-model="temp.check"
              ref="domTree"
              style='width: 400px;'
              @check-change="handTreechange"
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
        <button class="button-large" v-if="dialogStatus == 'update'" @click="update('temp')">保 存</button>    
        <button class="button-large" v-else @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>

  </div>
  </div>
</div>
</template>

<script>
import {
  getStationPage,
  addStation,
  delStation,
  getPower,
  getMenudata,
  getSList,
  chkName
} from "@/api/staff";
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
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("岗位名不能为空"));
      } else {
        console.log(this.dialogStatus);
        if (this.dialogStatus == "create") {
          var obj = {};
          chkName(obj).then(res => {
            if (res.data.code == 0) {
              callback(new Error("岗位名重复！"));
            } else {
              callback();
            }
          });
        }else{
          callback();
        }
      }
    };
    return {
      btnShow: this.$store.state.user.buttonshow,
      list: [],
      officeIds: [],
      total: null,
      listLoading: false,
      state: false,
      search: "",
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
      // stationState: "1",
      temp: {
        officeId: "",
        name: "",
        dataScope: "",
        check: []
      },
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
      dialogFormVisible: false,
      state: state,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
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
  watch: {
    // "temp.check": {
    //   handler(curVal, oldVal) {
    //     // 判断顺序（增，删，改）
    //     // 员工
    //     if (
    //       this.temp.check.indexOf("887fd8696f9f46f2a7129489ca60038f") != -1 ||
    //       this.temp.check.indexOf("b9b621428ef24acfb695c31395c2efb4") != -1 ||
    //       this.temp.check.indexOf("761d02662d7546cfa18e4d0fc5af2168") != -1
    //     ) {
    //       this.$refs.domTree.setChecked(
    //         "ae3383c47b7b4889a20c5eca04f24419",
    //         true
    //       );
    //     }
    //     // 岗位
    //     if (
    //       this.temp.check.indexOf("ca01d14ee3174f30a3a16274041c63c4") != -1 ||
    //       this.temp.check.indexOf("b5c64c8418f748179a50bca5f1fe1981") != -1 ||
    //       this.temp.check.indexOf("2490d6c57fa7492db6feae0322ba1e29") != -1
    //     ) {
    //       this.$refs.domTree.setChecked(
    //         "2c77fc7f3a1744fc984b78640bb697d0",
    //         true
    //       );
    //     }
    //     // 服务机构
    //     if (
    //       this.temp.check.indexOf("02806b87f7614ce385174075c7bd9425") != -1 ||
    //       this.temp.check.indexOf("c54aa1a86bb7490886c9bbe3c3b3ebc9") != -1 ||
    //       this.temp.check.indexOf("3b0069b7b482422bab8cae52e5d79734") != -1
    //     ) {
    //       this.$refs.domTree.setChecked(
    //         "d0bab306e5844b43a7b60a8bd7f22b1b",
    //         true
    //       );
    //     }
    //   }
    // }
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
    getMenudata().then(res => {
      console.log("权限列表");
      console.log(res);
      this.data2 = res.data.data;
    });
    getSList({}).then(res => {
      console.log("所属机构");
      console.log(res);
      this.officeIds = res.data.data.list;
      console.log(this.officeIds)
    });
  },
  methods: {
    aaa(val){
      console.log(val)
    },
    getList() {
      this.listLoading = true;
      var obj = {};
      getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
        console.log(res);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      var obj = {
        name: this.search
      };
      if (this.search) {
        this.listLoading = true;
        getStationPage(obj).then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.list = res.data.data.list;
            this.total = res.data.data.count;
            this.listLoading = false;
          } else {
            this.$message({
              type: "warning",
              message: "岗位名不存在"
            });
          }
        });
      } else {
        console.log(11111);
        this.getList();
      }
    },
    handleSizeChange(val) {
      console.log("size-change");
      this.pageSize = val;
      var obj = {
        name: this.search
      };
      getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      console.log("current-change");
      this.pageNumber = val;
      var obj = {
        name: this.search
      };
      this.listLoading = true;
      getStationPage(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        this.listLoading = false;
      });
    },
    handTreechange(a, b, c) {
      console.log(a);
      this.temp.check = this.$refs.domTree.getCheckedKeys();
      console.log(this.temp.check);
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
      console.log(value);
      // this.temp.dataScope = value;
    },
    offChange(val) {
      console.log(val);
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      getPower(row.id).then(res => {
        console.log(res);
        this.temp.check = res.data.data.menuIdList;
        this.$refs.domTree.setCheckedKeys(this.temp.check);
      });

      this.dataScope = row.dataScope;

      this.temp = Object.assign({}, row);
      this.stationState = this.temp.useable;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
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
              this.$message({
                type: "warning",
                message: "服务器已断开，请稍后再试"
              });
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
      for (var i = 0; i < this.stationLv.length; i++) {
        if ("2" == this.stationLv[i].id) {
          return this.stationLv[i].value;
        }
      }
    },
    getFather(data) {
      console.log(121233213);
      for (var i in data) {
        //  if(this.data2.indexOf(data[i].id) > -1){
        //    console.log(i)
        //    data.push(data[i].parentId)
        //  }else {
        //    this.getFather(data[i].submenus)
        //  }
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
    create(formName) {
      //console.log(this.temp.check);
      var arr = this.$refs.domTree.getCheckedKeys();
      // console.log(arr);
      // var parentId = []
      // for (var i = 0; i < this.data2.length; i++) {
      //   //console.log("i" + i);
      //   //console.log(this.data2[i].subMenus);
      //   for (var j = 0; j < this.data2[i].subMenus.length; j++) {
      //     //console.log("j" + j);
      //     //console.log(this.data2[i].subMenus[j].subMenus);
      //     var a = this.data2[i].subMenus[j]
      //     if(a.subMenus != undefined){
      //       for (var k=0;k< a.subMenus.length;k++){
      //         if(arr.indexOf(a.subMenus[k].id) > -1){
      //           console.log(a.subMenus[k].parentIds)
      //         }
      //       }
      //     }else{
      //       console.log("第二层")
      //       if(arr.indexOf(this.data2[i].subMenus[j].id) > -1){
      //          console.log(this.data2[i].subMenus[j].parentIds)
      //       }
      //     }
      //   }
      // }

      var str = "";
      for (var i = 0; i < arr.length; i++) {
        str += arr[i] + ",";
      }
      //return;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = {
            name: this.temp.name,
            dataScope: this.temp.dataScope,
            menuIds: str
            // useable: this.stationState //状态
          };

          addStation(obj).then(res => {
            console.log(res);
            if (res.data.code === 1) {
              this.resetTemp();
              this.$refs.domTree.setCheckedKeys([]);
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.dialogFormVisible = false;
              this.getList();
            } else {
              //this.$refs.domTree.setCheckedKeys([]);
              // this.resetTemp();
              this.$message({
                type: "error",
                message: res.data.data
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    update(formName) {
      var arr = this.$refs.domTree.getCheckedKeys();
      var str = "";
      for (var i = 0; i < arr.length; i++) {
        str += arr[i] + ",";
      }
      this.$refs[formName].validate(valid => {
        console.log(this.dataScope);
        if (valid) {
          var obj = {
            id: this.temp.id,
            name: this.temp.name,
            dataScope: this.temp.dataScope,
            menuIds: str,
            useable: this.stationState //状态
          };
          this.dialogFormVisible = false;
          addStation(obj).then(res => {
            this.resetTemp();
            this.$refs.domTree.setCheckedKeys([]);
            this.$refs[formName].resetFields();
            if (res.data.code === 1) {
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.getList();
            } else {
              this.$message({
                type: "error",
                message: "发生未知错误"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.resetTemp();
      this.$refs.domTree.setCheckedKeys([]);
      this.$refs[formName].resetFields();
    },
    resetTemp() {
      this.temp = {
        name: "",
        dataScope: "",
        check: []
      };
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
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
body {
  background-color: #eef1f6;
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
.el-tree-node:nth-child(1)
  .el-tree-node__children
  .el-tree-node__children
  .el-tree-node {
  float: none;
}
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
</style>
