webpackJsonp([3],{"0xDb":function(e,t,a){"use strict";function i(e,t){if(0===arguments.length)return null;var a=t||"{y}-{m}-{d} {h}:{i}:{s}",i=void 0;"object"===(void 0===e?"undefined":o()(e))?i=e:(10===(""+e).length&&(e=1e3*parseInt(e)),i=new Date(e));var s={y:i.getFullYear(),m:i.getMonth()+1,d:i.getDate(),h:i.getHours(),i:i.getMinutes(),s:i.getSeconds(),a:i.getDay()};return a.replace(/{(y|m|d|h|i|s|a)+}/g,function(e,t){var a=s[t];return"a"===t?["一","二","三","四","五","六","日"][a-1]:(e.length>0&&a<10&&(a="0"+a),a||0)})}t.a=i;var s=a("pFYg"),o=a.n(s)},"2F+e":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"filter-container bgWhite"},[a("el-input",{staticClass:"search",attrs:{placeholder:"请输入搜索站点名"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.name,callback:function(t){e.search.name=t},expression:"search.name"}}),e._v(" "),a("el-select",{staticClass:"search",attrs:{filterable:"",clearable:"",placeholder:"请选择城市"},model:{value:e.search.cityCode,callback:function(t){e.search.cityCode=t},expression:"search.cityCode"}},e._l(e.areaOptions,function(t,i){return a("el-option-group",{key:t.value,attrs:{label:t.label}},e._l(t.children,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))})),e._v(" "),a("button",{staticClass:"button-large el-icon-search btn_search",on:{click:e.handleFilter}},[e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"bgWhite"},[e.btnShow.indexOf("station_insert")>=0?a("button",{staticClass:"button-small btn_pad",on:{click:e.handleCreate}},[e._v("新增")]):e._e(),e._v(" "),e.btnShow.indexOf("station_scope")>=0?a("button",{staticClass:"button-small-fourth btn_pad",staticStyle:{width:"80px"},on:{click:e.handleSetRange}},[e._v("设置范围")]):e._e(),e._v(" "),e.btnShow.indexOf("station_manager")>=0?a("button",{staticClass:"button-small-fourth btn_pad",staticStyle:{width:"80px"},on:{click:e.handleSetMaster}},[e._v("设置站长")]):e._e(),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{id:"tableColor",data:e.list,fit:"","highlight-current-row":"","element-loading-text":"正在加载"},on:{"row-click":e.rowClick}},[a("el-table-column",{attrs:{align:"center",label:"编号",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"服务站名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{placement:"left",disabled:t.row.name.length<5,content:t.row.name}},[a("div",{staticClass:"overheidden"},[e._v(e._s(t.row.name))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"服务站类型",align:"center",prop:"type"},scopedSlots:e._u([{key:"default",fn:function(t){return["join"==t.row.type?a("span",[e._v("加盟")]):e._e(),e._v(" "),"self"==t.row.type?a("span",[e._v("直营")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"站长",align:"center",prop:"user.name"}}),e._v(" "),a("el-table-column",{attrs:{label:"所属城市",align:"center",prop:"cityName"}}),e._v(" "),a("el-table-column",{attrs:{label:"服务站电话",align:"center",prop:"phone"}}),e._v(" "),a("el-table-column",{attrs:{label:"员工数量",align:"center",prop:"employees"}}),e._v(" "),a("el-table-column",{attrs:{label:"技师数量",align:"center",prop:"techNum"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态",prop:"isUseable"},scopedSlots:e._u([{key:"default",fn:function(t){return["yes"==t.row.isUseable?a("span",[e._v("启用")]):a("span",[e._v("停用")])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.btnShow.indexOf("station_update")>=0?a("el-button",{staticClass:"el-icon-edit ceshi3",on:{click:function(a){e.handleUpdate(t.row)}}}):e._e(),e._v(" "),e.btnShow.indexOf("station_delete")>=0?a("el-button",{staticClass:"el-icon-delete ceshi3",on:{click:function(a){e.handleDelete(t.row)}}}):e._e()]}}])})],1),e._v(" "),e.listLoading?e._e():a("div",{staticClass:"pagination-container"},[a("el-pagination",{staticClass:"fr mt20",attrs:{"current-page":e.listQuery.page,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{staticClass:"diatable",attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"temp",staticClass:"small-space dia_form",attrs:{model:e.temp,rules:e.rules,"label-position":"left","label-width":"160px"}},[a("el-form-item",{attrs:{label:"服务站名称:",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入2-15位的服务站名称"},model:{value:e.temp.name,callback:function(t){e.temp.name="string"==typeof t?t.trim():t},expression:"temp.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"服务站类型:",prop:"type"}},[a("el-select",{staticClass:"form_item",model:{value:e.temp.type,callback:function(t){e.temp.type=t},expression:"temp.type"}},e._l(e.stationType,function(e,t,i){return a("el-option",{key:i,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"所在区域:",prop:"areaCodes"}},[a("el-cascader",{staticClass:"form_item",attrs:{options:e.areaOptions,"show-all-levels":!0},on:{"active-item-change":e.codeChange},model:{value:e.temp.areaCodes,callback:function(t){e.temp.areaCodes=t},expression:"temp.areaCodes"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"详细地址:",prop:"address"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入6-100位的详细地址"},model:{value:e.temp.address,callback:function(t){e.temp.address="string"==typeof t?t.trim():t},expression:"temp.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"服务站电话:",prop:"phone"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"可选格式：11位手机号、座机（区号-电话号码）"},model:{value:e.temp.phone,callback:function(t){e.temp.phone=t},expression:"temp.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态:",prop:"isUseable"}},[a("el-select",{staticClass:"form_item",model:{value:e.temp.isUseable,callback:function(t){e.temp.isUseable=t},expression:"temp.isUseable"}},e._l(e.stationState,function(e){return a("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})}))],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},["update"==e.dialogStatus?a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.update("temp")}}},[e._v("保 存")]):a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1),e._v(" "),a("el-dialog",{attrs:{title:"设置站长","show-close":!1,size:"tiny","close-on-click-modal":!1,"close-on-press-escape":!1,visible:e.dialogMasterVisible},on:{"update:visible":function(t){e.dialogMasterVisible=t}}},[a("el-form",{ref:"tempMaster",staticClass:"masterForm",attrs:{"label-width":"100px",rules:e.rulesMaster,model:e.tempMaster}},[a("el-form-item",{attrs:{label:"服务站长:",prop:"master"}},[a("el-select",{staticClass:"form_item",attrs:{filterable:""},model:{value:e.tempMaster.master,callback:function(t){e.tempMaster.master=t},expression:"tempMaster.master"}},e._l(e.master,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},[a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.createMaster("tempMaster")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetMaster("tempMaster")}}},[e._v("取 消")])])],1),e._v(" "),a("el-dialog",{attrs:{title:"服务范围选择",visible:e.severSelectdialogVisible,width:"100%",size:"full","show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.severSelectdialogVisible=t}}},[a("div",{ref:"gdMap",staticClass:"mapWrap"}),e._v(" "),a("div",{staticClass:"buttonWrap"},[a("input",{ref:"polygon",staticClass:"mapButton",attrs:{type:"button",value:"绘制多边形"}}),e._v(" "),a("button",{staticClass:"mapButton",attrs:{type:"button",disabled:e.btnState},on:{click:e.saveOverlays}},[e._v("保存")]),e._v(" "),a("button",{staticClass:"mapButton",on:{click:e.closeMap}},[e._v("取消")])]),e._v(" "),a("div",{staticClass:"pickerBox"},[a("div",{staticClass:"headerWrap"},[a("h3",[e._v("服务范围信息"),e.showPromit?a("span",{staticStyle:{color:"red","margin-left":"30px"}},[e._v(e._s(e.promitInf))]):e._e()]),e._v(" "),a("div",{staticStyle:{height:"25px","line-height":"25px","margin-top":"10px"}},[a("span",{staticStyle:{display:"inline-block"}},[e._v("服务范围个数:")]),a("span",{staticClass:"overlay-number"},[e._v(e._s(e.number))]),a("span",{staticStyle:{display:"inline-block","margin-left":"20px",color:"blue",cursor:"pointer"},on:{click:e.removeOverlay}},[e._v("全部删除")])])]),e._v(" "),a("div",{staticClass:"bottomContent"},[a("p",[e._v("请输入地址:"),a("input",{ref:"pickerInput",staticClass:"pickerInput",attrs:{value:"",placeholder:"输入关键字选取地点"}})]),e._v(" "),a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"","max-height":"250"}},[a("el-table-column",{attrs:{label:"服务范围",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(t.row.name+t.row.index)+"\n                  ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"area",align:"center",width:"160",label:"面积"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"100",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"button"},on:{click:function(a){e.Delete(t.row)}}},[e._v("删除")])]}}])})],1)],1)])]),e._v(" "),a("br"),e._v(" "),a("br")]),e._v(" "),a("el-dialog",{attrs:{title:"门店范围","show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1,visible:e.dialogStoreVisible},on:{"update:visible":function(t){e.dialogStoreVisible=t}}},[a("el-form",{staticClass:"dia_form",attrs:{model:e.tempStore,"label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"设置门店:"}},[a("el-tree",{ref:"domTree",staticClass:"scrollBox form_item",attrs:{data:e.storeTree,"show-checkbox":"","node-key":"id",indent:40,props:e.defaultProps},model:{value:e.tempStore.tree,callback:function(t){e.tempStore.tree=t},expression:"tempStore.tree"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},[a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.createStore("temp")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetStore("temp")}}},[e._v("取 消")])])],1)],1)])])},s=[],o={render:i,staticRenderFns:s};t.a=o},"9bBU":function(e,t,a){a("mClu");var i=a("FeBl").Object;e.exports=function(e,t,a){return i.defineProperty(e,t,a)}},C4MV:function(e,t,a){e.exports={default:a("9bBU"),__esModule:!0}},LnlI:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".checkRightBox[data-v-29a28c32]{border:1px solid #dcdcdc;padding:10px}.checkAllBox[data-v-29a28c32]{padding:10px 0}.checkBox1[data-v-29a28c32]{padding:10px 0;border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc}.checkBox2[data-v-29a28c32]{padding:10px 0}.checkBox3[data-v-29a28c32]{padding:10px 0;border-top:1px solid #dcdcdc}.bgWhite[data-v-29a28c32]{background-color:#fff;padding:20px}.btn_pad[data-v-29a28c32]{margin:0 0 20px 20px}.btn_right[data-v-29a28c32]{margin-top:3px;float:right;width:75px}.mapButton[data-v-29a28c32]{width:80px;height:25px;line-height:25px;color:#fff;text-align:center;font-size:12px;border:none;border-radius:0;outline:none;background:#4c70e8;cursor:pointer}.mapButton[data-v-29a28c32]:hover{background:#6d8dfc}.mapWrap[data-v-29a28c32]{width:70%;height:500px;float:left}.buttonWrap[data-v-29a28c32]{position:absolute;z-index:9999;bottom:20%;right:35%}.pickerBox[data-v-29a28c32]{float:left;width:30%;height:500px;background:#fff;border-left:1px dashed #ccc;font-size:12px}.headerWrap[data-v-29a28c32]{border-bottom:1px dashed #ccc;padding:10px 5px}.overlay-number[data-v-29a28c32]{display:inline-block;width:30px;text-align:center;color:red}.bottomContent[data-v-29a28c32]{padding:20px 5px}.el-table th>.cell[data-v-29a28c32]{font-size:12px}.pickerInput[data-v-29a28c32]{width:150px;padding:5px}.masterForm[data-v-29a28c32]{width:90%;margin:0 auto}.scrollBox[data-v-29a28c32]{height:400px;overflow-y:scroll;overflow-x:hidden}.overheidden[data-v-29a28c32]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",""])},"W+0j":function(e,t,a){"use strict";var i=a("bOdI"),s=a.n(i),o=a("WLEV"),n=a("cAgV");a("0xDb");t.a={name:"station",directives:{waves:n.a},data:function(){var e,t=function(e,t,a){if(!t)return a(new Error("电话号码不能为空"));/^1[3|4|5|6|7|8|9][0-9]\d{8}$|^0\d{2,3}-?\d{7,8}$/.test(t)?a():a(new Error("号码格式不正确！"))};return e={btnShow:JSON.parse(localStorage.getItem("btn")),btnState:!1,severSelectdialogVisible:!1,inputvalue:[],myMap:{},number:"0",tableData:[],promitInf:"",showPromit:!1,list:[],total:null,listLoading:!0,listQuery:{page:1,limit:6},pageNumber:1,pageSize:10},s()(e,"total",0),s()(e,"search",{name:"",cityCode:""}),s()(e,"rowInfo",{id:"",masterId:"",rangeType:"",serviceAreaType:"",storeList:[],servicePoint:""}),s()(e,"temp",{name:"",type:"",address:"",areaCodes:[],phone:"",isUseable:""}),s()(e,"tempStore",{tree:[]}),s()(e,"tempMaster",{master:""}),s()(e,"storeTree",[]),s()(e,"defaultProps",{children:"children",label:"storeName"}),s()(e,"importanceOptions",[]),s()(e,"stationType",[]),s()(e,"stationState",[{id:"yes",value:"启用"},{id:"no",value:"停用"}]),s()(e,"dialogFormVisible",!1),s()(e,"dialogMasterVisible",!1),s()(e,"dialogStoreVisible",!1),s()(e,"dialogStatus",""),s()(e,"textMap",{update:"编辑服务站",create:"新增服务站"}),s()(e,"tableKey",0),s()(e,"master",[]),s()(e,"rules",{name:[{required:!0,message:"请输入 2 到 15 位的服务站名称",trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],type:[{required:!0,message:"服务站类型不能为空，默认直营",trigger:"change"}],areaCodes:[{required:!0,type:"array",message:"所在区域不能为空",trigger:"change"}],address:[{required:!0,message:"请输入 6 到 100 位的详细地址",trigger:"blur"},{min:6,max:100,message:"长度在 6 到 100 个字符",trigger:"blur"}],phone:[{required:!0,validator:t,trigger:"blur"}]}),s()(e,"rulesMaster",{master:[{required:!0,message:"站长不能为空",trigger:"change"}]}),e},computed:{areaOptions:function(){return this.$store.state.user.area}},filters:{statusFilter:function(e){return{published:"success",draft:"gray",deleted:"danger"}[e]}},created:function(){this.getList();var e=a("fIj0");this.stationType=e.service_station_type},methods:{getList:function(){var e=this;this.listLoading=!0;var t={name:this.search.name,cityCode:this.search.cityCode};a.i(o.b)(t,this.pageNumber,this.pageSize).then(function(t){if(e.total=t.data.data.count,e.list=t.data.data.list,e.pageNumber=t.data.data.pageNo,e.pageSize=t.data.data.pageSize,e.listQuery.page=t.data.data.pageNo,e.rowInfo.id="",void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.listLoading=!1}).catch(function(){e.listLoading=!1})},handleFilter:function(){var e=this;this.listLoading=!0,this.pageNumber=1,this.listQuery.page=1;var t={name:this.search.name,cityCode:this.search.cityCode};a.i(o.b)(t,this.pageNumber,this.pageSize).then(function(t){if(e.total=t.data.data.count,e.list=t.data.data.list,e.pageNumber=t.data.data.pageNo,e.pageSize=t.data.data.pageSize,e.listQuery.page=t.data.data.pageNo,e.rowInfo.id="",void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.listLoading=!1}).catch(function(){e.listLoading=!1})},handleSetMaster:function(){var e=this;if(""==this.rowInfo.id)this.$message.error("您未选择任何操作对象，请选择一行数据");else{this.listLoading=!0;var t={id:this.rowInfo.id};a.i(o.c)(t).then(function(t){1==t.data.code&&(e.master=t.data.data,e.rowInfo.masterId?e.tempMaster.master=e.rowInfo.masterId:e.tempMaster.master="",e.dialogMasterVisible=!0,e.listLoading=!1)}).catch(function(t){e.listLoading=!1})}},handleSetRange:function(){var e=this;""==this.rowInfo.id?this.$message.error("您未选择任何操作对象，请选择一行数据"):(this.listLoading=!1,"store"==this.rowInfo.serviceAreaType?(this.listLoading=!0,a.i(o.d)({stationId:this.rowInfo.id}).then(function(t){1==t.data.code&&(e.listLoading=!1,e.storeTree=t.data.data,e.dialogStoreVisible=!0,e.$nextTick(function(){e.$refs.domTree.setCheckedKeys(e.rowInfo.storeList)}))})):(this.severSelectdialogVisible=!0,this.$nextTick(function(){e.initMap1()})))},handleSizeChange:function(e){var t=this;this.listQuery.page=1,this.pageNumber=1,this.pageSize=e;var i={name:this.search.name,cityCode:this.search.cityCode};a.i(o.b)(i,this.pageNumber,this.pageSize).then(function(e){if(t.total=e.data.data.count,t.list=e.data.data.list,t.pageNumber=e.data.data.pageNo,t.pageSize=e.data.data.pageSize,t.rowInfo.id="",void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;t.listLoading=!1}).catch(function(){t.listLoading=!1})},handleCurrentChange:function(e){var t=this;this.pageNumber=e;var i={name:this.search.name,cityCode:this.search.cityCode};this.listLoading=!0,a.i(o.b)(i,this.pageNumber,this.pageSize).then(function(e){if(t.total=e.data.data.count,t.list=e.data.data.list,t.pageNumber=e.data.data.pageNo,t.pageSize=e.data.data.pageSize,t.rowInfo.id="",void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;t.listLoading=!1}).catch(function(){t.listLoading=!1})},resetForm:function(e){this.dialogFormVisible=!1,this.resetTemp(),this.$refs[e].resetFields()},rowClick:function(e,t,a){this.rowInfo.serviceAreaType=e.organ.scopeType,this.rowInfo.id=e.id,void 0==e.user?this.rowInfo.masterId="":this.rowInfo.masterId=e.user.id,void 0!=e.storeList?this.rowInfo.storeList=e.storeList:this.rowInfo.storeList=[],void 0!=e.servicePoint?this.rowInfo.servicePoint=e.servicePoint:this.rowInfo.servicePoint=""},handleCreate:function(){this.dialogStatus="create",this.dialogFormVisible=!0,this.temp.isUseable="yes",this.temp.type="self"},handleUpdate:function(e){this.temp={id:e.id,name:e.name,type:e.type,address:e.address,areaCodes:[e.provinceCode,e.cityCode,e.areaCode],phone:e.phone,isUseable:e.isUseable},this.dialogStatus="update",this.dialogFormVisible=!0},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1}).then(function(){var i={id:e.id};a.i(o.e)(i).then(function(e){1===e.data.code&&(t.$message({type:"success",message:"删除成功!"}),t.getList())}).catch(function(){t.$message({type:"error",message:"请稍后再试"})})}).catch(function(){t.$message({type:"warning",message:"已取消删除"})})},create:function(e){var t=this,i={name:this.temp.name,type:this.temp.type,address:this.temp.address,provinceCode:this.temp.areaCodes[0],cityCode:this.temp.areaCodes[1],areaCode:this.temp.areaCodes[2],phone:this.temp.phone,isUseable:this.temp.isUseable};this.$refs[e].validate(function(s){if(!s)return!1;t.btnState=!0,a.i(o.f)(i).then(function(a){t.btnState=!1,1===a.data.code&&(t.resetTemp(),t.$refs[e].resetFields(),t.$message({type:"success",message:"添加成功"}),t.search.name="",t.search.cityCode="",t.handleFilter(),t.dialogFormVisible=!1)}).catch(function(){t.btnState=!1})})},createStore:function(){var e=this,t={id:this.rowInfo.id,storeList:this.$refs.domTree.getCheckedKeys(!0)};this.btnState=!0,a.i(o.g)(t).then(function(t){if(setTimeout(function(){e.btnState=!1},1e3),1==t.data.code){e.dialogStoreVisible=!1,e.$refs.domTree.setCheckedKeys([]),e.$message({type:"success",message:"保存成功!"});var i={name:e.search.name,cityCode:e.search.cityCode};a.i(o.b)(i,e.pageNumber,e.pageSize).then(function(t){if(e.rowInfo.id="",e.list=t.data.data.list,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.total=t.data.data.count,e.listLoading=!1})}}).catch(function(t){e.btnState=!1}),this.tempStore.tree=[]},createMaster:function(e){var t=this,i={id:this.rowInfo.id,userId:this.tempMaster.master};this.$refs[e].validate(function(s){if(!s)return!1;t.btnState=!0,a.i(o.h)(i).then(function(a){t.btnState=!1,"1"==a.data.code&&(t.$message({type:"success",message:"设置成功"}),t.tempMaster.master="",t.$refs[e].resetFields(),t.getList(),t.dialogMasterVisible=!1)}).catch(function(){t.btnState=!1})})},update:function(e){var t=this,i={id:this.rowInfo.id,name:this.temp.name,type:this.temp.type,address:this.temp.address,provinceCode:this.temp.areaCodes[0],cityCode:this.temp.areaCodes[1],areaCode:this.temp.areaCodes[2],phone:this.temp.phone,isUseable:this.temp.isUseable};this.$refs[e].validate(function(s){if(!s)return!1;t.btnState=!0,a.i(o.i)(i).then(function(a){t.btnState=!1,1===a.data.code&&(t.resetTemp(),t.$refs[e].resetFields(),t.$message({type:"success",message:"修改成功"}),t.getList(),t.dialogFormVisible=!1)}).catch(function(e){t.btnState=!1})})},resetTemp:function(){this.temp={name:"",type:"",address:"",areaCodes:[],phone:"",isUseable:""}},resetStore:function(){this.tempStore.tree=[],this.$refs.domTree.setCheckedKeys([]),this.dialogStoreVisible=!1},resetMaster:function(e){this.$refs[e].resetFields(),this.tempMaster.master="",this.dialogMasterVisible=!1},codeChange:function(e){this.temp.areaCodes.splice(0,this.temp.areaCodes.length)},showdialog:function(){var e=this;this.severSelectdialogVisible=!0,this.$nextTick(function(){e.initMap1()})},initMap1:function(){function e(e){window.poiPicker=e;var a=new AMap.Marker,o=new AMap.InfoWindow({offset:new AMap.Pixel(0,-20)});e.on("poiPicked",function(e){var n=e.source,r=e.item,l={source:n,id:r.id,district:r.district,name:r.name,location:r.location.toString(),address:r.address};i.value=l.district+l.name,t.inputvalue.push(l.location),a.setMap(s),o.setMap(s),a.setPosition(r.location),o.setPosition(r.location)})}var t=this,a=this.$refs.gdMap,i=this.$refs.pickerInput,s=new AMap.Map(a,{center:[116.459771,39.922132],zoom:15});s.plugin(["AMap.Scale"],function(){var e=new AMap.Scale;s.addControl(e)}),s.plugin(["AMap.ToolBar"],function(){var e=new AMap.ToolBar;s.addControl(e)});var o={strokeColor:"blue",fillColor:"blue",strokeWeight:1,strokeOpacity:.1,fillOpacity:.3,strokeStyle:"solid"};if(t.myMap=s,""!=this.rowInfo.servicePoint){for(var n=this.rowInfo.servicePoint.split(" "),r=new Array,l=0;l<n.length;l++)r.push(n[l].split(","));s.panTo(r[0]);var c=new AMap.Polygon({path:r});c.setOptions(o),c.setMap(s);var d=this.myMap.getAllOverlays();d.length;0!=d.length&&t.testalert(d[0])}var p=new AMap.MouseTool(s),c=this.$refs.polygon;AMap.event.addDomListener(c,"click",function(){p.polygon(o)},!1),AMap.event.addListener(p,"draw",function(e){var a=e.obj;t.testalert(a)}),AMapUI.loadUI(["misc/PoiPicker"],function(t){e(new t({city:"北京",input:i}))})},testalert:function(e){var t="",a={};"AMap.Polygon"===e.CLASS_NAME&&(t=e.getPath(),a.type="Polygon",a.path=t,a.area=parseInt(e.getArea()/1e6*100)/100+"平方公里"),a.name="范围",a.index="",a.id=e._amap_id,this.tableData.push(a);for(var i=0;i<this.tableData.length;i++)this.tableData[i].index=i+1;this.number=this.tableData.length},removeOverlay:function(){var e=this.myMap.getAllOverlays();this.tableData=[],this.myMap.remove(e),this.number="0"},Delete:function(e){for(var t=this.myMap.getAllOverlays(),a=0;a<t.length;a++)t[a]._amap_id==e.id&&this.myMap.remove(t[a]);for(var i=0;i<this.tableData.length;i++)t[i]._amap_id==e.id&&this.tableData.del(i);this.number>0?this.number=this.number-1:this.number=0},saveOverlays:function(){var e=this;if(""==this.tableData)this.promitInf="请选择一个服务区域",this.showPromit=!0;else if(this.tableData.length>1)this.promitInf="只能选择一个服务区域",this.showPromit=!0;else{this.promitInf="",this.showPromit=!1;var t={id:this.rowInfo.id,servicePoint:this.tableData[0].path.join(" ")};this.btnState=!0,a.i(o.j)(t).then(function(t){e.btnState=!1,"1"==t.data.code?(e.$message({type:"success",message:"设置成功"}),e.rowInfo.id="",e.getList(),e.rowInfo.servicePoint="",e.tableData=[],e.inputvalue=[],e.$refs.pickerInput.value="",e.severSelectdialogVisible=!1):(e.severSelectdialogVisible=!1,e.inputvalue=[],e.$refs.pickerInput.value="")}).catch(function(t){e.btnState=!1})}},closeMap:function(){this.tableData=[],this.number="0",this.promitInf="",this.inputvalue=[],this.$refs.pickerInput.value="",this.showPromit=!1,this.severSelectdialogVisible=!1}}}},WLEV:function(e,t,a){"use strict";function i(e,t,a){return v.a.post("/apiservice/a/service/station/serviceStation/listData?pageNo="+t+"&pageSize="+a,e)}function s(e){return v.a.post("/apiservice/a/service/station/serviceStation/saveData",e)}function o(e){return v.a.post("/apiservice/a/service/station/serviceStation/upData",e)}function n(e){return v.a.post("/apiservice/a/service/station/serviceStation/deleteStation",e)}function r(e){return v.a.post("/apiservice/a/service/station/serviceStation/getManager",e)}function l(e){return v.a.post("/apiservice/a/service/station/serviceStation/setManager",e)}function c(e,t,a){return v.a.post("/apiservice/a/sys/organization/listData?pageNo="+t+"&pageSize="+a,e)}function d(e){return v.a.post("/apiservice/a/sys/organization/saveData",e)}function p(e){return v.a.post("/apiservice/a/sys/organization/formData",e)}function u(e){return v.a.post("/apiservice/a/sys/organization/upData",e)}function h(e){return v.a.post("/apiservice/a/service/station/serviceStation/getStoreList",e)}function m(e){return v.a.post("/apiservice/a/service/station/serviceStation/saveStationStore",e)}function f(e){return v.a.post("/apiservice/a/service/station/serviceStation/setScope",e)}t.b=i,t.f=s,t.i=o,t.e=n,t.c=r,t.h=l,t.a=c,t.l=d,t.k=p,t.m=u,t.d=h,t.g=m,t.j=f;var v=a("Vo7i")},WdAc:function(e,t,a){var i=a("LnlI");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("6cf50b94",i,!0)},XZlg:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},bOdI:function(e,t,a){"use strict";t.__esModule=!0;var i=a("C4MV"),s=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(e,t,a){return t in e?(0,s.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},cAgV:function(e,t,a){"use strict";var i=a("jdeu"),s=function(e){e.directive("waves",i.a)};window.Vue&&(window.waves=i.a,Vue.use(s)),i.a.install=s,t.a=i.a},ctMr:function(e,t,a){var i=a("XZlg");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("44fae30e",i,!0)},fIj0:function(e,t){e.exports={assess_grade:{1:"一级",2:"二级",3:"三级",4:"四级",5:"五级"},del_flag:{0:"正常",1:"删除"},education:{primary:"小学",middle:"初中",special:"中专",high:"高中",junior:"大专",university:"本科及以上"},ethnic:{10:"朝鲜族",11:"满族",12:"侗族",13:"瑶族",14:"白族",15:"土家族",16:"哈尼族",17:"哈萨克族",18:"傣族",19:"黎族",20:"僳僳族",21:"佤族",22:"畲族",23:"高山族",24:"拉祜族",25:"水族",26:"东乡族",27:"纳西族",28:"景颇族",29:"柯尔克孜族",30:"土族",31:"达斡尔族",32:"仫佬族",33:"羌族",34:"布朗族",35:"撒拉族",36:"毛难族",37:"仡佬族",38:"锡伯族",39:"阿昌族",40:"普米族",41:"塔吉克族",42:"怒族",43:"乌孜别克族",44:"俄罗斯族",45:"鄂温克族",46:"崩龙族",47:"保安族",48:"裕固族",49:"京族",50:"塔塔尔族",51:"独龙族",52:"鄂伦春族",53:"赫哲族",54:"门巴族",55:"珞巴族",56:"基诺族","01":"汉族","09":"布依族","07":"彝族","02":"蒙古族","04":"藏族","03":"回族","06":"苗族","05":"维吾尔族","08":"壮族"},job_natrue:{full_time:"全职",part_time:"兼职"},job_status:{online:"在岗",leave:"离岗"},matrimony:{unmarried:"未婚",married:"已婚",divorce:"离婚",widowed:"丧偶"},meterage:{house:"按居室",area:"按面积",num:"按数量"},order_majorSort:{clean:"保洁",repair:"家修"},order_source:{score:"积分商城",store:"门店",app:"app",wechat:"微信",tv:"电视",callcenter:"400呼叫中心",web:"PC"},order_status:{dispatched:"已派单",finish:"已完成",success:"已成功",waitdispatch:"待派单",cancel:"已取消",whole:"全部"},order_type:{common:"普通订单",group_split_yes:"组合并拆单",group_split_no:"组合不拆单"},pay_method:{online:"在线",offline:"货到付款"},pay_platform:{cash:"现金",wx_pub_qr:"微信扫码",alipay:"支付宝",balance:"余额",alipay_qr:"支付宝扫码",wx:"微信",pos:"银行卡"},pay_status:{payed:"已支付",waitpay:"待支付"},relation:{spouse:"夫妻",parent:"父母",children:"子女",siblings:"兄弟姐妹",relative:"亲戚"},return_status:{refunded:"退款成功",failure:"退款失败",cancel:"已取消",refunding:"申请退款中"},service_area_type:{map:"地图",store:"门店"},service_station_type:{self:"直营",join:"加盟"},service_status:{wait_service:"待服务",started:"已上门",finish:"已完成",cancel:"已取消"},ser_sort:{clean:"保洁",repair:"家修",all:"全部"},sex:{male:"男",female:"女"},source:{own:"本机构",other:"第三方"},sys_log_type:{visit:"接入日志",error:"异常日志"},tech_status:{1:"派单",2:"未派单"},work_time:{0:"1年以下",1:"1年",2:"2年",3:"3年",4:"4年",5:"5年",6:"6年",7:"7年",8:"8年",9:"9年",10:"10年",11:"10年以上"},yes_no:{yes:"是",no:"否"}}},jdeu:function(e,t,a){"use strict";var i=a("woOf"),s=a.n(i),o=a("ctMr");a.n(o);t.a={bind:function(e,t){e.addEventListener("click",function(a){var i=s()({},t.value),o=s()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),n=o.ele;if(n){n.style.position="relative",n.style.overflow="hidden";var r=n.getBoundingClientRect(),l=n.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(r.width,r.height)+"px",n.appendChild(l)),o.type){case"center":l.style.top=r.height/2-l.offsetHeight/2+"px",l.style.left=r.width/2-l.offsetWidth/2+"px";break;default:l.style.top=a.pageY-r.top-l.offsetHeight/2-document.body.scrollTop+"px",l.style.left=a.pageX-r.left-l.offsetWidth/2-document.body.scrollLeft+"px"}return l.style.backgroundColor=o.color,l.className="waves-ripple z-active",!1}},!1)}}},mClu:function(e,t,a){var i=a("kM2E");i(i.S+i.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},o80d:function(e,t,a){"use strict";function i(e){a("WdAc")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("W+0j"),o=a("2F+e"),n=a("VU/8"),r=i,l=n(s.a,o.a,r,"data-v-29a28c32",null);t.default=l.exports}});