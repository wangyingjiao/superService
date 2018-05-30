<template>
<div id="project">
  	<div class="filter-container">
<!-- 添加，编辑弹框 -->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :show-close= "false" :close-on-click-modal="false"
		:close-on-press-escape="false" @close="emptyingForm" class="diatable combination">
			<div class="tabBox comtabBox">
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
							<el-select :disabled="textMap[dialogStatus]=='编辑服务项目'" filterable v-model="basicForm.orgId" style="width:100%" class="form_item" @change="comInformationDelete">
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
								<div style="padding:20px 20px" class="com-type">
									<el-form-item label="服务类型：" prop="serItemCommodity.serviceType" class="combination-name">
										<div :class="basicForm.serItemCommodity.serviceType=='single'?'type-border-alive':'type-border'" @click="typeAlive('single')">
											<i :class="basicForm.serItemCommodity.serviceType=='single'?'type-alive-com':'type-com'"></i>
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
										<el-table-column prop="itemName" align="center" label="项目名称" min-width="100"> </el-table-column>
										<el-table-column prop="goodsName" align="center" label="商品名称" min-width="100"> </el-table-column>
										<el-table-column prop="convertHours" align="center" min-width="125" label="折算时长/单位">
											<template scope="scope">
												<span>{{scope.row.convertHours+'小时'}}</span>
											</template>
										</el-table-column>
										<el-table-column prop="doublePrice" align="center" min-width="100" label="原价/单位">
											<template scope="scope">
													<span>{{'¥'+scope.row.doublePrice}}</span>
											</template>
										</el-table-column>
										<el-table-column prop="goodsUnit" align="center" label="单位"></el-table-column>
										<el-table-column prop="name" align="center" label="组合商品售价" min-width="125">
											<template scope="scope">
												<!-- <span><input type="text" v-model="scope.row.combinationPrice"></span> -->
												<div class="input-price">
													<i class="iconfont">&#xe61c;</i>
													<input class="price-com" type="text"  :value="scope.row.combinationPrice" @input="e => scope.row.combinationPrice = inputPrice(e)" @blur="e=>scope.row.combinationPrice = inputBlur(e)"/>
													<!-- <input class="price-com" type="text" v-model.trim="scope.row.combinationPrice" :maxlength="inputMaxL"  @input="inputMaxL= /^\d+\.?\d{0,1}$/.test(scope.row.combinationPrice) ? null : scope.row.combinationPrice.length - 1" /> -->
												</div>
											</template>
										</el-table-column>
										<el-table-column prop="name" align="center" label="数量" min-width="150">
											<template scope="scope">
												<inputNum :min='1' :max="999999"  v-model="scope.row.combinationNum"></inputNum>
												<!-- <span ><el-input-number class="selfINputNumStyle" v-model="scope.row.combinationNum" :min='1'  :max="999999"></el-input-number></span> -->
											</template>
										</el-table-column>
										<el-table-column prop="name" align="center" label="操作">
											<template scope="scope">
												<span style="color:#FF7676;cursor:pointer" @click="deleteInformation(scope.row,scope.$index)">删除</span>
											</template>
										</el-table-column>
									</el-table>
								</div>
								<div style="padding:20px 20px 0">
									<el-form-item label="组合商品名称：" prop="serItemCommodity.name" class="combination-name">
										<el-input style="width:60%" v-model="basicForm.serItemCommodity.name" placeholder="请输入1-24位的组合商品名称"></el-input>
									</el-form-item>
									<el-form-item label="组合商品价格：" prop="serItemCommodity.price" class="combination-name">
										<span>¥ {{informationCalculation | keepTwoNum}}</span>
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
											<span v-if="dialogStatus != 'update'">{{convertHoursDate(basicForm.serItemCommodity.unit,basicForm.serItemCommodity.convertHours,basicForm.serItemCommodity.combinationCommodities)}}</span>
											<!-- <span v-if="dialogStatus != 'update'">{{basicForm.serItemCommodity.combinationCommodities.length>0 ? (basicForm.serItemCommodity.unit?basicForm.serItemCommodity.combinationCommodities[0].convertHours+'小时/'+basicForm.serItemCommodity.unit:basicForm.serItemCommodity.combinationCommodities[0].convertHours+'小时/单位'):0+'小时/单位'}}</span> -->
											<span v-else>{{basicForm.serItemCommodity.unit ? basicForm.serItemCommodity.convertHours+'小时/'+basicForm.serItemCommodity.unit : basicForm.serItemCommodity.convertHours+'小时/单位'}}</span>
										</el-form-item>
										<el-form-item label="服务时效：" class="combination-name">
											<el-select v-model="basicForm.serItemCommodity.orderValidityDays" style="width:60%" class="form_item">
												<el-option v-for="item in orderValidityDaysArr" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
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
											<el-form-item label="起购数量：" prop="serItemCommodity.minPurchase" class="combination-name">
												<el-input
													style="width:60%"
													v-model="basicForm.serItemCommodity.minPurchase"
													placeholder="请输入起购数量(默认为1)"></el-input>
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
          	<input type="button" class="button-cancel" @click="systemClose" value="关 闭">
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
			<el-table v-loading.body="loadingCom" :data="commodityDate" border style="width: 100%" :height="comDigHeight">
				<el-table-column prop="name" align="center" label="选择">
					<template scope="scope">
						<el-checkbox v-if="basicForm.serItemCommodity.serviceType=='single'" v-model="scope.row.check" @change="selectCommodity(scope.row)"></el-checkbox>
						<el-radio v-else class="radio" v-model="radio" :label="scope.row.goodsId" @change.native="selectCommoditySingle(scope.row)">&nbsp;</el-radio>
					</template>
				</el-table-column>
				<el-table-column prop="itemName" align="center" label="项目名称" min-width="100"> </el-table-column>
				<el-table-column prop="goodsName" align="center" label="商品名称" min-width="100"> </el-table-column>
				<el-table-column prop="convertHours" align="center" min-width="130" label="折算时长/单位">
					<template scope="scope">
						<span>{{scope.row.convertHours+'小时'}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="doublePrice" align="center" min-width="100" label="单价/单位">
					<template scope="scope">
						<span>{{'¥'+scope.row.doublePrice}}</span>
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
import inputNum from '../../components/inputNum.vue'
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
		//组合折算时长
		var CONVERTHOURSHOURS = (rule,value,callback) => {
			var reg = /^d*(?:.d{0,2})?$/;
			if(this.basicForm.serItemCommodity.serviceType=='single'){
				if(value){
					if(value >= 0.01 && value <= 1.5){
						let con = this.converFilter(value);
						con ? callback() : callback(new Error('请精确到小数后两位'))
					}else{
						callback(new Error('请正确输入(0.01~1.5小时)'))
					}
				}else{
					callback(new Error('请输入折算时长'))
				}
			}else{
				callback()
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
			comDigHeight:'360',	
			goodNameSearch:'',
			itemNameSearch:'',
			commodityArr:[],
			inputMaxL:2,
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
			orderValidityDaysArr:[
				{value:7,label:'七天'},
				{value:30,label:'一个月'},
				{value:90,label:'三个月'},
				{value:180,label:'六个月'},
				{value:360,label:'一年'},
			],
			basicForm: {
				name: "",
				sortId: "",
				majorSort: "all",
				commoditys: [],
				sysTags: [],
				customTags: [],
				orgId:'',
				serItemCommodity:{
					orderValidityDays:7,
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
					{required:true,validator:CONVERTHOURSHOURS,trigger:"blur"}
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
		//折算时长
		convertHoursDate(unit,convertHours,combinationCommodities){
			if(combinationCommodities.length>0){
				if(unit){
					return combinationCommodities[0].convertHours+'小时/'+unit
				}else{
					return combinationCommodities[0].convertHours+'小时/单位'
				}
			}else{
				if(unit){
					return 0+'小时/'+unit
				}else{
					return 0+'小时/单位'
				}
			}
		},
		//系统弹框关闭
		systemClose(){
			this.SystemLabel = false
			this.$refs.basic.validateField("sysTags")
		},  
		//组合商品售价失焦默认“0”
		inputBlur(e){
			let obj = e.target
			obj.value = obj.value == '' ? 0 : obj.value
			return obj.value
		},
		//组合商品售价限制
		inputPrice(e){
			let obj = e.target;
			obj.value = obj.value.replace('。','.');
			obj.value = obj.value.replace(/[^\d\.]/g,'');
			obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字而不是
			obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的 
			obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");   
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数 
			return obj.value
		},
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
				this.commodityArr.unshift(item)
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
			this.combinationTypeDialog = false;
			this.itemNameSearch = ''
			this.goodNameSearch = ''
			this.$refs.basic.validateField("serItemCommodity.combinationCommodities");
		},
		//组合商品信息--选择商品--单选
		selectCommoditySingle(item){
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
			this.commodityArr = [].concat(this.basicForm.serItemCommodity.combinationCommodities)
			this.combinationTypeDialog = false;
			this.itemNameSearch = ''
			this.goodNameSearch = ''
		},
		//商品table
		listDataBySortIdData(obj){
		
		},
		//搜索
		choiceCommoditySearch(){
			this.choiceCommodity(true)
		},
		//选择商品按钮
		choiceCommodity(bl){
			if(this.techUserType == 'sys'){
				if(!this.basicForm.orgId){
					this.$message({
						type: "warning",
						message: "请选择所属机构"
					});
					return;
				}
				if(!this.basicForm.sortId){
					this.$message({
						type: "warning",
						message: "请选择所属分类"
					});
					return;
				}
			}else{
				if(!this.basicForm.sortId){
					this.$message({
						type: "warning",
						message: "请选择所属分类"
					});
					return;
				}
			}
			let obj = {}
			this.commodityDate = []
			obj.sortId = this.basicForm.sortId;
			if(this.techUserType == 'sys'){
				obj.orgId = this.basicForm.orgId;
			}else{
				obj.orgId = '';
			}
			var comloading;
			obj.itemName = this.itemNameSearch || ''
			obj.goodsName = this.goodNameSearch || ''
			if(bl == true){

			}else{
				this.commodityArr = [].concat(this.basicForm.serItemCommodity.combinationCommodities)
				comloading = this.$loading({
					lock: true,
					spinner: "el-icon-loading",
					background: "rgba(0, 0, 0, 0.7)",
					target: document.querySelector(".comtabBox ")
				});
			}
			this.loadingCom = true;
			listDataBySortId(obj).then(({data:{code,data}})=>{
				if(code == 1){
					if(data != undefined){
						let i , j , lon = this.commodityArr.length;
						//判读：复选框选中
						for( i = data.length ; i -- ;){
							data[i].combinationPrice = 0
							data[i].combinationNum = 1
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
					}
					this.combinationTypeDialog = true
				}else{
					this.commodityDate = []
					this.commodityArr = []
				}
				if(bl==true){
				}else{comloading.close()};
				this.loadingCom = false;
			}).catch(error=>{
				if(bl==true){
				}else{comloading.close()};
				this.loadingCom = false;
			})
		},
		choiceCommodityAsync(bl){
			let dag = async(bl)=>{
				let blo = await this.choiceCommodity(bl)
				this.combinationTypeDialog = blo;
			}
			dag(bl)
		},
		deleteInformation(item,index){
			this.basicForm.serItemCommodity.combinationCommodities.del(index)
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
		imgClick(item) {
			this.picFile = item;
			this.$refs.basic.validateField('picture')
			//当点击保存时，会提示请上传图片，当上传图片后，提示不会消失
			//上传图片成功触发表单验证
			// this.$refs['basic'].validate(valid => {})
		},
		imgTextClick(item) {
			this.imgText = item;
		},
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
			this.basicForm.serItemCommodity.orderValidityDays = 7
			this.basicForm.serItemCommodity.unit = ''
			this.basicForm.serItemCommodity.serviceType = 'single'
			this.basicForm.serItemCommodity.convertHours = ''
			this.basicForm.serItemCommodity.cappingPerNum = ''
			this.basicForm.serItemCommodity.startPerNum = ''
			this.basicForm.serItemCommodity.minPurchase = ''
			this.itemNameSearch = ''
			this.goodNameSearch = ''
		},
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
				delete basicForm.serItemCommodity.cappingPerNum    //多次服务不需要传
				delete basicForm.serItemCommodity.startPerNum
				delete basicForm.serItemCommodity.minPurchase
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
		listDataAllClick(){
			let list = async ()=>{
				try{
					let _list = await this.$refs['orgSearch'].listDataAll()
					this.orgList = _list
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
		combination,
		inputNum
	},
	mounted(){
	},
	filters:{
		keepTwoNum(value){
			value = Number(value)
			return value.toFixed(2)
		}
	}
};
</script>
<style>
    @import './prokect.css';
    .combinationType-info .el-form-item__content{
		margin-left: 108px !important;
    }
    .input-price{
      	border:1px solid #bfcbd9;
    }
    .input-price i{
      	font-size: 21px;
    }
    .price-com{
		background: #fff;
		border: none;
		width: 70%;
		height: 34px;
		line-height: 1;
		outline: 0;
		transition: border-color .2s cubic-bezier(.645 .045,.355,1);
    }
	.com-dialog .el-dialog--small{
		width: 60%;
	}
</style>

