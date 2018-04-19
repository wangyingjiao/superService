<template>
  <div>
    <!-- 搜索 -->
    <div class="filter-container bgWhite">
       <el-select filterable  class="search" clearable  v-model="search.officeId" placeholder="选择机构">
        <el-option v-for="item in mechanismCheck" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>

      <el-input @keyup.enter.native="handleFilter" class="search" placeholder="请输入搜索站点名" v-model="search.name">
      </el-input>
        <!-- 分组搜索 -->
      <el-select class="search" v-model="search.cityCode" filterable clearable placeholder="请选择城市">     
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
      <button class="button-large el-icon-search btn_search btn-color" @click="handleFilter"> 搜索</button>
    </div>
    <div class="app-container calendar-list-container">
     <div class="bgWhite">
       <!-- 按钮组 -->
      <button class="button-small btn_pad btn-color"   v-if="btnShow.indexOf('station_insert') >= 0" @click="handleCreate">新增</button>
      <button class="button-small-fourth btn_pad btn-color"  style="width:80px" v-if="btnShow.indexOf('station_scope') >= 0" @click="handleSetRange">设置范围</button>
      <button class="button-small-fourth btn_pad btn-color"  style="width:80px" v-if="btnShow.indexOf('station_manager') >= 0" @click="handleSetMaster">设置站长</button>
      <!-- 列表 -->
      <el-table 
      id="tableColor"
        :key='tableKey' 
        :data="list" 
        v-loading="listLoading"
        fit
        highlight-current-row 
        element-loading-text="正在加载"
        @row-click = "rowClick"
        style="width: 100%">

        <el-table-column align="center" label="编号"  width="100">
          <template scope="scope">
            {{scope.row.index + (pageNumber-1) * pageSize}}
        </template>
        </el-table-column>

        <el-table-column label="服务站名称" align="center">
           <template scope="scope">
           <el-tooltip  placement="left" :disabled="scope.row.name.length < 5" :content="scope.row.name">
             <div class="overheidden" >{{scope.row.name}}</div>
           </el-tooltip>
         </template>

        </el-table-column>

        <el-table-column label="服务站类型" align="center" prop="type">
           <template scope="scope">
            <span v-if="scope.row.type =='join'">加盟</span>
            <span v-if="scope.row.type =='self'">直营</span>
          </template>    
        </el-table-column>

        <el-table-column label="站长" align="center" prop="user.name">
        </el-table-column>

        <el-table-column label="所属城市" align="center" prop="cityName">        
        </el-table-column>

        <el-table-column label="服务站电话" align="center" prop="phone">       
        </el-table-column>

        <el-table-column label="员工数量" align="center" prop="employees">
        </el-table-column>

        <el-table-column label="技师数量" align="center" prop="techNum">          
        </el-table-column>

        <el-table-column align="center" label="状态" prop="isUseable">
          <template scope="scope">
            <span v-if="scope.row.isUseable =='yes'">启用</span>
            <span v-else>停用</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150">
          <template scope="scope">
            <el-button class="el-icon-edit ceshi3" v-if="btnShow.indexOf('station_update') >= 0" @click="handleUpdate(scope.row)"></el-button>
            <el-button class="el-icon-delete ceshi3" v-if="btnShow.indexOf('station_delete') >= 0" @click="handleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>

      </el-table>
<!-- 分页器 -->
      <div v-if="!listLoading" class="pagination-container clearfix">
        <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      </div>
<!-- 新增编辑弹窗 -->
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
            ref="temp" 
            :rules="rules"
           label-position="left" 
           label-width="160px" 
           >

          <el-form-item label="服务站名称:" prop="name">
            <el-input  v-model.trim="temp.name" placeholder="请输入2-15位的服务站名称"></el-input>
          </el-form-item>
          <el-form-item label="服务站类型:" prop="type">
            <el-select class="form_item" v-model="temp.type">
              <el-option v-for="(val,key,index) in stationType" :key="index" :label="val" :value="key">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所在区域:"  prop="areaCodes">
              <el-cascader
               @active-item-change = "codeChange"
                :options="areaOptions"
                :show-all-levels="true"
                v-model="temp.areaCodes"
                class="form_item"
              ></el-cascader>
				</el-form-item>

          <el-form-item label="详细地址:" prop="address">
            <el-input class="form_item"   v-model.trim="temp.address" placeholder="请输入6-100位的详细地址"></el-input>
          </el-form-item>

          <el-form-item label="服务站电话:" prop="phone">
            <el-input class="form_item"  v-model="temp.phone" placeholder="可选格式：11位手机号、座机（区号-电话号码）"></el-input>
          </el-form-item>

          <el-form-item label="状态:" prop="isUseable">
            <el-select class="form_item" v-model="temp.isUseable">
              <el-option v-for="item in stationState" :key="item.id" :label="item.value" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <button class="button-large btn-color" :disabled='btnState' v-if="dialogStatus == 'update'" @click="update('temp')">保 存</button>    
          <button class="button-large btn-color"  :disabled="btnState" v-else @click="create('temp')">保 存</button>    
          <button class="button-cancel btn-color-cancel" @click="resetForm('temp')">取 消</button>
        </div>
      </el-dialog>
<!-- 设置站长 -->
      <el-dialog 
        title="设置站长"
        :show-close= "false"
        size='tiny'
       :close-on-click-modal="false"
       :close-on-press-escape="false" 
       :visible.sync="dialogMasterVisible">

        <el-form 
          label-width='100px' 
          class="masterForm" 
          :rules="rulesMaster"
          ref="tempMaster"
          :model="tempMaster">
          <el-form-item label="服务站长:" prop="master">
            <el-select class="form_item" filterable v-model="tempMaster.master">
              <el-option v-for="item in master" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
           <button class="button-large btn-color" :disabled='btnState' @click="createMaster('tempMaster')">保 存</button>    
           <button class="button-cancel btn-color-cancel" @click="resetMaster('tempMaster')">取 消</button>
        </div>
      </el-dialog>
<!-- 设置门店 -->
      <el-dialog 
        title="门店范围" 
        :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
        :visible.sync="dialogStoreVisible">
        <el-form
          :model="tempStore"
          label-position="left"
          label-width="100px" 
          class="dia_form"
         >
          <el-form-item label="设置门店:">
            <el-tree
            class="scrollBox form_item"
              :data="storeTree"
              v-model="tempStore.tree"
               ref="domTree"
              show-checkbox
              node-key="id"
              :indent='40'
              :props="defaultProps">
            </el-tree>

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
           <button class="button-large btn-color" :disabled='btnState'  @click="createStore('temp')">保 存</button>    
           <button class="button-cancel btn-color-cancel" @click="resetStore('temp')">取 消</button>
        </div>
      </el-dialog>
    </div>
    </div>
  </div>
</template>

<script>
import {
  getSite,
  addSite,
  delSite,
  upSite,
  getMaster,
  setMaster,
  getStore,
  setStore,
  setScope
} from "@/api/basic";
import { getSList } from "@/api/staff";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
var loading;
export default {
  name: "station",
  directives: {
    waves
  },
  data() {
    // 表单验证
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      } else {
        if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$|^0\d{2,3}-?\d{7,8}$/.test(value)) {
          callback(new Error("号码格式不正确！"));
        } else {
          callback();
        }
      }
    };
    return {
      btnShow: [],
      btnState: false,
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 6
      },
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      search: {
        officeId:"",
        name: "",
        cityCode: ""
      },
      rowInfo: {
        id: "",
        masterId: "",
        rangeType: "",
        serviceAreaType: "",
        storeList: [],
        servicePoint: ""
      },
      temp: {
        name: "",
        type: "",
        address: "",
        areaCodes: [],
        phone: "",
        isUseable: ""
      },
      tempStore: {
        tree: []
      },
      tempMaster: {
        master: ""
      },
      storeTree: [],
      defaultProps: {
        children: "children",
        label: "storeName"
      },
      importanceOptions: [],
      stationType: [],
      mechanismCheck: [],
      stationState: [{ id: "yes", value: "启用" }, { id: "no", value: "停用" }],
      dialogFormVisible: false, //表格
      dialogMasterVisible: false, //店长
      dialogStoreVisible: false, //门店
      dialogStatus: "",
      textMap: {
        update: "编辑服务站",
        create: "新增服务站"
      },
      tableKey: 0,
      master: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入 2 到 15 位的服务站名称",
            trigger: "blur"
          },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        type: [
          {
            required: true,
            message: "服务站类型不能为空，默认直营",
            trigger: "change"
          }
        ],
        areaCodes: [
          {
            required: true,
            type: "array",
            message: "所在区域不能为空",
            trigger: "change"
          }
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
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }]
      },
      rulesMaster: {
        master: [{ required: true, message: "站长不能为空", trigger: "change" }]
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
    if (JSON.parse(localStorage.getItem("btn"))) {
      this.btnShow = JSON.parse(localStorage.getItem("btn"));
    }
    // 加载字典量
    var dict = require("../../../static/dict.json");
    this.stationType = dict.service_station_type;
    // setTimeout(function() {}, 30);
    //this.areaOptions = this.$store.state.user.area;
    getSList({}).then(res => {
      // 服务机构
      this.mechanismCheck = res.data.data.list;
      this.search.officeId = this.mechanismCheck[0].id
      this.handleFilter()
    });
  },
  methods: {
    //loading
    loadingClick() {
      loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".el-dialog__body")
      });
    },
    //获取列表
    getList() {
      this.listLoading = true;
      var obj = {
        name: this.search.name,
        cityCode: this.search.cityCode,
        orgId:this.search.officeId
      };
      getSite(obj, this.pageNumber, this.pageSize)
        .then(res => {
          this.total = res.data.data.count;
          this.list = res.data.data.list;
          this.pageNumber = res.data.data.pageNo;
          this.pageSize = res.data.data.pageSize;
          this.listQuery.page = res.data.data.pageNo;
          this.rowInfo.id = "";
          if (this.list != undefined) {
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].index = i + 1;
            }
          }
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    //搜索
    handleFilter() {
      this.pageNumber = 1;
      this.listQuery.page = 1;
      this.getList();
    },
    // 设置站长
    handleSetMaster() {
      if (this.rowInfo.id == "") {
        this.$message.error("您未选择任何操作对象，请选择一行数据");
      } else {
        this.listLoading = true;
        var obj = {
          id: this.rowInfo.id
        };
        getMaster(obj)
          .then(res => {
            if (res.data.code == 1) {
              this.master = res.data.data;
              if (this.rowInfo.masterId) {
                this.tempMaster.master = this.rowInfo.masterId;
              } else {
                this.tempMaster.master = "";
              }
              this.dialogMasterVisible = true;
              this.listLoading = false;
            }
          })
          .catch(err => {
            this.listLoading = false;
          });
      }
    },
    //设置范围
    handleSetRange() {
      if (this.rowInfo.id == "") {
        this.$message.error("您未选择任何操作对象，请选择一行数据");
      } else {
        this.listLoading = false;
        if (this.rowInfo.serviceAreaType == "store") {
          this.listLoading = true;

          getStore({ stationId: this.rowInfo.id }).then(res => {
            if (res.data.code == 1) {
              this.listLoading = false;
              this.storeTree = res.data.data;
              this.dialogStoreVisible = true;

              this.$nextTick(() => {
                this.$refs.domTree.setCheckedKeys(this.rowInfo.storeList);
              });
            }
          });
        } else {
        }
      }
    },
    handleSizeChange(val) {
      //每页展示数量
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      //页数
      this.pageNumber = val;
      this.getList();
    },
    resetForm(formName) {
      //清空表单
      this.dialogFormVisible = false;
      this.resetTemp();
      this.$refs[formName].resetFields();
    },
    rowClick(row, event, column) {
      //行被点击时
      this.rowInfo.serviceAreaType = row.organ.scopeType;
      this.rowInfo.id = row.id;
      if (row.user == undefined) {
        this.rowInfo.masterId = "";
      } else {
        this.rowInfo.masterId = row.user.id;
      }
      if (row.storeList != undefined) {
        this.rowInfo.storeList = row.storeList;
      } else {
        this.rowInfo.storeList = [];
      }
      if (row.servicePoint != undefined) {
        this.rowInfo.servicePoint = row.servicePoint;
      } else {
        this.rowInfo.servicePoint = "";
      }
    },
    handleCreate() {
      //点击新增
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.temp.isUseable = "yes";
      this.temp.type = "self";
    },
    handleUpdate(row) {
      //点击编辑
      this.temp = {
        id: row.id,
        name: row.name,
        type: row.type,
        address: row.address,
        areaCodes: [row.provinceCode, row.cityCode, row.areaCode],
        phone: row.phone,
        isUseable: row.isUseable
      };
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    handleDelete(row) {
      //点击删除
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false
      })
        .then(() => {
          var obj = {
            id: row.id
          };
          delSite(obj)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList();
              }
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "请稍后再试"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    create(formName) {
      //新增保存时
      var obj = {
        name: this.temp.name,
        type: this.temp.type,
        address: this.temp.address,
        provinceCode: this.temp.areaCodes[0],
        cityCode: this.temp.areaCodes[1],
        areaCode: this.temp.areaCodes[2],
        phone: this.temp.phone,
        isUseable: this.temp.isUseable
      };
      //return
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loadingClick();
          this.btnState = true;
          addSite(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code === 1) {
                loading.close();
                this.resetTemp();
                this.$refs[formName].resetFields();
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.search.name = "";
                this.search.cityCode = "";
                this.handleFilter();
                this.dialogFormVisible = false;
              } else {
                loading.close();
              }
            })
            .catch(() => {
              loading.close();
              this.btnState = false;
            });
        } else {
          var errArr = this.$refs[formName]._data.fields;
          var errMes = [];
          for (var i = 0; i < errArr.length; i++) {
            if (errArr[i].validateMessage != "") {
              errMes.push(errArr[i].validateMessage);
            }
          }
          this.$message({
            type: "error",
            message: errMes[0]
          });
          return false;
        }
      });
    },
    createStore() {
      //保存门店
      this.loadingClick();
      var obj = {
        id: this.rowInfo.id,
        storeList: this.$refs.domTree.getCheckedKeys(true)
      };
      this.btnState = true;
      setStore(obj)
        .then(res => {
          setTimeout(() => {
            this.btnState = false;
          }, 1000);
          if (res.data.code == 1) {
            loading.close();
            this.dialogStoreVisible = false;
            //this.rowInfo.storeList = [];
            this.$refs.domTree.setCheckedKeys([]);
            // this.rowInfo.id = "";
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            var obj = {
              name: this.search.name,
              cityCode: this.search.cityCode
            };
            getSite(obj, this.pageNumber, this.pageSize).then(res => {
              this.rowInfo.id = "";
              this.list = res.data.data.list;
              if (this.list != undefined) {
                for (var i = 0; i < this.list.length; i++) {
                  this.list[i].index = i + 1;
                }
              }
              this.total = res.data.data.count;
              this.listLoading = false;
            });
          } else {
            loading.close();
          }
        })
        .catch(err => {
          loading.close();
          this.btnState = false;
        });
      this.tempStore.tree = [];
    },
    createMaster(formName) {
      //站长保存
      var obj = {
        id: this.rowInfo.id,
        userId: this.tempMaster.master
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loadingClick();
          this.btnState = true;
          setMaster(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "设置成功"
                });
                loading.close();
                // this.rowInfo.id = "";
                this.tempMaster.master = "";
                this.$refs[formName].resetFields();
                this.getList();
                this.dialogMasterVisible = false;
              } else {
                loading.close();
                // this.dialogMasterVisible = false;
              }
            })
            .catch(() => {
              loading.close();
              this.btnState = false;
            });
        } else {
          var errArr = this.$refs[formName]._data.fields;
          var errMes = [];
          for (var i = 0; i < errArr.length; i++) {
            if (errArr[i].validateMessage != "") {
              errMes.push(errArr[i].validateMessage);
            }
          }
          this.$message({
            type: "error",
            message: errMes[0]
          });
          return false;
        }
      });
    },
    update(formName) {
      //编辑保存
      var obj = {
        id: this.rowInfo.id,
        name: this.temp.name,
        type: this.temp.type,
        address: this.temp.address,
        provinceCode: this.temp.areaCodes[0],
        cityCode: this.temp.areaCodes[1],
        areaCode: this.temp.areaCodes[2],
        phone: this.temp.phone,
        isUseable: this.temp.isUseable
      };
      //return;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loadingClick();
          this.btnState = true;
          upSite(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code === 1) {
                this.resetTemp();
                this.$refs[formName].resetFields();
                //this.rowInfo.id = "";
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                this.getList();
                this.dialogFormVisible = false;
                loading.close();
              } else {
                loading.close();
              }
            })
            .catch(err => {
              loading.close();
              this.btnState = false;
            });
        } else {
          var errArr = this.$refs[formName]._data.fields;
          var errMes = [];
          for (var i = 0; i < errArr.length; i++) {
            if (errArr[i].validateMessage != "") {
              errMes.push(errArr[i].validateMessage);
            }
          }
          this.$message({
            type: "error",
            message: errMes[0]
          });
          return false;
        }
      });
    },
    resetTemp() {
      //清空v-m绑定的对象
      this.temp = {
        name: "",
        type: "",
        address: "",
        areaCodes: [],
        phone: "",
        isUseable: ""
      };
    },
    resetStore() {
      //取消门店
      this.tempStore.tree = [];
      //this.rowInfo.storeList = [];
      this.$refs.domTree.setCheckedKeys([]);
      this.dialogStoreVisible = false;
    },
    resetMaster(formName) {
      //取消店长
      this.$refs[formName].resetFields();
      this.tempMaster.master = "";
      this.dialogMasterVisible = false;
    },
    codeChange(val) {
      //区域截取
      this.temp.areaCodes.splice(0, this.temp.areaCodes.length);
    }
  }
};
</script>
<style scoped>
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

.btn_pad {
  margin: 0px 0px 20px 20px;
}

.btn_right {
  margin-top: 3px;
  float: right;
  width: 75px;
}
.mapButton {
  width: 80px;
  height: 25px;
  line-height: 25px;
  color: #fff;
  text-align: center;
  font-size: 12px;
  border: none;
  border-radius: 0px;
  outline: none;
  background: #4c70e8;
  cursor: pointer;
}
.mapButton:hover {
  background: #6d8dfc;
}
.mapWrap {
  width: 70%;
  height: 500px;
  float: left;
}
.buttonWrap {
  position: absolute;
  z-index: 9999;
  bottom: 20%;
  right: 35%;
}
.pickerBox {
  float: left;
  width: 30%;
  height: 500px;
  background: #fff;
  border-left: 1px dashed #ccc;
  font-size: 12px;
}
.headerWrap {
  border-bottom: 1px dashed #ccc;
  padding: 10px 5px;
}
.overlay-number {
  display: inline-block;
  width: 30px;
  text-align: center;
  color: red;
}
.bottomContent {
  padding: 20px 5px;
}
.el-table th > .cell {
  font-size: 12px;
}
.pickerInput {
  width: 150px;
  padding: 5px 5px;
}
.masterForm {
  width: 90%;
  margin: 0 auto;
}
.scrollBox {
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.overheidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
