<template>
    <div class="addorder-container">
        <div class="thrid-bar">
            <div class="custom-action">订单信息</div>
            <div class="hr-style"></div>
            <div style="width:100%;float:left;">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">订单编号:</span>
                      <span class="lineContent">20170829144443318882</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">订单来源:</span>
                      <span class="lineContent">国安社区</span>
                   </p>
                    <p class="contentLine">
                      <span class="lineTitle">服务机构:</span>
                      <span class="lineContent">中信国安</span>
                   </p>                                     
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">订单状态:</span>
                      <span class="lineContent">待服务</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">下单时间:</span>
                      <span class="lineContent">2017-08-29 14:44</span>
                   </p>                   
                </div> 
            </div>                                     		
		    </div>
        <div class="thrid-bar" style="margin-top:20px;">
            <div class="custom-action">支付信息</div>
            <div class="hr-style"></div>
            <div style="width:100%;float:left;">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">交易单号:</span>
                      <span class="lineContent">20170829144443318882</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">支付方式:</span>
                      <span class="lineContent">货到付款</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">支付总额:</span>
                      <span class="lineContent">388.00元</span>
                   </p>                                      
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">支付状态:</span>
                      <span class="lineContent">待支付</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">支付时间:</span>
                      <span class="lineContent">2017-08-29 14:44</span>
                   </p>                   
                </div> 
            </div>                                     		
		    </div>
        <div class="thrid-bar" style="margin-top:20px;">
            <div class="custom-action">客户信息</div>
            <div class="hr-style"></div>
            <div style="width:100%;float:left;">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">姓名:</span>
                      <span class="lineContent">李阿姨</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">电话:</span>
                      <span class="lineContent">13821208877</span>
                   </p>
                    <p class="contentLine">
                      <span class="lineTitle">备注:</span>
                      <span class="lineContent"></span>
                   </p>                                     
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">地址:</span>
                      <span class="lineContent">北京市朝阳区关东街呼家楼宾馆</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">所属服务站:</span>
                      <span class="lineContent">呼家楼</span>
                   </p>                   
                </div> 
            </div>                                     		
		    </div>
        <div class="thrid-bar" style="margin-top:20px;">
            <div class="custom-action">服务信息</div>
            <div class="hr-style"></div>
            <div style="width:100%;float:left;">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">服务分类:</span>
                      <span class="lineContent">日常保洁</span>
                   </p>                                    
                </div>
                <div class="rightArea" style="width:390px;">
                   <p class="contentLine">
                      <span class="lineTitle">服务时间:</span>
                      <span class="lineContent">2017-08-29 14:44</span>
                      <span style="display:inline-block;margin-left:-70px;"><button type="button" style="height:25px;" @click="changeTime" class="button-cancel">更换时间</button></span>
                   </p>                  
                </div> 
            </div>
            <div style="width:690px;float:left;padding-left:30px;padding-bottom:20px;">
                <el-table
                  :data="tableData"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="servObject"
                    align="center"
                    label="服务项目"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    align="center"
                    label="商品名称"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="serNum"
                    align="center"
                    label="服务数量">
                  </el-table-column>
                </el-table>
            </div>                                     		
		    </div>
        <div class="thrid-bar" style="margin-top:20px;">
            <div class="custom-action">技师信息</div>
            <div class="hr-style"></div>
            <div style="width:690px;float:left;padding-left:30px;padding-bottom:20px;">
                <el-table
                  :data="tableData1"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="headurl"
                    align="center"
                    label="头像"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    align="center"
                    label="姓名"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="sex"
                    align="center"
                    label="性别">
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    align="center"
                    label="手机号">
                  </el-table-column>                  
                  <el-table-column
                    align="center"
                    label="操作">
                      <template scope="scope">
                            <div style="cursor:pointer;color:#4c70e8" @click="gaiPai(scope.row)">改派</div>                    
                      </template>                    
                  </el-table-column>                  
                </el-table>
            </div>                     		
		    </div>
        <div class="thrid-bar" style="margin-top:20px;">
            <div class="custom-action">业务人员信息</div>
            <div class="hr-style"></div>
            <div style="width:100%;float:left;">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">姓名:</span>
                      <span class="lineContent">李阿姨</span>
                   </p>                                    
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">电话:</span>
                      <span class="lineContent">13821208877</span>
                   </p>                    
                </div> 
            </div>                                     		
		    </div>
        <div class="thrid-bar" style="margin-top:20px;margin-bottom:20px;">
            <div class="custom-action">门店信息</div>
            <div class="hr-style"></div>
            <div style="width:100%;float:left;">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">名称:</span>
                      <span class="lineContent">测试门店</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">地址:</span>
                      <span class="lineContent">北京市朝阳区关东街呼家楼宾馆</span>
                   </p>                                     
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">电话:</span>
                      <span class="lineContent">13821208877</span>
                   </p>                  
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
          <el-table-column   width="50"  type="selection" align="center"></el-table-column>
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
        <el-dialog
          title="修改服务时间"
          :visible.sync="dialogVisible"
          size="tiny">
            <el-form :inline="true" :model="formInline">
              <el-form-item label="选择时间" required>
                    <el-date-picker
                      v-model="value1"                      
                      placeholder="选择日期时间"                     
                      :type="select"
                      style="display:inline-block;width:130px;"
                      >
                    </el-date-picker>
                    <el-time-select
                      v-model="value2"
                      style="display:inline-block;width:110px;margin-left:-5px;"
                      :picker-options="{
                        start: '08:30',
                        step: '00:30',
                        end: '12:30'
                      }"
                      placeholder="选择时间">
                    </el-time-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
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
				  callback(new Error('电话号码不正确！请重新填写'));
				} else {
				  callback();
				}
			}
	};  
    return {
          select:'date',
            rules2: {
              phone: [
                { validator: checkPhone, trigger: 'blur' }
              ]
            },
          formInline: {
            user: ''
          },
          value1:'',
          value2:'',
          dialogTableVisible:false,				
          //服务站下拉选项
          stationOptions:[
            { key: "1", stationName: "服务站1" },
            { key: "2", stationName: "服务站2" },
            { key: "3", stationName: "服务站3" },
            { key: "4", stationName: "服务站4" }
          ],
          //服务站
          stationName:'',
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
           tableData:[{
                servObject: 'headurl',
                name: '王小虎',
                serNum: '男',

              }, 
          {
                servObject: 'headurl',
                name: '王小虎',
                serNum: '男',

              }], 
           tableData1:[{
                headurl: 'headurl',
                name: '王小虎',
                sex: '男',
                phone:'13426345678'
              }, 
             {
                headurl: 'headurl',
                name: '王小虎',
                sex: '男',
                phone:'13426345678'
              }],
          dialogVisible:false,                
          technicianName:'',//技师姓名
          pagetotal:10,//技师总页数
          pageSize:2,//每页条数
		
    };
  },
  methods:{ 
    //弹窗搜索按钮点击
    technicianSearch(){
    },
    //每页条数多少改变
    handleSizeChange(val) {

    },
    //分页器改变当前页
    handleCurrentChange(val) {

    },
    //
    gaiPai(obj){
      this.dialogTableVisible=true;
    },
    //
    changeTime(){
      this.dialogVisible=true;
    }
	
  },
  mounted() {


  }
};
</script>
<style   scoped>
.addorder-container{
  width:100%;
  font-size:12px;
	float:left;
	background:#eef1f6;
}
.custom-action{
	margin-left:30px;
  font-size:14px;
  font-weight:600;
}
.thrid-bar{
  padding-top:20px;
  width:100%;
  float:left;
  background:#fff;
  margin-left:20px;
  margin-right:20px;
}
.leftArea{width:320px;float:left;}
.rightArea{width:320px;float:left;margin-left:50px;}
.contentLine{margin: 20px 0 20px 30px;;font-size:12px;}
.lineTitle{display:inline-block;width:80px;}
.lineContent{display:inline-block;margin-left:20px;width:170px;}
</style>