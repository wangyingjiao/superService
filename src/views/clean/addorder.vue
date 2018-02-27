<template>
    <div class="addorder-container">
		<div class="addorderStepWrap">
			<!--步骤条开始-->
			<div class="stepControl">				
				<el-steps :space="400" :active="active"  align-center >
					<el-step title="选择客户"></el-step>
					<el-step title="服务信息"></el-step>
					<el-step title="选择技师与服务时间"></el-step>
				</el-steps>
			</div>
			<!--步骤条结束-->
			<!--步骤显示区域开始-->
			<div class="stepContentWrap">
				<!--步骤1显示区域开始-->
				<div class="stepContent"  v-show="active == 1">
					<el-form ref="form" :rules="forma" :model="form" label-width="100px" label-position="left">
						<el-form-item label="联系电话:">
              <span class="selfLabelStyle">*</span>
              <el-input  class="severChangeStyle"   placeholder="请输入客户手机号" v-model="customPhone"></el-input>
							<div  class="selftSerchBut"  v-if="btnShow.indexOf('order_insert') != -1" @click="addcustomer">新增</div>
						</el-form-item>
						<el-form-item label="获取信息:">
							<div  class="selftSerchBut"  @click="changeCustom">点击查询</div>
						</el-form-item>            
						<div v-if="customKeyFlag">
							<el-form-item label="客户姓名:" prop="name">
								<span class="fontSize12">{{form.name}}</span>
							</el-form-item>
							<el-form-item label="服务地址:" prop="address">
								{{form.address}}
							</el-form-item>
							<el-form-item label="所属服务站:" prop='serverStation1'>
                <el-input type="hidden" value='' v-model='form.serverStation1'></el-input>
                <el-select clearable  style="margin-top:-36px;float:left;" class="severChangeStyle" filterable v-model="serverStation1" @change="seerchange" placeholder="请选择">
                  <el-option v-for="item in form.stationList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>                
							</el-form-item>	
						</div>																										
					</el-form>						
				</div>
				<!--步骤1显示区域结束-->
				<!--步骤2显示区域开始-->
				<div class="stepContent"  v-show="active == 2">
					<el-form ref="form1"  :rules="rulesTest" :model="form1" label-width="100px" label-position="left">
						<el-form-item label="服务项目:" prop="serverPro">
							<el-select clearable  class="severChangeStyle" filterable v-model="form1.serverPro" placeholder="请选择" @change="serverchange">
								<el-option v-for="item in serverOptions" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="选择商品:">
              <span class="selfLabelStyle">*</span>
							<div class="table-d1" v-if="selectCommidty.length != 0">
								<table width="80%" class="selfTable">
									<tr>
										<td  class="selfTableHEADTD" align="center" width="8%">选择</td>
										<td  class="selfTableHEADTD" align="center" width="28%">商品名称</td>
                    <td  class="selfTableHEADTD" align="center" width="10%">单位</td>
										<td  class="selfTableHEADTD" align="center" width="18%">单价</td>
										<td  class="selfTableHEADTD" align="center" width="10%">起购数</td>
										<td  class="selfTableHEADTD" align="center" width="26%">数量</td>
                    <td  class="selfTableHEADTD"   align="center" style="display:none;width:50px">小计</td> 							
									</tr>
									<tr v-for="(item,index) in selectCommidty" :key="item.goodsId" >
										<td  align="center"><el-checkbox  @change="rowChange(item)" v-model="item.goodsChecked"></el-checkbox></td>
										<td  align="center">
											<span v-if="item.goodsType=='num' || item.goodsType=='area'">{{item.goodsName}}</span>
											<span v-if="item.goodsType=='house'">
												<el-select  class="roomTypeStyle"   @change="roomChange(item,item.goodsId)" v-model="item.houseId" placeholder="请选择">
													<el-option v-for="room in item.houses" :key="room.id" :label="room.name" :value="room.id">
													</el-option>
												</el-select>
											</span>
										</td>
                    <td  align="center">
                      <span v-if="item.goodsType=='num' || item.goodsType=='area'">{{item.goodsUnit}}</span>
											<span v-if="item.goodsType=='house'">
                        <span v-for="aa in item.houses" :key="aa.id">
                          <span v-if="aa.id == item.houseId">{{aa.goodsUnit}}</span>
                        </span>
											</span>                      
                    </td>
										<td  align="center">
											<span v-if="item.goodsType=='num' || item.goodsType=='area'">{{item.payPrice}}</span>
											<span v-if="item.goodsType=='house'">
                        <span v-for="aa in item.houses" :key="aa.id">
                          <span v-if="aa.id == item.houseId">{{aa.payPrice}}</span>
                        </span>
											</span>
										</td>
										<td  align="center">
                      <span v-if="item.goodsType=='num' || item.goodsType=='area'">{{item.minPurchase}}</span>
											<span v-if="item.goodsType=='house'">
                        <span v-for="aa in item.houses" :key="aa.id">
                          <span v-if="aa.id == item.houseId">{{aa.minPurchase}}</span>
                        </span>
											</span>                       
                    </td>
										<td class="height30" align="center">
                      <span v-if="item.goodsType=='num' || item.goodsType=='area'"> <el-input-number class="selfINputNumStyle"   @change="numberChange(item,item.goodsId)" v-model="item.goodsNum" :min="parseInt(item.minPurchase)" :max="999999"></el-input-number></span>
											<!-- <span v-if="item.goodsType=='house'">{{item.goodsNum}}</span> -->
											<span v-if="item.goodsType=='house'">
                        <span v-for="aa in item.houses" :key="aa.id">
                          <span v-if="aa.id == item.houseId">{{aa.goodsNum}}</span>
                        </span>
											</span>                       											
										</td>
                    <td width="50px" class="fontSize12"  align="center" :ref="item.goodsId" style="display:none;">
                        {{item.payPriceSum}}
                    </td>                     							
									</tr>
								</table>
							</div>   																																
						</el-form-item>
						<el-form-item label="总价:" prop="sumPrice">
							<span v-if="selectCommidty.length != 0">￥{{form1.sumPrice}}.00</span>
						</el-form-item>																																														
					</el-form>
				</div>
				<!--步骤2显示区域结束-->
				<!--步骤3显示区域开始-->
				<div class="stepContent" v-show="active == 3">
					<el-form ref="form2" :rules="rules2" :model="form2" label-width="100px" label-position="left">
						<el-form-item label="技师:" prop="selectTech">
              <el-select  class="roomTypeStyle" style="display:none;"   v-model="form2.selectTech" placeholder="请选择">
                <el-option v-for="item in tabOptions" :key="item.techId" :label="item.techName" :value="item.techId">
                </el-option>
              </el-select>                             
							<span  class="button-cancel stepThreeBut"  @click="technicianSel">+选择技师</span><span class="selfPromInfStyle">* 若不选择技师，则为系统自动分配</span>
							<div class="custom-action stepThreeSelfTop">
								<div class="customNamevalue">
									<div class="tabWrap" v-for="item in tabOptions" :key="item.techId">
										<div class="techNameStyle">{{item.techName}}</div>
										<div class="closePic" @click="errorClose(item)">&#10005</div>
									</div> 					
								</div>
							</div>																	
						</el-form-item>																																													
            <el-form-item label="选择日期:" prop='severTime' >
                <el-select clearable v-model="form2.severTime" class="width200"  @change='dateChange' placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>                      
            </el-form-item>            
						<el-form-item label="选择时间:" prop="severTime1">
              <el-input type="hidden" value='' v-model='form2.severTime1'></el-input> 
							<div class="marginTopDec10">
                 <div class="selfSeverTimeSt" ref="TimeWrap"  v-for="(item,index) in timeObj" :key="index" @click="timeChange(index,item)">{{item.serviceTimeStr}}</div>
							</div>														
						</el-form-item>									
						<el-form-item label="客户备注:" prop="textarea" class="fontSize12">
							<el-input
								type="textarea"
								:rows="3"
								placeholder="请输入内容"
								v-model="form2.textarea"
								class="width400"
								>
							</el-input>						
						</el-form-item>	
					</el-form>
				</div>
				<!--步骤3显示区域结束-->
        <!--上、下步按钮开始-->
        <div class="NextPrevWrap">
          <span class="button-large NextPrevStyle"  v-show="active == 2 || active == 3" @click="prev">上一步</span>
          <span class="button-large NextPrevStyle"  v-show="active == 1"  @click="next('form')">下一步</span>	
          <span class="button-large NextPrevStyle"  v-show="active == 2"  @click="next('form1')">下一步</span>					
          <span class="button-large NextPrevStyle"  v-show="active == 3" @click="confirmOrder('form2')">保存</span>		
        </div>
        <!--上、下步按钮结束-->        
			</div>
			<!--步骤显示区域结束-->

	</div>
	<!--新增客户弹窗开始-->
	<el-dialog title="新增客户" :visible.sync="dialogTableVisible1" :show-close="false" :close-on-click-modal="false">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" label-position="left" class="demo-ruleForm">
			<el-form-item label="姓名:" prop="name" >
				<el-input class="width400" v-model.trim="ruleForm.name" placeholder="请输入客户姓名"></el-input>
			</el-form-item>
			<el-form-item label="性别:"  prop="sex">
				<el-select clearable class="width400" v-model="ruleForm.sex" placeholder="请选择性别" >
					<el-option v-for="(value,key,index) in sex" :key="index" :label="value" :value="key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="手机号:"  prop="phone">
		    <el-input  v-model="ruleForm.phone" class="width400" placeholder="请输入11位手机号"></el-input>
			</el-form-item>
			<el-form-item label="所在区域:" prop="areaCodes">
				<!-- 省市区 -->
				<el-cascader
					:options="areaOptions"
          ref="allDeress"
					:show-all-levels="true"
					@change="testFun"
					v-model="ruleForm.areaCodes"
					class="width400" 
				></el-cascader>								
			</el-form-item>
       <!-- @blur="inputFocus" -->
			<el-form-item label="详细地址:" prop="address">
				<input class="pickerInput" ref="pickerInput"  :disabled="showDis" value='' placeholder="输入关键字选取地点">        
				<input type="hidden" class="pickerInput" ref="pickerInput1"  value='' placeholder="输入关键字选取地点">
				<el-input class="selfAddressStyle"  v-model.trim="ruleForm.address" placeholder="输入详细地址"></el-input>
        <div class="selfAddressGao1">
             <div ref="panel" class="selfpanel1" ></div>        
        </div>        		
			</el-form-item>
			<el-form-item label="邮箱:" prop="email" class="marginLeft10">
				<el-input  v-model.trim="ruleForm.email" class="selfEmailStyle"  placeholder="请输入常用邮箱"></el-input>
			</el-form-item>					
		</el-form>    					
		<div slot="footer" class="dialog-footer" style="text-align:center;">
				<button class="button-large" @click="submitForm('ruleForm')">确 定</button>
				<button class="button-cancel"  @click="resetForm('ruleForm')">取 消</button>
		</div>
	</el-dialog>
	<!--新增客户弹窗结束-->		
	<!--技师选择弹窗开始-->
		<el-dialog title="选择技师" :visible.sync="dialogTableVisible" class="selfDialogWidth" :close-on-click-modal="false">
			<el-input placeholder="输入要搜索的姓名" v-model="techName" class="dispatchTechNameSearch"></el-input> 
			<button class="button-large FloatRight marginRight15" @click="searchTeh">查询</button>
			<el-collapse-transition>
				<div class="selfpromMessageTab" v-if="middleA.length !=0">
					<div  class="tabWrap1" v-for="item in middleA" :key="item.techId">
						<div class="techNameStyle">{{item.techName}}</div>
					</div>                         
				</div>
			</el-collapse-transition>                                               	
			<div class="selfTableWrapONE">
				<div class="table-d">
					<table  class="selfTable">
					<tr class="tableHeader">
						<td  class="selfTableHEADTD" align="center" width="73px">选择</td>
						<td  class="selfTableHEADTD" align="center" width="158px">头像</td>
						<td  class="selfTableHEADTD" align="center" width="182px">姓名</td>
						<td  class="selfTableHEADTD" align="center" width="73px">性别</td>
						<td  class="selfTableHEADTD" align="center" width="141px">岗位性质</td>							
					</tr>
					<div class="paddingTop60">
							<tr v-for="item in listTech" :key="item.techId"  ref="tableItem1" class="selfTdStyle1">
								<td width="72px" class="fontSize12"  align="center"><el-checkbox  v-model="item.techChecked" @change="ChangeTech(item)"></el-checkbox></td>
								<td  width="156px" class="height70" align="center"><img class="imgStyle" :src="imgSrc+item.headPic+picWidth60"/></td>
								<td width="182px" class="fontSize12" align="center"><div class="selftechNameStyle">{{item.techName}}</div></td>
								<td  width="72px" class="fontSize12" align="center">
									<span class="fontSize12" v-if="item.techSex =='male'">男</span>
									<span class="fontSize12" v-if="item.techSex =='female'">女</span>									
								</td>
								<td width="141px" class="fontSize12"  align="center">
											<span class="fontSize12" v-if="item.jobNature =='part_time'">兼职</span>
											<span class="fontSize12" v-if="item.jobNature =='full_time'">全职</span>
								</td>               							
							</tr>
					</div>
					</table>
					<div   v-if="listTech.length == 0" class="selfTabProm">暂无数据</div>
				</div>            
			</div> 	  	  
			<div slot="footer" class="dialog-footer" style="text-align:center">
				<button class="button-large" :disabled="techSaveFlag" @click="submitForm2()">保存</button>
				<button class="button-cancel" @click="cancelForm2()">取 消</button>
			</div>
		</el-dialog>	
	<!--技师选择弹窗结束-->
		<!--地图开始-->
			<div ref="gdMap" class="mapWrap"></div>              	
		<!--地图结束-->   
  </div>
 
</template>

<script>
import {
  findCustomerByPhone, //根据手机号查找客户
  findCustomerById, //根据ID查找客户
  findItemList, //获取服务项目列表
  findGoodsListByItem, //获取服务项目下的商品列表
  findTechListByGoods, //获取商品的技师列表
  findTimeListByTech, //获取技师的时间列表
  createOrder //新增订单保存
} from "@/api/order";
import {
  saveCus //保存客户（新增）
} from "@/api/customer";

var loading;
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      } else {
        if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value)) {
          callback(new Error("电话号码不正确！请重新填写"));
        } else {
          callback();
        }
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (
          !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)
        ) {
          callback(new Error("请输入正确的邮箱"));
        } else {
           if (value.length >= 5 && value.length <= 50) {
            callback();
          } else {
            callback(new Error("请输入5-50位邮箱地址"));
          }
        }
      }
    };
    var checkAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请选取地点,并填写详细地址"));
      } else {
        if (value.length >= 1 && value.length <= 100) {
          callback();
        } else {
          callback(new Error("请输入1-100位详细地址"));
        }
      }
    };
    var checksum = (rule, value, callback) => {
      if (!value) {
        if (value == 0) {
          callback(new Error("请选择商品"));
        } else {
          callback();
        }
      } else {
      }
    };
    var checkDate = (rule, value, callback) => {
      if (!value) {        
        callback(new Error("请选择日期"));
      } else {
        callback();
      }
    };
    return {
      showDis: true,
      changTime: "",
      options2: [],
      timeObj: [],
      middleA: [],
      techSaveFlag: false,
      form2: {
        selectTech: '',
        severTime: "",
        severTime1: "",
        textarea:''
      },
      btnShow: JSON.parse(localStorage.getItem("btn")),
      //服务站下拉选项
      options: [],
      techName: "",
      techStationId: "",
      promShow1: false,
      pickerOptions0: {
        disabledDate(time) {
          if (
            time.getTime() > Date.now() - 8.64e7 &&
            time.getTime() < Date.now() + 8.64e7 * 14
          ) {
            return false;
          } else {
            return true;
          }
        }
      },
      //弹窗表格数据
      listTech: [],
      selectCommidty: [],
      form: {
        name: "",
        address: "",
        stationList: [],
        serverStation1: ""
      },
      customPhone: "",
      serverStation1: "",
      form1: {
        serverPro: '',
        sumPrice: 0,
      },
      form3: {
        date: ""
      },
      active: 1,
      forma: {
        serverStation1: [
          { required: true, message: "请选择服务站", trigger: "change" }
        ]
      },
      rules2: {
        // selectTech: [
        //   { required: true, message: "请选择技师", trigger: "change" }
        // ],
        severTime: [
          {
            required: true,
            validator: checkDate,
            message: "请选择服务日期",
            trigger: "change"
          }
        ],
        severTime1: [
          { required: true, message: "请选择服务时间", trigger: "change" }
        ],
        textarea:[{ required: false, message: "请入0-255个字符", trigger: "blur" }]
      },
      ruleForm: {
        name: "",
        phone: "",
        address: "",
        email: "",
        sex: "",
        provinceCode: "",
        cityCode: "",
        areaCode: "",
        areaCodes: [],
        addrLongitude: "",
        addrLatitude: ""
      },
      rulesTest:{
        sumPrice:[
          { required: true,type:'number',validator:checksum, message: "请选择商品",trigger: "change"}
        ],        
        serverPro: [
          { required: true,message: "请选择服务项目", trigger: "change"}
        ]
       
      },
      rules: {
        name: [
          { required: true, message: "请输入客户姓名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        address: [{ required: true, validator: checkAddress, trigger: "blur" }],
        email: [{ required: false, validator: checkEmail, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        areaCodes: [
          {
            type: "array",
            required: true,
            message: "请选择区域",
            trigger: "change"
          }
        ]
      },
      dict: require("../../../static/dict.json"),
      sex: "",
      sexName: "",
      select: "date",
      tabOptions: [], //tabName
      serverOptions: [], //服务类型下拉
      textarea: "", //客户备注
      customName: "李四", //当前客户姓名
      serverAddress: "北京市朝阳区关东街11呼家楼",
      serverStation: "呼家楼服务站",
      dialogTableVisible: false, //选择技师弹窗开关
      dialogTableVisible1: false, //选择客户弹窗开关
      technicianName: "", //技师姓名
      //当前客户
      custom: "",
      customKeyFlag: false, //客户信息展示标志
      customId: "", //客户ID
      areaCode: "",
      middleB: []
    };
  },
  computed: {
    areaOptions: function() {
      return this.$store.state.user.area;
    }
  },
  methods: {
     loadingClick(){
        loading = this.$loading({
          lock: true,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          target: document.querySelector('.el-dialog__body')
        })
    },
    seerchange(val) {
      this.form.serverStation1 = val;
    },
    //存储选择技师对象
    ChangeTech(obj) {
      if (obj.techChecked) {
        this.middleA.push(obj);
      } else {
        for (var a1 = 0; a1 < this.middleA.length; a1++) {
          if (this.middleA[a1].techId == obj.techId) {
            this.middleA.remove(this.middleA[a1]);
          }
        }
      }
    },
    //选中行改变
    rowChange(item) {
      if (item.goodsChecked) {
        this.form1.sumPrice = this.form1.sumPrice + item.payPriceSum * 1;
      } else {
        this.form1.sumPrice = this.form1.sumPrice - item.payPriceSum * 1;
      }
    },
    //计数器改变
    numberChange(item, index) {
      this.$nextTick(() => {
        item.payPriceSum = item.goodsNum * item.payPrice * 1;
      });
      if (item.goodsChecked) {
        this.$nextTick(() => {
          this.form1.sumPrice =
            this.form1.sumPrice +
            item.payPriceSum -
            this.$refs[index][0].innerText;
        });
      } else {
        this.form1.sumPrice = this.form1.sumPrice + 0;
      }
    },
    //居室改变
    roomChange(item, name) {
      var aa=0;
      if(item.houseId != undefined){
          for(var a=0;a<item.houses.length;a++){
            if(item.houses[a].id == item.houseId){
                aa=item.houses[a].payPrice*1*item.houses[a].goodsNum
                item.goodsNum=item.houses[a].goodsNum
            }
          }
          this.$nextTick(() => {
             item.payPriceSum = aa * 1;            
          });
      }
      if (item.goodsChecked) {
        this.$nextTick(() => {
          this.form1.sumPrice =
            this.form1.sumPrice +
            item.payPriceSum -
            this.$refs[name][0].innerText;
        });
      } else {
        this.form1.sumPrice = this.form1.sumPrice + 0;
      }
    },
    //下一步
    next(formName) {
      if (this.active++ >= 3) this.active = 1;
      if(formName == 'form'){
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.serverStation1 != "") {
              this.findItemListFun();
            }else{
              this.active = 1;
              this.$message({
                type: "error",
                message: "请输入客户电话，查询客户"
              });
            }
          } else {
            this.active = 1;
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
      }
      if(formName == 'form1'){             
        var arr=[];
        for(var a=0;a<this.selectCommidty.length;a++){
          if(this.selectCommidty[a].goodsChecked){
             arr.push(this.selectCommidty[a])
          }
        }
        this.middleB=Object.assign([], arr);
        this.findTimeListByTechFun(); 
        this.$refs[formName].validate(valid => {
          if (valid) {
               
          } else {
            this.active = 2;
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

          }
        });
      }
    },
    //上一步
    prev() {
      if (this.active-- <= 1) this.active = 1;
    },
    //获取时间列表
    findTimeListByTechFun() {
      var obj = {
        stationId: this.serverStation1,
        goodsInfoList: this.middleB,
        techList: this.tabOptions
      };
      findTimeListByTech(obj)
        .then(res => {
          if (res.data.code === 1) {
            if (res.data.data != undefined) {
              this.options2 = res.data.data;
              //默认选择当前日期
              if (this.options2 != undefined && this.options2[0] != undefined) {
                this.form2.severTime = this.options2[0].value;
                this.dateChange(this.form2.severTime);
              }
            }
          } else if (res.data.code === 3) {
            this.options2 = [];
            this.$message({
              type: "warning",
              message: res.data.data
            });
          } else {
            this.options2 = [];
          }
        })
        .catch(res => {});
    },
    //客户查询事件
    changeCustom() {
      //根据手机号查询
      if(this.customPhone != ''){
        var obj = { phone: this.customPhone };
        findCustomerByPhone(obj)
          .then(res => {
            if (res.data.code === 1) {
              if (res.data.data != undefined) {
                this.customId = res.data.data.id;
                this.form = res.data.data;
                this.customKeyFlag = true;
              }
            } else if (res.data.code === 3) {
              this.customKeyFlag = false;
              this.$message({
                type: "warning",
                message: res.data.data
              });
            } else {
              this.customKeyFlag = false;
            }
          })
          .catch(res => {});
      }else{
        this.customKeyFlag = false;
        this.$message({
          type: "warning",
          message: '客户电话不能为空！'
        });
      }

    },
    //服务项目下拉获取
    findItemListFun() {
      var obj = {};
      findItemList(obj)
        .then(res => {
          if (res.data.code === 1) {
            this.serverOptions = res.data.data;
          } else if (res.data.code === 3) {
            this.$message({
              type: "warning",
              message: res.data.data
            });
          }
        })
        .catch(res => {});
    },
    //新增客户保存
    submitForm(formName) {
      if (this.$refs.pickerInput.value != "" && this.ruleForm.address != "") {
        // var str1=this.$refs.allDeress.currentLabels;
        // str1=str1.join("");
        this.ruleForm.address =
          this.$refs.pickerInput.value + "-" + this.ruleForm.address;
        var str = this.$refs.pickerInput1.value;
        str = str.split(",");
        //经度
        var lng = str[0];
        this.ruleForm.addrLongitude = lng;
        //纬度
        var lat = str[1];
        this.ruleForm.addrLatitude = lat;
      } else {
        this.$refs.pickerInput.value = "";
        this.ruleForm.address = "";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loadingClick()
          //省、市、区三级ID
          this.ruleForm.provinceCode = this.ruleForm.areaCodes[0];
          this.ruleForm.cityCode = this.ruleForm.areaCodes[1];
          this.ruleForm.areaCode = this.ruleForm.areaCodes[2];
          var obj = this.ruleForm;
          saveCus(obj)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "新增成功!"
                });
                loading.close();
                this.$refs["ruleForm"].resetFields();
                this.$refs.pickerInput.value = "";
                this.$refs.panel.style.display='none';
                this.dialogTableVisible1 = false;
              } else {
                loading.close();
                this.$refs.pickerInput.value = "";
                this.ruleForm.address = "";
              }
            })
            .catch(res => {
              loading.close();
            });
        } else {
          this.$refs.pickerInput.value = "";
          this.ruleForm.address = "";
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
    //新增客户弹窗取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.provinceCode = "";
      this.ruleForm.cityCode = "";
      this.ruleForm.areaCode = "";
      this.ruleForm.sex = "";
      this.$refs.pickerInput.value = "";
      this.$refs.panel.style.display='none';
      this.dialogTableVisible1 = false;
    },
    //获取按客户ID客户数据
    getcustomerList() {
      var coustomerId = this.$route.query.coustomerId;
      if (coustomerId != undefined) {
        this.customId = coustomerId;
        var obj = {
          id: coustomerId
        };
        findCustomerById(obj)
          .then(res => {
            if (res.data.code === 1) {
              if (res.data.data != undefined) {
                this.form = res.data.data;
                this.customPhone=res.data.data.phone
                this.customKeyFlag = true;
              }
            } else if (res.data.code === 3) {
              this.customKeyFlag = false;
              this.$message({
                type: "warning",
                message: res.data.data
              });
            } else {
              this.customKeyFlag = false;
            }
          })
          .catch(res => {});
      }
    },
    //新增按钮
    addcustomer() {
      this.showDis = true;
      this.dialogTableVisible1 = true;
      this.ruleForm.provinceCode = "";
      this.ruleForm.cityCode = "";
      this.ruleForm.areaCode = "";
      this.ruleForm.sex = "";
    },
    //地址变化时开始POI搜索
    testFun(value) {      
      this.$nextTick(() => {
        this.$refs.pickerInput.value = "";
        this.$refs.panel.style.display='none';
        this.test(value[2]);
      });
    },
    //服务类型下拉改变
    serverchange(value) {
      this.form1.sumPrice = 0;
      var obj = { itemId: value };
      findGoodsListByItem(obj)
        .then(res => {
          if (res.data.code === 1) {            
            if (res.data.data != undefined) {
              this.selectCommidty = res.data.data;             
              if (this.middleB.length != 0) {
                for (var d = 0; d < this.selectCommidty.length; d++) {
                  for (var a = 0; a < this.middleB.length; a++) {
                    if (
                      this.middleB[a].goodsId == this.selectCommidty[d].goodsId
                    ) {
                      this.selectCommidty[d] = this.middleB[a];
                    }
                  }
                }
              }
            } else {
              this.selectCommidty = [];
              this.form1.sumPrice = 0;
            }
          } else if (res.data.code === 3) {
            this.selectCommidty = [];
            this.form1.sumPrice = 0;
            this.$message({
              type: "warning",
              message: res.data.data
            });
          } else {
            this.selectCommidty = [];
            this.form1.sumPrice = 0;
          }
        })
        .catch(res => {});
    },
    //技师选择按钮点击
    technicianSel() {
      var obj = {
        stationId: this.serverStation1,
        goodsInfoList: this.middleB
      };
      findTechListByGoods(obj)
        .then(res => {
          if (res.data.code === 1) {
            this.dialogTableVisible = true;
            if (res.data.data != undefined) {
              this.listTech = res.data.data;           
              if (this.middleA.length != 0) {
                for (var a = 0; a < this.listTech.length; a++) {
                  this.listTech[a].techChecked = false;
                  for (var b = 0; b < this.middleA.length; b++) {
                    if (this.middleA[b].techId == this.listTech[a].techId) {
                      this.listTech[a].techChecked = true;
                    }
                  }
                }
              }else{
                for (var a1 = 0; a1 < this.listTech.length; a1++) {
                      this.listTech[a1].techChecked = false;
                }
              }
            }else{
              this.listTech=[];
            }
          } else if (res.data.code === 3) {
            this.$message({
              type: "warning",
              message: res.data.data
            });
          }
        })
        .catch(res => {});
    },
    //选择技师弹出层保存
    submitForm2() {
      //先遍历数据中选中的再保存
      this.techName='';
      var arr = [];
      if (this.middleA.length !=0) {
        for (let a = 0; a < this.middleA.length; a++) {
          if (this.middleA[a].techChecked == true) {
            arr.push(this.middleA[a]);
          }
        }
      }
      this.tabOptions = arr;
      if(this.middleA.length != 0){
          this.form2.selectTech=this.middleA[0].techId;
      }else{
        this.form2.selectTech='';
      }
      this.findTimeListByTechFun();
      this.dialogTableVisible = false;
    },
    //选择技师弹窗取消
    cancelForm2() {
      this.techName = "";
      this.middleA = Object.assign([], this.tabOptions);
      for (var a = 0; a < this.listTech.length; a++) {
        this.listTech[a].techChecked = false;
      }
      this.dialogTableVisible = false;
    },
    //叉号点击关闭TAB
    errorClose(obj) {
      if (this.tabOptions != undefined && this.tabOptions.length != 0) {
        for (var a = 0; a < this.listTech.length; a++) {
          if (obj.techId == this.listTech[a].techId) {
            this.listTech[a].techChecked = false;
          }
        }
        for (var b = 0; b < this.middleA.length; b++) {
          if (obj.techId == this.middleA[b].techId) {
            this.middleA.remove(this.middleA[b]);
          }
        }       
        this.tabOptions.remove(obj);
        if(this.middleA.length != 0){
           this.form2.selectTech=this.middleA[0].techId;
        }else{
          this.form2.selectTech='';
        }
        
      }
    },
    //确认下单按钮点击
    confirmOrder(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var time = "";
          for (var a = 0; a < this.timeObj.length; a++) {
            if (this.timeObj[a].selected == true) {
              time = this.timeObj[a].serviceTimeStr;
            }
          }
          if(time == ''){
            this.form2.severTime1 = '';
          }else{
              var obj = {
                customerId: this.customId, //客户ID
                serviceTime: this.changTime + " " + time + ":00", //服务时间
                customerRemark: this.form2.textarea, //备注
                techList: this.tabOptions, //技师对象
                goodsInfoList: this.middleB, //商品对象
                stationId: this.serverStation1
              };          
              createOrder(obj)
                .then(res => {
                  if (res.data.code === 1) {
                    this.$router.push({ path: "/clean/ordermanage" }); //跳转到订单管理
                    this.$message({
                      type: "success",
                      message: "新增成功!"
                    });                
                  } else if (res.data.code === 3) {
                    this.$message({
                      type: "warning",
                      message: res.data.data
                    });
                  }
                })
                .catch(res => {});            

          }

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
         
        }
      });
    },
    //POI搜索功能调起
    test(value) {
      this.showDis = false;
      var that = this;
      var inputname = this.$refs.pickerInput;
      var inputname1 = this.$refs.pickerInput1;
      //实例化PlaceSearch
      var placeSearch= new AMap.PlaceSearch({
        pageSize: 50,//每页显示多少行
        pageIndex: 1,//显示的下标从那个开始
        //type:'商务住宅|商务办公',//类别，可以以|后面加其他类
        city: value, //城市
        map: that.mymap,
        citylimit: true,
        renderStyle:'default',
        panel: that.$refs.panel//服务显示的面板
      });
      AMap.service('AMap.PlaceSearch',function(){//回调函数 
        placeSearch.clear();       
        var text=that.$refs.pickerInput          
            text.addEventListener("keyup",function(e) {
              placeSearch.setCity(value)
              placeSearch.search(text.value)
              that.$refs.panel.style.display='block';
            });          
      })	  
      AMap.event.addListener(placeSearch, 'selectChanged', function(results) {
      //获取当前选中的结果数据
      var poi = results.selected.data;
           that.$refs.panel.style.display='none';
       var info = {
        id: poi.id,
        name: poi.name,
        location: poi.location.toString(),
        address: poi.address
        };
        var text=that.$refs.pickerInput
        text.value=poi.pname+poi.cityname+poi.adname+info.name;
      });			
    },
    //日期变化时改变时间对象
    dateChange(val) {
      this.form2.severTime = val;
      var that = this;
      if(this.form2.severTime == ''){
          this.timeObj=[];
      }else{

          for (var b = 0; b < this.options2.length; b++) {
            if (val == this.options2[b].value) {
              if (this.options2[b].serviceTime != undefined) {
                this.timeObj = this.options2[b].serviceTime;
              }
              if (this.options2[b].label != undefined) {
                this.changTime = this.options2[b].label;
              }
            }
          }
      }

      if (this.timeObj != undefined && this.timeObj.length != 0) {
        //样式复位
        this.$nextTick(() => {
          for (var a = 0; a < this.timeObj.length; a++) {
            that.$set(this.timeObj[a], "selected", false);
            that.$refs.TimeWrap[a].style.borderColor = "#fff";
            that.$refs.TimeWrap[a].style.color = "#000";
            that.$refs.TimeWrap[a].style.border = "1px solid #bfcbd9";
            that.$refs.TimeWrap[a].className = "selfSeverTimeSt";
          }
        });
      }
    },
    timeChange(index, obj) {
      for (var a = 0; a < this.timeObj.length; a++) {
        this.$set(this.timeObj[a], "selected", false);
        if (a == index) {
          this.$refs.TimeWrap[a].style.borderColor = "#4c70e8";
          this.$refs.TimeWrap[a].style.color = "#4c70e8";
          this.$refs.TimeWrap[a].className = "selfSeverTimeSt mark";
          this.timeObj[a].selected = !this.timeObj[a].selected;
          this.form2.severTime1 = this.timeObj[a].serviceTimeStr;
        } else {
          this.$refs.TimeWrap[a].style.borderColor = "#fff";
          this.$refs.TimeWrap[a].style.color = "#000";
          this.$refs.TimeWrap[a].style.border = "1px solid #bfcbd9";
          this.$refs.TimeWrap[a].className = "selfSeverTimeSt";
        }
      }
    },
    //选择技师弹出层查询按钮
    searchTeh() {
      var obj = {
        techName: this.techName,
        stationId: this.serverStation1,
        goodsInfoList: this.middleB
      };
      //服务技师获取
      findTechListByGoods(obj)
        .then(res => {
          if (res.data.code === 1) {
            if (res.data.data != undefined) {
               this.listTech=res.data.data;
            }else{
               this.listTech=[];
            }           
            for (var b = 0; b < this.middleA.length; b++) {
              for (var a = 0; a < this.listTech.length; a++) {
                if (this.listTech[a].techId == this.middleA[b].techId) {
                  this.listTech[a].techChecked = true;
                }
              }
            }
          } else if (res.data.code === 3) {
            this.$message({
              type: "warning",
              message: res.data.data
            });
          }
        })
        .catch(res => {});
    },
    //地图初始化
    initMap1() {
      var id = this.$refs.gdMap;
      var map = new AMap.Map(id, {
        zoom: 10
      });
      this.mymap = map;
    }
  },
  mounted() {
    this.initMap1();
    this.getcustomerList();
    this.sex = this.dict.sex;
  }
};
</script>
<style  lang="scss" scoped>
.selfAddressGao1{
   width:400px;max-height:290px;overflow:hidden;border-right:1px solid #ccc;border-bottom:1px solid #ccc;
}
.selfpanel1{
  width:418px;max-height:290px;overflow-y:scroll
}
.selfTabProm {
  width: 100%;
  text-align: center;
  height: 200px;
  line-height: 200px;
}
.selfLabelStyle {
  display: inline-block;
  position: absolute;
  left: -100px;
  color: red;
}
.dispatchTechNameSearch {
  width: 180px;
  margin-left: 15px;
}
.width120 {
  width: 120px;
}
.paddingTop60 {
  padding-top: 60px;
}
.marginRight15 {
  margin-right: 15px;
}
.dispatchTechNameSearch {
  width: 180px;
  margin-left: 15px;
}
.dispatchMangFooter {
  margin-top: 20px;
  padding-bottom: 0px;
}
.mark {
  background: url(../../../static/icon/Selected.png) right bottom no-repeat;
  background-size: 20px 20px;
}
.marginTopDec10 {
  margin-top: -40px;
  max-width: 400px;
}
.selfSeverTimeSt {
  width: 80px;
  height: 34px;
  line-height: 34px;
  border: 1px solid #bfcbd9;
  display: inline-block;
  text-align: center;
  position: relative;
  margin-right: 20px;
  margin-top: 10px;
  font-size: 14px;
  cursor: pointer;
}
.addorderStepWrap {
  width: 100%;
  background: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
}
.techNameStyle {
  width: 80px;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.stepControl {
  width: 100%;
  padding-left: 30px;
}
.stepContentWrap {
  width: 100%;
  padding-left: 30px;
  margin-top: 50px;
  padding-bottom: 50px;
}
.stepContent {
  width: 100%;
}
.customSelName {
  width: 280px;
  margin-right: 20px;
}
.fontSize12 {
  font-size: 12px;
}
.width280 {
  width: 280px;
}
.changeAddressBut {
  margin-left: 30px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #4c70e8;
  text-align: center;
  font-size: 12px;
  width: 80px;
  color: #4c70e8;
}
.stepThreeBut {
  width: 200px;
  height: 34px;
  line-height: 34px;
  margin-left: 0px;
  display: inline-block;
}
.stepThreeSelfTop {
  margin-top: 20px;
  margin-left: -46px;
}
.selfPromInfStyle {
  display: inline-block;
  heihgt: 30px;
  line-height: 30px;
  margin-left: 30px;
  color: #8391a5;
  font-size: 12px;
}
.severChangeStyle {
  width: 400px;
  margin-right: 20px;
}
.selectTechHL {
  float: left;
  width: 120px;
}
.selectTechHR {
  float: left;
  margin-left: 10px;
}
.width120 {
  width: 120px;
}
.width400 {
  width: 400px;
}
.width200 {
  width: 200px;
}
.selfAddressStyle {
  margin-left: -5px;
  width: 200px;
}
.marginLeft10 {
  margin-left: 10px;
}
.marginLeft16 {
  margin-left: 16px;
}
.NextPrevWrap {
  position: absolute;
  left: 55%;
  bottom: 20px;
}
.NextPrevStyle {
  display: inline-block;
  line-height: 30px;
}
.selfEmailStyle {
  margin-left: -10px;
  width: 400px;
}
.selfPromINF {
  font-size: 12px;
  margin-top: 10px;
  color: red;
}
.FloatRight {
  float: right;
}
.roomTypeStyle {
  width: 120px;
  margin-top: 3px;
  margin-bottom: 3px;
}
.selfINputNumStyle {
  width: 120px;
  margin-top: 3px;
  margin-bottom: 3px;
}
.NumberINputStyle {
  width: 120px;
  margin-top: 3px;
  margin-bottom: 3px;
}
.height30 {
  height: 30px;
}
.height110 {
  height: 110px;
}
.userHeaderStyle {
  width: 85px;
  height: 90px;
  line-height: 90px;
  border: 1px solid #ccc;
}

.selftSerchBut {
  width: 80px;
  height: 34px;
  line-height: 34px;
  cursor: pointer;
  border: 1px solid #4c70e8;
  text-align: center;
  display: inline-block;
  color: #4c70e8;
}
.selfTable,
.selfTable tr th,
.selfTable tr td {
  border: 1px solid #eee;
}
.selfTable {
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
  padding: 2px;
}
.tabWrap {
  width: 100px;
  margin-right: 20px;
  margin-top:5px;
  margin-bottom:5px;
  font-size: 12px;
  display: inline-block;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 12px;
  border: 1px solid #bfcbd9;
  position: relative;
}
.closePic {
  cursor: pointer;
  color: #bfcbd9;
  font-size: 12px;
  position: absolute;
  margin-left: 80px;
  margin-top: -25px;
}
.addorder-container {
  width: 100%;
  float: left;
  // background: #eef1f6;
  background: #fff;
  min-height: 500px;
}
.custom-action {
  margin-left: 30px;
  margin-right: 48px;
  font-size: 12px;
}

.second-bar {
  padding-top: 20px;
  padding-bottom: 20px;
  background: #eef1f6;
  margin-left: 20px;
  margin-right: 20px;
}
.thrid-bar {
  padding-top: 20px;
  background: #eef1f6;
  margin-left: 20px;
  margin-right: 20px;
  height: 500px;
  margin-top: 120px;
}
.order-inf {
  padding-top: 20px;
  background: #fff;
  margin-top: 20px;
}
.custom-inf {
  width: 49%;
  background: #fff;
  float: left;
  height: 160px;
  padding-top: 20px;
  padding-bottom: 20px;
  color: #000;
}
.sever-inf {
  margin-left: 2%;
  width: 49%;
  background: #fff;
  float: left;
  height: 160px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.customNamevalue {
  width: 100%;
  margin-left: -12px;
  font-size: 12px;
}
.changeserver {
  width: 100%;
  height: 110px;
  margin-left: 30px;
  margin-top: 10px;
}
.mapWrap {
  width: 0px;
  height: 0px;
  display: block;
}
.pickerInput {
  width: 200px;
  height: 36px;
  font-size: 12px;
  padding: 0 10px;
  border: none;
  border: 1px solid #bfcbd9;
  outline: none;
}
.pickerInput:hover {
  border-color: #8391a5;
}
.amap-ui-poi-picker-sugg {
  width: 180px;
  overflow: hidden;
}
.amap-ui-poi-picker-sugg-list {
  width: 180px;
}
.sugg-item {
  width: 180px !important;
}
.FloatRight {
  float: right;
}
.selfpromMessageTab {
  position: relative;
  width: 100%;
  margin-top: 20px;
  margin-left: 10px;
}
.techNameStyle {
  width: 80px;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tabWrap1 {
  width: 80px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 5px;
  font-size: 12px;
  display: inline-block;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 12px;
  border: 1px solid #bfcbd9;
  position: relative;
}
.selfTableWrapONE {
  margin-top: 20px;
  overflow: hidden;
  width: 660px;
  height: 280px;
  position: relative;
}
.table-d {
  width: 677px;
  overflow-y: scroll;
  height: 276px;
  margin-left: 15px;
}
.table-d1 {
  width: 750px;
}
.selfTable,
.selfTable tr th,
.selfTable tr td {
  border: 1px solid #eee;
}
.selfTable {
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
  padding: 2px;
}
.height70 {
  height: 70px;
}
.imgStyle {
  display: block;
}
.selfTableHEADTD {
  background: #eef1f6;
  height: 60px;
  border: none !important;
}
.tableHeader {
  position: absolute;
  z-index: 99999;
  top: 0px;
}
.selfTdStyle1 {
  vertical-align: middle;
  height: 70px;
  line-height: 70px;
}
</style>