<template>
<div>
  <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索手机号" v-model="listQuery.title">
      </el-input>

      <el-select clearable style="width: 200px" class="filter-item" v-model="listQuery.importance" placeholder="请选择岗位名称">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <button class="button-large btn_right" @click="handleFilter">搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    
    <button class="button-small btn_right btn_pad" @click="handleCreate">新增</button>
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
          <div style="display:flex;justify-content: center;">
              <div class="site-div" @click="handleUpdate  ">
                <div class="back-icon-bg"></div>
                <div>编辑</div>
              </div>
              <div class="site-div" @click="handleModifyStatus(scope.row,'deleted')">
                <div class="back-icon-del"></div>
                <div>删除</div>
              </div>
            </div>
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
        label-width="80px"
        :rules="rules"
        ref="temp"
        style='width: 400px; margin-left:50px;'>

        <el-form-item label="用户名"  prop="name" >
              <el-input        
              style='width: 400px;' 
              placeholder="请输入2-15位的姓名" v-model="temp.name"></el-input>
            </el-form-item>
        
        <el-form-item label="手机号" prop="phone">
          <el-input 
            v-model="temp.phone"
            style='width: 400px;'
            placeholder="请输入11位手机号"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="temp.password" 
            style='width: 400px;'
             type="password"
            placeholder="建议使用6-20位字母、数字和符号两种以上组合"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="password2">
          <el-input
            style='width: 400px;'
            v-model="temp.password2"
            placeholder="再次填写密码"></el-input>
        </el-form-item>

        <el-form-item label="服务机构" prop="mechanism">
          <el-select  style='width: 400px;' class="filter-item" v-model="temp.mechanism" placeholder="请选择">
            <el-option v-for="item in mechanism" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务站" prop="servicestation">
          <el-select style='width: 400px;' class="filter-item" v-model="temp.servicestation" placeholder="请选择">
            <el-option v-for="item in servicestation" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择岗位" >
          <el-select  class="filter-item" v-model="temp.station" placeholder="请选择">
            <el-option v-for="item in station" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
           <button class="button-cancel" @click="dialogFormStation = true">新 增</button>
        </el-form-item>
        <el-form-item  label="可用状态">
          <el-select style='width: 400px;' class="filter-item" v-model="temp.peostate" placeholder="请选择">
            <el-option v-for="item in peostate" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="button-large" @click="create('temp')">保 存</button>
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>
    

     <el-dialog 
       :title="textMap[dialogStatus]" 
       :visible.sync="dialogFormStation" 
       append-to-body
       class="twoDialog" 
       width = '100%'>
      <el-form class="small-space" :model="temp2" label-position="left" label-width="80px" style='width: 500px; margin-left:20px;'>

        <el-form-item label="岗位名称">
          <el-input style='width: 400px' :maxlength="15" :minlength="2" placeholder="请输入2-15位的岗位名称" v-model="temp2.stationName">123</el-input>
        </el-form-item>
        <el-form-item label="等级">
          <el-select  class="filter-item" v-model="temp2.stationLv" placeholder="请选择">
            <el-option v-for="item in stationLv" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="权限">
           <div class="checkRightBox"  style='width: 400px'>
            <div class="checkAllBox">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </div>
              <el-checkbox-group v-model="checkedPowers" @change="handleCheckedPowersChange">
                <div class="checkBox1">
                <el-checkbox style='margin-left:5px' v-for="power in powers1" :label="power" :key="power" class="check">{{power}}</el-checkbox>
                </div>
                <div class="checkBox2">
                <el-checkbox style='margin-left:5px' v-for="power in powers2" :label="power" :key="power" class="check">{{power}}</el-checkbox>
                </div>
                <div class="checkBox3">
                <el-checkbox  style='margin-left:5px' v-for="power in powers3" :label="power" :key="power" class="check">{{power}}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="filter-item" v-model="temp2.stationState" placeholder="可用">
            <el-option v-for="item in stationState" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="button-large" @click="create">保 存</button>
        <button class="button-cancel" @click="dialogFormStation = false">取 消</button>
      </div>
    </el-dialog>

    

  </div>
</div>
</template>

<script>
import { staffList, addStaff, getStaff ,addMech} from "@/api/staff";
import { getSign} from "@/api/sign";
import waves from "@/directive/waves/index.js"; // 水波纹指令
//import { parseTime } from "@/utils";

const mechanism = [
  { key: "1", display_name: "日常保洁" },
  { key: "2", display_name: "除尘除螨" },
  { key: "3", display_name: "家电清洗" },
  { key: "4", display_name: "擦玻璃" }
];
const servicestation = [
  { key: "1", display_name: "呼家楼服务站" },
  { key: "2", display_name: "其他" }
];

const peostate = [
  { key: "1", display_name: "可用" },
  { key: "2", display_name: "不可用" }
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
const mechanismKeyValue = mechanism.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});
export default {
  name: "table_demo",
  directives: {
    waves
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.temp.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
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
      temp: {
        phone: null,
        name: "",
        password: "",
        password2: "",
        mechanism: "",
        servicestation: "",
        station: "",
        peostate: ""
      },
      temp2: {
        stationName: "",
        stationLv: "",
        stationState: ""
      },
      importanceOptions: [1, 2, 3],
      mechanism,
      servicestation,
      station: [1, 2, 3, 4],
      peostate,
      stationName: "",
      stationLv: stationLv,
      stationState: stationState,
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
          { required: true, message: "请输入6-20位密码", trigger: "blur"},
          { min: 6, max: 20, message: "密码长度6-20个字符", trigger: "blur"}
        ],
        password2: [
          { required: true,validator: validatePass2, trigger: "blur"}
        ],
        mechanism: [
          { required: true, message: "机构不能为空", trigger: "change"}
        ],
        servicestation:[
          { required: true, message: "服务站不能为空", trigger: "change"}
        ],
        station: [
          { required: true, message: "岗位不能为空", trigger: "change"}
        ],
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
  },
  methods: {
    getList() {
      this.listLoading = true;
      getStaff().then(res => {
         console.log(res.data)
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
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
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
      const index = this.list.length;
      this.list.splice(index, 1);
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
    handgetSign(){
      console.log("请求签名")
      getSign()
      console.log(getSign())
    },
    create(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid){
          var obj = {
            companyId: "ad86de2fbac14039afe4c4bb12dbf565",
            companyName: "总公司",
            loginFlag: "1",
            loginName: this.temp.phone,
            mobile: this.temp.phone,
            name: this.temp.name,
            newPassword: this.temp.password,
            no: "00000909",
            officeId: "cce1ffa65994451abdb00fe56b338e4d",
            officeName: "国安社区",
            roles: ["5f9143f86b58404c962bb704c7bd4f07"]
          };
          addStaff(obj).then(res=>{
            console.log(res)
            if(res.data.code ===1){
                this.dialogFormVisible = false;
                this.getList();
                this.$notify({
                  title: "成功",
                  message: res.data.data,
                  type: "success",
                  duration: 2000
                });
            }else{             
              this.$notify({
                  title: "失败",
                  message: "重名或者参数有误",
                  type: "error",
                  duration: 3000
                });
            }
          })
        }else{
          return false
        }
      
      })
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
        phone: null,
        name: "",
        password: "",
        password2: "",
        mechanism: "",
        servicestation: "",
        station: "",
        peostate: ""
      };
    },
    resetTemptwo() {
      this.temp2 = {
        stationName: "",
        stationLv: "请选择",
        stationState: ""
      };
    },
    resetForm(formName) {
      this.dialogFormVisible = false
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
body{
    background-color:#f5f5f5;
}
.bgWhite{
    background-color: #ffffff;
    padding: 20px
}
.btn_pad{
    margin:30px 0px 10px 20px;
}
.btn_right{
  float:right;
}
</style>