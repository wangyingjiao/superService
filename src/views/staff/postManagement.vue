<template>
<div>
  <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索的岗位名称" v-model="search">
      </el-input>
      <button class="button-large btn_right" @click="handleFilter">搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
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

      <el-table-column align="center" label="编号" type="index" width="200">
      </el-table-column>

      <el-table-column  label="岗位名称" align="center" prop="name" >
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" prop="userable" align="center">
       <template scope="scope">
          <span v-if="scope.row.useable =='1'">可用</span>
					<span v-if="scope.row.useable =='0'">不可用</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <div style="display:flex;justify-content: center;">
              <div class="site-div" @click="handleUpdate(scope.row)">
                <div class="back-icon-bg"></div>
                <div>编辑</div>
              </div>
              <div class="site-div" @click="handleDelete(scope.row)">
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" class="diatable">
      <el-form 
        class="small-space" 
        :model="temp" 
        label-position="left"
        :rules="rules"
        ref="temp" 
        label-width="80px" 
        style='width: 500px; margin-left:20px;'>

        <el-form-item label="岗位名称">
          <el-input v-model="temp.name" style='width: 400px;' placeholder="请输入2-15位的岗位名称"></el-input>
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
          <el-select style='width: 400px;' class="filter-item" v-model="stationState" placeholder="请选择">
            <el-option v-for="item in state" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="button-large" v-if="dialogStatus == 'update'" @click="update('temp')">保 存</button>    
        <button class="button-large" v-else @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
        <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="create">保 存</el-button>
        <el-button v-else type="primary" @click="update">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button> -->
      </div>
    </el-dialog>

  </div>
  </div>
</div>
</template>

<script>
import { getStation, addStation, delStation, searchStation ,getPower} from "@/api/staff";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";

const powerOptions = ["机构管理","服务机构","服务站","服务管理","服务类型","服务属性","服务项目","单位管理","服务人员管理","人员管理","增加人员","技能管理"];
const objOptions = [
  {id:'1',value:'机构管理'},
  {id:'2',value:'服务机构'},
  {id:'3',value:'服务站'},
  {id:'4',value:'服务管理'},
  {id:'5',value:'服务类型'},
  {id:'6',value:'服务属性'},
  {id:'7',value:'服务项目'},
  {id:'8',value:'单位管理'},
  {id:'9',value:'服务人员管理'},
  {id:'10',value:'人员管理'},
  {id:'11',value:'增加人员'},
  {id:'12',value:'技能管理'}
  ];
const state = [{ value: "可用", key: "1" }, { value: "不可用", key: "0" }];
export default {
  name: "table_demo",
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: false,
      state: false,
      search:'',
      listQuery: {
        page: 1,
        limit: 6,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      dataScope: "",
      stationState: "",
      temp: {
        name: "",
        dataScope: "",
        stationState: ""
      },
      importanceOptions: [1, 2, 3],
      station: [1, 2, 3],
      stationName: "",
      stationLv: [{id:1,value:'一级'}, {id:2,value:'二级'}, {id:3,value:'三级'}, {id:4,value:'四级'}, {id:5,value:'五级'}, {id:6,value:'六级'}, {id:7,value:'七级'}, {id:8,value:'八级'}, {id:9,value:'九级'}],
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
      checkAll: true,
      checkedPowers: [],
      objOptions:objOptions,
      powers: [
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
      ],
      powers1: ["机构管理", "服务机构", "服务站"],
      powers2: ["服务管理", "服务类型", "服务属性", "服务项目", "单位管理"],
      powers3: ["服务人员管理", "人员管理", "增加人员", "技能管理"],
      powerList:[],
      isIndeterminate: true,
      rules: {
        name: [
          { required: true, message: "请输入 2 到 15 位的分类名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        lv: [{ required: true, message: "等级不能为空" }],
        check: [{ required: true, message: "权限不能为空", trigger: "change" }]
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
  },
  methods: {
    getList() {
      this.listLoading = true;
      getStation().then(res => {
        console.log(res);
        this.list = res.data.data;
        this.listLoading = false;
      });
    },
    handleFilter() {
      console.log(this.search);
      this.listQuery.page = 1
      var obj={
        name:this.search
      }
      searchStation(obj).then(res=>{
        if(res.data.code === 1){
          this.listLoading = true
          this.list = res.data.data
          this.listLoading = false
        }else{
          this.$message({
                type: "warning",
                message: "岗位名不存在"
              });
        }
      })
    },
    handleSizeChange(val) {
      // this.listQuery.limit = val
      // this.getList()
    },
    handleCurrentChange(val) {
      // this.listQuery.page = val
      // this.getList()
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
    handleUpdate(row) {
      console.log(row)
      // var promise = new Promise(function(resove,reject){
        
      // })
      getPower(row.id).then(res=>{
        console.log(res)
        this.powerList = res.data.data.menuIdList
      })
      var arr = []
      for (var i = 0;i<=this.powerList;i++ ){
        for(var j = 0;j < this.objOptions ;j++){
           if(this.powerList[i] == this.objOptions[j].id){
              arr.push(this.objOptions[j].value)
           }
        }
        
      }
      console.log(arr)
      this.temp = Object.assign({}, row);
      this.stationState = this.temp.useable
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.checkedPowers = ["人员管理","增加人员"]
      this.dataScope = this.getLv(row.dataScope)
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
                  message: "该信息不可删除"
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "warning",
                message: "发生未知错误，请稍后再试"
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
    getValue(arr){
      for(var j = 0 ; j<= arr.length; j++){
       for(var i = 0 ; i < this.objOptions.length ; i ++ ){
          if(arr[j] == this.objOptions[i].id){
            return this.objOptions[i].value
          }
        }
       }
       console.log(arr)
    },
    getLv(){
       for(var i = 0;i< this.stationLv.length; i++){
         if('2' == this.stationLv[i].id){
           return this.stationLv[i].value
         }
       }
    },
    create(formName) {
      console.log(this.temp)
      var str = ''
      for (var i =0;i < this.checkedPowers.length;i ++){
         str += this.getId(this.checkedPowers[i]) +','
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = {
            name: this.temp.name,
            dataScope: '2',
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
    update(formName) {
      console.log(this.stationLv)
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = {
            id:this.temp.id,
            name: this.temp.name,
            dataScope: this.dataScope,
            menuIds: "1,",
            useable: this.stationState //状态
          };
          this.dialogFormVisible = false;
          addStation(obj).then(res => {
            console.log(res);
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
      this.$refs[formName].resetFields();
    },
    resetTemp() {
      this.temp = {
        name: "",
        dataScope: "",
        stationState: ""
      };
      this.checkedPowers=[]
      this.stationState = ''
      this.dataScope = ''
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
<style scoped>
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
</style>
