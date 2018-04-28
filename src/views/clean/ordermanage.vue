<template>
    <div class="addorder-container">
		<div class="fist-bar">
			  <!--选项卡开始-->
			  <el-tabs class="orderTab" v-model="activeName" @tab-click="handleClick">
					<el-tab-pane  v-for="(value,key,index) in orderTest" :label="value" :name='key' :key="index"></el-tab-pane>		
			  </el-tabs>
				<!--选项卡结束-->
				<!--搜索条件选择开始-->
				<div class="searchs">
			  	<el-input   class="search"  placeholder="请输入订单编号" v-model="orderNumber"></el-input>	
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
			  <button type="button" class="search-button floatRight btn_search btn-color"  @click="localSearch"><i class="el-icon-search"></i>&nbsp搜索</button>
			  <div class="second-input">
				    <el-date-picker
						v-model="startTime"
						class="search"
						style="width:20%"
						type="daterange"
						placeholder="选择下单时间">
						</el-date-picker>					
				    <el-date-picker
						class="search"
						v-model="severTime"
						style="width:20%;"
						type="daterange"
						placeholder="选择服务时间">
						</el-date-picker>					
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
          class="selfOrderTable"
					v-loading="listLoading" 
					element-loading-text="正在加载" 
					highlight-current-row
					style="width:100%;"
					>
					<el-table-column align="center" width="180" label="订单编号"  prop="orderNumber">
					</el-table-column>
					<el-table-column  v-if="userType == 'sys' || userType =='platform'" align="center" width="156" :render-header="renderHeader"  >
                <template scope="rowObj">
                  <el-tooltip placement="left" v-if="rowObj.row.orgName != undefined" :disabled="rowObj.row.orgName.length < 10" :content="rowObj.row.orgName">
                     <p class="selfToolTip1">{{rowObj.row.orgName}}</p>
                  </el-tooltip>
                  <el-tooltip placement="left" v-if="rowObj.row.stationName != undefined" :disabled="rowObj.row.stationName.length < 10" :content="rowObj.row.stationName">
                    <p class="selfToolTip1">{{rowObj.row.stationName}}</p>
                  </el-tooltip>
                </template>                    
					</el-table-column>
					<el-table-column v-if=" userType == 'org'"  align="center" width="156" label="服务站名称"  >
                <template scope="rowObj">
                  <el-tooltip placement="left" v-if="rowObj.row.stationName != undefined" :disabled="rowObj.row.stationName.length < 10" :content="rowObj.row.stationName">
                    <p class="selfToolTip1">{{rowObj.row.stationName}}</p>
                  </el-tooltip>
                </template>                    
					</el-table-column>          
					<el-table-column  align="center" width="150"  label="订单来源">
						<template scope="scope">
							<span v-if="scope.row.orderSource =='own'">本机构</span>
							<span v-if="scope.row.orderSource =='gasq'">国安社区</span>																													
						</template>            
					</el-table-column>	          							
					<el-table-column  align="center"  width="150" label="服务内容">
						<template scope="scope">
							<el-tooltip placement="left" v-if="scope.row.orderContent != undefined" :disabled="scope.row.orderContent.length < 11" :content="scope.row.orderContent">
								<div class="selfToolTip">{{scope.row.orderContent}}</div>
							</el-tooltip>
						</template>	
					</el-table-column>
					<el-table-column   align="center" width="150" label="付款价格">
              <template scope="scope">
                  <span>￥{{scope.row.payPrice}}</span>
              </template>							
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
							<span v-if="scope.row.orderStatus =='close'">已关闭</span>
							<span v-if="scope.row.orderStatus =='stop'">已暂停</span>
							<span v-if="scope.row.orderStatus =='success'">已成功</span>
							<span v-if="scope.row.orderStatus =='waitdispatch'">待派单</span>																													
						</template>									
					</el-table-column>
                    <el-table-column   align="center" width="150" label="对接订单ID">
						<template scope="scope">
							<el-tooltip v-if="scope.row.jointOrderId != undefined" placement="left" :disabled="scope.row.jointOrderId.length< 20" :content="scope.row.jointOrderId">
								<div class="selfToolTip">{{scope.row.jointOrderId}}</div>
							</el-tooltip>
						</template>						
					</el-table-column>					
					<!-- <el-table-column   align="center" width="150" label="支付状态"  >
					<template scope="scope">
							<span v-if="scope.row.payStatus =='payed'">已支付</span>
							<span v-if="scope.row.payStatus =='waitpay'">待支付</span>
					</template>	
					</el-table-column> -->
					<el-table-column   align="center" width="150" label="下单时间"  prop="orderTime">
					</el-table-column>	  
					<el-table-column align="center" label="操作" width="150" fixed="right">
					<template scope="scope">
							<el-button class="ceshi3" type="button" v-if="btnShow.indexOf('order_info') > -1" @click="lookInf(scope.row.id)">查看</el-button>
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
import { getOrderTable } from "@/api/order";
import { getFuwu, getSList } from "@/api/staff";
import util from "@/utils/date";
export default {
  name: "ordermanage",
  data() {
    return {
      userType:'',
      btnShow: [],
      severTime: [],
      severEndTime: "",
      dict: require("../../../static/dict.json"),
      payTypeOptions: [],
      orderTest: [],
      payType: "",
      payStusOptions: [],
      payStus: "",
      mechanismOptions: [],
      mechanism: "",
      sevicerStustasOptions: [],
      sevicerStustas: "", //服务状态
      searchCon: "", //搜索框的值初始化
      customerName: "",
      customerPhone: "",
      orderNumber: "",
      orderContent: "",
      activeName: "dispatched", //当前tabs
      startTime: [], //开始时间
      endTime: "", //结束时间
      tabDataList: [], //表格数据
      size: 10,
      total: null,
      jumpPage: 1,
      pageNumber: 1,
      listLoading: false,
      active1: ""
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("btn"))) {
      this.btnShow = JSON.parse(localStorage.getItem("btn"));
    }
  },
  methods: {
    renderHeader (h) {
      return [h('p', {}, ['机构名称']),h('p', {}, ['服务站名称'])]
    },
    //机构变化事件
    orgChange(val) {
      this.payType = "";
      this.payTypeOptions = [];
      if (val != "") {
        var obj = {
          orgId: val
        };
        getFuwu(obj).then(res => {
          if (res.data.code === 1) {
            if(res.data.data){
              if (res.data.data[0].id == 0) {
                res.data.data.remove(res.data.data[0]);
              }
              this.payTypeOptions = res.data.data;
              if(window.sessionStorage.getItem('stationId') != null){
                  this.payType=window.sessionStorage.getItem('stationId')
              }              
              if(this.userType =='station'){
                this.payType=this.payTypeOptions[0].id
              }else{
              }
            }

          } else {

          }
        });
      }
    },
    //获取表格数据
    getTableData(pramsObj, pageNo, pageSize) {
      this.listLoading = true;
      var obj = pramsObj;
      getOrderTable(obj, pageNo, pageSize)
        .then(res => {
          if (res.data.code === 1) {
            this.total = res.data.data.page.count;
            this.tabDataList = res.data.data.page.list;
            this.pageNumber = res.data.data.page.pageNo;
            this.jumpPage = res.data.data.page.pageNo;
            this.size = res.data.data.page.pageSize;
            this.listLoading = false;
          } else {
            this.listLoading = false;
          }
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    // 服务机构
    getoffice() {
      getSList({}).then(res => {
        if(res.data.data.list != undefined){
          if (res.data.data.list[0].id == '0' ) {
            res.data.data.list.remove(res.data.data.list[0]);
          }
          if(res.data.data.list.length >=2){
              if(res.data.data.list[1].id == '0'){
                res.data.data.list.remove(res.data.data.list[1]);
                res.data.data.list.remove(res.data.data.list[0]);
              }
          }                    
            this.mechanismOptions = res.data.data.list;
            if(this.userType == 'org' || this.userType == 'station'){
              this.mechanism=this.mechanismOptions[0].id
            }            
        }
        if(window.sessionStorage.getItem('orderNumber') != null){
            this.orderNumber=window.sessionStorage.getItem('orderNumber')
        }
        if(window.sessionStorage.getItem('sevicerStustas') != null){
            this.sevicerStustas=window.sessionStorage.getItem('sevicerStustas')
        }
        if(window.sessionStorage.getItem('orderStatus') != null){
            this.activeName=window.sessionStorage.getItem('orderStatus')
            this.active1=this.activeName
            
        }
        if(window.sessionStorage.getItem('mechanism') != null){
            this.mechanism=window.sessionStorage.getItem('mechanism')
        }
        if(window.sessionStorage.getItem('stationId') != null){
            this.payType=window.sessionStorage.getItem('stationId')
        }          
        

        if(this.severTime != undefined){ 
          if(this.severTime.length == 0 && window.sessionStorage.getItem('serviceTimeStart') != null && window.sessionStorage.getItem('serviceTimeEnd') != null){            
              var arr=[];
              arr.push(window.sessionStorage.getItem('serviceTimeStart'));
              arr.push(window.sessionStorage.getItem('serviceTimeEnd'))           
              this.severTime=arr
          }                   
        }else{
           this.severTime=[]
        }
        if(this.startTime != undefined){
            if(this.startTime.length ==0 && window.sessionStorage.getItem('startTime') != null && window.sessionStorage.getItem('endTime') != null){            
                var arr1=[];
                arr1.push(window.sessionStorage.getItem('startTime'));
                arr1.push(window.sessionStorage.getItem('endTime'))           
                this.startTime=arr1
            } 
        }else{
          this.startTime=[]
        }
        if(this.orderNumber !='' || this.sevicerStustas != '' || this.mechanism != '' || this.severTime.length !=0 || this.startTime.length != 0 || this.payType != ''){
          this.localSearch()
        }else{
          this.getTableData({ orderStatus: "dispatched" }, 1, 10); 
        }                                            
      });
    },
    //tabs操作需要请求表格数据
    handleClick(tab, event) {
      this.activeName = tab.name;
      if (tab.name == "whole") {
        this.active1 = "";
      } else {
        this.active1 = tab.name;
      }
      this.payStus = "";
      this.localSearch()
    },
    //全局search按钮
    localSearch() {      
      //服务时间格式化
      var severstartTime,severEndTime
      if(this.severTime != undefined){
          if (this.severTime[0] != undefined && this.severTime[0] != '') {
            severstartTime = util.formatDate.format(
              new Date(this.severTime[0]),
              "yyyy-MM-dd hh:mm:ss"
            );
          } else {
            severstartTime = null;
          }
          if (this.severTime[1] != undefined && this.severTime[1] != '') {
            severEndTime = util.formatDate.format(
              new Date(this.severTime[1]),
              "yyyy-MM-dd 23:59:59"
            );
          } else {
            severEndTime = null;
          }
      }else{
        severstartTime = null;
        severEndTime = null;
      }
      //开始时间格式化
      var startTime,endTime
      if(this.startTime != undefined){                   
          if (this.startTime[0] != undefined && this.startTime[0] != '') {
             startTime = util.formatDate.format(
              new Date(this.startTime[0]),
              "yyyy-MM-dd hh:mm:ss"
            );
          } else {
            startTime = null;
          }
          //结束时间格式化
          if (this.startTime[1] != undefined  && this.startTime[1] != '') {
            endTime = util.formatDate.format(
              new Date(this.startTime[1]),
              "yyyy-MM-dd 23:59:59"
            );
          } else {
            endTime = null;
          }
      }else{
        startTime = null;
        endTime = null;
      }

      if (this.activeName == "whole") {
        this.active1 = "";
      } else {
        this.active1 = this.activeName;
      }
      var obj = {
        orderStatus: this.active1,
        serviceStatus: this.sevicerStustas, //服务状态
        // payStatus:this.payStus,
        orgId: this.mechanism,
        stationId: this.payType,
        orderNumber: this.orderNumber,
        orderTimeStart: startTime,
        orderTimeEnd: endTime,
        serviceTimeStart: severstartTime,
        serviceTimeEnd: severEndTime
      }; 
      window.sessionStorage.setItem('orderNumber',this.orderNumber)
      window.sessionStorage.setItem('sevicerStustas',this.sevicerStustas)
      if(this.activeName == ''){
         window.sessionStorage.setItem('orderStatus','whole')
      }else{
         window.sessionStorage.setItem('orderStatus',this.activeName)
      }
      window.sessionStorage.setItem('mechanism',this.mechanism)
      window.sessionStorage.setItem('stationId',this.payType)
      if(this.severTime != undefined){
        if(this.severTime[0] != undefined && this.severTime[0] != null ){
            window.sessionStorage.setItem('serviceTimeStart',this.severTime[0])
        }
        if(this.severTime[1] != undefined && this.severTime[1] != null){
          window.sessionStorage.setItem('serviceTimeEnd',this.severTime[1])
        }       
      }else{
        window.sessionStorage.setItem('serviceTimeStart','')
        window.sessionStorage.setItem('serviceTimeEnd','')
        this.severTime=[]
      }
      if(this.startTime != undefined){
        if(this.startTime[0] != undefined && this.startTime[0] != null ){
            window.sessionStorage.setItem('startTime',this.startTime[0])
        }
        if(this.startTime[1] != undefined && this.startTime[1] != null ){
            window.sessionStorage.setItem('endTime',this.startTime[1])
        }
      }else{
        window.sessionStorage.setItem('startTime','')
        window.sessionStorage.setItem('endTime','')
        this.startTime=[];
      }
      this.pageNumber = 1;
      this.jumpPage = 1;
      this.getTableData(obj, this.pageNumber, this.size);             
    },
    //导出订单按钮
    exportOrder() {},
    //查看跳转到订单详情页
    lookInf(id) {
      window.localStorage.setItem("orderId", id);
      window.sessionStorage.setItem('orderNumber',this.orderNumber)
      window.sessionStorage.setItem('sevicerStustas',this.sevicerStustas)
      if(this.activeName == ''){
         window.sessionStorage.setItem('orderStatus','whole')
      }else{
         window.sessionStorage.setItem('orderStatus',this.activeName)
      }
      window.sessionStorage.setItem('mechanism',this.mechanism)
      window.sessionStorage.setItem('stationId',this.payType)
      if(this.severTime != undefined){
        if(this.severTime[0] != undefined && this.severTime[0] != null ){
            window.sessionStorage.setItem('serviceTimeStart',this.severTime[0])
        }
        if(this.severTime[1] != undefined && this.severTime[1] != null){
          window.sessionStorage.setItem('serviceTimeEnd',this.severTime[1])
        }       
      }else{
        window.sessionStorage.setItem('serviceTimeStart','')
        window.sessionStorage.setItem('serviceTimeEnd','')
        this.severTime=[]
      }
      if(this.startTime != undefined){
        if(this.startTime[0] != undefined && this.startTime[0] != null ){
            window.sessionStorage.setItem('startTime',this.startTime[0])
        }
        if(this.startTime[1] != undefined && this.startTime[1] != null ){
            window.sessionStorage.setItem('endTime',this.startTime[1])
        }
      }else{
        window.sessionStorage.setItem('startTime','')
        window.sessionStorage.setItem('endTime','')
        this.startTime=[];
      }            
      this.$router.push({ path: "/clean/orderinfo", query: { id: id } });
    },
    //每页条数多少改变
    handleSizeChange(val) {
      this.pageNumber = 1;
      this.jumpPage = 1;
      this.size = val;
      //服务时间格式化
      var severstartTime,severEndTime
      if(this.severTime != undefined){
          if (this.severTime[0] != undefined && this.severTime[0] != '') {
            severstartTime = util.formatDate.format(
              new Date(this.severTime[0]),
              "yyyy-MM-dd hh:mm:ss"
            );
          } else {
            severstartTime = null;
          }
          if (this.severTime[1] != undefined && this.severTime[1] != '') {
            severEndTime = util.formatDate.format(
              new Date(this.severTime[1]),
              "yyyy-MM-dd 23:59:59"
            );
          } else {
            severEndTime = null;
          }
      }else{
        severstartTime = null;
        severEndTime = null;
      }
      //开始时间格式化
      var startTime,endTime
      if(this.startTime != undefined){
          if (this.startTime[0] != undefined && this.startTime[0] != '') {
             startTime = util.formatDate.format(
              new Date(this.startTime[0]),
              "yyyy-MM-dd hh:mm:ss"
            );
          } else {
            startTime = null;
          }
          //结束时间格式化
          if (this.startTime[1] != undefined   && this.startTime[1] != '') {
            endTime = util.formatDate.format(
              new Date(this.startTime[1]),
              "yyyy-MM-dd 23:59:59"
            );
          } else {
            endTime = null;
          }
      }else{
        startTime = null;
        endTime = null;
      }
      if (this.activeName == "whole") {
        this.active1 = "";
      } else {
        this.active1 = this.activeName;
      }
      var obj = {
        orderStatus: this.active1,
        serviceStatus: this.sevicerStustas, //服务状态
        // payStatus:this.payStus,
        orgId: this.mechanism,
        stationId: this.payType,
        orderNumber: this.orderNumber,
        orderTimeStart: startTime,
        orderTimeEnd: endTime,
        serviceTimeStart: severstartTime,
        serviceTimeEnd: severEndTime
      };
      this.getTableData(obj, this.pageNumber, this.size);
    },
    //分页器改变当前页
    handleCurrentChange(val) {
      this.pageNumber = val;
      //服务时间格式化
      var severstartTime,severEndTime
      if(this.severTime != undefined ){
          if (this.severTime[0]  && this.severTime[0] != '') {
            severstartTime = util.formatDate.format(
              new Date(this.severTime[0]),
              "yyyy-MM-dd hh:mm:ss"
            );
          } else {
            severstartTime = null;
          }
          if (this.severTime[1] != undefined   && this.severTime[1] != '') {
            severEndTime = util.formatDate.format(
              new Date(this.severTime[1]),
              "yyyy-MM-dd 23:59:59"
            );
          } else {
            severEndTime = null;
          }
      }else{
        severstartTime = null;
        severEndTime = null;
      }
      //开始时间格式化
      var startTime,endTime
      if(this.startTime != undefined){
          if (this.startTime[0]   && this.startTime[0] != '') {
             startTime = util.formatDate.format(
              new Date(this.startTime[0]),
              "yyyy-MM-dd hh:mm:ss"
            );
          } else {
            startTime = null;
          }
          //结束时间格式化
          if (this.startTime[1] != undefined  && this.startTime[1] != '') {
            endTime = util.formatDate.format(
              new Date(this.startTime[1]),
              "yyyy-MM-dd 23:59:59"
            );
          } else {
            endTime = null;
          }
      }else{
        startTime = null;
        endTime = null;
      }
      if (this.activeName == "whole") {
        this.active1 = "";
      } else {
        this.active1 = this.activeName;
      }
      var obj = {
        orderStatus: this.active1,
        serviceStatus: this.sevicerStustas, //服务状态
        // payStatus:this.payStus,
        orgId: this.mechanism,
        stationId: this.payType,
        orderNumber: this.orderNumber,
        orderTimeStart: startTime,
        orderTimeEnd: endTime,
        serviceTimeStart: severstartTime,
        serviceTimeEnd: severEndTime
      };
      this.getTableData(obj, this.pageNumber, this.size);
    }
  },
  mounted() {
    this.getoffice();        
    this.payStusOptions = this.dict.pay_status;
    this.orderTest = this.dict.order_status;
    this.sevicerStustasOptions = this.dict.service_status;
    this.userType=localStorage.getItem("type")
  }
};
</script>
<style lang="scss" scoped>
.selfToolTip {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.selfToolTip1 {
  margin:0 auto;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.addorder-container {
  width: 100%;
  float: left;
  background: #eef1f6;
}
.width200 {
  width: 200px;
}
.floatRight {
  float: right;
}
.fist-bar {
  background: #fff;
  border-bottom: 1px solid #eee;
}
.second-input {
  margin-top: 10px;
}
.orderMangeWarp {
  background: #fff;
  padding: 20px 20px;
}
.exprotStyle {
  float: right;
  margin-bottom: 10px;
}
.ordermanageTableWrap {
  width: 100%;
  background: #fff;
  padding: 20px 0px 46px 0px;
}
.ordermanagePagination {
  margin-top: 20px;
  float: right;
}
</style>