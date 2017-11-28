<template>
    <div class="addorder-container">
		<div class="fist-bar">
		  <el-input  style="width: 200px;margin-left:20px;"  placeholder="请输入搜索的手机号" v-model="customPhone"></el-input>
			<el-input  style="width: 200px;margin-left:20px;"  placeholder="请输入搜索的姓名" v-model="customName"></el-input>
		  <el-select clearable style="width:200px;margin-left:30px;" class="filter-item" v-model="organizationName" placeholder="请选择">
				<el-option v-for="item in organizationOptions" :key="item.officeId" :label="item.officeName" :value="item.officeId">
				</el-option>
		  </el-select>
      		  
		  <button class="button-large" style="float:right;margin-right:20px;" @click="localSearch">搜&nbsp&nbsp&nbsp&nbsp索</button>
		</div>
		<div class="second-bar" style="height:500px;">
		  <button type="button" class="button-small" @click="selectBut" style="float:right;margin-right:20px;margin-top:10px;margin-bottom:20px;">新&nbsp&nbsp&nbsp&nbsp增</button>
			<div class="tableWarp" style="width:100%;background:#fff;padding:20px 20px 60px 20px;">			      
				    <el-table
					  :data="tableData"
						v-loading="listLoading"
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
						prop="customName"
						label="姓名"
						>
					  </el-table-column>
					  <el-table-column
						align="center"
						prop="customPhone"
						label="手机号">
					  </el-table-column>
					  <el-table-column
						align="center"
						prop="customSex"
						label="性别">
						    <template scope="scope">
						    		<span v-if="scope.row.customSex =='1'">男</span>
										<span v-if="scope.row.customSex =='2'">女</span>
								</template>						
					  </el-table-column>

					  <el-table-column
						align="center"
						prop="officeName"
						label="服务机构">
					  </el-table-column>
					  <el-table-column
						align="center"
						prop="customAddr"
						label="地址">
					  </el-table-column>
					  <el-table-column
						align="center"
						label="操作">
										<template scope="scope">
												<button type="button"  @click="lookInf(scope.row)"><i class="el-icon-document"></i></button>
												<button type="button" @click="Delete(scope.row)"><i class="el-icon-delete"></i></button>
										</template>
					  </el-table-column>					  
					</el-table>
					<div  style="margin-top:20px;float:right;">
					  <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" 
						:page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="pagetotal1">
					  </el-pagination>
					</div>										
			</div>
		</div>
		<!--新增客户弹窗-->
		<el-dialog title="新增客户" :visible.sync="dialogTableVisible" :show-close="false">	
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
					<el-form-item label="姓名:" prop="customName" >
						<el-input v-model="ruleForm.customName" placeholder="请输入客户姓名" style="width:400px;"></el-input>
					</el-form-item>
					<el-form-item label="性别:"  prop="customSex">
							<el-select clearable style="width:400px;" class="filter-item" v-model="ruleForm.customSex" placeholder="请选择性别" >
									<el-option v-for="item in sex" :key="item.key" :label="item.sexName" :value="item.key">
									</el-option>
							</el-select>
					</el-form-item>
					<el-form-item label="手机号:"  prop="customPhone">
                <el-input  v-model="ruleForm.customPhone" style="width:400px;" placeholder="请输入11位手机号"></el-input>
					</el-form-item>
					<el-form-item label="所在区域:" required>
							<el-select clearable style="width:130px;" class="filter-item" v-model="ruleForm.cusProvId" placeholder="请选择省" @change="provinceChange">
									<el-option v-for="item in provinceOptions" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
							</el-select>
							<el-select clearable style="width:130px;" class="filter-item" v-model="ruleForm.cusCityId" placeholder="请选择市" @change="cityChange">
										<el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
							</el-select>
							<el-select clearable style="width:130px;" class="filter-item" v-model="ruleForm.cusTownId" placeholder="请选择县区">
										<el-option v-for="item in countyOptions" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
							</el-select>
					</el-form-item>
					<el-form-item label="详细地址:" prop="customAddr">
						<el-input  v-model="ruleForm.customAddr" style="width:400px;" placeholder="请输入详细地址"></el-input>
					</el-form-item>
					<el-form-item label="邮箱:" prop="customEmail" style="margin-left:10px;">
						<el-input  v-model="ruleForm.customEmail" style="margin-left:-10px;width:400px;" placeholder="请输入常用邮箱"></el-input>
					</el-form-item>					
				</el-form>		    
				<div slot="footer" class="dialog-footer">
						<button class="button-large" @click="submitForm('ruleForm')">确 定</button>
						<button class="button-cancel"  @click="resetForm('ruleForm')">取 消</button>
				</div>
		</el-dialog>
  </div>
</template>

<script>
import { getCusTable,deleteCus,saveCus} from "@/api/customer";
import { getArea} from "@/api/base";
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
		var checkEmail = (rule, value, callback) => {
					if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value))) {
						callback(new Error('请输入正确的邮箱'));
					} else {
						callback();
					}
		}; 		 		
    return {
			  listLoading:true,
        ruleForm: {
					customName:'',
					customPhone:'',
					customAddr:'',
					customEmail:'',
					customSex:'',
					cusProvId:'',
					cusCityId:'',
					cusTownId:'',
				},
        rules: {
          customName: [
            { required: true, message: '请输入客户姓名', trigger: 'blur' },
            { min:2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          customPhone: [
            { required: true,validator: checkPhone, trigger: 'blur' }
										
          ],
          customAddr: [
            { required: true, message: '详细地址不能为空', trigger: 'blur' },
						{ min:6, max: 100, message: '长度在 6 到 100 个字符', trigger: 'blur' }
					],
					customEmail:[
						{ validator: checkEmail, trigger: 'blur' }
					],
					customSex: [
						{ required: true, message: '请选择状态', trigger: 'change' }
					]
        },
		sex:[
		  { key: "1", sexName: "男" },
		  { key: "2", sexName: "女" }
		],
		sexName:'',
   //
		provinceOptions:[],
		//
		cityOptions:[],
		//
		countyOptions:[],								
      tableData: [],	
		//全局搜索下拉选项
		organizationOptions:[],
		organizationName:'',//服务机构				
		dialogTableVisible:false,//新增弹窗开关
		customName:'',//客户姓名
		customPhone:'',//客户电话
		pagetotal1:1,//表格总页数
		pageSize1:10,//表格每页条数
		pageNumber:1,		
    };
  },
  methods:{
    
		//
		provinceChange(value){
			this.ruleForm.cusCityId='';
      getArea(value).then(res => {
			   this.cityOptions=res.data.data;
      }).catch(res=>{
        
      });
       
		},
		//
		cityChange(value){
			this.ruleForm.cusTownId='';
      getArea(value).then(res => {
			   this.countyOptions=res.data.data;
      }).catch(res=>{
        
      });			

		},
		//customSex
		customSexselect(){
      this.ruleForm.customSex=this.sex;
		},
		submitForm(formName) {
					this.$refs[formName].validate((valid) => {
						if (valid) {						
													
							var obj = this.ruleForm
							saveCus(obj).then(res => {
								if(res.data.code === 1){
										this.$message({
											type: 'success',
											message: '新增成功!'
										});
										this.$refs['ruleForm'].resetFields();
										this.dialogTableVisible = false
										this.getData();
								}else{
									this.$message({
											type: 'warning',
											message: '新增失败'
										});
								}													
							}).catch(res=>{
								
							});							
						} else {            
							return false;
						}
					});				


				
			},
			//弹窗cancel
      resetForm(formName) {
				this.$refs[formName].resetFields();
				this.ruleForm.customSex='';
				this.sexName='';
				this.dialogTableVisible = false;
      },		 
	//全局搜索按钮
	localSearch(){
		var obj={
				customName:this.customName,
				customPhone:this.customPhone,
		}
		 this.getData(obj,this.pageNumber,this.pageSize1);
	},
	//表格页数改变
    handleSizeChange1(val) {
				this.pageSize1=val;
				 var obj={
					
				 }
				this.getData(obj,this.pageNumber,this.pageSize1);
    },
	 //表格当前页改变
    handleCurrentChange1(val) {
			  this.pageNumber=val;
			   var obj={
					
				 }
         this.getData(obj,this.pageNumber,this.pageSize1);
    },	
	 //新增
		selectBut(){
				this.dialogTableVisible=true;	
				//
				var id=''
		  	getArea(id).then(res => {
					this.provinceOptions=res.data.data;
				}).catch(res=>{
					
				});				
		},
		//表格查看操作按钮
		lookInf(obj){
			  var id=obj.id;
        this.$router.push({path:'/clean/addorder',query: { coustomerId:id}})
		},
		//表格删除操作按钮
		Delete(row){
			this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						var obj = {
							id:row.id
						}
						deleteCus(obj).then(res=>{
							if(res.data.code === 1){
									this.$message({
										type: 'success',
										message: '删除成功!'
									});
									var obj1={};
									this.getData(obj1,this.pageNumber,this.pageSize1);
							}else{
								this.$message({
										type: 'warning',
										message: '删除失败'
									});
							}
						}).catch(()=>console.log("未知错误"))
						
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});          
					});			

		},
		getData(pramsObj,pageNo,pageSize){
			this.listLoading = true;
			var obj = pramsObj;
      getCusTable(obj,pageNo,pageSize).then(res => {
				this.tableData = res.data.data.list
				this.organizationOptions=res.data.data.list;
        this.listLoading = false
				this.pagetotal1 = res.data.data.count;
      }).catch(res=>{
        this.listLoading = false
			});

		}
  },
  mounted() {
		 this.getData();
		 this.customSexselect();
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