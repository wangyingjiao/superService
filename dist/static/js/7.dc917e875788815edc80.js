webpackJsonp([7],{"/0s5":function(e,t,a){"use strict";function i(e){a("pWQp")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("oiIR"),n=a("M6/Q"),o=a("VU/8"),r=i,l=o(s.a,n.a,r,null,null);t.default=l.exports},"0xDb":function(e,t,a){"use strict";function i(e,t){if(0===arguments.length)return null;var a=t||"{y}-{m}-{d} {h}:{i}:{s}",i=void 0;"object"===(void 0===e?"undefined":n()(e))?i=e:(10===(""+e).length&&(e=1e3*parseInt(e)),i=new Date(e));var s={y:i.getFullYear(),m:i.getMonth()+1,d:i.getDate(),h:i.getHours(),i:i.getMinutes(),s:i.getSeconds(),a:i.getDay()};return a.replace(/{(y|m|d|h|i|s|a)+}/g,function(e,t){var a=s[t];return"a"===t?["一","二","三","四","五","六","日"][a-1]:(e.length>0&&a<10&&(a="0"+a),a||0)})}t.a=i;var s=a("pFYg"),n=a.n(s)},"5DwC":function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".btn_right{margin-top:3px;float:right;width:75px}.btn_left{width:100px}.checkRightBox{border:1px solid #dcdcdc;padding:10px}.checkAllBox,.checkBox1{padding:10px 0}.checkBox1{border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc}.checkBox2,.checkBox3{padding:10px 0}.checkBox3{border-top:1px solid #dcdcdc}.checkBox1 .el-checkbox,.checkBox2 .el-checkbox,.checkBox3 .el-checkbox{margin-left:0;margin-right:15px}.bgWhite{background-color:#fff;padding:20px}.btn_pad{margin:0 0 20px 20px}.treecss .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node,.treecss .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node{float:left}.ceshi{height:25px;width:80px}.ceshi3{font-size:14px;color:#1d85fe;border:1px solid #1d85fe;background-color:#fff}.dialog-footer{text-align:center}.scrollBox{height:400px;overflow-y:scroll;overflow-x:hidden}.diasize .el-dialog{width:60%}",""])},"9bBU":function(e,t,a){a("mClu");var i=a("FeBl").Object;e.exports=function(e,t,a){return i.defineProperty(e,t,a)}},C4MV:function(e,t,a){e.exports={default:a("9bBU"),__esModule:!0}},"M6/Q":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"filter-container bgWhite"},[a("el-input",{staticClass:"search",attrs:{placeholder:"请输入搜索的岗位名称"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.name,callback:function(t){e.search.name=t},expression:"search.name"}}),e._v(" "),a("el-select",{staticClass:"search",attrs:{filterable:"",clearable:"",placeholder:"选择机构"},model:{value:e.search.officeId,callback:function(t){e.search.officeId=t},expression:"search.officeId"}},e._l(e.officeIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("button",{staticClass:"button-large el-icon-search btn_search",on:{click:e.handleFilter}},[e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"bgWhite"},[-1!=e.btnShow.indexOf("role_insert")?a("button",{staticClass:"button-small btn_pad",on:{click:e.handleCreate}},[e._v("新增")]):e._e(),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"正在加载",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"编号",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"岗位名称",align:"center",prop:"name"}}),e._v(" "),a("el-table-column",{attrs:{label:"机构名称",align:"center",prop:"organization.name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[-1!=e.btnShow.indexOf("role_update")?a("el-button",{staticClass:"el-icon-edit ceshi3",on:{click:function(a){e.handleUpdate(t.row)}}}):e._e(),e._v(" "),-1!=e.btnShow.indexOf("role_delete")?a("el-button",{staticClass:"el-icon-delete ceshi3",on:{click:function(a){e.handleDelete(t.row)}}}):e._e()]}}])})],1),e._v(" "),e.listLoading?e._e():a("div",{staticClass:"pagination-container"},[a("el-pagination",{staticClass:"fr mt20",attrs:{"current-page":e.listQuery.page,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{staticClass:"diatable diasize",attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"temp",staticClass:"small-space dia_form",attrs:{model:e.temp,"label-position":"left",rules:e.rules,"label-width":"160px"}},[a("el-form-item",{attrs:{label:" 所属机构:",prop:"officeId"}},[a("el-select",{staticClass:"form_item",attrs:{disabled:e.selsctState,filterable:"",placeholder:"请选择"},on:{change:e.aaa},model:{value:e.temp.officeId,callback:function(t){e.temp.officeId=t},expression:"temp.officeId"}},e._l(e.officeIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"岗位名称:",prop:"name"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入2-15位的岗位名称"},model:{value:e.temp.name,callback:function(t){e.temp.name="string"==typeof t?t.trim():t},expression:"temp.name"}})],1),e._v(" "),a("el-form-item",{staticClass:"treecss",attrs:{label:"权限:",prop:"check"}},[a("el-tree",{ref:"domTree",staticClass:"scrollBox form_item",attrs:{data:e.data2,indent:30,"show-checkbox":"","node-key":"id","default-expand-all":!0,props:e.defaultProps},on:{"check-change":e.handTreechange,"node-click":e.nodeClick,"current-change":e.currentChange,"node-expand":e.nodeExpand,"node-collapse":e.nodeCollapse},model:{value:e.temp.check,callback:function(t){e.temp.check=t},expression:"temp.check"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},["update"==e.dialogStatus&&e.myselfUpdate?a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.update("temp")}}},[e._v("保 存")]):e._e(),e._v(" "),"create"==e.dialogStatus?a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]):e._e(),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1)],1)])])},s=[],n={render:i,staticRenderFns:s};t.a=n},XZlg:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},bOdI:function(e,t,a){"use strict";t.__esModule=!0;var i=a("C4MV"),s=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(e,t,a){return t in e?(0,s.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},cAgV:function(e,t,a){"use strict";var i=a("jdeu"),s=function(e){e.directive("waves",i.a)};window.Vue&&(window.waves=i.a,Vue.use(s)),i.a.install=s,t.a=i.a},ctMr:function(e,t,a){var i=a("XZlg");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("44fae30e",i,!0)},jdeu:function(e,t,a){"use strict";var i=a("woOf"),s=a.n(i),n=a("ctMr");a.n(n);t.a={bind:function(e,t){e.addEventListener("click",function(a){var i=s()({},t.value),n=s()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),o=n.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var r=o.getBoundingClientRect(),l=o.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(r.width,r.height)+"px",o.appendChild(l)),n.type){case"center":l.style.top=r.height/2-l.offsetHeight/2+"px",l.style.left=r.width/2-l.offsetWidth/2+"px";break;default:l.style.top=a.pageY-r.top-l.offsetHeight/2-document.body.scrollTop+"px",l.style.left=a.pageX-r.left-l.offsetWidth/2-document.body.scrollLeft+"px"}return l.style.backgroundColor=n.color,l.className="waves-ripple z-active",!1}},!1)}}},mClu:function(e,t,a){var i=a("kM2E");i(i.S+i.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},oiIR:function(e,t,a){"use strict";var i=a("bOdI"),s=a.n(i),n=a("oppB"),o=a("cAgV"),r=a("0xDb"),l=[{value:"可用",key:"1"},{value:"不可用",key:"0"}];t.a={name:"table_demo",directives:{waves:o.a},data:function(){var e;return e={btnShow:JSON.parse(localStorage.getItem("btn")),btnState:!1,selsctState:!1,myselfUpdate:!0,list:[],officeIds:[],total:null,listLoading:!1,state:!1,search:{name:"",officeId:""},listQuery:{page:1,limit:10,importance:void 0,title:void 0,type:void 0,sort:"+id"},pageNumber:1,pageSize:10},s()(e,"total",1),s()(e,"temp",{name:"",dataScope:"10",check:[],officeId:""}),s()(e,"checkNode",[]),s()(e,"roleId",""),s()(e,"checked",[]),s()(e,"station",""),s()(e,"stationName",""),s()(e,"stationLv",[{id:"1",value:"一级"},{id:"2",value:"二级"},{id:"3",value:"三级"},{id:"4",value:"四级"},{id:"5",value:"五级"},{id:"6",value:"六级"},{id:"7",value:"七级"},{id:"8",value:"八级"},{id:"9",value:"九级"},{id:"10",value:"十级"}]),s()(e,"roleLv",[]),s()(e,"dialogFormVisible",!1),s()(e,"state",l),s()(e,"dialogStatus",""),s()(e,"textMap",{update:"编辑岗位",create:"新增岗位"}),s()(e,"dialogPvVisible",!1),s()(e,"pvData",[]),s()(e,"tableKey",0),s()(e,"data2",[]),s()(e,"defaultProps",{children:"subMenus",label:"name"}),s()(e,"powerList",[]),s()(e,"isIndeterminate",!0),s()(e,"rules",{officeId:[{required:!0,message:"机构不能为空",trigger:"change"}],name:[{required:!0,message:"岗位名称不能为空",trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],dataScope:[{required:!0,message:"等级不能为空",trigger:"change"}],check:[{type:"array",required:!0,message:"权限不能为空",trigger:"check-change"}]}),e},filters:{statusFilter:function(e){return{published:"success",draft:"gray",deleted:"danger"}[e]}},created:function(){var e=this;this.getList(),a.i(n.c)().then(function(t){e.data2=t.data.data}),a.i(n.b)({}).then(function(t){e.officeIds=t.data.data.list});for(var t=localStorage.getItem("dataScope"),i=0;i<t;i++)this.roleLv.push(this.stationLv[i])},methods:{aaa:function(e){},getList:function(){var e=this;this.listLoading=!0;var t={name:this.search.name,organization:{id:this.search.officeId}};if(""!=t.name||""!=t.organization.id)this.listLoading=!0,a.i(n.l)(t,this.pageNumber,this.pageSize).then(function(t){if(1===t.data.code){if(e.total=t.data.data.count,e.list=t.data.data.list,e.pageNumber=t.data.data.pageNo,e.pageSize=t.data.data.pageSize,e.listQuery.page=t.data.data.pageNo,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;setTimeout(function(){e.listLoading=!1},500)}else e.listLoading=!1,e.$message({type:"error",message:"岗位名不存在"})});else{var t={};a.i(n.l)(t,this.pageNumber,this.pageSize).then(function(t){if(1===t.data.code){if(e.total=t.data.data.count,e.list=t.data.data.list,e.pageNumber=t.data.data.pageNo,e.pageSize=t.data.data.pageSize,e.listQuery.page=t.data.data.pageNo,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;setTimeout(function(){e.listLoading=!1},500)}else e.listLoading=!1})}},handleFilter:function(){var e=this;this.listQuery.page=1,this.pageNumber=1;var t={name:this.search.name,organization:{id:this.search.officeId}};if(this.listLoading=!0,""!=t.name||""!=t.organization.id)a.i(n.l)(t,this.pageNumber,this.pageSize).then(function(t){if(1===t.data.code){if(e.total=t.data.data.count,e.list=t.data.data.list,e.pageNumber=t.data.data.pageNo,e.pageSize=t.data.data.pageSize,e.listQuery.page=t.data.data.pageNo,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;setTimeout(function(){e.listLoading=!1},500)}else e.listLoading=!1});else{var t={};a.i(n.l)(t,this.pageNumber,this.pageSize).then(function(t){if(1===t.data.code){if(e.total=t.data.data.count,e.list=t.data.data.list,e.pageNumber=t.data.data.pageNo,e.pageSize=t.data.data.pageSize,e.listQuery.page=t.data.data.pageNo,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;setTimeout(function(){e.listLoading=!1},500)}else e.listLoading=!1})}},handleSizeChange:function(e){var t=this;this.pageSize=e,this.listQuery.page=1,this.pageNumber=1,this.listLoading=!0;var i={name:this.search.name,organization:{id:this.search.officeId}};if(""!=i.name||""!=i.organization.id)a.i(n.l)(i,this.pageNumber,this.pageSize).then(function(e){if(1===e.data.code){if(t.total=e.data.data.count,t.list=e.data.data.list,t.pageNumber=e.data.data.pageNo,t.pageSize=e.data.data.pageSize,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;setTimeout(function(){t.listLoading=!1},500)}else t.listLoading=!1});else{var i={};a.i(n.l)(i,this.pageNumber,this.pageSize).then(function(e){if(1===e.data.code){if(t.total=e.data.data.count,t.list=e.data.data.list,t.pageNumber=e.data.data.pageNo,t.pageSize=e.data.data.pageSize,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;setTimeout(function(){t.listLoading=!1},500)}else t.listLoading=!1})}},handleCurrentChange:function(e){var t=this;this.pageNumber=e,this.listLoading=!0;var i={name:this.search.name,organization:{id:this.search.officeId}};if(""!=i.name||""!=i.organization.id)a.i(n.l)(i,this.pageNumber,this.pageSize).then(function(e){if(1===e.data.code){if(t.total=e.data.data.count,t.list=e.data.data.list,t.pageNumber=e.data.data.pageNo,t.pageSize=e.data.data.pageSize,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;setTimeout(function(){t.listLoading=!1},500)}else t.listLoading=!1});else{var i={};a.i(n.l)(i,this.pageNumber,this.pageSize).then(function(e){if(1===e.data.code){if(t.total=e.data.data.count,t.list=e.data.data.list,t.pageNumber=e.data.data.pageNo,t.pageSize=e.data.data.pageSize,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;setTimeout(function(){t.listLoading=!1},500)}else t.listLoading=!1})}},handTreechange:function(e,t,a){if(t){if(["order_time","order_dispatch","order_addTech"].indexOf(e.permission)>-1)for(var i=e.parentIds.split(","),s=0;s<this.data2.length;s++)if(void 0!=this.data2[s].subMenus)for(var n=0;n<this.data2[s].subMenus.length;n++)"order"==this.data2[s].subMenus[n].permission&&this.$refs.domTree.setChecked(this.data2[s].subMenus[n].subMenus[this.data2[s].subMenus[n].subMenus.length-2].id,!0);if(void 0==e.subMenus){console.log(e),console.log(e.parentIds);for(var i=e.parentIds.split(","),s=0;s<this.data2.length;s++)if(void 0!=this.data2[s].subMenus)for(var n=0;n<this.data2[s].subMenus.length;n++)if(this.data2[s].subMenus[n].id==i[3]){var o=this.data2[s].subMenus[n].subMenus[this.data2[s].subMenus[n].subMenus.length-1];if(void 0!=o.permission){var r=o.permission,l=r.substring(r.length-4,r.length);"view"==l&&this.$refs.domTree.setChecked(o.id,!0)}}}}else{if("order_info"==e.permission)for(var s=0;s<this.data2.length;s++)if(void 0!=this.data2[s].subMenus)for(var n=0;n<this.data2[s].subMenus.length;n++)if("order"==this.data2[s].subMenus[n].permission)for(var d=this.data2[s].subMenus[n],c=0;c<d.subMenus.length-2;c++)this.temp.check.indexOf(d.subMenus[c].id)>-1&&(this.$refs.domTree.setChecked(this.data2[s].subMenus[n].subMenus[d.subMenus.length-2].id,!0),this.temp.check=this.$refs.domTree.getCheckedKeys());if("view"==e.permission.substring(e.permission.length-4,e.permission.length))for(var u=e.parentIds.split(","),s=0;s<this.data2.length;s++)if(void 0!=this.data2[s].subMenus)for(var n=0;n<this.data2[s].subMenus.length;n++)if(this.data2[s].subMenus[n].id==u[3])for(var c=0;c<this.data2[s].subMenus[n].subMenus.length-1;c++)this.temp.check.indexOf(this.data2[s].subMenus[n].subMenus[c].id)>-1&&this.$refs.domTree.setChecked(this.data2[s].subMenus[n].subMenus[this.data2[s].subMenus[n].subMenus.length-1].id,!0)}this.temp.check=this.$refs.domTree.getCheckedKeys()},nodeClick:function(e,t,a){console.log(e,t,a,"nodeclick节点被点击时")},currentChange:function(e,t){},nodeExpand:function(e,t,a){},nodeCollapse:function(e,t,a){},timeFilter:function(e){if(!e[0])return this.listQuery.start=void 0,void(this.listQuery.end=void 0);this.listQuery.start=parseInt(+e[0]/1e3),this.listQuery.end=parseInt((+e[1]+864e5)/1e3)},lvChange:function(e){},offChange:function(e){},handleCreate:function(){var e=this;this.listLoading=!0,a.i(n.c)().then(function(t){e.data2=t.data.data,1==t.data.code?(e.dialogStatus="create",e.dialogFormVisible=!0,e.listLoading=!1,1==e.officeIds.length&&(e.temp.officeId=e.officeIds[0].id)):e.listLoading=!1}).catch(function(){e.listLoading=!1})},handleUpdate:function(e){var t=this;this.myselfUpdate=!0,this.listLoading=!0,a.i(n.m)(e.id).then(function(e){if(t.listLoading=!1,1==e.data.code){t.data2=e.data.data.menuListUnion,localStorage.getItem("roleId")==e.data.data.id&&(t.myselfUpdate=!1),e.data.data.flagRoleId&&(t.myselfUpdate=!1,t.$nextTick(function(){t.myselfUpdate=!1})),t.dialogStatus="update",t.dialogFormVisible=!0;var a=e.data.data;t.roleId=a.id,t.temp.officeId=a.organization.id,t.temp.name=a.name,t.temp.dataScope="10",t.temp.check=a.menuIdListEdit,e.data.data.flag&&(t.selsctState=!0);for(var i=0;i<t.data2.length;i++)if("index"==t.data2[i].permission||t.temp.check.remove(t.data2[i].id),void 0!=t.data2[i].subMenus)for(var s=t.data2[i],n=0;n<s.subMenus.length;n++)t.temp.check.remove(s.subMenus[n].id);t.$nextTick(function(){t.$refs.domTree.setCheckedKeys(t.temp.check)})}else t.listLoading=!1,t.$message({type:"error",message:"获取数据失败"})})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1,type:"warning"}).then(function(){var i={id:e.id};a.i(n.n)(i).then(function(e){1===e.data.code?(t.$message({type:"success",message:"删除成功!"}),t.getList()):t.$message({type:"error",message:e.data.data})}).catch(function(){t.listLoading=!1})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},getLv:function(){},getFather:function(e){for(var t in e)void 0!=e[t].subMenus?this.getFather(e[t].subMenus):this.data2.indexOf(e[t].id)},create:function(e){for(var t=this,i=this.$refs.domTree.getCheckedKeys(),s="",o=0;o<i.length;o++)s+=i[o]+",";var r={name:this.temp.name,dataScope:"10",menuIds:s,useable:"1",organization:{id:this.temp.officeId}};this.$refs[e].validate(function(i){if(!i)return!1;t.btnState=!0,a.i(n.i)(r).then(function(a){t.btnState=!1,1===a.data.code?(t.resetTemp(),t.$refs[e].resetFields(),t.$refs.domTree.setCheckedKeys([]),t.$message({type:"success",message:"添加成功"}),t.dialogFormVisible=!1,t.listQuery.page=1,t.pageNumber=1,t.search={name:"",officeId:""},t.handleFilter()):"string"==typeof a.data.data?t.$message({type:"error",message:a.data.data}):t.$message({type:"error",message:a.data.data[0]})}).catch(function(e){t.btnState=!1})})},update:function(e){for(var t=this,i=this.$refs.domTree.getCheckedKeys(),s="",o=0;o<i.length;o++)s+=i[o]+",";var r={id:this.roleId,name:this.temp.name,dataScope:this.temp.dataScope,menuIds:s,useable:"1",organization:{id:this.temp.officeId}};this.$refs[e].validate(function(i){if(!i)return!1;t.btnState=!0,a.i(n.o)(r).then(function(a){t.btnState=!1,1===a.data.code?(t.selsctState=!1,t.resetTemp(),t.$refs.domTree.setCheckedKeys([]),t.$refs[e].resetFields(),t.dialogFormVisible=!1,t.$message({type:"success",message:"修改成功"}),t.getList()):"string"==typeof a.data.data?t.$message({type:"error",message:a.data.data}):t.$message({type:"error",message:a.data.data[0]})}).catch(function(e){t.btnState=!1})})},resetForm:function(e){this.selsctState=!1,this.dialogFormVisible=!1,this.$refs.domTree.setCheckedKeys([]),this.$refs[e].resetFields(),this.resetTemp()},resetTemp:function(){this.temp={officeId:"",name:"",dataScope:"10",check:[]}},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"timestamp"===e?a.i(r.a)(t[e]):t[e]})})}}}},oppB:function(e,t,a){"use strict";function i(e){return b.a.post("/apiservice/a/sys/user/saveData",e)}function s(e){return b.a.post("/apiservice/a/sys/user/upData",e)}function n(e,t,a){return b.a.post("/apiservice/a/sys/role/listPageData?pageNo="+t+"&pageSize="+a,e)}function o(e){return b.a.post("/apiservice/a/sys/role/listDataWithoutPermission",e)}function r(e,t,a){return b.a.post("/apiservice/a/sys/user/listData?pageNo="+t+"&pageSize="+a,e)}function l(e){return b.a.post("/apiservice/a/sys/role/saveData",e)}function d(e){return b.a.post("/apiservice/a/sys/role/upData",e)}function c(e){return b.a.post("/apiservice/a/sys/role/deleteRole",e)}function u(e){return b.a.get("/apiservice/a/sys/role/getRoleDetail?id="+e)}function f(e){return b.a.post("/apiservice/a/sys/organization/listDataAll",e)}function p(e){return b.a.post("/apiservice/a/service/station/serviceStation/listByOffice",e)}function h(){return b.a.get("/apiservice/a/sys/menu/getMenuList")}function g(e){return b.a.post("/apiservice/a/sys/user/deleteUser",e)}function m(e){return b.a.get("/apiservice/a/sys/role/chkName?id="+e.id+"&name="+e.name)}function v(e){return b.a.get("/apiservice/a/sys/role/chkNameUpdate?id="+e.id+"&name="+e.name+"&roleId="+e.roleId)}t.h=i,t.j=s,t.l=n,t.g=o,t.d=r,t.i=l,t.o=d,t.n=c,t.m=u,t.b=f,t.f=p,t.c=h,t.e=g,t.a=m,t.k=v;var b=a("Vo7i")},pWQp:function(e,t,a){var i=a("5DwC");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("59882488",i,!0)}});