<template>
    <div class="addorder-container">
       <!--订单信息开始-->
        <div class="thrid-bar">
            <div class="custom-action orderOneBar">订单信息              
              <input type="button" v-if="otherInfo.orderSource =='own' && otherInfo.payStatus =='waitpay' && otherInfo.serviceStatus !='cancel' && btnShow.indexOf('order_cancel') > -1 && otherInfo.orderStatus != 'close'"  @click="cancelOrder"  class="button-cancel height25" style="float:right;"  value="取消订单">
              <input type="button" v-if="otherInfo.orderStatus =='success' && (! otherInfo.orderAllRefundFlag) && otherInfo.orderSource =='own' && otherInfo.payStatus =='payed' && btnShow.indexOf('order_refund') > -1"  @click="orderRefund"  class="button-cancel height25" style="float:right;"  value="退款">
            </div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">订单编号:</span>
                      <span class="lineContent">{{otherInfo.orderNumber}}</span>
                   </p>                  
                   <p class="contentLine">
                      <span class="lineTitle">订单类型:</span>
                      <span class="lineContent">
                          <span v-if="otherInfo.orderType =='common'">普通订单</span>
                          <span v-if="otherInfo.orderType =='group_split_yes'">组合并拆单</span>
                          <span v-if="otherInfo.orderType =='group_split_no'">组合不拆单</span>                        
                      </span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">服务机构:</span>
                      <span class="lineContent width180">{{otherInfo.orgName}}</span>
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
                      <span class="lineTitle">订单分类:</span>
                      <span class="lineContent">
                          <span v-if="otherInfo.majorSort =='clean'">保洁</span>
                          <span v-if="otherInfo.majorSort =='repair'">家修</span>                         
                      </span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">服务站:</span>
                      <span class="lineContent">{{otherInfo.stationName}}</span>
                   </p>                                                                                                                   
                </div>
                <div class="rightArea">
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
                      <span class="lineTitle">下单时间:</span>
                      <span class="lineContent">{{otherInfo.orderTime}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">订单来源:</span>
                      <span class="lineContent">
                        <span v-if="otherInfo.orderSource =='own'">本机构</span>
                        <span v-if="otherInfo.orderSource =='gasq'">国安社区</span>
                      </span>
                   </p>                                                                     
                </div>                 
            </div>                                     		
		    </div>
        <!--订单信息结束-->
        <!--订单取消开始-->
        <div class="thrid-bar marginTop15" v-if="otherInfo.orderSource =='own' && otherInfo.orderStatus =='cancel'"><!-- && otherInfo.orderStatus =='cancel'-->
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
        <!--服务地址信息开始-->
        <div class="thrid-bar marginTop15">
            <div class="custom-action">服务地址信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea marginBottom20">
                   <p class="contentLine">
                      <span class="lineTitle">联系人:</span>
                      <span class="lineContent">
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
        <div class="thrid-bar marginTop15" v-if="otherInfo.orderSource =='own'">
            <div class="custom-action">支付信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine" v-if="otherInfo.payStatus =='payed'">
                      <span class="lineTitle">交易单号:</span>
                      <span class="lineContent">{{payInfo.payNumber}}</span>
                   </p>
                   <p class="contentLine" v-if="otherInfo.payStatus =='waitpay'">
                       <span class="lineTitle">支付状态:</span>
                       <span>待支付</span> 
                   </p>                                                                           
                   <p class="contentLine" v-if="otherInfo.payStatus =='payed'">
                      <span class="lineTitle">支付总额:</span>
                      <span class="lineContent">{{payInfo.payAccount}}元</span>
                   </p>                                      
                </div>
                <div class="rightArea">
                   <p class="contentLine" v-if="otherInfo.payStatus =='payed'">
                      <span class="lineTitle">支付状态:</span>
                      <span class="lineContent" >
                        <span>已支付</span>                                                                        
                      </span>
                   </p>
                   <p class="contentLine" v-if="otherInfo.payStatus =='payed'">
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
                   <p class="contentLine" v-if="otherInfo.payStatus =='payed'">
                      <span class="lineTitle">支付方式:</span>
                      <span class="lineContent">
                        <span v-if="payInfo.payMethod =='offline'">货到付款</span>
                        <span v-if="payInfo.payMethod =='online'">在线</span>                        
                      </span>
                   </p> 
                   <p class="contentLine" v-if="otherInfo.payStatus =='payed'">
                      <span class="lineTitle">支付时间:</span>
                      <span class="lineContent">{{payInfo.payTime}}</span>
                   </p>                                       
                </div>                  
            </div>                                     		
		    </div>
        <!--支付信息结束-->
        <!--服务信息开始-->
        <div class="thrid-bar marginTop15">
            <div class="custom-action">服务信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">建议服务时长:</span>
                      <span  class="lineContent">{{otherInfo.serviceHour}}</span>
                   </p>
                   <p class="contentLine" v-if="otherInfo.serviceStatus =='finish'">
                      <span class="lineTitle">实际完成时间:</span>
                      <span class="lineContent">{{otherInfo.finishTime}}</span>
                   </p>
                   <p class="contentLine" v-if="otherInfo.orderRefundFlag"><a :href="jumpUrl" style="color:#3a5fcd;cursor:pointer;" target="view_window" @click="gotoRefund(otherInfo.orderNumber)">点击查看退款信息</a></p>                                                                            
                </div>
                <div class="rightArea width390">
                   <p class="contentLine">
                      <span class="lineTitle">服务时间:</span>
                      <span class="lineContent">{{otherInfo.serviceTime}}</span>
                      <span class="selfMarLeft70"  v-if="nowTime >= 5400000" @click="changeTime"><input type="button" v-if="btnShow.indexOf('order_time') > -1"   class="button-cancel height25"  value="更换时间"></span>
                   </p>                                     
                </div> 
            </div>            
            <div class="selfTableWrapStyle" >                    
                    <el-table
                      :data="tableData"
                      border
                      class="self-table-style"
                      style="margin-top:-10px;"
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
                        label="服务数量"
                        prop="goodsNum">                    
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="单位"
                        prop="goodsUnit">                    
                      </el-table-column>                      
                      <el-table-column
                        align="center"
                        label="单价">
                          <template scope="scope">
                              <span>￥{{scope.row.payPrice}}</span>
                          </template>	                                           
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
        <div class="thrid-bar marginTop15">
            <div class="custom-action">技师信息</div>
            <div class="hr-style"></div>
            <div class="techTabWrap">
                <div class="addTechWrap"  v-if="btnShow.indexOf('order_addTech') > -1" @click="gaiPai('add','')">
                  <span class="plusComb">&#10010</span>
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
                                <div style="cursor:pointer;color:#4c70e8"  v-if="btnShow.indexOf('order_dispatch') > -1" @click="gaiPai('edit',scope.row)">改派</div>                    
                          </template>                    
                      </el-table-column>                  
                    </el-table>
                </div>
            </div>                     		
		    </div>
        <!--技师信息结束-->
        <!--下单用户信息开始-->
        <div class="thrid-bar marginTop15" >
            <div class="custom-action">下单用户信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">用户姓名:</span>
                      <span class="lineContent">{{otherInfo.customerName}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle FloatLeft">备注:</span>
                      <span class="selfbeizhu1">
                        {{otherInfo.customerRemark}}
                      </span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle"></span>
                      <span class="lineContent width1000">
                        <div class="picWrap marginLeft82">
                            <div class="picStyle" v-for="item in otherInfo.customerRemarkPic" :key="item"> 
                              <img :src="imgSrc+item+picWidth250"/>
                            </div>
                        </div>
                      </span>
                   </p>                                                        
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">用户电话:</span>
                      <span class="lineContent">{{otherInfo.customerPhone}}</span>
                   </p>                    
                </div> 
            </div>                                     		
		    </div>
        <!--下单用户信息结束-->        
        <!--用户备注开始-->
        <div class="thrid-bar marginTop15">
            <div class="custom-action">用户备注</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea" style="width:100%;">
                   <p class="contentLine">
                      <span class="lineTitle FloatLeft">备注:</span>
                      <span class="lineContent1 selfbeizhu">{{otherInfo.customerRemark}}</span>
                   </p> 
                   <p class="contentLine">
                      <span class="lineContent2 width900">
                        <div class="picWrap selfMarTL">
                            <div class="picStyle" v-for="item in otherInfo.customerRemarkPics" :key="item">
                              <img :src="imgSrc+item+picWidth250"/>
                            </div>                           
                        </div>
                      </span>
                   </p>                                                                         
                </div>
                 
            </div>                                     		
		    </div>
        <!--用户备注结束-->
        <!--订单备注开始-->
        <div class="thrid-bar marginTop15">
            <div class="custom-action">订单备注</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea" style="width:100%;">
                   <p class="contentLine">
                      <span class="lineTitle FloatLeft">备注:</span>
                      <span class="lineContent1 selfbeizhu">{{otherInfo.orderRemark}}</span>
                   </p>
                   <p class="contentLine">
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
        <div class="thrid-bar marginTop15" v-if="otherInfo.orderSource !='own'">
            <div class="custom-action">业务人员信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">姓名:</span>
                      <span class="lineContent">{{otherInfo.businessName}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle FloatLeft">备注:</span>
                      <span class="selfbeizhu1">
                        {{otherInfo.businessRemark}}
                      </span>
                   </p>
                   <p class="contentLine">
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
        <div class="thrid-bar marginTop15 marginBOT20" v-if="otherInfo.orderSource !='own'">
            <div class="custom-action">门店信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">名称:</span>
                      <span class="lineContent">{{otherInfo.shopName}}</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle FloatLeft">地址:</span>
                      <span class="lineContent">
                        <el-tooltip v-if="otherInfo.shopAddr != undefined"  placement="left" :disabled="otherInfo.shopAddr.length< 16" :content="otherInfo.shopAddr">
                          <div class="selfToolTip">{{otherInfo.shopAddr}}</div>
                        </el-tooltip>                                                
                      </span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle FloatLeft">备注:</span>
                      <span class="selfbeizhu1">
                        {{otherInfo.shopRemark}}                        
                      </span>
                   </p>
                   <p class="contentLine">
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
        <!--技师选择弹窗开始-->
        <el-dialog title="选择技师" :visible.sync="dialogTableVisible" class="selfDialogWidth" :close-on-click-modal="false">
          <el-input placeholder="输入要搜索的姓名" v-model="techName" class="orderinfoTechNameStyle"></el-input> 
          <button class="button-large FloatRight  orderinfoTechSearchStyle" @click="searchTeh">查询</button>
          <el-collapse-transition>
            <div class="selfpromMessageTab" v-if="middleA.length !=0">
              <div  class="tabWrap1" v-for="item in middleA" :key="item.techId">
                <div class="techNameStyle">{{item.techName}}</div>
              </div>                         
            </div>
          </el-collapse-transition>                                              	
          <div class="selfTableWrapONE">
            <div class="table-d">
              <table  class="selfTable">
              <tr class="tableHeader">
                <td  class="selfTableHEADTD" align="center" width="73px">选择</td>
                <td  class="selfTableHEADTD" align="center" width="158px">头像</td>
                <td  class="selfTableHEADTD" align="center" width="182px">姓名</td>
                <td  class="selfTableHEADTD" align="center" width="73px">性别</td>
                <td  class="selfTableHEADTD" align="center" width="141px">岗位性质</td>							
              </tr>
              <div class="orderinfoTechTablePadding">
                  <tr v-for="item in listTech" :key="item.techId"  ref="tableItem1" class="selfTdStyle1">
                    <td width="72px" class="fontSize12"  align="center"><el-checkbox  v-model="item.techChecked" @change="ChangeTech(item)"></el-checkbox></td>
                    <td  width="156px" class="height70" align="center"><img class="imgStyle" :src="imgSrc+item.headPic+picWidth60"/></td>
                    <td width="172px" class="fontSize12" align="center"><div class="selftechNameStyle">{{item.techName}}</div></td>
                    <td  width="72px" class="fontSize12" align="center">
                      <span class="fontSize12" v-if="item.techSex =='male'">男</span>
                      <span class="fontSize12" v-if="item.techSex =='female'">女</span>									
                    </td>
                    <td width="140px" class="fontSize12"  align="center">
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
        <!--技师选择弹窗结束-->        
        <!--修改服务时间弹窗开始-->
        <el-dialog
          title="选择服务时间"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
          >
            <el-form  :model="formInline" :rules="formInline1rules" ref="formInline" label-width="80px">
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
                      <div v-if="timeObj.length == 0" class="promMessage">当前所选择日期没有可服务的技师,请更换日期!</div>                                            
                      <div class="selfSeverTimeSt" ref="TimeWrap"  v-for="(item,index) in timeObj" :key="index" @click="timeChange(index,item)">{{item.serviceTimeStr}}</div>
                    </div>                    
              </el-form-item>              

            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large" :disabled="timeSaveFlag"  @click="submitTime('formInline')">保存</button>
              <button class="button-cancel"  @click="cancelTime('formInline')">取 消</button>
            </div>
        </el-dialog>
        <!--修改服务时间弹窗结束-->
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
          title="退款详情"
          :visible.sync="orderRefundFlag"
          :close-on-click-modal="false"
          class="selfDialogWidth1"
          >
            <div class="selfTableWrapONE1">
              <div class="marginTop20" style="margin-left:-10px;">
                  <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
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
                                      <td width="72px" class="fontSize12"  align="center"><el-checkbox  @change="rowChange(item)" v-model="item.commidySelect" ></el-checkbox></td>
                                      <td width="206px" align="center"><div class="selfComdityNameStyle">{{item.goodsName}}</div></td>
                                      <td width="132px" class="fontSize12" align="center">￥{{item.payPrice}}</td>
                                      <td  width="102px" class="fontSize12" align="center">{{item.goodsNum}}</td>
                                      <td width="110px" class="fontSize12"  align="center">{{item.goodsUnit}}</td>							
                                    </tr>
                                </div>
                            </table>
                            <el-input type="hidden" value='' v-model='ruleForm.refundId'></el-input> 
                          </div>                                                 
                      </el-form-item>
                     <el-form-item label="支付总额:" prop="payPrice">￥{{ruleForm.payPrice | keepTwoNum}}元</el-form-item>
                     <el-form-item label="支付方式:" prop="payMethod"><span>{{ruleForm.payMethod}}</span></el-form-item>
                     <el-form-item label="退款方式:" prop="refundMethod"><span v-if="ruleForm.refundMethod == 'cash'">现金</span></el-form-item> 
                     <el-form-item label="退款金额:" prop="refundAccount">￥{{ruleForm.refundAccount | keepTwoNum }}元</el-form-item>
                      <el-form-item label="退款差额:" prop="refundDifference">
                        <el-input v-model="ruleForm.refundDifference" placeholder="0" class="search searchHeader">
                            <el-select  v-model="refundDifferenceType" clearable placeholder="请选择"  slot="prepend" @change="ChangerefundType">
                              <el-option v-for="(value,key,index) in choose" :key="index" :label="value" :value="key">
                              </el-option>
                            </el-select>
                        </el-input>   
                      </el-form-item>
                      <el-form-item label="退款原因:" prop="refundReason">
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
        if(!/^[0-9]+.?[0-9]*/.test(value)){
           callback(new Error("请输入整数或一至两位小数"));
        }else{
          if (!/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
              callback(new Error("请输入整数或一至两位小数"));
          }else{
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
    return {
      jumpUrl:'#',
      middleB:[],
      ruleForm: {
        refundId:'',
        refundDifference: '',
        refundReason:'',
        refundAccount:0,
        refundMethod:'cash',
        payMethod:'现金',
        payPrice:'',
        orderRefundObj:[      
        ],                
      },
      rules: {
          refundDifference: [
            { validator: checkChaE, trigger: 'blur' },
          ],
          refundReason: [
            { validator: checkrefundReason, trigger: 'blur' },
          ],
          refundId:[
            { required: true,message:'请选择退款商品', trigger: 'change' },
          ]  
      },
      choose:[],
      refundDifferenceType:'',
      dict: require("../../../static/dict.json"),
      becaussOptions: [],
      cancelOrderFlag: false,
      orderRefundFlag:false,
      options2: [],
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
        Time: [{ required: true, message: "请选择服务时间", trigger: "change" }]
      },
      timeObj: [], //时间对象
      addressInfo: [], //服务地址信息
      otherInfo: [],
      payInfo: [], //支付信息
      refundInfo: [], //退款信息
      goodsInfo: [], //服务信息
      options: [],
      techName: "",
      techStationId: "",
      promShow1: false,
      promInf1: "搜索内容不存在!",
      listTech: [],
      selectCommidty: [],
      select: "date",
      formInline: {
        Date: "",
        Time: ""
      },
      value1: "",
      value2: "",
      tabOptions: [],
      dialogTableVisible: false,
      tableData: [],
      tableData1: [],
      dialogVisible: false,
      middleA: [],
      changTime: "",
      status: "add",
      aa: "",
      bb: "",
      orderId: "",
      nowTime: "",
      addressInf: []
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
    //多少退款改变
    ChangerefundType(value){
      if(value == ''){
        this.ruleForm.refundDifference='';
      }
    },
    //计算退款总额
    rowChange(rowObj){    
      if (rowObj.commidySelect) {          
           this.ruleForm.refundAccount = this.ruleForm.refundAccount + rowObj.payPrice * 1*rowObj.goodsNum;        
      } else { 
        this.ruleForm.refundAccount = this.ruleForm.refundAccount - rowObj.payPrice * 1*rowObj.goodsNum;  
      }
      if(this.ruleForm.refundAccount == '0'){
           this.ruleForm.refundId='' 
      }else{
           this.ruleForm.refundId='1'
      }       
    },
    //确认退款
    orderRefundOk(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.ruleForm.refundDifference >= this.ruleForm.refundAccount){
              this.$message({
                type: "warning",
                message: "退款差额应小于退款金额！"
              });
          }else{
              var refundPirce=0;
              if(this.refundDifferenceType == 'many'){
                refundPirce=this.ruleForm.refundAccount+Number(this.ruleForm.refundDifference)
              }
              if(this.refundDifferenceType == 'less'){
                refundPirce=this.ruleForm.refundAccount-Number(this.ruleForm.refundDifference)
              } 
              if(this.refundDifferenceType == ''){
                refundPirce=this.ruleForm.refundAccount
              }
              refundPirce=Number(refundPirce).toFixed(2); 
              const h = this.$createElement;
              this.$msgbox({
                title: '提示',
                message: h('p', null, [
                  h('span', null, '实际退款金额为：￥'),
                  h('span', { style: 'color: teal' }, refundPirce),
                  h('span', null, '，确定退款吗？'),
                ]),
                showCancelButton: true,            
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                var arr = [];
                for (var a = 0; a < this.ruleForm.orderRefundObj.length; a++) {
                  if (this.ruleForm.orderRefundObj[a].commidySelect) {
                    arr.push(this.ruleForm.orderRefundObj[a]);
                  }
                }
                this.middleB = Object.assign([], arr);
                var orderRefundInfo={};
                    orderRefundInfo.refundMethod=this.ruleForm.refundMethod;
                    orderRefundInfo.refundAccount=this.ruleForm.refundAccount;
                    orderRefundInfo.refundDifferenceType=this.refundDifferenceType;
                    orderRefundInfo.refundDifference=this.ruleForm.refundDifference;
                    orderRefundInfo.refundAccountReality=refundPirce;
                    orderRefundInfo.refundReason=this.ruleForm.refundReason;
                    var obj1 = {
                      id: this.orderId,
                      goodsInfoList:this.middleB,
                      orderRefundInfo:orderRefundInfo    
                    };
                    orderRefundSave(obj1)
                      .then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                              type: "success",
                              message: "退款成功"
                            });                      
                            this.$refs['ruleForm'].resetFields();
                            this.orderRefundFlag = false;
                        }
                      })
                      .catch(res => {});            
                  

              }).catch(() => {
                    this.$message({
                      type: "warning",
                      message: "已取消退款"
                    });
              })
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
      })      
    },
    //取消退款
    orderRefundCancel(){
      this.$refs['ruleForm'].resetFields();     
      this.orderRefundFlag = false;
    },
    //跳转退款详情页
    gotoRefund(orderNumber){
      var src=window.location.href;
      var end=src.indexOf('#')+1;
      var url=src.substring(0,end)
      this.jumpUrl=url+'/clean/refund?ordernumber='+orderNumber
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
    //时间选项点击
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
    //选择技师弹出层查询按钮
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
      if (this.status == "edit" && arr.length != 0) {
        var obj1 = {
          id: this.orderId,
          dispatchTechId: this.aa,
          techIdList: arr
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
              this.otherInfo.serviceHour = this.formatDuring(
                res.data.data.serviceHour * 3600000
              );
              this.middleA = [];
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
    //取消订单
    cancelOrder() {
      this.cancelOrderFlag = true;
    },
    //退款按钮
    orderRefund(){
      this.ruleForm.refundAccount=0;
      this.ruleForm.refundDifference='';
      this.ruleForm.refundDifferenceType='';
      this.orderRefundFlag=true;       
      //退款按钮
      var obj1 = {
        id: this.orderId
      };
      orderRefundInit(obj1)
        .then(res => {
          if (res.data.code === 1) {
              this.ruleForm.payPrice=res.data.data.payPrice
              this.ruleForm.orderRefundObj=res.data.data.goodsInfoList
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
    //改变服务时间按钮
    changeTime() {
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
    this.becaussOptions = this.dict.cancel_type;
    var orderId = window.localStorage.getItem("orderId");
    if (this.$route.query.id == undefined) {
      this.getOrderAllInf(orderId);
    } else {
      this.getOrderAllInf(this.$route.query.id);
    }
  }
};
</script>
<style   scoped>
.searchHeader .el-input-group__prepend .el-input__inner {
  width: 200px;
  text-align: center;
}
.searchHeader .el-select{
  width:180px;
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
  width: 185px;
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
  width: 200px;
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
  display: inline-block;
  float: left;
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
.marginTop20{
  margin-top:-20px;
  padding-left:25px;
  font-size:12px;
}
.refundSpan{
  padding-left:10px;
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
  margin-top: 20px;
  position: relative;
}
.table-d1 {
  width: 677px;
  padding-left:10px;
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
.techNameStyle {
  width: 80px;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tabWrap1 {
  width: 80px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 5px;
  font-size: 12px;
  display: inline-block;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 12px;
  border: 1px solid #bfcbd9;
  position: relative;
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
  display: inline-block;
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
  display: inline-block;
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
  display: inline-block;
  color: #4c70e8;
}
.custom-action {
  margin-left: 30px;
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
.lineTitle {
  display: inline-block;
  width: 80px;
}
.lineContent {
  display: inline-block;
  margin-left: 20px;
  width: 170px;
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
  height: 60px;
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
  padding-top: 60px;
}
</style>




