<template>
    <div class="addorder-container">
		<div class="fist-bar">
		  <el-select clearable class="search" v-model="technicianName" placeholder="请选择">
				<el-option v-for="item in technicianOptions" :key="item.key" :label="item.technicianName" :value="item.key">
				</el-option>
		  </el-select>
      <el-input  v-if="technicianName =='1'" class="search"       placeholder="请输入技师姓名" v-model="technicianName1"></el-input>
			<el-input  v-else-if="technicianName =='2'" class="search"  placeholder="请输入技师手机号" v-model="technicianName1"></el-input>
			<el-input  v-else-if="technicianName =='3'" class="search"  placeholder="请输入订单编号" v-model="technicianName1"></el-input>
			<el-input  v-else class="search"  placeholder="请输入搜索内容" v-model="technicianName1"></el-input>		  
		  <button class="button-large btn_search" @click="localSearch"><i class="el-icon-search"></i>&nbsp;搜索</button>
		</div>
		<div class="second-bar" style="height:500px;">
			<div class="tableWarp" style="width:100%;background:#fff;padding:20px 30px;">
					<el-table :data="tableData" border style="width:100%" stripe>
					  <el-table-column prop="orderNumber" align="center" label="订单编号"></el-table-column>
					  <el-table-column align="center" prop="serviceTime" label="服务时间"></el-table-column>
					  <el-table-column style="padding:0" align="center" label="头像">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">
											<img class="head-images" src="http://openservice.oss-cn-beijing.aliyuncs.com/openservice/2017/12/29/%E5%A4%B4%E5%83%8F.jpg" alt="">
										</div>						
								</template>
					  </el-table-column>

					  <el-table-column align="center" label="姓名">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">{{item.name}}</div>						
								</template>
					  </el-table-column>

					  <el-table-column align="center" label="性别">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">{{item.sex}}</div>						
								</template>
					  </el-table-column>

					  <el-table-column align="center" label="电话">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">{{item.phone}}</div>						
								</template>
					  </el-table-column>

					  <el-table-column align="center" label="岗位性质">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">{{item.jobNature}}</div>						
								</template>
					  </el-table-column>

						<el-table-column label="操作" align="center">
							<el-table-column align="center" label="操作" :colspan="2" ref="column">
									<template scope="scope">
										<div class="selfTd"  v-for=" item in scope.row.techList" :key="item.name">
											<el-button type="button" @click="selectBut(item.name)">改派</el-button>
											<!-- <el-button type="button" >改派记录</el-button> -->
										</div>						
									</template>
							</el-table-column>		
							<el-table-column align="center">
								<template scope="scope">
									<div>
										<router-link :to="'/clean/dispatchReass/'+scope.row.id">
											<el-button type="button">
												改派记录
											</el-button>
										</router-link>
									</div>
								</template>	
							</el-table-column>			  
						</el-table-column>
				</el-table>
					<div  style="margin-top:20px;">
					  <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" 
						:page-sizes="[10,20,30, 50]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="pagetotal1">
					  </el-pagination>
					</div>					
					
			</div>
		</div>
	<!--技师选择弹窗-->
	<el-dialog class="techDialog" title="选择技师" :visible.sync="dialogTableVisible">
	  <el-input  style="width: 200px;"  placeholder="请输入技师姓名" v-model="technicianName"></el-input>
	  <el-select clearable style="width:200px;margin-right:20px;" class="filter-item" v-model="stationName" placeholder="请选择">
		<el-option v-for="item in stationOptions" :key="item.key" :label="item.stationName" :value="item.key">
		</el-option>
	  </el-select>	  
	  <button class="button-large" @click="technicianSearch">搜索</button>	
	  <el-table :data="technicianData" border>
		<el-table-column   width="50"   align="center" type="selection"></el-table-column>
		<el-table-column prop="headUrl" align="center" label="头像"></el-table-column>
		<el-table-column prop="name" align="center" label="姓名"></el-table-column>
		<el-table-column prop="sex" align="center" label="性别"></el-table-column>
		<el-table-column prop="serverStation" align="center" label="服务站"></el-table-column>
		<el-table-column prop="jobNature" align="center" label="岗位性质"></el-table-column>
	  </el-table>
	  <div  class="pagination-container">
		  <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
			:page-sizes="[10,20,30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagetotal">
		  </el-pagination> -->
		   <el-pagination
				layout="prev, pager, next"
				:total="100">
			</el-pagination>
	  </div>	  
	  <div slot="footer" class="dialog-footer">
		<button class="button-large" @click="dialogTableVisible = false">确 定</button>
		<button class="button-cancel" @click="dialogTableVisible = false">取 消</button>
	  </div>
	</el-dialog>
  </div>
</template>

<script>
import { staffList, addStaff, getStaff ,addMech,Reassignment} from "@/api/staff";
//import { parseTime } from "@/utils";
export default {
  name: "",
  data() {
    return {
			tableData:[
				{
					orderNumber:"23232323223232323232323",
					serviceTime:"2017/10/27 16:54",
					techList:[
						{
							headPic:"../../icons/svg/Selected.png",
							name:"张三",
							sex:"男",
							phone:"15711445668",
							jobNature:"全职",
						},
						{
							headPic:"",
							name:"张三1",
							sex:"男",
							phone:"15711445668",
							jobNature:"全职",
						},
						{
							headPic:"",
							name:"张三2",
							sex:"男",
							phone:"15711445668",
							jobNature:"全职",
						}
					]
				},
				{
					orderNumber:"abcdefghijklmnsssssww",
					serviceTime:"2017/12/27 16:54",
					techList:[
						{
							headPic:"",
							name:"利索",
							sex:"女",
							phone:"15711445668",
							jobNature:"兼职",
						},
						{
							headPic:"",
							name:"利索",
							sex:"女",
							phone:"15711445668",
							jobNature:"兼职",
						},
						{
							headPic:"",
							name:"利索",
							sex:"女",
							phone:"15711445668",
							jobNature:"兼职",
						}
					]
				}
			],
		//全局搜索下拉选项
		technicianOptions:[
		  { key: "1", technicianName: "技师姓名" },
		  { key: "2", technicianName: "技师手机号" },
		  { key: "3", technicianName: "订单编号" }
		],		
		//服务站下拉选项
		stationOptions:[
		  { key: "1", stationName: "服务站1" },
		  { key: "2", stationName: "服务站2" },
		  { key: "3", stationName: "服务站3" },
		  { key: "4", stationName: "服务站4" }
		],
		//服务站
		stationName:'',
		//技师选择弹窗表格数据
		technicianData:[{
          headUrl: 'headurl',
          name: '王小虎',
          sex: '男',
		  serverStation:'呼家楼服务站',
		  jobNature:'全职'
        }, 
		{
          headUrl: 'headurl',
          name: '王小虎',
          sex: '男',
		  serverStation:'呼家楼服务站',
		   jobNature:'全职'
        },{
          headUrl: 'headurl',
          name: '王小虎',
          sex: '男',
		  serverStation:'呼家楼服务站',
		   jobNature:'全职'
        },{
          headUrl: 'headurl',
          name: '王小虎',
          sex: '男',
		  serverStation:'呼家楼服务站',
		   jobNature:'全职'
        }],
		//当前客户姓名		
		dialogTableVisible:false,//选择技师弹窗开关
		technicianName:'',//技师姓名
		technicianName1:'',//技师姓名
		pagetotal:10,//技师总页数
		pageSize:2,//每页条数
		pagetotal1:100,//表格总页数
		pageSize1:10,//表格每页条数		
    };
  },
  methods:{
	//列表渲染
	reassList(page,size,obj){
		Reassignment(page,size,obj).then(data=>{
			console.log(data)
		}).catch(error=>{
			console.log(error)
		})
	},
	//全局搜索按钮
	localSearch(){
	},
	//弹窗技师搜索按钮
	technicianSearch(){
	},
	//弹窗页数改变
    handleSizeChange(val) {

    },
	//弹窗当前页改变
    handleCurrentChange(val) {

    },
	//表格页数改变
    handleSizeChange1(val) {

    },
	//表格当前页改变
    handleCurrentChange1(val) {

    },	
    //表格操作按钮
	selectBut(obj){
		  console.log(obj)
	    this.dialogTableVisible=true;		
	}	
  },
  mounted() {

  }
};
</script>
<style>
.el-table_1_column_8{
	border-right:none; 
}
.selfTd{
	text-align:center;
	height:60px;
	line-height:60px;
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
  padding-top:20px;
  padding-bottom:20px;
  background:#eef1f6;
  margin-left:20px;
  margin-right:20px;
  
}

.el-table .cell{
	padding: 0;
}
.tableWarp .el-table__header tr:nth-of-type(2){
	display: none;
}
.tableWarp .el-pagination{
	text-align: right;
}
.techDialog .el-pagination{
	text-align: center;
	padding: 0;
}
.techDialog .dialog-footer{
	padding-bottom: 50px;
}
.tableWarp tr>td:nth-child(1){
	padding: 0 20px;
}
.head-images{
	width: 50px;
	height: 50px;
	margin-top: 5px;
}
.addorder-container .el-dialog__body{
	padding-bottom: 0;
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
</style>