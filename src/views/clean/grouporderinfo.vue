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
                      <span class="lineContent">{{otherInfo.orderNumber}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">服务机构:</span>
                      <span class="lineContent width180">{{otherInfo.orgName}}</span>
                   </p>                                      
                   <p class="contentLine">
                      <span class="lineTitle">用户姓名:</span>
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
                          <span v-if="otherInfo.orderStatus =='close'">已关闭</span>
                          <span v-if="otherInfo.orderStatus =='stop'">已暂停</span>
                          <span v-if="otherInfo.orderStatus =='success'">已成功</span>
                          <span v-if="otherInfo.orderStatus =='waitdispatch'">待派单</span>
                      </span>
                   </p>                  
                   <p class="contentLine">
                      <span class="lineTitle">服务站:</span>
                      <span class="lineContent" style="min-width:186px;">{{otherInfo.stationName}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">用户电话:</span>
                      <span class="lineContent" style="min-width:186px;">{{otherInfo.stationName}}</span>
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
        <!--服务信息开始-->
        <div class="thrid-bar marginTop15">
            <div class="custom-action">服务信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">组合商品名称:</span>
                      <span class="lineContent">周期日常保洁</span>
                   </p>                                                                           
                </div>
                <div class="rightArea width390">
                   <p class="contentLine">
                      <span class="lineTitle">组合商品价格:</span>
                      <span class="lineContent">￥300.00/小时</span>
                   </p>                                     
                </div>
                <div class="rightArea width390">
                   <p class="contentLine">
                      <span class="lineTitle">建议服务时长:</span>
                      <span  class="lineContent">{{otherInfo.serviceHour}}</span>
                   </p>                                     
                </div>
                <div  style="width:960px;">
                   <p class="contentLine" >
                      <span  class="lineTitle">固定技师:</span>
                      <span  class="lineContent3">
                        <span>李四</span>
                        <span style="margin-left:48px;">1581655090</span>
                        <span style="margin-left:91px;"><input type="button"  class="button-cancel height25"  @click="gaiPai1()"  value="更换固定技师"></span>
                      </span>
                   </p>
                    <div style="float:left;width:80px;margin-left:30px;">固定服务时间:</div>
                    <div  style="float:left;width:800px;margin-left:20px;" >
                      <div style="float:left;width:80px;">一周多次</div>
                      <div style="float:left;width:420px;">
                        <div style="float:left;width:140px;">
                            <p style="line-height:20px;">每周一   08:00 ~ 12:00</p>
                            <p style="line-height:20px;">每周五   08:00 ~ 12:00</p> 
                            <p style="line-height:20px;">每周一   08:00 ~ 12:00</p>
                            <p style="line-height:20px;">每周五   08:00 ~ 12:00</p>                                                                                                                                          
                        </div>
                        <div style="width:100px;height:100%;position: absolute;top:38%;padding-left: 161px;margin-top: -24px;">
                             <input type="button"  class="button-cancel height25"  @click="changeguTime" value="更换固定时间">
                        </div>
                      </div>                      
                    </div>
                    <div style="float:left;">
                        <p  class="contentLine"><a v-if="false" href="javascript:void(0);" style="color:#3a5fcd;cursor:pointer;" target="" @click="gotoRefund(otherInfo.orderNumber)  " >点击查看退款信息</a></p>                                                      
                    </div>                                                                               
                </div>                                  
            </div>                       
            <div class="selfTableWrapStyle" >                    
                    <el-table
                      :data="tableData"
                      border
                      class="self-table-style"
                      style="margin-top:20px;"
                      >
                      <el-table-column
                        align="center"
                        label="服务项目"
                        prop="itemName"
                        > 
                      </el-table-column>                      
                      <el-table-column
                        align="center"
                        label="商品名称"
                        prop="goodsName"
                        >
                      </el-table-column>                     
                      <el-table-column
                        align="center"
                        label="组合单价/单位">
                          <template scope="scope">
                              <span>￥{{scope.row.payPrice}}/{{scope.row.goodsUnit}}</span>
                          </template>	                                           
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="商品数量"
                        prop="goodsNum">                    
                      </el-table-column>                      
                      <el-table-column
                        align="center"
                        label="小计">
                          <template scope="scope">
                              <span>￥{{scope.row.payPriceSum}}</span>
                          </template>	                                           
                      </el-table-column>                      
                    </el-table>
            </div>                                     		
		    </div>
        <!--服务信息结束-->
        <!--技师信息开始-->
        <!-- <div class="thrid-bar marginTop15">
            <div class="custom-action">技师信息</div>
            <div class="hr-style"></div>
            <div class="techTabWrap">
                <div class="addTechWrap"  v-if="btnShow.indexOf('order_addTech') > -1" @click="gaiPai('add','')">
                  <span class="plusComb">&#10010;</span>
                  <span class="plusComtent">增加技师</span>
                </div>
                <div class="selfTableWrapStyle1">                
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
                        label="操作">
                          <template scope="scope">
                                <div style="cursor:pointer;color:#4c70e8"  v-if="btnShow.indexOf('order_dispatch') > -1" @click="gaiPai('edit',scope.row)">改派</div>                    
                          </template>                    
                      </el-table-column>                  
                    </el-table>
                </div>
            </div>                     		
		    </div> -->
        <!--技师信息结束-->        
        <!--订单取消开始-->
        <!-- <div class="thrid-bar marginTop15" v-if="otherInfo.orderSource =='own' && otherInfo.orderStatus =='cancel'">
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
		    </div> -->
        <!--订单取消结束-->
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
        <div class="thrid-bar marginTop15" >
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
        <!--技师信息开始-->
        <div class="thrid-bar marginTop15">
            <div class="custom-action">已有订单信息</div>
            <div class="hr-style"></div>
            <div class="techTabWrap">
                <div>
                  <p style="margin: 20px 0 20px 0px;font-size:12px;color: #8391a5;" >总服务次数为：50次 已服务10次 剩余40次</p>
                    <!--选项卡开始-->
                    <el-tabs class="self-el-tabs"  style="margin-top:-20px;" v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane  v-for="(value,key,index) in orderTest" :label="value" :name='key' :key="index"></el-tab-pane>		
                    </el-tabs>
                    <!--选项卡结束-->                 
                </div>               
                <div class="selfTableWrapStyle2">                
                    <el-table
                      :data="ordertableData"
                      border                  
                      class="orderInfoHeaderPic">
                      <el-table-column
                        min-width="110"
                        align="center"
                        label="订单编号"
                        prop="orderNumber"
                        >
                        
                      </el-table-column>
                      <el-table-column
                        min-width="90"
                        align="center"
                        label="服务时间"
                        prop="serverTime"
                        >                        
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="服务状态">
                          <template scope="scope">
                            <span v-if="scope.row.serviceStatus =='wait_service'">待服务</span>
                            <span v-if="scope.row.serviceStatus =='started'">已上门</span>
                            <span v-if="scope.row.serviceStatus =='finish'">已完成</span>
                            <span v-if="scope.row.serviceStatus =='cancel'">已取消</span>
                          </template>	                    
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="订单状态">
                          <template scope="scope">
                          <span v-if="scope.row.orderStatus =='cancel'">已取消</span>
                          <span v-if="scope.row.orderStatus =='dispatched'">已派单</span>
                          <span v-if="scope.row.orderStatus =='finish'">已完成</span>
                          <span v-if="scope.row.orderStatus =='close'">已关闭</span>
                          <span v-if="scope.row.orderStatus =='stop'">已暂停</span>
                          <span v-if="scope.row.orderStatus =='success'">已成功</span>
                          <span v-if="scope.row.orderStatus =='waitdispatch'">待派单</span>                            
                          </template>	                    
                      </el-table-column> 
                      <el-table-column
                        min-width="90"
                        align="center"
                        label="完成时间"
                        prop="serverTime"
                        >                        
                      </el-table-column>                                           
                      <el-table-column
                        prop="techPhone"
                        align="center"
                        label="下单时间">
                      </el-table-column>                  
                      <el-table-column
                        align="center"
                        width="330"
                        label="操作">
                          <template scope="scope">
                                <input type="button"  class="button-cancel height25"  @click="changeTime(scope.row)" value="更换时间">
                                <input type="button"  class="button-cancel height25"  @click="changeTech(scope.row)" value="更换技师">
                                <input type="button"  class="button-cancel height25"  @click="lookRemark(scope.row)" value="查看备注">                   
                          </template>                    
                      </el-table-column>                  
                    </el-table>
                </div>
            </div>                     		
		    </div>
        <!--技师信息结束-->        
        <el-dialog
          title="查看备注信息"
          class="selfCustomerDialog"
          :visible.sync="RemarkInfFlag"
          :close-on-click-modal="false"
          >
            <!--下单用户信息开始-->
            <div class="thrid-bar" style="margin-top:-38px;">
                <div class="custom-action1">用户备注</div>
                <div class="hr-style1"></div>
                <div class="selfWrap1">
                    <div class="leftArea">
                      <p class="contentLine1">
                          <span class="lineTitle FloatLeft">备注:</span>
                          <span class="selfbeizhu1">
                            {{otherInfo.customerRemark}}
                          </span>
                      </p>
                      <p class="contentLine1">
                          <span class="lineTitle"></span>
                          <span class="lineContent width1000">
                            <div class="picWrap marginLeft82">
                                <div class="picStyle" v-for="item in otherInfo.customerRemarkPics" :key="item"> 
                                  <img :src="imgSrc+item+picWidth250"/>
                                </div>
                            </div>
                          </span>
                      </p>                                                        
                    </div>
                </div>                                     		
            </div>
            <!--下单用户信息结束-->        
            <!--订单备注开始-->
            <div class="thrid-bar marginTop15">
                <div class="custom-action1">订单备注</div>
                <div class="hr-style1"></div>
                <div class="selfWrap1">
                    <div class="leftArea" style="width:100%;">
                      <p class="contentLine1">
                          <span class="lineTitle FloatLeft">备注:</span>
                          <span class="lineContent1 selfbeizhu">{{otherInfo.orderRemark}}</span>
                      </p>
                      <p class="contentLine1">
                          <span class="lineContent2 width900">
                            <div class="picWrap selfMarTL">
                                <div class="picStyle" v-for="item in otherInfo.orderRemarkPics" :key="item">
                                  <img :src="imgSrc+item+picWidth250"/>
                                </div>
                            </div>
                          </span>
                      </p>                                                        
                    </div> 
                </div>                                     		
            </div>
            <!--订单备注结束-->               
            <!--业务人员信息开始-->
            <div class="thrid-bar marginTop15">
                <div class="custom-action1">业务人员信息</div>
                <div class="hr-style1"></div>
                <div class="selfWrap1">
                    <div class="leftArea">
                      <p class="contentLine1">
                          <span class="lineTitle">姓名:</span>
                          <span class="lineContent">{{otherInfo.businessName}}</span>
                      </p>
                      <p class="contentLine1">
                          <span class="lineTitle FloatLeft">备注:</span>
                          <span class="selfbeizhu1">
                            {{otherInfo.businessRemark}}
                          </span>
                      </p>
                      <p class="contentLine1">
                          <span class="lineTitle"></span>
                          <span class="lineContent width1000">
                            <div class="picWrap marginLeft82">
                                <div class="picStyle" v-for="item in otherInfo.businessRemarkPics" :key="item"> 
                                  <img :src="imgSrc+item+picWidth250"/>
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
            <div class="thrid-bar marginTop15 marginBOT20" >
                <div class="custom-action1">门店信息</div>
                <div class="hr-style1"></div>
                <div class="selfWrap1">
                    <div class="leftArea">
                      <p class="contentLine1">
                          <span class="lineTitle">名称:</span>
                          <span class="lineContent">{{otherInfo.shopName}}</span>
                      </p>
                      <p class="contentLine1">
                          <span class="lineTitle FloatLeft">地址:</span>
                          <span class="lineContent">
                            <el-tooltip v-if="otherInfo.shopAddr != undefined"  placement="left" :disabled="otherInfo.shopAddr.length< 16" :content="otherInfo.shopAddr">
                              <div class="selfToolTip">{{otherInfo.shopAddr}}</div>
                            </el-tooltip>                                                
                          </span>
                      </p>
                      <p class="contentLine1">
                          <span class="lineTitle FloatLeft">备注:</span>
                          <span class="selfbeizhu1">
                            {{otherInfo.shopRemark}}                        
                          </span>
                      </p>
                      <p class="contentLine1">
                          <span class="lineTitle"></span>
                          <span class="lineContent width1000">
                            <div class="picWrap marginLeft82">
                                <div class="picStyle" v-for="item in otherInfo.shopRemarkPics" :key="item">
                                  <img :src="imgSrc+item+picWidth250"/>
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
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large" :disabled="timeSaveFlag"  @click="RemarkInfFlag = false">关闭</button>
            </div>
        </el-dialog>        
        <!--已有订单中更换技师与改派共用弹窗开始-->
        <el-dialog title="选择技师" :visible.sync="dialogTableVisible" class="selfDialogWidth" :close-on-click-modal="false">
          <el-input placeholder="输入要搜索的姓名" v-model="techName" class="orderinfoTechNameStyle"></el-input> 
          <button class="button-large FloatRight  orderinfoTechSearchStyle" @click="searchTeh">查询</button>
          <div class="NowTabs">当前选择标签：</div>
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
                <td  class="selfTableHEADTD" align="center" width="73px">性别</td>
                <td  class="selfTableHEADTD" align="center" width="161px">岗位性质</td>							
              </tr>
              <div class="orderinfoTechTablePadding">
                  <tr v-for="item in listTech" :key="item.techId"  ref="tableItem1" class="selfTdStyle1">
                    <td width="72px" class="fontSize12"  align="center">
                      <el-checkbox v-if="status == 'add'" v-model="item.techChecked" @change="ChangeTech(item)"></el-checkbox>
                      <el-radio v-if="status == 'edit'" :label="item.techId" v-model="radio1" @change.native="getCurrentRow1(item.techId)">&nbsp;</el-radio>
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
              <div v-if="listTech.length == 0  || listTech.length == undefined" class="selfTabProm">暂无数据</div>
              
            </div>            
          </div> 	  	  
          <div slot="footer" class="dialog-footer" style="text-align:center">
            <button class="button-large" :disabled="techSaveFlag" @click="submitForm2()">保存</button>
            <button class="button-cancel" @click="cancelForm2()">取 消</button>
          </div>
        </el-dialog>
        <!--已有订单中更换技师与改派共用弹窗结束-->                                                    
        <!--更换固定技师弹窗开始-->
        <el-dialog title="选择技师" :visible.sync="dialogTableVisible1" class="selfDialogWidth" :close-on-click-modal="false">
          <el-input placeholder="输入技师姓名" v-model="techName1" class="orderinfoTechNameStyle"></el-input> 
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
                  <tr v-for="item in listTech1" :key="item.techId"  ref="tableItem1" class="selfTdStyle1">
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
            <button class="button-large" :disabled="techSaveFlag" @click="submitForm21()">确定更换</button>
            <button class="button-cancel" @click="cancelForm21()">取 消</button>
          </div>
        </el-dialog>
        <!--更换固定技师弹窗结束-->        
        <!--选择服务时间弹窗开始-->
        <el-dialog
          title="选择服务时间"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
          class="selfDialogWidth"
          >
            <el-form  :model="formInline" :rules="formInline1rules" ref="formInline" label-width="80px">
              <div>
                  <el-form-item label="选择日期" prop='Date' >
                          <el-select v-model="formInline.Date" class="selfDateStyle"  @change='dateChange' placeholder="请选择">
                            <el-option
                              v-for="item in options2"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>                      
                  </el-form-item>
                  <el-form-item label="选择时间" prop='Time'>
                        <el-input type="hidden" value='' v-model='formInline.Time'></el-input>                  
                        <div class="marginTopDec46">
                          <div class="selfSeverTimeSt" ref="TimeWrap"  v-for="(item,index) in timeObj" :key="index" @click="timeChange(index,item)">{{item.serviceTimeStr}}</div>                                                                 
                        </div> 
                        <div v-if="timeObj.length != 0" class="promMessage" style="font-size:12px;">*  更换服务时间，只会更改本次订单的服务时间</div>                                      
                  </el-form-item>
                  <el-form-item label="">              
                  <div class="button-large-fourth" @click="searchSeverTech1">查询服务技师</div> 
                  </el-form-item>
              </div>
              <div v-if="gudingFlag1">
                <div style="margin-left:80px;font-size:12px;">
                    <p>*  该订单的技师为：李四    15801655090</p>
                    <p>更换服务时间，可能会影响已派技师，若已派技师无空闲时间，可选择其他技师</p>
                </div>               
                <el-form-item label="选择技师" prop="Tech">             
                  <div style="margin-top: -10px;">                
                      <el-table
                        :data="tableData1"
                        border                  
                        class="orderInfoHeaderPic">
                        <el-table-column
                          min-width="65"
                          align="center"
                          label="选择"                        
                          > 
                            <template scope="scope">
                              <el-radio :label="scope.row.techName" v-model="radio3" @change.native="getCurrentRow3(scope.row.techName)">&nbsp;</el-radio>
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
              <button class="button-large" :disabled="timeSaveFlag"  @click="submitTime('formInline')">保存</button>
              <button class="button-cancel"  @click="cancelTime('formInline')">取 消</button>
            </div>
        </el-dialog>
        <!--选择服务时间弹窗结束-->
        <!--取消订单弹窗开始-->
        <el-dialog
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
        </el-dialog>
        <!--取消订单弹窗结束--> 
        <!--退款详情弹窗开始-->
        <el-dialog
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
        </el-dialog>
        <!--退款详情弹窗结束--> 
        <!--更换技师弹窗开始-->
        <el-dialog
          title="技师选择"
          :visible.sync="changeTechFlag"
          :close-on-click-modal="false"
          class="selfDialogWidth1"
          >
          <div class="selfPromInfStyle1"> <input type="button"   class="button-cancel height25" style="float:right;"  v-if="btnShow.indexOf('order_addTech') > -1" @click="gaiPai('add','')"  value="增加技师"></div>
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
                label="操作">
                  <template scope="scope">
                        <div style="cursor:pointer;color:#4c70e8"  v-if="btnShow.indexOf('order_dispatch') > -1" @click="gaiPai('edit',scope.row)">改派</div>                    
                  </template>                    
              </el-table-column>                  
            </el-table>                     
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-cancel"   @click="changeTechOk()">关闭</button>
            </div>
        </el-dialog>
        <!--更换技师弹窗结束-->
        <!--固定服务时间弹窗开始-->
        <el-dialog
          title="设置固定服务时间"
          :visible.sync="testFlag"
          class="selfDialogWidth2"
          :close-on-click-modal="false"
          >
            <el-form  :model="Orderform1" :rules="orderrules1" ref="Orderform1" label-width="84px" label-position="left" >
                <el-form-item label="服务频次：" prop="frequencySelecte" >
                  <span class="selfLabelStyle">*</span>
                  <div class="frequencyTabs"  v-for="(value,key,index) in frequencyOptions" ref="frequencyTabs" :label="value" :name='key' :key="index" @click="Changefrequency(key,index)" >{{value}}</div>
                  <div style="font-size: 12px;color: #576475;">* 目前固定服务时间： 一周多次  每周二   13:00 ~ 15:00、每周五   13:00 ~ 15:00</div>
                </el-form-item>
                <el-form-item label="服务时长：" style="margin-top: -22px;">
                  <span class="selfLabelStyle">*</span>
                  <el-input-number class="selfINputNumStyle"  v-model="severHour" :min='1' :debounce='1000'  :max="999999" style="width:120px;" @change="numberChange"></el-input-number>
                   <div style="font-size: 12px;color: #576475;">* 目前的服务时长为3小时 </div>
                </el-form-item>                                  
                <el-row style="margin-top:-20px;">  
                  <el-col :span="17" class="addTime">
                    <el-form-item label="服务时间：" prop="workTimes" style="min-width: 450px;">
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
                                        
                                        :disabled="disbArr.indexOf(item.id)!=-1" ref="sexOption" 
                                        @click="roomSel1(item)" :key="$index" v-for="(item,$index) in sexDay" 
                                        :class="[{'tech-green':roomSelNum.indexOf(item.id)!=-1},{'tech-dir':disbArr.indexOf(item.id)!=-1}]"
                                        :value="item.name"
                                      >
                                    </div>
                                  </div>
                                  <div style="margin-top:10px;">
                                    <div class="selfCheckBoxsday">时段</div>
                                    <el-time-select placeholder="起始时间" @change="endEmpty" :editable="false" v-model="startTime" :picker-options="addtimeFlag?{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '24:00',
                                        minTime:startEnd.startNew,
                                        maxTime:startEnd.endNew 
                                      }:{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '24:00',
                                        maxTime:startEnd.endNew 
                                      }" class="tech-daytim" style="width:231px;">
                                    </el-time-select>
                                    <el-time-select style="width:231px;" placeholder="结束时间" :editable="false" v-model="endTime" :picker-options="{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '24:00',
                                        minTime:startTime || startEnd.startNew,
                                        maxTime:startEnd.endNew
                                      }">
                                    </el-time-select>
                                  </div>
                                </div>
                                <div style="margin:10px 10px 10px;">
                                  <span class="button-large btn-styl" @click="techClick">确认</span>
                                  <input type="button" class="button-cancel btn-styl" style="margin-left:20px" @click="addtimeno" value="取消">
                                </div>
                              </div>
                                                         
                          </el-collapse-transition>                          
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="17" v-show="teachArr.length>0">
                      <el-form-item>
                        <ul class="working" style="width:550px;margin-top: -21px;">
                          <li v-for="(item,index) in teachArr" :key="index">
                            <div>
                              <div class="woking-div">
                                <div ><span v-for="(data,i) in item.weeks" :key="i">{{data.name+"、"}}</span></div>
                                <div class="time">{{item.startTime+"~"+item.endTime}}</div>
                              </div>
                            </div>
                            <div>
                              <i class="i-delete el-icon-close" @click="deletes(item,index)"></i>
                            </div>
                          </li>
                        </ul>
                      </el-form-item>
                    </el-col>
                    <div class="severPromitINf" v-show="teachArr.length>0">* 两周后的订单将按照更换后的固定时间分配</div>                    
                  </el-row>           
                 <el-form-item label="选择日期" prop='Date' >
                          <el-select v-model="Orderform1.Date" style="width:550px;"  @change='dateChange1' placeholder="请选择第一次服务日期">
                            <el-option
                              v-for="item in options3"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>                      
                  </el-form-item>
                  <el-form-item label="">              
                  <div class="button-large-fourth" @click="searchSeverTech">查询服务技师</div> 
                  </el-form-item>
              <div v-if="gudingFlag">
                <div style="margin-left:80px;font-size:12px;">
                    <p>*  更换固定服务时间，可能会影响固定技师； 目前该订单的固定技师为：李四    15801655090</p>
                </div>               
                <el-form-item label="选择技师" prop="Tech">             
                  <div style="margin-top: -10px;">                
                      <el-table
                        :data="tableData1"
                        border                  
                        class="orderInfoHeaderPic">
                        <el-table-column
                          min-width="65"
                          align="center"
                          label="选择"                        
                          > 
                            <template scope="scope">
                              <el-radio :label="scope.row.techName" v-model="radio4" @change.native="getCurrentRow4(scope.row.techName)">&nbsp;</el-radio>
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
              <button class="button-large" @click="setOk('Orderform1')">确定</button>
              <button class="button-cancel" @click="setCancel('Orderform1')" >取 消</button>
            </div>
        </el-dialog>
        <!--固定服务时间弹窗结束-->        

                                         
  </div>
</template>

<script>
import {
  getOrderInf, //用订单ID获取页面相关信息
  addTechData, //服务技师获取
  ChangeTimeData, //请求服务时间下拉菜单值
  dispatchTechData, //改派技师获取
  addTechSave, //新增技师保存
  dispatchTechSave, //改派技师保存
  saveTime, //更换服务时间保存
  orderCancelFun, //取消订单保存
  orderRefundInit, //退款
  orderRefundSave //退款保存
} from "@/api/order";
import { orderServer } from "@/api/serviceManage";
import util from "@/utils/date";
var loading;
export default {
  name: "orderinfo",
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
        callback(new Error("请选择服务时间段"));
      }
    };    
    return {
      gudingFlag:false,//固定时间改派技师显示开关
      gudingFlag1:false,//更换时间改派技师显示开关
      severHour:'',
      frequencyOptions:'',
      frequencySelecte:'week_some',
      addtimeFlag: true,
      roomSelNum: [],
      disbArr: [],
      startEnd: { start: "09:00", end: "18:00" },
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
      testFlag:false,
      changeTechFlag:false,
      radio1:'',
      radio3:'',
      radio4:'',
      listTech1: [],
      techName1: "",
      radio:'',
      orderTest: [],
      active1: "",
      activeName: "wait_service", //当前tabs
      RemarkInfFlag:false,
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
      options3: [],
      btnShow: [],
      timeSaveFlag: false,
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
        frequencySelecte:'',
        severHour:'',
        Date:'',
        Tech:'',
      }, 
      orderrules1: {
        workTimes: [{ required: true, validator: WORKTIMES, trigger: "blur" }],
        frequencySelecte :[{ required: true, message: "请选择服务频次", trigger: "change" }],
        Date:[{ required: true, message: "请选择日期", trigger: "change" }],
        Tech: [{ required: true, message: "请选择技师", trigger: "change" }],
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
        Time: [{ required: true, message: "请选择服务时间", trigger: "change" }],
        Tech: [{ required: true, message: "请选择技师", trigger: "change" }],
      },
      timeObj: [], //时间对象
      addressInfo: [], //服务地址信息
      otherInfo: [],
      payInfo: [], //支付信息
      refundInfo: [], //退款信息
      goodsInfo: [], //服务信息
      options: [],
      techName: "",
      isB: false,
      techStationId: "",
      promShow1: false,
      promInf1: "搜索内容不存在!",
      listTech: [],
      selectCommidty: [],
      select: "date",
      formInline: {
        Date: "",
        Time: "",
        Tech:''
      },
      value1: "",
      value2: "",
      tabOptions: [],
      dialogTableVisible: false,
      dialogTableVisible1: false,
      tableData: [],
      tableData1: [],
      ordertableData:[{
        orderNumber:'201805140951500199941896',
        serverTime:'2018-05-18 18:00:00'
      }],
      dialogVisible: false,
      middleA: [],
      changTime: "",
      status: "add",
      aa: "",
      bb: "",
      orderId: "",
      nowTime: "",
      addressInf: [],
      startTime: "09:00",
      endTime: "05:00",
      teachArr: [], 
      roomSel1Arr: [],
      disbArr: [],
      roomSelNum: [],
      workTimes: [
        //工作时间
        { startTime: "", endTime: "", weeks: [] } //开始时间,结束时间，星期几
      ]                 
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
    //固定时间查询服务技师按钮
    searchSeverTech(){
       this.gudingFlag=true;
    },
    //更换时间查询服务技师按钮
    searchSeverTech1(){
       this.gudingFlag1=true;
    },    
    //固定时间服务时长改变
    numberChange(val){
      this.Orderform1.severHour=val
    },
    //固定时间服务频次更换
    Changefrequency(key,index){
      this.frequencySelecte=key;
      this.orderrules1.frequencySelecte=key;
      //选中样式修改
      for(var a=0;a<3;a++){
          if(a == index){
            this.$refs.frequencyTabs[a].style.color='#4c70e8'
            this.$refs.frequencyTabs[a].style.borderColor='#4c70e8'
          }else{
            this.$refs.frequencyTabs[a].style.color=''
            this.$refs.frequencyTabs[a].style.borderColor='#ccc'
          }
      }
    },
    //更换固定时间取消
    setCancel(formName){
      for(var a=0;a<3;a++){
        this.$refs.frequencyTabs[a].style.color=''
        this.$refs.frequencyTabs[a].style.borderColor='#ccc'
      } 
      this.gudingFlag=false;     
      this.$refs[formName].resetFields();
      this.testFlag=false;
    },
    //更换固定时间保存
    setOk(formName){
      this.$refs[formName].validate(val => {
            if (val) {
              for (var i = 0; i < this.teachArr.length; i++) {
                if (this.teachArr[i].endTime == "24:00") {
                  this.teachArr[i].endTime = "23:59:59";
                }
              }
              if (this.teachArr.endTime == "24:00") {
                this.teachArr.endTime = "23:59";
              }
              this.Orderform1.workTimes = this.teachArr;
              //服务频次 this.frequencySelecte
              for(var a=0;a<3;a++){
                this.$refs.frequencyTabs[a].style.color=''
                this.$refs.frequencyTabs[a].style.borderColor='#ccc'
              }
              console.log(this.Orderform1.severHour)               
              this.testFlag=false;
              //this.$refs[formName].resetFields();
            }
        })
      
      
    },
    //更换固定时间按钮
    changeguTime(){
       this.gudingFlag=false;
        this.testFlag=true;
        this.$nextTick(()=>{
            this.$refs.frequencyTabs[1].style.color='#4c70e8'
            this.$refs.frequencyTabs[1].style.borderColor='#4c70e8'
        })
        this.orderrules1.frequencySelecte='week_some';
        this.radio4 = "";
        this.Orderform1.severHour='1';
        this.severHour='1';        
        this.teachArr = []
        this.disbArr = []
    },
    //服务时间段中排序
    by(name) {
      return function(o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
          a = o[name];
          b = p[name];
          if (a === b) {
            return 0;
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1;
          }
          return typeof a < typeof b ? -1 : 1;
        } else {
          throw "error";
        }
      };
    },
    //服务时间段中时间段选择动作    
    techClick() {
      var c1 = Date.parse("2008-08-08 " + this.startTime);
      var c2 = Date.parse("2008-08-08 " + this.endTime);
      if (this.startTime && this.endTime && this.roomSel1Arr.length > 0) {
        if (c2 > c1) {
          var obj = {};
          obj.startTime = this.startTime;
          obj.endTime = this.endTime;
          this.roomSel1Arr = this.roomSel1Arr.sort(this.by("id"));
          obj.weeks = [].concat(this.roomSel1Arr);
          this.disbArr = this.disbArr.concat(this.roomSelNum);
          this.teachArr.push(obj);
          this.isB = false;
          this.startTime = "";
          this.endTime = "";
        } else {
          this.$message({
            type: "warning",
            message: "结束时间不能小于开始时间"
          });
          return false;
        }
      } else {
        this.$message.error("请选择日期、时段");
        return false;
      }
      if (this.disbArr.length > 0) {
        this.disbArr.map(item => {
          if (this.roomSelNum.indexOf(item) != -1) {
            this.remove(this.roomSelNum, this.roomSel1Arr, item);
          }
        });
      }
    },
    //服务时间段中数组去重
    remove(num, arr, val) {
      for (var i = 0; i < num.length; i++) {
        if (num[i] == val) {
          num.splice(i, 1);
          arr.splice(i, 1);
          break;
        }
      }
    },
    //服务时间段中星期几选择    
    roomSel1(item) {
      if (this.roomSelNum.indexOf(item.id) == -1) {
        this.roomSelNum.push(item.id);
        this.roomSel1Arr.push(item);
      } else {
        this.remove(this.roomSelNum, this.roomSel1Arr, item.id);
      }
      item.show = !item.show;
    },    
    endEmpty() {
      if (this.startTime != this.startEnd.start) {
        this.endTime = "";
      }
    },    
    //请选择服务时间段点击
    addtime() {
      this.isB = true;
      this.startTime = this.startEnd.start;
      this.endTime = this.startEnd.end;
    },
   //服务时间段中选择后取消
    addtimeno() {
      this.roomSelNum = [];
      this.roomSel1Arr = [];
      this.isB = false;
    },
    //服务时间段删除
    deletes(item, index) {
      this.disbArr = [];
      var arr = [].concat(this.teachArr);
      arr.splice(index, 1);
      this.teachArr = arr;
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].weeks.length; j++) {
          this.disbArr.push(arr[i].weeks[j].id * 1);
        }
      }
    },        
    //固定技师选择单选改变
    getCurrentRow(value) {
      this.radio = value;
    },
    //更换技师（表格内）单选改变
    getCurrentRow3(value) {
      this.radio3 = value;
      this.formInline.Tech=this.radio3;
    },
    //固定时间更换弹窗单选改变
    getCurrentRow4(value) {
      this.radio4 = value;
      this.Orderform1.Tech=this.radio4;
    },        
    //改派单选改变
    getCurrentRow1(value) {
      this.radio1 = value;
    },        
    //tabs操作需要请求表格数据
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.active1 = tab.name;
      //更改表格内容
    },    
    //查看备注按钮
    lookRemark(row){
      this.RemarkInfFlag=true;
    },
    //更换技师按钮
    changeTech(row){
      this.changeTechFlag=true;
    },
    //更换技师确定
    changeTechOk() {
      this.changeTechFlag=false;
    },
    //更换固定技师弹出层确认
    submitForm21() {
      var tech=[];
      for(var a= 0;a<this.listTech1.length;a++){
        if(this.radio == this.listTech1[a].techId){
          tech.push(this.listTech1[a].techId)
        }
      }
      console.log(tech,'更换固定技师')
      this.dialogTableVisible1 = false;
    },
    //更换固定技师弹出层取消
    cancelForm21() {
      this.listTech1 = [];
      this.dialogTableVisible1 = false;
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
                      this.refundDifferenceType = "";
                      this.getOrderAllInf(this.orderId);
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
      if(this.btnShow.indexOf('refund_view') > -1){
        var src = window.location.href;
        var end = src.indexOf("#") + 1;
        var url = src.substring(0, end);
        this.jumpUrl = url + "/clean/refund?ordernumber=" + orderNumber;
        window.open(this.jumpUrl);
      }else{
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
    //用订单ID获取页面相关信息
    getOrderAllInf(orderId) {
      this.orderId = orderId;
      var obj = {
        id: orderId
      };
      getOrderInf(obj)
        .then(res => {
          if (res.data.code === 1) {
            var AllInfo = res.data.data;
            var nowtime = new Date();
            var severtime = new Date(AllInfo.serviceTime);
            this.nowTime = severtime.getTime() - nowtime.getTime();
            this.otherInfo = AllInfo; //所有其他信息变量
            this.addressInf = AllInfo.addressInfo;
            this.otherInfo.serviceHour = this.formatDuring(
              AllInfo.serviceHour * 3600000
            );
            this.goodsInfo = AllInfo.goodsInfo; //服务信息
            this.tableData = AllInfo.goodsInfo.goods; //服务商品信息表格
            this.tableData1 = AllInfo.techList; //技师信息表格
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
        return minutes + 1 + "分钟";
      } else if (seconds == 0 && minutes == 0) {
        return hours + "小时";
      } else {
        return hours + "小时" + minutes + "分钟";
      }
    },
    //更换时间的保存
    submitTime(formName) {
      this.gudingFlag1=false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.timeSaveFlag = true;
          var time = "";
          for (var a = 0; a < this.timeObj.length; a++) {
            if (this.timeObj[a].selected == true) {
              time = this.timeObj[a].serviceTimeStr;
              this.bb = this.timeObj[a].serviceTimeStr;
            }
          }
          var that = this;
          this.$confirm("此操作将更改技师, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal: false
          })
            .then(() => {
              this.loadingClick();
              //更换时间的保存
              var obj = {
                id: this.orderId,
                serviceTime: this.changTime + " " + time + ":00"
              };
              saveTime(obj)
                .then(res => {
                  this.timeSaveFlag = false;
                  if (res.data.code === 1) {
                    this.$message({
                      type: "success",
                      message: "更换时间成功!"
                    });
                    this.$refs["formInline"].resetFields();
                    this.dialogVisible = false;
                    this.timeObj = [];
                    this.tableData1 = res.data.data.list;
                    this.otherInfo.serviceHour = this.formatDuring(
                      res.data.data.serviceHour * 3600000
                    );
                    this.otherInfo.serviceTime = that.changTime + " " + that.bb;
                    var nowtime = new Date();
                    var severtime = new Date(this.otherInfo.serviceTime);
                    this.nowTime = severtime.getTime() - nowtime.getTime();
                    loading.close();
                  } else {
                    this.timeObj = [];
                    this.timeSaveFlag = false;
                    this.dateChange(this.formInline.Date);
                    loading.close();
                  }
                })
                .catch(res => {
                  this.timeSaveFlag = false;
                  this.timeObj = [];
                  loading.close();
                });
            })
            .catch(() => {
              this.$message({
                type: "warning",
                message: "已取消更换时间"
              });
              this.timeSaveFlag = false;
              this.timeObj = [];
              this.dateChange(this.formInline.Date);
              this.formInline.Time = "";
            });
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
      this.gudingFlag1=false;
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
    //选择技师弹出层取消
    cancelForm2() {
      this.middleA = [];
      this.listTech = [];
      this.dialogTableVisible = false;
    },
    //固定服务时间修改中日期变化时改变时间对象
    dateChange1(val) {
      //this.options3
    },    
    //日期变化时改变时间对象
    dateChange(val) {
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
    //已有订单更换时间弹窗中的时间选项点击
    timeChange(index, obj) {
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
    //更换固定技师弹出层查询按钮
    searchTeh1() {
      var obj = {
        id: this.orderId,
        techName: this.techName1
      };
      //服务技师获取
        addTechData(obj)
          .then(res => {
            this.listTech1 = [];
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
    //新增选择技师弹出层查询按钮
    searchTeh() {
      var obj = {
        id: this.orderId,
        techName: this.techName
      };
      //服务技师获取
      if (this.status == "add") {
        addTechData(obj)
          .then(res => {
            this.listTech = [];
            if (res.data.code === 1) {
              if (res.data.data != undefined) {
                this.listTech = res.data.data;
                for (var b = 0; b < this.middleA.length; b++) {
                  for (var a = 0; a < this.listTech.length; a++) {
                    if (this.listTech[a].techId == this.middleA[b].techId) {
                      this.listTech[a].techChecked = true;
                    }
                  }
                }
              } else {
                this.listTech = [];
              }
            }
          })
          .catch(res => {});
      } else {
        dispatchTechData(obj)
          .then(res => {
            if (res.data.code === 1) {
              if (res.data.data != undefined) {
                this.listTech = res.data.data;
                for (var c = 0; c < this.middleA.length; c++) {
                  for (var d = 0; d < this.listTech.length; d++) {
                    if (this.listTech[d].techId == this.middleA[c].techId) {
                      this.listTech[d].techChecked = true;
                    }
                  }
                }
              } else {
                this.listTech = [];
              }
            }
          })
          .catch(res => {});
      }
    },
    //存储选择技师对象
    ChangeTech(obj) {
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
      this.techSaveFlag = true;
      //先遍历数据中选中的再保存
      var arr = [];
      if (this.middleA != undefined && this.middleA.length != 0) {
        for (let a = 0; a < this.middleA.length; a++) {
          if (this.middleA[a].techChecked == true) {
            arr.push(this.middleA[a].techId);
          }
        }
      }
      if (this.status == "add" && arr.length != 0) {
        //保存技师接口调用
        var obj = {
          id: this.orderId,
          techIdList: arr
        };
        addTechSave(obj)
          .then(res => {
            this.techSaveFlag = false;
            if (res.data.code === 1) {
              this.$message({
                type: "success",
                message: "新增成功!"
              });
              this.tableData1 = res.data.data.list;
              this.otherInfo.serviceHour = this.formatDuring(
                res.data.data.serviceHour * 3600000
              );
              this.middleA = [];
              this.listTech = [];
              this.dialogTableVisible = false;
            }
          })
          .catch(res => {
            this.techSaveFlag = false;
          });
      }
      if (this.status == "edit") {
        var tech=[];
        for(var a=0 ;a<this.listTech.length;a++){
            if(this.radio1==this.listTech[a].techId){
              tech.push(this.listTech[a].techId)
              
            }
        }
        //改派操作this.radio1为技师id
        var obj1 = {
          id: this.orderId,
          dispatchTechId: this.aa,
          techIdList: tech
        };
        dispatchTechSave(obj1)
          .then(res => {
            this.techSaveFlag = false;
            if (res.data.code === 1) {
              this.$message({
                type: "success",
                message: "改派成功!"
              });
              this.tableData1 = res.data.data.list;
              // this.otherInfo.serviceHour = this.formatDuring(
              //   res.data.data.serviceHour * 3600000
              // );
              //this.middleA = [];
              this.listTech = [];
              this.dialogTableVisible = false;
            } else {
              this.techSaveFlag = false;
            }
          })
          .catch(res => {
            this.techSaveFlag = false;
          });
      }
      if (arr.length == 0) {
        this.techSaveFlag = false;
        this.dialogTableVisible = false;
      }
    },
    //改派或新增技师
    gaiPai(status, obj) {
      this.gudingFlag1=false;
      this.radio1='';
      this.aa = obj.techId;
      this.status = status;
      this.techName = "";
      if (status == "add") {
        var obj = {
          id: this.orderId
        };
        addTechData(obj)
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
        var obj1 = {
          id: this.orderId
        };
        dispatchTechData(obj1)
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
    //改派或新增技师
    gaiPai1() {
        this.radio='';
        this.techName1 = "";
        var obj = {
          id: this.orderId
        };
        addTechData(obj)
          .then(res => {
            if (res.data.code === 1) {
              this.dialogTableVisible1 = true;
              if (res.data.data != undefined) {
                this.listTech1 = res.data.data;
              }
            }
          })
          .catch(res => {});
    },    
    //取消订单
    cancelOrder() {
      this.cancelOrderFlag = true;
    },
    //退款按钮
    orderRefund() {
      this.ruleForm.refundAccount = 0;
      this.ruleForm.refundDifference = "";
      this.ruleForm.refundDifferenceType = "";
      this.ruleForm.orderNowRefundStatus='';
      this.orderRefundFlag = true;
      //退款按钮
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
    //已有订单中表格中的服务时间按钮
    changeTime(row) {
      this.radio3 ='';
      this.timeObj = [];
      if (this.otherInfo.serviceStatus != "finish") {
        var obj = {
          id: this.orderId
        };
        //请求服务时间下拉菜单值
        ChangeTimeData(obj)
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
      } else {
        this.$message({
          type: "error",
          message: "不能更换时间!"
        });
      }
    }
  },
  mounted() {
    this.choose = this.dict.refund_type;
    this.orderTest = this.dict.group_order_status;
    //服务频次字典量
    this.frequencyOptions = this.dict.frequency_options;    
    this.becaussOptions = this.dict.cancel_type;
    //获取订单的本地存储ID
    var orderId = window.localStorage.getItem("grouporderId");
    if (this.$route.query.id == undefined) {
      this.getOrderAllInf(orderId);
    } else {
      this.getOrderAllInf(this.$route.query.id);
    }
  }
};
</script>
<style   scoped>
.selfLabelStyle {
  display: inline-block;
  position: absolute;
  left: -82px;
  color: red;
}
.frequencyTabs{
  display:inline-block;border:1px solid #ccc;width:80px;height:34px;line-height:34px;margin:0 20px 0 0;text-align:center;border-radius:4px;
}
.severPromitINf{
   margin-left: 80px;margin-left: 80px;float: left;margin-top: -16px;font-size:12px;color: #576475;
}
.time{    
    position: absolute;
    right: 50px;
    top: 15px;
}
ul li{    list-style: none;}
.i-delete {
  position: absolute;
  right: 20px;
  top: 25px;
  cursor: pointer;
}
.working {
  border: 1px solid #bfcbd9;
  border-top: none;
  box-sizing: border-box;
  padding: 0 0 0 20px;
}
.working > li {
  position: relative;
  border-bottom: 1px solid #f2f2f2;
  padding-top: 15px;
}
.woking-div {
  display: flex;
  flex-direction: column;
}
.btn-styl {
  height: 25px;
  line-height:25px;
  display:inline-block;
  width: 60px;
}
.tech-green {
  border: solid 1px #4c70e8 !important;
  background: url("../../../static/icon/Selected.png") no-repeat;
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
  margin:0 auto;
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
  height: 56px;
  line-height: 56px;
  margin-left: 22px;
  color: #8391a5;
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
  width: 800px;
  float: left;
  display:block;  
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
.NowTabs{
  color:#576475;float:left;width:100%;font-size:14px;margin-top:15px;margin-bottom:10px;margin-left: 15px;
}
.techNameStyle {
  width: 83px;
  display:inline-block;
  font-size:14px;
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
  margin:3px 6px 3px 8px;
  background:#f0f4f5;
  color:#7a838a;
  font-size:14px;
  position: relative;
  border:1px solid #bfcbd9
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
  margin-left: 82px;
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
.selfTableWrapStyle2 {
  min-width: 960px;
  padding-bottom: 20px;
  margin-top: -20px;
}
.servicerFont {
  cursor: pointer;
  color: #4c70e8;
}
.self-table-style {
  width: 100%;
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
  display:block;
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
  display:block;
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
  display:block;
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
 width:500px;margin-left:20px;display:inline-block;
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
  width: 100%;
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




