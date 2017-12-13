<template>
<div>
  <div class="filter-container bgWhite">

      <el-select clearable style="width: 200px" class="filter-item" @change="searchChange" v-model="search.key" placeholder="请选择">
        <el-option v-for="item in importanceOptions" :key="item.id" :label="item.value" :value="item.id">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索的内容" v-model="search.value">
      </el-input>

      <button class="button-large el-icon-search btn_right" @click="handleFilter"> 搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
     <button class="button-small btn_right btn_pad ceshi ceshi5" style="width:80px" @click="handleCreate('temp')">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>
    <el-table 
    :key='tableKey' 
    :data="list" 
    v-loading="listLoading" 
    stripe
    fit 
    highlight-current-row 
    element-loading-text="正在加载" 
    style="width: 100%" >
      <el-table-column align="center" label="机构编号" type="index" width="100">
      </el-table-column>

      <el-table-column  label="机构名称" align="center" min-width="150px" prop="name" >
      </el-table-column>

      <el-table-column  label="机构电话" align="center" min-width="200px" prop="telephone">
      </el-table-column>

      <el-table-column  label="机构地址" align="center" min-width="200px" prop="address">
      </el-table-column>

      <el-table-column  label="负责人姓名" align="center" width ="150" prop="masterName">
      </el-table-column>

      <el-table-column  label="负责人手机号" align="center" min-width="200px" prop="masterPhone">
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
           <el-button class="el-icon-edit ceshi3" @click="handleUpdate(scope.row)"></el-button>
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination class="fr page mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
         label-width="160px"
         :rules="rules"
         ref="temp" 
         style='width: 560px; margin-left:20px;'>

        <el-form-item label="机构名称" prop="name">
          <el-input 
          :maxlength="15" 
          :minlength="2" 
          v-model="temp.name"
          style='width: 400px;' 
          placeholder="请正确填写机构名称（2-15个字）"></el-input>
        </el-form-item>

        <el-form-item label="机构电话" prop="telephone" >
          <el-input 
            style='width: 400px;' 
            v-model="temp.telephone"
            placeholder="请输入服务机构电话,格式:座机(区号+号码)如:010-66668888"></el-input>
        </el-form-item>

        <el-form-item label="负责人姓名" prop="masterName">
          <el-input 
          :maxlength="15" 
          :minlength="2" 
          style='width: 400px;' 
          v-model="temp.masterName"
          placeholder="请输入2-15位的负责人姓名"></el-input>
        </el-form-item>
 
        <el-form-item label="负责人手机号" prop="masterPhone" >
          <el-input 
            style='width: 400px;' 
            placeholder="请输入11位手机号" 
            v-model="temp.masterPhone"></el-input>
        </el-form-item>

        <el-form-item label="所在区域"  prop="areaCodes">
        <!-- <el-form-item label="所在区域"> -->
							<!-- <el-select clearable style="width:130px;"  @change="provinceChange" class="filter-item" v-model="temp.cusProvId" placeholder="请选择省">
									<el-option v-for="item in provinceOptions" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
							</el-select>
							<el-select clearable style="width:130px;"  @change="cityChange" class="filter-item" v-model="temp.cusCityId" placeholder="请选择市">
										<el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
							</el-select>
							<el-select clearable style="width:130px;" class="filter-item" v-model="temp.cusTownId" placeholder="请选择县区">
										<el-option v-for="item in countyOptions" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
							</el-select> -->


              <!-- 省市区 -->
              <el-cascader
                :options="areaOptions"
                :show-all-levels="true"
                v-model="temp.areaCodes"
                 style='width: 400px;' 
              ></el-cascader>
				</el-form-item>

        <el-form-item label="详细地址" prop="address">
          <el-input 
             :maxlength="100" 
             :minlength="6" 
             style='width: 400px;' 
             v-model="temp.address"
             placeholder="请输入6-100位的详细地址"></el-input>
        </el-form-item>

        <el-form-item label="服务范围类型" prop="scopeType">
          <el-select 
            style='width: 400px;' 
            class="filter-item" 
            v-model="temp.scopeType" 
            placeholder="请选择">
            <el-option v-for="(val, key, index) in scopeType" :key="index" :label="val" :value="key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="服务城市" prop="serviceCityId" >
        <!-- <el-form-item label="服务城市"  > -->
         
           <el-select  style='width: 400px;'  v-model="temp.serviceCityId" @change="changeCity"  multiple  placeholder="请选择">
            
            <el-option-group
              v-for="(group,index) in areaOptions"
              :key="group.value"
              :label="group.label">
              <el-option
                v-for="item in group.children"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>

          </el-select>
        </el-form-item>

        <!-- <el-form-item label=" 客户信息" >
          <el-switch
            v-model="temp.visable"
            on-color="#4c70e8"
            off-color="#eef1f6">
          </el-switch>
        </el-form-item> -->

        <el-form-item label=" 机构网址" >
          <el-input 
            style='width: 400px;' 
            v-model="temp.url"
            placeholder="请输入机构网址"></el-input>
        </el-form-item>

        <el-form-item label=" 机构传真" >
          <el-input 
            style='width: 400px;' 
            v-model="temp.fax"
            placeholder="请输入机构传真号"></el-input>
        </el-form-item>

        <el-form-item label="  400客服电话" >
          <el-input 
            style='width: 400px;' 
            v-model="temp.tel400"
            placeholder="允许格式：400XXXXXXX"></el-input>
        </el-form-item>

        <el-form-item label=" 备注" >
          <el-input 
            type="textarea" 
            :rows="2" 
            v-model="temp.remark"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">       
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
  getMech,
  addMech,
  upMech,
  getSerstation,
  getMechPage,
  getCity
} from "@/api/base";
import { getArea } from "@/api/base";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";

export default {
  name: "table_demo",
  directives: {
    waves
  },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!value) {
					return callback(new Error('电话号码不能为空'));
				}else{
					if (!(/^(\d{1,4}-)?(\d{1,4}-)?\d{7,9}$/.test(value))) {
						callback(new Error('请输入正确固话格式，如：010-88886666'));
					} else {
						callback();
					}
				}
    };
    var validateMasterPhone = (rule, value, callback) => {
      if (!value) {
					return callback(new Error('电话号码不能为空'));
				}else{
					if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(value))) {
						callback(new Error('请输入正确11位手机号'));
					} else {
						callback();
					}
				}
    };
    return {
      list: [],
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
      pageNumber:1,
      pageSize: 10,
      total: 1,
      search: {
        key: "",
        value: ""
      },
      temp: {
        address: "",
        fax: "",
        name: "",
        tel400: "",
        url: "",
        telephone: "",
        masterName: "",
        masterPhone: "",
        remark: "",
        // cusProvId: "",
        // cusCityId: "",
        // cusTownId: "",
        areaCodes: [],
        scopeType: "",
        serviceCityId: [],
        visable: "1"
      },
      province: "",
      importanceOptions: [
        { id: "name", value: "机构名称" },
        { id: "masterName", value: "负责人姓名" },
        { id: "masterPhone", value: "负责人手机号" }
      ],
      scopeType: [],
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      tableKey: 0,
      provinceOptions: [],
      cityOptions: [],
      countyOptions: [],
      areaOptions: this.$store.state.user.area,
      textarea: "",
      // serviceCity: this.$store.state.user.area,
      updateId: "",
      rules: {
        name: [
          { required: true, message: "请输入 2 到 15 位的机构名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        telephone: [
          {
            required: true,
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        masterName: [
          { required: true, message: "请输入 2 到 15 位的负责人姓名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        masterPhone: [
          { required: true, validator: validateMasterPhone, trigger: "blur" },
          { min: 11, max: 11, message: "长度11个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入 6 到 100 位的详细地址", trigger: "blur" },
          { min: 6, max: 100, message: "长度在 6 到 100 个字符", trigger: "blur" }
        ],
        scopeType: [
          { required: true, message: "服务范围类型不能为空", trigger: "change" }
        ],
        serviceCityId: [
          {
            required: true,
            type: "array",
            message: "服务范围城市不能为空",
            trigger: "change"
          }
        ],
        cusTownId: [
          { required: true, message: "服务城市地址不能为空", trigger: "change" }
        ],
        areaCodes: [
          {
            required: true,
            type: "array",
            message: "所在区域不能为空",
            trigger: "change"
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
    var dict = require("../../../static/dict.json");
    this.scopeType = dict.service_area_type;
    console.log(this.scopeType);
  },
  methods: {
    getList() {
      this.listLoading = true;
      var obj = {};
      getMechPage(obj, this.pageNumber, this.pageSize).then(res => {
        console.log(res);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleFilter() {
      var value = this.search.value;
      if (this.search.key == "name") {
        var obj = {
          name: value
        };
      } else if (this.search.key == "masterName") {
        var obj = {
          masterName: value
        };
      } else {
        var obj = {
          masterPhone: value
        };
      }
      this.listLoading = true;
      getMechPage(obj, this.pageNumber, this.pageSize).then(res => {
        console.log(res);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
      this.listQuery.page = 1;
      // this.getList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      var value = this.search.value;
      if (this.search.key == "name") {
        var obj = {
          name: value
        };
      } else if (this.search.key == "masterName") {
        var obj = {
          masterName: value
        };
      } else {
        var obj = {
          masterPhone: value
        };
      }
      getMechPage(obj, this.pageNumber, this.pageSize).then(res => {
        console.log(res);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      var value = this.search.value;
      if (this.search.key == "name") {
        var obj = {
          name: value
        };
      } else if (this.search.key == "masterName") {
        var obj = {
          masterName: value
        };
      } else {
        var obj = {
          masterPhone: value
        };
      }
      this.listLoading = true;
      getMechPage(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        this.listLoading = false;
      });
    },
    handleCreate(formName) {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      //this.resetTemp();
      //this.$refs[formName].resetFields();
    },
    handleUpdate(row) {
      //console.log(row);
      this.listLoading = true;
      const obj = {
        id: row.id
      };
      upMech(obj)
        .then(res => {
          console.log(res);

          if (res.data.code == "1") {
            this.listLoading = false;

            var arr = [];
            //arr = res.data.data.serviceCityId.split(",");
            arr.pop();
            this.temp = Object.assign({}, res.data.data);
            this.temp.serviceCityId = res.data.data.cityCodes;
            this.dialogStatus = "update";
            this.updateId = res.data.data.id;
            // 省市区
            this.temp.areaCodes = [
              res.data.data.provinceCode,
              res.data.data.cityCode,
              res.data.data.areaCode
            ];
            this.dialogFormVisible = true;
          } else {
            this.listLoading = false;
            this.$message({
              type: "error",
              message: "请求错误"
            });
          }
        })
        .catch(error => {
          this.listLoading = false;
          this.$message({
            type: "error",
            message: "网络原因，稍后再试"
          });
        });
      // console.log(this.temp.visable);
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.resetTemp();
      this.$refs[formName].resetFields();
    },
    searchChange(val) {
      console.log(val);
      // this.search.key = val
    },
    changeCity(val) {
      console.log(val);
    },
    create(formName) {
      console.log(this.temp.serviceCityId);
      var arr = [];
      for (var i = 0; i < this.temp.serviceCityId.length; i++) {
        arr.push(this.temp.serviceCityId[i]);
      }
      var obj = {
        name: this.temp.name, //机构名
        telephone: this.temp.telephone, //机构电话
        masterName: this.temp.masterName, //负责人
        masterPhone: this.temp.masterPhone, //负责人
        address: this.temp.address, //详细地址
        scopeType: this.temp.scopeType, //服务类型
        cityCodes: arr,
        url: this.temp.url, //网址
        fax: this.temp.fax, //传真
        tel400: this.temp.tel400, //400
        remark: this.temp.remark, //备注
        provinceCode: this.temp.areaCodes[0], //省
        cityCode: this.temp.areaCodes[1], //市
        areaCode: this.temp.areaCodes[2] //区
        //visable: "1"
      };
      // if (this.temp.visable) {
      //   obj.visable = "1";
      // } else {
      //   obj.visable = "0";
      // }
      console.log(obj);
      this.$refs[formName].validate(valid => {
        if (valid) {
          addMech(obj).then(res => {
            console.log(res);
            if (res.data.code === 1) {
              this.resetTemp();
              this.$refs[formName].resetFields();
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.getList();
              this.dialogFormVisible = false;
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
    update(formName) {
      var arr = [];
      for (var i = 0; i < this.temp.serviceCityId.length; i++) {
        arr.push(this.temp.serviceCityId[i]);
      }
      var obj = {
        id: this.updateId,
        name: this.temp.name, //机构名
        telephone: this.temp.telephone, //机构电话
        masterName: this.temp.masterName, //负责人
        masterPhone: this.temp.masterPhone, //负责人
        address: this.temp.address, //详细地址
        scopeType: this.temp.scopeType, //服务类型
        cityCodes: arr,
        url: this.temp.url, //网址
        fax: this.temp.fax, //传真
        tel400: this.temp.tel400, //400
        remark: this.temp.remark, //备注
        provinceCode: this.temp.areaCodes[0], //省
        cityCode: this.temp.areaCodes[1], //市
        areaCode: this.temp.areaCodes[2] //区
      };
      console.log(obj)
      this.$refs[formName].validate(valid => {
        if (valid) {
          addMech(obj).then(res => {
            console.log(res);
            this.dialogFormVisible = false;
            if (res.data.code === 1) {
              this.resetTemp();
              this.$refs[formName].resetFields();
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.getList();
            } else {
              this.$message({
                type: "error",
                message: res.data.data
              });
            }
          });
        }
      });
    },
    resetTemp() {
      this.temp = {
        address: "",
        fax: "",
        name: "",
        tel400: "",
        url: "",
        phone: "",
        masterName: "",
        masterPhone: "",
        remark: "",
        areaCodes: [],
        scopeType: "",
        serviceCityId: []
      };
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
body {
  background-color: #f5f5f5;
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
.ceshi3 {
  font-size: 14px;
  color: #1d85fe;
  border: 1px solid #1d85fe;
  background-color: #ffffff;
}
.pagination-container {
  overflow: hidden;
}
</style>