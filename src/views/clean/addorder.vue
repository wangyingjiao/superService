<template>
    <div class="addorder-container">
		<div class="addorderStepWrap">
			<!--步骤条开始-->
			<div class="stepControl">				
				<el-steps :space="300" :active="active"  align-center >
					<el-step title="选择客户"></el-step>
					<el-step title="服务信息"></el-step>
					<el-step title="选择技师"></el-step>
					<el-step title="服务时间"></el-step>
				</el-steps>
			</div>
			<!--步骤条结束-->
			<!--步骤显示区域开始-->
			<div class="stepContentWrap">
				<!--步骤1显示区域开始-->
				<div class="stepContent"  v-if="active == 1">
					<el-form ref="form" :model="form" label-width="100px" label-position="left">
						<el-form-item label="选择客户:" prop="custom">
							<el-select  clearable class="customSelName"  v-model="custom" placeholder="请选择" @change="changeCustom">
								<el-option v-for="item in customOptions" :key="item.key" :label="item.customName" :value="item.key">
								</el-option>
							</el-select>
							<div  class="selftSerchBut"  @click="addcustomer">新增</div>
						</el-form-item>
						<div v-if="customKeyFlag">
							<el-form-item label="客户姓名:" prop="customName">
								<span class="fontSize12">{{form.customName}}</span>
							</el-form-item>
							<el-form-item label="客户电话:"    prop="phone">
								{{form.phone}}
							</el-form-item>
							<el-form-item label="服务地址:" prop="serverAddress">
								{{form.serverAddress}}
							</el-form-item>
							<el-form-item label="所属服务站:" prop="serverStation">
								<span class="fontSize12">{{form.serverStation}}</span>
							</el-form-item>	
						</div>																										
					</el-form>						
				</div>
				<!--步骤1显示区域结束-->
				<!--步骤2显示区域开始-->
				<div class="stepContent"  v-if="active == 2">
					<el-form ref="form1" :model="form1" label-width="100px" label-position="left">
						<el-form-item label="服务项目:" prop="serverPro" required>
							<el-select clearable  class="severChangeStyle" v-model="form1.serverPro" placeholder="请选择" @change="serverchange">
								<el-option v-for="item in serverOptions" :key="item.key" :label="item.serverName" :value="item.key">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="选择商品:" prop="serverPro" required>
							<div class="table-d">
								<table width="80%" class="selfTable">
									<tr>
										<td  class="selfTableHEADTD" align="center" width="8%">选择</td>
										<td  class="selfTableHEADTD" align="center" width="28%">商品名称</td>
										<td  class="selfTableHEADTD" align="center" width="28%">单价</td>
										<td  class="selfTableHEADTD" align="center" width="10%">起购数</td>
										<td  class="selfTableHEADTD" align="center" width="26%">数量</td>							
									</tr>
									<tr v-for="item in selectCommidty" :key="item.id" >
										<td  align="center"><el-checkbox  @change="rowChange(item)" v-model="item.checkAll"></el-checkbox></td>
										<td  align="center">
											<span v-if="item.type=='1' || item.type=='2'">{{item.name}}</span>
											<span v-if="item.type=='3'">
												<el-select  class="roomTypeStyle"  @change="roomChange(item,item.roomId)" v-model="item.roomId" placeholder="请选择">
													<el-option v-for="room in item.roomType" :key="room.key" :label="room.roomName" :value="room.key">
													</el-option>
												</el-select>
											</span>
										</td>
										<td  align="center">
											<span v-if="item.type=='1' || item.type=='2'">{{item.pirce}}</span>
											<span v-if="item.type=='3'">
												<span v-if="item.roomId =='1'">{{item.testprice[item.roomId-1].pirce}}</span>
												<span v-if="item.roomId =='2'">{{item.testprice[item.roomId-1].pirce}}</span>
												<span v-if="item.roomId =='3'">{{item.testprice[item.roomId-1].pirce}}</span>
											</span>
										</td>
										<td  align="center">{{item.payNum}}</td>
										<td class="height30" align="center">
											<span v-if="item.type=='1'"><el-input-number class="selfINputNumStyle" @change="numberChange(item)" v-model="item.number" :min="parseInt(item.payNum)"></el-input-number></span>
											<span v-if="item.type=='2'"><el-input  class="NumberINputStyle"  @change="inputChange(item)" placeholder="" v-model="item.number"></el-input></span>
											<span v-if="item.type=='3'">{{item.number}}</span>											
										</td>							
									</tr>
								</table>
							</div>   																																
						</el-form-item>
						<el-form-item label="总价:" prop="sumPrice" required>
							<span>{{form1.sumPrice}}元</span>
						</el-form-item>																																														
					</el-form>
				</div>
				<!--步骤2显示区域结束-->
				<!--步骤3显示区域开始-->
				<div class="stepContent" v-if="active == 3">
					<el-form ref="form2" :model="form2" label-width="100px" label-position="left">
						<el-form-item label="技师:" prop="" required>
							<span  class="button-cancel stepThreeBut" @click="technicianSel">+选择技师</span><span class="selfPromInfStyle">* 若不选择技师，则为系统自动分配</span>
							<div class="custom-action stepThreeSelfTop">
								<div class="customNamevalue">
									<div class="tabWrap" v-for="item in tabOptions" :key="item.techId">
										<div class="techNameStyle">{{item.techName}}</div>
										<div class="closePic" @click="errorClose(item)">&#10005</div>
									</div> 					
								</div>
							</div>																	
						</el-form-item>																																													
					</el-form>
				</div>
				<!--步骤3显示区域结束-->
				<!--步骤4显示区域开始-->
				<div class="stepContent" v-if="active == 4">
					<el-form ref="form3" :model="form3" label-width="100px" label-position="left">
						<el-form-item label="选择日期:" prop="severTime" required>
							<el-date-picker
								v-model="severTime"                      
								placeholder="年-月-日"                     
								:type="select"
								 class="width400 marginLeft20"
								 @change='dateChange'
								:picker-options="pickerOptions0"
								>
							</el-date-picker>							
						</el-form-item>
						<el-form-item label="选择时间:" prop="severTime1" required>
							<div class="marginTopDec10">
							   <div class="selfSeverTimeSt" ref="TimeWrap" v-for="(value,index,key) in 20" :key="index" @click="timeChange(index)">08:30</div>
							</div>														
						</el-form-item>									
						<el-form-item label="客户备注:" prop="textarea" class="marginLeft10 fontSize12">
							<el-input
								type="textarea"
								:rows="3"
								placeholder="请输入内容"
								v-model="textarea"
								class="width400  marginLeft10"
								>
							</el-input>						
						</el-form-item>	
					</el-form>
				</div>
				<!--步骤4显示区域结束-->
			</div>
			<!--步骤显示区域结束-->
			<!--上、下步按钮开始-->
			<div class="NextPrevWrap">
				<span class="button-large NextPrevStyle"  v-if="active == 2 || active == 3 || active == 4" @click="prev">上一步</span>
				<span class="button-large NextPrevStyle"  v-if="active == 1 || active == 2|| active == 3"  @click="next">下一步</span>					
				<span class="button-large NextPrevStyle"  v-if="active == 4" @click="confirmOrder">保存</span>		
			</div>
			<!--上、下步按钮结束-->
	</div>
	<!--新增客户弹窗开始-->
	<el-dialog title="新增客户" :visible.sync="dialogTableVisible1" :show-close="false">	
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
					:show-all-levels="true"
					@change="testFun"
					v-model="ruleForm.areaCodes"
					class="width400" 
				></el-cascader>								
			</el-form-item>
			<el-form-item label="详细地址:" prop="address">
				<input class="pickerInput" ref="pickerInput"  value='' placeholder="输入关键字选取地点">
				<input type="hidden" class="pickerInput" ref="pickerInput1"  value='' placeholder="输入关键字选取地点">
				<el-input class="selfAddressStyle"  v-model.trim="ruleForm.address" placeholder="输入详细地址"></el-input>		
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
	<el-dialog title="选择技师" :visible.sync="dialogTableVisible">
		<div class="selectTechHL">
		<el-input placeholder="输入要搜索的姓名" v-model="techName" class="width120"></el-input>                
		</div>
		<div  class="selectTechHR">
		<el-select clearable placeholder="请选择服务站" v-model="techStationId">
			<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
			</el-option>
		</el-select>
		<span v-show="promShow1" class="selfPromINF">{{promInf1}}</span>
		</div>
		<div class="FloatRight"><button class="button-large" @click="searchTeh">查询</button></div> 	
		<div class="selfTableWrapONE">
			<div class="table-d">
				<table width="100%" class="selfTable">
				<tr>
					<td  class="selfTableHEADTD" align="center" width="8%">选择</td>
					<td  class="selfTableHEADTD" align="center" width="28%">头像</td>
					<td  class="selfTableHEADTD" align="center" width="28%">姓名</td>
					<td  class="selfTableHEADTD" align="center" width="10%">性别</td>
					<td  class="selfTableHEADTD" align="center" width="26%">服务站</td>							
				</tr>
				<tr v-for="item in listTech" :key="item.techId"  ref="tableItem1">
					<td  align="center"><el-checkbox  v-model="item.techChecked"></el-checkbox></td>
					<td  class="height110" align="center"><img class="imgStyle" :src="item.headPic+'?x-oss-process=image/resize,m_fill,h_100,w_100'"/></td>
					<td  align="center">{{item.techName}}</td>
					<td  align="center">
					<span v-if="item.techSex =='male'">男</span>
					<span v-if="item.techSex =='female'">女</span>									
					</td>
					<td  align="center">{{item.techStationName}}</td>							
				</tr>
				</table>
			</div>            
		</div> 	  	  
		<div slot="footer" class="dialog-footer" style="text-align:center">
			<button class="button-large" @click="submitForm2()">确 定</button>
			<button class="button-cancel" @click="dialogTableVisible = false">取 消</button>
		</div>
	</el-dialog>
	<!--技师选择弹窗结束-->
	<div ref="gdMap" class="mapWrap"></div>
  </div>
</template>

<script>
  import {
    orderServer
  } from '@/api/skill'
  import { 
	saveCus     //保存客户（新增）
	} from "@/api/customer";
export default {
  name: "",
  data() {
	var checkPhone = (rule, value, callback) => {
			if (!value) {
			  return callback(new Error('电话号码不能为空'));
			}else{
				if (!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value))) {
				  callback(new Error('电话号码不正确！请重新填写'));
				} else {
				  callback();
				}
			}
	};
	var checkEmail = (rule, value, callback) => {
			if (!value) {
				callback();
			}else{
				if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value))) {
					callback(new Error('请输入正确的邮箱'));
				} else {
					callback();
				}
			}			
	};
	var checkAddress = (rule, value, callback) => {			  
			if (!value) {
		        callback(new Error('请选取地点,并填写详细地址'));
			}else{
				if(value.length>=1 && value.length<=100){
						callback()
				}else{
					callback(new Error('请输入1-100位详细地址'));
				}
			}			
	};		  
    return {
		form2:{},
		btnShow: JSON.parse(localStorage.getItem('btn')),
		//服务站下拉选项
		options:[],
		techName:'',
		techStationId:'',
		promShow1:false, 
		promInf1:'搜索内容不存在!',
        pickerOptions0: {
          disabledDate(time) {
			  if(time.getTime() >Date.now()-8.64e7  && time.getTime() <Date.now() +8.64e7*14){
                  return false;
			  }else{
				  return true;
			  }
           
          }
		},
		//弹窗表格数据
		listTech:[],
		selectCommidty:[	
			{
			  id:'1',
			  checkAll:false,
			  name:'大型灯',
			  type:'1',
			  pirce:'26',
			  payNum:'2',
			  number:2
			},
			{
			  id:'5',
			  checkAll:false,
			  name:'小型灯',
			  type:'1',
			  pirce:'13',
			  payNum:'2',
			  number:2
			},			
			{
			  id:'4',
			  checkAll:false,
			  roomId:'1',
			  testprice:[
				  {pirce:26},
				  {pirce:52},
				  {pirce:78},
			  ],
			  roomType:[
				{ key: "1", roomName: "一居室"},
				{ key: "2", roomName: "二居室"},
				{ key: "3", roomName: "三居室"}
			  ],
			  type:'3',
			  pirce:'26',
			  payNum:'2',
			  number:1
			},			
			{
			  id:'2',
			  checkAll:false,
			  name:'面积（平米)',
			  type:'2',
			  pirce:'26',
			  payNum:'2',
			  number:3
			},
			{
			  id:'3',
			  checkAll:false,
			  roomId:'2',
			  testprice:[
				  {pirce:26},
				  {pirce:52},
				  {pirce:78},
			  ],
			  roomType:[
				{ key: "1", roomName: "一居室"},
				{ key: "2", roomName: "二居室"},
				{ key: "3", roomName: "三居室"}
			  ],
			  type:'3',
			  pirce:'26',
			  payNum:'2',
			  number:1
			}						
		],		
		form: {
		  custom:'',
          phone: '13800138000',
		  customName:"李四",
		  serverAddress:'北京市朝阳区关东街11呼家楼',
		  serverStation:'呼家楼服务站',		  
		},
		form1: {
		  serverPro:'',
          sumPrice:0,
		},
		form3:{
			date:'',
		},	
		active: 1,
        rules2: {
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ]
        },
        ruleForm: {
			name:'',
			phone:'',
			address:'',
			email:'',
			sex:'',
			provinceCode:'',
			cityCode:'',
			areaCode:'',
			areaCodes:[],
			addrLongitude:'',
			addrLatitude:'',
		},
        rules: {
          name: [
            { required: true, message: '请输入客户姓名', trigger: 'blur' },
            { min:2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true,validator: checkPhone, trigger: 'blur' }
										
          ],
          address: [
            { required: true,validator:checkAddress, trigger: 'blur' },
			],
			email:[
				{ required: false, validator: checkEmail, trigger: 'blur' }
			],
			sex: [
				{ required: true, message: '请选择性别', trigger: 'change' }
			],
			areaCodes:[
					{type:'array', required: true, message: '请选择区域', trigger: 'change' }
			]					
        },
		dict:require("../../../static/dict.json"),
		sex:'',
		sexName:'',								
		select:'date',
		//tabName
		tabOptions:[],
		//服务类型下拉
		serverOptions:[
			{ key: "1", serverName: "平米保洁" },
			{ key: "2", serverName: "灯具清洁" },
			{ key: "3", serverName: "居室保洁" }
		],		
		//客户下拉选项
		customOptions:[
			{ key: "1", customName: "张三" },
			{ key: "2", customName: "李四" }
		],
		//客户备注
        textarea:'',				
		//服务时间
		severTime:'',
		severTime1:'',		
		//当前电话
		customPhone:13821209999,
		//当前客户姓名		
		customName:"李四",
		serverAddress:'北京市朝阳区关东街11呼家楼',
		serverStation:'呼家楼服务站',
		dialogTableVisible:false,//选择技师弹窗开关
		dialogTableVisible1:false,//选择客户弹窗开关
		serverType:2,//服务类型
		technicianName:'',//技师姓名
		//当前客户
		custom:"",		
		customKeyFlag:false,
		sum1:null,		
    };
  },
  computed: {
    areaOptions: function () {
      return this.$store.state.user.area
    }
  },
  methods:{
	//选中行改变
	rowChange(item){
       this.sum(item)
	},
	//计数器改变
	numberChange(item){
	  if(item.checkAll){
        this.sum(item)
	  }
       
	},
	//居室改变
	roomChange(item,roomId){
		if(item.checkAll){
			this.sum1=this.sum1+item.testprice[item.roomId].pirce
			this.sum(item)
			
		}
	},
	//计算总价
	sum(item){
		if(item.pirce != undefined){
             this.sum1=this.sum1+item.pirce*item.number;	
		}	    		
		console.log(this.sum1)
		this.form1.sumPrice=this.sum1
	},
	//按面积数量变化
	inputChange(item){
      if(item.checkAll){
        this.sum(item)
	  }
	},
	//下一步
	next(){
		if (this.active++ >= 4) this.active = 1;
		
	},
	//上一步
	prev(){
		if (this.active-- <= 1) this.active = 1;	   
	},
	//客户改变事件
	changeCustom(value){
		console.log(value)
		if(value != ''){
			this.customKeyFlag=true;
		}else{
			this.customKeyFlag=false;
		}
		if(value == '1'){
			this.form.customName='张三'
		}else{
			this.form.customName='李四'
		}
		
	},
	//新增客户保存				
	submitForm(formName) {
		if(this.$refs.pickerInput.value !='' && this.ruleForm.address !=''){						 
			this.ruleForm.address=this.$refs.pickerInput.value+this.ruleForm.address;
			var str=this.$refs.pickerInput1.value;
			str=str.split(',')
			//经度
			var lng=str[0];
			this.ruleForm.addrLongitude=lng;
			//纬度
			var lat=str[1];
			this.ruleForm.addrLatitude=lat;
		}else{
			this.$refs.pickerInput.value='';
			this.ruleForm.address='';
		}			   
		this.$refs[formName].validate((valid) => {
			if (valid) {
				//省、市、区三级ID	
				this.ruleForm.provinceCode=this.ruleForm.areaCodes[0];
				this.ruleForm.cityCode=this.ruleForm.areaCodes[1];
				this.ruleForm.areaCode=this.ruleForm.areaCodes[2];
				var obj = this.ruleForm;
				saveCus(obj).then(res => {
					if(res.data.code === 1){
						this.$message({
							type: 'success',
							message: '新增成功!'
						});
						this.$refs['ruleForm'].resetFields();
						this.$refs.pickerInput.value=''	
						this.dialogTableVisible1 = false;
					}else{
						this.$message({
							type: 'warning',
							message: res.data.data
						});
						this.$refs.pickerInput.value=''
						this.ruleForm.address=''
					}													
				}).catch(res=>{
					
				});							
			} else {
				this.$refs.pickerInput.value='';
				this.ruleForm.address='';            
				return false;
			}
		});	
								
	},
	//新增客户弹窗取消
	resetForm(formName) {
		this.$refs[formName].resetFields();
		this.ruleForm.provinceCode='';
		this.ruleForm.cityCode='';
		this.ruleForm.areaCode='';
		this.ruleForm.sex='';
		this.$refs.pickerInput.value='';	
		this.dialogTableVisible1 = false;
	},								
	//获取客户数据
	getcustomerList(){
		var obj = {
			id:this.$route.query.coustomerId
		}
	}, 
    //新增按钮
    addcustomer() {
		this.dialogTableVisible1=true;					
		this.ruleForm.provinceCode='';
		this.ruleForm.cityCode='';
		this.ruleForm.areaCode='';
		this.ruleForm.sex='';							
	},
	//地址变化时开始POI搜索
	testFun(value){
		this.$nextTick(() => {
			this.test(value[1]);
		})	
	},	
	//服务类型下拉改变
	serverchange(value){
	   //this.serverType=value;
	},
	//技师数据回显二级选中
	selectionreturn1(){
		if(this.tabOptions.length != 'undefined'){
			for(let a=0;a<this.listTech.length;a++){
				for(let b=0;b<this.tabOptions.length;b++){
					if(this.tabOptions[b].techId == this.listTech[a].techId){
					this.listTech[a].techChecked=true;
					}
				}
			}
		}                                        
	}, 	
	//技师选择按钮点击
	technicianSel(){
		var obj={};             
		orderServer(obj).then(res => {      
			if (res.data.code === 1) {                         
				this.options=res.data.data.stations 
				this.listTech=res.data.data.techs 
				this.dialogTableVisible=true;
				this.selectionreturn1();                                                          
			}else{

			}          
		}).catch(res=>{
			
		});		
	},
	//选择技师弹出层保存
	submitForm2() {
		//先遍历数据中选中的再保存
		var arr=[];
		if(this.listTech.length){
			for(let a=0;a<this.listTech.length;a++){
				if(this.listTech[a].techChecked == true){
					arr.push(this.listTech[a]);
				}
			}
		}
		this.tabOptions=arr
		this.dialogTableVisible = false	
	},	
    //叉号点击关闭TAB
    errorClose(obj,index){
		if(this.tabOptions.length){
			for(let a=0 ;a<this.listTech.length;a++){
				if(obj.techId ==this.listTech[a].techId ){
					this.listTech[a].techChecked=false
				}
			}                                       
			this.tabOptions.remove(obj);
		}  
	},
	//确认下单按钮点击
	confirmOrder(){
	},
	//POI搜索功能调起
	test(area){
		var that=this;
		var inputname=this.$refs.pickerInput;
		var inputname1=this.$refs.pickerInput1;
		AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
			var obj={
				city:area,
				input:inputname,
			}							                        
			var poiPicker = new PoiPicker(obj);	
				poiPicker.onCityReady(function() {
					poiPicker.searchByKeyword(inputname.value);
					poiPicker.clearSearchResults()
					poiPicker.clearSuggest()	
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
			poiPicker.on('poiPicked', function(poiResult) {
				var source = poiResult.source,
				poi = poiResult.item,                          
				info = {
						source: source,
						id: poi.id,
						name: poi.name,
						location: poi.location.toString(),
						address: poi.address,
						
				};
				inputname.value=info.name;
				inputname1.value=info.location;									
			});
		}	
							
	},
    //日期变化时改变时间对象
    dateChange(value){
      console.log(value)
	},
    //时间选项点击
    timeChange(index){
      console.log(index)
      for(var a=0;a<this.$refs.TimeWrap.length;a++){
          if(a==index){
              this.$refs.TimeWrap[a].style.borderColor = "green";
              this.$refs.TimeWrap[a].style.color = "green";
              this.$refs.TimeWrap[a].className ='selfSeverTimeSt mark'
          }else{
              this.$refs.TimeWrap[a].style.borderColor = "#fff";
              this.$refs.TimeWrap[a].style.color = "#000";
              this.$refs.TimeWrap[a].style.border = "1px solid #bfcbd9";
              this.$refs.TimeWrap[a].className ='selfSeverTimeSt';                           
          }

      }
    },			
	//选择技师弹出层查询按钮
	searchTeh(){        
		this.$nextTick( () => {
			//前端定位
			var falg1=0;              
			var len = this.listTech.length;
			for(var i=0;i<len;i++){
				if(this.listTech[i].techName == this.techName || this.listTech[i].techStationId== this.techStationId ){
					falg1=1;
						this.$refs.tableItem1[i].scrollIntoView()
						this.$refs.tableItem1[i].style.background='#eee'                    
				}else{
					this.$refs.tableItem1[i].style.background='#fff' 
				}                   
			} 							
			if(falg1 ==0){
				var that=this
				this.promShow1=true;
				setTimeout(function(){
				that.promShow1=false;                  
				},2000);
			}else{ 
				this.promShow1=false;
			}
		})             
    }	
	
  },
  mounted() {
		 this.getcustomerList();
		 this.sex=this.dict.sex;		 
  }
};
</script>
<style  lang="scss" scoped>
.mark {
  background: url(../../../static/icon/Selected.png) right bottom no-repeat;
  background-size: 20px 20px;
}
.marginTopDec10{margin-top:-10px;max-width:400px;}
.selfSeverTimeSt{
    width: 80px;
    height: 34px;
    line-height: 34px;
    border: 1px solid #bfcbd9;
    display: inline-block;
    text-align: center;
    position: relative;
    margin-left: 20px;
    margin-top:10px;
    font-size: 14px;
    cursor: pointer;
}
.addorderStepWrap{width:100%;height:600px;background:#fff;padding-top:20px;}
.techNameStyle{width:80px;height:25px;line-height:25px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.stepControl{width:100%;padding-left:30px;}
.stepContentWrap{width:100%;height:400px;padding-left:30px;margin-top:50px;}
.stepContent{width:100%;height:350px;}
.customSelName{width:280px;margin-right:20px;}
.fontSize12{font-size:12px;}
.width280{width:280px;}
.changeAddressBut{margin-left:30px;height:20px;line-height:20px;display:inline-block;cursor: pointer;border: 1px solid #4c70e8;text-align: center;font-size: 12px;width: 80px; color: #4c70e8;}
.stepThreeBut{width:200px;height:34px;line-height:34px;display:inline-block;}
.stepThreeSelfTop{margin-top:20px;margin-left:-46px;}
.selfPromInfStyle{display:inline-block;heihgt:30px;line-height:30px;margin-left:30px;color:#8391a5;font-size:12px;}
.severChangeStyle{width:400px;margin-right:20px;}
.selectTechHL{float:left;width:120px}
.selectTechHR{float:left;margin-left:10px;}
.width120{width:120px;}
.width400{width:400px;}
.selfAddressStyle{margin-left:-5px;width:200px;}
.marginLeft10{margin-left:10px;}
.marginLeft20{margin-left:20px;}
.NextPrevWrap{margin-bottom:20px;text-align:center;}
.NextPrevStyle{display:inline-block;line-height:30px;}
.selfEmailStyle{margin-left:-10px;width:400px;}
.selfPromINF{font-size: 12px; margin-top: 10px; color: red;}
.FloatRight{float:right;}
.selfTableWrapONE{float:left;margin-top:20px;width:100%;margin-bottom:20px;height:300px;overflow-y:scroll;}
.selfTableHEADTD{background: #F8F8F9;height:30px;}
.roomTypeStyle{width:120px;margin-top:3px;margin-bottom:3px;}
.selfINputNumStyle{width:120px;margin-top:3px;margin-bottom:3px;}
.NumberINputStyle{width: 120px;margin-top:3px;margin-bottom:3px;}
.height30{height:30px;}
.height110{height:110px;}
.imgStyle{display:block;}
.userHeaderStyle{width:85px;height:90px;line-height:90px;border:1px solid #ccc;}


.selftSerchBut{width:80px;height:34px;line-height:34px;cursor: pointer; border: 1px solid #4c70e8;text-align:center;display:inline-block;color:#4c70e8}
.selfTable,.selfTable tr th, .selfTable tr td { border:1px solid #eee; }
.selfTable { min-height: 25px; line-height: 25px; text-align: center; border-collapse: collapse; padding:2px;} 
.tabWrap{width:100px;margin-right:20px;font-size:12px;display:inline-block;height:25px;text-align:center;line-height:25px;border-radius:12px;border:1px solid #bfcbd9;position:relative;}
.closePic{cursor:pointer;color:#bfcbd9;font-size:12px;position:absolute;margin-left:80px;margin-top:-25px;}
.addorder-container{
    width:100%;
	float:left;
	background:#eef1f6;
	.fist-bar{
	  padding-top:20px;
	  padding-bottom:20px;
	  background:#fff;
	  margin-left:20px;
	  margin-right:20px;
	}
}
.custom-action{
	margin-left:30px;
	margin-right:48px;
	font-size:12px;
}

.second-bar{
  padding-top:20px;
  padding-bottom:20px;
  background:#eef1f6;
  margin-left:20px;
  margin-right:20px;
  
}
.thrid-bar{
  padding-top:20px;
  background:#eef1f6;
  margin-left:20px;
  margin-right:20px;
  height:500px;
  margin-top:120px;
}
.order-inf{
    padding-top:20px;
	background:#fff;
	margin-top:20px;
}
.custom-inf{
	width:49%;
	background:#fff;
	float:left;
	height:160px;
	padding-top:20px;
	padding-bottom:20px;
    color:#000;	
}
.sever-inf{
    margin-left:2%;
	width:49%;
	background:#fff;
	float:left;
	height:160px;
	padding-top:20px;
	padding-bottom:20px;	
}
.customNamevalue{
	width:100%;
	height:40px;
	margin-left: -30px;
	font-size:12px;	
}
.changeserver{
	width:100%;
	height:110px;
	margin-left:30px;
	margin-top:10px;
}
.mapWrap{
	width:0px;
	height:0px;
	display:block;
}
.pickerInput{
	  width: 200px;
		height: 36px;
		font-size:12px;
		padding:0 10px;
    border: none;
		border: 1px solid #bfcbd9;
		outline:none;
}
.pickerInput:hover{
	border-color:#8391a5;
}
.amap-ui-poi-picker-sugg{
	width:180px;
	overflow:hidden;
}
.amap-ui-poi-picker-sugg-list{
	width:180px;
}
.sugg-item{
	width:180px !important;
}
</style>