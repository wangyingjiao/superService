webpackJsonp([20],{"5r0l":function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,".dispatchNumberStyle[data-v-390481a8]{cursor:pointer}.dispatchNumberStyle[data-v-390481a8]:hover{color:#1d85fe}.width120[data-v-390481a8]{width:120px}.FloatRight[data-v-390481a8]{float:right}.selfpromMessageTab[data-v-390481a8]{position:relative;width:100%;margin-top:20px;margin-left:10px}.techNameStyle[data-v-390481a8]{width:80px;height:25px;line-height:25px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tabWrap1[data-v-390481a8]{width:80px;margin-right:10px;margin-left:10px;margin-top:5px;font-size:12px;display:inline-block;height:25px;text-align:center;line-height:25px;border-radius:12px;border:1px solid #bfcbd9;position:relative}.selfTableWrapONE[data-v-390481a8]{margin-top:20px;overflow:hidden;width:660px;margin-bottom:20px;height:300px}.table-d[data-v-390481a8]{width:677px;overflow-y:scroll;height:300px;margin-left:15px}.selfTable[data-v-390481a8],.selfTable tr td[data-v-390481a8],.selfTable tr th[data-v-390481a8]{border:1px solid #eee}.selfTable[data-v-390481a8]{min-height:25px;line-height:25px;text-align:center;border-collapse:collapse;padding:2px}.height70[data-v-390481a8]{height:70px}.imgStyle[data-v-390481a8]{display:block}.slide-enter-active[data-v-390481a8]{transition:all .8s ease}.slide-leave-active[data-v-390481a8]{transition:all .8s cubic-bezier(1,.5,.8,1)}.slide-enter[data-v-390481a8],.slide-leave-active[data-v-390481a8]{-webkit-transform:translateY(-10px);transform:translateY(-10px);opacity:0}.tableHeader[data-v-390481a8]{position:absolute;z-index:99999;margin:0;margin-top:-1px}.selfTdStyle1[data-v-390481a8]{vertical-align:middle;height:70px;line-height:70px}.selftechNameStyle[data-v-390481a8]{width:185px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fontSize12[data-v-390481a8]{font-size:12px}.selfTabProm[data-v-390481a8]{width:100%;text-align:center;height:200px;line-height:200px}.bgWhite[data-v-390481a8]{background-color:#fff;padding:20px}.el-table_1_column_8[data-v-390481a8]{border-right:none}.selfTd[data-v-390481a8]{text-align:center;height:60px;line-height:60px;width:150%;margin-left:-17px;border-bottom:1px solid #dfe6ec}.selfTd[data-v-390481a8]:last-child{border:none}.addorder-container[data-v-390481a8]{width:100%;float:left;background:#eef1f6}.fist-bar[data-v-390481a8]{padding:20px;background:#fff;margin-right:20px}.second-bar[data-v-390481a8]{padding-top:0;padding-bottom:20px;background:#eef1f6;margin-left:0;margin-right:0}.el-table .cell[data-v-390481a8]{padding:0}.tableWarpaa .el-pagination[data-v-390481a8]{text-align:right}.techDialog .el-pagination[data-v-390481a8]{text-align:center;padding:0}.techDialog .dialog-footer[data-v-390481a8]{padding-bottom:50px}.tableWarpaa tr>td[data-v-390481a8]:first-child{padding:0 20px}.head-images[data-v-390481a8]{width:50px;height:50px;margin-top:5px}.addorder-container .pagination-container[data-v-390481a8]{padding:20px 0}.addorder-container .dialog-footer[data-v-390481a8]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.addorder-container .dialog-footer .button-cancel[data-v-390481a8]{margin-left:20px}.selfTableHEADTD[data-v-390481a8]{background:#eef1f6;height:60px;border:none!important}",""])},DTCC:function(t,e,a){"use strict";var i=a("FWz8");e.a={name:"",data:function(){return{btnShow:JSON.parse(localStorage.getItem("btn")),techSaveFlag:!1,listTech:[],techName:"",middleA:[],tableData:[],technicianOptions:[{key:"1",technicianName:"技师姓名"},{key:"2",technicianName:"技师手机号"},{key:"3",technicianName:"订单编号"}],dialogTableVisible:!1,technicianName:"",technicianName1:"",pagetotal1:null,pageSize1:10,pageNumber:1,jumpPage:1,aa:"",orderId:"",listLoading:!1,techName1:"",techName2:"",techPhone1:"",orderNumber1:""}},methods:{godispatchReass:function(t){window.localStorage.setItem("orderId1",t),this.$router.push({path:"/clean/dispatchReass/",query:{id:t}})},searchTeh:function(){var t=this,e={id:this.orderId,techName:this.techName};a.i(i.i)(e).then(function(e){if(1===e.data.code)if(void 0!=e.data.data){t.listTech=e.data.data;for(var a=0;a<t.middleA.length;a++)for(var i=0;i<t.listTech.length;i++)t.$set(t.listTech[i],"techChecked",!1),t.listTech[i].techId==t.middleA[a].techId&&(t.listTech[i].techChecked=!0)}else t.listTech=[]}).catch(function(t){})},ChangeTech:function(t){t.techChecked?this.middleA.push(t):this.middleA.remove(t)},submitForm2:function(){var t=this;this.techSaveFlag=!0;var e=[];if(void 0!=this.middleA&&0!=this.middleA.length)for(var s=0;s<this.middleA.length;s++)1==this.middleA[s].techChecked&&e.push(this.middleA[s].techId);if(0!=e.length){var n={id:this.orderId,dispatchTechId:this.aa,techIdList:e};a.i(i.j)(n).then(function(e){if(t.techSaveFlag=!1,1===e.data.code){t.$message({type:"success",message:"改派成功!"});var a={};t.reassList(a,t.pageNumber,t.pageSize1),t.middleA=[],t.listTech=[],t.dialogTableVisible=!1}else t.$message({type:"error",message:e.data.data})}).catch(function(e){t.techSaveFlag=!1})}0==e.length&&(this.techSaveFlag=!1,this.dialogTableVisible=!1)},cancelForm2:function(){this.middleA=[],this.listTech=[],this.dialogTableVisible=!1},gaiPai:function(t,e){var s=this;this.techName2="",this.aa=e.techId,this.orderId=t;var n={id:t};a.i(i.i)(n).then(function(t){1===t.data.code?(s.dialogTableVisible=!0,void 0!=t.data.data?s.listTech=t.data.data:s.listTech=[]):s.$message({type:"error",message:t.data.data})}).catch(function(t){})},lookInf:function(t){window.localStorage.setItem("orderId",t),this.$router.push({path:"/clean/orderinfo",query:{id:t}})},reassList:function(t,e,s){var n=this;this.listLoading=!0;var l=t;a.i(i.k)(l,e,s).then(function(t){1===t.data.code?(n.tableData=t.data.data.list,n.pagetotal1=t.data.data.count,n.listLoading=!1):n.listLoading=!1}).catch(function(t){})},localSearch:function(){"1"==this.technicianName?this.techName1=this.techName:"2"==this.technicianName?this.techPhone1=this.techName:"3"==this.technicianName?this.orderNumber1=this.techName:(this.techName1="",this.techPhone1="",this.orderNumber1="");var t={techName:this.techName1,techPhone:this.techPhone1,orderNumber:this.orderNumber1};this.pageNumber=1,this.jumpPage=1,this.reassList(t,this.pageNumber,this.pageSize1)},handleSizeChange1:function(t){this.pageSize1=t;var e={};this.reassList(e,this.pageNumber,this.pageSize1)},handleCurrentChange1:function(t){this.pageNumber=t;var e={};this.reassList(e,this.pageNumber,this.pageSize1)}},mounted:function(){this.reassList()}}},FWz8:function(t,e,a){"use strict";function i(t,e,a){return g.a.post("/apiservice/a/service/order/orderInfo/listData?pageNo="+e+"&pageSize="+a,t)}function s(t){return g.a.post("/apiservice/a/service/order/orderInfo/formData",t)}function n(t){return g.a.post("/apiservice/a/service/order/orderInfo/timeData",t)}function l(t){return g.a.post("/apiservice/a/service/order/orderInfo/saveTime",t)}function r(t){return g.a.post("/apiservice/a/service/order/orderInfo/addTech",t)}function c(t){return g.a.post("/apiservice/a/service/order/orderInfo/addTechSave",t)}function o(t){return g.a.post("/apiservice/a/service/order/orderInfo/dispatchTech",t)}function d(t){return g.a.post("/apiservice/a/service/order/orderInfo/dispatchTechSave",t)}function h(t,e,a){return g.a.post("apiservice/a/service/order/orderDispatch/listData?pageNo="+e+"&pageSize="+a,t)}function p(t){return g.a.post("apiservice/a/service/order/orderDispatch/formData",t)}function u(t){return g.a.post("apiservice/a/service/order/orderDispatch/dispatchTech",t)}function f(t){return g.a.post("/apiservice/a/service/order/orderDispatch/dispatchTechSave",t)}e.a=i,e.b=s,e.d=n,e.c=l,e.e=r,e.g=c,e.f=o,e.h=d,e.k=h,e.l=p,e.i=u,e.j=f;var g=a("Vo7i")},TrOl:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"addorder-container"},[a("div",{staticClass:"filter-container bgWhite"},[a("el-input",{staticStyle:{width:"30%"},attrs:{placeholder:"请输入搜索内容"},model:{value:t.techName,callback:function(e){t.techName=e},expression:"techName"}},[a("el-select",{staticStyle:{width:"120px"},attrs:{clearable:"",placeholder:"请选择"},slot:"prepend",model:{value:t.technicianName,callback:function(e){t.technicianName=e},expression:"technicianName"}},t._l(t.technicianOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.technicianName,value:t.key}})}))],1),t._v(" "),a("button",{staticClass:"button-large btn_search",on:{click:t.localSearch}},[a("i",{staticClass:"el-icon-search"}),t._v(" 搜索")])],1),t._v(" "),a("div",{staticClass:"second-bar",staticStyle:{height:"500px"}},[a("div",{staticClass:"tableWarpaa",staticStyle:{width:"100%",background:"#fff",padding:"20px 20px"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{align:"center",label:"订单编号"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"dispatchNumberStyle",on:{click:function(a){t.lookInf(e.row.id)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t"+t._s(e.row.orderNumber)+"\n\t\t\t\t\t\t\t\t")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"serviceTime",label:"服务时间"}}),t._v(" "),a("el-table-column",{staticStyle:{padding:"0"},attrs:{align:"center",label:"头像"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.techList,function(e,i){return a("div",{key:i,staticClass:"selfTd"},[a("img",{staticClass:"head-images",attrs:{src:t.imgSrc+e.headPic+t.picWidth60,alt:""}})])})}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"姓名"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.techList,function(e,i){return a("div",{key:i,staticClass:"selfTd"},[t._v(t._s(e.techName))])})}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"性别"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.techList,function(e,i){return a("div",{key:i,staticClass:"selfTd"},["male"==e.techSex?a("span",{staticClass:"fontSize12"},[t._v("男")]):t._e(),t._v(" "),"female"==e.techSex?a("span",{staticClass:"fontSize12"},[t._v("女")]):t._e()])})}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"电话"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.techList,function(e,i){return a("div",{key:i,staticClass:"selfTd"},[t._v(t._s(e.techPhone))])})}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"岗位性质"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.techList,function(e,i){return a("div",{key:i,staticClass:"selfTd"},["part_time"==e.jobNature?a("span",{staticClass:"fontSize12"},[t._v("兼职")]):t._e(),t._v(" "),"full_time"==e.jobNature?a("span",{staticClass:"fontSize12"},[t._v("全职")]):t._e()])})}}])}),t._v(" "),a("el-table-column",{staticClass:"aa",attrs:{label:"操作",align:"center"}},[a("el-table-column",{ref:"selfcolumn",attrs:{align:"center",label:"",colspan:2},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.techList,function(i){return a("div",{key:i.name,staticClass:"selfTd"},[t.btnShow.indexOf("dispatch_insert")>=0?a("el-button",{attrs:{type:"button"},on:{click:function(a){t.gaiPai(e.row.id,i)}}},[t._v("改派")]):t._e()],1)})}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t.btnShow.indexOf("dispatch_info")>=0?a("el-button",{attrs:{type:"button"},on:{click:function(a){t.godispatchReass(e.row.id)}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t改派记录\n\t\t\t\t\t\t\t\t\t\t")]):t._e()],1)]}}])})],1)],1),t._v(" "),t.listLoading?t._e():a("div",{staticStyle:{"margin-top":"20px","padding-bottom":"0px"}},[a("el-pagination",{attrs:{"current-page":t.jumpPage,"page-sizes":[5,10,15,20],"page-size":t.pageSize1,layout:"total, sizes, prev, pager, next, jumper",total:t.pagetotal1},on:{"size-change":t.handleSizeChange1,"current-change":t.handleCurrentChange1,"update:currentPage":function(e){t.jumpPage=e}}})],1)],1)]),t._v(" "),a("el-dialog",{staticClass:"selfDialogWidth",attrs:{title:"选择技师",visible:t.dialogTableVisible,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("el-input",{staticStyle:{width:"180px","margin-left":"15px"},attrs:{placeholder:"输入要搜索的姓名"},model:{value:t.techName2,callback:function(e){t.techName2=e},expression:"techName2"}}),t._v(" "),a("button",{staticClass:"button-large FloatRight",staticStyle:{"margin-right":"15px"},on:{click:t.searchTeh}},[t._v("查询")]),t._v(" "),a("el-collapse-transition",[0!=t.middleA.length?a("div",{staticClass:"selfpromMessageTab"},t._l(t.middleA,function(e){return a("div",{key:e.techId,staticClass:"tabWrap1"},[a("div",{staticClass:"techNameStyle"},[t._v(t._s(e.techName))])])})):t._e()]),t._v(" "),a("div",{staticClass:"selfTableWrapONE"},[a("div",{staticClass:"table-d"},[a("table",{staticClass:"selfTable"},[a("tr",{staticClass:"tableHeader"},[a("td",{staticClass:"selfTableHEADTD",attrs:{align:"center",width:"73px"}},[t._v("选择")]),t._v(" "),a("td",{staticClass:"selfTableHEADTD",attrs:{align:"center",width:"158px"}},[t._v("头像")]),t._v(" "),a("td",{staticClass:"selfTableHEADTD",attrs:{align:"center",width:"182px"}},[t._v("姓名")]),t._v(" "),a("td",{staticClass:"selfTableHEADTD",attrs:{align:"center",width:"73px"}},[t._v("性别")]),t._v(" "),a("td",{staticClass:"selfTableHEADTD",attrs:{align:"center",width:"141px"}},[t._v("岗位性质")])]),t._v(" "),a("div",{staticStyle:{"padding-top":"60px"}},t._l(t.listTech,function(e){return a("tr",{key:e.techId,ref:"tableItem1",refInFor:!0,staticClass:"selfTdStyle1"},[a("td",{staticClass:"fontSize12",attrs:{width:"72px",align:"center"}},[a("el-checkbox",{on:{change:function(a){t.ChangeTech(e)}},model:{value:e.techChecked,callback:function(t){e.techChecked=t},expression:"item.techChecked"}})],1),t._v(" "),a("td",{staticClass:"height70",attrs:{width:"156px",align:"center"}},[a("img",{staticClass:"imgStyle",attrs:{src:t.imgSrc+e.headPic+t.picWidth60}})]),t._v(" "),a("td",{staticClass:"fontSize12",attrs:{width:"172px",align:"center"}},[a("div",{staticClass:"selftechNameStyle"},[t._v(t._s(e.techName))])]),t._v(" "),a("td",{staticClass:"fontSize12",attrs:{width:"72px",align:"center"}},["male"==e.techSex?a("span",{staticClass:"fontSize12"},[t._v("男")]):t._e(),t._v(" "),"female"==e.techSex?a("span",{staticClass:"fontSize12"},[t._v("女")]):t._e()]),t._v(" "),a("td",{staticClass:"fontSize12",attrs:{width:"140px",align:"center"}},["part_time"==e.jobNature?a("span",{staticClass:"fontSize12"},[t._v("兼职")]):t._e(),t._v(" "),"full_time"==e.jobNature?a("span",{staticClass:"fontSize12"},[t._v("全职")]):t._e()])])}))]),t._v(" "),0==t.listTech.length||void 0==t.listTech.length?a("div",{staticClass:"selfTabProm"},[t._v("暂无数据")]):t._e()])]),t._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},[a("button",{staticClass:"button-large",attrs:{disabled:t.techSaveFlag},on:{click:function(e){t.submitForm2()}}},[t._v("保存")]),t._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(e){t.cancelForm2()}}},[t._v("取 消")])])],1)],1)},s=[],n={render:i,staticRenderFns:s};e.a=n},VHhy:function(t,e,a){"use strict";function i(t){a("ajFW")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("DTCC"),n=a("TrOl"),l=a("VU/8"),r=i,c=l(s.a,n.a,r,"data-v-390481a8",null);e.default=c.exports},ajFW:function(t,e,a){var i=a("5r0l");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("667cd683",i,!0)}});