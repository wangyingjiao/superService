webpackJsonp([22],{"3zoG":function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".tableWarp{width:100%;background:#fff;padding:20px 30px}.head-image{width:50px;height:50px;margin-top:5px}",""])},FWz8:function(e,t,a){"use strict";function r(e,t,a){return h.a.post("/apiservice/a/service/order/orderInfo/listData?pageNo="+t+"&pageSize="+a,e)}function i(e){return h.a.post("/apiservice/a/service/order/orderInfo/formData",e)}function o(e){return h.a.post("/apiservice/a/service/order/orderInfo/timeDataList",e)}function s(e){return h.a.post("/apiservice/a/service/order/orderInfo/saveTime",e)}function n(e){return h.a.post("/apiservice/a/service/order/orderInfo/addTech",e)}function c(e){return h.a.post("/apiservice/a/service/order/orderInfo/addTechSave",e)}function l(e){return h.a.post("/apiservice/a/service/order/orderInfo/dispatchTech",e)}function d(e){return h.a.post("/apiservice/a/service/order/orderInfo/dispatchTechSave",e)}function u(e,t,a){return h.a.post("apiservice/a/service/order/orderDispatch/listData?pageNo="+t+"&pageSize="+a,e)}function p(e){return h.a.post("apiservice/a/service/order/orderDispatch/formData",e)}function f(e){return h.a.post("apiservice/a/service/order/orderDispatch/dispatchTech",e)}function v(e){return h.a.post("/apiservice/a/service/order/orderDispatch/dispatchTechSave",e)}t.a=r,t.b=i,t.h=o,t.c=s,t.d=n,t.f=c,t.e=l,t.g=d,t.k=u,t.l=p,t.i=f,t.j=v;var h=a("Vo7i")},IRMY:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tableWarp"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.reassList,border:""}},[a("el-table-column",{attrs:{prop:"headPic",label:"头像",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("img",{staticClass:"head-image",attrs:{src:e.imgSrc+t.row.headPic+e.picWidth60,alt:""}})])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"techName",label:"姓名",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"性别",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["male"==t.row.techSex?a("span",{staticClass:"fontSize12"},[e._v("男")]):e._e(),e._v(" "),"female"==t.row.techSex?a("span",{staticClass:"fontSize12"},[e._v("女")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"techPhone",label:"电话",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"岗位性质",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["part_time"==t.row.jobNature?a("span",{staticClass:"fontSize12"},[e._v("兼职")]):e._e(),e._v(" "),"full_time"==t.row.jobNature?a("span",{staticClass:"fontSize12"},[e._v("全职")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"createDate",label:"派单时间",align:"center"}})],1)],1)},i=[],o={render:r,staticRenderFns:i};t.a=o},T9cD:function(e,t,a){"use strict";var r=a("FWz8");t.a={name:"dispatchReass",data:function(){return{reassList:[],listLoading:!1}},methods:{reassClick:function(e){var t=this;this.listLoading=!0;var i={orderId:e};a.i(r.l)(i).then(function(e){1===e.data.code?(t.reassList=e.data.data,t.listLoading=!1):t.listLoading=!1}).catch(function(e){t.listLoading=!1})}},mounted:function(){var e=window.localStorage.getItem("orderId1");void 0==this.$route.query.id?this.reassClick(e):this.reassClick(this.$route.query.id)}}},"wh+Z":function(e,t,a){"use strict";function r(e){a("znou")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("T9cD"),o=a("IRMY"),s=a("VU/8"),n=r,c=s(i.a,o.a,n,null,null);t.default=c.exports},znou:function(e,t,a){var r=a("3zoG");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("c2161e30",r,!0)}});