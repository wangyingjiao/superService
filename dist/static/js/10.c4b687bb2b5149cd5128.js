webpackJsonp([10],{"326C":function(e,t,a){"use strict";function s(e){a("xRnA")}Object.defineProperty(t,"__esModule",{value:!0});var r=a("zA63"),i=a("y1w1"),n=a("VU/8"),o=s,l=n(r.a,i.a,o,"data-v-766ada01",null);t.default=l.exports},FWz8:function(e,t,a){"use strict";function s(e,t,a){return o.post("/apiservice/a/service/order/orderInfo/listData?pageNo="+t+"&pageSize="+a,e)}function r(e){return o.post("/apiservice/a/service/order/orderInfo/formData",e)}t.a=s,t.b=r;var i=a("mtWM"),n=a.n(i),o=n.a.create({headers:{"content-type":"application/json;charset=UTF-8"}})},Rykm:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".addorder-container[data-v-766ada01]{width:100%;float:left;background:#eef1f6}.width200[data-v-766ada01]{width:200px}.floatRight[data-v-766ada01]{float:right}.fist-bar[data-v-766ada01]{padding:20px;background:#fff}.second-input[data-v-766ada01]{margin-top:10px}.orderMangeWarp[data-v-766ada01]{margin:20px;background:#fff;padding:20px}.exprotStyle[data-v-766ada01]{float:right;margin-bottom:10px}.ordermanageTableWrap[data-v-766ada01]{width:100%;background:#fff;padding:20px 20px 40px}.ordermanagePagination[data-v-766ada01]{margin-top:20px;float:right}",""])},fIj0:function(e,t){e.exports={del_flag:{0:"正常",1:"删除"},ethnic:{10:"朝鲜族",11:"满族",12:"侗族",13:"瑶族",14:"白族",15:"土家族",16:"哈尼族",17:"哈萨克族",18:"傣族",19:"黎族",20:"僳僳族",21:"佤族",22:"畲族",23:"高山族",24:"拉祜族",25:"水族",26:"东乡族",27:"纳西族",28:"景颇族",29:"柯尔克孜族",30:"土族",31:"达斡尔族",32:"仫佬族",33:"羌族",34:"布朗族",35:"撒拉族",36:"毛难族",37:"仡佬族",38:"锡伯族",39:"阿昌族",40:"普米族",41:"塔吉克族",42:"怒族",43:"乌孜别克族",44:"俄罗斯族",45:"鄂温克族",46:"崩龙族",47:"保安族",48:"裕固族",49:"京族",50:"塔塔尔族",51:"独龙族",52:"鄂伦春族",53:"赫哲族",54:"门巴族",55:"珞巴族",56:"基诺族","01":"汉族","02":"蒙古族","03":"回族","04":"藏族","05":"维吾尔族","06":"苗族","07":"彝族","08":"壮族","09":"布依族"},education:{special:"中专",high:"高中",middle:"初中",university:"本科及以上",junior:"大专",primary:"小学"},assess_grade:{1:"一级",2:"二级",3:"三级",4:"四级",5:"五级"},yes_no:{no:"否",yes:"是"},sex:{female:"女",male:"男"},ser_sort:{all:"全部",repair:"家修",clean:"保洁"},ser_majorsort:{repair:"家修",clean:"保洁"},sys_log_type:{visit:"接入日志",error:"异常日志"},pay_method:{offline:"货到付款",online:"在线"},matrimony:{divorce:"离婚",unmarried:"未婚",married:"已婚",widowed:"丧偶"},relation:{parent:"父母",siblings:"兄弟姐妹",children:"子女",spouse:"夫妻",relative:"亲戚"},job_status:{leave:"离职",online:"在职"},order_status:{cancel:"已取消",dispatched:"已派单",stop:"已暂停",success:"已成功",waitdispatch:"待派单",finish:"已完成",started:"已上门"},order_type:{common:"普通订单",group_split_yes:"组合并拆单",group_split_no:"组合不拆单"},order_majorSort:{clean:"保洁",repair:"家修"},service_status:{wait_service:"待服务",finish:"已完成",cancel:"已取消",started:"已上门"},pay_status:{waitpay:"待支付",payed:"已支付"},tech_status:{1:"派单",2:"未派单"},pay_platform:{wx:"微信",alipay:"支付宝",balance:"余额",pos:"银行卡",wx_pub_qr:"微信扫码",cash:"现金",alipay_qr:"支付宝扫码"},order_source:{own:"本机构",gasq:"国安社区"},return_status:{cancel:"已取消",refunding:"申请退款中",failure:"退款失败",refunded:"退款成功"},job_natrue:{part_time:"兼职",full_time:"全职"},service_station_type:{self:"直营",join:"加盟"},meterage:{area:"按面积",num:"按数量",house:"按居室"},service_area_type:{store:"门店",map:"地图"},work_time:{0:"1年以下",1:"1年",2:"2年",3:"3年",4:"4年",5:"5年",6:"6年",7:"7年",8:"8年",9:"9年",10:"10年",11:"10年以上"},source:{own:"本机构",other:"第三方"},work_start_time:["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30","24:00"]}},oppB:function(e,t,a){"use strict";function s(e){return w.post("/apiservice/a/sys/user/saveData",e)}function r(e,t,a){return w.post("/apiservice/a/sys/role/listPageData?pageNo="+t+"&pageSize="+a,e)}function i(e){return w.post("/apiservice/a/sys/role/listData",e)}function n(e,t,a){return w.post("/apiservice/a/sys/user/listData?pageNo="+t+"&pageSize="+a,e)}function o(e){return w.post("/apiservice/a/sys/role/saveData",e)}function l(e){return w.post("/apiservice/a/sys/role/deleteRole",e)}function c(e){return w.get("/apiservice/a/sys/role/getRoleDetail?id="+e)}function u(e){return w.post("/apiservice/a/sys/organization/listData?pageSize=-1",e)}function p(e){return w.post("/apiservice/a/service/station/serviceStation/listByOffice",e)}function d(){return w.get("/apiservice/a/sys/menu/getMenuList")}function h(e){return w.post("/apiservice/a/sys/user/deleteUser",e)}function m(e){return w.get("/apiservice/a/sys/role/chkName?name="+e)}function v(e,t,a){return new y.a(function(s,r){w.post("apiservice/a/service/order/orderDispatch/listData?pageNo="+e+"&pageSize="+t,a).then(function(e){s(e)}).catch(function(e){r(e)})})}function f(e){return new y.a(function(t,a){w.post("apiservice/a/service/order/orderDispatch/formData",e).then(function(e){t(e)}).catch(function(e){a(e)})})}t.g=s,t.j=r,t.f=i,t.c=n,t.h=o,t.l=l,t.k=c,t.a=u,t.e=p,t.b=d,t.d=h,t.i=m,t.m=v,t.n=f;var g=a("//Fk"),y=a.n(g),_=a("mtWM"),b=a.n(_),w=b.a.create({headers:{"content-type":"application/json;charset=UTF-8"}})},xRnA:function(e,t,a){var s=a("Rykm");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("rjj0")("02757246",s,!0)},xT6B:function(e,t,a){"use strict";function s(e,t){for(var t=t-(e+"").length,a=0;a<t;a++)e="0"+e;return e}var r=/([yMdhsm])(\1*)/g;t.a={getQueryStringByName:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(t),s="";return null!=a&&(s=a[2]),t=null,a=null,null==s||""==s||"undefined"==s?"":s},formatDate:{format:function(e,t){return t=t||"yyyy-MM-dd",t.replace(r,function(t){switch(t.charAt(0)){case"y":return s(e.getFullYear(),t.length);case"M":return s(e.getMonth()+1,t.length);case"d":return s(e.getDate(),t.length);case"w":return e.getDay()+1;case"h":return s(e.getHours(),t.length);case"m":return s(e.getMinutes(),t.length);case"s":return s(e.getSeconds(),t.length)}})},parse:function(e,t){var a=t.match(r),s=e.match(/(\d)+/g);if(a.length==s.length){for(var i=new Date(1970,0,1),n=0;n<a.length;n++){var o=parseInt(s[n]);switch(a[n].charAt(0)){case"y":i.setFullYear(o);break;case"M":i.setMonth(o-1);break;case"d":i.setDate(o);break;case"h":i.setHours(o);break;case"m":i.setMinutes(o);break;case"s":i.setSeconds(o)}}return i}return null}}}},y1w1:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"addorder-container"},[a("div",{staticClass:"fist-bar"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"全部",name:"whole"}}),e._v(" "),e._l(e.orderTest,function(e,t,s){return a("el-tab-pane",{key:s,attrs:{label:e,name:t}})})],2),e._v(" "),a("el-select",{staticClass:"search",attrs:{clearable:"",placeholder:"选择支付状态"},model:{value:e.payStus,callback:function(t){e.payStus=t},expression:"payStus"}},e._l(e.payStusOptions,function(e,t,s){return a("el-option",{key:s,attrs:{label:e,value:t}})})),e._v(" "),a("el-select",{staticClass:"search",attrs:{clearable:"",placeholder:"选择机构"},on:{change:e.orgChange},model:{value:e.mechanism,callback:function(t){e.mechanism=t},expression:"mechanism"}},e._l(e.mechanismOptions,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"search",attrs:{clearable:"",placeholder:"选择服务站"},model:{value:e.payType,callback:function(t){e.payType=t},expression:"payType"}},e._l(e.payTypeOptions,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"search",attrs:{clearable:"",placeholder:"请选择服务状态"},model:{value:e.sevicerStustas,callback:function(t){e.sevicerStustas=t},expression:"sevicerStustas"}},e._l(e.sevicerStustasOptions,function(e,t,s){return a("el-option",{key:s,attrs:{label:e,value:t}})})),e._v(" "),a("button",{staticClass:"search-button floatRight btn_search",attrs:{type:"button"},on:{click:e.localSearch}},[a("i",{staticClass:"el-icon-search"}),e._v(" 搜索")]),e._v(" "),a("div",{staticClass:"second-input"},[a("el-date-picker",{staticClass:"search",staticStyle:{width:"20%"},attrs:{type:"datetime",placeholder:"选择开始时间"},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}}),e._v(" "),a("el-date-picker",{staticClass:"search",staticStyle:{width:"20%"},attrs:{type:"datetime",placeholder:"选择结束时间"},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}}),e._v(" "),a("el-date-picker",{staticClass:"search",staticStyle:{width:"20%"},attrs:{type:"datetime",placeholder:"选择服务时间"},on:{change:e.TimeChange},model:{value:e.severTime,callback:function(t){e.severTime=t},expression:"severTime"}}),e._v(" "),a("el-input",{staticClass:"search",attrs:{placeholder:"请输入订单编号"},model:{value:e.orderNumber,callback:function(t){e.orderNumber=t},expression:"orderNumber"}})],1)],1),e._v(" "),a("div",{staticClass:"orderMangeWarp"},[a("button",{staticClass:"add-button exprotStyle",staticStyle:{"margin-bottom":"20px"},attrs:{type:"button"},on:{click:e.exportOrder}},[e._v("导出订单")]),e._v(" "),a("div",{staticClass:"ordermanageTableWrap"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tabDataList,"element-loading-text":"正在加载","highlight-current-row":"",stripe:""}},[a("el-table-column",{attrs:{align:"center",width:"180",label:"订单编号",prop:"orderNumber"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务机构",prop:"orgName"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务站",prop:"stationName"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务内容",prop:"orderContent"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"付款价格",prop:"payPrice"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务时间",prop:"serviceTime"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务状态"},scopedSlots:e._u([{key:"default",fn:function(t){return["wait_service"==t.row.serviceStatus?a("span",[e._v("待服务")]):e._e(),e._v(" "),"started"==t.row.serviceStatus?a("span",[e._v("已上门")]):e._e(),e._v(" "),"finish"==t.row.serviceStatus?a("span",[e._v("已完成")]):e._e(),e._v(" "),"cancel"==t.row.serviceStatus?a("span",[e._v("已取消")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"订单状态"},scopedSlots:e._u([{key:"default",fn:function(t){return["cancel"==t.row.orderStatus?a("span",[e._v("已取消")]):e._e(),e._v(" "),"dispatched"==t.row.orderStatus?a("span",[e._v("已派单")]):e._e(),e._v(" "),"finish"==t.row.orderStatus?a("span",[e._v("已完成")]):e._e(),e._v(" "),"started"==t.row.orderStatus?a("span",[e._v("已上门")]):e._e(),e._v(" "),"stop"==t.row.orderStatus?a("span",[e._v("已暂停")]):e._e(),e._v(" "),"success"==t.row.orderStatus?a("span",[e._v("已成功")]):e._e(),e._v(" "),"waitdispatch"==t.row.orderStatus?a("span",[e._v("待派单")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"支付状态"},scopedSlots:e._u([{key:"default",fn:function(t){return["payed"==t.row.payStatus?a("span",[e._v("已支付")]):e._e(),e._v(" "),"waitpay"==t.row.payStatus?a("span",[e._v("待支付")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"下单时间",prop:"orderTime"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"button"},on:{click:function(a){e.lookInf(t.row.id)}}},[e._v("查看")])]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"ordermanagePagination"},[a("el-pagination",{attrs:{"current-page":e.jumpPage,"page-sizes":[10,20,30,50],"page-size":e.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.jumpPage=t}}})],1)],1)])])},r=[],i={render:s,staticRenderFns:r};t.a=i},zA63:function(e,t,a){"use strict";var s=a("FWz8"),r=a("oppB"),i=a("xT6B");t.a={name:"",data:function(){return{severTime:"",dict:a("fIj0"),payTypeOptions:[],orderTest:[],payType:"",payStusOptions:[],payStus:"",mechanismOptions:[],mechanism:"",sevicerStustasOptions:[],sevicerStustas:"",searchCon:"",customerName:"",customerPhone:"",orderNumber:"",orderContent:"",activeName:"whole",startTime:"",endTime:"",tabDataList:[],size:10,total:null,jumpPage:1,pageNumber:1,listLoading:!1}},methods:{TimeChange:function(e){if(void 0!=e){var t=e.substring(14,16);Number(t)>=30?this.severTime=i.a.formatDate.format(new Date(this.severTime),"yyyy-MM-dd hh:30:00"):this.severTime=i.a.formatDate.format(new Date(this.severTime),"yyyy-MM-dd hh:00:00")}},orgChange:function(e){var t=this;if(""!=e){var s={orgId:e};a.i(r.e)(s).then(function(e){1===e.data.code&&(t.payTypeOptions=e.data.data)})}},getTableData:function(e,t,r){var i=this;this.listLoading=!0;var n=e;a.i(s.a)(n,t,r).then(function(e){1===e.data.code?(i.tabDataList=e.data.data.page.list,i.mechanismOptions=e.data.data.orgList,i.total=e.data.data.page.count,i.listLoading=!1):i.listLoading=!1})},handleClick:function(e,t){"whole"==e.name?this.activeName="":this.activeName=e.name,this.payStus="",this.mechanism="",this.payType="",this.sevicerStustas="",this.orderNumber="",this.startTime="",this.endTime="",this.severTime="";var a={orderStatus:this.activeName};this.pageNumber=1,this.jumpPage=1,this.getTableData(a,this.pageNumber,this.size)},localSearch:function(){if(""!=this.severTime||(this.severTime=null),""!=this.startTime)var e=i.a.formatDate.format(new Date(this.startTime),"yyyy-MM-dd hh:mm:ss");else e=null;if(""!=this.endTime)var t=i.a.formatDate.format(new Date(this.endTime),"yyyy-MM-dd hh:mm:ss");else t=null;"whole"==this.activeName?this.activeName="":this.activeName=this.activeName;var a={orderStatus:this.activeName,serviceStatus:this.sevicerStustas,payStatus:this.payStus,orgId:this.mechanism,stationId:this.payType,orderNumber:this.orderNumber,orderTimeStart:e,orderTimeEnd:t,serviceTime:this.severTime};this.pageNumber=1,this.jumpPage=1,this.getTableData(a,this.pageNumber,this.size)},exportOrder:function(){},lookInf:function(e){this.$router.push({path:"/clean/orderinfo",query:{id:e}})},handleSizeChange:function(e){this.size=e;var t={};this.getTableData(t,this.pageNumber,this.size)},handleCurrentChange:function(e){this.pageNumber=e;var t={};this.getTableData(t,this.pageNumber,this.size)}},mounted:function(){this.getTableData(),this.payStusOptions=this.dict.pay_status,this.orderTest=this.dict.order_status,this.sevicerStustasOptions=this.dict.service_status}}}});