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
      <button class="button-large el-icon-search btn_right ceshi" @click="handleFilter"> 搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_right btn_pad" style="width:80px" @click="handleCreate">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>

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

      <el-table-column  label="城市" align="center">
        <template scope="scope">
          <span v-if="scope.row.allCity =='1'">全部</span>
          <span v-else v-for="(item,index) in scope.row.cityNames" :key="index" :value="item">{{item}}&nbsp;</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
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
      title="添加" 
      :visible.sync="dialogFormVisible" 
      :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
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
              <!-- <el-checkbox-group v-model="checkCity" @change="citiesChange">
                <el-checkbox 
                   v-for="item in city" 
                   @change="cityChange"
                   :label="item.areaName"
                   :value="item.id"
                   :key="item.id"></el-checkbox>
              </el-checkbox-group> -->
              <div class="cityBox">
                  <div style="display:inline-block;margin-left:-20px;" >
                    <button 
                      class="selfCheckBox cityBtn" 
                      ref="cityOption" 
                      @click="cityChange(item,index)" 
                      v-for="(item,index) in city"
                      :value="item.areaName">
                      {{item.areaName}}
                      </button>
								  	</div>
              </div>
                <p class="word">*定向城市指该服务分类的适用城市。默认不填，代表适用于本机构设置的所有城市</p>
            </el-form-item>
            
          </el-form>
        </div>
      </div>
      
      <div slot="footer" class="dialog-footer">    
        <button class="button-large" @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>

     <!-- 编辑 -->
    <el-dialog 
      title="编辑" 
      :visible.sync="dialogFormUpdate" 
      :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
      class="diatable">
      <div class="tabBox" >
        <div class="tabLeft fl" ref="refTab">
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
              <div class="cityBox">
                  <div style="display:inline-block;margin-left:-20px;" >
                    <button 
                      class="selfCheckBox cityBtn allCity"
                      ref="allCity"                      
                      @click="allCity">全部城市</button>
                    <button 
                      class="selfCheckBox cityBtn" 
                      ref="cityOption2"                     
                      @click="cityUpdate(item,index)" 
                      v-for="(item,index) in city"
                      :value="item.areaName">
                      {{item.areaName}}
                      </button>
								  	</div>
              </div>
                <p class="word">*定向城市指该服务分类的适用城市。默认不填，代表适用于本机构设置的所有城市</p>
            </el-form-item>
            
          </el-form>
        </div>
      </div>
      
      <div slot="footer" class="dialog-footer"> 
        <button class="button-large"  @click="update('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm2('temp')">取 消</button>
      </div>
    </el-dialog>

  </div>
  </div>
</div>
</template>

<script>
import {
  getCity,
  getClass,
  addClass,
  delClass,
  getSuccess
} from "@/api/serviceManage";
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
      pageSize: 10,
      total: 1,
      temp: {
        name: ""
      },
      search: {
        cityName: "",
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入 2 到 10 位的分类名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      dialogFormUpdate: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      tableKey: 0,
      activeName: "0",
      city: [],
      cityIndex: 0,
      checkCity: [],
      rowId: "",
      dis: "1"
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
    getCity().then(res => {
      //console.log(res)
      //console.log(1111)
      this.city = res.data.data;
      this.cityIndex = res.data.data.length;
      //console.log(this.cityIndex)
    });
  },
  methods: {
    cityChange(item, index) {
      var obj = {
        cityId: "",
        cityName: ""
      };
      console.log(this.$refs.cityOption[1].style.borderColor);
      if (this.$refs.cityOption[index].style.borderColor == "") {
        this.$refs.cityOption[index].style.borderColor = "green";
        this.$refs.cityOption[index].style.color = "green";
        this.checkCity.push(item.areaName);
        console.log(this.checkCity);
      } else {
        this.$refs.cityOption[index].style.borderColor = "";
        this.$refs.cityOption[index].style.color = "#48576a";
        this.checkCity.remove(item.areaName);
        console.log(this.checkCity);
      }
      
    },
    cityUpdate(item, index) {
      console.log(this.checkCity);
      console.log("城市编辑");
      console.log(item);
      console.log(this.$refs.cityOption2[index].style.borderColor);
      if (this.$refs.allCity.style.borderColor == "green") {
        console.log(item);
        var obj = {
          id: this.rowId,
          cityid: item.id
        };
        getSuccess(obj).then(res => {
          if (res.data.data != "success") {
            this.$message({
              type: "warning",
              message: "该城市已关联服务项目，不可移除其选中状态"
            });
          }else{
            console.log(145)
            this.$refs.allCity.style.borderColor =""
            this.$refs.allCity.style.color ="#48576a"
            this.$refs.cityOption2[index].style.borderColor =""
            this.$refs.cityOption2[index].style.color ="#48576a"
            console.log(this.checkCity)
          }
        });
      } else {
        if (this.$refs.cityOption2[index].style.borderColor == "green") {
          var obj = {
            id: this.rowId,
            cityId: this.getCityId(this.$refs.cityOption2[index].value)
          };
          console.log(obj);
          getSuccess(obj).then(res => {
            console.log(res);
            if (res.data.data != "success") {
              this.$message({
                type: "warning",
                message: "该城市已关联服务项目，不可移除其选中状态"
              });
            } else {
              this.checkCity.remove(this.$refs.cityOption[index].value);
              this.$refs.cityOption2[index].style.borderColor = "";
              this.$refs.cityOption2[index].style.color = "#48576a";
              console.log(this.checkCity);
            }
          });
        } else {
          this.$refs.cityOption2[index].style.borderColor = "green";
          this.$refs.cityOption2[index].style.color = "green";
          this.checkCity.push(this.$refs.cityOption2[index].value);
          console.log(this.checkCity);
        }
      }
    },
    allCity(item, index) {
      console.log("全部城市");
      if (this.$refs.allCity.style.borderColor == "green") {
        for (var i = 0; i < this.city.length; i++) {
          var obj = {
            id: this.rowId,
            cityId: this.getCityId(this.city[i].areaName)
          };
          console.log(obj);
          getSuccess(obj).then(res => {
            console.log(res);
            if (res.data.data != "success") {
              this.$message({
                type: "warning",
                message: "该城市已关联服务项目，不可移除其选中状态"
              });
              return;
            } else {
              this.$refs.allCity.style.borderColor = "";
              this.$refs.allCity.style.color = "#48576a";
              for (var i = 0; i < this.city.length; i++) {
                this.$refs.cityOption2[i].style.borderColor = "";
                this.$refs.cityOption2[i].style.color = "#48576a";
              }
              this.checkCity = [];
            }
          });
        }
      } else {
        var arr = [];
        this.$refs.allCity.style.borderColor = "green";
        this.$refs.allCity.style.color = "green";
        for (var i = 0; i < this.city.length; i++) {
          console.log(2);
          this.$refs.cityOption2[i].style.borderColor = "green";
          this.$refs.cityOption2[i].style.color = "green";
          arr.push(this.city[i].areaName);
          this.checkCity = arr;
        }
      }
      console.log(this.checkCity);
    },
    refbtn1() {
      console.log(this.$refs);
      this.$refs.refbtn1.className = "tabBtn tabBtnclick";
      this.$refs.refbtn2.className = "tabBtn";
      this.activeName = "1";
    },
    refbtn2() {
      console.log(this.$refs.refbtn2);
      this.$refs.refbtn2.className = "tabBtn tabBtnclick";
      this.$refs.refbtn1.className = "tabBtn";
      this.activeName = "2";
    },
    getList() {
      this.listLoading = true;
      var obj = {
        cityId: this.getCityId(this.search.cityName),
        name: this.search.name,
        majorSort: this.activeName
      };
      getClass(obj, this.pageNumber, this.pageSize)
        .then(res => {
          console.log(res);
          this.list = res.data.data.list;
          this.listLoading = false;
          this.total = res.data.data.count;
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    handleFilter() {
      var obj = {
        cityId: this.getCityId(this.search.cityName),
        name: this.search.name,
        majorSort: this.activeName
      };
      this.listLoading = true;
      getClass(obj, this.pageNumber, this.pageSize).then(res => {
        this.listLoading = false;
        this.list = res.data.data.list;
        this.total = res.data.data.count;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // this.getList();
      var obj = {
        majorSort: this.activeName
      };
      getClass(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      console.log(111111);
      this.pageNumber = val;
      var obj = {
        majorSort: this.activeName
      };
      this.listLoading = true;
      getClass(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        this.listLoading = false;
        this.total = res.data.data.count;
      });
    },
    handleCreate() {
      this.resetTemp();
      this.activeName = "1";
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      console.log(row);
      this.rowId = row.id;
      this.temp = Object.assign({}, row);
      this.dialogFormUpdate = true;
      this.activeName = row.majorSort;

      if (row.allCity == "1") {
        this.$nextTick(() => {
          this.$refs.allCity.style.borderColor = "green";
          this.$refs.allCity.style.color = "green";
          for (var i = 0; i < this.city.length; i++) {
            this.$refs.cityOption2[i].style.borderColor = "green";
            this.$refs.cityOption2[i].style.color = "green";
          }
        });

      } else {
        this.checkCity = row.cityNames;
        this.$nextTick(() => {
          this.$refs.allCity.style.borderColor = "";
          this.$refs.allCity.style.color = "#48576a";
          for (var i = 0; i < row.cityNames.length; i++) {
            for (var j = 0; j < this.city.length; j++) {
              
              if (row.cityNames[i] == this.$refs.cityOption2[j].value) {
                this.$refs.cityOption2[j].style.borderColor = "green";
                this.$refs.cityOption2[j].style.color = "green";
              }
            }
          }
        });
      }
      
    },
    handleDelete(row) {
      console.log(this.activeName);
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
          delClass(obj)
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
                  message: "分类下有服务项目，不可删除"
                });
              }
            })
            .catch(() => console.log("未知错误"));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getCityId(str) {
      for (var i = 0; i < this.city.length; i++) {
        if (str == this.city[i].areaName) {
          return this.city[i].id;
        }
      }
    },
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = {
            citys: [],
            majorSort: this.activeName,
            name: this.temp.name
          };
          for (var i = 0; i < this.checkCity.length; i++) {
            var city = {
              cityId: this.getCityId(this.checkCity[i]),
              cityName: this.checkCity[i]
            };
            obj.citys.push(city);
          }
          addClass(obj).then(res => {
            console.log(this.activeName);
            if (res.data.code === 1) {
              this.dialogFormVisible = false;
              this.checkCity = [];
              this.activeName = "0"
              this.resetCity();
              this.getList();
              this.$message({
                type: "success",
                message: res.data.data
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
    citiesChange(val) {
      //console.log(val)
    },
    resetForm(formName) {
      this.resetCity();
      this.activeName = "0";
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
      this.checkCity = [];
    },
    resetForm2(formName) {
      this.resetCity2();
      this.activeName = "0"
      this.$refs.allCity.style.borderColor = "";
      this.$refs.allCity.style.color = "#48576a";
      this.dialogFormUpdate = false;
      this.$refs[formName].resetFields();
      this.checkCity = [];
    },
    update(formName) {
      if(this.$refs.allCity.style.borderColor =="green"){
        this.checkCity=[]
      }else{
        this.checkCity =[]
        for(var i =0;i<this.city.length;i++){
          if(this.$refs.cityOption2[i].style.borderColor == "green"){
            console.log(this.$refs.cityOption2[i].value)
            
            this.checkCity.push(this.$refs.cityOption2[i].value)
          }
        }
      }
      console.log(this.checkCity)
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = {
            id: this.rowId,
            citys: [],
            majorSort: this.activeName,
            name: this.temp.name
          };
          for (var i = 0; i < this.checkCity.length; i++) {
            var city = {
              cityId: this.getCityId(this.checkCity[i]),
              cityName: this.checkCity[i]
            };
            obj.citys.push(city);
          }
          addClass(obj).then(res => {
            console.log(res);
            if (res.data.code === 1) {
              this.dialogFormUpdate = false;
              this.activeName = "0"
              this.checkCity = [];
              this.resetCity2();
              this.getList();
              this.$message({
                type: "success",
                message: res.data.data
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
    resetTemp() {
      this.temp = {};
    },
    resetCity() {
      for (var i = 0; i < this.city.length; i++) {
        this.$refs.cityOption[i].style.borderColor = "";
        this.$refs.cityOption[i].style.color = "#48576a";
      }
    },
    resetCity2() {
      for (var i = 0; i < this.city.length; i++) {
        this.$refs.cityOption2[i].style.borderColor = "";
        this.$refs.cityOption2[i].style.color = "#48576a";
      }
    },
    handleClick(tab, event) {
      this.getList();
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
  margin: 0px 0px 15px 20px;
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
.el-radio-button {
  width: 100%;
}
.el-radio-button__inner {
  width: 100%;
  color: #333333;
  border: 0px solid #bfcbd9;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  background-color: #4c70e8;
  border-color: #4c70e8;
  box-shadow: -1px 0 0 0 #4c70e8;
}
.cityBtn {
  background-color: #ffffff;
  border-width: 1px;
  margin-bottom: 10px;
  color: rgb(72, 87, 106);
}
</style>