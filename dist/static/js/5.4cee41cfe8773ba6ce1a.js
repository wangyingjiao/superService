webpackJsonp([5],{"/0s5":function(e,t,a){"use strict";function i(e){a("pWQp")}Object.defineProperty(t,"__esModule",{value:!0});var n=a("oiIR"),o=a("M6/Q"),s=a("VU/8"),r=i,l=s(n.a,o.a,r,null,null);t.default=l.exports},"/n6Q":function(e,t,a){a("zQR9"),a("+tPU"),e.exports=a("Kh4W").f("iterator")},"06OY":function(e,t,a){var i=a("3Eo+")("meta"),n=a("EqjI"),o=a("D2L2"),s=a("evD5").f,r=0,l=Object.isExtensible||function(){return!0},c=!a("S82l")(function(){return l(Object.preventExtensions({}))}),d=function(e){s(e,i,{value:{i:"O"+ ++r,w:{}}})},u=function(e,t){if(!n(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,i)){if(!l(e))return"F";if(!t)return"E";d(e)}return e[i].i},f=function(e,t){if(!o(e,i)){if(!l(e))return!0;if(!t)return!1;d(e)}return e[i].w},p=function(e){return c&&h.NEED&&l(e)&&!o(e,i)&&d(e),e},h=e.exports={KEY:i,NEED:!1,fastKey:u,getWeak:f,onFreeze:p}},"0xDb":function(e,t,a){"use strict";function i(e,t){if(0===arguments.length)return null;var a=t||"{y}-{m}-{d} {h}:{i}:{s}",i=void 0;"object"===(void 0===e?"undefined":o()(e))?i=e:(10===(""+e).length&&(e=1e3*parseInt(e)),i=new Date(e));var n={y:i.getFullYear(),m:i.getMonth()+1,d:i.getDate(),h:i.getHours(),i:i.getMinutes(),s:i.getSeconds(),a:i.getDay()};return a.replace(/{(y|m|d|h|i|s|a)+}/g,function(e,t){var a=n[t];return"a"===t?["一","二","三","四","五","六","日"][a-1]:(e.length>0&&a<10&&(a="0"+a),a||0)})}t.a=i;var n=a("pFYg"),o=a.n(n)},"5DwC":function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".btn_left,.btn_right{width:100px}.checkRightBox{border:1px solid #dcdcdc;padding:10px}.checkAllBox,.checkBox1{padding:10px 0}.checkBox1{border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc}.checkBox2,.checkBox3{padding:10px 0}.checkBox3{border-top:1px solid #dcdcdc}.checkBox1 .el-checkbox,.checkBox2 .el-checkbox,.checkBox3 .el-checkbox{margin-left:0;margin-right:15px}body{background-color:#eef1f6}.bgWhite{background-color:#fff;padding:15px 20px 20px}.btn_pad{margin:0 0 15px 20px}.btn_right{float:right}.el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node,.el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node{float:left}.el-tree-node:first-child\r\n  .el-tree-node__children\r\n  .el-tree-node__children\r\n  .el-tree-node{float:none}.ceshi{height:25px;width:80px}.ceshi3{font-size:14px;color:#1d85fe;border:1px solid #1d85fe;background-color:#fff}.dialog-footer{text-align:center}.scrollBox{height:400px;overflow-y:scroll;overflow-x:hidden}",""])},"5QVw":function(e,t,a){e.exports={default:a("BwfY"),__esModule:!0}},"7UMu":function(e,t,a){var i=a("R9M2");e.exports=Array.isArray||function(e){return"Array"==i(e)}},"9bBU":function(e,t,a){a("mClu");var i=a("FeBl").Object;e.exports=function(e,t,a){return i.defineProperty(e,t,a)}},BwfY:function(e,t,a){a("fWfb"),a("M6a0"),a("OYls"),a("QWe/"),e.exports=a("FeBl").Symbol},C4MV:function(e,t,a){e.exports={default:a("9bBU"),__esModule:!0}},Kh4W:function(e,t,a){t.f=a("dSzd")},LKZe:function(e,t,a){var i=a("NpIQ"),n=a("X8DO"),o=a("TcQ7"),s=a("MmMw"),r=a("D2L2"),l=a("SfB7"),c=Object.getOwnPropertyDescriptor;t.f=a("+E39")?c:function(e,t){if(e=o(e),t=s(t,!0),l)try{return c(e,t)}catch(e){}if(r(e,t))return n(!i.f.call(e,t),e[t])}},"M6/Q":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"filter-container bgWhite"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入搜索的岗位名称"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.name,callback:function(t){e.search.name=t},expression:"search.name"}}),e._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"选择机构"},model:{value:e.search.officeId,callback:function(t){e.search.officeId=t},expression:"search.officeId"}},e._l(e.officeIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("button",{staticClass:"button-large el-icon-search btn_right",on:{click:e.handleFilter}},[e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"bgWhite"},[e.btnShow.indexOf("role_insert")>=0?a("button",{staticClass:"button-small btn_right btn_pad ceshi",on:{click:e.handleCreate}},[e._v("新       增")]):e._e(),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"正在加载",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"编号",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"岗位名称",align:"center",prop:"name"}}),e._v(" "),a("el-table-column",{attrs:{label:"机构名称",align:"center",prop:"organization.name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.btnShow.indexOf("role_update")>=0?a("el-button",{staticClass:"el-icon-edit ceshi3",on:{click:function(a){e.handleUpdate(t.row)}}}):e._e(),e._v(" "),e.btnShow.indexOf("role_delete")>=0?a("el-button",{staticClass:"el-icon-delete ceshi3",on:{click:function(a){e.handleDelete(t.row)}}}):e._e()]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{staticClass:"fr mt20",attrs:{"current-page":e.listQuery.page,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{staticClass:"diatable",attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"temp",staticClass:"small-space",staticStyle:{width:"500px","margin-left":"20px"},attrs:{model:e.temp,"label-position":"left",rules:e.rules,"label-width":"160px"}},[a("el-form-item",{attrs:{label:" 所属机构:",prop:"officeId"}},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"400px"},attrs:{placeholder:"请选择"},on:{change:e.aaa},model:{value:e.temp.officeId,callback:function(t){e.temp.officeId=t},expression:"temp.officeId"}},e._l(e.officeIds,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"岗位名称:",prop:"name"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"请输入2-15位的岗位名称"},model:{value:e.temp.name,callback:function(t){e.temp.name="string"==typeof t?t.trim():t},expression:"temp.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"等级:",prop:"dataScope"}},[a("el-select",{staticClass:"filter-item",staticStyle:{width:"400px"},attrs:{placeholder:"请选择"},on:{change:e.lvChange},model:{value:e.temp.dataScope,callback:function(t){e.temp.dataScope=t},expression:"temp.dataScope"}},e._l(e.roleLv,function(e){return a("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"权限:",prop:"check"}},[a("el-tree",{ref:"domTree",staticClass:"scrollBox",staticStyle:{width:"400px"},attrs:{data:e.data2,indent:10,"show-checkbox":"","node-key":"id","default-expand-all":!0,props:e.defaultProps},on:{"check-change":e.handTreechange},model:{value:e.temp.check,callback:function(t){e.temp.check=t},expression:"temp.check"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},["update"==e.dialogStatus?a("button",{staticClass:"button-large",on:{click:function(t){e.update("temp")}}},[e._v("保 存")]):a("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1)],1)])])},n=[],o={render:i,staticRenderFns:n};t.a=o},OYls:function(e,t,a){a("crlp")("asyncIterator")},"QWe/":function(e,t,a){a("crlp")("observable")},Rrel:function(e,t,a){var i=a("TcQ7"),n=a("n0T6").f,o={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],r=function(e){try{return n(e)}catch(e){return s.slice()}};e.exports.f=function(e){return s&&"[object Window]"==o.call(e)?r(e):n(i(e))}},XZlg:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},Xc4G:function(e,t,a){var i=a("lktj"),n=a("1kS7"),o=a("NpIQ");e.exports=function(e){var t=i(e),a=n.f;if(a)for(var s,r=a(e),l=o.f,c=0;r.length>c;)l.call(e,s=r[c++])&&t.push(s);return t}},Zzip:function(e,t,a){e.exports={default:a("/n6Q"),__esModule:!0}},bOdI:function(e,t,a){"use strict";t.__esModule=!0;var i=a("C4MV"),n=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(e,t,a){return t in e?(0,n.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},cAgV:function(e,t,a){"use strict";var i=a("jdeu"),n=function(e){e.directive("waves",i.a)};window.Vue&&(window.waves=i.a,Vue.use(n)),i.a.install=n,t.a=i.a},crlp:function(e,t,a){var i=a("7KvD"),n=a("FeBl"),o=a("O4g8"),s=a("Kh4W"),r=a("evD5").f;e.exports=function(e){var t=n.Symbol||(n.Symbol=o?{}:i.Symbol||{});"_"==e.charAt(0)||e in t||r(t,e,{value:s.f(e)})}},ctMr:function(e,t,a){var i=a("XZlg");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("44fae30e",i,!0)},fWfb:function(e,t,a){"use strict";var i=a("7KvD"),n=a("D2L2"),o=a("+E39"),s=a("kM2E"),r=a("880/"),l=a("06OY").KEY,c=a("S82l"),d=a("e8AB"),u=a("e6n0"),f=a("3Eo+"),p=a("dSzd"),h=a("Kh4W"),g=a("crlp"),m=a("Xc4G"),v=a("7UMu"),b=a("77Pl"),y=a("TcQ7"),x=a("MmMw"),k=a("X8DO"),w=a("Yobk"),S=a("Rrel"),_=a("LKZe"),I=a("evD5"),C=a("lktj"),L=_.f,O=I.f,z=S.f,M=i.Symbol,F=i.JSON,j=F&&F.stringify,D=p("_hidden"),N=p("toPrimitive"),T={}.propertyIsEnumerable,$=d("symbol-registry"),B=d("symbols"),E=d("op-symbols"),Q=Object.prototype,P="function"==typeof M,K=i.QObject,V=!K||!K.prototype||!K.prototype.findChild,W=o&&c(function(){return 7!=w(O({},"a",{get:function(){return O(this,"a",{value:7}).a}})).a})?function(e,t,a){var i=L(Q,t);i&&delete Q[t],O(e,t,a),i&&e!==Q&&O(Q,t,i)}:O,Y=function(e){var t=B[e]=w(M.prototype);return t._k=e,t},R=P&&"symbol"==typeof M.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof M},U=function(e,t,a){return e===Q&&U(E,t,a),b(e),t=x(t,!0),b(a),n(B,t)?(a.enumerable?(n(e,D)&&e[D][t]&&(e[D][t]=!1),a=w(a,{enumerable:k(0,!1)})):(n(e,D)||O(e,D,k(1,{})),e[D][t]=!0),W(e,t,a)):O(e,t,a)},A=function(e,t){b(e);for(var a,i=m(t=y(t)),n=0,o=i.length;o>n;)U(e,a=i[n++],t[a]);return e},Z=function(e,t){return void 0===t?w(e):A(w(e),t)},J=function(e){var t=T.call(this,e=x(e,!0));return!(this===Q&&n(B,e)&&!n(E,e))&&(!(t||!n(this,e)||!n(B,e)||n(this,D)&&this[D][e])||t)},X=function(e,t){if(e=y(e),t=x(t,!0),e!==Q||!n(B,t)||n(E,t)){var a=L(e,t);return!a||!n(B,t)||n(e,D)&&e[D][t]||(a.enumerable=!0),a}},q=function(e){for(var t,a=z(y(e)),i=[],o=0;a.length>o;)n(B,t=a[o++])||t==D||t==l||i.push(t);return i},G=function(e){for(var t,a=e===Q,i=z(a?E:y(e)),o=[],s=0;i.length>s;)!n(B,t=i[s++])||a&&!n(Q,t)||o.push(B[t]);return o};P||(M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var e=f(arguments.length>0?arguments[0]:void 0),t=function(a){this===Q&&t.call(E,a),n(this,D)&&n(this[D],e)&&(this[D][e]=!1),W(this,e,k(1,a))};return o&&V&&W(Q,e,{configurable:!0,set:t}),Y(e)},r(M.prototype,"toString",function(){return this._k}),_.f=X,I.f=U,a("n0T6").f=S.f=q,a("NpIQ").f=J,a("1kS7").f=G,o&&!a("O4g8")&&r(Q,"propertyIsEnumerable",J,!0),h.f=function(e){return Y(p(e))}),s(s.G+s.W+s.F*!P,{Symbol:M});for(var H="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ee=0;H.length>ee;)p(H[ee++]);for(var te=C(p.store),ae=0;te.length>ae;)g(te[ae++]);s(s.S+s.F*!P,"Symbol",{for:function(e){return n($,e+="")?$[e]:$[e]=M(e)},keyFor:function(e){if(!R(e))throw TypeError(e+" is not a symbol!");for(var t in $)if($[t]===e)return t},useSetter:function(){V=!0},useSimple:function(){V=!1}}),s(s.S+s.F*!P,"Object",{create:Z,defineProperty:U,defineProperties:A,getOwnPropertyDescriptor:X,getOwnPropertyNames:q,getOwnPropertySymbols:G}),F&&s(s.S+s.F*(!P||c(function(){var e=M();return"[null]"!=j([e])||"{}"!=j({a:e})||"{}"!=j(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!R(e)){for(var t,a,i=[e],n=1;arguments.length>n;)i.push(arguments[n++]);return t=i[1],"function"==typeof t&&(a=t),!a&&v(t)||(t=function(e,t){if(a&&(t=a.call(this,e,t)),!R(t))return t}),i[1]=t,j.apply(F,i)}}}),M.prototype[N]||a("hJx8")(M.prototype,N,M.prototype.valueOf),u(M,"Symbol"),u(Math,"Math",!0),u(i.JSON,"JSON",!0)},jdeu:function(e,t,a){"use strict";var i=a("woOf"),n=a.n(i),o=a("ctMr");a.n(o);t.a={bind:function(e,t){e.addEventListener("click",function(a){var i=n()({},t.value),o=n()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),s=o.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var r=s.getBoundingClientRect(),l=s.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(r.width,r.height)+"px",s.appendChild(l)),o.type){case"center":l.style.top=r.height/2-l.offsetHeight/2+"px",l.style.left=r.width/2-l.offsetWidth/2+"px";break;default:l.style.top=a.pageY-r.top-l.offsetHeight/2-document.body.scrollTop+"px",l.style.left=a.pageX-r.left-l.offsetWidth/2-document.body.scrollLeft+"px"}return l.style.backgroundColor=o.color,l.className="waves-ripple z-active",!1}},!1)}}},mClu:function(e,t,a){var i=a("kM2E");i(i.S+i.F*!a("+E39"),"Object",{defineProperty:a("evD5").f})},n0T6:function(e,t,a){var i=a("Ibhu"),n=a("xnc9").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return i(e,n)}},oiIR:function(e,t,a){"use strict";var i=a("bOdI"),n=a.n(i),o=a("oppB"),s=a("cAgV"),r=a("0xDb"),l=[{value:"可用",key:"1"},{value:"不可用",key:"0"}];t.a={name:"table_demo",directives:{waves:s.a},data:function(){var e,t=this,i=function(e,i,n){if(!i)return n(new Error("岗位名不能为空"));console.log(t.dialogStatus),"create"==t.dialogStatus?a.i(o.i)(i).then(function(e){0==e.data.code?n(new Error("岗位名重复！")):n()}):n()};return e={btnShow:this.$store.state.user.buttonshow,btnState:!1,list:[],officeIds:[],total:null,listLoading:!1,state:!1,search:{name:"",officeId:""},listQuery:{page:1,limit:10,importance:void 0,title:void 0,type:void 0,sort:"+id"},pageNumber:1,pageSize:10},n()(e,"total",1),n()(e,"temp",{name:"",dataScope:"",check:[],officeId:""}),n()(e,"checkNode",[]),n()(e,"roleId",""),n()(e,"checked",[]),n()(e,"station",""),n()(e,"stationName",""),n()(e,"stationLv",[{id:"1",value:"一级"},{id:"2",value:"二级"},{id:"3",value:"三级"},{id:"4",value:"四级"},{id:"5",value:"五级"},{id:"6",value:"六级"},{id:"7",value:"七级"},{id:"8",value:"八级"},{id:"9",value:"九级"},{id:"10",value:"十级"}]),n()(e,"roleLv",[]),n()(e,"dialogFormVisible",!1),n()(e,"state",l),n()(e,"dialogStatus",""),n()(e,"textMap",{update:"编辑岗位",create:"新增岗位"}),n()(e,"dialogPvVisible",!1),n()(e,"pvData",[]),n()(e,"tableKey",0),n()(e,"data2",[]),n()(e,"defaultProps",{children:"subMenus",label:"name"}),n()(e,"powerList",[]),n()(e,"isIndeterminate",!0),n()(e,"rules",{officeId:[{required:!0,message:"机构不能为空",trigger:"change"}],name:[{required:!0,validator:i,trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],dataScope:[{required:!0,message:"等级不能为空",trigger:"change"}],check:[{type:"array",required:!0,message:"权限不能为空",trigger:"check-change"}]}),e},filters:{statusFilter:function(e){return{published:"success",draft:"gray",deleted:"danger"}[e]}},created:function(){var e=this;this.getList(),a.i(o.b)().then(function(t){console.log("权限列表"),console.log(t),e.data2=t.data.data}),a.i(o.a)({}).then(function(t){console.log("所属机构,机构搜索"),console.log(t),e.officeIds=t.data.data.list,console.log(e.officeIds)});var t=localStorage.getItem("dataScope");console.log(t,"用户等级");for(var i=0;i<t;i++)this.roleLv.push(this.stationLv[i]);console.log(this.roleLv,"用户看到的等级")},methods:{aaa:function(e){console.log(e)},getList:function(){var e=this;this.listLoading=!0;var t={};a.i(o.j)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),e.list=t.data.data.list,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.total=t.data.data.count,e.listLoading=!1})},handleFilter:function(){var e=this;this.listQuery.page=1;var t={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(t),""!=t.name||""!=t.organization.id)this.listLoading=!0,a.i(o.j)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),1===t.data.code){if(e.list=t.data.data.list,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.total=t.data.data.count,e.listLoading=!1}else e.listLoading=!1,e.$message({type:"warning",message:"岗位名不存在"})});else{var t={};a.i(o.j)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),1===t.data.code){if(e.list=t.data.data.list,void 0!=e.list)for(var a=0;a<e.list.length;a++)e.list[a].index=a+1;e.total=t.data.data.count,e.listLoading=!1}})}},handleSizeChange:function(e){var t=this;this.pageSize=e;var i={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(i),""!=i.name||""!=i.organization.id)this.listLoading=!0,a.i(o.j)(i,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;t.total=e.data.data.count,t.listLoading=!1}else t.listLoading=!1,t.$message({type:"warning",message:"岗位名不存在"})});else{var i={};a.i(o.j)(i,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;t.total=e.data.data.count,t.listLoading=!1}})}},handleCurrentChange:function(e){var t=this;this.pageNumber=e;var i={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(i),""!=i.name||""!=i.organization.id)this.listLoading=!0,a.i(o.j)(i,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;t.total=e.data.data.count,t.listLoading=!1}else t.listLoading=!1,t.$message({type:"warning",message:"岗位名不存在"})});else{var i={};a.i(o.j)(i,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var a=0;a<t.list.length;a++)t.list[a].index=a+1;t.total=e.data.data.count,t.listLoading=!1}})}},handTreechange:function(e,t,a){this.temp.check=this.$refs.domTree.getCheckedKeys()},timeFilter:function(e){if(!e[0])return this.listQuery.start=void 0,void(this.listQuery.end=void 0);this.listQuery.start=parseInt(+e[0]/1e3),this.listQuery.end=parseInt((+e[1]+864e5)/1e3)},lvChange:function(e){},offChange:function(e){console.log(e)},handleCreate:function(){this.dialogStatus="create",this.dialogFormVisible=!0,1==this.officeIds.length&&(console.log(this.officeIds[0].id),this.temp.officeId=this.officeIds[0].id)},handleUpdate:function(e){var t=this;this.listLoading=!0,a.i(o.k)(e.id).then(function(e){if(console.log(e),t.listLoading=!1,1==e.data.code){t.dialogStatus="update",t.dialogFormVisible=!0;var a=e.data.data;t.roleId=a.id,t.temp.officeId=a.organization.id,t.temp.name=a.name,t.temp.dataScope=a.dataScope,t.temp.check=a.menuIdList,console.log(a.menuIdList);for(var i=0;i<t.data2.length;i++)if("index"==t.data2[i].permission?console.log(t.data2[i].permission):t.temp.check.remove(t.data2[i].id),void 0!=t.data2[i].subMenus)for(var n=t.data2[i],o=0;o<n.subMenus.length;o++)console.log(n.subMenus[o].id),t.temp.check.remove(n.subMenus[o].id);console.log(a.menuIdList),console.log(t.temp.check),t.$nextTick(function(){t.$refs.domTree.setCheckedKeys(t.temp.check)})}else t.$message({type:"warning",message:"请求失败"})})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){console.log(e);var i={id:e.id};a.i(o.l)(i).then(function(e){console.log(e),1===e.data.code?(t.$message({type:"success",message:"删除成功!"}),t.getList()):t.$message({type:"warning",message:e.data.data})}).catch(function(){t.$message({type:"warning",message:"服务器已断开，请稍后再试"})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},getLv:function(){},getFather:function(e){console.log(121233213);for(var t in e)void 0!=e[t].subMenus?(console.log(t),this.getFather(e[t].subMenus)):this.data2.indexOf(e[t].id)>-1&&console.log(e[t].parentId)},create:function(e){var t=this;this.btnState=!0,setTimeout(function(){t.btnState=!1},1e3),this.search={name:"",officeId:""};for(var i=this.$refs.domTree.getCheckedKeys(),n="",s=0;s<i.length;s++)n+=i[s]+",";var r={name:this.temp.name,dataScope:this.temp.dataScope,menuIds:n,useable:"1",organization:{id:this.temp.officeId}};console.log(r),this.$refs[e].validate(function(i){if(!i)return!1;a.i(o.h)(r).then(function(a){console.log(a),1===a.data.code?(t.resetTemp(),t.$refs[e].resetFields(),t.$refs.domTree.setCheckedKeys([]),t.$message({type:"success",message:"添加成功"}),t.dialogFormVisible=!1,t.getList()):t.$message({type:"error",message:a.data.data[0]})})})},update:function(e){var t=this;this.search={name:"",officeId:""};for(var i=this.$refs.domTree.getCheckedKeys(),n="",s=0;s<i.length;s++)n+=i[s]+",";var r={id:this.roleId,name:this.temp.name,dataScope:this.temp.dataScope,menuIds:n,useable:"1",organization:{id:this.temp.officeId}};console.log(r),this.$refs[e].validate(function(i){if(!i)return!1;a.i(o.h)(r).then(function(a){1===a.data.code?(t.resetTemp(),t.$refs.domTree.setCheckedKeys([]),t.$refs[e].resetFields(),t.dialogFormVisible=!1,t.$message({type:"success",message:"修改成功"}),t.getList()):"string"==typeof a.data.data?t.$message({type:"error",message:a.data.data}):t.$message({type:"error",message:a.data.data[0]})})})},resetForm:function(e){this.dialogFormVisible=!1,this.resetTemp(),this.$refs.domTree.setCheckedKeys([]),this.$refs[e].resetFields()},resetTemp:function(){this.temp={officeId:"",name:"",dataScope:"",check:[]}},handleFetchPv:function(e){var t=this;fetchPv(e).then(function(e){t.pvData=e.data.pvData,t.dialogPvVisible=!0})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"timestamp"===e?a.i(r.a)(t[e]):t[e]})})}}}},oppB:function(e,t,a){"use strict";function i(e){return v.post("/api/a/sys/user/saveData",e)}function n(e,t,a){return v.post("/api/a/sys/role/listPageData?pageNo="+t+"&pageSize="+a,e)}function o(e){return v.post("/api/a/sys/role/listData",e)}function s(e,t,a){return v.post("/api/a/sys/user/listData?pageNo="+t+"&pageSize="+a,e)}function r(e){return v.post("/api/a/sys/role/saveData",e)}function l(e){return v.post("/api/a/sys/role/deleteRole",e)}function c(e){return v.get("/api/a/sys/role/getRoleDetail?id="+e)}function d(e){return v.post("/api/a/sys/organization/listData?pageSize=-1",e)}function u(e){return v.post("/api/a/service/station/serviceStation/listByOffice",e)}function f(){return v.get("/api/a/sys/menu/getMenuList")}function p(e){return v.post("/api/a/sys/user/deleteUser",e)}function h(e){return v.get("/api/a/sys/role/chkName?name="+e)}t.g=i,t.j=n,t.f=o,t.c=s,t.h=r,t.l=l,t.k=c,t.a=d,t.e=u,t.b=f,t.d=p,t.i=h;var g=a("mtWM"),m=a.n(g),v=m.a.create({headers:{"content-type":"application/json;charset=UTF-8"}})},pFYg:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var n=a("Zzip"),o=i(n),s=a("5QVw"),r=i(s),l="function"==typeof r.default&&"symbol"==typeof o.default?function(e){return typeof e}:function(e){return e&&"function"==typeof r.default&&e.constructor===r.default&&e!==r.default.prototype?"symbol":typeof e};t.default="function"==typeof r.default&&"symbol"===l(o.default)?function(e){return void 0===e?"undefined":l(e)}:function(e){return e&&"function"==typeof r.default&&e.constructor===r.default&&e!==r.default.prototype?"symbol":void 0===e?"undefined":l(e)}},pWQp:function(e,t,a){var i=a("5DwC");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("59882488",i,!0)}});