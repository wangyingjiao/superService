webpackJsonp([6],{"/0s5":function(e,t,a){"use strict";function i(e){a("pWQp")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("oiIR"),o=a("M6/Q"),n=a("VU/8"),l=i,r=n(s.a,o.a,l,null,null);t.default=r.exports},"0xDb":function(e,t,a){"use strict";function i(e,t){if(0===arguments.length)return null;var a=t||"{y}-{m}-{d} {h}:{i}:{s}",i=void 0;"object"===(void 0===e?"undefined":o()(e))?i=e:(10===(""+e).length&&(e=1e3*parseInt(e)),i=new Date(e));var s={y:i.getFullYear(),m:i.getMonth()+1,d:i.getDate(),h:i.getHours(),i:i.getMinutes(),s:i.getSeconds(),a:i.getDay()};return a.replace(/{(y|m|d|h|i|s|a)+}/g,function(e,t){var a=s[t];return"a"===t?["一","二","三","四","五","六","日"][a-1]:(e.length>0&&a<10&&(a="0"+a),a||0)})}t.a=i;var s=a("pFYg"),o=a.n(s)},"5DwC":function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".btn_right{margin-top:3px;float:right;width:75px}.btn_left{width:100px}.checkRightBox{border:1px solid #dcdcdc;padding:10px}.checkAllBox,.checkBox1{padding:10px 0}.checkBox1{border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc}.checkBox2,.checkBox3{padding:10px 0}.checkBox3{border-top:1px solid #dcdcdc}.checkBox1 .el-checkbox,.checkBox2 .el-checkbox,.checkBox3 .el-checkbox{margin-left:0;margin-right:15px}.bgWhite{background-color:#fff;padding:20px}.btn_pad{margin:0 0 20px 20px}.el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node,.el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node{float:left}.ceshi{height:25px;width:80px}.ceshi3{font-size:14px;color:#1d85fe;border:1px solid #1d85fe;background-color:#fff}.dialog-footer{text-align:center}.scrollBox{height:400px;overflow-y:scroll;overflow-x:hidden}.diasize .el-dialog{width:60%}",""])},"9bBU":function(e,t,a){a("mClu");var i=a("FeBl").Object;e.exports=function(e,t,a){return i.defineProperty(e,t,a)}},C4MV:function(e,t,a){e.exports={default:a("9bBU"),__esModule:!0}},"M6/Q":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"filter-container bgWhite"},[a("el-input",{staticClass:"search",attrs:{placeholder:"请输入搜索的岗位名称"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.name,callback:function(t){e.search.name=t},expression:"search.name"}}),e._v(" "),a("el-select",{staticClass:"search",attrs:{filterable:"",clearable:"",placeholder:"选择机构"},model:{value:e.search.officeId,callback:function(t){e.search.officeId=t},expression:"search.officeId"}},e._l(e.officeIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("button",{staticClass:"button-large el-icon-search btn_search",on:{click:e.handleFilter}},[e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"bgWhite"},[a("button",{staticClass:"button-small btn_pad",on:{click:e.handleCreate}},[e._v("新增")]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"正在加载",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"编号",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"岗位名称",align:"center",prop:"name"}}),e._v(" "),a("el-table-column",{attrs:{label:"机构名称",align:"center",prop:"organization.name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"el-icon-edit ceshi3",on:{click:function(a){e.handleUpdate(t.row)}}}),e._v(" "),a("el-button",{staticClass:"el-icon-delete ceshi3",on:{click:function(a){e.handleDelete(t.row)}}})]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{staticClass:"fr mt20",attrs:{"current-page":e.listQuery.page,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{staticClass:"diatable diasize",attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"temp",staticClass:"small-space dia_form",attrs:{model:e.temp,"label-position":"left",rules:e.rules,"label-width":"160px"}},[a("el-form-item",{attrs:{label:" 所属机构:",prop:"officeId"}},[a("el-select",{staticClass:"form_item",attrs:{disabled:e.selsctState,filterable:"",placeholder:"请选择"},on:{change:e.aaa},model:{value:e.temp.officeId,callback:function(t){e.temp.officeId=t},expression:"temp.officeId"}},e._l(e.officeIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"岗位名称:",prop:"name"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入2-15位的岗位名称"},model:{value:e.temp.name,callback:function(t){e.temp.name="string"==typeof t?t.trim():t},expression:"temp.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"等级:",prop:"dataScope"}},[a("el-select",{staticClass:"form_item",attrs:{placeholder:"请选择"},on:{change:e.lvChange},model:{value:e.temp.dataScope,callback:function(t){e.temp.dataScope=t},expression:"temp.dataScope"}},e._l(e.roleLv,function(e){return a("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})})),e._v(" "),a("p",{staticStyle:{"font-size":"12px",color:"#8391a5"}},[e._v("* 十级权限最高，一级权限最低")])],1),e._v(" "),a("el-form-item",{attrs:{label:"权限:",prop:"check"}},[a("el-tree",{ref:"domTree",staticClass:"scrollBox form_item",attrs:{data:e.data2,indent:10,"show-checkbox":"","node-key":"id","default-expand-all":!0,props:e.defaultProps},on:{"check-change":e.handTreechange,"node-click":e.nodeClick,"current-change":e.currentChange,"node-expand":e.nodeExpand,"node-collapse":e.nodeCollapse},model:{value:e.temp.check,callback:function(t){e.temp.check=t},expression:"temp.check"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},["update"==e.dialogStatus?a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.update("temp")}}},[e._v("保 存")]):a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1)],1)])])},s=[],o={render:i,staticRenderFns:s};t.a=o},XZlg:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},bOdI:function(e,t,a){"use strict";t.__esModule=!0;var i=a("C4MV"),s=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(e,t,a){return t in e?(0,s.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},cAgV:function(e,t,a){"use strict";var i=a("jdeu"),s=function(e){e.directive("waves",i.a)};window.Vue&&(window.waves=i.a,Vue.use(s)),i.a.install=s,t.a=i.a},ctMr:function(e,t,a){var i=a("XZlg");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("44fae30e",i,!0)},jdeu:function(e,t,a){"use strict";var i=a("woOf"),s=a.n(i),o=a("ctMr");a.n(o);t.a={bind:function(e,t){e.addEventListener("click",function(a){var i=s()({},t.value),o=s()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),n=o.ele;if(n){n.style.position="relative",n.style.overflow="hidden";var l=n.getBoundingClientRect(),r=n.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":(r=document.createElement("span"),r.className="waves-ripple",r.style.height=r.style.width=Math.max(l.width,l.height)+"px",n.appendChild(r)),o.type){case"center":r.style.top=l.height/2-r.offsetHeight/2+"px",r.style.left=l.width/2-r.offsetWidth/2+"px";break;default:r.style.top=a.pageY-l.top-r.offsetHeight/2-document.body.scrollTop+"px",r.style.left=a.pageX-l.left-r.offsetWidth/2-document.body.scrollLeft+"px"}return r.style.backgroundColor=o.color,r.className="waves-ripple z-active",!1}},!1)}}},mClu:function(e,t,a){var i=a("kM2E");i(i.S+i.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},oiIR:function(e,t,a){"use strict";var i=a("bOdI"),s=a.n(i),o=a("oppB"),n=a("cAgV"),l=a("0xDb"),r=[{value:"可用",key:"1"},{value:"不可用",key:"0"}];t.a={name:"table_demo",directives:{waves:n.a},data:function(){var e,t=this,i=function(e,i,s){if(!i)return s(new Error("岗位名不能为空"));if(console.log(t.dialogStatus),"create"==t.dialogStatus)a.i(o.j)(i).then(function(e){0==e.data.code?s(new Error("岗位名重复！")):s()});else{var n={roleId:t.roleId,name:i};a.i(o.k)(n).then(function(e){0==e.data.code?s(new Error("岗位名重复！")):s()})}};return e={btnShow:this.$store.state.user.buttonshow,btnState:!1,selsctState:!1,list:[],officeIds:[],total:null,listLoading:!1,state:!1,search:{name:"",officeId:""},listQuery:{page:1,limit:10,importance:void 0,title:void 0,type:void 0,sort:"+id"},pageNumber:1,pageSize:10},s()(e,"total",1),s()(e,"temp",{name:"",dataScope:"",check:[],officeId:""}),s()(e,"checkNode",[]),s()(e,"roleId",""),s()(e,"checked",[]),s()(e,"station",""),s()(e,"stationName",""),s()(e,"stationLv",[{id:"1",value:"一级"},{id:"2",value:"二级"},{id:"3",value:"三级"},{id:"4",value:"四级"},{id:"5",value:"五级"},{id:"6",value:"六级"},{id:"7",value:"七级"},{id:"8",value:"八级"},{id:"9",value:"九级"},{id:"10",value:"十级"}]),s()(e,"roleLv",[]),s()(e,"dialogFormVisible",!1),s()(e,"state",r),s()(e,"dialogStatus",""),s()(e,"textMap",{update:"编辑岗位",create:"新增岗位"}),s()(e,"dialogPvVisible",!1),s()(e,"pvData",[]),s()(e,"tableKey",0),s()(e,"data2",[]),s()(e,"defaultProps",{children:"subMenus",label:"name"}),s()(e,"powerList",[]),s()(e,"isIndeterminate",!0),s()(e,"rules",{officeId:[{required:!0,message:"机构不能为空",trigger:"change"}],name:[{required:!0,validator:i,trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],dataScope:[{required:!0,message:"等级不能为空",trigger:"change"}],check:[{type:"array",required:!0,message:"权限不能为空",trigger:"check-change"}]}),e},filters:{statusFilter:function(e){return{published:"success",draft:"gray",deleted:"danger"}[e]}},created:function(){var e=this;this.getList(),a.i(o.b)().then(function(t){e.data2=t.data.data}),a.i(o.a)({}).then(function(t){console.log("所属机构,机构搜索"),console.log(t),e.officeIds=t.data.data.list,console.log(e.officeIds)});var t=localStorage.getItem("dataScope");console.log(t,"用户等级");for(var i=0;i<t;i++)this.roleLv.push(this.stationLv[i]);console.log(this.roleLv,"用户看到的等级")},methods:{aaa:function(e){console.log(e)},getList:function(){var e=this;this.listLoading=!0;var t={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(t),""!=t.name||""!=t.organization.id)this.listLoading=!0,a.i(o.l)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),1===t.data.code){if(e.list=t.data.data.list,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.total=t.data.data.count,e.listLoading=!1}else e.listLoading=!1,e.$message({type:"warning",message:"岗位名不存在"})});else{var t={};a.i(o.l)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),1===t.data.code){if(e.list=t.data.data.list,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.total=t.data.data.count,e.listLoading=!1}})}},handleFilter:function(){var e=this;this.listQuery.page=1;var t={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(t),""!=t.name||""!=t.organization.id)this.listLoading=!0,a.i(o.l)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),1===t.data.code){if(e.list=t.data.data.list,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.total=t.data.data.count,e.listLoading=!1}else e.listLoading=!1,e.$message({type:"warning",message:"岗位名不存在"})});else{var t={};a.i(o.l)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),1===t.data.code){if(e.list=t.data.data.list,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.total=t.data.data.count,e.listLoading=!1}})}},handleSizeChange:function(e){var t=this;this.pageSize=e;var i={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(i),""!=i.name||""!=i.organization.id)this.listLoading=!0,a.i(o.l)(i,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;t.total=e.data.data.count,t.listLoading=!1}else t.listLoading=!1,t.$message({type:"warning",message:"岗位名不存在"})});else{var i={};a.i(o.l)(i,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;t.total=e.data.data.count,t.listLoading=!1}})}},handleCurrentChange:function(e){var t=this;this.pageNumber=e;var i={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(i),""!=i.name||""!=i.organization.id)this.listLoading=!0,a.i(o.l)(i,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;t.total=e.data.data.count,t.listLoading=!1}else t.listLoading=!1,t.$message({type:"warning",message:"岗位名不存在"})});else{var i={};a.i(o.l)(i,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;t.total=e.data.data.count,t.listLoading=!1}})}},handTreechange:function(e,t,a){if(console.log(this.dialogStatus,"状态12"),t)if(void 0==e.subMenus){for(var i=e.parentIds.split(","),s=0;s<this.data2.length;s++)if(this.data2[s].id,i[2],void 0!=this.data2[s].subMenus)for(var o=0;o<this.data2[s].subMenus.length;o++)if(this.data2[s].subMenus[o].id==i[3]){var n=this.data2[s].subMenus[o].subMenus[0];if(void 0!=n.permission){var l=n.permission,r=l.substring(l.length-4,l.length);"view"==r&&this.$refs.domTree.setChecked(n.id,!0)}}}else console.log(e.permission,"父级被勾选的权限");else if("view"==e.permission.substring(e.permission.length-4,e.permission.length)){console.log("点击正确");for(var c=e.parentIds.split(","),s=0;s<this.data2.length;s++)if(void 0!=this.data2[s].subMenus)for(var o=0;o<this.data2[s].subMenus.length;o++)if(this.data2[s].subMenus[o].id==c[3]){console.log(this.data2[s].subMenus[o],"1111111111");for(var d=1;d<this.data2[s].subMenus[o].subMenus.length;d++)console.log(this.data2[s].subMenus[o].subMenus[d].name),this.temp.check.indexOf(this.data2[s].subMenus[o].subMenus[d].id)>-1&&this.$refs.domTree.setChecked(e.id,!0)}}this.temp.check=this.$refs.domTree.getCheckedKeys()},nodeClick:function(e,t,a){console.log(e,t,a,"nodeclick节点被点击时")},currentChange:function(e,t){console.log(e,t,"currentchange选中节点变化时")},nodeExpand:function(e,t,a){console.log(e,t,a,"nodeexpand节点被展开时")},nodeCollapse:function(e,t,a){console.log(e,t,a,"nodecollapse节点关闭")},timeFilter:function(e){if(!e[0])return this.listQuery.start=void 0,void(this.listQuery.end=void 0);this.listQuery.start=parseInt(+e[0]/1e3),this.listQuery.end=parseInt((+e[1]+864e5)/1e3)},lvChange:function(e){},offChange:function(e){},handleCreate:function(){this.dialogStatus="create",this.dialogFormVisible=!0,1==this.officeIds.length&&(console.log(this.officeIds[0].id),this.temp.officeId=this.officeIds[0].id)},handleUpdate:function(e){var t=this;this.listLoading=!0,a.i(o.m)(e.id).then(function(e){if(console.log(e),t.listLoading=!1,1==e.data.code){t.dialogStatus="update",t.dialogFormVisible=!0;var a=e.data.data;t.roleId=a.id,t.temp.officeId=a.organization.id,t.temp.name=a.name,t.temp.dataScope=a.dataScope,t.temp.check=a.menuIdList,e.data.data.flag&&(t.selsctState=!0);for(var i=0;i<t.data2.length;i++)if("index"==t.data2[i].permission||t.temp.check.remove(t.data2[i].id),void 0!=t.data2[i].subMenus)for(var s=t.data2[i],o=0;o<s.subMenus.length;o++)t.temp.check.remove(s.subMenus[o].id);console.log(t.temp.check,"选中1231231111111111111111"),t.$nextTick(function(){t.$refs.domTree.setCheckedKeys(t.temp.check)})}else t.$message({type:"warning",message:"请求失败"})})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){console.log(e);var i={id:e.id};a.i(o.n)(i).then(function(e){console.log(e),1===e.data.code?(t.$message({type:"success",message:"删除成功!"}),t.getList()):t.$message({type:"warning",message:e.data.data})}).catch(function(){t.listLoading=!1})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},getLv:function(){},getFather:function(e){console.log(121233213);for(var t in e)void 0!=e[t].subMenus?(console.log(t),this.getFather(e[t].subMenus)):this.data2.indexOf(e[t].id)>-1&&console.log(e[t].parentId)},create:function(e){var t=this;this.search={name:"",officeId:""};for(var i=this.$refs.domTree.getCheckedKeys(),s="",n=0;n<i.length;n++)s+=i[n]+",";var l={name:this.temp.name,dataScope:this.temp.dataScope,menuIds:s,useable:"1",organization:{id:this.temp.officeId}};console.log(l),this.$refs[e].validate(function(i){if(!i)return!1;t.btnState=!0,a.i(o.h)(l).then(function(a){t.btnState=!1,console.log(a),1===a.data.code?(t.resetTemp(),t.$refs[e].resetFields(),t.$refs.domTree.setCheckedKeys([]),t.$message({type:"success",message:"添加成功"}),t.dialogFormVisible=!1,t.listQuery.page=1,t.pageNumber=1,t.handleFilter()):t.$message({type:"error",message:a.data.data[0]})}).catch(function(e){t.btnState=!1})})},update:function(e){for(var t=this,i=this.$refs.domTree.getCheckedKeys(),s="",n=0;n<i.length;n++)s+=i[n]+",";var l={id:this.roleId,name:this.temp.name,dataScope:this.temp.dataScope,menuIds:s,useable:"1",organization:{id:this.temp.officeId}};console.log(l),this.$refs[e].validate(function(i){if(!i)return!1;t.btnState=!0,a.i(o.o)(l).then(function(a){t.btnState=!1,1===a.data.code?(t.selsctState=!1,t.resetTemp(),t.$refs.domTree.setCheckedKeys([]),t.$refs[e].resetFields(),t.dialogFormVisible=!1,t.$message({type:"success",message:"修改成功"}),t.getList()):"string"==typeof a.data.data?t.$message({type:"error",message:a.data.data}):t.$message({type:"error",message:a.data.data[0]})}).catch(function(e){t.btnState=!1})})},resetForm:function(e){this.selsctState=!1,this.dialogFormVisible=!1,this.resetTemp(),this.$refs.domTree.setCheckedKeys([]),this.$refs[e].resetFields()},resetTemp:function(){this.temp={officeId:"",name:"",dataScope:"",check:[]}},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"timestamp"===e?a.i(l.a)(t[e]):t[e]})})}}}},oppB:function(e,t,a){"use strict";function i(e){return b.a.post("/apiservice/a/sys/user/saveData",e)}function s(e){return b.a.post("/apiservice/a/sys/user/upData",e)}function o(e,t,a){return b.a.post("/apiservice/a/sys/role/listPageData?pageNo="+t+"&pageSize="+a,e)}function n(e){return b.a.post("/apiservice/a/sys/role/listDataWithoutPermission",e)}function l(e,t,a){return b.a.post("/apiservice/a/sys/user/listData?pageNo="+t+"&pageSize="+a,e)}function r(e){return b.a.post("/apiservice/a/sys/role/saveData",e)}function c(e){return b.a.post("/apiservice/a/sys/role/upData",e)}function d(e){return b.a.post("/apiservice/a/sys/role/deleteRole",e)}function u(e){return b.a.get("/apiservice/a/sys/role/getRoleDetail?id="+e)}function f(e){return b.a.post("/apiservice/a/sys/organization/listDataAll",e)}function p(e){return b.a.post("/apiservice/a/service/station/serviceStation/listByOffice",e)}function g(){return b.a.get("/apiservice/a/sys/menu/getMenuList")}function h(e){return b.a.post("/apiservice/a/sys/user/deleteUser",e)}function m(e){return b.a.get("/apiservice/a/sys/role/chkName?name="+e)}function v(e){return b.a.get("/apiservice/a/sys/role/chkNameUpdate?name="+e.name+"&roleId="+e.roleId)}t.g=i,t.i=s,t.l=o,t.f=n,t.c=l,t.h=r,t.o=c,t.n=d,t.m=u,t.a=f,t.e=p,t.b=g,t.d=h,t.j=m,t.k=v;var b=a("Vo7i")},pWQp:function(e,t,a){var i=a("5DwC");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("59882488",i,!0)}});