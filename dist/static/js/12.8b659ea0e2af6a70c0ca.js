webpackJsonp([12],{"326C":function(e,t,a){"use strict";function r(e){a("xRnA")}Object.defineProperty(t,"__esModule",{value:!0});var n=a("zA63"),s=a("y1w1"),l=a("VU/8"),i=r,o=l(n.a,s.a,i,"data-v-766ada01",null);t.default=o.exports},FWz8:function(e,t,a){"use strict";var r=a("mtWM"),n=a.n(r);n.a.create({headers:{"content-type":"application/json;charset=UTF-8"}})},Rykm:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".addorder-container[data-v-766ada01]{width:100%;float:left;background:#eef1f6}.width200[data-v-766ada01]{width:200px}.fist-bar[data-v-766ada01]{padding:20px;background:#fff}.second-input[data-v-766ada01]{margin-top:10px}.orderMangeWarp[data-v-766ada01]{margin:20px;background:#fff;padding:20px}.exprotStyle[data-v-766ada01]{float:right;margin-bottom:10px}.ordermanageTableWrap[data-v-766ada01]{width:100%;background:#fff;padding:20px 20px 40px}.ordermanagePagination[data-v-766ada01]{margin-top:20px;float:right}",""])},fIj0:function(e,t){e.exports={del_flag:{0:"正常",1:"删除"},ethnic:{10:"朝鲜族",11:"满族",12:"侗族",13:"瑶族",14:"白族",15:"土家族",16:"哈尼族",17:"哈萨克族",18:"傣族",19:"黎族",20:"僳僳族",21:"佤族",22:"畲族",23:"高山族",24:"拉祜族",25:"水族",26:"东乡族",27:"纳西族",28:"景颇族",29:"柯尔克孜族",30:"土族",31:"达斡尔族",32:"仫佬族",33:"羌族",34:"布朗族",35:"撒拉族",36:"毛难族",37:"仡佬族",38:"锡伯族",39:"阿昌族",40:"普米族",41:"塔吉克族",42:"怒族",43:"乌孜别克族",44:"俄罗斯族",45:"鄂温克族",46:"崩龙族",47:"保安族",48:"裕固族",49:"京族",50:"塔塔尔族",51:"独龙族",52:"鄂伦春族",53:"赫哲族",54:"门巴族",55:"珞巴族",56:"基诺族","01":"汉族","02":"蒙古族","03":"回族","04":"藏族","05":"维吾尔族","06":"苗族","07":"彝族","08":"壮族","09":"布依族"},education:{special:"中专",high:"高中",middle:"初中",university:"本科及以上",junior:"大专",primary:"小学"},assess_grade:{1:"一级",2:"二级",3:"三级",4:"四级",5:"五级"},yes_no:{no:"否",yes:"是"},sex:{female:"女",male:"男"},ser_sort:{all:"全部",repair:"家修",clean:"保洁"},sys_log_type:{visit:"接入日志",error:"异常日志"},pay_method:{offline:"货到付款",online:"在线"},matrimony:{divorce:"离婚",unmarried:"未婚",married:"已婚",widowed:"丧偶"},relation:{parent:"父母",siblings:"兄弟姐妹",children:"子女",spouse:"夫妻",relative:"亲戚"},job_status:{leave:"离职",online:"在职"},order_status:{cancel:"已取消",dispatched:"已派单",stop:"已暂停",success:"已成功",waitdispatch:"待派单",finish:"已完成",started:"已上门"},pay_status:{waitpay:"待支付",payed:"已支付"},tech_status:{1:"派单",2:"未派单"},pay_platform:{wx:"微信",alipay:"支付宝",balance:"余额",pos:"银行卡",wx_pub_qr:"微信扫码",cash:"现金",alipay_qr:"支付宝扫码"},order_source:{app:"app",score:"积分商城",tv:"电视",callcenter:"400呼叫中心",web:"PC",wechat:"微信",store:"门店"},return_status:{cancel:"已取消",refunding:"申请退款中",failure:"退款失败",refunded:"退款成功"},job_natrue:{part_time:"兼职",full_time:"全职"},service_station_type:{self:"直营",join:"加盟"},meterage:{area:"按面积",num:"按数量",house:"按居室"},service_area_type:{store:"门店",map:"地图"},work_time:{0:"1年以下",1:"1年",2:"2年",3:"3年",4:"4年",5:"5年",6:"6年",7:"7年",8:"8年",9:"9年",10:"10年",11:"10年以上"},source:{own:"本机构",other:"第三方"}}},xRnA:function(e,t,a){var r=a("Rykm");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("02757246",r,!0)},xT6B:function(e,t,a){"use strict";function r(e,t){for(var t=t-(e+"").length,a=0;a<t;a++)e="0"+e;return e}var n=/([yMdhsm])(\1*)/g;t.a={getQueryStringByName:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(t),r="";return null!=a&&(r=a[2]),t=null,a=null,null==r||""==r||"undefined"==r?"":r},formatDate:{format:function(e,t){return t=t||"yyyy-MM-dd",t.replace(n,function(t){switch(t.charAt(0)){case"y":return r(e.getFullYear(),t.length);case"M":return r(e.getMonth()+1,t.length);case"d":return r(e.getDate(),t.length);case"w":return e.getDay()+1;case"h":return r(e.getHours(),t.length);case"m":return r(e.getMinutes(),t.length);case"s":return r(e.getSeconds(),t.length)}})},parse:function(e,t){var a=t.match(n),r=e.match(/(\d)+/g);if(a.length==r.length){for(var s=new Date(1970,0,1),l=0;l<a.length;l++){var i=parseInt(r[l]);switch(a[l].charAt(0)){case"y":s.setFullYear(i);break;case"M":s.setMonth(i-1);break;case"d":s.setDate(i);break;case"h":s.setHours(i);break;case"m":s.setMinutes(i);break;case"s":s.setSeconds(i)}}return s}return null}}}},y1w1:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"addorder-container"},[a("div",{staticClass:"fist-bar"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"全部",name:"whole"}}),e._v(" "),e._l(e.orderTest,function(e,t,r){return a("el-tab-pane",{key:r,attrs:{label:e,name:t}})})],2),e._v(" "),a("el-select",{staticClass:"width200",attrs:{clearable:"",placeholder:"选择支付状态"},model:{value:e.payStus,callback:function(t){e.payStus=t},expression:"payStus"}},e._l(e.payStusOptions,function(e,t,r){return a("el-option",{key:r,attrs:{label:e,value:t}})})),e._v(" "),a("el-select",{staticClass:"width200",attrs:{clearable:"",placeholder:"选择机构"},model:{value:e.mechanism,callback:function(t){e.mechanism=t},expression:"mechanism"}},e._l(e.mechanismOptions,function(e){return a("el-option",{key:e.key,attrs:{label:e.name,value:e.key}})})),e._v(" "),a("el-select",{staticClass:"width200",attrs:{clearable:"",placeholder:"选择服务站"},model:{value:e.payType,callback:function(t){e.payType=t},expression:"payType"}},e._l(e.payTypeOptions,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})),e._v(" "),a("el-select",{staticClass:"width200",attrs:{clearable:"",placeholder:"请选择"},model:{value:e.orderProject,callback:function(t){e.orderProject=t},expression:"orderProject"}},e._l(e.orderProjectOptions,function(e){return a("el-option",{key:e.key,attrs:{label:e.name,value:e.key}})})),e._v(" "),"1"===e.orderProject?a("el-input",{staticClass:"width200",attrs:{placeholder:"请输入客户姓名"},model:{value:e.searchCon,callback:function(t){e.searchCon=t},expression:"searchCon"}}):"2"===e.orderProject?a("el-input",{staticClass:"width200",attrs:{placeholder:"请输入客户手机号"},model:{value:e.searchCon,callback:function(t){e.searchCon=t},expression:"searchCon"}}):"3"===e.orderProject?a("el-input",{staticClass:"width200",attrs:{placeholder:"请输入订单编号"},model:{value:e.searchCon,callback:function(t){e.searchCon=t},expression:"searchCon"}}):"4"===e.orderProject?a("el-input",{staticClass:"width200",attrs:{placeholder:"请输入项目名称"},model:{value:e.searchCon,callback:function(t){e.searchCon=t},expression:"searchCon"}}):a("el-input",{staticClass:"width200",attrs:{placeholder:"请输入"},model:{value:e.searchCon,callback:function(t){e.searchCon=t},expression:"searchCon"}}),e._v(" "),a("button",{staticClass:"search-button",attrs:{type:"button"},on:{click:e.localSearch}},[a("i",{staticClass:"el-icon-search"}),e._v(" 搜索")]),e._v(" "),a("div",{staticClass:"second-input"},[a("el-date-picker",{staticClass:"width200",attrs:{type:"datetime",placeholder:"选择开始时间"},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}}),e._v(" "),a("el-date-picker",{staticClass:"width200",attrs:{type:"datetime",placeholder:"选择结束时间"},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}}),e._v(" "),a("el-date-picker",{staticClass:"width200",attrs:{type:"datetime",format:"yyyy-MM-dd hh:00",placeholder:"选择服务时间"},model:{value:e.severTime,callback:function(t){e.severTime=t},expression:"severTime"}})],1)],1),e._v(" "),a("div",{staticClass:"orderMangeWarp"},[a("button",{staticClass:"add-button exprotStyle",attrs:{type:"button"},on:{click:e.exportOrder}},[e._v("导出订单")]),e._v(" "),a("div",{staticClass:"ordermanageTableWrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tabDataList,"element-loading-text":"正在加载","highlight-current-row":"",stripe:""}},[a("el-table-column",{attrs:{align:"center",width:"110",label:"订单编号",prop:"orderNum"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"客户姓名",prop:"custName"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"客户电话",prop:"custPhone"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务机构",prop:"serverOffice"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务内容",prop:"serverCon"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务费",prop:"serverFei"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"服务时间",prop:"serverTime"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"订单状态",prop:"orderStatus"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"支付状态",prop:"payStatus"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"下单时间",prop:"downTime"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"button"},on:{click:function(a){e.lookInf(t.row)}}},[e._v("查看")])]}}])})],1),e._v(" "),a("div",{staticClass:"ordermanagePagination"},[a("el-pagination",{attrs:{"page-sizes":[10,20,30,50],"page-size":e.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)])])},n=[],s={render:r,staticRenderFns:n};t.a=s},zA63:function(e,t,a){"use strict";var r=(a("FWz8"),a("xT6B"));t.a={name:"",data:function(){return{severTime:"",dict:a("fIj0"),payTypeOptions:[1,2,3],orderTest:[],payType:null,payStusOptions:[],payStus:null,mechanismOptions:[{key:"1",name:"请选择机构"}],mechanism:null,orderProjectOptions:[{key:"1",name:"客户姓名"},{key:"2",name:"客户手机号"},{key:"3",name:"订单编号"},{key:"4",name:"项目名称"}],orderProject:null,searchCon:"",activeName:"whole",startTime:"",endTime:"",tabDataList:[{orderNum:"2222",custName:"***",custPhone:"13800138000",serverOffice:"国安社区",serverCon:"服务内容",serverFei:"服务费",serverTime:"2017-10-10 20:04:30",orderStatus:"已取消",payStatus:"已支付",downTime:"2017-10-09 20:04:30"},{orderNum:"11111",custName:"***",custPhone:"13800138001",serverOffice:"国安社区",serverCon:"服务内容",serverFei:"服务费",serverTime:"2017-10-10 20:04:30",orderStatus:"已取消",payStatus:"已支付",downTime:"2017-10-09 20:04:30"}],size:5,total:100}},methods:{getTableData:function(){},handleClick:function(e,t){this.activeName=e.name,console.log(this.activeName)},localSearch:function(){if(""!=this.severTime)var e=r.a.formatDate.format(new Date(this.severTime),"yyyy-MM-dd hh:00");else e="";if(""!=this.startTime){r.a.formatDate.format(new Date(this.startTime),"yyyy-MM-dd hh:mm:ss")}else"";if(""!=this.endTime){r.a.formatDate.format(new Date(this.endTime),"yyyy-MM-dd hh:mm:ss")}else"";console.log(e)},exportOrder:function(){},lookInf:function(e){this.$router.push({path:"/clean/orderinfo"})},handleSizeChange:function(e){},handleCurrentChange:function(e){}},mounted:function(){this.getTableData(),this.payStusOptions=this.dict.pay_status,this.orderTest=this.dict.order_status}}}});