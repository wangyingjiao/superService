webpackJsonp([5],{"0mb+":function(e,t,a){t=e.exports=a("acE3")(!1),t.push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},"0xDb":function(e,t,a){"use strict";function s(e,t){if(0===arguments.length)return null;var a=t||"{y}-{m}-{d} {h}:{i}:{s}",s=void 0;"object"===(void 0===e?"undefined":o()(e))?s=e:(10===(""+e).length&&(e=1e3*parseInt(e)),s=new Date(e));var i={y:s.getFullYear(),m:s.getMonth()+1,d:s.getDate(),h:s.getHours(),i:s.getMinutes(),s:s.getSeconds(),a:s.getDay()};return a.replace(/{(y|m|d|h|i|s|a)+}/g,function(e,t){var a=i[t];return"a"===t?["一","二","三","四","五","六","日"][a-1]:(e.length>0&&a<10&&(a="0"+a),a||0)})}t.a=s;var i=a("hRKE"),o=a.n(i)},KBze:function(e,t,a){t=e.exports=a("acE3")(!1),t.push([e.i,".checkRightBox[data-v-0983d520]{border:1px solid #dcdcdc;padding:10px}.checkAllBox[data-v-0983d520]{padding:10px 0}.checkBox1[data-v-0983d520]{padding:10px 0;border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc}.checkBox2[data-v-0983d520]{padding:10px 0}.checkBox3[data-v-0983d520]{padding:10px 0;border-top:1px solid #dcdcdc}.bgWhite[data-v-0983d520]{background-color:#fff;padding:20px}.btn_pad[data-v-0983d520]{margin:0 0 20px 20px}.btn_right[data-v-0983d520]{margin-top:3px;float:right;width:75px}.mapButton[data-v-0983d520]{width:80px;height:25px;line-height:25px;color:#fff;text-align:center;font-size:12px;border:none;border-radius:0;outline:none;background:#4c70e8;cursor:pointer}.mapButton[data-v-0983d520]:hover{background:#6d8dfc}.mapWrap[data-v-0983d520]{width:70%;height:500px;float:left}.buttonWrap[data-v-0983d520]{position:absolute;z-index:9999;bottom:20%;right:35%}.pickerBox[data-v-0983d520]{float:left;width:30%;height:500px;background:#fff;border-left:1px dashed #ccc;font-size:12px}.headerWrap[data-v-0983d520]{border-bottom:1px dashed #ccc;padding:10px 5px}.overlay-number[data-v-0983d520]{display:inline-block;width:30px;text-align:center;color:red}.bottomContent[data-v-0983d520]{padding:20px 5px}.el-table th>.cell[data-v-0983d520]{font-size:12px}.pickerInput[data-v-0983d520]{width:150px;padding:5px}.masterForm[data-v-0983d520]{width:90%;margin:0 auto}.scrollBox[data-v-0983d520]{height:400px;overflow-y:scroll;overflow-x:hidden}.overheidden[data-v-0983d520]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",""])},WLEV:function(e,t,a){"use strict";function s(e,t,a){return b.a.post("/apiservice/a/service/station/serviceStation/listData?pageNo="+t+"&pageSize="+a,e)}function i(e){return b.a.post("/apiservice/a/service/station/serviceStation/saveData",e)}function o(e){return b.a.post("/apiservice/a/service/station/serviceStation/upData",e)}function r(e){return b.a.post("/apiservice/a/service/station/serviceStation/deleteStation",e)}function n(e){return b.a.post("/apiservice/a/service/station/serviceStation/getManager",e)}function l(e){return b.a.post("/apiservice/a/service/station/serviceStation/setManager",e)}function c(e,t,a){return b.a.post("/apiservice/a/sys/organization/listData?pageNo="+t+"&pageSize="+a,e)}function d(e){return b.a.post("/apiservice/a/sys/organization/saveData",e)}function p(e){return b.a.post("/apiservice/a/sys/organization/formData",e)}function u(e){return b.a.post("/apiservice/a/sys/organization/upData",e)}function m(e){return b.a.post("/apiservice/a/service/station/serviceStation/getStoreList",e)}function f(e){return b.a.post("/apiservice/a/service/station/serviceStation/saveStationStore",e)}function h(e){return b.a.post("/apiservice/a/sys/organization/getEShopByCode",e)}function g(e){return b.a.post("/apiservice/a/sys/organization/deleteEshop",e)}t.b=s,t.f=i,t.i=o,t.e=r,t.c=n,t.h=l,t.a=c,t.m=d,t.j=p,t.n=u,t.d=m,t.g=f,t.k=h,t.l=g;var b=a("Vo7i")},XlHe:function(e,t,a){"use strict";var s,i=a("a3Yh"),o=a.n(i),r=a("WLEV"),n=a("cAgV");a("0xDb");t.a={name:"station",directives:{waves:n.a},data:function(){var e,t=function(e,t,a){if(!t)return a(new Error("电话号码不能为空"));/^1[3|4|5|6|7|8|9][0-9]\d{8}$|^0\d{2,3}-?\d{7,8}$/.test(t)?a():a(new Error("号码格式不正确！"))};return e={btnShow:JSON.parse(localStorage.getItem("btn")),btnState:!1,list:[],total:null,listLoading:!0,listQuery:{page:1,limit:6},pageNumber:1,pageSize:10},o()(e,"total",0),o()(e,"search",{name:"",cityCode:""}),o()(e,"rowInfo",{id:"",masterId:"",rangeType:"",serviceAreaType:"",storeList:[],servicePoint:""}),o()(e,"temp",{name:"",type:"",address:"",areaCodes:[],phone:"",isUseable:""}),o()(e,"tempStore",{tree:[]}),o()(e,"tempMaster",{master:""}),o()(e,"storeTree",[]),o()(e,"defaultProps",{children:"children",label:"storeName"}),o()(e,"importanceOptions",[]),o()(e,"stationType",[]),o()(e,"stationState",[{id:"yes",value:"启用"},{id:"no",value:"停用"}]),o()(e,"dialogFormVisible",!1),o()(e,"dialogMasterVisible",!1),o()(e,"dialogStoreVisible",!1),o()(e,"dialogStatus",""),o()(e,"textMap",{update:"编辑服务站",create:"新增服务站"}),o()(e,"tableKey",0),o()(e,"master",[]),o()(e,"rules",{name:[{required:!0,message:"请输入 2 到 15 位的服务站名称",trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],type:[{required:!0,message:"服务站类型不能为空，默认直营",trigger:"change"}],areaCodes:[{required:!0,type:"array",message:"所在区域不能为空",trigger:"change"}],address:[{required:!0,message:"请输入 6 到 100 位的详细地址",trigger:"blur"},{min:6,max:100,message:"长度在 6 到 100 个字符",trigger:"blur"}],phone:[{required:!0,validator:t,trigger:"blur"}]}),o()(e,"rulesMaster",{master:[{required:!0,message:"站长不能为空",trigger:"change"}]}),e},computed:{areaOptions:function(){return this.$store.state.user.area}},filters:{statusFilter:function(e){return{published:"success",draft:"gray",deleted:"danger"}[e]}},created:function(){this.getList();var e=a("fIj0");this.stationType=e.service_station_type},methods:{loadingClick:function(){s=this.$loading({lock:!0,spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)",target:document.querySelector(".el-dialog__body")})},getList:function(){var e=this;this.listLoading=!0;var t={name:this.search.name,cityCode:this.search.cityCode};a.i(r.b)(t,this.pageNumber,this.pageSize).then(function(t){if(e.total=t.data.data.count,e.list=t.data.data.list,e.pageNumber=t.data.data.pageNo,e.pageSize=t.data.data.pageSize,e.listQuery.page=t.data.data.pageNo,e.rowInfo.id="",void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.listLoading=!1}).catch(function(){e.listLoading=!1})},handleFilter:function(){this.pageNumber=1,this.listQuery.page=1,this.getList()},handleSetMaster:function(){var e=this;if(""==this.rowInfo.id)this.$message.error("您未选择任何操作对象，请选择一行数据");else{this.listLoading=!0;var t={id:this.rowInfo.id};a.i(r.c)(t).then(function(t){1==t.data.code&&(e.master=t.data.data,e.rowInfo.masterId?e.tempMaster.master=e.rowInfo.masterId:e.tempMaster.master="",e.dialogMasterVisible=!0,e.listLoading=!1)}).catch(function(t){e.listLoading=!1})}},handleSetRange:function(){var e=this;""==this.rowInfo.id?this.$message.error("您未选择任何操作对象，请选择一行数据"):(this.listLoading=!1,"store"==this.rowInfo.serviceAreaType&&(this.listLoading=!0,a.i(r.d)({stationId:this.rowInfo.id}).then(function(t){1==t.data.code&&(e.listLoading=!1,e.storeTree=t.data.data,e.dialogStoreVisible=!0,e.$nextTick(function(){e.$refs.domTree.setCheckedKeys(e.rowInfo.storeList)}))})))},handleSizeChange:function(e){this.listQuery.page=1,this.pageNumber=1,this.pageSize=e,this.getList()},handleCurrentChange:function(e){this.pageNumber=e,this.getList()},resetForm:function(e){this.dialogFormVisible=!1,this.resetTemp(),this.$refs[e].resetFields()},rowClick:function(e,t,a){this.rowInfo.serviceAreaType=e.organ.scopeType,this.rowInfo.id=e.id,void 0==e.user?this.rowInfo.masterId="":this.rowInfo.masterId=e.user.id,void 0!=e.storeList?this.rowInfo.storeList=e.storeList:this.rowInfo.storeList=[],void 0!=e.servicePoint?this.rowInfo.servicePoint=e.servicePoint:this.rowInfo.servicePoint=""},handleCreate:function(){this.dialogStatus="create",this.dialogFormVisible=!0,this.temp.isUseable="yes",this.temp.type="self"},handleUpdate:function(e){this.temp={id:e.id,name:e.name,type:e.type,address:e.address,areaCodes:[e.provinceCode,e.cityCode,e.areaCode],phone:e.phone,isUseable:e.isUseable},this.dialogStatus="update",this.dialogFormVisible=!0},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1}).then(function(){var s={id:e.id};a.i(r.e)(s).then(function(e){1===e.data.code&&(t.$message({type:"success",message:"删除成功!"}),t.getList())}).catch(function(){t.$message({type:"error",message:"请稍后再试"})})}).catch(function(){t.$message({type:"warning",message:"已取消删除"})})},create:function(e){var t=this,i={name:this.temp.name,type:this.temp.type,address:this.temp.address,provinceCode:this.temp.areaCodes[0],cityCode:this.temp.areaCodes[1],areaCode:this.temp.areaCodes[2],phone:this.temp.phone,isUseable:this.temp.isUseable};this.$refs[e].validate(function(o){if(!o){for(var n=t.$refs[e]._data.fields,l=[],c=0;c<n.length;c++)""!=n[c].validateMessage&&l.push(n[c].validateMessage);return t.$message({type:"error",message:l[0]}),!1}t.loadingClick(),t.btnState=!0,a.i(r.f)(i).then(function(a){t.btnState=!1,1===a.data.code?(s.close(),t.resetTemp(),t.$refs[e].resetFields(),t.$message({type:"success",message:"添加成功"}),t.search.name="",t.search.cityCode="",t.handleFilter(),t.dialogFormVisible=!1):s.close()}).catch(function(){s.close(),t.btnState=!1})})},createStore:function(){var e=this;this.loadingClick();var t={id:this.rowInfo.id,storeList:this.$refs.domTree.getCheckedKeys(!0)};this.btnState=!0,a.i(r.g)(t).then(function(t){if(setTimeout(function(){e.btnState=!1},1e3),1==t.data.code){s.close(),e.dialogStoreVisible=!1,e.$refs.domTree.setCheckedKeys([]),e.$message({type:"success",message:"保存成功!"});var i={name:e.search.name,cityCode:e.search.cityCode};a.i(r.b)(i,e.pageNumber,e.pageSize).then(function(t){if(e.rowInfo.id="",e.list=t.data.data.list,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.total=t.data.data.count,e.listLoading=!1})}else s.close()}).catch(function(t){s.close(),e.btnState=!1}),this.tempStore.tree=[]},createMaster:function(e){var t=this,i={id:this.rowInfo.id,userId:this.tempMaster.master};this.$refs[e].validate(function(o){if(!o){for(var n=t.$refs[e]._data.fields,l=[],c=0;c<n.length;c++)""!=n[c].validateMessage&&l.push(n[c].validateMessage);return t.$message({type:"error",message:l[0]}),!1}t.loadingClick(),t.btnState=!0,a.i(r.h)(i).then(function(a){t.btnState=!1,1==a.data.code?(t.$message({type:"success",message:"设置成功"}),s.close(),t.tempMaster.master="",t.$refs[e].resetFields(),t.getList(),t.dialogMasterVisible=!1):s.close()}).catch(function(){s.close(),t.btnState=!1})})},update:function(e){var t=this,i={id:this.rowInfo.id,name:this.temp.name,type:this.temp.type,address:this.temp.address,provinceCode:this.temp.areaCodes[0],cityCode:this.temp.areaCodes[1],areaCode:this.temp.areaCodes[2],phone:this.temp.phone,isUseable:this.temp.isUseable};this.$refs[e].validate(function(o){if(!o){for(var n=t.$refs[e]._data.fields,l=[],c=0;c<n.length;c++)""!=n[c].validateMessage&&l.push(n[c].validateMessage);return t.$message({type:"error",message:l[0]}),!1}t.loadingClick(),t.btnState=!0,a.i(r.i)(i).then(function(a){t.btnState=!1,1===a.data.code?(t.resetTemp(),t.$refs[e].resetFields(),t.$message({type:"success",message:"修改成功"}),t.getList(),t.dialogFormVisible=!1,s.close()):s.close()}).catch(function(e){s.close(),t.btnState=!1})})},resetTemp:function(){this.temp={name:"",type:"",address:"",areaCodes:[],phone:"",isUseable:""}},resetStore:function(){this.tempStore.tree=[],this.$refs.domTree.setCheckedKeys([]),this.dialogStoreVisible=!1},resetMaster:function(e){this.$refs[e].resetFields(),this.tempMaster.master="",this.dialogMasterVisible=!1},codeChange:function(e){this.temp.areaCodes.splice(0,this.temp.areaCodes.length)}}}},a3Yh:function(e,t,a){"use strict";t.__esModule=!0;var s=a("liLe"),i=function(e){return e&&e.__esModule?e:{default:e}}(s);t.default=function(e,t,a){return t in e?(0,i.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},adMp:function(e,t,a){a("pBXl");var s=a("UusJ").Object;e.exports=function(e,t,a){return s.defineProperty(e,t,a)}},cAgV:function(e,t,a){"use strict";var s=a("jdeu"),i=function(e){e.directive("waves",s.a)};window.Vue&&(window.waves=s.a,Vue.use(i)),s.a.install=i,t.a=s.a},ctMr:function(e,t,a){var s=a("0mb+");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("XkoO")("6876092b",s,!0)},fIj0:function(e,t){e.exports={assess_grade:{1:"一级",2:"二级",3:"三级",4:"四级",5:"五级"},del_flag:{0:"正常",1:"删除"},education:{primary:"小学",middle:"初中",special:"中专",high:"高中",junior:"大专",university:"本科及以上"},ethnic:{10:"朝鲜族",11:"满族",12:"侗族",13:"瑶族",14:"白族",15:"土家族",16:"哈尼族",17:"哈萨克族",18:"傣族",19:"黎族",20:"僳僳族",21:"佤族",22:"畲族",23:"高山族",24:"拉祜族",25:"水族",26:"东乡族",27:"纳西族",28:"景颇族",29:"柯尔克孜族",30:"土族",31:"达斡尔族",32:"仫佬族",33:"羌族",34:"布朗族",35:"撒拉族",36:"毛难族",37:"仡佬族",38:"锡伯族",39:"阿昌族",40:"普米族",41:"塔吉克族",42:"怒族",43:"乌孜别克族",44:"俄罗斯族",45:"鄂温克族",46:"崩龙族",47:"保安族",48:"裕固族",49:"京族",50:"塔塔尔族",51:"独龙族",52:"鄂伦春族",53:"赫哲族",54:"门巴族",55:"珞巴族",56:"基诺族","01":"汉族","09":"布依族","07":"彝族","02":"蒙古族","04":"藏族","03":"回族","06":"苗族","05":"维吾尔族","08":"壮族"},job_natrue:{full_time:"全职",part_time:"兼职"},job_status:{online:"在岗",leave:"离岗"},matrimony:{unmarried:"未婚",married:"已婚",divorce:"离婚",widowed:"丧偶"},meterage:{house:"按居室",area:"按面积",num:"按数量"},order_majorSort:{clean:"保洁",repair:"家修"},order_source:{score:"积分商城",store:"门店",app:"app",wechat:"微信",tv:"电视",callcenter:"400呼叫中心",web:"PC"},order_status:{dispatched:"已派单",finish:"已完成",success:"已成功",waitdispatch:"待派单",cancel:"已取消",whole:"全部"},order_type:{common:"普通订单",group_split_yes:"组合并拆单",group_split_no:"组合不拆单"},pay_method:{online:"在线",offline:"货到付款"},pay_platform:{cash:"现金",wx_pub_qr:"微信扫码",alipay:"支付宝",balance:"余额",alipay_qr:"支付宝扫码",wx:"微信",pos:"银行卡"},pay_status:{payed:"已支付",waitpay:"待支付"},cancel_type:{customer:"客户来电取消",tech:"无可派技师",other:"其它原因"},relation:{spouse:"夫妻",parent:"父母",children:"子女",siblings:"兄弟姐妹",relative:"亲戚"},return_status:{refunded:"退款成功",failure:"退款失败",cancel:"已取消",refunding:"申请退款中"},service_area_type:{map:"地图",store:"门店"},service_station_type:{self:"直营",join:"加盟"},service_status:{wait_service:"待服务",started:"已上门",finish:"已完成",cancel:"已取消"},ser_sort:{clean:"保洁",repair:"家修",all:"全部"},sex:{male:"男",female:"女"},source:{own:"本机构",other:"第三方"},sys_log_type:{visit:"接入日志",error:"异常日志"},tech_status:{1:"派单",2:"未派单"},work_time:{0:"1年以下",1:"1年",2:"2年",3:"3年",4:"4年",5:"5年",6:"6年",7:"7年",8:"8年",9:"9年",10:"10年",11:"10年以上"},yes_no:{yes:"是",no:"否"},send_type:{save_order:"更新订单信息",del_goods:"删除商品",save_goods:"保存商品"},butt_status:{butt_butt:"对接中",butt_success:"对接成功",butt_fail:"对接失败",remove_fail:"解除失败"},dock_platform:{select:"请选择",gasq:"国安社区"}}},jDzE:function(e,t,a){var s=a("KBze");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("XkoO")("3bcdbbcd",s,!0)},jdeu:function(e,t,a){"use strict";var s=a("aA9S"),i=a.n(s),o=a("ctMr");a.n(o);t.a={bind:function(e,t){e.addEventListener("click",function(a){var s=i()({},t.value),o=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},s),r=o.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var n=r.getBoundingClientRect(),l=r.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(n.width,n.height)+"px",r.appendChild(l)),o.type){case"center":l.style.top=n.height/2-l.offsetHeight/2+"px",l.style.left=n.width/2-l.offsetWidth/2+"px";break;default:l.style.top=a.pageY-n.top-l.offsetHeight/2-document.body.scrollTop+"px",l.style.left=a.pageX-n.left-l.offsetWidth/2-document.body.scrollLeft+"px"}return l.style.backgroundColor=o.color,l.className="waves-ripple z-active",!1}},!1)}}},liLe:function(e,t,a){e.exports={default:a("adMp"),__esModule:!0}},o80d:function(e,t,a){"use strict";function s(e){a("jDzE")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("XlHe"),o=a("q/0R"),r=a("J0+h"),n=s,l=r(i.a,o.a,n,"data-v-0983d520",null);t.default=l.exports},pBXl:function(e,t,a){var s=a("MITN");s(s.S+s.F*!a("M7ni"),"Object",{defineProperty:a("qRYU").f})},"q/0R":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"filter-container bgWhite"},[a("el-input",{staticClass:"search",attrs:{placeholder:"请输入搜索站点名"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.name,callback:function(t){e.search.name=t},expression:"search.name"}}),e._v(" "),a("el-select",{staticClass:"search",attrs:{filterable:"",clearable:"",placeholder:"请选择城市"},model:{value:e.search.cityCode,callback:function(t){e.search.cityCode=t},expression:"search.cityCode"}},e._l(e.areaOptions,function(t,s){return a("el-option-group",{key:t.value,attrs:{label:t.label}},e._l(t.children,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))})),e._v(" "),a("button",{staticClass:"button-large el-icon-search btn_search btn-color",on:{click:e.handleFilter}},[e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"bgWhite"},[e.btnShow.indexOf("station_insert")>=0?a("button",{staticClass:"button-small btn_pad btn-color",on:{click:e.handleCreate}},[e._v("新增")]):e._e(),e._v(" "),e.btnShow.indexOf("station_scope")>=0?a("button",{staticClass:"button-small-fourth btn_pad btn-color",staticStyle:{width:"80px"},on:{click:e.handleSetRange}},[e._v("设置范围")]):e._e(),e._v(" "),e.btnShow.indexOf("station_manager")>=0?a("button",{staticClass:"button-small-fourth btn_pad btn-color",staticStyle:{width:"80px"},on:{click:e.handleSetMaster}},[e._v("设置站长")]):e._e(),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{id:"tableColor",data:e.list,fit:"","highlight-current-row":"","element-loading-text":"正在加载"},on:{"row-click":e.rowClick}},[a("el-table-column",{attrs:{align:"center",label:"编号",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"服务站名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{placement:"left",disabled:t.row.name.length<5,content:t.row.name}},[a("div",{staticClass:"overheidden"},[e._v(e._s(t.row.name))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"服务站类型",align:"center",prop:"type"},scopedSlots:e._u([{key:"default",fn:function(t){return["join"==t.row.type?a("span",[e._v("加盟")]):e._e(),e._v(" "),"self"==t.row.type?a("span",[e._v("直营")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"站长",align:"center",prop:"user.name"}}),e._v(" "),a("el-table-column",{attrs:{label:"所属城市",align:"center",prop:"cityName"}}),e._v(" "),a("el-table-column",{attrs:{label:"服务站电话",align:"center",prop:"phone"}}),e._v(" "),a("el-table-column",{attrs:{label:"员工数量",align:"center",prop:"employees"}}),e._v(" "),a("el-table-column",{attrs:{label:"技师数量",align:"center",prop:"techNum"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态",prop:"isUseable"},scopedSlots:e._u([{key:"default",fn:function(t){return["yes"==t.row.isUseable?a("span",[e._v("启用")]):a("span",[e._v("停用")])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.btnShow.indexOf("station_update")>=0?a("el-button",{staticClass:"el-icon-edit ceshi3",on:{click:function(a){e.handleUpdate(t.row)}}}):e._e(),e._v(" "),e.btnShow.indexOf("station_delete")>=0?a("el-button",{staticClass:"el-icon-delete ceshi3",on:{click:function(a){e.handleDelete(t.row)}}}):e._e()]}}])})],1),e._v(" "),e.listLoading?e._e():a("div",{staticClass:"pagination-container clearfix"},[a("el-pagination",{staticClass:"fr mt20",attrs:{"current-page":e.listQuery.page,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1,id:"diatable"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"temp",staticClass:"small-space dia_form",attrs:{model:e.temp,rules:e.rules,"label-position":"left","label-width":"160px"}},[a("el-form-item",{attrs:{label:"服务站名称:",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入2-15位的服务站名称"},model:{value:e.temp.name,callback:function(t){e.temp.name="string"==typeof t?t.trim():t},expression:"temp.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"服务站类型:",prop:"type"}},[a("el-select",{staticClass:"form_item",model:{value:e.temp.type,callback:function(t){e.temp.type=t},expression:"temp.type"}},e._l(e.stationType,function(e,t,s){return a("el-option",{key:s,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"所在区域:",prop:"areaCodes"}},[a("el-cascader",{staticClass:"form_item",attrs:{options:e.areaOptions,"show-all-levels":!0},on:{"active-item-change":e.codeChange},model:{value:e.temp.areaCodes,callback:function(t){e.temp.areaCodes=t},expression:"temp.areaCodes"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"详细地址:",prop:"address"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入6-100位的详细地址"},model:{value:e.temp.address,callback:function(t){e.temp.address="string"==typeof t?t.trim():t},expression:"temp.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"服务站电话:",prop:"phone"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"可选格式：11位手机号、座机（区号-电话号码）"},model:{value:e.temp.phone,callback:function(t){e.temp.phone=t},expression:"temp.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态:",prop:"isUseable"}},[a("el-select",{staticClass:"form_item",model:{value:e.temp.isUseable,callback:function(t){e.temp.isUseable=t},expression:"temp.isUseable"}},e._l(e.stationState,function(e){return a("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})}))],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},["update"==e.dialogStatus?a("button",{staticClass:"button-large btn-color",attrs:{disabled:e.btnState},on:{click:function(t){e.update("temp")}}},[e._v("保 存")]):a("button",{staticClass:"button-large btn-color",attrs:{disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel btn-color-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1),e._v(" "),a("el-dialog",{attrs:{title:"设置站长","show-close":!1,size:"tiny","close-on-click-modal":!1,"close-on-press-escape":!1,visible:e.dialogMasterVisible},on:{"update:visible":function(t){e.dialogMasterVisible=t}}},[a("el-form",{ref:"tempMaster",staticClass:"masterForm",attrs:{"label-width":"100px",rules:e.rulesMaster,model:e.tempMaster}},[a("el-form-item",{attrs:{label:"服务站长:",prop:"master"}},[a("el-select",{staticClass:"form_item",attrs:{filterable:""},model:{value:e.tempMaster.master,callback:function(t){e.tempMaster.master=t},expression:"tempMaster.master"}},e._l(e.master,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},[a("button",{staticClass:"button-large btn-color",attrs:{disabled:e.btnState},on:{click:function(t){e.createMaster("tempMaster")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel btn-color-cancel",on:{click:function(t){e.resetMaster("tempMaster")}}},[e._v("取 消")])])],1),e._v(" "),a("el-dialog",{attrs:{title:"门店范围","show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1,visible:e.dialogStoreVisible},on:{"update:visible":function(t){e.dialogStoreVisible=t}}},[a("el-form",{staticClass:"dia_form",attrs:{model:e.tempStore,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"设置门店:"}},[a("el-tree",{ref:"domTree",staticClass:"scrollBox form_item",attrs:{data:e.storeTree,"show-checkbox":"","node-key":"id",indent:40,props:e.defaultProps},model:{value:e.tempStore.tree,callback:function(t){e.tempStore.tree=t},expression:"tempStore.tree"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},[a("button",{staticClass:"button-large btn-color",attrs:{disabled:e.btnState},on:{click:function(t){e.createStore("temp")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel btn-color-cancel",on:{click:function(t){e.resetStore("temp")}}},[e._v("取 消")])])],1)],1)])])},i=[],o={render:s,staticRenderFns:i};t.a=o}});