webpackJsonp([37],{"4FUl":function(t,e,a){"use strict";a("oppB");e.a={name:"addcustomer",data:function(){return{rules2:{phone:[{validator:function(t,e,a){if(!e)return a(new Error("电话号码不能为空"));/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(e)?a():a(new Error("电话号码不正确！请重新填写"))},trigger:"blur"}]},customPhone1:{phone:"",customName:"李四"},customOptions:[{key:"1",customName:"日常保洁"},{key:"2",customName:"除尘除螨"},{key:"3",customName:"家电清洗"},{key:"4",customName:"擦玻璃"}],tabOptions:[{key:"1",tabName:"王小虎"},{key:"2",tabName:"王小虎"},{key:"3",tabName:"王小虎"}],serverOptions:[{key:"1",serverName:"平米保洁"},{key:"2",serverName:"灯具清洁"},{key:"3",serverName:"居室保洁"}],provinceOptions:[{key:"1",provinceName:"北京"},{key:"2",provinceName:"上海"},{key:"3",provinceName:"天津"}],province:"",cityOptions:[{key:"1",cityName:"朝阳区"},{key:"2",cityName:"东城区"},{key:"3",cityName:"西城区"}],city:"",countyOptions:[{key:"1",countyName:"朝阳区"},{key:"2",countyName:"东城区"},{key:"3",countyName:"西城区"}],county:"",orderOrginOptions:[{key:"1",orderOrginName:"中信国安"},{key:"2",orderOrginName:"国安府"},{key:"3",orderOrginName:"第三方"}],orderOrgin:"",detailedAddress:"XXX小区1号楼3单元222室",textarea:"",stationOptions:[{key:"1",stationName:"服务站1"},{key:"2",stationName:"服务站2"},{key:"3",stationName:"服务站3"},{key:"4",stationName:"服务站4"}],stationName:"",severTime:"",technicianData:[{headUrl:"headurl",name:"王小虎",sex:"男",serverStation:"呼家楼服务站"},{headUrl:"headurl",name:"王小虎",sex:"男",serverStation:"呼家楼服务站"},{headUrl:"headurl",name:"王小虎",sex:"男",serverStation:"呼家楼服务站"},{headUrl:"headurl",name:"王小虎",sex:"男",serverStation:"呼家楼服务站"}],custom:"1",customPhone:13821209999,customName:"李四",serverAddress:"北京市朝阳区关东街11呼家楼",serverStation:"呼家楼服务站",dialogVisible:!1,dialogTableVisible:!1,serverType:2,smallLight:1,bigLight:1,roomType:[{key:"1",roomName:"一居室"},{key:"2",roomName:"二居室"},{key:"3",roomName:"三居室"}],roomLen:0,price:1e3,sexType:[{key:"1",sexName:"不限制"},{key:"2",sexName:"男"},{key:"3",sexName:"女"}],sexLen:0,sysAllocat:1,technicianName:"",pagetotal:10,pageSize:2}},methods:{handleFilter:function(){},changeAddress:function(){this.dialogVisible=!0},changeOk:function(){this.dialogVisible=!1},serverchange:function(t){this.serverType=t},smallminus:function(t){t=parseInt(t),this.smallLight=t<=1?1:t-1},smallplus:function(t){t=parseInt(t),this.smallLight=t+1},bigminus:function(t){t=parseInt(t),this.bigLight=t<=1?1:t-1},bigplus:function(t){t=parseInt(t),this.bigLight=t+1},roomSel:function(t,e){this.roomLen=t+1;for(var a=0;a<this.$refs.selcetOption.length;a++)this.$refs.selcetOption[a].style.borderColor=a==t?"green":"#bfcbd9"},roomSel1:function(t,e){this.sexLen=t+1;for(var a=0;a<this.$refs.sexOption.length;a++)this.$refs.sexOption[a].style.borderColor=a==t?"green":"#bfcbd9"},technicianSel:function(){this.dialogTableVisible=!0},technicianSearch:function(){},handleSizeChange:function(t){},handleCurrentChange:function(t){},errorClose:function(t,e){this.$refs.tabsName[e].style.display="none"},confirmOrder:function(){}},mounted:function(){}}},JvN0:function(t,e,a){var i=a("czuv");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("XkoO")("6cc81e7a",i,!0)},Nn32:function(t,e,a){"use strict";function i(t){a("JvN0")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("4FUl"),n=a("krY9"),o=a("J0+h"),l=i,r=o(s.a,n.a,l,"data-v-2a0fbd11",null);e.default=r.exports},czuv:function(t,e,a){e=t.exports=a("acE3")(!1),e.push([t.i,".tabWrap[data-v-2a0fbd11]{width:100px;margin-right:20px;font-size:12px;display:inline-block;height:25px;text-align:center;line-height:25px;border-radius:12px;border:1px solid #bfcbd9;position:relative}.closePic[data-v-2a0fbd11]{cursor:pointer;color:#bfcbd9;font-size:12px;position:absolute;margin-left:80px;margin-top:-25px}.addorder-container[data-v-2a0fbd11]{width:100%;float:left;background:#eef1f6;margin-top:20px}.addorder-container .fist-bar[data-v-2a0fbd11]{padding-top:20px;padding-bottom:20px;background:#fff;margin-left:20px;margin-right:20px}.custom-action[data-v-2a0fbd11]{margin-left:30px;margin-right:48px}.second-bar[data-v-2a0fbd11]{padding-bottom:20px}.second-bar[data-v-2a0fbd11],.thrid-bar[data-v-2a0fbd11]{padding-top:20px;background:#eef1f6;margin-left:20px;margin-right:20px}.thrid-bar[data-v-2a0fbd11]{height:500px;margin-top:120px}.order-inf[data-v-2a0fbd11]{padding-top:20px;background:#fff;margin-top:20px}.custom-inf[data-v-2a0fbd11]{color:#000}.custom-inf[data-v-2a0fbd11],.sever-inf[data-v-2a0fbd11]{width:49%;background:#fff;float:left;height:160px;padding-top:20px;padding-bottom:20px}.sever-inf[data-v-2a0fbd11]{margin-left:2%}.customNamevalue[data-v-2a0fbd11]{padding-left:48px}.changeserver[data-v-2a0fbd11]{width:100%;height:110px;margin-left:30px;margin-top:10px}",""])},krY9:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"addorder-container"},[a("div",{staticClass:"fist-bar"},[a("span",{staticClass:"custom-action"},[t._v("选择客户")]),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"280px","margin-right":"20px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:t.custom,callback:function(e){t.custom=e},expression:"custom"}},t._l(t.customOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.customName,value:t.key}})})),t._v(" "),a("button",{staticClass:"button-large",on:{click:t.handleFilter}},[t._v("新增")])],1),t._v(" "),a("div",{staticClass:"second-bar"},[a("div",{staticClass:"custom-inf"},[a("div",{staticClass:"custom-action"},[t._v("客户信息")]),t._v(" "),a("div",{staticClass:"hr-style"}),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"20px"}},[a("el-form",{ref:"customPhone1",attrs:{model:t.customPhone1,rules:t.rules2,"label-position":"left"}},[a("el-form-item",{attrs:{label:"客户姓名:",prop:"customName"}},[a("span",{staticClass:"customNamevalue"},[t._v(t._s(t.customPhone1.customName))])]),t._v(" "),a("el-form-item",{staticStyle:{"margin-top":"-15px"},attrs:{label:"客户电话:",prop:"phone"}},[a("span",{staticClass:"customNamevalue"},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入搜索内容"},model:{value:t.customPhone1.phone,callback:function(e){t.customPhone1.phone=e},expression:"customPhone1.phone"}})],1)])],1)],1)]),t._v(" "),a("div",{staticClass:"sever-inf"},[a("div",{staticClass:"custom-action"},[t._v("服务信息")]),t._v(" "),a("div",{staticClass:"hr-style"}),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"20px"}},[t._v("服务地址:"),a("span",{staticClass:"customNamevalue"},[t._v(t._s(t.serverAddress)),a("button",{staticClass:"button-cancel",staticStyle:{"margin-left":"30px",height:"20px"},attrs:{type:"button"},on:{click:t.changeAddress}},[t._v("更换地址")])])]),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"20px"}},[t._v("所属服务站:"),a("span",{staticStyle:{"margin-left":"35px"}},[t._v(t._s(t.serverStation))])])])]),t._v(" "),a("div",{staticClass:"thrid-bar"},[a("div",{staticClass:"order-inf"},[a("div",{staticClass:"custom-action"},[t._v("订单信息")]),t._v(" "),a("div",{staticClass:"hr-style"}),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"20px"}},[a("span",{staticClass:"redStart"},[t._v("*")]),t._v("服务项目:\n\t\t\t\t\t"),a("span",{staticClass:"customNamevalue"},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"400px","margin-right":"20px"},attrs:{clearable:"",placeholder:"请选择"},on:{change:t.serverchange},model:{value:t.custom,callback:function(e){t.custom=e},expression:"custom"}},t._l(t.serverOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.serverName,value:t.key}})}))],1)]),t._v(" "),a("div",{staticClass:"changeserver"},[1==t.serverType?a("div",[a("span",[t._v("面积:")]),t._v(" "),a("span",{staticStyle:{"padding-left":"76px"}},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"180px"},attrs:{placeholder:"请输入搜索内容"},model:{value:t.customPhone,callback:function(e){t.customPhone=e},expression:"customPhone"}}),t._v(" "),a("span",{staticStyle:{display:"inline-block",width:"36px","line-height":"36px","text-align":"center",height:"36px",background:"#eef1f6",position:"absolute",border:"1px solid #bfcbd9","border-left":"none"}},[t._v("平米")])],1)]):t._e(),t._v(" "),2==t.serverType?a("div",[a("div",{staticStyle:{"margin-left":"126px",width:"180px","border-top":"1px solid #eef1f6",height:"50px","line-height":"50px","font-size":"12px"}},[a("span",{staticStyle:{display:"inline-block"}},[t._v("小型灯")]),t._v(" "),a("span",{staticStyle:{"margin-top":"9px",position:"absolute",border:"1px solid #bfcbd9",width:"36px","text-align":"center",display:"inline-block","margin-left":"10px","border-right":"none",height:"36px","line-height":"36px","font-size":"20px"},on:{click:function(e){t.smallminus(t.smallLight)}}},[t._v("-")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.smallLight,expression:"smallLight"}],staticStyle:{width:"50px",position:"absolute","margin-left":"46px","margin-top":"9px",border:"1px solid #bfcbd9",height:"36px","line-height":"36px","text-align":"center"},attrs:{onkeyup:"this.value=this.value.replace(/\\D/g,'')",onafterpaste:"this.value=this.value.replace(/\\D/g,'')"},domProps:{value:t.smallLight},on:{input:function(e){e.target.composing||(t.smallLight=e.target.value)}}}),t._v(" "),a("span",{staticStyle:{"margin-top":"9px",position:"absolute",border:"1px solid #bfcbd9",width:"36px","text-align":"center",display:"inline-block","margin-left":"96px","border-left":"none",height:"36px","line-height":"36px","font-size":"20px"},on:{click:function(e){t.smallplus(t.smallLight)}}},[t._v("+")])]),t._v(" "),a("div",{staticStyle:{"margin-left":"126px",width:"180px","border-top":"1px solid #eef1f6","border-bottom":"1px solid #eef1f6",height:"50px","line-height":"50px","font-size":"12px"}},[a("span",[t._v("大型灯")]),t._v(" "),a("span",{staticStyle:{"margin-top":"9px",position:"absolute",border:"1px solid #bfcbd9",width:"36px","text-align":"center",display:"inline-block","margin-left":"10px","border-right":"none",height:"36px","line-height":"36px","font-size":"20px"},on:{click:function(e){t.bigminus(t.bigLight)}}},[t._v("-")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.bigLight,expression:"bigLight"}],staticStyle:{width:"50px","text-align":"center",position:"absolute","margin-left":"46px","margin-top":"9px",border:"1px solid #bfcbd9",height:"36px","line-height":"36px",outline:"none"},attrs:{onkeyup:"this.value=this.value.replace(/\\D/g,'')",onafterpaste:"this.value=this.value.replace(/\\D/g,'')"},domProps:{value:t.bigLight},on:{input:function(e){e.target.composing||(t.bigLight=e.target.value)}}}),t._v(" "),a("span",{staticStyle:{"margin-top":"9px",position:"absolute",border:"1px solid #bfcbd9",width:"36px","text-align":"center",display:"inline-block","margin-left":"96px","border-left":"none",height:"36px","line-height":"36px","font-size":"20px"},on:{click:function(e){t.bigplus(t.bigLight)}}},[t._v("+")])])]):t._e(),t._v(" "),3==t.serverType?a("div",{staticStyle:{"margin-left":"88px"}},t._l(t.roomType,function(e,i){return a("div",{key:i,ref:"selcetOption",refInFor:!0,staticClass:"selfCheckBox",on:{click:function(a){t.roomSel(i,e)}}},[t._v("\n\t\t\t\t\t\t\t"+t._s(e.roomName)+"\n\t\t\t\t\t\t\t"),t.roomLen==e.key?a("div",{staticClass:"triangle-bottomright"}):t._e(),t._v(" "),a("div",{staticClass:"tally"},[t._v("✔")])])})):t._e()]),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"20px"}},[a("span",{staticClass:"redStart"},[t._v("*")]),t._v("价格:\n\t\t\t\t\t"),a("span",{staticClass:"customNamevalue",staticStyle:{"padding-left":"78px"}},[t._v(t._s(t.price)+"元")])]),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"20px"}},[a("span",{staticClass:"redStart"},[t._v("*")]),t._v("技师性别:\n\t\t\t\t    "),a("div",{staticStyle:{display:"inline-block","margin-left":"28px"}},t._l(t.sexType,function(e,i){return a("div",{key:i,ref:"sexOption",refInFor:!0,staticClass:"selfCheckBox",on:{click:function(a){t.roomSel1(i,e)}}},[t._v("\n\t\t\t\t\t\t\t"+t._s(e.sexName)+"\n\t\t\t\t\t\t\t"),t.sexLen==e.key?a("div",{staticClass:"triangle-bottomright"}):t._e(),t._v(" "),a("div",{staticClass:"tally"},[t._v("✔")])])}))]),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"20px"}},[a("span",{staticClass:"redStart"},[t._v("*")]),t._v("技师:\n                        "),a("span",{staticClass:"customNamevalue",staticStyle:{"padding-left":"72px"}},[a("button",{staticClass:"button-cancel",staticStyle:{width:"100px"},attrs:{type:"button"},on:{click:t.technicianSel}},[t._v("选择技师")]),t._v(" "),a("span",{staticStyle:{"margin-left":"50px","font-size":"12px"}},[t._v("系统自动分配:\n\t\t\t\t\t\t\t\t  "),a("el-switch",{attrs:{"on-color":"#4c70e8","off-color":"#bfcbd9","on-text":"是","off-text":"否","on-value":"1","off-value":"0"},model:{value:t.sysAllocat,callback:function(e){t.sysAllocat=e},expression:"sysAllocat"}})],1)])]),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"20px"}},[a("div",{staticClass:"customNamevalue",staticStyle:{"margin-left":"60px",width:"100%",height:"40px"}},t._l(t.tabOptions,function(e,i){return a("div",{key:i,ref:"tabsName",refInFor:!0,staticClass:"tabWrap"},[t._v("\n\t\t\t\t\t\t   "+t._s(e.tabName)+"\n\t\t\t\t\t\t   "),a("div",{staticClass:"closePic",on:{click:function(a){t.errorClose(e,i)}}},[t._v("✕")])])}))]),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"20px"}},[a("span",{staticClass:"redStart"},[t._v("*")]),t._v("服务时间:\n\t\t\t\t\t"),a("span",{staticClass:"customNamevalue",staticStyle:{"padding-left":"48px"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"年/月/日"},model:{value:t.severTime,callback:function(e){t.severTime=e},expression:"severTime"}})],1)]),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"20px"}},[a("span",{staticClass:"redStart"},[t._v("*")]),t._v("订单来源:\n\t\t\t\t\t"),a("span",{staticClass:"customNamevalue"},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"400px","margin-right":"20px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:t.orderOrgin,callback:function(e){t.orderOrgin=e},expression:"orderOrgin"}},t._l(t.orderOrginOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.orderOrginName,value:t.key}})}))],1)]),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"20px"}},[a("span",{staticStyle:{position:"absolute","margin-top":"30px"}},[t._v("客户备注:")]),t._v(" "),a("span",{staticClass:"customNamevalue",staticStyle:{"margin-left":"78px"}},[a("el-input",{staticStyle:{width:"400px","margin-left":"-20px"},attrs:{type:"textarea",rows:3,placeholder:"请输入内容"},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1)]),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"50px","margin-left":"180px","padding-bottom":"20px"}},[a("button",{staticClass:"button-large",on:{click:t.confirmOrder}},[t._v("确认下单")])])])]),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogVisible,title:"更换地址",size:"small"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"custom-action"},[a("span",{staticClass:"redStart"},[t._v("*")]),t._v("所在区域\n\t\t"),a("span",{staticClass:"customNamevalue"},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"130px","margin-right":"20px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:t.province,callback:function(e){t.province=e},expression:"province"}},t._l(t.provinceOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.provinceName,value:t.key}})})),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"130px","margin-right":"20px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}},t._l(t.cityOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.cityName,value:t.key}})})),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:t.county,callback:function(e){t.county=e},expression:"county"}},t._l(t.countyOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.countyName,value:t.key}})}))],1)]),t._v(" "),a("div",{staticClass:"custom-action",staticStyle:{"margin-top":"20px"}},[a("span",{staticClass:"redStart"},[t._v("*")]),t._v("详细地址\n\t\t"),a("span",{staticClass:"customNamevalue"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"300px"},attrs:{placeholder:"请输入搜索内容"},model:{value:t.detailedAddress,callback:function(e){t.detailedAddress=e},expression:"detailedAddress"}})],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",slot:"footer"},[a("button",{staticClass:"button-large",on:{click:t.changeOk}},[t._v("确 认")]),t._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")])])]),t._v(" "),a("el-dialog",{attrs:{title:"选择技师",visible:t.dialogTableVisible},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入技师姓名"},model:{value:t.technicianName,callback:function(e){t.technicianName=e},expression:"technicianName"}}),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px","margin-right":"20px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:t.stationName,callback:function(e){t.stationName=e},expression:"stationName"}},t._l(t.stationOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.stationName,value:t.key}})})),t._v(" "),a("button",{staticClass:"button-large btn_search",on:{click:t.technicianSearch}},[t._v("搜索")]),t._v(" "),a("el-table",{attrs:{data:t.technicianData}},[a("el-table-column",{attrs:{width:"50",type:"selection"}}),t._v(" "),a("el-table-column",{attrs:{prop:"headUrl",align:"center",label:"头像"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",align:"center",label:"姓名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sex",align:"center",label:"性别"}}),t._v(" "),a("el-table-column",{attrs:{prop:"serverStation",align:"center",label:"服务站"}})],1),t._v(" "),a("div",{staticClass:"pagination-container clearfix"},[a("el-pagination",{attrs:{"page-sizes":[10,20,30,50],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.pagetotal},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},[a("button",{staticClass:"button-large",on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("确 定")]),t._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("取 消")])])],1)],1)},s=[],n={render:i,staticRenderFns:s};e.a=n},oppB:function(t,e,a){"use strict";function i(t){return _.a.post("/apiservice/a/sys/user/saveData",t)}function s(t){return _.a.post("/apiservice/a/sys/user/upData",t)}function n(t){return _.a.post("/apiservice/a/sys/user/formData",t)}function o(t,e,a){return _.a.post("/apiservice/a/sys/role/listPageData?pageNo="+e+"&pageSize="+a,t)}function l(t){return _.a.post("/apiservice/a/sys/role/listDataWithoutPermission",t)}function r(t,e,a){return _.a.post("/apiservice/a/sys/user/listData?pageNo="+e+"&pageSize="+a,t)}function c(t){return _.a.post("/apiservice/a/sys/role/saveData",t)}function p(t){return _.a.post("/apiservice/a/sys/role/upData",t)}function d(t){return _.a.post("/apiservice/a/sys/role/deleteRole",t)}function u(t){return _.a.get("/apiservice/a/sys/role/getRoleDetail?id="+t)}function v(t){return _.a.post("/apiservice/a/sys/organization/getOrgByTypeOrgId",t)}function m(t){return _.a.post("/apiservice/a/service/station/serviceStation/listStationByOrgId",t)}function g(t){return _.a.post("/apiservice/a/sys/organization/listDataAll",t)}function f(t){return _.a.post("/apiservice/a/service/station/serviceStation/listByOffice",t)}function h(){return _.a.get("/apiservice/a/sys/menu/getMenuList")}function b(t){return _.a.post("/apiservice/a/sys/user/deleteUser",t)}function x(t){return _.a.get("/apiservice/a/sys/role/chkName?id="+t.id+"&name="+t.name)}function y(t){return _.a.get("/apiservice/a/sys/role/chkNameUpdate?id="+t.id+"&name="+t.name+"&roleId="+t.roleId)}e.k=i,e.m=s,e.g=n,e.o=o,e.j=l,e.e=r,e.l=c,e.r=p,e.q=d,e.p=u,e.f=v,e.i=m,e.b=g,e.c=f,e.a=h,e.h=b,e.d=x,e.n=y;var _=a("Vo7i")}});