<template>
    <div class="addorder-container">
		<!--搜索开始-->
		<div class="fist-bar">
		  <el-input  class="selfPosi"   placeholder="请输入搜索的手机号" v-model="customPhone"></el-input>
			<el-input  class="selfPosi"   placeholder="请输入搜索的姓名" v-model="customName"></el-input>
		  <el-select clearable   class="selfPosi1" v-model="organizationName" placeholder="请选择服务机构">
				<el-option v-for="item in organizationOptions" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
		  </el-select>      		  
		  <button class="search-button selfPosi2"  @click="localSearch"><i class="el-icon-search"></i>&nbsp搜索</button>
		</div>
		<!--搜索结束-->
		<div class="second-bar">
		  <button type="button" class="add-button selfPosi3" v-if="btnShow.indexOf('customer_insert') != -1" @click="selectBut">新增</button>
			<!--客户数据表格开始-->
			<div class="tableWarp">			      
				    <el-table
					  :data="tableData"
						v-loading="listLoading"
						tooltip-effect='light'					  
						stripe
					  style="width:100%;"
						>
					  <el-table-column
						align="center"
						label="编号"
						
						width="80">
						<template scope="scope">
							{{scope.row.index+(pageNumber-1)*pageSize1}}
						</template>
					  </el-table-column>
					  <el-table-column
					    align="center"
						prop="name"
						label="姓名"
						>
					  </el-table-column>
					  <el-table-column
						align="center"
						prop="phone"
						label="手机号">
					  </el-table-column>
					  <el-table-column
						align="center"
						label="性别">
						    <template scope="scope">
						    		<span v-if="scope.row.sex =='male'">男</span>
										<span v-if="scope.row.sex =='female'">女</span>
								</template>						
					  </el-table-column>
					  <el-table-column
						align="center"
						prop="orgName"
						label="服务机构">
					  </el-table-column>
					  <el-table-column
						align="center"
						label="来源">
						    <template scope="scope">
						    		<span v-if="scope.row.source =='own'">本机构</span>
										<span v-if="scope.row.source =='other'">第三方</span>
								</template>							
					  </el-table-column>											 
						<el-table-column
						align="center"
						prop="address"						
						width="130"
						label="地址"
						:show-overflow-tooltip="true"
						>						            
					  </el-table-column>						
					  <el-table-column
						align="center"
						label="操作"
						width='230'>
										<template scope="scope">
												<el-button type="button" v-if="btnShow.indexOf('customer_update') != -1" @click="lookInf(scope.row)">下单</el-button>
												<el-button type="button"  v-if="btnShow.indexOf('customer_delete') != -1" @click="Delete(scope.row)">删除</el-button>
										</template>
					  </el-table-column>					  
					</el-table>
					<!--客户数据表格结束-->
					<!--客户数据表格分页器开始-->
					<div v-show="!listLoading" class="selfStyle">
					  <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page.sync='jumpPage'
						:page-sizes="[5, 10, 15, 20]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="pagetotal1">
					  </el-pagination>
					</div>
					<!--客户数据表格分页器结束-->										
			</div>
		</div>
		<!--新增客户弹窗开始-->
		<el-dialog title="新增客户" :visible.sync="dialogTableVisible" :show-close="false" :close-on-click-modal="false">	
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" label-position="left" class="demo-ruleForm">
					<el-form-item label="姓名:" prop="name"  >
						<el-input v-model.trim="ruleForm.name"  placeholder="请输入2-15位客户姓名"  class="width400" ></el-input>
					</el-form-item>
					<el-form-item label="性别:"  prop="sex">
							<el-select  class="filter-item width400" v-model="ruleForm.sex" placeholder="请选择性别" >
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
								@change="testFun"
                :show-all-levels="true"
                 v-model="ruleForm.areaCodes"
                 class="width400" 
              ></el-cascader>							
					</el-form-item>
					<el-form-item label="详细地址:" prop="address">
		    				<input class="pickerInput" ref="pickerInput"  :disabled="showDis" @blur="inputBlur" value='' placeholder="输入关键字选取地点">
								<input type="hidden" class="pickerInput" ref="pickerInput1"  value='' placeholder="输入关键字选取地点">
								<el-input style="margin-left:-5px;width:200px;"  v-model.trim="ruleForm.address" placeholder="输入详细地址"></el-input>		
					</el-form-item>
					<el-form-item label="邮箱:" prop="email" style="margin-left:10px;">
						<el-input  v-model.trim="ruleForm.email" class="width400" style="margin-left:-10px;" placeholder="请输入常用邮箱"></el-input>
					</el-form-item>					
				</el-form>						    
				<div slot="footer" class="dialog-footer" style="text-align:center;">
						<button class="button-large"  :disabled="submitFlag"  @click="submitForm('ruleForm')">确 定</button>
						<button class="button-cancel"  @click="resetForm('ruleForm')">取 消</button>
				</div>
		</el-dialog>
		<!--新增客户弹窗结束-->
		<!--地图开始-->
		<div class="mapDiv">
			<div ref="gdMap" class="mapWrap"></div>              	
		</div>
		<!--地图结束-->
  </div>
</template>

<script>
import { 
	getCusTable,// 获取客户表格信息
	deleteCus,  //删除客户
	saveCus     //保存客户（新增）
	} from "@/api/customer";
import {getMech} from "@/api/base";
export default {
  name: "",
  data() {
		var checkPhone = (rule, value, callback) => {			  
				if (!value) {
					return callback(new Error('请输入11位手机号码'));
				}else{
					if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))) {
						callback(new Error('请输入11位手机号码'));
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
						 if(value.length>=5 && value.length<=50){
                  callback()
              }else{
                callback(new Error('请输入5-50位详细地址'));
              }
					}
				}			
		};
		var checkName = (rule, value, callback) => {
				if (!value) {
            callback(new Error('请输入2-15位客户姓名'));
				}else{
						 if(value.length>=2 && value.length<=15){
                  callback()
              }else{
                callback(new Error('请输入2-15位客户姓名'));
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
				showDis:true,
				submitFlag:false,
			  jumpPage:1,
			  btnShow: this.$store.state.user.buttonshow,
				testvalue:'',
				areaOptions:this.$store.state.user.area,
			  listLoading:false,
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
            { required: true,validator:checkName, trigger: 'blur' },
          ],
          phone: [
            { required: true,validator: checkPhone, trigger: 'blur' }										
          ],
          address: [
						{ required: true, validator:checkAddress,trigger: 'blur' },
					],
					email:[
						{ required:false, validator: checkEmail, trigger: 'blur' },
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
    tableData: [],	
		//全局搜索下拉选项
		organizationOptions:[],
		organizationName:'',//服务机构				
		dialogTableVisible:false,//新增弹窗开关
		customName:'',//客户姓名
		customPhone:'',//客户电话
		pagetotal1:0,//表格总页数
		pageSize1:10,//表格每页条数
		pageNumber:1,
		kkkk:'',
		mymap:{},	
    };
  },
  methods:{
		  inputBlur(){
				if(this.kkkk == ''){
					this.$refs.pickerInput.value='';
				}				
			},
		  testFun(value){
					this.$nextTick(() => {
							this.test(value[1]);
					})	
			},
			//新增保存
			submitForm(formName) {
				    var that=this
						this.submitFlag=true;
						setTimeout(function() {
							that.submitFlag=false;
						},1000);		   
						this.$refs[formName].validate((valid) => {							
							if (valid) {								
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
										  this.customName='';
							        this.customPhone='';
							        this.organizationName='';
											this.$refs.pickerInput.value=''	
											this.dialogTableVisible = false
											var obj={};
											this.pageNumber=1;
											this.jumpPage=1;
											this.getData(obj,this.pageNumber,this.pageSize1);
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
								return false;
							}
						});								
				},
				//弹窗cancel
				resetForm(formName) {
					this.$refs[formName].resetFields();
					this.ruleForm.provinceCode='';
					this.ruleForm.cityCode='';
					this.ruleForm.areaCode='';
					this.ruleForm.sex='';
					this.$refs.pickerInput.value=''	
					this.dialogTableVisible = false;
				},		 
				//全局搜索按钮
				localSearch(){
					var obj={
							name:this.customName,
							phone:this.customPhone,
							orgId:this.organizationName,
					}
					this.pageNumber=1;
					this.jumpPage=1;
					this.getData(obj,this.pageNumber,this.pageSize1);
				},
				//表格页数改变
					handleSizeChange1(val) {
							this.pageSize1=val;
							var obj={
									name:this.customName,
									phone:this.customPhone,
									orgId:this.organizationName,
							}
							this.getData(obj,this.pageNumber,this.pageSize1);
					},
				//表格当前页改变
					handleCurrentChange1(val) {
							this.pageNumber=val;
							var obj={
									name:this.customName,
									phone:this.customPhone,
									orgId:this.organizationName,
							}
							this.getData(obj,this.pageNumber,this.pageSize1);
					},	
				//新增
					selectBut(){
							this.dialogTableVisible=true;
							this.showDis=true;					
							this.ruleForm.provinceCode='';
							this.ruleForm.cityCode='';
							this.ruleForm.areaCode='';
							this.ruleForm.sex='';
						  this.areaOptions=this.$store.state.user.area;		
					},
					//表格下单操作按钮
					lookInf(obj){
							var id=obj.id;
							this.$router.push({path:'/clean/addorder',query: { coustomerId:id}})
					},
					//表格删除操作按钮
					Delete(row){
						this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
									var obj = {
										id:row.id
									}
									deleteCus(obj).then(res=>{
										if(res.data.code === 1){
												this.$message({
													type: 'success',
													message: '删除成功!'
												});
												var obj1={};
												this.getData(obj1,this.pageNumber,this.pageSize1);
										}else{
											this.$message({
													type: 'warning',
													message: '删除失败'
												});
										}
									}).catch(()=>console.log("未知错误"))
									
								}).catch(() => {
									this.$message({
										type: 'info',
										message: '已取消删除'
									});          
								});			

					},
					//获取表格数据
					getData(pramsObj,pageNo,pageSize){
						this.listLoading = true;
						var obj = pramsObj;
						getCusTable(obj,pageNo,pageSize).then(res => {
							if(res.data.code === 1){
								this.tableData = res.data.data.page.list
								if(res.data.data.page.list != undefined){
											for(var a=0;a<this.tableData.length;a++){
												this.tableData[a].index=a+1;
											}								
								}
								this.organizationOptions=res.data.data.orgList;											
								this.pagetotal1 = res.data.data.page.count;  								
								this.listLoading = false
							}
						}).catch(res=>{
							this.listLoading = false
						});

					},
					//地图初始化
					test(area){
							var that=this;							
							var inputname=this.$refs.pickerInput;
							var inputname1=this.$refs.pickerInput1;
							AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
								  that.showDis=false;
									var obj={
										city:area,
										input:inputname,
									}							                        
									var poiPicker = new PoiPicker(obj);						
									//初始化poiPicker
								  
									poiPickerReady(poiPicker);
									poiPicker.clearSearchResults()
									poiPicker.onCityReady(function() {																							  
											poiPicker.searchByKeyword(inputname.value);	
									});									
							});
							function poiPickerReady(poiPicker) {
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
													that.kkkk=info.name
													inputname1.value=info.location;									
									});
							}	
										
					},
					initMap1(){
						var id=this.$refs.gdMap;	
						var map = new AMap.Map(id, {
								zoom: 10
						});
						this.mymap=map;
	        }
  },
  mounted() {
		 this.initMap1();
		 this.getData();
		 this.sex=this.dict.sex;		 
  }
};
</script>
<style lang="scss" scoped>
.tableWarp{
	width:100%;background:#fff;padding:20px 20px 60px 20px;
}
.selfStyle{
 margin-top:20px;float:right;
}
.width400{
	width:400px;
}
.mapDiv{
	float:left;margin-top:100px;
}
.addorder-container{
  width:100%;
	float:left;
	background:#eef1f6;
}
.selfPosi{
 width: 200px;margin-left:20px;
}
.selfPosi1{
   width:200px;margin-left:30px;
}
.selfPosi2{
	float:right;margin-right:20px;
}
.selfPosi3{
	float:right;margin-right:20px;margin-top:10px;margin-bottom:20px;
}
.fist-bar{
  padding-top:20px;
  padding-bottom:20px;
  background:#fff;
  margin-right:20px;
 
}
.second-bar{
  padding-top:20px;
  padding-bottom:20px;
  background:#eef1f6;
  margin-left:20px;
  margin-right:20px;
  
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