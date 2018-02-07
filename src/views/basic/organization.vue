<template>
<div>
  <!-- 搜索开始 -->
  <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width: 350px;" placeholder="请输入搜索的内容" v-model="search.value">
        <el-select slot="prepend" clearable style="width: 120px" class="filter-item" @change="searchChange" v-model="search.key" placeholder="请选择">
        <el-option v-for="item in importanceOptions" :key="item.id" :label="item.value" :value="item.id">
        </el-option>
      </el-select>
      </el-input>

      <button class="button-large el-icon-search btn_search" @click="handleFilter"> 搜索</button>
  </div>
  <!-- 搜索结束 -->
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
     <button class="button-small btn_pad" v-if="btnShow.indexOf('office_insert') > -1"  @click="handleCreate('temp')">新增</button>
    <!-- 列表开始 -->
    <el-table 
    :key='tableKey' 
    :data="list" 
    v-loading="listLoading"
    fit
    highlight-current-row 
    tooltip-effect='light'
    element-loading-text="正在加载" 
    style="width: 100%" >
      <el-table-column align="center" label="编号" width="100">
         <template scope="scope">
            {{scope.row.index + (pageNumber-1) * pageSize}}
        </template>
      </el-table-column>

      <el-table-column  label="机构名称" align="center" >
        <template scope="scope">
           <el-tooltip  placement="left" :disabled="scope.row.name.length < 10" :content="scope.row.name">
             <div class="overheidden" >{{scope.row.name}}</div>
           </el-tooltip>
         </template>
      </el-table-column>

      <el-table-column  label="机构电话" align="center"  prop="telephone">
      </el-table-column>

      <el-table-column  label="机构地址"  align="center" width="200px" >
         <template scope="scope">
           <el-tooltip  placement="left" :disabled="scope.row.address.length < 10" :content="scope.row.address">
             <div class="overheidden" >{{scope.row.address}}</div>
           </el-tooltip>
         </template>
      </el-table-column>

      <el-table-column  label="负责人姓名" align="center">
        <template scope="scope">
           <el-tooltip  placement="left" :disabled="scope.row.masterName.length < 10" :content="scope.row.masterName">
             <div class="overheidden" >{{scope.row.masterName}}</div>
           </el-tooltip>
         </template>
      </el-table-column>

      <el-table-column  label="负责人手机号" align="center"  prop="masterPhone">
      </el-table-column>

      <el-table-column  label="E店编码" align="center"  prop="jointEshopCode">
          <template scope="scope">
           <el-tooltip placement="left"  :content="scope.row.jointEshopCode">
             <div class="tool">{{scope.row.jointEshopCode}}</div>
           </el-tooltip>
         </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
           <el-button class="el-icon-edit ceshi3" v-if="btnShow.indexOf('office_update') > -1" @click="handleUpdate(scope.row)"></el-button>
          </el-button>
        </template>
      </el-table-column>

    </el-table>
<!-- 列表结束 -->
<!-- 分页器 -->
    <div v-if="!listLoading" class="pagination-container">
      <el-pagination class="fr page mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
<!-- 弹框 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
      id="diatable">
      
      <el-form 
         class="small-space dia_form" 
         :model="temp" 
         label-position="left" 
         label-width="160px"
         :rules="rules"
         ref="temp" 
         >

        <el-form-item label="机构名称:" prop="name">
          <el-input 
          v-model.trim="temp.name"
          class="form_item" 
          :disabled="dialogStatus == 'update' && orgId != '0' "
          placeholder="请正确填写机构名称（2-15个字）"></el-input>
        </el-form-item>

        <el-form-item label="机构电话:" prop="telephone" >
          <el-input 
            class="form_item"
            v-model="temp.telephone"
            placeholder="请输入服务机构电话,格式:座机(区号+号码)如:010-66668888"></el-input>
        </el-form-item>

        <el-form-item label="负责人姓名:" prop="masterName">
          <el-input 
          class="form_item"
          v-model.trim="temp.masterName"
          placeholder="请输入2-15位的负责人姓名"></el-input>
        </el-form-item>
 
        <el-form-item label="负责人手机号:" prop="masterPhone" >
          <el-input 
            class="form_item"
            placeholder="请输入11位手机号" 
            v-model="temp.masterPhone"></el-input>
        </el-form-item>

        <el-form-item label="所在区域:"  prop="areaCodes">
              <!-- 省市区 -->
              <el-cascader
                @active-item-change = "codeChange"
                :options="areaOptions"
                :show-all-levels="true"
                v-model="temp.areaCodes"
                 class="form_item"
              ></el-cascader>
				</el-form-item>

        <el-form-item label="详细地址:" prop="address">
          <el-input 
            class="form_item"
             v-model.trim="temp.address"
             placeholder="请输入6-100位的详细地址"></el-input>
        </el-form-item>

        <el-form-item label="服务范围类型:" prop="scopeType">
          <el-select
          class="form_item"
            disabled
            v-model="temp.scopeType" 
            placeholder="请选择">
            <el-option v-for="(val, key, index) in scopeType" :key="index" :label="val" :value="key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工作时间:" required="">
          <el-col :span="11">
            <el-form-item prop="workStartTime" >
              <el-select
              class="form_item"
                v-model="temp.workStartTime" 
                @change="startTimeChange"
                placeholder="请选择开始时间">
                 <el-option v-for="(item,index) in workTime" :key="index" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align:center;">-</el-col>
          <el-col :span="11">
            <el-form-item prop="workEndTime">
              <el-select
              class="form_item"
              @change="endTimeChange"
                v-model="temp.workEndTime" 
                placeholder="请选择结束时间">
                <el-option v-for="(item,index) in workEndTime" :key="index" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          
        </el-form-item>
        
        <el-form-item label=" E店编码:" prop="jointEshopCode">
          <el-input 
           class="form_item"
            v-model.trim="temp.jointEshopCode"
            placeholder="请输入E店编码"></el-input>
        </el-form-item>

        <el-form-item label=" 机构网址:" prop="url">
          <el-input 
            class="form_item"
            v-model="temp.url"
            placeholder="请输入机构网址"></el-input>
        </el-form-item>

        <el-form-item label=" 机构传真:" prop="fax">
          <el-input 
            class="form_item"
            v-model="temp.fax"
            placeholder="请输入机构传真号"></el-input>
        </el-form-item>

        <el-form-item label="  400客服电话:" prop="tel400">
          <el-input 
            class="form_item"
            v-model="temp.tel400"
            placeholder="允许格式：400XXXXXXX"></el-input>
        </el-form-item>

        <el-form-item label=" 备注:">
          <el-input 
          class="form_item"
            type="textarea" 
            :rows="2" 
            :maxlength="200"
             placeholder="请输入0-200字符备注"
            v-model="temp.remark"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">       
        <button class="button-large" :disabled="btnState" v-if="dialogStatus == 'update'" @click="update('temp')">保 存</button>    
        <button class="button-large" :disabled="btnState"  v-else @click="create('temp')">保 存</button>    
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
  setMech,
  upMech,
  getMechPage,
  getCity
} from "@/api/basic";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";

export default {
  name: "prganization",
  directives: {
    waves
  },
  data() {
    // 表单验证
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      } else {
        if (!/^(\d{1,4}-)?\d{7,13}$/.test(value)) {
          callback(new Error("请输入正确固话格式，如：010-88886666"));
        } else {
          callback();
        }
      }
    };
    var validateMasterPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      } else {
        if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value)) {
          callback(new Error("请输入正确11位手机号"));
        } else {
          callback();
        }
      }
    };
    var validateurl = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (
          !/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.test(
            value
          )
        ) {
          callback(new Error("请输入正确的机构网址"));
        } else {
          callback();
        }
      }
    };
    var validatefax = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (!/^(\d{1,4}-)?\d{7,13}$/.test(value)) {
          callback(new Error("请输入正确的传真地址"));
        } else {
          callback();
        }
      }
    };
    var validatetel400 = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (!/^[4]00\d{7}$/.test(value)) {
          callback(new Error("请输入正确的400服务电话"));
        } else {
          callback();
        }
      }
    };
    return {
      btnShow: JSON.parse(localStorage.getItem("btn")),
      btnState: false,
      typeState: false,
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
      pageNumber: 1,
      pageSize: 10,
      total: 1,
      search: {
        key: "name",
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
        workStartTime: "",
        workEndTime: "",
        jointEshopCode: "",
        remark: "",
        areaCodes: [],
        scopeType: "store",
        visable: "1"
      },
      province: "",
      importanceOptions: [
        { id: "name", value: "机构名称" },
        { id: "masterName", value: "负责人姓名" },
        { id: "masterPhone", value: "负责人手机号" },
        { id: "jointEshopCode", value: "E店编码" },
      ],
      scopeType: [],
      workTime: [],
      workEndTime: [],
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑服务机构",
        create: "新增服务机构"
      },
      tableKey: 0,
      provinceOptions: [],
      cityOptions: [],
      countyOptions: [],
      textarea: "",
      orgId: "", // 判断是不是全平台用户
      updateId: "",
      rules: {
        name: [
          {
            required: true,
            message: "请输入 2 到 15 位的机构名称",
            trigger: "blur"
          },
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
          {
            required: true,
            message: "请输入 2 到 15 位的负责人姓名",
            trigger: "blur"
          },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        masterPhone: [
          { required: true, validator: validateMasterPhone, trigger: "blur" },
          { min: 11, max: 11, message: "长度11个字符", trigger: "blur" }
        ],
        address: [
          {
            required: true,
            message: "请输入 6 到 100 位的详细地址",
            trigger: "blur"
          },
          {
            min: 6,
            max: 100,
            message: "长度在 6 到 100 个字符",
            trigger: "blur"
          }
        ],
        scopeType: [
          { required: true, message: "服务范围类型不能为空", trigger: "change" }
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
        ],
        workStartTime: [
          { required: true, message: "工作开始时间不能为空", trigger: "change" }
        ],
        workEndTime: [
          { required: true, message: "工作结束时间不能为空", trigger: "change" }
        ],
        jointEshopCode: [
          { max: 50, message: "长度不超过50个字符", trigger: "blur" }
        ],
        url: [
          { validator: validateurl, trigger: "blur" },
          { min: 0, max: 100, message: "长度不超过255个字符", trigger: "blur" }
        ],
        fax: [
          { validator: validatefax, trigger: "blur" },
          { min: 0, max: 100, message: "长度不超过255个字符", trigger: "blur" }
        ],
        tel400: [
          { validator: validatetel400, trigger: "blur" },
          { min: 0, max: 100, message: "长度不超过255个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    areaOptions: function() {
      return this.$store.state.user.area;
    }
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
    this.workTime = [
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
        "04:30",
        "05:00",
        "05:30",
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
        "24:00"
    ];
    this.orgId = localStorage.getItem("orgId");
  },
  methods: {
    //获取列表
    getList() {
      var value = this.search.value;
      if (this.search.key == "name") {
        var obj = {
          name: value
        };
      } else if (this.search.key == "masterName") {
        var obj = {
          masterName: value
        };
      } else if (this.search.key == "masterPhone") {
        var obj = {
          masterPhone: value
        };
      }else if(this.search.key =="jointEshopCode"){
        var obj = {
          jointEshopCode: value
        }

      } else {      
          var obj = {};
      }
      this.listLoading = true;
      getMechPage(obj, this.pageNumber, this.pageSize).then(res => {
        this.total = res.data.data.count;
        this.list = res.data.data.list;
        this.pageNumber = res.data.data.pageNo;
        this.pageSize = res.data.data.pageSize;
        this.listQuery.page = res.data.data.pageNo;
        if (this.list != undefined) {
          for (var i = 0; i < this.list.length; i++) {
            this.list[i].index = i + 1;
          }
        }
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      }).catch(()=>{
        this.listLoading = false
      });
    },
    //搜索
    handleFilter() {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.getList();
    },
    //切换tiao数
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.pageSize = val;
      this.getList()
    },
    //切换页数
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getList()
    },
    //开始时间change事件
    startTimeChange(val) {
      this.temp.workEndTime = "";
      this.workEndTime = [];
      for (var i = 0; i < this.workTime.length; i++) {
        if (val == this.workTime[i]) {
          for (var j = i + 1; j < this.workTime.length; j++) {
            this.workEndTime.push(this.workTime[j]);
          }
          //this.workEndTime = this.workTime.subString(i,this.workTime.length)
        }
      }
    },
    //结束时间change事件
    endTimeChange(val) {
    },
    //点击新增
    handleCreate(formName) {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.typeState = false;
    },
    //点击编辑
    handleUpdate(row) {
      this.listLoading = true;
      const obj = {
        id: row.id
      };
      setMech(obj)
        .then(res => {
          if (res.data.code == "1") {
            this.listLoading = false;
            if (res.data.data.haveStation !== 0) {
              this.typeState = true;
            }
            this.temp = Object.assign(
              { workStartTime: "", workEndTime: "", jointEshopCode: "" },
              res.data.data
            );
            this.temp.scopeType = "store"
            this.dialogStatus = "update";
            this.updateId = res.data.data.id;
            // 省市区
            this.temp.areaCodes = [
              res.data.data.provinceCode,
              res.data.data.cityCode,
              res.data.data.areaCode
            ];
            if (
              res.data.data.workStartTime != undefined &&
              res.data.data.workEndTime != undefined
            ) {
              setTimeout(() => {
                this.temp.workStartTime = res.data.data.workStartTime.substring(
                  0,
                  5
                );
              }, 30);

              setTimeout(() => {
                var time = res.data.data.workEndTime.substring(0, 5);
                if (time == "23:59") {
                  this.temp.workEndTime = "24:00";
                } else {
                  this.temp.workEndTime = time;
                }
              }, 30);
            }
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
        });
    },
    //取消
    resetForm(formName) {
      this.typeState = false;
      this.dialogFormVisible = false;
      this.resetTemp();
      this.$refs[formName].resetFields();
    },
    //切换省市区
    codeChange(val) {
      this.temp.areaCodes.splice(0, this.temp.areaCodes.length);
    },
    //切换搜索内容
    searchChange(val) {
      // this.search.key = val
    },
    //新增保存
    create(formName) {
      var obj = {
        name: this.temp.name, //机构名
        telephone: this.temp.telephone, //机构电话
        masterName: this.temp.masterName, //负责人
        masterPhone: this.temp.masterPhone, //负责人
        address: this.temp.address, //详细地址
        scopeType: this.temp.scopeType, //服务类型
        workStartTime: this.temp.workStartTime + ":00", //开始时间
        workEndTime: this.temp.workEndTime + ":00", //结束时间
        jointEshopCode: this.temp.jointEshopCode, //e店
        url: this.temp.url, //网址
        fax: this.temp.fax, //传真
        tel400: this.temp.tel400, //400
        remark: this.temp.remark, //备注
        provinceCode: this.temp.areaCodes[0], //省
        cityCode: this.temp.areaCodes[1], //市
        areaCode: this.temp.areaCodes[2] //区
      };
      //防止数据库24:00:00乱码
      if (obj.workEndTime == "24:00:00") {
        obj.workEndTime = "23:59:59";
      }
      //防止数据库08:00:00乱码
      if (obj.workStartTime == "08:00:00") {
        obj.workStartTime = "08:00:01";
      }
      if (obj.workEndTime == "08:00:00") {
        obj.workEndTime = "08:00:01";
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          addMech(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code === 1) {
                this.resetTemp();
                this.$refs[formName].resetFields();
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.search.key = "name";
                this.search.value = "";
                this.handleFilter();
                this.dialogFormVisible = false;
              } else {
                
              }
            })
            .catch(err => {
              this.btnState = false;
            });
        } else {
          return false;
        }
      });
    },
    //编辑保存
    update(formName) {
      var obj = {
        id: this.updateId,//被编辑的id
        name: this.temp.name, //机构名
        telephone: this.temp.telephone, //机构电话
        masterName: this.temp.masterName, //负责人
        masterPhone: this.temp.masterPhone, //负责人
        address: this.temp.address, //详细地址
        scopeType: this.temp.scopeType, //服务类型
        workStartTime: this.temp.workStartTime + ":00", //开始时间
        workEndTime: this.temp.workEndTime + ":00", //结束时间
        jointEshopCode: this.temp.jointEshopCode, //e店
        url: this.temp.url, //网址
        fax: this.temp.fax, //传真
        tel400: this.temp.tel400, //400
        remark: this.temp.remark, //备注
        provinceCode: this.temp.areaCodes[0], //省
        cityCode: this.temp.areaCodes[1], //市
        areaCode: this.temp.areaCodes[2] //区
      };
      //防止数据库24:00:00乱码
      if (obj.workEndTime == "24:00:00") {
        obj.workEndTime = "23:59:59";
      }
      //防止数据库08:00:00乱码
      if (obj.workStartTime == "08:00:00") {
        obj.workStartTime = "08:00:01";
      }
      if (obj.workEndTime == "08:00:00") {
        obj.workEndTime = "08:00:01";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          upMech(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code === 1) {
                this.dialogFormVisible = false;
                this.typeState = false;
                this.resetTemp();
                this.$refs[formName].resetFields();
                this.$message({
                  type: "success",
                  message: "修改成功"
                });

                this.getList();
              } else {
                
              }
            })
            .catch(() => {
              this.btnState = false;
            });
        }
      });
    },
    //清空temp
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
        areaCodes: [],
        workStartTime: "",
        workEndTime: "",
        jointEshopCode: "",
        scopeType: "store",
        remark: ""
      };
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
.bgWhite {
  background-color: #ffffff;
  padding: 20px 20px 20px 20px;
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
/* //  修改*号
.el-form-item .el-form-item__label:before {
    content: '　';
    color: #ff4949;
    margin-right: -6px;
    font-size: 1px;
    vertical-align:middle;
} */
.overheidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>