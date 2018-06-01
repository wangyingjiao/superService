<template>
    <div class="addorder-container">
       <!--订单信息开始-->
        <div class="thrid-bar">
            <div class="custom-action orderOneBar">基本信息              
              <!-- <input type="button" v-if="otherInfo.orderSource =='own' && otherInfo.payStatus =='waitpay' && otherInfo.serviceStatus !='cancel' && btnShow.indexOf('order_cancel') > -1 && otherInfo.orderStatus != 'close'"  @click="cancelOrder"  class="button-cancel height25" style="float:right;"  value="取消订单">
              <input type="button" v-if="otherInfo.orderStatus =='success' && (! otherInfo.orderAllRefundFlag) && otherInfo.orderSource =='own' && otherInfo.serviceStatus =='finish' && otherInfo.payStatus =='payed' && btnShow.indexOf('order_refund') > -1"  @click="orderRefund"  class="button-cancel height25" style="float:right;"  value="退款"> -->              
            </div>
            <!--  -->
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">订单组ID:</span>
                      <span class="lineContent">{{otherInfo.masterId}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">服务机构:</span>
                      <span class="lineContent width180">{{otherInfo.orgName}}</span>
                   </p>                                      
                   <p class="contentLine">
                      <span class="lineTitle">用户姓名:</span>
                      <span class="lineContent">
                        {{otherInfo.customerName}}                      
                      </span>
                   </p> 
                   <p class="contentLine" v-if="otherInfo.orderType =='group_split_yes'">
                      <span class="lineTitle">有效期:</span>
                      <span class="lineContent" style="width:240px;position: absolute;">
                        {{otherInfo.orderTime+'~'+otherInfo.expiryDate}}                      
                      </span>
                   </p>                                                                                                                                                    
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">订单状态:</span>
                      <span class="lineContent">
                          <span v-if="otherInfo.orderStatus =='cancel'">已取消</span>
                          <span v-if="otherInfo.orderStatus =='dispatched'">已下单</span>
                          <span v-if="otherInfo.orderStatus =='finish'">已完成</span>
                          <span v-if="otherInfo.orderStatus =='close'">已关闭</span>
                          <span v-if="otherInfo.orderStatus =='success'">已成功</span>
                      </span>
                   </p>                  
                   <p class="contentLine">
                      <span class="lineTitle">服务站:</span>
                      <span class="lineContent" style="min-width:186px;">{{otherInfo.stationName}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">用户电话:</span>
                      <span class="lineContent" style="min-width:186px;">{{otherInfo.customerPhone}}</span>
                   </p>                                                                                                                                      
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">订单来源:</span>
                      <span class="lineContent">
                        <span v-if="otherInfo.orderSource =='own'">本机构</span>
                        <span v-if="otherInfo.orderSource =='gasq'">国安社区</span>
                      </span>
                   </p>                   
                   <p class="contentLine">
                      <span class="lineTitle">订单分类:</span>
                      <span class="lineContent">
                          <span v-if="otherInfo.majorSort =='clean'">保洁</span>
                          <span v-if="otherInfo.majorSort =='repair'">家修</span>                         
                      </span>
                   </p>                                                                            
                   <p class="contentLine">
                      <span class="lineTitle">下单时间:</span>
                      <span class="lineContent">{{otherInfo.orderTime}}</span>
                   </p>                                                                     
                </div>                 
            </div>                                     		
		    </div>
        <!--订单信息结束-->
        <!--订单取消开始-->
        <div class="thrid-bar marginTop15" v-if="otherInfo.orderStatus =='cancel'">
            <div class="custom-action">订单取消信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea marginBottom20">
                   <p class="contentLine">
                      <span class="lineTitle">取消原因:</span>
                      <span class="lineContent">
                          <span v-if="otherInfo.cancelReason =='customer'">用户来电取消</span>
                          <span v-if="otherInfo.cancelReason =='tech'">无可派技师</span>
                          <span v-if="otherInfo.cancelReason =='other'">其它原因</span>
                      </span>
                   </p>                                                                                             
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle FloatLeft">备注:</span>
                      <span class="selfbeizhu1">{{otherInfo.cancelReasonRemark}}</span>
                   </p>                   
                </div>
            </div>                                     		
		    </div>
        <!--订单取消结束-->        
        <!--服务信息开始-->
        <div class="thrid-bar marginTop15">
            <div class="custom-action">服务信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea" style="width:440px;">
                   <p class="contentLine" v-if="otherInfo.orderType =='group_split_no'">
                     <!--  -->
                      <span class="lineTitle">建议服务时长:</span>
                      <span  class="lineContent">{{otherInfo.serviceHour}}</span>
                   </p>
                   <p class="contentLine" v-if="otherInfo.orderType !='group_split_no' && otherInfo.tech != undefined">
                      <span class="lineTitle">固定技师:</span>
                      <span  style="margin-left: -24px;" >
                        <span>{{otherInfo.tech.name}}</span>
                        <span  style="margin-left:10px;">{{otherInfo.tech.phone}}</span>
                        <span  style="margin-left:15px;" v-if="otherInfo.orderStatus !='cancel' && btnShow.indexOf('combination_regular') > -1 && otherInfo.surplusNum != 0"><input type="button"  class="button-cancel height25"  @click="gaiPai1()"  value="更换固定技师"></span>
                      </span>
                   </p>                                                                                            
                </div>
                <div class="rightArea" style="width:520px;" v-if="otherInfo.orderType =='group_split_yes'">
                   <!--  -->
                     <div style="width:80px;float:left;margin-top: 25px;">固定服务时间:</div>
                      <div  style="float:left;width:426px;">
                        <div v-if="otherInfo.freList != undefined && otherInfo.freList.length != 0" style="float:left;width:80px;margin-top: 25px;">
                          <span v-if="otherInfo.serviceFrequency =='week_one'">1周1次</span>
                          <span v-if="otherInfo.serviceFrequency =='week_some'">1周多次</span>
                          <span v-if="otherInfo.serviceFrequency =='two_week_one'">2周1次</span>
                        </div>
                        <div style="float:left;width:105px;margin-top: 25px;" v-if="otherInfo.freList != undefined && otherInfo.freList.length != 0 ">每次{{otherInfo.copyserviceHour1}}</div>
                        <ul v-if="otherInfo.freList != undefined && otherInfo.freList.length != 0" style="float:left;width:120px;margin-top: 25px;">
                          <li v-for="item in otherInfo.freList" :key="item.id">
                            <span>                              
                              <span v-if="item.week =='1'">每周一</span>
                              <span v-if="item.week =='2'">每周二</span>
                              <span v-if="item.week =='3'">每周三</span>
                              <span v-if="item.week =='4'">每周四</span>
                              <span v-if="item.week =='5'">每周五</span>
                              <span v-if="item.week =='6'">每周六</span>
                              <span v-if="item.week =='7'">每周日</span>
                            </span>
                            <span style="margin-left:10px;">{{item.timeArea}}</span>
                          </li>
                        </ul>
                        <div v-if="otherInfo.freList != undefined && otherInfo.freList.length != 0 && otherInfo.orderStatus !='cancel' && btnShow.indexOf('combination_regular') > -1  && otherInfo.surplusNum != 0" style="float:left;width:100px;margin-top:18px;"><input type="button"  class="button-cancel height25"  @click="changeguTime('edit')" value="更换固定时间"></div>
                        <div v-if="otherInfo.freList == undefined && otherInfo.orderStatus !='cancel' && btnShow.indexOf('combination_regular') > -1  && otherInfo.surplusNum != 0" style="float:left;width:100px;margin-top: 18px;"><input type="button"  class="button-cancel height25"  @click="changeguTime('add')" value="设置固定时间"></div>
                      </div>                                      
                </div>
            </div>
            <div v-if="otherInfo.orderRefundFlag" style="float:left;width:800px;margin-left:30px;"><a v-if="true" href="javascript:void(0);" style="color:#3a5fcd;cursor:pointer;" target="" @click="gotoRefund(otherInfo.orderNumber)  " >点击查看退款信息</a></div>            
            <div class="selfTableWrapStyle" style="width:100%;" >                                
                    <el-table
                      :data="tableData"
                      border
                      class="self-table-style"
                      style="margin-top:20px;"                      
                      >
                      <el-table-column
                        align="center"
                        label="组合商品名称"
                        prop="combinationGoodsName"
                        >
                      </el-table-column>                       
                      <el-table-column
                        align="center"
                        label="服务项目"
                        >
                        <template scope="scope">
                            <div class="selfTd" v-for="(item,index) in scope.row.combinationCommoditys" :key="index">{{item.itemName}}</div>						
                        </template>                         
                      </el-table-column>                      
                      <el-table-column
                        align="center"
                        label="商品名称"
                        >
                        <template scope="scope">
                            <div class="selfTd" v-for="(item,index) in scope.row.combinationCommoditys" :key="index">{{item.goodsName}}</div>						
                        </template>                        
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="服务数量"
                        prop="combinationGoodsNum">                    
                      </el-table-column>                                           
                      <el-table-column
                        align="center"
                        label="单位">
                          <template scope="scope">
                              <span>{{scope.row.unit}}</span>
                          </template>	                                           
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="单价">
                          <template scope="scope">
                              <span>￥{{scope.row.price | keepTwoNum}}</span>
                          </template>	                                           
                      </el-table-column>                                             
                      <el-table-column
                        align="center"
                        label="小计">
                          <template scope="scope">
                              <span>￥{{scope.row.sum | keepTwoNum}}</span>
                          </template>	                                           
                      </el-table-column>                      
                    </el-table>
            </div>                                     		
		    </div>
        <!--服务信息结束-->
        <!--服务地址信息开始-->
        <div class="thrid-bar marginTop15">
            <div class="custom-action">服务地址信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea marginBottom20">
                   <p class="contentLine">
                      <span class="lineTitle">联系人:</span>
                      <span class="lineContent" style="min-width:186px;">
                          <span>{{addressInf.name}}</span>
                      </span>
                   </p>                                                        
                   <p class="contentLine">
                      <span class="lineTitle FloatLeft">服务地址:</span>
                      <span class="selfbeizhu1">
                        <span>{{addressInf.detailAddress}}</span>
                      </span>
                   </p>                                      
                </div>
                <div class="rightArea">
                   <p class="contentLine" >
                      <span class="lineTitle">联系电话:</span>
                      <span class="lineContent" >
                        <span>{{addressInf.phone}}</span>                                                                        
                      </span>
                   </p>
                </div>
            </div>                                     		
		    </div>
        <!--服务地址信息结束-->                
        <!--支付信息开始-->
        <div class="thrid-bar marginTop15" v-if="false">
            <div class="custom-action">支付信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine" >
                      <span class="lineTitle">交易单号:</span>
                      <span class="lineContent">{{payInfo.payNumber}}</span>
                   </p>                                                                          
                   <p class="contentLine" >
                      <span class="lineTitle">支付总额:</span>
                      <span class="lineContent">{{payInfo.payAccount}}元</span>
                   </p>                                      
                </div>
                <div class="rightArea">
                   <p class="contentLine" >
                      <span class="lineTitle">支付状态:</span>
                      <span class="lineContent" >
                        <span>已支付</span>                                                                        
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
                </div>
                <div class="rightArea">
                   <p class="contentLine" >
                      <span class="lineTitle">支付方式:</span>
                      <span class="lineContent">
                        <span v-if="payInfo.payMethod =='offline'">货到付款</span>
                        <span v-if="payInfo.payMethod =='online'">在线</span>                        
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
        <!--已有订单信息开始-->
        <div class="thrid-bar marginTop15">
            <div class="custom-action">已有订单信息</div>
            <div class="hr-style"></div>
            <div class="techTabWrap" style="width:100%">                
                <div style="width:100%">
                  <div class="yuyueStyle" v-if="otherInfo.orderType =='group_split_yes'">
                     <span >单个订单的建议服务时长：<span>{{otherInfo.serviceHour}}</span></span>
                  </div>
                  <div class="yuyueStyle" style="float:right;text-align: right;" v-if="otherInfo.orderType =='group_split_yes'">
                    <span>可预约次数：<span>{{otherInfo.bespeakTotal}}</span>次</span>
                    <span style="margin-left:20px;">已预约：<span>{{otherInfo.bespeakNum}}</span>次</span>
                    <span style="margin-left:20px;"> 剩余：<span>{{otherInfo.surplusNum}}</span>次</span>                    
                    <span style="margin-right: 20px;"><input type="button"  class="button-cancel height25" style=" margin-top:-5px;" v-if="otherInfo.surplusNum != 0 && btnShow.indexOf('combination_subscribe') > -1 && otherInfo.orderStatus !='cancel'" @click="yuyueClick" value="预约"></span> 
                  </div>                
                </div>               
                <div class="selfTableWrapStyle2">                
                    <el-table
                      :data="ordertableData"
                      border                  
                      class="orderInfoHeaderPic testaa"
                      style="margin-top:-8px;"
                      >
                      <!-- height="250" -->
                      <el-table-column
                        align="center"
                        min-width='180'
                        label="订单编号"
                        >
                                               
                            <template scope="scope">
                              <div class="selfTd" v-for="(item,index) in scope.row.orderList" :key="index">
                                {{item.orderNumber}}
                              </div> 
                            </template>                        
                      </el-table-column>
                      <el-table-column
                        align="center"
                        min-width='150'
                        label="服务时间"
                        >
                            <template scope="scope">
                              <div class="selfTd" v-for="(item,index) in scope.row.orderList" :key="index">
                                {{item.serviceTime}}
                              </div> 
                            </template>                                                
                      </el-table-column>
                      <el-table-column
                        align="center"
                        min-width='100'
                        label="服务状态">
                          <template scope="scope">
                              <div class="selfTd" v-for="(item,index) in scope.row.orderList" :key="index">
                                  <span v-if="item.serviceStatus =='wait_service'">待服务</span>
                                  <span v-if="item.serviceStatus =='started'">已上门</span>
                                  <span v-if="item.serviceStatus =='finish'">已完成</span>
                                  <span v-if="item.serviceStatus =='cancel'">已取消</span>
                              </div>                            
                          </template>	                    
                      </el-table-column>
                      <el-table-column
                        align="center"
                        min-width='100'
                        label="订单状态">
                          <template scope="scope">
                            <div class="selfTd" v-for="(item,index) in scope.row.orderList" :key="index">
                                  <span v-if="item.orderStatus =='cancel'">已取消</span>
                                  <span v-if="item.orderStatus =='dispatched'">已派单</span>
                                  <span v-if="item.orderStatus =='finish'">已完成</span>
                                  <span v-if="item.orderStatus =='close'">已关闭</span>
                                  <span v-if="item.orderStatus =='stop'">已暂停</span>
                                  <span v-if="item.orderStatus =='success'">已成功</span>
                                  <span v-if="item.orderStatus =='waitdispatch'">待派单</span> 
                            </div>                           
                          </template>	                    
                      </el-table-column> 
                      <el-table-column
                        align="center"
                        label="完成时间"
                        min-width='150'
                        >
                            <template scope="scope">
                              <div class="selfTd" v-for="(item,index) in scope.row.orderList" :key="index">
                                <span  v-if="item.serviceStatus =='finish'" >{{item.finishTime}}</span>
                              </div> 
                            </template>                                                 
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="对接订单编号"
                        min-width='180'
                        >
                            <template scope="scope">
                              <div class="selfTd" v-for="(item,index) in scope.row.orderList" :key="index">
                                {{item.jointOrderId}}
                              </div> 
                            </template>                                                 
                      </el-table-column>                                                                 
                      <el-table-column
                        prop="orderTime"
                        align="center"
                       min-width='180'
                        label="下单时间">
                            <template scope="scope">
                              <div class="selfTd" v-for="(item,index) in scope.row.orderList" :key="index">
                                {{item.orderTime}}
                              </div> 
                            </template>                         
                      </el-table-column>
                      <el-table-column
                        align="center"
                        min-width="200"
                        :render-header="renderHeader1"
                        fixed="right"
                        >                              
                          <template scope="scope">
                            <div class="selfTd" v-for="(item,index) in scope.row.orderList" :key="index">
                              <input type="button" v-if="btnShow.indexOf('combination_remark') > -1" class="button-cancel height25"  @click="lookRemark(item)" value="查看备注">
                            </div> 
                          </template>                     
                      </el-table-column>                                        
                      <el-table-column
                        align="center"
                       min-width="200"
                        :render-header="renderHeader2"
                        fixed="right"
                        >
                            <template scope="scope">                                  
                                  <input type="button"  class="button-cancel height25" style="margin-left:1px;" v-if="scope.row.hide =='no' && btnShow.indexOf('combination_order') > -1 " @click="changeTime(scope.row)" value="更换时间">
                                  <input type="button"  class="button-cancel height25" style="margin-left:5px;"  v-if="btnShow.indexOf('combination_order') > -1" @click="changeTech(scope.row.orderList[0])" value="更换技师">                                                         
                            </template>                                                                                            
                      </el-table-column>                                        
                    </el-table>
                </div>
            </div>                     		
		    </div>
        <!--已有订单信息结束-->
        <!--查看备注信息结束-->         
        <el-dialog
          title="查看备注信息"
          class="selfCustomerDialog1"
          :visible.sync="RemarkInfFlag"
          :close-on-click-modal="false"
          >
            <!--下单用户信息开始-->
            <div class="thrid-bar" style="margin-top:-38px;padding-left:20px;">
                <div class="custom-action1">用户备注</div>
                <div class="hr-style1"></div>
                <div class="selfWrap1">
                    <div class="leftArea" style="width:100%;">
                      <p class="contentLine1">
                          <span class="lineTitle FloatLeft">备注:</span>
                          <span class="selfbeizhu1">
                            {{otherInfo1.customerRemark}}
                          </span>
                      </p>
                      <p class="contentLine1">
                          <span class="lineTitle"></span>
                          <span class="lineContent2">
                            <div class="picWrap">
                                <div class="picStyle" v-for="item in otherInfo1.customerRemarkPics" :key="item"> 
                                  <img :src="imgSrc+item+picWidth250"/>
                                </div>
                            </div>
                          </span>
                      </p>                                                        
                    </div>
                </div>                                     		
            </div>
            <!--下单用户信息结束-->        
            <!--技师备注开始-->
            <div class="thrid-bar marginTop15 PositionRelative">
                <div class="exptyDiv" ></div>
                <div class="custom-action1 selfPaddingLeft20">技师备注</div>
                <div class="hr-style1 selfPaddingLeft20"></div>
                <div class="selfWrap1 selfPaddingLeft20">
                    <div class="leftArea" style="width:100%;">
                      <p class="contentLine1">
                          <span class="lineTitle FloatLeft">备注:</span>
                          <span class="lineContent1 selfbeizhu" style="padding-left: 20px;">{{otherInfo1.orderRemark}}</span>
                      </p>
                      <p class="contentLine1">
                          <span class="lineContent2">
                            <div class="picWrap selfMarTL">
                                <div class="picStyle" v-for="item in otherInfo1.orderRemarkPics" :key="item">
                                  <img :src="imgSrc+item+picWidth250"/>
                                </div>
                            </div>
                          </span>
                      </p>                                                        
                    </div> 
                </div>                                     		
            </div>
            <!--技师备注结束-->               
            <!--业务人员信息开始-->
            <div class="thrid-bar marginTop15 PositionRelative">
                <div class="exptyDiv"></div>
                <div class="custom-action1 selfPaddingLeft20">业务人员信息</div>
                <div class="hr-style1"></div>
                <div class="selfWrap1 selfPaddingLeft20">
                    <div class="leftArea" >
                      <p class="contentLine1">
                          <span class="lineTitle">姓名:</span>
                          <span class="lineContent">{{otherInfo1.businessName}}</span>
                      </p>
                      <p class="contentLine1">
                          <span class="lineTitle FloatLeft">备注:</span>
                          <span class="selfbeizhu1" >
                            {{otherInfo1.businessRemark}}
                          </span>
                      </p>                                                        
                    </div>
                    <div class="rightArea">
                      <p class="contentLine">
                          <span class="lineTitle">电话:</span>
                          <span class="lineContent">{{otherInfo1.businessPhone}}</span>
                      </p>                    
                    </div>
                    <div>
                      <p class="contentLine1" >
                          <span class="lineContent2 ">
                            <div class="picWrap">
                                <div class="picStyle" v-for="item in otherInfo1.businessRemarkPics" :key="item"> 
                                  <img :src="imgSrc+item+picWidth250"/>
                                </div>
                            </div>
                          </span>
                      </p>                      
                    </div> 
                </div>                                     		
            </div>
            <!--业务人员信息结束-->            
            <!--门店信息开始-->
            <div class="thrid-bar marginTop15 marginBOT20 PositionRelative"  >
                 <div class="exptyDiv" ></div>
                <div class="custom-action1 selfPaddingLeft20" >门店信息</div>
                <div class="hr-style1"></div>
                <div class="selfWrap1 selfPaddingLeft20">
                    <div class="leftArea" >
                      <p class="contentLine1">
                          <span class="lineTitle">名称:</span>
                          <span class="lineContent">{{otherInfo1.shopName}}</span>
                      </p>
                      <p class="contentLine1">
                          <span class="lineTitle FloatLeft">地址:</span>
                          <span class="lineContent">
                            <el-tooltip v-if="otherInfo1.shopAddr != undefined"  placement="left" :disabled="otherInfo1.shopAddr.length< 16" :content="otherInfo1.shopAddr">
                              <div class="selfToolTip">{{otherInfo1.shopAddr}}</div>
                            </el-tooltip>                                                
                          </span>
                      </p>
                      <p class="contentLine1">
                          <span class="lineTitle FloatLeft">备注:</span>
                          <span class="selfbeizhu1">
                            {{otherInfo1.shopRemark}}                        
                          </span>
                      </p>                                                        
                    </div>
                    <div class="rightArea">
                      <p class="contentLine">
                          <span class="lineTitle">电话:</span>
                          <span class="lineContent">{{otherInfo1.shopPhone}}</span>
                      </p>                  
                    </div>
                    <div>
                      <p class="contentLine1">
                          <span class="lineContent2">
                            <div class="picWrap">
                                <div class="picStyle" v-for="item in otherInfo1.shopRemarkPics" :key="item">
                                  <img :src="imgSrc+item+picWidth250"/>
                                </div>
                            </div>
                          </span>
                      </p>                      
                    </div> 
                </div>                                     		
            </div>
            <!--门店信息结束-->
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large"   @click="RemarkInfFlag = false">关闭</button>
            </div>
        </el-dialog> 
        <!-- 查看备注信息结束-->
        <!--更换技师与改派共用弹窗开始-->
        <el-dialog title="选择技师" :visible.sync="dialogTableVisible" class="selfDialogWidth" :close-on-click-modal="false">
          <el-input placeholder="输入要搜索的姓名" v-model="techName" class="orderinfoTechNameStyle" style="width:252px;"></el-input> 
          <button class="button-large FloatRight  orderinfoTechSearchStyle" @click="searchTeh">查询</button>
          <div class="NowTabs" v-if="otherInfo.orderType =='group_split_no'">当前选择标签：</div>
           <transition name="el-zoom-in-bottom">
            <div class="selfpromMessageTab" v-if="middleA.length !=0">
              <div  class="tabWrap1" v-for="item in middleA" :key="item.techId">
                <el-tooltip placement="left" v-if="item.techName != undefined" :disabled="item.techName.length < 6" :content="item.techName">
                  <div v-if="item.techName.length != 6" class="techNameStyle">{{item.techName}}</div>
                  <div v-if="item.techName.length == 6" class="techNameStyle">{{item.techName}}一</div>
                </el-tooltip>
              </div>                         
            </div>
           </transition>
          <div class="selfTableWrapONE">
            <div class="table-d">
              <table  class="selfTable">
              <tr class="tableHeader">
                <td  class="selfTableHEADTD" align="center" width="73px">选择</td>
                <td  class="selfTableHEADTD" align="center" width="100px">头像</td>
                <td  class="selfTableHEADTD" align="center" width="230px">姓名</td>
                <td  class="selfTableHEADTD" align="center" width="71px">性别</td>
                <td  class="selfTableHEADTD" align="center" width="90px">手机号</td>
                <td  class="selfTableHEADTD" align="center" width="71px">岗位性质</td>							
              </tr>
              <div class="orderinfoTechTablePadding">
                  <tr v-for="item in listTech" :key="item.techId"  ref="tableItem1" class="selfTdStyle1">
                    <td width="72px" class="fontSize12"  align="center">
                      <el-checkbox v-if="status == 'add'" v-model="item.techChecked" @change="ChangeTechLIne(item)"></el-checkbox>
                      <el-radio v-if="status == 'edit'" :label="item.techId" v-model="radio1" @change.native="getCurrentRow1(item.techId)">&nbsp;</el-radio>
                    </td>
                    <td  width="99px" class="height70" align="center"><img class="imgStyle" :src="imgSrc+item.headPic+picWidth60"/></td>
                    <td width="230px" class="fontSize12" align="center"><el-tooltip placement="left" v-if="item.techName != undefined" :disabled="item.techName.length < 10" :content="item.techName"><div :class=" item.techName.length < 10 ? '' : 'selftechNameStyle' ">{{item.techName}}</div></el-tooltip></td>
                    <td  width="72px" class="fontSize12" align="center">
                      <span class="fontSize12" v-if="item.techSex =='male'">男</span>
                      <span class="fontSize12" v-if="item.techSex =='female'">女</span>									
                    </td>
                    <td  width="90px" class="fontSize12" align="center">
                       {{item.techPhone}}									
                    </td>                    
                    <td width="70px" class="fontSize12"  align="center">
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
        <!--更换技师与改派共用弹窗结束-->                                                    
        <!--更换固定技师弹窗开始-->
        <el-dialog title="选择技师" :visible.sync="dialogTableVisible1" class="selfDialogWidth" :close-on-click-modal="false">
          <el-input placeholder="输入技师姓名" v-model="techName1" class="orderinfoTechNameStyle" style="width:252px;"></el-input> 
          <button class="button-large FloatRight  orderinfoTechSearchStyle" @click="searchTeh1">查询</button>
          <div class="NowTabs" style="font-size:12px;">*更换固定服务技师后，之后的订单会默认派单给该技师</div>                                             	
          <div class="selfTableWrapONE">
            <div class="table-d">
              <table  class="selfTable">
              <tr class="tableHeader">
                <td  class="selfTableHEADTD" align="center" width="73px">选择</td>
                <td  class="selfTableHEADTD" align="center" width="100px">头像</td>
                <td  class="selfTableHEADTD" align="center" width="230px">姓名</td>
                <td  class="selfTableHEADTD" align="center" width="73px">性别</td>
                <td  class="selfTableHEADTD" align="center" width="161px">岗位性质</td>							
              </tr>
              <div class="orderinfoTechTablePadding">
                  <tr v-for="item in listTech1" :key="item.techId"   class="selfTdStyle1">
                    <td width="72px" class="fontSize12"  align="center">              
                     <el-radio :label="item.techId" v-model="radio" @change.native="getCurrentRow(item.techId)">&nbsp;</el-radio>
                   </td>
                    <td  width="99px" class="height70" align="center"><img class="imgStyle" :src="imgSrc+item.headPic+picWidth60"/></td>
                    <td width="230px" class="fontSize12" align="center"><el-tooltip placement="left" v-if="item.techName != undefined" :disabled="item.techName.length < 10" :content="item.techName"><div :class=" item.techName.length < 10 ? '' : 'selftechNameStyle' ">{{item.techName}}</div></el-tooltip></td>
                    <td  width="72px" class="fontSize12" align="center">
                      <span class="fontSize12" v-if="item.techSex =='male'">男</span>
                      <span class="fontSize12" v-if="item.techSex =='female'">女</span>									
                    </td>
                    <td width="160px" class="fontSize12"  align="center">
                          <span class="fontSize12" v-if="item.jobNature =='part_time'">兼职</span>
                          <span class="fontSize12" v-if="item.jobNature =='full_time'">全职</span>
                    </td>							
                  </tr>
              </div>
              </table>
              <div v-if="listTech1.length == 0  || listTech1.length == undefined" class="selfTabProm">暂无数据</div>
              
            </div>            
          </div> 	  	  
          <div slot="footer" class="dialog-footer" style="text-align:center">
            <button class="button-large" :disabled="techSaveFlag1" @click="submitForm21()">确定更换</button>
            <button class="button-cancel" @click="cancelForm21()">取 消</button>
          </div>
        </el-dialog>
        <!--更换固定技师弹窗结束-->        
        <!--更换时间弹窗开始-->
        <el-dialog
          title="选择服务时间"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
          class="selfDialogWidth3"
          >
            <el-form  :model="formInline" :rules="formInline1rules" ref="formInline" label-width="80px" class="gehuanjishiform">
              <div>
                  <el-form-item label="选择日期" prop='Date' class="selfPaddingLeft20">
                          <el-select v-model="formInline.Date" class="selfDateStyle" style="margin-left:20px;"  @change='dateChange' placeholder="请选择">
                            <el-option
                              v-for="item in options2"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>                      
                  </el-form-item>
                  <el-form-item label="选择时间" prop='Time' class="selfPaddingLeft20">
                        <span class="selfLabelStyle" style="left: -72px;">*</span>
                        <el-input type="hidden" value='' v-model='formInline.Time'></el-input>                  
                        <div class="marginTopDec46" style="width:500px;">
                          <div class="selfSeverTimeSt" ref="TimeWrap"  v-for="(item,index) in timeObj" :key="index" @click="timeChange(index,item)">{{item.serviceTimeStr}}</div>                                                                 
                        </div> 
                        <div v-if="timeObj.length != 0" class="promMessage" style="font-size:12px;">*  更换服务时间，只会更改本次订单的服务时间</div>                                      
                  </el-form-item>
                  <el-form-item label="" class="selfPaddingLeft20">              
                        <div class="button-large-fourth" style="margin-left: 20px;margin-top:-20px;" v-if="otherInfo.orderType == 'group_split_yes'" @click="searchSeverTech1">查询服务技师</div> 
                  </el-form-item>
              </div>
              <div v-if="gudingFlag1 && otherInfo.orderType == 'group_split_yes'" class="PositionRelative">
                <div class="exptyDiv"></div>
                          
                <el-form-item label="选择技师" prop="Tech" class="selfPaddingLeft20 prostyle" style="padding-top:20px;" >   
                   <div style="font-size:12px;padding-left:40px;color:#8391a0d9">
                        <p v-if="techObj != undefined">*  该订单的技师为：<span>{{techObj.name}}</span><span style="padding-left:20px;">{{techObj.phone}}</span></p>
                        
                        <p>更换服务时间，可能会影响已派技师，若已派技师无空闲时间，可选择其他技师</p>
                   </div>              
                  <div style="margin-top: -10px;padding-left:20px;">                
                      <el-table
                        :data="tableData2"
                        border                  
                        class="orderInfoHeaderPic"
                        style="width:550px;"
                        >
                        <el-table-column
                          min-width="65"
                          align="center"
                          label="选择"                        
                          > 
                            <template scope="scope">
                              <el-radio :label="scope.row.techId" v-model="radio3" @change.native="getCurrentRow3(scope.row.techId)">&nbsp;</el-radio>
                            </template>                                               
                        </el-table-column>                      
                        <el-table-column
                          min-width="90"
                          align="center"
                          label="头像"
                          >
                          <template scope="scope">
                          <img class="picHeader" :src="imgSrc+scope.row.headPic+picWidth60"/>
                          </template>
                        </el-table-column>
                        <el-table-column
                          align="center"
                          label="姓名"
                          min-width="150"
                          >
                            <template scope="rowObj">
                              <el-tooltip placement="left" v-if="rowObj.row.techName!= undefined" :disabled="rowObj.row.techName.length < 10" :content="rowObj.row.techName">
                                <p :class=" rowObj.row.techName.length < 10 ? '' : 'selfToolTip1' ">{{rowObj.row.techName}}</p>
                              </el-tooltip>
                            </template>                                                
                        </el-table-column>
                        <el-table-column
                          min-width="65"
                          align="center"
                          label="性别">
                            <template scope="scope">
                                <span v-if="scope.row.techSex =='male'">男</span>
                              <span v-if="scope.row.techSex =='female'">女</span>
                            </template>	                    
                        </el-table-column>
                        <el-table-column
                          prop="techPhone"
                          min-width="94"
                          align="center"
                          label="手机号">
                        </el-table-column>
                        <el-table-column
                          min-width="65"
                          align="center"
                          label="岗位性质">
                            <template scope="scope">
                                <span  v-if="scope.row.jobNature =='part_time'">兼职</span>
                                <span  v-if="scope.row.jobNature =='full_time'">全职</span>                              
                            </template>	                    
                        </el-table-column>                                                          
                      </el-table>
                  </div>  
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large" :disabled="timeSaveFlag"  @click="submitTime('formInline')">保存</button>
              <button class="button-cancel"  @click="cancelTime('formInline')">取 消</button>
            </div>
        </el-dialog>
        <!--更换时间弹窗结束-->
        <!--预约弹窗开始-->
        <el-dialog
          title="预约"
          :visible.sync="yuyuedialogVisible"
          :close-on-click-modal="false"
          class="selfDialogWidth3"
          >
            <el-form  :model="yuyueformInline" :rules="yuyueformInline1rules" ref="yuyueformInline" label-width="80px" class="gehuanjishiform">
              <div>
                  <el-form-item label=" 预约个数:" style="margin-top: -22px;padding-left:20px;">
                    <span class="selfLabelStyle" style="left: -72px;">*</span>
                    <input-num class="selfINputNumStyle"  v-model="yuyueNumber" :min='1'   :max="yuyueMax" style="width:120px;margin-left: 20px;" @change="yuyuenumberChange"></input-num>
                    <div style="font-size: 12px;color: #576475;min-width:587px;padding-left:20px;color:#8391a0d9">* 单次建议服务时长为{{copyserviceHour}}小时；总服务时长为{{copyserviceHour*100*yuyueNumber/100}}小时(预约个数 * 单次建议服务时长)且总服务长不能超过6小时! </div>
                  </el-form-item>
                  <el-form-item label="" style="margin-top: -26px;padding-left:20px;">              
                  <div class="button-large-fourth"  @click="searchseverDateyuyue" style="margin-left:20px;">查询服务日期</div> 
                  </el-form-item>
                  <div v-show="yuyueselectDateFlag" class="PositionRelative">
                        <div class="exptyDiv"></div>
                        <el-form-item label="选择日期:" prop='Date' style="padding-top:20px;padding-left:20px;">
                                <span class="selfLabelStyle" style="left: -72px;">*</span>
                                <el-select v-model="yuyueformInline.Date" class="selfDateStyle" style="margin-left:20px;width:82%"  @change='yuyuedateChange' placeholder="请选择">
                                  <el-option
                                    v-for="item in options21"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>                      
                        </el-form-item>
                        <el-form-item label="选择时间:" prop='Time' class="selfPaddingLeft20" >
                              <span class="selfLabelStyle" style="left: -72px;">*</span>
                              <el-input type="hidden" value='' v-model='yuyueformInline.Time'></el-input>                  
                              <div class="marginTopDec46" style="width:500px;">
                                <div class="selfSeverTimeSt" ref="yuyueTimeWrap"  v-for="(item,index) in yuyuetimeObj" :key="index" @click="yuyuetimeChange(index,item)">{{item.serviceTimeStr}}</div>                                                                 
                              </div> 
                              <!-- <div v-if="yuyuetimeObj.length != 0" class="promMessage" style="font-size:12px;">*  更换服务时间，只会更改本次订单的服务时间</div>                                       -->
                        </el-form-item>
                        <el-form-item label="" class="selfPaddingLeft20" style="margin-top: 20px;">              
                            <div class="button-large-fourth"  @click="searchSeverTechyuyue" style="margin-left:20px; margin-top: -15px">查询服务技师</div> 
                        </el-form-item>                    
                  </div>                   

              </div>
              <div v-show="gudingFlag11" class="PositionRelative">
                <div class="exptyDiv"></div>
                <el-form-item label="选择技师:" prop="Tech" class="selfPaddingLeft20" style="padding-top:14px;">             
                  <div style="margin-top: -10px;margin-right:30px;">                
                      <el-table
                        :data="yuyuetableData"
                        border                  
                        class="orderInfoHeaderPic">
                        <el-table-column
                          min-width="65"
                          align="center"
                          label="选择"                        
                          > 
                            <template scope="scope">
                              <el-radio :label="scope.row.techId" v-model="yuyueradio" @change.native="yuyuegetCurrentRow(scope.row.techId)">&nbsp;</el-radio>
                            </template>                                               
                        </el-table-column>                      
                        <el-table-column
                          min-width="90"
                          align="center"
                          label="头像"
                          >
                          <template scope="scope">
                          <img class="picHeader" :src="imgSrc+scope.row.headPic+picWidth60"/>
                          </template>
                        </el-table-column>
                        <el-table-column
                          align="center"
                          label="姓名"
                          min-width="150"
                          >
                            <template scope="rowObj">
                              <el-tooltip placement="left" v-if="rowObj.row.techName!= undefined" :disabled="rowObj.row.techName.length < 10" :content="rowObj.row.techName">
                                <p :class=" rowObj.row.techName.length < 10 ? '' : 'selfToolTip1' ">{{rowObj.row.techName}}</p>
                              </el-tooltip>
                            </template>                                                
                        </el-table-column>
                        <el-table-column
                          min-width="65"
                          align="center"
                          label="性别">
                            <template scope="scope">
                                <span v-if="scope.row.techSex =='male'">男</span>
                              <span v-if="scope.row.techSex =='female'">女</span>
                            </template>	                    
                        </el-table-column>
                        <el-table-column
                          prop="techPhone"
                          min-width="94"
                          align="center"
                          label="手机号">
                        </el-table-column>
                        <el-table-column
                          min-width="65"
                          align="center"
                          label="岗位性质">
                            <template scope="scope">
                                <span v-if="scope.row.jobNature =='full_time'">全职</span>
                                <span v-if="scope.row.jobNature =='part_time'">兼职</span>
                            </template>	                    
                        </el-table-column>                                                          
                      </el-table>
                  </div>  
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large" :disabled="yuyuetimeSaveFlag1"  @click="yuyuesubmitTime('yuyueformInline')">保存</button>
              <button class="button-cancel"  @click="yuyuecancelTime('yuyueformInline')">取 消</button>
            </div>
        </el-dialog>
        <!--预约弹窗结束-->        
        <!--取消订单弹窗开始-->
        <!-- <el-dialog
          title="取消订单"
          :visible.sync="cancelOrderFlag"
          :close-on-click-modal="false"
          >
            <el-form  :model="Orderform" :rules="orderrules" ref="Orderform" label-width="80px" label-position="left" >
              <el-form-item label="取消原因:" prop='becouss' >
                      <el-select v-model="Orderform.becouss"  style="width:80%;"  placeholder="请选择">
                        <el-option
                          v-for="(value,key,index) in becaussOptions"
                          :key="index"
                          :label="value"
                          :value="key">
                        </el-option>
                      </el-select>                      
              </el-form-item>
              <el-form-item label="备注:" prop='beizhu'>
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="Orderform.beizhu"
                    style="width:80%;"
                    >
                  </el-input>	                    
              </el-form-item>              

            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large" :disabled="timeSaveFlag"  @click="submitOrder('Orderform')">确定</button>
              <button class="button-cancel"  @click="unOrder('Orderform')">取 消</button>
            </div>
        </el-dialog> -->
        <!--取消订单弹窗结束--> 
        <!--退款详情弹窗开始-->
        <!-- <el-dialog
          title="退款"
          :visible.sync="orderRefundFlag"
          :close-on-click-modal="false"
          class="selfDialogWidth1"
          >
            <div class="selfTableWrapONE1">
              <div  >
                  <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" >
                      <el-form-item prop="refundId">
                          <div class="table-d1">
                            <table  class="selfTable">
                                <tr class="tableHeader">
                                  <td  class="selfTableHEADTD" align="center" width="73px">选择</td>
                                  <td  class="selfTableHEADTD" align="center" width="206px">商品名称</td>
                                  <td  class="selfTableHEADTD" align="center" width="131px">交易单价</td>
                                  <td  class="selfTableHEADTD" align="center" width="103px">数量</td>
                                  <td  class="selfTableHEADTD" align="center" width="111px">单位</td>							
                                </tr>
                                <div class="orderinfoTechTablePadding">
                                    <tr v-for="item in ruleForm.orderRefundObj" :key="item.goodsId"  ref="tableItem1" class="selfTdStyle2">
                                      <td width="72px"   align="center"><el-checkbox  @change="rowChange(item)" v-model="item.goodsChecked" ></el-checkbox></td>
                                      <td width="206px" align="center"><el-tooltip placement="left" v-if="item.goodsName != undefined" :disabled="item.goodsName.length < 15" :content="item.goodsName"><div :class=" item.goodsName.length < 15 ? '' : 'selfComdityNameStyle' ">{{item.goodsName}}</div></el-tooltip></td>
                                      <td width="132px"  align="center">￥{{item.payPrice}}</td>
                                      <td  width="102px" align="center">{{item.goodsNum}}</td>
                                      <td width="110px"  align="center">{{item.goodsUnit}}</td>							
                                    </tr>
                                </div>
                            </table>
                            <el-input type="hidden" value='' v-model='ruleForm.refundId'></el-input> 
                          </div>                                                 
                      </el-form-item>
                     <el-form-item label="支付总额:" prop="payPrice" style="margin-top:-50px;">￥{{ruleForm.payPrice | keepTwoNum}}</el-form-item>
                     <el-form-item label="支付方式:" prop="payMethod" style="margin-top:-22px;"><span>{{ruleForm.payMethod}}</span></el-form-item>
                     <el-form-item label="退款方式:" prop="refundMethod" style="margin-top:-22px;"><span v-if="ruleForm.refundMethod == 'cash'">现金</span></el-form-item> 
                     <el-form-item label="退款金额:" prop="refundAccount" style="margin-top:-22px;">￥{{ruleForm.refundAccount | keepTwoNum }}</el-form-item>
                      <el-form-item label="退款差额:" prop="refundDifference" style="margin-top:-22px;">
                        <el-input v-model="ruleForm.refundDifference" placeholder="0" class="search searchHeader">
                            <el-select  v-model="refundDifferenceType" clearable placeholder="请选择"  slot="prepend" @change="ChangerefundType">
                              <el-option v-for="(value,key,index) in choose" :key="index" :label="value" :value="key">
                              </el-option>
                            </el-select>
                        </el-input>                           
                      </el-form-item>
                      <p class="refundStatusStyle" v-if="ruleForm.orderNowRefundStatus != ''">{{ruleForm.orderNowRefundStatus}}</p>
                      <el-form-item label="退款原因:" prop="refundReason" style="margin-top:10px;">
                          <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="ruleForm.refundReason"
                            style="width:380px;"
                            >
                          </el-input>	
                      </el-form-item>
                  </el-form>
              </div>
            </div>                     
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large" :disabled="timeSaveFlag"  @click="orderRefundOk('ruleForm')">退款</button>
              <button class="button-cancel"  @click="orderRefundCancel">取 消</button>
            </div>
        </el-dialog> -->
        <!--退款详情弹窗结束--> 
        <!--更换技师弹窗开始-->
        <el-dialog
          title="技师选择"
          :visible.sync="changeTechFlag"
          :close-on-click-modal="false"
          class="selfDialogWidth1"
          >
          <div class="selfPromInfStyle1"> 
            <input type="button"   class="button-cancel height25" style="float:right;margin-right: 16px;" v-if="otherInfo.orderType =='group_split_no'  && techdisStatus.hide =='no'"  @click="gaiPai('add','')"  value="增加技师">
          </div>
            <el-table
              :data="tableData1"
              border                  
              class="orderInfoHeaderPic">
              <el-table-column
                align="center"
                label="头像"
                >
                <template scope="scope">
                <img class="picHeader" :src="imgSrc+scope.row.headPic+picWidth60"/>
                </template>
              </el-table-column>
              <el-table-column
                min-width="150"
                align="center"
                label="姓名"
                prop="techName"
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
                min-width="65"
                label="岗位性质">
                  <template scope="scope">
                      <span v-if="scope.row.jobNature =='full_time'">全职</span>
                      <span v-if="scope.row.jobNature =='part_time'">兼职</span>
                  </template>	                    
              </el-table-column>                                
              <el-table-column
                align="center"
                label="操作">
                  <template scope="scope">
                        <div style="cursor:pointer;color:#4c70e8" v-if="techdisStatus.hide =='no'"  @click="gaiPai('edit',scope.row)">改派</div>
                  </template>                    
              </el-table-column>                  
            </el-table>                     
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-cancel"   @click="changeTechOk()">关闭</button>
            </div>
        </el-dialog>
        <!--更换技师弹窗结束-->
        <!--设置固定服务时间弹窗开始-->
        <el-dialog
          title="设置固定服务时间"
          :visible.sync="testFlag"
          class="selfDialogWidth2"
          :close-on-click-modal="false"
          >
            <el-form  :model="Orderform1" :rules="orderrules1" ref="Orderform1" label-width="84px" label-position="left" >
                <el-form-item label="预约个数：" class="selfPaddingLeft20" style="margin-top: -22px;">
                  <span class="selfLabelStyle">*</span>
                  <input-num class="selfINputNumStyle"  v-model="severHour" :min='1'   :max="testMax" style="width:120px;" @change="numberChange"></input-num>
                   <div style="font-size: 12px;color:#8391a0d9">* 单次建议服务时长为{{copyserviceHour}}小时；总服务时长为{{copyserviceHour*100*severHour/100}}小时（预约个数 * 单次建议服务时长）且总服务时长不能大于6小时！ </div>
                </el-form-item>
                <el-form-item label="" class="selfPaddingLeft20" style="margin-top: -22px;">              
                   <div class="button-large-fourth" @click="searchSeverDate">查询服务日期</div> 
                </el-form-item>
                <div v-if="severFrequencyFlag" class="PositionRelative">
                    <div class="exptyDiv"></div>
                    <el-form-item label="服务频次：" prop="testsele" class="selfPaddingLeft20" style="padding-top:20px;"> 
                        <input type="hidden"   v-model="Orderform1.testsele"/>                       
                        <div   v-for="(value,key,index) in frequencyOptions"  :label="value" :name='key' :key="index"  @click="Changefrequency(key,index)">
                          <div class="frequencyTabs" :class="freStyl == index ? 'activeStyle' :'' ">
                                {{value}}
                          </div>
                        </div> 
                    </el-form-item>
                    <el-form-item style="margin-top: -15px;">
                      <div style="font-size: 12px;color: #576475;float:left;padding-left: 20px;" v-if="gudingStatus == 'edit'">                                           
                        <span  style="display:inline-block;width: 612px;line-height: 18px;color:#8391a0d9">
                          <span style="display:inline-block;float: left;">
                              <span>*目前固定服务时间：</span>
                              <span style="width:80px;">
                                <span v-if="otherInfo.serviceFrequency =='week_one'">1周1次</span>
                                <span v-if="otherInfo.serviceFrequency =='week_some'">1周多次</span>
                                <span v-if="otherInfo.serviceFrequency =='two_week_one'">2周1次</span>
                              </span>
                              <span style="width:80px;">每次{{otherInfo.copyserviceHour1}}</span>
                          </span>
                          <span style="margin-left:20px;">
                            <span v-for="(item,index) in otherInfo.freList" :key="item.id">
                              <span>                              
                                <span v-if="item.week =='1'">每周一</span>
                                <span v-if="item.week =='2'">每周二</span>
                                <span v-if="item.week =='3'">每周三</span>
                                <span v-if="item.week =='4'">每周四</span>
                                <span v-if="item.week =='5'">每周五</span>
                                <span v-if="item.week =='6'">每周六</span>
                                <span v-if="item.week =='7'">每周日</span>
                              </span>
                              <span style="margin-left:10px;">{{item.timeArea}}</span>
                              <span v-if="index != otherInfo.freList.length-1">、</span>
                            </span>
                          </span>
                        </span>
                      </div>                                                                                          
                    </el-form-item>                                                      
                    <el-form-item  label="服务时间：" prop="workTimes" class="selfPaddingLeft20" style="margin-top: -20px;">
                          <div class="tech-order-jn" style="width:550px">
                            <span class="tech-order-btn" @click="addtime"> &#10010;请选择服务时间段</span>
                          </div>
                            <el-collapse-transition>                            
                                <div class="tech-order-jn-sons wirkTimes" v-show="isB">
                                  <div style="margin:0 10px;">
                                    <p style="padding:10px 0;">新增日期</p>
                                    <div>
                                      <div style="display:flex;">
                                        <div class="selfCheckBoxsday">日期</div>
                                        <input type="button" class="selfCheckBoxs tech-order-posis"                                         
                                          @click="roomSel2(item,index)" :key="index" v-for="(item,index) in sexDay" 
                                          :class="freStyl1 == index ? 'tech-green' :''"
                                          :value="item.name"
                                        >
                                      </div>
                                    </div>
                                    <div style="margin-top:10px;">
                                      <div class="selfCheckBoxsday">时段</div>
                                      <el-select v-model="timeArea" style="width:231px;"  placeholder="请选择时间段">
                                        <el-option
                                          v-for="item in timeAreaoptions"
                                          :key="item.key"
                                          :label="item.value"
                                          :value="item.value">
                                        </el-option>
                                      </el-select> 
                                    </div>
                                  </div>
                                  <div style="margin:10px 10px 10px;">
                                    <span class="button-large btn-styl" @click="singletechClick">确认</span>
                                    <input type="button" class="button-cancel btn-styl" style="margin-left:20px" @click="singleaddtimeno" value="取消">
                                  </div>
                                </div>                                                        
                            </el-collapse-transition>                          
                          </el-form-item>
                          <div v-show="listShowFlag">
                              <el-form-item class="selfPaddingLeft20">
                                <ul class="working1" style="width:550px;margin-top: -21px;">
                                  <li v-for="item in teachArr" :key="item.id">
                                    <div>
                                      <div class="selfwoking-div">
                                        <div >
                                          <span v-if="item.week =='1'">星期一</span>
                                          <span v-if="item.week =='2'">星期二</span>
                                          <span v-if="item.week =='3'">星期三</span>
                                          <span v-if="item.week =='4'">星期四</span>
                                          <span v-if="item.week =='5'">星期五</span>
                                          <span v-if="item.week =='6'">星期六</span>
                                          <span v-if="item.week =='7'">星期日</span>
                                        </div>
                                        <div class="selftime">{{item.timeArea}}</div>
                                      </div>
                                    </div>
                                    <div>
                                      <i class="i-delete1 el-icon-close" @click="singledeletes(item)"></i>
                                    </div>
                                  </li>
                                </ul>
                                <div class="severPromitINf" style="padding-left: 20px;color:red;">* 三周后的订单将按照更换后的固定时间分配</div>
                              </el-form-item>                    
                          </div>
                          <el-form-item v-if="gudingStatus != 'edit'" label="选择日期" prop='Date' class="selfPaddingLeft20">
                                  <span class="selfLabelStyle">*</span>
                                  <el-select v-model="Orderform1.Date" style="width:550px;"  @visible-change='dateChange1' placeholder="请选择第一次上门服务日期">
                                    <el-option
                                      v-for="item in options3"
                                      :key="item.key"
                                      :label="item.value"
                                      :value="item.key">
                                    </el-option>
                                  </el-select>                      
                          </el-form-item>
                          <el-form-item label="" style="padding-left: 20px;">              
                          <div class="button-large-fourth"  @click="searchSeverTech">查询服务技师</div> 
                          </el-form-item>
                </div>
                                
              <div  v-if="gudingFlag" class="PositionRelative">
                <div style="width:100%;height:20px;line-height:20px;background:#eef1f6;position:absolute;top:-36px;"></div>
                <div style="margin-left:80px;font-size:12px;padding-left:20px;margin-top:50px;color:#8391a0d9">
                    <p v-if="otherInfo.tech != undefined">* 更换固定服务时间，可能会影响固定技师； <span  >目前该订单的固定技师为：<span >{{otherInfo.tech.name}}</span><span  style="padding-left:20px;">{{otherInfo.tech.phone}}</span></span></p>
                </div>               
                <el-form-item label="选择技师" prop="Tech" class="selfPaddingLeft20">             
                  <div style="margin-top: -10px;">                
                      <el-table
                        :data="tableData3"
                        border                  
                        class="orderInfoHeaderPic">
                        <el-table-column
                          min-width="65"
                          align="center"
                          label="选择"                        
                          > 
                            <template scope="scope">
                              <el-radio :label="scope.row.techId" v-model="radio4" @change.native="getCurrentRow4(scope.row.techId)">&nbsp;</el-radio>
                            </template>                                               
                        </el-table-column>                      
                        <el-table-column
                          min-width="90"
                          align="center"
                          label="头像"
                          >
                          <template scope="scope">
                          <img class="picHeader" :src="imgSrc+scope.row.headPic+picWidth60"/>
                          </template>
                        </el-table-column>
                        <el-table-column
                          align="center"
                          label="姓名"
                          min-width="150"
                          >
                            <template scope="rowObj">
                              <el-tooltip placement="left" v-if="rowObj.row.techName!= undefined" :disabled="rowObj.row.techName.length < 10" :content="rowObj.row.techName">
                                <p :class=" rowObj.row.techName.length < 10 ? '' : 'selfToolTip1' ">{{rowObj.row.techName}}</p>
                              </el-tooltip>
                            </template>                                                
                        </el-table-column>
                        <el-table-column
                          min-width="65"
                          align="center"
                          label="性别">
                            <template scope="scope">
                                <span v-if="scope.row.techSex =='male'">男</span>
                              <span v-if="scope.row.techSex =='female'">女</span>
                            </template>	                    
                        </el-table-column>
                        <el-table-column
                          prop="techPhone"
                          min-width="94"
                          align="center"
                          label="手机号">
                        </el-table-column>                                  
                      </el-table>
                  </div>  
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large"  :disabled="setOkFlag" @click="setOk('Orderform1')">确定</button>
              <button class="button-cancel" @click="setCancel('Orderform1')" >取 消</button>
            </div>
        </el-dialog>
        <!--设置固定服务时间弹窗结束-->
        <!--更换固定服务时间弹窗开始-->
        <el-dialog
          title="更换固定服务时间"
          :visible.sync="gehuantestFlag"
          class="selfDialogWidth2"
          :close-on-click-modal="false"
          >
            <el-form  :model="gehuanOrderform" :rules="gehuanorderrules" ref="gehuanOrderform" label-width="84px" label-position="left" >
                <el-form-item label="预约个数：" class="selfPaddingLeft20" style="margin-top: -22px;">
                  <span class="selfLabelStyle">*</span>
                  <input-num class="selfINputNumStyle"  v-model="gehuanseverHour" :min='1' :debounce='1000'  :max="999" style="width:120px;" @change="gehuannumberChange"></input-num>
                   <div style="font-size: 12px;color:#8391a0d9;">* 单次建议服务时长为{{copyserviceHour}}小时；总服务时长为{{copyserviceHour*100*gehuanseverHour/100}}小时（预约个数 * 单次建议服务时长） </div>
                </el-form-item>
                <el-form-item label="" class="selfPaddingLeft20" style="margin-top: -22px;">              
                   <div class="button-large-fourth" @click="gehuansearchSeverDate">查询服务日期</div> 
                </el-form-item>
                <div v-if="gehuanseverFrequencyFlag" class="PositionRelative">
                    <div class="exptyDiv"></div>
                    <el-form-item label="服务频次：" prop="testsele" class="selfPaddingLeft20" style="padding-top:20px;"> 
                        <input type="hidden"   v-model="gehuanOrderform.testsele"/>                       
                        <div   v-for="(value,key,index) in gehuanfrequencyOptions"  :label="value" :name='key' :key="index"  @click="gehuanChangefrequency(key,index)">
                          <div class="frequencyTabs" :class="freStyl == index ? 'activeStyle' :'' ">
                                {{value}}
                          </div>
                        </div> 
                    </el-form-item>
                    <el-form-item style="margin-top: -15px;">
                      <div style="font-size: 12px;color: #576475;float:left;padding-left: 20px;">                                           
                        <span  style="display:inline-block;width: 612px;line-height: 18px;color:#8391a0d9">
                          <span style="display:inline-block;float: left;">
                              <span>*目前固定服务时间：</span>
                              <span style="width:80px;">
                                <span v-if="otherInfo.serviceFrequency =='week_one'">1周1次</span>
                                <span v-if="otherInfo.serviceFrequency =='week_some'">1周多次</span>
                                <span v-if="otherInfo.serviceFrequency =='two_week_one'">2周1次</span>
                              </span>
                              <span style="width:80px;">每次{{otherInfo.copyserviceHour1}}</span>
                          </span>
                          <span style="margin-left:20px;">
                            <span v-for="item in otherInfo.freList" :key="item.id">
                              <span>                              
                                <span v-if="item.week =='1'">每周一</span>
                                <span v-if="item.week =='2'">每周二</span>
                                <span v-if="item.week =='3'">每周三</span>
                                <span v-if="item.week =='4'">每周四</span>
                                <span v-if="item.week =='5'">每周五</span>
                                <span v-if="item.week =='6'">每周六</span>
                                <span v-if="item.week =='7'">每周日</span>
                              </span>
                              <span style="margin-left:10px;">{{item.timeArea}}</span>、
                            </span>
                          </span>
                        </span>
                      </div>                                                                                          
                    </el-form-item>                                                      
                    <el-form-item  label="服务时间：" prop="workTimes" class="selfPaddingLeft20" style="margin-top: -20px;">
                          <div class="tech-order-jn" style="width:550px">
                            <span class="tech-order-btn" @click="gehuanaddtime"> &#10010;请选择服务时间段</span>
                          </div>
                            <el-collapse-transition>                            
                                <div class="tech-order-jn-sons wirkTimes" v-show="gehuanisB">
                                  <div style="margin:0 10px;">
                                    <p style="padding:10px 0;">新增日期</p>
                                    <div>
                                      <div style="display:flex;">
                                        <div class="selfCheckBoxsday">日期</div>
                                        <input type="button" class="selfCheckBoxs tech-order-posis"                                         
                                          @click="gehuanroomSel2(item,index)" :key="index" v-for="(item,index) in sexDay" 
                                          :class="freStyl1 == index ? 'tech-green' :''"
                                          :value="item.name"
                                        >
                                      </div>
                                    </div>
                                    <div style="margin-top:10px;">
                                      <div class="selfCheckBoxsday">时段</div>
                                      <el-select v-model="gehuantimeArea" style="width:231px;"  placeholder="请选择时间段">
                                        <el-option
                                          v-for="item in gehuantimeAreaoptions"
                                          :key="item.key"
                                          :label="item.value"
                                          :value="item.value">
                                        </el-option>
                                      </el-select> 
                                    </div>
                                  </div>
                                  <div style="margin:10px 10px 10px;">
                                    <span class="button-large btn-styl" @click="gehuansingletechClick">确认</span>
                                    <input type="button" class="button-cancel btn-styl" style="margin-left:20px" @click="gehuansingleaddtimeno" value="取消">
                                  </div>
                                </div>                                                        
                            </el-collapse-transition>                          
                          </el-form-item>
                          <div v-show="gehuanlistShowFlag">
                              <el-form-item class="selfPaddingLeft20">
                                <ul class="working1" style="width:550px;margin-top: -21px;">
                                  <li v-for="item in gehuanteachArr" :key="item.id">
                                    <div>
                                      <div class="selfwoking-div">
                                        <div >
                                          <span v-if="item.week =='1'">星期一</span>
                                          <span v-if="item.week =='2'">星期二</span>
                                          <span v-if="item.week =='3'">星期三</span>
                                          <span v-if="item.week =='4'">星期四</span>
                                          <span v-if="item.week =='5'">星期五</span>
                                          <span v-if="item.week =='6'">星期六</span>
                                          <span v-if="item.week =='7'">星期日</span>
                                        </div>
                                        <div class="selftime">{{item.timeArea}}</div>
                                      </div>
                                    </div>
                                    <div>
                                      <i class="i-delete1 el-icon-close" @click="gehuansingledeletes(item)"></i>
                                    </div>
                                  </li>
                                </ul>
                                <div class="severPromitINf" style="padding-left: 20px;color:#8391a0d9">* 两周后的订单将按照更换后的固定时间分配</div>
                              </el-form-item>                    
                          </div>
                          <el-form-item label="选择日期" prop='Date' class="selfPaddingLeft20">
                                  <el-select v-model="gehuanOrderform.Date" style="width:550px;"  @visible-change='gehuandateChange1' @change='testChangea' placeholder="请选择第一次上门服务日期">
                                    <el-option
                                      v-for="item in gehuanoptions3"
                                      :key="item.key"
                                      :label="item.value"
                                      :value="item.key">
                                    </el-option>
                                  </el-select>                      
                          </el-form-item>
                          <el-form-item label="" style="padding-left: 20px;">              
                          <div class="button-large-fourth"  @click="gehuansearchSeverTech">查询服务技师</div> 
                          </el-form-item>
                </div>
                                
              <div  v-if="gehuangudingFlag" class="PositionRelative">
                <div style="width:100%;height:20px;line-height:20px;background:#eef1f6;position:absolute;top:-36px;"></div>
                <div style="margin-left:80px;font-size:12px;padding-left:20px;margin-top:50px;color:#8391a0d9">
                    <p>* 更换固定服务时间，可能会影响固定技师； 目前该订单的固定技师为：<span>{{otherInfo.tech.name}}</span><span style="padding-left:20px;">{{otherInfo.tech.phone}}</span></p>
                </div>               
                <el-form-item label="选择技师" prop="Tech" class="selfPaddingLeft20">             
                  <div style="margin-top: -10px;">                
                      <el-table
                        :data="gehuantableData3"
                        border                  
                        class="orderInfoHeaderPic">
                        <el-table-column
                          min-width="65"
                          align="center"
                          label="选择"                        
                          > 
                            <template scope="scope">
                              <el-radio :label="scope.row.techId" v-model="gehuanradio4" @change.native="gehuangetCurrentRow4(scope.row.techId)">&nbsp;</el-radio>
                            </template>                                               
                        </el-table-column>                      
                        <el-table-column
                          min-width="90"
                          align="center"
                          label="头像"
                          >
                          <template scope="scope">
                          <img class="picHeader" :src="imgSrc+scope.row.headPic+picWidth60"/>
                          </template>
                        </el-table-column>
                        <el-table-column
                          align="center"
                          label="姓名"
                          min-width="150"
                          >
                            <template scope="rowObj">
                              <el-tooltip placement="left" v-if="rowObj.row.techName!= undefined" :disabled="rowObj.row.techName.length < 10" :content="rowObj.row.techName">
                                <p :class=" rowObj.row.techName.length < 10 ? '' : 'selfToolTip1' ">{{rowObj.row.techName}}</p>
                              </el-tooltip>
                            </template>                                                
                        </el-table-column>
                        <el-table-column
                          min-width="65"
                          align="center"
                          label="性别">
                            <template scope="scope">
                                <span v-if="scope.row.techSex =='male'">男</span>
                              <span v-if="scope.row.techSex =='female'">女</span>
                            </template>	                    
                        </el-table-column>
                        <el-table-column
                          prop="techPhone"
                          min-width="94"
                          align="center"
                          label="手机号">
                        </el-table-column>                                  
                      </el-table>
                  </div>  
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large"   @click="gehuansetOk('gehuanOrderform')">确定</button>
              <button class="button-cancel" @click="gehuansetCancel('gehuanOrderform')" >取 消</button>
            </div>
        </el-dialog>                
        <!--更换固定服务时间弹窗结束-->
                                         
  </div>
</template>

<script>
import {
  getOrderInf1, //组合订单ID获取页面相关信息
  saveRegularDateDateList,// 组合订单设置固定时间查询服务时间
  saveRegularDateTechList,// 组合订单设置固定时间查询技师
  updateRegularDateDateList,// 组合订单更换固定时间查询服务时间
  updateRegularDateTechList,// 组合订单更换固定时间查询技师  
  saveRegularDate,// 组合订单设置固定时间总保存
  updateRegularDate,//组合订单更换固定时间总保存
  updateRegularTechTechList,//更换固定技师
  updateRegularTechSave,//更换固定技师保存
  formOrderRemark,//组合订单查看备注
  updateOrderTimeDateList,//已有订单更换时间按钮
  updateOrderTechInit,//已有订单更换技师按钮    参数 orderId
  updateOrderTechTechList,//已有订单增加 改派 技师列表    参数orderId，techName
  updateOrderTechAddSave,//已有订单增加保存按钮   参数 orderId，techIdList
  updateOrderTechDispatchSave,//已有订单改派保存按钮    参数orderId，techIdList，techId
  updateOrderTimeTechList,//更换服务时间中‘查询服务技师’  参数 一个是id  一个是serviceTime
  updateOrderTimeSave,//更换服务时间中'保存'
  subscribeDateList,//后台预约- 查询服务日期    serviceNum, masterId 
  subscribeTechList,//后台预约- 查询服务技师    serviceNum，masterId，serviceTime
  subscribeSave,//后台预约- 保存 serviceNum，masterId，serviceTime，techId
  orderCancelFun, //取消订单保存
  orderRefundInit, //退款
  orderRefundSave, //退款保存
} from "@/api/order";
import { orderServer } from "@/api/serviceManage";
import util from "@/utils/date";
import inputNum from "../../components/inputNum.vue";
var loading;
export default {
  name: "orderinfo",
  components:{inputNum },
  data() {
    //退款差价验证规则
    var checkChaE = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (!/^[0-9]+\.?[0-9]*/.test(value)) {
          callback(new Error("请输入整数或一至两位小数"));
        } else {
          if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(value)) {
            callback(new Error("请输入整数或一至两位小数"));
          } else {
            callback();
          }
        }
      }
    };
    //退款原因验证规则
    var checkrefundReason = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (value.length >= 0 && value.length <= 500) {
          callback();
        } else {
          callback(new Error("请输入500位以内的退款原因"));
        }
      }
    };
    //工作时间
    var WORKTIMES = (rule, value, callback) => {
      if (this.teachArr.length > 0 && this.teachArr != undefined) {
        callback();
      } else {
        callback(new Error("请选择服务时间"));
      }
    };
    //工作时间
    var WORKTIMES1 = (rule, value, callback) => {
      if (this.gehuanteachArr.length > 0 && this.gehuanteachArr != undefined) {
        callback();
      } else {
        callback(new Error("请选择服务时间"));
      }
    };    
    return {
      techObj:[],
      subOneId:'',//更换时间中的子订单第一条的Id
      subOneId1:'',
      otherInfo1:'',
      setOkFlag:false,//固定时间服务保存
      listShowFlag: false, //单选结果显示开关
      gehuanlistShowFlag: false, //单选结果显示开关
      weekNumber: "", //单选星期几
      gehuanweekNumber: "", //单选星期几
      timeArea: "", //单选时间段值
      timeAreaoptions: [], //单选时间段下拉对象
      gehuantimeArea: "", //单选时间段值
      gehuantimeAreaoptions: [], //单选时间段下拉对象      
      frequencyStatus: "week_some", //服务频次开关
      yuyuedialogVisible: false, //预约弹窗开关
      gudingFlag: false, //固定时间改派技师显示开关
      gehuangudingFlag: false, //固定时间改派技师显示开关
      severFrequencyFlag: false, //固定时间服务显示开关
      gehuanseverFrequencyFlag: false, //固定时间服务显示开关
      gudingFlag1: false, //更换时间改派技师显示开关
      gudingFlag11: false, //预约改派技师显示开关
      yuyueselectDateFlag: false, //预约日期选择开关
      severHour: "1",
      gehuanseverHour: "",
      yuyueNumber: "",
      frequencyOptions: "",
      gehuanfrequencyOptions: "",
      frequencySelecte: "",
      gehuanfrequencySelecte: "",
      addtimeFlag: true,
      //单选星期对象
      sexDay: [
        {
          name: "星期一",
          id: 1
        },
        {
          name: "星期二",
          id: 2
        },
        {
          name: "星期三",
          id: 3
        },
        {
          name: "星期四",
          id: 4
        },
        {
          name: "星期五",
          id: 5
        },
        {
          name: "星期六",
          id: 6
        },
        {
          name: "星期日",
          id: 7
        }
      ],
      testFlag: false,
      testMax:null,
      yuyueMax:null,
      gehuantestFlag:false,
      changeTechFlag: false,
      radio1: "",
      radio3: "",
      yuyueradio: "",
      radio4: "",
      gehuanradio4:'',
      listTech1: [],//更换固定技师弹窗中的表格数据对象
      techName1: "",
      radio: "",
      RemarkInfFlag: false,
      jumpUrl: "#",
      middleB: [],
      ruleForm: {
        refundId: "",
        refundDifference: "",
        orderNowRefundStatus: "",
        refundReason: "",
        refundAccount: 0,
        refundMethod: "cash",
        payMethod: "现金",
        payPrice: "",
        orderRefundObj: []
      },
      rules: {
        refundDifference: [{ validator: checkChaE, trigger: "blur" }],
        refundReason: [{ validator: checkrefundReason, trigger: "blur" }],
        refundId: [
          { required: true, message: "请选择退款商品", trigger: "change" }
        ]
      },
      choose: [],
      refundDifferenceType: "",
      dict: require("../../../static/dict.json"),
      becaussOptions: [],
      cancelOrderFlag: false,
      orderRefundFlag: false,
      options2: [],
      options21: [],
      options3: [],
      gehuanoptions3: [],
      btnShow: [],
      timeSaveFlag: false,
      yuyuetimeSaveFlag1: false,
      techSaveFlag1: false,
      techSaveFlag: false,
      pickerOptions0: {
        disabledDate(time) {
          if (
            time.getTime() > Date.now() - 8.64e7 &&
            time.getTime() < Date.now() + 8.64e7 * 14
          ) {
            return false;
          } else {
            return true;
          }
        }
      },
      Orderform: {
        becouss: "",
        beizhu: ""
      },
      Orderform1: {
        workTimes: "",
        testsele: "",
        severHour: "",
        Date: "",
        Tech: ""
      },
      orderrules1: {
        testsele: [
          { required: true, message: "请选择服务频次", trigger: "change" }
        ],
        workTimes: [
          { required: true,validator:WORKTIMES , trigger: "blur" }
        ],
        // Date: [{ required: true, message: "请选择日期", trigger: "change" }],
        Tech: [{ required: true, message: "请选择技师", trigger: "change" }]
      },
      gehuanOrderform: {
        workTimes: "",
        testsele: "",
        severHour: "",
        Date: "",
        Tech: ""
      },
      gehuanorderrules: {
        testsele: [
          { required: true, message: "请选择服务频次", trigger: "change" }
        ],
        workTimes: [
          { required: true,validator:WORKTIMES1 , trigger: "blur" }
        ],
        Date: [{ required: true, message: "请选择日期", trigger: "change" }],
        Tech: [{ required: true, message: "请选择技师", trigger: "change" }]
      },      
      orderrules: {
        becouss: [
          { required: true, message: "请选择取消原因", trigger: "change" }
        ],
        beizhu: [
          { min: 0, max: 100, message: "长度在0-100个字符", trigger: "blur" }
        ]
      },
      formInline1rules: {
        Date: [
          { required: true, message: "请选择服务日期", trigger: "change" }
        ],
        // Time: [
        //   { required: true, message: "请选择服务时间", trigger: "change" }
        // ],
        Tech: [{ required: true, message: "请选择技师", trigger: "change" }]
      },
      yuyueformInline1rules: {
        // Date: [
        //   { required: true, message: "请选择服务日期", trigger: "change" }
        // ],
        // Time: [
        //   { required: true, message: "请选择服务时间", trigger: "change" }
        // ],
        Tech: [{ required: true, message: "请选择技师", trigger: "change" }]
      },
      timeObj: [], //时间对象
      yuyuetimeObj: [], //预约时间对象
      addressInfo: [], //服务地址信息
      otherInfo: [],
      payInfo: [], //支付信息
      refundInfo: [], //退款信息
      goodsInfo: [], //服务信息
      options: [],
      techName: "",
      isB: false, //单选星期与时段显示开关
      gehuanisB: false, //单选星期与时段显示开关
      techStationId: "",
      promShow1: false,
      promInf1: "搜索内容不存在!",
      listTech: [],
      selectCommidty: [],
      select: "date",
      formInline: {
        Date: "",
        Time: "",
        Tech: ""
      },
      yuyueformInline: {
        Date: "",
        Time: "",
        Tech: "",
        severHour: ""
      },
      value1: "",
      value2: "",
      tabOptions: [],
      dialogTableVisible: false,
      dialogTableVisible1: false,
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3:[],//固定时间中表格数据
      gehuantableData3:[],//固定时间中表格数据
      yuyuetableData: [],
      ordertableData:[],//已有订单表格数据
      dialogVisible: false,
      middleA: [],
      changTime: "",
      yuyuechangTime:'',
      status: "add",
      aa: "",
      orderId: "",
      nowTime: "",
      addressInf: [],
      roomSel1Arr: {},//固定时间星期选择时的存储对象的容器
      gehuanroomSel1Arr: {},//固定时间星期选择时的存储对象的容器
      teachArr: [],//固定时间服务时间选择确定后时的存储对象的容器
      gehuanteachArr: [],//固定时间服务时间选择确定后时的存储对象的容器
      roomSelNum: [],//固定时间星期选择时的存储星期id的容器
      gehuanroomSelNum: [],//固定时间星期选择时的存储星期id的容器
      workTimes: [], //工作时间
      freStyl: "4",
      freStyl1: "8",
      tishi:'',//固定时间总服务时间提示信息中
      tishiTime1:'',//预约总服务时间提示信息中
      copyserviceHour:'',//单次服务时间
      copyserviceHour1:'',//单次服务时间格式转换后的
      yuyuegeshu:'',//返回预约个数
      gudingStatus:'',
      techArrtest:[],
      fanHuiseverArr:[],//固定服务时间中返回服务时间对象
      dateOptionsList:[],//固定服务时间中返回第一次服务时间下拉对象
      gehuanfanHuiseverArr:[],//固定服务时间中返回服务时间对象
      gehuandateOptionsList:[],//固定服务时间中返回第一次服务时间下拉对象 
      techdisStatus:[],//技师改派与新增的标志     
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("btn"))) {
      this.btnShow = JSON.parse(localStorage.getItem("btn"));
    }
  },
  filters: {
    keepTwoNum: function(val) {
      val = Number(val);
      return val.toFixed(2);
    }
  },
  methods: {
    renderHeader1 (h) {
      return [h('p', {style:'font-size:14px;text-align:right;'}, ['操'])]
    },
    renderHeader2 (h) {
      return [h('p', {style:'font-size:14px;text-align:left;'}, ['作'])]
    },
    /*设置固定服务时间相关操作开始 */
        //设置固定服务时间按钮
        changeguTime(status) {
          this.gudingStatus=status;//是新增还是修改
          if(this.gudingStatus =='edit'){
            this.Orderform1.Date=this.otherInfo.serviceStart
          }else{
             this.Orderform1.Date=''
          }          
          this.freStyl = "4";
          this.freStyl1 = "8";
          if(6/this.copyserviceHour < this.otherInfo.surplusNum){
             this.testMax=Math.floor(6/this.copyserviceHour);//向下取整
          }else{
             this.testMax=this.otherInfo.surplusNum;
          }         
          this.isB=false;
          this.severFrequencyFlag=false;
          this.timeArea = "";
          this.timeAreaoptions = [];
          this.gudingFlag = false;
          this.testFlag = true;
          this.Orderform1.testsele = "";
          this.radio4 = "";           
          this.teachArr = [];
          this.Orderform1.severHour = "1";
          this.severHour = "1";              
        },
        //设置固定服务时间查询服务技师按钮
        searchSeverTech() {
          //未选择服务频次
          if(this.Orderform1.testsele == ''){
            this.$message({
              type: "error",
              message: "请选择服务频次！"
            });
            return false;
          }        
          //未选择服务时间      
          if(this.teachArr.length == 0){
            this.$message({
              type: "error",
              message: "请选择服务时间！"
            });
            return false;
          } 
          //未选择第一次服务日期
          if(this.gudingStatus == 'add'){
              if(this.Orderform1.Date == ''){
                this.$message({
                  type: "error",
                  message: "请选择第一次上门服务日期！"
                });
                return false;
              }  
          }  
          this.tableData3=[]
          this.radio4 = "";
          var obj1 = {
            serviceNum:this.severHour,
            masterId:this.orderId,
            freList:this.teachArr,
            serviceStart:this.Orderform1.Date,
            serviceFrequency:this.Orderform1.testsele,
          };
          if(this.gudingStatus =='edit'){
              updateRegularDateTechList(obj1)
                .then(res => {
                  if (res.data.code === 1) {                 
                    this.gudingFlag = true;
                    //技师表格数据
                    this.tableData3 = res.data.data; 
                  }
                })
                .catch(res => {});             

          }else{
            saveRegularDateTechList(obj1)
              .then(res => {
                if (res.data.code === 1) {                 
                  this.gudingFlag = true;
                  //技师表格数据
                  this.tableData3 = res.data.data; 
                }
              })
              .catch(res => {}); 
          }
     

        },
        //设置固定服务时间查询服务日期按钮
        searchSeverDate() { 
          this.freStyl = "4";
          this.radio4 = ""; 
          this.freStyl1 = "8";
          this.timeArea = "";
          this.timeAreaoptions = [];
          this.Orderform1.testsele='';
          this.teachArr=[];       
          this.listShowFlag=false;
          this.isB = false;
          this.fanHuiseverArr=[];
          this.dateOptionsList=[];
          if(this.gudingStatus =='edit'){
              var obj2 = {
                masterId:this.orderId,
                serviceNum:this.severHour
              };
              updateRegularDateDateList(obj2)
                .then(res => {
                  if (res.data.code === 1) {
                    this.fanHuiseverArr=res.data.data.weekList;
                    this.dateOptionsList=res.data.data.dateList
                  }
                })
                .catch(res => {});            
          }else{
            var obj1 = {
              masterId:this.orderId,
              serviceNum:this.severHour
            };
            saveRegularDateDateList(obj1)
              .then(res => {
                if (res.data.code === 1) {
                  this.fanHuiseverArr=res.data.data.weekList;
                  this.dateOptionsList=res.data.data.dateList
                }
              })
              .catch(res => {});
          }     
               
          this.severFrequencyFlag = true;     
        },
        //设置固定服务时间预约个数改变
        numberChange(val) {
          this.freStyl = "4";
          this.radio4 = "";
          if(this.gudingStatus =='edit'){
            this.Orderform1.Date=this.serviceStart
          }else{
             this.Orderform1.Date=''
          }          
          this.severFrequencyFlag = false;
          this.gudingFlag = false;           
          this.Orderform1.severHour = val;
        },    
        //设置固定服务时间服务频次更换
        Changefrequency(key, index) {
          this.frequencySelecte = key;
          this.listShowFlag=false;//隐藏时间选择结果
          this.freStyl = index;
          this.Orderform1.testsele = key;
          if(this.gudingStatus =='edit'){
            this.Orderform1.Date=this.serviceStart
          }else{
             this.Orderform1.Date=''
          } 
          this.freStyl1 = "8";
          this.timeArea = "";
          this.timeAreaoptions = []; 
          this.isB=false;//新增日期部分关闭         
          this.teachArr = [];
          this.tableData3=[];//技师表格清空
          this.radio4='';//技师表格选择会值清空
          this.gudingFlag=false; //技师部分关闭           
        },
        //设置固定服务时间取消
        setCancel(formName) {
          this.freStyl = "4";
          this.freStyl1 = "8";
          this.timeArea = "";
          this.timeAreaoptions = [];
          this.gudingFlag = false;
          this.$refs[formName].resetFields();           
          this.testFlag = false;
        },
        //设置固定服务时间保存
        setOk(formName) {
          //未查询服务日期
          if(this.Orderform1.testsele == '' && this.severFrequencyFlag == false){
            this.$message({
              type: "error",
              message: "请查询服务日期！"
            });
            return false;
          }
          //未选择服务频次
          if(this.Orderform1.testsele == '' && this.severFrequencyFlag == true){
            this.$message({
              type: "error",
              message: "请选择服务频次！"
            });
            return false;
          }               
          //未选择服务时间      
          if(this.teachArr.length == 0){
            this.$message({
              type: "error",
              message: "请选择服务时间！"
            });
            return false;
          } 
          if(this.gudingStatus == 'add'){
              if(this.Orderform1.Date == ''){
                this.$message({
                  type: "error",
                  message: "请选择第一次上门服务日期！"
                });
                return false;
              }
              //未选择第一次服务日期
              if(this.Orderform1.Date != '' && this.gudingFlag == false){
                this.$message({
                  type: "error",
                  message: "请查询服务技师！"
                });
                return false;
              }              

          } 
          if(this.radio4 =='' && this.gudingFlag == false){
                this.$message({
                  type: "error",
                  message: "请查询技师！"
                });
                return false;            
          }  
          if(this.radio4 =='' && this.gudingFlag == true){
                this.$message({
                  type: "error",
                  message: "请选择技师！"
                });
                return false;            
          }                   
          this.$refs[formName].validate(val => {
            if (val) {
              this.Orderform1.workTimes = this.teachArr;
                if(this.gudingStatus == 'add'){
                    this.setOkFlag=true;
                    var obj1 = {
                      masterId:this.orderId,
                      serviceNum:this.severHour,
                      freList:this.teachArr,
                      serviceFrequency:this.Orderform1.testsele,
                      serviceStart:this.Orderform1.Date,
                      techId:this.radio4            
                    };
                    saveRegularDate(obj1)
                      .then(res => {
                        this.setOkFlag=false;
                        if (res.data.code === 1) {
                          this.$message({
                            type: "success",
                            message: "设置固定服务时间成功！"
                          });
                          this.getOrderAllInf(this.orderId);                  
                          this.testFlag = false;
                          this.$refs[formName].resetFields();
                           
                        }
                      })
                      .catch(res => {
                        this.setOkFlag=false;
                      });                   

                }else{
                  this.setOkFlag=true;
                  var obj1 = {
                    masterId:this.orderId,
                    serviceNum:this.severHour,
                    freList:this.teachArr,
                    serviceFrequency:this.Orderform1.testsele,
                    serviceStart:this.Orderform1.Date,
                    techId:this.radio4            
                  };
                  updateRegularDate(obj1)
                    .then(res => {
                      this.setOkFlag=false;
                      if (res.data.code === 1) {
                        this.$message({
                          type: "success",
                          message: "设置固定服务时间成功！"
                        });
                        this.getOrderAllInf(this.orderId);                   
                        this.testFlag = false;
                        this.$refs[formName].resetFields();
                        
                      }
                    })
                    .catch(res => {
                      this.setOkFlag=false;
                    });                   

                }
                    
            }else{
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

        //设置固定服务时间服务时间段中星期几选择
        roomSel2(item, index) {
          this.creatIs = 'yes'
          this.timeArea = "";
          this.weekNumber = item.name;
          this.freStyl1 = index;
          this.roomSelNum.push(item.id); //存储星期的ID
          this.roomSel1Arr = Object.assign({}, item); //存储星期的对象
          this.timeAreaoptions=[];
          //星期几的id在对象中遍历得到下拉日期数据
          for(var b=0;b < this.fanHuiseverArr.length;b++){
              if (item.id == this.fanHuiseverArr[b].value) {
                this.timeAreaoptions = this.fanHuiseverArr[b].hoursList
              }         
          }
        },
        //设置固定服务时间服务时间段确定动作
        singletechClick() {
          if(this.gudingStatus =='edit'){
            this.Orderform1.Date=this.otherInfo.serviceStart
          }else{
             this.Orderform1.Date=''
          }                   
          if (this.weekNumber == "") {
            this.$message.error("请选择星期");
            return false;
          }
          if (this.timeArea == "") {
            this.$message.error("请选择时段");
            return false;
          }
          this.isB=false;//新增日期部分关闭 
          this.tableData3=[];//技师表格清空
          this.radio4='';//技师表格选择会值清空
          this.gudingFlag=false; //技师部分关闭           
          var obj = {};
          obj.week = this.roomSel1Arr.id;
          obj.timeArea = this.timeArea;      
          if (this.Orderform1.testsele == "week_some") {
            if (this.teachArr.length > 0) {
              this.creatIs = 'no'
              for (var i of this.teachArr) {
                if (i.week == obj.week) {
                  this.$message.error("当前日期已选择");
                  this.creatIs = 'yes'
                  break
                } 
              }
              if(this.creatIs == 'no'){
                this.teachArr.push(obj);
              }
            } else {
              this.teachArr.push(obj);
            }
          } else {
            this.teachArr.splice(0);
            this.teachArr.push(obj);
          }
          this.listShowFlag=true;
          //console.log(this.teachArr, "绑定值");            
        },
        //设置固定服务时间请选择服务时间段点击
        addtime() {
          if(this.Orderform1.testsele == ''){
            this.$message({
              type: "error",
              message: "请选择服务频次！"
            });
            this.isB = false;
          }else{
            this.isB = true;
          }
        },
        //设置固定服务时间服务时间段中选择后取消
        singleaddtimeno() {
          this.freStyl1 = "8";
          this.timeArea = "";
          this.timeAreaoptions = [];
          this.isB=false;//新增日期部分关闭 
        },
        //设置固定服务时间删除选择的服务时间（点击叉号）
        singledeletes(item) {
          this.tableData3=[];//技师表格清空
          this.radio4='';//技师表格选择会值清空
          this.gudingFlag=false; //技师部分关闭
          this.timeAreaoptions=[];//清空时段下拉值       
          this.teachArr.remove(item)
          this.timeArea = "";
          this.freStyl1 = "8";
          if(this.gudingStatus =='edit'){
            this.Orderform1.Date=this.otherInfo.serviceStart
          }else{
             this.Orderform1.Date='';//清除第一次服务时间值
          }          
          
          this.Orderform1.workTimes = "";
          if(this.teachArr.length == 0){
            this.listShowFlag=false;
          }
        },
        //设置固定服务时间中日期变化时改变时间对象
        dateChange1(val) {
          this.tableData3=[];//技师表格清空
          this.radio4='';//技师表格选择会值清空
          this.gudingFlag=false; //技师部分关闭      
            //更换下拉列表值      
              this.options3=[];
              for(var j=0;j<this.teachArr.length;j++){
                for(let i=0;i<this.dateOptionsList.length;i++){           
                    if(this.dateOptionsList[i].label == this.teachArr[j].week){
                      this.options3=this.options3.concat(this.dateOptionsList[i].hoursList);//数组拼接
                    }
                }
              }
              //排序
              for(var i of this.options3){
                  var str= i.key.replace(/-/g,'/'); 
                  var date = new Date(str); 
                   i.sortdate = date.getTime();
              }
              this.options3.sort(function(a,b){
                return a.sortdate-b.sortdate;                
              }) 
 
          if(val== true){
            //未选择服务频次
            if(this.Orderform1.testsele == ''){
              this.$message({
                type: "error",
                message: "请选择服务频次！"
              });
              return false;
            }
            //未选择服务时间
            if(this.teachArr.length == 0){
              this.$message({
                type: "error",
                message: "请选择服务时间！"
              });
              return false;
            }

          } 
        },
        //设置固定服务时间弹窗单选改变
        getCurrentRow4(value) {
          this.radio4 = value;
          this.Orderform1.Tech = this.radio4;
        },
    /*设置固定服务时间相关操作结束 */
    /*更换固定时间相关操作开始 */
        //更换固定时间查询服务技师按钮
        gehuansearchSeverTech() {
          //未选择服务频次
          if(this.gehuanOrderform.testsele == ''){
            this.$message({
              type: "error",
              message: "请选择服务频次！"
            });
            return false;
          }        
          //未选择服务时间      
          if(this.gehuanteachArr.length == 0){
            this.$message({
              type: "error",
              message: "请选择服务时间！"
            });
            return false;
          } 
          //未选择第一次服务日期

              if(this.gehuanOrderform.Date == ''){
                this.$message({
                  type: "error",
                  message: "请选择第一次上门服务日期！"
                });
                return false;
              }             
              
          this.gehuantableData3=[]
          this.gehuanradio4 = "";
          var obj1 = {
            serviceNum:this.gehuanseverHour,
            masterId:this.orderId,
            freList:this.gehuanteachArr,
            serviceStart:this.gehuanOrderform.Date
          };
          saveRegularDateTechList(obj1)
            .then(res => {
              if (res.data.code === 1) {                 
                this.gehuangudingFlag = true;
                //技师表格数据
                this.gehuantableData3 = res.data.data; 
              }
            })
            .catch(res => {});      

        },
        //更换固定时间查询服务日期按钮
        gehuansearchSeverDate() { 
          this.freStyl = "4";
          this.gehuanradio4 = ""; 
          this.freStyl1 = "8";
          this.gehuantimeArea = "";
          this.gehuantimeAreaoptions = [];
          this.gehuanOrderform.Date='';
          this.gehuanOrderform.testsele='';
          this.gehuanteachArr=[];       
          this.gehuanlistShowFlag=false;
          this.gehuanisB = false;
          this.gehuanfanHuiseverArr=[];
          this.gehuandateOptionsList=[];     
          var obj1 = {
            masterId:this.orderId,
            serviceNum:this.gehuanseverHour
          };
          saveRegularDateDateList(obj1)
            .then(res => {
              if (res.data.code === 1) {
                this.gehuanfanHuiseverArr=res.data.data.weekList;
                this.gehuandateOptionsList=res.data.data.dateList
              }
            })
            .catch(res => {});               
          //预约个数*单次服务时间如果大于6提示不能
          if(this.gehuanseverHour*this.copyserviceHour > 6){
                this.$message({
                  type: "warning",
                  message: "总服务时长不能大于6小时！"
                });
                this.gehuanseverFrequencyFlag = false;
                return false
          }
          this.gehuanseverFrequencyFlag = true;     
        },
        //更换固定时间预约个数改变
        gehuannumberChange(val) { 
          this.freStyl = "4";
          this.gehuanradio4 = "";
          this.gehuanseverFrequencyFlag = false;
          this.gehuangudingFlag = false;           
          this.gehuanOrderform.severHour = val;            
        },    
        //更换固定时间服务频次更换
        gehuanChangefrequency(key, index) {
          this.gehuanfrequencySelecte = key;
          this.freStyl = index;
          this.gehuanOrderform.testsele = key;
          this.freStyl1 = "8";
          this.gehuantimeArea = "";
          this.gehuantimeAreaoptions = [];          
          this.gehuanteachArr = []            
        },
        //更换固定时间取消
        gehuansetCancel(formName) {
          this.gehuantestFlag = false;
          this.$refs[formName].resetFields();
          this.freStyl = "4";
          this.freStyl1 = "8";
          this.gehuantimeArea = "";
          this.gehuantimeAreaoptions = [];
          this.gehuangudingFlag = false;                       
          this.gehuanteachArr=this.techArrtest;          
        },
        //更换固定时间保存
        gehuansetOk(formName) {
          //未查询服务日期
          if(this.gehuanOrderform.testsele == '' && this.gehuanseverFrequencyFlag == false){
            this.$message({
              type: "error",
              message: "请查询服务日期！"
            });
            return false;
          }
          //未选择服务频次
          if(this.gehuanOrderform.testsele == '' && this.gehuanseverFrequencyFlag == true){
            this.$message({
              type: "error",
              message: "请选择服务频次！"
            });
            return false;
          }               
          //未选择服务时间      
          if(this.gehuanteachArr.length == 0){
            this.$message({
              type: "error",
              message: "请选择服务时间！"
            });
            return false;
          } 
          //未选择第一次服务日期
          if(this.gehuanOrderform.Date == ''){
            this.$message({
              type: "error",
              message: "请选择第一次上门服务日期！"
            });
            return false;
          }
          //未选择第一次服务日期
          if(this.gehuanOrderform.Date != '' && this.gehuangudingFlag == false){
            this.$message({
              type: "error",
              message: "请查询服务技师！"
            });
            return false;
          }                    
          this.$refs[formName].validate(val => {
            if (val) {
              this.gehuanOrderform.workTimes = this.gehuanteachArr;
                var obj1 = {
                  masterId:this.orderId,
                  serviceNum:this.gehuanseverHour,
                  freList:this.gehuanteachArr,
                  serviceFrequency:this.gehuanOrderform.testsele,
                  serviceStart:this.gehuanOrderform.Date,
                  techId:this.gehuanradio4            
                };
                updateRegularDate(obj1)
                  .then(res => {
                    if (res.data.code === 1) {
                      this.$message({
                        type: "success",
                        message: "更换固定服务时间成功！"
                      });
                      this.getOrderAllInf(this.orderId);                  
                      this.gehuantestFlag = false;
                      this.$refs[formName].resetFields();
                       
                    }
                  })
                  .catch(res => {
                  });                      
            }else{
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
        //更换固定时间按钮
        gehuanchangeguTime() {
            this.gehuantestFlag = true;              
            this.gehuanseverHour = this.yuyuegeshu;//预约次数的回显
            this.gehuanOrderform.severHour =this.yuyuegeshu ;       
            var a=null
            if(this.otherInfo.serviceFrequency =='week_one'){
                 a=0
            }
            if(this.otherInfo.serviceFrequency =='two_week_one'){
                 a=2
            }
            if(this.otherInfo.serviceFrequency =='week_some'){
                 a=1
            }
            this.gehuansearchSeverDate()
            this.gehuanfrequencySelecte = this.otherInfo.serviceFrequency;
            this.freStyl = a;
            this.gehuanOrderform.testsele = this.otherInfo.serviceFrequency;
            this.gehuantimeArea = "";
            this.gehuanlistShowFlag=true;//日期选择结果显示开关            
            this.gehuanOrderform.Date=this.otherInfo.serviceStart;
            this.techArrtest=Object.assign({}, this.otherInfo.freList);; //服务时间的回显 
            this.gehuanteachArr = this.otherInfo.freList; //服务时间的回显 
            this.gehuanradio4 = this.otherInfo.techId;//技师选择的id 
            this.gehuanOrderform.Tech = this.gehuanradio4;             
            this.gehuansearchSeverTech();//查询服务技师表格数据  
         
            this.gehuangudingFlag = true; 
            this.freStyl1 = "8";
            this.gehuanisB=true;               
            this.gehuanseverFrequencyFlag=true;
        },
        //更换固定时间服务时间段中星期几选择
        gehuanroomSel2(item, index) {
          this.gehuancreatIs = 'yes'
          this.gehuantimeArea = "";
          this.gehuanweekNumber = item.name;
          this.freStyl1 = index;
          this.gehuanroomSelNum.push(item.id); //存储星期的ID
          this.gehuanroomSel1Arr = Object.assign({}, item); //存储星期的对象
          this.gehuantimeAreaoptions=[];
          //星期几的id在对象中遍历得到下拉日期数据
          for(var b=0;b < this.gehuanfanHuiseverArr.length;b++){
              if (item.id == this.gehuanfanHuiseverArr[b].value) {
                this.gehuantimeAreaoptions = this.gehuanfanHuiseverArr[b].hoursList
              }         
          }
        },
        //更换固定时间服务时间段确定动作
        gehuansingletechClick() {
          this.gehuanOrderform.Date=''
          if (this.gehuanweekNumber == "") {
            this.$message.error("请选择星期");
            return false;
          }
          if (this.gehuantimeArea == "") {
            this.$message.error("请选择时段");
            return false;
          }
          var obj = {};
          obj.week = this.gehuanroomSel1Arr.id;
          obj.timeArea = this.gehuantimeArea;      
          if (this.gehuanOrderform.testsele == "week_some") {
            if (this.gehuanteachArr.length > 0) {
              this.gehuancreatIs = 'no'
              for (var i of this.gehuanteachArr) {
                if (i.week == obj.week) {
                  this.$message.error("当前日期已选择");
                  this.gehuancreatIs = 'yes'
                  break
                } 
              }
              if(this.gehuancreatIs == 'no'){
                this.gehuanteachArr.push(obj);
              }
            } else {
              this.gehuanteachArr.push(obj);
            }
          } else {
            this.gehuanteachArr.splice(0);
            this.gehuanteachArr.push(obj);
          }
          this.gehuanlistShowFlag=true;
          //console.log(this.teachArr, "绑定值");            
        },
        //更换固定时间请选择服务时间段点击
        gehuanaddtime() {
          if(this.gehuanOrderform.testsele == ''){
            this.$message({
              type: "error",
              message: "请选择服务频次！"
            });
            this.gehuanisB = false;
          }else{
            this.gehuanisB = true;
          }
        },
        //更换固定时间服务时间段中选择后取消
        gehuansingleaddtimeno() {
          this.freStyl1 = "8";
          this.gehuantimeArea = "";
          this.gehuantimeAreaoptions = [];
        },
        //更换固定时间删除选择的服务时间（点击叉号）
        gehuansingledeletes(item) {
          this.gehuanteachArr.remove(item)
          this.gehuantimeArea = "";
          this.freStyl1 = "8";
          this.tableData3=[];//技师表格清空
          this.radio4='';//技师表格选择会值清空
          this.gudingFlag=false; //技师部分关闭      
          this.gehuanOrderform.workTimes = "";
          if(this.gehuanteachArr.length == 0){
            this.gehuanlistShowFlag=false;
          }
        },
        //更换固定时间修改中日期变化时改变时间对象
        gehuandateChange1(val) {         
            //更换下拉列表值      
              this.gehuanoptions3=[];
              for(var j=0;j<this.gehuanteachArr.length;j++){
                for(let i=0;i<this.gehuandateOptionsList.length;i++){           
                    if(this.gehuandateOptionsList[i].label == this.gehuanteachArr[j].week){
                      this.gehuanoptions3=this.gehuanoptions3.concat(this.gehuandateOptionsList[i].hoursList);//数组拼接
                    }
                }
              }      
          if(val== true){
            //未选择服务频次
            if(this.gehuanOrderform.testsele == ''){
              this.$message({
                type: "error",
                message: "请选择服务频次！"
              });
              return false;
            }
            //未选择服务时间
            if(this.gehuanteachArr.length == 0){
              this.$message({
                type: "error",
                message: "请选择服务时间！"
              });
              return false;
            }

          } 
        }, 
        //更换固定时间更换弹窗单选改变
        gehuangetCurrentRow4(value) {
          this.gehuanradio4=value;
          this.gehuanOrderform.Tech = value;
        },           
    /*更换固定时间相关操作结束 */
    /*预约相关操作开始 */
        //预约操作按钮
        yuyueClick() {
          if(6/this.copyserviceHour < this.otherInfo.surplusNum){
             this.yuyueMax=Math.floor(6/this.copyserviceHour);//向下取整
          }else{
             this.yuyueMax=this.otherInfo.surplusNum;
          }          
          this.yuyueformInline.Tech="";
          this.yuyueradio = "";
          this.yuyueformInline.severHour = "1";
          this.yuyueNumber = "1";
          this.yuyuedialogVisible = true;
        },    
        //预约查询服务日期按钮
        searchseverDateyuyue() {
          this.yuyueradio = "";
          this.yuyueformInline.Date == '' 
          this.yuyueformInline.Tech='';
          this.yuyuetimeObj=[];
          this.yuyueselectDateFlag = true;  
          //后台预约- 查询服务日期    serviceNum, masterId 
            var obj={
              masterId: this.orderId,
              serviceNum:this.yuyueNumber
            }    
            subscribeDateList(obj)
              .then(res => {
                if(res.data.code == 1){
                  this.options21 = res.data.data; //服务时间下拉菜单值
                  //默认选择当前日期
                  if (this.options21 != undefined && this.options21[0] != undefined) {
                    this.yuyueformInline.Date = this.options21[0].value;
                    this.yuyuedateChange(this.yuyueformInline.Date);
                  }                      
                }else{

                }
              }).catch(res => {
              })                                        
        },
        //预约查询服务技师按钮
        searchSeverTechyuyue() {
          //未选择日期
          if(this.yuyueformInline.Date == ''){
            this.$message({
              type: "error",
              message: "请选择日期！"
            });
            return false;
          }
          //未选择时间
          if(this.yuyueformInline.Time == ''){
            this.$message({
              type: "error",
              message: "请选择时间！"
            });
            return false;
          }
          this.yuyueradio = "";
          this.yuyueformInline.Tech='';
          //选择的时间
          var time='';
          for (var a = 0; a < this.yuyuetimeObj.length; a++) {
            if (this.yuyuetimeObj[a].selected == true) {
              time = this.yuyuetimeObj[a].serviceTimeStr;
            }
          }
          if(time == ''){
            this.$message({
              type: "error",
              message: "请选择时间！"
            });
          }else{
              //后台预约- 查询服务技师    serviceNum，masterId，serviceTime      
              var obj={
                masterId: this.orderId,
                serviceTime: this.yuyuechangTime + " " + time + ":00",
                serviceNum:this.yuyueNumber
              }    
              subscribeTechList(obj)
              .then(res => {
                if(res.data.code == 1){
                  this.gudingFlag11 = true;
                  this.yuyuetableData =res.data.data          
                }else{
                  //技师表格数据
                  this.yuyuetableData = []
                }
              }).catch(res => {
                  //技师表格数据
                  this.yuyuetableData = []
              })            

          }

        },
        //预约数量改变
        yuyuenumberChange(val) {        
          this.yuyueformInline.severHour = val;
          this.yuyueNumber = val;
          this.yuyueformInline.Date = '' 
          this.yuyueformInline.Time=''          
          this.yuyueselectDateFlag = false;
          this.yuyueformInline.Tech='';
          this.yuyueradio='';           
          this.gudingFlag11 = false;         
        },
        //预约单选改变
        yuyuegetCurrentRow(value) {
          this.yuyueradio = value;
          this.yuyueformInline.Tech = value;
        },
        //预约保存
        yuyuesubmitTime(formName) {
          //未选择日期
          if(this.yuyueformInline.Date == '' && this.yuyueselectDateFlag == false){
            this.$message({
              type: "error",
              message: "请查询服务日期！"
            });
            return false;
          }      
          //未选择日期
          if(this.yuyueformInline.Date == '' && this.yuyueselectDateFlag == true){
            this.$message({
              type: "error",
              message: "请选择日期！"
            });
            return false;
          }
          if(this.yuyueformInline.Time == ''){
            this.$message({
              type: "error",
              message: "请选择时间！"
            });
            return false;
          }       
          //未选择时间
          if(this.yuyueformInline.Tech == '' && this.gudingFlag11 == false){
            this.$message({
              type: "error",
              message: "请查询服务技师！"
            });
            return false;
          }
          //未选择时间
          if(this.yuyueformInline.Tech == '' && this.gudingFlag11 == true){
            this.$message({
              type: "error",
              message: "请选择技师！"
            });
            return false;
          }                  
          this.$refs[formName].validate(valid => {
            if (valid) {             
              var time = "";
              for (var a = 0; a < this.yuyuetimeObj.length; a++) {
                if (this.yuyuetimeObj[a].selected == true) {
                  time = this.yuyuetimeObj[a].serviceTimeStr;
                }
              }
              // var that = this;
              if(time == ''){
                  this.$message({
                    type: "error",
                    message: "请选择时间！"
                  });
                  
              }else{
                   this.yuyuetimeSaveFlag1 = true;
                  //后台预约- 保存 serviceNum，masterId，serviceTime，techId
                  var obj = {
                    masterId: this.orderId,
                    serviceTime: this.yuyuechangTime + " " + time + ":00",
                    serviceNum:this.yuyueNumber,
                    techId:this.yuyueformInline.Tech,
                  };          
                  subscribeSave(obj)
                    .then(res => {
                      this.yuyuetimeSaveFlag1 = false;
                      if (res.data.code === 1) {
                        this.$message({
                          type: "success",
                          message: "预约成功!"
                        });
                        this.getOrderAllInf(this.orderId);
                        this.yuyuedialogVisible = false;
                        this.yuyueselectDateFlag = false;
                        this.yuyuetimeObj = [];
                        this.gudingFlag11 = false; 
                        this.$refs["formInline"].resetFields();                               
                        
                      } else {
                        this.yuyuetimeSaveFlag1 = false;
                      }
                    })
                    .catch(res => {
                      this.yuyuetimeSaveFlag1 = false;
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
        //预约取消
        yuyuecancelTime(formName) {           
          this.yuyueradio='';         
          this.$refs[formName].resetFields();
          //样式复位
          for (var a = 0; a < this.yuyuetimeObj.length; a++) {
            this.$set(this.yuyuetimeObj[a], "selected", false);
            this.$refs.yuyueTimeWrap[a].style.borderColor = "#fff";
            this.$refs.yuyueTimeWrap[a].style.color = "#000";
            this.$refs.yuyueTimeWrap[a].style.border = "1px solid #bfcbd9";
            this.$refs.yuyueTimeWrap[a].className = "selfSeverTimeSt";
          }          
          this.yuyueselectDateFlag = false;
          this.gudingFlag11 = false;
          this.yuyuedialogVisible = false;
        },
        //预约中日期变化时改变时间对象
        yuyuedateChange(val) {
          this.yuyueformInline.Time='' 
          this.gudingFlag11=false;//预约技师表格关闭
          this.yuyuetableData=[];//预约技师表格清空
          this.yuyueradio='';//预约技师表格单选清空
          this.yuyueformInline.Tech='';
          var that = this;
          for (var b = 0; b < this.options21.length; b++) {
            if (val == this.options21[b].value) {
              if (this.options21[b].serviceTime != undefined) {
                this.yuyuetimeObj = this.options21[b].serviceTime;
              }
              if (this.options21[b].label != undefined) {
                this.yuyuechangTime = this.options21[b].label;
                this.yuyueformInline.Date=this.options21[b].label;
              }
            }
          }
          if (this.yuyuetimeObj != undefined && this.yuyuetimeObj.length != 0) {
            //样式复位
            this.$nextTick(() => {
              for (var a = 0; a < this.yuyuetimeObj.length; a++) {
                that.$set(this.yuyuetimeObj[a], "selected", false);
                that.$refs.yuyueTimeWrap[a].style.borderColor = "#fff";
                that.$refs.yuyueTimeWrap[a].style.color = "#000";
                that.$refs.yuyueTimeWrap[a].style.border = "1px solid #bfcbd9";
                that.$refs.yuyueTimeWrap[a].className = "selfSeverTimeSt";
              }
            });
          }
        },    
        //预约弹窗中的时间选项点击
        yuyuetimeChange(index, obj) {
          this.gudingFlag11=false;
          this.yuyuetableData=[];
          this.yuyueradio='';
          this.yuyueformInline.Tech='';
          for (var a = 0; a < this.yuyuetimeObj.length; a++) {
            this.$set(this.yuyuetimeObj[a], "selected", false);
            if (a == index) {
              this.$refs.yuyueTimeWrap[a].style.borderColor = "#4c70e8";
              this.$refs.yuyueTimeWrap[a].style.color = "#4c70e8";
              this.$refs.yuyueTimeWrap[a].className = "selfSeverTimeSt mark";
              this.yuyuetimeObj[a].selected = !this.yuyuetimeObj[a].selected;
              this.yuyueformInline.Time = this.yuyuetimeObj[a].serviceTimeStr;
            } else {
              this.$refs.yuyueTimeWrap[a].style.borderColor = "#fff";
              this.$refs.yuyueTimeWrap[a].style.color = "#000";
              this.$refs.yuyueTimeWrap[a].style.border = "1px solid #bfcbd9";
              this.$refs.yuyueTimeWrap[a].className = "selfSeverTimeSt";
            }
          }
        },        
    /*预约相关操作结束*/    
    /**查看备注相关操作开始*/
    //查看备注按钮
        lookRemark(row) {
          var obj={
            orderId:row.id
          }
          //组合订单查看备注
        formOrderRemark(obj)
            .then(res => {
              if (res.data.code === 1) {
                var AllInfo = res.data.data;
                this.otherInfo1 = AllInfo; //所有其他信息变量
                this.RemarkInfFlag = true;                   
              }
            })
            .catch(res => {
            });      
          
        },
    /**查看备注相关操作结束*/
    /**更换技师相关操作开始*/
        //更换技师按钮
        changeTech(row) {
          this.techdisStatus=row;
          this.subOneId1=this.techdisStatus.id;//第一个子订单的Id
          //已有订单更换技师按钮    参数 orderId
          var obj={
              orderId:this.subOneId1
          } 
        updateOrderTechInit(obj)
            .then(res => {
              if (res.data.code === 1) {
                console.log(res.data.data)
                this.tableData1=res.data.data
                this.changeTechFlag = true;           
              }
            })
            .catch(res => {
            });            
        },
        //已有订单表格内更换技师弹窗中“关闭”按钮
        changeTechOk() {
          this.getOrderAllInf(this.orderId);
          this.changeTechFlag = false;   
        },
        //改派单选改变
        getCurrentRow1(value) {
          this.radio1 = value;
        },
        //更换技师弹出层取消
        cancelForm2() {
          this.middleA = [];
          this.radio1='';
          this.listTech = [];
          this.dialogTableVisible = false;
        },
        //更换技师弹出层新增与改派选择技师弹出层查询按钮
        searchTeh() {
          var obj = {
            orderId: this.subOneId1,
            techName: this.techName
          };
          //多选（新增）
          if (this.status == "add") {
            //已有订单增加 改派 技师列表    参数orderId，techName
            updateOrderTechTechList(obj)
              .then(res => {
                if (res.data.code === 1) {              
                  if (res.data.data != undefined) {
                    this.listTech = res.data.data;
                  }else{
                    this.listTech=[]
                  }
                }else{
                  this.listTech=[]
                }
              })
              .catch(res => {});
          } else {
            //单选（改派）
            //已有订单增加 改派 技师列表    参数orderId，techName
            updateOrderTechTechList(obj)
              .then(res => {
                if (res.data.code === 1) {              
                  if (res.data.data != undefined) {
                    this.listTech = res.data.data;
                  }else{
                    this.listTech=[]
                  }
                }else{
                  this.listTech=[]
                }
              })
              .catch(res => {});
          }
        },
        //更换技师弹出层存储选择技师对象
        ChangeTechLIne(obj) {
          if (obj.techChecked) {
            this.middleA.push(obj);
          } else {
            for (var a1 = 0; a1 < this.middleA.length; a1++) {
              if (this.middleA[a1].techId == obj.techId) {
                this.middleA.remove(this.middleA[a1]);
              }
            }
          }
        },
        //选择技师弹出层保存
        submitForm2() {
          
          //先遍历数据中选中的再保存（增加技师中的技师LIST）
          var arr = [];
          if (this.middleA != undefined && this.middleA.length != 0) {
            for (let a = 0; a < this.middleA.length; a++) {
              if (this.middleA[a].techChecked == true) {
                arr.push(this.middleA[a].techId);
              }
            }
          }
          if (this.status == "add" && arr.length != 0) {
            this.techSaveFlag = true;//防止重复提交FLAG
            //多选保存技师
            var obj = {
              orderId: this.subOneId1,
              techIdList: arr
            };
          //已有订单增加保存按钮   参数 orderId，techIdList
            updateOrderTechAddSave(obj)
              .then(res => {
                this.techSaveFlag = false;
                if (res.data.code === 1) {
                  this.$message({
                    type: "success",
                    message: "增加成功!"
                  });
                  this.middleA = [];
                  this.listTech = [];
                  this.changeTech(this.techdisStatus)
                  this.dialogTableVisible = false;
                  
                }
              })
              .catch(res => {
                this.techSaveFlag = false;
              });
          }
          if (this.status == "edit") {
            //单选保存技师
            //改派操作this.radio1为技师id
            var tech = [];
            for (var a = 0; a < this.listTech.length; a++) {
              if (this.radio1 == this.listTech[a].techId) {
                tech.push(this.listTech[a].techId);
              }
            }
            if(tech.length == 0){
                this.$message({
                  type: "error",
                  message: "请选择技师!"
                });
            }else{
              this.techSaveFlag = true;//防止重复提交FLAG
              var obj1 = {
                orderId: this.subOneId1,
                techId: this.aa,
                techIdList: tech
              };
              //已有订单改派保存按钮    参数orderId，techIdList，techId        
              updateOrderTechDispatchSave(obj1)
                .then(res => {
                  this.techSaveFlag = false;
                  if (res.data.code === 1) {
                    this.$message({
                      type: "success",
                      message: "改派成功!"
                    });
                    this.listTech = [];
                    this.changeTech(this.techdisStatus)
                    this.dialogTableVisible = false;
                  } else {
                    this.techSaveFlag = false;
                  }
                })
                .catch(res => {
                  this.techSaveFlag = false;
                });
            }

          }
        },
        //更换技师弹出层改派或新增技师
        gaiPai(status, obj) {
          this.aa='';
          this.radio1 = "";
          this.status = status;
          this.techName = "";
          if (status == "add") {
            //多选增加技师
            var obj = {
              techName:this.techName,
              orderId: this.subOneId1
            };
            //已有订单增加 改派 技师列表    参数orderId，techName
            updateOrderTechTechList(obj)
              .then(res => {
                if (res.data.code === 1) { 
                  this.dialogTableVisible = true;             
                  if (res.data.data != undefined) {                  
                    this.listTech = res.data.data;
                  }
                }
              })
              .catch(res => {});
          } else {
            this.aa=obj.techId
            //单选择改派技师
            var obj = {
              techName:this.techName,
              orderId: this.subOneId1
            };
            //已有订单增加 改派 技师列表    参数orderId，techName
            updateOrderTechTechList(obj)
              .then(res => {
                if (res.data.code === 1) { 
                  this.dialogTableVisible = true;                               
                  if (res.data.data != undefined) {
                    this.listTech = res.data.data;
                  }
                }
              })
              .catch(res => {});
          }
        },        
    /**更换技师相关操作结束*/
    /**详情页面相关操作开始*/
        //用订单ID获取页面相关信息
        getOrderAllInf(orderId) {
          this.orderId = orderId;
          var obj = {
            masterId: orderId
          };
          getOrderInf1(obj)
            .then(res => {
              if (res.data.code === 1) {
                var AllInfo = res.data.data;
                this.otherInfo = AllInfo; //所有其他信息变量
                this.ordertableData=AllInfo.orderCombinationGasqInfos;//已有订单表格数据
                this.addressInf = AllInfo.addressInfo;
                this.copyserviceHour=AllInfo.serviceHour//单次服务时间
                this.yuyuegeshu=AllInfo.serviceNum//预约个数
                this.otherInfo.copyserviceHour1=this.formatDuring(
                  AllInfo.serviceAllHour * 3600000
                );//单次服务时间格式转换后
                this.otherInfo.serviceHour = this.formatDuring(
                  AllInfo.serviceHour * 3600000
                );
                this.tableData = AllInfo.combinationOrderInfos; //服务商品信息表格
                this.payInfo = AllInfo.payInfo; //支付信息
              }
            })
            .catch(res => {});
        },
        //时间转化成xx小时XX分钟
        formatDuring(mss) {
          var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = (mss % (1000 * 60)) / 1000;
          if (hours == 0 && seconds == 0) {
            return minutes + "分钟";
          } else if (hours == 0 && seconds != 0) {
            return minutes +1+ "分钟";
          } else if (seconds == 0 && minutes == 0) {
            return hours + "小时";
          } else {
            return hours + "小时" + minutes + "分钟";
          }
        },
    /**详情页面相关操作结束*/
    /*更换固定技师相关操作开始*/
        //更换固定技师按钮
        gaiPai1() {
            var obj1={
              techName:'',
              masterId:this.orderId
            }
            updateRegularTechTechList(obj1)
              .then(res => {
                if (res.data.code === 1) {
                  this.dialogTableVisible1 = true;
                  if (res.data.data != undefined) {
                    this.listTech1 = res.data.data;
                    this.radio = "";
                    this.techName1 = "";                
                  }
                }
              })
              .catch(res => {

              });      
        },
        //更换固定技师弹出层查询按钮
        searchTeh1() {
          this.listTech1=[]
          var obj = {
            masterId: this.orderId,
            techName: this.techName1//技师姓名参数
          };
          //数据获取
          updateRegularTechTechList(obj)
            .then(res => {
              if (res.data.code === 1) {
                if (res.data.data != undefined) {
                  this.listTech1 = res.data.data;
                } else {
                  this.listTech1 = [];
                }
              }
            })
            .catch(res => {});
        },
        //更换固定技师弹出层确认
        submitForm21() {
          if(this.radio == ''){
              this.$message({
                type: "error",
                message: "请选择技师!"
              });
          }else{
              //更换固定技师保存
              var obj1={
                techId:this.radio,
                masterId:this.orderId
              }      
              updateRegularTechSave(obj1)
                .then(res => {
                  //this.techSaveFlag1=true;
                  if (res.data.code === 1) {
                    //this.techSaveFlag1=false;
                    this.$message({
                      type: "success",
                      message: "更换固定技师成功"
                    });
                    this.getOrderAllInf(this.orderId);
                    this.dialogTableVisible1 = false;
                    
                  }
                })
                .catch(res => {
                  //this.techSaveFlag1=false;
                }); 
          }
           
        },
        //更换固定技师弹出层取消
        cancelForm21() {     
          this.radio='';
          this.listTech1 = [];
          this.dialogTableVisible1 = false;
        },
        //固定技师选择单选改变
        getCurrentRow(value) {
          this.radio = value;
        },            
    /*更换固定技师相关操作结束*/
    /*退款相关操作开始*/
      //退款按钮
      orderRefund() {
        this.ruleForm.refundAccount = 0;
        this.ruleForm.refundDifference = "";
        this.ruleForm.refundDifferenceType = "";
        this.ruleForm.orderNowRefundStatus = "";
        this.orderRefundFlag = true;
        var obj1 = {
          id: this.orderId
        };
        orderRefundInit(obj1)
          .then(res => {
            if (res.data.code === 1) {
              if (res.data.data != undefined) {
                this.ruleForm.payPrice = res.data.data.payPrice;
                this.ruleForm.orderRefundObj = res.data.data.goodsInfoList;
                if (res.data.data.orderNowRefundStatus != undefined) {
                  this.ruleForm.orderNowRefundStatus =
                    res.data.data.orderNowRefundStatus;
                }
              }
            }
          })
          .catch(res => {});
      },
      //多少退款改变
      ChangerefundType(value) {
        if (value == "") {
          this.ruleForm.refundDifference = "";
        }
      },
      //计算退款总额
      rowChange(rowObj) {
        if (rowObj.goodsChecked) {
          this.ruleForm.refundAccount =
            this.ruleForm.refundAccount + rowObj.payPrice * 1 * rowObj.goodsNum;
        } else {
          this.ruleForm.refundAccount =
            this.ruleForm.refundAccount - rowObj.payPrice * 1 * rowObj.goodsNum;
        }
        if (this.ruleForm.refundAccount == "0") {
          this.ruleForm.refundId = "";
        } else {
          this.ruleForm.refundId = "1";
        }
      },
      //确认退款
      orderRefundOk(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (
              (this.refundDifferenceType == "" &&
                this.ruleForm.refundDifference > 0) ||
              (this.refundDifferenceType == null &&
                this.ruleForm.refundDifference > 0)
            ) {
              this.$message({
                type: "warning",
                message: "请选择退款差额类型！"
              });
              return false;
            }
            if (this.ruleForm.refundDifference >= this.ruleForm.refundAccount) {
              this.$message({
                type: "warning",
                message: "退款差额应小于退款金额！"
              });
            } else {
              var refundPirce = 0;
              if (this.refundDifferenceType == "many") {
                refundPirce =
                  this.ruleForm.refundAccount +
                  Number(this.ruleForm.refundDifference);
              }
              if (this.refundDifferenceType == "less") {
                refundPirce =
                  this.ruleForm.refundAccount -
                  Number(this.ruleForm.refundDifference);
              }
              if (
                this.refundDifferenceType == "" ||
                this.refundDifferenceType == null
              ) {
                this.refundDifferenceType = null;
                refundPirce = this.ruleForm.refundAccount;
              }
              refundPirce = Number(refundPirce).toFixed(2);
              const h = this.$createElement;
              this.$msgbox({
                title: "提示",
                message: h("p", null, [
                  h("span", null, "实际退款金额为：￥"),
                  h("span", { style: "color: teal" }, refundPirce),
                  h("span", null, "，确定退款吗？")
                ]),
                showCancelButton: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              })
                .then(() => {
                  var arr = [];
                  for (var a = 0; a < this.ruleForm.orderRefundObj.length; a++) {
                    if (this.ruleForm.orderRefundObj[a].goodsChecked) {
                      arr.push(this.ruleForm.orderRefundObj[a]);
                    }
                  }
                  this.middleB = Object.assign([], arr);
                  var orderRefundInfo = {};
                  orderRefundInfo.refundMethod = this.ruleForm.refundMethod;
                  orderRefundInfo.refundAccount = this.ruleForm.refundAccount;
                  orderRefundInfo.refundDifferenceType = this.refundDifferenceType;
                  orderRefundInfo.refundDifference = this.ruleForm.refundDifference;
                  orderRefundInfo.refundAccountReality = refundPirce;
                  orderRefundInfo.refundReason = this.ruleForm.refundReason;
                  var obj1 = {
                    id: this.orderId,
                    goodsInfoList: this.middleB,
                    orderRefundInfo: orderRefundInfo
                  };
                  orderRefundSave(obj1)
                    .then(res => {
                      if (res.data.code === 1) {
                        this.$message({
                          type: "success",
                          message: "退款成功"
                        });
                        this.getOrderAllInf(this.orderId);
                        this.refundDifferenceType = "";
                        
                        this.$refs["ruleForm"].resetFields();
                        this.orderRefundFlag = false;
                      }
                    })
                    .catch(res => {});
                })
                .catch(() => {
                  this.$message({
                    type: "warning",
                    message: "已取消退款"
                  });
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
      //取消退款
      orderRefundCancel() {
        this.refundDifferenceType = "";
        this.$refs["ruleForm"].resetFields();
        this.orderRefundFlag = false;
      },
      //跳转退款详情页
      gotoRefund(orderNumber) {
        if (this.btnShow.indexOf("refund_view") > -1) {
          var src = window.location.href;
          var end = src.indexOf("#") + 1;
          var url = src.substring(0, end);
          this.jumpUrl = url + "/clean/refund?ordernumber=" + orderNumber;
          window.open(this.jumpUrl);
        } else {
          this.$message({
            type: "warning",
            message: "无查看退款权限!"
          });
        }
      },
      loadingClick() {
        loading = this.$loading({
          lock: true,
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
          target: document.querySelector(".el-dialog__body")
        });
      },      
    /*退款相关操作结束*/
    /*取消订单相关操作开始 */
      //取消订单按钮
      cancelOrder() {
        this.cancelOrderFlag = true;
      },
      //取消订单确认
      submitOrder(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            var obj = {
              id: this.orderId,
              cancelReason: this.Orderform.becouss,
              cancelReasonRemark: this.Orderform.beizhu
            };
            orderCancelFun(obj)
              .then(res => {
                if (res.data.code === 1) {
                  this.$message({
                    type: "success",
                    message: "取消成功!"
                  });
                  this.getOrderAllInf(this.orderId);
                  this.cancelOrderFlag = false;
                }
              })
              .catch(res => {});
          } else {
          }
        });
      },
      //取消订单取消
      unOrder(formName) {
        this.$refs[formName].resetFields();
        this.cancelOrderFlag = false;
      },
    /*取消订单相关操作结束 */
    /*更换时间相关操作开始 */
        //更换时间按钮
        changeTime(row) {
          this.subOneId=row.orderList[0].id;//第一个子订单的Id
          this.radio3 = "";
          this.timeObj = [];
          var obj={
            id:this.subOneId
          }
          updateOrderTimeDateList(obj)
            .then(res => {
              if (res.data.code === 1) {
                this.dialogVisible = true;
                this.options2 = res.data.data; //服务时间下拉菜单值
                //默认选择当前日期
                if (this.options2 != undefined && this.options2[0] != undefined) {
                  this.formInline.Date = this.options2[0].value;
                  this.dateChange(this.formInline.Date);
                }
              }
            })
            .catch(res => {});      
        },
        //更换时间弹窗中的时间选项点击
        timeChange(index, obj) {
          //隐藏技师选择部分
          this.formInline.Tech ='';          
          this.radio3='';
          this.gudingFlag1=false;
          this.tableData2=[];
          for (var a = 0; a < this.timeObj.length; a++) {
            this.$set(this.timeObj[a], "selected", false);
            if (a == index) {
              this.$refs.TimeWrap[a].style.borderColor = "#4c70e8";
              this.$refs.TimeWrap[a].style.color = "#4c70e8";
              this.$refs.TimeWrap[a].className = "selfSeverTimeSt mark";
              this.timeObj[a].selected = !this.timeObj[a].selected;
              this.formInline.Time = this.timeObj[a].serviceTimeStr;
            } else {
              this.$refs.TimeWrap[a].style.borderColor = "#fff";
              this.$refs.TimeWrap[a].style.color = "#000";
              this.$refs.TimeWrap[a].style.border = "1px solid #bfcbd9";
              this.$refs.TimeWrap[a].className = "selfSeverTimeSt";
            }
          }
        },    
        //更换时间中弹窗中日期变化时改变时间对象
        dateChange(val) {
          this.formInline.Tech ='';
          this.tableData2=[];
          this.radio3='';
          this.gudingFlag1=false;
          this.formInline.Time='';
          var that = this;
          for (var b = 0; b < this.options2.length; b++) {
            if (val == this.options2[b].value) {
              if (this.options2[b].serviceTime != undefined) {
                this.timeObj = this.options2[b].serviceTime;
              }
              if (this.options2[b].label != undefined) {
                this.changTime = this.options2[b].label;
              }
            }
          }
          if (this.timeObj != undefined && this.timeObj.length != 0) {
            //样式复位
            this.$nextTick(() => {
              for (var a = 0; a < this.timeObj.length; a++) {
                that.$set(this.timeObj[a], "selected", false);
                that.$refs.TimeWrap[a].style.borderColor = "#fff";
                that.$refs.TimeWrap[a].style.color = "#000";
                that.$refs.TimeWrap[a].style.border = "1px solid #bfcbd9";
                that.$refs.TimeWrap[a].className = "selfSeverTimeSt";
              }
            });
          }
        },
        //更换时间查询服务技师按钮
        searchSeverTech1() {
          if(this.formInline.Time ==''){
            this.$message({
              type: "error",
              message: "请选择时间！"
            });
            return false;        
          }
          var time = "";
          for (var a = 0; a < this.timeObj.length; a++) {
            if (this.timeObj[a].selected == true) {
              time = this.timeObj[a].serviceTimeStr;
            }
          }
          if(time == ''){
            this.$message({
              type: "error",
              message: "请选择时间！"
            });
          }else{
            //更换服务时间中‘查询服务技师’  参数 一个是id  一个是serviceTime
              var obj = {
              id:this.subOneId,
              serviceTime: this.changTime + " " + time + ":00",
            };
            updateOrderTimeTechList(obj)
              .then(res => {
                if (res.data.code === 1) {
                  //技师表格数据
                  this.tableData2 = res.data.data.list;
                  this.techObj=res.data.data.tech;
                  this.gudingFlag1 = true;
                } else {
                    this.tableData2 = [];
                }
              })
              .catch(res => {

              });    
            }
  
        },
        //更换技师（表格内）单选改变
        getCurrentRow3(value) {
          this.radio3 = value;
          this.formInline.Tech = this.radio3;
        },
        //更换时间的保存
        submitTime(formName) {
          if(this.formInline.Time ==''){
            this.$message({
              type: "error",
              message: "请选择时间！"
            });
            return false;        
          }
          if(this.formInline.Tech =='' && this.gudingFlag1 == false && this.otherInfo.orderType == 'group_split_yes'){
            this.$message({
              type: "error",
              message: "请查询服务技师！"
            });
            return false;        
          }             
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.timeSaveFlag = true;
              var time = "";
              for (var a = 0; a < this.timeObj.length; a++) {
                if (this.timeObj[a].selected == true) {
                  time = this.timeObj[a].serviceTimeStr;
                }
              }      
              var that = this;
              //this.formInline.Tech 技师的techId
              //更换服务时间中'保存'
              if(time == ''){
                  this.$message({
                    type: "error",
                    message: "请选择时间！"
                  });
              }else{
                  if(this.otherInfo.orderType == 'group_split_yes'){
                      var obj = {
                        id:this.subOneId,
                        serviceTime: this.changTime + " " + time + ":00",
                        techId:this.formInline.Tech
                      };              
                      updateOrderTimeSave(obj)
                        .then(res => {
                          this.timeSaveFlag = false;
                          if (res.data.code === 1) {
                            this.$message({
                              type: "success",
                              message: "更换时间成功!"
                            });
                            this.getOrderAllInf(this.orderId);
                            this.$refs["formInline"].resetFields();                        
                            this.timeObj = [];//时段对象
                            this.options2=[];
                            this.radio3='';
                            this.tableData2=[];
                            this.gudingFlag1 = false;//技师信息展示开关
                            this.dialogVisible = false;//弹窗关闭
                            
                          } else {
                            //this.timeObj = [];
                            this.timeSaveFlag = false; 
                          }
                        })
                        .catch(res => {
                          this.timeSaveFlag = false;
                          //this.timeObj = [];
                        });            

                  }else{
                      //不拆单的情况
                      var obj = {
                        id:this.subOneId,
                        serviceTime: this.changTime + " " + time + ":00",
                        techId:''
                      };              
                      updateOrderTimeSave(obj)
                        .then(res => {
                          this.timeSaveFlag = false;
                          if (res.data.code === 1) {
                            this.$message({
                              type: "success",
                              message: "更换时间成功!"
                            });
                            this.getOrderAllInf(this.orderId);
                            this.$refs["formInline"].resetFields();
                            this.dialogVisible = false;//弹窗关闭
                            this.timeObj = [];//时段对象
                            this.options2=[];
                            this.gudingFlag1 = false;//技师信息展示开关
                            
                          } else {
                            //this.timeObj = [];
                            this.timeSaveFlag = false; 
                          }
                        })
                        .catch(res => {
                          this.timeSaveFlag = false;
                          //this.timeObj = [];
                        });            
                  }
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
        //更换时间取消
        cancelTime(formName) {
          this.gudingFlag1 = false;
          this.timeObj = [];//时段对象
          this.options2=[];
          this.radio3='';
          this.tableData2=[];
          this.formInline.Time='';
          this.formInline.Tech ='';            
          this.$refs[formName].resetFields();
          //样式复位
          for (var a = 0; a < this.timeObj.length; a++) {
            this.$set(this.timeObj[a], "selected", false);
            this.$refs.TimeWrap[a].style.borderColor = "#fff";
            this.$refs.TimeWrap[a].style.color = "#000";
            this.$refs.TimeWrap[a].style.border = "1px solid #bfcbd9";
            this.$refs.TimeWrap[a].className = "selfSeverTimeSt";
          }
          this.dialogVisible = false;
        },
    /*更换时间相关操作结束 */                
  },
  mounted() {
    this.choose = this.dict.refund_type;
    //服务频次字典量
    this.frequencyOptions = this.dict.frequency_options;
    this.gehuanfrequencyOptions = this.dict.frequency_options;
    this.becaussOptions = this.dict.cancel_type;
    //获取订单的本地存储ID
    var orderId = window.localStorage.getItem("grouporderId");
    //orderId
    if (this.$route.query.id == undefined) {
      this.getOrderAllInf(orderId);
    } else {
      this.getOrderAllInf(this.$route.query.id);
    }
  }
};
</script>
<style   scoped>
.exptyDiv{width:100%;height:20px;line-height:20px;background:#eef1f6;position:absolute;top:-11px;}
.selfPaddingLeft20{
  padding-left:20px;
}
.PositionRelative{
  position:relative;
}
.aaa .el-form-item__error {
  color: #000;
}
.activeStyle {
  color: #4c70e8;
  border-color: #4c70e8 !important;
}
/* 自定义单元格样式 */
.selfTd {
  text-align: center;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #dfe6ec;
}
.selfTd:last-child {
  border: none;
}
.selfLabelStyle {
  display: inline-block;
  position: absolute;
  left: -82px;
  color: red;
}
.frequencyTabs {
  float: left;
  border: 1px solid #ccc;
  cursor: pointer;
  width: 80px;
  height: 34px;
  line-height: 34px;
  margin: 0 20px 0 0;
  text-align: center;
  border-radius: 4px;
}

.severPromitINf {
  float: left;
  font-size: 12px;
  color: #576475;
}
.selftime {
  font-size:14px;
  margin-top: -16px;
}
ul li {
  list-style: none;
}
.i-delete1 {
    position: absolute;
    right: 20px;
    top: 35px;
    cursor: pointer;
    font-size: 12px;
}
.working1 {
  border: 1px solid #bfcbd9;
  border-top: none;
  box-sizing: border-box;
  padding: 0 0 0 20px;
}
.working1 > li {
  position: relative;
  border-bottom: 1px solid #f2f2f2;
  padding-top: 15px;
}
.selfwoking-div {
  display: flex;
  flex-direction: column;
}
.btn-styl {
  height: 25px;
  line-height: 25px;
  display: inline-block;
  width: 60px;
}
.tech-green {
  border: solid 1px #4c70e8 !important;
  background: url("../../../static/icon/Selected.png") no-repeat;
  background-size: 15px 15px;
  background-position: bottom right;
}
.tech-dir {
  border: 1px solid #a7a7a7 !important;
  background: url("../../../static/icon/eee.png") no-repeat;
  background-size: 15px 15px;
  background-position: bottom right;
}
.selfCheckBoxsday {
  width: 32px;
  height: 24px;
  line-height: 24px;
  /* border: 1px solid #bfcbd9; */
  display: inline-block;
  /* text-align: center; */
  position: relative;
  /* margin-left: 20px; */
  font-size: 12px;
  cursor: pointer;
}
.tech-order-jn {
  width: 300px;
  height: 38px;
  border: 1px solid #bfcbd9;
  position: relative;
  line-height: 38px;
}

.tech-order-jn-son,
.tech-order-jn-sons {
  width: 100%;
  border: 1px solid #bfcbd9;
  background: #fff;
  float: left;
}
.wirkTimes {
  width: 550px;
  border-top: none;
  min-width: 450px;
}
.wirkTimes .el-input__inner {
  border: 1px solid #bfcbd9 !important;
}
.tech-order-btn {
  background: #fff;
  color: #4c70e8;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 10px;
}
.tech-order-jn-sont {
  width: 545px;
  height: 40px;
  /* margin-top: 15px; */
  border: 1px solid #bfcbd9;
  /* display: flex; */
  /* position: absolute; */
  background: #fff;
  z-index: 1;
  top: 35px;
  left: -1px;
}

.tech-order-posi {
  margin: 15px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
}

.tech-order-posis {
  background-color: #fff;
  border: 1px solid #bfcbd9;
  margin: 0 5px;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
  padding: 0 7px;
  justify-content: center;
  overflow: hidden;
}

.selfToolTip1 {
  margin: 0 auto;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.refundStatusStyle {
  color: #8391a5;
  margin-left: 75px;
  margin-top: -20px;
  font-size: 12px;
}
.searchHeader .el-input-group__prepend .el-input__inner {
  width: 200px;
  text-align: center;
}
.searchHeader .el-select {
  width: 180px;
}
.searchHeader {
  width: 380px;
}
.selfToolTip {
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.width180 {
  width: 180px !important;
}
.selftechNameStyle {
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.selfComdityNameStyle {
  width: 185px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tableHeader {
  position: absolute;
  top: 0px;
  z-index: 9999;
}
.selfTdStyle1 {
  vertical-align: middle;
  height: 70px;
  line-height: 70px;
}
.selfTdStyle2 {
  vertical-align: middle;
  height: 70px;
  line-height: 70px;
}
.promMessage {
  width: 90%;
  height: 20px;
  line-height: 20px;
  margin-left: 22px;
  color: #8391a0d9;
}
.mark {
  background: url(../../../static/icon/Selected.png) right bottom no-repeat;
  background-size: 20px 20px;
}
.selfTabProm {
  width: 100%;
  text-align: center;
  height: 200px;
  line-height: 200px;
}
.picHeader {
  margin-top: 10px;
}
.selfDateStyle {
  width: 80%;
  margin-left: 20px;
}
.marginTopDec46 {
  margin-top: -46px;
}
.selfSeverTimeSt {
  width: 80px;
  height: 34px;
  line-height: 34px;
  border: 1px solid #bfcbd9;
  display: inline-block;
  text-align: center;
  position: relative;
  margin-left: 20px;
  margin-top: 10px;
  font-size: 14px;
  cursor: pointer;
}
.selfMarTL {
  margin-top: 0px;
}
.selfbeizhu {
  max-width: 800px;
  word-break: break-all;
  word-wrap: break-word;
}
.selfbeizhu1 {
  width: 660px;
  float: left;
  display: block;
  margin-left: 102px;
  margin-top: -15px;
  word-break: break-all;
  word-wrap: break-word;
}
.width120 {
  width: 120px;
}
.marginBottom20 {
  margin-bottom: 20px;
}
.marginTop20 {
  margin-top: -20px;
  padding-left: 25px;
  font-size: 12px;
}
.refundSpan {
  padding-left: 10px;
}
.selfPromINF {
  font-size: 12px;
  margin-top: 10px;
  color: red;
}
.FloatRight {
  float: right;
}
.FloatLeft {
  float: left;
}
.selfTableWrapONE {
  margin-top: 20px;
  overflow: hidden;
  width: 660px;
  height: 280px;
  position: relative;
}
.table-d {
  width: 677px;
  overflow-y: scroll;
  height: 276px;
  margin-left: 15px;
}
.selfTableWrapONE1 {
  margin: 0 20px;
  position: relative;
}
.table-d1 {
  width: 677px;
}
.selfTable1,
.selfTable1 tr th,
.selfTable1 tr td {
  border: 1px solid #eee;
}
.selfTable1 {
  text-align: center;
  border-collapse: collapse;
  padding: 2px;
}
.selfpromMessageTab {
  position: relative;
  width: 100%;
  margin-top: 20px;
  margin-left: 10px;
}
.NowTabs {
  color: #8391a0d9;
  float: left;
  width: 100%;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 15px;
}
.techNameStyle {
  width: 83px;
  display: inline-block;
  font-size: 14px;
  overflow: hidden;
  margin-left: -9px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tabWrap1 {
  width: 145px;
  padding: 0 5px;
  font-size: 10px;
  display: inline-block;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin: 3px 6px 3px 8px;
  background: #f0f4f5;
  color: #7a838a;
  font-size: 14px;
  position: relative;
  border: 1px solid #bfcbd9;
}
.height70 {
  height: 70px;
}
.imgStyle {
  display: block;
}
.fontSize12 {
  font-size: 12px;
}
.techTabWrap {
  width: 690px;
  float: left;
  padding-left: 30px;
  padding-bottom: 20px;
}
.userHeaderStyle {
  width: 85px;
  height: 90px;
  line-height: 90px;
  border: 1px solid #ccc;
}
.selfTable,
.selfTable tr th,
.selfTable tr td {
  border: 1px solid #eee;
}
.selfTable {
  text-align: center;
  border-collapse: collapse;
  padding: 2px;
}
.editServiceTabHeader {
  background: #f8f8f9;
  height: 30px;
}
.editServiceTabSel {
  width: 120px;
  margin-top: 3px;
  margin-bottom: 3px;
}
.editServiceTabInputNum {
  width: 120px;
  margin-top: 3px;
  margin-bottom: 3px;
}
.height30 {
  height: 30px;
}
.width1000 {
  min-width: 900px;
}
.width900 {
  max-width: 900px;
}
.picWrap {
  width: 100%;
  height: 120px;
  line-height: 120px;
  padding-left: 82px;
}
.marginLeft82 {
  margin-left: 82px;
}
.marginBOT20 {
  margin-bottom: 20px;
}
.picStyle {
  display: inline-block;
  width: 250px;
  margin-right: 20px;
  margin-top: 20px;
}
.addorder-container {
  width: 100%;
  font-size: 12px;
  float: left;
  background: #eef1f6;
  /* padding: 20px 5px; */
}
.order-selfTd {
  text-align: center;
  width: 128%;
  margin-left: -13.8%;
  height: 49px;
  line-height: 49px;
  border-bottom: 1px solid #dfe6ec;
}
.order-selfTd:last-child {
  border: none;
}
.orderOneBar {
  width: 95%;
  height: 34px;
  line-height: 34px;
}
.selfMarLeft70 {
  display: inline-block;
  margin-top: -4px;
  margin-left: -50px;
  position: absolute;
  cursor: pointer;
}
.selfTableWrapStyle {
  width: 720px;
  padding-left: 30px;
  padding-bottom: 20px;
  padding-top: 40px;
}
.selfTableWrapStyle1 {
  width: 690px;
  padding-bottom: 20px;
  margin-top: 20px;
}
.yuyueStyle{
  margin: 20px 0 20px 0px;font-size:12px;width:50%;display:inline-block;
}
.selfTableWrapStyle2 {
  min-width: 100%;
  padding-bottom: 20px;
  margin-top: -20px;
}

.servicerFont {
  cursor: pointer;
  color: #4c70e8;
}
.self-table-style {
  width: 98%;
  display: inline-block;
  margin-top: 20px;
}
.selfWrap1 {
  width: 100%;
}
.marginTop15 {
  margin-top: 15px;
}
.addTechWrap {
  width: 110px;
  height: 32px;
  line-height: 32px;
  margin-top: 10px;
  background: #ccc;
  cursor: pointer;
}
.plusComb {
  display: block;
  float: left;
  width: 32px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  background: #3a5fcd;
  text-align: center;
  font-size: 20px;
}
.plusComtent {
  display: block;
  float: left;
  width: 78px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  background: #4c70e8;
  text-align: center;
  font-size: 14px;
}
.width390 {
  width: 390px;
}
.height25 {
  height: 25px;
}
.orderInf-cancel {
  width: 80px;
  float: right;
  height: 34px;
  font-size: 14px;
  font-weight: 500;
  line-height: 34px;
  cursor: pointer;
  border: 1px solid #4c70e8;
  text-align: center;
  display: block;
  color: #4c70e8;
}
.custom-action {
  margin-left: 30px;
  font-size: 14px;
  font-weight: 600;
}
.custom-action1 {
  font-size: 14px;
  font-weight: 600;
}
.thrid-bar {
  padding-top: 20px;
  width: 100%;
  float: left;
  background: #fff;
}
.leftArea {
  width: 320px;
  float: left;
}
.rightArea {
  width: 320px;
  float: left;
  margin-left: 50px;
}
.contentLine {
  margin: 20px 0 20px 30px;
  font-size: 12px;
}
.contentLine1 {
  margin: 20px 0 20px 0px;
  font-size: 12px;
}
.lineTitle {
  display: inline-block;
  width: 80px;
}

.lineContent {
  display: inline-block;
  margin-left: 20px;
  width: 170px;
}
.lineContent3 {
  width: 500px;
  margin-left: 20px;
  display: inline-block;
}
.lineContent1 {
  display: inline-block;
}
.lineContent2 {
  display: inline-block;
  margin-left: 20px;
}
.lineContentWidth {
  display: block;
  width: 900px;
  margin-left: 100px;
  margin-top: -14px;
}
.selfTableHEADTD {
  background: #eef1f6;
  height: 46px;
  border: none !important;
}
.orderInfoHeaderPic {
  width: 98%;
  display: inline-block;
}
.orderinfoTechNameStyle {
  width: 180px;
  margin-left: 15px;
}
.orderinfoTechSearchStyle {
  margin-right: 15px;
}
.orderinfoTechTablePadding {
  padding-top: 44px;
}
</style>




