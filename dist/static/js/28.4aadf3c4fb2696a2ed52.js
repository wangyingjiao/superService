webpackJsonp([28],{"62vb":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"box"},[a("div",{staticClass:"filter-container bgWhite padBot20"},[a("el-select",{staticClass:"search",attrs:{clearable:"",filterable:"",placeholder:"选择机构"},model:{value:e.mechanism,callback:function(t){e.mechanism=t},expression:"mechanism"}},e._l(e.mechanismOptions,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-input",{staticClass:"search",attrs:{placeholder:"请输入搜索的技能名称"},model:{value:e.localSearch,callback:function(t){e.localSearch=t},expression:"localSearch"}}),e._v(" "),a("button",{staticClass:"search-button btn_search el-icon-search btn-color",on:{click:e.search}},[e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"app-container calendar-list-container"},[a("div",{},[a("div",{staticClass:"bgWhite bgbot70"},[-1!=e.btnShow.indexOf("skill_insert")?a("button",{staticClass:"button-small btn_pad btn-color",on:{click:function(t){e.add("add")}}},[e._v("新增")]):e._e(),e._v(" "),a("div",{staticStyle:{"padding-top":"15px"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.getListdata,"highlight-current-row":"","element-loading-text":"正在加载"}},[a("el-table-column",{attrs:{align:"center",label:"编号","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                          "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\n                        ")]}}])}),e._v(" "),"org"!=e.userType&&"station"!=e.userType?a("el-table-column",{attrs:{"min-width":"220",align:"center",prop:"orgName",label:"服务机构"}}):e._e(),e._v(" "),a("el-table-column",{attrs:{"min-width":"220",label:"技能名称",align:"center",prop:"name"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"94",label:"技师个数",align:"center",prop:"techNum"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作","min-width":"138"},scopedSlots:e._u([{key:"default",fn:function(t){return[-1!=e.btnShow.indexOf("skill_update")?a("el-button",{staticClass:"el-icon-edit ceshi3",on:{click:function(a){e.add("edit",t.row)}}}):e._e(),e._v(" "),-1!=e.btnShow.indexOf("skill_delete")?a("el-button",{staticClass:"el-icon-delete ceshi3",on:{click:function(a){e.handleDelete(t.row)}}}):e._e()]}}])})],1),e._v(" "),e.listLoading?e._e():a("div",{staticClass:"pagination-container techPag clearfix"},[a("el-pagination",{attrs:{"current-page":e.jumpPage,layout:"total, sizes, prev, pager, next, jumper","page-size":e.pageSize,"page-sizes":[5,10,15,20],total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.jumpPage=t}}})],1)],1)]),e._v(" "),a("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,"modal-append-to-body":!1,id:"diatable","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"ruleForm2",staticClass:"demo-ruleForm dia_form",attrs:{model:e.ruleForm2,rules:e.rules,"label-width":"160px","label-position":"left"}},["sys"==e.userType||"platform"==e.userType?a("el-form-item",{attrs:{label:"选择机构",prop:"orgId"}},[a("el-select",{staticClass:"kill form_item",attrs:{disabled:e.mechanismFlag,filterable:"",placeholder:"请选择机构"},on:{change:e.mechChage},model:{value:e.ruleForm2.orgId,callback:function(t){e.ruleForm2.orgId=t},expression:"ruleForm2.orgId"}},e._l(e.mechanismOptions,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"技能名称",prop:"name"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入2-15位技能名称"},model:{value:e.ruleForm2.name,callback:function(t){e.ruleForm2.name="string"==typeof t?t.trim():t},expression:"ruleForm2.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"选择分类",prop:"staffClass"}},[a("el-select",{staticClass:"kill form_item",attrs:{multiple:"",filterable:"",placeholder:"请选择分类"},model:{value:e.ruleForm2.staffClass,callback:function(t){e.ruleForm2.staffClass=t},expression:"ruleForm2.staffClass"}},e._l(e.Options2,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),"org"==e.userType||"station"==e.userType?a("el-form-item",{staticClass:"selfst3",attrs:{label:"选择技师",prop:"technicians"}},[a("div",{staticClass:"tech-order-jnsk selfst2 form_item",staticStyle:{width:"100%"}},[a("div",{staticClass:"tech-order-btnsk selfst1",on:{click:e.orderTech}},[e._v(" ✚ 请选择")])])]):e._e(),e._v(" "),"sys"==e.userType&&""!=e.mechanism1||"platform"==e.userType&&""!=e.mechanism1?a("el-form-item",{staticClass:"selfst3",attrs:{label:"选择技师",prop:"technicians"}},[a("div",{staticClass:"tech-order-jnsk selfst2 form_item",staticStyle:{width:"100%"}},[a("div",{staticClass:"tech-order-btnsk selfst1",on:{click:e.orderTech}},[e._v(" ✚ 请选择")])])]):e._e(),e._v(" "),a("el-form-item",{attrs:{label:""}},[0!=e.tabOptions.length?a("div",{staticClass:"techWrap"},e._l(e.tabOptions,function(t){return a("div",{key:t.techId,staticClass:"tabWrap"},[a("div",{staticClass:"techNameStyle"},[e._v(e._s(t.techName))]),e._v(" "),a("div",{staticClass:"closePic",on:{click:function(a){e.selfErrorClose(t)}}},[e._v("✕")])])})):e._e()])],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},[a("button",{staticClass:"button-large btn-color",attrs:{disabled:e.submitFlag},on:{click:function(t){e.submitForm("ruleForm2")}}},[e._v("保存")]),e._v(" "),a("button",{staticClass:"button-cancel btn-color-cancel",on:{click:function(t){e.resetForm("ruleForm2")}}},[e._v("取消")])])],1),e._v(" "),a("el-dialog",{staticClass:"selfDialogWidth",attrs:{title:"选择服务人员",visible:e.ordertech,modal:!1,"modal-append-to-body":!1,"close-on-click-modal":!1},on:{"update:visible":function(t){e.ordertech=t}}},[a("div",{staticClass:"selfFLOLeft width120"},[a("el-input",{staticStyle:{"margin-left":"15px",width:"180px"},attrs:{placeholder:"输入要搜索的姓名"},model:{value:e.techName,callback:function(t){e.techName=t},expression:"techName"}})],1),e._v(" "),a("div",{staticClass:"selfFLOLeft"},[a("el-select",{staticStyle:{"margin-left":"95px"},attrs:{clearable:"",placeholder:"请选择服务站",filterable:""},model:{value:e.techStationId,callback:function(t){e.techStationId=t},expression:"techStationId"}},e._l(e.options,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("div",{staticClass:"selfFLORight"},[a("button",{staticClass:"button-large",on:{click:e.searchTeh}},[e._v("查询")])]),e._v(" "),a("el-collapse-transition",[0!=e.middleA.length||0!=e.middleB.length?a("div",{staticClass:"selfpromMessageTab"},[e._l(e.middleA,function(t){return"add"==e.dialogStatus?a("div",{key:t.techId,staticClass:"tabWrap1"},[a("div",{staticClass:"techNameStyle"},[e._v(e._s(t.techName))])]):e._e()}),e._v(" "),e._l(e.middleB,function(t){return"edit"==e.dialogStatus?a("div",{key:t.techId,staticClass:"tabWrap1"},[a("div",{staticClass:"techNameStyle"},[e._v(e._s(t.techName))])]):e._e()})],2):e._e()]),e._v(" "),a("div",{staticClass:"selfFLOLeft selfOVerflow1"},[a("div",{staticClass:"table-d"},[a("table",{staticClass:"selfTable"},[a("tr",{staticClass:"tableHeader"},[a("td",{staticClass:"selfTdStyle",attrs:{align:"center",width:"73px"}},[e._v("选择")]),e._v(" "),a("td",{staticClass:"selfTdStyle",attrs:{align:"center",width:"128px"}},[e._v("头像")]),e._v(" "),a("td",{staticClass:"selfTdStyle",attrs:{align:"center",width:"150px"}},[e._v("姓名")]),e._v(" "),a("td",{staticClass:"selfTdStyle",attrs:{align:"center",width:"73px"}},[e._v("性别")]),e._v(" "),a("td",{staticClass:"selfTdStyle",attrs:{align:"center",width:"200px"}},[e._v("服务站")])]),e._v(" "),a("div",{staticClass:"skillMarginTop60"},e._l(e.listTech,function(t){return a("tr",{key:t.techId,ref:"tableItem1",refInFor:!0,staticClass:"selfTdStyle1"},[a("td",{attrs:{width:"72px",align:"center"}},[a("el-checkbox",{attrs:{disabled:"leave"==t.jobStatus},on:{change:function(a){e.testTech(t)}},model:{value:t.techChecked,callback:function(e){t.techChecked=e},expression:"item.techChecked"}})],1),e._v(" "),a("td",{attrs:{width:"127px",align:"center"}},[a("img",{staticClass:"imgStyle",attrs:{src:e.imgSrc+t.headPic+e.picWidth60}})]),e._v(" "),a("td",{attrs:{width:"152px",align:"center"}},[void 0!=t.techName?a("el-tooltip",{attrs:{placement:"left",disabled:t.techName.length<10,content:t.techName}},[a("div",{class:t.techName.length<10?"":"selftechNameStyle"},[e._v(e._s(t.techName))])]):e._e()],1),e._v(" "),a("td",{attrs:{width:"73px",align:"center"}},["male"==t.techSex?a("span",[e._v("男")]):e._e(),e._v(" "),"female"==t.techSex?a("span",[e._v("女")]):e._e()]),e._v(" "),a("td",{attrs:{width:"198px",align:"center"}},[void 0!=t.techStationName?a("el-tooltip",{attrs:{placement:"left",disabled:t.techStationName.length<10,content:t.techStationName}},[a("div",{class:t.techStationName.length<10?"":"selftechStationNameStyle"},[e._v(e._s(t.techStationName))])]):e._e()],1)])}))]),e._v(" "),0==e.listTech.length?a("div",{staticClass:"selfTabProm"},[e._v("暂无数据")]):e._e()])]),e._v(" "),a("div",{staticClass:"dialog-footer selfFooter",slot:"footer"},[a("button",{staticClass:"button-large btn-color",on:{click:function(t){e.submitForm2()}}},[e._v("保存")]),e._v(" "),a("button",{staticClass:"button-cancel btn-color-cancel",on:{click:function(t){e.resetForm2()}}},[e._v("取消")])])],1)],1)])])},s=[],n={render:i,staticRenderFns:s};t.a=n},BgUG:function(e,t,a){var i=a("V1xV");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("XkoO")("47ae8550",i,!0)},ENX7:function(e,t,a){"use strict";function i(e,t,a){return O.a.post("/apiservice/a/service/sort/serSortInfo/listData?pageNo="+t+"&pageSize="+a,e)}function s(e,t,a){return O.a.post("/apiservice/a/service/item/serItemInfo/listData?pageNo="+t+"&pageSize="+a,e)}function n(e){return O.a.post("/apiservice/a/service/sort/serSortInfo/saveData",e)}function o(e){return O.a.post("/apiservice/a/service/sort/serSortInfo/deleteSortInfo",e)}function l(e){return O.a.post("/apiservice/a/service/sort/serSortInfo/formData",e)}function r(e){return O.a.post("/apiservice/a/service/sort/serSortInfo/upData",e)}function c(e){return new N.a(function(t,a){O.a.post("apiservice/a/service/sort/serSortInfo/listDataAll",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function d(e){return new N.a(function(t,a){O.a.post("apiservice/a/service/item/serItemInfo/saveData",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function h(e){return new N.a(function(t,a){O.a.post("apiservice/a/service/item/serItemInfo/deleteData",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function p(e){return new N.a(function(t,a){O.a.post("apiservice/a/service/item/serItemInfo/formData",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function f(e){return new N.a(function(t,a){O.a.post("apiservice/a/service/item/serItemInfo/upData",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function m(){return new N.a(function(e,t){O.a.post("apiservice/a/service/item/serGasqSort/getList").then(function(t){e(t)}).catch(function(e){t(e)})})}function u(e){return new N.a(function(t,a){O.a.post("apiservice/a/service/item/serItemInfo/deleteGoodsData",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function g(e){return new N.a(function(t,a){O.a.post("apiservice/a/service/item/serItemInfo/getEshopGoods",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function v(e){return new N.a(function(t,a){O.a.post("apiservice/a/service/item/serItemInfo/getGoodsCode",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function b(e,t,a){return new N.a(function(i,s){O.a.post("apiservice/a/service/item/serItemInfo/getGoodsList?pageNo="+t+"&pageSize="+a,e).then(function(e){i(e)}).catch(function(e){s(e)})})}function x(e,t,a){return new N.a(function(i,s){O.a.post("apiservice/a/service/item/serItemInfo/getNotJonitGoods?pageNo="+t+"&pageSize="+a,e).then(function(e){i(e)}).catch(function(e){s(e)})})}function S(e){return new N.a(function(t,a){O.a.post("apiservice/a/service/item/serItemInfo/deleteGoodsCode",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function _(e){return new N.a(function(t,a){O.a.post("apiservice/a/service/item/serItemInfo/JonitGoods",e).then(function(e){t(e)}).catch(function(e){a(e)})})}function I(e,t,a){return O.a.post("/apiservice/a/service/skill/serSkillInfo/listData?pageNo="+t+"&pageSize="+a,e)}function C(e){return O.a.post("/apiservice/a/service/skill/serSkillInfo/saveData",e)}function k(e){return O.a.post("/apiservice/a/service/skill/serSkillInfo/insertData",e)}function y(e){return O.a.post("/apiservice/a/service/skill/serSkillInfo/deleteSortInfo",e)}function w(e){return O.a.post("/apiservice/a/service/skill/serSkillInfo/formData",e)}function T(e){return O.a.post("/apiservice/a/service/skill/serSkillInfo/upData",e)}t.p=i,t.k=s,t.s=n,t.r=o,t.q=l,t.t=r,t.j=c,t.o=d,t.m=h,t.l=p,t.n=f,t.g=m,t.h=u,t.i=g,t.y=v,t.u=b,t.v=x,t.w=S,t.x=_,t.e=I,t.c=C,t.a=k,t.f=y,t.b=w,t.d=T;var F=a("rVsN"),N=a.n(F),O=a("Vo7i")},V1xV:function(e,t,a){t=e.exports=a("acE3")(!1),t.push([e.i,".kill .el-select__tags .el-select .el-tag[data-v-b3cea6e0]{line-height:23px!important}.selfTabProm[data-v-b3cea6e0]{width:100%;text-align:center;height:200px;line-height:200px}.techNameStyle[data-v-b3cea6e0]{width:80px;height:25px;line-height:25px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.padBot20[data-v-b3cea6e0]{padding-bottom:20px}.width200[data-v-b3cea6e0]{width:200px}.width220[data-v-b3cea6e0]{width:220px}.width300[data-v-b3cea6e0]{width:300px}.selfMarLef10[data-v-b3cea6e0]{margin-left:10px}.selfInmpotInf[data-v-b3cea6e0]{font-size:12px;margin-top:10px;color:red}.selfFLORight[data-v-b3cea6e0]{float:right;margin-right:20px}.selfpromMessageTab[data-v-b3cea6e0]{position:relative;width:100%;margin-top:60px;margin-left:10px}.selfFLOLeft[data-v-b3cea6e0]{float:left}.width120[data-v-b3cea6e0]{width:120px}.height70[data-v-b3cea6e0]{height:70px}.selfFooter[data-v-b3cea6e0]{text-align:center}.selfTdStyle[data-v-b3cea6e0]{background:#eef1f6;height:60px;line-height:60px;border:none!important}.tableHeader[data-v-b3cea6e0]{position:absolute;z-index:99999;top:0;margin:0;margin-top:-1px}.selfTdStyle1[data-v-b3cea6e0]{vertical-align:middle;height:70px;line-height:70px}.selftechNameStyle[data-v-b3cea6e0]{width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.skillMarginTop60[data-v-b3cea6e0]{margin-top:60px}.selftechStationNameStyle[data-v-b3cea6e0]{width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.imgStyle[data-v-b3cea6e0]{border:none;display:block}.selfOVerflow[data-v-b3cea6e0]{float:left;margin-top:20px;width:100%;margin-bottom:20px;height:300px;overflow-y:scroll}.selfOVerflow1[data-v-b3cea6e0]{margin-top:20px;overflow:hidden;width:660px;height:280px;position:relative}.table-d[data-v-b3cea6e0]{width:677px;overflow-y:scroll;height:276px;margin-left:15px}.selfst1[data-v-b3cea6e0]{background:none}.selfst2[data-v-b3cea6e0]{float:left;width:500px}.selfst3[data-v-b3cea6e0]{margin-top:30px}.techPag[data-v-b3cea6e0]{float:right;margin-top:20px}.showRules[data-v-b3cea6e0]{font-size:12px;color:red;width:100%;height:30px;line-height:30px;display:inline-block}.active[data-v-b3cea6e0]{background:#ddd}.selfTable[data-v-b3cea6e0],.selfTable tr td[data-v-b3cea6e0],.selfTable tr th[data-v-b3cea6e0]{border:1px solid #eee}.selfTable[data-v-b3cea6e0]{min-height:25px;line-height:25px;text-align:center;border-collapse:collapse;padding:2px}.techWrap[data-v-b3cea6e0]{border:1px solid #ccc;border-top:none;margin-top:-23.5px;padding-top:10px}.tabWrap[data-v-b3cea6e0]{width:100px;margin:5px 20px 5px 10px}.tabWrap1[data-v-b3cea6e0],.tabWrap[data-v-b3cea6e0]{font-size:12px;display:inline-block;height:25px;text-align:center;line-height:25px;border-radius:12px;border:1px solid #bfcbd9;position:relative}.tabWrap1[data-v-b3cea6e0]{width:80px;margin-right:10px;margin-left:10px;margin-top:5px}.closePic[data-v-b3cea6e0]{cursor:pointer;color:#bfcbd9;font-size:12px;position:absolute;margin-left:80px;top:0}.closePic[data-v-b3cea6e0]:hover{color:#333}.bgWhite[data-v-b3cea6e0]{background-color:#fff;padding:20px}.bgbot70[data-v-b3cea6e0]{padding-bottom:70px}.btn_pad[data-v-b3cea6e0]{margin:0 0 20px 20px}.btn_right[data-v-b3cea6e0]{float:right}.tech-order-jnsk[data-v-b3cea6e0]{width:300px;height:36px;border:1px solid #bfcbd9;position:relative;line-height:36px}.tech-order-btnsk[data-v-b3cea6e0]{color:#4c70e8;border:none;outline:none;cursor:pointer;margin-left:10px}.skill-delte[data-v-b3cea6e0]{border:none;background:none;width:100px;height:50px;color:red;outline:none;cursor:pointer}.role-table[data-v-b3cea6e0]{list-style:none;border:1px solid #e0e0e0;border-bottom:none;padding:0;position:relative}.header[data-v-b3cea6e0]{height:40px;line-height:40px;border-bottom:1px solid #e7e7e7;background:#f8f8f9;text-align:center}.vertical-line[data-v-b3cea6e0]{width:1px;height:100%;background:#ddd;position:absolute;left:30%;top:0}.left[data-v-b3cea6e0]{width:30%;float:left;padding-left:10px;text-align:left;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.one[data-v-b3cea6e0]{padding-left:20px}.right[data-v-b3cea6e0]{width:70%;float:left;padding-left:10px}.item-icon[data-v-b3cea6e0]{margin-left:-5px;padding:5px}.line[data-v-b3cea6e0]{clear:both;width:100%;height:1px;background:#e0e0e0}.h40[data-v-b3cea6e0]{height:39px;line-height:39px}[v-cloak][data-v-b3cea6e0]{display:none}",""])},bmmP:function(e,t,a){"use strict";var i,s=a("aA9S"),n=a.n(s),o=a("ENX7"),l=a("oppB");t.a={name:"skill",data:function(){return{userType:"",mechanismFlag:!1,mechanismOptions:[],mechanism:"",mechanism1:"",Options2:[],submitFlag:!1,jumpPage:1,title:"新增技能",btnShow:[],promShow:!1,promShow1:!1,checkAll:!1,localSearch:"",tabOptions:[],techShow:!1,techName:"",techStationId:"",rules:{name:[{required:!0,validator:function(e,t,a){t&&t.length>=2&&t.length<=15?a():a(new Error("请输入2-15位技能名称"))},trigger:"blur"}],orgId:[{required:!0,message:"请选择机构",trigger:"change"}],staffClass:[{required:!0,type:"array",message:"请选择分类",trigger:"change"}]},ruleForm2:{name:"",staffClass:[],technicians:[],orgId:""},commodityse:{},options:[],checkbox:!1,getListdata:[],ordertech:!1,xingmu:"",listTech:[],checked:!1,ortech:!1,total:null,pageSize:10,pageNumber:1,listLoading:!0,dialogVisible:!1,flagserver:!1,dialogFormVisible:!1,dialogStatus:"add",id:"",promInf1:"搜索内容不存在!",middleA:[],middleB:[],middleC:[],middleD:[]}},created:function(){JSON.parse(localStorage.getItem("btn"))&&(this.btnShow=JSON.parse(localStorage.getItem("btn")))},methods:{mechChage:function(e){var t=this;if(this.mechanismFlag||(this.tabOptions=[],this.middleA=[],this.listTech=[],this.ruleForm2.technicians=[],this.Options2=[],this.ruleForm2.staffClass=[]),""!=e){this.mechanism1=e,this.getseverStion(e);var i={orgId:this.mechanism1};a.i(o.a)(i).then(function(e){1===e.data.code?(t.mechanismFlag||(t.Options2=e.data.data.list),t.listTech=e.data.data.techs):t.dialogVisible=!1}).catch(function(e){})}},getoffice:function(){var e=this;a.i(l.b)({}).then(function(t){void 0!=t.data.data.list&&("0"==t.data.data.list[0].id&&t.data.data.list.remove(t.data.data.list[0]),t.data.data.list.length>=2&&"0"==t.data.data.list[1].id&&(t.data.data.list.remove(t.data.data.list[1]),t.data.data.list.remove(t.data.data.list[0])),e.mechanismOptions=t.data.data.list,"org"!=e.userType&&"station"!=e.userType||(e.mechanism=e.mechanismOptions[0].id))})},loadingClick:function(){i=this.$loading({lock:!0,spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)",target:document.querySelector(".el-dialog__body")})},search:function(){var e={name:this.localSearch,orgId:this.mechanism};this.pageNumber=1,this.jumpPage=1,this.getList(e,this.pageNumber,this.pageSize)},testTech:function(e){if("add"==this.dialogStatus)if(e.techChecked)this.middleA.push(e);else for(var t=0;t<this.middleA.length;t++)this.middleA[t].techId==e.techId&&this.middleA.remove(this.middleA[t]);if("edit"==this.dialogStatus&&(1==e.techChecked&&this.middleB.push(e),0==e.techChecked))for(var a=0;a<this.middleB.length;a++)this.middleB[a].techId==e.techId&&this.middleB.remove(this.middleB[a])},getseverStion:function(e){var t=this;if(""!=e)var i={orgId:e};else var i={};a.i(l.c)(i).then(function(e){1===e.data.code&&e.data.data&&(0==e.data.data[0].id&&e.data.data.remove(e.data.data[0]),t.options=e.data.data)})},add:function(e,t){var i=this;if(this.mechanism1="",this.middleA=[],this.middleB=[],this.middleD=[],this.ruleForm2.orgId="",this.listLoading=!0,this.dialogStatus=e,this.tabOptions=[],"add"==this.dialogStatus){if(this.title="新增技能",this.Options2=[],this.mechanismFlag=!1,this.id="",this.listLoading=!1,this.dialogVisible=!0,"org"==this.userType||"station"==this.userType){this.getseverStion("");var s={};a.i(o.a)(s).then(function(e){1===e.data.code?(i.Options2=e.data.data.list,i.listTech=e.data.data.techs,i.dialogVisible=!0,i.listLoading=!1):(i.listLoading=!1,i.dialogVisible=!1)}).catch(function(e){i.listLoading=!1})}}else if("edit"==this.dialogStatus){this.title="编辑技能",this.mechanismFlag=!0,this.id=t.id;var n={id:this.id};a.i(o.b)(n).then(function(e){1===e.data.code?(i.listTech=e.data.data.techs,i.Options2=e.data.data.list,i.listLoading=!1,i.dialogVisible=!0,i.ruleForm2.name=e.data.data.info.name,i.ruleForm2.orgId=e.data.data.info.orgId,i.mechanism1=e.data.data.info.orgId,void 0!=e.data.data.info.sortIds&&(i.ruleForm2.staffClass=e.data.data.info.sortIds),void 0!=e.data.data.info.technicians&&(i.tabOptions=e.data.data.info.technicians,i.selectionreturn1())):(i.listLoading=!1,i.dialogVisible=!1)}).catch(function(e){i.listLoading=!1})}},selectionreturn1:function(){if(void 0!=this.tabOptions.length)for(var e=0;e<this.listTech.length;e++)for(var t=0;t<this.tabOptions.length;t++)this.tabOptions[t].techId==this.listTech[e].techId&&(this.listTech[e].techChecked=!0,this.middleB.push(this.listTech[e]))},submitForm:function(e){var t=this;this.ruleForm2.technicians=this.tabOptions,this.$refs[e].validate(function(s){if(!s){for(var n=t.$refs[e]._data.fields,l=[],r=0;r<n.length;r++)""!=n[r].validateMessage&&l.push(n[r].validateMessage);return t.$message({type:"error",message:l[0]}),!1}t.loadingClick(),t.saveFlag=!0;var c={id:t.id,name:t.ruleForm2.name,technicians:t.ruleForm2.technicians,sortIds:t.ruleForm2.staffClass,orgId:t.ruleForm2.orgId};"add"==t.dialogStatus&&a.i(o.c)(c).then(function(e){if(1===e.data.code){t.$message({type:"success",message:"新增成功!"}),i.close(),t.saveFlag=!1,t.$refs.ruleForm2.resetFields(),t.ruleForm2.name="",t.ruleForm2.staffClass=[],t.middleA=[],t.middleB=[],t.middleD=[],t.localSearch="",t.mechanism="";var a={};t.dialogVisible=!1,t.listLoading=!1,t.pageNumber=1,t.jumpPage=1,t.getList(a,t.pageNumber,t.pageSize)}else i.close(),t.middleB=[],t.middleD=[]}).catch(function(e){i.close(),t.listLoading=!1,t.saveFlag=!1}),"edit"==t.dialogStatus&&a.i(o.d)(c).then(function(e){if(t.saveFlag=!1,1===e.data.code){t.$message({type:"success",message:"编辑成功!"}),i.close(),t.$refs.ruleForm2.resetFields(),t.ruleForm2.name="",t.ruleForm2.staffClass=[],t.middleA=[],t.middleB=[],t.middleD=[],t.dialogVisible=!1;var a={name:t.localSearch,orgId:t.mechanism};t.listLoading=!1,t.getList(a,t.pageNumber,t.pageSize)}else i.close()}).catch(function(e){i.close(),t.listLoading=!1,t.dialogVisible=!1})})},resetForm:function(e){"add"==this.dialogStatus&&(this.$refs[e].resetFields(),this.ruleForm2.name="",this.Options2=[],this.ruleForm2.staffClass=[]),"edit"==this.dialogStatus&&(this.$refs[e].resetFields(),this.ruleForm2.name="",this.ruleForm2.staffClass=[]),this.dialogVisible=!1},selfErrorClose:function(e){if(void 0!=this.tabOptions&&0!=this.tabOptions.length){for(var t=0;t<this.listTech.length;t++)e.techId==this.listTech[t].techId&&(this.listTech[t].techChecked=!1);if("add"==this.dialogStatus)for(var a=0;a<this.middleA.length;a++)e.techId==this.middleA[a].techId&&this.middleA.remove(this.middleA[a]);if("edit"==this.dialogStatus)for(var i=0;i<this.middleB.length;i++)e.techId==this.middleB[i].techId&&this.middleB.remove(this.middleB[i]);this.tabOptions.remove(e)}},submitForm2:function(){if(this.techName="",this.techStationId="","add"==this.dialogStatus){var e=[];if(void 0!=this.middleA&&0!=this.middleA.length)for(var t=0;t<this.middleA.length;t++)1==this.middleA[t].techChecked&&e.push(this.middleA[t]);this.tabOptions=n()([],e)}if("edit"==this.dialogStatus){var a=[];if(void 0!=this.middleB&&0!=this.middleB.length)for(var i=0;i<this.middleB.length;i++)1==this.middleB[i].techChecked&&a.push(this.middleB[i]);this.tabOptions=a}this.ordertech=!1},resetForm2:function(){if(this.techName="",this.techStationId="","add"==this.dialogStatus&&(this.middleA=n()([],this.tabOptions)),"edit"==this.dialogStatus){this.middleB=this.middleC;var e=[];if(void 0!=this.middleC&&0!=this.middleC.length)for(var t=0;t<this.middleC.length;t++)1==this.middleC[t].techChecked&&e.push(this.middleC[t]);this.tabOptions=e}for(var a=0;a<this.listTech.length;a++)this.listTech[a].techChecked=!1;this.ordertech=!1},getList:function(e,t,i){var s=this;this.listLoading=!0;var n=e;a.i(o.e)(n,t,i).then(function(e){if(1===e.data.code&&(s.total=e.data.data.count,s.getListdata=e.data.data.list,s.pageNumber=e.data.data.pageNo,s.jumpPage=e.data.data.pageNo,s.pageSize=e.data.data.pageSize,void 0!=e.data.data.list))for(var t=0;t<s.getListdata.length;t++)s.getListdata[t].index=t+1;s.listLoading=!1}).catch(function(e){s.listLoading=!1})},handleSizeChange:function(e){this.pageNumber=1,this.jumpPage=1,this.pageSize=e;var t={name:this.localSearch,orgId:this.mechanism};this.getList(t,this.pageNumber,this.pageSize)},handleCurrentChange:function(e){this.pageNumber=e;var t={name:this.localSearch,orgId:this.mechanism};this.getList(t,this.pageNumber,this.pageSize)},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1}).then(function(){var i={id:e.id};a.i(o.f)(i).then(function(e){if(1===e.data.code){t.$message({type:"success",message:"删除成功!"});var a={name:t.localSearch,orgId:t.mechanism};t.getList(a,t.pageNumber,t.pageSize)}}).catch(function(){})}).catch(function(){t.$message({type:"warning",message:"已取消删除"})})},orderTech:function(){var e=this;if("org"==this.userType||"station"==this.userType){this.getseverStion("");var t={techName:"",techStationId:""}}else{var t={techName:"",techStationId:"",orgId:this.mechanism1};this.getseverStion(this.mechanism1)}if(a.i(o.a)(t).then(function(t){if(1===t.data.code){if(e.listTech=t.data.data.techs,e.ordertech=!0,"add"==e.dialogStatus)for(var a=0;a<e.middleA.length;a++)for(var i=0;i<e.listTech.length;i++)e.listTech[i].techId==e.middleA[a].techId&&(e.listTech[i].techChecked=!0);if("edit"==e.dialogStatus)for(var a=0;a<e.middleB.length;a++)for(var i=0;i<e.listTech.length;i++)e.listTech[i].techId==e.middleB[a].techId&&(e.listTech[i].techChecked=!0)}}).catch(function(e){}),"edit"==this.dialogStatus){this.middleC=n()([],this.middleB);for(var i=0;i<this.middleB.length;i++)for(var s=0;s<this.listTech.length;s++)this.listTech[s].techId==this.middleB[i].techId&&(this.listTech[s].techChecked=!0)}if("add"==this.dialogStatus)for(var l=0;l<this.middleA.length;l++)for(var r=0;r<this.listTech.length;r++)this.listTech[r].techId==this.middleA[l].techId&&(this.listTech[r].techChecked=!0)},searchTeh:function(){var e=this,t={techName:this.techName,techStationId:this.techStationId,orgId:this.mechanism1};a.i(o.a)(t).then(function(t){if(1===t.data.code){if(e.listTech=t.data.data.techs,"add"==e.dialogStatus)for(var a=0;a<e.middleA.length;a++)for(var i=0;i<e.listTech.length;i++)e.listTech[i].techId==e.middleA[a].techId&&(e.listTech[i].techChecked=!0);if("edit"==e.dialogStatus)for(var a=0;a<e.middleB.length;a++)for(var i=0;i<e.listTech.length;i++)e.listTech[i].techId==e.middleB[a].techId&&(e.listTech[i].techChecked=!0)}}).catch(function(e){})}},mounted:function(){this.getList({},1,10),this.getoffice(),this.userType=localStorage.getItem("type")}}},mW4B:function(e,t,a){"use strict";function i(e){a("BgUG")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("bmmP"),n=a("62vb"),o=a("J0+h"),l=i,r=o(s.a,n.a,l,"data-v-b3cea6e0",null);t.default=r.exports},oppB:function(e,t,a){"use strict";function i(e){return _.a.post("/apiservice/a/sys/user/saveData",e)}function s(e){return _.a.post("/apiservice/a/sys/user/upData",e)}function n(e){return _.a.post("/apiservice/a/sys/user/formData",e)}function o(e,t,a){return _.a.post("/apiservice/a/sys/role/listPageData?pageNo="+t+"&pageSize="+a,e)}function l(e){return _.a.post("/apiservice/a/sys/role/listDataWithoutPermission",e)}function r(e,t,a){return _.a.post("/apiservice/a/sys/user/listData?pageNo="+t+"&pageSize="+a,e)}function c(e){return _.a.post("/apiservice/a/sys/role/saveData",e)}function d(e){return _.a.post("/apiservice/a/sys/role/upData",e)}function h(e){return _.a.post("/apiservice/a/sys/role/deleteRole",e)}function p(e){return _.a.get("/apiservice/a/sys/role/getRoleDetail?id="+e)}function f(e){return _.a.post("/apiservice/a/sys/organization/getOrgByTypeOrgId",e)}function m(e){return _.a.post("/apiservice/a/service/station/serviceStation/listStationByOrgId",e)}function u(e){return _.a.post("/apiservice/a/sys/organization/listDataAll",e)}function g(e){return _.a.post("/apiservice/a/service/station/serviceStation/listByOffice",e)}function v(){return _.a.get("/apiservice/a/sys/menu/getMenuList")}function b(e){return _.a.post("/apiservice/a/sys/user/deleteUser",e)}function x(e){return _.a.get("/apiservice/a/sys/role/chkName?id="+e.id+"&name="+e.name)}function S(e){return _.a.get("/apiservice/a/sys/role/chkNameUpdate?id="+e.id+"&name="+e.name+"&roleId="+e.roleId)}t.k=i,t.m=s,t.g=n,t.o=o,t.j=l,t.e=r,t.l=c,t.r=d,t.q=h,t.p=p,t.f=f,t.i=m,t.b=u,t.c=g,t.a=v,t.h=b,t.d=x,t.n=S;var _=a("Vo7i")}});