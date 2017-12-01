<template>
    <div class="addorder-container">
		<div class="fist-bar">
			  <el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="全部" name="1"></el-tab-pane>
						<el-tab-pane label="待派单" name="2"></el-tab-pane>
						<el-tab-pane label="已派单" name="3"></el-tab-pane>
						<el-tab-pane label="已取消" name="4"></el-tab-pane>
						<el-tab-pane label="已上门" name="5"></el-tab-pane>
						<el-tab-pane label="已完成" name="6"></el-tab-pane>
						<el-tab-pane label="已关闭" name="7"></el-tab-pane>		
			  </el-tabs>
			  <el-select clearable style="width:200px" class="filter-item" v-model="payType" placeholder="选择支付方式">
						<el-option v-for="item in payTypeOptions" :key="item.key" :label="item.name" :value="item.key">
						</el-option>
			  </el-select>
			  <el-select clearable style="width:200px" class="filter-item" v-model="payStus" placeholder="选择支付状态">
						<el-option v-for="item in payStusOptions" :key="item.id" :label="item.value" :value="item.id">
						</el-option>
			  </el-select>
			  <el-select clearable style="width:200px" class="filter-item" v-model="mechanism" placeholder="选择机构">
						<el-option v-for="item in mechanismOptions" :key="item.key" :label="item.name" :value="item.key">
						</el-option>
			  </el-select>
			  <el-select clearable style="width:200px" class="filter-item" v-model="orderProject" placeholder="请选择" >
						<el-option v-for="item in orderProjectOptions" :key="item.key" :label="item.name" :value="item.key">
						</el-option>
			  </el-select>
				<el-input  v-if="orderProject === '1'" style="width: 200px;"  placeholder="请输入客户姓名" v-model="searchCon"></el-input>
				<el-input  v-else-if="orderProject === '2'" style="width: 200px;"  placeholder="请输入客户手机号" v-model="searchCon"></el-input>
				<el-input  v-else-if="orderProject === '3'" style="width: 200px;"  placeholder="请输入订单编号" v-model="searchCon"></el-input>
				<el-input  v-else-if="orderProject === '4'" style="width: 200px;"  placeholder="请输入项目名称" v-model="searchCon"></el-input>
				<el-input  v-else style="width: 200px;"  placeholder="请输入" v-model="searchCon"></el-input>			  
			  <button type="button" class="search-button"  @click="localSearch"><i class="el-icon-search"></i>&nbsp搜索</button>
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
		  <button type="button" class="add-button" style="float:right;margin-bottom:10px;" @click="exportOrder">导出订单</button>
			<div style="width:100%;background:#fff;padding:20px 20px 40px 20px;">	
				<el-table 
					:data="tabDataList" 
					element-loading-text="正在加载" 
					highlight-current-row
					style="width:100%;"
					stripe
					>
							<el-table-column align="center" width="110" label="订单编号"  prop="orderNum">
							</el-table-column>
							<el-table-column align="center"  width="150" label="客户姓名"  prop="custName">
							</el-table-column>
							<el-table-column  align="center" width="150" label="客户电话"  prop="custPhone">
							</el-table-column>
							<el-table-column  align="center" width="150"  label="服务机构" prop="serverOffice">
							</el-table-column>
							<el-table-column  align="center"  width="150" label="服务内容"  prop="serverCon">
							</el-table-column>
							<el-table-column   align="center" width="150" label="服务费"    prop="serverFei">
							</el-table-column>
							<el-table-column   align="center" width="150" label="服务时间"  prop="serverTime">	
							</el-table-column>
							<el-table-column  align="center" width="150" label="订单状态"  prop="orderStatus">
							</el-table-column>
							<el-table-column   align="center" width="150" label="支付状态"  prop="payStatus">
							</el-table-column>
							<el-table-column   align="center" width="150" label="下单时间"  prop="downTime">
							</el-table-column>	  
							<el-table-column align="center" label="操作" width="150" >
							<template scope="scope">
									<el-button type="button" @click="lookInf(scope.row)">查看</el-button>
							</template>
							</el-table-column>
				</el-table>
				<div style="margin-top:20px;float:right;">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
					:page-sizes="[10,20,30, 50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
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
	  payStusOptions:[],
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
	  tabDataList:[
			{
				orderNum:'2222',
				custName:'***',
				custPhone:'13800138000',
				serverOffice:'国安社区',
				serverCon:'服务内容',
				serverFei:'服务费',
				serverTime:'2017-10-10 20:04:30',
				orderStatus:'已取消',
				payStatus:'已支付',
				downTime:'2017-10-09 20:04:30'
			},
			{
				orderNum:'11111',
				custName:'***',
				custPhone:'13800138001',
				serverOffice:'国安社区',
				serverCon:'服务内容',
				serverFei:'服务费',
				serverTime:'2017-10-10 20:04:30',
				orderStatus:'已取消',
				payStatus:'已支付',
				downTime:'2017-10-09 20:04:30'
			}			
		],//表格数据初始化
	  size:5,
	  total:100,
    };
  },
  methods: {
    //获取表格数据
	getTableData(){
	 
	  //getTable().then(res => {
        //this.tabDataList = res.data.data.list;
      //});
	},
	//获取支付状态下拉
	getpaySta(){
			  this.payStusOptions=[
		  { id: "1", value: "待支付" },
		  { id: "2", value: "已支付" },
		  { id: "3", value: "支付失败" }
	  ]
	},
	//tabs操作(true)
	handleClick(tab, event) {
        console.log(tab.name);
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
	},
	lookInf(row){
		this.$router.push({path:'/clean/orderinfo'})
	}
	
  },
  mounted() {
    this.getTableData();
    this.getpaySta();
  }
};
</script>
<style lang="scss" scoped>
.addorder-container{
    width:100%;
	float:left;
	background:#eef1f6;
	margin-top: 20px;
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