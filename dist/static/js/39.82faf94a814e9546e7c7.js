webpackJsonp([39],{"3zoG":function(e,r,i){r=e.exports=i("FZ+f")(!1),r.push([e.i,".tableWarp{width:100%;background:#fff;padding:20px 30px}.head-image{width:50px;height:50px;margin-top:5px}",""])},FWz8:function(e,r,i){"use strict";function t(e,r,i){return H.a.post("/apiservice/a/service/order/orderInfo/listData?pageNo="+r+"&pageSize="+i,e)}function a(e){return H.a.post("/apiservice/a/service/order/orderInfo/formData",e)}function o(e){return H.a.post("/apiservice/a/service/order/orderInfo/timeDataList",e)}function n(e){return H.a.post("/apiservice/a/service/order/orderInfo/saveTime",e)}function s(e){return H.a.post("/apiservice/a/service/order/orderInfo/addTech",e)}function c(e){return H.a.post("/apiservice/a/service/order/orderInfo/addTechSave",e)}function u(e){return H.a.post("/apiservice/a/service/order/orderInfo/dispatchTech",e)}function d(e){return H.a.post("/apiservice/a/service/order/orderInfo/dispatchTechSave",e)}function p(e,r,i){return H.a.post("apiservice/a/service/order/orderDispatch/listData?pageNo="+r+"&pageSize="+i,e)}function v(e){return H.a.post("apiservice/a/service/order/orderDispatch/formData",e)}function f(e){return H.a.post("apiservice/a/service/order/orderDispatch/dispatchTech",e)}function l(e){return H.a.post("/apiservice/a/service/order/orderDispatch/dispatchTechSave",e)}function h(e){return H.a.post("/apiservice/a/service/order/orderInfo/findCustomerByPhone",e)}function m(e){return H.a.post("/apiservice/a/service/order/orderInfo/findCustomerById",e)}function b(e){return H.a.post("/apiservice/a/service/order/orderInfo/findItemList",e)}function g(e){return H.a.post("/apiservice/a/service/order/orderInfo/findGoodsListByItem",e)}function I(e){return H.a.post("/apiservice/a/service/order/orderInfo/findTechListByGoods",e)}function S(e){return H.a.post("/apiservice/a/service/order/orderInfo/findTimeListByTech",e)}function T(e){return H.a.post("/apiservice/a/service/order/orderInfo/createOrder",e)}function D(e){return H.a.post("/apiservice/a/service/order/orderInfo/findGoodsNeedTech",e)}function L(e){return H.a.post("/apiservice/a/service/order/orderInfo/orderCancel",e)}function _(e){return H.a.post("/apiservice/a/service/order/orderInfo/orderRefundInit",e)}function w(e){return H.a.post("/apiservice/a/service/order/orderInfo/orderRefundSave",e)}function y(e,r,i){return new Z.a(function(t,a){H.a.post("apiservice/a/service/order/orderInfo/listDataRefund?pageNo="+r+"&pageSize="+i,e).then(function(e){t(e)}).catch(function(e){a(e)})})}function z(e){return console.log(e,"obj"),new Z.a(function(r,i){H.a.post("apiservice/a/service/order/orderInfo/formDataRefund",e).then(function(e){r(e)}).catch(function(e){i(e)})})}function R(e,r,i){return H.a.post("apiservice/a/service/order/orderInfo/listDataPay?pageNo="+r+"&pageSize="+i,e)}function C(e,r,i){return H.a.post("apiservice/a/service/order/combination/listDataCombination?pageNo="+r+"&pageSize="+i,e)}function x(e){return H.a.post("/apiservice/a/service/order/combination/getCombinationById",e)}function k(e){return H.a.post("/apiservice/a/service/order/combination/saveRegularDateDateList",e)}function N(e){return H.a.post("/apiservice/a/service/order/combination/saveRegularDateTechList",e)}function O(e){return H.a.post("/apiservice/a/service/order/combination/saveRegularDate",e)}function j(e){return H.a.post("/apiservice/a/service/order/combination/updateRegularDate",e)}function B(e){return H.a.post("/apiservice/a/service/order/combination/updateRegularTechTechList",e)}function P(e){return H.a.post("/apiservice/a/service/order/combination/updateRegularTechSave",e)}function F(e){return H.a.post("/apiservice/a/service/order/combination/formOrderRemark",e)}function G(e){return H.a.post("/apiservice/a/service/order/combination/updateOrderTimeDateList",e)}function W(e){return H.a.post("/apiservice/a/service/order/combination/updateOrderTechInit",e)}function M(e){return H.a.post("/apiservice/a/service/order/combination/updateOrderTechTechList",e)}function q(e){return H.a.post("/apiservice/a/service/order/combination/updateOrderTechAddSave",e)}function $(e){return H.a.post("/apiservice/a/service/order/combination/updateOrderTechDispatchSave",e)}function A(e){return H.a.post("/apiservice/a/service/order/combination/updateOrderTimeTechList",e)}function E(e){return H.a.post("/apiservice/a/service/order/combination/updateOrderTimeSave",e)}function J(e){return H.a.post("/apiservice/a/service/order/combination/subscribeDateList",e)}function K(e){return H.a.post("/apiservice/a/service/order/combination/subscribeTechList",e)}function V(e){return H.a.post("/apiservice/a/service/order/combination/subscribeSave",e)}r.d=t,r.f=a,r.n=o,r.g=n,r.h=s,r.j=c,r.i=u,r.k=d,r.J=p,r.K=v,r.H=f,r.I=l,r.N=h,r.P=m,r.O=b,r.Q=g,r.R=I,r.M=S,r.S=T,r.L=D,r.m=L,r.l=_,r.e=w,r.a=y,r.b=z,r.c=R,r.G=C,r.A=x,r.p=k,r.o=N,r.q=O,r.r=j,r.B=B,r.C=P,r.v=F,r.D=G,r.w=W,r.x=M,r.y=q,r.z=$,r.E=A,r.F=E,r.s=J,r.t=K,r.u=V;var Y=i("//Fk"),Z=i.n(Y),H=i("Vo7i")},IRMY:function(e,r,i){"use strict";var t=function(){var e=this,r=e.$createElement,i=e._self._c||r;return i("div",{staticClass:"tableWarp"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.reassList,border:""}},[i("el-table-column",{attrs:{prop:"headPic",label:"头像",align:"center",width:"85"},scopedSlots:e._u([{key:"default",fn:function(r){return[i("div",[i("img",{staticClass:"head-image",attrs:{src:e.imgSrc+r.row.headPic+e.picWidth60,alt:""}})])]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"techName",width:"230",label:"姓名",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{label:"性别",align:"center"},scopedSlots:e._u([{key:"default",fn:function(r){return["male"==r.row.techSex?i("span",{staticClass:"fontSize12"},[e._v("男")]):e._e(),e._v(" "),"female"==r.row.techSex?i("span",{staticClass:"fontSize12"},[e._v("女")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"techPhone",label:"电话",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{label:"岗位性质",align:"center"},scopedSlots:e._u([{key:"default",fn:function(r){return["part_time"==r.row.jobNature?i("span",{staticClass:"fontSize12"},[e._v("兼职")]):e._e(),e._v(" "),"full_time"==r.row.jobNature?i("span",{staticClass:"fontSize12"},[e._v("全职")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"createDate",label:"派单时间",align:"center"}})],1)],1)},a=[],o={render:t,staticRenderFns:a};r.a=o},T9cD:function(e,r,i){"use strict";var t=i("FWz8");r.a={name:"dispatchReass",data:function(){return{reassList:[],listLoading:!1}},methods:{reassClick:function(e){var r=this;this.listLoading=!0;var a={orderId:e};i.i(t.K)(a).then(function(e){1===e.data.code?(r.reassList=e.data.data,r.listLoading=!1):r.listLoading=!1}).catch(function(e){r.listLoading=!1})}},mounted:function(){var e=window.localStorage.getItem("orderId1");void 0==this.$route.query.id?this.reassClick(e):this.reassClick(this.$route.query.id)}}},"wh+Z":function(e,r,i){"use strict";function t(e){i("znou")}Object.defineProperty(r,"__esModule",{value:!0});var a=i("T9cD"),o=i("IRMY"),n=i("VU/8"),s=t,c=n(a.a,o.a,s,null,null);r.default=c.exports},znou:function(e,r,i){var t=i("3zoG");"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);i("rjj0")("c2161e30",t,!0)}});