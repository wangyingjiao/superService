webpackJsonp([35],{"+KN9":function(e,r,t){var a=t("7N9S");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("XkoO")("0f9e6e50",a,!0)},"7N9S":function(e,r,t){r=e.exports=t("acE3")(!1),r.push([e.i,".tableWarp{width:100%;background:#fff;padding:20px 30px}.head-image{width:50px;height:50px;margin-top:5px}",""])},FWz8:function(e,r,t){"use strict";function a(e,r,t){return k.a.post("/apiservice/a/service/order/orderInfo/listData?pageNo="+r+"&pageSize="+t,e)}function i(e){return k.a.post("/apiservice/a/service/order/orderInfo/formData",e)}function o(e){return k.a.post("/apiservice/a/service/order/orderInfo/timeDataList",e)}function n(e){return k.a.post("/apiservice/a/service/order/orderInfo/saveTime",e)}function s(e){return k.a.post("/apiservice/a/service/order/orderInfo/addTech",e)}function c(e){return k.a.post("/apiservice/a/service/order/orderInfo/addTechSave",e)}function d(e){return k.a.post("/apiservice/a/service/order/orderInfo/dispatchTech",e)}function u(e){return k.a.post("/apiservice/a/service/order/orderInfo/dispatchTechSave",e)}function f(e,r,t){return k.a.post("apiservice/a/service/order/orderDispatch/listData?pageNo="+r+"&pageSize="+t,e)}function p(e){return k.a.post("apiservice/a/service/order/orderDispatch/formData",e)}function l(e){return k.a.post("apiservice/a/service/order/orderDispatch/dispatchTech",e)}function v(e){return k.a.post("/apiservice/a/service/order/orderDispatch/dispatchTechSave",e)}function h(e){return k.a.post("/apiservice/a/service/order/orderInfo/findCustomerByPhone",e)}function g(e){return k.a.post("/apiservice/a/service/order/orderInfo/findCustomerById",e)}function m(e){return k.a.post("/apiservice/a/service/order/orderInfo/findItemList",e)}function I(e){return k.a.post("/apiservice/a/service/order/orderInfo/findGoodsListByItem",e)}function S(e){return k.a.post("/apiservice/a/service/order/orderInfo/findTechListByGoods",e)}function _(e){return k.a.post("/apiservice/a/service/order/orderInfo/findTimeListByTech",e)}function b(e){return k.a.post("/apiservice/a/service/order/orderInfo/createOrder",e)}function w(e){return k.a.post("/apiservice/a/service/order/orderInfo/findGoodsNeedTech",e)}function y(e){return k.a.post("/apiservice/a/service/order/orderInfo/orderCancel",e)}function L(e){return k.a.post("/apiservice/a/service/order/orderInfo/orderRefundInit",e)}function N(e){return k.a.post("/apiservice/a/service/order/orderInfo/orderRefundSave",e)}function D(e,r,t){return new T.a(function(a,i){k.a.post("apiservice/a/service/order/orderInfo/listDataRefund?pageNo="+r+"&pageSize="+t,e).then(function(e){a(e)}).catch(function(e){i(e)})})}function x(e){return console.log(e,"obj"),new T.a(function(r,t){k.a.post("apiservice/a/service/order/orderInfo/formDataRefund",e).then(function(e){r(e)}).catch(function(e){t(e)})})}function C(e,r,t){return k.a.post("apiservice/a/service/order/orderInfo/listDataPay?pageNo="+r+"&pageSize="+t,e)}r.d=a,r.f=i,r.n=o,r.g=n,r.h=s,r.j=c,r.i=d,r.k=u,r.q=f,r.r=p,r.o=l,r.p=v,r.u=h,r.w=g,r.v=m,r.x=I,r.y=S,r.t=_,r.z=b,r.s=w,r.m=y,r.l=L,r.e=N,r.a=D,r.b=x,r.c=C;var z=t("rVsN"),T=t.n(z),k=t("Vo7i")},U2SM:function(e,r,t){"use strict";var a=t("FWz8");r.a={name:"dispatchReass",data:function(){return{reassList:[],listLoading:!1}},methods:{reassClick:function(e){var r=this;this.listLoading=!0;var i={orderId:e};t.i(a.r)(i).then(function(e){1===e.data.code?(r.reassList=e.data.data,r.listLoading=!1):r.listLoading=!1}).catch(function(e){r.listLoading=!1})}},mounted:function(){var e=window.localStorage.getItem("orderId1");void 0==this.$route.query.id?this.reassClick(e):this.reassClick(this.$route.query.id)}}},nY4l:function(e,r,t){"use strict";var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"tableWarp"},[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.reassList,border:""}},[t("el-table-column",{attrs:{prop:"headPic",label:"头像",align:"center"},scopedSlots:e._u([{key:"default",fn:function(r){return[t("div",[t("img",{staticClass:"head-image",attrs:{src:e.imgSrc+r.row.headPic+e.picWidth60,alt:""}})])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"techName",label:"姓名",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{label:"性别",align:"center"},scopedSlots:e._u([{key:"default",fn:function(r){return["male"==r.row.techSex?t("span",{staticClass:"fontSize12"},[e._v("男")]):e._e(),e._v(" "),"female"==r.row.techSex?t("span",{staticClass:"fontSize12"},[e._v("女")]):e._e()]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"techPhone",label:"电话",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{label:"岗位性质",align:"center"},scopedSlots:e._u([{key:"default",fn:function(r){return["part_time"==r.row.jobNature?t("span",{staticClass:"fontSize12"},[e._v("兼职")]):e._e(),e._v(" "),"full_time"==r.row.jobNature?t("span",{staticClass:"fontSize12"},[e._v("全职")]):e._e()]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"createDate",label:"派单时间",align:"center"}})],1)],1)},i=[],o={render:a,staticRenderFns:i};r.a=o},"wh+Z":function(e,r,t){"use strict";function a(e){t("+KN9")}Object.defineProperty(r,"__esModule",{value:!0});var i=t("U2SM"),o=t("nY4l"),n=t("J0+h"),s=a,c=n(i.a,o.a,s,null,null);r.default=c.exports}});