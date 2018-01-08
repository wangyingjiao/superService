<template>
  <div>
    <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" class="search" placeholder="请输入搜索站点名" v-model="search.name">
      </el-input>

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
      <button class="button-large el-icon-search btn_search" @click="handleFilter"> 搜索</button>
    </div>
    <div class="app-container calendar-list-container">
     <div class="bgWhite">
      <button class="button-small btn_pad"   v-if="btnShow.indexOf('station_insert') >= 0" @click="handleCreate">新增</button>
      <button class="button-small-fourth btn_pad" style="width:80px" v-if="btnShow.indexOf('station_scope') >= 0" @click="handleSetRange">设置范围</button>
      <button class="button-small-fourth btn_pad" style="width:80px" v-if="btnShow.indexOf('station_manager') >= 0" @click="handleSetMaster">设置站长</button>

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

        <el-table-column label="服务站名称" align="center" prop="name">

        </el-table-column>

        <el-table-column label="服务站类型" align="center" prop="type">
           <template scope="scope">
            <span v-if="scope.row.type =='join'">加盟</span>
            <span v-if="scope.row.type =='self'">直营</span>
          </template>
          
        </el-table-column>

        <el-table-column label="站长" align="center" prop="user.id">

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

      <div v-show="!listLoading" class="pagination-container">
        <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
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
          <button class="button-large" v-if="dialogStatus == 'update'" @click="update('temp')">保 存</button>    
          <button class="button-large"  :disabled="btnState" v-else @click="create('temp')">保 存</button>    
          <button class="button-cancel" @click="resetForm('temp')">取 消</button>
        </div>
      </el-dialog>

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
            <el-select class="form_item" v-model="tempMaster.master">
              <el-option v-for="item in master" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
           <button class="button-large"  @click="createMaster('tempMaster')">保 存</button>    
           <button class="button-cancel" @click="resetMaster('tempMaster')">取 消</button>
        </div>
      </el-dialog>

      <el-dialog
			title="服务范围选择"
        :visible.sync="severSelectdialogVisible"
        width="100%"
        size="full"
        :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
        >
          <div ref="gdMap" class="mapWrap">             
          </div>
          <div class="buttonWrap">
            <input type="button" class="mapButton" value="绘制多边形" ref="polygon"/>
            <!--<input type="button" class="mapButton" value="绘制圆" ref="circle"/>-->
            <button type="button" class="mapButton" @click="saveOverlays">保存</button>
            <button class="mapButton"  @click="closeMap">取消</button>			
          </div> 		
          <div class="pickerBox">
            <div class="headerWrap">
            <h3>服务范围信息<span v-if="showPromit" style="color:red;margin-left:30px;">{{promitInf}}</span></h3>
            <div style="height:25px;line-height:25px;margin-top:10px;"><span style="display:inline-block;">服务范围个数:</span><span class="overlay-number">{{number}}</span><span style="display:inline-block;margin-left:20px;color:blue;cursor:pointer;" @click="removeOverlay">全部删除</span></div>
            </div>
            <div class="bottomContent">
              <p >请输入地址:<input class="pickerInput" ref="pickerInput"  value='' placeholder="输入关键字选取地点"></p>
              <div>
                <el-table
                  :data="tableData"
                  border
                  style="width: 100%"
                  max-height="250">
                  <el-table-column
                  label="服务范围"
                  align="center"
                  width='120'
                  >
                  <template scope="scope">
                    {{scope.row.name+scope.row.index}}
                  </template>
                  </el-table-column>
                  <el-table-column
                  prop="area"
                  align="center"
                  width='160'
                  label="面积"
                  >
                  </el-table-column>
                  <el-table-column
                  align="center"
                  width="100"						
                  label="操作">
									<template scope="scope">
										<el-button type="button" @click="Delete(scope.row)" >删除</el-button>
									</template>						
								</el-table-column>
							</el-table>							
						</div>
					</div>													    
				</div>
        <br/>
        <br/>		
	    </el-dialog>


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
           <button class="button-large"  @click="createStore('temp')">保 存</button>    
           <button class="button-cancel" @click="resetStore('temp')">取 消</button>
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
  getMaster,
  setMaster,
  getStore,
  setStore,
  setScope
} from "@/api/base";
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
        return callback(new Error("电话号码不能为空"));
      } else {
        if (
          !/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/.test(
            value
          )
        ) {
          callback(new Error("号码格式不正确！"));
        } else {
          callback();
        }
      }
    };
    return {
      btnShow: this.$store.state.user.buttonshow,
      btnState: false,
      severSelectdialogVisible: false, //地图
      inputvalue: [],
      myMap: {}, //地图对象
      number: "0",
      tableData: [],
      promitInf: "",
      showPromit: false,
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
          { required: true, message: "请输入 2 到 15 位的服务站名称", trigger: "blur" },
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
          { required: true, message: "请输入 6 到 100 位的详细地址", trigger: "blur" },
          { min: 6, max: 100, message: "长度在 6 到 100 个字符", trigger: "blur" }
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
    this.getList();
    var dict = require("../../../static/dict.json");
    this.stationType = dict.service_station_type;
    setTimeout(function() {}, 30);
    //this.areaOptions = this.$store.state.user.area;
  },
  methods: {
    getList() {
      //获取列表
      this.listLoading = true;
      var obj = {
        name: this.search.name,
        cityCode: this.search.cityCode
      };
      getSite(obj, this.pageNumber, this.pageSize).then(res => {
        console.log(res, "服务站列表");
        this.list = res.data.data.list;
        if (this.list != undefined) {
          for (var i = 0; i < this.list.length; i++) {
            this.list[i].index = i + 1;
          }
        }
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleFilter() {
      //搜索
      this.listLoading = true;
      this.pageNumber = 1;
      this.listQuery.page = 1;
      var obj = {
        name: this.search.name,
        cityCode: this.search.cityCode
      };
      getSite(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        if (this.list != undefined) {
          for (var i = 0; i < this.list.length; i++) {
            this.list[i].index = i + 1;
          }
        }
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleSetMaster() {
      // 设置站长
      if (this.rowInfo.id == "") {
        this.$message.error("您未选择任何操作对象，请选择一行数据");
      } else {
        this.listLoading = true;
        var obj = {
          stationId: this.rowInfo.id
        };
        getMaster(obj).then(res => {
          console.log(res, "服务站下的员工");
          this.master = res.data.data.list;
          this.tempMaster.master = this.rowInfo.masterId;
          this.dialogMasterVisible = true;
          this.listLoading = false;
        });
      }
    },
    handleSetRange() {
      //设置范围
      if (this.rowInfo.id == "") {
        this.$message.error("您未选择任何操作对象，请选择一行数据");
      } else {
        this.listLoading = false;
        if (this.rowInfo.serviceAreaType == "store") {
          this.listLoading = true;
          getStore({}).then(res => {
            this.listLoading = false;
            this.storeTree = res.data.data;
            this.dialogStoreVisible = true;
            this.$nextTick(() => {
              this.$refs.domTree.setCheckedKeys(this.rowInfo.storeList);
            });
          });
        } else {
          this.severSelectdialogVisible = true;
          this.$nextTick(() => {
            this.initMap1();
          });
        }
      }
    },
    handleSizeChange(val) {
      //每页展示数量
      this.pageSize = val;
      var obj = {
        name: this.search.name,
        cityCode: this.search.cityCode
      };
      getSite(obj, this.pageNumber, this.pageSize).then(res => {
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
      //页数
      this.pageNumber = val;
      var obj = {
        name: this.search.name,
        cityCode: this.search.cityCode
      };
      this.listLoading = true;
      getSite(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        if (this.list != undefined) {
          for (var i = 0; i < this.list.length; i++) {
            this.list[i].index = i + 1;
          }
        }
        this.listLoading = false;
      });
    },
    resetForm(formName) {
      //清空表单
      this.rowInfo.id = "";
      this.dialogFormVisible = false;
      this.resetTemp();
      this.$refs[formName].resetFields();
    },
    rowClick(row, event, column) {
      //行被点击时
      console.log(row, "点击行的信息");
      this.rowInfo.serviceAreaType = row.organ.scopeType;
      this.rowInfo.id = row.id;
      if (row.user == undefined) {
        this.rowInfo.masterId = "";
      } else {
        this.rowInfo.masterId = row.user.id;
      }
      if (row.storeList != undefined) {
        this.rowInfo.storeList = row.storeList;
      }
      if (row.servicePoint != undefined) {
        this.rowInfo.servicePoint = row.servicePoint;
      }
    },
    handleCreate() {
      //点击新增
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.temp.isUseable = "yes";
      this.temp.type = "self";
      //this.areaOptions = this.$store.state.user.area;
    },
    handleUpdate(row) {
      //点击编辑
      // this.areaOptions = this.$store.state.user.area;
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
        type: "warning"
      })
        .then(() => {
          var obj = {
            id: row.id
          };
          delSite(obj)
            .then(res => {
              if (res.data.code === 1) {
                this.rowInfo.id = "";
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList();
              } else {
                this.rowInfo.id = "";
                this.$message({
                  type: "warning",
                  message: res.data.data
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "warning",
                message: "请稍后再试"
              });
            });
        })
        .catch(() => {
          this.rowInfo.id = "";
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    create(formName) {
      //新增保存时
      this.btnState = true;
      setTimeout(() => {
        this.btnState = false;
      }, 1000);
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
          addSite(obj).then(res => {
            if (res.data.code === 1) {
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
    createStore() {
      //保存门店
      console.log(this.$refs.domTree.getCheckedKeys(true), "选中的门店");
      var obj = {
        id: this.rowInfo.id,
        storeList: this.$refs.domTree.getCheckedKeys(true)
      };
      setStore(obj).then(res => {
        if (res.data.code == 1) {
          this.dialogStoreVisible = false;
          this.$refs.domTree.setCheckedKeys([]);
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          var obj = {
            name: this.search.name,
            cityCode: this.search.cityCode
          };
          getSite(obj, this.pageNumber, this.pageSize).then(res => {
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
          this.$message({
            type: "warning",
            message: res.data.data
          });
        }
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
          setMaster(obj).then(res => {
            if (res.data.code == "1") {
              this.$message({
                type: "success",
                message: "设置成功"
              });
              this.getList();
              this.dialogMasterVisible = false;
            } else {
              this.$message({
                type: "error",
                message: res.data.data
              });
              this.dialogMasterVisible = false;
            }
          });
        } else {
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
          addSite(obj).then(res => {
            if (res.data.code === 1) {
              this.resetTemp();
              this.$refs[formName].resetFields();
              this.rowInfo.id = "";
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.getList();
              this.dialogFormVisible = false;
            } else {
              this.rowInfo.id = "";
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
    },
    showdialog() {
      this.severSelectdialogVisible = true;
      this.$nextTick(() => {
        this.initMap1();
      });
    },
    initMap1() {
      var that = this;
      var id = this.$refs.gdMap;
      var inputname = this.$refs.pickerInput;
      var map = new AMap.Map(id, {
        center: [116.459771, 39.922132],
        zoom: 15
      });

      map.plugin(["AMap.Scale"], function() {
        var scale = new AMap.Scale();
        map.addControl(scale);
      });
      map.plugin(["AMap.ToolBar"], function() {
        //加载工具条
        var tool = new AMap.ToolBar();
        map.addControl(tool);
      });
      var styleOptions = {
        strokeColor: "blue", //边线颜色。
        fillColor: "blue", //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 1, //边线的宽度，以像素为单位。
        strokeOpacity: 0.1, //边线透明度，取值范围0 - 1。
        fillOpacity: 0.3, //填充的透明度，取值范围0 - 1。
        strokeStyle: "solid" //边线的样式，solid或dashed。
      };
      that.myMap = map;
      if (this.rowInfo.servicePoint != "") {
        var retPoitArr = this.rowInfo.servicePoint.split(" ");
        var polygonArr = new Array(); //多边形覆盖物节点坐标数组
        for (var a = 0; a < retPoitArr.length; a++) {
          polygonArr.push(retPoitArr[a].split(","));
        }
        map.panTo(polygonArr[0]); //改变中心点
        var polygon = new AMap.Polygon({
          path: polygonArr //设置多边形边界路径
        });
        polygon.setOptions(styleOptions); //设置多边形的样式
        polygon.setMap(map);
        var overlays = this.myMap.getAllOverlays();
        var len = overlays.length; //地图原覆盖物数量
        if (overlays.length != 0) {
          that.testalert(overlays[0]);
        }
      }
      var mouseTool = new AMap.MouseTool(map);
      var polygon = this.$refs.polygon;
      AMap.event.addDomListener(
        polygon,
        "click",
        function() {
          mouseTool.polygon(styleOptions);
        },
        false
      );
      AMap.event.addListener(mouseTool, "draw", function callback(e) {
        var eObject = e.obj; //obj属性就是鼠标事件完成所绘制的覆盖物对象。
        that.testalert(eObject);
      });
      AMapUI.loadUI(["misc/PoiPicker"], function(PoiPicker) {
        var poiPicker = new PoiPicker({
          city: "北京",
          input: inputname
        });
        //初始化poiPicker
        poiPickerReady(poiPicker);
      });
      function poiPickerReady(poiPicker) {
        window.poiPicker = poiPicker;
        var marker = new AMap.Marker();
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -20)
        });
        //选取了某个POI
        poiPicker.on("poiPicked", function(poiResult) {
          var source = poiResult.source,
            poi = poiResult.item,
            info = {
              source: source,
              id: poi.id,
              district: poi.district,
              name: poi.name,
              location: poi.location.toString(),
              address: poi.address
            };
          inputname.value = info.district + info.name;
          that.inputvalue.push(info.location);
          marker.setMap(map);
          infoWindow.setMap(map);
          marker.setPosition(poi.location);
          infoWindow.setPosition(poi.location);
        });
      }
    },
    testalert(obj) {
      //获取多边形轮廓线节点数组。其中lat和lng是经纬度参数
      var path = "";
      var row = {};
      if (obj.CLASS_NAME === "AMap.Polygon") {
        path = obj.getPath();
        row.type = "Polygon";
        row.path = path;
        row.area = parseInt(obj.getArea() / 1000000 * 100) / 100 + "平方公里";
      }
      row.name = "范围";
      row.index = "";
      row.id = obj._amap_id;
      this.tableData.push(row);
      for (var a = 0; a < this.tableData.length; a++) {
        this.tableData[a].index = a + 1;
      }
      this.number = this.tableData.length;
    },
    //删除地图所有的覆盖物
    removeOverlay() {
      var overlays = this.myMap.getAllOverlays();
      this.tableData = [];
      this.myMap.remove(overlays);
      this.number = "0";
    },
    //删除地图覆盖物
    Delete(row) {
      var overlays = this.myMap.getAllOverlays();
      for (var i = 0; i < overlays.length; i++) {
        if (overlays[i]._amap_id == row.id) {
          this.myMap.remove(overlays[i]);
        }
      }
      for (var j = 0; j < this.tableData.length; j++) {
        if (overlays[j]._amap_id == row.id) {
          this.tableData.del(j);
        }
      }
      if (this.number > 0) {
        this.number = this.number - 1;
      } else {
        this.number = 0;
      }
    },
    //保存到服务站区域到后台
    saveOverlays() {
      if (this.tableData == "") {
        this.promitInf = "请选择一个服务区域";
        this.showPromit = true;
      } else if (this.tableData.length > 1) {
        this.promitInf = "只能选择一个服务区域";
        this.showPromit = true;
      } else {
        this.promitInf = "";
        this.showPromit = false;
        //setScope
        var obj = {
          id: this.rowInfo.id,
          servicePoint: this.tableData[0].path.join(" ")
        };
        setScope(obj).then(res => {
          if (res.data.code == "1") {
            this.$message({
              type: "success",
              message: "设置成功"
            });
            this.getList();
            this.rowInfo.servicePoint = "";
            this.tableData = [];
            this.inputvalue = [];
            this.$refs.pickerInput.value = "";
            this.severSelectdialogVisible = false;
          } else {
            this.$message({
              type: "error",
              message: res.data.data
            });
            this.severSelectdialogVisible = false;
            this.inputvalue = [];
            this.$refs.pickerInput.value = "";
          }
        });
      }
    },
    closeMap() {
      this.tableData = [];
      this.number = "0";
      this.promitInf = "";
      this.inputvalue = [];
      this.$refs.pickerInput.value = "";
      this.showPromit = false;
      this.severSelectdialogVisible = false;
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
</style>
