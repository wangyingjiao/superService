webpackJsonp([10],{"326C":function(e,t,a){"use strict";function r(e){a("L37a")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("zA63"),i=a("flQd"),n=a("VU/8"),o=r,c=n(s.a,i.a,o,"data-v-3c449e8c",null);t.default=c.exports},FWz8:function(e,t,a){"use strict";function r(e,t,a){return v.a.post("/apiservice/a/service/order/orderInfo/listData?pageNo="+t+"&pageSize="+a,e)}function s(e){return v.a.post("/apiservice/a/service/order/orderInfo/formData",e)}function i(e){return v.a.post("/apiservice/a/service/order/orderInfo/timeData",e)}function n(e){return v.a.post("/apiservice/a/service/order/orderInfo/saveTime",e)}function o(e){return v.a.post("/apiservice/a/service/order/orderInfo/addTech",e)}function c(e){return v.a.post("/apiservice/a/service/order/orderInfo/addTechSave",e)}function l(e){return v.a.post("/apiservice/a/service/order/orderInfo/dispatchTech",e)}function d(e){return v.a.post("/apiservice/a/service/order/orderInfo/dispatchTechSave",e)}function u(e,t,a){return v.a.post("apiservice/a/service/order/orderDispatch/listData?pageNo="+t+"&pageSize="+a,e)}function p(e){return v.a.post("apiservice/a/service/order/orderDispatch/formData",e)}function h(e){return v.a.post("apiservice/a/service/order/orderDispatch/dispatchTech",e)}function m(e){return v.a.post("/apiservice/a/service/order/orderDispatch/dispatchTechSave",e)}t.a=r,t.b=s,t.d=i,t.c=n,t.e=o,t.g=c,t.f=l,t.h=d,t.k=u,t.l=p,t.i=h,t.j=m;var v=a("Vo7i")},L37a:function(e,t,a){var r=a("Vlkz");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("dd55b6b2",r,!0)},Vlkz:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".selfToolTip[data-v-3c449e8c]{width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.addorder-container[data-v-3c449e8c]{width:100%;float:left;background:#eef1f6}.width200[data-v-3c449e8c]{width:200px}.floatRight[data-v-3c449e8c]{float:right}.fist-bar[data-v-3c449e8c]{background:#fff;border-bottom:1px solid #eee}.second-input[data-v-3c449e8c]{margin-top:10px}.orderMangeWarp[data-v-3c449e8c]{background:#fff;padding:20px}.exprotStyle[data-v-3c449e8c]{float:right;margin-bottom:10px}.ordermanageTableWrap[data-v-3c449e8c]{width:100%;background:#fff;padding:20px 0 46px}.ordermanagePagination[data-v-3c449e8c]{margin-top:20px;float:right}",""])},fIj0:function(e,t){e.exports={del_flag:{0:"正常",1:"删除"},ethnic:{10:"朝鲜族",11:"满族",12:"侗族",13:"瑶族",14:"白族",15:"土家族",16:"哈尼族",17:"哈萨克族",18:"傣族",19:"黎族",20:"僳僳族",21:"佤族",22:"畲族",23:"高山族",24:"拉祜族",25:"水族",26:"东乡族",27:"纳西族",28:"景颇族",29:"柯尔克孜族",30:"土族",31:"达斡尔族",32:"仫佬族",33:"羌族",34:"布朗族",35:"撒拉族",36:"毛难族",37:"仡佬族",38:"锡伯族",39:"阿昌族",40:"普米族",41:"塔吉克族",42:"怒族",43:"乌孜别克族",44:"俄罗斯族",45:"鄂温克族",46:"崩龙族",47:"保安族",48:"裕固族",49:"京族",50:"塔塔尔族",51:"独龙族",52:"鄂伦春族",53:"赫哲族",54:"门巴族",55:"珞巴族",56:"基诺族","01":"汉族","02":"蒙古族","03":"回族","04":"藏族","05":"维吾尔族","06":"苗族","07":"彝族","08":"壮族","09":"布依族"},education:{primary:"小学",middle:"初中",special:"中专",high:"高中",junior:"大专",university:"本科及以上"},assess_grade:{1:"一级",2:"二级",3:"三级",4:"四级",5:"五级"},yes_no:{no:"否",yes:"是"},sex:{female:"女",male:"男"},ser_sort:{all:"全部",repair:"家修",clean:"保洁"},ser_majorsort:{repair:"家修",clean:"保洁"},sys_log_type:{visit:"接入日志",error:"异常日志"},pay_method:{offline:"货到付款",online:"在线"},matrimony:{divorce:"离婚",unmarried:"未婚",married:"已婚",widowed:"丧偶"},relation:{parent:"父母",siblings:"兄弟姐妹",children:"子女",spouse:"夫妻",relative:"亲戚"},job_status:{leave:"离岗",online:"在岗"},order_status:{dispatched:"已派单",started:"已上门",finish:"已完成",waitdispatch:"待派单",success:"已成功",cancel:"已取消",whole:"全部"},order_type:{common:"普通订单",group_split_yes:"组合并拆单",group_split_no:"组合不拆单"},order_majorSort:{clean:"保洁",repair:"家修"},service_status:{wait_service:"待服务",finish:"已完成",cancel:"已取消",started:"已上门"},pay_status:{waitpay:"待支付",payed:"已支付"},tech_status:{1:"派单",2:"未派单"},pay_platform:{wx:"微信",alipay:"支付宝",balance:"余额",pos:"银行卡",wx_pub_qr:"微信扫码",cash:"现金",alipay_qr:"支付宝扫码"},order_source:{own:"本机构",gasq:"国安社区"},return_status:{cancel:"已取消",refunding:"申请退款中",failure:"退款失败",refunded:"退款成功"},job_natrue:{part_time:"兼职",full_time:"全职"},service_station_type:{self:"直营",join:"加盟"},meterage:{area:"按面积",num:"按数量",house:"按居室"},service_area_type:{store:"门店",map:"地图"},work_time:{0:"1年以下",1:"1年",2:"2年",3:"3年",4:"4年",5:"5年",6:"6年",7:"7年",8:"8年",9:"9年",10:"10年",11:"10年以上"},source:{own:"本机构",other:"第三方"},work_start_time:["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30","24:00"]}},flQd:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"addorder-container"},[a("div",{staticClass:"fist-bar"},[a("el-tabs",{staticClass:"orderTab",on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},e._l(e.orderTest,function(e,t,r){return a("el-tab-pane",{key:r,attrs:{label:e,name:t}})})),e._v(" "),a("div",{staticClass:"searchs"},[a("el-select",{staticClass:"search",attrs:{clearable:"",placeholder:"选择支付状态"},model:{value:e.payStus,callback:function(t){e.payStus=t},expression:"payStus"}},e._l(e.payStusOptions,function(e,t,r){return a("el-option",{key:r,attrs:{label:e,value:t}})})),e._v(" "),a("el-select",{staticClass:"search",attrs:{clearable:"",filterable:"",placeholder:"选择机构"},on:{change:e.orgChange},model:{value:e.mechanism,callback:function(t){e.mechanism=t},expression:"mechanism"}},e._l(e.mechanismOptions,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"search",attrs:{clearable:"",filterable:"",placeholder:"选择服务站"},model:{value:e.payType,callback:function(t){e.payType=t},expression:"payType"}},e._l(e.payTypeOptions,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"search",attrs:{clearable:"",placeholder:"请选择服务状态"},model:{value:e.sevicerStustas,callback:function(t){e.sevicerStustas=t},expression:"sevicerStustas"}},e._l(e.sevicerStustasOptions,function(e,t,r){return a("el-option",{key:r,attrs:{label:e,value:t}})})),e._v(" "),a("button",{staticClass:"search-button floatRight btn_search",attrs:{type:"button"},on:{click:e.localSearch}},[a("i",{staticClass:"el-icon-search"}),e._v(" 搜索")]),e._v(" "),a("div",{staticClass:"second-input"},[a("el-date-picker",{staticClass:"search",staticStyle:{width:"20%"},attrs:{type:"datetime",placeholder:"选择开始时间"},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}}),e._v(" "),a("el-date-picker",{staticClass:"search",staticStyle:{width:"20%"},attrs:{type:"datetime",placeholder:"选择结束时间"},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}}),e._v(" "),a("el-date-picker",{staticClass:"search",staticStyle:{width:"20%"},attrs:{type:"datetime",placeholder:"选择服务时间"},on:{change:e.TimeChange},model:{value:e.severTime,callback:function(t){e.severTime=t},expression:"severTime"}}),e._v(" "),a("el-input",{staticClass:"search",attrs:{placeholder:"请输入订单编号"},model:{value:e.orderNumber,callback:function(t){e.orderNumber=t},expression:"orderNumber"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"orderMangeWarp"},[a("div",{staticClass:"ordermanageTableWrap"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tabDataList,fixed:"","element-loading-text":"正在加载","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",width:"180",label:"订单编号",prop:"orderNumber"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务机构",prop:"orgName"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务站",prop:"stationName"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务内容"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{placement:"left",disabled:t.row.orderContent.length<8,content:t.row.orderContent}},[a("div",{staticClass:"selfToolTip"},[e._v(e._s(t.row.orderContent))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"付款价格",prop:"payPrice"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务时间",prop:"serviceTime"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务状态"},scopedSlots:e._u([{key:"default",fn:function(t){return["wait_service"==t.row.serviceStatus?a("span",[e._v("待服务")]):e._e(),e._v(" "),"started"==t.row.serviceStatus?a("span",[e._v("已上门")]):e._e(),e._v(" "),"finish"==t.row.serviceStatus?a("span",[e._v("已完成")]):e._e(),e._v(" "),"cancel"==t.row.serviceStatus?a("span",[e._v("已取消")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"订单状态"},scopedSlots:e._u([{key:"default",fn:function(t){return["cancel"==t.row.orderStatus?a("span",[e._v("已取消")]):e._e(),e._v(" "),"dispatched"==t.row.orderStatus?a("span",[e._v("已派单")]):e._e(),e._v(" "),"finish"==t.row.orderStatus?a("span",[e._v("已完成")]):e._e(),e._v(" "),"started"==t.row.orderStatus?a("span",[e._v("已上门")]):e._e(),e._v(" "),"stop"==t.row.orderStatus?a("span",[e._v("已暂停")]):e._e(),e._v(" "),"success"==t.row.orderStatus?a("span",[e._v("已成功")]):e._e(),e._v(" "),"waitdispatch"==t.row.orderStatus?a("span",[e._v("待派单")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"支付状态"},scopedSlots:e._u([{key:"default",fn:function(t){return["payed"==t.row.payStatus?a("span",[e._v("已支付")]):e._e(),e._v(" "),"waitpay"==t.row.payStatus?a("span",[e._v("待支付")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"下单时间",prop:"orderTime"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"150",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.btnShow.indexOf("order_info")>-1?a("el-button",{attrs:{type:"button"},on:{click:function(a){e.lookInf(t.row.id)}}},[e._v("查看")]):e._e()]}}])})],1),e._v(" "),e.listLoading?e._e():a("div",{staticClass:"ordermanagePagination"},[a("el-pagination",{attrs:{"current-page":e.jumpPage,"page-sizes":[5,10,15,20],"page-size":e.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.jumpPage=t}}})],1)],1)])])},s=[],i={render:r,staticRenderFns:s};t.a=i},oppB:function(e,t,a){"use strict";function r(e){return y.a.post("/apiservice/a/sys/user/saveData",e)}function s(e){return y.a.post("/apiservice/a/sys/user/upData",e)}function i(e,t,a){return y.a.post("/apiservice/a/sys/role/listPageData?pageNo="+t+"&pageSize="+a,e)}function n(e){return y.a.post("/apiservice/a/sys/role/listDataWithoutPermission",e)}function o(e,t,a){return y.a.post("/apiservice/a/sys/user/listData?pageNo="+t+"&pageSize="+a,e)}function c(e){return y.a.post("/apiservice/a/sys/role/saveData",e)}function l(e){return y.a.post("/apiservice/a/sys/role/upData",e)}function d(e){return y.a.post("/apiservice/a/sys/role/deleteRole",e)}function u(e){return y.a.get("/apiservice/a/sys/role/getRoleDetail?id="+e)}function p(e){return y.a.post("/apiservice/a/sys/organization/listDataAll",e)}function h(e){return y.a.post("/apiservice/a/service/station/serviceStation/listByOffice",e)}function m(){return y.a.get("/apiservice/a/sys/menu/getMenuList")}function v(e){return y.a.post("/apiservice/a/sys/user/deleteUser",e)}function f(e){return y.a.get("/apiservice/a/sys/role/chkName?id="+e.id+"&name="+e.name)}function g(e){return y.a.get("/apiservice/a/sys/role/chkNameUpdate?id="+e.id+"&name="+e.name+"&roleId="+e.roleId)}t.h=r,t.j=s,t.l=i,t.g=n,t.d=o,t.i=c,t.o=l,t.n=d,t.m=u,t.b=p,t.f=h,t.c=m,t.e=v,t.a=f,t.k=g;var y=a("Vo7i")},xT6B:function(e,t,a){"use strict";function r(e,t){for(var t=t-(e+"").length,a=0;a<t;a++)e="0"+e;return e}var s=/([yMdhsm])(\1*)/g;t.a={getQueryStringByName:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(t),r="";return null!=a&&(r=a[2]),t=null,a=null,null==r||""==r||"undefined"==r?"":r},formatDate:{format:function(e,t){return t=t||"yyyy-MM-dd",t.replace(s,function(t){switch(t.charAt(0)){case"y":return r(e.getFullYear(),t.length);case"M":return r(e.getMonth()+1,t.length);case"d":return r(e.getDate(),t.length);case"w":return e.getDay()+1;case"h":return r(e.getHours(),t.length);case"m":return r(e.getMinutes(),t.length);case"s":return r(e.getSeconds(),t.length)}})},parse:function(e,t){var a=t.match(s),r=e.match(/(\d)+/g);if(a.length==r.length){for(var i=new Date(1970,0,1),n=0;n<a.length;n++){var o=parseInt(r[n]);switch(a[n].charAt(0)){case"y":i.setFullYear(o);break;case"M":i.setMonth(o-1);break;case"d":i.setDate(o);break;case"h":i.setHours(o);break;case"m":i.setMinutes(o);break;case"s":i.setSeconds(o)}}return i}return null}}}},zA63:function(e,t,a){"use strict";var r=a("FWz8"),s=a("oppB"),i=a("xT6B");t.a={name:"",data:function(){return{btnShow:JSON.parse(localStorage.getItem("btn")),severTime:"",dict:a("fIj0"),payTypeOptions:[],orderTest:[],payType:"",payStusOptions:[],payStus:"",mechanismOptions:[],mechanism:"",sevicerStustasOptions:[],sevicerStustas:"",searchCon:"",customerName:"",customerPhone:"",orderNumber:"",orderContent:"",activeName:"dispatched",startTime:"",endTime:"",tabDataList:[],size:10,total:null,jumpPage:1,pageNumber:1,listLoading:!1,active1:""}},methods:{TimeChange:function(e){if(void 0!=e){var t=e.substring(14,16);Number(t)>=30?this.severTime=i.a.formatDate.format(new Date(this.severTime),"yyyy-MM-dd hh:30:00"):this.severTime=i.a.formatDate.format(new Date(this.severTime),"yyyy-MM-dd hh:00:00")}},orgChange:function(e){var t=this;if(""!=e){var r={orgId:e};a.i(s.f)(r).then(function(e){1===e.data.code&&(e.data.data.remove(e.data.data[0]),t.payTypeOptions=e.data.data)})}},getTableData:function(e,t,s){var i=this;this.listLoading=!0;var n=e;a.i(r.a)(n,t,s).then(function(e){if(1===e.data.code){i.total=e.data.data.page.count,i.tabDataList=e.data.data.page.list,i.pageNumber=e.data.data.page.pageNo,i.jumpPage=e.data.data.page.pageNo,i.size=e.data.data.page.pageSize;for(var t=0;t<e.data.data.orgList.length;t++)0==e.data.data.orgList[t].id&&e.data.data.orgList.remove(e.data.data.orgList[t]);i.mechanismOptions=e.data.data.orgList,i.listLoading=!1}else i.listLoading=!1})},handleClick:function(e,t){this.activeName=e.name,"whole"==e.name?this.active1="":this.active1=e.name,this.payStus="",this.mechanism="",this.payType="",this.sevicerStustas="",this.orderNumber="",this.startTime="",this.endTime="",this.severTime="";var a={orderStatus:this.active1};this.pageNumber=1,this.jumpPage=1,this.getTableData(a,this.pageNumber,this.size)},localSearch:function(){if(""!=this.severTime||(this.severTime=null),""!=this.startTime)var e=i.a.formatDate.format(new Date(this.startTime),"yyyy-MM-dd hh:mm:ss");else e=null;if(""!=this.endTime)var t=i.a.formatDate.format(new Date(this.endTime),"yyyy-MM-dd hh:mm:ss");else t=null;"whole"==this.activeName?this.active1="":this.active1=this.activeName;var a={orderStatus:this.active1,serviceStatus:this.sevicerStustas,payStatus:this.payStus,orgId:this.mechanism,stationId:this.payType,orderNumber:this.orderNumber,orderTimeStart:e,orderTimeEnd:t,serviceTime:this.severTime};this.pageNumber=1,this.jumpPage=1,this.getTableData(a,this.pageNumber,this.size)},exportOrder:function(){},lookInf:function(e){window.localStorage.setItem("orderId",e),this.$router.push({path:"/clean/orderinfo",query:{id:e}})},handleSizeChange:function(e){if(this.pageNumber=1,this.jumpPage=1,this.size=e,""!=this.severTime||(this.severTime=null),""!=this.startTime)var t=i.a.formatDate.format(new Date(this.startTime),"yyyy-MM-dd hh:mm:ss");else t=null;if(""!=this.endTime)var a=i.a.formatDate.format(new Date(this.endTime),"yyyy-MM-dd hh:mm:ss");else a=null;"whole"==this.activeName?this.active1="":this.active1=this.activeName;var r={orderStatus:this.active1,serviceStatus:this.sevicerStustas,payStatus:this.payStus,orgId:this.mechanism,stationId:this.payType,orderNumber:this.orderNumber,orderTimeStart:t,orderTimeEnd:a,serviceTime:this.severTime};this.getTableData(r,this.pageNumber,this.size)},handleCurrentChange:function(e){if(this.pageNumber=e,""!=this.severTime||(this.severTime=null),""!=this.startTime)var t=i.a.formatDate.format(new Date(this.startTime),"yyyy-MM-dd hh:mm:ss");else t=null;if(""!=this.endTime)var a=i.a.formatDate.format(new Date(this.endTime),"yyyy-MM-dd hh:mm:ss");else a=null;"whole"==this.activeName?this.active1="":this.active1=this.activeName;var r={orderStatus:this.active1,serviceStatus:this.sevicerStustas,payStatus:this.payStus,orgId:this.mechanism,stationId:this.payType,orderNumber:this.orderNumber,orderTimeStart:t,orderTimeEnd:a,serviceTime:this.severTime};this.getTableData(r,this.pageNumber,this.size)}},mounted:function(){this.getTableData({orderStatus:"dispatched"}),this.payStusOptions=this.dict.pay_status,this.orderTest=this.dict.order_status,this.sevicerStustasOptions=this.dict.service_status}}}});