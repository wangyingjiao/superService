<template>
  <div>
    <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索手机号" v-model="search.mobile">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;margin-left:15px;" class="filter-item" placeholder="请输入搜索的岗位名称" v-model="search.name">
      </el-input>
      <el-select  filterable  style='width: 200px;' clearable @change="searchOffice" class="filter-item" v-model="search.officeId" placeholder="选择机构">
        <el-option v-for="item in mechanismCheck" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
       
      <el-select  filterable  style='width: 200px;' clearable  class="filter-item" v-model="search.stationId" placeholder="选择服务站">
        <el-option v-for="item in servicestationCheck" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      

     
      <button class="button-large btn_right el-icon-search ceshi5" @click="handleFilter"> 搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_right btn_pad ceshi ceshi5" v-if="btnShow.indexOf('user_insert') >= 0" @click="handleCreate">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>
    <el-table 
      :key='tableKey' 
      :data="list" 
      v-loading="listLoading" 
      element-loading-text="正在加载" 
      fit
      style="width: 100%">

      <el-table-column align="center" label="编号" width="100">
        <template scope="scope">
            {{scope.row.index + (pageNumber-1) * pageSize}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="姓名" prop="name" >
      </el-table-column>

      <el-table-column width="180px" align="center" label="登录账号" prop="mobile">
      </el-table-column>

      <el-table-column min-width="150px"  label="岗位名称" align="center" prop="role.name">
      </el-table-column>

      <el-table-column width="150px" align="center" label="服务机构" prop="organization.name">
      </el-table-column>

      <el-table-column  min-width="110px" align="center" label="服务站" >
        <template scope="scope">
              <span v-if="scope.row.organization.id != 0&&scope.row.station.id == 0">本机构</span>
              <span v-else>{{scope.row.station.name}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100px" prop="useable">
         <template scope="scope">
          <span v-if="scope.row.useable =='1'">可用</span>
					<span v-if="scope.row.useable =='0'">不可用</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
            <el-button class="el-icon-edit ceshi3" v-if="btnShow.indexOf('user_update') >= 0" @click="handleUpdate(scope.row)"></el-button>
            <el-button class="el-icon-delete ceshi3" v-if="btnShow.indexOf('user_delete') >= 0" @click="handleDelete(scope.row)"></el-button>
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
        style='width: 560px; margin-left:20px;'>

        <el-form-item label="姓名:"  prop="name" >
              <el-input        
              style='width: 80%;' 
              placeholder="请输入2-15位的姓名" v-model="temp.name"></el-input>
            </el-form-item>
        
        <el-form-item label="登录账号:" prop="mobile">
          <el-input 
            v-model="temp.mobile"
            style='width: 80%;'
            placeholder="请输入11位手机号"></el-input>
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-input 
            v-model="temp.password" 
            style='width: 400px;'
             type="password"
            placeholder="请使用6-20位字母、数字两种组合"></el-input>
        </el-form-item>

        <el-form-item label="确认密码:" v-if="dialogStatus == 'create'"  prop="password2">
          <el-input

            style='width: 400px;'
            type="password"
            v-model="temp.password2"
            placeholder="再次填写密码"></el-input>
        </el-form-item>

        <el-form-item label="服务机构:"  prop="officeId">
          <el-select  filterable  style='width: 400px;' @change="mechChange" class="filter-item" v-model="temp.officeId" placeholder="请选择">
            <el-option v-for="item in mechanismCheck" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务站:" prop="stationId" >
          <el-select  filterable  style='width: 400px;' @change="stationChange" class="filter-item" v-model="temp.stationId" placeholder="请选择">
            <el-option v-for="item in servicestationCheck" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择岗位:" prop="role">
          <el-select  filterable ref="domSelect"  class="filter-item" v-model="temp.role" placeholder="请选择">
            <el-option v-for="item in stationCheck" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
           <div class="btn_addStation" @click="addRole">新 增</div>
        </el-form-item>
        <el-form-item  label="可用状态:" >
          <el-select style='width: 400px;' class="filter-item" v-model="temp.useable" placeholder="请选择">
            <el-option v-for="item in useableCheck" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="button-large" v-if="dialogStatus == 'update'" @click="update('temp')">保 存</button>    
        <button class="button-large" v-else :disabled="btnState"  @click="create('temp')">保 存</button>    
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
        
        <el-form-item label=" 所属机构:"  prop="officeId2">
          <el-select style='width: 400px;' class="filter-item"  v-model="temp2.officeId2" placeholder="请选择">
            <el-option v-for="item in mechanismCheck" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="岗位名称:" prop="name">
          <el-input v-model.trim="temp2.name" style='width: 400px;' placeholder="请输入2-15位的岗位名称"></el-input>
        </el-form-item>
        <el-form-item label="等级:" prop="dataScope">
          <el-select style='width: 400px;' class="filter-item" v-model="temp2.dataScope" placeholder="请选择">
            <el-option v-for="item in roleLv" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
          </el-select>
           <p style="font-size: 12px;color:#8391a5">* 十级权限最高，一级权限最低</p>
        </el-form-item>

        <el-form-item label="权限:" prop="check">
           <el-tree
              class="scrollBox"
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
      if (this.dialogStatus == "create") {
        if (value === "") {
          callback(new Error("请输入6-20位密码"));
        } else {
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)) {
            callback(new Error("密码必须由6-20位数字、字母组成"));
          } else {
            callback();
          }
          if (this.temp.password2 !== "") {
            this.$refs.temp.validateField("password2");
          }
          callback();
        }
      } else {
        if (value == undefined) {
          callback();
        } else {
          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)) {
            callback(new Error("密码必须由6-20位数字、字母两种组成"));
          } else {
            callback();
          }
        }
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
    var validatePass3 = (rule, value, callback) => {
      console.log(value, "value");
      if (value == undefined) {
        callback();
      } else {
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)) {
          callback(new Error("密码必须由6-20位数字、字母两种组成"));
        } else {
          callback();
        }
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      } else {
        if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
          callback(new Error("手机号码格式不正确！"));
        } else {
          callback();
        }
      }
    };
    return {
      btnShow: this.$store.state.user.buttonshow,
      btnState: false,
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
      pageNumber: 1,
      pageSize: 10,
      total: 1,
      search: {
        mobile: "",
        name: "",
        officeId: "",
        stationId: ""
      },
      mechanismCheck: [],
      servicestationCheck: [], // 服务站
      temp: {
        mobile: "",
        name: "",
        password: "",
        password2: "",
        password3: "",
        officeId: "",
        stationId: "",
        roles: "",
        useable: "1",
        child: {
          check: []
        }
      },

      data2: [],
      defaultProps: {
        children: "subMenus",
        label: "name"
      },
      temp2: {
        officeId2: "",
        check: [],
        dataScope: "",
        stationState: ""
      },
      stationState: "",
      stationCheck: [], // 岗位
      useableCheck: [{ id: "1", name: "可用" }, { id: "0", name: "不可用" }],
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
      stationStateCheck: [{ id: "1", name: "可用" }, { id: "0", name: "不可用" }],

      dialogFormVisible: false,
      dialogFormStation: false,

      dialogStatus: "",
      textMap: {
        update: "编辑员工",
        create: "新增员工"
      },
      dialogPvVisible: false,
      tableKey: 0,
      isIndeterminate: true,
      rules: {
        mobile: [{ required: true, validator: validatePhone, trigger: "blur" }],
        name: [
          {
            required: true,
            message: "请输入 2 到 15 位的名称",
            trigger: "blur"
          },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
          { min: 6, max: 20, message: "密码长度6-20个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        password3: [
          { required: true, validator: validatePass3, trigger: "blur" }
        ],
        officeId: [{ required: true, message: "机构不能为空", trigger: "change" }],
        stationId: [{ required: true, message: "服务站不能为空", trigger: "change" }],
        role: [{ required: true, message: "岗位不能为空", trigger: "change" }]
      },
      rules2: {
        officeId2: [{ required: true, message: "机构不能为空", trigger: "change" }],
        name: [
          {
            required: true,
            message: "请输入 2 到 15 位的分类名称",
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
    this.getList();
    getSList({}).then(res => {
      // 服务机构
      this.mechanismCheck = res.data.data.list;
    });
    // getStation().then(res => {
    //   // console.log(res.data.data);
    //   this.stationCheck = res.data.data;
    // });
    getMenudata().then(res => {
      console.log(res);
      this.data2 = res.data.data;
    });
    var lv = localStorage.getItem("dataScope");
    console.log(lv, "用户等级");
    for (var i = 0; i < lv; i++) {
      this.roleLv.push(this.stationLv[i]);
    }
  },
  methods: {
    getList() {
      var obj = {
        roleName: this.search.name,
        mobile: this.search.mobile
      };
      this.listLoading = true;
      getStaff(obj, this.pageNumber, this.pageSize).then(res => {
        console.log(res.data, "员工列表");
        this.list = res.data.data.list;
        if (this.list != undefined) {
          for (var i = 0; i < this.list.length; i++) {
            this.list[i].index = i + 1;
          }
        }
        this.total = res.data.data.count;
        //this.pageSize = res.data.data.pageSize;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      var obj = {
        roleName: this.search.name,
        mobile: this.search.mobile
      };
      if (obj.roleName || obj.mobile) {
        this.listLoading = true;
        getStaff(obj, this.pageNumber, this.pageSize).then(res => {
          console.log(res, "搜索");
          if (res.data.code === 1) {
            this.list = res.data.data.list;
            if (this.list != undefined) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].index = i + 1;
              }
            }
            this.total = res.data.data.count;
            this.listLoading = false;
            this.listQuery.page = 1;
          } else {
            this.listLoading = false;
          }
        });
      } else {
        this.getList();
      }
    },
    addRole() {
      this.dialogFormStation = true;
      if (this.mechanismCheck.length == 1) {
        console.log(this.mechanismCheck[0].id);
        this.temp2.officeId2 = this.mechanismCheck[0].id;
      }
    },
    handleSizeChange(val) {
      var obj = {
        roleName: this.search.name,
        mobile: this.search.mobile
      };
      console.log("size-change");
      this.pageSize = val;
      // var obj = {};
      getStaff(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        if (this.list != undefined) {
          for (var i = 0; i < this.list.length; i++) {
            this.list[i].index = i + 1;
          }
        }
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      console.log("current-change");
      this.pageNumber = val;
      var obj = {
        roleName: this.search.name,
        mobile: this.search.mobile
      };
      this.listLoading = true;
      getStaff(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        if (this.list != undefined) {
          for (var i = 0; i < this.list.length; i++) {
            this.list[i].index = i + 1;
          }
        }
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
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.resetTemp();
    },
    addstation() {
      this.resetTemptwo();
    },
    handTreechange(a, b, c) {
      if (b) {
        if (a.subMenus == undefined) {
          var arr = a.parentIds.split(",");
          for (var i = 0; i < this.data2.length; i++) {
            if (this.data2[i].id == arr[2]) {
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
      this.temp2.check = this.$refs.domTree.getCheckedKeys();
    },
    handleUpdate(row) {
      //this.handleCreate();
      this.dialogFormVisible = true;
      console.log(row);
      this.dialogStatus = "update";
      this.temp = {
        id: row.id,
        name: row.name,
        mobile: row.mobile,
        officeId: "",
        stationId: row.station.id,
        role: row.role.id,
        useable: row.useable
      };
      setTimeout(() => (this.temp.officeId = row.organization.id), 30);
      setTimeout(() => (this.temp.stationId = row.station.id), 30);
      setTimeout(() => (this.temp.role = row.role.id), 30);
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
                  message: res.data.data
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
    stationChange(val) {
      // console.log(val);
      // this.temp.stationId = val;
    },
    searchOffice(val) {
      // 搜索时机构改变
      this.search.stationId = "";
      var obj = {
        orgId: val
      };
      getFuwu(obj).then(res => {
        // 请求服务站列表
        console.log(res);
        this.servicestationCheck = res.data.data;
        // console.log(res.data)
      });
    },
    mechChange(val) {
      // 机构发生改变
      this.temp.officeId = val;
      this.temp.stationId = "";
      this.temp.role = "";
      console.log(val, "选中机构的id");
      var obj = {
        orgId: val
      };
      getFuwu(obj).then(res => {
        // 请求服务站
        console.log(res);
        this.servicestationCheck = res.data.data;
        // console.log(res.data)
      });
      var obj2 = {
        organization: {
          id: val
        }
      };
      console.log(obj2, "岗位参数");
      getStation(obj2)
        .then(res => {
          // 请求岗位
          console.log(res, "岗位");
          if (typeof res.data.data != "string") {
            this.stationCheck = res.data.data;
          } else {
            this.stationCheck = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getId(str) {
      for (var i = 0; i < this.objOptions.length; i++) {
        if (str == this.objOptions[i].value) {
          return this.objOptions[i].id;
        }
      }
    },
    create(formName) {
      this.btnState = true;
      setTimeout(() => {
        this.btnState = false;
      }, 1000);
      console.log(this.temp);
      //var arr = [this]
      var obj = {
        mobile: this.temp.mobile,
        name: this.temp.name,
        newPassword: this.temp.password,
        officeId: this.temp.officeId,
        stationId: this.temp.stationId,
        roles: [this.temp.role],
        useable: this.temp.useable
      };
      console.log(obj);
      this.$refs[formName].validate(valid => {
        if (valid) {
          addStaff(obj).then(res => {
            console.log(res);
            if (res.data.code === 1) {
              this.dialogFormVisible = false;
              this.resetTemp();
              this.$refs[formName].resetFields();
              this.listQuery.page = 1;
              this.pageNumber = 1;
              this.search.mobile = "";
              this.search.name = "";
              var obj = {};
              getStaff(obj, this.pageNumber, this.pageSize).then(res => {
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
                }
              });
              this.$message({
                type: "success",
                message: "新增成功"
              });
            } else {
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
    create2(formName) {
      var arr = this.$refs.domTree.getCheckedKeys();
      var str = "";
      for (var i = 0; i < arr.length; i++) {
        str += arr[i] + ",";
      }
      var obj = {
        name: this.temp2.name,
        dataScope: this.temp2.dataScope,
        menuIds: str,
        useable: "1",
        organization: {
          id: this.temp2.officeId2
        }
      };
      console.log(obj, "新增岗位");
      this.$refs[formName].validate(valid => {
        if (valid) {
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
              this.temp.role = res.data.data.id;
              this.resetTemp2();
            } else {
              //this.$refs.domTree.setCheckedKeys([]);
              //this.resetTemp2();
              this.$message({
                type: "error",
                message: res.data.data[0]
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    update(formName) {
      var that = this;
      var obj = {
        id: this.temp.id,
        mobile: this.temp.mobile,
        name: this.temp.name,
        newPassword: this.temp.password,
        officeId: this.temp.officeId,
        stationId: this.temp.stationId,
        roles: [this.temp.role],
        useable: this.temp.useable
      };
      console.log(obj);
      //this.dialogFormVisible = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          addStaff(obj).then(res => {
            console.log(res);
            if (res.data.code === 1) {
              // 判断是不是自己修改自己
              //if (0) {
              if (
                this.temp.id == localStorage.getItem("userId") &&
                obj.newPassword.length != undefined
              ) {
                console.log("编辑自己密码");
                this.$store
                  .dispatch("LogOut")
                  .then(res => {
                    this.$message({
                      type: "warning",
                      message: "密码被修改 3 秒后进入登录页面！"
                    });
                    this.dialogFormVisible = false;
                    setTimeout(() => {
                      that.$router.push({ path: "/login" });
                    }, 3000);
                  })
                  .catch(() => {
                    this.listLoading = false;
                  });
              } else {
                this.dialogFormVisible = false;
                this.resetTemp();
                this.$refs[formName].resetFields();
                this.getList();
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
              }
              // 判断结束
            } else {
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
    resetTemp() {
      this.temp = {
        name: "",
        mobile: "",
        password: "",
        password2: "",
        password3: "",
        officeId: "",
        stationId: "",
        role: "",
        useable: "1"
      };
    },
    resetTemp2() {
      this.temp2 = {
        officeId: "",
        name: "",
        dataScope: "",
        check: []
      };
      //this.dataScope = "";
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.resetTemp();
      this.$refs[formName].resetFields();
    },
    resetForm2(formName) {
      this.temp2 = {
        officeId: "",
        name: "",
        dataScope: "",
        check: []
      };
      //this.dataScope = "";
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
    margin-top: 3px;
    float: right;
    width: 75px;
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
  padding: 20px 20px 20px 20px;
}
.btn_pad {
  margin: 0px 0px 20px 20px;
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
.btn_addStation {
  float: right;
  height: 34px;
  width: 80px;
  background-color: #fff;
  border: 1px solid #4c70e8;
  text-align: center;
  line-height: 34px;
  color: #4c70e8;
  cursor: pointer;
}
.scrollBox {
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>