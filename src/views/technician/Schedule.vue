<template>
	<div class="schedult">
		<div class="schedult-con">
			<!-- 搜索 -->
			<div class="schedult-search">
				<div>
					<el-select class="searchRight select-width" v-model="search.mechanism" placeholder="选择机构">
					<el-option v-for="item in opt" :key="item.id" :label="item.value" :value="item.id"></el-option>	
					</el-select>
					<el-select class="searchRight select-width" v-model="search.service" placeholder="选择服务站">
						<el-option v-for="item in opt" :key="item.id" :label="item.value" :value="item.id"></el-option>	
					</el-select>
					<el-input v-model.trim ="chooContent" placeholder="输入要搜索的内容" class="searchRight search-width">
	              		<el-select  v-model="search.chooses" clearable placeholder="请选择"  slot="prepend">
	                		<el-option v-for="item in opt" :key="item.id" :label="item.value" :value="item.id">
	                		</el-option>
	              		</el-select>
	          		</el-input>
	          		<el-select style="width:20%" v-model="roomSel2Arr" multiple placeholder="请选择技能" class="searchRight" filterable >
		                <el-option v-for="(item,index) in opt" :key="index" :label="item.value" :value="item.id">
		                </el-option>
	              	</el-select>
	              	<button class="search-button el-icon-search btn_search btn-color serch-btn"> 搜索</button>
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
										<div>{{scope.row.address}}</div>
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
						<el-table-column v-for="(item,index) in tableData" :key="index" :label="item.date" align="center" className="work">
							<template scope="scope">
								<div class="work-bo" v-if="scope.row['time'+index]">
									<div class="work-time">{{scope.row["time"+index]}}</div>
									<div class="work-add-bo">
										<div v-for="(data,key) in scope.row['arrange'+index]" :key="key">
											{{data}}
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

	var getData = function(obj,size,page){
		return new Promise((res,rej)=>{
			res(2)
		})
	}

	let opt = [
		{value:'111',id:'1'},
		{value:'111',id:'2'},
		{value:'111',id:'3'},
		{value:'111',id:'4'},
		{value:'111',id:'5'}
	]

	let tableData = [{
	          date: '2016-05-02',
	          name: '王小虎1',
	          phone:'15711445668',
	          address: '上海市普陀区金',
	          time0:'08:00~18:00',
	          arrange0:['08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	          time1:'13:00~18:00',
	          arrange1:['08:10~12:00   订单'],
	          time2:'14:00~18:00',
	          arrange2:['08:20~12:00   订单'],
	          time3:'15:00~18:00',
	          arrange3:['08:30~12:00   订单'],
	          time4:'16:00~18:00',
	          arrange4:['08:00~12:00   订单'],
	          time5:'17:00~18:00',
	          arrange5:['08:40~12:00   订单'],
	          time6:'18:00~18:00',
	          arrange6:['08:50~12:00   订单'],
	        },
	        {
	          date: '2016-05-02',
	          name: '王小虎1',
	          phone:'15711445668',
	          address: '上海市普陀区金',
	          time0:'08:00~18:00',
	          arrange0:['08:00~12:00   订单','08:00~12:00   订单'],
	          time1:'',
	          arrange1:['08:10~12:00   订单'],
	          time2:'14:00~18:00',
	          arrange2:['08:20~12:00   订单'],
	          time3:'15:00~18:00',
	          arrange3:['08:30~12:00   订单'],
	          time4:'16:00~18:00',
	          arrange4:['08:00~12:00   订单'],
	          time5:'17:00~18:00',
	          arrange5:['08:40~12:00   订单'],
	          time6:'18:00~18:00',
	          arrange6:['08:50~12:00   订单'],
	        },
	        {
	          date: '2016-05-02',
	          name: '王小虎1',
	          phone:'15711445668',
	          address: '上海市普陀区金',
	          time0:'08:00~18:00',
	          arrange0:['08:00~12:00   订单'],
	          time1:'13:00~18:00',
	          arrange1:['08:10~12:00   订单'],
	          time2:'14:00~18:00',
	          arrange2:['08:20~12:00   订单'],
	          time3:'15:00~18:00',
	          arrange3:['08:30~12:00   订单'],
	          time4:'16:00~18:00',
	          arrange4:['08:00~12:00   订单'],
	          time5:'17:00~18:00',
	          arrange5:['08:40~12:00   订单'],
	          time6:'18:00~18:00',
	          arrange6:['08:50~12:00   订单'],
	        },
	        {
	          date: '2016-05-02',
	          name: '王小虎1',
	          phone:'15711445668',
	          address: '上海市普陀区金',
	          time0:'08:00~18:00',
	          arrange0:['08:00~12:00   订单'],
	          time1:'13:00~18:00',
	          arrange1:['08:10~12:00   订单'],
	          time2:'14:00~18:00',
	          arrange2:['08:20~12:00   订单'],
	          time3:'15:00~18:00',
	          arrange3:['08:30~12:00   订单'],
	          time4:'16:00~18:00',
	          arrange4:['08:00~12:00   订单'],
	          time5:'17:00~18:00',
	          arrange5:['08:40~12:00   订单'],
	          time6:'18:00~18:00',
	          arrange6:['08:50~12:00   订单'],
	        },
	        {
	          date: '2016-05-02',
	          name: '王小虎1',
	          phone:'15711445668',
	          address: '上海市普陀区金',
	          time0:'08:00~18:00',
	          arrange0:['08:00~12:00   订单','08:00~12:00   订单',],
	          time1:'13:00~18:00',
	          arrange1:['08:10~12:00   订单'],
	          time2:'14:00~18:00',
	          arrange2:['08:20~12:00   订单'],
	          time3:'15:00~18:00',
	          arrange3:['08:30~12:00   订单'],
	          time4:'16:00~18:00',
	          arrange4:['08:00~12:00   订单'],
	          time5:'',
	          arrange5:['08:40~12:00   订单'],
	          time6:'18:00~18:00',
	          arrange6:['08:50~12:00   订单'],
	        },
	        {
	          date: '2016-05-02',
	          name: '王小虎1',
	          phone:'15711445668',
	          address: '上海市普陀区金',
	          time0:'08:00~18:00',
	          arrange0:['08:00~12:00   订单','08:00~12:00   订单'],
	          time1:'',
	          arrange1:['08:10~12:00   订单'],
	          time2:'14:00~18:00',
	          arrange2:['08:20~12:00   订单'],
	          time3:'15:00~18:00',
	          arrange3:['08:30~12:00   订单'],
	          time4:'16:00~18:00',
	          arrange4:['08:00~12:00   订单'],
	          time5:'17:00~18:00',
	          arrange5:['08:40~12:00   订单'],
	          time6:'18:00~18:00',
	          arrange6:['08:50~12:00   订单'],
	        },
	        {
	          date: '2016-05-02',
	          name: '王小虎1',
	          phone:'15711445668',
	          address: '上海市普陀区金',
	          time0:'08:00~18:00',
	          arrange0:['08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单','08:00~12:00   订单'],
	          time1:'13:00~18:00',
	          arrange1:['08:10~12:00   订单'],
	          time2:'',
	          arrange2:['08:20~12:00   订单'],
	          time3:'15:00~18:00',
	          arrange3:['08:30~12:00   订单'],
	          time4:'16:00~18:00',
	          arrange4:['08:00~12:00   订单'],
	          time5:'17:00~18:00',
	          arrange5:['08:40~12:00   订单'],
	          time6:'18:00~18:00',
	          arrange6:['08:50~12:00   订单'],
    }]
	export default{
		data(){
			return{
				total:100,
				pageSync:1,
				pageSize:10,
				opt : opt,
				search:{
					mechanism:'',
					service:'',
					chooses:''
				},
				chooContent:'',
				roomSel2Arr:'',
				value1:'',
				tableData:tableData
			}
		},
		computed:{
			// table开始和结束时间
			store(){ return this.GetDateStr(0) },
			end(){ return this.GetDateStr(6) }
		},
		methods:{
			handleSizeChange(page){
				this.pageSize = page;
				this.getList()
			},
			handleCurrentChange(val){
				this.pageSync = val
				this.getList()
			},
			getList(){
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
			this.getList()
		}
	}
</script>

<style>
	.schedule-table td.work{
		vertical-align:text-bottom;
	}
	#app .schedule-table .el-table td{
		height: auto;
	}
	.work-add-bo{
		padding: 10px 0;
	}
	.no-orders{
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
		padding: 20px 0;
	}
</style>