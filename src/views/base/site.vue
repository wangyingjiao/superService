<template>
  <div>
    <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索站点名" v-model="search.name">
      </el-input>

      <el-select v-model="search.cityCode" filterable clearable placeholder="请选择城市">     
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
      <button class="button-large el-icon-search btn_right" @click="handleFilter"> 搜索</button>
    </div>
    <div class="app-container calendar-list-container">
     <div class="bgWhite">
      <button class="button-small btn_right btn_pad  ceshi ceshi5" style="width:80px" @click="handleCreate">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>
      <button class="button-small-fourth btn_right btn_pad  ceshi ceshi5" style="width:80px" @click="handleSetRange">设置范围</button>
      <button class="button-small-fourth btn_right btn_pad  ceshi ceshi5" style="width:80px" @click="handleSetMaster">设置站长</button>

      <el-table 
        :key='tableKey' 
        :data="list" 
        v-loading="listLoading" 
        stripe 
        fit 
        highlight-current-row 
        element-loading-text="正在加载"
        @row-click = "rowClick"
        style="width: 100%">

        <el-table-column align="center" label="编号" type="index" width="100">
        </el-table-column>

        <el-table-column label="服务站名称" align="center" prop="name">

        </el-table-column>

        <el-table-column label="服务站类型" align="center" prop="type">
           <template scope="scope">
            <span v-if="scope.row.type =='join'">加盟</span>
            <span v-if="scope.row.type =='self'">直营</span>
          </template>
          
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
            <el-button class="el-icon-edit ceshi3" @click="handleUpdate(scope.row)"></el-button>
            <el-button class="el-icon-delete ceshi3" @click="handleDelete(scope.row)"></el-button>
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
           class="small-space" 
           :model="temp" 
            ref="temp" 
            :rules="rules"
           label-position="left" 
           label-width="160px" 
           >

          <el-form-item label="服务站名称:" prop="name">
            <el-input :maxlength="15" :minlength="2" style='width: 400px;' v-model="temp.name" placeholder="请输入2-15位的服务站名称"></el-input>
          </el-form-item>
          <el-form-item label="服务站类型:" prop="type">
            <el-select style='width: 400px;' class="filter-item" v-model="temp.type">
              <el-option v-for="(val,key,index) in stationType" :key="index" :label="val" :value="key">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所在区域:"  prop="areaCodes">
              <el-cascader
                :options="areaOptions"
                :show-all-levels="true"
                v-model="temp.areaCodes"
                 style='width: 400px;' 
              ></el-cascader>
				</el-form-item>

          <el-form-item label="详细地址:" prop="address">
            <el-input :maxlength="100" :minlength="6" style='width: 400px;' v-model="temp.address" placeholder="请输入6-100位的详细地址"></el-input>
          </el-form-item>

          <el-form-item label="服务站电话:" prop="phone">
            <el-input style='width: 400px;' v-model="temp.phone" placeholder="可选格式：11位手机号、座机（区号-电话号码）"></el-input>
          </el-form-item>

          <el-form-item label="状态:" prop="isUseable">
            <el-select class="filter-item" v-model="temp.isUseable">
              <el-option v-for="item in stationState" :key="item.id" :label="item.value" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <button class="button-large" v-if="dialogStatus == 'update'" @click="update('temp')">保 存</button>    
          <button class="button-large"  v-else @click="create('temp')">保 存</button>    
          <button class="button-cancel" @click="resetForm('temp')">取 消</button>
        </div>
      </el-dialog>

      <el-dialog 
        title="设置站长"
        :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false" 
       :visible.sync="dialogMasterVisible">

        <el-form :model="tempMaster">
          <el-form-item label="服务站长:">
            <el-select class="filter-item" v-model="tempMaster.master">
              <el-option v-for="item in master" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
           <button class="button-large"  @click="createMaster">保 存</button>    
           <button class="button-cancel" @click="resetMaster">取 消</button>
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
            <input type="button" class="mapButton" value="绘制圆" ref="circle"/>
            <button type="button" class="mapButton" @click="saveOverlays">保存</button>
            <button class="mapButton"  @click="closeMap">关闭</button>			
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
                  prop="index"
                  >
                  </el-table-column>
                  <el-table-column
                  prop="radius"
                  align="center"
                  width='160'
                  label="圆形半径"
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
          label-width="160px" 
         >
          <el-form-item label="设置门店:">
            <el-tree
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
  setStore
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
      severSelectdialogVisible: false, //地图
      inputvalue: [],
      myMap: {}, //地图对象
      number: "0",
      tableData: [],
      index: 0,
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
        storeList: []
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
        update: "编辑",
        create: "新增"
      },
      tableKey: 0,
      master: [],
      rules: {
        name: [
          { required: true, message: "请输入 2 到 15 位的机构名称", trigger: "blur" },
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
      }
    };
  },
  computed: {
    areaOptions: function() {
      return this.$store.state.user.area;
    }
    // selectAccount:function(){
    //   return this.accountData[0].YDHL
    // }
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
      this.listLoading = true;
      var obj = {
        name: "",
        cityCode: ""
      };
      this.listQuery.page = 1;
      getSite(obj, this.pageNumber, this.pageSize).then(res => {
        console.log(res);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listLoading = true;
      this.pageNumber = 1;
      this.listQuery.page = 1;
      var obj = {
        name: this.search.name,
        cityCode: this.search.cityCode
      };
      getSite(obj, this.pageNumber, this.pageSize).then(res => {
        console.log(res);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleSetMaster() {
      if (this.rowInfo.id == "") {
        this.$message.error("您未选择任何操作对象，请选择一行数据");
      } else {
        this.listLoading = true;
        var obj = {
          stationId: this.rowInfo.id
        };
        getMaster(obj).then(res => {
          console.log(res);
          this.master = res.data.data.list;
          this.tempMaster.master = this.rowInfo.masterId;
          this.dialogMasterVisible = true;
          this.listLoading = false;
        });
      }
    },
    handleSetRange() {
      console.log("设置范围");
      console.log(this.rowInfo.serviceAreaType);
      if (this.rowInfo.id == "") {
        this.$message.error("您未选择任何操作对象，请选择一行数据");
      } else {
        if (this.rowInfo.serviceAreaType == "store") {
          this.listLoading = true;
          getStore({}).then(res => {
            console.log(res);
            console.log(this.rowInfo.storeList);
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
      this.pageSize = val;
      var obj = {
        name: this.search.name,
        cityCode: this.search.cityCode
      };
      getSite(obj, this.pageNumber, this.pageSize).then(res => {
        console.log(res);
        this.list = res.data.data.list;
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      var obj = {
        name: this.search.name,
        cityCode: this.search.cityCode
      };
      this.listLoading = true;
      getSite(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        this.listLoading = false;
      });
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.resetTemp();
      this.$refs[formName].resetFields();
    },
    rowClick(row, event, column) {
      console.log(row);
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
      console.log(this.rowInfo);
    },
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      //this.areaOptions = this.$store.state.user.area;
    },
    handleUpdate(row) {
      // this.areaOptions = this.$store.state.user.area;
      console.log(row);
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
          delSite(obj)
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
                message: "请稍后再试"
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
    create(formName) {
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
      console.log(obj);
      //return
      this.$refs[formName].validate(valid => {
        if (valid) {
          addSite(obj).then(res => {
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
    createStore() {
      //保存门店
      console.log(this.$refs.domTree.getCheckedKeys(true));
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
            console.log(res);
            this.list = res.data.data.list;
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
    },
    createMaster() {
      // var name = "";
      // for (var i = 0; i < this.master.length; i++) {
      //   if (this.tempMaster.master == this.master[i].id) {
      //     name = this.master[i].name;
      //   }
      // }
      var obj = {
        id: this.rowInfo.id,
        userId: this.tempMaster.master
      };
      console.log(obj);
      setMaster(obj).then(res => {
        console.log(res);
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
    },
    update(formName) {
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
      console.log(obj);
      //return;
      this.$refs[formName].validate(valid => {
        if (valid) {
          addSite(obj).then(res => {
            console.log(res);
            if (res.data.code === 1) {
              this.resetTemp();
              this.$refs[formName].resetFields();
              this.$message({
                type: "success",
                message: "修改成功"
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
    resetTemp() {
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
      this.$refs.domTree.setCheckedKeys([]);
      this.dialogStoreVisible = false;
    },
    resetMaster() {
      //取消店长
      this.tempMaster.master = "";
      this.dialogMasterVisible = false;
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
        center: new AMap.LngLat(116.368904, 39.913423),
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
      that.myMap = map;
      var styleOptions = {
        strokeColor: "blue", //边线颜色。
        fillColor: "blue", //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 1, //边线的宽度，以像素为单位。
        strokeOpacity: 0.1, //边线透明度，取值范围0 - 1。
        fillOpacity: 0.3, //填充的透明度，取值范围0 - 1。
        strokeStyle: "solid" //边线的样式，solid或dashed。
      };
      var mouseTool = new AMap.MouseTool(map);
      var polygon = this.$refs.polygon;
      var circle = this.$refs.circle;
      AMap.event.addDomListener(
        polygon,
        "click",
        function() {
          mouseTool.polygon(styleOptions);
        },
        false
      );
      AMap.event.addDomListener(
        circle,
        "click",
        function() {
          mouseTool.circle(styleOptions);
        },
        false
      );
      AMap.event.addListener(mouseTool, "draw", function callback(e) {
        var eObject = e.obj; //obj属性就是鼠标事件完成所绘制的覆盖物对象。
        that.index++;
        that.testalert(eObject, that.index);
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
          infoWindow.setContent(inputname.value);
          infoWindow.open(map, marker.getPosition());
        });
      }
    },
    testalert(obj, index) {
      //获取多边形轮廓线节点数组。其中lat和lng是经纬度参数
      var path = "";
      //圆半径，单位:米
      var radius = "";
      var row = {};
      //覆盖物对象
      var overlays = this.myMap.getAllOverlays();
      if (obj.CLASS_NAME === "AMap.Polygon") {
        path = obj.getPath();
        row.type = "Polygon";
        row.path = path;
        row.radius = "---";
        row.center = "";
      }
      if (obj.CLASS_NAME === "AMap.Circle") {
        radius = obj.getRadius();
        row.type = "Circle";
        row.radius = (radius * 1000).toFixed(3) + "公里";
        row.path = "";
        row.center = obj.getCenter();
      }
      row.index = "范围" + index;
      row.id = obj._amap_id;
      this.tableData.push(row);
      this.number = overlays.length;
    },
    //删除地图所有的覆盖物
    removeOverlay() {
      var overlays = this.myMap.getAllOverlays();
      this.tableData = [];
      this.myMap.remove(overlays);
      this.number = "0";
      this.index = 0;
    },
    //
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
        //搜索的经纬度
        //this.inputvalue
        //区域对象
        //this.tableData[0]
      }
    },
    closeMap() {
      this.tableData = [];
      this.number = "0";
      this.index = 0;
      this.promitInf = "";
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
  padding: 15px 20px 20px 20px;
}

.btn_pad {
  margin: 0px 0px 15px 20px;
}

.btn_right {
  float: right;
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
  bottom: 10%;
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
</style>
