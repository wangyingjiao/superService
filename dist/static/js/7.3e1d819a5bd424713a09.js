webpackJsonp([7],{"53Jg":function(e,t,a){"use strict";function s(e){a("M5SP")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("TdOQ"),o=a("gk2A"),n=a("VU/8"),r=s,l=n(i.a,o.a,r,null,null);t.default=l.exports},"9bBU":function(e,t,a){a("mClu");var s=a("FeBl").Object;e.exports=function(e,t,a){return s.defineProperty(e,t,a)}},C4MV:function(e,t,a){e.exports={default:a("9bBU"),__esModule:!0}},M5SP:function(e,t,a){var s=a("STqX");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("rjj0")("fe2b6124",s,!0)},STqX:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".btn_right{margin-top:3px;float:right;width:75px}.btn_left{width:100px}.btn_station{background-color:#aeaeae}.checkRightBox{border:1px solid #dcdcdc;padding:10px}.checkAllBox,.checkBox1{padding:10px 0}.checkBox1{border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc}.checkBox2,.checkBox3{padding:10px 0}.checkBox3{border-top:1px solid #dcdcdc}.twoDialog{width:100%}.bgWhite{background-color:#fff;padding:20px}.btn_pad{margin:0 0 20px 20px}.el-table{font-size:12px}.el-table__header-wrapper{font-size:14px}.ceshi{height:25px;width:80px}.ceshi2 label{padding-left:12px}.ceshi4{color:#999;border:1px solid #b9b9b9;font-size:14px;background-color:#fff}.checkBox1 .el-checkbox,.checkBox2 .el-checkbox,.checkBox3 .el-checkbox{margin-left:0;margin-right:15px}.dialog-footer{text-align:center}.treecss .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node,.treecss .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node{float:left}.btn_addStation{background-color:#fff;border:1px solid #4c70e8;color:#4c70e8}.btn_addStation,.btn_gray{float:right;height:36px;width:80px;text-align:center;line-height:34px;cursor:pointer}.btn_gray{background-color:#eef1f6;border:1px solid #d1dbe5;color:#bbb}.scrollBox{height:400px;overflow-y:scroll;overflow-x:hidden}.diasize .el-dialog{width:70%}.overheidden{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",""])},TdOQ:function(e,t,a){"use strict";var s,i=a("bOdI"),o=a.n(i),n=a("oppB"),r=(a("Vc3t"),a("cAgV"));t.a={name:"user",directives:{waves:r.a},data:function(){var e,t=this,a=function(e,a,s){"create"==t.dialogStatus?""===a?s(new Error("请输入6-20位密码")):(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(a)?s():s(new Error("密码必须由6-20位数字、字母组成")),""!==t.temp.password2&&t.$refs.temp.validateField("password2"),s()):""==a?s():/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(a)?s():s(new Error("密码必须由6-20位数字、字母两种组成"))},s=function(e,a,s){""===a?s(new Error("请再次输入密码")):a!==t.temp.password?s(new Error("两次输入密码不一致!")):s()},i=function(e,t,a){void 0==t?a():/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(t)?a():a(new Error("密码必须由6-20位数字、字母两种组成"))},n=function(e,t,a){if(!t)return a(new Error("登录账号不能为空"));/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(t)?a():a(new Error("登录账号（手机号）格式不正确！"))};return e={btnShow:JSON.parse(localStorage.getItem("btn")),btnState:!1,officeState:!1,statStatte:!1,roleState:!1,crBtnState:!1,useableState:!1,list:null,total:null,listLoading:!0,listQuery:{page:1,limit:10,importance:void 0,title:void 0,type:void 0,sort:"+id"},pageNumber:1,pageSize:10},o()(e,"total",1),o()(e,"search",{type:"name",val:"",officeId:"",stationId:""}),o()(e,"mechanismCheck",[]),o()(e,"servicestationCheck",[]),o()(e,"servicestationSearch",[]),o()(e,"userSearch",[]),o()(e,"temp",{mobile:"",name:"",password:"",password2:"",password3:"",officeId:"",stationId:"",roles:"",useable:"1",child:{check:[]}}),o()(e,"data2",[]),o()(e,"defaultProps",{children:"subMenus",label:"name"}),o()(e,"temp2",{officeId2:"",check:[],dataScope:"10",stationState:""}),o()(e,"stationState",""),o()(e,"stationCheck",[]),o()(e,"useableCheck",[{id:"1",name:"可用"},{id:"0",name:"不可用"}]),o()(e,"stationName",""),o()(e,"stationLv",[{id:"1",value:"一级"},{id:"2",value:"二级"},{id:"3",value:"三级"},{id:"4",value:"四级"},{id:"5",value:"五级"},{id:"6",value:"六级"},{id:"7",value:"七级"},{id:"8",value:"八级"},{id:"9",value:"九级"},{id:"10",value:"十级"}]),o()(e,"roleLv",[]),o()(e,"stationStateCheck",[{id:"1",name:"可用"},{id:"0",name:"不可用"}]),o()(e,"dialogFormVisible",!1),o()(e,"dialogFormStation",!1),o()(e,"dialogStatus",""),o()(e,"textMap",{update:"编辑员工",create:"新增员工"}),o()(e,"dialogPvVisible",!1),o()(e,"tableKey",0),o()(e,"isIndeterminate",!0),o()(e,"rules",{mobile:[{required:!0,validator:n,trigger:"blur"}],name:[{required:!0,message:"请输入 2 到 15 位的名称",trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],password:[{required:!0,validator:a,trigger:"blur"},{min:6,max:20,message:"密码长度6-20个字符",trigger:"blur"}],password2:[{required:!0,validator:s,trigger:"blur"}],password3:[{required:!0,validator:i,trigger:"blur"}],officeId:[{required:!0,message:"机构不能为空",trigger:"change"}],stationId:[{required:!0,message:"服务站不能为空",trigger:"change"}],role:[{required:!0,message:"岗位不能为空",trigger:"change"}]}),o()(e,"rules2",{officeId2:[{required:!0,message:"机构不能为空",trigger:"change"}],name:[{required:!0,message:"岗位名称不能为空",trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],dataScope:[{required:!0,message:"等级不能为空",trigger:"change"}],check:[{type:"array",required:!0,message:"权限不能为空",trigger:"check-change"}]}),e},filters:{statusFilter:function(e){return{published:"success",draft:"gray",deleted:"danger"}[e]}},created:function(){var e=this;this.getList(),a.i(n.b)({}).then(function(t){e.mechanismCheck=t.data.data.list}),a.i(n.c)().then(function(t){e.data2=t.data.data}),this.userSearch={name:"姓名",mobile:"手机",roleName:"岗位名称"};for(var t=localStorage.getItem("dataScope"),s=0;s<t;s++)this.roleLv.push(this.stationLv[s])},methods:{loadingClick:function(){s=this.$loading({lock:!0,spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)",target:document.querySelector(".el-dialog__body")})},searchChange:function(e){},getList:function(){var e=this;if("name"==this.search.type)var t={name:this.search.val,orgId:this.search.officeId,stationId:this.search.stationId};else if("mobile"==this.search.type)var t={mobile:this.search.val,orgId:this.search.officeId,stationId:this.search.stationId};else if("roleName"==this.search.type)var t={roleName:this.search.val,orgId:this.search.officeId,stationId:this.search.stationId};else var t={};this.listLoading=!0,a.i(n.d)(t,this.pageNumber,this.pageSize).then(function(t){if(1==t.data.code){if(e.total=t.data.data.count,e.list=t.data.data.list,e.pageNumber=t.data.data.pageNo,e.pageSize=t.data.data.pageSize,e.listQuery.page=t.data.data.pageNo,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.listLoading=!1}else e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.pageNumber=1,this.getList()},addRole:function(){this.dialogFormStation=!0,1==this.mechanismCheck.length&&(this.temp2.officeId2=this.mechanismCheck[0].id)},handleSizeChange:function(e){this.pageSize=e,this.listQuery.page=1,this.pageNumber=1,this.getList()},handleCurrentChange:function(e){this.pageNumber=e,this.getList()},handleCreate:function(){var e=this;a.i(n.b)({}).then(function(t){e.mechanismCheck=t.data.data.list,e.dialogStatus="create",e.dialogFormVisible=!0,e.resetTemp()})},handTreechange:function(e,t,a){if(t){if(["order_time","order_dispatch","order_addTech","order_cancel"].indexOf(e.permission)>-1)for(var s=e.parentIds.split(","),i=0;i<this.data2.length;i++)if(void 0!=this.data2[i].subMenus)for(var o=0;o<this.data2[i].subMenus.length;o++)"order"==this.data2[i].subMenus[o].permission&&this.$refs.domTree.setChecked(this.data2[i].subMenus[o].subMenus[this.data2[i].subMenus[o].subMenus.length-2].id,!0);if(void 0==e.subMenus)for(var s=e.parentIds.split(","),i=0;i<this.data2.length;i++)if(void 0!=this.data2[i].subMenus)for(var o=0;o<this.data2[i].subMenus.length;o++)if(this.data2[i].subMenus[o].id==s[3]){var n=this.data2[i].subMenus[o].subMenus[this.data2[i].subMenus[o].subMenus.length-1];if(void 0!=n.permission){var r=n.permission,l=r.substring(r.length-4,r.length);"view"==l&&this.$refs.domTree.setChecked(n.id,!0)}}}else{if("order_info"==e.permission)for(var i=0;i<this.data2.length;i++)if(void 0!=this.data2[i].subMenus)for(var o=0;o<this.data2[i].subMenus.length;o++)if("order"==this.data2[i].subMenus[o].permission)for(var c=this.data2[i].subMenus[o],d=0;d<c.subMenus.length-2;d++)this.temp2.check.indexOf(c.subMenus[d].id)>-1&&(this.$refs.domTree.setChecked(this.data2[i].subMenus[o].subMenus[c.subMenus.length-2].id,!0),this.temp2.check=this.$refs.domTree.getCheckedKeys());if("view"==e.permission.substring(e.permission.length-4,e.permission.length))for(var u=e.parentIds.split(","),i=0;i<this.data2.length;i++)if(void 0!=this.data2[i].subMenus)for(var o=0;o<this.data2[i].subMenus.length;o++)if(this.data2[i].subMenus[o].id==u[3])for(var d=0;d<this.data2[i].subMenus[o].subMenus.length-1;d++)this.temp2.check.indexOf(this.data2[i].subMenus[o].subMenus[d].id)>-1&&this.$refs.domTree.setChecked(this.data2[i].subMenus[o].subMenus[this.data2[i].subMenus[o].subMenus.length-1].id,!0)}this.temp2.check=this.$refs.domTree.getCheckedKeys()},handleUpdate:function(e){var t=this;a.i(n.b)({}).then(function(s){t.mechanismCheck=s.data.data.list,a.i(n.e)({id:e.id}).then(function(a){if(1===a.data.code){var s=a.data.data;t.temp={id:s.id,name:s.name,mobile:s.mobile,password:"",officeId:s.organization.id,stationId:s.station.id,role:s.role.id,useable:s.useable},setTimeout(function(){return t.temp.officeId=e.organization.id},30),setTimeout(function(){return t.temp.stationId=e.station.id},30),setTimeout(function(){return t.temp.role=e.role.id},30),"yes"==s.updateOwnFlag&&(t.officeState=!0,t.statStatte=!0,t.roleState=!0,t.crBtnState=!0,t.useableState=!0)}}),t.dialogFormVisible=!0,t.dialogStatus="update"})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1}).then(function(){var s={id:e.id};a.i(n.f)(s).then(function(e){1===e.data.code&&(t.$message({type:"success",message:"删除成功!"}),t.getList())}).catch(function(){t.$message({type:"error",message:"删除失败"})})}).catch(function(){t.$message({type:"warning",message:"已取消删除"})})},stationChange:function(e){},searchOffice:function(e){var t=this;if(this.search.stationId="",this.servicestationSearch=[],e){var s={orgId:e};a.i(n.g)(s).then(function(e){t.servicestationSearch=e.data.data})}},mechChange:function(e){var t=this;if(""!=e){this.temp.officeId=e,this.temp.stationId="",this.temp.role="",this.servicestationCheck=[],this.stationCheck=[];var s={orgId:e};a.i(n.g)(s).then(function(e){t.servicestationCheck=e.data.data});var i={organization:{id:e}};a.i(n.h)(i).then(function(e){void 0!=e.data.data&&"string"!=typeof e.data.data?t.stationCheck=e.data.data:t.stationCheck=[]}).catch(function(e){})}},getId:function(e){for(var t=0;t<this.objOptions.length;t++)if(e==this.objOptions[t].value)return this.objOptions[t].id},create:function(e){var t=this,i={mobile:this.temp.mobile,name:this.temp.name,newPassword:this.temp.password,officeId:this.temp.officeId,stationId:this.temp.stationId,roles:[this.temp.role],useable:this.temp.useable};this.$refs[e].validate(function(o){if(!o){for(var r=t.$refs[e]._data.fields,l=[],c=0;c<r.length;c++)""!=r[c].validateMessage&&l.push(r[c].validateMessage);return t.$message({type:"error",message:l[0]}),!1}t.loadingClick(),t.btnState=!0,a.i(n.i)(i).then(function(a){t.btnState=!1,1===a.data.code?(s.close(),t.dialogFormVisible=!1,t.resetTemp(),t.$refs[e].resetFields(),t.search.type="name",t.search.val="",t.search.officeId="",t.search.stationId="",t.handleFilter(),t.$message({type:"success",message:"新增成功"})):s.close()}).catch(function(e){s.close(),t.btnState=!1})})},create2:function(e){for(var t=this,s=this.$refs.domTree.getCheckedKeys(),i="",o=0;o<s.length;o++)i+=s[o]+",";var r={name:this.temp2.name,dataScope:"10",menuIds:i,useable:"1",organization:{id:this.temp2.officeId2}};this.$refs[e].validate(function(s){if(!s){for(var i=t.$refs[e]._data.fields,o=[],l=0;l<i.length;l++)""!=i[l].validateMessage&&o.push(i[l].validateMessage);return t.$message({type:"error",message:o[0]}),!1}t.btnState=!0,a.i(n.j)(r).then(function(a){t.btnState=!1,1===a.data.code&&(t.$refs.domTree.setCheckedKeys([]),t.$refs[e].resetFields(),t.dialogFormStation=!1,t.$message({type:"success",message:"添加成功"}),a.data.data.organization.id==t.temp.officeId&&(t.stationCheck.push(a.data.data),t.temp.role=a.data.data.id))}).catch(function(e){t.btnState=!1})})},update:function(e){var t=this,i=this,o={id:this.temp.id,mobile:this.temp.mobile,name:this.temp.name,newPassword:this.temp.password,officeId:this.temp.officeId,stationId:this.temp.stationId,roles:[this.temp.role],useable:this.temp.useable};this.$refs[e].validate(function(r){if(!r){for(var l=t.$refs[e]._data.fields,c=[],d=0;d<l.length;d++)""!=l[d].validateMessage&&c.push(l[d].validateMessage);return t.$message({type:"error",message:c[0]}),!1}t.loadingClick(),t.btnState=!0,a.i(n.k)(o).then(function(a){t.btnState=!1,1==a.data.code?(s.close(),t.temp.id==localStorage.getItem("userId")&&o.name!=localStorage.getItem("name")&&(localStorage.setItem("name",o.name),t.$store.commit("SET_NAME",localStorage.getItem("name"))),t.officeState=!1,t.statStatte=!1,t.roleState=!1,t.crBtnState=!1,t.useableState=!1,t.temp.id==localStorage.getItem("userId")&&""!=o.newPassword?t.$store.dispatch("LogOut").then(function(e){t.$message({type:"error",message:"密码被修改 3 秒后进入登录页面！"}),t.dialogFormVisible=!1,setTimeout(function(){t.$store.state.app.visitedViews=[],i.$router.push({path:"/login"}),location.reload()},2e3)}).catch(function(){t.listLoading=!1}):(t.dialogFormVisible=!1,t.resetTemp(),t.$refs[e].resetFields(),t.getList(),t.$message({type:"success",message:"修改成功"}))):s.close()}).catch(function(e){s.close(),t.btnState=!1})})},resetTemp:function(){this.temp={name:"",mobile:"",password:"",password2:"",password3:"",officeId:"",stationId:"",role:"",useable:"1"}},resetTemp2:function(){this.temp2={officeId2:"",name:"",dataScope:"",check:[]}},resetForm:function(e){this.dialogFormVisible=!1,this.resetTemp(),this.$refs[e].resetFields(),this.officeState=!1,this.statStatte=!1,this.roleState=!1,this.crBtnState=!1,this.useableState=!1},resetForm2:function(e){this.temp2={officeId2:"",name:"",dataScope:"10",check:[]},this.dialogFormStation=!1,this.$refs.domTree.setCheckedKeys([]),this.$refs[e].resetFields()},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"timestamp"===e?parseTime(t[e]):t[e]})})}}}},Vc3t:function(e,t,a){"use strict";function s(){var e={};return l.a.get("sign")?e=JSON.parse(l.a.get("sign")):n.a.get("/apiservice/oss/getSign").then(function(t){var a=t.data;l.a.set("sign",o()(a)),e=JSON.parse(l.a.get("sign"))}),e}t.a=s;var i=a("mvHQ"),o=a.n(i),n=a("Vo7i"),r=a("lbHh"),l=a.n(r)},XZlg:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},bOdI:function(e,t,a){"use strict";t.__esModule=!0;var s=a("C4MV"),i=function(e){return e&&e.__esModule?e:{default:e}}(s);t.default=function(e,t,a){return t in e?(0,i.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},cAgV:function(e,t,a){"use strict";var s=a("jdeu"),i=function(e){e.directive("waves",s.a)};window.Vue&&(window.waves=s.a,Vue.use(i)),s.a.install=i,t.a=s.a},ctMr:function(e,t,a){var s=a("XZlg");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("rjj0")("44fae30e",s,!0)},gk2A:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"filter-container bgWhite"},[a("el-input",{staticStyle:{width:"30%","margin-right":"2%"},attrs:{placeholder:"请输入搜索内容"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.val,callback:function(t){e.search.val=t},expression:"search.val"}},[a("el-select",{staticStyle:{width:"100px"},attrs:{clearable:"",placeholder:"请选择"},on:{change:e.searchChange},slot:"prepend",model:{value:e.search.type,callback:function(t){e.search.type=t},expression:"search.type"}},e._l(e.userSearch,function(e,t,s){return a("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-select",{staticClass:"search",attrs:{filterable:"",clearable:"",placeholder:"选择机构"},on:{change:e.searchOffice},model:{value:e.search.officeId,callback:function(t){e.search.officeId=t},expression:"search.officeId"}},e._l(e.mechanismCheck,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-select",{staticClass:"search",attrs:{filterable:"",clearable:"",placeholder:"选择服务站"},model:{value:e.search.stationId,callback:function(t){e.search.stationId=t},expression:"search.stationId"}},e._l(e.servicestationSearch,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("button",{staticClass:"button-large el-icon-search btn_search btn-color",on:{click:e.handleFilter}},[e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"bgWhite"},[e.btnShow.indexOf("user_insert")>=0?a("button",{staticClass:"button-small btn_pad btn-color",on:{click:e.handleCreate}},[e._v("新增")]):e._e(),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"正在加载",fit:""}},[a("el-table-column",{attrs:{align:"center",label:"编号",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"姓名"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{placement:"left",disabled:t.row.name.length<10,content:t.row.name}},[a("div",{staticClass:"overheidden"},[e._v(e._s(t.row.name))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"登录账号",prop:"mobile"}}),e._v(" "),a("el-table-column",{attrs:{label:"岗位名称",align:"center",prop:"role.name"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{placement:"left",disabled:t.row.role.name.length<10,content:t.row.role.name}},[a("div",{staticClass:"overheidden"},[e._v(e._s(t.row.role.name))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"服务机构",prop:"organization.name"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{placement:"left",disabled:t.row.organization.name.length<10,content:t.row.organization.name}},[a("div",{staticClass:"overheidden"},[e._v(e._s(t.row.organization.name))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"服务站"},scopedSlots:e._u([{key:"default",fn:function(t){return[0!=t.row.organization.id&&0==t.row.station.id?a("span",[e._v("本机构")]):a("span",[e._v(e._s(t.row.station.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{"class-name":"status-col",label:"状态",align:"center",prop:"useable"},scopedSlots:e._u([{key:"default",fn:function(t){return["1"==t.row.useable?a("span",[e._v("可用")]):e._e(),e._v(" "),"0"==t.row.useable?a("span",[e._v("不可用")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.btnShow.indexOf("user_update")>=0?a("el-button",{staticClass:"el-icon-edit ceshi3",on:{click:function(a){e.handleUpdate(t.row)}}}):e._e(),e._v(" "),e.btnShow.indexOf("user_delete")>=0?a("el-button",{staticClass:"el-icon-delete ceshi3",on:{click:function(a){e.handleDelete(t.row)}}}):e._e()]}}])})],1),e._v(" "),e.listLoading?e._e():a("div",{staticClass:"pagination-container clearfix"},[a("el-pagination",{staticClass:"fr mt20",attrs:{"current-page":e.listQuery.page,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"show-close":!1,"lock-scroll":!0,"close-on-click-modal":!1,"close-on-press-escape":!1,id:"diatable",minwidth:"700px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"temp",staticClass:"small-space dia_form",attrs:{model:e.temp,"label-position":"left","label-width":"160px",rules:e.rules}},[a("el-form-item",{attrs:{label:"姓名:",prop:"name"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入2-15位的姓名"},model:{value:e.temp.name,callback:function(t){e.temp.name=t},expression:"temp.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"登录账号:",prop:"mobile"}},[a("el-input",{staticClass:"form_item",attrs:{disabled:"update"==e.dialogStatus,placeholder:"请输入登录账号（手机号）"},model:{value:e.temp.mobile,callback:function(t){e.temp.mobile=t},expression:"temp.mobile"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码:",prop:"password"}},[a("el-input",{staticClass:"form_item",attrs:{type:"password",placeholder:"请使用6-20位字母、数字两种组合"},model:{value:e.temp.password,callback:function(t){e.temp.password=t},expression:"temp.password"}})],1),e._v(" "),"create"==e.dialogStatus?a("el-form-item",{attrs:{label:"确认密码:",prop:"password2"}},[a("el-input",{staticClass:"form_item",attrs:{type:"password",placeholder:"再次填写密码"},model:{value:e.temp.password2,callback:function(t){e.temp.password2=t},expression:"temp.password2"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"服务机构:",prop:"officeId"}},[a("el-select",{staticClass:"form_item",attrs:{filterable:"",disabled:e.officeState,placeholder:"请选择"},on:{change:e.mechChange},model:{value:e.temp.officeId,callback:function(t){e.temp.officeId=t},expression:"temp.officeId"}},e._l(e.mechanismCheck,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"服务站:",prop:"stationId"}},[a("el-select",{staticClass:"form_item",attrs:{filterable:"",disabled:e.statStatte,placeholder:"请选择"},on:{change:e.stationChange},model:{value:e.temp.stationId,callback:function(t){e.temp.stationId=t},expression:"temp.stationId"}},e._l(e.servicestationCheck,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"选择岗位:",prop:"role"}},[a("el-select",{ref:"domSelect",staticStyle:{width:"80%"},attrs:{filterable:"",disabled:e.roleState,placeholder:"请选择"},model:{value:e.temp.role,callback:function(t){e.temp.role=t},expression:"temp.role"}},e._l(e.stationCheck,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),e.crBtnState?a("div",{staticClass:"btn_gray",staticStyle:{width:"20%"}},[e._v("新 增")]):a("div",{staticClass:"btn_addStation",staticStyle:{width:"20%"},on:{click:e.addRole}},[e._v("新 增")])],1),e._v(" "),a("el-form-item",{attrs:{label:"可用状态:"}},[a("el-select",{staticClass:"form_item",attrs:{disabled:e.useableState,placeholder:"请选择"},model:{value:e.temp.useable,callback:function(t){e.temp.useable=t},expression:"temp.useable"}},e._l(e.useableCheck,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},["update"==e.dialogStatus?a("button",{staticClass:"button-large btn-color",attrs:{disabled:e.btnState},on:{click:function(t){e.update("temp")}}},[e._v("保 存")]):e._e(),e._v(" "),"create"==e.dialogStatus?a("button",{staticClass:"button-large btn-color",attrs:{disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]):e._e(),e._v(" "),a("button",{staticClass:"button-cancel btn-color-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1),e._v(" "),a("el-dialog",{staticClass:"twoDialog diasize",attrs:{title:"新增岗位",visible:e.dialogFormStation,"append-to-body":"","show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogFormStation=t}}},[a("el-form",{ref:"temp2",staticClass:"small-space",staticStyle:{width:"100%",padding:"0 6%"},attrs:{model:e.temp2,"label-position":"left",rules:e.rules2,"label-width":"80px"}},[a("el-form-item",{attrs:{label:" 所属机构:",prop:"officeId2"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",placeholder:"请选择"},model:{value:e.temp2.officeId2,callback:function(t){e.temp2.officeId2=t},expression:"temp2.officeId2"}},e._l(e.mechanismCheck,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"岗位名称:",prop:"name"}},[a("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:"请输入2-15位的岗位名称"},model:{value:e.temp2.name,callback:function(t){e.temp2.name="string"==typeof t?t.trim():t},expression:"temp2.name"}})],1),e._v(" "),a("el-form-item",{staticClass:"treecss",attrs:{label:"权限:",prop:"check"}},[a("el-tree",{ref:"domTree",staticClass:"scrollBox",staticStyle:{width:"100%"},attrs:{data:e.data2,indent:30,"show-checkbox":"","node-key":"id","default-expand-all":!0,props:e.defaultProps},on:{"check-change":e.handTreechange},model:{value:e.temp2.check,callback:function(t){e.temp2.check=t},expression:"temp2.check"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},[a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.create2("temp2")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm2("temp2")}}},[e._v("取 消")])])],1)],1)])])},i=[],o={render:s,staticRenderFns:i};t.a=o},jdeu:function(e,t,a){"use strict";var s=a("woOf"),i=a.n(s),o=a("ctMr");a.n(o);t.a={bind:function(e,t){e.addEventListener("click",function(a){var s=i()({},t.value),o=i()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},s),n=o.ele;if(n){n.style.position="relative",n.style.overflow="hidden";var r=n.getBoundingClientRect(),l=n.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(r.width,r.height)+"px",n.appendChild(l)),o.type){case"center":l.style.top=r.height/2-l.offsetHeight/2+"px",l.style.left=r.width/2-l.offsetWidth/2+"px";break;default:l.style.top=a.pageY-r.top-l.offsetHeight/2-document.body.scrollTop+"px",l.style.left=a.pageX-r.left-l.offsetWidth/2-document.body.scrollLeft+"px"}return l.style.backgroundColor=o.color,l.className="waves-ripple z-active",!1}},!1)}}},mClu:function(e,t,a){var s=a("kM2E");s(s.S+s.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},oppB:function(e,t,a){"use strict";function s(e){return k.a.post("/apiservice/a/sys/user/saveData",e)}function i(e){return k.a.post("/apiservice/a/sys/user/upData",e)}function o(e){return k.a.post("/apiservice/a/sys/user/formData",e)}function n(e,t,a){return k.a.post("/apiservice/a/sys/role/listPageData?pageNo="+t+"&pageSize="+a,e)}function r(e){return k.a.post("/apiservice/a/sys/role/listDataWithoutPermission",e)}function l(e,t,a){return k.a.post("/apiservice/a/sys/user/listData?pageNo="+t+"&pageSize="+a,e)}function c(e){return k.a.post("/apiservice/a/sys/role/saveData",e)}function d(e){return k.a.post("/apiservice/a/sys/role/upData",e)}function u(e){return k.a.post("/apiservice/a/sys/role/deleteRole",e)}function p(e){return k.a.get("/apiservice/a/sys/role/getRoleDetail?id="+e)}function h(e){return k.a.post("/apiservice/a/sys/organization/listDataAll",e)}function f(e){return k.a.post("/apiservice/a/service/station/serviceStation/listByOffice",e)}function m(){return k.a.get("/apiservice/a/sys/menu/getMenuList")}function g(e){return k.a.post("/apiservice/a/sys/user/deleteUser",e)}function b(e){return k.a.get("/apiservice/a/sys/role/chkName?id="+e.id+"&name="+e.name)}function v(e){return k.a.get("/apiservice/a/sys/role/chkNameUpdate?id="+e.id+"&name="+e.name+"&roleId="+e.roleId)}t.i=s,t.k=i,t.e=o,t.m=n,t.h=r,t.d=l,t.j=c,t.p=d,t.o=u,t.n=p,t.b=h,t.g=f,t.c=m,t.f=g,t.a=b,t.l=v;var k=a("Vo7i")}});