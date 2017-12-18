<template>
    <div class="addorder-container" style="">
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
										<el-select clearable style="width:280px;margin-right:20px;" class="filter-item" v-model="custom" placeholder="请选择">
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
											<el-select clearable style="width:200px;" class="filter-item" v-model="form2.sex" placeholder="请选择">
												<el-option v-for="item in sexType" :key="item.key" :label="item.sexName" :value="item.key">
												</el-option>
											</el-select>
									</el-form-item>
									<el-form-item label="技师:" prop="" required>
											<span  class="button-cancel" style="width:200px;height:34px;line-height:34px;display:inline-block;" @click="technicianSel">+选择技师</span>
											<div class="custom-action" style="margin-top:20px;margin-left:-46px;">
												<div class="customNamevalue" style="width:100%;height:40px;">
													<div class="tabWrap" v-for="(item,index) in tabOptions " ref="tabsName" :key="index">
														{{item.tabName}}
														<div class="closePic"  @click="errorClose(item,index)">&#10005</div>
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


		<!--<div class="thrid-bar">
			<div class="order-inf">
				<div class="custom-action">订单信息</div>
				<div class="hr-style"></div>
				<div class="custom-action" style="margin-top:20px;">
						<el-form :model="orderInf" :rules="rules3" ref="orderInf" label-position="left" label-width="110px">
							<el-form-item label="服务项目:" prop="serverPro" required>
								<el-select clearable style="width:400px;margin-right:20px;" class="filter-item" v-model="orderInf.serverPro" placeholder="请选择" @change="serverchange">
									<el-option v-for="item in serverOptions" :key="item.key" :label="item.serverName" :value="item.key">
									</el-option>
								</el-select>
								<div class="changeserver">
									<div v-if="serverType==1" style="margin-left:-30px;">
										<span>面积:</span>														
											<el-input  style="width:180px;" class="filter-item" placeholder="请输入搜索内容" v-model="customPhone">
											</el-input>
											<span style="display:inline-block;width:36px;line-height:36px;text-align:center;height:36px;background:#eef1f6;position:absolute;border:1px solid #bfcbd9;border-left:none;">平米</span>																	
									</div>
									<div v-if="serverType==2" style="margin-left:-30px;">
										<div style="width:180px;border-top:1px solid #eef1f6;height:50px;line-height:50px;font-size:12px;">
											<span style="display:inline-block;">小型灯</span>
											<span @click="smallminus(smallLight)" style="margin-top:9px;position:absolute;border:1px solid #bfcbd9;width:36px;text-align:center;display:inline-block;margin-left:10px;border-right:none;height:36px;line-height:36px;font-size:20px;">-</span>
											<input  onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" style="width:50px;position:absolute;margin-left:46px;margin-top:9px;border:none;border:1px solid #bfcbd9;height:36px;line-height:36px;text-align:center;"  v-model="smallLight">
											<span @click="smallplus(smallLight)" style="margin-top:9px;position:absolute;border:1px solid #bfcbd9;width:36px;text-align:center;display:inline-block;margin-left:96px;border-left:none;height:36px;line-height:36px;font-size:20px;">+</span>
										</div>
										<div style="width:180px;border-top:1px solid #eef1f6;border-bottom:1px solid #eef1f6;height:50px;line-height:50px;font-size:12px;">
											<span>大型灯</span>
												<span @click="bigminus(bigLight)" style="margin-top:9px;position:absolute;border:1px solid #bfcbd9;width:36px;text-align:center;display:inline-block;margin-left:10px;border-right:none;height:36px;line-height:36px;font-size:20px;">-</span>
												<input  onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" style="width:50px;text-align:center;position:absolute;margin-left:46px;text-align:center;margin-top:9px;border:none;border:1px solid #bfcbd9;height:36px;line-height:36px;outline:none;"  v-model="bigLight">
												<span @click="bigplus(bigLight)" style="margin-top:9px;position:absolute;border:1px solid #bfcbd9;width:36px;text-align:center;display:inline-block;margin-left:96px;border-left:none;height:36px;line-height:36px;font-size:20px;">+</span>							
										</div>
									</div>
									<div style="margin-left:-50px;" v-if="serverType==3">
										<div class="selfCheckBox" ref="selcetOption" @click="roomSel($index,item)" v-for="(item,$index) in roomType">
											{{item.roomName}}
											<div v-if="roomLen==item.key" class="triangle-bottomright"></div>
											<div class="tally">&#10004</div>
										</div>						
									</div>
								</div>								
							</el-form-item>
							<el-form-item label="价格:" prop="price" required>
							     <span>{{orderInf.price}}元</span>
							</el-form-item>
							<el-form-item label="技师性别:" prop="sexType" required>
									<div style="display:inline-block;margin-left:-20px;" >
											<div class="selfCheckBox"  ref="sexOption"  @click="roomSel1($index,item)" v-for="(item,$index) in sexType">
												{{item.sexName}}
												<div v-if="sexLen==item.key" class="triangle-bottomright"></div>
												<div class="tally">&#10004</div>
											</div>
									</div>
							</el-form-item>
							<el-form-item label="技师:" prop="technician" required>
									
							</el-form-item>
							<el-form-item label="服务时间:" prop="severTime" required>
														<el-date-picker
															v-model="severTime"                      
															placeholder="年-月-日"                     
															:type="select"
															style="display:inline-block;width:250px;"
															>
														</el-date-picker>
														<el-time-select
															v-model="severTime1"
															style="display:inline-block;width:150px;margin-left:-5px;"
															:picker-options="{
																start: '08:30',
																step: '00:30',
																end: '12:30'
															}"
															placeholder="选择时间">
														</el-time-select>								
							</el-form-item>
							<el-form-item label="客户备注:" prop="textarea" style="margin-left:10px;">
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
				<div class="custom-action" style="margin-top:50px;margin-left:180px;padding-bottom:20px;">
				   <button class="button-large" @click="confirmOrder">确认下单</button>
				</div>
                				
			</div>
			
		</div>-->
		<!--新增客户弹窗-->
		<el-dialog title="新增客户" :visible.sync="dialogTableVisible1" :show-close="false">	
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" label-position="left" class="demo-ruleForm">
					<el-form-item label="姓名:" prop="customName" >
						<el-input v-model="ruleForm.customName" placeholder="请输入客户姓名" style="width:400px;"></el-input>
					</el-form-item>
					<el-form-item label="性别:"  prop="customSex">
							<el-select clearable style="width:400px;" class="filter-item" v-model="ruleForm.customSex" placeholder="请选择性别" >
									<el-option v-for="item in sex" :key="item.key" :label="item.sexName" :value="item.key">
									</el-option>
							</el-select>
					</el-form-item>
					<el-form-item label="手机号:"  prop="customPhone">
                <el-input  v-model="ruleForm.customPhone" style="width:400px;" placeholder="请输入11位手机号"></el-input>
					</el-form-item>
					<el-form-item label="所在区域:" prop="areaCodes">
							<!--<el-select clearable style="width:130px;" class="filter-item" v-model="ruleForm.cusProvId" placeholder="请选择省" @change="provinceChange">
									<el-option v-for="item in provinceOptions" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
							</el-select>
							<el-select clearable style="width:130px;" class="filter-item" v-model="ruleForm.cusCityId" placeholder="请选择市" @change="cityChange">
										<el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
							</el-select>
							<el-select clearable style="width:130px;" class="filter-item" v-model="ruleForm.cusTownId" placeholder="请选择县区">
										<el-option v-for="item in countyOptions" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
							</el-select>-->
							<!-- 省市区 -->
							<el-cascader
								:options="areaOptions"
								:show-all-levels="true"
								v-model="ruleForm.areaCodes"
								style='width: 400px;' 
							></el-cascader>								
					</el-form-item>
					<el-form-item label="详细地址:" prop="customAddr">
		    				<input class="pickerInput" ref="pickerInput"  value='' placeholder="输入关键字选取地点">
								<input type="hidden" class="pickerInput" ref="pickerInput1"  value='' placeholder="输入关键字选取地点">
								<el-input style="margin-left:-5px;width:200px;"  v-model="ruleForm.customAddr" placeholder="输入详细地址"></el-input>		
					</el-form-item>
					<el-form-item label="邮箱:" prop="customEmail" style="margin-left:10px;">
						<el-input  v-model="ruleForm.customEmail" style="margin-left:-10px;width:400px;" placeholder="请输入常用邮箱"></el-input>
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
								<!--<el-select clearable style="width:130px;margin-right:20px;" class="filter-item" v-model="ruleForm1.cusProvId" placeholder="请选择" @change="provinceChange1">
										<el-option v-for="item in provinceOptions1" :key="item.id" :label="item.name" :value="item.id">
										</el-option>    
								</el-select>
								<el-select clearable style="width:130px;margin-right:20px;" class="filter-item" v-model="ruleForm1.cusCityId" placeholder="请选择" @change="cityChange1">
											<el-option v-for="item in cityOptions1" :key="item.id" :label="item.name" :value="item.id">
											</el-option>
								</el-select>
								<el-select clearable style="width:130px;" class="filter-item" v-model="ruleForm1.cusTownId" placeholder="请选择">
										<el-option v-for="item in countyOptions1" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
								</el-select>-->
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
	  <el-input  style="width: 200px;"  placeholder="请输入技师姓名" v-model="technicianName"></el-input>
	  <el-select clearable style="width:200px;margin-right:20px;" class="filter-item" v-model="stationName" placeholder="请选择">
		<el-option v-for="item in stationOptions" :key="item.key" :label="item.stationName" :value="item.key">
		</el-option>
	  </el-select>	  
	  <button class="button-large" @click="technicianSearch">搜索</button>	
	  <el-table :data="technicianData">
		<el-table-column   width="50"  type="selection" align="center"></el-table-column>
		<el-table-column prop="headUrl" align="center" label="头像"></el-table-column>
		<el-table-column prop="name" align="center" label="姓名"></el-table-column>
		<el-table-column prop="sex" align="center" label="性别"></el-table-column>
		<el-table-column prop="serverStation" align="center" label="服务站"></el-table-column>
	  </el-table>
	  <div  class="pagination-container">
		  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
			:page-sizes="[10,20,30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagetotal">
		  </el-pagination>
	  </div>	  
	  <div slot="footer" class="dialog-footer">
		<button class="button-large" @click="dialogTableVisible = false">确 定</button>
		<button class="button-cancel" @click="dialogTableVisible = false">取 消</button>
	  </div>
	</el-dialog>
	<div ref="gdMap" class="mapWrap"></div>
  </div>
</template>

<script>
import { getCusTable,deleteCus,saveCus} from "@/api/customer";
import { getMech} from "@/api/base";
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
        pickerOptions0: {
          disabledDate(time) {
			  if(time.getTime() >Date.now()-8.64e7  && time.getTime() <Date.now() +8.64e7*14){
                  return false;
			  }else{
				  return true;
			  }
           
          }
		},
		areaOptions:this.$store.state.user.area,
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
				customName:'',
				customPhone:'',
				customAddr:'',
				customEmail:'',
				customSex:'',
				cusProvId:'',
				cusCityId:'',
				cusTownId:'',
				areaCodes:[],
				customArea:'',
				addrLongitude:'',
				addrLatitude:'',
	},

	rules: {
			customName: [
				{ required: true, message: '请输入客户姓名', trigger: 'blur' },
				{ min:2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
			],
			customPhone: [
				{ required: true,validator: checkPhone, trigger: 'blur' }
								
			],
			customAddr: [
				{ required: true, message: '详细地址不能为空', trigger: 'blur' },
			],
			customEmail:[
				{ required: false, validator: checkEmail, trigger: 'blur' }
			],
			customSex: [
				{ required: true, message: '请选择性别', trigger: 'change' }
			],
			areaCodes:[
					{ type:'array',required: true, message: '请选择区域', trigger: 'change' }
			]					
	},
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
sex:[
	{ key: "1", sexName: "男" },
	{ key: "2", sexName: "女" }
],
sexName:'',
//
provinceOptions:[],
//
cityOptions:[],
//
countyOptions:[],
select:'date',
orderInf:{
	  serverPro:'',
		price:'10000',
		sexType:'',
		technician:'',
		severTime:'',
		textarea:''	
},
rules3: {
	serverPro: [
		{ required: true, message: '不能为空', trigger: 'change' },
	],
	price:[
			{ required: true, message: '不能为空', trigger: 'blur' }
	],
	sexType:[
			{ required: true, message: '不能为空', trigger: 'blur' }
	],
	technician:[
			{ required: true, message: '不能为空', trigger: 'blur' }
	],
	severTime:[
			{ required: true, message: '不能为空', trigger: 'blur' }
	]		

},
//tabName
tabOptions:[
	{ key: "1", tabName: "王小虎" },
	{ key: "2", tabName: "王小虎" },
	{ key: "3", tabName: "王小虎" }
],
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
//
provinceOptions1:[],
province1:'',
//
cityOptions1:[],
city1:'',
//
countyOptions1:[],
county1:'',		
		//orderOrgin
		orderOrginOptions:[
		  { key: "1", orderOrginName: "中信国安" },
		  { key: "2", orderOrginName: "国安府" },
		  { key: "3", orderOrginName: "第三方" }
		],
    orderOrgin:'',
		//
		detailedAddress:'XXX小区1号楼3单元222室',
		//客户备注
        textarea:'',		
		//服务站下拉选项
		stationOptions:[
		  { key: "1", stationName: "服务站1" },
		  { key: "2", stationName: "服务站2" },
		  { key: "3", stationName: "服务站3" },
		  { key: "4", stationName: "服务站4" }
		],
		//服务站
		stationName:'',
		//服务时间
		severTime:'',
		severTime1:'',
		//弹窗表格数据
		technicianData:[{
          headUrl: 'headurl',
          name: '王小虎',
          sex: '男',
		  serverStation:'呼家楼服务站'
        }, 
		{
          headUrl: 'headurl',
          name: '王小虎',
          sex: '男',
		  serverStation:'呼家楼服务站'
        },{
          headUrl: 'headurl',
          name: '王小虎',
          sex: '男',
		  serverStation:'呼家楼服务站'
        },{
          headUrl: 'headurl',
          name: '王小虎',
          sex: '男',
		  serverStation:'呼家楼服务站'
        }],
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
		smallLight:1,//小灯型
		bigLight:1,//大灯型
		roomType:[
		  { key: "1", roomName: "一居室" },
		  { key: "2", roomName: "二居室" },
		  { key: "3", roomName: "三居室" }
		],//居室信息
		roomLen:0,//居室数量开关
		price:1000,//服务价格
		sexType:[
		  { key: "0", sexName: "不限制" },
		  { key: "1", sexName: "男" },
		  { key: "2", sexName: "女" }
		],//技师信息
		sexLen:0,//技师性别开关
    sysAllocat:1,//系统分配值
		technicianName:'',//技师姓名
		pagetotal:10,//技师总页数
		pageSize:2,//每页条数
		
    };
  },
  methods:{
	  	next(){
		   if (this.active++ >= 4) this.active = 1;
		   
		   if(this.active==3 && this.form2.sex==''){
				 this.form2.sex="0";
				 console.log(this.selectCommidty);
		   }
		},
		prev(){
		   if (this.active-- <= 1) this.active = 1;
		   if(this.active==3 && this.form2.sex==''){
                 this.form2.sex="0"
		   }		   
		},
		//
		provinceChange(value){
			this.ruleForm.cusCityId='';
    //   getArea(value).then(res => {
	// 		   this.cityOptions=res.data.data;
    //   }).catch(res=>{
        
    //   });
       
		},
		//
		cityChange(value){
			this.ruleForm.cusTownId='';
    //   getArea(value).then(res => {
	// 		   this.countyOptions=res.data.data;
    //   }).catch(res=>{
        
    //   });			

		},
		//
		provinceChange1(value){
			this.city1='';
    //   getArea(value).then(res => {
	// 		   this.cityOptions1=res.data.data;
    //   }).catch(res=>{
        
    //   });
       
		},
		//
		cityChange1(value){
			this.county1='';
    //   getArea(value).then(res => {
	// 		   this.countyOptions1=res.data.data;
    //   }).catch(res=>{
        
    //   });			

		},		
		//customSex
		customSexselect(){
      this.ruleForm.customSex=this.sex;
		},		
		submitForm(formName) {
			   if(this.$refs.pickerInput.value !=''){
							this.ruleForm.customArea=this.$refs.pickerInput.value;
							var str=this.$refs.pickerInput1.value;
									str=str.split(',')
									//经度
									var lng=str[0];
									this.ruleForm.addrLongitude=lng;
									//纬度
									var lat=str[1];
									this.ruleForm.addrLatitude=lat;
				 }else{
				 }			   
					this.$refs[formName].validate((valid) => {
						if (valid) {																			
							var obj = this.ruleForm
							saveCus(obj).then(res => {
								if(res.data.code === 1){
										this.$message({
											type: 'success',
											message: '新增成功!'
										});
										this.$refs['ruleForm'].resetFields();
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
			//弹窗cancel
      resetForm(formName) {
				this.$refs[formName].resetFields();
				this.ruleForm.customSex='';
				this.ruleForm.cusProvId='';
				this.ruleForm.cusCityId='';
				this.sexName='';
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
				 }else{
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
		// getCusTable(obj).then(res => {
				//	console.log(res.data.data.list) 

		// }).catch(res=>{
		
		// });
	}, 
    //新增按钮
    addcustomer() {
				this.dialogTableVisible1=true;					
				this.ruleForm.customSex='';
				this.ruleForm.cusProvId='';
				this.ruleForm.cusCityId='';
				this.sexName='';
				var id=''
				this.$nextTick(() => {
		   			this.test();
		    })					
    },
	//更换地址按钮
	changeAddress(){
	    this.dialogVisible=true;
				var id=''
				this.$nextTick(() => {
		   			this.test1();
		    })						
	},
	//服务类型下拉改变
	serverchange(value){
	   //this.serverType=value;
	},
	//小型灯减
	smallminus(value){
	    value=parseInt(value);
	    if(value<=1){
			this.smallLight=1
		}else{
		    this.smallLight=value-1
		}
	},
	//小型灯加
	smallplus(value){
			value=parseInt(value);
		    this.smallLight=value+1			
	},
	//大型灯减
	bigminus(value){
		value=parseInt(value);
	    if(value<=1){
			this.bigLight=1
		}else{
		    this.bigLight=value-1
		}
	},
	//大型灯加
	bigplus(value){
			value=parseInt(value);
		    this.bigLight=value+1			
	},
	//居室数量选择及样式变化
	roomSel(index,obj){
		this.roomLen=index+1;
		for (var i=0 ;i<this.$refs.selcetOption.length;i++){
		      if(i == index){
			      this.$refs.selcetOption[i].style.borderColor='green';
			  }else{
			      this.$refs.selcetOption[i].style.borderColor='#bfcbd9';
			  }
		       
		}		
	},
	//技师选择及样式变化
	roomSel1(index,obj){
		this.sexLen=index+1;
		for (var i=0 ;i<this.$refs.sexOption.length;i++){
		      if(i == index){
			      this.$refs.sexOption[i].style.borderColor='green';
			  }else{
			      this.$refs.sexOption[i].style.borderColor='#bfcbd9';
			  }
		       
		}		
	},
	//技师选择按钮点击
	technicianSel(){
		this.dialogTableVisible=true;
	},
	//弹窗搜索按钮点击
	technicianSearch(){
	},
	//每页条数多少改变
    handleSizeChange(val) {

    },
	//分页器改变当前页
    handleCurrentChange(val) {

    },
    //叉号点击关闭TAB
    errorClose(obj,index){
	   this.$refs.tabsName[index].style.display="none";
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
	
  },
  mounted() {
		 this.getcustomerList();
		 this.initMap1();
		 this.customSexselect();		 

  }
};
</script>
<style  lang="scss" scoped>
   .table-d table{ background:#ddd}
   .table-d table td{ background:#FFF}
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