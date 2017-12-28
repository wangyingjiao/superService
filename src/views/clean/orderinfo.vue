<template>
    <div class="addorder-container">
       <!--订单信息开始-->
        <div class="thrid-bar">
            <div class="custom-action orderOneBar">订单信息<div class="orderInf-cancel" @click="cancelOrder">取消订单</div></div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
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
                   <p class="contentLine">
                      <span class="lineTitle">服务站:</span>
                      <span class="lineContent">呼家楼</span>
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
                      <span class="lineTitle">支付平台:</span>
                      <span class="lineContent">微信</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">支付时间:</span>
                      <span class="lineContent">2017-08-29 14:44</span>
                   </p>                                       
                </div> 
            </div>                                     		
		    </div>
        <!--支付信息结束-->
        <!--退款信息开始-->
        <div class="thrid-bar marginTop20">
            <div class="custom-action">退款信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">退款编号:</span>
                      <span class="lineContent">20170829144443318882</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">退款状态:</span>
                      <span class="lineContent">退款中</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">退款原因:</span>
                      <span class="lineContent">服务不满意、服务质量差</span>
                   </p>                                      
                </div>
                <div class="rightArea">
                   <p class="contentLine">
                      <span class="lineTitle">退款金额:</span>
                      <span class="lineContent">388.00元</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">申请时间:</span>
                      <span class="lineContent">2017-08-29 14:44</span>
                   </p>                   
                </div> 
            </div>                                     		
		    </div>
        <!--退款信息结束-->
        <!--服务地址信息开始-->
        <div class="thrid-bar marginTop20">
            <div class="custom-action">服务地址信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">姓名:</span>
                      <span class="lineContent">李阿姨</span>
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
        <!--服务地址信息结束--> 
        <!--服务信息开始-->
        <div class="thrid-bar marginTop20">
            <div class="custom-action">服务信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">服务分类:</span>
                      <span class="lineContent">日常保洁</span>
                   </p>                                    
                </div>
                <div class="rightArea width390">
                   <p class="contentLine">
                      <span class="lineTitle">服务时间:</span>
                      <span class="lineContent">2017-08-29 14:44</span>
                      <span class="selfMarLeft70"><button type="button"  @click="changeTime" class="button-cancel height25">更换时间</button></span>
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
                    >
                      <template scope="scope">
                            <div class="order-selfTd" v-for=" item in scope.row.goods" :key="item.goodsId">{{item.goodsName}}</div>                   
                      </template> 
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="服务数量">
                      <template scope="scope">
                            <div class="order-selfTd" v-for=" item in scope.row.goods" :key="item.goodsId">{{item.goodsNum}}</div>                   
                      </template>                     
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="金额">
                      <template scope="scope">
                            <div class="order-selfTd" v-for=" item in scope.row.goods" :key="item.goodsId">{{item.payPrice}}</div>                   
                      </template>                    
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="操作">
                      <template scope="scope">
                            <div class="servicerFont"  @click="editService(scope.row)">编辑</div>                    
                      </template>                     
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
                      <span class="lineContent1 selfbeizhu">哈哈哈哈哈</span>
                   </p> 
                   <p class="contentLine">
                      <span class="lineTitle"></span>
                      <span class="lineContent width1000">
                        <div class="picWrap selfMarTL">
                            <div class="picStyle" v-for="a in 3" :key="a"></div>
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
                      <span class="lineContent1 selfbeizhu">客户要求什么....客户要求什么客户什么么客户要求什么客户要求什么客户要求什么客户要求客户要求什么客户要求什</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle"></span>
                      <span class="lineContent width1000">
                        <div class="picWrap selfMarTL">
                            <div class="picStyle" v-for="a in 3" :key="a"></div>
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
                      <span class="lineContent">李阿姨</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">备注:</span>
                      <span class="lineContent1 selfbeizhu1">客户要求什么....市朝阳区关东街呼家楼宾馆北京市朝阳区关东街呼家楼宾馆北京市朝市朝阳区关东街呼家楼宾馆北京市朝阳区关东街呼家楼宾馆北京市朝市朝阳区关东街呼家楼宾馆北京市朝阳区关东街呼家楼宾馆北京市朝市朝阳区关东街呼家楼宾馆北京市朝阳区关东街呼家楼宾馆北京市朝市朝阳区关东街呼家楼宾馆北</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle"></span>
                      <span class="lineContent width1000">
                        <div class="picWrap marginLeft82">
                            <div class="picStyle" v-for="a in 3" :key="a"></div>
                        </div>
                      </span>
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
        <!--业务人员信息结束-->
        <!--门店信息开始-->
        <div class="thrid-bar marginTop20 marginBOT20">
            <div class="custom-action">门店信息</div>
            <div class="hr-style"></div>
            <div class="selfWrap1">
                <div class="leftArea">
                   <p class="contentLine">
                      <span class="lineTitle">名称:</span>
                      <span class="lineContent">测试门店</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">地址:</span>
                      <span class="lineContent">北京市朝阳区关东街呼家楼宾馆</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle">备注:</span>
                      <span class="lineContent1 selfbeizhu1">市朝阳区关东街呼家楼宾馆北京市</span>
                   </p>
                   <p class="contentLine">
                      <span class="lineTitle"></span>
                      <span class="lineContent width1000">
                        <div class="picWrap marginLeft82">
                            <div class="picStyle" v-for="a in 9" :key="a"></div>
                        </div>
                      </span>
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
                <td  class="height100" align="center"><div class="userHeaderStyle"><img :src="item.headPic" style="width:100%;height:100%;"/></div></td>
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
            <button class="button-large" @click="submitForm2()">确 定</button>
            <button class="button-cancel" @click="dialogTableVisible = false">取 消</button>
          </div>
        </el-dialog>
        <!--技师选择弹窗结束-->        
        <!--修改服务时间弹窗开始-->
        <el-dialog
          title="修改服务时间"
          :visible.sync="dialogVisible">
            <el-form  :model="formInline" label-width="80px">
              <el-form-item label="选择时间" required>
                    <el-date-picker
                      v-model="value1"                      
                      placeholder="选择日期"                     
                      :type="select"
                      class="selfDateStyle"
                      @change='dateChange'
                      >
                    </el-date-picker>
              </el-form-item>
              <el-form-item label="选择时间" required>
                    <div style="margin-top:-10px;">
                      <div class="selfSeverTimeSt" ref="TimeWrap" v-for="(value,index,key) in 20" :key="index" @click="timeChange(index)">08:30</div>
                    </div>                    
              </el-form-item>              

            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large"   @click="dialogVisible = false">确 定</button>
              <button class="button-cancel"  @click="dialogVisible = false">取 消</button>
            </div>
        </el-dialog>
        <!--修改服务时间弹窗结束-->
        <!--取消此订单弹窗开始-->
        <el-dialog
          title=""
          :visible.sync="orderCancelFlag"
          size="tiny">
          <span>确定要取消此订单吗？</span>
          <div slot="footer" class="dialog-footer" style="text-align:center;">
            <button class="button-large"   @click="orderCancelOk">确 定</button>
            <button class="button-cancel"  @click="orderCancelFlag = false">取 消</button>            
          </div>
        </el-dialog>
        <!--取消此订单弹窗结束-->
        <!--修改服务弹窗开始-->
        <el-dialog
          title="修改服务"
          :visible.sync="editServiceFlag">
            <div class="table-d">
              <table width="100%" class="selfTable">
                <tr>
                <td  class="editServiceTabHeader"  align="center" width="8%">选择</td>
                <td  class="editServiceTabHeader" align="center" width="28%">商品名称</td>
                <td  class="editServiceTabHeader" align="center" width="28%">单价</td>
                <td  class="editServiceTabHeader" align="center" width="10%">起购数</td>
                <td  class="editServiceTabHeader" align="center" width="26%">数量</td>							
                </tr>
                <tr v-for="item in selectCommidty" :key="item.id" >
                <td class="height30" align="center"><el-checkbox  v-model="item.checkAll"></el-checkbox></td>
                <td class="height30"align="center">
                  <span v-if="item.type=='1' || item.type=='2'">{{item.name}}</span>
                  <span v-if="item.type=='3'">
                    <el-select  class="editServiceTabSel"  v-model="item.roomId" placeholder="请选择">
                      <el-option v-for="room in item.roomType" :key="room.key" :label="room.roomName" :value="room.key">
                      </el-option>
                    </el-select>
                  </span>
                </td>
                <td class="height30" align="center">
                  <span v-if="item.type=='1' || item.type=='2'">{{item.pirce}}</span>
                  <span v-if="item.type=='3'">
                    <span v-if="item.roomId =='1'">{{item.testprice[item.roomId-1].pirce}}</span>
                    <span v-if="item.roomId =='2'">{{item.testprice[item.roomId-1].pirce}}</span>
                    <span v-if="item.roomId =='3'">{{item.testprice[item.roomId-1].pirce}}</span>
                  </span>
                </td>
                <td class="height30" align="center">{{item.payNum}}</td>
                <td class="height30" align="center">
                  <span v-if="item.type=='1'"><el-input-number class="editServiceTabInputNum"  v-model="item.number" :min="parseInt(item.payNum)"></el-input-number></span>
                  <span v-if="item.type=='2'"><el-input  class="editServiceTabInputNum"  placeholder="请输入技师姓名" v-model="item.number"></el-input></span>
                  <span v-if="item.type=='3'">{{item.number}}</span>
                  
                </td>							
                </tr>
              </table>
          </div>          
          <div slot="footer" class="dialog-footer" style="text-align:center;">
            <button class="button-large"   @click="editServiceOk">确 定</button>
            <button class="button-cancel"  @click="editServiceFlag = false">取 消</button>            
          </div>
        </el-dialog>
        <!--修改服务弹窗结束-->        
        
  </div>
</template>

<script>
import { staffList, addStaff, getStaff ,addMech} from "@/api/staff";
  import {
    orderServer
  } from '@/api/skill'
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
          options:[],
          techName:'',
          techStationId:'',
          promShow1:false, 
          promInf1:'搜索内容不存在!',
          listTech:[],          
          selectCommidty:[	
            {
              id:'1',
              checkAll:false,
              name:'大型灯',
              type:'1',
              pirce:'26',
              payNum:'2',
              number:2
            },
            {
              id:'4',
              checkAll:true,
              roomId:'1',
              testprice:[
                {pirce:'26'},
                {pirce:'52'},
                {pirce:'78'},
              ],
              roomType:[
              { key: "1", roomName: "一居室"},
              { key: "2", roomName: "二居室"},
              { key: "3", roomName: "三居室"}
              ],
              type:'3',
              pirce:'26',
              payNum:'2',
              number:1
            },			
            {
              id:'2',
              checkAll:false,
              name:'面积（平米)',
              type:'2',
              pirce:'26',
              payNum:'2',
              number:3
            },
            {
              id:'3',
              checkAll:false,
              roomId:'2',
              testprice:[
                {pirce:'26'},
                {pirce:'52'},
                {pirce:'78'},
              ],
              roomType:[
              { key: "1", roomName: "一居室"},
              { key: "2", roomName: "二居室"},
              { key: "3", roomName: "三居室"}
              ],
              type:'3',
              pirce:'26',
              payNum:'2',
              number:1
            }						
          ],      
          select:'date',
          editServiceFlag:false,
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
                id:1,
                goods:[
                {
                  goodsId:"1002",
                  goodsName:"大灯",
                  goodsNum:"3",
                  payPrice:"300"
                },
                {
                  goodsId:"1003",
                  goodsName:"平米保洁",
                  goodsNum:"100",
                  payPrice:"200"
                },
                {
                   goodsId:"1004",
                   goodsName:"一居室",
                   goodsNum:"1",
                   payPrice:"120"
                }
                ],                               
              }          
              ], 
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
          orderCancelFlag:false,
		
    };
  },
  methods:{
    //日期变化时改变时间对象
    dateChange(){
      console.log(this.value1)
    },
    //时间选项点击
    timeChange(index){
      console.log(index)
      for(var a=0;a<this.$refs.TimeWrap.length;a++){
          if(a==index){
              this.$refs.TimeWrap[a].style.borderColor = "green";
              this.$refs.TimeWrap[a].style.color = "green";
              this.$refs.TimeWrap[a].className ='selfSeverTimeSt mark'
          }else{
              this.$refs.TimeWrap[a].style.borderColor = "#fff";
              this.$refs.TimeWrap[a].style.color = "#000";
              this.$refs.TimeWrap[a].style.border = "1px solid #bfcbd9";
              this.$refs.TimeWrap[a].className ='selfSeverTimeSt';                           
          }

      }


    },
    //技师数据回显二级选中
    selectionreturn1(){
      if(this.tabOptions.length != 'undefined'){
        for(let a=0;a<this.listTech.length;a++){
          for(let b=0;b<this.tabOptions.length;b++){
            if(this.tabOptions[b].techId == this.listTech[a].techId){
            this.listTech[a].techChecked=true;
            }
          }
        }
      }                                        
    },       
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
		//先遍历数据中选中的再保存
		var arr=[];
		if(this.listTech.length){
			for(let a=0;a<this.listTech.length;a++){
				if(this.listTech[a].techChecked == true){
					arr.push(this.listTech[a]);
				}
			}
		}
		this.tabOptions=arr
		this.dialogTableVisible = false	
	},        
    //修改服务弹窗
    editService(row){
        this.editServiceFlag=true;
    },
    //修改服务弹窗确定按钮
    editServiceOk(){
        this.editServiceFlag=false;
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
    //改派或新增技师
    gaiPai(status,obj){
      console.log(status,obj);
        var obj={};             
        orderServer(obj).then(res => {      
          if (res.data.code === 1) {                         
            this.options=res.data.data.stations 
            this.listTech=res.data.data.techs 
            this.dialogTableVisible=true;
            this.selectionreturn1();                                                          
          }else{
          }          
        }).catch(res=>{
          
        });    
    },
    //
    changeTime(){
      this.dialogVisible=true;
    },
    //取消订单按钮
    cancelOrder(){
       this.orderCancelFlag=true;
    },
    //取消订单弹窗确定
    orderCancelOk(){
       this.orderCancelFlag=false;
    }
	
  },
  mounted() {


  }
};
</script>
<style   scoped>
.mark {
  background: url(../../../static/icon/Selected.png) right bottom no-repeat;
  background-size: 20px 20px;
}
.selfDateStyle{width:200px;margin-left:20px;}
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
.height100{height:100px;}
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
.picStyle{float:left;width:120px;height:120px;border:1px solid #ccc;margin-right:20px;margin-top:20px;}
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
   display:inline-block;margin-left:-70px;
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
</style>