webpackJsonp([7],{"2qfa":function(e,t,a){"use strict";function s(e){a("8qJF")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("iz3Z"),r=a("lK3l"),n=a("VU/8"),o=s,l=n(i.a,r.a,o,null,null);t.default=l.exports},"8qJF":function(e,t,a){var s=a("Khwp");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("rjj0")("75b0825e",s,!0)},"9bBU":function(e,t,a){a("mClu");var s=a("FeBl").Object;e.exports=function(e,t,a){return s.defineProperty(e,t,a)}},C4MV:function(e,t,a){e.exports={default:a("9bBU"),__esModule:!0}},Cgi1:function(e,t,a){"use strict";function s(e,t,a){return V.a.post("/apiservice/a/service/log/serviceLog/listData?pageNo="+t+"&pageSize="+a,e)}function i(e,t,a){return V.a.post("/apiservice/a/service/log/SysJointLogger/listSysJointLogger?pageNo="+t+"&pageSize="+a,e)}function r(e){return V.a.post("/apiservice/a//service/log/SysJointLogger/doOpenSend",e)}function n(e,t,a){return V.a.post("/apiservice/a/service/appVersion/appVersion/listData?pageNo="+t+"&pageSize="+a,e)}function o(e){return V.a.post("/apiservice/a/service/appVersion/appVersion/saveData",e)}function l(e){return V.a.post("/apiservice/a/service/appVersion/appVersion/formData",e)}function c(e){return V.a.post("/apiservice/a/service/appVersion/appVersion/upData",e)}function u(e){return V.a.post("/apiservice/a/service/appVersion/appVersion/deleteAppVersion",e)}function p(e){return V.a.post("/apiservice/a/service/appVersion/appVersion/getNewest",e)}function d(e){return V.a.post("/apiservice/a/sys/menu/getAllMenuList",e)}function g(e){return V.a.post("/apiservice/a/sys/menu/save",e)}function f(e){return V.a.post("/apiservice/a/sys/menu/formData",e)}function h(e){return V.a.post("/apiservice/a/sys/menu/upData",e)}function m(e){return V.a.post("/apiservice/a/sys/menu/delete",e)}function v(e,t,a){return V.a.post("/apiservice/a/sys/pushMessage/listFailData?pageNo="+t+"&pageSize="+a,e)}function b(e){return V.a.post("/apiservice/a/sys/pushMessage/pushFailMessage",e)}function y(e,t,a){return V.a.post("/apiservice/a/sys/dict/dictListData?pageNo="+t+"&pageSize="+a,e)}function w(e){return V.a.post("/apiservice/a/sys/dict/dictListDataByType",e)}function x(e){return V.a.post("/apiservice/a/sys/dict/saveData",e)}function _(e){return V.a.post("/apiservice/a/sys/dict/deleteDict",e)}function k(e,t,a){return V.a.post("/apiservice/a/service/log/sysJointWait/listData?pageNo="+t+"&pageSize="+a,e)}function C(e){return V.a.post("/apiservice/a/sys/redis/checkPassword   ",e)}function S(e){return V.a.post("/apiservice/a/sys/redis/saveRedisValue",e)}function N(e){return V.a.post("/apiservice/a/sys/redis/getRedisValue",e)}t.n=s,t.a=i,t.b=r,t.t=n,t.w=o,t.u=l,t.s=c,t.v=u,t.x=p,t.i=d,t.l=g,t.j=f,t.m=h,t.k=m,t.g=v,t.h=b,t.o=y,t.p=w,t.r=x,t.q=_,t.c=k,t.d=C,t.f=S,t.e=N;var V=a("Vo7i")},Khwp:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".btn_right{float:right}.btn_left,.btn_right{width:100px}.ele-date{margin:0 10px}.bottom0{margin-bottom:0}.bgWhite{background-color:#fff;padding:20px}.tool{width:115px;overflow:hidden;text-overflow:ellipsis}.btn_upload,.tool{text-align:center;white-space:nowrap}.btn_upload{color:#fff;background-color:#6d8dfc;display:inline-block;line-height:1;cursor:pointer;border:1px solid #6d8dfc;border-color:#6d8dfc;-webkit-appearance:none;box-sizing:border-box;outline:none;margin:0;font-weight:500;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;padding:5px 10px;font-size:14px;border-radius:4px}.el-upload{text-align:left}",""])},Vc3t:function(e,t,a){"use strict";function s(){var e={};return l.a.get("sign")?e=JSON.parse(l.a.get("sign")):n.a.get("/apiservice/oss/getSign").then(function(t){var a=t.data;l.a.set("sign",r()(a)),e=JSON.parse(l.a.get("sign"))}),e}t.a=s;var i=a("mvHQ"),r=a.n(i),n=a("Vo7i"),o=a("lbHh"),l=a.n(o)},XZlg:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},bOdI:function(e,t,a){"use strict";t.__esModule=!0;var s=a("C4MV"),i=function(e){return e&&e.__esModule?e:{default:e}}(s);t.default=function(e,t,a){return t in e?(0,i.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},cAgV:function(e,t,a){"use strict";var s=a("jdeu"),i=function(e){e.directive("waves",s.a)};window.Vue&&(window.waves=s.a,Vue.use(i)),s.a.install=i,t.a=s.a},ctMr:function(e,t,a){var s=a("XZlg");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("rjj0")("44fae30e",s,!0)},iz3Z:function(e,t,a){"use strict";var s=a("mvHQ"),i=a.n(s),r=a("//Fk"),n=a.n(r),o=a("woOf"),l=a.n(o),c=a("bOdI"),u=a.n(c),p=a("Cgi1"),d=a("lbHh"),g=a.n(d),f=a("Vc3t"),h=(a("xT6B"),a("cAgV"));t.a={name:"appVersion",directives:{waves:h.a},data:function(){var e,t=function(e,t,a){t?/^[0-9]*$/.test(t)?a():a(new Error("build号只能为数字类型")):a(new Error("build号为1 - 15位数字"))};return e={btnState:!1,list:[],total:null,xhr:new XMLHttpRequest,listLoading:!0,showProgress:!1,uploadPercent:0,Form:{fileList:""},a:!1,fileList:[],listQuery:{page:1,limit:10,title:void 0,type:void 0},pageNumber:1,pageSize:10},u()(e,"total",1),u()(e,"search",{type:"",val:"",startTime:"",endTime:""}),u()(e,"seOptions",[{label:"版本号",value:"versionNumber"},{label:"build号",value:"build"}]),u()(e,"textMap",{update:"编辑",create:"新增"}),u()(e,"rowId",""),u()(e,"dialogFormVisible",!1),u()(e,"dialogStatus",""),u()(e,"temp",{versionNumber:"",build:"",forcedUpdate:"",upgradeContent:"",refreshAddress:""}),u()(e,"rules",{versionNumber:[{required:!0,message:"版本号不能为空",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 15 个字符",trigger:"blur"}],build:[{required:!0,validator:t,trigger:"blur"},{min:1,max:15,message:"build号为1 - 15位数字",trigger:"blur"}],forcedUpdate:[{required:!0,message:"强更状态不能为空",trigger:"change"}],upgradeContent:[{required:!0,message:"请输入不超过200位的提示语",trigger:"blur"},{min:1,max:200,message:"请输入不超过200位的提示语",trigger:"blur"}],refreshAddress:[{required:!0,message:"请输入更新地址",trigger:"blur"},{min:1,max:200,message:"长度在 1 到 200 个字符",trigger:"blur"}]}),u()(e,"tableKey",0),u()(e,"isIndeterminate",!0),e},created:function(){this.getList(),g.a.get("sign")||a.i(f.a)()},methods:{getList:function(){var e=this;this.listLoading=!0;var t={};if("versionNumber"==this.search.type){var s={versionNumber:this.search.val};t=l()(t,s)}else if("build"==this.search.type){var i={build:this.search.val};t=l()(t,i)}else if("requestUri"==this.search.type){var r={requestUri:this.search.val};t=l()(t,r)}else if("params"==this.search.type){var n={params:this.search.val};t=l()(t,n)}a.i(p.t)(t,this.pageNumber,this.pageSize).then(function(t){if(1==t.data.code){if(e.total=t.data.data.count,e.list=t.data.data.list,e.pageNumber=t.data.data.pageNo,e.pageSize=t.data.data.pageSize,e.listQuery.page=t.data.data.pageNo,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.listLoading=!1}else e.listLoading=!1}).catch(function(){e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.pageNumber=1,this.getList()},handleSizeChange:function(e){this.listQuery.page=1,this.pageNumber=1,this.pageSize=e,this.getList()},handleCurrentChange:function(e){this.pageNumber=e,this.getList()},handleCreate:function(){this.dialogFormVisible=!0,this.dialogStatus="create"},handleUpdate:function(e){var t=this;this.listLoading=!0,this.dialogStatus="update";var s={id:e.id};a.i(p.u)(s).then(function(a){if(t.listLoading=!0,1==a.data.code){var s=a.data.data;s.build=String(s.build),t.listLoading=!1,t.rowId=e.id,t.temp=l()({},s),t.dialogFormVisible=!0}else t.listLoading=!1})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1}).then(function(){var s={id:e.id};a.i(p.v)(s).then(function(e){1===e.data.code&&(t.$message({type:"success",message:"删除成功!"}),t.getList())}).catch(function(){t.listLoading=!1})}).catch(function(){t.$message({type:"warning",message:"已取消删除"})})},handleRemove:function(e,t){},handlePreview:function(e){},beforeAvatarUpload:function(e){var t=e.name,a=t.substring(t.length-3,t.length),s="apk"===a;return s||this.$message.error("上传只能是 apk 格式安装包!"),s},Upload:function(e){var t=this;new n.a(function(e,a){var s=JSON.parse(g.a.get("sign")),r=Date.parse(new Date)/1e3;s.expire-3>r?e(s):t.$http.get("/apiservice/oss/getSign").then(function(t){g.a.set("sign",i()(t.data)),e(t.data)})}).then(function(a){var s=a,i=new FormData,r=new Date,n=r.getTime(),o=r.getFullYear(),l=r.getMonth()+1,c=r.getDate();i.append("name",e.file.name),i.append("key",s.dir+"/"+o+"/"+l+"/"+c+"/"+n+".apk"),i.append("policy",s.policy),i.append("OSSAccessKeyId",s.accessid),i.append("success_action_status",201),i.append("signature",s.signature),i.append("file",e.file,e.file.name),t.xhr.open("post",s.host,!0),t.xhr.upload.addEventListener("progress",t.progressFunction,!1),t.xhr.onload=function(){t.temp.refreshAddress=i.get("key"),t.$message({type:"success",message:"上传完成"})},t.xhr.send(i)})},progressFunction:function(e){if(e.lengthComputable){var t=Math.floor(e.loaded/e.total*100);t>100&&(t=100),this.uploadPercent=t}this.showProgress=!0},refUpload:function(){this.xhr.abort()},create:function(e){var t=this,s={versionNumber:this.temp.versionNumber,build:this.temp.build,forcedUpdate:this.temp.forcedUpdate,upgradeContent:this.temp.upgradeContent,refreshAddress:this.temp.refreshAddress};this.$refs[e].validate(function(i){if(!i){for(var r=t.$refs[e]._data.fields,n=[],o=0;o<r.length;o++)""!=r[o].validateMessage&&n.push(r[o].validateMessage);return t.$message({type:"error",message:n[0]}),!1}t.btnState=!0,a.i(p.w)(s).then(function(a){t.btnState=!1,1===a.data.code&&(t.dialogFormVisible=!1,t.resetSearch(),t.resetForm(e),t.handleFilter(),t.$message({type:"success",message:"新增成功"}))}).catch(function(e){t.btnState=!1})})},update:function(e){var t=this,s={id:this.rowId,versionNumber:this.temp.versionNumber,build:this.temp.build,forcedUpdate:this.temp.forcedUpdate,upgradeContent:this.temp.upgradeContent,refreshAddress:this.temp.refreshAddress};this.$refs[e].validate(function(i){if(!i){for(var r=t.$refs[e]._data.fields,n=[],o=0;o<r.length;o++)""!=r[o].validateMessage&&n.push(r[o].validateMessage);return t.$message({type:"error",message:n[0]}),!1}t.btnState=!0,a.i(p.s)(s).then(function(a){t.btnState=!1,1===a.data.code&&(t.resetTemp(),t.$refs[e].resetFields(),t.dialogFormVisible=!1,t.getList(),t.$message({type:"success",message:"编辑成功"}))}).catch(function(e){t.btnState=!1})})},resetForm:function(e){this.resetTemp(),this.refUpload(),this.showProgress=!1,this.uploadPercent=0,this.$refs[e].resetFields(),this.dialogFormVisible=!1},resetSearch:function(){this.search={type:"",val:"",startTime:"",endTime:""}},resetTemp:function(){this.temp={versionNumber:"",build:"",forcedUpdate:"",upgradeContent:"",refreshAddress:""}}}}},jdeu:function(e,t,a){"use strict";var s=a("woOf"),i=a.n(s),r=a("ctMr");a.n(r);t.a={bind:function(e,t){e.addEventListener("click",function(a){var s=i()({},t.value),r=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},s),n=r.ele;if(n){n.style.position="relative",n.style.overflow="hidden";var o=n.getBoundingClientRect(),l=n.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(o.width,o.height)+"px",n.appendChild(l)),r.type){case"center":l.style.top=o.height/2-l.offsetHeight/2+"px",l.style.left=o.width/2-l.offsetWidth/2+"px";break;default:l.style.top=a.pageY-o.top-l.offsetHeight/2-document.body.scrollTop+"px",l.style.left=a.pageX-o.left-l.offsetWidth/2-document.body.scrollLeft+"px"}return l.style.backgroundColor=r.color,l.className="waves-ripple z-active",!1}},!1)}}},lK3l:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"filter-container bgWhite"},[a("el-input",{staticStyle:{width:"30%","margin-right":"2%"},attrs:{placeholder:"请输入搜索内容"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.val,callback:function(t){e.search.val=t},expression:"search.val"}},[a("el-select",{staticStyle:{width:"90px"},attrs:{clearable:"",placeholder:"请选择"},slot:"prepend",model:{value:e.search.type,callback:function(t){e.search.type=t},expression:"search.type"}},e._l(e.seOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("button",{staticClass:"button-large el-icon-search btn_search",on:{click:e.handleFilter}},[e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"bgWhite"},[a("button",{staticClass:"button-small btn_pad",on:{click:e.handleCreate}},[e._v("新增")]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"正在加载",fit:"","tooltip-effect":"light","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"ID","min-width":"230",prop:"id"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"版本号",prop:"versionNumber"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"build号",prop:"build"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"强更状态",prop:"forcedUpdate"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150px",label:"更新提示语",prop:"upgradeContent"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{placement:"left",disabled:t.row.upgradeContent.length<5,content:t.row.upgradeContent}},[a("div",{staticClass:"tool"},[e._v(e._s(t.row.upgradeContent))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150px",label:"更新地址",prop:"refreshAddress"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{placement:"left",disabled:t.row.refreshAddress.length<5,content:t.row.refreshAddress}},[a("div",{staticClass:"tool"},[e._v(e._s(t.row.refreshAddress))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"创建时间",prop:"createDate"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"更新时间",prop:"updateDate"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.index?a("el-button",{staticClass:"el-icon-delete ceshi3",on:{click:function(a){e.handleDelete(t.row)}}}):e._e()]}}])})],1),e._v(" "),e.listLoading?e._e():a("div",{staticClass:"pagination-container clearfix"},[a("el-pagination",{staticClass:"fr mt20",attrs:{"current-page":e.listQuery.page,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{staticClass:"diatable",attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"temp",staticClass:"small-space dia_form",attrs:{rules:e.rules,model:e.temp,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"版本号:",prop:"versionNumber"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入1-15位的版本号"},model:{value:e.temp.versionNumber,callback:function(t){e.temp.versionNumber="string"==typeof t?t.trim():t},expression:"temp.versionNumber"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"build号:",prop:"build"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入1-15位build号"},model:{value:e.temp.build,callback:function(t){e.temp.build="string"==typeof t?t.trim():t},expression:"temp.build"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"强更状态:",prop:"forcedUpdate"}},[a("el-radio",{attrs:{label:"yes"},model:{value:e.temp.forcedUpdate,callback:function(t){e.temp.forcedUpdate=t},expression:"temp.forcedUpdate"}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:"no"},model:{value:e.temp.forcedUpdate,callback:function(t){e.temp.forcedUpdate=t},expression:"temp.forcedUpdate"}},[e._v("否")])],1),e._v(" "),a("el-form-item",{attrs:{label:"更新提示语:",prop:"upgradeContent"}},[a("el-input",{staticClass:"form_item",attrs:{type:"textarea",placeholder:"请输入不超过200位的提示语"},model:{value:e.temp.upgradeContent,callback:function(t){e.temp.upgradeContent="string"==typeof t?t.trim():t},expression:"temp.upgradeContent"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"更新地址:",prop:"refreshAddress"}},[a("el-input",{attrs:{placeholder:"请输入更新地址"},model:{value:e.temp.refreshAddress,callback:function(t){e.temp.refreshAddress="string"==typeof t?t.trim():t},expression:"temp.refreshAddress"}}),e._v(" "),a("p",{staticStyle:{"font-size":"12px",color:"#8391a5"}},[e._v("*上传安装包后会自动生成更新地址")]),e._v(" "),a("el-upload",{attrs:{action:"http://openservice.oss-cn-beijing.aliyuncs.com","list-type":"text","file-list":e.fileList,"before-upload":e.beforeAvatarUpload,"http-request":e.Upload,"show-file-list":!1}},[a("div",{staticClass:"btn_upload"},[e._v("上传安装包")])]),e._v(" "),a("el-progress",{directives:[{name:"show",rawName:"v-show",value:e.showProgress,expression:"showProgress"}],attrs:{"text-inside":!0,"stroke-width":15,percentage:e.uploadPercent}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},["update"==e.dialogStatus?a("button",{staticClass:"button-large",attrs:{loading:!0,disabled:e.btnState},on:{click:function(t){e.update("temp")}}},[e._v("保 存")]):a("button",{staticClass:"button-large",attrs:{loading:!0,disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1)],1)])])},i=[],r={render:s,staticRenderFns:i};t.a=r},mClu:function(e,t,a){var s=a("kM2E");s(s.S+s.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},xT6B:function(e,t,a){"use strict";function s(e,t){for(var a=t-(e+"").length,s=0;s<a;s++)e="0"+e;return e}var i=/([yMdhsm])(\1*)/g;t.a={getQueryStringByName:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(t),s="";return null!=a&&(s=a[2]),t=null,a=null,null==s||""===s||"undefined"===s?"":s},formatDate:{format:function(e,t){return t=t||"yyyy-MM-dd",t.replace(i,function(t){switch(t.charAt(0)){case"y":return s(e.getFullYear(),t.length);case"M":return s(e.getMonth()+1,t.length);case"d":return s(e.getDate(),t.length);case"w":return e.getDay()+1;case"h":return s(e.getHours(),t.length);case"m":return s(e.getMinutes(),t.length);case"s":return s(e.getSeconds(),t.length)}})},parse:function(e,t){var a=t.match(i),s=e.match(/(\d)+/g);if(a.length===s.length){for(var r=new Date(1970,0,1),n=0;n<a.length;n++){var o=parseInt(s[n]);switch(a[n].charAt(0)){case"y":r.setFullYear(o);break;case"M":r.setMonth(o-1);break;case"d":r.setDate(o);break;case"h":r.setHours(o);break;case"m":r.setMinutes(o);break;case"s":r.setSeconds(o)}}return r}return null}}}}});