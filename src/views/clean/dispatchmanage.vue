<template>
    <div class="addorder-container">
		<!-- 搜索开始 -->
		<div class="filter-container bgWhite">
			<el-input  style="width:30%" placeholder="请输入搜索内容" v-model="techName">
        <el-select  clearable slot="prepend" style="width:120px" v-model="technicianName" placeholder="请选择">
          <el-option v-for="item in technicianOptions" :key="item.key" :label="item.technicianName" :value="item.key">
          </el-option>
        </el-select>
      </el-input>      
		  <button class="button-large btn_search" @click="localSearch"><i class="el-icon-search"></i>&nbsp;搜索</button>
  </div>
	<!-- 搜索结束 -->
		<div class="second-bar" style="height:500px;">
			<div class="tableWarpaa" style="width:100%;background:#fff;padding:20px 20px;">
					<el-table :data="tableData" border style="width:100%" >
					  <el-table-column  align="center" label="订单编号">
							<template scope="scope" >
								<div @click="lookInf(scope.row.id)" class="dispatchNumberStyle">
										{{scope.row.orderNumber}}
								</div>
							</template>
						</el-table-column>
					  <el-table-column align="center" prop="serviceTime" label="服务时间"></el-table-column>
					  <el-table-column style="padding:0" align="center" label="头像">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">
											<img class="head-images" :src="imgSrc+item.headPic+picWidth60" alt="">
										</div>						
								</template>
					  </el-table-column>

					  <el-table-column align="center" label="姓名">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">{{item.techName}}</div>						
								</template>
					  </el-table-column>

					  <el-table-column align="center" label="性别">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">
											<span class="fontSize12" v-if="item.techSex =='male'">男</span>
                      <span class="fontSize12" v-if="item.techSex =='female'">女</span>
										</div>						
								</template>
					  </el-table-column>

					  <el-table-column align="center" label="电话">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">{{item.techPhone}}</div>						
								</template>
					  </el-table-column>

					  <el-table-column align="center" label="岗位性质">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">
												<span class="fontSize12" v-if="item.jobNature =='part_time'">兼职</span>
												<span class="fontSize12" v-if="item.jobNature =='full_time'">全职</span>
										</div>						
								</template>
					  </el-table-column>

						<el-table-column label="操作" align="center" class="aa">
							<el-table-column align="center" label="" :colspan="2"  ref="selfcolumn">
									<template scope="scope">
										<div class="selfTd"  v-for=" item in scope.row.techList" :key="item.name">
											<el-button type="button" v-if="btnShow.indexOf('dispatch_insert') >= 0" @click="gaiPai(scope.row.id,item)">改派</el-button>
										</div>						
									</template>
							</el-table-column>		
							<el-table-column align="center">
								<template scope="scope">
									<div>
										<el-button type="button" v-if="btnShow.indexOf('dispatch_info') >= 0" @click="godispatchReass(scope.row.id)">
											改派记录
										</el-button>
									</div>
								</template>	
							</el-table-column>			  
						</el-table-column>
				</el-table>				
				<div v-if="!listLoading" style="margin-top:20px;padding-bottom:0px;">
					<el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page.sync='jumpPage'
					:page-sizes="[5,10,15,20]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="pagetotal1">
					</el-pagination>
				</div>					
					
			</div>
		</div>
		<!--技师选择弹窗开始-->
		<el-dialog title="选择技师" :visible.sync="dialogTableVisible" class="selfDialogWidth" :close-on-click-modal="false">
			<el-input placeholder="输入要搜索的姓名" v-model="techName2" style="width:180px;margin-left:15px;"></el-input> 
			<button class="button-large FloatRight" @click="searchTeh" style="margin-right:15px;">查询</button>
			<el-collapse-transition>
				<div class="selfpromMessageTab" v-if="middleA.length !=0">
					<div  class="tabWrap1" v-for="item in middleA" :key="item.techId">
						<div class="techNameStyle">{{item.techName}}</div>
					</div>                         
				</div>
			</el-collapse-transition>                                               	
			<div class="selfTableWrapONE">
				<div class="table-d">
					<table  class="selfTable">
					<tr class="tableHeader">
						<td  class="selfTableHEADTD" align="center" width="73px">选择</td>
						<td  class="selfTableHEADTD" align="center" width="158px">头像</td>
						<td  class="selfTableHEADTD" align="center" width="182px">姓名</td>
						<td  class="selfTableHEADTD" align="center" width="73px">性别</td>
						<td  class="selfTableHEADTD" align="center" width="141px">岗位性质</td>							
					</tr>
					<div style="padding-top:60px;">
							<tr v-for="item in listTech" :key="item.techId"  ref="tableItem1" class="selfTdStyle1">
								<td width="72px" class="fontSize12"  align="center"><el-checkbox  v-model="item.techChecked" @change="ChangeTech(item)"></el-checkbox></td>
								<td  width="156px" class="height70" align="center"><img class="imgStyle" :src="imgSrc+item.headPic+picWidth60"/></td>
								<td width="172px" class="fontSize12" align="center"><div class="selftechNameStyle">{{item.techName}}</div></td>
								<td  width="72px" class="fontSize12" align="center">
									<span class="fontSize12" v-if="item.techSex =='male'">男</span>
									<span class="fontSize12" v-if="item.techSex =='female'">女</span>									
								</td>
								<td width="140px" class="fontSize12"  align="center">
											<span class="fontSize12" v-if="item.jobNature =='part_time'">兼职</span>
											<span class="fontSize12" v-if="item.jobNature =='full_time'">全职</span>
								</td>							
							</tr>
					</div>
					</table>
					<div v-if="listTech.length == 0  || listTech.length == undefined" class="selfTabProm">暂无数据</div>
				</div>            
			</div> 	  	  
			<div slot="footer" class="dialog-footer" style="text-align:center">
				<button class="button-large" :disabled="techSaveFlag" @click="submitForm2()">保存</button>
				<button class="button-cancel" @click="cancelForm2()">取 消</button>
			</div>
		</el-dialog>
		<!--技师选择弹窗结束-->		
  </div>
</template>

<script>
import {dispatchTechData1,dispatchTechSave1,Reassignment} from "@/api/order";
export default {
  name: "",
  data() {
    return {
			btnShow: JSON.parse(localStorage.getItem('btn')),
			techSaveFlag:false,
			listTech:[],
			techName:'',
			middleA:[],
			tableData:[],
		//全局搜索下拉选项
		technicianOptions:[
		  { key: "1", technicianName: "技师姓名" },
		  { key: "2", technicianName: "技师手机号" },
		  { key: "3", technicianName: "订单编号" }
		],				
		dialogTableVisible:false,//选择技师弹窗开关
		technicianName:'1',//技师姓名
		technicianName1:'',//技师姓名
		pagetotal1:null,//表格总页数
		pageSize1:10,//表格每页条数
		pageNumber:1,	
		jumpPage:1,
		aa:'',
		orderId:'',
		listLoading:false,
		techName1:'',
		techName2:'',
		techPhone1:'', 
		orderNumber1:'',			
    };
  },
  methods:{
		//跳转改派记录页		
		godispatchReass(id){
			window.localStorage.setItem("orderId1",id)
			this.$router.push({path:'/clean/dispatchReass/',query:{id:id}})			
		},
    //选择技师弹出层查询按钮
    searchTeh(){  
        var obj = {
          id:this.orderId,
          techName: this.techName
        };
				dispatchTechData1(obj).then(res => {
						if (res.data.code === 1) {
							if(res.data.data != undefined){
								this.listTech = res.data.data;
								for (var c = 0; c < this.middleA.length; c++) {
									for (var d = 0; d <this.listTech.length; d++) {
										this.$set(this.listTech[d],'techChecked',false)
										if (
											this.listTech[d].techId ==
											this.middleA[c].techId
										) {
											this.listTech[d].techChecked = true;
										}
									}
								}
							}else{
								this.listTech=[]                     
							}
						}
					}).catch(res=>{
									
					});                          
    },
    //存储选择技师对象
    ChangeTech(obj){
      if(obj.techChecked){
          this.middleA.push(obj)          
      }else{
          this.middleA.remove(obj)          
      }
    },    
    //选择技师弹出层保存
    submitForm2() {
      this.techSaveFlag=true;
      //先遍历数据中选中的再保存
      var arr = [];
      if (this.middleA != undefined && this.middleA.length != 0) {
        for (let a = 0; a < this.middleA.length; a++) {
          if (this.middleA[a].techChecked == true) {
            arr.push(this.middleA[a].techId);
          }
        }
      }
      if(arr.length !=0 ){
        var obj1={
          id:this.orderId,
          dispatchTechId:this.aa,
          techIdList:arr
        }
        dispatchTechSave1(obj1).then(res => {
          this.techSaveFlag=false;      
          if (res.data.code === 1) {
              this.$message({
                type: "success",
                message: "改派成功!"
              });
							var obj={

							}
							this.reassList(obj,this.pageNumber,this.pageSize1);	
							this.middleA=[]; 
							this.listTech=[];                          
              this.dialogTableVisible = false
          }else{
              this.$message({
                type: "error",
                message: res.data.data
              });             
          }          
        }).catch(res=>{
          this.techSaveFlag=false;
        });        
      }
      if(arr.length ==0){
				this.techSaveFlag=false;
				this.dialogTableVisible = false;
      }             	
		},
    //选择技师弹出层取消
    cancelForm2(){
      this.middleA=[];
      this.listTech=[];     
			this.dialogTableVisible = false			
    },		         
    //改派技师
    gaiPai(id,obj){
				this.techName2='';
				this.aa=obj.techId;
				this.orderId=id;         
				var obj1={
					id:id
				};            
				dispatchTechData1(obj1).then(res => {      
					if (res.data.code === 1) {
						this.dialogTableVisible=true;                                        
						if(res.data.data != undefined){ 
							this.listTech=res.data.data;
						}else{
              this.listTech=[];
						}
					}else{						  
							this.$message({
								type: "error",
								message: res.data.data
							});                   
					}          
				}).catch(res=>{
					
				});
    
    },		
	//查看跳转到订单详情页
	lookInf(id){
		window.localStorage.setItem("orderId",id)
		this.$router.push({path:'/clean/orderinfo',query:{id:id}})
	},		
	//列表渲染
	reassList(pramsObj,pageNo,pageSize){
		this.listLoading = true;
		var obj=pramsObj; 
		Reassignment(obj,pageNo,pageSize).then(res=>{
       if (res.data.code === 1) {
					 this.tableData = res.data.data.list;										
					 this.pagetotal1=res.data.data.count;			
					this.listLoading = false;
			 }else{
				 	this.listLoading = false;
			 }
		}).catch(res=>{

		})
	},
	//全局搜索按钮
	localSearch(){
		if(this.technicianName =='1'){
        this.techName1=this.techName;
		}else if(this.technicianName =='2'){
				this.techPhone1=this.techName;
		}else if(this.technicianName =='3'){
				this.orderNumber1=this.techName;
		}else{
				this.techName1='';
				this.techPhone1='';
				this.orderNumber1='';
		}
		var obj={
			techName:this.techName1,
			techPhone:this.techPhone1, 
			orderNumber:this.orderNumber1,
		};
		this.pageNumber=1;
		this.jumpPage=1;		
		this.reassList(obj,this.pageNumber,this.pageSize1);		
	},
	//表格页数改变
	handleSizeChange1(val) {
		this.pageNumber=1;
		this.jumpPage=1;
		this.pageSize1=val;
		var obj={
		}
		this.reassList(obj,this.pageNumber,this.pageSize1);	

	},
	//表格当前页改变
	handleCurrentChange1(val) {
		this.pageNumber=val;
		var obj={
		}
		this.reassList(obj,this.pageNumber,this.pageSize1);
	}	
  },
  mounted() {
		// var obj={

		// }
    this.reassList();
  }
};
</script>
<style scoped>
.dispatchNumberStyle{
   cursor:pointer;
}
.dispatchNumberStyle:hover{
	color:#1d85fe;
}
.width120{width:120px;}
.FloatRight{float:right;}
.selfpromMessageTab{position:relative;width:100%;margin-top:20px;margin-left:10px;}
.techNameStyle {
  width: 80px;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tabWrap1 {
  width: 80px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top:5px;
  font-size: 12px;
  display: inline-block;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 12px;
  border: 1px solid #bfcbd9;
  position: relative;
}
.selfTableWrapONE{
	margin-top: 20px;
  overflow: hidden;
  width: 660px;
  margin-bottom: 20px;
  height: 300px;
	position:relative;
}
.table-d{
  width: 677px;
  overflow-y: scroll;
  height: 300px;
  margin-left: 15px;
}
.selfTable,.selfTable tr th, .selfTable tr td { border:1px solid #eee; }
.selfTable { min-height: 25px; line-height: 25px; text-align: center; border-collapse: collapse; padding:2px;}
.height70{height:70px;}
.imgStyle{display:block;}
.slide-enter-active {
    transition: all .8s ease;
}
.slide-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter,.slide-leave-active {
    transform: translateY(-10px);
    opacity: 0;
}
.tableHeader{position:absolute;z-index:99999;margin:0px;margin-top:-1px;}
.selfTdStyle1 {
  vertical-align:middle;
  height: 70px;
  line-height:70px;
}
.selftechNameStyle{
    width:185px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;
}
.fontSize12{font-size:12px;}
.selfTabProm{width:100%;text-align:center;height:200px;line-height:200px;}
.bgWhite {
    background-color: #ffffff;
    padding: 20px 20px 20px 20px;
}
.el-table_1_column_8{
	border-right:none; 
}
.selfTd{
	text-align:center;
	height:60px;
	line-height:60px;
	width:150%;
	margin-left:-17px;
	border-bottom:1px solid #dfe6ec
}
.selfTd:last-child{
   border:none;
}
.addorder-container{
    width:100%;
	float:left;
	background:#eef1f6;
}
.fist-bar{
  padding:20px;
  background:#fff;
  margin-right:20px;
 
}
.second-bar{
  padding-top:0px;
  padding-bottom:20px;
  background:#eef1f6;
  margin-left:0px;
  margin-right:0px;
  
}

.el-table .cell{
	padding: 0;
}

.tableWarpaa .el-pagination{
	text-align: right;
}
.techDialog .el-pagination{
	text-align: center;
	padding: 0;
}
.techDialog .dialog-footer{
	padding-bottom: 50px;
}
.tableWarpaa tr>td:nth-child(1){
	padding: 0 20px;
}
.head-images{
	width: 50px;
	height: 50px;
	margin-top: 5px;
}

.addorder-container .pagination-container{
	padding: 20px 0;
}
.addorder-container .dialog-footer{
	display: flex;
	justify-content: center;
}
.addorder-container .dialog-footer .button-cancel{
	margin-left: 20px;
}
.selfTableHEADTD{background:#eef1f6;height:60px;border:none !important;}
</style>