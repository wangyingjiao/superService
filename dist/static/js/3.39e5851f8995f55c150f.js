webpackJsonp([3,27],{"0mb+":function(e,t,a){t=e.exports=a("acE3")(!1),t.push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},"0xDb":function(e,t,a){"use strict";function i(e,t){if(0===arguments.length)return null;var a=t||"{y}-{m}-{d} {h}:{i}:{s}",i=void 0;"object"===(void 0===e?"undefined":n()(e))?i=e:(10===(""+e).length&&(e=1e3*parseInt(e)),i=new Date(e));var s={y:i.getFullYear(),m:i.getMonth()+1,d:i.getDate(),h:i.getHours(),i:i.getMinutes(),s:i.getSeconds(),a:i.getDay()};return a.replace(/{(y|m|d|h|i|s|a)+}/g,function(e,t){var a=s[t];return"a"===t?["一","二","三","四","五","六","日"][a-1]:(e.length>0&&a<10&&(a="0"+a),a||0)})}t.a=i;var s=a("hRKE"),n=a.n(s)},"5mkB":function(e,t,a){"use strict";var i,s=a("HzJ8"),n=a.n(s),r=a("a3Yh"),o=a.n(r),l=a("oppB"),c=a("cAgV"),d=a("0xDb"),u=a("zfsD"),f=[{value:"可用",key:"1"},{value:"不可用",key:"0"}];t.a={name:"role",directives:{waves:c.a},components:{roleDialog:u.default},data:function(){var e;return e={btnShow:[],btnState:!1,selsctState:!1,myselfUpdate:!0,roleDiaState:!1,list:[],officeIds:[],total:null,listLoading:!1,state:!1,search:{name:"",officeId:""},listQuery:{page:1,limit:10,importance:void 0,title:void 0,type:void 0},pageNumber:1,pageSize:10},o()(e,"total",1),o()(e,"temp",{name:"",dataScope:"10",check:[],officeId:""}),o()(e,"checkNode",[]),o()(e,"filterText",""),o()(e,"roleId",""),o()(e,"checked",[]),o()(e,"station",""),o()(e,"stationName",""),o()(e,"stationLv",[{id:"1",value:"一级"},{id:"2",value:"二级"},{id:"3",value:"三级"},{id:"4",value:"四级"},{id:"5",value:"五级"},{id:"6",value:"六级"},{id:"7",value:"七级"},{id:"8",value:"八级"},{id:"9",value:"九级"},{id:"10",value:"十级"}]),o()(e,"roleLv",[]),o()(e,"dialogFormVisible",!1),o()(e,"state",f),o()(e,"dialogStatus",""),o()(e,"textMap",{update:"编辑岗位",create:"新增岗位"}),o()(e,"dialogPvVisible",!1),o()(e,"pvData",[]),o()(e,"tableKey",0),o()(e,"data2",[]),o()(e,"defaultProps",{children:"subMenus",label:"name"}),o()(e,"powerList",[]),o()(e,"isIndeterminate",!0),o()(e,"rules",{officeId:[{required:!0,message:"机构不能为空",trigger:"change"}],name:[{required:!0,message:"岗位名称不能为空",trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],dataScope:[{required:!0,message:"等级不能为空",trigger:"change"}],check:[{type:"array",required:!0,message:"权限不能为空",trigger:"check-change"}]}),e},filters:{statusFilter:function(e){return{published:"success",draft:"gray",deleted:"danger"}[e]}},created:function(){var e=this;JSON.parse(localStorage.getItem("btn"))&&(this.btnShow=JSON.parse(localStorage.getItem("btn"))),a.i(l.a)().then(function(t){e.data2=t.data.data}),a.i(l.b)({}).then(function(t){void 0!=t.data.data.list&&(e.officeIds=t.data.data.list,"org"!=localStorage.getItem("type")&&"station"!=localStorage.getItem("type")||(e.search.officeId=e.officeIds[0].id))});for(var t=localStorage.getItem("dataScope"),i=0;i<t;i++)this.roleLv.push(this.stationLv[i]);this.getList()},watch:{filterText:function(e){this.$refs.domTree.filter(e)}},methods:{filterNode:function(e,t){return!e||-1!==t.type.indexOf(e)},orgChange:function(e){var t=this;"sys"==e?this.$nextTick(function(){t.filterText=""}):this.$nextTick(function(){t.filterText="business"})},loadingClick:function(){i=this.$loading({lock:!0,spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)",target:document.querySelector(".el-dialog__body")})},getList:function(){var e=this;this.listLoading=!0;var t={name:this.search.name,organization:{id:this.search.officeId}};if(""!=t.name||""!=t.organization.id)a.i(l.o)(t,this.pageNumber,this.pageSize).then(function(t){if(1===t.data.code){if(e.total=t.data.data.count,e.list=t.data.data.list,e.pageNumber=t.data.data.pageNo,e.pageSize=t.data.data.pageSize,e.listQuery.page=t.data.data.pageNo,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.listLoading=!1}else e.listLoading=!1}).catch(function(){e.listLoading=!1});else{var t={};a.i(l.o)(t,this.pageNumber,this.pageSize).then(function(t){if(1===t.data.code){if(e.total=t.data.data.count,e.list=t.data.data.list,e.pageNumber=t.data.data.pageNo,e.pageSize=t.data.data.pageSize,e.listQuery.page=t.data.data.pageNo,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;setTimeout(function(){e.listLoading=!1},500)}else e.listLoading=!1})}},handleFilter:function(){this.listQuery.page=1,this.pageNumber=1,this.getList()},handleSizeChange:function(e){this.pageSize=e,this.listQuery.page=1,this.pageNumber=1,this.getList()},handleCurrentChange:function(e){this.pageNumber=e,this.getList()},handTreechange:function(e,t,a){if(t){if(["order_time","order_dispatch","order_addTech","order_cancel"].indexOf(e.permission)>-1)for(var i=e.parentIds.split(","),s=0;s<this.data2.length;s++)if(void 0!=this.data2[s].subMenus)for(var n=0;n<this.data2[s].subMenus.length;n++)"order"==this.data2[s].subMenus[n].permission&&this.$refs.domTree.setChecked(this.data2[s].subMenus[n].subMenus[this.data2[s].subMenus[n].subMenus.length-2].id,!0);if(void 0==e.subMenus)for(var i=e.parentIds.split(","),s=0;s<this.data2.length;s++)if(void 0!=this.data2[s].subMenus)for(var n=0;n<this.data2[s].subMenus.length;n++)if(this.data2[s].subMenus[n].id==i[3]){var r=this.data2[s].subMenus[n].subMenus[this.data2[s].subMenus[n].subMenus.length-1];if(void 0!=r.permission){var o=r.permission,l=o.substring(o.length-4,o.length);"view"==l&&this.$refs.domTree.setChecked(r.id,!0)}}}else{if("order_info"==e.permission)for(var s=0;s<this.data2.length;s++)if(void 0!=this.data2[s].subMenus)for(var n=0;n<this.data2[s].subMenus.length;n++)if("order"==this.data2[s].subMenus[n].permission)for(var c=this.data2[s].subMenus[n],d=0;d<c.subMenus.length-2;d++)this.temp.check.indexOf(c.subMenus[d].id)>-1&&(this.$refs.domTree.setChecked(this.data2[s].subMenus[n].subMenus[c.subMenus.length-2].id,!0),this.temp.check=this.$refs.domTree.getCheckedKeys());if("view"==e.permission.substring(e.permission.length-4,e.permission.length))for(var u=e.parentIds.split(","),s=0;s<this.data2.length;s++)if(void 0!=this.data2[s].subMenus)for(var n=0;n<this.data2[s].subMenus.length;n++)if(this.data2[s].subMenus[n].id==u[3])for(var d=0;d<this.data2[s].subMenus[n].subMenus.length-1;d++)this.temp.check.indexOf(this.data2[s].subMenus[n].subMenus[d].id)>-1&&this.$refs.domTree.setChecked(this.data2[s].subMenus[n].subMenus[this.data2[s].subMenus[n].subMenus.length-1].id,!0)}this.temp.check=this.$refs.domTree.getCheckedKeys()},nodeClick:function(e,t,a){},currentChange:function(e,t){},nodeExpand:function(e,t,a){},nodeCollapse:function(e,t,a){},timeFilter:function(e){if(!e[0])return this.listQuery.start=void 0,void(this.listQuery.end=void 0);this.listQuery.start=parseInt(+e[0]/1e3),this.listQuery.end=parseInt((+e[1]+864e5)/1e3)},handleCreate:function(){var e=this;this.listLoading=!0,a.i(l.b)({}).then(function(t){e.officeIds=t.data.data.list,a.i(l.a)().then(function(t){e.data2=t.data.data,1==t.data.code?(e.dialogStatus="create",e.dialogFormVisible=!0,"platform"==localStorage.getItem("type")&&(e.filterText="",e.$nextTick(function(){e.filterText="business"})),e.listLoading=!1,1==e.officeIds.length&&(e.temp.officeId=e.officeIds[0].id)):e.listLoading=!1})}).catch(function(){e.listLoading=!1})},handleUpdate:function(e){var t=this;this.myselfUpdate=!0,this.listLoading=!0,a.i(l.p)(e.id).then(function(e){if(t.listLoading=!1,1==e.data.code){for(var a=e.data.data.menuListUnion,i=0;i<a.length;i++)if(void 0!=a[i].subMenus)for(var s=a[i].subMenus,n=0;n<s.length;n++)if(void 0!=s[n].subMenus)for(var r=s[n].subMenus,o=0;o<r.length;o++){var l=r[o];void 0!=l.permission&&"order_info"==l.permission&&void 0==l.disabled&&(r.remove(l),r.push(l))}for(var i=0;i<a.length;i++)if(void 0!=a[i].subMenus)for(var s=a[i].subMenus,n=0;n<s.length;n++)if(void 0!=s[n].subMenus)for(var r=s[n].subMenus,o=0;o<r.length;o++){var l=r[o];if(void 0!=l.permission&&"view"==l.permission.substring(l.permission.length-4,l.permission.length)&&void 0==l.disabled){r.remove(l),r.push(l)}}t.data2=a,"yes"==e.data.data.updateOwnFlag&&(t.myselfUpdate=!1),e.data.data.flagRoleId&&(t.myselfUpdate=!1,t.$nextTick(function(){t.myselfUpdate=!1})),t.dialogStatus="update",t.dialogFormVisible=!0;var c=e.data.data;t.roleId=c.id,setTimeout(function(){t.temp.officeId=c.organization.id},50),"platform"==localStorage.getItem("type")&&(t.filterText="",t.$nextTick(function(){t.filterText="business"})),t.temp.name=c.name,t.temp.dataScope="10",t.temp.check=c.menuIdListEdit,e.data.data.flag&&(t.selsctState=!0);for(var d=0;d<t.data2.length;d++)if("index"==t.data2[d].permission||t.temp.check.remove(t.data2[d].id),void 0!=t.data2[d].subMenus)for(var u=t.data2[d],f=0;f<u.subMenus.length;f++)t.temp.check.remove(u.subMenus[f].id);t.$nextTick(function(){t.$refs.domTree.setCheckedKeys(t.temp.check)})}else t.listLoading=!1})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1}).then(function(){var i={id:e.id};a.i(l.q)(i).then(function(e){1===e.data.code&&(t.$message({type:"success",message:"删除成功!"}),t.getList())}).catch(function(){t.listLoading=!1})}).catch(function(){t.$message({type:"warning",message:"已取消删除"})})},forOfTree:function(){var e=[],t=!0,a=!1,i=void 0;try{for(var s,r=n()(this.data2);!(t=(s=r.next()).done);t=!0){var o=s.value;if("sys"==o.type){e.push(o.id);var l=!0,c=!1,d=void 0;try{for(var u,f=n()(o.subMenus);!(l=(u=f.next()).done);l=!0){var h=u.value;if(e.push(h.id),h.subMenus){var p=!0,g=!1,m=void 0;try{for(var v,b=n()(h.subMenus);!(p=(v=b.next()).done);p=!0){var y=v.value;e.push(y.id)}}catch(e){g=!0,m=e}finally{try{!p&&b.return&&b.return()}finally{if(g)throw m}}}}}catch(e){c=!0,d=e}finally{try{!l&&f.return&&f.return()}finally{if(c)throw d}}}}}catch(e){a=!0,i=e}finally{try{!t&&r.return&&r.return()}finally{if(a)throw i}}return e},getLv:function(){},getFather:function(e){for(var t in e)void 0!=e[t].subMenus?this.getFather(e[t].subMenus):this.data2.indexOf(e[t].id)},create:function(e){var t=this,s=this.$refs.domTree.getCheckedKeys(),r="";if("business"==this.filterText){var o=this.forOfTree(),c=!0,d=!1,u=void 0;try{for(var f,h=n()(o);!(c=(f=h.next()).done);c=!0){var p=f.value;s.remove(p)}}catch(e){d=!0,u=e}finally{try{!c&&h.return&&h.return()}finally{if(d)throw u}}}0==s.length&&(this.temp.check=[]);for(var p=0;p<s.length;p++)r+=s[p]+",";var g={name:this.temp.name,dataScope:"10",menuIds:r,useable:"1",organization:{id:this.temp.officeId}};this.$refs[e].validate(function(s){if(!s){for(var n=t.$refs[e]._data.fields,r=[],o=0;o<n.length;o++)""!=n[o].validateMessage&&r.push(n[o].validateMessage);return t.$message({type:"error",message:r[0]}),!1}t.loadingClick(),t.btnState=!0,a.i(l.l)(g).then(function(a){t.btnState=!1,1===a.data.code?(i.close(),t.resetTemp(),t.$refs[e].resetFields(),t.$refs.domTree.setCheckedKeys([]),t.$message({type:"success",message:"添加成功"}),t.dialogFormVisible=!1,t.listQuery.page=1,t.pageNumber=1,t.search={name:"",officeId:""},t.handleFilter()):i.close()}).catch(function(e){i.close(),t.btnState=!1})})},update:function(e){var t=this,s=this.$refs.domTree.getCheckedKeys(),r="";if("business"==this.filterText){var o=this.forOfTree(),c=!0,d=!1,u=void 0;try{for(var f,h=n()(o);!(c=(f=h.next()).done);c=!0){var p=f.value;s.remove(p)}}catch(e){d=!0,u=e}finally{try{!c&&h.return&&h.return()}finally{if(d)throw u}}}0==s.length&&(this.temp.check=[]);for(var p=0;p<s.length;p++)r+=s[p]+",";var g={id:this.roleId,name:this.temp.name,dataScope:this.temp.dataScope,menuIds:r,useable:"1",organization:{id:this.temp.officeId}};this.$refs[e].validate(function(s){if(!s){for(var n=t.$refs[e]._data.fields,r=[],o=0;o<n.length;o++)""!=n[o].validateMessage&&r.push(n[o].validateMessage);return t.$message({type:"error",message:r[0]}),!1}t.loadingClick(),t.btnState=!0,a.i(l.r)(g).then(function(a){t.btnState=!1,1===a.data.code?(i.close(),t.selsctState=!1,t.resetTemp(),t.$refs.domTree.setCheckedKeys([]),t.$refs[e].resetFields(),t.dialogFormVisible=!1,t.$message({type:"success",message:"修改成功"}),t.getList()):i.close()}).catch(function(e){i.close(),t.btnState=!1})})},resetForm:function(e){this.selsctState=!1,this.dialogFormVisible=!1,this.$refs.domTree.setCheckedKeys([]),this.$refs[e].resetFields(),this.resetTemp()},resetTemp:function(){this.temp={officeId:"",name:"",dataScope:"10",check:[]}},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"timestamp"===e?a.i(d.a)(t[e]):t[e]})})}}}},DSmK:function(e,t,a){t=e.exports=a("acE3")(!1),t.push([e.i,".btn_right{margin-top:3px;float:right;width:75px}.btn_left{width:100px}.checkRightBox{border:1px solid #dcdcdc;padding:10px}.checkAllBox,.checkBox1{padding:10px 0}.checkBox1{border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc}.checkBox2,.checkBox3{padding:10px 0}.checkBox3{border-top:1px solid #dcdcdc}.checkBox1 .el-checkbox,.checkBox2 .el-checkbox,.checkBox3 .el-checkbox{margin-left:0;margin-right:15px}.bgWhite{background-color:#fff;padding:20px}.btn_pad{margin:0 0 20px 20px}.treecss .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node,.treecss .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node{float:left}.ceshi{height:25px;width:80px}.dialog-footer{text-align:center}.scrollBox{height:400px;overflow-y:scroll;overflow-x:hidden}.diasize .el-dialog{width:60%}",""])},"E3w+":function(e,t,a){var i=a("DSmK");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("XkoO")("a73a9434",i,!0)},GQcQ:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"filter-container bgWhite"},[a("el-input",{staticClass:"search",attrs:{placeholder:"请输入搜索的岗位名称"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.name,callback:function(t){e.search.name=t},expression:"search.name"}}),e._v(" "),a("el-select",{staticClass:"search",attrs:{filterable:"",clearable:"",placeholder:"选择机构"},model:{value:e.search.officeId,callback:function(t){e.search.officeId=t},expression:"search.officeId"}},e._l(e.officeIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("button",{staticClass:"button-large el-icon-search btn_search btn-color",on:{click:e.handleFilter}},[e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"bgWhite"},[-1!=e.btnShow.indexOf("role_insert")?a("button",{staticClass:"button-small btn_pad btn-color",on:{click:e.handleCreate}},[e._v("新增")]):e._e(),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"正在加载",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"编号",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"岗位名称",align:"center",prop:"name"}}),e._v(" "),a("el-table-column",{attrs:{label:"机构名称",align:"center",prop:"organization.name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[-1!=e.btnShow.indexOf("role_update")?a("el-button",{staticClass:"el-icon-edit ceshi3",on:{click:function(a){e.handleUpdate(t.row)}}}):e._e(),e._v(" "),-1!=e.btnShow.indexOf("role_delete")?a("el-button",{staticClass:"el-icon-delete ceshi3",on:{click:function(a){e.handleDelete(t.row)}}}):e._e()]}}])})],1),e._v(" "),e.listLoading?e._e():a("div",{staticClass:"pagination-container clearfix"},[a("el-pagination",{staticClass:"fr mt20",attrs:{"current-page":e.listQuery.page,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{staticClass:"diatable diasize",attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1,id:"diatable"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"temp",staticClass:"small-space dia_form",attrs:{model:e.temp,"label-position":"left",rules:e.rules,"label-width":"160px"}},[a("el-form-item",{attrs:{label:"所属机构:",prop:"officeId"}},[a("el-select",{staticClass:"form_item",attrs:{disabled:e.selsctState,filterable:"",placeholder:"请选择"},on:{change:e.orgChange},model:{value:e.temp.officeId,callback:function(t){e.temp.officeId=t},expression:"temp.officeId"}},e._l(e.officeIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"岗位名称:",prop:"name"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入2-15位的岗位名称"},model:{value:e.temp.name,callback:function(t){e.temp.name="string"==typeof t?t.trim():t},expression:"temp.name"}})],1),e._v(" "),a("el-form-item",{staticClass:"treecss",attrs:{label:"权限:",prop:"check"}},[a("el-tree",{ref:"domTree",staticClass:"scrollBox form_item",attrs:{data:e.data2,indent:30,"show-checkbox":"","node-key":"id","filter-node-method":e.filterNode,"default-expand-all":!0,props:e.defaultProps},on:{"check-change":e.handTreechange,"node-click":e.nodeClick,"current-change":e.currentChange,"node-expand":e.nodeExpand,"node-collapse":e.nodeCollapse},model:{value:e.temp.check,callback:function(t){e.temp.check=t},expression:"temp.check"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},["update"==e.dialogStatus&&e.myselfUpdate?a("button",{staticClass:"button-large btn-color",attrs:{disabled:e.btnState},on:{click:function(t){e.update("temp")}}},[e._v("保 存")]):e._e(),e._v(" "),"create"==e.dialogStatus?a("button",{staticClass:"button-large btn-color",attrs:{disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]):e._e(),e._v(" "),a("button",{staticClass:"button-cancel btn-color-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1),e._v(" "),a("roleDialog",{attrs:{treeData:e.data2,diaState:e.roleDiaState}})],1)])])},s=[],n={render:i,staticRenderFns:s};t.a=n},IM03:function(e,t,a){var i=a("xKxB");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("XkoO")("1b3d8880",i,!0)},V4yq:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"diatable diasize",attrs:{visible:e.diaState,"show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1,id:"diatable"},on:{"update:visible":function(t){e.diaState=t}}},[a("el-form",{ref:"temp",staticClass:"small-space dia_form",attrs:{model:e.temp,"label-position":"left","label-width":"160px"}},[a("p",[e._v("子组件")]),e._v(" "),a("el-form-item",{attrs:{label:"所属机构:",prop:"officeId"}},[a("el-select",{staticClass:"form_item",attrs:{disabled:e.selsctState,filterable:"",placeholder:"请选择"},model:{value:e.temp.officeId,callback:function(t){e.temp.officeId=t},expression:"temp.officeId"}},e._l(e.officeIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"岗位名称:",prop:"name"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入2-15位的岗位名称"},model:{value:e.temp.name,callback:function(t){e.temp.name="string"==typeof t?t.trim():t},expression:"temp.name"}})],1),e._v(" "),a("el-form-item",{staticClass:"treecss",attrs:{label:"权限:",prop:"check"}},[a("el-tree",{ref:"domTree",staticClass:"scrollBox form_item",attrs:{data:e.treeData,indent:30,"show-checkbox":"","node-key":"id","default-expand-all":!0,props:e.defaultProps},on:{"check-change":e.handTreechange,"node-click":e.nodeClick,"current-change":e.currentChange,"node-expand":e.nodeExpand,"node-collapse":e.nodeCollapse},model:{value:e.temp.check,callback:function(t){e.temp.check=t},expression:"temp.check"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},["update"==e.dialogStatus&&e.myselfUpdate?a("button",{staticClass:"button-large btn-color",attrs:{disabled:e.btnState},on:{click:function(t){e.update("temp")}}},[e._v("保 存")]):e._e(),e._v(" "),a("button",{staticClass:"button-large btn-color",attrs:{disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel btn-color-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1)},s=[],n={render:i,staticRenderFns:s};t.a=n},Vc3t:function(e,t,a){"use strict";function i(){var e={};return l.a.get("sign")?e=JSON.parse(l.a.get("sign")):r.a.get("/apiservice/oss/getSign").then(function(t){var a=t.data;l.a.set("sign",n()(a)),e=JSON.parse(l.a.get("sign"))}),e}t.a=i;var s=a("3cXf"),n=a.n(s),r=a("Vo7i"),o=a("Z7nP"),l=a.n(o)},WWhx:function(e,t,a){"use strict";var i=a("Z7nP"),s=(a.n(i),a("oppB"));a("Vc3t");t.a={name:"role-dialog",data:function(){return{btnShow:JSON.parse(localStorage.getItem("btn")),btnState:!1,selsctState:!1,myselfUpdate:!0,officeIds:[],treeData:[],temp:{name:"",dataScope:"10",check:[],officeId:""},stationLv:[{id:"1",value:"一级"},{id:"2",value:"二级"},{id:"3",value:"三级"},{id:"4",value:"四级"},{id:"5",value:"五级"},{id:"6",value:"六级"},{id:"7",value:"七级"},{id:"8",value:"八级"},{id:"9",value:"九级"},{id:"10",value:"十级"}],roleLv:[],dialogStatus:"",textMap:{update:"编辑岗位",create:"新增岗位"},defaultProps:{children:"subMenus",label:"name"}}},computed:{},created:function(){var e=this;console.log(this.diaState,"111111222"),a.i(s.a)().then(function(t){e.treeData=t.data.data}),a.i(s.b)({}).then(function(t){e.officeIds=t.data.data.list})},props:["diaState"],methods:{nodeClick:function(e,t,a){},currentChange:function(e,t){},nodeExpand:function(e,t,a){},nodeCollapse:function(e,t,a){},handTreechange:function(e,t,a){if(t){if(["order_time","order_dispatch","order_addTech","order_cancel"].indexOf(e.permission)>-1)for(var i=e.parentIds.split(","),s=0;s<this.treeData.length;s++)if(void 0!=this.treeData[s].subMenus)for(var n=0;n<this.treeData[s].subMenus.length;n++)"order"==this.treeData[s].subMenus[n].permission&&this.$refs.domTree.setChecked(this.treeData[s].subMenus[n].subMenus[this.treeData[s].subMenus[n].subMenus.length-2].id,!0);if(void 0==e.subMenus)for(var i=e.parentIds.split(","),s=0;s<this.treeData.length;s++)if(void 0!=this.treeData[s].subMenus)for(var n=0;n<this.treeData[s].subMenus.length;n++)if(this.treeData[s].subMenus[n].id==i[3]){var r=this.treeData[s].subMenus[n].subMenus[this.treeData[s].subMenus[n].subMenus.length-1];if(void 0!=r.permission){var o=r.permission,l=o.substring(o.length-4,o.length);"view"==l&&this.$refs.domTree.setChecked(r.id,!0)}}}else{if("order_info"==e.permission)for(var s=0;s<this.treeData.length;s++)if(void 0!=this.treeData[s].subMenus)for(var n=0;n<this.treeData[s].subMenus.length;n++)if("order"==this.treeData[s].subMenus[n].permission)for(var c=this.treeData[s].subMenus[n],d=0;d<c.subMenus.length-2;d++)this.temp.check.indexOf(c.subMenus[d].id)>-1&&(this.$refs.domTree.setChecked(this.treeData[s].subMenus[n].subMenus[c.subMenus.length-2].id,!0),this.temp.check=this.$refs.domTree.getCheckedKeys());if("view"==e.permission.substring(e.permission.length-4,e.permission.length))for(var u=e.parentIds.split(","),s=0;s<this.treeData.length;s++)if(void 0!=this.treeData[s].subMenus)for(var n=0;n<this.treeData[s].subMenus.length;n++)if(this.treeData[s].subMenus[n].id==u[3])for(var d=0;d<this.treeData[s].subMenus[n].subMenus.length-1;d++)this.temp.check.indexOf(this.treeData[s].subMenus[n].subMenus[d].id)>-1&&this.$refs.domTree.setChecked(this.treeData[s].subMenus[n].subMenus[this.treeData[s].subMenus[n].subMenus.length-1].id,!0)}this.temp.check=this.$refs.domTree.getCheckedKeys()},create:function(e){for(var t=this,i=this.$refs.domTree.getCheckedKeys(),n="",r=0;r<i.length;r++)n+=i[r]+",";var o={name:this.temp.name,dataScope:"10",menuIds:n,useable:"1",organization:{id:this.temp.officeId}};this.$refs[e].validate(function(i){if(!i){for(var n=t.$refs[e]._data.fields,r=[],l=0;l<n.length;l++)""!=n[l].validateMessage&&r.push(n[l].validateMessage);return t.$message({type:"error",message:r[0]}),!1}t.btnState=!0,a.i(s.l)(o).then(function(a){t.btnState=!1,1===a.data.code&&(t.resetTemp(),t.$refs[e].resetFields(),t.$refs.domTree.setCheckedKeys([]),t.$message({type:"success",message:"添加成功"}),t.diaState=!1)}).catch(function(e){t.btnState=!1})})},resetTemp:function(){this.temp={officeId:"",name:"",dataScope:"10",check:[]}},resetForm:function(){this.$emit("diaState",!1)}}}},a3Yh:function(e,t,a){"use strict";t.__esModule=!0;var i=a("liLe"),s=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(e,t,a){return t in e?(0,s.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},adMp:function(e,t,a){a("pBXl");var i=a("UusJ").Object;e.exports=function(e,t,a){return i.defineProperty(e,t,a)}},cAgV:function(e,t,a){"use strict";var i=a("jdeu"),s=function(e){e.directive("waves",i.a)};window.Vue&&(window.waves=i.a,Vue.use(s)),i.a.install=s,t.a=i.a},ctMr:function(e,t,a){var i=a("0mb+");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("XkoO")("6876092b",i,!0)},jdeu:function(e,t,a){"use strict";var i=a("aA9S"),s=a.n(i),n=a("ctMr");a.n(n);t.a={bind:function(e,t){e.addEventListener("click",function(a){var i=s()({},t.value),n=s()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),r=n.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var o=r.getBoundingClientRect(),l=r.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(o.width,o.height)+"px",r.appendChild(l)),n.type){case"center":l.style.top=o.height/2-l.offsetHeight/2+"px",l.style.left=o.width/2-l.offsetWidth/2+"px";break;default:l.style.top=a.pageY-o.top-l.offsetHeight/2-document.body.scrollTop+"px",l.style.left=a.pageX-o.left-l.offsetWidth/2-document.body.scrollLeft+"px"}return l.style.backgroundColor=n.color,l.className="waves-ripple z-active",!1}},!1)}}},liLe:function(e,t,a){e.exports={default:a("adMp"),__esModule:!0}},oppB:function(e,t,a){"use strict";function i(e){return x.a.post("/apiservice/a/sys/user/saveData",e)}function s(e){return x.a.post("/apiservice/a/sys/user/upData",e)}function n(e){return x.a.post("/apiservice/a/sys/user/formData",e)}function r(e,t,a){return x.a.post("/apiservice/a/sys/role/listPageData?pageNo="+t+"&pageSize="+a,e)}function o(e){return x.a.post("/apiservice/a/sys/role/listDataWithoutPermission",e)}function l(e,t,a){return x.a.post("/apiservice/a/sys/user/listData?pageNo="+t+"&pageSize="+a,e)}function c(e){return x.a.post("/apiservice/a/sys/role/saveData",e)}function d(e){return x.a.post("/apiservice/a/sys/role/upData",e)}function u(e){return x.a.post("/apiservice/a/sys/role/deleteRole",e)}function f(e){return x.a.get("/apiservice/a/sys/role/getRoleDetail?id="+e)}function h(e){return x.a.post("/apiservice/a/sys/organization/getOrgByTypeOrgId",e)}function p(e){return x.a.post("/apiservice/a/service/station/serviceStation/listStationByOrgId",e)}function g(e){return x.a.post("/apiservice/a/sys/organization/listDataAll",e)}function m(e){return x.a.post("/apiservice/a/service/station/serviceStation/listByOffice",e)}function v(){return x.a.get("/apiservice/a/sys/menu/getMenuList")}function b(e){return x.a.post("/apiservice/a/sys/user/deleteUser",e)}function y(e){return x.a.get("/apiservice/a/sys/role/chkName?id="+e.id+"&name="+e.name)}function k(e){return x.a.get("/apiservice/a/sys/role/chkNameUpdate?id="+e.id+"&name="+e.name+"&roleId="+e.roleId)}t.k=i,t.m=s,t.g=n,t.o=r,t.j=o,t.e=l,t.l=c,t.r=d,t.q=u,t.p=f,t.f=h,t.i=p,t.b=g,t.c=m,t.a=v,t.h=b,t.d=y,t.n=k;var x=a("Vo7i")},pBXl:function(e,t,a){var i=a("MITN");i(i.S+i.F*!a("M7ni"),"Object",{defineProperty:a("qRYU").f})},r7Bm:function(e,t,a){"use strict";function i(e){a("E3w+")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("5mkB"),n=a("GQcQ"),r=a("J0+h"),o=i,l=r(s.a,n.a,o,null,null);t.default=l.exports},xKxB:function(e,t,a){t=e.exports=a("acE3")(!1),t.push([e.i,".treecss .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node,.treecss .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node{float:left}.ceshi{height:25px;width:80px}.dialog-footer{text-align:center}.scrollBox{height:400px;overflow-y:scroll;overflow-x:hidden}.diasize .el-dialog{width:60%}",""])},zfsD:function(e,t,a){"use strict";function i(e){a("IM03")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("WWhx"),n=a("V4yq"),r=a("J0+h"),o=i,l=r(s.a,n.a,o,null,null);t.default=l.exports}});