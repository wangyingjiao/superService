webpackJsonp([5],{"/0s5":function(e,t,n){"use strict";function o(e){n("pWQp")}Object.defineProperty(t,"__esModule",{value:!0});var a=n("oiIR"),i=n("M6/Q"),s=n("VU/8"),r=o,l=s(a.a,i.a,r,null,null);t.default=l.exports},"/n6Q":function(e,t,n){n("zQR9"),n("+tPU"),e.exports=n("Kh4W").f("iterator")},"06OY":function(e,t,n){var o=n("3Eo+")("meta"),a=n("EqjI"),i=n("D2L2"),s=n("evD5").f,r=0,l=Object.isExtensible||function(){return!0},c=!n("S82l")(function(){return l(Object.preventExtensions({}))}),d=function(e){s(e,o,{value:{i:"O"+ ++r,w:{}}})},u=function(e,t){if(!a(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!i(e,o)){if(!l(e))return"F";if(!t)return"E";d(e)}return e[o].i},f=function(e,t){if(!i(e,o)){if(!l(e))return!0;if(!t)return!1;d(e)}return e[o].w},p=function(e){return c&&h.NEED&&l(e)&&!i(e,o)&&d(e),e},h=e.exports={KEY:o,NEED:!1,fastKey:u,getWeak:f,onFreeze:p}},"0xDb":function(e,t,n){"use strict";function o(e,t){if(0===arguments.length)return null;var n=t||"{y}-{m}-{d} {h}:{i}:{s}",o=void 0;"object"===(void 0===e?"undefined":i()(e))?o=e:(10===(""+e).length&&(e=1e3*parseInt(e)),o=new Date(e));var a={y:o.getFullYear(),m:o.getMonth()+1,d:o.getDate(),h:o.getHours(),i:o.getMinutes(),s:o.getSeconds(),a:o.getDay()};return n.replace(/{(y|m|d|h|i|s|a)+}/g,function(e,t){var n=a[t];return"a"===t?["一","二","三","四","五","六","日"][n-1]:(e.length>0&&n<10&&(n="0"+n),n||0)})}t.a=o;var a=n("pFYg"),i=n.n(a)},"5DwC":function(e,t,n){t=e.exports=n("FZ+f")(!1),t.push([e.i,".btn_right{margin-top:3px;float:right;width:75px}.btn_left{width:100px}.checkRightBox{border:1px solid #dcdcdc;padding:10px}.checkAllBox,.checkBox1{padding:10px 0}.checkBox1{border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc}.checkBox2,.checkBox3{padding:10px 0}.checkBox3{border-top:1px solid #dcdcdc}.checkBox1 .el-checkbox,.checkBox2 .el-checkbox,.checkBox3 .el-checkbox{margin-left:0;margin-right:15px}body{background-color:#eef1f6}.bgWhite{background-color:#fff;padding:20px}.btn_pad{margin:0 0 20px 20px}.el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node,.el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node{float:left}.el-tree-node:first-child\r\n  .el-tree-node__children\r\n  .el-tree-node__children\r\n  .el-tree-node{float:none}.ceshi{height:25px;width:80px}.ceshi3{font-size:14px;color:#1d85fe;border:1px solid #1d85fe;background-color:#fff}.dialog-footer{text-align:center}.scrollBox{height:400px;overflow-y:scroll;overflow-x:hidden}.diasize .el-dialog{width:60%}",""])},"5QVw":function(e,t,n){e.exports={default:n("BwfY"),__esModule:!0}},"7UMu":function(e,t,n){var o=n("R9M2");e.exports=Array.isArray||function(e){return"Array"==o(e)}},"9bBU":function(e,t,n){n("mClu");var o=n("FeBl").Object;e.exports=function(e,t,n){return o.defineProperty(e,t,n)}},BwfY:function(e,t,n){n("fWfb"),n("M6a0"),n("OYls"),n("QWe/"),e.exports=n("FeBl").Symbol},C4MV:function(e,t,n){e.exports={default:n("9bBU"),__esModule:!0}},Kh4W:function(e,t,n){t.f=n("dSzd")},LKZe:function(e,t,n){var o=n("NpIQ"),a=n("X8DO"),i=n("TcQ7"),s=n("MmMw"),r=n("D2L2"),l=n("SfB7"),c=Object.getOwnPropertyDescriptor;t.f=n("+E39")?c:function(e,t){if(e=i(e),t=s(t,!0),l)try{return c(e,t)}catch(e){}if(r(e,t))return a(!o.f.call(e,t),e[t])}},"M6/Q":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"filter-container bgWhite"},[n("el-input",{staticClass:"search",attrs:{placeholder:"请输入搜索的岗位名称"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.name,callback:function(t){e.search.name=t},expression:"search.name"}}),e._v(" "),n("el-select",{staticClass:"search",attrs:{filterable:"",clearable:"",placeholder:"选择机构"},model:{value:e.search.officeId,callback:function(t){e.search.officeId=t},expression:"search.officeId"}},e._l(e.officeIds,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),n("button",{staticClass:"button-large el-icon-search btn_search",on:{click:e.handleFilter}},[e._v(" 搜索")])],1),e._v(" "),n("div",{staticClass:"app-container calendar-list-container"},[n("div",{staticClass:"bgWhite"},[n("button",{staticClass:"button-small btn_pad",on:{click:e.handleCreate}},[e._v("新增")]),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"正在加载",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"编号",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\n        ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"岗位名称",align:"center",prop:"name"}}),e._v(" "),n("el-table-column",{attrs:{label:"机构名称",align:"center",prop:"organization.name"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{staticClass:"el-icon-edit ceshi3",on:{click:function(n){e.handleUpdate(t.row)}}}),e._v(" "),n("el-button",{staticClass:"el-icon-delete ceshi3",on:{click:function(n){e.handleDelete(t.row)}}})]}}])})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[n("el-pagination",{staticClass:"fr mt20",attrs:{"current-page":e.listQuery.page,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),n("el-dialog",{staticClass:"diatable diasize",attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"temp",staticClass:"small-space dia_form",attrs:{model:e.temp,"label-position":"left",rules:e.rules,"label-width":"160px"}},[n("el-form-item",{attrs:{label:" 所属机构:",prop:"officeId"}},[n("el-select",{staticClass:"form_item",attrs:{filterable:"",placeholder:"请选择"},on:{change:e.aaa},model:{value:e.temp.officeId,callback:function(t){e.temp.officeId=t},expression:"temp.officeId"}},e._l(e.officeIds,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"岗位名称:",prop:"name"}},[n("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入2-15位的岗位名称"},model:{value:e.temp.name,callback:function(t){e.temp.name="string"==typeof t?t.trim():t},expression:"temp.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"等级:",prop:"dataScope"}},[n("el-select",{staticClass:"form_item",attrs:{placeholder:"请选择"},on:{change:e.lvChange},model:{value:e.temp.dataScope,callback:function(t){e.temp.dataScope=t},expression:"temp.dataScope"}},e._l(e.roleLv,function(e){return n("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})})),e._v(" "),n("p",{staticStyle:{"font-size":"12px",color:"#8391a5"}},[e._v("* 十级权限最高，一级权限最低")])],1),e._v(" "),n("el-form-item",{attrs:{label:"权限:",prop:"check"}},[n("el-tree",{ref:"domTree",staticClass:"scrollBox form_item",attrs:{data:e.data2,indent:10,"show-checkbox":"","node-key":"id","default-expand-all":!0,props:e.defaultProps},on:{"check-change":e.handTreechange,"node-click":e.nodeClick,"current-change":e.currentChange,"node-expand":e.nodeExpand,"node-collapse":e.nodeCollapse},model:{value:e.temp.check,callback:function(t){e.temp.check=t},expression:"temp.check"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",slot:"footer"},["update"==e.dialogStatus?n("button",{staticClass:"button-large",on:{click:function(t){e.update("temp")}}},[e._v("保 存")]):n("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]),e._v(" "),n("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1)],1)])])},a=[],i={render:o,staticRenderFns:a};t.a=i},OYls:function(e,t,n){n("crlp")("asyncIterator")},"QWe/":function(e,t,n){n("crlp")("observable")},Rrel:function(e,t,n){var o=n("TcQ7"),a=n("n0T6").f,i={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],r=function(e){try{return a(e)}catch(e){return s.slice()}};e.exports.f=function(e){return s&&"[object Window]"==i.call(e)?r(e):a(o(e))}},XZlg:function(e,t,n){t=e.exports=n("FZ+f")(!1),t.push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},Xc4G:function(e,t,n){var o=n("lktj"),a=n("1kS7"),i=n("NpIQ");e.exports=function(e){var t=o(e),n=a.f;if(n)for(var s,r=n(e),l=i.f,c=0;r.length>c;)l.call(e,s=r[c++])&&t.push(s);return t}},Zzip:function(e,t,n){e.exports={default:n("/n6Q"),__esModule:!0}},bOdI:function(e,t,n){"use strict";t.__esModule=!0;var o=n("C4MV"),a=function(e){return e&&e.__esModule?e:{default:e}}(o);t.default=function(e,t,n){return t in e?(0,a.default)(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},cAgV:function(e,t,n){"use strict";var o=n("jdeu"),a=function(e){e.directive("waves",o.a)};window.Vue&&(window.waves=o.a,Vue.use(a)),o.a.install=a,t.a=o.a},crlp:function(e,t,n){var o=n("7KvD"),a=n("FeBl"),i=n("O4g8"),s=n("Kh4W"),r=n("evD5").f;e.exports=function(e){var t=a.Symbol||(a.Symbol=i?{}:o.Symbol||{});"_"==e.charAt(0)||e in t||r(t,e,{value:s.f(e)})}},ctMr:function(e,t,n){var o=n("XZlg");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n("rjj0")("44fae30e",o,!0)},fWfb:function(e,t,n){"use strict";var o=n("7KvD"),a=n("D2L2"),i=n("+E39"),s=n("kM2E"),r=n("880/"),l=n("06OY").KEY,c=n("S82l"),d=n("e8AB"),u=n("e6n0"),f=n("3Eo+"),p=n("dSzd"),h=n("Kh4W"),g=n("crlp"),m=n("Xc4G"),v=n("7UMu"),b=n("77Pl"),y=n("TcQ7"),k=n("MmMw"),x=n("X8DO"),w=n("Yobk"),S=n("Rrel"),_=n("LKZe"),C=n("evD5"),I=n("lktj"),M=_.f,z=C.f,F=S.f,L=o.Symbol,O=o.JSON,D=O&&O.stringify,j=p("_hidden"),N=p("toPrimitive"),T={}.propertyIsEnumerable,$=d("symbol-registry"),E=d("symbols"),B=d("op-symbols"),Q=Object.prototype,P="function"==typeof L,K=o.QObject,V=!K||!K.prototype||!K.prototype.findChild,W=i&&c(function(){return 7!=w(z({},"a",{get:function(){return z(this,"a",{value:7}).a}})).a})?function(e,t,n){var o=M(Q,t);o&&delete Q[t],z(e,t,n),o&&e!==Q&&z(Q,t,o)}:z,Y=function(e){var t=E[e]=w(L.prototype);return t._k=e,t},R=P&&"symbol"==typeof L.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof L},U=function(e,t,n){return e===Q&&U(B,t,n),b(e),t=k(t,!0),b(n),a(E,t)?(n.enumerable?(a(e,j)&&e[j][t]&&(e[j][t]=!1),n=w(n,{enumerable:x(0,!1)})):(a(e,j)||z(e,j,x(1,{})),e[j][t]=!0),W(e,t,n)):z(e,t,n)},A=function(e,t){b(e);for(var n,o=m(t=y(t)),a=0,i=o.length;i>a;)U(e,n=o[a++],t[n]);return e},Z=function(e,t){return void 0===t?w(e):A(w(e),t)},J=function(e){var t=T.call(this,e=k(e,!0));return!(this===Q&&a(E,e)&&!a(B,e))&&(!(t||!a(this,e)||!a(E,e)||a(this,j)&&this[j][e])||t)},X=function(e,t){if(e=y(e),t=k(t,!0),e!==Q||!a(E,t)||a(B,t)){var n=M(e,t);return!n||!a(E,t)||a(e,j)&&e[j][t]||(n.enumerable=!0),n}},q=function(e){for(var t,n=F(y(e)),o=[],i=0;n.length>i;)a(E,t=n[i++])||t==j||t==l||o.push(t);return o},G=function(e){for(var t,n=e===Q,o=F(n?B:y(e)),i=[],s=0;o.length>s;)!a(E,t=o[s++])||n&&!a(Q,t)||i.push(E[t]);return i};P||(L=function(){if(this instanceof L)throw TypeError("Symbol is not a constructor!");var e=f(arguments.length>0?arguments[0]:void 0),t=function(n){this===Q&&t.call(B,n),a(this,j)&&a(this[j],e)&&(this[j][e]=!1),W(this,e,x(1,n))};return i&&V&&W(Q,e,{configurable:!0,set:t}),Y(e)},r(L.prototype,"toString",function(){return this._k}),_.f=X,C.f=U,n("n0T6").f=S.f=q,n("NpIQ").f=J,n("1kS7").f=G,i&&!n("O4g8")&&r(Q,"propertyIsEnumerable",J,!0),h.f=function(e){return Y(p(e))}),s(s.G+s.W+s.F*!P,{Symbol:L});for(var H="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ee=0;H.length>ee;)p(H[ee++]);for(var te=I(p.store),ne=0;te.length>ne;)g(te[ne++]);s(s.S+s.F*!P,"Symbol",{for:function(e){return a($,e+="")?$[e]:$[e]=L(e)},keyFor:function(e){if(!R(e))throw TypeError(e+" is not a symbol!");for(var t in $)if($[t]===e)return t},useSetter:function(){V=!0},useSimple:function(){V=!1}}),s(s.S+s.F*!P,"Object",{create:Z,defineProperty:U,defineProperties:A,getOwnPropertyDescriptor:X,getOwnPropertyNames:q,getOwnPropertySymbols:G}),O&&s(s.S+s.F*(!P||c(function(){var e=L();return"[null]"!=D([e])||"{}"!=D({a:e})||"{}"!=D(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!R(e)){for(var t,n,o=[e],a=1;arguments.length>a;)o.push(arguments[a++]);return t=o[1],"function"==typeof t&&(n=t),!n&&v(t)||(t=function(e,t){if(n&&(t=n.call(this,e,t)),!R(t))return t}),o[1]=t,D.apply(O,o)}}}),L.prototype[N]||n("hJx8")(L.prototype,N,L.prototype.valueOf),u(L,"Symbol"),u(Math,"Math",!0),u(o.JSON,"JSON",!0)},jdeu:function(e,t,n){"use strict";var o=n("woOf"),a=n.n(o),i=n("ctMr");n.n(i);t.a={bind:function(e,t){e.addEventListener("click",function(n){var o=a()({},t.value),i=a()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},o),s=i.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var r=s.getBoundingClientRect(),l=s.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(r.width,r.height)+"px",s.appendChild(l)),i.type){case"center":l.style.top=r.height/2-l.offsetHeight/2+"px",l.style.left=r.width/2-l.offsetWidth/2+"px";break;default:l.style.top=n.pageY-r.top-l.offsetHeight/2-document.body.scrollTop+"px",l.style.left=n.pageX-r.left-l.offsetWidth/2-document.body.scrollLeft+"px"}return l.style.backgroundColor=i.color,l.className="waves-ripple z-active",!1}},!1)}}},mClu:function(e,t,n){var o=n("kM2E");o(o.S+o.F*!n("+E39"),"Object",{defineProperty:n("evD5").f})},n0T6:function(e,t,n){var o=n("Ibhu"),a=n("xnc9").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return o(e,a)}},oiIR:function(e,t,n){"use strict";var o=n("bOdI"),a=n.n(o),i=n("oppB"),s=n("cAgV"),r=n("0xDb"),l=[{value:"可用",key:"1"},{value:"不可用",key:"0"}];t.a={name:"table_demo",directives:{waves:s.a},data:function(){var e,t=this,o=function(e,o,a){if(!o)return a(new Error("岗位名不能为空"));console.log(t.dialogStatus),"create"==t.dialogStatus?n.i(i.i)(o).then(function(e){0==e.data.code?a(new Error("岗位名重复！")):a()}):a()};return e={btnShow:this.$store.state.user.buttonshow,btnState:!1,list:[],officeIds:[],total:null,listLoading:!1,state:!1,search:{name:"",officeId:""},listQuery:{page:1,limit:10,importance:void 0,title:void 0,type:void 0,sort:"+id"},pageNumber:1,pageSize:10},a()(e,"total",1),a()(e,"temp",{name:"",dataScope:"",check:[],officeId:""}),a()(e,"checkNode",[]),a()(e,"roleId",""),a()(e,"checked",[]),a()(e,"station",""),a()(e,"stationName",""),a()(e,"stationLv",[{id:"1",value:"一级"},{id:"2",value:"二级"},{id:"3",value:"三级"},{id:"4",value:"四级"},{id:"5",value:"五级"},{id:"6",value:"六级"},{id:"7",value:"七级"},{id:"8",value:"八级"},{id:"9",value:"九级"},{id:"10",value:"十级"}]),a()(e,"roleLv",[]),a()(e,"dialogFormVisible",!1),a()(e,"state",l),a()(e,"dialogStatus",""),a()(e,"textMap",{update:"编辑岗位",create:"新增岗位"}),a()(e,"dialogPvVisible",!1),a()(e,"pvData",[]),a()(e,"tableKey",0),a()(e,"data2",[]),a()(e,"defaultProps",{children:"subMenus",label:"name"}),a()(e,"powerList",[]),a()(e,"isIndeterminate",!0),a()(e,"rules",{officeId:[{required:!0,message:"机构不能为空",trigger:"change"}],name:[{required:!0,validator:o,trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],dataScope:[{required:!0,message:"等级不能为空",trigger:"change"}],check:[{type:"array",required:!0,message:"权限不能为空",trigger:"check-change"}]}),e},filters:{statusFilter:function(e){return{published:"success",draft:"gray",deleted:"danger"}[e]}},created:function(){var e=this;this.getList(),n.i(i.b)().then(function(t){console.log("权限列表"),console.log(t),e.data2=t.data.data}),n.i(i.a)({}).then(function(t){console.log("所属机构,机构搜索"),console.log(t),e.officeIds=t.data.data.list,console.log(e.officeIds)});var t=localStorage.getItem("dataScope");console.log(t,"用户等级");for(var o=0;o<t;o++)this.roleLv.push(this.stationLv[o]);console.log(this.roleLv,"用户看到的等级")},methods:{aaa:function(e){console.log(e)},getList:function(){var e=this;this.listLoading=!0;var t={};n.i(i.j)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),e.list=t.data.data.list,void 0!=e.list)for(var n=0;n<e.list.length;n++)e.list[n].index=n+1;e.total=t.data.data.count,e.listLoading=!1})},handleFilter:function(){var e=this;this.listQuery.page=1;var t={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(t),""!=t.name||""!=t.organization.id)this.listLoading=!0,n.i(i.j)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),1===t.data.code){if(e.list=t.data.data.list,void 0!=e.list)for(var n=0;n<e.list.length;n++)e.list[n].index=n+1;e.total=t.data.data.count,e.listLoading=!1}else e.listLoading=!1,e.$message({type:"warning",message:"岗位名不存在"})});else{var t={};n.i(i.j)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),1===t.data.code){if(e.list=t.data.data.list,void 0!=e.list)for(var n=0;n<e.list.length;n++)e.list[n].index=n+1;e.total=t.data.data.count,e.listLoading=!1}})}},handleSizeChange:function(e){var t=this;this.pageSize=e;var o={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(o),""!=o.name||""!=o.organization.id)this.listLoading=!0,n.i(i.j)(o,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var n=0;n<t.list.length;n++)t.list[n].index=n+1;t.total=e.data.data.count,t.listLoading=!1}else t.listLoading=!1,t.$message({type:"warning",message:"岗位名不存在"})});else{var o={};n.i(i.j)(o,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var n=0;n<t.list.length;n++)t.list[n].index=n+1;t.total=e.data.data.count,t.listLoading=!1}})}},handleCurrentChange:function(e){var t=this;this.pageNumber=e;var o={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(o),""!=o.name||""!=o.organization.id)this.listLoading=!0,n.i(i.j)(o,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var n=0;n<t.list.length;n++)t.list[n].index=n+1;t.total=e.data.data.count,t.listLoading=!1}else t.listLoading=!1,t.$message({type:"warning",message:"岗位名不存在"})});else{var o={};n.i(i.j)(o,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var n=0;n<t.list.length;n++)t.list[n].index=n+1;t.total=e.data.data.count,t.listLoading=!1}})}},handTreechange:function(e,t,n){if(console.log(this.temp.check,"check-----------------"),console.log(e,t,n,"checkchange节点选中状态发生变化"),t)if(void 0==e.subMenus){console.log(e.permission,"子集被勾选的权限"),console.log(e.id,"子集被勾选的id"),console.log(e.parentId,"子集的父级id"),console.log(e.parentIds,"子集的父级ids");var o=e.parentIds.split(",");console.log(o),console.log(this.data2,"父元素");for(var a=0;a<this.data2.length;a++)if(this.data2[a].id==o[2]&&console.log(a,"下标i"),void 0!=this.data2[a].subMenus)for(var i=0;i<this.data2[a].subMenus.length;i++)if(this.data2[a].subMenus[i].id==o[3]){var s=this.data2[a].subMenus[i].subMenus[0];if(void 0!=s.permission){var r=s.permission,l=r.substring(r.length-4,r.length);console.log(l,"截取"),"view"==l&&this.$refs.domTree.setChecked(s.id,!0)}}}else console.log(e.permission,"父级被勾选的权限"),console.log(e.id,"父级被勾选的id"),console.log(e.subMenus[0],"父级的第一个元素");this.temp.check=this.$refs.domTree.getCheckedKeys()},nodeClick:function(e,t,n){console.log(e,t,n,"nodeclick节点被点击时")},currentChange:function(e,t){console.log(e,t,"currentchange选中节点变化时")},nodeExpand:function(e,t,n){console.log(e,t,n,"nodeexpand节点被展开时")},nodeCollapse:function(e,t,n){console.log(e,t,n,"nodecollapse节点关闭")},timeFilter:function(e){if(!e[0])return this.listQuery.start=void 0,void(this.listQuery.end=void 0);this.listQuery.start=parseInt(+e[0]/1e3),this.listQuery.end=parseInt((+e[1]+864e5)/1e3)},lvChange:function(e){},offChange:function(e){console.log(e)},handleCreate:function(){this.dialogStatus="create",this.dialogFormVisible=!0,1==this.officeIds.length&&(console.log(this.officeIds[0].id),this.temp.officeId=this.officeIds[0].id)},handleUpdate:function(e){var t=this;this.listLoading=!0,n.i(i.k)(e.id).then(function(e){if(console.log(e),t.listLoading=!1,1==e.data.code){t.dialogStatus="update",t.dialogFormVisible=!0;var n=e.data.data;t.roleId=n.id,t.temp.officeId=n.organization.id,t.temp.name=n.name,t.temp.dataScope=n.dataScope,t.temp.check=n.menuIdList,console.log(n.menuIdList);for(var o=0;o<t.data2.length;o++)if("index"==t.data2[o].permission?console.log(t.data2[o].permission):t.temp.check.remove(t.data2[o].id),void 0!=t.data2[o].subMenus)for(var a=t.data2[o],i=0;i<a.subMenus.length;i++)console.log(a.subMenus[i].id),t.temp.check.remove(a.subMenus[i].id);console.log(n.menuIdList),console.log(t.temp.check),t.$nextTick(function(){t.$refs.domTree.setCheckedKeys(t.temp.check)})}else t.$message({type:"warning",message:"请求失败"})})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){console.log(e);var o={id:e.id};n.i(i.l)(o).then(function(e){console.log(e),1===e.data.code?(t.$message({type:"success",message:"删除成功!"}),t.handleFilter()):t.$message({type:"warning",message:e.data.data})}).catch(function(){t.$message({type:"warning",message:"服务器已断开，请稍后再试"})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},getLv:function(){},getFather:function(e){console.log(121233213);for(var t in e)void 0!=e[t].subMenus?(console.log(t),this.getFather(e[t].subMenus)):this.data2.indexOf(e[t].id)>-1&&console.log(e[t].parentId)},create:function(e){var t=this;this.btnState=!0,setTimeout(function(){t.btnState=!1},1e3),this.search={name:"",officeId:""};for(var o=this.$refs.domTree.getCheckedKeys(),a="",s=0;s<o.length;s++)a+=o[s]+",";var r={name:encodeURI(this.temp.name),dataScope:this.temp.dataScope,menuIds:a,useable:"1",organization:{id:this.temp.officeId}};console.log(r),this.$refs[e].validate(function(o){if(!o)return!1;n.i(i.h)(r).then(function(n){console.log(n),1===n.data.code?(t.resetTemp(),t.$refs[e].resetFields(),t.$refs.domTree.setCheckedKeys([]),t.$message({type:"success",message:"添加成功"}),t.dialogFormVisible=!1,t.listQuery.page=1,t.pageNumber=1,t.handleFilter()):t.$message({type:"error",message:n.data.data[0]})})})},update:function(e){for(var t=this,o=this.$refs.domTree.getCheckedKeys(),a="",s=0;s<o.length;s++)a+=o[s]+",";var r={id:this.roleId,name:this.temp.name,dataScope:this.temp.dataScope,menuIds:a,useable:"1",organization:{id:this.temp.officeId}};console.log(r),this.$refs[e].validate(function(o){if(!o)return!1;n.i(i.h)(r).then(function(n){1===n.data.code?(t.resetTemp(),t.$refs.domTree.setCheckedKeys([]),t.$refs[e].resetFields(),t.dialogFormVisible=!1,t.$message({type:"success",message:"修改成功"}),t.handleFilter()):"string"==typeof n.data.data?t.$message({type:"error",message:n.data.data}):t.$message({type:"error",message:n.data.data[0]})})})},resetForm:function(e){this.dialogFormVisible=!1,this.resetTemp(),this.$refs.domTree.setCheckedKeys([]),this.$refs[e].resetFields()},resetTemp:function(){this.temp={officeId:"",name:"",dataScope:"",check:[]}},handleFetchPv:function(e){var t=this;fetchPv(e).then(function(e){t.pvData=e.data.pvData,t.dialogPvVisible=!0})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"timestamp"===e?n.i(r.a)(t[e]):t[e]})})}}}},oppB:function(e,t,n){"use strict";function o(e){return x.post("/apiservice/a/sys/user/saveData",e)}function a(e,t,n){return x.post("/apiservice/a/sys/role/listPageData?pageNo="+t+"&pageSize="+n,e)}function i(e){return x.post("/apiservice/a/sys/role/listData",e)}function s(e,t,n){return x.post("/apiservice/a/sys/user/listData?pageNo="+t+"&pageSize="+n,e)}function r(e){return x.post("/apiservice/a/sys/role/saveData",e)}function l(e){return x.post("/apiservice/a/sys/role/deleteRole",e)}function c(e){return x.get("/apiservice/a/sys/role/getRoleDetail?id="+e)}function d(e){return x.post("/apiservice/a/sys/organization/listData?pageSize=-1",e)}function u(e){return x.post("/apiservice/a/service/station/serviceStation/listByOffice",e)}function f(){return x.get("/apiservice/a/sys/menu/getMenuList")}function p(e){return x.post("/apiservice/a/sys/user/deleteUser",e)}function h(e){return x.get("/apiservice/a/sys/role/chkName?name="+e)}function g(e,t,n){return new b.a(function(o,a){x.post("apiservice/a/service/order/orderDispatch/listData?pageNo="+e+"&pageSize="+t,n).then(function(e){o(e)}).catch(function(e){a(e)})})}function m(e){return new b.a(function(t,n){x.post("apiservice/a/service/order/orderDispatch/formData",e).then(function(e){t(e)}).catch(function(e){n(e)})})}t.g=o,t.j=a,t.f=i,t.c=s,t.h=r,t.l=l,t.k=c,t.a=d,t.e=u,t.b=f,t.d=p,t.i=h,t.m=g,t.n=m;var v=n("//Fk"),b=n.n(v),y=n("mtWM"),k=n.n(y),x=k.a.create({headers:{"content-type":"application/json;charset=UTF-8"}})},pFYg:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n("Zzip"),i=o(a),s=n("5QVw"),r=o(s),l="function"==typeof r.default&&"symbol"==typeof i.default?function(e){return typeof e}:function(e){return e&&"function"==typeof r.default&&e.constructor===r.default&&e!==r.default.prototype?"symbol":typeof e};t.default="function"==typeof r.default&&"symbol"===l(i.default)?function(e){return void 0===e?"undefined":l(e)}:function(e){return e&&"function"==typeof r.default&&e.constructor===r.default&&e!==r.default.prototype?"symbol":void 0===e?"undefined":l(e)}},pWQp:function(e,t,n){var o=n("5DwC");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n("rjj0")("59882488",o,!0)}});