<template>
	<div class="schedult">
		<div class="schedult-con">
			<!-- 搜索 -->
			<div class="schedult-search">
				<div>
					<orgSearch @orgsearch="orgSearch" ref="orgSearch" :schedule="true"></orgSearch>
					<!-- <el-select class="searchRight select-width" v-model="search.orgId" placeholder="选择机构">
						<el-option v-for="item in organizations" :key="item.id" :label="item.name" :value="item.id"></el-option>	
					</el-select> -->
					<el-select class="searchRight select-width" clearable v-model="search.stationId" placeholder="选择服务站">
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
				<div style="color:#929496" v-if="techUserType=='sys'">请选择搜索条件：服务机构查询数据</div>
				<div v-if="tableData.length">
					<el-table :data="tableData" border style="width: 100%">
						<!-- 技师 -->
							<el-table-column label="技师" align="center">
								<el-table-column align="center" min-width="140">
									<template scope="scope">
										<div class="schedule-tech">
											<div>
												<el-tooltip placement="left" :disabled="scope.row.status=='yes' ? scope.row.name.length < 9 : scope.row.name.length <=2" :content="scope.row.name">
													<div :class="{'ov-flow':scope.row.status=='yes'}"><span :class="{'name-status':scope.row.status!='yes'}">{{scope.row.name}}</span><span class="color-red">{{scope.row.status=="yes"?'':'(暂停服务)'}}</span></div>
												</el-tooltip>
											</div>
											<div>{{scope.row.phone}}</div>
											<div class="ov-flow">
												<el-tooltip placement="left" :disabled="scope.row.stationName.length <=8" :content="scope.row.stationName">
													<span>{{scope.row.stationName}}</span>
												</el-tooltip>
											</div>
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
							<el-table-column min-width="120" v-for="(item,index) in tableData[0].scheduleDateInfos" :key="index" :label="item.sevenDate+'('+weekNum(item.weekNum)+')'" align="center" className="work">
								<template scope="scope">
									<!-- 
										1：有工资时间
										2：没有工作时间但是有工资安排
									 -->
									<div class="work-bo" v-if="scope.row.scheduleDateInfos[index].workBeginTime || scope.row.scheduleDateInfos[index].techScheduleInfos">
										<!-- 判断有没有border-bottom, -->
										<div :class="['work-time',{'bor-time':scope.row.scheduleDateInfos[index].workBeginTime || !noOrders(scope.row.scheduleDateInfos[index].techScheduleInfos)}]">
											<!-- {{scope.row.scheduleDateInfos[index].workBeginTime ? workTimeMosaic(scope.row.scheduleDateInfos[index].workBeginTime,scope.row.scheduleDateInfos[index].workEndTime):''}} -->
											<span v-if="scope.row.scheduleDateInfos[index].workBeginTime">{{workTimeMosaic(scope.row.scheduleDateInfos[index].workBeginTime,scope.row.scheduleDateInfos[index].workEndTime)}}</span>
											<span class="color-red" v-if="!scope.row.scheduleDateInfos[index].workBeginTime && !noOrders(scope.row.scheduleDateInfos[index].techScheduleInfos)">全天不可接单</span>
										</div>
										<div class="work-add-bo">
											<div class="time-arrange-content">
												 <!-- 有工作时间直接渲染  没有工作时间判断有没有工作安排，有工作安排是否有订单数据 -->
												<div v-if="scope.row.scheduleDateInfos[index].workBeginTime || ((scope.row.scheduleDateInfos[index].workBeginTime || scope.row.scheduleDateInfos[index].techScheduleInfos) && data.type!='holiday')" 
													:class="{'order':data.type!='holiday'}" v-for="(data,i) in scope.row.scheduleDateInfos[index].techScheduleInfos" :key="i"
													@click="schedulePath(data)">
													{{tableDataTime(data.startTimeStr,data.endTimeStr)}}
													<!-- <span>{{data.type=='holiday'?'休假':'订单'}}</span> -->
													<span>{{data.type=='holiday'?'休假':(data.type=='order'?'订单':'(多次服务)')}}</span>
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
					  <span v-if="!scheduleFlag"></span>
					  <span v-else>暂无数据</span>
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
	import orgSearch from '../../components/Hamburger/orgSearch.vue'
	import {
		mechanismService,
		scheduleList,
		listByOrgId
	} from "@/api/tech";
	import { userType} from '../../utils/auth'
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
		
	export default{
		name:"schedule",
		data(){
			return{
				pickerOptions0:{
					disabledDate(time){
						return time.getTime() > Date.now()+691200000;
					}
				},
				scheduleFlag:false,
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
			techUserType(){
				return userType()
			},
		},
		components:{
			orgSearch
		},
		methods:{
			weekNum(num){
				switch(num){
					case 1:
						return '周一'
					case 2:
						return '周二'
					case 3:
						return '周三'
					case 4:
						return '周四'
					case 5:
						return '周五'
					case 6:
						return '周六'
					case 7:
						return '周日'
				} 
			},
			orgSearch(item){
				this.search.orgId = item
				this.search.stationId = ''
				this.search.skilId = ''
				if(!item){
					this.stations = []
					this.skils = []
					return
				}
				listByOrgId({orgId:item}).then(data=>{
					let list  = data.data.data.stations
					if(list[0].id=='0'){
						list = list.slice(1)
					}
					this.stations = list
					this.skils = data.data.data.skils
					if(this.stations.length>0 && this.techUserType=='station'){
						this.search.stationId = this.stations[0].id
					}
				})
			},
			listByOrgId(item){
				return new Promise((rej,res)=>{
					listByOrgId({orgId:item}).then(data=>{
						if(data.data.code==1){
							res(data.data.data)
						}
					}).catch(error=>{
					})
				})
			},
			schedulePath(item){
				//判断是不是多次服务
				if(item.orderType == 'group_split_yes'){
					localStorage.setItem("grouporderId", item.masterId);
					this.$router.push({ path: "/clean/grouporderinfo", query: { id: item.masterId } });
					return
				}
				// 判断是订单还是休假
				if(item.type == "order"){
					this.$router.push({ path: "/clean/orderinfo", query: { id: item.typeId } });
					 window.localStorage.setItem("orderId", item.typeId);
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
				if(this.techUserType == 'sys'){
					if(!item.orgId){
						 this.$message({
							message: '请选择服务机构查询数据',
							type: 'warning'
						});
						return
					}
				}
				// 解决： 【同时】把下拉框和input框清空 发送过去的数据没变
				let obj = Object.assign({},item)
				if('name' in obj || 'phone' in obj){
					delete obj.name
					delete obj.phone
				}
				if(this.chooses){
					obj[this.chooses] = this.chooContent
				}
				this.search = obj

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
				this.scheduleFlag = true
				getData(this.search,this.pageSync,this.pageSize)
					.then(({data})=>{
						if(data.code){
							this.listLoading = false
							this.tableData = data.data.list || []
							this.total = data.data.count
						}else{
							this.listLoading = false
						}
					})
					.catch(error=>{
						this.listLoading = false
					})
			},
		},
		mounted(){
			if(this.techUserType=='station' || this.techUserType=='org'){
				this.getList()
			}
			let list = async ()=>{
				try{
					let _list = await this.$refs['orgSearch'].listDataAll()
				}
				catch(error){
				}
			}
			list()
		}
	}
</script>

<style>
	.name-status{
		vertical-align:middle;
		width: 40%;
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.color-red{
		color: red;
	}
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
	.ov-flow{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>