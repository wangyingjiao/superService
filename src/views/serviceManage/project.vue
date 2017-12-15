<template>
<div>
  <div class="filter-container bgWhite">
    <el-tabs v-model="tabs" @tab-click="handleClick">
      <!-- <el-tab-pane v-for="(item,key,index) in whole" :key="index" :label="item" :name="index"></el-tab-pane> -->
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="保洁" name="clean"></el-tab-pane>
      <el-tab-pane label="家修" name="repair"></el-tab-pane>
    </el-tabs>
      <el-select clearable style="width: 200px" class="filter-item" filterable  v-model="search.sortId" placeholder="所属分类"  @change="(val)=>open(val,1)">
        <el-option v-for="(item,index) in sortList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
<!-- 
        <el-form-item label="所属分类：" class="seize" prop="calss">
          <el-select class="filter-item" filterable  v-model="basicForm.calss" style="width:400px" @change="open">
            <el-option v-for="item in sortList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->


      <el-select clearable style="width: 200px" class="filter-item" v-model="search.cityId" placeholder="定向城市" @change="cjw">
        <el-option v-for="(item,index) in serverCityArr" :key="index" :label="item.cityName" :value="item.cityCode">
        </el-option>
      </el-select>

      <el-input style="width: 200px;" class="filter-item" placeholder="请输入搜索的项目名称" v-model="search.name">
      </el-input>
      <button class="button-large btn_right el-icon-search ceshi" @click="getList"> 搜索</button>
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
    border
    highlight-current-row 
    element-loading-text="正在加载" 
    style="width: 100%" >
      <el-table-column align="center" type="index" label="排序号" width="100">
      </el-table-column>

      <el-table-column align="center" label="图片" prop="picture">
        <template scope="scope">
          <span><img :src='scope.row.picture'/></span>
        </template>
      </el-table-column>

      <el-table-column  label="项目名称" align="center" prop="name">
      </el-table-column>

      <el-table-column  label="商品名称         价格单位" align="center" min-width="150" style="padding:0">
        <template scope="scope">
          <div 
            class="branch"  
            v-for="(item,index) in scope.row.commoditys" 
            :key="index">
              {{item.name}}&nbsp;&nbsp;&nbsp;{{item.price}}/{{item.unit}}
          </div>
        </template>
      </el-table-column>

      <el-table-column  label="所属分类" align="center" prop="sortName">
      </el-table-column>

      <el-table-column label="城市" align="center" prop="cityName">
        <template scope="scope">
          <span class="branch" v-for="(item,index) in scope.row.citys" :key="index">{{item.cityName+","}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="状态" align="center" >
        <template scope="scope">
          <span v-show="scope.row.sale == 'no'">下架</span>
          <span v-show="scope.row.sale == 'yes'">上架</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="166px">
        <template scope="scope">
            <el-button class="el-icon-upload ceshi3" @click="handleUplode(scope.row)"></el-button>
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
      :title="textMap[dialogStatus]" 
      :visible.sync="dialogFormVisible" 
      :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
      class="diatable">
      <div class="tabBox">
          <div class="tabLeft fl" ref="refTab">
          <!-- <span class="tabBtn tabBtnclick" @click="refbtn1" ref="refbtn1">保洁</span>
          <span class="tabBtn" @click="refbtn2" ref="refbtn2">家修</span> -->
          <el-radio-group v-model="basicForm.majorSort" @change="houseClick"> 
            <el-radio-button label="1"  @click="refbtn1" style="display:none"></el-radio-button>
            <el-radio-button style="width:100%;" size='large' label="clean"  @click="refbtn1">保洁</el-radio-button>
            <el-radio-button style="width:100%" label="repair" @click="refbtn2">家修</el-radio-button>
            <el-radio-button label="2" @click="refbtn2" style="display:none"></el-radio-button>
          </el-radio-group>
        </div>
         <div class="tabRight fl">
			 <h3 class="tit">基本信息</h3><hr/><br/>
              <el-form 
                class="small-space basic" 
                :model="basicForm" 
                label-position="left" 
                label-width="90px" 
                 ref="basic" 
                :rules="basicRles" >
                <el-form-item label="项目名称：" prop="name">
                  <el-input
                  style="width:400px"
                  v-model="basicForm.name"
                  placeholder="请输入2-10位的服务站名称"></el-input>
                </el-form-item>

                <el-form-item label="所属分类：" class="seize" prop="sortId">
                  <el-select class="filter-item" filterable  v-model="basicForm.sortId" style="width:400px" @change="(val)=>open(val,2)">
                    <el-option v-for="item in sortList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="定向城市：" class="seize"> 
                   <div class="cityClass">
                        <div :class="{'techTime-green':basicForm.cityCodes.indexOf(item.cityCode)!=-1}" class="selfCheckBox tech-selfbox tech-center" v-for="(item,index) in cityArr" :key="index" @click="clickClick(item)">
                          {{item.cityName}}
                        </div>
                    </div>     
                    <ul>
                    </ul>
                </el-form-item>

                <el-form-item label="服务图片：" prop="picture">
                  <div class="upload-demo upload_box">
                      <!-- <span class="upload-back"></span> -->
                      <el-upload
                          action="https://jsonplaceholder.typicode.com/posts/"
                          list-type="picture-card"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          >
                          <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                  </div>
                  <!-- <el-upload
                    class="upload-demo upload_box"
                    action="http://gemini-wlcb.oss-cn-beijing.aliyuncs.com"
                    :data="sign"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList2"
                    list-type="picture">
                  </el-upload> -->
                     <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                    <div class="el-upload__tip">请选择上传的图片，且不超过4张</div>
                </el-form-item>

                <el-form-item label="服务描述：" prop="description">
                  <el-input
                  style="width:400px"
                  v-model="basicForm.description"
                  type="textarea"
                  placeholder="服务内容；服务流程；服务保障"></el-input>
                </el-form-item>
            
                <el-form-item label="是否上架：" class="seize">
                    <el-switch
                      @change="isNo"
                      v-model="basicForm.sale"
                      on-text="是"
                      off-text="否"
                      on-value="yes"
                      off-value="no">
                    </el-switch>
                </el-form-item>

                <el-form-item label="排序号：" class="seize">
                    <el-input
                      v-model="basicForm.sortNum"
                      style="width:400px"
                      placeholder="请输入排序号（值越小越靠前）"></el-input>
                </el-form-item>
              </el-form>
              <h3 class="tit"> 商品信息</h3><hr/>
              <el-table
                v-if="basicForm.commoditys.length>0"
                border 
                :data="basicForm.commoditys"
                class="goods_info">
                <el-table-column align="center" label="商品名称" prop="name">

                </el-table-column>
                <el-table-column align="center" label="商品单位" prop="unit">
                  
                </el-table-column>
                <el-table-column align="center" label="计量方式" prop="type">
                 
                </el-table-column>
                <el-table-column align="center" label="价格" prop="price">
                  
                </el-table-column>
                <el-table-column align="center" label="折算时长" prop="convertHours">
                  
                </el-table-column>
                <el-table-column align="center" label="派人数量" prop="persons">
                  <el-table-column align="center" label="临界值">
                    <template scope="scope">
                      <div class="content-rowspan">
                        <div v-for="(item,index) in scope.row.persons" :key="index">
                          {{item.critical}}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="人数">
                    <template scope="scope">
                      <div class="content-rowspan">
                        <div v-for="(item,index) in scope.row.persons" :key="index">
                          {{item.quantity}}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="起购数量" prop="minPurchase">
                   
                </el-table-column>
                <el-table-column align="center" label="操作" width="150">
                 <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="tableHandleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="add_Btn" @click="addComm = !addComm">
                <span class="fl btn_Span1">+</span>
                <span class="fl btn_Span2">添加商品</span>
              </div>
              <el-form 
                v-if="addComm"
                :model="goods_info"
                ref="goods_info"
                label-position="left"
                label-width="80px" 
                style='width: 450px; padding:20px 0 0 20px'
                :rules = "goods"
                 >
                <el-form-item label="活动名称:" prop="name">
                  <el-input
                    placeholder="请输入活动名称（2-10位）"
                    v-model="goods_info.name"></el-input>
                </el-form-item>

                <el-form-item label="商品单位:" prop="unit">
                  <el-input 
                    placeholder="请输入活动名称（2-10位）"
                    v-model="goods_info.unit"></el-input>
                </el-form-item>

                <el-form-item label="计量方式:" prop="type">
                  <el-select class="filter-item" v-model="goods_info.type" placeholder="可用" style="width:350px">
                     <!-- <el-option v-for="item in measure" :key="item.value" :label="item.label" :value="item.value">
                     </el-option> -->
                     <el-option v-for="(item,key,index) in measure" :key="key" :label="item" :value="key"></el-option>
                  </el-select>
                </el-form-item>
                
                <el-form-item label="价格:" prop="price">
                  <el-input v-model="goods_info.price">
                     <template slot="append">元/{{goods_info.unit}}</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="折算时长:" prop="convertHours">
                  <el-input v-model="goods_info.convertHours">
                    <!-- <template slot="append">小时/{{goods_info.convertHours}}</template> -->
                    <template slot="append">小时/{{goods_info.unit}}</template>
                  </el-input>
                </el-form-item>
             
                

                <el-form-item label="派人数量:" class="send">
                   <table class="table-pro">
                     <tr>
                       <th @click="addTable">+</th>
                       <th>临界值</th>
                       <th>人数</th>
                     </tr>
                     <tr v-for="(item,index) in goods_info.persons" :key="index">
                        <td @click="tableDelete(index)">-</td>
                        <td>
                          <input class="table-input" type="text" v-model="item.critical">
                        </td>
                        <td>
                          <input class="table-input" type="text" v-model="item.quantity">
                        </td>
                     </tr>
                   </table>
                   <div class="el-form-item__error" v-if="personsTime">请输入折算时长</div>
                </el-form-item>

                <el-form-item label="起够数量:" prop="minPurchase" class="seize">
                  <el-input
                    placeholder="请输入起购数量（默认为1）"
                    v-model="goods_info.minPurchase"></el-input>
                </el-form-item>

                <el-form-item>
                  <button class="button-large" @click="submitForm('goods_info')">添 加</button>    
                  <button class="button-cancel" @click="resetForm('goods_info')">取 消</button> 
                </el-form-item>
              </el-form>
         </div>
         </div>

      <div slot="footer" class="dialog-footer" style="text-align:center">
        <button class="button-large" @click="subForm('basic')">保 存</button>    
        <button class="button-cancel" @click="dialogFormVisible = false">取 消</button>
      </div>
    </el-dialog>

  </div>
</div>
</div>
</div>
</template>

<script>
import { getProject, addProject ,delProject,getInfoPic} from "@/api/serviceManage";
import { getSign } from "@/api/sign";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
import {Taxonomy,Orienteering,Whether,ServerAdd,ServerDelete,ServerEdit,serverEditPre} from '@/api/project'
// var without = require('lodash.without')
//挂载数据
const option1 = ["北京", "北京"];
var arr = [];
export default {
  name: "table_demo",
  directives: {
    waves
  },
  data() {
    return {
	tabs:'all',
	editId:'',
    total:null,
    houseStr:'',
    whole:{},
    serverCityArr:[],
    wholeTable:{},
    directional:[],
    cityArr:[],
    personsTime:false,
    addComm:false,
		critical:'',
		quantity:'',
		commoditysObj:{
			
		},
		persons:[],
      commoditys:[
        // {
		// 	"idc":1,
        //   "name": "室内玻璃",
        //   "unit": "平米",
        //   "meterage": "2",
        //   "price": 100,
        //   "convertHours": 1,
        //   "minimum": "1",
        //   "persons": [
        //     {
        //       "critical": "≤100",
        //       "quantity": 1
        //     },{
        //       "critical": ">100",
        //       "quantity": 2
        //     }
        //   ]
		// },
      ],
       dialogImageUrl: '',
      dialogVisible: false,
      measure:[
        {
          label:"按居室",
          value:"一居室"
          },
        {
          label:"按面积",
          value:"平米"
          },
        {
          label:"按数量",
          value:"个"
          },
        ],
      sign: getSign(),
      list: [],
      listLoading: true,
      whether: true,
      sortList:[],
      goods: {
        name: [
          { required: true, message: "请输入名称(2-10位)", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "请输入名称(2-10位)", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        type: [{ required: true, message: "请输入名称(2-10位)", trigger: "change" }],
        price:[
          { required: true, message: "请输入价格", trigger: "blur" }
        ],
        convertHours:[
           { required: true, message: "请输入折算时长", trigger: "blur" }
		],
		peoNum:[
			{ required: true, message: "请输入折算时长", trigger: "blur" }
		]
      },
      basicForm:{
        name:'',
        picture:'123123132',   //服务图片
        sortId:'',
        sale:'',
        sortNum:'',
        majorSort: "all",
        commoditys:[],
        cityCodes:[]
      },
      basicRles: {
        name: [{ required: true, message: "请输入2-10位的项目名称", trigger: "blur" }],
        // picture: [{ required: true, message: "请上传至少一张图片" }],
        info: [{ required: true, message: "请输入2-10位的项目名称", trigger: "blur" }]
      },

      goods_info: {
        name: "",
        unit: "",
        type: "",
        price: "",
        time: "",
        peoNum: "",
        num: "",
        persons:[]
      },
      listQuery: {
        sort: "+id",
        page:1
      },
      search: {
        sortId: "",
        cityId: "",
        name: ""
      },
      pageSize: 10,
      fileList2: [
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      temp: {
        option1: "",
        val: true
      },
      importanceOptions: [1, 2, 3],
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      tableKey: 0,
      city: ["1","2","3"],
      option1: [],
     
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
    //所属分类
    // console.log(without,"_without_without")
    Taxonomy().then(data=>{
      this.sortList = data.data.data.list
    }).catch(error=>{
      console.log(error,"error-----project")
    })
    //是否 计量方式 全部 保洁 家修
    Whether().then(({data})=>{
      console.log(data,"-------------data--------------")
       this.measure = data.meterage
       this.whole = data.ser_sort
    }).catch(error=>{
      console.log(error,"error-----project")
    })

    this.orient({},0)  // 所属分类
    this.getList(1,10);   //搜索 ，分页
  },
  methods: {
    cjw(val){
      console.log(val,'------------------')
    },
    //所属分类搜索
    // queryClass(val){
    //   console.log(val,'----queryClass----')
    //    Orienteering({"sortId":val}).then(data=>{
    //     this.serverCityArr = data.data.data
    //   }).catch(error=>{
    //     console.log(error,"error-----project")
    //   })
    // },
    //表格编辑
    handleEdit(index,val){
      console.log(this.goods_info,"this.goods_info.name")
	  console.log(val,"this.commoditys.name")
	  this.addComm = true
      this.goods_info = val
      this.basicForm.commoditys.splice(index,1)
    },
    //表格删除
    tableHandleDelete(val){
    
    },
    houseClick(val){
      this.houseStr = val
       console.log(val,"val----")
    },
    isNo(bl){
      console.log(bl,"adawd")
    },
    //定向城市
    orient(obj,id){
      Orienteering(obj).then(data=>{
        if(id == 1){
          this.serverCityArr = data.data.data
        }else if(id == 2){
          this.cityArr = data.data.data
        }else{
          this.serverCityArr = data.data.data
           this.cityArr = data.data.data
        }
      }).catch(error=>{
        console.log(error,"error-----project")
      })
    },
    //数组去重
    remove(arr,val){
      for(var i = 0; i<arr.length; i++){
        if(arr[i] == val){
          arr.splice(i,1)
          break;
        }
      }
      return arr
    },
    clickClick(item){
      var arr = this.basicForm.cityCodes;
      if(arr.indexOf(item.cityCode) == -1){
        arr.push(item.cityCode)
      }else{
        this.remove(arr,item.cityCode)
      }
      console.log(arr,"arr--------")
      item.haveItem = !item.haveItem
    },
    open(val,id){
      console.log(val,"val----")
      console.log(id,"id-----")
      this.orient({"sortId":val},id)
      // console.log(id,'------------')
    },
    tableDelete(id){
      this.goods_info.persons.splice(id,1)
    },
    addTable(){
      // arr.push({critical:'',quantity:''})
      this.goods_info.persons.push({critical:'',quantity:''})
      this.personsTime = false;
    },
    getList(page,size) {
      this.listLoading = true;
      var obj = {}
      if(this.basicForm.majorSort){
        obj.majorSort = this.tabs
      }
      if(this.search.sortId){
        obj.sortId = this.search.sortId
      }
      if(this.search.cityId){
        obj.cityCode =this.search.cityId
      }
      if(this.search.name){
        obj.name = this.search.name
      }

      getProject(obj,page,size)
        .then(res => {
          console.log(res.data,"res.data-------");
          this.total = res.data.data.count
          this.list = res.data.data.list;
          this.listLoading = false;
          //this.total = res.data.data.count;
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    refbtn1() {
      alert("dawdawd")
      // console.log(this.$refs);
      // this.$refs.refbtn1.className = "tabBtn tabBtnclick";
      // this.$refs.refbtn2.className = "tabBtn";
      // this.activeName = "1";
    },
    refbtn2() {
      // console.log(this.$refs.refbtn2);
      // this.$refs.refbtn2.className = "tabBtn tabBtnclick";
      // this.$refs.refbtn1.className = "tabBtn";
      // this.activeName = "2";
    },
    // 搜索
    handleFilter() {
      var obj = {}
      obj.majorSort = this.basicForm.majorSort
      obj.sortId = this.search.sortId
      obj.cityCode =this.search.cityId
      obj.name = this.search.name
      console.log(obj,"搜索--------")
    },
    handleSizeChange(val) {
      // alert(val)
      this.pageSize = val;
      // this.getList();
      var obj = {
        majorSort: this.basicForm.majorSort
      };
      getProject(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      var obj = {
        majorSort: this.basicForm.majorSort
      };
      this.listLoading = true;
      getProject(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        this.listLoading = false;
        this.total = res.data.data.count;
      });
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.basicForm.majorSort = "clean";
      this.dialogFormVisible = true;
    },
    //编辑方法
    handleUpdate(row) {
      // console.log(row,"------row`````");
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.basicForm.majorSort = "clean";
	  this.dialogFormVisible = true;
	  this.editId = row.id
      ServerEdit({"id":this.editId}).then(data=>{
        console.log(data,"data-----编辑")
        this.basicForm = data.data.data
        console.log(this.cityArr,"cityArr")
      }).catch(error=>{
        console.log(error)
      })
    },
    handleUplode(row) {
      console.log("上传");
    },
    handleDelete(row) {
      console.log(row,"-----row---")
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
          ServerDelete(obj)
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
                  message: "删除失败"
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
    create() {
      var obj = {
        citys: [
          {
            cityId: "1",
            cityName: "北京"
          },
          {
            cityId: "2",
            cityName: "山东"
          }
        ],
        commoditys: [
          {
            name: "日常保洁",
            unit: "小时",
            meterage: "按居室", //计量方式
            price: "19",
            convertHours: "10", //折算时长
            minPurchase: 1, //起购数量
            persons: [
              //派人
              {
                critical: ">10",
                quantity: 1
              },
              {
                critical: ">20",
                quantity: 2
              }
            ]
          }
        ],
        majorSort: "1",
        sortId: "00ea9c6db7f242c49eb40b43b38ad7b7",
        sortName: "日常保洁", //所属分类
        name: "保洁家修1", //项目名称（验重）
        picture:
          "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=989127825,4177828898&fm=58&s=E152CC32C521590358D4D5DE020050B0&bpow=121&bpoh=75",
        description: "服务描述测试",
        sale: "1", //是否上架
        sortNum: 1 //排序号
      };
      addProject(obj).then(res => {
        console.log(res);
      });
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
    handleClick(tab, event) {
      console.log(tab,event,"-------tab")
      var size = this.pageSize
      this.getList(1,size);
      this.listQuery.page = 1;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    resetTemp() {
      this.temp = {};
    },
    subForm(formName){
      var that = this
      this.$refs[formName].validate(valid => {
         console.log(this.basicForm,"basicForm------")
        if (valid) {
          // var obj = {}
          // obj.majorSort = that.basicForm.majorSort;    //所属分类    
          // obj.sortId = that.basicForm.sortId;  //所属分类编号
          // obj.commoditys = that.basicForm.commoditys;   //商品信息
          // obj.name = that.basicForm.name;   //项目名称
          // obj.picture = that.dialogVisible;    //服务图片缩略图   有问题
          // obj.description = that.basicForm.description;   //服务描述
          // obj.sale =   that.basicForm.sale   //是否上架    
          // obj.sortNum = that.basicForm.sortNum     //排序号
          // obj.cityCodes = that.basicForm.cityCodes;     //定向城市
          // console.log(obj,"-----------------------------------")
          //==update 是编辑   create是添加
          if(this.dialogStatus == "update"){
			that.basicForm.id = this.editId
			serverEditPre(that.basicForm).then(data=>{
				if(data.data.code){
						this.$message({
							message: data.data.data,
							type: 'success'
						});
						this.dialogFormVisible = false
						 this.getList(1,10);
					}else{
						this.$message({
							message: data.data.data,
							type: 'warning'
						});
					}
			}).catch(error=>{
				console.log(error,"error---project---857")
			})
          }else{
				ServerAdd(that.basicForm).then(data=>{
				console.log(data,"添加成功")
					if(data.data.code){
						this.$message({
							message: data.data.data,
							type: 'success'
						});
						this.dialogFormVisible = false
						 this.getList(1,10);
					}else{
						this.$message({
							message: data.data.data,
							type: 'warning'
						});
					}
				}).catch(error=>{
				console.log(error,"error--project--770")
				})
			}
        }else{
          alert('false')
          return false;
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.goods_info.persons.length>0){
            this.personsTime = false
          }else{
            this.personsTime = true;
            return false
          }
            console.log("保存表格测试");

            console.log(this.goods_info.persons,"this.persons----")
            var obj = {};
            var goods = this.goods_info;
            obj.name = goods.name;
            obj.unit = goods.unit;
            obj.type = goods.type;
            obj.price = goods.price;
            obj.convertHours = goods.convertHours;
            obj.minPurchase = goods.minPurchase;
            obj.persons = goods.persons;
            this.basicForm.commoditys.push(obj)
            goods.persons = [];
            // arr = []
            this.goods_info.minPurchase = ''
            this.resetForm('goods_info')
            console.log(obj,'obj-----')
        } else {
          if(this.persons.length>0){
            this.personsTime = false
          }else{
            this.personsTime = true;
          }
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.goods_info.minPurchase = '';
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
.goods_info {
  font-size: 12px;
}
.el-table th > .cell {
  text-align: -webkit-center;
}
.el-table .cell,
.el-table th > div {
  padding-left: 10px;
  padding-right: 10px;
}
.upload_box {
  /* text-align: center; */
  max-width: 400px;
  box-sizing: border-box;
  padding: 10px;
  border: 1px #ccc dashed;
}
.upload_box .el-upload .el-button {
  background-color: #4c70e8;
  border-color: #4c70e8;
  border-radius: 0px;
}
.font_small {
  color: #cccccc;
  font-size: 12px;
  line-height: 20px;
  width: 400px;
}
.content-rowspan div {
  line-height: 30px;
  border-bottom: 1px solid #cccccc;
}
.content-rowspan div:last-child {
  border-bottom: 0;
}
.add_Btn {
  width: 100px;
  height: 30px;
  margin: 20px 0 10px 0;
  color: #ffffff;
  line-height: 30px;
  background-color: #4c70e8;
  cursor: pointer;
}
.btn_Span1 {
  width: 30px;
  height: 30px;
  background-color: #6d8dfc;
  text-align: center;
}
.btn_Span2 {
  width: 70px;
  height: 30px;
  text-align: center;
}
.branch {
  width: 100%;
  height: 45px;
  line-height: 45px;
}
.branch:nth-of-type(even) {
  background-color: #f5f5f5;
}
.el-table .cell {
  padding: 0;
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
  padding: 10px;
  /* margin-right: 10px; */
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
.el-upload .el-button span {
  color: #ffffff;
}
.el-upload-list--picture .el-upload-list__item {
  width: 24%;
}
.el-upload .el-upload-list li .el-upload-list__item-name {
  display: none;
}
.tit {
  font-weight: bold;
  padding: 10px 0 5px 0;
}
.el-upload--picture-card{
  width: 80px;
  height: 80px;
  line-height: 80px;
}
.upload-back{
  display: inline-block;
  background: url('../../../static/icon/sctp.png') no-repeat;
  background-size:100%; 
  background-position:33.33333% 33.33333%;
  width: 50px;
  height: 50px;
}
.upload-back::before{
  content:'点击上传';
  font-size: 12px;
  line-height: 110px;
  }
.table-pro,.table-pro tr th, .table-pro tr td { border:1px solid #dececb; }
.table-pro { width: 350px; line-height: 25px; text-align: center; border-collapse: collapse; padding:2px;}  
.table-pro tr td:nth-child(1),.table-pro tr th:nth-child(1){
  background: #ccc;
  padding: 0 10px;
}
.table-input{
	border: none;
	outline:none;
	text-align: center;
}
.basic{
	padding: 0 20px;
}
.send>label::before{
  content: "*";
  margin-right: 4px;
  color: red;
  }
.seize>label::before{
  content: "";
  margin-right: 8px;
  color: red;
}
.tech-center {
  margin:0px 20px 10px 0;
  display: flex;
  justify-content: center;
}
.selfCheckBoxsday {
  width: 30px;
  height: 24px;
  line-height: 24px;
  /* border: 1px solid #bfcbd9; */
  display: inline-block;
  /* text-align: center; */
  position: relative;
  /* margin-left: 20px; */
  font-size: 12px;
  cursor: pointer;
}
.cityClass{
  display:flex;
  flex-wrap:wrap;
  width:400px; 
  overflow:hidden;
}
.cityClass>div:nth-child(1),.cityClass>div:nth-child(5n){

}
.techTime-green{
     background-size:15px 15px;
    border: solid 1px green;
    background:url('../../../static/icon/Selected.png') no-repeat;
    background-size:20px 20px;
    background-position: bottom right;
}

hr{
  border-top:1px solid #ccc;
}




</style>