<template>
<div>
  <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索手机号" v-model="search.phone">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索的岗位名称" v-model="search.name">
      </el-input>

     
      <button class="button-large btn_right el-icon-search ceshi5" @click="handleFilter"> 搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_right btn_pad ceshi ceshi5" @click="handleCreate">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>
    <el-table 
      :key='tableKey' 
      :data="list" 
      stripe
      v-loading="listLoading" 
      element-loading-text="正在加载" 
      fit
      highlight-current-row
      style="width: 100%">

      <el-table-column align="center" label="编号" width="100" type="index">
      </el-table-column>

      <el-table-column align="center" label="姓名" prop="name" >
      </el-table-column>

      <el-table-column width="180px" align="center" label="手机号" prop="mobile">
      </el-table-column>

      <el-table-column width="100px"  label="岗位名称" align="center" prop="roleName">
      </el-table-column>

      <el-table-column width="150px" align="center" label="服务机构" prop="office.name">
      </el-table-column>

      <el-table-column  min-width="110px" align="center" label="服务站" prop="stationName">
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100px" prop="useable">
         <template scope="scope">
          <span v-if="scope.row.useable =='1'">可用</span>
					<span v-if="scope.row.useable =='0'">不可用</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
            <el-button class="el-icon-edit ceshi3" @click="handleUpdate(scope.row)"></el-button>
            <el-button class="el-icon-delete ceshi3" @click="handleDelete(scope.row)"></el-button>
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
      minwidth = "700px">
      <el-form 
        class="small-space" 
        :model="temp" 
        label-position="left" 
        label-width="160px"
        :rules="rules"
        ref="temp"
        style='width: 500px; margin-left:50px;'>

        <el-form-item label=" 用户名"  prop="name" >
              <el-input        
              style='width: 400px;' 
              placeholder="请输入2-15位的姓名" v-model="temp.name"></el-input>
            </el-form-item>
        
        <el-form-item label=" 手机号" prop="phone">
          <el-input 
            v-model="temp.phone"
            style='width: 400px;'
            placeholder="请输入11位手机号"></el-input>
        </el-form-item>

        <el-form-item label=" 密码" prop="password">
          <el-input 
            v-model="temp.password" 
            style='width: 400px;'
             type="password"
            placeholder="建议使用6-20位字母、数字和符号两种以上组合"></el-input>
        </el-form-item>

        <el-form-item label=" 确认密码"  prop="password2">
          <el-input

            style='width: 400px;'
            type="password"
            v-model="temp.password2"
            placeholder="再次填写密码"></el-input>
        </el-form-item>

        <el-form-item label=" 服务机构"  prop="mechanism">
          <el-select  filterable  style='width: 400px;' @change="mechChange" class="filter-item" v-model="temp.mechanism" placeholder="请选择">
            <el-option v-for="item in mechanismCheck" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 服务站" prop="servicestation" >
          <el-select  filterable  style='width: 400px;' @change="stationChange" class="filter-item" v-model="temp.servicestation" placeholder="请选择">
            <el-option v-for="item in servicestationCheck" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="  选择岗位" prop="station">
          <el-select  filterable ref="domSelect"  class="filter-item" @change="postChange" v-model="temp.station" placeholder="请选择">
            <el-option v-for="item in stationCheck" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
           <div class="btn_addStation" @click="dialogFormStation = true">新 增</div>
        </el-form-item>
        <el-form-item  label="可用状态" >
          <el-select style='width: 400px;' @change="peoStateChange" class="filter-item" v-model="temp.peostate" placeholder="请选择">
            <el-option v-for="item in peostateCheck" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="button-large" v-if="dialogStatus == 'update'" @click="update('temp')">保 存</button>    
        <button class="button-large" v-else @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    
    

     
  </el-dialog>
  <el-dialog 
       title="新增岗位" 
       :visible.sync="dialogFormStation" 
       append-to-body
       :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
       class="twoDialog" 
      >
      
      <el-form 
        class="small-space" 
        :model="temp2" 
        label-position="left"
        :rules="rules2"
        ref="temp2" 
        label-width="80px" 
        style='width: 500px; margin-left:20px;'>

        <el-form-item label="岗位名称" prop="name">
          <el-input v-model="temp2.name" style='width: 400px;' placeholder="请输入2-15位的岗位名称"></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="dataScope">
          <el-select style='width: 400px;' class="filter-item" @change="lvChange" v-model="dataScope" placeholder="请选择">
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
              v-model="temp2.check"
              ref="domTree"
              style='width: 400px;'
              @check-change="handTreechange"
              :default-expand-all = "true"
              :props="defaultProps">
            </el-tree>
           
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select style='width: 400px;' class="filter-item" v-model="stationState" placeholder="可用">
            <el-option v-for="item in stationStateCheck" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
          </el-select>
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <button class="button-cancel" @click="dialogFormStation = false">取 消</button> -->

        <!-- <button class="button-large" v-if="dialogStatus == 'update'" @click="update('temp2')">保 存</button>     -->
        <button class="button-large" @click="create2('temp2')">保 存</button>    
        <button class="button-cancel" @click="resetForm2('temp2')">取 消</button>
      </div>
    </el-dialog>
    

  </div>
  </div>
</div>
</template>

<script>
import {
  staffList,
  addStaff,
  getStaff,
  addMech,
  getSList,
  getStation,
  getFuwu,
  delStaff,
  getMenudata,
  addStation
} from "@/api/staff";
import { getSign } from "@/api/sign";
import waves from "@/directive/waves/index.js"; // 水波纹指令
//import { parseTime } from "@/utils";
// arr to obj

export default {
  name: "table_demo",
  directives: {
    waves
  },
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入6-20位密码'));
        } else {
          if (!(/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/.test(value))) {
						callback(new Error('密码由6-20位数字、字母、字符任意两种组成'));
					} else {
						callback();
					}
          if (this.temp.password2 !== '') {
            this.$refs.temp.validateField('password2');
          }
          callback();
        }
      };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.temp.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (!value) {
					return callback(new Error('电话号码不能为空'));
				}else{
					if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))) {
						callback(new Error('手机号码格式不正确！'));
					} else {
						callback();
					}
				}
    };
    return {
      list: null,
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

      pageSize: 10,
      total: 1,
      search: {
        phone: "",
        name: ""
      },
      mechanismCheck: [],
      servicestationCheck: [],
      temp: {
        phone: "",
        name: "",
        password: "",
        password2: "",
        mechanism: "",
        servicestation: "",
        station: "",
        peostate: "1",
        child: {
          check: []
        }
      },
      mechanism: "",
      servicestation: "",
      station: "",
      peostate: "1",
      data2: [],
      defaultProps: {
        children: "subMenus",
        label: "name"
      },
      temp2: {
        check: [],
        dataScope: "",
        stationState: ""
      },
      dataScope: "",
      stationState: "",
      importanceOptions: [1, 2, 3],
      stationCheck: [],
      peostateCheck: [{ id: "1", name: "可用" }, { id: "0", name: "不可用" }],
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
        { id: "10", value: "十级" },
      ],
      stationStateCheck: [{ id: "1", name: "可用" }, { id: "0", name: "不可用" }],

      dialogFormVisible: false,
      dialogFormStation: false,

      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      },
      dialogPvVisible: false,
      tableKey: 0,
      isIndeterminate: true,
      rules: {
        phone: [
          { required: true, validator: validatePhone, trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入 2 到 15 位的名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
          { min: 6, max: 20, message: "密码长度6-20个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        mechanism: [{ required: true, message: "机构不能为空", trigger: "change" }],
        servicestation: [
          { required: true, message: "服务站不能为空", trigger: "change" }
        ],
        station: [{ required: true, message: "岗位不能为空", trigger: "change" }]
      },
      rules2: {
        name: [
          { required: true, message: "请输入 2 到 15 位的分类名称", trigger: "blur" },
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
    },
    typeFilter(type) {
      return mechanismKeyValue[type];
    }
  },
  created() {
    this.getList();
    getSList().then(res => {
      console.log(res.data.data);
      this.mechanismCheck = res.data.data;
    });
    getStation().then(res => {
      console.log(res.data.data);
      this.stationCheck = res.data.data;
    });
    getMenudata().then(res => {
      console.log(res);
      this.data2 = res.data.data;
    });
  },
  methods: {
    getList() {
      var obj = {
        roleName: "",
        mobile: ""
      };
      this.listLoading = true;
      getStaff(obj ,this.pageNumber, this.pageSize).then(res => {
        console.log(res.data);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        //this.pageSize = res.data.data.pageSize;
        this.listLoading = false;
      });
    },
    handleFilter() {
      var obj = {
        roleName: this.search.name,
        mobile: this.search.phone
      };
      if (obj.roleName || obj.mobile) {
        this.listLoading = true;
        getStaff(obj,this.pageNumber, this.pageSize).then(res => {
           console.log(res)
          if (res.data.code === 1) {     
            this.list = res.data.data.list;
            this.total = res.data.data.count;
            this.listLoading = false;
            this.listQuery.page = 1
          } else {
            this.listLoading = false;
            this.$message({
              type: "warning",
              message: "员工不存在"
            });
          }
        });
      } else {
        this.getList();
      }
    },
    handleSizeChange(val) {
      var obj = {
        roleName: this.search.name,
        mobile: this.search.phone
      };
      console.log("size-change");
      this.pageSize = val;
      // var obj = {};
      getStaff(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      console.log("current-change");
      this.pageNumber = val;
      var obj = {
        roleName: this.search.name,
        mobile: this.search.phone
      };
      this.listLoading = true;
      getStaff(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        this.listLoading = false;
      });
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
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    addstation() {
      this.resetTemptwo();
    },
    handTreechange(a, b, c) {
      this.temp2.check = this.$refs.domTree.getCheckedKeys();
      console.log(this.temp2.check);
    },
    handleUpdate(row) {
      //this.handleCreate();
      this.dialogFormVisible = true;
      console.log(row)
      this.dialogStatus = "update";
      this.temp = {
        id: row.id,
        name: row.name,
        phone: row.mobile,
        mechanism: "",
        servicestation: row.stationId,
        station: row.roleId,
        peostate: row.useable
      };
      setTimeout(() => (this.temp.mechanism = row.office.id), 1000);

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
          delStaff(obj)
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
                  message: "删除失败"
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "warning",
                message: "删除失败"
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
    lvChange(value) {
      console.log(value);
      console.log(this.dataScope);
      this.temp2.dataScope = value;
      console.log(this.temp2.dataScope);
    },
    peoStateChange(val) {
      console.log(val);
      this.temp.peostate = val;
    },
    postChange(val) {
      console.log(val);
      this.temp.station = val;
    },
    stationChange(val) {
      console.log(val);
      this.temp.servicestation = val;
    },
    mechChange(val) {
      this.temp.mechanism = val;
      this.servicestation = "";
      console.log(val);
      var obj = {
        officeId: val
      };
      getFuwu(obj).then(res => {
        this.servicestationCheck = res.data.data;
        // console.log(res.data)
      });
    },
    handleCheckAllChange(event) {
      this.checkedPowers = event.target.checked ? powerOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedPowersChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.powers.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.powers.length;
    },
    getId(str) {
      for (var i = 0; i < this.objOptions.length; i++) {
        if (str == this.objOptions[i].value) {
          return this.objOptions[i].id;
        }
      }
    },
    create(formName) {
      console.log(this.temp);
      //var arr = [this]
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = {
            mobile: this.temp.phone,
            name: this.temp.name,
            newPassword: this.temp.password,
            officeId: this.temp.mechanism,
            stationId: this.temp.servicestation,
            roles: [this.temp.station],
            useable: this.temp.peostate
          };
          addStaff(obj).then(res => {
            console.log(res);
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
              this.$message({
                type: "error",
                message: "新增失败"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    create2(formName) {
      var arr = this.$refs.domTree.getCheckedKeys();
      var str = "";
      for (var i = 0; i < arr.length; i++) {
        str += arr[i] + ",";
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = {
            name: this.temp2.name,
            dataScope: this.temp2.dataScope,
            menuIds: str,
          };
          this.dialogFormStation = false;
          addStation(obj).then(res => {
            console.log(res);
            if (res.data.code === 1) {
              this.$refs.domTree.setCheckedKeys([]);
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.stationCheck.push(res.data.data);
             // console.log(res.data.data.id)
              this.temp.station = res.data.data.id;
              this.resetTemp2();
            } else {
              this.$refs.domTree.setCheckedKeys([]);
              //this.resetTemp2();
              this.$message({
                type: "error",
                message: "添加失败"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    update() {
      var obj = {
        id: this.temp.id,
        mobile: this.temp.phone,
        name: this.temp.name,
        newPassword: this.temp.password,
        officeId: this.temp.mechanism,
        stationId: this.temp.servicestation,
        roles: [this.temp.station],
        useable: this.temp.peostate
      };
      console.log(obj);
      //this.dialogFormVisible = false;
      addStaff(obj).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.dialogFormVisible = false;
          this.getList();
          this.$message({
            type: "success",
            message: "修改成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "修改失败"
          });
        }
      });
    },
    resetTemp() {
      this.temp = {
        phone: "",
        name: "",
        password: "",
        password2: "",
        mechanism: "",
        servicestation: "",
        station: "",
        peostate: "1"
      };
      this.temp.mechanism = ""
      this.temp.servicestation = ""
      this.temp.station = ""
      // this.mechanism = "";
      // this.servicestation = "";
      // this.station = "";
      // this.peostate = "1";
    },
    resetTemp2() {
      this.temp2 = {
        name: "",
        dataScope: "",
        check: []
      };
      this.dataScope = "";
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    resetForm2(formName) {
      this.temp2 = {
        name: "",
        dataScope: "",
        check: []
      };
      this.dataScope = "";
      this.dialogFormStation = false;
      this.$refs.domTree.setCheckedKeys([]);
      this.$refs[formName].resetFields();
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
.btn_station {
  background-color: #aeaeae;
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
.twoDialog {
  width: 100%;
  padding: 10%;
}
body {
  background-color: #eef1f6;
}
.bgWhite {
  background-color: #ffffff;
  padding:15px 20px 20px 20px;
}
.btn_pad {
  margin: 0px 0px 15px 20px;
}
.btn_right {
  float: right;
}
.el-table {
  font-size: 12px;
}
.el-table__header-wrapper {
  font-size: 14px;
}
.ceshi {
  height: 25px;
  width: 80px;
}
.ceshi2 label {
  padding-left: 12px;
}
.ceshi3 {
  font-size: 14px;
  color: #1d85fe;
  border: 1px solid #1d85fe;
  background-color: #ffffff;
}
.ceshi3:hover {
  color: #ffffff;
  border: 1px solid #3e9fff;
  background-color: #3e9fff;
}
.ceshi4 {
  color: #999999;
  border: 1px solid #b9b9b9;
  font-size: 14px;
  background-color: #ffffff;
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
.dialog-footer {
  text-align: center;
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
.btn_addStation{
  float: right;
  height: 34px;
  width: 80px;
  background-color: #fff;
  border: 1px solid #4c70e8;
  text-align: center;
  line-height: 34px;
  color: #4c70e8;
}
</style>