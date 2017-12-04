<template>
  <div>
    <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索站点名" v-model="search.name">
      </el-input>

      <el-select clearable style="width: 200px" class="filter-item" v-model="search.addrCityId" placeholder="请选择城市">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <button class="button-large el-icon-search btn_right" @click="handleFilter"> 搜索</button>
    </div>
    <div class="app-container calendar-list-container">
     <div class="bgWhite">
      <button class="button-small btn_right btn_pad" @click="handleCreate">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>
      <button class="button-small-fourth btn_right btn_pad" @click="handleSetRange">设置范围</button>
      <button class="button-small-fourth btn_right btn_pad" @click="showdialog">地图</button>
      <button class="button-small-fourth btn_right btn_pad" @click="handleSetMaster">设置站长</button>

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
            <span v-if="scope.row.type =='1'">加盟</span>
            <span v-if="scope.row.type =='2'">直营</span>
          </template>
          
        </el-table-column>

        <el-table-column label="所属城市" align="center" prop="addrCityName">
         
        </el-table-column>

        <el-table-column label="服务站电话" align="center" prop="phone">
         
        </el-table-column>

        <el-table-column label="员工数量" align="center" prop="employees">
          
        </el-table-column>

        <el-table-column label="阿姨数量" align="center" prop="aunts"> 
          
        </el-table-column>

        <el-table-column class-name="status-col" label="状态" prop="userable">
          <template scope="scope">
            <span v-if="scope.row.useable =='1'">可用</span>
            <span v-if="scope.row.useable =='0'">不可用</span>
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
        :page-sizes="[5,10,15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      </div>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" class="diatable">
        <el-form 
           class="small-space" 
           :model="temp" 
            ref="temp" 
            :rules="rules"
           label-position="left" 
           label-width="160px" 
           >

          <el-form-item label="服务站名称" prop="name">
            <el-input :maxlength="15" :minlength="2" style='width: 400px;' v-model="temp.name" placeholder="请输入2-15位的服务站名称"></el-input>
          </el-form-item>
          <el-form-item label="服务站类型" prop="type">
            <el-select style='width: 400px;' class="filter-item" v-model="temp.type">
              <el-option v-for="item in stationType" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所在区域"  prop="cusTownId">
							<el-select clearable style="width:130px;"  @change="provinceChange" class="filter-item" v-model="temp.cusProvId" placeholder="请选择省">
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
							</el-select>
				</el-form-item>

          <el-form-item label="详细地址" prop="addr">
            <el-input :maxlength="100" :minlength="6" style='width: 400px;' v-model="temp.addr" placeholder="请输入6-100位的详细地址"></el-input>
          </el-form-item>

          <el-form-item label="服务站电话" prop="phone">
            <el-input style='width: 400px;' v-model="temp.phone" placeholder="可选格式：11位手机号、座机（区号-电话号码）"></el-input>
          </el-form-item>

          <el-form-item label="状态" prop="state">
            <el-select class="filter-item" v-model="temp.state">
              <el-option v-for="item in stationState" :key="item.id" :label="item.value" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <button class="button-large" v-if="dialogStatus == 'update'" @click="update('temp')">保 存</button>    
          <button class="button-large" v-else @click="create('temp')">保 存</button>    
          <button class="button-cancel" @click="resetForm('temp')">取 消</button>
        </div>
      </el-dialog>

      <el-dialog title="设置站长" :visible.sync="dialogMasterVisible">
        <el-form :model="tempMaster">
          <el-form-item label="服务站长">
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
        :show-close="false"
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


      <el-dialog title="门店范围" :visible.sync="dialogStoreVisible">
        <el-form 
          :model="tempStore"
          label-position="left"
          label-width="160px" 
         >
          <el-form-item label="设置门店">
            <el-tree
              :data="storeTree"
              v-model="tempStore.tree"
              show-checkbox
              node-key="id"
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
import { getSite, addSite, delSite, getType, getMaster } from "@/api/base";
import { getArea } from "@/api/base";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
//挂载数据

const master = ["张三", "李四"]; //站长
//临时挂载三级联动
const province = ["北京", "上海"];
const city = ["海淀", "朝阳"];
const county = ["海淀", "朝阳"];

export default {
  name: "table_demo",
  directives: {
    waves
  },
  data() {
    return {
      severSelectdialogVisible: false,
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
        limit: 6,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      pageSize: 10,
      total: 0,
      search: {
        name: "",
        addrCityId: ""
      },
      rowInfo: {
        id: "",
        masterId: "",
        rangeType:""
      },
      temp: {
        name: "",
        type: "",
        area: "",
        cusProvId: "",
        cusCityId: "",
        county: "",
        cusTownId: "",
        phone: "",
        state: ""
      },
      tempStore: {
        tree: []
      },
      tempMaster: {
        master: ""
      },
      storeTree: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      importanceOptions: [],
      stationType: [],
      stationState: [{ id: "1", value: "启用" }, { id: "2", value: "停用" }],
      dialogFormVisible: false, //表格
      dialogMasterVisible: false, //店长
      dialogStoreVisible: false, //门店
      dialogMapVisible: false, //地图
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      tableKey: 0,
      provinceOptions: [],
      cityOptions: [],
      countyOptions: [],
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
        cusTownId: [
          { required: true, message: "服务城市地址不能为空", trigger: "change" }
        ],
        addr: [
          { required: true, message: "请输入 6 到 100 位的详细地址", trigger: "blur" },
          { min: 6, max: 100, message: "长度在 6 到 100 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入11位由数字组成的手机号、或者座机号", trigger: "blur" }
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
    var id = "";
    getArea(id).then(res => {
      //console.log(res);
      this.provinceOptions = res.data.data;
    });
    getType().then(res => {
      console.log(res);
      //this.stationType =
    });
  },
  methods: {
    getList() {
      this.listLoading = true;
      var obj = {
        name: "",
        addrCityId: "1"
      };
      getSite(obj).then(res => {
        console.log(res);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleFilter() {
      console.log("搜索");
      this.listQuery.page = 1;
      var obj = {
        name: this.search.name,
        addrCityId: "1"
      };
      getSite(obj).then(res => {
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
        var obj = {
          stationId: this.rowInfo.id
        };
        getMaster(obj).then(res => {
          console.log(res);
          this.master = res.data.data.list;
          this.tempMaster.master = this.rowInfo.masterId
        });
        this.dialogMasterVisible = true;
      }
    },
    handleSetRange() {
      console.log("设置范围");

      if (this.rowInfo.rangeType == "1") {
        this.dialogStoreVisible = true;
      } else {
        this.dialogMapVisible = true;
      }
    },
    handleSizeChange(val) {
      var obj = {
        roleName: this.search.name,
        mobile: this.search.phone
      };
      console.log("size-change");
      this.pageSize = val;
      // var obj = {};
      getSite(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      console.log("current-change");
      this.pageNumber = val;
      var obj = {
        roleName: this.search.name,
        mobile: this.search.phone
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
      this.rowInfo.id = row.id;
      this.rowInfo.masterId = row.user.id;
      console.log(row);
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      console.log("编辑");
      this.temp = Object.assign({}, row);
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
                  message: "该信息不可删除或者没有权限"
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "warning",
                message: "与服务器断开连接，请稍后再试"
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
    provinceChange(value) {
      this.temp.city = "";
      getArea(value)
        .then(res => {
          this.cityOptions = res.data.data;
        })
        .catch(res => {});
    },
    //
    cityChange(value) {
      this.temp.county = "";
      getArea(value)
        .then(res => {
          this.countyOptions = res.data.data;
        })
        .catch(res => {});
    },
    create(formName) {
      var obj = {
        name: "",
        type: "",
        area: "",
        cusProvId: "",
        cusCityId: "",
        county: "",
        cusTownId: "",
        phone: "",
        state: ""
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          addSite(obj).then(res => {
            console.log(res);
            if (res.data.code === 1) {
              this.resetTemp();
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.getList();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                type: "error",
                message: "您输入的数据有误"
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
      this.dialogStoreVisible = false;
    },
    createMaster() {
      //设置店长

      this.dialogMasterVisible = false;
    },
    update() {
      this.temp.timestamp = +this.temp.timestamp;
      for (const v of this.list) {
        if (v.id === this.temp.id) {
          const index = this.list.indexOf(v);
          this.list.splice(index, 1, this.temp);
          break;
        }
      }
      this.dialogFormVisible = false;
      this.$notify({
        title: "成功",
        message: "编辑成功",
        type: "success",
        duration: 2000
      });
    },
    resetTemp() {
      this.temp = {
        name: "",
        type: "",
        area: "",
        cusProvId: "",
        cusCityId: "",
        county: "",
        cusTownId: "",
        phone: "",
        state: ""
      };
    },
    resetStore() {
      //取消门店
      
      this.dialogStoreVisible = false;
    },
    resetMaster() {
      //取消店长
      this.tempMaster.master = ""
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
  background-color: #eef1f6;
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
