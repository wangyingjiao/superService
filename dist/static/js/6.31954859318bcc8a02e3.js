webpackJsonp([6],{"7t0u":function(e,t,a){"use strict";function n(e){a("QshX")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("NdvN"),s=a("sCMP"),c=a("VU/8"),r=n,o=c(i.a,s.a,r,null,null);t.default=o.exports},"9bBU":function(e,t,a){a("mClu");var n=a("FeBl").Object;e.exports=function(e,t,a){return n.defineProperty(e,t,a)}},C4MV:function(e,t,a){e.exports={default:a("9bBU"),__esModule:!0}},GcWB:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".btn_right{float:right}.btn_left,.btn_right{width:100px}.ele-date{margin:0 10px}.bottom0{margin-bottom:0}.bgWhite{background-color:#fff;padding:20px}.tool{width:115px;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tabStyle2 .el-input{margin-left:0;margin-bottom:0}.tabStyle2 .el-input-group{margin-left:20px;margin-bottom:20px}",""])},NdvN:function(e,t,a){"use strict";var n=a("woOf"),i=a.n(n),s=a("bOdI"),c=a.n(s),r=a("flDp"),o=a("xT6B"),l=a("cAgV");t.a={name:"holiday",directives:{waves:l.a},data:function(){var e;return e={btnShow:JSON.parse(localStorage.getItem("btn")),list:[],total:null,listLoading:!0,dialogForm:!1,btnState:!1,failReasonState:!1,activeName:"",listQuery:{page:1,limit:10,title:void 0,type:void 0},pageNumber:1,pageSize:10},c()(e,"total",1),c()(e,"search",{type:"techName",val:"",time:""}),c()(e,"temp",{rowId:"",reviewStatus:"",failReason:""}),c()(e,"rules",{reviewStatus:[{required:!0,message:"请选择审核状态",trigger:"change"}],failReason:[{required:!0,message:"请输入1 - 100位未通过原因",trigger:"blur"},{min:0,max:100,message:"未通过原因长度不超过100个字符",trigger:"blur"}]}),c()(e,"seOptions",[{label:"姓名",value:"techName"},{label:"手机号",value:"techPhone"}]),c()(e,"holidayState",[{label:"通过",value:"yes"},{label:"不通过",value:"no"}]),c()(e,"tableKey",0),c()(e,"isIndeterminate",!0),e},created:function(){this.getList(),this.activeName="all"},methods:{getList:function(){var e=this,t={reviewStatus:this.activeName};if(this.search.time[0]){var n=o.a.formatDate.format(new Date(this.search.time[0]),"yyyy-MM-dd hh:mm:ss"),s={startTime:n};t=i()(t,s)}if(this.search.time[1]){var c=o.a.formatDate.format(new Date(this.search.time[1]),"yyyy-MM-dd 23:59:59"),l={endTime:c};t=i()(t,l)}if("techName"==this.search.type){var u={techName:this.search.val};t=i()(t,u)}else if("techPhone"==this.search.type){var f={techPhone:this.search.val};t=i()(t,f)}else{var h={};t=i()(t,h)}"all"==t.reviewStatus&&(t.reviewStatus=""),console.log(t),a.i(r.r)(t,this.pageNumber,this.pageSize).then(function(t){if(1==t.data.code){if(e.total=t.data.data.count,e.list=t.data.data.list,e.pageNumber=t.data.data.pageNo,e.pageSize=t.data.data.pageSize,e.listQuery.page=t.data.data.pageNo,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.listLoading=!1}else e.listLoading=!1}).catch(function(){e.listLoading=!1})},handleFilter:function(){this.listLoading=!0,this.listQuery.page=1,this.pageNumber=1,this.getList()},handleSizeChange:function(e){this.listQuery.page=1,this.pageNumber=1,this.pageSize=e,this.getList()},handleCurrentChange:function(e){this.pageNumber=e,this.getList()},handleCheck:function(e){var t=this;this.temp.rowId=e.id,"yes"==e.reviewStatus?(this.temp.reviewStatus="yes",this.dialogForm=!0):"no"==e.reviewStatus?(this.listLoading=!0,this.temp.reviewStatus="",a.i(r.s)({id:e.id}).then(function(e){t.listLoading=!1,"1"==e.data.code&&(t.holidayState=[{label:"通过",value:"yes"}],t.temp.failReason=e.data.data.failReason,t.failReasonState=!0,t.dialogForm=!0)}).catch(function(e){t.listLoading=!1})):this.dialogForm=!0},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1}).then(function(){var n={id:e.id};a.i(r.t)(n).then(function(e){1===e.data.code&&(t.$message({type:"success",message:"删除成功!"}),t.getList())}).catch(function(){t.$message({type:"error",message:"删除失败"})})}).catch(function(){t.$message({type:"warning",message:"已取消删除"})})},create:function(e){var t=this;console.log(this.temp),this.$refs[e].validate(function(n){if(!n){for(var i=t.$refs[e]._data.fields,s=[],c=0;c<i.length;c++)""!=i[c].validateMessage&&s.push(i[c].validateMessage);return t.$message({type:"error",message:s[0]}),!1}if(t.btnState=!0,"yes"==t.temp.reviewStatus)console.log("yessssssssssssssssss"),t.$confirm("审核通过后不可再修改其审核状态，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1}).then(function(){var n={id:t.temp.rowId,reviewStatus:t.temp.reviewStatus};"no"==n.reviewStatus&&(n.failReason=t.temp.failReason),a.i(r.u)(n).then(function(a){t.btnState=!1,1===a.data.code&&(t.resetForm(e),t.$message({type:"success",message:"审核成功"}),t.resetSearch(),t.handleFilter(),t.dialogForm=!1)}).catch(function(e){t.btnState=!1})}).catch(function(){t.btnState=!1,console.log(111111)});else{console.log(222222);var o={id:t.temp.rowId,reviewStatus:t.temp.reviewStatus,failReason:t.temp.failReason};a.i(r.u)(o).then(function(a){t.btnState=!1,1===a.data.code&&(t.resetTemp(),t.$refs[e].resetFields(),t.$message({type:"success",message:"审核成功"}),t.resetSearch(),t.handleFilter(),t.dialogForm=!1)}).catch(function(e){t.btnState=!1})}})},handleClick:function(){this.getList()},resetForm:function(e){this.holidayState=[{label:"通过",value:"yes"},{label:"不通过",value:"no"}],this.resetTemp(),this.$refs[e].resetFields(),this.failReasonState=!1,this.dialogForm=!1},resetTemp:function(){this.temp={rowId:"",reviewStatus:"",failReason:""}},resetSearch:function(){this.search={type:"techName",val:"",time:""}}}}},QshX:function(e,t,a){var n=a("GcWB");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("6601bf6f",n,!0)},XZlg:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},bOdI:function(e,t,a){"use strict";t.__esModule=!0;var n=a("C4MV"),i=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=function(e,t,a){return t in e?(0,i.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},cAgV:function(e,t,a){"use strict";var n=a("jdeu"),i=function(e){e.directive("waves",n.a)};window.Vue&&(window.waves=n.a,Vue.use(i)),n.a.install=i,t.a=n.a},ctMr:function(e,t,a){var n=a("XZlg");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("44fae30e",n,!0)},flDp:function(e,t,a){"use strict";function n(){return M.a.get("/apiservice/a/sys/dict/listData?type=ethnic")}function i(){return M.a.get("/apiservice/a/sys/dict/techWeightList")}function s(){return M.a.get("/apiservice/a/sys/dict/techHeightList")}function c(e,t,a){return new T.a(function(n,i){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/listData?pageNo="+e+"&pageSize="+t,a).then(function(e){n(e)}).catch(function(e){i(e)})})}function r(e){return new T.a(function(t,a){M.a.post("apiservice/a/service/station/serviceStation/getStationByArea",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function o(e){return new T.a(function(t,a){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/saveData",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function l(e){return new T.a(function(t,a){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/formData",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function u(e){return new T.a(function(t,a){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/upData",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function f(e){return new T.a(function(t,a){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/upDataService",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function h(e){return new T.a(function(t,a){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/upDataPlus",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function p(e){return new T.a(function(t,a){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/upDataOther",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function d(e){return new T.a(function(t,a){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/saveFamilyMembers",e).then(function(e){t(e)}).catch(function(e){console.log(e,"error------")})})}function v(e){return new T.a(function(t,a){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/deleteFamilyMembers",e).then(function(e){t(e)}).catch(function(e){console.log(e,"error------")})})}function m(e){return new T.a(function(t,a){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/deleteData",e).then(function(e){t(e)}).catch(function(e){console.log(e,"error-----")})})}function g(e){return new T.a(function(t,a){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/saveAppPassWordData",e).then(function(e){t(e)}).catch(function(e){console.log(e,"error------")})})}function b(e){return new T.a(function(t,a){M.a.post("apiservice/a/service/technician/serviceTechnicianHoliday/saveData",e).then(function(e){t(e)}).catch(function(e){console.log(e)})})}function w(e,t,a){return M.a.post("/apiservice/a/service/technician/serviceTechnicianHoliday/listData?pageNo="+t+"&pageSize="+a,e)}function y(e){return M.a.post("/apiservice/a/service/technician/serviceTechnicianHoliday/delete",e)}function S(e){return M.a.post("/apiservice/a/service/technician/serviceTechnicianHoliday/reviewedHoliday",e)}function _(e){return M.a.post("/apiservice/a/service/technician/serviceTechnicianHoliday/getHolidayById",e)}function k(){return new T.a(function(e,t){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/getDate").then(function(t){e(t)}).catch(function(e){t(e)})})}function x(){return new T.a(function(e,t){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/orgList").then(function(t){e(t)}).catch(function(e){t(e)})})}function C(e,t,a){return new T.a(function(n,i){M.a.post("apiservice/a/service/technician/serviceTechnicianInfo/scheduleList?pageNo="+t+"&pageSize="+a,e).then(function(e){n(e)}).catch(function(e){i(e)})})}t.h=n,t.i=i,t.j=s,t.q=c,t.d=r,t.p=o,t.n=l,t.c=u,t.e=f,t.b=h,t.a=p,t.g=d,t.f=v,t.o=m,t.m=g,t.k=b,t.r=w,t.t=y,t.u=S,t.s=_,t.l=k,t.w=x,t.v=C;var N=a("//Fk"),T=a.n(N),M=a("Vo7i")},jdeu:function(e,t,a){"use strict";var n=a("woOf"),i=a.n(n),s=a("ctMr");a.n(s);t.a={bind:function(e,t){e.addEventListener("click",function(a){var n=i()({},t.value),s=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),c=s.ele;if(c){c.style.position="relative",c.style.overflow="hidden";var r=c.getBoundingClientRect(),o=c.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":(o=document.createElement("span"),o.className="waves-ripple",o.style.height=o.style.width=Math.max(r.width,r.height)+"px",c.appendChild(o)),s.type){case"center":o.style.top=r.height/2-o.offsetHeight/2+"px",o.style.left=r.width/2-o.offsetWidth/2+"px";break;default:o.style.top=a.pageY-r.top-o.offsetHeight/2-document.body.scrollTop+"px",o.style.left=a.pageX-r.left-o.offsetWidth/2-document.body.scrollLeft+"px"}return o.style.backgroundColor=s.color,o.className="waves-ripple z-active",!1}},!1)}}},mClu:function(e,t,a){var n=a("kM2E");n(n.S+n.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},sCMP:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"filter-container tabStyle tabStyle2"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"全部",name:"all"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"待审核",name:"submit"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"审核通过",name:"yes"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"审核未通过",name:"no"}})],1),e._v(" "),a("el-input",{staticStyle:{width:"30%","margin-right":"2%"},attrs:{placeholder:"请输入搜索内容"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.val,callback:function(t){e.search.val=t},expression:"search.val"}},[a("el-select",{staticStyle:{width:"90px"},attrs:{clearable:"",placeholder:"请选择"},slot:"prepend",model:{value:e.search.type,callback:function(t){e.search.type=t},expression:"search.type"}},e._l(e.seOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-date-picker",{staticStyle:{width:"20%"},attrs:{type:"daterange",placeholder:"选择日期"},model:{value:e.search.time,callback:function(t){e.search.time=t},expression:"search.time"}}),e._v(" "),a("button",{staticClass:"button-large el-icon-search btn_search btn-color",on:{click:e.handleFilter}},[e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"bgWhite"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"正在加载",fit:"","tooltip-effect":"light","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"编号",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\r\n            "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\r\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"姓名",prop:"techName"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"手机号",prop:"techPhone"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"服务站",prop:"techStationName"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"开始时间",prop:"startTime"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"结束时间",prop:"endTime"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"审核状态",prop:"reviewStatus"},scopedSlots:e._u([{key:"default",fn:function(t){return["submit"==t.row.reviewStatus?a("span",[e._v("待审核")]):e._e(),e._v(" "),"yes"==t.row.reviewStatus?a("span",[e._v("审核通过")]):e._e(),e._v(" "),"no"==t.row.reviewStatus?a("span",[e._v("不通过")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"来源",prop:"source"},scopedSlots:e._u([{key:"default",fn:function(t){return["sys"==t.row.source?a("span",[e._v("系统")]):e._e(),e._v(" "),"app"==t.row.source?a("span",[e._v("App")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","show-overflow-tooltip":!0,width:"150px",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{placement:"left",disabled:t.row.remark.length<10,content:t.row.remark}},[a("div",{staticClass:"tool"},[e._v(e._s(t.row.remark))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.btnShow.indexOf("holiday_review")>=0&&"yes"!=t.row.reviewStatus?a("el-button",{staticClass:"ceshi3",on:{click:function(a){e.handleCheck(t.row)}}},[e._v("审核")]):e._e(),e._v(" "),e.btnShow.indexOf("holiday_delete")>=0?a("el-button",{staticClass:"ceshi3",on:{click:function(a){e.handleDelete(t.row)}}},[e._v("删除")]):e._e()]}}])})],1),e._v(" "),e.listLoading?e._e():a("div",{staticClass:"pagination-container clearfix"},[a("el-pagination",{staticClass:"fr mt20",attrs:{"current-page":e.listQuery.page,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"审核休假",visible:e.dialogForm,"show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogForm=t}}},[a("el-form",{ref:"temp",staticClass:"small-space dia_form",attrs:{rules:e.rules,model:e.temp,"label-position":"left","label-width":"100px"}},[e.failReasonState?a("el-form-item",{attrs:{label:"未通过原因:"}},[a("p",{staticStyle:{width:"100%","word-wrap":"break-word","font-size":"12px",color:"#8391a5"}},[e._v(e._s(e.temp.failReason))])]):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"审核休假:",prop:"reviewStatus"}},[a("el-select",{staticClass:"form_item",model:{value:e.temp.reviewStatus,callback:function(t){e.temp.reviewStatus=t},expression:"temp.reviewStatus"}},e._l(e.holidayState,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),"no"!=e.temp.reviewStatus||e.failReasonState?e._e():a("el-form-item",{attrs:{label:"未通过原因:",prop:"failReason"}},[a("el-input",{staticClass:"form_item",attrs:{type:"textarea",rows:2,placeholder:"请输入1 - 100 位未通过原因"},model:{value:e.temp.failReason,callback:function(t){e.temp.failReason=t},expression:"temp.failReason"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},[a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1)],1)])])},i=[],s={render:n,staticRenderFns:i};t.a=s},xT6B:function(e,t,a){"use strict";function n(e,t){for(var t=t-(e+"").length,a=0;a<t;a++)e="0"+e;return e}var i=/([yMdhsm])(\1*)/g;t.a={getQueryStringByName:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(t),n="";return null!=a&&(n=a[2]),t=null,a=null,null==n||""==n||"undefined"==n?"":n},formatDate:{format:function(e,t){return t=t||"yyyy-MM-dd",t.replace(i,function(t){switch(t.charAt(0)){case"y":return n(e.getFullYear(),t.length);case"M":return n(e.getMonth()+1,t.length);case"d":return n(e.getDate(),t.length);case"w":return e.getDay()+1;case"h":return n(e.getHours(),t.length);case"m":return n(e.getMinutes(),t.length);case"s":return n(e.getSeconds(),t.length)}})},parse:function(e,t){var a=t.match(i),n=e.match(/(\d)+/g);if(a.length==n.length){for(var s=new Date(1970,0,1),c=0;c<a.length;c++){var r=parseInt(n[c]);switch(a[c].charAt(0)){case"y":s.setFullYear(r);break;case"M":s.setMonth(r-1);break;case"d":s.setDate(r);break;case"h":s.setHours(r);break;case"m":s.setMinutes(r);break;case"s":s.setSeconds(r)}}return s}return null}}}}});