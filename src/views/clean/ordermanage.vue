<template>
    <div class="addorder-container">
		<div class="fist-bar">
			  <!--选项卡开始-->
			  <el-tabs class="orderTab" v-model="activeName" @tab-click="handleClick">
					<!-- <el-tab-pane label="全部" name="whole"></el-tab-pane> -->
					<el-tab-pane  v-for="(value,key,index) in orderTest" :label="value" :name='key' :key="index"></el-tab-pane>		
			  </el-tabs>
				<!--选项卡结束-->
				<!--搜索条件选择开始-->
				<div class="searchs">
			  <el-select clearable class="search"   v-model="payStus" placeholder="选择支付状态">
						<el-option v-for="(value,key,index) in payStusOptions" :key="index" :label="value" :value="key">
						</el-option>
			  </el-select>
			  <el-select clearable class="search"  v-model="mechanism" filterable placeholder="选择机构" @change="orgChange">
						<el-option v-for="item in mechanismOptions" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
			  </el-select>
			  <el-select clearable class="search"  v-model="payType" filterable placeholder="选择服务站">
						<el-option v-for="item in payTypeOptions" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
			  </el-select>				
			  <el-select clearable class="search"  v-model="sevicerStustas" placeholder="请选择服务状态">
						<el-option v-for="(value,key,index) in sevicerStustasOptions" :key="index" :label="value" :value="key">
						</el-option>
			  </el-select>
				<!-- <el-input  v-if="orderProject === '1'" class="width200"  placeholder="请输入客户姓名" v-model="customerName"></el-input>
				<el-input  v-else-if="orderProject === '2'" class="width200"  placeholder="请输入客户手机号" v-model="customerPhone"></el-input>
				<el-input  v-else-if="orderProject === '3'" class="width200"  placeholder="请输入订单编号" v-model="orderNumber"></el-input>
				<el-input  v-else-if="orderProject === '4'" class="width200"  placeholder="请输入项目名称" v-model="orderContent"></el-input> -->							  
			  <button type="button" class="search-button floatRight btn_search"  @click="localSearch"><i class="el-icon-search"></i>&nbsp搜索</button>
			  <div class="second-input">					
					<el-date-picker
						v-model="startTime"
						type="datetime"
						class="search"
						style="width:20%"
						placeholder="选择开始时间">
					</el-date-picker>
					<el-date-picker
						v-model="endTime"
						type="datetime"
						style="width:20%"
						class="search"
						placeholder="选择结束时间">
					</el-date-picker>
					<el-date-picker
						v-model="severTime"
						style="width:20%"
						type="datetime"
						@change="TimeChange"
						class="search"
						placeholder="选择服务时间">
					</el-date-picker>
					<el-input   class="search"  placeholder="请输入订单编号" v-model="orderNumber"></el-input>							  
		    	</div>
			  </div>
				<!--搜索条件选择结束-->				
		</div>
		<!--表格显示区域开始-->
    <div class="orderMangeWarp">
		  <!-- <button type="button" class="add-button exprotStyle" style="margin-bottom:20px;"  @click="exportOrder">导出订单</button> -->
			<div class="ordermanageTableWrap">	
				<el-table 
					:data="tabDataList"
					fixed
					v-loading="listLoading" 
					element-loading-text="正在加载" 
					highlight-current-row
					style="width:100%;"
					>
							<el-table-column align="center" width="180" label="订单编号"  prop="orderNumber">
							</el-table-column>
							<!-- <el-table-column align="center"  width="150" label="客户姓名"  prop="customerName">
							</el-table-column>
							<el-table-column  align="center" width="150" label="客户电话"  prop="customerPhone">
							</el-table-column> -->
							<el-table-column  align="center" width="150"  label="服务机构" prop="orgName">
							</el-table-column>
							<el-table-column  align="center" width="150"  label="服务站" prop="stationName">
							</el-table-column>							
							<el-table-column  align="center"  width="150" label="服务内容"  prop="orderContent">
							</el-table-column>
							<el-table-column   align="center" width="150" label="付款价格"    prop="payPrice">
							</el-table-column>
							<el-table-column   align="center" width="150" label="服务时间"  prop="serviceTime">	
							</el-table-column>
							<el-table-column  align="center" width="150" label="服务状态">
						        <template scope="scope">
						    		<span v-if="scope.row.serviceStatus =='wait_service'">待服务</span>
									<span v-if="scope.row.serviceStatus =='started'">已上门</span>
						    		<span v-if="scope.row.serviceStatus =='finish'">已完成</span>
                                    <span v-if="scope.row.serviceStatus =='cancel'">已取消</span>																													
								</template>									
							</el-table-column>														
							<el-table-column  align="center" width="150" label="订单状态">
						        <template scope="scope">
						    		<span v-if="scope.row.orderStatus =='cancel'">已取消</span>
									<span v-if="scope.row.orderStatus =='dispatched'">已派单</span>
						    		<span v-if="scope.row.orderStatus =='finish'">已完成</span>
									<span v-if="scope.row.orderStatus =='started'">已上门</span>
						    		<span v-if="scope.row.orderStatus =='stop'">已暂停</span>
									<span v-if="scope.row.orderStatus =='success'">已成功</span>
						    		<span v-if="scope.row.orderStatus =='waitdispatch'">待派单</span>																													
								</template>									
							</el-table-column>
							<el-table-column   align="center" width="150" label="支付状态"  >
						    <template scope="scope">
						    		<span v-if="scope.row.payStatus =='payed'">已支付</span>
									<span v-if="scope.row.payStatus =='waitpay'">待支付</span>
							</template>	
							</el-table-column>
							<el-table-column   align="center" width="150" label="下单时间"  prop="orderTime">
							</el-table-column>	  
							<el-table-column align="center" label="操作" width="150" fixed="right">
							<template scope="scope">
									<el-button type="button" v-if="btnShow.indexOf('order_info') > -1" @click="lookInf(scope.row.id)">查看</el-button>
							</template>
							</el-table-column>
				</el-table>
				<div v-if="!listLoading" class="ordermanagePagination">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync='jumpPage'
					:page-sizes="[5,10,15,20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</div>
		</div>
		<!--表格显示区域结束-->
	</div>
</template>

<script>
import {getOrderTable} from "@/api/order";
import {getFuwu} from "@/api/staff";
import util from "@/utils/date";
export default {
	name: "",
  data() { 		
    return {
		btnShow: this.$store.state.user.buttonshow,
		severTime:'',
		dict:require("../../../static/dict.json"),
		payTypeOptions:[],
		orderTest:[],
		payType:'',
		payStusOptions:[],
		payStus:'',
		mechanismOptions:[],
		mechanism:'',
		sevicerStustasOptions:[],
		sevicerStustas:'',//服务状态
		searchCon:'',//搜索框的值初始化
		customerName:'',
		customerPhone:'',
		orderNumber:'',
		orderContent:'',
		activeName:'whole',//当前tabs
		startTime:'',//开始时间
		endTime:'',//结束时间
		tabDataList:[],//表格数据
		size:10,
		total:null,
		jumpPage:1,
		pageNumber:1,
		listLoading:false,
		active1:''
    };
  },
  methods: {
	//服务时间格式化只有整点与半点
	TimeChange(value){
		if(value != undefined){ 
			var str=value.substring(14,16)						
            if(Number(str) >= 30){
				this.severTime=util.formatDate.format(
				new Date(this.severTime),
				"yyyy-MM-dd hh:30:00"
				);
			}else{
				this.severTime=util.formatDate.format(
					new Date(this.severTime),
					"yyyy-MM-dd hh:00:00"
				);
			}
		}			
	},
	//机构变化事件
	orgChange(val){
		if(val != ''){
			var obj={
				orgId:val,
			}
			getFuwu(obj).then(res => {
				if(res.data.code === 1){
						this.payTypeOptions=res.data.data;
				}else{
				}
			});	
		}
	},
  //获取表格数据
	getTableData(pramsObj,pageNo,pageSize){
		this.listLoading = true;
		var obj=pramsObj; 
	    getOrderTable(obj,pageNo,pageSize).then(res => {
			if(res.data.code === 1){
				this.tabDataList = res.data.data.page.list;										
				this.mechanismOptions=res.data.data.orgList;
				this.total=res.data.data.page.count;
				this.listLoading = false;
			}else{
				this.listLoading = false;
			}
        });
	},
	//tabs操作需要请求表格数据
	handleClick(tab, event) {
		this.activeName=tab.name;
		if(tab.name == 'whole'){
			this.active1='';
		}else{
			this.active1=tab.name
		}					
		this.payStus='';
		this.mechanism='';
		this.payType='';
		this.sevicerStustas='';
		this.orderNumber='';
		this.startTime='';
		this.endTime='';
		this.severTime='';
		var obj={
			orderStatus:this.active1
		};
		this.pageNumber=1;
		this.jumpPage=1;
		this.getTableData(obj,this.pageNumber,this.size);				
    },
	//全局search按钮
	localSearch(){
		//服务时间格式化		
		if(this.severTime !=''){
          
		}else{
			  this.severTime=null
		}	
		//开始时间格式化	
		if(this.startTime !=''){
    		var startTime = util.formatDate.format(
					new Date(this.startTime),
					"yyyy-MM-dd hh:mm:ss"
				);
		}else{
			  startTime=null
		}
		//结束时间格式化 
        if(this.endTime != ''){
			var endTime = util.formatDate.format(
				new Date(this.endTime),
				"yyyy-MM-dd hh:mm:ss"
			);
		}else{
			endTime=null
		}
		if(this.activeName == 'whole'){
			this.active1='';
		}else{
			this.active1=this.activeName
		}			
		var obj={
			orderStatus:this.active1,
			serviceStatus:this.sevicerStustas,//服务状态 
			payStatus:this.payStus,
			orgId:this.mechanism,
			stationId:this.payType,
			orderNumber:this.orderNumber,
			orderTimeStart:startTime,
			orderTimeEnd:endTime,
			serviceTime:this.severTime,
		};
		this.pageNumber=1;
		this.jumpPage=1;		
		this.getTableData(obj,this.pageNumber,this.size);	
	},
	//导出订单按钮
	exportOrder(){
	},
	//查看跳转到订单详情页
	lookInf(id){
		window.localStorage.setItem("orderId",id)
		this.$router.push({path:'/clean/orderinfo',query:{id:id}})
	},	
	//每页条数多少改变
	handleSizeChange(val){
		this.size=val;
		var obj={
		}
		this.getTableData(obj,this.pageNumber,this.size);		
	},
	//分页器改变当前页
	handleCurrentChange(val){
		this.pageNumber=val;
		var obj={
		}
		this.getTableData(obj,this.pageNumber,this.size);		
	},

	
  },
  mounted() {
		this.getTableData();
		this.payStusOptions=this.dict.pay_status;
		this.orderTest=this.dict.order_status;
		this.sevicerStustasOptions=this.dict.service_status;
  }
};
</script>
<style lang="scss" scoped>
.addorder-container{
  width:100%;
	float:left;
	background:#eef1f6;
}
.width200{width:200px;}
.floatRight{float:right}
.fist-bar{
  background:#fff;
  border-bottom:1px solid #eee;
}
.second-input{
	margin-top:10px;
}
.orderMangeWarp{
	background:#fff;
	padding:20px 20px;
}
.exprotStyle{float:right;margin-bottom:10px;}
.ordermanageTableWrap{width:100%;background:#fff;padding:20px 0px 46px 0px;}
.ordermanagePagination{margin-top:20px;float:right;}
</style>