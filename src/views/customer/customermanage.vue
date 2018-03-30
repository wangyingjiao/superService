<template>
    <div class="addorder-container">
		<!--搜索开始-->
		<div class="fist-bar">
		  <el-input  class="search"   placeholder="请输入用户的手机号" v-model="customPhone"></el-input>
			<el-input  class="search"   placeholder="请输入用户的姓名" v-model="customName"></el-input>
		  <button class="search-button btn_search"  @click="localSearch"><i class="el-icon-search"></i>&nbsp搜索</button>
		</div>
		<!--搜索结束-->
		<div class="second-bar">
		  <button type="button" class="add-button selfPosi3 marginTop20"  v-if="btnShow.indexOf('customer_insert') != -1" @click="selectBut('')">新增</button>
			<!--客户数据表格开始-->
			<div class="tableWarp">			      
				    <el-table
					  :data="tableData"
						v-loading="listLoading"
					  style="width:100%;"
						>          
					  <el-table-column
						align="center"
						label="编号"						
						width="80">
						<template scope="scope">
							{{scope.row.index+(pageNumber-1)*pageSize1}}
						</template>
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
						label="性别">
						    <template scope="scope">
						    		<span v-if="scope.row.sex =='male'">男</span>
										<span v-if="scope.row.sex =='female'">女</span>
								</template>						
					  </el-table-column>						
					  <el-table-column
						align="center"
                        width="360"
						label="操作"
						>
						  <template scope="scope">
							  <el-button type="button" class="ceshi3" v-if="btnShow.indexOf('order_insert') != -1" @click="lookInf(scope.row)">下单</el-button>
							  <el-button type="button" class="ceshi3" v-if="btnShow.indexOf('customer_update') != -1" @click="selectBut(scope.row)">编辑</el-button>
							  <el-button type="button" class="ceshi3" v-if="btnShow.indexOf('customer_delete') != -1" @click="Delete(scope.row)">删除</el-button>
							  <el-button type="button" class="ceshi3" v-if="true" @click="ChangeAdress(scope.row,'add')">地址管理</el-button>
						  </template>
					  </el-table-column>					  
					</el-table>
					<!--客户数据表格结束-->
					<!--客户数据表格分页器开始-->
					<div v-if="!listLoading" class="selfStyle">
					  <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page.sync='jumpPage'
						:page-sizes="[5, 10, 15, 20]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="pagetotal1">
					  </el-pagination>
					</div>
					<!--客户数据表格分页器结束-->										
			</div>
		</div>
		<!--新增客户弹窗开始-->
		<el-dialog :title="titlevar" :visible.sync="dialogTableVisible" :show-close="false" :close-on-click-modal="false">	
				<el-form 
				  :model="ruleForm" 
					:rules="rules" 
					ref="ruleForm" 
					label-width="160px" 
					label-position="left" 
					class="demo-ruleForm padding10Prent">
					<el-form-item label="姓名:" prop="name"  >
						<el-input v-model.trim="ruleForm.name"  placeholder="请输入2-15位客户姓名"  style='width: 100%;' ></el-input>
					</el-form-item>
					<el-form-item label="性别:"  prop="sex">
							<el-select  class="filter-item " style='width: 100%;' v-model="ruleForm.sex" placeholder="请选择性别" >
									<el-option v-for="(value,key,index) in sex" :key="index" :label="value" :value="key">
									</el-option>
							</el-select>
					</el-form-item>
					<el-form-item label="手机号:"  prop="phone">
                        <el-input  v-model="ruleForm.phone" style='width: 100%;' placeholder="请输入11位手机号"></el-input>
					</el-form-item>
					<el-form-item label="邮箱:" prop="email" >
						<el-input v-model.trim="ruleForm.email" style='width: 100%;' placeholder="请输入常用邮箱"></el-input>
					</el-form-item>					
				</el-form>
				<div slot="footer" class="dialog-footer" style="text-align:center;">
					  <button class="button-large" v-if="testFlag == undefined" :disabled="submitFlag"  @click="submitForm('ruleForm','add')">确 定</button>
						<button class="button-large" v-if="testFlag != undefined" :disabled="submitFlag"  @click="submitForm('ruleForm','up')">确 定</button>
						<button class="button-cancel"  @click="resetForm('ruleForm')">取 消</button>
				</div>
		</el-dialog>
		<!--新增客户弹窗结束-->
        <!--服务地址管理弹窗结束-->
		<el-dialog title="服务地址管理" class="selfCustomerDialog" :visible.sync="serviceAddressVisible" :show-close="false" :close-on-click-modal="false">							    
				    <div class="selfPromInfStyle1">* 最多可添加6个服务地址 <input type="button"   class="button-cancel height25" style="float:right;" @click="addAddressFun('','add')"  value="新增地址"></div>
            <el-table
					  :data="tableDataAddress"
            highlight-current-row
            empty-text='此用户暂无服务地址'
						v-loading="listLoading"
					  style="width:100%;"
						>          
            <el-table-column align="center" label="设为默认" width="100">
              <template scope="scope">
                <el-radio :label="scope.row.id" v-model="radio" @change.native="getCurrentRow(scope.row.id)">&nbsp;</el-radio>
              </template>
            </el-table-column> 
					  <el-table-column
					    align="center"
						prop="name"    
						label="联系人"
						>
					  </el-table-column>
					  <el-table-column
						align="center"
						prop="phone"         
						label="联系电话">
					  </el-table-column>
						<el-table-column
						align="center"				
						label="服务地址"
                        prop="address"					
						>						            
					  </el-table-column>						
					  <el-table-column
						align="center"
						label="操作"
                        width="180"
						>
						  <template scope="scope">
							  <el-button type="button" class="ceshi3"  @click="addAddressFun(scope.row,'up')">编辑</el-button>
							  <el-button type="button" class="ceshi3"  @click="DeleteAddress(scope.row)">删除</el-button>
						  </template>
					  </el-table-column>					  
					</el-table>				
					<div slot="footer" class="dialog-footer" style="text-align:center;">
							<!-- <button class="button-large"   @click="submitAddress()">确定</button> -->
							<button class="button-cancel"  @click="colseAddress()">关闭</button>
					</div>
		</el-dialog>
        <!--服务地址管理弹窗结束-->
		<!--新增服务地址管理弹窗开始-->
		<el-dialog :title="titlevarAddress" :visible.sync="addAddrssDialogShow" :show-close="false" :close-on-click-modal="false">	
				<el-form 
				  :model="ruleFormAddress" 
					:rules="rulesAddress" 
					ref="ruleFormAddress" 
					label-width="160px" 
					label-position="left" 
					class="demo-ruleForm padding10Prent">
					<el-form-item label="联系人:" prop="name"  >
						<el-input v-model.trim="ruleFormAddress.name"  placeholder="请输入2-15位客户姓名"  style='width: 100%;' ></el-input>
					</el-form-item>
					<el-form-item label="联系电话:"  prop="phone">
                <el-input  v-model="ruleFormAddress.phone" style='width: 100%;' placeholder="请输入11位手机号"></el-input>
					</el-form-item>
					<el-form-item label="所在区域:" prop="areaCodes">
					  <!-- 省市区 -->
					  <el-cascader
						:options="areaOptionsAddress"
						:show-all-levels="true"
						 v-model="ruleFormAddress.areaCodes"
						 style='width: 100%;'
					  ></el-cascader>							
					</el-form-item>
					<el-form-item label="详细地址:" required>
                <el-col :span="12">
                  <el-form-item prop="address">
                    <el-input   style='width: 100%;'  v-model.trim="ruleFormAddress.address" placeholder="请输入街道、小区、办公楼名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="houseNumber">
                    <el-input   style='width: 100%;'  v-model.trim="ruleFormAddress.houseNumber" placeh placeholder="单元楼、门牌号"></el-input>
                  </el-form-item>
                </el-col>							
					</el-form-item>				
				</el-form>						    
				<div slot="footer" class="dialog-footer" style="text-align:center;">
					  <button class="button-large" v-if="AddressStatus == 'add'"   @click="submitFormAddress('ruleFormAddress','add')">保存</button>
						<button class="button-large" v-if="AddressStatus == 'up'"   @click="submitFormAddress('ruleFormAddress','up')">保存</button>
						<button class="button-cancel"  @click="resetFormAddress('ruleFormAddress')">取 消</button>
				</div>
		</el-dialog>
		<!--新增服务地址管理弹窗结束-->        
  </div>
</template>

<script>
import {
  getCusTable, // 获取客户表格信息
  deleteCus, //删除客户
  saveCus, //保存客户（新增）
  getCus, //客户（编辑）
  upCus //保存客户（编辑）
} from "@/api/customer";
import { getMech } from "@/api/basic";

var loading;
export default {
  name: "customermanage",
  data() {
    //手机号验证规则
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入11位手机号码"));
      } else {
        if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value)) {
          callback(new Error("请输入11位手机号码"));
        } else {
          callback();
        }
      }
    };
    //邮箱验证规则
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
          callback(new Error("请输入正确的邮箱"));
        } else {
          if (value.length >= 5 && value.length <= 50) {
            callback();
          } else {
            callback(new Error("请输入5-50位邮箱地址"));
          }
        }
      }
    };
    //客户名验证规则
    var checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入2-15位客户姓名"));
      } else {
        if (value.length >= 2 && value.length <= 15) {
          callback();
        } else {
          callback(new Error("请输入2-15位客户姓名"));
        }
      }
    };
    //详细地址验证
    var checkAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error("长度在1-100个字符"));
      } else {
        if (value.length >= 1 && value.length <= 100) {
          callback();
        } else {
          callback(new Error("长度在1-100个字符"));
        }
      }
    };
    //门牌号验证
    var checkAddressa = (rule, value, callback) => {
      if (!value) {
        callback(new Error("长度在1-50个字符"));
      } else {
        if (value.length >= 1 && value.length <= 50) {
          callback();
        } else {
          callback(new Error("长度在1-50个字符"));
        }
      }
    };    
    return {
      AddressStatus:'add',
      titlevar: "新增用户",
      titlevarAddress: "新增服务地址",
      submitFlag: false,
      jumpPage: 1,
      btnShow: JSON.parse(localStorage.getItem("btn")),
      testvalue: "",
      areaOptions: this.$store.state.user.area,
      areaOptionsAddress: this.$store.state.user.area,
      listLoading: false,
      ruleForm: {
        name: "",
        phone: "",
        address: "",
        email: "",        
        sex: "",
        provinceCode: "",
        cityCode: "",
        areaCode: "",
        areaCodes: [],
        addrLongitude: "",
        addrLatitude: ""
      },
      ruleFormAddress: {
        name: "",
        phone: "",
        address: "",
        houseNumber:'',
        provinceCode: "",
        cityCode: "",
        areaCode: "",
        areaCodes: []
      },
      rules: {
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        email: [{ required: false, validator: checkEmail, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }]
      },
      rulesAddress: {
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        address: [{ required: true, validator: checkAddress, trigger: "blur" }],
        areaCodes: [
          {
            type: "array",
            required: true,
            message: "请选择区域",
            trigger: "change"
          }
        ],
        houseNumber:[{ required: true, validator: checkAddressa, trigger: "blur" }],
      },
      dict: require("../../../static/dict.json"),
      sex: "",
      sexName: "",
      tableData: [],
      tableDataAddress: [
        {
          id: "ab",
          name: "jack",
          phone: "13426345690",
          address: "天津天津市和平区1222222"
        },
        {
          id: "abc",
          name: "king",
          phone: "13426345678",
          address: "蒙古自治区赤峰市阿鲁科尔沁旗ffffffffffffffffffffffffffff"
        }
      ],
      //全局搜索下拉选项
      organizationOptions: [],
      // organizationName:'',//服务机构
      dialogTableVisible: false, //新增弹窗开关
      customName: "", //客户姓名
      customPhone: "", //客户电话
      pagetotal1: 0, //表格总页数
      pageSize1: 10, //表格每页条数
      pageNumber: 1,
      testFlag: undefined,
      radio: "",
      serviceAddressVisible: false,
      addAddrssDialogShow: false
    };
  },
  methods: {
    //单选改变
    getCurrentRow(value) {
      this.radio=value
    },
    //服务地址管理弹窗按钮打开
    ChangeAdress(row,status) {
      this.radio = "";
      this.serviceAddressVisible = true;
    },
    //服务地址管理弹窗关闭
    colseAddress() {
      this.serviceAddressVisible = false;
    },
    //服务地址管理删除
    DeleteAddress(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });          
          // var obj = {
          //   id: row.id
          // };
          // deleteCus(obj)
          //   .then(res => {
          //     if (res.data.code === 1) {
          //       this.$message({
          //         type: "success",
          //         message: "删除成功!"
          //       });
          //     }
          //   })
          //   .catch(() => {
          //   });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });      
    },
    //服务地址管理新增地址/服务地址管理编辑
    addAddressFun(row,status) {
      this.AddressStatus=status;
      this.areaOptionsAddress = this.$store.state.user.area;
      if(status == 'up'){
        this.titlevarAddress="编辑服务地址";
        this.addAddrssDialogShow = true;
      }else{
        this.titlevarAddress="新增服务地址"
        if(this.tableDataAddress.length < 6){
          this.addAddrssDialogShow = true;
        }else{
          this.addAddrssDialogShow = false;
          this.$message({
            type: "warning",
            message: "最多可添加6个服务地址"
          });
        }        
      }
      
      
    },
    //服务地址管理新增地址保存
    submitFormAddress(formName, status) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //status=='add'时是新增地址，status=='up'时是编辑地址          
          this.addAddrssDialogShow = false;
          this.$refs["ruleFormAddress"].resetFields();
        }
      });
    },
    //服务地址管理新增地址取消
    resetFormAddress(formName) {
      this.$refs[formName].resetFields();
      this.addAddrssDialogShow = false;
    },
    loadingClick() {
      loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        target: document.querySelector(".el-dialog__body")
      });
    },
    //新增保存
    submitForm(formName, status) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loadingClick();
          //省、市、区三级ID
          //保存upCus
          if (status == "add") {
            this.ruleForm.id = "";
            var obj = this.ruleForm;
            this.submitFlag = true;
            saveCus(obj)
              .then(res => {
                this.submitFlag = false;
                if (res.data.code === 1) {
                  loading.close();
                  this.$message({
                    type: "success",
                    message: "新增成功!"
                  });
                  this.$refs["ruleForm"].resetFields();
                  this.customName = "";
                  this.customPhone = "";
                  // this.organizationName='';
                  this.dialogTableVisible = false;
                  var obj = {};
                  this.pageNumber = 1;
                  this.jumpPage = 1;
                  this.getData(obj, this.pageNumber, this.pageSize1);
                } else {
                  loading.close();
                }
              })
              .catch(res => {
                loading.close();
                this.submitFlag = false;
              });
          } else {
            this.submitFlag = true;
            var obj1 = this.ruleForm;
            upCus(obj1)
              .then(res => {
                if (res.data.code === 1) {
                  this.submitFlag = false;
                  loading.close();
                  this.$message({
                    type: "success",
                    message: "编辑成功!"
                  });
                  this.$refs["ruleForm"].resetFields();
                  this.dialogTableVisible = false;
                  var obj2 = {
                    name: this.customName,
                    phone: this.customPhone
                  };
                  this.getData(obj2, this.pageNumber, this.pageSize1);
                } else {
                  loading.close();
                  this.submitFlag = false;
                }
              })
              .catch(res => {
                loading.close();
                this.submitFlag = false;
              });
          }
        } else {
          var errArr = this.$refs[formName]._data.fields;
          var errMes = [];
          for (var i = 0; i < errArr.length; i++) {
            if (errArr[i].validateMessage != "") {
              errMes.push(errArr[i].validateMessage);
            }
          }
          this.$message({
            type: "error",
            message: errMes[0]
          });
          return false;
        }
      });
    },
    //新增客户弹窗取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.provinceCode = "";
      this.ruleForm.cityCode = "";
      this.ruleForm.areaCode = "";
      this.ruleForm.sex = "";
      this.dialogTableVisible = false;
    },
    //全局搜索按钮
    localSearch() {
      var obj = {
        name: this.customName,
        phone: this.customPhone
        // orgId:this.organizationName,
      };
      this.pageNumber = 1;
      this.jumpPage = 1;
      this.getData(obj, this.pageNumber, this.pageSize1);
    },
    //表格页数改变
    handleSizeChange1(val) {
      this.pageNumber = 1;
      this.jumpPage = 1;
      this.pageSize1 = val;
      var obj = {
        name: this.customName,
        phone: this.customPhone
        // orgId:this.organizationName,
      };
      this.getData(obj, this.pageNumber, this.pageSize1);
    },
    //表格当前页改变
    handleCurrentChange1(val) {
      this.pageNumber = val;
      var obj = {
        name: this.customName,
        phone: this.customPhone
        // orgId:this.organizationName,
      };
      this.getData(obj, this.pageNumber, this.pageSize1);
    },
    //新增按钮点击
    selectBut(row) {
      this.testFlag = row.id;
      this.dialogTableVisible = true;
      this.areaOptions = this.$store.state.user.area;
      if (row.id == undefined) {
        this.titlevar = "新增用户";
        this.ruleForm.provinceCode = "";
        this.ruleForm.cityCode = "";
        this.ruleForm.areaCode = "";
        this.ruleForm.sex = "";
      } else {
        this.titlevar = "编辑用户";
        var obj = {
          id: row.id
        };
        getCus(obj)
          .then(res => {
            if (res.data.code === 1) {
              this.ruleForm = res.data.data;
              var b = res.data.data.address;
              this.ruleForm.address = b;
              //区域代码回显
              var arr = [];
              arr.push(res.data.data.provinceCode);
              arr.push(res.data.data.cityCode);
              arr.push(res.data.data.areaCode);
              this.ruleForm.areaCodes = arr;
            } else {
            }
          })
          .catch(res => {});
      }
    },
    //表格下单操作按钮
    lookInf(obj) {
      var id = obj.id;
      this.$router.push({
        path: "/clean/addorder",
        query: { coustomerId: id }
      });
    },
    //表格删除操作按钮
    Delete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false
      })
        .then(() => {
          var obj = {
            id: row.id
          };
          deleteCus(obj)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                var obj1 = {
                  name: this.customName,
                  phone: this.customPhone
                  // orgId:this.organizationName,
                };
                this.getData(obj1, this.pageNumber, this.pageSize1);
              }
            })
            .catch(() => {
              this.getData(obj1, this.pageNumber, this.pageSize1);
            });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    //获取表格数据
    getData(pramsObj, pageNo, pageSize) {
      this.listLoading = true;
      var obj = pramsObj;
      getCusTable(obj, pageNo, pageSize)
        .then(res => {
          if (res.data.code === 1) {
            this.pagetotal1 = res.data.data.page.count;
            this.tableData = res.data.data.page.list;
            this.pageNumber = res.data.data.page.pageNo;
            this.jumpPage = res.data.data.page.pageNo;
            this.pageSize1 = res.data.data.page.pageSize;
            if (res.data.data.page.list != undefined) {
              for (var a = 0; a < this.tableData.length; a++) {
                this.tableData[a].index = a + 1;
              }
            }
            this.organizationOptions = res.data.data.orgList;
            this.listLoading = false;
          } else {
            this.listLoading = false;
          }
        })
        .catch(res => {
          this.listLoading = false;
        });
    }
  },
  mounted() {
    this.getData({}, 1, 10);
    this.sex = this.dict.sex;
  }
};
</script>
<style lang="scss" scoped>
.selfAddressGao {
  width: 332px;
  max-height: 290px;
  overflow: hidden;
}
.selfpanel {
  width: 350px;
  max-height: 290px;
  overflow-y: auto;
}
.selfToolTip {
  width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.tableWarp {
  width: 100%;
  background: #fff;
  padding: 20px 20px 70px 20px;
}
.selfStyle {
  margin-top: 20px;
  float: right;
}
.width400 {
  width: 400px;
}

.mapDiv {
  float: left;
  margin-top: 100px;
}
.addorder-container {
  width: 100%;
  float: left;
  background: #eef1f6;
}
.selfPosi {
  width: 200px;
  margin-left: 20px;
}
.selfPosi1 {
  width: 200px;
  margin-left: 30px;
}
.selfPosi2 {
  float: right;
  margin-right: 20px;
}
.selfPosi3 {
  float: right;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.padding10Prent {
  width: 100%;
  padding: 0 10%;
}
.marginTop20 {
  margin-top: 20px;
}
.fist-bar {
  padding: 20px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.second-bar {
  background: #eef1f6;
}
.mapWrap {
  width: 0px;
  height: 0px;
  display: block;
}
.pickerInput {
  width: 50%;
  height: 36px;
  font-size: 12px;
  padding: 0 10px;
  border: none;
  border: 1px solid #bfcbd9;
  outline: none;
}
.pickerInput:hover {
  border-color: #8391a5;
}
.amap-ui-poi-picker-sugg {
  width: 180px;
  overflow: hidden;
}
.amap-ui-poi-picker-sugg-list {
  width: 180px;
}
.sugg-item {
  width: 180px !important;
}
.selfPromInfStyle1 {
  heihgt: 30px;
  line-height: 30px;
  color: #8391a5;
  font-size: 12px;
}
</style>