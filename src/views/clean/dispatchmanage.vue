<template>
    <div class="addorder-container">
		<div class="fist-bar">
		  <el-select clearable style="width:200px;margin-left:30px;" class="filter-item" v-model="technicianName" placeholder="请选择">
			<el-option v-for="item in technicianOptions" :key="item.key" :label="item.technicianName" :value="item.key">
			</el-option>
		  </el-select>
          <el-input  style="width: 200px;margin-left:20px;"  placeholder="请输入搜索内容" v-model="technicianName1"></el-input>		  
		  <button class="button-large" style="float:right;margin-right:20px;" @click="localSearch">搜索</button>
		</div>
		<div class="second-bar" style="height:500px;">
			<div class="tableWarp" style="width:100%;background:#fff;padding:20px 30px;">
				    <el-table
					  :data="tableData"
					  border
					  style="width:100%;">
					  <el-table-column
						prop="date"
						align="center"
						label="订单编号"
						width="120">
					  </el-table-column>
					  <el-table-column
					    align="center"
						prop="name"
						label="服务时间"
						width="120">
					  </el-table-column>
					  <el-table-column
					    width="140"
						align="center"
						label="头像">
						<template scope="scope">
                             <div class="selfTd" v-for=" item in scope.row.address">{{item.name}}</div>						
						</template>
					  </el-table-column>
					  <el-table-column
					    width="140"
						align="center"
						label="技师">
						<template scope="scope">
                             <div class="selfTd" v-for=" item in scope.row.address">{{item.name}}</div>						
						</template>
					  </el-table-column>
					  <el-table-column
					    width="140"
						align="center"
						label="性别">
						<template scope="scope">
                             <div class="selfTd" v-for=" item in scope.row.address">{{item.name}}</div>						
						</template>
					  </el-table-column>
					  <el-table-column
					    width="140"
						align="center"
						label="电话">
						<template scope="scope">
                             <div class="selfTd" v-for=" item in scope.row.address">{{item.name}}</div>						
						</template>
					  </el-table-column>
					  <el-table-column
					    width="140"
						align="center"
						label="所属服务站">
						<template scope="scope">
                             <div class="selfTd" v-for=" item in scope.row.address">{{item.name}}</div>						
						</template>
					  </el-table-column>
					  <el-table-column
					    width="140"
						align="center"
						label="操作">
						<template scope="scope">
                             <div class="selfTd" v-for=" item in scope.row.address" @click="selectBut(item.name)">{{item.name}}</div>						
						</template>
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
	<el-dialog title="选择技师" :visible.sync="dialogTableVisible">
	  <el-input  style="width: 200px;"  placeholder="请输入技师姓名" v-model="technicianName"></el-input>
	  <el-select clearable style="width:200px;margin-right:20px;" class="filter-item" v-model="stationName" placeholder="请选择">
		<el-option v-for="item in stationOptions" :key="item.key" :label="item.stationName" :value="item.key">
		</el-option>
	  </el-select>	  
	  <button class="button-large" @click="technicianSearch">搜索</button>	
	  <el-table :data="technicianData">
		<el-table-column   width="50"  type="selection"></el-table-column>
		<el-table-column prop="headUrl" align="center" label="头像"></el-table-column>
		<el-table-column prop="name" align="center" label="姓名"></el-table-column>
		<el-table-column prop="sex" align="center" label="性别"></el-table-column>
		<el-table-column prop="serverStation" align="center" label="服务站"></el-table-column>
	  </el-table>
	  <div  class="pagination-container">
		  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
			:page-sizes="[10,20,30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagetotal">
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
import { staffList, addStaff, getStaff ,addMech} from "@/api/staff";
import waves from "@/directive/waves/index.js"; // 水波纹指令
//import { parseTime } from "@/utils";
export default {
  name: "",
  directives: {
    waves
  },
  data() {
    return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address:[
			  { name: "请选择" },
			  { name: "技师姓名" },
			  { name: "技师姓名" },
			  { name: "技师姓名" }

			] 
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address:[
			  { name: "请选择" },
			  { name: "技师姓名" },
			  { name: "技师姓名" },
			  { name: "技师姓名" }
			]
          }],	
		//全局搜索下拉选项
		technicianOptions:[
		  { key: "1", technicianName: "请选择" },
		  { key: "2", technicianName: "技师姓名" },
		  { key: "3", technicianName: "技师手机号" },
		  { key: "4", technicianName: "订单编号" }
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
		  serverStation:'呼家楼服务站'
        }, 
		{
          headUrl: 'headurl',
          name: '王小虎',
          sex: '男',
		  serverStation:'呼家楼服务站'
        },{
          headUrl: 'headurl',
          name: '王小虎',
          sex: '男',
		  serverStation:'呼家楼服务站'
        },{
          headUrl: 'headurl',
          name: '王小虎',
          sex: '男',
		  serverStation:'呼家楼服务站'
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
	    this.dialogTableVisible=true;		
	}	
  },
  mounted() {


  }
};
</script>
<style lang="scss" scoped>
.selfTd{
width:140px;margin-left:-20px;text-align:center;height:49px;line-height:49px;border-bottom:1px solid #dfe6ec
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
  padding-top:20px;
  padding-bottom:20px;
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
</style>