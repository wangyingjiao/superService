<template>
<div id="project">
  	<div class="filter-container">
<!-- 添加，编辑弹框 -->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :show-close= "false" :close-on-click-modal="false"
		:close-on-press-escape="false" @close="emptyingForm" class="diatable combination">
			<div class="tabBox">
				<div class="tabLeft fl" ref="refTab">
					<el-radio-group v-model="basicForm.majorSort" @change="houseClick"> 
						<el-radio-button label="1" style="display:none"></el-radio-button>
						<el-radio-button :disabled="jointCode"  class="tableCleaning" size='large' label="clean">保洁</el-radio-button>
						<el-radio-button :disabled="jointCode"  style="width:100%;" label="repair">家修</el-radio-button>
						<el-radio-button label="2" style="display:none"></el-radio-button>
					</el-radio-group>
				</div>
				<div class="tabRight fl">
					<h3 class="tit">基本信息</h3><hr/><br/>
					<el-form class="small-space basic" :model="basicForm" label-position="left" label-width="90px" ref="basic" :rules="basicRles" >
						<el-form-item label="所属机构：" class="seize" prop="orgId" v-if="techUserType=='sys'">
							<el-select :disabled="textMap[dialogStatus]=='编辑服务项目'" filterable v-model="basicForm.orgId" style="width:100%" class="form_item">
								<el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						
						<el-form-item label="所属分类：" class="seize" prop="sortId">
							<el-select :disabled="jointCode"  filterable   v-model="basicForm.sortId" style="width:100%" class="form_item" @change="comInformationDelete">
								<el-option v-for="item in sortList" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="项目名称：" prop="name">
							<el-input class="form_item" v-model="basicForm.name" placeholder="请输入2-10位的项目名称"></el-input>
						</el-form-item>

						<el-form-item label="banner图：" prop="picture">
							<div class="upload-demo upload_box form_item">
								<imgService @imgclick = "imgClick" :piclist = "picList" :type="'picture-card'" :min='0.9' :max='1.1'></imgService>
							</div>
							<div class="pro-hint">*为了保证浏览效果，请上传大于750px*750px的正方形图片，且不超过4张</div>
						</el-form-item>

						<el-form-item label="图文详情：">
							<div class="upload-demo upload_box form_item">
								<imgService @imgclick = "imgTextClick" :piclist = "pictureDetails" :type="'picture'" :min='0' :max='8'></imgService>
							</div>
							<div class="pro-hint">*最多4张; 为了保证浏览效果,请上传大于750px*10px且小于750px*6000px的图片</div>
						</el-form-item>

						<el-form-item label="系统标签：" prop="sysTags">
							<div class="custom form_item">
								<span class="tech-order-btn" @click="SystemLabel = true"> &#10010; 请选择</span>
							</div>
							<div class="labelList form_item label-sty" v-if="(labelClickArr!=undefined && labelClickArr.length>0) || (alreadyArr!=undefined && alreadyArr.length>0)">
								<div v-for="(item,index) in labelClickArr.concat(alreadyArr)" :key="index" class="sys-label">
									<el-tooltip placement="left" :disabled="item.length <=8" :content="item">
										<div>
											<span class="sys-text">{{item}}</span>
											<span class="sys-close" @click="AlreadyLabel(item)"></span>
										</div>
									</el-tooltip>
								</div>                       
							</div>
							<div class="pro-hint">* 最多设置3个系统标签</div>
						</el-form-item>

						<el-form-item label="自定义标签：" class="labelDav">
							<div class="custom">
								<span class="tech-order-btn" @click="addLabel = true"> &#10010; 添加</span>
							</div>
							<div class="labelList label-sty" v-show="customArr != undefined && customArr.length>0">
								<div v-for="(item,index) in customArr" :key="index" class="sys-label">
									<el-tooltip placement="left" :disabled="item.length <=8" :content="item">
										<div>
											<span class="sys-text">{{item}}</span>
											<span class="sys-close" @click="deleteLabel(index)"></span>
										</div>
									</el-tooltip>
								</div>
							</div>
							<div class="pro-hint">* 最多设置3个自定义标签</div>
						</el-form-item> 
					<!-- 组合商品信息 -->
						<div style="margin:0 -20px" class="combinationType-info">
							<h3 class="tit">{{handleCreateFlag=='single'?'商品信息':'组合商品信息'}}</h3><hr/>
							<div v-if="handleCreateFlag!='single'">
								<div style="padding:20px 20px">
									<el-form-item label="服务类型：" prop="serItemCommodity.serviceType" class="combination-name">
										<div :class="basicForm.serItemCommodity.serviceType=='single'?'type-border-alive':'type-border'" @click="typeAlive('single')">
											<i :class="basicForm.serItemCommodity.serviceType=='single'?'type-alive':'type-single'"></i>
											<p>单次服务</p>
										</div>
										<div style="margin-left:50px" :class="basicForm.serItemCommodity.serviceType=='combined'?'type-border-alive':'type-border'" @click="typeAlive('combined')">
											<i :class="basicForm.serItemCommodity.serviceType=='combined'?'type-alive':'type-single'"></i>
											<p>多次服务</p>
										</div>
									</el-form-item>
								</div>
								<div style="padding:0 20px;">
									<el-form-item label="商品信息：" prop="serItemCommodity.combinationCommodities" class="combination-name">
										<input style="margin-left:0" type="button" class="button-cancel btn-color-cancel" value="选择商品" @click="choiceCommodity">
									</el-form-item>
								</div>
								<div class="combinationTable" style="padding:0 20px" v-if="basicForm.serItemCommodity.combinationCommodities == undefined ||basicForm.serItemCommodity.combinationCommodities.length>0">
									<el-table :data="basicForm.serItemCommodity.combinationCommodities" border style="width: 100%;">
										<el-table-column prop="itemName" align="center" label="项目名称"> </el-table-column>
										<el-table-column prop="goodsName" align="center" label="商品名称"> </el-table-column>
										<el-table-column prop="convertHours" align="center" :min-width="110" label="折算时长/单位">
											<template scope="scope">
												<span>{{scope.row.convertHours+'小时'}}</span>
											</template>
										</el-table-column>
										<el-table-column prop="goodsPrice" align="center" :min-width="85" label="原价/单位">
										<template scope="scope">
												<span>{{'¥'+scope.row.goodsPrice}}</span>
											</template>
										</el-table-column>
										<el-table-column prop="goodsUnit" align="center" label="单位"></el-table-column>
										<el-table-column prop="name" align="center" label="组合商品售价" :min-width="105">
											<template scope="scope">
												<!-- <span><input type="text" v-model="scope.row.combinationPrice"></span> -->
											<span><i class="iconfont">&#xe61c;</i><el-input v-model="scope.row.combinationPrice"></el-input></span>
											</template>
										</el-table-column>
										<el-table-column prop="name" align="center" label="数量" :min-width="120">
											<template scope="scope">
												<span ><el-input-number class="selfINputNumStyle" v-model="scope.row.combinationNum" :min='1'  :max="999999"></el-input-number></span>
											</template>
										</el-table-column>
										<el-table-column prop="name" align="center" label="操作">
											<template scope="scope">
												<span style="color:#FF7676;cursor:pointer" @click="deleteInformation(scope.row,scope.$index)">删除</span>
											</template>
										</el-table-column>
									</el-table>
								</div>
								<div style="padding:20px">
									<el-form-item label="组合商品名称：" prop="serItemCommodity.name" class="combination-name">
										<el-input style="width:60%" v-model="basicForm.serItemCommodity.name" placeholder="请输入1-24位的组合商品名称"></el-input>
									</el-form-item>
									<el-form-item label="组合商品价格：" prop="serItemCommodity.price" class="combination-name">
										<span>{{'¥ '+informationCalculation}}</span>
									</el-form-item>
									<el-form-item label="计量方式：" prop="serItemCommodity.type" class="combination-name">
										<span>按时长或数量</span>
									</el-form-item>
									<el-form-item label="商品单位：" prop="serItemCommodity.unit" class="combination-name">
										<el-input
										style="width:60%"
										v-model="basicForm.serItemCommodity.unit"
										placeholder="请输入1-6位的组合商品单位"></el-input>
									</el-form-item>
									<div>
										<el-form-item v-if="basicForm.serItemCommodity.serviceType=='single'" label="折算时长：" prop="serItemCommodity.convertHours" class="combination-name">
											<el-input style="width:60%" v-model="basicForm.serItemCommodity.convertHours" placeholder="请输入折算时长">
												<template slot="append">小时 / {{basicForm.serItemCommodity.unit || '单位'}}</template>
											</el-input>
										</el-form-item>
										<el-form-item v-else label="折算时长：" prop="serItemCommodity.convertHours" class="combination-name">
                      <span>{{basicForm.serItemCommodity.combinationCommodities.length>0 ? (basicForm.serItemCommodity.unit?basicForm.serItemCommodity.combinationCommodities[0].convertHours+'小时/'+basicForm.serItemCommodity.unit:basicForm.serItemCommodity.combinationCommodities[0].convertHours+'小时/单位'):0+'小时/单位'}}</span>
										</el-form-item>
										<div v-if="basicForm.serItemCommodity.serviceType=='single'">
											<el-form-item label="起步人数：" prop="serItemCommodity.startPerNum" class="combination-name">
											<el-input
												style="width:60%"
												v-model="basicForm.serItemCommodity.startPerNum"
												placeholder="请输入起步人数(默认为1)"></el-input>
											</el-form-item>
											<el-form-item label="封顶人数：" prop="serItemCommodity.cappingPerNum" class="combination-name">
											<el-input
												style="width:60%"
												v-model="basicForm.serItemCommodity.cappingPerNum"
												placeholder="请输入封顶人数"></el-input>
											</el-form-item>
											<el-form-item label="起够数量：" prop="serItemCommodity.minPurchase" class="combination-name">
											<el-input
												style="width:60%"
												v-model="basicForm.serItemCommodity.minPurchase"
												placeholder="请输入起够数量(默认为1)"></el-input>
											</el-form-item>
										</div>
									</div>
								</div>
							</div>
						</div>
					<!-- 组合商品信息 完成-->
					</el-form>
				</div>
			</div>
				<div slot="footer" class="dialog-footer" style="text-align:center">
					<input v-if="dialogStatus != 'update'" type="button" class="button-large btn-color" :disabled="btnState" @click="subFormCom('basic')" value="保 存">
					<input type="button" class="button-cancel btn-color-cancel" @click="cancel('basic')" value="取 消">
				</div>
		</el-dialog>
<!-- 商品信息 完成 -->
<!--自定义标签 -->
	<el-dialog title="设置自定义标签" :close-on-click-modal="false" :visible.sync="addLabel" class="labelName" @close="closeingLabel">
        <el-form :model="labelObj" :rules="labelRules" ref="labelObj">
			<el-form-item label="标签名称" :label-width="formLabelWidth" prop="labelName">
				<el-input v-model="labelObj.labelName" placeholder="中文、英文、数字(1~10)"></el-input>
			</el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
			<input type="button" class="button-large" @click="CustomLabel('labelObj')" value="确 定">
			<input type="button" class="button-cancel" @click="addLabel = false" value="取 消">
        </div>
	</el-dialog>
<!-- 自定义标签结束-->
<!--系统标签-->
	<el-dialog title="选择标签" :close-on-click-modal="false" :visible.sync="SystemLabel" class="systemLabel" @close="closeingLabel">
        <el-row>
          	<el-col :span="24">
              	<div style="line-height:60px">
                  	<div class="selfTitle1">当前选择标签：</div>
					<div class="labelList label-current" v-show="labelClickArr != undefined && labelClickArr.length>0">
						<div v-for="(item,index) in labelClickArr" :key="index" class="sys-label sys-label-dialog">
							<el-tooltip placement="left" :disabled="item.length <=6" :content="item">
								<div>
									<span class="sys-text">{{item}}</span>
									<span class="sys-close" @click="SelectedLabel(item)"></span>
								</div>
							</el-tooltip>
						</div>
					</div>
              	</div>
          </el-col>
        </el-row>
        <el-row>
          	<el-col :span="24" v-show="alreadyArr.length>0">
            	<div style="line-height:32px">
                  	<div class="selfTitle1">已添加标签：</div>
                  	<div class="labelList label-already" v-show="alreadyArr != undefined && alreadyArr.length>0">
                      	<div v-for="(item,index) in alreadyArr" :key="index" class="sys-label sys-label-dialog">
                           <el-tooltip placement="left" :disabled="item.length <=6" :content="item">
                              <div>
                                  <span class="sys-text">{{item}}</span>
                                  <span class="sys-close" @click="AlreadyLabel(item)"></span>
                              </div>
                           </el-tooltip>
                       </div>
                  </div>
            	</div>
          	</el-col>
        </el-row>
		<div class="sys-label-choice" style="overflow:hidden;margin-top:22px">
			<div class="over-fl label-num">
				<div style="width:87%;float:left">
					<div class="sys-title">
						分类一
					</div>
					<ul class="innerbox">
						<li v-for="item in systemOptions" :key="item.value" @click="systemClick(item)" :class="{'activeSystem_1':item.value==systemClickId}">
							<span class="projectLabel">{{item.label}}</span>
						</li>
					</ul>
				</div>
				<div style="float:left">
					<div class="sys-arrow">
					</div>
				</div>
			</div>
		<!-- 标题2 -->
			<div class="over-fl label-num" v-show="systemOptions2 !== undefined && systemOptions2.length>0">
				<div style="width:87%;float:left">
					<div class="sys-title">
						分类二
					</div>
					<ul class="innerbox">
						<li v-for="item in systemOptions2" :key="item.value" @click="systemClick2(item)" :class="{'activeSystem_2':item.value==systemClick2Id}">
							<span class="projectLabel">{{item.label}}</span>
						</li>
					</ul>
				</div>
				<div style="float:left">
					<div class="sys-arrow">
					</div>
				</div>
			</div>
		<!-- 标题三 -->
			<div class="over-fl label-num" v-show="systemOptions3 !== undefined && systemOptions3.length>0">
				<div style="width:87%;float:left">
					<div class="sys-title">
						分类三
					</div>
					<ul class="innerbox">
						<li v-for="item in systemOptions3" :key="item.value" @click="systemClick3(item)" :class="{'activeSystem_3':item.value==systemClick3Id}">
							<span class="projectLabel">{{item.label}}</span>
						</li>
					</ul>
				</div>
				<div style="float:left">
					<div class="sys-arrow">
					</div>
				</div>
			</div>
		<!-- 标签名 -->
			<div class="over-fl label-num label-name" v-show="systemOptions4 !== undefined && systemOptions4.length>0">
				<div style="width:100%;float:left">
					<div class="sys-title">
						标签名称
					</div>
					<div style="height:296px;overflow-y:auto;" class="innerbox">
						<div class="labelSystem">
							<div class="label-input" v-for="(item,key) in systemOptions4"  style="" :key="key">
								<el-tooltip placement="left" :disabled="item.label.length<4" :content="item.label">
									<input type="button"
											class="cursor" 
											style="width:85px;height:30px;line-height:30px;overflow:hidden;" 
										:value="item.label" @click="labelClick(item)"
											:class="{'techTime-green':labelClickArr.indexOf(item.label)!=-1 || JSON.stringify(alreadyArr).indexOf(JSON.stringify(item.label))!=-1}"
											:disabled="JSON.stringify(alreadyArr).indexOf(JSON.stringify(item.label))!=-1">
								</el-tooltip>
							</div>        
						</div>
					</div>
				</div>
			</div>
		</div>
        <div slot="footer" class="dialog-footer">
          	<input type="button" class="button-cancel" @click="SystemLabel = false" value="关 闭">
        </div>
      </el-dialog>
    <!-- 系统标签结束 -->
<!-- 组合商品信息——选择商品 -->
	<el-dialog title="选择商品" :close-on-click-modal="false" :visible.sync="combinationTypeDialog" class="dockingDialog com-dialog">
		<div>
			<el-input class="commodity-search" v-model="itemNameSearch" placeholder="请输入项目名称"></el-input>
			<el-input class="commodity-search" v-model="goodNameSearch" placeholder="请输入商品名称"></el-input>
			<input type="button" class="button-large btn-color" style="float:right" value="查 询" @click="choiceCommoditySearch">
		</div>
		<div style="padding-top:25px">
			<p>已选择商品：</p>
			<transition name="el-zoom-in-bottom">
				<div class="labelList label-current" v-if="commodityArr != undefined && commodityArr.length>0">
					<div v-for="(item,index) in commodityArr" :key="index" class="sys-label sys-label-dialog">
						<el-tooltip placement="left" :disabled="item.goodsName.length <=5" :content="item.goodsName">
							<div>
								<span class="sys-text">{{item.goodsName}}</span>
								<span class="sys-close" @click="commodityDelete(item)"></span>
							</div>
						</el-tooltip>
					</div>
				</div>
			</transition>
		</div>
		<div>
			<el-table height="360" v-loading.body="loadingCom" :data="commodityDate" border style="width: 100%">
				<el-table-column prop="name" align="center" label="选择">
					<template scope="scope">
						<el-checkbox v-if="basicForm.serItemCommodity.serviceType=='single'" v-model="scope.row.check" @change="selectCommodity(scope.row)"></el-checkbox>
						<el-radio v-else class="radio" v-model="radio" :label="scope.row.goodsId" @change.native="selectCommoditySingle(scope.row)">&nbsp;</el-radio>
					</template>
				</el-table-column>
				<el-table-column prop="itemName" align="center" label="项目名称"> </el-table-column>
				<el-table-column prop="goodsName" align="center" label="商品名称"> </el-table-column>
				<el-table-column prop="convertHours" align="center" :min-width="90" label="折算时长/单位">
					<template scope="scope">
						<span>{{scope.row.convertHours+'小时'}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="goodsPrice" align="center" label="单价/单位">
					<template scope="scope">
						<span>{{'¥'+scope.row.goodsPrice}}</span>
					</template>
					</el-table-column>
				<el-table-column prop="goodsUnit" align="center" label="单位"></el-table-column>
			</el-table>
		</div>
		<div slot="footer" class="dialog-footer" style="text-align:center" >
				<input type="button" class="button-large btn-color" @click="commodityPreservation" value="保 存">
				<input type="button" class="button-cancel btn-color-cancel" @click="ommodityCancel" value="取 消">
		</div>
	</el-dialog>
<!-- 组合商品信息——选择商品 完成 -->
  	</div>
</div>
</template>

<script>
// ----------------

import {
  getProject,
  addProject,
  delProject,
  getInfoPic
} from "@/api/serviceManage";
import { listDataAll } from "@/api/tech"
import Cookies from "js-cookie";
import { getSign } from "@/api/sign";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { userType} from '../../utils/auth'
import { parseTime } from "@/utils";
import orgSearch from '../../components/Hamburger/orgSearch.vue'
import combination from './combination'
import {
  Taxonomy,
  Orienteering,
  ServerAdd,
  ServerDelete,
  ServerEdit,
  serverEditPre,
  alreadyButted,
  serGasqSort,
  deleteGoodsData,
  saveCombinedData,
  listDataBySortId
} from "@/api/serviceManage";
import imgService from "../../components/upload/upload.vue";
import addCommodity from "./addCommodity.vue";
import dict from "../../../static/dict.json"
//挂载数据
var arr = [];
var informationTables = [
  {label:'日常保洁1',name:'一居室',company:'￥120 /一居室',price:'11',num:'1'},
  {label:'深度保洁1',name:'平米保洁',company:'￥20 /平米',price:'12',num:'2'},
  {label:'日常保洁2',name:'一居室',company:'￥120 /一居室',price:'13',num:'3'},
  {label:'深度保洁2',name:'平米保洁1',company:'￥201 /平米',price:'14',num:'4'},
]
var informationTable = [
  {check:false,itemName:'日常保洁1',name:'居室保洁1',unit:'100',price:"间",id:'1',combinationPrice:'0',combinationNum:'1'},
  {check:false,itemName:'日常保洁2',name:'居室保洁2',unit:'200',price:"间",id:'2',combinationPrice:'0',combinationNum:'1'},
  {check:false,itemName:'日常保洁3',name:'居室保洁3',unit:'300',price:"间",id:'3',combinationPrice:"0",combinationNum:'1'},
  {check:false,itemName:'日常保洁4',name:'居室保洁4',unit:'400',price:"间",id:"4",combinationPrice:'0',combinationNum:'1'},
  {check:false,itemName:'日常保洁5',name:'居室保洁5',unit:'500',price:"间",id:'5',combinationPrice:'0',combinationNum:'1'},
  {check:false,itemName:'日常保洁6',name:'居室保洁6',unit:'600',price:"间",id:'6',combinationPrice:'0',combinationNum:'1'}
]
var commodityDate = [
  {check:false,itemName:'日常保洁1',goodsName:'居室保洁1',goodsPrice:'100',goodsUnit:"间",goodsId:'1',convertHours:'1小时'},
  {check:false,itemName:'日常保洁2',goodsName:'居室保洁2',goodsPrice:'200',goodsUnit:"间",goodsId:'2',convertHours:'2小时'},
  {check:false,itemName:'日常保洁3',goodsName:'居室保洁3',goodsPrice:'300',goodsUnit:"间",goodsId:'3',convertHours:'3小时'},
  {check:false,itemName:'日常保洁4',goodsName:'居室保洁4',goodsPrice:'400',goodsUnit:"间",goodsId:'4',convertHours:'4小时'},
  {check:false,itemName:'日常保洁5',goodsName:'居室保洁5',goodsPrice:'500',goodsUnit:"间",goodsId:'5',convertHours:'5小时'},
  {check:false,itemName:'日常保洁6',goodsName:'居室保洁6',goodsPrice:'600',goodsUnit:"间",goodsId:'6',convertHours:'6小时'}
]
export default {
  name: "project",
  directives: {
    waves
  },
  data() {
    //价格
    var PRICE = (rule, value, callback) => {
      var val = value + "";
      var reg = /^\d+(\.\d{1,2})?$/;
      if (val) {
        if (val * 1 <= 99999999) {
          if (reg.test(val)) {
            callback();
          } else {
            callback(new Error("不能为特殊字符，小数保留后两位"));
          }
        } else {
          callback(new Error("不能大于99999999元"));
        }
      } else {
        callback(new Error("请输入价格"));
      }
    };
    //折算时长
    var CONVERTHOURS = (rule, value, callback) => {
      var reg = /^d*(?:.d{0,2})?$/;
      if (value) {
        if (this.goods_info.type == "num") {
          if (value >= 0.01 && value <= 1.5) {
            var con = this.converFilter(value);
            con ? callback() : callback(new Error("请精确到小数后两位"));
          } else {
            callback(new Error("请正确输入(0.01~1.5小时)"));
          }
        }

        if (this.goods_info.type == "area") {
          if (value >= 0.01 && value <= 0.5) {
            var con = this.converFilter(value);
            con ? callback() : callback(new Error("请精确到小数后两位"));
          } else {
            callback(new Error("请正确输入(0.01~0.5小时)"));
          }
        }

        if (this.goods_info.type == "house") {
          if (value >= 2 && value <= 12) {
            var con = this.converFilter(value);
            con ? callback() : callback(new Error("请精确到小数后两位"));
          } else {
            callback(new Error("请正确输入(2~12小时)"));
          }
        }
      } else {
        callback(new Error("请输入折算时长"));
      }
    };
    var PERSONS = (rule, value, callback) => {
      var reg = /^\d+$/;
      if (value.length > 0) {
        for (var i = 0; i < value.length; i++) {
          if (reg.test(value[i].cappingPerNum)) {
            if (reg.test(value[i].startPerNum)) {
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
    //服务图片
    var PICTURE = (rule, value, callback) => {
      if (this.picFile != undefined && this.picFile.length > 0) {
        if (this.picFile[0] == "") {
          callback(new Error("第一张商品banner图还没上传"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请添加banner图"));
      }
    };
    //系统标签
    var SYSTAGS = (rule, value, callback) => {
      var arr = this.labelClickArr.concat(this.alreadyArr);
      if (arr != undefined && arr.length > 0) {
        callback();
      } else {
        callback(new Error("请选择系统标签"));
      }
    };
    //自定义标签
    var LABELNAME = (rule, value, callback) => {
      var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
      if (value) {
        if (value.length >= 1 && value.length <= 10) {
          if (this.customArr.indexOf(value) != -1) {
            callback(new Error("已有该自定义标签名称"));
          } else {
            if (reg.test(value)) {
              callback();
            } else {
              callback(new Error("不能输入特殊字符"));
            }
          }
        } else {
          callback(new Error("自定义标签长度1~10位"));
        }
      } else {
        callback(new Error("请输入自定义标签"));
      }
    };
    //封顶人数
    var CAPPINPERNUM = (rule, value, callback) => {
      var reg = /^\d+$/;
      if (value) {
        if (value * 1 <= 30) {
          if (reg.test(value)) {
            if (value * 1 >= this.basicForm.serItemCommodity.startPerNum * 1) {
              if (value == 0) {
                callback(new Error("封顶人数最小值为1"));
              } else {
                callback();
              }
            } else {
              callback(new Error("起步人数不能大于封顶人数"));
            }
          } else {
            callback(new Error("请输入数字"));
          }
        } else {
          callback(new Error("封顶人数最高30人"));
        }
      } else {
        callback();
      }
    };
    //起步人数
    var STARTPERNUM = (rule, value, callback) => {
      console.log(value,"value----++++++")
      var reg = /^\d+$/;
      if (value) {
        if (value * 1 <= 30) {
          if (reg.test(value)) {
            if (value == 0) {
              callback(new Error("起步人数最小值为1"));
            } else {
              callback();
            }
          } else {
            callback(new Error("请输入数字"));
          }
        } else {
          callback(new Error("起步人数最高30人"));
        }
      } else {
        callback();
      }
    };
    //起购数量
    var MINPURCHASE = (rule, value, callback) => {
      var reg = /^\d+$/;
      if (value) {
        if (value * 1 <= 999999) {
          if (reg.test(value)) {
            if (value == 0) {
              callback(new Error("起购数量最小值为1"));
            } else {
              callback();
            }
          } else {
            callback(new Error("请输入数字"));
          }
        } else {
          callback(new Error("起购数量应在999999以内"));
        }
      } else {
        callback();
      }
    };
    //商品名称
    var NAME = (rule, value, callback) => {
      var editName = this.editName;
      var arr = this.basicForm.commoditys;
      if (value) {
        if (value.length >= 1 && value.length <= 24) {
          if (this.handleEditFlag) {
            if (editName.name == value) {
              callback();
            } else {
              var flag = this.filtersName(value);
              if (flag) {
                callback();
              } else {
                callback(new Error("商品名称重复"));
              }
            }
          } else {
            if (arr != undefined && arr.length > 0) {
              var flag = this.filtersName(value);
              if (flag) {
                callback();
              } else {
                callback(new Error("商品名称重复"));
              }
            } else {
              callback();
            }
          }
        } else {
          callback(new Error("长度在 1 到 24 个字符"));
        }
      } else {
        callback(new Error("请输入商品名称(1-24位)"));
      }
    };
    //组合信息--价格
    var SERPICTURE = (rule,value,callback) =>{
        if(this.informationCalculation>=0){
            callback()
        }else{
            callback(new Error("请选择商品"))
        }
    }
    return {
      goodNameSearch:'',
      itemNameSearch:'',
      commodityArr:[],
      loadingCom:true,
      handleCreateFlag:'',
      radio:'',
      commodityDate:[],
      informationPrice:['11','22','33','44'],
      combinationTypeDialog:false,
      combinationType:'single',
      sordFlag:true,
      orgStatus: "",
      pageNumber: 1,
      addCommodityFlag: false,
      editName: {},
      customArr: [],
      jointCode: false,
      dockingData: [],
      alreadyArr: [],
      labelClickArr: [],
      orgNameList:[],
      listDataBySortIdArr:[],
      systemClickId: null,
      systemClick2Id: null,
      systemClick3Id: null,
      docking: false,
      systemOptions2: [],
      imgNumber: 0,
      systemOptions3: [],
      systemOptions4: [],
      SystemLabel: false,
      labelObj: {
        labelName: ""
      },
      formLabelWidth: "90px",
      addLabel: false,
      btnState: false,
      tabs: "all",
      editId: "",
      total: null,
      houseStr: "",
      whole: {},
      addDetailsImg: 0,
      personsTime: false,
      //   addComm: false,
      critical: "",
      quantity: "",
      persons: [],
      commoditys: [],
      handleEditFlag: false,
      handleEditIndex: null,
      measure: [],
      listTable: [],
      listLoading: true,
      sortList: [],
      searchSortList: [],
      goods_info: {
        name: "",
        unit: "",
        type: "",
        price: "",
        convertHours: "",
        startPerNum: "",
        cappingPerNum: "",
        minPurchase: ""
      },
      goods: {
        name: [{ required: true, validator: NAME, trigger: "blur" }],
        unit: [
          { required: true, message: "请输入商品单位", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择计量方式", trigger: "change" }
        ],
        price: [{ required: true, validator: PRICE, trigger: "blur" }],
        convertHours: [
          { required: true, validator: CONVERTHOURS, trigger: "blur" }
        ],
        startPerNum: [{ validator: STARTPERNUM, trigger: "blur" }],
        cappingPerNum: [{ validator: CAPPINPERNUM, trigger: "blur" }],
        minPurchase: [{ validator: MINPURCHASE, trigger: "blur" }]
      },
      labelRules: {
        labelName: [
          {
            required: true,
            validator: LABELNAME,
            trigger: "blur"
          }
        ]
      },
      basicForm: {
        name: "",
        sortId: "",
        majorSort: "all",
        commoditys: [],
        sysTags: [],
        customTags: [],
        orgId:'',
        serItemCommodity:{
            serviceType:'single',  //服务分类
            combinationCommodities:[], //组合订单----商品信息
            name:'',  //商品名称
            price:'',  //价格
            unit:'',  //单位
            type:'',  //计量方式
            convertHours:'',  //折算时长
            startPerNum:'',  //起步
            cappingPerNum:'',  //封顶
            minPurchase:'' //起购
        }
      },
      basicRles: {
        'serItemCommodity.startPerNum':[
            { validator: STARTPERNUM, trigger: "blur" }
        ],
        'serItemCommodity.minPurchase':[
            { validator: MINPURCHASE, trigger: "blur" }
        ],
        'serItemCommodity.cappingPerNum':[
            { validator: CAPPINPERNUM, trigger: "blur" }
        ],
        'serItemCommodity.convertHours':[
              {
                required: true,
                validator: (rule, value, callback) => {
                    callback()
                },
                trigger: "change"
              }
        ],
        'serItemCommodity.type':[
            {
                required: true,
                validator: (rule, value, callback) => {
                    callback()
                },
                trigger: "change"
            }
        ],
        'serItemCommodity.serviceType':[
            { required: true, message: "请选择服务类型", trigger: "change" },
        ],
        'serItemCommodity.name':[
            { required: true, message: "请输入组合商品名称", trigger: "blur" },
            {
                min: 1,
                max: 24,
                message: "请输入1-24位的组合商品名称",
                trigger: "blur"
            }
        ],
        'serItemCommodity.price':[
            { required: true ,validator: SERPICTURE, trigger: "blur"},
        ],
        'serItemCommodity.unit':[
            { required: true, message: "请输入组合商品单位", trigger: "blur" },
            {
                min: 1,
                max: 6,
                message: "请输入1-6位的组合商品单位",
                trigger: "blur"
            }
        ],
        combinationPrice:[

        ],
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "请输入2-10位的项目名称",
            trigger: "blur"
          }
        ],
        picture: [{ required: true, validator: PICTURE, trigger: "blur" }],
        sortId: [
          { required: true, message: "请选择所属分类", trigger: "blur" }
        ],
        orgId:[{ required: true, message: "请选择所属机构", trigger: "blur" }],
        info: [
          { required: true, message: "请输入2-10位的项目名称", trigger: "blur" }
        ],
        sysTags: [
          {
            required: true,
            validator: (rule, value, callback) => {
              var arr = this.labelClickArr.concat(this.alreadyArr);
              if (arr != undefined && arr.length > 0) {
                callback();
              } else {
                callback(new Error("请选择系统标签"));
              }
            },
            trigger: "change"
          }
        ],
        'serItemCommodity.combinationCommodities':[
           {
            required: true,
            validator:(rule,value,callback)=>{
                if (value != undefined && value.length > 0) {
                    callback();
                } else {
                    callback(new Error("请选择商品"));
                }
            },
            trigger: "change"
           }
        ]
      },
      listQuery: {
        sort: "+id",
        page: 1
      },
      search: {
        orgId:'',
        sortId: "",
        name: "",
        // sortIdandGoodsId: "",
        goodsName: "",
      },
      pageSize: 10,
      fileList: [],
      picFile: [],
      imgText: [],
      picList: [],
      pictureDetails: [],

      temp: {
        val: true
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑服务项目",
        create: "新增服务项目"
      },
      tableKey: 0,
      city: ["1", "2", "3"]
    };
  },
  created() {
    //所属分类
    // this.handleClick({ name: "all" });
    //系统标签
    // serGasqSort()
    //   .then(data => {
    //     this.systemOptions = data.data.data;
    //   })
    //   .catch(error => {});
    //是否 计量方式 全部 保洁 家修
    // var dict = require("../../../static/dict.json");
    this.measure = dict.meterage;
    this.whole = dict.ser_sort;

    // Whether()
    //   .then(({ data }) => {
    //     this.measure = data.meterage;
    //     this.whole = data.ser_sort;
    //   })
    //   .catch(error => {});

    this.sign; //获取签名
  },
  computed: {
    informationCalculation(){
      let num = this.basicForm.serItemCommodity.combinationCommodities,
          i,
          numDate,
          bate = 0,
          list;
      if(this.basicForm.serItemCommodity.combinationCommodities.length > 0){
        let len = this.basicForm.serItemCommodity.combinationCommodities.length
        for( i = len ; i-- ;){
          numDate = num[i]
          list = numDate.combinationNum * numDate.combinationPrice
          bate += list
        }
        return bate
      }else{
        return '0'
      }
    },
    techUserType(){
      return userType()
    },
    sign: function() {
      return getSign();
    },
    btnShow() {
      return JSON.parse(localStorage.getItem("btn"));
    }
  },
  methods: {
    //编辑
    combinationEdit(id){
        this.dialogStatus = "update";
        this.$emit('listloadingson',true)
        ServerEdit({id:id})
            .then(({data:{code,data}})=>{
              this.jointCode = true;
              this.tableProject({ majorSort: data.majorSort }, data.sortId);
              this.basicForm = data
              this.picList = data.pictures;
              this.customArr = data.customTags || [];
              this.alreadyArr = data.sysTags || [];
              this.commodityArr = data.serItemCommodity.combinationCommodities
              if(data.pictureDetails != undefined){
                this.pictureDetails = data.pictureDetails;
              }else{
                this.pictureDetails = ["", "", "", ""];
              }
              this.$emit('listloadingson',false)
              this.dialogFormVisible = true
            })
            .catch(error=>{
              console.log(error,"error----")
            })
    },
    dialogFormVisibleClick(){
        this.dialogFormVisible = true
        this.listDataAllClick()
        this.handleCreate()
        console.log(this.basicForm,"basicForm----+++++")
    },
     //组合商品信息--选择商品--复选框
    selectCommodity(item){
      if(item.check){
        this.commodityArr.push(item)
      }else{
        let i , len = this.commodityArr.length;
        for(i = len ; i-- ;){
          if(this.commodityArr[i].goodsId == item.goodsId){
             this.commodityArr.remove(this.commodityArr[i]);
          }
        }
      }
    },
    //组合商品信息--选择商品--保存
    commodityPreservation(){
      let {commodityArr,basicForm} = this,
          i,len = commodityArr.length,arr = [].concat(commodityArr);
      basicForm.serItemCommodity.combinationCommodities = [].concat(commodityArr)
      // this.$set(basicForm.serItemCommodity,"combinationCommodities",commodityArr)
      this.combinationTypeDialog = false;
    },
    //组合商品信息--选择商品--单选
    selectCommoditySingle(item){
      // this.commodityArr[0] = Object.assign({},item)
      this.$set(this.commodityArr,0,item)
    },
    //组合商品信息--选择商品--删除商品
    commodityDelete(item){
      let { commodityArr,commodityDate } = this,
          len = commodityArr.length,
          lon = commodityDate.length,
          i,j;
      //删除商品的数组
      for( i = len ; i-- ;){
        if(commodityArr[i].goodsId == item.goodsId){
          commodityArr.remove(commodityArr[i])
          break;
        }
      }
      if(this.basicForm.serItemCommodity.serviceType == 'single'){
        //商品列表的checkbox修改
        for( j = lon ; j--;){
          if(commodityDate[j].goodsId == item.goodsId){
            commodityDate[j].check = false
            break;
          }
        }
      }else{
        this.radio = '';
      }
    },
    ommodityCancel(){
      this.combinationTypeDialog = false;
    },
    //搜索
    choiceCommoditySearch(){
      // console.log(this.itemName,this.goodName,"this.itemName,this.goodName")
      this.choiceCommodity(this.itemNameSearch,this.goodNameSearch)
    },
    choiceCommodity(itemname,goodname){
        let obj = {}
        obj.sortId = this.basicForm.sortId;
        if(this.techUserType == 'sys'){
          obj.orgId = this.basicForm.orgId;
        }else{
           obj.orgId = '';
        }
        obj.itemName = this.itemNameSearch || ''
        obj.goodsName = this.goodNameSearch || ''
        this.commodityArr = [].concat(this.basicForm.serItemCommodity.combinationCommodities)
        this.combinationTypeDialog = true;
        this.loadingCom = true;
        listDataBySortId(obj).then(({data:{code,data}})=>{
            if(code == 1){
              if(data != undefined){
                let i , j , lon = this.commodityArr.length;
                //判读：复选框选中
                console.log(lon,"this.commodityArr------______")
                  for( i = data.length ; i -- ;){
                    data[i].combinationPrice = '0'
                    data[i].combinationNum = '1'
                    if(!lon) this.radio = ''
                    for( j = lon ; j-- ;){
                      if(this.commodityArr[j].goodsId == data[i].goodsId){
                        if( this.basicForm.serItemCommodity.serviceType == 'single'){
                          data[i].check = true
                        }else{
                          this.radio = data[i].goodsId
                        }
                      }
                    }
                  }
                this.commodityDate = data
              }else{
                this.commodityDate = []
                this.commodityArr = []
              }
            }else{
              this.commodityDate = []
              this.commodityArr = []
            }
            this.loadingCom = false;
        }).catch(error=>{
            this.loadingCom = false;
            console.log(error,'-------')
        })
    },
    deleteInformation(item,index){
      console.log(index,"item-------________")
      this.basicForm.serItemCommodity.combinationCommodities.del(index)
      // this.commodityDelete(item)
    },
    //服务分类
    typeAlive(num){
      this.basicForm.serItemCommodity.serviceType = num
      this.comInformationDelete(true)
    },
    comInformationDelete(bl){
      if(this.dialogStatus != "update" || bl==true){
        this.commodityArr = []
        this.basicForm.serItemCommodity.combinationCommodities = []
        this.radio = ''
      }
    },
    orgSearch(item){
      this.search.orgId = item
    },
    //删除商品
    // deletGood(item) {
    //   this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     closeOnClickModal: false,
    //     customClass: "deleteCom",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       deleteGoodsData({ id: item.id, itemId: item.itemId })
    //         .then(data => {
    //           if (data.data.code == 1) {
    //             this.$message({
    //               type: "success",
    //               message: data.data.data
    //             });
    //             this.handleCurrentChange(this.listQuery.page);
    //           } else {
    //           }
    //         })
    //         .catch(error => {});
    //     })
    //     .catch(() => {
    //       // return
    //     });
    // },
    //已对接E店
    // dockingE(item) {
    //   if (item.jointEshopFlag == "yes") {
    //     alreadyButted({ id: item.id })
    //       .then(data => {
    //         if (data.data.code == 1) {
    //           var arr = data.data.data;
    //           if ("commodityEshops" in arr) {
    //             for (var i = 0; i < arr.commodityEshops.length; i++) {
    //               if ("jointGoodsCode" in arr.commodityEshops[i]) {
    //                 continue;
    //               } else {
    //                 arr.commodityEshops[i].jointGoodsCode = "";
    //               }
    //             }
    //           }
    //           // this.dockingData[0] = arr

    //           this.$set(this.dockingData, 0, arr);
    //           this.docking = true;
    //         } else {
    //           this.$message({
    //             type: "warning",
    //             message: data.data.data
    //           });
    //         }
    //       })
    //       .catch(error => {
    //         return false;
    //       });
    //   } else {
    //     this.dockingData = [];
    //     this.docking = true;
    //   }
    // },
    //对接详情
    // buttDetails() {
    //   this.$router.push({ path: "/service/buttDetails/" });
    // },
    // returnImg(item) {
    //   var arr = [];
    //   for (var i = 0; i < item.length; i++) {
    //     arr.push(item[i].url);
    //   }
    //   return arr;
    // },
    imgClick(item) {
      this.picFile = item;
      //当点击保存时，会提示请上传图片，当上传图片后，提示不会消失
      //上传图片成功触发表单验证
      // this.$refs['basic'].validate(valid => {})
    },
    imgTextClick(item) {
      this.imgText = item;
    },
    //对接商品
    // handleSendData(row) {
    //   var obj = { id: row.id };
    //   sendData(obj)
    //     .then(data => {
    //       if (data.data.code == 1) {
    //         this.$message({
    //           type: "success",
    //           message: data.data.data
    //         });
    //       }
    //       if (data.data.code == 3) {
    //         this.$message({
    //           type: "warning",
    //           message: data.data.data
    //         });
    //       }
    //       this.getList(this.pageNumber, this.pageSize);
    //     })
    //     .catch(error => {
    //       return false;
    //     });
    // },
    //添加商品
    // addCommodity() {
    //   this.addCommodityFlag = true;
    //   this.resetForm("ser");
    //   this.handleEditFlag = false;
    // },
    converFilter(val) {
      var reg = /^\d+(\.\d{1,2})?$/;
      var con = reg.test(val) ? true : false;
      return con;
    },
    filtersName(value) {
      var flag = true;
      var arr = this.basicForm.commoditys;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name == value) {
          flag = false;
          break;
        } else {
          flag = true;
        }
      }
      if (flag) {
        return flag;
      } else {
        return flag;
      }
    },
    //保洁家修切换
    tableProject(obj, id) {
      Taxonomy(obj)
        .then(({data:{data}}) => {
			if(data[data.length-1].id<100){
				data.pop()   //组合商品没有通用订单的选项
			}
			this.sortList = data
			if (id) {
				this.basicForm.sortId = id;
			}
        })
        .catch(error => {
          return false;
        });
    },
    //系统标签已添加标签删除
    AlreadyLabel(item) {
      if (this.labelClickArr.indexOf(item) != -1) {
        this.SelectedLabel(item);
      } else {
        this.remove(this.alreadyArr, item);
      }
    },
    //系统标签当前选择标签删除
    SelectedLabel(item) {
      this.remove(this.labelClickArr, item);
    },
    //四级标签点击
    labelClick(item) {
      if (this.labelClickArr.indexOf(item.label) == -1) {
        if (this.labelClickArr.length + this.alreadyArr.length > 2) {
          this.$message({
            message: "最多设置3个系统标签",
            type: "error"
          });
          return false;
        }
        this.labelClickArr.push(item.label);
        // this.$refs['basic'].validate(valid => {})
      } else {
        this.remove(this.labelClickArr, item.label);
      }
    },
    //系统列表一级列表事件
    systemClick(item) {
      this.systemClickId = item.value;
      this.systemOptions2 = item.children;
      this.systemOptions3 = [];
      this.systemOptions4 = [];
    },
    //系统列表二级列表事件
    systemClick2(item) {
      this.systemClick2Id = item.value;
      this.systemOptions3 = item.children;
      this.systemOptions4 = [];
    },
    systemClick3(item) {
      this.systemClick3Id = item.value;
      this.systemOptions4 = item.children;
    },
    //自定义弹框关闭的回调
    closeingLabel() {
      this.labelObj.labelName = "";
    },
    //自定义标签删除
    deleteLabel(index) {
      this.customArr.splice(index, 1);
    },
    //自定义标签
    CustomLabel(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.customArr.length > 2) {
            this.$message({
              message: "最多设置3个自定义标签",
              type: "error"
            });
            return false;
          } else {
            this.customArr.push(this.labelObj.labelName);
            this.labelObj.labelName = "";
          }
          this.addLabel = false;
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
    //价格没有小数点补填00
    returnFloat(value) {
      var value = Math.round(parseFloat(value) * 100) / 100;
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + "0";
        }
        return value;
      }
    },
    //商品添加/编辑
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       var obj = Object.assign({}, this.goods_info);
    //       obj.startPerNum = this.goods_info.startPerNum || 0;
    //       obj.minPurchase = this.goods_info.minPurchase;
    //       obj.cappingPerNum = this.goods_info.cappingPerNum || 0;
    //       obj.convertHours = this.goods_info.convertHours || 0;
    //       obj.price = this.returnFloat(this.goods_info.price);
    //       if (this.handleEditFlag) {
    //         this.$set(this.basicForm.commoditys, this.handleEditIndex, obj);
    //         this.resetForm("ser");
    //         this.handleEditFlag = false;
    //         this.addCommodityFlag = false;
    //       } else {
    //         if ("id" in obj) {
    //           delete obj.id;
    //         }
    //         if ("jointGoodsCode" in obj) {
    //           delete obj.jointGoodsCode;
    //         }
    //         this.basicForm.commoditys.push(obj);
    //         this.resetForm("ser");
    //         this.addCommodityFlag = false;
    //       }
    //     } else {
    //       var errArr = this.$refs[formName]._data.fields;
    //       var errMes = [];
    //       for (var i = 0; i < errArr.length; i++) {
    //         if (errArr[i].validateMessage != "") {
    //           errMes.push(errArr[i].validateMessage);
    //         }
    //       }
    //       this.$message({
    //         type: "error",
    //         message: errMes[0]
    //       });
    //       return false;
    //     }
    //   });
    // },
    //表格编辑
    // handleEdit(index, val) {
    //   this.addCommodityFlag = true;
    //   this.handleEditFlag = true;
    //   this.handleEditIndex = index;
    //   this.editName = Object.assign({}, val);
    //   this.goods_info = Object.assign({}, val);
    //   this.goods_info.startPerNum = this.goods_info.startPerNum
    //     ? this.goods_info.startPerNum
    //     : "";
    //   this.goods_info.cappingPerNum = this.goods_info.cappingPerNum
    //     ? this.goods_info.cappingPerNum
    //     : "";
    //   this.goods_info.minPurchase = this.goods_info.minPurchase
    //     ? this.goods_info.minPurchase
    //     : "";
    //   //   this.addComm = true;
    // },
    //表格删除
    // tableHandleDelete(index, item) {
    //   if (this.basicForm.commoditys.length <= 1) {
    //     this.$message.error("商品信息不能为空");
    //     return false;
    //   } else {
    //     this.$message({
    //       message: "删除成功",
    //       type: "success"
    //     });
    //     this.handleEditFlag = false;
    //     this.basicForm.commoditys.splice(index, 1);
    //   }
    // },
    houseClick(val) {
      this.basicForm.sortId = "";
      this.tableProject({ majorSort: val });
      this.houseStr = val;
      this.comInformationDelete() //清空商品信息
    },
    //数组去重
    remove(arr, val, key) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][key]) {
          if (arr[i].value == val) {
            arr.splice(i, 1);
            break;
          }
        } else {
          if (arr[i] == val) {
            arr.splice(i, 1);
            break;
          }
        }
      }
    },
    // serGetList() {
    //   this.pageNumber = 1;
    //   this.getList(this.pageNumber);
    //   this.listQuery.page = 1;
    // },
    // getList(page, size, getObj) {
    //   var _page = page || this.pageNumber;
    //   var _size = size || this.pageSize;
    //   this.listLoading = true;
    //   var obj = {};
    //   if (getObj) {
    //     obj = getObj;
    //   } else {
    //     var obj = {};
    //     if (this.basicForm.majorSort) {
    //       obj.majorSort = this.tabs;
    //     }
    //     if (this.search.sortId) {
    //       obj.sortId = this.search.sortId;
    //     }
    //     if (this.search.name) {
    //       obj.name = this.search.name;
    //     }
    //     if (this.search.goodsName) {
    //       obj.goodsName = this.search.goodsName;
    //     }
    //     if(this.search.orgId){
    //       obj.orgId = this.search.orgId
    //     }
    //     // if (this.search.sortIdandGoodsId) {
    //     //   obj.sortIdandGoodsId = this.search.sortIdandGoodsId;
    //     // }
    //   }
    //   getProject(obj, _page, _size)
    //     .then(res => {
    //       this.orgStatus = res.data.data.orgStatus;
    //       this.total = res.data.data.page.count;
    //       this.pageNumber = res.data.data.page.pageNo;
    //       this.pageSize = res.data.data.page.pageSize;
    //       this.listQuery.page = res.data.data.page.pageNo;
    //       this.listTable = res.data.data.page.list;
    //       let i,
    //         len = this.listTable.length;
    //       if (this.listTable != undefined && this.listTable.length > 0) {
    //         for (i = 0; i < len; i++) {
    //           this.listTable[i].num = i + 1;
    //         }
    //       }
    //       this.listLoading = false;
    //     })
    //     .catch(res => {
    //       this.listLoading = false;
    //     });
    // },
    // 搜索
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.getList(1, this.pageSize);
    //   this.pageNumber = 1;
    //   this.listQuery.page = 1;
    // },
    // handleCurrentChange(val) {
    //   this.pageNumber = val;

    //   this.listLoading = true;
    //   this.getList(this.pageNumber, this.pageSize);
    // },
    handleCreate(formName,str) {
      this.handleCreateFlag = str
      this.measure = dict.meterage;    //计量方式 ，防止收通用订单影响
      this.sordFlag = true;
      this.basicForm.sortId = "";
      this.basicForm.orgId = "";
      this.imgNumber = 0;
      this.tableProject({ majorSort: "clean" });
      this.alreadyArr = [];
      this.dialogFormVisible = true;
      this.basicForm.name = "";
      this.dialogStatus = "create";
      this.basicForm.majorSort = "clean";
      this.commodityArr = []
      this.basicForm.serItemCommodity.name = ''
      this.basicForm.serItemCommodity.unit = ''
      this.basicForm.serItemCommodity.serviceType = 'single'
      this.basicForm.serItemCommodity.convertHours = ''
      this.basicForm.serItemCommodity.cappingPerNum = ''
      this.basicForm.serItemCommodity.startPerNum = ''
      this.basicForm.serItemCommodity.minPurchase = ''
      this.itemNameSearch = ''
      this.goodNameSearch = ''
    },
    //编辑方法
    // handleUpdate(row) {
    //   this.handleCreateFlag = 'single'
    //   this.resetForm();
    //   this.temp = Object.assign({}, row);
    //   this.dialogStatus = "update";
    //   this.basicForm.majorSort = "clean";
    //   this.picList = [];
    //   this.editId = row.id;
    //   this.listLoading = true;
    //   ServerEdit({ id: this.editId })
    //     .then(data => {
    //       if (data.data.code == 1) {
    //         var dataUpdate = data.data.data;
    //         this.jointCode = true;
    //         // if (dataUpdate.commoditys != undefined) {
    //         let i,
    //           len = dataUpdate.commoditys.length;
    //         for (i = 0; i < len; i++) {
    //           dataUpdate.commoditys[i].price = this.returnFloat(
    //             dataUpdate.commoditys[i].price
    //           );
    //         }
    //           if(dataUpdate.sortId < 100){
    //            this.sordFlag = false
    //            this.measure = { "num": "按时长或数量"}
    //            this.goods_info.type = "num"
    //           }else{
    //             this.sordFlag = true
    //             this.measure = dict.meterage;
    //           }
    //         // }
    //         this.listLoading = false;
    //         this.dialogFormVisible = true;
    //         var arr = data.data.data;
    //         if (arr.pictures != undefined) {
    //           this.picFile = arr.pictures;
    //           //banner传给upload组件
    //           this.picList = this.picFile;
    //           // this.imgNumber = arr.pictures.length;
    //           // for (var i = 0; i < arr.pictures.length; i++) {
    //           //   var obj = {
    //           //     url:arr.pictures[i]
    //           //   }
    //           //   this.picList.push(arr.pictures[i]);
    //           // }
    //         }
    //         if (arr.pictureDetails != undefined) {
    //           this.imgText = arr.pictureDetails;
    //           //详情图片传给upload组件
    //           this.pictureDetails = this.imgText;
    //           // for(var i = 0;i<arr.pictureDetails.length; i++){
    //           // var obj = {
    //           // 	url:arr.pictureDetails[i]
    //           // }
    //           // 	this.pictureDetails.push(arr.pictureDetails[i])
    //           // }
    //         } else {
    //           this.pictureDetails = ["", "", "", ""];
    //         }
    //         this.tableProject({ majorSort: arr.majorSort }, arr.sortId);
    //         this.basicForm = arr;
    //         this.customArr = arr.customTags || [];
    //         this.alreadyArr = arr.sysTags || [];
    //       } else {
    //         this.listLoading = false;
    //         return false;
    //       }
    //     })
    //     .catch(error => {
    //       this.listLoading = false;
    //       return false;
    //     });
    // },
    // handleDelete(row) {
    //   this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     closeOnClickModal: false,
    //     customClass: "deleteCom",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       var obj = {
    //         id: row.id
    //       };
    //       ServerDelete(obj)
    //         .then(res => {
    //           if (res.data.code) {
    //             if (res.data.code == 1) {
    //               this.$message({
    //                 type: "success",
    //                 message: res.data.data
    //               });
    //             }
    //             if (res.data.code == 3) {
    //               this.$message({
    //                 type: "warning",
    //                 message: res.data.data
    //               });
    //             }
    //             this.handleCurrentChange(this.listQuery.page);
    //           } else {
    //             // this.$message({
    //             //   type: "error",
    //             //   message: res.data.data
    //             // });
    //             // return false
    //           }
    //         })
    //         .catch(error => {
    //           return false;
    //         });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "warning",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    // handleClick(tab, event) {
    //   this.search.sortId = "";
    //   // this.search.name = "";
    //   // this.search.goodsName = "";
    //   // this.search.sortIdandGoodsId = "";
    //   var size = this.pageSize;
    //   this.pageNumber = 1;
    //   Taxonomy({ majorSort: tab.name })
    //     .then(data => {
    //       this.searchSortList = data.data.data;
    //     })
    //     .catch(error => {});
    //   this.getList(1, size);
    //   this.listQuery.page = 1;
    // },
    //取消
    cancel(fromName) {
      if (this.dialogStatus == "update") {
        // this.getList(this.pageNumber, this.pageSize);
      }
      this.dialogFormVisible = false;
    },
    subFormDate(){
      //  新增
        let { basicForm } = this
        //类型是多次，折算时长等于商品信息的折算时长
        if( basicForm.serItemCommodity.serviceType != 'single'){
          basicForm.serItemCommodity.convertHours = basicForm.serItemCommodity.combinationCommodities[0].convertHours
        }
        basicForm.serItemCommodity.price = this.informationCalculation //组合商品价格
        basicForm.serItemCommodity.type = 'num'   //计量方式
        basicForm.pictures = this.picFile; //banner
        basicForm.pictureDetails = this.imgText;  //图文详情
        basicForm.sysTags = this.labelClickArr;  //添加 系统标签
        basicForm.customTags = this.customArr;  //自定义标签
        //判断是单次或多次，多次得话需要serviceNum（服务次数）字段
        if(basicForm.serItemCommodity.serviceType != 'single'){
            basicForm.serItemCommodity.serviceNum =  basicForm.serItemCommodity.combinationCommodities[0].combinationNum
        }else{
            delete basicForm.serItemCommodity.serviceNum
		}
		if('id' in basicForm){
			delete basicForm['id']
		}
		if(this.techUserType != 'sys'){
			if('orgId' in basicForm){
				delete basicForm['orgId']
			}
		}
        var loading = this.$loading({
            lock: true,
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
            target: document.querySelector(".tabBox ")
        });
        saveCombinedData(basicForm).then(({data:{data,code}})=>{
            if(code == 1){
                this.$message({
                    message: data,
                    type: "success"
                });
            }
            if(code == 3){
                this.$message({
                    message: data,
                    type: "warning"
                });
            }
            loading.close();
            this.dialogFormVisible = false
            this.$emit('comlist')
        }).catch(error=>{
            console.log(error,"error--------")
        })
    },
    subFormCom(formName){
        this.$refs[formName].validate(valid => {
          if(valid){
            this.subFormDate()
          }else{
              let errArr = this.$refs[formName]._data.fields;
              let errMes = [];
              for (let i = 0; i < errArr.length; i++) {
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
        })
    },
    //保存
    // subForm(formName) {
    //   var that = this;
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       this.btnState = true;
    //       var arr = [];
    //       var obj = Object.assign({}, that.basicForm);
    //       obj.pictures = this.picFile; //服务图片缩略图.
    //       obj.pictureDetails = this.imgText;
    //       obj.sysTags = this.labelClickArr; //添加 系统标签
    //       obj.customTags = this.customArr;
    //       var loading = this.$loading({
    //         lock: true,
    //         spinner: "el-icon-loading",
    //         background: "rgba(0, 0, 0, 0.7)",
    //         target: document.querySelector(".tabBox ")
    //       });
    //       //==update 是编辑   create是添加
    //       if (this.dialogStatus == "update") {
    //         that.basicForm.sysTags = this.alreadyArr.concat(this.labelClickArr);
    //         that.basicForm.customTags = this.customArr;
    //         that.basicForm.pictures = this.picFile;
    //         that.basicForm.pictureDetails = this.imgText;
    //         serverEditPre(that.basicForm)
    //           .then(data => {
    //             this.btnState = false;
    //             if (data.data.code) {
    //               if (data.data.code == 3) {
    //                 this.$message({
    //                   message: data.data.data,
    //                   type: "warning"
    //                 });
    //               }
    //               if (data.data.code == 1) {
    //                 this.$message({
    //                   message: data.data.data,
    //                   type: "success"
    //                 });
    //               }
    //               loading.close();
    //               this.resetForm();
    //               this.dialogFormVisible = false;
    //               this.getList(this.pageNumber, this.pageSize);
    //               this.picFile = [];
    //               this.pictureDetails = [];
    //               this.picList = [];
    //               this.imgNumber = 0;
    //             } else {
    //               loading.close();
    //               this.btnState = false;
    //               this.imgNumber = 0;
    //             }
    //           })
    //           .catch(error => {
    //             loading.close();
    //             this.btnState = false;
    //             this.imgNumber = 0;
    //           });
    //       } else {
    //         if ("id" in obj) {
    //           delete obj.id;
    //         }
    //         if ("pictureDetail" in obj) {
    //           delete obj.pictureDetail;
    //         }
    //         // if("pictureDetails" in obj){
    //         //   delete obj.pictureDetails
    //         // }
    //         ServerAdd(obj)
    //           .then(data => {
    //             this.btnState = false;
    //             if (data.data.code) {
    //               if (data.data.code == 1) {
    //                 this.$message({
    //                   message: data.data.data,
    //                   type: "success"
    //                 });
    //               }
    //               if (data.data.code == 3) {
    //                 this.$message({
    //                   message: data.data.data,
    //                   type: "warning"
    //                 });
    //               }
    //               //loading取消
    //               loading.close();
    //               this.cancel("basic");
    //               this.basicForm.majorSort = "all";
    //               this.search.sortId = "";
    //               this.search.name = "";
    //               this.search.goodsName = "";
    //               // this.search.sortIdandGoodsId = "";
  
    //               this.$refs['orgSearch'].orgEmpty()
    //               this.orgSearch()
    //               this.tabs = "all";
    //               this.listQuery.page = 1;
    //               this.getList(1, this.pageSize);
    //               this.picFile = [];
    //               this.pictureDetails = [];
    //             } else {
    //               loading.close();
    //               this.btnState = false;
    //             }
    //           })
    //           .catch(error => {
    //             loading.close();
    //             this.btnState = false;
    //           });
    //       }
    //     } else {
    //       var errArr = this.$refs[formName]._data.fields;
    //       var errMes = [];
    //       for (var i = 0; i < errArr.length; i++) {
    //         if (errArr[i].validateMessage != "") {
    //           errMes.push(errArr[i].validateMessage);
    //         }
    //       }
    //       this.$message({
    //         type: "error",
    //         message: errMes[0]
    //       });
    //       return false;
    //     }
    //   });
    // },
    // resetForm(ser) {
    //   if (this.$refs["goods_info"]) {
    //     this.$refs["goods_info"].resetFields();
    //   }
    //   if (ser == "ser") {
    //     this.addCommodityFlag = true;
    //   } else {
    //     this.addCommodityFlag = false;
    //     // this.addComm = false
    //   }
    //   this.goods_info.name = "";
    //   this.goods_info.unit = "";
    //   this.goods_info.type = "";
    //   this.goods_info.price = "";
    //   this.goods_info.convertHours = "";
    //   this.goods_info.minPurchase = "";
    //   this.goods_info.startPerNum = "";
    //   this.goods_info.cappingPerNum = "";
    // },
    //弹框关闭回调
    emptyingForm() {
      if (this.$refs["goods_info"]) {
        this.$refs["goods_info"].resetFields();
      }
      this.$refs["basic"].resetFields();
      this.jointCode = false;
      this.imgNumber = 0;
      this.basicForm.commoditys = [];
      //清空banner和图文详情图
      this.picFile = ["", "", "", ""]; //清空图片
      this.pictureDetails = ["", "", "", ""];
      this.imgText = ["", "", "", ""];
      this.picList = ["", "", "", ""]; //清空图片
      this.alreadyArr = [];
      this.labelClickArr = [];
      this.customArr = [];
      this.systemOptions2 = [];
      this.systemOptions3 = [];
      this.systemOptions4 = [];
      this.itemName = ''
      this.goodName = ''
    },
    // resetEmpty(txt) {
    //   if (txt == "ser") {
    //     this.$refs["goods_info"].resetFields();
    //     this.goods_info.minPurchase = "";
    //     this.goods_info.startPerNum = "";
    //     this.goods_info.cappingPerNum = "";
    //   } else {
    //     this.$refs["goods_info"].resetFields();
    //     this.$refs["basic"].resetFields();
    //     this.goods_info.minPurchase = "";
    //     this.basicForm.sortNum = ""; //排序号好清空
    //     this.basicForm.cityCodes = []; //定向城市
    //     this.goods_info.minPurchase = ""; //起够数量
    //     this.basicForm.commoditys = []; //商品信息表格
    //     this.picFile = []; //清空图片
    //     this.pictureDetails = [];
    //     this.picList = []; //清空图片
    //     this.dialogFormVisible = false;
    //   }
    // },
    listDataAllClick(){
         let list = async ()=>{
            try{
              let _list = await this.$refs['orgSearch'].listDataAll()
              this.orgList = _list
              // this.handleClick({ name: "all" });
            }
            catch(error){
            }
        }
        list()
    }
  },
  props:[
    'orgList',
    'systemOptions'
  ],
  components: {
    imgService,
    addCommodity,
    orgSearch,
    combination
  },
  mounted(){
    // this.listDataAllClick()
    // console.log('_______________________________________')
    // let list = async ()=>{
    //   try{
    //     let _list = await this.$refs['orgSearch'].listDataAll()
    //     this.orgList = _list
    //     this.handleClick({ name: "all" });
    //   }
    //   catch(error){
    //   }
    // }

    // list()
  },
  filters:{
    rmb(value) {
      return '¥'+value
    }
  }
};
</script>
<style>
    @import './prokect.css';
    .com-dialog .el-table{
        /* margin-top: 0; */
    }
    .combinationType-info .el-form-item__content{
      margin-left: 108px !important;
    }
</style>

