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

      <el-table-column width="100px"  label="岗位名称" align="center" prop="roleNames">
      </el-table-column>

      <el-table-column width="150px" align="center" label="服务机构">
        <template scope="scope">
          <span>日常保洁</span>
        </template>
      </el-table-column>

      <el-table-column  min-width="110px" align="center" label="服务站">
        <template scope="scope">
          <span >呼家楼服务站</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100px">
       <template scope="scope">
          <span>可用</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <!-- <el-button  size="small" @click="handleUpdate">编辑
          </el-button>
          <el-button  size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button> -->
          <!-- <div style="display:flex;justify-content: center;">
              <div class="site-div" @click="handleUpdate ">
                <div class="el-icon-edit "></div>
              
              </div>
              <div class="site-div" @click="handleModifyStatus(scope.row,'deleted')">
                <div class="el-icon-delete" style="margin-left:20px"></div>
         
              </div>
            </div> -->
            <el-button class="el-icon-edit ceshi3" @click="handleUpdate(scope.row)"></el-button>
            <el-button class="el-icon-delete ceshi3" @click="handleDelete(scope.row)"></el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog 
      :title="textMap[dialogStatus]" 
      :visible.sync="dialogFormVisible" 
      :show-close= false
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

        <el-form-item label=" 确认密码" prop="password2">
          <el-input
            style='width: 400px;'
            v-model="temp.password2"
            placeholder="再次填写密码"></el-input>
        </el-form-item>

        <el-form-item label=" 服务机构" >
          <el-select  style='width: 400px;' class="filter-item" v-model="mechanism" placeholder="请选择">
            <el-option v-for="item in mechanismCheck" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 服务站" >
          <el-select style='width: 400px;' class="filter-item" v-model="servicestation" placeholder="请选择">
            <el-option v-for="item in servicestationCheck" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="  选择岗位" >
          <el-select  class="filter-item" v-model="station" placeholder="请选择">
            <el-option v-for="item in stationCheck" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
           <button class="button-cancel" @click="dialogFormStation = true">新 增</button>
        </el-form-item>
        <el-form-item  label="可用状态" >
          <el-select style='width: 400px;' class="filter-item" v-model="peostate" placeholder="请选择">
            <el-option v-for="item in peostateCheck" :key="item.key" :label="item.name" :value="item.key">
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
       class="twoDialog" 
      >
      
      <el-form 
        class="small-space" 
        :model="temp2" 
        label-position="left"
        :rules="rules"
        ref="temp" 
        label-width="80px" 
        style='width: 500px; margin-left:20px;'>

        <el-form-item label="岗位名称">
          <el-input v-model="temp2.name" style='width: 400px;' placeholder="请输入2-15位的岗位名称"></el-input>
        </el-form-item>
        <el-form-item label="等级">
          <el-select style='width: 400px;' class="filter-item" v-model="dataScope" placeholder="请选择">
            <el-option v-for="item in stationLv" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="权限">
           <div class="checkRightBox" style='width: 400px;'>
            <div class="checkAllBox">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </div>
              <el-checkbox-group v-model="checkedPowers" @change="handleCheckedPowersChange">
                <div class="checkBox1">
                <el-checkbox v-for="power in powers1" :label="power" :key="power" class="check">{{power}}</el-checkbox>
                </div>
                <div class="checkBox2">
                <el-checkbox v-for="power in powers2" :label="power" :key="power" class="check">{{power}}</el-checkbox>
                </div>
                <div class="checkBox3">
                <el-checkbox v-for="power in powers3" :label="power" :key="power" class="check">{{power}}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-select style='width: 400px;' class="filter-item" v-model="stationState" placeholder="可用">
            <el-option v-for="item in stationStateCheck" :key="item.key" :label="item.value" :value="item.key">
          </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="button-cancel" @click="dialogFormStation = false">取 消</button>

        <button class="button-large" v-if="dialogStatus == 'update'" @click="update('temp2')">保 存</button>    
        <button class="button-large" v-else @click="create2('temp2')">保 存</button>    
        <button class="button-cancel" @click="resetForm2('temp2')">取 消</button>
      </div>
    </el-dialog>
    

  </div>
  </div>
</div>
</template>

<script>
import { staffList, addStaff, getStaff, addMech ,getSList, getStation} from "@/api/staff";
import { getSign } from "@/api/sign";
import waves from "@/directive/waves/index.js"; // 水波纹指令
//import { parseTime } from "@/utils";

const servicestation = [
  { key: "1", display_name: "呼家楼服务站" },
  { key: "2", display_name: "其他" }
];

const peostate = [
  { key: "1", name: "可用" },
  { key: "2", name: "不可用" }
];

const powerOptions = [
  "机构管理",
  "服务机构",
  "服务站",
  "服务管理",
  "服务类型",
  "服务属性",
  "服务项目",
  "单位管理",
  "服务人员管理",
  "人员管理",
  "增加人员",
  "技能管理"
];
const powerOptions1 = ["机构管理", "服务机构", "服务站"];
const powerOptions2 = ["服务管理", "服务类型", "服务属性", "服务项目", "单位管理"];
const powerOptions3 = ["服务人员管理", "人员管理", "增加人员", "技能管理"];

const stationLv = ["一级", "二级", "三级", "四级", "五级", "六级", "七级", "八级", "九级", "十级"];
const stationState = ["可用", "不可用"];
// arr to obj

export default {
  name: "table_demo",
  directives: {
    waves
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.temp.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
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
      search: {
        phone: "",
        name: ""
      },
      temp: {
        phone: null,
        name: "",
        password: "",
        password2: ""
      },
      mechanism: [],
      servicestation: [],
      station: [],
      peostate: [],
      temp2: {
        name:''
      },
      importanceOptions: [1, 2, 3],
      mechanismCheck:[],
      servicestationCheck:servicestation,
      stationCheck: [],
      peostateCheck:peostate,
      stationName: "",
      stationLv: [{id:1,value:'一级'}, {id:2,value:'二级'}, {id:3,value:'三级'}, {id:4,value:'四级'}, {id:5,value:'五级'}, {id:6,value:'六级'}, {id:7,value:'七级'}, {id:8,value:'八级'}, {id:9,value:'九级'}],
      stationStateCheck: stationState,
      stationState:[],
      dialogFormVisible: false,
      dialogFormStation: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      },
      dialogPvVisible: false,
      tableKey: 0,
      checkAll: true,
      checkedPowers: [],
      dataScope:[],
      powers: powerOptions,
      powers1: powerOptions1,
      powers2: powerOptions2,
      powers3: powerOptions3,
      isIndeterminate: true,
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度11个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入 2 到 10 位的分类名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入6-20位密码", trigger: "blur" },
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
    getSList().then(res=>{
      this.mechanismCheck = res.data.data
    })
    getStation().then(res=>{
      console.log(res)
      this.stationCheck = res.data.data
    })
  },
  methods: {
    getList() {
      var obj = {
        roleName: "",
        mobile: ""
      };
      this.listLoading = true;
      getStaff(obj).then(res => {
        console.log(res.data);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleFilter() {
      var obj = {
        roleName: this.search.name,
        mobile: this.search.phone
      };
      this.listLoading = true;
      getStaff(obj).then(res => {
        if (res.data.code === 1) {    
          this.list = res.data.data.list;
          this.listLoading = false;
          this.search = {
            phone:'',
            name:''
          };
        } else {
          this.listLoading = false;
          this.$message({
            type: "warning",
            message: "员工不存在"
          });
        }
      });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
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
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    addstation() {
      this.resetTemptwo();
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    handleDelete(row) {
      //删除
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
    getId(str,obj){
       for(var i = 0 ; i < this.objOptions.length ; i ++ ){
          if(str == this.objOptions[i].value){
            return this.objOptions[i].id
          }
       }
    },
    create(formName) {
      console.log(this.temp);
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = {
            mobile: this.temp.phone,
            name: this.temp.name,
            newPassword: this.temp.password,
            officeId: "cce1ffa65994451abdb00fe56b338e4d",
            stationId: "1",
            roles: ["5f9143f86b58404c962bb704c7bd4f07"],
            useable: "1"
          };
          addStaff(obj).then(res => {
            console.log(res);
            if (res.data.code === 1) {
              this.dialogFormVisible = false;
              this.getList();
              this.$message({
                type: "success",
                message: "新增成功"
              });
            } else {
              this.$message({
                type: "error",
                message: "发生错误"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    create2(formName) {
      console.log(this.temp2)
      var str = ''
      for (var i =0;i < this.checkedPowers.length;i ++){
         str += this.getId(this.checkedPowers[i]) +','
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = {
            name: this.temp2.name,
            dataScope: this.temp.dataScope,
            menuIds: str,
            useable: this.stationState //状态
          };
          this.dialogFormVisible = false;
          addStation(obj).then(res => {
            console.log(res);
            if (res.data.code === 1) {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.getList();
            } else {
              this.$message({
                type: "error",
                message: "发生未知错误，或者角色已存在"
              });
            }
          });
        } else {
          return false;
        }
      });
      this.resetTemp()
    },
    update() {
      console.log(111);
      this.dialogFormVisible = false;
      this.$notify({
        title: "成功",
        message: "更新成功",
        type: "success",
        duration: 2000
      });
    },
    resetTemp() {
      this.temp = {
        phone: "",
        name: "",
        password: "",
        password2: ""
      };
      this.mechanism=[],
      this.servicestation= [],
      this.station= []
    },
    resetTemptwo() {
      this.temp2 = {
        stationName: "",
        stationLv: "请选择",
        stationState: ""
      };
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    resetForm2(formName) {
      this.dialogFormStation = false
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
  background-color: #f5f5f5;
}
.bgWhite {
  background-color: #ffffff;
  padding: 20px;
}
.btn_pad {
  margin: 0px 0px 10px 20px;
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
</style>