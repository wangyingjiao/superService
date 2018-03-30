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
	          		<el-select style="width:20%" v-model="search.skilId" multiple placeholder="请选择技能" class="searchRight" filterable >
		                <el-option v-for="(item,index) in skils" :key="index" :label="item.name" :value="item.id">
		                </el-option>
	              	</el-select>
	              	<button class="search-button el-icon-search btn_search btn-color serch-btn" @click="searchClick(search)"> 搜索</button>
				</div>
				<div>
					<el-date-picker
						style="width:15%"
				      	v-model="value1"
				      	type="date"
				      	placeholder="选择日期"
				      	>
				    </el-date-picker>
				</div>
			</div>
			<!-- 搜索完成 -->
			<!-- 表格 -->
			<div class="schedule-table">
				<el-table :data="tableData" stripe border style="width: 100%">
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
										<div class="work-time">工作时间</div>
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
					<!-- 时间 -->
						<!-- <el-table-column v-for="(item,index) in tableData[0].date" :key="index" :label="item" align="center" className="work">
							<template scope="scope">
								<div class="work-bo" v-if="scope.row.arr[index].start">
									<div class="work-time">{{scope.row.arr[index].start+'~'+scope.row.arr[index].end}}</div>
									<div class="work-add-bo">
										<div v-for="(data,key) in scope.row.arr[index].arrange" :key="key">
											{{data}}
										</div>
									</div>
								</div>
								<div v-else class="no-orders">
									<div>全天不可接单</div>
								</div>
							</template>
						</el-table-column> -->

							<el-table-column v-for="(item,index) in tableData[0].scheduleDateInfos" :key="index" :label="item.sevenDate" align="center" className="work">
								<template scope="scope">
									<div class="work-bo" v-if="scope.row.scheduleDateInfos[index].workBeginTime">
										<div class="work-time">{{scope.row.scheduleDateInfos[index].workBeginTime+'~'+scope.row.scheduleDateInfos[index].workEndTime}}</div>
										<div class="work-add-bo">
											<div class="time-arrange-content">
												<div :class="{'order':item.type!='holiday'}" v-for="(item,index) in scope.row.scheduleDateInfos[index].techScheduleInfos" :key="index">
													{{item.startTime+'~'+item.endTime}}
													<span>{{item.type=='holiday'?'休假':'订单'}}</span>
												</div>
											</div>
										</div>
									</div>
									<div v-else class="no-orders">
										<div>全天不可接单</div>
									</div>
								</template>
							</el-table-column>



						<!-- <el-table-column prop="time" :label="store" align="center" className="work">
							<template scope="scope">
								<div style="height:100%" v-if="scope.row.time">
									<div class="work-time">{{scope.row.time}}</div>
									<div class="time-arrange-whole">
										<div class="time-arrange-content">
											<div v-for="(item,index) in scope.row.arrange" :key="index">{{item}}</div>
										</div>
									</div>
								</div>
								<div v-else class="no-orders">
									<div class="time-arrange-content">
										<div>全天不可接单</div>
									</div>
								</div>
							</template>
						</el-table-column> -->
					<!--时间结束 -->
					<!-- 过渡时间 -->
					<!-- 过渡结束 -->
					<!-- 结束时间 -->
					<!-- 结束时间结束 -->
 				 </el-table>
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
		mechanismService
	} from "@/api/tech";

	var getData = function(obj,size,page){
		return new Promise((res,rej)=>{
			res(2)
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
						startTime: '08:00',
						endTime: '12:00',
						typeId: '',
						type: 'holiday',
						scheduleWeek: '',
						scheduleDate: '',
						techId: ''
					},
					{
						scheduleDate: '',
						startTime: '09:00',
						endTime: '12:00',
						typeId: '',
						type: 'holiday',
						scheduleWeek: '',
						scheduleDate: '',
						techId: ''
					},
					{
						scheduleDate: '',
						startTime: '10:00',
						endTime: '12:00',
						typeId: '',
						type: 'order',
						scheduleWeek: '',
						scheduleDate: '',
						techId: ''
					}
				]
			},
			{	sevenDate: '2015-01-02',
				workBeginTime:'10:00',
				workEndTime:'14:34',
				techScheduleInfos: [{
					scheduleDate: '',
					startTime: '08:00',
					endTime: '12:00',
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
					startTime: '08:00',
					endTime: '12:00',
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
					startTime: '08:00',
					endTime: '12:00',
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
					startTime: '08:00',
					endTime: '12:00',
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
					startTime: '08:00',
					endTime: '12:00',
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
					startTime: '08:00',
					endTime: '12:00',
					typeId: '',
					type: 'holiday',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				},
				{
					scheduleDate: '',
					startTime: '09:00',
					endTime: '24:00',
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
				workEndTime:'93:03',
				techScheduleInfos: [{
						scheduleDate: '',
						startTime: '09:00',
						endTime: '22:00',
						typeId: '',
						type: 'order',
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
					startTime: '08:00',
					endTime: '24:00',
					typeId: '',
					type: 'order',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				},
				{
					scheduleDate: '',
					startTime: '11:00',
					endTime: '25:00',
					typeId: '',
					type: 'order',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}]
			},
			{
				sevenDate: '2015-01-03',
				workBeginTime:'',
				workEndTime:'93:03',
				techScheduleInfos: [{
					scheduleDate: '',
					startTime: '08:00',
					endTime: '12:00',
					typeId: '',
					type: 'order',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}]
			},
			{
				sevenDate: '2015-01-04',
				workBeginTime:'42:30',
				workEndTime:'11:03',
				techScheduleInfos: [{
					scheduleDate: '',
					startTime: '08:00',
					endTime: '12:00',
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
					startTime: '08:00',
					endTime: '12:00',
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
					startTime: '08:00',
					endTime: '12:00',
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
				techScheduleInfos: [{
					scheduleDate: '',
					startTime: '08:00',
					endTime: '12:00',
					typeId: '',
					type: 'holiday',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				},
				{
					scheduleDate: '',
					startTime: '23:00',
					endTime: '24:00',
					typeId: '',
					type: 'holiday',
					scheduleWeek: '',
					scheduleDate: '',
					techId: ''
				}]
			}
		]
	}
	]
		
		

	// let tableData = [
	// 	{
	// 			date: ['2016-05-02','2016-05-03','2016-05-04','2016-05-05','2016-05-06','2016-05-07','2016-05-08'],
	// 			name: '王小虎1',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			arr:[
	// 				{
	// 					start:'',
	// 					end:'18:00',
	// 					arrange:['08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 				},
	// 				{
	// 					start:'13:00',
	// 					end:'18:00',
	// 					arrange:['08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 				},
	// 				{
	// 					start:'13:00',
	// 					end:'18:00',
	// 					arrange:['08:00~12:00   订单'],
	// 				},
	// 				{
	// 					start:'13:00',
	// 					end:'18:00',
	// 					arrange:['08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 				},
	// 				{
	// 					start:'13:00',
	// 					end:'18:00',
	// 					arrange:['08:00~12:00   订单','08:00~12:00   订单'],
	// 				},
	// 				{
	// 					start:'13:00',
	// 					end:'18:00',
	// 					arrange:['08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 				},
	// 				{
	// 					start:'13:00',
	// 					end:'18:00',
	// 					arrange:[],
	// 				}
	// 			],
	// 		},
	// 		{
	// 			date: ['2016-06-02','2016-06-03','2016-05-04','2016-06-05','2016-06-06','2016-06-07','2016-06-08'],
	// 			name: '曹居伟',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			arr:[
	// 				{
	// 					start:'01:00',
	// 					end:'11:00',
	// 					arrange:['01:00~11:00   订单','02:00~22:00   订单','03:00~33:00   订单'],
	// 				},
	// 				{
	// 					start:'02:00',
	// 					end:'22:00',
	// 					arrange:['04:00~44:00   订单','05:00~55:00   订单','06:00~66:00   订单','07:00~77:00   订单'],
	// 				},
	// 				{
	// 					start:'03:00',
	// 					end:'33:00',
	// 					arrange:['08:00~88:00   订单'],
	// 				},
	// 				{
	// 					start:'04:00',
	// 					end:'44:00',
	// 					arrange:['09:00~99:00   订单','10:00~00:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 				},
	// 				{
	// 					start:'05:00',
	// 					end:'18:00',
	// 					arrange:['08:00~12:00   订单','08:00~12:00   订单'],
	// 				},
	// 				{
	// 					start:'07:00',
	// 					end:'18:00',
	// 					arrange:['08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 				},
	// 				{
	// 					start:'08:00',
	// 					end:'18:00',
	// 					arrange:[],
	// 				}
	// 			],
	// 		}
	// ]

	// let tableData = [
	// 		{
	// 			date: ['2016-05-02','2016-05-03','2016-05-04','2016-05-05','2016-05-06','2016-05-07','2016-05-08'],
	// 			name: '王小虎1',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			time0:'08:00~18:00',
	// 			arrange0:['08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 			time1:{
	// 				start:'13:00',
	// 				end:'18:00'
	// 			},
	// 			arrange1:['08:10~12:00   订单','10:00~12:00   订单'],
	// 			time2:{
	// 				start:'13:00',
	// 				end:'18:00'
	// 			},
	// 			arrange2:['08:20~12:00   订单'],
	// 			time3:{
	// 				start:'13:00',
	// 				end:'18:00'
	// 			},
	// 			arrange3:['08:30~12:00   订单'],
	// 			time4:{
	// 				start:'13:00',
	// 				end:'18:00'
	// 			},
	// 			arrange4:['08:00~12:00   订单'],
	// 			time5:{
	// 				start:'13:00',
	// 				end:'18:00'
	// 			},
	// 			arrange5:['08:40~12:00   订单'],
	// 			time6:{
	// 				start:'13:00',
	// 				end:'18:00'
	// 			},
	// 			arrange6:['08:50~12:00   订单'],
	// 		},
	// 		{
	// 			date: ['2016-05-02','2016-05-03','2016-05-04','2016-05-05','2016-05-06','2016-05-07','2016-05-08'],
	// 			name: '王小虎12',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			time0:'01:00~18:00',
	// 			arrange0:['11:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 			time1:'02:00~18:00',
	// 			arrange1:['08:10~12:00   订单','10:00~12:00   订单'],
	// 			time2:'03:00~18:00',
	// 			arrange2:['08:20~12:00   订单'],
	// 			time3:'',
	// 			arrange3:['08:30~12:00   订单'],
	// 			time4:'05:00~18:00',
	// 			arrange4:['08:00~12:00   订单'],
	// 			time5:'06:00~18:00',
	// 			arrange5:['08:40~12:00   订单'],
	// 			time6:'07:00~18:00',
	// 			arrange6:['24:50~12:00   订单'],
	// 		},
	// 		{
	// 			date: ['2016-05-02','2016-05-03','2016-05-04','2016-05-05','2016-05-06','2016-05-07','2016-05-08'],
	// 			name: '王小虎12',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			time0:'01:00~18:00',
	// 			arrange0:['11:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 			time1:'02:00~18:00',
	// 			arrange1:['08:10~12:00   订单','10:00~12:00   订单'],
	// 			time2:'03:00~18:00',
	// 			arrange2:['08:20~12:00   订单'],
	// 			time3:'',
	// 			arrange3:['08:30~12:00   订单'],
	// 			time4:'05:00~18:00',
	// 			arrange4:['08:00~12:00   订单'],
	// 			time5:'06:00~18:00',
	// 			arrange5:['08:40~12:00   订单'],
	// 			time6:'07:00~18:00',
	// 			arrange6:['24:50~12:00   订单'],
	// 		},
	// 		{
	// 			date: ['2016-05-02','2016-05-03','2016-05-04','2016-05-05','2016-05-06','2016-05-07','2016-05-08'],
	// 			name: '王小虎12',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			time0:'01:00~18:00',
	// 			arrange0:['11:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 			time1:'02:00~18:00',
	// 			arrange1:['08:10~12:00   订单','10:00~12:00   订单'],
	// 			time2:'03:00~18:00',
	// 			arrange2:['08:20~12:00   订单'],
	// 			time3:'',
	// 			arrange3:['08:30~12:00   订单'],
	// 			time4:'05:00~18:00',
	// 			arrange4:['08:00~12:00   订单'],
	// 			time5:'06:00~18:00',
	// 			arrange5:['08:40~12:00   订单'],
	// 			time6:'07:00~18:00',
	// 			arrange6:['24:50~12:00   订单'],
	// 		},
	// 		{
	// 			date: ['2016-05-02','2016-05-03','2016-05-04','2016-05-05','2016-05-06','2016-05-07','2016-05-08'],
	// 			name: '王小虎12',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			time0:'01:00~18:00',
	// 			arrange0:['11:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 			time1:'02:00~18:00',
	// 			arrange1:['08:10~12:00   订单','10:00~12:00   订单'],
	// 			time2:'03:00~18:00',
	// 			arrange2:['08:20~12:00   订单'],
	// 			time3:'',
	// 			arrange3:['08:30~12:00   订单'],
	// 			time4:'05:00~18:00',
	// 			arrange4:['08:00~12:00   订单'],
	// 			time5:'06:00~18:00',
	// 			arrange5:['08:40~12:00   订单'],
	// 			time6:'07:00~18:00',
	// 			arrange6:['24:50~12:00   订单'],
	// 		},
	// 		{
	// 			date: ['2016-05-02','2016-05-03','2016-05-04','2016-05-05','2016-05-06','2016-05-07','2016-05-08'],
	// 			name: '王小虎12',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			time0:'01:00~18:00',
	// 			arrange0:['11:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 			time1:'02:00~18:00',
	// 			arrange1:['08:10~12:00   订单','10:00~12:00   订单'],
	// 			time2:'03:00~18:00',
	// 			arrange2:['08:20~12:00   订单'],
	// 			time3:'',
	// 			arrange3:['08:30~12:00   订单'],
	// 			time4:'05:00~18:00',
	// 			arrange4:['08:00~12:00   订单'],
	// 			time5:'06:00~18:00',
	// 			arrange5:['08:40~12:00   订单'],
	// 			time6:'07:00~18:00',
	// 			arrange6:['24:50~12:00   订单'],
	// 		},
	// 		{
	// 			date: ['2016-05-02','2016-05-03','2016-05-04','2016-05-05','2016-05-06','2016-05-07','2016-05-08'],
	// 			name: '王小虎12',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			time0:'01:00~18:00',
	// 			arrange0:['11:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 			time1:'02:00~18:00',
	// 			arrange1:['08:10~12:00   订单','10:00~12:00   订单'],
	// 			time2:'03:00~18:00',
	// 			arrange2:['08:20~12:00   订单'],
	// 			time3:'',
	// 			arrange3:['08:30~12:00   订单'],
	// 			time4:'05:00~18:00',
	// 			arrange4:['08:00~12:00   订单'],
	// 			time5:'06:00~18:00',
	// 			arrange5:['08:40~12:00   订单'],
	// 			time6:'07:00~18:00',
	// 			arrange6:['24:50~12:00   订单'],
	// 		},
	// 		{
	// 			date: ['2016-05-02','2016-05-03','2016-05-04','2016-05-05','2016-05-06','2016-05-07','2016-05-08'],
	// 			name: '王小虎12',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			time0:'01:00~18:00',
	// 			arrange0:['11:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 			time1:'02:00~18:00',
	// 			arrange1:['08:10~12:00   订单','10:00~12:00   订单'],
	// 			time2:'',
	// 			arrange2:['08:20~12:00   订单'],
	// 			time3:'',
	// 			arrange3:['08:30~12:00   订单'],
	// 			time4:'05:00~18:00',
	// 			arrange4:['08:00~12:00   订单'],
	// 			time5:'06:00~18:00',
	// 			arrange5:['08:40~12:00   订单'],
	// 			time6:'07:00~18:00',
	// 			arrange6:['24:50~12:00   订单'],
	// 		},
	// 		{
	// 			date: ['2016-05-02','2016-05-03','2016-05-04','2016-05-05','2016-05-06','2016-05-07','2016-05-08'],
	// 			name: '王小虎12',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			time0:'01:00~18:00',
	// 			arrange0:['11:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 			time1:'02:00~18:00',
	// 			arrange1:['08:10~12:00   订单','10:00~12:00   订单'],
	// 			time2:'03:00~18:00',
	// 			arrange2:['08:20~12:00   订单'],
	// 			time3:'',
	// 			arrange3:['08:30~12:00   订单'],
	// 			time4:'05:00~18:00',
	// 			arrange4:['08:00~12:00   订单'],
	// 			time5:'06:00~18:00',
	// 			arrange5:['08:40~12:00   订单'],
	// 			time6:'07:00~18:00',
	// 			arrange6:['24:50~12:00   订单'],
	// 		},
	// 		{
	// 			date: ['2016-05-02','2016-05-03','2016-05-04','2016-05-05','2016-05-06','2016-05-07','2016-05-08'],
	// 			name: '王小虎12',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			time0:'01:00~18:00',
	// 			arrange0:['11:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 			time1:'02:00~18:00',
	// 			arrange1:['08:10~12:00   订单','10:00~12:00   订单'],
	// 			time2:'03:00~18:00',
	// 			arrange2:['08:20~12:00   订单'],
	// 			time3:'',
	// 			arrange3:['08:30~12:00   订单'],
	// 			time4:'05:00~18:00',
	// 			arrange4:['08:00~12:00   订单'],
	// 			time5:'06:00~18:00',
	// 			arrange5:['08:40~12:00   订单'],
	// 			time6:'07:00~18:00',
	// 			arrange6:['24:50~12:00   订单'],
	// 		},
	// 		{
	// 			date: ['2016-05-02','2016-05-03','2016-05-04','2016-05-05','2016-05-06','2016-05-07','2016-05-08'],
	// 			name: '王小虎12',
	// 			phone:'15711445668',
	// 			address: '上海市普陀区金',
	// 			time0:'01:00~18:00',
	// 			arrange0:['11:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	// 			time1:'02:00~18:00',
	// 			arrange1:['08:10~12:00   订单','10:00~12:00   订单'],
	// 			time2:'03:00~18:00',
	// 			arrange2:['08:20~12:00   订单'],
	// 			time3:'',
	// 			arrange3:['08:30~12:00   订单'],
	// 			time4:'05:00~18:00',
	// 			arrange4:['08:00~12:00   订单'],
	// 			time5:'06:00~18:00',
	// 			arrange5:['08:40~12:00   订单'],
	// 			time6:'07:00~18:00',
	// 			arrange6:['24:50~12:00   订单'],
	// 		}
	// 	]
	export default{
		data(){
			return{
				total:100,
				pageSync:1,
				pageSize:10,
				organizations:[],
				stations:[],
				skils:[],
				chooses:'',
				search:{
					orgId:'',
					stationId:'',
					skilId:[]
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
				tableData:tableData
			}
		},
		computed:{
			// table开始和结束时间
			store(){ return this.GetDateStr(0) },
			end(){ return this.GetDateStr(6) },
			//table一星期内的时间和工作安排的字段，为了循环tr
			tableDataTime(){
				let arr = ["time0","time1","time2","time3","time4","time5","time6"]
				return arr
			},
			tableDataAdd(){
				let arr = ["arrange0","arrange1","arrange2","arrange3","arrange4","arrange5","arrange6"]
				return arr
			}
		},
		methods:{
			//搜索框清空
			searchEmpty(){
				this.service.orgId = ''
				this.service.stationId = ''
				this.service.skilId = []
			},
			//搜索
			searchClick(item){
				item[this.chooses] = this.chooContent
				this.getList()
			},
			handleSizeChange(page){
				this.pageSize = page;
				this.getList()
			},
			handleCurrentChange(val){
				this.pageSync = val
				this.getList()
			},
			getList(){
				console.log(this.search,this.pageSync,this.pageSize)
				getData(this.search,this.pageSync,this.pageSize)
					.then(data=>{
						console.log(data)
					})
					.catch(error=>{
						console.log(error)
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
			this.getList()
		}
	}
</script>

<style>
	.order{
		color: #4c70e8;
		cursor: pointer;
	}
	.schedule-table td.work{
		vertical-align:text-bottom;
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
	}
	.work-time{
		border-bottom: 1px solid #dfe6ec;
		padding: 10px 0;
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
		padding: 10px 0;
	}
</style>