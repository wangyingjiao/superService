<template>
    <div class="addorder-container">
		<div class="fist-bar">
		  <span class="custom-action">选择客户</span>
		  <el-select clearable style="width:280px;margin-right:20px;" class="filter-item" v-model="custom" placeholder="请选择">
			<el-option v-for="item in customOptions" :key="item.key" :label="item.customName" :value="item.key">
			</el-option>
		  </el-select>	  
		  <button class="button-large" @click="handleFilter">新增</button>
		</div>
		<div class="second-bar">
			<div class="custom-inf">
				<div class="custom-action">客户信息</div>
				<div class="hr-style"></div>
				<div class="custom-action" style="margin-top:20px;">					
					<el-form :model="customPhone1" :rules="rules2" ref="customPhone1" label-position="left" >
					  <el-form-item label="客户姓名:" prop="customName">
						  <span class="customNamevalue">{{customPhone1.customName}}</span>
					  </el-form-item>
					  <el-form-item label="客户电话:" prop="phone" style="margin-top:-15px;">
						<span class="customNamevalue"><el-input  style="width:200px;"  placeholder="请输入搜索内容" v-model="customPhone1.phone"></el-input></span>
					  </el-form-item>
					</el-form>					
				</div>		

			</div>
			<div class="sever-inf">
				<div class="custom-action">服务信息</div>
				<div class="hr-style"></div>
				<div class="custom-action" style="margin-top:20px;">服务地址:<span class="customNamevalue">{{serverAddress}}<button type="button" class="button-cancel" style="margin-left:30px;height:20px;" @click="changeAddress">更换地址</button></span></div>
				<div class="custom-action" style="margin-top:20px;">所属服务站:<span style="margin-left:35px;">{{serverStation}}</span></div>
			</div>
		</div>
		<div class="thrid-bar">
			<div class="order-inf">
				<div class="custom-action">订单信息</div>
				<div class="hr-style"></div>
				<div class="custom-action" style="margin-top:20px;"><span class="redStart">*</span>服务项目:
					<span class="customNamevalue">
					  <el-select clearable style="width:400px;margin-right:20px;" class="filter-item" v-model="custom" placeholder="请选择" @change="serverchange">
						<el-option v-for="item in serverOptions" :key="item.key" :label="item.serverName" :value="item.key">
						</el-option>
					  </el-select>
					</span>
				</div>
				<div class="changeserver">
					<div v-if="serverType==1">
						<span>面积:</span>
						<span  style="padding-left:76px;">				
							<el-input  style="width: 180px;" class="filter-item" placeholder="请输入搜索内容" v-model="customPhone">
							</el-input>
							<span style="display:inline-block;width:36px;line-height:36px;text-align:center;height:36px;background:#eef1f6;position:absolute;border:1px solid #bfcbd9;border-left:none;">平米</span>							
						</span>
					</div>
					<div v-if="serverType==2">
						<div style="margin-left:126px;width:180px;border-top:1px solid #eef1f6;height:50px;line-height:50px;font-size:12px;">
						   <span style="display:inline-block;">小型灯</span>
						   <span @click="smallminus(smallLight)" style="margin-top:9px;position:absolute;border:1px solid #bfcbd9;width:36px;text-align:center;display:inline-block;margin-left:10px;border-right:none;height:36px;line-height:36px;font-size:20px;">-</span>
						   <input  onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" style="width:50px;position:absolute;margin-left:46px;margin-top:9px;border:none;border:1px solid #bfcbd9;height:36px;line-height:36px;text-align:center;"  v-model="smallLight">
						   <span @click="smallplus(smallLight)" style="margin-top:9px;position:absolute;border:1px solid #bfcbd9;width:36px;text-align:center;display:inline-block;margin-left:96px;border-left:none;height:36px;line-height:36px;font-size:20px;">+</span>
						</div>
						<div style="margin-left:126px;width:180px;border-top:1px solid #eef1f6;border-bottom:1px solid #eef1f6;height:50px;line-height:50px;font-size:12px;">
							<span>大型灯</span>
						    <span @click="bigminus(bigLight)" style="margin-top:9px;position:absolute;border:1px solid #bfcbd9;width:36px;text-align:center;display:inline-block;margin-left:10px;border-right:none;height:36px;line-height:36px;font-size:20px;">-</span>
							<input  onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" style="width:50px;text-align:center;position:absolute;margin-left:46px;text-align:center;margin-top:9px;border:none;border:1px solid #bfcbd9;height:36px;line-height:36px;outline:none;"  v-model="bigLight">
						    <span @click="bigplus(bigLight)" style="margin-top:9px;position:absolute;border:1px solid #bfcbd9;width:36px;text-align:center;display:inline-block;margin-left:96px;border-left:none;height:36px;line-height:36px;font-size:20px;">+</span>							
						</div>
					</div>
					<div style="margin-left:88px;" v-if="serverType==3">
						<div class="selfCheckBox" ref="selcetOption" @click="roomSel($index,item)" v-for="(item,$index) in roomType">
							{{item.roomName}}
							<div v-if="roomLen==item.key" class="triangle-bottomright"></div>
							<div class="tally">&#10004</div>
						</div>						
					</div>
				</div>
				<div class="custom-action" style="margin-top:20px;"><span class="redStart">*</span>价格:
					<span class="customNamevalue" style="padding-left:78px;">{{price}}元</span>
				</div>
				<div class="custom-action" style="margin-top:20px;"><span class="redStart">*</span>技师性别:
				    <div style="display:inline-block;margin-left:28px;" >
						<div class="selfCheckBox"  ref="sexOption"  @click="roomSel1($index,item)" v-for="(item,$index) in sexType">
							{{item.sexName}}
							<div v-if="sexLen==item.key" class="triangle-bottomright"></div>
							<div class="tally">&#10004</div>
						</div>
					</div>					
				</div>
				<div class="custom-action" style="margin-top:20px;"><span class="redStart">*</span>技师:
                        <span class="customNamevalue" style="padding-left:72px;">
							<button type="button" class="button-cancel" style="width:100px;" @click="technicianSel">选择技师</button>
							<span style="margin-left:50px;font-size:12px;">系统自动分配:
								  <el-switch
									v-model="sysAllocat"
									on-color="#4c70e8"
									off-color="#bfcbd9"
									on-text="是"
									off-text="否"
									on-value="1"
									off-value="0">
								  </el-switch>				
							</span>
						</span>				
				</div>
				<div class="custom-action" style="margin-top:20px;">
					<div class="customNamevalue" style="margin-left:60px;width:100%;height:40px;">
						<div class="tabWrap" v-for="(item,$index) in tabOptions " ref="tabsName">
						   {{item.tabName}}
						   <div class="closePic"  @click="errorClose(item,$index)">&#10005</div>
						</div>						
					</div>
				</div>
				<div class="custom-action" style="margin-top:20px;"><span class="redStart">*</span>服务时间:
					<span class="customNamevalue" style="padding-left:48px;">
							<el-date-picker
							  v-model="severTime"
							  type="datetime"
							  placeholder="年/月/日">
							</el-date-picker>
					</span>
				</div>
				<div class="custom-action" style="margin-top:20px;"><span class="redStart">*</span>订单来源:
					<span class="customNamevalue">
					  <el-select clearable style="width:400px;margin-right:20px;" class="filter-item" v-model="orderOrgin" placeholder="请选择">
						<el-option v-for="item in orderOrginOptions" :key="item.key" :label="item.orderOrginName" :value="item.key">
						</el-option>
					  </el-select>
					</span>
				</div>
				<div class="custom-action" style="margin-top:20px;">
				    <span style="position:absolute;margin-top:30px;">客户备注:</span>
					<span class="customNamevalue" style="margin-left:78px;">
						<el-input
						  type="textarea"
						  :rows="3"
						  placeholder="请输入内容"
						  v-model="textarea"
						  style="width:400px;margin-left:-20px;"
						  >
						</el-input>
					</span>
				</div>
				<div class="custom-action" style="margin-top:50px;margin-left:180px;padding-bottom:20px;">
				   <button class="button-large" @click="confirmOrder">确认下单</button>
				</div>
                				
			</div>
			
		</div>
	<!--更换地址弹窗-->
    <el-dialog
	  :visible.sync="dialogVisible"
	  title="更换地址"
	  size="small"
	  >
	  <div class="custom-action"><span class="redStart">*</span>所在区域
		<span class="customNamevalue">
		  <el-select clearable style="width:130px;margin-right:20px;" class="filter-item" v-model="province" placeholder="请选择">
			<el-option v-for="item in provinceOptions" :key="item.key" :label="item.provinceName" :value="item.key">
			</el-option>
		  </el-select>
		  <el-select clearable style="width:130px;margin-right:20px;" class="filter-item" v-model="city" placeholder="请选择">
			<el-option v-for="item in cityOptions" :key="item.key" :label="item.cityName" :value="item.key">
			</el-option>
		  </el-select>
		  <el-select clearable style="width:130px;" class="filter-item" v-model="county" placeholder="请选择">
			<el-option v-for="item in countyOptions" :key="item.key" :label="item.countyName" :value="item.key">
			</el-option>
		  </el-select>		  
		</span>
	  </div>
	  <div class="custom-action" style="margin-top:20px;"><span class="redStart">*</span class="customNamevalue" >详细地址
		<span class="customNamevalue">
				<el-input  style="width: 300px;" class="filter-item" placeholder="请输入搜索内容" v-model="detailedAddress">
				</el-input>		
		</span>
	  </div>
	  <span slot="footer" class="dialog-footer">
	    <button class="button-large" @click="changeOk">确 认</button>
		<button class="button-cancel" @click="dialogVisible = false">取 消</button>		
	  </span>
	</el-dialog>
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
//import { parseTime } from "@/utils";
export default {
  name: "",
  data() {
	var checkPhone = (rule, value, callback) => {
			if (!value) {
			  return callback(new Error('电话号码不能为空'));
			}else{
				if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
				  callback(new Error('电话号码不正确！请重新填写'));
				} else {
				  callback();
				}
			}
	};  
    return {
        rules2: {
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ]
        },
        customPhone1:{
			phone:'',
			customName:'李四'
		},		
		//客户下拉选项
		customOptions:[
		  { key: "1", customName: "日常保洁" },
		  { key: "2", customName: "除尘除螨" },
		  { key: "3", customName: "家电清洗" },
		  { key: "4", customName: "擦玻璃" }
		],
		//tabName
		tabOptions:[
		  { key: "1", tabName: "王小虎" },
		  { key: "2", tabName: "王小虎" },
		  { key: "3", tabName: "王小虎" }
		],
    //
		serverOptions:[
		  { key: "1", serverName: "平米保洁" },
		  { key: "2", serverName: "灯具清洁" },
		  { key: "3", serverName: "居室保洁" }
		],
    //
		provinceOptions:[
		  { key: "1", provinceName: "北京" },
		  { key: "2", provinceName: "上海" },
		  { key: "3", provinceName: "天津" }
		],
		province:'',
		//
		cityOptions:[
		  { key: "1", cityName: "朝阳区" },
		  { key: "2", cityName: "东城区" },
		  { key: "3", cityName: "西城区" }
		],
		city:'',
		//
		countyOptions:[
		  { key: "1", countyName: "朝阳区" },
		  { key: "2", countyName: "东城区" },
		  { key: "3", countyName: "西城区" }
		],
		county:'',		
		//orderOrgin
		orderOrginOptions:[
		  { key: "1", orderOrginName: "中信国安" },
		  { key: "2", orderOrginName: "国安府" },
		  { key: "3", orderOrginName: "第三方" }
		],
    orderOrgin:'',
		//
		detailedAddress:'XXX小区1号楼3单元222室',
		//客户备注
        textarea:'',		
		//服务站下拉选项
		stationOptions:[
		  { key: "1", stationName: "服务站1" },
		  { key: "2", stationName: "服务站2" },
		  { key: "3", stationName: "服务站3" },
		  { key: "4", stationName: "服务站4" }
		],
		//服务站
		stationName:'',
		//服务时间
		severTime:'',
		//弹窗表格数据
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
		//当前客户
		custom:"1",
		//当前电话
		customPhone:13821209999,
		//当前客户姓名		
		customName:"李四",
		serverAddress:'北京市朝阳区关东街11呼家楼',
		serverStation:'呼家楼服务站',
		dialogVisible:false,//更换地址弹窗开关
		dialogTableVisible:false,//选择技师弹窗开关
		serverType:2,//服务类型
		smallLight:1,//小灯型
		bigLight:1,//大灯型
		roomType:[
		  { key: "1", roomName: "一居室" },
		  { key: "2", roomName: "二居室" },
		  { key: "3", roomName: "三居室" }
		],//居室信息
		roomLen:0,//居室数量开关
		price:1000,//服务价格
		sexType:[
		  { key: "1", sexName: "不限制" },
		  { key: "2", sexName: "男" },
		  { key: "3", sexName: "女" }
		],//技师信息
		sexLen:0,//技师性别开关
        sysAllocat:1,//系统分配值
		technicianName:'',//技师姓名
		pagetotal:10,//技师总页数
		pageSize:2,//每页条数
		
    };
  },
  methods:{ 
    //搜索按钮
    handleFilter() {
    },
	//更换地址按钮
	changeAddress(){
	    this.dialogVisible=true;
	},
	//更换地址弹窗“确认”
	changeOk(){
	    this.dialogVisible = false;
	},
	//服务类型下拉改变
	serverchange(value){
	   this.serverType=value;
	},
	//小型灯减
	smallminus(value){
	    value=parseInt(value);
	    if(value<=1){
			this.smallLight=1
		}else{
		    this.smallLight=value-1
		}
	},
	//小型灯加
	smallplus(value){
			value=parseInt(value);
		    this.smallLight=value+1			
	},
	//大型灯减
	bigminus(value){
		value=parseInt(value);
	    if(value<=1){
			this.bigLight=1
		}else{
		    this.bigLight=value-1
		}
	},
	//大型灯加
	bigplus(value){
			value=parseInt(value);
		    this.bigLight=value+1			
	},
	//居室数量选择及样式变化
	roomSel(index,obj){
		this.roomLen=index+1;
		for (var i=0 ;i<this.$refs.selcetOption.length;i++){
		      if(i == index){
			      this.$refs.selcetOption[i].style.borderColor='green';
			  }else{
			      this.$refs.selcetOption[i].style.borderColor='#bfcbd9';
			  }
		       
		}		
	},
	//技师选择及样式变化
	roomSel1(index,obj){
		this.sexLen=index+1;
		for (var i=0 ;i<this.$refs.sexOption.length;i++){
		      if(i == index){
			      this.$refs.sexOption[i].style.borderColor='green';
			  }else{
			      this.$refs.sexOption[i].style.borderColor='#bfcbd9';
			  }
		       
		}		
	},
	//技师选择按钮点击
	technicianSel(){
		this.dialogTableVisible=true;
	},
	//弹窗搜索按钮点击
	technicianSearch(){
	},
	//每页条数多少改变
    handleSizeChange(val) {

    },
	//分页器改变当前页
    handleCurrentChange(val) {

    },
    //叉号点击关闭TAB
    errorClose(obj,index){
	   this.$refs.tabsName[index].style.display="none";
	},
	//确认下单按钮点击
	confirmOrder(){
	}
	
  },
  mounted() {


  }
};
</script>
<style  lang="scss" scoped>

.tabWrap{width:100px;margin-right:20px;font-size:12px;display:inline-block;height:25px;text-align:center;line-height:25px;border-radius:12px;border:1px solid #bfcbd9;position:relative;}
.closePic{cursor:pointer;color:#bfcbd9;font-size:12px;position:absolute;margin-left:80px;margin-top:-25px;}
.addorder-container{
    width:100%;
	float:left;
	background:#eef1f6;
	margin-top: 20px;
	.fist-bar{
	  padding-top:20px;
	  padding-bottom:20px;
	  background:#fff;
	  margin-left:20px;
	  margin-right:20px;
	}
}
.custom-action{
	margin-left:30px;
	margin-right:48px;
}

.second-bar{
  padding-top:20px;
  padding-bottom:20px;
  background:#eef1f6;
  margin-left:20px;
  margin-right:20px;
  
}
.thrid-bar{
  padding-top:20px;
  background:#eef1f6;
  margin-left:20px;
  margin-right:20px;
  height:500px;
  margin-top:120px;
}
.order-inf{
    padding-top:20px;
	background:#fff;
	margin-top:20px;
}
.custom-inf{
	width:49%;
	background:#fff;
	float:left;
	height:160px;
	padding-top:20px;
	padding-bottom:20px;
    color:#000;	
}
.sever-inf{
    margin-left:2%;
	width:49%;
	background:#fff;
	float:left;
	height:160px;
	padding-top:20px;
	padding-bottom:20px;	
}
.customNamevalue{
	padding-left:48px;	
}
.changeserver{
	width:100%;
	height:110px;
	margin-left:30px;
	margin-top:10px;
}

</style>