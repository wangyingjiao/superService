webpackJsonp([5],{"/Vtj":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"filter-container bgWhite"},[a("el-input",{staticClass:"search",attrs:{placeholder:"请输入搜索登录账号"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.mobile,callback:function(t){e.search.mobile=t},expression:"search.mobile"}}),e._v(" "),a("el-input",{staticClass:"search",attrs:{placeholder:"请输入搜索的岗位名称"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.name,callback:function(t){e.search.name=t},expression:"search.name"}}),e._v(" "),a("el-select",{staticClass:"search",attrs:{filterable:"",clearable:"",placeholder:"选择机构"},on:{change:e.searchOffice},model:{value:e.search.officeId,callback:function(t){e.search.officeId=t},expression:"search.officeId"}},e._l(e.mechanismCheck,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"search",attrs:{filterable:"",clearable:"",placeholder:"选择服务站"},model:{value:e.search.stationId,callback:function(t){e.search.stationId=t},expression:"search.stationId"}},e._l(e.servicestationSearch,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("button",{staticClass:"button-large el-icon-search btn_search",on:{click:e.handleFilter}},[e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"bgWhite"},[e.btnShow.indexOf("user_insert")>=0?a("button",{staticClass:"button-small btn_pad",on:{click:e.handleCreate}},[e._v("新增")]):e._e(),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"正在加载",fit:""}},[a("el-table-column",{attrs:{align:"center",label:"编号",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"姓名",prop:"name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"登录账号",prop:"mobile"}}),e._v(" "),a("el-table-column",{attrs:{label:"岗位名称",align:"center",prop:"role.name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"服务机构",prop:"organization.name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"服务站"},scopedSlots:e._u([{key:"default",fn:function(t){return[0!=t.row.organization.id&&0==t.row.station.id?a("span",[e._v("本机构")]):a("span",[e._v(e._s(t.row.station.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{"class-name":"status-col",label:"状态",width:"100px",prop:"useable"},scopedSlots:e._u([{key:"default",fn:function(t){return["1"==t.row.useable?a("span",[e._v("可用")]):e._e(),e._v(" "),"0"==t.row.useable?a("span",[e._v("不可用")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.btnShow.indexOf("user_update")>=0?a("el-button",{staticClass:"el-icon-edit ceshi3",on:{click:function(a){e.handleUpdate(t.row)}}}):e._e(),e._v(" "),e.btnShow.indexOf("user_delete")>=0?a("el-button",{staticClass:"el-icon-delete ceshi3",on:{click:function(a){e.handleDelete(t.row)}}}):e._e()]}}])})],1),e._v(" "),e.listLoading?e._e():a("div",{staticClass:"pagination-container"},[a("el-pagination",{staticClass:"fr mt20",attrs:{"current-page":e.listQuery.page,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1,minwidth:"700px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"temp",staticClass:"small-space dia_form",attrs:{model:e.temp,"label-position":"left","label-width":"160px",rules:e.rules}},[a("el-form-item",{attrs:{label:"姓名:",prop:"name"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入2-15位的姓名"},model:{value:e.temp.name,callback:function(t){e.temp.name=t},expression:"temp.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"登录账号:",prop:"mobile"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入11位手机号"},model:{value:e.temp.mobile,callback:function(t){e.temp.mobile=t},expression:"temp.mobile"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码:",prop:"password"}},[a("el-input",{staticClass:"form_item",attrs:{type:"password",placeholder:"请使用6-20位字母、数字两种组合"},model:{value:e.temp.password,callback:function(t){e.temp.password=t},expression:"temp.password"}})],1),e._v(" "),"create"==e.dialogStatus?a("el-form-item",{attrs:{label:"确认密码:",prop:"password2"}},[a("el-input",{staticClass:"form_item",attrs:{type:"password",placeholder:"再次填写密码"},model:{value:e.temp.password2,callback:function(t){e.temp.password2=t},expression:"temp.password2"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"服务机构:",prop:"officeId"}},[a("el-select",{staticClass:"form_item",attrs:{filterable:"",placeholder:"请选择"},on:{change:e.mechChange},model:{value:e.temp.officeId,callback:function(t){e.temp.officeId=t},expression:"temp.officeId"}},e._l(e.mechanismCheck,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"服务站:",prop:"stationId"}},[a("el-select",{staticClass:"form_item",attrs:{filterable:"",placeholder:"请选择"},on:{change:e.stationChange},model:{value:e.temp.stationId,callback:function(t){e.temp.stationId=t},expression:"temp.stationId"}},e._l(e.servicestationCheck,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"选择岗位:",prop:"role"}},[a("el-select",{ref:"domSelect",staticStyle:{width:"80%"},attrs:{filterable:"",placeholder:"请选择"},model:{value:e.temp.role,callback:function(t){e.temp.role=t},expression:"temp.role"}},e._l(e.stationCheck,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("div",{staticClass:"btn_addStation",staticStyle:{width:"20%"},on:{click:e.addRole}},[e._v("新 增")])],1),e._v(" "),a("el-form-item",{attrs:{label:"可用状态:"}},[a("el-select",{staticClass:"form_item",attrs:{placeholder:"请选择"},model:{value:e.temp.useable,callback:function(t){e.temp.useable=t},expression:"temp.useable"}},e._l(e.useableCheck,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},["update"==e.dialogStatus?a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.update("temp")}}},[e._v("保 存")]):a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1),e._v(" "),a("el-dialog",{staticClass:"twoDialog diasize",attrs:{title:"新增岗位",visible:e.dialogFormStation,"append-to-body":"","show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogFormStation=t}}},[a("el-form",{ref:"temp2",staticClass:"small-space",staticStyle:{width:"100%",padding:"0 6%"},attrs:{model:e.temp2,"label-position":"left",rules:e.rules2,"label-width":"80px"}},[a("el-form-item",{attrs:{label:" 所属机构:",prop:"officeId2"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",placeholder:"请选择"},model:{value:e.temp2.officeId2,callback:function(t){e.temp2.officeId2=t},expression:"temp2.officeId2"}},e._l(e.mechanismCheck,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"岗位名称:",prop:"name"}},[a("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:"请输入2-15位的岗位名称"},model:{value:e.temp2.name,callback:function(t){e.temp2.name="string"==typeof t?t.trim():t},expression:"temp2.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"等级:",prop:"dataScope"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.temp2.dataScope,callback:function(t){e.temp2.dataScope=t},expression:"temp2.dataScope"}},e._l(e.roleLv,function(e){return a("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})})),e._v(" "),a("p",{staticStyle:{"font-size":"12px",color:"#8391a5"}},[e._v("* 十级权限最高，一级权限最低")])],1),e._v(" "),a("el-form-item",{attrs:{label:"权限:",prop:"check"}},[a("el-tree",{ref:"domTree",staticClass:"scrollBox",staticStyle:{width:"100%"},attrs:{data:e.data2,indent:30,"show-checkbox":"","node-key":"id","default-expand-all":!0,props:e.defaultProps},on:{"check-change":e.handTreechange},model:{value:e.temp2.check,callback:function(t){e.temp2.check=t},expression:"temp2.check"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},[a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.create2("temp2")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm2("temp2")}}},[e._v("取 消")])])],1)],1)])])},i=[],o={render:s,staticRenderFns:i};t.a=o},"75oU":function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".btn_right{margin-top:3px;float:right;width:75px}.btn_left{width:100px}.btn_station{background-color:#aeaeae}.checkRightBox{border:1px solid #dcdcdc;padding:10px}.checkAllBox,.checkBox1{padding:10px 0}.checkBox1{border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc}.checkBox2,.checkBox3{padding:10px 0}.checkBox3{border-top:1px solid #dcdcdc}.twoDialog{width:100%;padding:10%}.bgWhite{background-color:#fff;padding:20px}.btn_pad{margin:0 0 20px 20px}.el-table{font-size:12px}.el-table__header-wrapper{font-size:14px}.ceshi{height:25px;width:80px}.ceshi2 label{padding-left:12px}.ceshi3{font-size:14px;color:#1d85fe;border:1px solid #1d85fe;background-color:#fff}.ceshi3:hover{color:#fff;border:1px solid #3e9fff;background-color:#3e9fff}.ceshi4{color:#999;border:1px solid #b9b9b9;font-size:14px;background-color:#fff}.checkBox1 .el-checkbox,.checkBox2 .el-checkbox,.checkBox3 .el-checkbox{margin-left:0;margin-right:15px}.dialog-footer{text-align:center}.el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node,.el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node{float:left}.btn_addStation{float:right;height:36px;width:80px;background-color:#fff;border:1px solid #4c70e8;text-align:center;line-height:34px;color:#4c70e8;cursor:pointer}.scrollBox{height:400px;overflow-y:scroll;overflow-x:hidden}.diasize .el-dialog{width:70%}",""])},"9bBU":function(e,t,a){a("mClu");var s=a("FeBl").Object;e.exports=function(e,t,a){return s.defineProperty(e,t,a)}},C4MV:function(e,t,a){e.exports={default:a("9bBU"),__esModule:!0}},DJRo:function(e,t,a){var s=a("75oU");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("rjj0")("574cf508",s,!0)},IgYZ:function(e,t,a){"use strict";var s=a("bOdI"),i=a.n(s),o=a("oppB"),n=(a("Vc3t"),a("cAgV"));t.a={name:"table_demo",directives:{waves:n.a},data:function(){var e,t=this,a=function(e,a,s){"create"==t.dialogStatus?""===a?s(new Error("请输入6-20位密码")):(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(a)?s():s(new Error("密码必须由6-20位数字、字母组成")),""!==t.temp.password2&&t.$refs.temp.validateField("password2"),s()):void 0==a?s():/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(a)?s():s(new Error("密码必须由6-20位数字、字母两种组成"))},s=function(e,a,s){""===a?s(new Error("请再次输入密码")):a!==t.temp.password?s(new Error("两次输入密码不一致!")):s()},o=function(e,t,a){console.log(t,"value"),void 0==t?a():/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(t)?a():a(new Error("密码必须由6-20位数字、字母两种组成"))},n=function(e,t,a){if(!t)return a(new Error("电话号码不能为空"));/^1[3|4|5|7|8][0-9]\d{8}$/.test(t)?a():a(new Error("手机号码格式不正确！"))};return e={btnShow:JSON.parse(localStorage.getItem("btn")),btnState:!1,list:null,total:null,listLoading:!0,listQuery:{page:1,limit:10,importance:void 0,title:void 0,type:void 0,sort:"+id"},pageNumber:1,pageSize:10},i()(e,"total",1),i()(e,"search",{mobile:"",name:"",officeId:"",stationId:""}),i()(e,"mechanismCheck",[]),i()(e,"servicestationCheck",[]),i()(e,"servicestationSearch",[]),i()(e,"temp",{mobile:"",name:"",password:"",password2:"",password3:"",officeId:"",stationId:"",roles:"",useable:"1",child:{check:[]}}),i()(e,"data2",[]),i()(e,"defaultProps",{children:"subMenus",label:"name"}),i()(e,"temp2",{officeId2:"",check:[],dataScope:"",stationState:""}),i()(e,"stationState",""),i()(e,"stationCheck",[]),i()(e,"useableCheck",[{id:"1",name:"可用"},{id:"0",name:"不可用"}]),i()(e,"stationName",""),i()(e,"stationLv",[{id:"1",value:"一级"},{id:"2",value:"二级"},{id:"3",value:"三级"},{id:"4",value:"四级"},{id:"5",value:"五级"},{id:"6",value:"六级"},{id:"7",value:"七级"},{id:"8",value:"八级"},{id:"9",value:"九级"},{id:"10",value:"十级"}]),i()(e,"roleLv",[]),i()(e,"stationStateCheck",[{id:"1",name:"可用"},{id:"0",name:"不可用"}]),i()(e,"dialogFormVisible",!1),i()(e,"dialogFormStation",!1),i()(e,"dialogStatus",""),i()(e,"textMap",{update:"编辑员工",create:"新增员工"}),i()(e,"dialogPvVisible",!1),i()(e,"tableKey",0),i()(e,"isIndeterminate",!0),i()(e,"rules",{mobile:[{required:!0,validator:n,trigger:"blur"}],name:[{required:!0,message:"请输入 2 到 15 位的名称",trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],password:[{required:!0,validator:a,trigger:"blur"},{min:6,max:20,message:"密码长度6-20个字符",trigger:"blur"}],password2:[{required:!0,validator:s,trigger:"blur"}],password3:[{required:!0,validator:o,trigger:"blur"}],officeId:[{required:!0,message:"机构不能为空",trigger:"change"}],stationId:[{required:!0,message:"服务站不能为空",trigger:"change"}],role:[{required:!0,message:"岗位不能为空",trigger:"change"}]}),i()(e,"rules2",{officeId2:[{required:!0,message:"机构不能为空",trigger:"change"}],name:[{required:!0,message:"请输入 2 到 15 位的岗位名称",trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],dataScope:[{required:!0,message:"等级不能为空",trigger:"change"}],check:[{type:"array",required:!0,message:"权限不能为空",trigger:"check-change"}]}),e},filters:{statusFilter:function(e){return{published:"success",draft:"gray",deleted:"danger"}[e]}},created:function(){var e=this;this.getList(),a.i(o.a)({}).then(function(t){e.mechanismCheck=t.data.data.list}),a.i(o.b)().then(function(t){console.log(t),e.data2=t.data.data});var t=localStorage.getItem("dataScope");console.log(t,"用户等级");for(var s=0;s<t;s++)this.roleLv.push(this.stationLv[s])},methods:{getList:function(){var e=this,t={roleName:this.search.name,mobile:this.search.mobile};this.listLoading=!0,a.i(o.c)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t.data,"员工列表"),e.list=t.data.data.list,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.total=t.data.data.count,e.listLoading=!1})},handleFilter:function(){var e=this;this.listQuery.page=1,this.pageNumber=1;var t={roleName:this.search.name,mobile:this.search.mobile};t.roleName||t.mobile?(this.listLoading=!0,a.i(o.c)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t,"搜索"),1===t.data.code){if(e.list=t.data.data.list,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.total=t.data.data.count,e.listLoading=!1,e.listQuery.page=1}else e.listLoading=!1})):this.getList()},addRole:function(){this.dialogFormStation=!0,1==this.mechanismCheck.length&&(console.log(this.mechanismCheck[0].id),this.temp2.officeId2=this.mechanismCheck[0].id)},handleSizeChange:function(e){var t=this,s={roleName:this.search.name,mobile:this.search.mobile};console.log("size-change"),this.pageSize=e,this.listQuery.page=1,this.pageNumber=1,this.list=[],a.i(o.c)(s,this.pageNumber,this.pageSize).then(function(e){if(void 0!=e.data.data.list)for(var a=0;a<e.data.data.list.length;a++)e.data.data.list[a].index=a+1;t.list=e.data.data.list,t.listLoading=!1})},handleCurrentChange:function(e){var t=this;console.log(e,"current-change"),this.pageNumber=e;var s={roleName:this.search.name,mobile:this.search.mobile};this.listLoading=!0,this.list=[],a.i(o.c)(s,this.pageNumber,this.pageSize).then(function(e){if(void 0!=e.data.data.list){for(var a=0;a<e.data.data.list.length;a++)e.data.data.list[a].index=a+1;console.log(e.data.data.list,"list-------------")}t.list=e.data.data.list,t.listLoading=!1})},timeFilter:function(e){if(!e[0])return this.listQuery.start=void 0,void(this.listQuery.end=void 0);this.listQuery.start=parseInt(+e[0]/1e3),this.listQuery.end=parseInt((+e[1]+864e5)/1e3)},handleCreate:function(){this.dialogStatus="create",this.dialogFormVisible=!0,this.resetTemp()},addstation:function(){this.resetTemptwo()},handTreechange:function(e,t,a){if(console.log(e,t,a,"yyyyyyyy"),t){if(console.log("tttttttttttttttt"),["order_time","order_dispatch","order_addTech"].indexOf(e.permission)>-1)for(var s=e.parentIds.split(","),i=0;i<this.data2.length;i++)if(void 0!=this.data2[i].subMenus)for(var o=0;o<this.data2[i].subMenus.length;o++)"order"==this.data2[i].subMenus[o].permission&&(console.log(this.data2[i].subMenus[o],"成功"),this.$refs.domTree.setChecked(this.data2[i].subMenus[o].subMenus[this.data2[i].subMenus[o].subMenus.length-2].id,!0));else console.log(this.data2[i].subMenus);if(void 0==e.subMenus)for(var s=e.parentIds.split(","),i=0;i<this.data2.length;i++)if(void 0!=this.data2[i].subMenus)for(var o=0;o<this.data2[i].subMenus.length;o++)if(this.data2[i].subMenus[o].id==s[3]){var n=this.data2[i].subMenus[o].subMenus[this.data2[i].subMenus[o].subMenus.length-1];if(console.log(n.name,"vvvvvvvvvvvv"),void 0!=n.permission){var l=n.permission,r=l.substring(l.length-4,l.length);"view"==r&&this.$refs.domTree.setChecked(n.id,!0)}else console.log(0x18abef7846071c0)}}else{if(console.log("取消勾选"),console.log(this.temp2.check,"dddddddddddddd"),"order_info"==e.permission)for(var i=0;i<this.data2.length;i++)if(void 0!=this.data2[i].subMenus){console.log(e.permission,"1");for(var o=0;o<this.data2[i].subMenus.length;o++)if("order"==this.data2[i].subMenus[o].permission){console.log(e.permission,"2",this.temp2.check);for(var c=this.data2[i].subMenus[o],d=2;d<c.subMenus.length-1;d++)this.temp2.check.indexOf(c.subMenus[d].id)>-1&&(console.log(e.permission,"3"),console.log(this.data2[i].subMenus[o].subMenus[1].name,"详情权限iiiii"),this.$refs.domTree.setChecked(this.data2[i].subMenus[o].subMenus[c.subMenus.length-2].id,!0),this.temp2.check=this.$refs.domTree.getCheckedKeys())}}if("view"==e.permission.substring(e.permission.length-4,e.permission.length))for(var u=e.parentIds.split(","),i=0;i<this.data2.length;i++)if(void 0!=this.data2[i].subMenus)for(var o=0;o<this.data2[i].subMenus.length;o++)if(this.data2[i].subMenus[o].id==u[3])for(var d=0;d<this.data2[i].subMenus[o].subMenus.length-1;d++)this.temp2.check.indexOf(this.data2[i].subMenus[o].subMenus[d].id)>-1&&this.$refs.domTree.setChecked(this.data2[i].subMenus[o].subMenus[this.data2[i].subMenus[o].subMenus.length-1].id,!0)}this.temp2.check=this.$refs.domTree.getCheckedKeys()},handleUpdate:function(e){var t=this;console.log(this.temp2,"岗位信息"),this.dialogFormVisible=!0,console.log(e),this.dialogStatus="update",this.temp={id:e.id,name:e.name,mobile:e.mobile,officeId:"",stationId:e.station.id,role:e.role.id,useable:e.useable},setTimeout(function(){return t.temp.officeId=e.organization.id},30),setTimeout(function(){return t.temp.stationId=e.station.id},30),setTimeout(function(){return t.temp.role=e.role.id},30)},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){console.log(e);var s={id:e.id};a.i(o.d)(s).then(function(e){console.log(e),1===e.data.code?(t.$message({type:"success",message:"删除成功!"}),t.getList()):t.$message({type:"warning",message:e.data.data})}).catch(function(){t.$message({type:"warning",message:"删除失败"})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},stationChange:function(e){},searchOffice:function(e){var t=this;this.search.stationId="",this.servicestationSearch=[];var s={orgId:e};a.i(o.e)(s).then(function(e){console.log(e),t.servicestationSearch=e.data.data})},mechChange:function(e){var t=this;this.temp.officeId=e,this.temp.stationId="",this.temp.role="",this.servicestationCheck=[],this.stationCheck=[],console.log(e,"选中机构的id");var s={orgId:e};a.i(o.e)(s).then(function(e){console.log(e),t.servicestationCheck=e.data.data});var i={organization:{id:e}};console.log(i,"岗位参数"),a.i(o.f)(i).then(function(e){console.log(e,"岗位"),"string"!=typeof e.data.data?t.stationCheck=e.data.data:t.stationCheck=[]}).catch(function(e){console.log(e)})},getId:function(e){for(var t=0;t<this.objOptions.length;t++)if(e==this.objOptions[t].value)return this.objOptions[t].id},create:function(e){var t=this,s={mobile:this.temp.mobile,name:this.temp.name,newPassword:this.temp.password,officeId:this.temp.officeId,stationId:this.temp.stationId,roles:[this.temp.role],useable:this.temp.useable};console.log(s),this.$refs[e].validate(function(i){if(!i)return!1;t.btnState=!0,a.i(o.g)(s).then(function(s){if(t.btnState=!1,console.log(s),1===s.data.code){t.dialogFormVisible=!1,t.resetTemp(),t.$refs[e].resetFields(),t.listQuery.page=1,t.pageNumber=1,t.search.mobile="",t.search.name="";var i={};a.i(o.c)(i,t.pageNumber,t.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;t.total=e.data.data.count,t.listLoading=!1}else t.listLoading=!1}),t.$message({type:"success",message:"新增成功"})}else t.$message({type:"error",message:s.data.data})}).catch(function(e){t.btnState=!1})})},create2:function(e){for(var t=this,s=this.$refs.domTree.getCheckedKeys(),i="",n=0;n<s.length;n++)i+=s[n]+",";var l={name:this.temp2.name,dataScope:this.temp2.dataScope,menuIds:i,useable:"1",organization:{id:this.temp2.officeId2}};console.log(l,"新增岗位"),this.$refs[e].validate(function(s){if(!s)return!1;t.btnState=!0,a.i(o.h)(l).then(function(a){t.btnState=!1,console.log(a),1===a.data.code?(t.$message({type:"success",message:"添加成功"}),a.data.data.organization.id==t.temp.officeId?(console.log("相等"),t.stationCheck.push(a.data.data),t.temp.role=a.data.data.id):console.log("不相等"),t.resetTemp2(),t.$refs[e].resetFields(),t.$refs.domTree.setCheckedKeys([]),t.dialogFormStation=!1):"string"==typeof a.data.data?t.$message({type:"error",message:a.data.data}):t.$message({type:"error",message:a.data.data[0]})}).catch(function(e){t.btnState=!1})})},update:function(e){var t=this,s=this,i={id:this.temp.id,mobile:this.temp.mobile,name:this.temp.name,newPassword:this.temp.password,officeId:this.temp.officeId,stationId:this.temp.stationId,roles:[this.temp.role],useable:this.temp.useable};console.log(i),this.$refs[e].validate(function(n){if(!n)return!1;t.btnState=!0,a.i(o.i)(i).then(function(a){console.log(a),t.btnState=!1,1===a.data.code?t.temp.id==localStorage.getItem("userId")&&void 0!=i.newPassword.length?(console.log("编辑自己密码"),t.$store.dispatch("LogOut").then(function(e){t.$message({type:"warning",message:"密码被修改 3 秒后进入登录页面！"}),t.dialogFormVisible=!1,setTimeout(function(){t.$store.state.app.visitedViews=[],s.$router.push({path:"/login"})},2e3)}).catch(function(){t.listLoading=!1})):(t.dialogFormVisible=!1,t.resetTemp(),t.$refs[e].resetFields(),t.getList(),t.$message({type:"success",message:"修改成功"})):t.$message({type:"error",message:a.data.data})}).catch(function(e){t.btnState=!1})})},resetTemp:function(){this.temp={name:"",mobile:"",password:"",password2:"",password3:"",officeId:"",stationId:"",role:"",useable:"1"}},resetTemp2:function(){this.temp2={officeId2:"",name:"",dataScope:"",check:[]}},resetForm:function(e){this.dialogFormVisible=!1,this.resetTemp(),this.$refs[e].resetFields()},resetForm2:function(e){this.temp2={officeId2:"",name:"",dataScope:"",check:[]},this.dialogFormStation=!1,this.$refs.domTree.setCheckedKeys([]),this.$refs[e].resetFields()},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"timestamp"===e?parseTime(t[e]):t[e]})})}}}},Vc3t:function(e,t,a){"use strict";function s(){var e={};return r.a.get("sign")?e=JSON.parse(r.a.get("sign")):n.a.get("/apiservice/oss/getSign").then(function(t){console.log(t.data,"签名");var a=t.data;r.a.set("sign",o()(a)),e=JSON.parse(r.a.get("sign"))}),e}t.a=s;var i=a("mvHQ"),o=a.n(i),n=a("Vo7i"),l=a("lbHh"),r=a.n(l)},XZlg:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},bOdI:function(e,t,a){"use strict";t.__esModule=!0;var s=a("C4MV"),i=function(e){return e&&e.__esModule?e:{default:e}}(s);t.default=function(e,t,a){return t in e?(0,i.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},cAgV:function(e,t,a){"use strict";var s=a("jdeu"),i=function(e){e.directive("waves",s.a)};window.Vue&&(window.waves=s.a,Vue.use(i)),s.a.install=i,t.a=s.a},ctMr:function(e,t,a){var s=a("XZlg");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("rjj0")("44fae30e",s,!0)},jdeu:function(e,t,a){"use strict";var s=a("woOf"),i=a.n(s),o=a("ctMr");a.n(o);t.a={bind:function(e,t){e.addEventListener("click",function(a){var s=i()({},t.value),o=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},s),n=o.ele;if(n){n.style.position="relative",n.style.overflow="hidden";var l=n.getBoundingClientRect(),r=n.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":(r=document.createElement("span"),r.className="waves-ripple",r.style.height=r.style.width=Math.max(l.width,l.height)+"px",n.appendChild(r)),o.type){case"center":r.style.top=l.height/2-r.offsetHeight/2+"px",r.style.left=l.width/2-r.offsetWidth/2+"px";break;default:r.style.top=a.pageY-l.top-r.offsetHeight/2-document.body.scrollTop+"px",r.style.left=a.pageX-l.left-r.offsetWidth/2-document.body.scrollLeft+"px"}return r.style.backgroundColor=o.color,r.className="waves-ripple z-active",!1}},!1)}}},mClu:function(e,t,a){var s=a("kM2E");s(s.S+s.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},oppB:function(e,t,a){"use strict";function s(e){return v.a.post("/apiservice/a/sys/user/saveData",e)}function i(e){return v.a.post("/apiservice/a/sys/user/upData",e)}function o(e,t,a){return v.a.post("/apiservice/a/sys/role/listPageData?pageNo="+t+"&pageSize="+a,e)}function n(e){return v.a.post("/apiservice/a/sys/role/listDataWithoutPermission",e)}function l(e,t,a){return v.a.post("/apiservice/a/sys/user/listData?pageNo="+t+"&pageSize="+a,e)}function r(e){return v.a.post("/apiservice/a/sys/role/saveData",e)}function c(e){return v.a.post("/apiservice/a/sys/role/upData",e)}function d(e){return v.a.post("/apiservice/a/sys/role/deleteRole",e)}function u(e){return v.a.get("/apiservice/a/sys/role/getRoleDetail?id="+e)}function p(e){return v.a.post("/apiservice/a/sys/organization/listDataAll",e)}function h(e){return v.a.post("/apiservice/a/service/station/serviceStation/listByOffice",e)}function m(){return v.a.get("/apiservice/a/sys/menu/getMenuList")}function f(e){return v.a.post("/apiservice/a/sys/user/deleteUser",e)}function g(e){return v.a.get("/apiservice/a/sys/role/chkName?id="+e.id+"&name="+e.name)}function b(e){return v.a.get("/apiservice/a/sys/role/chkNameUpdate?id="+e.id+"&name="+e.name+"&roleId="+e.roleId)}t.g=s,t.i=i,t.l=o,t.f=n,t.c=l,t.h=r,t.o=c,t.n=d,t.m=u,t.a=p,t.e=h,t.b=m,t.d=f,t.j=g,t.k=b;var v=a("Vo7i")},q7Eu:function(e,t,a){"use strict";function s(e){a("DJRo")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("IgYZ"),o=a("/Vtj"),n=a("VU/8"),l=s,r=n(i.a,o.a,l,null,null);t.default=r.exports}});