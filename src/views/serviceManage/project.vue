<template>
<div>
  <div class="filter-container bgWhite">
    <el-tabs v-model="tabs" @tab-click="handleClick">
      <!-- <el-tab-pane v-for="(item,key,index) in whole" :key="index" :label="item" :name="index"></el-tab-pane> -->
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="保洁" name="clean"></el-tab-pane>
      <el-tab-pane label="家修" name="repair"></el-tab-pane>
    </el-tabs>
      <el-select clearable style="width: 200px" class="filter-item"  filterable  v-model="search.sortId" placeholder="所属分类"  @change="(val)=>open(val,1)">
        <el-option v-for="(item,index) in sortList" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>

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
    <button class="button-small btn_right btn_pad" style="width:80px" @click="handleCreate('basic')">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>

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
      <el-table-column align="center" label="排序号" width="100">
         <template scope="scope">
          <input type="text" v-model="scope.row.sortNum" class="sortInput" @blur="indexBlur(scope.row)">
        </template>
      </el-table-column>

      <el-table-column align="center" label="图片" prop="pictures">
        <template scope="scope">
          <span><img :src="'https://openservice.guoanshequ.com/'+scope.row.pictures[0]" class="imgList"/></span>
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
          <span class="branchSpan" ref="branchee" v-for="(item,index) in scope.row.citys" :key="index">{{item.cityName+","}}</span>
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
    <!-- 添加，编辑弹框 -->
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
                
                      <el-upload
                          action="http://openservice.oss-cn-beijing.aliyuncs.com"
                          
                         list-type="picture"
                         
                          :on-preview="handlePreview"
                          :on-remove="handleRemovePic"
                          :before-upload="handPic"
                          :file-list="picList"
                          :http-request="picUpload"            
                          >
                          
                          <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                  </div>
      
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
                <el-form-item label="商品名称:" prop="name">
                  <el-input
                    placeholder="请输入商品名称（2-10位）"
                    v-model="goods_info.name"></el-input>
                </el-form-item>

                <el-form-item label="商品单位:" prop="unit">
                  <el-input 
                    placeholder="请输入单位名称（1-5位）"
                    v-model="goods_info.unit"></el-input>
                </el-form-item>

                <el-form-item label="计量方式:" prop="type">
                  <el-select class="filter-item" v-model="goods_info.type" placeholder="可用" style="width:350px">
                     <!-- <el-option v-for="item in measure" :key="item.value" :label="item.label" :value="item.value">
                     </el-option> -->
                     <el-option v-for="(item,key) in measure" :key="key" :label="item" :value="key"></el-option>
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
             
                

                <el-form-item label="派人数量:" class="send" prop="persons">
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
                   <!-- <div class="el-form-item__error" v-if="personsTime">请输入折算时长</div> -->
                </el-form-item>

                <el-form-item label="起够数量:" class="seize">
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
        <button class="button-cancel" @click="cancel('basic')">取 消</button>
      </div>
    </el-dialog>

    <!-- 图文详情 -->
      <div class="image-text">
          <el-dialog :visible.sync="ImageText" :close-on-click-modal="false">
            <div class="image-text-header">
                <p>添加图文详情</p>
                <!-- <span class="el-icon-plus" @click="addImage"> -->
                <p></span><span class="el-icon-close" @click="ImageText = false"></span></p>
            </div>
            <div class="image-text-body">
                <div class="image-border" v-for="(item,index) in ImageTextArr" :key="index">
                   <el-upload
                          action="http://openservice.oss-cn-beijing.aliyuncs.com"
                          class="imgText"
                          list-type="picture"
                          ref="upload"                    
                          :on-remove="handleRemove"
                          :file-list="fileList"
                          :limit="3"
                          :before-upload="handleBefore"
                          :http-request="upload"   
                          >
                          <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align:center">
        <button class="button-large" @click="subImgText('a')">保 存</button>    
        <button class="button-cancel" @click="resImgText('a')">取 消</button>
      </div>
        </el-dialog>
      </div>

  </div>
</div>
</div>
</template>

<script>
import {
  getProject,
  addProject,
  delProject,
  getInfoPic
} from "@/api/serviceManage";
import Cookies from "js-cookie";
import { getSign } from "@/api/sign";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
import {
  Taxonomy,
  Orienteering,
  Whether,
  ServerAdd,
  ServerDelete,
  ServerEdit,
  serverEditPre,
  sortList
} from "@/api/project";
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
    var UNIT = (rule, value, callback) => {
      var reg = /^\d+$/;
      if (value) {
        if (value.length >= 1 && value.length <= 5) {
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("商品单位必须为数字值"));
          }
        } else {
          callback(new Error("长度在 1 到 5 个字符"));
        }
      } else {
        callback(new Error("请输入商品单位"));
      }
    };
    var PRICE = (rule, value, callback) => {
      var reg = /^\d+$/;
      if (value) {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("价格必须为数字值"));
        }
      } else {
        callback(new Error("请输入价格"));
      }
    };
    var CONVERTHOURS = (rule, value, callback) => {
      var reg = /^\d+$/;
      if (value) {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("折算时长必须为数字值"));
        }
      } else {
        callback(new Error("请输入折算时长"));
      }
    };
    var PERSONS = (rule, value, callback) => {
      var reg = /^\d+$/;
      console.log(rule, "rule-------");
      console.log(value, "value---------111");
      if (value.length > 0) {
        for (var i = 0; i < value.length; i++) {
          if (reg.test(value[i].critical)) {
            if (reg.test(value[i].quantity)) {
              callback();
            } else {
              callback(new Error("人数必须为数字值"));
            }
          } else {
            callback(new Error("临界值必须为数字值"));
          }
        }
      } else {
        callback(new Error("请输入派人数量"));
      }
    };
    return {
      ossData: new FormData(),
      ImageTextArr: [{ imageUrl: "" }],
      ImageText: false,
      tabs: "all",
      editId: "",
      total: null,
      houseStr: "",
      whole: {},
      serverCityArr: [],
      wholeTable: {},
      directional: [],
      cityArr: [],
      personsTime: false,
      addComm: false,
      critical: "",
      quantity: "",
      commoditysObj: {},
      persons: [],
      commoditys: [],
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      measure: [
        {
          label: "按居室",
          value: "一居室"
        },
        {
          label: "按面积",
          value: "平米"
        },
        {
          label: "按数量",
          value: "个"
        }
      ],
      list: [],
      listLoading: true,
      whether: true,
      sortList: [],
      goods: {
        name: [
          { required: true, message: "请输入商品名称(2-10位)", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        unit: [{ required: true, validator: UNIT, trigger: "blur" }],
        type: [{ required: true, message: "请选择计量方式", trigger: "change" }],
        price: [{ required: true, validator: PRICE, trigger: "blur" }],
        convertHours: [
          { required: true, validator: CONVERTHOURS, trigger: "blur" }
        ],
        peoNum: [{ required: true, message: "请输入折算时长", trigger: "blur" }],
        persons: [{ require: true, validator: PERSONS, trigger: "change" }]
      },
      basicForm: {
        name: "",
        pictures: "123123132", //服务图片
        sortId: "",
        sale: "yes",
        sortNum: "",
        majorSort: "all",
        commoditys: [],
        cityCodes: [],
        description: ""
      },
      basicRles: {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 2, max: 10, message: "请输入2-10位的项目名称", trigger: "blur" }
        ],
        // picture: [{ required: true, message: "请上传至少一张图片" }],
        info: [{ required: true, message: "请输入2-10位的项目名称", trigger: "blur" }],
        description: [{ required: true, message: "请输入服务描述", trigger: "blur" }]
      },

      goods_info: {
        name: "",
        unit: "",
        type: "",
        price: "",
        time: "",
        peoNum: "",
        num: "",
        persons: [],
        minPurchase: ""
      },
      listQuery: {
        sort: "+id",
        page: 1
      },
      search: {
        sortId: "",
        cityId: "",
        name: ""
      },
      pageSize: 10,
      fileList: [
        // {
        //   url:
        //     "http://openservice.oss-cn-beijing.aliyuncs.com//openservice/2017/11/22/qwe.jpg?x-oss-process=image/resize,h_1200"
        // }
      ],
      picFile: [],
      imgText: [],
      picList: [],
      temp: {
        option1: "",
        val: true
      },
      importanceOptions: [1, 2, 3],
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增"
      },
      tableKey: 0,
      city: ["1", "2", "3"],
      option1: []
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
    Taxonomy()
      .then(data => {
        this.sortList = data.data.data.list;
      })
      .catch(error => {
        console.log(error, "error-----project");
      });
    //是否 计量方式 全部 保洁 家修
    Whether()
      .then(({ data }) => {
        console.log(data, "-------------data--------------");
        this.measure = data.meterage;
        this.whole = data.ser_sort;
      })
      .catch(error => {
        console.log(error, "error-----project");
      });

    this.orient({}, 0); // 所属分类
    this.getList(1, 10); //搜索 ，分页
    console.log(this.sign, "sign---------");
  },
  computed: {
    sign: function() {
      return getSign();
    }
  },
  methods: {
    handPic(file) {
      //服务图片
      console.log(file, "上传前");
      console.log(this.picFile);
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var src = this.sign.dir + "/" + y + "/" + m + "/" + d + "/" + file.name;
      if (this.picFile.indexOf(src) > -1) {
        this.$message({
          type: "warning",
          message: "此图片已经上传"
        });
        return false;
      }
      if (this.picFile.length >= 4) {
        this.$message({
          type: "warning",
          message: "最多上传4张图片"
        });
        return false;
      }
    },
    handleRemove(file, fileList) {//删除图文
      console.log(file, "删除一张图片");
      console.log(fileList,'文件')
      console.log(this.imgText,'imgtext')
      console.log(this.fileList,'filelist')
      var str = "";
      var index = file.url.lastIndexOf("/");
      str = file.url.substring(index + 1, file.url.length);
      
      let newarr = []
      for(var i = 0;i<this.imgText.length;i++){
        var index = this.imgText[i].lastIndexOf("/");
        var newstr = ''
        newstr = this.imgText[i].substring(index + 1, this.imgText[i].length);
        newarr.push(newstr)
      }
        console.log(str);
        console.log(newarr,'截取')
      var delIndex = newarr.indexOf(str)
      console.log(delIndex,'删除图片的下标')
      this.imgText.del(delIndex);
      console.log(this.imgText);
    },
    handleRemovePic(file,fileList) {
      //删除服务图片
      // console.log(fileList,'文件');
      // console.log(file, "删除一张图片");
      // console.log(this.picFile,'imgtext')
      // console.log(this.picList,'filelist')

      var str = "";
      var index = file.url.lastIndexOf("/");
      str = file.url.substring(index + 1, file.url.length);
      var src = ''
      if (file.name != undefined) {
         src = file.name;
      } else {
         src = str;
      }
      console.log(src,'src');
      let newarr = []
      for(var i = 0;i<this.picFile.length;i++){
        var index = this.picFile[i].lastIndexOf("/");
        var newstr = ''
        newstr = this.picFile[i].substring(index + 1, this.picFile[i].length);
        newarr.push(newstr)
      }
        // console.log(newarr,'截取')
      var delIndex = newarr.indexOf(src)
      console.log(newarr,src,"newarr---------------------------")
      // console.log(delIndex,'删除图片的下标')
      this.picFile.del(delIndex);
      // console.log(this.picFile);
    },
    handleBefore(file) {
      // 去重
      console.log(this.imgText, "imgtext");
      console.log(file);
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var src = this.sign.dir + "/" + y + "/" + m + "/" + d + "/" + file.name;
      if (this.imgText.indexOf(src) > -1) {
        this.$message({
          type: "warning",
          message: "此图片已经上传"
        });
        return false;
      }
    },
    subImgText(a) {
      console.log(this.imgText);
      var obj = {
        id: this.editId,
        pictureDetails: this.imgText
      };
      console.log(obj,"obj-------")
      sortList(obj).then(res => {
        console.log(res);
        if (res.data.code == 1) {
          this.ImageText = false;
          this.$message({
            type: "success",
            message: "图片上传成功"
          });
        }
      });
      console.log(obj);
    }, // 保存图文
    resImgText(a) {
      console.log(a);
      console.log(this.$refs.upload);
      this.fileList = [];
      this.ImageText = false;
    }, // 关闭图文
    upload(file) {
      // 图文上传
      let pro = new Promise((resolve, rej) => {
        console.log(JSON.parse(Cookies.get("sign")), "测试1111");
        var res = JSON.parse(Cookies.get("sign"));
        var timestamp = Date.parse(new Date()) / 1000;
        if (res.expire - 3 > timestamp) {
          console.log("签名没过期");
          resolve(res);
        } else {
          this.$http.get("/api/oss/getSign").then(res => {
            console.log(res, "签名过期");
            Cookies.set("sign", JSON.stringify(res.data));
            resolve(res.data);
          });
        }
      });
      var that = this;
      pro.then(success => {
        var data = success;
        var ossData = new FormData();
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        ossData.append("name", file.file.name);
        ossData.append(
          "key",
          data.dir + "/" + y + "/" + m + "/" + d + "/" + file.file.name
        );
        ossData.append("policy", data.policy);
        ossData.append("OSSAccessKeyId", data.accessid);
        ossData.append("success_action_status", 201);
        ossData.append("signature", data.signature);
        // 添加文件
        ossData.append("file", file.file, file.file.name);
        //this.ossData = ossData;
        console.log(ossData.get("name"));
        console.log(ossData.get("key"));

        that.$http
          .post(data.host, ossData, {
            headers: {
              "Content-Type": "multipart/form-data; boundary={boundary}"
            }
          })
          .then(res => {
            console.log(this.fileList);
            this.imgText.push(ossData.get("key"));
            console.log(this.imgText, "imgtext");
          })
          .catch(error => {
            console.log(error, "错误");
          });
      });
    },
    picUpload(file) {
      // 图片上传
      let pro = new Promise((resolve, rej) => {
        console.log(JSON.parse(Cookies.get("sign")), "测试1111");
        var res = JSON.parse(Cookies.get("sign"));
        var timestamp = Date.parse(new Date()) / 1000;
        if (res.expire - 3 > timestamp) {
          console.log("签名没过期");
          resolve(res);
        } else {
          this.$http.get("/api/oss/getSign").then(res => {
            console.log(res, "签名过期");
            Cookies.set("sign", JSON.stringify(res.data));
            resolve(res.data);
          });
        }
      });
      var that = this;
      pro.then(success => {
        var data = success;
        var ossData = new FormData();
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        ossData.append("name", file.file.name);
        ossData.append(
          "key",
          data.dir + "/" + y + "/" + m + "/" + d + "/" + file.file.name
        );
        ossData.append("policy", data.policy);
        ossData.append("OSSAccessKeyId", data.accessid);
        ossData.append("success_action_status", 201);
        ossData.append("signature", data.signature);
        // 添加文件
        ossData.append("file", file.file, file.file.name);
        //this.ossData = ossData;
        console.log(ossData.get("name"));
        console.log(ossData.get("key"));

        that.$http
          .post(data.host, ossData, {
            headers: {
              "Content-Type": "multipart/form-data; boundary={boundary}"
            }
          })
          .then(res => {
            console.log(this.picList);
            this.picFile.push(ossData.get("key"));
            console.log(this.picFile, "picfile");
          })
          .catch(error => {
            console.log(error, "错误");
          });
      });
    },
    //编号失焦事件
    indexBlur(item) {
      console.log(item, "----------itemmmmmmmmm");
      sortList({ id: item.id, sortNum: item.sortNum })
        .then(data => {
          console.log(data, "更新排序----------");
          this.getList(1, 10);
        })
        .catch(error => {
          console.log(error, "更新排序错误----");
        });
    },
    addImage() {
      this.ImageTextArr.push({ imageUrl: "" });
    },
    handleAvatarSuccess(res, file, index) {
      this.ImageTextArr[index]["imageUrl"] = URL.createObjectURL(file.raw);
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(
        this.ImageTextArr[0]["imageUrl"],
        "this.ImageTextArr[0]['imageUrl']---"
      );
      console.log(this.imageUrl, "this.imageurl------");
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    },
    cjw(val) {
      console.log(val, "------------------");
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
    handleEdit(index, val) {
      console.log(this.goods_info, "this.goods_info.name");
      console.log(val, "this.commoditys.name");
      this.addComm = true;
      this.goods_info = val;
      this.basicForm.commoditys.splice(index, 1);
    },
    //表格删除
    tableHandleDelete(index, item) {
      this.basicForm.commoditys.splice(index, 1);
    },
    houseClick(val) {
      // this.$refs['basic'].resetFields()  //基本信息重置
      // this.basicForm.sortNum = ''  //排序号好清空
      // this.basicForm.cityCodes = '' //定向城市
      // this.resetForm('goods_info')  //添加商品
      // this.goods_info.minPurchase = '' //起够数量
      // this.basicForm.commoditys = [] //商品信息表格
      this.houseStr = val;
      console.log(val, "val----");
    },
    isNo(bl) {
      console.log(bl, "adawd");
    },
    //定向城市
    orient(obj, id) {
      Orienteering(obj)
        .then(data => {
          if (id == 1) {
            this.serverCityArr = data.data.data;
          } else if (id == 2) {
            this.cityArr = data.data.data;
          } else {
            this.serverCityArr = data.data.data;
            this.cityArr = data.data.data;
          }
        })
        .catch(error => {
          console.log(error, "error-----project");
        });
    },
    //数组去重
    remove(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
      return arr;
    },
    clickClick(item) {
      var arr = this.basicForm.cityCodes;
      if (arr.indexOf(item.cityCode) == -1) {
        arr.push(item.cityCode);
      } else {
        this.remove(arr, item.cityCode);
      }
      console.log(arr, "arr--------");
      item.haveItem = !item.haveItem;
    },
    open(val, id) {
      console.log(val, "val----");
      console.log(id, "id-----");
      this.orient({ sortId: val }, id);
      // console.log(id,'------------')
    },
    tableDelete(id) {
      this.goods_info.persons.splice(id, 1);
    },
    addTable() {
      // arr.push({critical:'',quantity:''})
      if (this.goods_info.persons.length >= 4) {
        this.$notify({
          title: "警告",
          message: "派人数量最多4个",
          type: "warning"
        });
      } else {
        this.goods_info.persons.push({ critical: "", quantity: "" });
      }
      this.personsTime = false;
    },
    getList(page, size) {
      this.listLoading = true;
      var obj = {};
      if (this.basicForm.majorSort) {
        obj.majorSort = this.tabs;
      }
      if (this.search.sortId) {
        obj.sortId = this.search.sortId;
      }
      if (this.search.cityId) {
        obj.cityCode = this.search.cityId;
      }
      if (this.search.name) {
        obj.name = this.search.name;
      }

      getProject(obj, page, size)
        .then(res => {
          console.log(res.data, "res.data-------");
          this.total = res.data.data.count;
          this.list = res.data.data.list;
          this.listLoading = false;
          var num = 0;
          for (var i = 0; i < this.list.length; i++) {
            this.list[i].num = ++num;
          }
          //this.total = res.data.data.count;
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    refbtn1() {
      //  this.cancel('basic')
      alert("dawdaw");
    },
    refbtn2() {},
    // 搜索
    handleFilter() {
      var obj = {};
      obj.majorSort = this.basicForm.majorSort;
      obj.sortId = this.search.sortId;
      obj.cityCode = this.search.cityId;
      obj.name = this.search.name;
      console.log(obj, "搜索--------");
    },
    handleSizeChange(val) {
      // alert(val)
      this.pageSize = val;
      // this.getList();
      var obj = Object.assign({},this.search)
      obj.majorSort = this.basicForm.majorSort
      getProject(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        var num = 0;
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].num = ++num;
        }
        this.total = res.data.data.count;
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      var obj = Object.assign({},this.search)
      obj.majorSort = this.tabs
      this.listLoading = true;
      getProject(obj, this.pageNumber, this.pageSize).then(res => {
        this.list = res.data.data.list;
        var num = 0;
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].num = ++num;
        }
        this.listLoading = false;
        this.total = res.data.data.count;
      });
    },
    handleCreate(formName) {
      // this.$refs[formName].resetFields();
      // this.resetTemp();
      // this.picList = []
      this.dialogFormVisible = true;
      // this.cancel()
      this.dialogStatus = "create";
      this.basicForm.majorSort = "clean";
    },
    //编辑方法
    handleUpdate(row) {
      // console.log(row,"------row`````");
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.basicForm.majorSort = "clean";
      this.picList = []
      this.editId = row.id;
      ServerEdit({ id: this.editId })
        .then(data => {
          this.dialogFormVisible = true;
          console.log(data, "data-----编辑");
          // this.basicForm = data.data.data
          var arr = data.data.data;
          for (var i = 0; i < arr.commoditys.length; i++) {
            if (arr.commoditys[i].id) {
              delete arr.commoditys[i].id;
            }
            for (var j = 0; j < arr.commoditys[i].persons.length; j++) {
              if (arr.commoditys[i].persons[j].id) {
                delete arr.commoditys[i].persons[j].id;
              }
            }
          }
          if (data.data.data.pictures != undefined) {
            this.picFile = data.data.data.pictures;
            for (var i = 0; i < data.data.data.pictures.length; i++) {
              console.log(data.data.data.pictures, "tupian");
              var obj = {
                url:
                  "https://openservice.guoanshequ.com/" +
                  data.data.data.pictures[i]
              };
              this.picList.push(obj);
            }
          }
          this.basicForm = arr;
          console.log(this.basicForm, "basicForm------");
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleUplode(row) {
      this.imgText = []
      // console.log("上传");
      this.editId = row.id;
      this.picList = [];
      this.fileList = [];
      this.editId = row.id;
      this.listLoading = true;
      ServerEdit({ id: this.editId })
        .then(res => {
          console.log(res,"res---------------");
          if (res.data.code == 1) {
            var data = res.data.data;
            this.listLoading = false;

            if (data.pictureDetails != undefined) {
              this.imgText = data.pictureDetails;
              for (var i = 0; i < data.pictureDetails.length; i++) {
                var obj = {
                  url:
                    "https://openservice.guoanshequ.com/" +
                    data.pictureDetails[i]
                };
                this.fileList.push(obj);
              }
            }
            this.ImageText = true;
            // console.log(this.fileList, "编辑图文");
            // console.log(this.imgText, "编辑图文");
          }
          // console.log(res, "列表信息");
        })
        .catch(err => {
          console.log(err);
          this.listLoading = false;
          this.$message({
            type: "warning",
            message: "获取数据失败"
          });
        });
    },
    handleDelete(row) {
      console.log(row, "-----row---");
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
        pictures:
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
      console.log(tab, event, "-------tab");
      var size = this.pageSize;
      this.getList(1, size);
      this.listQuery.page = 1;
    },
    
    handleAvatarSuccess1(res, file) {
      console.log(res, "触发事件");
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      console.log(this.dialogImageUrl, "dialogImageUrl-----");
      console.log(res.path, "res----");
      console.log(file.raw, "file----");
    },
    handlePreview(file) {
      console.log(file);
    },
    resetTemp() {
      this.temp = {};
    },
    //取消
    cancel(fromName) {
      // console.log(fromName,"-----")
      // this.dialogFormVisible = false;
      var str = "basic"
      this.$refs[str].resetFields(); //基本信息重置
      this.basicForm.sortNum = ""; //排序号好清空
      this.basicForm.cityCodes = []; //定向城市
      this.resetForm("goods_info"); //添加商品
      this.goods_info.minPurchase = ""; //起够数量
      this.basicForm.commoditys = []; //商品信息表格
      this.picFile = [] //清空图片
      this.picList = [] //清空图片
      this.dialogFormVisible = false;
    },
    //保存
    subForm(formName) {
      var that = this;
      console.log(this.picFile, "选中的图片列表");
      this.$refs[formName].validate(valid => {
        // console.log(this.basicForm, "basicForm------");
        if (valid) {
          var obj = {};
          obj.majorSort = that.basicForm.majorSort; //所属分类
          obj.sortId = that.basicForm.sortId; //所属分类编号
          obj.commoditys = that.basicForm.commoditys; //商品信息
          obj.name = that.basicForm.name; //项目名称
          obj.pictures = this.picFile; //服务图片缩略图   有问题
          obj.description = that.basicForm.description; //服务描述
          obj.sale = that.basicForm.sale; //是否上架
          obj.sortNum = that.basicForm.sortNum; //排序号
          obj.cityCodes = that.basicForm.cityCodes; //定向城市
          console.log(obj, "-----------------------------------");
          //==update 是编辑   create是添加
          if (this.dialogStatus == "update") {
            // that.basicForm.id = this.editId
            console.log(that.basicForm, "that.basicForm----");
            serverEditPre(that.basicForm)
              .then(data => {
                if (data.data.code) {
                  this.$message({
                    message: data.data.data,
                    type: "success"
                  });
                  this.dialogFormVisible = false;
                  this.getList(1, 10);
                  this.picFile = [];
                  this.picList = [];
                } else {
                  this.$message({
                    message: data.data.data,
                    type: "warning"
                  });
                }
              })
              .catch(error => {
                console.log(error, "error---project---857");
              });
          } else {
            console.log(obj);
            ServerAdd(obj)
              .then(data => {
                console.log(data, "添加成功");
                if (data.data.code) {
                  this.$message({
                    message: data.data.data,
                    type: "success"
                  });
                  this.cancel("basic");
                  this.getList(1, 10);
                  this.picFile = [];
                } else {
                  this.$message({
                    message: data.data.data,
                    type: "warning"
                  });
                }
              })
              .catch(error => {
                console.log(error, "error--project--770");
              });
          }
        } else {
          this.$message.error("不能为空");
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.goods_info.persons.length > 0) {
            this.personsTime = false;
          } else {
            this.personsTime = true;
            return false;
          }
          console.log("保存表格测试");

          console.log(this.goods_info.persons, "this.persons----");
          var obj = {};
          var goods = this.goods_info;
          obj.name = goods.name;
          obj.unit = goods.unit;
          obj.type = goods.type;
          obj.price = goods.price;
          obj.convertHours = goods.convertHours;
          obj.minPurchase = goods.minPurchase;
          obj.persons = goods.persons;
          this.basicForm.commoditys.push(obj);
          // arr = []
          goods.persons = [];
          this.goods_info.minPurchase = "";
          this.resetForm("goods_info");
          console.log(obj, "obj-----");
        } else {
          if (this.persons.length > 0) {
            this.personsTime = false;
          } else {
            this.personsTime = true;
          }
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      var str = formName || "goods_info";
      if(this.basicForm.commoditys.length>0 && this.dialogStatus != "update"){
        console.log("--------")
         this.$refs[str].resetFields();
      }
      this.goods_info.persons = [];
      this.goods_info.minPurchase = "";
    }
  }
};
</script>
<style>
.el-dialog--small {
  width: 55%;
}
.el-radio-group {
  width: 100%;
}
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
.branch,
.branchSpan {
  width: 100%;
  height: 45px;
  line-height: 45px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.branch:nth-of-type(even) {
  /* background-color: #f5f5f5; */
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

.el-upload .el-upload-list li .el-upload-list__item-name {
  display: none;
}
.tit {
  font-weight: bold;
  padding: 10px 0 5px 0;
}
.el-upload--picture-card {
  width: 80px;
  height: 80px;
  line-height: 80px;
}
.upload-back {
  display: inline-block;
  background: url("../../../static/icon/sctp.png") no-repeat;
  background-size: 100%;
  background-position: 33.33333% 33.33333%;
  width: 50px;
  height: 50px;
}
.upload-back::before {
  content: "点击上传";
  font-size: 12px;
  line-height: 110px;
}
.table-pro,
.table-pro tr th,
.table-pro tr td {
  border: 1px solid #dececb;
}
.table-pro {
  width: 350px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
  padding: 2px;
}
.table-pro tr td:nth-child(1),
.table-pro tr th:nth-child(1) {
  background: #ccc;
  padding: 0 10px;
}
.table-input {
  border: none;
  outline: none;
  text-align: center;
}
.basic {
  padding: 0 20px;
}
.send > label::before {
  content: "*";
  margin-right: 4px;
  color: red;
}
.seize > label::before {
  content: "";
  margin-right: 8px;
  color: red;
}
.tech-center {
  margin: 0px 20px 10px 0;
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
.cityClass {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  overflow: hidden;
}
.cityClass > div:nth-child(1),
.cityClass > div:nth-child(5n) {
}
.techTime-green {
  background-size: 15px 15px;
  border: solid 1px green;
  background: url("../../../static/icon/Selected.png") no-repeat;
  background-size: 20px 20px;
  background-position: bottom right;
}

hr {
  border-top: 1px solid #ccc;
}
.image-text .el-dialog__body,
.image-text .el-dialog__header {
  padding: 0;
}

.image-text-header {
  overflow: hidden;
  width: 100%;
  height: 44px;
  background: rgb(228, 225, 225);
  font-size: 16px;
  font-weight: bolder;
  line-height: 44px;
  padding: 0 20px;
}
.image-text-header p:nth-child(1) {
  float: left;
}
.image-text p:nth-child(2) {
  float: right;
}
.image-text p:nth-child(2) span {
  margin: 0 5px;
}
.image-text-body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
.image-border {
  width: 100%;
  background: rgb(182, 180, 180);
  box-sizing: border-box;
  padding: 100px 20px;
  margin: 10px 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.sortInput {
  width: 40px;
  text-align: center;
  /* outline:none;  */
  border: none;
  /* background: red */
}
/* .sortInput:nth-child(2n){
  background: #FAFAFA
} */
.el-table__body tr:nth-child(2n) .sortInput {
  background: #fafafa;
}
.imgText .el-upload-list__item {
  height: 100%;
}
.imgText .el-upload-list__item-name {
  display: none;
}
.imgText .el-upload-list__item-thumbnail {
  height: 100%;
  width: 100%;
}
.imgList{
  width: 50px;
  height: 50px;
  margin-top: 5px;
}
.el-icon-plus{
  text-align: center;
  font-size: 20px;
}
.el-upload--picture{
  width: 100%;
}
</style>