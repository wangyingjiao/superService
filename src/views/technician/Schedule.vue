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
				<el-table :data="tableData" border style="width: 100%">
    				<el-table-column prop="date" label="姓名" align="center"> </el-table-column>
    				<el-table-column prop="name" label="手机号" align="center"> </el-table-column>
    				<el-table-column prop="address" label="服务站" align="center"> </el-table-column>
    				<el-table-column prop="address" label="服务站---" align="center" className="work">
    					<template scope="scope"> 
    						<div class="work-time">工作时间</div>
    						<div class="work-arrange">工作安排</div>
    					</template>
    				</el-table-column>
 				 </el-table>
			</div>
			<!-- 表格完成 -->
		</div>
	</div>
</template>

<script>
let opt = [
	{value:'111',id:'1'},
	{value:'111',id:'2'},
	{value:'111',id:'3'},
	{value:'111',id:'4'},
	{value:'111',id:'5'}
]

let tableData = [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
	export default{
		data(){
			return{
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
		methods:{

		},
		mounted(){

		}
	}
</script>

<style>
	.schedult-con{
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
	.work-time{
		border-bottom: 1px solid #dfe6ec;
		padding: 10px 0;
	}
	.schedule-table .work .cell{
		padding: 0;
	}
	.work-arrange{
		padding: 20px 0;
	}
</style>