<template>
	<div class="schedult">
		<div class="schedult-con">
			<!-- 搜索 -->
			<div class="schedult-search">
				<div>
					<el-select class="searchRight select-width" v-model="search.orgId" placeholder="选择机构">
					<el-option v-for="item in organizations" :key="item.id" :label="item.name" :value="item.id"></el-option>	
					</el-select>
					<el-select class="searchRight select-width" v-model="search.stationId" placeholder="选择服务站">
						<el-option v-for="item in stations" :key="item.id" :label="item.name" :value="item.id"></el-option>	
					</el-select>
					<el-input v-model.trim ="chooContent" placeholder="输入要搜索的内容" class="searchRight search-width">
	              		<el-select  v-model="chooses" clearable placeholder="请选择"  slot="prepend">
	                		<el-option v-for="item in choose" :key="item.value" :label="item.label" :value="item.value">
	                		</el-option>
	              		</el-select>
	          		</el-input>
					<el-select class="searchRight select-width" clearable v-model="search.skilId" placeholder="请选择技能">
						<el-option v-for="(item,index) in skils" :key="index" :label="item.name" :value="item.id">
		                </el-option>
					</el-select>
	              	<button class="search-button el-icon-search btn_search btn-color serch-btn" @click="searchClick(search)"> 搜索</button>
				</div>
				<div>
					<el-date-picker
						@change="pickerChange"
						style="width:15%"
				      	v-model="search.beginTime"
				      	type="date"
				      	placeholder="选择日期"
						:picker-options="pickerOptions0"
				      	>
				    </el-date-picker>
				</div>
			</div>
			<!-- 搜索完成 -->
			<!-- 表格 -->
			<div class="schedule-table" v-loading="listLoading">
				<div v-if="tableData.length">
					<el-table :data="tableData" border style="width: 100%">
						<!-- 技师 -->
							<el-table-column label="技师" align="center">
								<el-table-column align="center">
									<template scope="scope">
										<div class="schedule-tech">
											<div>{{scope.row.name}}</div>
											<div>{{scope.row.phone}}</div>
											<div>{{scope.row.stationName}}</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column className="work" align="center" width='100'>
									<template scope="scope">
										<div style="height:100%">
											<div class="work-time-bor">工作时间</div>
											<div class="time-arrange-whole">
												<div class="time-arrange-content">
													<div class="work-arrange">工作安排</div>
												</div>
											</div>
										</div>
									</template>
								</el-table-column>
							</el-table-column>
						<!-- 技师结束 -->
						<!-- 7天时间 -->
							<el-table-column v-for="(item,index) in tableData[0].scheduleDateInfos" :key="index" :label="item.sevenDate" align="center" className="work">
								<template scope="scope">
									<!-- 
										1：有工资时间
										2：没有工作时间但是有工资安排
									 -->
									<div class="work-bo" v-if="scope.row.scheduleDateInfos[index].workBeginTime || scope.row.scheduleDateInfos[index].techScheduleInfos">
										<!-- 判断有没有border-bottom, -->
										<div :class="['work-time',{'bor-time':scope.row.scheduleDateInfos[index].workBeginTime || !noOrders(scope.row.scheduleDateInfos[index].techScheduleInfos)}]">
											{{scope.row.scheduleDateInfos[index].workBeginTime?workTimeMosaic(scope.row.scheduleDateInfos[index].workBeginTime,scope.row.scheduleDateInfos[index].workEndTime):''}}
										</div>
										<div class="work-add-bo">
											<div class="time-arrange-content">
												 <!-- 有工作时间直接渲染  没有工作时间判断有没有工作安排，有工作安排是否有订单数据 -->
												<div v-if="scope.row.scheduleDateInfos[index].workBeginTime || ((scope.row.scheduleDateInfos[index].workBeginTime || scope.row.scheduleDateInfos[index].techScheduleInfos) && data.type!='holiday')" 
													:class="{'order':data.type!='holiday'}" v-for="(data,i) in scope.row.scheduleDateInfos[index].techScheduleInfos" :key="i"
													@click="schedulePath(data)">
													{{tableDataTime(data.startTimeStr,data.endTimeStr)}}
													<span>{{data.type=='holiday'?'休假':'订单'}}</span>
												</div>
											</div>
										</div>
									</div>
									<!-- 没有工作时间和没有工作安排 或 没有工作时间工作安排都是休假数据没有订单数据 
										noOrders(scope.row.scheduleDateInfos[index].techScheduleInfos //工作安排有没有订单数据
									-->
									<div class="no-orders" v-if="noOrders(scope.row.scheduleDateInfos[index].techScheduleInfos) && !scope.row.scheduleDateInfos[index].workBeginTime">
										<div>全天不可接单</div>
									</div>
								</template>
							</el-table-column>
						<!-- 结束时间 -->
					</el-table>
				</div>
				<div v-if="!tableData.length && !listLoading" class="nodata">
					  暂无数据
				</div>
 				 <div class="schedult-pagin">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageSync"
                        :page-sizes="[5,10,15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
			</div>
			<!-- 表格完成 -->
		</div>
	</div>
</template>

<script>
	import {
		mechanismService,
		scheduleList
	} from "@/api/tech";

	var getData = function(obj,page,size){
		return new Promise((res,rej)=>{
			scheduleList(obj,page,size)
				.then(data=>{
					res(data)
				}).catch(error=>{
					rej(error)
				})
		})
	}

	let tableData = [
		{
		name: ' 曹居伟',
		phone: '15711445668',
		stationName: '北京',
		scheduleDateInfos: [{
				sevenDate: '0000-01-01',
				workBeginTime:'',
				workEndTime:'',
				techScheduleInfos: [{
						scheduleDate: '',
						scheduleDateStr: '08:00',
						endTimeStr: '12:00',
						typeId: '',
						type: 'holiday',
						scheduleWeek: '',
						scheduleDate: '',
						techId: ''
					},
					{
						scheduleDate: '',
						scheduleDateStr: '09:00',
						endTimeStr: '12:00',
						typeId: '',
						type: 'holiday',
						scheduleWeek: '',
						scheduleDate: '',
						techId: ''
					},
					{
						scheduleDate: '',
						scheduleDateStr: '10:00',
						endTimeStr: '12:00',
						typeId: '',
						type: 'order',
						scheduleWeek: '',
						scheduleDate: '',
						techId: ''
					}
				]
			},
			{	sevenDate: '2015-01-02',
				techScheduleInfos: [{
					scheduleDate: '',
					scheduleDateStr: '08:00',
					endTimeStr: '12:00',
					typeId: '',
					type: 'holiday',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}]
			},
			{
				sevenDate: '2015-01-03',
				workBeginTime:'11:34',
				workEndTime:'45:43',
				techScheduleInfos: [{
					scheduleDate: '',
					scheduleDateStr: '08:00',
					endTimeStr: '12:00',
					typeId: '',
					type: 'order',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}]
			},
			{
				sevenDate: '2015-01-04',
				workBeginTime:'01:23',
				workEndTime:'22:10',
				techScheduleInfos: [{
					scheduleDate: '',
					scheduleDateStr: '08:00',
					endTimeStr: '12:00',
					typeId: '',
					type: 'holiday',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}]
			},
			{
				sevenDate: '2015-01-05',
				workBeginTime:'10:89',
				workEndTime:'03:33',
				techScheduleInfos: [{
					scheduleDate: '',
					scheduleDateStr: '08:00',
					endTimeStr: '12:00',
					typeId: '',
					type: 'holiday',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}]
			},
			{
				sevenDate: '2015-01-06',
				workBeginTime:'10:22',
				workEndTime:'11:89',
				techScheduleInfos: [{
					scheduleDate: '',
					scheduleDateStr: '08:00',
					endTimeStr: '12:00',
					typeId: '',
					type: 'order',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}]
			},
			{
				sevenDate: '2015-01-07',
				workBeginTime:'45:30',
				workEndTime:'93:03',
				techScheduleInfos: [{
					scheduleDate: '',
					scheduleDateStr: '08:00',
					endTimeStr: '12:00',
					typeId: '',
					type: 'holiday',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				},
				{
					scheduleDate: '',
					scheduleDateStr: '09:00',
					endTimeStr: '24:00',
					typeId: '',
					type: 'order',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}]
			}
		]
	},
		{
		name: ' 曹居伟11',
		phone: '15711445668',
		stationName: '北京',
		scheduleDateInfos: [{
				sevenDate: '0000-01-01',
				workBeginTime:'',
				workEndTime:'',
				techScheduleInfos: [{
						scheduleDate: '',
						scheduleDateStr: '09:00',
						endTimeStr: '22:00',
						typeId: '',
						type: 'holiday',
						scheduleWeek: '',
						scheduleDate: '',
						techId: ''
					},
					{
						scheduleDate: '',
						scheduleDateStr: '09:00',
						endTimeStr: '22:00',
						typeId: '',
						type: 'holiday',
						scheduleWeek: '',
						scheduleDate: '',
						techId: ''
					}
				]
			},
			{	sevenDate: '2015-01-02',
				workBeginTime:'11:30',
				workEndTime:'20:03',
				techScheduleInfos: [{
					scheduleDate: '',
					scheduleDateStr: '08:00',
					endTimeStr: '24:00',
					typeId: '',
					type: 'order',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				},
				{
					scheduleDate: '',
					scheduleDateStr: '11:00',
					endTimeStr: '25:00',
					typeId: '',
					type: 'holiday',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				},
				{
					scheduleDate: '',
					scheduleDateStr: '11:00',
					endTimeStr: '25:00',
					typeId: '',
					type: 'order',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}
				]
			},
			{
				sevenDate: '2015-01-03',
				workBeginTime:'',
				workEndTime:'93:03',
				techScheduleInfos: [{
					scheduleDate: '',
					scheduleDateStr: '08:00',
					endTimeStr: '12:00',
					typeId: '',
					type: 'order',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				},
				{
					scheduleDate: '',
					scheduleDateStr: '11:00',
					endTimeStr: '25:00',
					typeId: '',
					type: 'holiday',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				},
				]
			},
			{
				sevenDate: '2015-01-04',
				workBeginTime:'42:30',
				workEndTime:'11:03',
				techScheduleInfos: [{
					scheduleDate: '',
					scheduleDateStr: '08:00',
					endTimeStr: '12:00',
					typeId: '',
					type: 'holiday',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}]
			},
			{
				sevenDate: '2015-01-05',
				workBeginTime:'11:30',
				workEndTime:'22:03',
				techScheduleInfos: [{
					scheduleDate: '',
					scheduleDateStr: '08:00',
					endTimeStr: '12:00',
					typeId: '',
					type: 'holiday',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}]
			},
			{
				sevenDate: '2015-01-06',
				workBeginTime:'33:30',
				workEndTime:'44:03',
				techScheduleInfos: [{
					scheduleDate: '',
					scheduleDateStr: '08:00',
					endTimeStr: '12:00',
					typeId: '',
					type: 'holiday',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}]
			},
			{
				sevenDate: '2015-01-07',
				workBeginTime:'',
				workEndTime:'93:03',
			}
		]
	}
	]
		
	export default{
		data(){
			return{
				pickerOptions0:{
					disabledDate(time){
						return time.getTime() > Date.now()+691200000;
					}
				},
				listLoading:false,
				total:0,
				pageSync:1,
				pageSize:10,
				organizations:[],
				stations:[],
				skils:[],
				chooses:'',
				search:{
					orgId:'',
					stationId:'',
					skilId:'',
					beginTime:''
				},
				choose: [
					{
						value: "name",
						label: "技师姓名"
					},
					{
						value: "phone",
						label: "手机号"
					}
				],
				chooContent:'',
				value1:'',
				tableData:[]
			}
		},
		computed:{
			// table开始和结束时间
			store(){ return this.GetDateStr(0) },
			end(){ return this.GetDateStr(6) },
		},
		methods:{
			schedulePath(item){
				//判断是订单还是休假
				if(item.type == "order"){
					this.$router.push({ path: "/clean/orderinfo", query: { id: item.typeId } });
				}else{
					return
				}
			},
			//工作安排截取年月份和秒
			tableDataTime(val,item){
				var val = val.split(" ")[1].substring(0,5)
				var item = item.split(" ")[1].substring(0,5)
				return val+'~'+item
			},
			//判断全天不可接单
			noOrders(item){
				if(item!=undefined){
					var bol;
					for( var i = 0; i<item.length; i++){
						if(item[i].type == "order"){
							return false
						}else{
							bol = true
						}
					}
					return bol
				}else{
					return true
				}
			},
			//工作时间拼接，否则会渲染 ~ 符号 ,截取掉秒
			workTimeMosaic(data,item){
				let str = data.substring(0,5)+'~'+item.substring(0,5);
				if(data && item){
					return str
				}else{
					return
				}
			},
			pickerChange(val){
				this.search.beginTime = val
			},
			//搜索框清空
			searchEmpty(){
				this.service.orgId = ''
				this.service.stationId = ''
				this.service.skilId = ''
				this.search.beginTime = ''
			},
			//搜索
			searchClick(item){
				// 解决： 【同时】把下拉框和input框清空 发送过去的数据没变
				console.log(this.chooses,"-------this.this.chooses------")
				// if('name' in item || 'phone' in item){
				// 	if(!this.chooContent){
				// 		delete item.name
				// 		delete item.phone
				// 	}
				// }
				if(this.chooses){
					item[this.chooses] = this.chooContent
				}else{
					delete item.name
					delete item.phone
				}
				//防止二次渲染
				if(this.pageSync != 1){
					this.pageSync = 1
				}else{
					this.getList()
				}
			},
			handleSizeChange(page){
				this.pageSize = page;
				if(this.pageSync == 1){
					this.getList()
				}else{
					this.pageSync = 1
				}
			},
			handleCurrentChange(val){
				this.pageSync = val
				this.getList()
			},
			getList(){
				this.listLoading = true
				console.log(this.search,this.pageSync,this.pageSize)
				getData(this.search,this.pageSync,this.pageSize)
					.then(({data})=>{
						if(data.code){
							this.listLoading = false
							this.tableData = data.data.list || []
							this.total = data.data.count
						}else{
							this.listLoading = false
						}
						console.log(data,"data-----")
					})
					.catch(error=>{
						this.listLoading = false
						console.log(error,"error----")
					})
			},
			// table开始和结束时间
			GetDateStr(AddDayCount){
				var dd = new Date();  
			   	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期  
			   	var y = dd.getFullYear();   
			   	var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
			   	var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
			   	return y+"-"+m+"-"+d;   
			},
		},
		mounted(){
			mechanismService()
				.then(({data})=>{
					if(data.code==1){
						this.organizations = data.data.organizations
						this.search.orgId = this.organizations[0].id
						this.stations = data.data.stations.slice(1)
						this.search.stationId = this.stations[0].id
						this.skils = data.data.skils
					}else{

					}
					// var obj = data.data.data
					// if(data.data){}
					console.log(data)
				})
				.catch(error=>{
					console.log(error)
				})
			// this.getList()
		}
	}
</script>

<style>
	#app .schedule-table tr td:hover{
		-webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
		-moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
		box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset
	}
	.schedule-table .el-loading-mask{
		padding: 50px 0;
	}
	.nodata{
		text-align: center;
		color:#5e7382;
		padding: 30px 0;
	}
	.order{
		color: #4c70e8;
		cursor: pointer;
	}
	.schedule-table td.work{
		vertical-align:top;
		position: relative;
	}
	#app .schedule-table .el-table td{
		height: auto;
	}
	.work-add-bo{
		padding: 10px 0;
	}
	.no-orders{
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: red;
		z-index: 100;
	}
	.work-time-bor{
		height: 30px;
		line-height: 30px;
		border-bottom: 1px solid #dfe6ec;
	}
	.work-time{
		/* border-bottom: 1px solid #dfe6ec; */
		/* padding: 10px 0; */
		height: 30px;
		line-height: 30px;
	}
	.bor-time{
		border-bottom: 1px solid #dfe6ec;
	}
	.schedule-table .el-table th{
		border-right: none;
	}
	.schedult-pagin {
	  margin: 20px 0;
	  float: right;
	}
	
	.schedult-con{
		overflow: hidden;
		background: #fff;
  		border-bottom: 1px solid #eee;
	}
	.schedult-search{
		 padding: 20px;
		 border-bottom:1px solid #eee; 
	}
	.searchRight{
		margin-right: 1%;
		margin-bottom: 10px; 
	}
	.search-width{
		 width: 30%;
	}
	.search-width .el-input-group__prepend .el-input__inner {
	  width: 100px;
	  text-align: center;
	}
	.schedult-search .el-select .el-tag{
		line-height: 23px;
	}
	.select-width{width: 15%}
	.schedule-table{
		padding: 20px;
	}
	.schedule-table td.work .cell{
		padding: 0;
		height: 100%;
	}
	.work-arrange{
		/*box-sizing: border-box;*/
		padding: 10px 0 110px 0;
	}
</style>