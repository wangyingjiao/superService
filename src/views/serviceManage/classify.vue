<template>
<div>
  <div class="filter-container bgWhite">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="0"></el-tab-pane>
      <el-tab-pane label="保洁" name="1"></el-tab-pane>
      <el-tab-pane label="家修" name="2"></el-tab-pane>
    </el-tabs>
      <el-select clearable style="width: 200px" v-model="search.cityName" class="filter-item" placeholder="请选择城市">
        <el-option v-for="item in city" :key="item.id" :label="item.areaName" :value="item.areaName">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入分类名称" v-model="search.name">
      </el-input>
      <button class="button-large btn_right" @click="handleFilter">搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_right btn_pad" @click="handleCreate">新增</button>

    <el-table 
    :key='tableKey' 
    :data="list" 
    v-loading="listLoading" 
    stripe
    fit
    highlight-current-row
    element-loading-text="正在加载" 
    style="width: 100%" >

      <el-table-column align="center" label="编号" type="index" width="100">
      </el-table-column>

      <el-table-column  label="分类名称" align="center" prop="name">
      </el-table-column>

      <el-table-column  label="城市" align="center" prop="cityName">
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button  size="small" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button  size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination 
         @size-change="handleSizeChange" 
         @current-change="handleCurrentChange" 
         :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30,50]" 
        :page-size="listQuery.limit" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="total">
      </el-pagination>
    </div>

    <el-dialog 
      :title="textMap[dialogStatus]" 
      :visible.sync="dialogFormVisible" 
      :show-close= false
      class="diatable">
      <div class="tabBox" >
        <div class="tabLeft fl" ref="refTab">
          <!-- <span class="tabBtn tabBtnclick" @click="refbtn1" ref="refbtn1">保洁</span>
          <span class="tabBtn" @click="refbtn2" ref="refbtn2">家修</span> -->
          <el-radio-group v-model="activeName">
            <el-radio-button label="1"  @click="refbtn1" style="display:none"></el-radio-button>
            <el-radio-button style="width:100%;" size='large' label="1"  @click="refbtn1">保洁</el-radio-button>
            <el-radio-button style="width:100%" label="2" @click="refbtn2">家修</el-radio-button>
            <el-radio-button label="2" @click="refbtn2" style="display:none"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="tabRight fl">
          <el-form class="small-space" ref="temp" :rules="rules" :model="temp" label-position="left" label-width="100px" style='width: 500px; margin-left:20px;'>

            <el-form-item label="分类名称"  prop="name" >
              <el-input        
              style='width: 400px;' 
              placeholder="请输入2-10位的分类名" v-model="temp.name"></el-input>
            </el-form-item>
            

            <el-form-item label="定向城市">   
              <el-checkbox-group v-model="checkCity" @change="citiesChange">
                <el-checkbox 
                   v-for="item in city" 
                   :label="item.areaName"
                   :key="item.id">{{item.areaName}}</el-checkbox>
              </el-checkbox-group>
                <p class="word">*定向城市指该服务分类的适用城市。默认不填，代表适用于本机构设置的所有城市</p>
            </el-form-item>
          </el-form>
        </div>
      </div>
      
      <div slot="footer" class="dialog-footer"> 
        <button class="button-large" v-if="dialogStatus == 'update'" @click="update(scope.row)">保 存</button>    
        <button class="button-large" v-else @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>

  </div>
  </div>
</div>
</template>

<script>
import {getCity, getClass, addClass, delClass} from "@/api/serviceManage";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
//挂载数据

export default {
  name: "table_demo",
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
        type: undefined,
        sort: "+id"
      },
      temp: {
        name: "",
      },
      search:{
        cityName: '',
        name: ''
      },
      rules: {
        name: [
          { required: true, message: "请输入 2 到 10 位的分类名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      tableKey: 0,
      activeName: '0',
      city:[],
      checkCity: [],
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
    getCity().then(res=>{
      this.city=res.data.data
    })
    
  },
  methods: {
    refbtn1() {
      console.log(this.$refs);
      this.$refs.refbtn1.className = 'tabBtn tabBtnclick'
      this.$refs.refbtn2.className = 'tabBtn'
      this.activeName = '1'
    },
    refbtn2() {
      console.log(this.$refs.refbtn2);
      this.$refs.refbtn2.className = 'tabBtn tabBtnclick'
      this.$refs.refbtn1.className = 'tabBtn'
      this.activeName = '2'
    },
    getList() {
      this.listLoading = true
      var obj = {
        "majorSort": this.activeName
      }
      getClass(obj).then(res => {
        console.log(res)
        this.list = res.data.data.list;
        this.listLoading = false
        //this.total = res.data.data.count;
      }).catch(res=>{
        this.listLoading = false
      });
    },
    handleFilter() {
      this.listLoading = true
      getClass(this.search).then(res=>{
        this.listLoading = false
        this.list = res.data.data.list
        this.activeName = '0'
        this.listQuery.page = 1;
      })    
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
     // this.getList();
    },
    handleCurrentChange(val) {
      console.log("换页");
      this.listQuery.page = val;
      //this.getList();
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
      this.activeName='1'
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      console.log(row);
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.activeName = row.majorSort
      var arr = []
      arr.push(row.cityName)
      this.checkCity = arr
    },
    handleDelete(row) {    
      console.log(this.activeName) 
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row)
          var obj = {
            id:row.id
          }
          delClass(obj).then(res=>{
            console.log(res)
            if(res.data.code === 1){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getList()
            }else{
              this.$message({
                  type: 'warning',
                  message: '分类下有服务项目，不可删除'
                });
            }
          }).catch(()=>console.log("未知错误"))
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    getCityId(str){
       for(var i = 0 ; i < this.city.length ; i ++ ){
          if(str == this.city[i].areaName){
            return this.city[i].id
          }
       }
    },
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj={
              "citys": [],
              "majorSort": this.activeName,
              "name": this.temp.name
            }
          for(var i = 0;i < this.checkCity.length;i ++){
               var city = {
                 "cityId": this.getCityId(this.checkCity[i]),
                 "cityName": this.checkCity[i]
               }
               obj.citys.push(city)
          }
          addClass(obj).then(res=>{
            console.log(this.activeName)
            if(res.data.code ===1){
                this.dialogFormVisible = false;
                this.checkCity = []
                this.getList();
                this.$message({
                  type: 'success',
                  message: res.data.data
                });
            }else{            
              this.$notify({
                  title: "失败",
                  message: res.data.data,
                  type: "error",
                  duration: 2000
                });
            }
          })
        } else {
          return false;
        }
      });
    },
    citiesChange(val){
      //console.log(val)
    },
    resetForm(formName){
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
      this.checkCity = []
    },
    update(formName) {
      console.log("编辑")
      console.log(formName)
      this.dialogFormVisible = false;
    },
    resetTemp() {
      this.temp = {};
    },
    handleClick(tab, event) {
      this.getList()
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
<style >


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
.word {
  font-size: 10px;
  color: #aeaeae;
  line-height: 15px;
}
.tabBox {
  width: 100%;
  overflow: hidden;
  border: 1px #f5f5f5 solid;
  background-color: #f5f5f5;
}
.tabLeft {
  width: 15%;
}
.tabLeft .tabBtn {
  display: block;
  width: 100%;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.tabBtnclick {
  background-color: #6d8dfc;
  color: #ffffff;
}

.tabRight {
  width: 85%;
  height: 100%;
  border-left: 1px #f5f5f5 solid;
  padding-top: 10px;
  background-color: #ffffff;
}
.el-tabs {
  background-color: #ffffff;
  color: #333;
}
.el-radio-button{
  width: 100%;
}
.el-radio-button__inner{
  width: 100% ;
  color: #333333;
  border: 0px solid #bfcbd9;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #fff;
    background-color: #4c70e8;
    border-color: #4c70e8;
    box-shadow: -1px 0 0 0 #4c70e8;
}
</style>