webpackJsonp([29],{"326C":function(e,t,s){"use strict";function a(e){s("Jnrf")}Object.defineProperty(t,"__esModule",{value:!0});var i=s("X+SR"),r=s("W991"),o=s("J0+h"),n=a,d=o(i.a,r.a,n,"data-v-3c449e8c",null);t.default=d.exports},FWz8:function(e,t,s){"use strict";function a(e,t,s){return O.a.post("/apiservice/a/service/order/orderInfo/listData?pageNo="+t+"&pageSize="+s,e)}function i(e){return O.a.post("/apiservice/a/service/order/orderInfo/formData",e)}function r(e){return O.a.post("/apiservice/a/service/order/orderInfo/timeDataList",e)}function o(e){return O.a.post("/apiservice/a/service/order/orderInfo/saveTime",e)}function n(e){return O.a.post("/apiservice/a/service/order/orderInfo/addTech",e)}function d(e){return O.a.post("/apiservice/a/service/order/orderInfo/addTechSave",e)}function c(e){return O.a.post("/apiservice/a/service/order/orderInfo/dispatchTech",e)}function l(e){return O.a.post("/apiservice/a/service/order/orderInfo/dispatchTechSave",e)}function m(e,t,s){return O.a.post("apiservice/a/service/order/orderDispatch/listData?pageNo="+t+"&pageSize="+s,e)}function u(e){return O.a.post("apiservice/a/service/order/orderDispatch/formData",e)}function v(e){return O.a.post("apiservice/a/service/order/orderDispatch/dispatchTech",e)}function h(e){return O.a.post("/apiservice/a/service/order/orderDispatch/dispatchTechSave",e)}function p(e){return O.a.post("/apiservice/a/service/order/orderInfo/findCustomerByPhone",e)}function g(e){return O.a.post("/apiservice/a/service/order/orderInfo/findCustomerById",e)}function f(e){return O.a.post("/apiservice/a/service/order/orderInfo/findItemList",e)}function w(e){return O.a.post("/apiservice/a/service/order/orderInfo/findGoodsListByItem",e)}function T(e){return O.a.post("/apiservice/a/service/order/orderInfo/findTechListByGoods",e)}function y(e){return O.a.post("/apiservice/a/service/order/orderInfo/findTimeListByTech",e)}function S(e){return O.a.post("/apiservice/a/service/order/orderInfo/createOrder",e)}function _(e){return O.a.post("/apiservice/a/service/order/orderInfo/findGoodsNeedTech",e)}function b(e){return O.a.post("/apiservice/a/service/order/orderInfo/orderCancel",e)}function I(e){return O.a.post("/apiservice/a/service/order/orderInfo/orderRefundInit",e)}function N(e){return O.a.post("/apiservice/a/service/order/orderInfo/orderRefundSave",e)}function D(e,t,s){return new x.a(function(a,i){O.a.post("apiservice/a/service/order/orderInfo/listDataRefund?pageNo="+t+"&pageSize="+s,e).then(function(e){a(e)}).catch(function(e){i(e)})})}function k(e){return console.log(e,"obj"),new x.a(function(t,s){O.a.post("apiservice/a/service/order/orderInfo/formDataRefund",e).then(function(e){t(e)}).catch(function(e){s(e)})})}function C(e,t,s){return O.a.post("apiservice/a/service/order/orderInfo/listDataPay?pageNo="+t+"&pageSize="+s,e)}function M(e,t,s){return O.a.post("apiservice/a/service/order/combination/listDataCombination?pageNo="+t+"&pageSize="+s,e)}t.d=a,t.f=i,t.n=r,t.g=o,t.h=n,t.j=d,t.i=c,t.k=l,t.r=m,t.s=u,t.p=v,t.q=h,t.v=p,t.x=g,t.w=f,t.y=w,t.z=T,t.u=y,t.A=S,t.t=_,t.m=b,t.l=I,t.e=N,t.a=D,t.b=k,t.c=C,t.o=M;var z=s("rVsN"),x=s.n(z),O=s("Vo7i")},Jnrf:function(e,t,s){var a=s("KoJg");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s("XkoO")("43fe0e4f",a,!0)},KoJg:function(e,t,s){t=e.exports=s("acE3")(!1),t.push([e.i,".selfToolTip[data-v-3c449e8c]{width:140px}.selfToolTip1[data-v-3c449e8c],.selfToolTip[data-v-3c449e8c]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.selfToolTip1[data-v-3c449e8c]{margin:0 auto;width:120px}.addorder-container[data-v-3c449e8c]{width:100%;float:left;background:#eef1f6}.width200[data-v-3c449e8c]{width:200px}.floatRight[data-v-3c449e8c]{float:right}.fist-bar[data-v-3c449e8c]{background:#fff;border-bottom:1px solid #eee}.second-input[data-v-3c449e8c]{margin-top:10px}.orderMangeWarp[data-v-3c449e8c]{background:#fff;padding:20px}.exprotStyle[data-v-3c449e8c]{float:right;margin-bottom:10px}.ordermanageTableWrap[data-v-3c449e8c]{width:100%;background:#fff;padding:20px 0 46px}.ordermanagePagination[data-v-3c449e8c]{margin-top:20px;float:right}",""])},W991:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"addorder-container"},[s("div",{staticClass:"fist-bar"},[s("el-tabs",{staticClass:"orderTab",on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},e._l(e.orderTest,function(e,t,a){return s("el-tab-pane",{key:a,attrs:{label:e,name:t}})})),e._v(" "),s("div",{staticClass:"searchs"},[s("el-input",{staticClass:"search",attrs:{placeholder:"请输入订单编号"},on:{blur:e.orderNumChange},model:{value:e.orderNumber,callback:function(t){e.orderNumber=t},expression:"orderNumber"}}),e._v(" "),s("el-select",{staticClass:"search",attrs:{clearable:"",filterable:"",placeholder:"选择机构"},on:{change:e.orgChange},model:{value:e.mechanism,callback:function(t){e.mechanism=t},expression:"mechanism"}},e._l(e.mechanismOptions,function(e){return s("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),s("el-select",{staticClass:"search",attrs:{clearable:"",filterable:"",placeholder:"选择服务站"},on:{change:e.stationChange},model:{value:e.payType,callback:function(t){e.payType=t},expression:"payType"}},e._l(e.payTypeOptions,function(e){return s("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),s("el-select",{staticClass:"search",attrs:{clearable:"",placeholder:"请选择服务状态"},on:{change:e.sevicerStustasChange},model:{value:e.sevicerStustas,callback:function(t){e.sevicerStustas=t},expression:"sevicerStustas"}},e._l(e.sevicerStustasOptions,function(e,t,a){return s("el-option",{key:a,attrs:{label:e,value:t}})})),e._v(" "),s("button",{staticClass:"search-button floatRight btn_search btn-color",attrs:{type:"button"},on:{click:e.localSearch}},[s("i",{staticClass:"el-icon-search"}),e._v(" 搜索")]),e._v(" "),s("div",{staticClass:"second-input"},[s("el-date-picker",{staticClass:"search",staticStyle:{width:"20%"},attrs:{type:"daterange",placeholder:"选择下单时间"},on:{change:e.downOrder},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}}),e._v(" "),s("el-date-picker",{staticClass:"search",staticStyle:{width:"20%"},attrs:{type:"daterange",placeholder:"选择服务时间"},on:{change:e.changeStime},model:{value:e.severTime,callback:function(t){e.severTime=t},expression:"severTime"}})],1)],1)],1),e._v(" "),s("div",{staticClass:"orderMangeWarp"},[s("div",{staticClass:"ordermanageTableWrap"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticClass:"selfOrderTable",staticStyle:{width:"100%"},attrs:{data:e.tabDataList,fixed:"","element-loading-text":"正在加载","highlight-current-row":""}},[s("el-table-column",{attrs:{align:"center","min-width":"220",label:"订单编号",prop:"orderNumber"}}),e._v(" "),"sys"==e.userType||"platform"==e.userType?s("el-table-column",{attrs:{align:"center","min-width":"150","render-header":e.renderHeader},scopedSlots:e._u([{key:"default",fn:function(t){return[void 0!=t.row.orgName?s("el-tooltip",{attrs:{placement:"left",disabled:t.row.orgName.length<10,content:t.row.orgName}},[s("p",{class:t.row.orgName.length<10?"":"selfToolTip1"},[e._v(e._s(t.row.orgName))])]):e._e(),e._v(" "),void 0!=t.row.stationName?s("el-tooltip",{attrs:{placement:"left",disabled:t.row.stationName.length<10,content:t.row.stationName}},[s("p",{class:t.row.stationName.length<10?"":"selfToolTip1"},[e._v(e._s(t.row.stationName))])]):e._e()]}}])}):e._e(),e._v(" "),"org"==e.userType?s("el-table-column",{attrs:{align:"center",width:"150",label:"服务站"},scopedSlots:e._u([{key:"default",fn:function(t){return[void 0!=t.row.stationName?s("el-tooltip",{attrs:{placement:"left",disabled:t.row.stationName.length<10,content:t.row.stationName}},[s("p",{class:t.row.stationName.length<10?"":"selfToolTip1"},[e._v(e._s(t.row.stationName))])]):e._e()]}}])}):e._e(),e._v(" "),s("el-table-column",{attrs:{align:"center","min-width":"94",label:"订单来源"},scopedSlots:e._u([{key:"default",fn:function(t){return["own"==t.row.orderSource?s("span",[e._v("本机构")]):e._e(),e._v(" "),"gasq"==t.row.orderSource?s("span",[e._v("国安社区")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{align:"center","min-width":"170",label:"服务内容"},scopedSlots:e._u([{key:"default",fn:function(t){return[void 0!=t.row.orderContent?s("el-tooltip",{attrs:{placement:"left",disabled:t.row.orderContent.length<=11,content:t.row.orderContent}},[s("div",{class:t.row.orderContent.length<=11?"":"selfToolTip"},[e._v(e._s(t.row.orderContent))])]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{align:"center","min-width":"150",label:"付款价格"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",[e._v("￥"+e._s(t.row.payPrice))])]}}])}),e._v(" "),s("el-table-column",{attrs:{align:"center","min-width":"160",label:"服务时间",prop:"serviceTime"}}),e._v(" "),s("el-table-column",{attrs:{align:"center","min-width":"94",label:"服务状态"},scopedSlots:e._u([{key:"default",fn:function(t){return["wait_service"==t.row.serviceStatus?s("span",[e._v("待服务")]):e._e(),e._v(" "),"started"==t.row.serviceStatus?s("span",[e._v("已上门")]):e._e(),e._v(" "),"finish"==t.row.serviceStatus?s("span",[e._v("已完成")]):e._e(),e._v(" "),"cancel"==t.row.serviceStatus?s("span",[e._v("已取消")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{align:"center","min-width":"94",label:"订单状态"},scopedSlots:e._u([{key:"default",fn:function(t){return["cancel"==t.row.orderStatus?s("span",[e._v("已取消")]):e._e(),e._v(" "),"dispatched"==t.row.orderStatus?s("span",[e._v("已派单")]):e._e(),e._v(" "),"finish"==t.row.orderStatus?s("span",[e._v("已完成")]):e._e(),e._v(" "),"close"==t.row.orderStatus?s("span",[e._v("已关闭")]):e._e(),e._v(" "),"stop"==t.row.orderStatus?s("span",[e._v("已暂停")]):e._e(),e._v(" "),"success"==t.row.orderStatus?s("span",[e._v("已成功")]):e._e(),e._v(" "),"waitdispatch"==t.row.orderStatus?s("span",[e._v("待派单")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{align:"center","min-width":"180",label:"对接订单ID"},scopedSlots:e._u([{key:"default",fn:function(t){return[void 0!=t.row.jointOrderId?s("el-tooltip",{attrs:{placement:"left",disabled:t.row.jointOrderId.length<=20,content:t.row.jointOrderId}},[s("div",{class:t.row.jointOrderId.length<=20?"":"selfToolTip"},[e._v(e._s(t.row.jointOrderId))])]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{align:"center","min-width":"160",label:"下单时间",prop:"orderTime"}}),e._v(" "),s("el-table-column",{attrs:{align:"center",label:"操作",width:"150",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.btnShow.indexOf("order_info")>-1?s("el-button",{staticClass:"ceshi3",attrs:{type:"button"},on:{click:function(s){e.lookInf(t.row.id)}}},[e._v("查看")]):e._e()]}}])})],1),e._v(" "),e.listLoading?e._e():s("div",{staticClass:"ordermanagePagination"},[s("el-pagination",{attrs:{"current-page":e.jumpPage,"page-sizes":[5,10,15,20],"page-size":e.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.jumpPage=t}}})],1)],1)])])},i=[],r={render:a,staticRenderFns:i};t.a=r},"X+SR":function(e,t,s){"use strict";var a=s("FWz8"),i=s("oppB"),r=s("xT6B");t.a={name:"ordermanage",data:function(){return{userType:"",btnShow:[],severTime:[],severEndTime:"",dict:s("fIj0"),payTypeOptions:[],orderTest:[],payType:"",payStusOptions:[],payStus:"",mechanismOptions:[],mechanism:"",sevicerStustasOptions:[],sevicerStustas:"",searchCon:"",customerName:"",customerPhone:"",orderNumber:"",orderContent:"",activeName:"dispatched",startTime:[],endTime:"",tabDataList:[],size:10,total:null,jumpPage:1,pageNumber:1,listLoading:!0,active1:""}},created:function(){JSON.parse(localStorage.getItem("btn"))&&(this.btnShow=JSON.parse(localStorage.getItem("btn")))},methods:{orderNumChange:function(){window.sessionStorage.setItem("orderNumber",this.orderNumber)},stationChange:function(e){window.sessionStorage.setItem("stationId",e)},sevicerStustasChange:function(e){window.sessionStorage.setItem("sevicerStustas",e)},downOrder:function(e){void 0!=e?(void 0!=this.startTime[0]&&null!=this.startTime[0]&&window.sessionStorage.setItem("startTime",this.startTime[0]),void 0!=this.startTime[1]&&null!=this.startTime[1]&&window.sessionStorage.setItem("endTime",this.startTime[1])):(window.sessionStorage.setItem("startTime",""),window.sessionStorage.setItem("endTime",""),this.startTime=[])},changeStime:function(e){void 0!=e?(void 0!=this.severTime[0]&&null!=this.severTime[0]&&window.sessionStorage.setItem("serviceTimeStart",this.severTime[0]),void 0!=this.severTime[1]&&null!=this.severTime[1]&&window.sessionStorage.setItem("serviceTimeEnd",this.severTime[1])):(window.sessionStorage.setItem("serviceTimeStart",""),window.sessionStorage.setItem("serviceTimeEnd",""),this.severTime=[])},renderHeader:function(e){return[e("p",{},["服务机构"]),e("p",{},["服务站"])]},orgChange:function(e){var t=this;if(this.payType="",this.payTypeOptions=[],window.sessionStorage.setItem("mechanism",e),""!=e){var a={orgId:e};s.i(i.c)(a).then(function(e){1===e.data.code&&e.data.data&&(0==e.data.data[0].id&&e.data.data.remove(e.data.data[0]),t.payTypeOptions=e.data.data,null!=window.sessionStorage.getItem("stationId")&&(t.payType=window.sessionStorage.getItem("stationId")),"station"==t.userType&&(t.payType=t.payTypeOptions[0].id))})}},getTableData:function(e,t,i){var r=this;this.listLoading=!0;var o=e;s.i(a.d)(o,t,i).then(function(e){1===e.data.code?(r.total=e.data.data.page.count,r.tabDataList=e.data.data.page.list,r.pageNumber=e.data.data.page.pageNo,r.jumpPage=e.data.data.page.pageNo,r.size=e.data.data.page.pageSize,r.listLoading=!1):r.listLoading=!1}).catch(function(e){r.listLoading=!1})},getoffice:function(){var e=this;s.i(i.b)({}).then(function(t){if(void 0!=t.data.data.list){if("0"==t.data.data.list[0].id&&t.data.data.list.remove(t.data.data.list[0]),t.data.data.list.length>=2&&"0"==t.data.data.list[1].id&&(t.data.data.list.remove(t.data.data.list[1]),t.data.data.list.remove(t.data.data.list[0])),e.mechanismOptions=t.data.data.list,null!=window.sessionStorage.getItem("mechanism")&&(e.mechanism=window.sessionStorage.getItem("mechanism")),null!=window.sessionStorage.getItem("orderNumber")&&(e.orderNumber=window.sessionStorage.getItem("orderNumber")),null!=window.sessionStorage.getItem("pageSize")&&(e.size=window.sessionStorage.getItem("pageSize")),null!=window.sessionStorage.getItem("pageNumber")&&(e.pageNumber=window.sessionStorage.getItem("pageNumber")),null!=window.sessionStorage.getItem("sevicerStustas")&&(e.sevicerStustas=window.sessionStorage.getItem("sevicerStustas")),null!=window.sessionStorage.getItem("orderStatus")&&(e.activeName=window.sessionStorage.getItem("orderStatus"),e.active1=e.activeName),null!=window.sessionStorage.getItem("stationId")&&(e.payType=window.sessionStorage.getItem("stationId")),void 0!=e.severTime){if(0==e.severTime.length&&null!=window.sessionStorage.getItem("serviceTimeStart")&&null!=window.sessionStorage.getItem("serviceTimeEnd")){var s=[];s.push(window.sessionStorage.getItem("serviceTimeStart")),s.push(window.sessionStorage.getItem("serviceTimeEnd")),e.severTime=s}}else e.severTime=[];if(void 0!=e.startTime){if(0==e.startTime.length&&null!=window.sessionStorage.getItem("startTime")&&null!=window.sessionStorage.getItem("endTime")){var a=[];a.push(window.sessionStorage.getItem("startTime")),a.push(window.sessionStorage.getItem("endTime")),e.startTime=a}}else e.startTime=[];if(""!=e.orderNumber||""!=e.sevicerStustas||""!=e.mechanism||0!=e.severTime.length||0!=e.startTime.length||""!=e.payType||""!=e.size){var i,o;void 0!=e.severTime?(i=void 0!=e.severTime[0]&&""!=e.severTime[0]?r.a.formatDate.format(new Date(e.severTime[0]),"yyyy-MM-dd hh:mm:ss"):null,o=void 0!=e.severTime[1]&&""!=e.severTime[1]?r.a.formatDate.format(new Date(e.severTime[1]),"yyyy-MM-dd 23:59:59"):null):(i=null,o=null);var n,d;void 0!=e.startTime?(n=void 0!=e.startTime[0]&&""!=e.startTime[0]?r.a.formatDate.format(new Date(e.startTime[0]),"yyyy-MM-dd hh:mm:ss"):null,d=void 0!=e.startTime[1]&&""!=e.startTime[1]?r.a.formatDate.format(new Date(e.startTime[1]),"yyyy-MM-dd 23:59:59"):null):(n=null,d=null),"whole"==e.activeName?e.active1="":e.active1=e.activeName;var c={orderStatus:e.active1,serviceStatus:e.sevicerStustas,orgId:e.mechanism,stationId:e.payType,orderNumber:e.orderNumber,orderTimeStart:n,orderTimeEnd:d,serviceTimeStart:i,serviceTimeEnd:o};e.getTableData(c,e.pageNumber,e.size)}else e.getTableData({orderStatus:"dispatched"},1,10)}})},handleClick:function(e,t){this.activeName=e.name,"whole"==e.name?this.active1="":this.active1=e.name,this.payStus="",this.pageNumber=1,this.localSearch()},localSearch:function(){var e,t;void 0!=this.severTime?(e=void 0!=this.severTime[0]&&""!=this.severTime[0]?r.a.formatDate.format(new Date(this.severTime[0]),"yyyy-MM-dd hh:mm:ss"):null,t=void 0!=this.severTime[1]&&""!=this.severTime[1]?r.a.formatDate.format(new Date(this.severTime[1]),"yyyy-MM-dd 23:59:59"):null):(e=null,t=null);var s,a;void 0!=this.startTime?(s=void 0!=this.startTime[0]&&""!=this.startTime[0]?r.a.formatDate.format(new Date(this.startTime[0]),"yyyy-MM-dd hh:mm:ss"):null,a=void 0!=this.startTime[1]&&""!=this.startTime[1]?r.a.formatDate.format(new Date(this.startTime[1]),"yyyy-MM-dd 23:59:59"):null):(s=null,a=null),"whole"==this.activeName?this.active1="":this.active1=this.activeName;var i={orderStatus:this.active1,serviceStatus:this.sevicerStustas,orgId:this.mechanism,stationId:this.payType,orderNumber:this.orderNumber,orderTimeStart:s,orderTimeEnd:a,serviceTimeStart:e,serviceTimeEnd:t};this.pageNumber=1,this.jumpPage=1,window.sessionStorage.setItem("orderNumber",this.orderNumber),window.sessionStorage.setItem("sevicerStustas",this.sevicerStustas),""==this.activeName?window.sessionStorage.setItem("orderStatus","whole"):window.sessionStorage.setItem("orderStatus",this.activeName),window.sessionStorage.setItem("mechanism",this.mechanism),window.sessionStorage.setItem("stationId",this.payType),window.sessionStorage.setItem("pageNumber",this.pageNumber),window.sessionStorage.setItem("pageSize",this.size),void 0!=this.severTime?(void 0!=this.severTime[0]&&null!=this.severTime[0]&&window.sessionStorage.setItem("serviceTimeStart",this.severTime[0]),void 0!=this.severTime[1]&&null!=this.severTime[1]&&window.sessionStorage.setItem("serviceTimeEnd",this.severTime[1])):(window.sessionStorage.setItem("serviceTimeStart",""),window.sessionStorage.setItem("serviceTimeEnd",""),this.severTime=[]),void 0!=this.startTime?(void 0!=this.startTime[0]&&null!=this.startTime[0]&&window.sessionStorage.setItem("startTime",this.startTime[0]),void 0!=this.startTime[1]&&null!=this.startTime[1]&&window.sessionStorage.setItem("endTime",this.startTime[1])):(window.sessionStorage.setItem("startTime",""),window.sessionStorage.setItem("endTime",""),this.startTime=[]),this.getTableData(i,this.pageNumber,this.size)},exportOrder:function(){},lookInf:function(e){window.localStorage.setItem("orderId",e),window.sessionStorage.setItem("orderNumber",this.orderNumber),window.sessionStorage.setItem("sevicerStustas",this.sevicerStustas),""==this.activeName?window.sessionStorage.setItem("orderStatus","whole"):window.sessionStorage.setItem("orderStatus",this.activeName),window.sessionStorage.setItem("pageNumber",this.pageNumber),window.sessionStorage.setItem("pageSize",this.size),window.sessionStorage.setItem("mechanism",this.mechanism),window.sessionStorage.setItem("stationId",this.payType),void 0!=this.severTime?(void 0!=this.severTime[0]&&null!=this.severTime[0]&&window.sessionStorage.setItem("serviceTimeStart",this.severTime[0]),void 0!=this.severTime[1]&&null!=this.severTime[1]&&window.sessionStorage.setItem("serviceTimeEnd",this.severTime[1])):(window.sessionStorage.setItem("serviceTimeStart",""),window.sessionStorage.setItem("serviceTimeEnd",""),this.severTime=[]),void 0!=this.startTime?(void 0!=this.startTime[0]&&null!=this.startTime[0]&&window.sessionStorage.setItem("startTime",this.startTime[0]),void 0!=this.startTime[1]&&null!=this.startTime[1]&&window.sessionStorage.setItem("endTime",this.startTime[1])):(window.sessionStorage.setItem("startTime",""),window.sessionStorage.setItem("endTime",""),this.startTime=[]),this.$router.push({path:"/clean/orderinfo",query:{id:e}})},handleSizeChange:function(e){this.pageNumber=1,this.jumpPage=1,this.size=e;var t,s;void 0!=this.severTime?(t=void 0!=this.severTime[0]&&""!=this.severTime[0]?r.a.formatDate.format(new Date(this.severTime[0]),"yyyy-MM-dd hh:mm:ss"):null,s=void 0!=this.severTime[1]&&""!=this.severTime[1]?r.a.formatDate.format(new Date(this.severTime[1]),"yyyy-MM-dd 23:59:59"):null):(t=null,s=null);var a,i;void 0!=this.startTime?(a=void 0!=this.startTime[0]&&""!=this.startTime[0]?r.a.formatDate.format(new Date(this.startTime[0]),"yyyy-MM-dd hh:mm:ss"):null,i=void 0!=this.startTime[1]&&""!=this.startTime[1]?r.a.formatDate.format(new Date(this.startTime[1]),"yyyy-MM-dd 23:59:59"):null):(a=null,i=null),"whole"==this.activeName?this.active1="":this.active1=this.activeName;var o={orderStatus:this.active1,serviceStatus:this.sevicerStustas,orgId:this.mechanism,stationId:this.payType,orderNumber:this.orderNumber,orderTimeStart:a,orderTimeEnd:i,serviceTimeStart:t,serviceTimeEnd:s};this.getTableData(o,this.pageNumber,this.size),window.sessionStorage.setItem("pageNumber",this.pageNumber),window.sessionStorage.setItem("pageSize",this.size)},handleCurrentChange:function(e){this.pageNumber=e;var t,s;void 0!=this.severTime?(t=this.severTime[0]&&""!=this.severTime[0]?r.a.formatDate.format(new Date(this.severTime[0]),"yyyy-MM-dd hh:mm:ss"):null,s=void 0!=this.severTime[1]&&""!=this.severTime[1]?r.a.formatDate.format(new Date(this.severTime[1]),"yyyy-MM-dd 23:59:59"):null):(t=null,s=null);var a,i;void 0!=this.startTime?(a=this.startTime[0]&&""!=this.startTime[0]?r.a.formatDate.format(new Date(this.startTime[0]),"yyyy-MM-dd hh:mm:ss"):null,i=void 0!=this.startTime[1]&&""!=this.startTime[1]?r.a.formatDate.format(new Date(this.startTime[1]),"yyyy-MM-dd 23:59:59"):null):(a=null,i=null),"whole"==this.activeName?this.active1="":this.active1=this.activeName;var o={orderStatus:this.active1,serviceStatus:this.sevicerStustas,orgId:this.mechanism,stationId:this.payType,orderNumber:this.orderNumber,orderTimeStart:a,orderTimeEnd:i,serviceTimeStart:t,serviceTimeEnd:s};this.getTableData(o,this.pageNumber,this.size),window.sessionStorage.setItem("pageNumber",this.pageNumber),window.sessionStorage.setItem("pageSize",this.size)}},mounted:function(){this.payStusOptions=this.dict.pay_status,this.orderTest=this.dict.order_status,this.sevicerStustasOptions=this.dict.service_status,this.userType=localStorage.getItem("type"),this.getoffice()}}},fIj0:function(e,t){e.exports={assess_grade:{1:"一级",2:"二级",3:"三级",4:"四级",5:"五级"},del_flag:{0:"正常",1:"删除"},education:{primary:"小学",middle:"初中",special:"中专",high:"高中",junior:"大专",university:"本科及以上"},ethnic:{10:"朝鲜族",11:"满族",12:"侗族",13:"瑶族",14:"白族",15:"土家族",16:"哈尼族",17:"哈萨克族",18:"傣族",19:"黎族",20:"僳僳族",21:"佤族",22:"畲族",23:"高山族",24:"拉祜族",25:"水族",26:"东乡族",27:"纳西族",28:"景颇族",29:"柯尔克孜族",30:"土族",31:"达斡尔族",32:"仫佬族",33:"羌族",34:"布朗族",35:"撒拉族",36:"毛难族",37:"仡佬族",38:"锡伯族",39:"阿昌族",40:"普米族",41:"塔吉克族",42:"怒族",43:"乌孜别克族",44:"俄罗斯族",45:"鄂温克族",46:"崩龙族",47:"保安族",48:"裕固族",49:"京族",50:"塔塔尔族",51:"独龙族",52:"鄂伦春族",53:"赫哲族",54:"门巴族",55:"珞巴族",56:"基诺族","01":"汉族","09":"布依族","07":"彝族","02":"蒙古族","04":"藏族","03":"回族","06":"苗族","05":"维吾尔族","08":"壮族"},job_natrue:{full_time:"全职",part_time:"兼职"},job_status:{online:"在岗",leave:"离岗"},matrimony:{unmarried:"未婚",married:"已婚",divorce:"离婚",widowed:"丧偶"},meterage:{house:"按居室",area:"按面积",num:"按时长或数量"},order_majorSort:{clean:"保洁",repair:"家修"},order_source:{score:"积分商城",store:"门店",app:"app",wechat:"微信",tv:"电视",callcenter:"400呼叫中心",web:"PC"},order_status:{dispatched:"已派单",finish:"已完成",success:"已成功",waitdispatch:"待派单",cancel:"已取消",close:"已关闭",whole:"全部"},order_type:{common:"普通订单",group_split_yes:"组合并拆单",group_split_no:"组合不拆单"},pay_method:{online:"在线",offline:"货到付款"},pay_platform:{cash:"现金",wx_pub_qr:"微信扫码",alipay:"支付宝",balance:"余额",alipay_qr:"支付宝扫码",wx:"微信",pos:"银行卡"},pay_status:{payed:"已支付",waitpay:"待支付"},cancel_type:{customer:"客户来电取消",tech:"无可派技师",other:"其它原因"},relation:{spouse:"夫妻",parent:"父母",children:"子女",siblings:"兄弟姐妹",relative:"亲戚"},return_status:{refunded:"退款成功",failure:"退款失败",cancel:"已取消",refunding:"申请退款中"},service_area_type:{map:"地图",store:"门店"},service_station_type:{self:"直营",join:"加盟"},service_status:{wait_service:"待服务",started:"已上门",finish:"已完成",cancel:"已取消"},ser_sort:{clean:"保洁",repair:"家修",all:"全部"},sex:{male:"男",female:"女"},source:{own:"本机构",other:"第三方"},sys_log_type:{visit:"接入日志",error:"异常日志"},tech_status:{1:"派单",2:"未派单"},work_time:{0:"1年以下",1:"1年",2:"2年",3:"3年",4:"4年",5:"5年",6:"6年",7:"7年",8:"8年",9:"9年",10:"10年",11:"10年以上"},yes_no:{yes:"是",no:"否"},send_type:{save_order:"更新订单信息",del_goods:"删除商品",save_goods:"保存商品"},butt_status:{butt_butt:"对接中",butt_success:"对接成功",butt_fail:"对接失败",remove_fail:"解除失败"},dock_platform:{select:"请选择",gasq:"国安社区"},refund_type:{many:"多退",less:"少退"},group_order_status:{no_finished:"未完成",finished:"已完成"},frequency_options:{week_one:"1周1次",week_some:"1周多次",two_week_one:"2周1次"},refund_method:{cash:"现金"}}},oppB:function(e,t,s){"use strict";function a(e){return S.a.post("/apiservice/a/sys/user/saveData",e)}function i(e){return S.a.post("/apiservice/a/sys/user/upData",e)}function r(e){return S.a.post("/apiservice/a/sys/user/formData",e)}function o(e,t,s){return S.a.post("/apiservice/a/sys/role/listPageData?pageNo="+t+"&pageSize="+s,e)}function n(e){return S.a.post("/apiservice/a/sys/role/listDataWithoutPermission",e)}function d(e,t,s){return S.a.post("/apiservice/a/sys/user/listData?pageNo="+t+"&pageSize="+s,e)}function c(e){return S.a.post("/apiservice/a/sys/role/saveData",e)}function l(e){return S.a.post("/apiservice/a/sys/role/upData",e)}function m(e){return S.a.post("/apiservice/a/sys/role/deleteRole",e)}function u(e){return S.a.get("/apiservice/a/sys/role/getRoleDetail?id="+e)}function v(e){return S.a.post("/apiservice/a/sys/organization/getOrgByTypeOrgId",e)}function h(e){return S.a.post("/apiservice/a/service/station/serviceStation/listStationByOrgId",e)}function p(e){return S.a.post("/apiservice/a/sys/organization/listDataAll",e)}function g(e){return S.a.post("/apiservice/a/service/station/serviceStation/listByOffice",e)}function f(){return S.a.get("/apiservice/a/sys/menu/getMenuList")}function w(e){return S.a.post("/apiservice/a/sys/user/deleteUser",e)}function T(e){return S.a.get("/apiservice/a/sys/role/chkName?id="+e.id+"&name="+e.name)}function y(e){return S.a.get("/apiservice/a/sys/role/chkNameUpdate?id="+e.id+"&name="+e.name+"&roleId="+e.roleId)}t.k=a,t.m=i,t.g=r,t.o=o,t.j=n,t.e=d,t.l=c,t.r=l,t.q=m,t.p=u,t.f=v,t.i=h,t.b=p,t.c=g,t.a=f,t.h=w,t.d=T,t.n=y;var S=s("Vo7i")},xT6B:function(e,t,s){"use strict";function a(e,t){for(var s=t-(e+"").length,a=0;a<s;a++)e="0"+e;return e}var i=/([yMdhsm])(\1*)/g;t.a={getQueryStringByName:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),s=window.location.search.substr(1).match(t),a="";return null!=s&&(a=s[2]),t=null,s=null,null==a||""===a||"undefined"===a?"":a},formatDate:{format:function(e,t){return t=t||"yyyy-MM-dd",t.replace(i,function(t){switch(t.charAt(0)){case"y":return a(e.getFullYear(),t.length);case"M":return a(e.getMonth()+1,t.length);case"d":return a(e.getDate(),t.length);case"w":return e.getDay()+1;case"h":return a(e.getHours(),t.length);case"m":return a(e.getMinutes(),t.length);case"s":return a(e.getSeconds(),t.length)}})},parse:function(e,t){var s=t.match(i),a=e.match(/(\d)+/g);if(s.length===a.length){for(var r=new Date(1970,0,1),o=0;o<s.length;o++){var n=parseInt(a[o]);switch(s[o].charAt(0)){case"y":r.setFullYear(n);break;case"M":r.setMonth(n-1);break;case"d":r.setDate(n);break;case"h":r.setHours(n);break;case"m":r.setMinutes(n);break;case"s":r.setSeconds(n)}}return r}return null}}}}});