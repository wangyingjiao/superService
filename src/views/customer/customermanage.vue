<template>
    <div class="addorder-container">
		<div class="fist-bar">
		  <el-input  style="width: 200px;margin-left:20px;"  placeholder="请输入搜索的手机号" v-model="customerPhone"></el-input>
			<el-input  style="width: 200px;margin-left:20px;"  placeholder="请输入搜索的姓名" v-model="customerName"></el-input>
		  <el-select clearable style="width:200px;margin-left:30px;" class="filter-item" v-model="organizationName" placeholder="请选择">
				<el-option v-for="item in organizationOptions" :key="item.key" :label="item.organizationName" :value="item.key">
				</el-option>
		  </el-select>
      		  
		  <button class="button-large" style="float:right;margin-right:20px;" @click="localSearch">搜索</button>
		</div>
		<div class="second-bar" style="height:500px;">
		  <button type="button" class="button-small" @click="selectBut" style="float:right;margin-right:20px;margin-top:10px;margin-bottom:20px;">新增</button>
			<div class="tableWarp" style="width:100%;background:#fff;padding:20px 20px;">			      
				    <el-table
					  :data="tableData"
					  border
					  style="width:100%;">
					  <el-table-column
						align="center"
						label="编号"
						type="index"
						width="80">
					  </el-table-column>
					  <el-table-column
					    align="center"
						prop="name"
						label="姓名"
						>
					  </el-table-column>
					  <el-table-column
						align="center"
						prop="phone"
						label="手机号">
					  </el-table-column>
					  <el-table-column
						align="center"
						prop="sex"
						label="性别">
					  </el-table-column>
					  <el-table-column
						align="center"
						prop="organization"
						label="服务机构">
					  </el-table-column>
					  <el-table-column
						align="center"
						prop="address"
						label="地址">
					  </el-table-column>
					  <el-table-column
						align="center"
						label="操作">
										<template scope="scope">
												<button type="button" @click="lookInf(scope.row)">查看</button>
												<button type="button" @click="Delete(scope.row)">删除</button>
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
		<!--新增客户弹窗-->
		<el-dialog title="新增客户" :visible.sync="dialogTableVisible">	
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
					<el-form-item label="姓名:" prop="name" >
						<el-input v-model="ruleForm.name" placeholder="请输入客户姓名" style="width:400px;"></el-input>
					</el-form-item>
					<el-form-item label="性别:" required>
							<el-select clearable style="width:400px;" class="filter-item" v-model="sexName" placeholder="请选择性别">
									<el-option v-for="item in sex" :key="item.key" :label="item.sexName" :value="item.key">
									</el-option>
							</el-select>
					</el-form-item>
					<el-form-item label="手机号:"  prop="phone">
                <el-input  v-model="ruleForm.phone" style="width:400px;" placeholder="请输入11位手机号"></el-input>
					</el-form-item>
					<el-form-item label="所在区域:" required>
							<el-select clearable style="width:130px;" class="filter-item" v-model="province" placeholder="请选择省">
									<el-option v-for="item in provinceOptions" :key="item.key" :label="item.provinceName" :value="item.key">
									</el-option>
							</el-select>
							<el-select clearable style="width:130px;" class="filter-item" v-model="city" placeholder="请选择市">
										<el-option v-for="item in cityOptions" :key="item.key" :label="item.cityName" :value="item.key">
										</el-option>
							</el-select>
							<el-select clearable style="width:130px;" class="filter-item" v-model="county" placeholder="请选择县区">
										<el-option v-for="item in countyOptions" :key="item.key" :label="item.countyName" :value="item.key">
										</el-option>
							</el-select>
					</el-form-item>
					<el-form-item label="详细地址:" prop="desc">
						<el-input  v-model="ruleForm.desc" style="width:400px;" placeholder="请输入详细地址"></el-input>
					</el-form-item>
					<el-form-item label="邮箱:" prop="email" style="margin-left:10px;">
						<el-input  v-model="ruleForm.email" style="margin-left:-10px;width:400px;" placeholder="请输入常用邮箱"></el-input>
					</el-form-item>					
				</el-form>		    
				<div slot="footer" class="dialog-footer">
						<button class="button-large" @click="submitForm('ruleForm')">确 定</button>
						<button class="button-cancel" @click="cancel">取 消</button>
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
					if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))) {
						callback(new Error('手机号码必须为11位数字！'));
					} else {
						callback();
					}
				}
		}; 		
    return {
        ruleForm: {
          name: '',
          phone:'',
          email: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入客户姓名', trigger: 'blur' },
            { min:2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true,validator: checkPhone, trigger: 'blur' }
										
          ],
          desc: [
            { required: true, message: '详细地址不能为空', trigger: 'blur' },
						{ min:6, max: 100, message: '长度在 6 到 100 个字符', trigger: 'blur' }
          ]
        },
		sex:[
		  { key: "0", sexName: "请选择" },
		  { key: "1", sexName: "男" },
		  { key: "2", sexName: "女" }
		],
		sexName:'',
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
      tableData: [{
            phone: '13800138000',
            name: '王小虎',
            address:'北京市朝阳区常营中路保利嘉园',
						organization:'国安社区',
						sex:'男',
          }, {
            phone: '13800138001',
            name: '王小红',
            address:'北京市朝阳区常营中路保利嘉园',
						organization:'国安社区',
						sex:'女',
          }],	
		//全局搜索下拉选项
		organizationOptions:[
		  { key: "1", organizationName: "请选择" },
		  { key: "2", organizationName: "服务机构1" },
		  { key: "3", organizationName: "服务机构2" },
		  { key: "4", organizationName: "服务机构3" }
		],
		organizationName:'',//服务机构				
		dialogTableVisible:false,//新增弹窗开关
		customerName:'',//客户姓名
		customerPhone:'',//客户电话
		pagetotal1:100,//表格总页数
		pageSize1:10,//表格每页条数		
    };
  },
  methods:{
		submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            this.$refs['ruleForm'].resetFields();
            return false;
          }
        });
				this.dialogTableVisible = false
      },
			cancel(){
				this.$refs['ruleForm'].resetFields();
				this.dialogTableVisible = false
			},		 
	//全局搜索按钮
	localSearch(){
	},
	//表格页数改变
    handleSizeChange1(val) {

    },
	 //表格当前页改变
    handleCurrentChange1(val) {

    },	
	 //
		selectBut(){
			  
				this.dialogTableVisible=true;	
				this.ruleForm={};	
		},
		//表格查看操作按钮
		lookInf(obj){
        this.$router.push({path:'/clean/addorder',query: { coustomerId: 123}})
		},
		//表格删除操作按钮
		Delete(obj){

		}
  },
  mounted() {


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