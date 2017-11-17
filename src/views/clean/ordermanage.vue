<template>
    <div class="addorder-container">
		<div class="fist-bar">
			  <el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="全部" name="1"></el-tab-pane>
				<el-tab-pane label="待派单" name="2"></el-tab-pane>
				<el-tab-pane label="申请取消中" name="3"></el-tab-pane>
				<el-tab-pane label="申请退款中" name="4"></el-tab-pane>
				<el-tab-pane label="退款成功" name="5"></el-tab-pane>
				<el-tab-pane label="退款失败" name="6"></el-tab-pane>
				<el-tab-pane label="已完成" name="7"></el-tab-pane>		
			  </el-tabs>
			  <el-select clearable style="width:200px" class="filter-item" v-model="payType" placeholder="选择支付方式">
				<el-option v-for="item in payTypeOptions" :key="item.key" :label="item.name" :value="item.key">
				</el-option>
			  </el-select>
			  <el-select clearable style="width:200px" class="filter-item" v-model="payStus" placeholder="选择支付状态">
				<el-option v-for="item in payStusOptions" :key="item.key" :label="item.name" :value="item.key">
				</el-option>
			  </el-select>
			  <el-select clearable style="width:200px" class="filter-item" v-model="mechanism" placeholder="选择机构">
				<el-option v-for="item in mechanismOptions" :key="item.key" :label="item.name" :value="item.key">
				</el-option>
			  </el-select>
			  <el-select clearable style="width:200px" class="filter-item" v-model="orderProject" placeholder="请选择">
				<el-option v-for="item in orderProjectOptions" :key="item.key" :label="item.name" :value="item.key">
				</el-option>
			  </el-select>	  
			  <el-input  style="width: 200px;"  placeholder="请输入搜索内容" v-model="searchCon"></el-input>
			  <button type="button" class="button-large" @click="localSearch">搜索</button>
			  <div class="second-input">
				<el-date-picker
				  v-model="startTime"
				  type="datetime"
				  style="width:200px;"
				  placeholder="选择开始时间">
				</el-date-picker>
				<el-date-picker
				  v-model="endTime"
				  type="datetime"
				  style="width:200px;"
				  placeholder="选择结束时间">
				</el-date-picker>			  
			  </div>				
		</div>
       <div class="orderMangeWarp">
		    <button type="button" class="button-large" style="float:right;margin-bottom:10px;" @click="exportOrder">导出订单</button>
			<el-table 
			  :data="tabDataList" 
			  element-loading-text="正在加载" 
			  highlight-current-row
			  style="width: 100%">
			  <el-table-column align="center" label="订单编号"  width="100">
			  </el-table-column>
			  <el-table-column align="center"width="180px" label="客户姓名">
			  </el-table-column>
			  <el-table-column width="180px" align="center" label="客户电话">
			  </el-table-column>
			  <el-table-column width="100px"  v-show="false" label="服务机构">
			  </el-table-column>
			  <el-table-column width="150px" align="center" label="服务内容">
			  </el-table-column>
			  <el-table-column  min-width="110px" align="center" label="服务费">
			  </el-table-column>
			  <el-table-column  min-width="110px" align="center" label="服务时间">	
			  </el-table-column>
			  <el-table-column  min-width="110px" align="center" label="订单状态">
			  </el-table-column>
			  <el-table-column  min-width="110px" align="center" label="支付状态">
			  </el-table-column>
			  <el-table-column  min-width="110px" align="center" label="下单时间">
			  </el-table-column>	  
			  <el-table-column align="center" label="操作" width="150" >
				<template scope="scope">
				</template>
			  </el-table-column>
			</el-table>
			<div  class="pagination-container">
			  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
				:page-sizes="[10,20,30, 50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
			  </el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import {getTable} from "@/api/order";
//import { parseTime } from "@/utils";
export default {
  name: "",
  data() {
    return {
	  payTypeOptions:[
		  { key: "1", name: "微信" },
		  { key: "2", name: "支付宝" },
		  { key: "3", name: "银行卡" }
	  ],
	  payType:null,
	  payStusOptions:[
		  { key: "1", name: "待支付" },
		  { key: "2", name: "已支付" },
		  { key: "3", name: "支付失败" }
	  ],
	  payStus:null,
	  mechanismOptions:[
		  { key: "1", name: "请选择机构" }
	  ],
	  mechanism:null,
	  orderProjectOptions:[
		  { key: "1", name: "客户姓名" },
		  { key: "2", name: "客户手机号" },
		  { key: "3", name: "订单编号" },
		  { key: "4", name: "项目名称" }
	  ],
	  orderProject:null,
	  searchCon:'',//搜索框的值初始化
	  activeName: '1',//当前tabs
	  startTime:'',//开始时间
	  endTime:'',//结束时间
	  tabDataList:[1,2,3,4],//表格数据初始化
	  size:5,
	  total:100,
    };
  },
  methods: {
    //获取表格数据
	getTableData(){
	  console.log("getdata")
	  //getTable().then(res => {
        //this.tabDataList = res.data.data.list;
      //});
	},
	//tabs操作(true)
	handleClick(tab, event) {
        console.log(tab, event);
    },
	//全局search按钮
	localSearch(){
	   
	},
	//exportOrder
	exportOrder(){
	},
	//Edit
	handleUpdate(){
	},
	//每页条数多少改变
	handleSizeChange(val){
	},
	//分页器改变当前页
	handleCurrentChange(val){
	}
  },
  mounted() {
    this.getTableData();

  }
};
</script>
<style lang="scss" scoped>
.addorder-container{
    width:100%;
	float:left;
	background:#eef1f6;
}
.fist-bar{
  padding:20px 20px;
  background:#fff;
}
.second-input{
	margin-top:10px;
}
.orderMangeWarp{
	margin:20px 20px;
	background:#fff;
	padding:20px 20px;
}
</style>