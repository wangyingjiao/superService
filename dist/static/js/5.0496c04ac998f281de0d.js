webpackJsonp([5],{"/0s5":function(e,t,n){"use strict";function i(e){n("pWQp")}Object.defineProperty(t,"__esModule",{value:!0});var a=n("oiIR"),o=n("M6/Q"),s=n("VU/8"),r=i,l=s(a.a,o.a,r,null,null);t.default=l.exports},"/n6Q":function(e,t,n){n("zQR9"),n("+tPU"),e.exports=n("Kh4W").f("iterator")},"06OY":function(e,t,n){var i=n("3Eo+")("meta"),a=n("EqjI"),o=n("D2L2"),s=n("evD5").f,r=0,l=Object.isExtensible||function(){return!0},c=!n("S82l")(function(){return l(Object.preventExtensions({}))}),d=function(e){s(e,i,{value:{i:"O"+ ++r,w:{}}})},u=function(e,t){if(!a(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,i)){if(!l(e))return"F";if(!t)return"E";d(e)}return e[i].i},f=function(e,t){if(!o(e,i)){if(!l(e))return!0;if(!t)return!1;d(e)}return e[i].w},p=function(e){return c&&h.NEED&&l(e)&&!o(e,i)&&d(e),e},h=e.exports={KEY:i,NEED:!1,fastKey:u,getWeak:f,onFreeze:p}},"0xDb":function(e,t,n){"use strict";function i(e,t){if(0===arguments.length)return null;var n=t||"{y}-{m}-{d} {h}:{i}:{s}",i=void 0;"object"===(void 0===e?"undefined":o()(e))?i=e:(10===(""+e).length&&(e=1e3*parseInt(e)),i=new Date(e));var a={y:i.getFullYear(),m:i.getMonth()+1,d:i.getDate(),h:i.getHours(),i:i.getMinutes(),s:i.getSeconds(),a:i.getDay()};return n.replace(/{(y|m|d|h|i|s|a)+}/g,function(e,t){var n=a[t];return"a"===t?["一","二","三","四","五","六","日"][n-1]:(e.length>0&&n<10&&(n="0"+n),n||0)})}t.a=i;var a=n("pFYg"),o=n.n(a)},"5DwC":function(e,t,n){t=e.exports=n("FZ+f")(!1),t.push([e.i,".btn_right{margin-top:3px;float:right;width:75px}.btn_left{width:100px}.checkRightBox{border:1px solid #dcdcdc;padding:10px}.checkAllBox,.checkBox1{padding:10px 0}.checkBox1{border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc}.checkBox2,.checkBox3{padding:10px 0}.checkBox3{border-top:1px solid #dcdcdc}.checkBox1 .el-checkbox,.checkBox2 .el-checkbox,.checkBox3 .el-checkbox{margin-left:0;margin-right:15px}body{background-color:#eef1f6}.bgWhite{background-color:#fff;padding:20px}.btn_pad{margin:0 0 20px 20px}.el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node,.el-tree-node .el-tree-node__children .el-tree-node__children .el-tree-node{float:left}.el-tree-node:first-child\r\n  .el-tree-node__children\r\n  .el-tree-node__children\r\n  .el-tree-node{float:none}.ceshi{height:25px;width:80px}.ceshi3{font-size:14px;color:#1d85fe;border:1px solid #1d85fe;background-color:#fff}.dialog-footer{text-align:center}.scrollBox{height:400px;overflow-y:scroll;overflow-x:hidden}",""])},"5QVw":function(e,t,n){e.exports={default:n("BwfY"),__esModule:!0}},"7UMu":function(e,t,n){var i=n("R9M2");e.exports=Array.isArray||function(e){return"Array"==i(e)}},"9bBU":function(e,t,n){n("mClu");var i=n("FeBl").Object;e.exports=function(e,t,n){return i.defineProperty(e,t,n)}},BwfY:function(e,t,n){n("fWfb"),n("M6a0"),n("OYls"),n("QWe/"),e.exports=n("FeBl").Symbol},C4MV:function(e,t,n){e.exports={default:n("9bBU"),__esModule:!0}},Kh4W:function(e,t,n){t.f=n("dSzd")},LKZe:function(e,t,n){var i=n("NpIQ"),a=n("X8DO"),o=n("TcQ7"),s=n("MmMw"),r=n("D2L2"),l=n("SfB7"),c=Object.getOwnPropertyDescriptor;t.f=n("+E39")?c:function(e,t){if(e=o(e),t=s(t,!0),l)try{return c(e,t)}catch(e){}if(r(e,t))return a(!i.f.call(e,t),e[t])}},"M6/Q":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"filter-container bgWhite"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入搜索的岗位名称"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.search.name,callback:function(t){e.search.name=t},expression:"search.name"}}),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{filterable:"",clearable:"",placeholder:"选择机构"},model:{value:e.search.officeId,callback:function(t){e.search.officeId=t},expression:"search.officeId"}},e._l(e.officeIds,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),n("button",{staticClass:"button-large el-icon-search btn_right",on:{click:e.handleFilter}},[e._v(" 搜索")])],1),e._v(" "),n("div",{staticClass:"app-container calendar-list-container"},[n("div",{staticClass:"bgWhite"},[n("button",{staticClass:"button-small btn_right btn_pad ceshi",on:{click:e.handleCreate}},[e._v("新增")]),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,stripe:"","element-loading-text":"正在加载",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"编号",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\n        ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"岗位名称",align:"center",prop:"name"}}),e._v(" "),n("el-table-column",{attrs:{label:"机构名称",align:"center",prop:"organization.name"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{staticClass:"el-icon-edit ceshi3",on:{click:function(n){e.handleUpdate(t.row)}}}),e._v(" "),n("el-button",{staticClass:"el-icon-delete ceshi3",on:{click:function(n){e.handleDelete(t.row)}}})]}}])})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[n("el-pagination",{staticClass:"fr mt20",attrs:{"current-page":e.listQuery.page,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),n("el-dialog",{staticClass:"diatable",attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"temp",staticClass:"small-space",staticStyle:{width:"500px","margin-left":"20px"},attrs:{model:e.temp,"label-position":"left",rules:e.rules,"label-width":"160px"}},[n("el-form-item",{attrs:{label:" 所属机构:",prop:"officeId"}},[n("el-select",{staticClass:"filter-item",staticStyle:{width:"400px"},attrs:{placeholder:"请选择"},on:{change:e.aaa},model:{value:e.temp.officeId,callback:function(t){e.temp.officeId=t},expression:"temp.officeId"}},e._l(e.officeIds,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"岗位名称:",prop:"name"}},[n("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"请输入2-15位的岗位名称"},model:{value:e.temp.name,callback:function(t){e.temp.name="string"==typeof t?t.trim():t},expression:"temp.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"等级:",prop:"dataScope"}},[n("el-select",{staticClass:"filter-item",staticStyle:{width:"400px"},attrs:{placeholder:"请选择"},on:{change:e.lvChange},model:{value:e.temp.dataScope,callback:function(t){e.temp.dataScope=t},expression:"temp.dataScope"}},e._l(e.roleLv,function(e){return n("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})})),e._v(" "),n("p",{staticStyle:{"font-size":"12px",color:"#8391a5"}},[e._v("* 十级权限最高，一级权限最低")])],1),e._v(" "),n("el-form-item",{attrs:{label:"权限:",prop:"check"}},[n("el-tree",{ref:"domTree",staticClass:"scrollBox",staticStyle:{width:"400px"},attrs:{data:e.data2,indent:10,"show-checkbox":"","node-key":"id","default-expand-all":!0,props:e.defaultProps},on:{"check-change":e.handTreechange,"node-click":e.nodeClick,"current-change":e.currentChange,"node-expand":e.nodeExpand,"node-collapse":e.nodeCollapse},model:{value:e.temp.check,callback:function(t){e.temp.check=t},expression:"temp.check"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",slot:"footer"},["update"==e.dialogStatus?n("button",{staticClass:"button-large",on:{click:function(t){e.update("temp")}}},[e._v("保 存")]):n("button",{staticClass:"button-large",attrs:{disabled:e.btnState},on:{click:function(t){e.create("temp")}}},[e._v("保 存")]),e._v(" "),n("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm("temp")}}},[e._v("取 消")])])],1)],1)])])},a=[],o={render:i,staticRenderFns:a};t.a=o},OYls:function(e,t,n){n("crlp")("asyncIterator")},"QWe/":function(e,t,n){n("crlp")("observable")},Rrel:function(e,t,n){var i=n("TcQ7"),a=n("n0T6").f,o={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],r=function(e){try{return a(e)}catch(e){return s.slice()}};e.exports.f=function(e){return s&&"[object Window]"==o.call(e)?r(e):a(i(e))}},XZlg:function(e,t,n){t=e.exports=n("FZ+f")(!1),t.push([e.i,".waves-ripple{position:absolute;border-radius:100%;background-color:rgba(0,0,0,.15);background-clip:padding-box;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);opacity:1}.waves-ripple.z-active{opacity:0;-webkit-transform:scale(2);-ms-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,-webkit-transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out;transition:opacity 1.2s ease-out,transform .6s ease-out,-webkit-transform .6s ease-out}",""])},Xc4G:function(e,t,n){var i=n("lktj"),a=n("1kS7"),o=n("NpIQ");e.exports=function(e){var t=i(e),n=a.f;if(n)for(var s,r=n(e),l=o.f,c=0;r.length>c;)l.call(e,s=r[c++])&&t.push(s);return t}},Zzip:function(e,t,n){e.exports={default:n("/n6Q"),__esModule:!0}},bOdI:function(e,t,n){"use strict";t.__esModule=!0;var i=n("C4MV"),a=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(e,t,n){return t in e?(0,a.default)(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},cAgV:function(e,t,n){"use strict";var i=n("jdeu"),a=function(e){e.directive("waves",i.a)};window.Vue&&(window.waves=i.a,Vue.use(a)),i.a.install=a,t.a=i.a},crlp:function(e,t,n){var i=n("7KvD"),a=n("FeBl"),o=n("O4g8"),s=n("Kh4W"),r=n("evD5").f;e.exports=function(e){var t=a.Symbol||(a.Symbol=o?{}:i.Symbol||{});"_"==e.charAt(0)||e in t||r(t,e,{value:s.f(e)})}},ctMr:function(e,t,n){var i=n("XZlg");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("rjj0")("44fae30e",i,!0)},fWfb:function(e,t,n){"use strict";var i=n("7KvD"),a=n("D2L2"),o=n("+E39"),s=n("kM2E"),r=n("880/"),l=n("06OY").KEY,c=n("S82l"),d=n("e8AB"),u=n("e6n0"),f=n("3Eo+"),p=n("dSzd"),h=n("Kh4W"),g=n("crlp"),m=n("Xc4G"),v=n("7UMu"),b=n("77Pl"),y=n("TcQ7"),x=n("MmMw"),k=n("X8DO"),w=n("Yobk"),S=n("Rrel"),_=n("LKZe"),C=n("evD5"),I=n("lktj"),M=_.f,z=C.f,F=S.f,L=i.Symbol,O=i.JSON,D=O&&O.stringify,j=p("_hidden"),N=p("toPrimitive"),T={}.propertyIsEnumerable,$=d("symbol-registry"),E=d("symbols"),B=d("op-symbols"),Q=Object.prototype,P="function"==typeof L,K=i.QObject,V=!K||!K.prototype||!K.prototype.findChild,W=o&&c(function(){return 7!=w(z({},"a",{get:function(){return z(this,"a",{value:7}).a}})).a})?function(e,t,n){var i=M(Q,t);i&&delete Q[t],z(e,t,n),i&&e!==Q&&z(Q,t,i)}:z,Y=function(e){var t=E[e]=w(L.prototype);return t._k=e,t},R=P&&"symbol"==typeof L.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof L},U=function(e,t,n){return e===Q&&U(B,t,n),b(e),t=x(t,!0),b(n),a(E,t)?(n.enumerable?(a(e,j)&&e[j][t]&&(e[j][t]=!1),n=w(n,{enumerable:k(0,!1)})):(a(e,j)||z(e,j,k(1,{})),e[j][t]=!0),W(e,t,n)):z(e,t,n)},A=function(e,t){b(e);for(var n,i=m(t=y(t)),a=0,o=i.length;o>a;)U(e,n=i[a++],t[n]);return e},Z=function(e,t){return void 0===t?w(e):A(w(e),t)},J=function(e){var t=T.call(this,e=x(e,!0));return!(this===Q&&a(E,e)&&!a(B,e))&&(!(t||!a(this,e)||!a(E,e)||a(this,j)&&this[j][e])||t)},X=function(e,t){if(e=y(e),t=x(t,!0),e!==Q||!a(E,t)||a(B,t)){var n=M(e,t);return!n||!a(E,t)||a(e,j)&&e[j][t]||(n.enumerable=!0),n}},q=function(e){for(var t,n=F(y(e)),i=[],o=0;n.length>o;)a(E,t=n[o++])||t==j||t==l||i.push(t);return i},G=function(e){for(var t,n=e===Q,i=F(n?B:y(e)),o=[],s=0;i.length>s;)!a(E,t=i[s++])||n&&!a(Q,t)||o.push(E[t]);return o};P||(L=function(){if(this instanceof L)throw TypeError("Symbol is not a constructor!");var e=f(arguments.length>0?arguments[0]:void 0),t=function(n){this===Q&&t.call(B,n),a(this,j)&&a(this[j],e)&&(this[j][e]=!1),W(this,e,k(1,n))};return o&&V&&W(Q,e,{configurable:!0,set:t}),Y(e)},r(L.prototype,"toString",function(){return this._k}),_.f=X,C.f=U,n("n0T6").f=S.f=q,n("NpIQ").f=J,n("1kS7").f=G,o&&!n("O4g8")&&r(Q,"propertyIsEnumerable",J,!0),h.f=function(e){return Y(p(e))}),s(s.G+s.W+s.F*!P,{Symbol:L});for(var H="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ee=0;H.length>ee;)p(H[ee++]);for(var te=I(p.store),ne=0;te.length>ne;)g(te[ne++]);s(s.S+s.F*!P,"Symbol",{for:function(e){return a($,e+="")?$[e]:$[e]=L(e)},keyFor:function(e){if(!R(e))throw TypeError(e+" is not a symbol!");for(var t in $)if($[t]===e)return t},useSetter:function(){V=!0},useSimple:function(){V=!1}}),s(s.S+s.F*!P,"Object",{create:Z,defineProperty:U,defineProperties:A,getOwnPropertyDescriptor:X,getOwnPropertyNames:q,getOwnPropertySymbols:G}),O&&s(s.S+s.F*(!P||c(function(){var e=L();return"[null]"!=D([e])||"{}"!=D({a:e})||"{}"!=D(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!R(e)){for(var t,n,i=[e],a=1;arguments.length>a;)i.push(arguments[a++]);return t=i[1],"function"==typeof t&&(n=t),!n&&v(t)||(t=function(e,t){if(n&&(t=n.call(this,e,t)),!R(t))return t}),i[1]=t,D.apply(O,i)}}}),L.prototype[N]||n("hJx8")(L.prototype,N,L.prototype.valueOf),u(L,"Symbol"),u(Math,"Math",!0),u(i.JSON,"JSON",!0)},jdeu:function(e,t,n){"use strict";var i=n("woOf"),a=n.n(i),o=n("ctMr");n.n(o);t.a={bind:function(e,t){e.addEventListener("click",function(n){var i=a()({},t.value),o=a()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),s=o.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var r=s.getBoundingClientRect(),l=s.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":(l=document.createElement("span"),l.className="waves-ripple",l.style.height=l.style.width=Math.max(r.width,r.height)+"px",s.appendChild(l)),o.type){case"center":l.style.top=r.height/2-l.offsetHeight/2+"px",l.style.left=r.width/2-l.offsetWidth/2+"px";break;default:l.style.top=n.pageY-r.top-l.offsetHeight/2-document.body.scrollTop+"px",l.style.left=n.pageX-r.left-l.offsetWidth/2-document.body.scrollLeft+"px"}return l.style.backgroundColor=o.color,l.className="waves-ripple z-active",!1}},!1)}}},mClu:function(e,t,n){var i=n("kM2E");i(i.S+i.F*!n("+E39"),"Object",{defineProperty:n("evD5").f})},n0T6:function(e,t,n){var i=n("Ibhu"),a=n("xnc9").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return i(e,a)}},oiIR:function(e,t,n){"use strict";var i=n("bOdI"),a=n.n(i),o=n("oppB"),s=n("cAgV"),r=n("0xDb"),l=[{value:"可用",key:"1"},{value:"不可用",key:"0"}];t.a={name:"table_demo",directives:{waves:s.a},data:function(){var e,t=this,i=function(e,i,a){if(!i)return a(new Error("岗位名不能为空"));console.log(t.dialogStatus),"create"==t.dialogStatus?n.i(o.i)(i).then(function(e){0==e.data.code?a(new Error("岗位名重复！")):a()}):a()};return e={btnShow:this.$store.state.user.buttonshow,btnState:!1,list:[],officeIds:[],total:null,listLoading:!1,state:!1,search:{name:"",officeId:""},listQuery:{page:1,limit:10,importance:void 0,title:void 0,type:void 0,sort:"+id"},pageNumber:1,pageSize:10},a()(e,"total",1),a()(e,"temp",{name:"",dataScope:"",check:[],officeId:""}),a()(e,"checkNode",[]),a()(e,"roleId",""),a()(e,"checked",[]),a()(e,"station",""),a()(e,"stationName",""),a()(e,"stationLv",[{id:"1",value:"一级"},{id:"2",value:"二级"},{id:"3",value:"三级"},{id:"4",value:"四级"},{id:"5",value:"五级"},{id:"6",value:"六级"},{id:"7",value:"七级"},{id:"8",value:"八级"},{id:"9",value:"九级"},{id:"10",value:"十级"}]),a()(e,"roleLv",[]),a()(e,"dialogFormVisible",!1),a()(e,"state",l),a()(e,"dialogStatus",""),a()(e,"textMap",{update:"编辑岗位",create:"新增岗位"}),a()(e,"dialogPvVisible",!1),a()(e,"pvData",[]),a()(e,"tableKey",0),a()(e,"data2",[]),a()(e,"defaultProps",{children:"subMenus",label:"name"}),a()(e,"powerList",[]),a()(e,"isIndeterminate",!0),a()(e,"rules",{officeId:[{required:!0,message:"机构不能为空",trigger:"change"}],name:[{required:!0,validator:i,trigger:"blur"},{min:2,max:15,message:"长度在 2 到 15 个字符",trigger:"blur"}],dataScope:[{required:!0,message:"等级不能为空",trigger:"change"}],check:[{type:"array",required:!0,message:"权限不能为空",trigger:"check-change"}]}),e},filters:{statusFilter:function(e){return{published:"success",draft:"gray",deleted:"danger"}[e]}},created:function(){var e=this;this.getList(),n.i(o.b)().then(function(t){console.log("权限列表"),console.log(t),e.data2=t.data.data}),n.i(o.a)({}).then(function(t){console.log("所属机构,机构搜索"),console.log(t),e.officeIds=t.data.data.list,console.log(e.officeIds)});var t=localStorage.getItem("dataScope");console.log(t,"用户等级");for(var i=0;i<t;i++)this.roleLv.push(this.stationLv[i]);console.log(this.roleLv,"用户看到的等级")},methods:{aaa:function(e){console.log(e)},getList:function(){var e=this;this.listLoading=!0;var t={};n.i(o.j)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),e.list=t.data.data.list,void 0!=e.list)for(var n=0;n<e.list.length;n++)e.list[n].index=n+1;e.total=t.data.data.count,e.listLoading=!1})},handleFilter:function(){var e=this;this.listQuery.page=1;var t={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(t),""!=t.name||""!=t.organization.id)this.listLoading=!0,n.i(o.j)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),1===t.data.code){if(e.list=t.data.data.list,void 0!=e.list)for(var n=0;n<e.list.length;n++)e.list[n].index=n+1;e.total=t.data.data.count,e.listLoading=!1}else e.listLoading=!1,e.$message({type:"warning",message:"岗位名不存在"})});else{var t={};n.i(o.j)(t,this.pageNumber,this.pageSize).then(function(t){if(console.log(t),1===t.data.code){if(e.list=t.data.data.list,void 0!=e.list)for(var n=0;n<e.list.length;n++)e.list[n].index=n+1;e.total=t.data.data.count,e.listLoading=!1}})}},handleSizeChange:function(e){var t=this;this.pageSize=e;var i={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(i),""!=i.name||""!=i.organization.id)this.listLoading=!0,n.i(o.j)(i,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var n=0;n<t.list.length;n++)t.list[n].index=n+1;t.total=e.data.data.count,t.listLoading=!1}else t.listLoading=!1,t.$message({type:"warning",message:"岗位名不存在"})});else{var i={};n.i(o.j)(i,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var n=0;n<t.list.length;n++)t.list[n].index=n+1;t.total=e.data.data.count,t.listLoading=!1}})}},handleCurrentChange:function(e){var t=this;this.pageNumber=e;var i={name:this.search.name,organization:{id:this.search.officeId}};if(console.log(i),""!=i.name||""!=i.organization.id)this.listLoading=!0,n.i(o.j)(i,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var n=0;n<t.list.length;n++)t.list[n].index=n+1;t.total=e.data.data.count,t.listLoading=!1}else t.listLoading=!1,t.$message({type:"warning",message:"岗位名不存在"})});else{var i={};n.i(o.j)(i,this.pageNumber,this.pageSize).then(function(e){if(console.log(e),1===e.data.code){if(t.list=e.data.data.list,void 0!=t.list)for(var n=0;n<t.list.length;n++)t.list[n].index=n+1;t.total=e.data.data.count,t.listLoading=!1}})}},handTreechange:function(e,t,n){if(console.log(this.temp.check,"check-----------------"),console.log(e,t,n,"checkchange节点选中状态发生变化"),t)if(void 0==e.subMenus){console.log(e.permission,"子集被勾选的权限"),console.log(e.id,"子集被勾选的id"),console.log(e.parentId,"子集的父级id"),console.log(e.parentIds,"子集的父级ids");var i=e.parentIds.split(",");console.log(i),console.log(this.data2,"父元素");for(var a=0;a<this.data2.length;a++)if(this.data2[a].id==i[2]&&console.log(a,"下标i"),void 0!=this.data2[a].subMenus)for(var o=0;o<this.data2[a].subMenus.length;o++)if(this.data2[a].subMenus[o].id==i[3]){var s=this.data2[a].subMenus[o].subMenus[0];if(void 0!=s.permission){var r=s.permission,l=r.substring(r.length-4,r.length);console.log(l,"截取"),"view"==l&&this.$refs.domTree.setChecked(s.id,!0)}}}else console.log(e.permission,"父级被勾选的权限"),console.log(e.id,"父级被勾选的id"),console.log(e.subMenus[0],"父级的第一个元素");this.temp.check=this.$refs.domTree.getCheckedKeys()},nodeClick:function(e,t,n){console.log(e,t,n,"nodeclick节点被点击时")},currentChange:function(e,t){console.log(e,t,"currentchange选中节点变化时")},nodeExpand:function(e,t,n){console.log(e,t,n,"nodeexpand节点被展开时")},nodeCollapse:function(e,t,n){console.log(e,t,n,"nodecollapse节点关闭")},timeFilter:function(e){if(!e[0])return this.listQuery.start=void 0,void(this.listQuery.end=void 0);this.listQuery.start=parseInt(+e[0]/1e3),this.listQuery.end=parseInt((+e[1]+864e5)/1e3)},lvChange:function(e){},offChange:function(e){console.log(e)},handleCreate:function(){this.dialogStatus="create",this.dialogFormVisible=!0,1==this.officeIds.length&&(console.log(this.officeIds[0].id),this.temp.officeId=this.officeIds[0].id)},handleUpdate:function(e){var t=this;this.listLoading=!0,n.i(o.k)(e.id).then(function(e){if(console.log(e),t.listLoading=!1,1==e.data.code){t.dialogStatus="update",t.dialogFormVisible=!0;var n=e.data.data;t.roleId=n.id,t.temp.officeId=n.organization.id,t.temp.name=n.name,t.temp.dataScope=n.dataScope,t.temp.check=n.menuIdList,console.log(n.menuIdList);for(var i=0;i<t.data2.length;i++)if("index"==t.data2[i].permission?console.log(t.data2[i].permission):t.temp.check.remove(t.data2[i].id),void 0!=t.data2[i].subMenus)for(var a=t.data2[i],o=0;o<a.subMenus.length;o++)console.log(a.subMenus[o].id),t.temp.check.remove(a.subMenus[o].id);console.log(n.menuIdList),console.log(t.temp.check),t.$nextTick(function(){t.$refs.domTree.setCheckedKeys(t.temp.check)})}else t.$message({type:"warning",message:"请求失败"})})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){console.log(e);var i={id:e.id};n.i(o.l)(i).then(function(e){console.log(e),1===e.data.code?(t.$message({type:"success",message:"删除成功!"}),t.handleFilter()):t.$message({type:"warning",message:e.data.data})}).catch(function(){t.$message({type:"warning",message:"服务器已断开，请稍后再试"})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},getLv:function(){},getFather:function(e){console.log(121233213);for(var t in e)void 0!=e[t].subMenus?(console.log(t),this.getFather(e[t].subMenus)):this.data2.indexOf(e[t].id)>-1&&console.log(e[t].parentId)},create:function(e){var t=this;this.btnState=!0,setTimeout(function(){t.btnState=!1},1e3),this.search={name:"",officeId:""};for(var i=this.$refs.domTree.getCheckedKeys(),a="",s=0;s<i.length;s++)a+=i[s]+",";var r={name:this.temp.name,dataScope:this.temp.dataScope,menuIds:a,useable:"1",organization:{id:this.temp.officeId}};console.log(r),this.$refs[e].validate(function(i){if(!i)return!1;n.i(o.h)(r).then(function(n){console.log(n),1===n.data.code?(t.resetTemp(),t.$refs[e].resetFields(),t.$refs.domTree.setCheckedKeys([]),t.$message({type:"success",message:"添加成功"}),t.dialogFormVisible=!1,t.listQuery.page=1,t.pageNumber=1,t.handleFilter()):t.$message({type:"error",message:n.data.data[0]})})})},update:function(e){for(var t=this,i=this.$refs.domTree.getCheckedKeys(),a="",s=0;s<i.length;s++)a+=i[s]+",";var r={id:this.roleId,name:this.temp.name,dataScope:this.temp.dataScope,menuIds:a,useable:"1",organization:{id:this.temp.officeId}};console.log(r),this.$refs[e].validate(function(i){if(!i)return!1;n.i(o.h)(r).then(function(n){1===n.data.code?(t.resetTemp(),t.$refs.domTree.setCheckedKeys([]),t.$refs[e].resetFields(),t.dialogFormVisible=!1,t.$message({type:"success",message:"修改成功"}),t.handleFilter()):"string"==typeof n.data.data?t.$message({type:"error",message:n.data.data}):t.$message({type:"error",message:n.data.data[0]})})})},resetForm:function(e){this.dialogFormVisible=!1,this.resetTemp(),this.$refs.domTree.setCheckedKeys([]),this.$refs[e].resetFields()},resetTemp:function(){this.temp={officeId:"",name:"",dataScope:"",check:[]}},handleFetchPv:function(e){var t=this;fetchPv(e).then(function(e){t.pvData=e.data.pvData,t.dialogPvVisible=!0})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"timestamp"===e?n.i(r.a)(t[e]):t[e]})})}}}},oppB:function(e,t,n){"use strict";function i(e){return k.post("/apiservice/a/sys/user/saveData",e)}function a(e,t,n){return k.post("/apiservice/a/sys/role/listPageData?pageNo="+t+"&pageSize="+n,e)}function o(e){return k.post("/apiservice/a/sys/role/listData",e)}function s(e,t,n){return k.post("/apiservice/a/sys/user/listData?pageNo="+t+"&pageSize="+n,e)}function r(e){return k.post("/apiservice/a/sys/role/saveData",e)}function l(e){return k.post("/apiservice/a/sys/role/deleteRole",e)}function c(e){return k.get("/apiservice/a/sys/role/getRoleDetail?id="+e)}function d(e){return k.post("/apiservice/a/sys/organization/listData?pageSize=-1",e)}function u(e){return k.post("/apiservice/a/service/station/serviceStation/listByOffice",e)}function f(){return k.get("/apiservice/a/sys/menu/getMenuList")}function p(e){return k.post("/apiservice/a/sys/user/deleteUser",e)}function h(e){return k.get("/apiservice/a/sys/role/chkName?name="+e)}function g(e,t,n){return new b.a(function(i,a){k.post("apiservice/a/service/order/orderDispatch/listData?pageNo="+e+"&pageSize="+t,n).then(function(e){i(e)}).catch(function(e){a(e)})})}function m(e){return new b.a(function(t,n){k.post("apiservice/a/service/order/orderDispatch/formData",e).then(function(e){t(e)}).catch(function(e){n(e)})})}t.g=i,t.j=a,t.f=o,t.c=s,t.h=r,t.l=l,t.k=c,t.a=d,t.e=u,t.b=f,t.d=p,t.i=h,t.m=g,t.n=m;var v=n("//Fk"),b=n.n(v),y=n("mtWM"),x=n.n(y),k=x.a.create({headers:{"content-type":"application/json;charset=UTF-8"}})},pFYg:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n("Zzip"),o=i(a),s=n("5QVw"),r=i(s),l="function"==typeof r.default&&"symbol"==typeof o.default?function(e){return typeof e}:function(e){return e&&"function"==typeof r.default&&e.constructor===r.default&&e!==r.default.prototype?"symbol":typeof e};t.default="function"==typeof r.default&&"symbol"===l(o.default)?function(e){return void 0===e?"undefined":l(e)}:function(e){return e&&"function"==typeof r.default&&e.constructor===r.default&&e!==r.default.prototype?"symbol":void 0===e?"undefined":l(e)}},pWQp:function(e,t,n){var i=n("5DwC");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("rjj0")("59882488",i,!0)}});