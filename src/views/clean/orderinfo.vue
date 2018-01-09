<template>
    <div class="addorder-container">
       <!--订单信息开始-->
        <div class="thrid-bar">
            <div class="custom-action orderOneBar">订单信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">订单编号:</span>
                      <span class="lineContent">{{otherInfo.orderNumber}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">服务状态:</span>
                      <span class="lineContent">
                          <span v-if="otherInfo.serviceStatus =='wait_service'">待服务</span>
                          <span v-if="otherInfo.serviceStatus =='started'">已上门</span>
                          <span v-if="otherInfo.serviceStatus =='finish'">已完成</span>
                          <span v-if="otherInfo.serviceStatus =='cancel'">已取消</span>
                      </span>
                   </p>                   
                   <p class="contentLine">
                      <span class="lineTitle">订单来源:</span>
                      <span class="lineContent">
                        <span v-if="otherInfo.orderSource =='own'">本机构</span>
                        <span v-if="otherInfo.orderSource =='gasq'">国安社区</span>
                      </span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">服务机构:</span>
                      <span class="lineContent">{{otherInfo.orgName}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">订单类型:</span>
                      <span class="lineContent">
                          <span v-if="otherInfo.orderType =='common'">普通订单</span>
                          <span v-if="otherInfo.orderType =='group_split_yes'">组合并拆单</span>
                          <span v-if="otherInfo.orderType =='group_split_no'">组合不拆单</span>                        
                      </span>
                   </p>                                                         
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">订单状态:</span>
                      <span class="lineContent">
                          <span v-if="otherInfo.orderStatus =='cancel'">已取消</span>
                          <span v-if="otherInfo.orderStatus =='dispatched'">已派单</span>
                          <span v-if="otherInfo.orderStatus =='finish'">已完成</span>
                          <span v-if="otherInfo.orderStatus =='started'">已上门</span>
                          <span v-if="otherInfo.orderStatus =='stop'">已暂停</span>
                          <span v-if="otherInfo.orderStatus =='success'">已成功</span>
                          <span v-if="otherInfo.orderStatus =='waitdispatch'">待派单</span>
                      </span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">下单时间:</span>
                      <span class="lineContent">{{otherInfo.orderTime}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">服务站:</span>
                      <span class="lineContent">{{otherInfo.stationName}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">订单分类:</span>
                      <span class="lineContent">
                          <span v-if="otherInfo.majorSort =='clean'">保洁</span>
                          <span v-if="otherInfo.majorSort =='repair'">家修</span>                         
                      </span>
                   </p>                                                           
                </div> 
            </div>                                     		
		    </div>
        <!--订单信息结束-->
        <!--支付信息开始-->
        <div class="thrid-bar marginTop20">
            <div class="custom-action">支付信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">交易单号:</span>
                      <span class="lineContent">{{payInfo.payNumber}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">支付方式:</span>
                      <span class="lineContent">
                        <span v-if="payInfo.payMethod =='offline'">货到付款</span>
                        <span v-if="payInfo.payMethod =='online'">在线</span>                        
                      </span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">支付总额:</span>
                      <span class="lineContent">{{payInfo.payAccount}}元</span>
                   </p>                                      
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">支付状态:</span>
                      <span class="lineContent">
                        <span v-if="payInfo.payStatus =='payed'">已支付</span>
                        <span v-if="payInfo.payStatus =='waitpay'">待支付</span>                        
                      </span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">支付平台:</span>
                      <span class="lineContent">
                          <span v-if="payInfo.payPlatform =='wx'">微信</span>
                          <span v-if="payInfo.payPlatform =='alipay'">支付宝</span>
                          <span v-if="payInfo.payPlatform =='balance'">余额</span>
                          <span v-if="payInfo.payPlatform =='pos'">银行卡</span>
                          <span v-if="payInfo.payPlatform =='wx_pub_qr'">微信扫码</span>
                          <span v-if="payInfo.payPlatform =='cash'">现金</span>
                          <span v-if="payInfo.payPlatform =='alipay_qr'">支付宝扫码</span>
                      </span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">支付时间:</span>
                      <span class="lineContent">{{payInfo.payTime}}</span>
                   </p>                                       
                </div> 
            </div>                                     		
		    </div>
        <!--支付信息结束-->
        <!--服务信息开始-->
        <div class="thrid-bar marginTop20">
            <div class="custom-action">服务信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">服务项目:</span>
                      <span class="lineContent">{{goodsInfo.itemName}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">建议服务时长:</span>
                      <span class="lineContent">{{otherInfo.serviceHour}}小时</span>
                   </p>                                                        
                </div>
                <div class="rightArea width390">
                   <p class="contentLine">
                      <span class="lineTitle">服务时间:</span>
                      <span class="lineContent">{{otherInfo.serviceTime}}</span>
                      <span class="selfMarLeft70" @click="changeTime"><input type="button"   class="button-cancel height25"  value="更换时间"></span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">完成时间:</span>
                      <span class="lineContent">{{otherInfo.finishTime}}</span>
                   </p>                                     
                </div> 
            </div>
            <div class="selfTableWrapStyle">
                <el-table
                  :data="tableData"
                  border
                  class="self-table-style">
                  <el-table-column
                    align="center"
                    label="商品名称"
                    prop="goodsName"
                    > 
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="服务数量"
                    prop="goodsNum">                    
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="金额"
                    prop="payPrice">                   
                  </el-table-column>
                </el-table>
            </div>                                     		
		    </div>
        <!--服务信息结束-->
        <!--技师信息开始-->
        <div class="thrid-bar marginTop20">
            <div class="custom-action">技师信息</div>
            <div class="hr-style"></div>
            <div class="techTabWrap">
                <div class="addTechWrap" @click="gaiPai('add','')">
                  <span class="plusComb">&#10010</span>
                  <span class="plusComtent">增加技师</span>
                </div>
                <el-table
                  :data="tableData1"
                  border
                  style="width: 100%">
                  <el-table-column
                    align="center"
                    label="头像"
                    >
                    <template scope="scope">
                    <img class="picHeader" :src="'https://openservice.oss-cn-beijing.aliyuncs.com/'+scope.row.headPic+'?x-oss-process=image/resize,m_fill,h_60,w_60'"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="techName"
                    align="center"
                    label="姓名"
                    >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="性别">
                      <template scope="scope">
                          <span v-if="scope.row.techSex =='male'">男</span>
                        <span v-if="scope.row.techSex =='female'">女</span>
                      </template>	                    
                  </el-table-column>
                  <el-table-column
                    prop="techPhone"
                    align="center"
                    label="手机号">
                  </el-table-column>                  
                  <el-table-column
                    align="center"
                    label="操作">
                      <template scope="scope">
                            <div style="cursor:pointer;color:#4c70e8" @click="gaiPai('edit',scope.row)">改派</div>                    
                      </template>                    
                  </el-table-column>                  
                </el-table>
            </div>                     		
		    </div>
        <!--技师信息结束-->
        <!--客户备注开始-->
        <div class="thrid-bar marginTop20">
            <div class="custom-action">客户备注</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea" style="width:100%;">
                   <p class="contentLine">
                      <span class="lineTitle FloatLeft">备注:</span>
                      <span class="lineContent1 selfbeizhu">{{otherInfo.customerRemark}}</span>
                   </p> 
                   <p class="contentLine">
                      <span class="lineTitle"></span>
                      <span class="lineContent width1000">
                        <div class="picWrap selfMarTL">
                            <div class="picStyle" v-for="item in otherInfo.customerRemarkPics" :key="item">
                              <img :src="imgSrc+item+picWidth120"/>
                            </div>
                        </div>
                      </span>
                   </p>                                                                         
                </div>
                 
            </div>                                     		
		    </div>
        <!--客户备注结束-->
        <!--订单备注开始-->
        <div class="thrid-bar marginTop20">
            <div class="custom-action">订单备注</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea" style="width:100%;">
                   <p class="contentLine">
                      <span class="lineTitle FloatLeft">备注:</span>
                      <span class="lineContent1 selfbeizhu">{{otherInfo.orderRemark}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle"></span>
                      <span class="lineContent width1000">
                        <div class="picWrap selfMarTL">
                            <div class="picStyle" v-for="item in otherInfo.orderRemarkPics" :key="item">
                              <img :src="imgSrc+item+picWidth120"/>
                            </div>
                        </div>
                      </span>
                   </p>                                                        
                </div> 
            </div>                                     		
		    </div>
        <!--订单备注结束-->               
        <!--业务人员信息开始-->
        <div class="thrid-bar marginTop20">
            <div class="custom-action">业务人员信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">姓名:</span>
                      <span class="lineContent">{{otherInfo.businessName}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">备注:</span>
                      <span class="lineContent1 selfbeizhu1">{{otherInfo.businessRemark}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle"></span>
                      <span class="lineContent width1000">
                        <div class="picWrap marginLeft82">
                            <div class="picStyle" v-for="item in otherInfo.businessRemarkPics" :key="item">
                              <img :src="imgSrc+item+picWidth120"/>
                            </div>
                        </div>
                      </span>
                   </p>                                                        
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">电话:</span>
                      <span class="lineContent">{{otherInfo.businessPhone}}</span>
                   </p>                    
                </div> 
            </div>                                     		
		    </div>
        <!--业务人员信息结束-->
        <!--门店信息开始-->
        <div class="thrid-bar marginTop20 marginBOT20">
            <div class="custom-action">门店信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">名称:</span>
                      <span class="lineContent">{{otherInfo.shopName}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">地址:</span>
                      <span class="lineContent">{{otherInfo.shopAddr}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">备注:</span>
                      <span class="lineContent1 selfbeizhu1">{{otherInfo.shopRemark}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle"></span>
                      <span class="lineContent width1000">
                        <div class="picWrap marginLeft82">
                            <div class="picStyle" v-for="item in otherInfo.shopRemarkPics" :key="item">
                              <img :src="imgSrc+item+picWidth120"/>
                            </div>
                        </div>
                      </span>
                   </p>                                                        
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">电话:</span>
                      <span class="lineContent">{{otherInfo.shopPhone}}</span>
                   </p>                  
                </div> 
            </div>                                     		
		    </div>
        <!--门店信息结束-->                                                
        <!--技师选择弹窗开始-->
        <el-dialog title="选择技师" :visible.sync="dialogTableVisible">
          <div class="selectTechHL">
          <el-input placeholder="输入要搜索的姓名" v-model="techName" class="width120"></el-input>                
          </div>
          <div  class="selectTechHR">
          <el-select clearable placeholder="请选择服务站" v-model="techStationId">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <span v-show="promShow1" class="selfPromINF">{{promInf1}}</span>
          </div>
          <div class="FloatRight"><button class="button-large" @click="searchTeh">查询</button></div> 	
          <div class="selfTableWrapONE">
            <div class="table-d">
              <table width="100%" class="selfTable">
              <tr>
                <td  class="selfTableHEADTD" align="center" width="8%">选择</td>
                <td  class="selfTableHEADTD" align="center" width="20%">头像</td>
                <td  class="selfTableHEADTD" align="center" width="18%">姓名</td>
                <td  class="selfTableHEADTD" align="center" width="10%">性别</td>
                <td  class="selfTableHEADTD" align="center" width="34%">服务站</td>
                <td  class="selfTableHEADTD" align="center" width="10%">岗位性质</td>							
              </tr>
              <tr v-for="item in listTech" :key="item.techId"  ref="tableItem1">
                <td class="fontSize12"  align="center"><el-checkbox  v-model="item.techChecked"></el-checkbox></td>
                <td  class="height110" align="center"><img class="imgStyle" :src="item.headPic+'?x-oss-process=image/resize,m_fill,h_100,w_100'"/></td>
                <td class="fontSize12" align="center">{{item.techName}}</td>
                <td  class="fontSize12" align="center">
                <span class="fontSize12" v-if="item.techSex =='male'">男</span>
                <span class="fontSize12" v-if="item.techSex =='female'">女</span>									
                </td>
                <td  align="center" class="fontSize12">{{item.techStationName}}</td>
                <td class="fontSize12"  align="center">全职</td>							
              </tr>
              </table>
            </div>            
          </div> 	  	  
          <div slot="footer" class="dialog-footer" style="text-align:center">
            <button class="button-large" @click="submitForm2()">保存</button>
            <button class="button-cancel" @click="dialogTableVisible = false">取 消</button>
          </div>
        </el-dialog>
        <!--技师选择弹窗结束-->        
        <!--修改服务时间弹窗开始-->
        <el-dialog
          title="修改服务时间"
          :visible.sync="dialogVisible">
            <el-form  :model="formInline" :rules="formInline1rules" ref="formInline" label-width="80px">
              <el-form-item label="选择时间" prop='Date'>
                    <el-date-picker
                      v-model="formInline.Date"                      
                      placeholder="年-月-日"                     
                      :type="select"
                      :picker-options="pickerOptions0"
                      class="selfDateStyle"
                      @change='dateChange'
                      >
                    </el-date-picker>
              </el-form-item>
              <el-form-item label="选择时间" prop='Time'>
                    <el-input type="hidden" value='' v-model='formInline.Time'></el-input>                  
                    <div class="marginTopDec46">                                            
                      <div class="selfSeverTimeSt" ref="TimeWrap"  v-for="(item,index) in timeObj" :key="index" @click="timeChange(index,item)">{{item.value}}</div>
                    </div>                    
              </el-form-item>              

            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large"   @click="submitTime('formInline')">保存</button>
              <button class="button-cancel"  @click="cancelTime('formInline')">取 消</button>
            </div>
        </el-dialog>
        <!--修改服务时间弹窗结束-->        
  </div>
</template>

<script>
import {getOrderInf,ChangeTimeData,addTechData,dispatchTechData} from "@/api/order";
  import {
    orderServer
  } from '@/api/skill'
export default {
  name: "",
  data() { 
    return {
          pickerOptions0: {
                disabledDate(time) {
              if(time.getTime() >Date.now()-8.64e7  && time.getTime() <Date.now() +8.64e7*14){
                        return false;
              }else{
                return true;
              }
                
                }
          },
          formInline1rules: {
            Date: [
            { required: true,type: 'date',message:'请选择服务日期', trigger: 'change' },
            ],
            Time: [
              { required: true,message:'请选择服务时间', trigger: 'change' },
            ]          
          },      
          timeObj:[{id:1,value:'8:00'},{id:2,value:'8:30'},{id:3,value:'9:00'}],//时间对象
          addressInfo:[],//服务地址信息
          otherInfo:[],
          payInfo:[],//支付信息
          refundInfo:[],//退款信息
          goodsInfo:[],//服务信息
          options:[],
          techName:'',
          techStationId:'',
          promShow1:false, 
          promInf1:'搜索内容不存在!',
          listTech:[],          
          selectCommidty:[],      
          select:'date',
          formInline:{
            Date:'',
            Time:''
          },
          value1:'',
          value2:'',
          tabOptions:[],
          dialogTableVisible:false,				
           tableData:[], 
           tableData1:[],
          dialogVisible:false,                		
    };
  },
  methods:{
    //用订单ID获取页面相关信息
    getOrderAllInf(orderId){
      var obj={
        id:orderId
      }
      getOrderInf(obj).then(res => {      
          if (res.data.code === 1) {                         
            var AllInfo=res.data.data;
            this.otherInfo=AllInfo;//所有其他信息变量
            this.goodsInfo=AllInfo.goodsInfo//服务信息
            this.tableData=AllInfo.goodsInfo.goods//服务商品信息表格
            this.payInfo=AllInfo.payInfo//支付信息
            this.tableData1=AllInfo.techList//技师信息表格
          }else{
          }          
        }).catch(res=>{
          
        });
    },
    //更换时间的保存
    submitTime(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) { 
            console.log(this.timeObj)
            for(var a=0;a<this.timeObj.length;a++){
              if(this.timeObj[a].selected==true){
                console.log(this.timeObj[a]);
              }
            }
            //保存成功后也要复位样式
            this.dialogVisible = false            
          }
      })

    },
    //更换时间取消
    cancelTime(formName){
      this.$refs[formName].resetFields();
      //样式复位
      for(var a=0;a<this.timeObj.length;a++){
          this.$set(this.timeObj[a],'selected',false)
          this.$refs.TimeWrap[a].style.borderColor = "#fff";
          this.$refs.TimeWrap[a].style.color = "#000";
          this.$refs.TimeWrap[a].style.border = "1px solid #bfcbd9";
          this.$refs.TimeWrap[a].className ='selfSeverTimeSt';
      }      
      this.dialogVisible = false
    },
    //日期变化时改变时间对象
    dateChange(value){      
      if(value != undefined){
        var obj={
          id:this.$route.query.id,
          serviceTime:value+' 00:00:00'
        } 
        ChangeTimeData(obj).then(res => {      
          if (res.data.code === 1) {                         
              console.log(res)
          }else{
          }          
        }).catch(res=>{
          
        });        
      }
    },
    //时间选项点击
    timeChange(index,obj){
      for(var a=0;a<this.timeObj.length;a++){
          this.$set(this.timeObj[a],'selected',false)
          if(a==index){
              this.$refs.TimeWrap[a].style.borderColor = "green";
              this.$refs.TimeWrap[a].style.color = "green";
              this.$refs.TimeWrap[a].className ='selfSeverTimeSt mark';
              this.timeObj[a].selected = !this.timeObj[a].selected;
              this.formInline.Time=this.timeObj[a].value       
          }else{
              this.$refs.TimeWrap[a].style.borderColor = "#fff";
              this.$refs.TimeWrap[a].style.color = "#000";
              this.$refs.TimeWrap[a].style.border = "1px solid #bfcbd9";
              this.$refs.TimeWrap[a].className ='selfSeverTimeSt';
                                        
          }
      }
    },
    //技师数据回显二级选中
    // selectionreturn1(){
    //   if(this.tabOptions.length != 'undefined'){
    //     for(let a=0;a<this.listTech.length;a++){
    //       for(let b=0;b<this.tabOptions.length;b++){
    //         if(this.tabOptions[b].techId == this.listTech[a].techId){
    //         this.listTech[a].techChecked=true;
    //         }
    //       }
    //     }
    //   }                                        
    // },       
    //选择技师弹出层查询按钮
    searchTeh(){        
          this.$nextTick( () => {
            //前端定位
            var falg1=0;              
            var len = this.listTech.length;
            for(var i=0;i<len;i++){
              if(this.listTech[i].techName == this.techName || this.listTech[i].techStationId== this.techStationId ){
                  falg1=1;
                  this.$refs.tableItem1[i].scrollIntoView()
                  this.$refs.tableItem1[i].style.background='#eee'                    
              }else{
                this.$refs.tableItem1[i].style.background='#fff' 
              }                   
            } 							
            if(falg1 ==0){
              var that=this
              this.promShow1=true;
              setTimeout(function(){
              that.promShow1=false;                  
              },2000);
            }else{ 
              this.promShow1=false;
            }
          })             
    },
    //选择技师弹出层保存
    submitForm2() {
      var arr=[];
      if(this.listTech.length){
        for(let a=0;a<this.listTech.length;a++){
          if(this.listTech[a].techChecked == true){
            arr.push(this.listTech[a]);
          }
        }
      }
      this.tabOptions=arr
      //保存技师接口调用
      console.log(this.tabOptions);
      this.dialogTableVisible = false	
    },         
    //改派或新增技师
    gaiPai(status,obj){
        console.log(status);
        this.dialogTableVisible=true;
        if(status == 'add'){
              var obj={
                id:this.$route.query.id
              };            
              addTechData(obj).then(res => {      
                if (res.data.code === 1) {                         
                  this.options=res.data.data.stations 
                  this.listTech=res.data.data.techs 
                  this.dialogTableVisible=true;
                  //this.selectionreturn1();                                                          
                }else{
                }          
              }).catch(res=>{
                
              });
        }else{
              var obj1={
                id:this.$route.query.id
              };            
              dispatchTechData(obj1).then(res => {      
                if (res.data.code === 1) {                         
                  this.options=res.data.data.stations 
                  this.listTech=res.data.data.techs 
                  this.dialogTableVisible=true;
                  //this.selectionreturn1();                                                          
                }else{
                }          
              }).catch(res=>{
                
              });          
        }
    
    },
    //改变服务时间按钮
    changeTime(){
      this.dialogVisible=true; 
      this.$nextTick( () => {
          //样式复位
          for(var a=0;a<this.timeObj.length;a++){
            this.$set(this.timeObj[a],'selected',false)
              this.$refs.TimeWrap[a].style.borderColor = "#fff";
              this.$refs.TimeWrap[a].style.color = "#000";
              this.$refs.TimeWrap[a].style.border = "1px solid #bfcbd9";
              this.$refs.TimeWrap[a].className ='selfSeverTimeSt';
          }        
      })

            
    }	
  },
  mounted() {
    this.getOrderAllInf(this.$route.query.id)
  }
};
</script>
<style   scoped>
.mark {
  background: url(../../../static/icon/Selected.png) right bottom no-repeat;
  background-size: 20px 20px;
}
.picHeader{margin-top:10px;}
.selfDateStyle{width:200px;margin-left:20px;}
.marginTopDec46{margin-top:-46px;}
.selfSeverTimeSt{
    width: 80px;
    height: 34px;
    line-height: 34px;
    border: 1px solid #bfcbd9;
    display: inline-block;
    text-align: center;
    position: relative;
    margin-left: 20px;
    margin-top:10px;
    font-size: 14px;
    cursor: pointer;
}
.selfMarTL{margin-top:0px;margin-left:82px;}
.selfbeizhu{min-width:900px;margin-left:22px;float:left;}
.selfbeizhu1{min-width:900px;margin-left: 102px;margin-top: -15px;float:left;}
.selectTechHL{float:left;width:120px}
.selectTechHR{float:left;margin-left:10px;}
.width120{width:120px;}
.selfPromINF{font-size: 12px; margin-top: 10px; color: red;}
.FloatRight{float:right;}
.FloatLeft{float:left;}
.selfTableWrapONE{float:left;margin-top:20px;width:100%;margin-bottom:20px;height:300px;overflow-y:scroll;}
.selfTableHEADTD{background: #F8F8F9;height:30px;}
.height110{height:110px;}
.imgStyle{display:block;}
.fontSize12{font-size:12px;}
.techTabWrap{width:690px;float:left;padding-left:30px;padding-bottom:20px;}
.userHeaderStyle{width:85px;height:90px;line-height:90px;border:1px solid #ccc;}
.selfTable,.selfTable tr th, .selfTable tr td { border:1px solid #eee; }
.selfTable { min-height: 25px; line-height: 25px; text-align: center; border-collapse: collapse; padding:2px;}
.editServiceTabHeader{background: #F8F8F9;height:30px;}
.editServiceTabSel{width:120px;margin-top:3px;margin-bottom:3px;}
.editServiceTabInputNum{width:120px;margin-top:3px;margin-bottom:3px;} 
.height30{height:30px;}
.width1000{min-width:900px;}
.picWrap{width:100%;height:120px;line-height:120px;}
.marginLeft82{margin-left:82px;margin-top:-30px;}
.marginBOT20{margin-bottom:20px;}
.picStyle{float:left;width:120px;height:120px;margin-right:20px;margin-top:20px;}
.addorder-container{
  width:100%;
  font-size:12px;
	float:left;
	background:#eef1f6;
}
.order-selfTd{
text-align:center;width: 128%;margin-left: -13.8%;height:49px;line-height:49px;border-bottom:1px solid #dfe6ec
}
.order-selfTd:last-child{
   border:none;
}
.orderOneBar{
   width:95%;height:34px;line-height:34px;
}
.selfMarLeft70{
    display: inline-block;
    margin-top: -4px;
    position: absolute;
    cursor: pointer;
}
.selfTableWrapStyle{
  width:690px;float:left;padding-left:30px;padding-bottom:20px;
}
.servicerFont{cursor:pointer;color:#4c70e8}
.self-table-style{width:100%;margin-top:-10px;}
.selfWrap1{
  width:100%;float:left;
}
.marginTop20{
  margin-top:20px;
}
.addTechWrap{width:110px;height:32px;line-height:32px;margin-top: 10px;background:#ccc;cursor:pointer;}
.plusComb{display:inline-block;float:left;width:32px;height:32px;line-height:32px;color:#fff;background:rgb(110, 144, 212);text-align:center;font-size:20px;}
.plusComtent{display:inline-block;float:left;width:78px;height:32px;line-height:32px;color:#fff;background:rgb(47, 154, 208);text-align:center;font-size:14px;}
.width390{
  width:390px;
}
.height25{
  height:25px;
}
.orderInf-cancel{
   width:80px; float:right;height:34px;font-size:14px;font-weight:500;line-height:34px;cursor: pointer; border: 1px solid #4c70e8;text-align:center;display:inline-block;color:#4c70e8
}
.custom-action{
	margin-left:30px;
  font-size:14px;
  font-weight:600;
}
.thrid-bar{
  padding-top:20px;
  width:98%;
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
.lineContent1{display:inline-block;}
.lineContentWidth{
    display: block;
    width: 900px;
    margin-left: 100px;
    margin-top: -14px;
}
</style>