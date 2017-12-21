<template>
    <div class="addorder-container">
		<div style="width:100%;height:600px;background:#fff;padding-top:20px;">
			<div style="width:100%;padding-left:30px;">
					<el-steps :space="300" :active="active"  align-center >
					<el-step title="选择客户"></el-step>
					<el-step title="服务信息"></el-step>
					<el-step title="选择技师"></el-step>
					<el-step title="服务时间"></el-step>
					</el-steps>
			</div>
			<div style="width:100%;height:400px;padding-left:30px;margin-top:50px;">
				<div style="width:100%;height:350px;" v-if="active == 1">
						<el-form ref="form" :model="form" label-width="100px" label-position="left">
								<el-form-item label="选择客户:" prop="custom">
									<el-select  style="width:280px;margin-right:20px;" class="filter-item" v-model="custom" placeholder="请选择">
										<el-option v-for="item in customOptions" :key="item.key" :label="item.customName" :value="item.key">
										</el-option>
									</el-select>
									<div  style="width:80px;height:34px;line-height:34px;cursor: pointer; border: 1px solid #4c70e8;text-align:center;display:inline-block;color:#4c70e8" @click="addcustomer">新&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp增</div>
								</el-form-item>
								<el-form-item label="客户姓名:" prop="customName">
									<span style="font-size:12px;">{{form.customName}}</span>
								</el-form-item>
								<el-form-item label="客户电话:" prop="phone">
									<el-input  style="width:280px;"  placeholder="请输入搜索内容" v-model="form.phone"></el-input>
								</el-form-item>
								<el-form-item label="服务地址:" prop="serverAddress">
									{{form.serverAddress}}<div  style="margin-left:30px;height:20px;line-height:20px;display:inline-block;cursor: pointer;border: 1px solid #4c70e8;text-align: center;font-size: 12px;width: 80px; color: #4c70e8;" @click="changeAddress">更换地址</div>
								</el-form-item>
								<el-form-item label="所属服务站:" prop="serverStation">
									<span style="font-size:12px;">{{form.serverStation}}</span>
								</el-form-item>																											
						</el-form>						
				</div>
				<div style="width:100%;height:350px;" v-if="active == 2">
				<el-form ref="form1" :model="form1" label-width="100px" label-position="left">
						<el-form-item label="服务项目:" prop="serverPro" required>
								<el-select clearable style="width:400px;margin-right:20px;" class="filter-item" v-model="form1.serverPro" placeholder="请选择" @change="serverchange">
									<el-option v-for="item in serverOptions" :key="item.key" :label="item.serverName" :value="item.key">
									</el-option>
								</el-select>
						</el-form-item>
						<el-form-item label="选择商品:" prop="serverPro" required>
								<div class="table-d">
									<table width="80%" border="0" cellspacing="1" cellpadding="0">
										<tr>
										<td  style="background: #F8F8F9;height:30px;" align="center" width="8%">选择</td>
										<td  style="background: #F8F8F9;height:30px;" align="center" width="28%">商品名称</td>
										<td  style="background: #F8F8F9;height:30px;" align="center" width="28%">单价</td>
										<td  style="background: #F8F8F9;height:30px;" align="center" width="10%">起购数</td>
										<td  style="background: #F8F8F9;height:30px;" align="center" width="26%">数量</td>							
										</tr>
										<tr v-for="item in selectCommidty" :key="item.id" >
										<td style="height:30px;" align="center"><el-checkbox  v-model="item.checkAll"></el-checkbox></td>
										<td style="height:30px;" align="center">
											<span v-if="item.type=='1' || item.type=='2'">{{item.name}}</span>
											<span v-if="item.type=='3'">
												<el-select  style="width:120px;margin-top:3px;margin-bottom:3px;" v-model="item.roomId" placeholder="请选择">
													<el-option v-for="room in item.roomType" :key="room.key" :label="room.roomName" :value="room.key">
													</el-option>
												</el-select>
											</span>
										</td>
										<td style="height:30px;" align="center">
											<span v-if="item.type=='1' || item.type=='2'">{{item.pirce}}</span>
											<span v-if="item.type=='3'">
												<span v-if="item.roomId =='1'">{{item.testprice[item.roomId-1].pirce}}</span>
												<span v-if="item.roomId =='2'">{{item.testprice[item.roomId-1].pirce}}</span>
												<span v-if="item.roomId =='3'">{{item.testprice[item.roomId-1].pirce}}</span>
											</span>
										</td>
										<td style="height:30px;" align="center">{{item.payNum}}</td>
										<td style="height:30px;" align="center">
											<span v-if="item.type=='1'"><el-input-number style="width:120px;margin-top:3px;margin-bottom:3px;" v-model="item.number" :min="parseInt(item.payNum)"></el-input-number></span>
											<span v-if="item.type=='2'"><el-input  style="width: 120px;margin-top:3px;margin-bottom:3px;"  placeholder="请输入技师姓名" v-model="item.number"></el-input></span>
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
				<div style="width:100%;height:350px;" v-if="active == 3">
					<el-form ref="form2" :model="form2" label-width="100px" label-position="left">
						<el-form-item label="技师性别:" prop="sex" required>
								<el-select style="width:200px;" class="filter-item" v-model="form2.sex" placeholder="请选择">
									<el-option v-for="item in sexType" :key="item.key" :label="item.sexName" :value="item.key">
									</el-option>
								</el-select>
						</el-form-item>
						<el-form-item label="技师:" prop="" required>
							<span  class="button-cancel" style="width:200px;height:34px;line-height:34px;display:inline-block;" @click="technicianSel">+选择技师</span>
							<div class="custom-action" style="margin-top:20px;margin-left:-46px;">
								<div class="customNamevalue" style="width:100%;height:40px;">
									<div class="tabWrap" v-for="item in tabOptions" :key="item.techId">
										{{item.techName}}
										<div class="closePic" @click="errorClose(item)">&#10005</div>
									</div> 					
								</div>
							</div>										
						</el-form-item>																																													
					</el-form>
				</div>
				<div style="width:100%;height:350px;" v-if="active == 4">
					<el-form ref="form3" :model="form3" label-width="100px" label-position="left">
						<el-form-item label="选择日期:" prop="severTime" required>
							<el-date-picker
								v-model="severTime"                      
								placeholder="年-月-日"                     
								:type="select"
								style="display:inline-block;width:400px;"
								:picker-options="pickerOptions0"

								>
							</el-date-picker>							
						</el-form-item>
						<el-form-item label="选择时间:" prop="severTime" required>							
						</el-form-item>									
						<el-form-item label="客户备注:" prop="textarea" style="margin-left:10px;font-size:12px;">
							<el-input
								type="textarea"
								:rows="3"
								placeholder="请输入内容"
								v-model="textarea"
								style="width:400px;margin-left:-10px;"
								>
							</el-input>						
						</el-form-item>	
					</el-form>
				</div>
			</div>
			<div style="margin-bottom:20px;text-align:center;">
				<span class="button-large" style="display:inline-block;line-height:30px;" v-if="active == 2 || active == 3 || active == 4" @click="prev">上一步</span>
				<span class="button-large" style="display:inline-block;line-height:30px;" v-if="active == 1 || active == 2|| active == 3"  @click="next">下一步</span>					
				<span class="button-large" style="display:inline-block;line-height:30px;" v-if="active == 4" @click="confirmOrder">保存</span>		
			</div>
	</div>
	<!--新增客户弹窗-->
	<el-dialog title="新增客户" :visible.sync="dialogTableVisible1" :show-close="false">	
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" label-position="left" class="demo-ruleForm">
			<el-form-item label="姓名:" prop="name" >
				<el-input v-model="ruleForm.name" placeholder="请输入客户姓名" style="width:400px;"></el-input>
			</el-form-item>
			<el-form-item label="性别:"  prop="sex">
				<el-select clearable style="width:400px;" class="filter-item" v-model="ruleForm.sex" placeholder="请选择性别" >
					<el-option v-for="(value,key,index) in sex" :key="index" :label="value" :value="key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="手机号:"  prop="phone">
		    <el-input  v-model="ruleForm.phone" style="width:400px;" placeholder="请输入11位手机号"></el-input>
			</el-form-item>
			<el-form-item label="所在区域:" prop="areaCodes">
				<!-- 省市区 -->
				<el-cascader
					:options="areaOptions"
					:show-all-levels="true"
					v-model="ruleForm.areaCodes"
					style='width: 400px;' 
				></el-cascader>								
			</el-form-item>
			<el-form-item label="详细地址:" prop="address">
				<input class="pickerInput" ref="pickerInput"  value='' placeholder="输入关键字选取地点">
				<input type="hidden" class="pickerInput" ref="pickerInput1"  value='' placeholder="输入关键字选取地点">
				<el-input style="margin-left:-5px;width:200px;"  v-model="ruleForm.address" placeholder="输入详细地址"></el-input>		
			</el-form-item>
			<el-form-item label="邮箱:" prop="email" style="margin-left:10px;">
				<el-input  v-model="ruleForm.email" style="margin-left:-10px;width:400px;" placeholder="请输入常用邮箱"></el-input>
			</el-form-item>					
		</el-form>					
		<div slot="footer" class="dialog-footer" style="text-align:center;">
				<button class="button-large" @click="submitForm('ruleForm')">确 定</button>
				<button class="button-cancel"  @click="resetForm('ruleForm')">取 消</button>
		</div>

	</el-dialog>		
	<!--更换地址弹窗-->
	<el-dialog
		:visible.sync="dialogVisible"
		title="更换地址"
		size="small"
	>
		<el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="130px" label-position="left" class="demo-ruleForm">
			<el-form-item label="所在区域:" prop="areaCodes">
				<el-cascader
					:options="areaOptions"
					:show-all-levels="true"
					v-model="ruleForm1.areaCodes"
					style='width: 436px;' 
				></el-cascader>								
			</el-form-item>
			<el-form-item label="详细地址:" prop="customAddr">
					<input class="pickerInput" style="width:220px;" ref="pickerInput2"  value='' placeholder="输入关键字选取地点">
					<input type="hidden" class="pickerInput" ref="pickerInput21"  value=''>
					<el-input style="margin-left:-5px;width:220px;"  v-model="ruleForm1.customAddr" placeholder="输入详细地址"></el-input>		
			</el-form-item>				
		</el-form>
		<div slot="footer" class="dialog-footer" style="text-align:center;">
				<button class="button-large" @click="submitForm1('ruleForm1')">确 定</button>
				<button class="button-cancel"  @click="resetForm1('ruleForm1')">取 消</button>
		</div>				
	</el-dialog>
	<!--技师选择弹窗-->
	<el-dialog title="选择技师" :visible.sync="dialogTableVisible">
		<div style="float:left;width:120px">
		<el-input placeholder="输入要搜索的姓名" v-model="techName" style="width:120px"></el-input>                
		</div>
		<div style="float:left;margin-left:10px;">
		<el-select clearable placeholder="请选择服务站" v-model="techStationId">
			<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
			</el-option>
		</el-select>
		<span v-show="promShow1" style="font-size: 12px; margin-top: 10px; color: red;">{{promInf1}}</span>
		</div>
		<div style="float:right"><button class="button-large" @click="searchTeh">查询</button></div> 	
		<div style="float:left;margin-top:20px;width:100%;margin-bottom:20px;height:300px;overflow-y:scroll;">
			<div class="table-d">
				<table width="100%" class="selfTable">
				<tr>
					<td  style="background: #F8F8F9;height:30px;" align="center" width="8%">选择</td>
					<td  style="background: #F8F8F9;height:30px;" align="center" width="28%">头像</td>
					<td  style="background: #F8F8F9;height:30px;" align="center" width="28%">姓名</td>
					<td  style="background: #F8F8F9;height:30px;" align="center" width="10%">性别</td>
					<td  style="background: #F8F8F9;height:30px;" align="center" width="26%">服务站</td>							
				</tr>
				<tr v-for="item in listTech" :key="item.techId"  ref="tableItem1">
					<td style="height:30px;" align="center"><el-checkbox  v-model="item.techChecked"></el-checkbox></td>
					<td style="height:30px;" align="center">{{item.headPic}}</td>
					<td style="height:30px;" align="center">{{item.techName}}</td>
					<td style="height:30px;" align="center">
					<span v-if="item.techSex =='male'">男</span>
					<span v-if="item.techSex =='female'">女</span>									
					</td>
					<td style="height:30px;" align="center">{{item.techStationName}}</td>							
				</tr>
				</table>
			</div>            
		</div> 	  	  
		<div slot="footer" class="dialog-footer" style="text-align:center">
			<button class="button-large" @click="submitForm2()">确 定</button>
			<button class="button-cancel" @click="dialogTableVisible = false">取 消</button>
		</div>
	</el-dialog>
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
				if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))) {
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
    return {
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
			  id:'4',
			  checkAll:true,
			  roomId:'1',
			  testprice:[
				  {pirce:'26'},
				  {pirce:'52'},
				  {pirce:'78'},
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
				  {pirce:'26'},
				  {pirce:'52'},
				  {pirce:'78'},
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
          phone: '',
		  customName:"李四",
		  serverAddress:'北京市朝阳区关东街11呼家楼',
		  serverStation:'呼家楼服务站',		  
		},
		form1: {
		  serverPro:'',
          sumPrice:'1000',
		},
		form2:{
			sex:'',
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
        customPhone1:{
			phone:'',
			customName:'李四'
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
            { required: true, message: '详细地址不能为空', trigger: 'blur' },
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
		ruleForm1: {
			customAddr:'',
			cusProvId:'',
			cusCityId:'',
			cusTownId:'',
			areaCodes:[],
			customArea:'',
			addrLongitude:'',
			addrLatitude:'',
		},
		rules1: {
			customAddr: [
				{ required: true, message: '详细地址不能为空', trigger: 'blur' },
			],
			areaCodes:[
					{ type:'array',required: true, message: '请选择区域', trigger: 'change' }
			]					
		},								
		select:'date',
		//tabName
		tabOptions:[],
		//
		serverOptions:[
			{ key: "1", serverName: "平米保洁" },
			{ key: "2", serverName: "灯具清洁" },
			{ key: "3", serverName: "居室保洁" }
		],		
		//客户下拉选项
		customOptions:[
			{ key: "1", customName: "日常保洁" },
			{ key: "2", customName: "除尘除螨" },
			{ key: "3", customName: "家电清洗" },
			{ key: "4", customName: "擦玻璃" }
		],
		//客户备注
        textarea:'',				
		//服务时间
		severTime:'',
		severTime1:'',		
		//当前客户
		custom:"1",
		//当前电话
		customPhone:13821209999,
		//当前客户姓名		
		customName:"李四",
		serverAddress:'北京市朝阳区关东街11呼家楼',
		serverStation:'呼家楼服务站',
		dialogVisible:false,//更换地址弹窗开关
		dialogTableVisible:false,//选择技师弹窗开关
		dialogTableVisible1:false,//选择客户弹窗开关
		serverType:2,//服务类型
		sexType:[
		  { key: "0", sexName: "不限制" },
		  { key: "1", sexName: "男" },
		  { key: "2", sexName: "女" }
		],//技师信息
		technicianName:'',//技师姓名		
    };
  },
  computed: {
    areaOptions: function () {
      return this.$store.state.user.area
    }
  },
  methods:{
	//下一步
	next(){
		if (this.active++ >= 4) this.active = 1;
		
		if(this.active==3 && this.form2.sex==''){
				this.form2.sex="0";
		}
	},
	//上一步
	prev(){
		if (this.active-- <= 1) this.active = 1;
		if(this.active==3 && this.form2.sex==''){
				this.form2.sex="0"				 
		}		   
	},
	//新增客户保存				
	submitForm(formName) {
		if(this.$refs.pickerInput.value !=''){
					this.ruleForm.address=this.$refs.pickerInput.value+this.ruleForm.address;
					var str=this.$refs.pickerInput1.value;
					str=str.split(',')
					//经度
					var lng=str[0];
					this.ruleForm.addrLongitude=lng;
					//纬度
					var lat=str[1];
					this.ruleForm.addrLatitude=lat;
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
							this.dialogTableVisible1 = false
					}else{
						this.$message({
								type: 'warning',
								message: '新增失败'
							});
					}													
				}).catch(res=>{
					
				});							
			} else {            
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
	//更换地址弹窗“确认”	
	submitForm1(formName) {
		if(this.$refs.pickerInput2.value !=''){
			this.ruleForm1.customArea=this.$refs.pickerInput2.value;
			var str=this.$refs.pickerInput21.value;
			str=str.split(',')
			//经度
			var lng=str[0];
			this.ruleForm1.addrLongitude=lng;
			//纬度
			var lat=str[1];
			this.ruleForm1.addrLatitude=lat;
		}			   
		this.$refs[formName].validate((valid) => {
			if (valid) {																			
				var obj = this.ruleForm1
				saveCus(obj).then(res => {
					if(res.data.code === 1){
							this.$message({
								type: 'success',
								message: '新增成功!'
							});
							this.$refs['ruleForm1'].resetFields();
							this.dialogVisible = false;
					}else{
						this.$message({
								type: 'warning',
								message: '新增失败'
						});
					}													
				}).catch(res=>{
					
				});							
			} else {            
				return false;
			}
		});								
	},
	//更换地址弹窗cancel
	resetForm1(formName) {
		this.$refs[formName].resetFields();
		this.ruleForm1.cusProvId='';
		this.ruleForm1.cusCityId='';
		this.dialogVisible = false;
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
		this.$nextTick(() => {
			this.test();
		})					
    },
	//更换地址按钮
	changeAddress(){
	    this.dialogVisible=true;
		this.$nextTick(() => {
				this.test1();
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
	test(){
		var inputname=this.$refs.pickerInput;
		var inputname1=this.$refs.pickerInput1;		
		AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {                         
				var poiPicker = new PoiPicker({
						city:'北京',
						input: inputname
				});
				
				//初始化poiPicker
				poiPickerReady(poiPicker);
		});
		var obj='';
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
			//poiPicker.onCityReady(function() {								
					//poiPicker.searchByKeyword('附近小区');								
			//});
		}	
						
    },
	test1(){
			var inputname=this.$refs.pickerInput2;
			var inputname1=this.$refs.pickerInput21;		
			AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {                         
					var poiPicker = new PoiPicker({
							city:'北京',
							input: inputname
					});					
					//初始化poiPicker
					poiPickerReady(poiPicker);
			});
			var obj='';
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
				
				//poiPicker.onCityReady(function() {								
						//poiPicker.searchByKeyword('附近小区');								
				//});
			}	
							
	},
	initMap1(){
		var id=this.$refs.gdMap;	
		var map = new AMap.Map(id, {
				zoom: 10
		});
	
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
		 this.initMap1();
		 this.sex=this.dict.sex;		 
  }
};
</script>
<style  lang="scss" scoped>
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
	padding-left:48px;
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