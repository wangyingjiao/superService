webpackJsonp([15],{"4GzL":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"box"},[a("div",{staticClass:"filter-container bgWhite padBot20"},[a("el-input",{staticClass:"search",attrs:{placeholder:"请输入搜索的技能名称"},model:{value:e.localSearch,callback:function(t){e.localSearch=t},expression:"localSearch"}}),e._v(" "),a("button",{staticClass:"search-button btn_search el-icon-search",on:{click:e.search}},[e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"app-container calendar-list-container"},[a("div",{},[a("div",{staticClass:"bgWhite bgbot70"},[-1!=e.btnShow.indexOf("skill_insert")?a("button",{staticClass:"button-small btn_pad",on:{click:function(t){e.add("add")}}},[e._v("新增")]):e._e(),e._v(" "),a("div",{staticStyle:{"padding-top":"15px"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.getListdata,"highlight-current-row":"","element-loading-text":"正在加载"}},[a("el-table-column",{attrs:{align:"center",label:"编号",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                          "+e._s(t.row.index+(e.pageNumber-1)*e.pageSize)+"\n                        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"技能名称",align:"center",prop:"name"}}),e._v(" "),a("el-table-column",{attrs:{label:"技师个数",align:"center",prop:"techNum"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作","min-width":"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[-1!=e.btnShow.indexOf("skill_update")?a("el-button",{staticClass:"el-icon-edit",on:{click:function(a){e.add("edit",t.row)}}}):e._e(),e._v(" "),-1!=e.btnShow.indexOf("skill_delete")?a("el-button",{staticClass:"el-icon-delete",on:{click:function(a){e.handleDelete(t.row)}}}):e._e()]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container techPag"},[a("el-pagination",{attrs:{"current-page":e.jumpPage,layout:"total, sizes, prev, pager, next, jumper","page-size":e.pageSize,"page-sizes":[5,10,15,20],total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.jumpPage=t}}})],1)],1)]),e._v(" "),a("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,"modal-append-to-body":!1,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"ruleForm2",staticClass:"demo-ruleForm dia_form",attrs:{model:e.ruleForm2,rules:e.rules,"label-width":"160px","label-position":"left"}},[a("el-form-item",{attrs:{label:"技能名称",prop:"name"}},[a("el-input",{staticClass:"form_item",attrs:{placeholder:"请输入2-15位技能名称"},model:{value:e.ruleForm2.name,callback:function(t){e.ruleForm2.name="string"==typeof t?t.trim():t},expression:"ruleForm2.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"选择分类",prop:"staffClass"}},[a("el-select",{ref:"sevolce",staticClass:"selfTabs form_item",attrs:{multiple:"",filterable:"",placeholder:"请选择分类"},on:{change:e.testChange},model:{value:e.ruleForm2.staffClass,callback:function(t){e.ruleForm2.staffClass=t},expression:"ruleForm2.staffClass"}},e._l(e.Options2,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id,disabled:e.flag}})}))],1),e._v(" "),a("el-form-item",{staticClass:"selfst3",attrs:{label:"选择技师",prop:"technicians"}},[a("div",{staticClass:"tech-order-jnsk selfst2 form_item",staticStyle:{width:"100%"}},[a("div",{staticClass:"tech-order-btnsk selfst1",on:{click:e.orderTech}},[e._v(" ✚ 请选择")])])]),e._v(" "),a("el-form-item",{attrs:{label:""}},[0!=e.tabOptions.length?a("div",{staticClass:"techWrap"},e._l(e.tabOptions,function(t){return a("div",{key:t.techId,staticClass:"tabWrap"},[a("div",{staticClass:"techNameStyle"},[e._v(e._s(t.techName))]),e._v(" "),a("div",{staticClass:"closePic",on:{click:function(a){e.selfErrorClose(t)}}},[e._v("✕")])])})):e._e()])],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},[a("button",{staticClass:"button-large",attrs:{disabled:e.submitFlag},on:{click:function(t){e.submitForm("ruleForm2")}}},[e._v("保存")]),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm("ruleForm2")}}},[e._v("取消")])])],1),e._v(" "),a("el-dialog",{attrs:{title:"选择服务人员",visible:e.ordertech,modal:!1,"modal-append-to-body":!1,"close-on-click-modal":!1},on:{"update:visible":function(t){e.ordertech=t}}},[a("div",{staticClass:"selfFLOLeft width120"},[a("el-input",{staticClass:"width120",attrs:{placeholder:"输入要搜索的姓名"},model:{value:e.techName,callback:function(t){e.techName=t},expression:"techName"}})],1),e._v(" "),a("div",{staticClass:"selfFLOLeft selfMarLef10"},[a("el-select",{attrs:{clearable:"",placeholder:"请选择服务站"},model:{value:e.techStationId,callback:function(t){e.techStationId=t},expression:"techStationId"}},e._l(e.options,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.promShow1,expression:"promShow1"}],staticClass:"selfInmpotInf"},[e._v(e._s(e.promInf1))])],1),e._v(" "),a("div",{staticClass:"selfFLORight"},[a("button",{staticClass:"button-large",on:{click:e.searchTeh}},[e._v("查询")])]),e._v(" "),a("div",{staticClass:"selfFLOLeft selfOVerflow1"},[a("div",{staticClass:"table-d"},[a("table",{staticClass:"selfTable",attrs:{width:"100%"}},[a("tr",[a("td",{staticClass:"selfTdStyle",attrs:{align:"center",width:"8%"}},[e._v("选择")]),e._v(" "),a("td",{staticClass:"selfTdStyle",attrs:{align:"center",width:"18%"}},[e._v("头像")]),e._v(" "),a("td",{staticClass:"selfTdStyle",attrs:{align:"center",width:"32%"}},[e._v("姓名")]),e._v(" "),a("td",{staticClass:"selfTdStyle",attrs:{align:"center",width:"10%"}},[e._v("性别")]),e._v(" "),a("td",{staticClass:"selfTdStyle",attrs:{align:"center",width:"32%"}},[e._v("服务站")])]),e._v(" "),e._l(e.listTech,function(t){return a("tr",{key:t.techId,ref:"tableItem1",refInFor:!0},[a("td",{attrs:{align:"center"}},[a("el-checkbox",{on:{change:function(a){e.testTech(t)}},model:{value:t.techChecked,callback:function(e){t.techChecked=e},expression:"item.techChecked"}})],1),e._v(" "),a("td",{staticClass:"height70",attrs:{align:"center"}},[a("img",{staticClass:"imgStyle",attrs:{src:t.headPic+"?x-oss-process=image/resize,m_fill,h_60,w_60"}})]),e._v(" "),a("td",{attrs:{align:"center"}},[e._v(e._s(t.techName))]),e._v(" "),a("td",{attrs:{align:"center"}},["male"==t.techSex?a("span",[e._v("男")]):e._e(),e._v(" "),"female"==t.techSex?a("span",[e._v("女")]):e._e()]),e._v(" "),a("td",{attrs:{align:"center"}},[e._v(e._s(t.techStationName))])])})],2)])]),e._v(" "),a("div",{staticClass:"dialog-footer selfFooter",slot:"footer"},[a("button",{staticClass:"button-large",on:{click:function(t){e.submitForm2()}}},[e._v("保存")]),e._v(" "),"edit"==e.dialogStatus?a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm2()}}},[e._v("取消")]):e._e(),e._v(" "),"add"==e.dialogStatus?a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm2()}}},[e._v("关闭")]):e._e()])])],1)])])},s=[],l={render:i,staticRenderFns:s};t.a=l},RwLW:function(e,t,a){"use strict";function i(e,t,a){return h.post("/apiservice/a/service/skill/serSkillInfo/listData?pageNo="+t+"&pageSize="+a,e)}function s(e){return h.post("/apiservice/a/service/skill/serSkillInfo/saveData",e)}function l(e){return h.post("/apiservice/a/service/skill/serSkillInfo/insertData",e)}function n(e){return h.post("/apiservice/a/service/skill/serSkillInfo/deleteSortInfo",e)}function o(e){return h.post("/apiservice/a/service/skill/serSkillInfo/formData",e)}function c(e){return h.post("/apiservice/a/service/skill/serSkillInfo/upData",e)}t.e=i,t.c=s,t.a=l,t.f=n,t.b=o,t.d=c;var r=a("mtWM"),d=a.n(r),h=d.a.create({headers:{"content-type":"application/json;charset=UTF-8"}})},czMV:function(e,t,a){"use strict";var i=a("woOf"),s=a.n(i),l=a("RwLW");t.a={name:"",data:function(){var e=function(e,t,a){t&&t.length>=2&&t.length<=15?a():a(new Error("请输入2-15位技能名称"))};return{Options2:[],submitFlag:!1,jumpPage:1,title:"新增技能",btnShow:this.$store.state.user.buttonshow,promShow:!1,promShow1:!1,checkAll:!1,localSearch:"",tabOptions:[],techShow:!1,techName:"",techStationId:"",rules:{name:[{required:!0,validator:e,trigger:"blur"}],staffClass:[{required:!0,type:"array",message:"请选择分类",trigger:"change"}]},ruleForm2:{name:"",staffClass:[],technicians:[]},commodityse:{},options:[],checkbox:!1,getListdata:[],ordertech:!1,xingmu:"",listTech:[],checked:!1,ortech:!1,total:null,pageSize:10,pageNumber:1,listLoading:!1,dialogVisible:!1,flagserver:!1,dialogFormVisible:!1,dialogStatus:"add",id:"",promInf1:"搜索内容不存在!",middleA:[],middleB:[]}},methods:{testChange:function(e){this.$refs.sevolce.$refs.tags.style.lineHeight="30px"},search:function(){var e={name:this.localSearch};this.pageNumber=1,this.jumpPage=1,this.getList(e,this.pageNumber,this.pageSize)},testTech:function(e){e.techChecked?this.middleA.push(e):this.middleA.remove(e)},add:function(e,t){var i=this,n={};if(this.middleA=[],this.middleB=[],this.techName="",this.techStationId="",this.listLoading=!0,a.i(l.a)(n).then(function(e){1===e.data.code&&(i.Options2=e.data.data.list,i.options=e.data.data.stations,i.listTech=e.data.data.techs,i.dialogVisible=!0),i.listLoading=!1}).catch(function(e){}),this.dialogStatus=e,this.tabOptions=[],"add"==this.dialogStatus)this.title="新增技能",this.id="";else if("edit"==this.dialogStatus){this.title="编辑技能",this.id=t.id;var n={id:this.id};a.i(l.b)(n).then(function(e){if(1===e.data.code){if(i.ruleForm2.name=e.data.data.info.name,void 0!=e.data.data.info.sortIds){var t=e.data.data.info.sortIds;i.selectionreturn(t)}void 0!=e.data.data.info.technicians&&(i.tabOptions=e.data.data.info.technicians,i.middleB=s()([],e.data.data.info.technicians),i.selectionreturn1())}}).catch(function(e){})}},selectionreturn:function(e){this.ruleForm2.staffClass=e},selectionreturn1:function(){if(void 0!=this.tabOptions.length)for(var e=0;e<this.listTech.length;e++)for(var t=0;t<this.tabOptions.length;t++)this.tabOptions[t].techId==this.listTech[e].techId&&(this.listTech[e].techChecked=!0,this.testTech(this.listTech[e]))},submitForm:function(e){var t=this;this.ruleForm2.technicians=this.tabOptions,this.$refs[e].validate(function(e){if(!e)return!1;var i={id:t.id,name:t.ruleForm2.name,technicians:t.ruleForm2.technicians,sortIds:t.ruleForm2.staffClass};"add"==t.dialogStatus&&a.i(l.c)(i).then(function(e){if(1===e.data.code){t.$message({type:"success",message:"新增成功!"}),t.$refs.ruleForm2.resetFields(),t.middleA=[],t.middleB=[],t.dialogVisible=!1,t.localSearch="";var a={};t.listLoading=!1,t.pageNumber=1,t.jumpPage=1,t.getList(a,t.pageNumber,t.pageSize)}else t.$message({type:"warning",message:e.data.data})}).catch(function(e){t.listLoading=!1}),"edit"==t.dialogStatus&&a.i(l.d)(i).then(function(e){if(1===e.data.code){t.$message({type:"success",message:"编辑成功!"}),t.$refs.ruleForm2.resetFields(),t.middleA=[],t.middleB=[],t.dialogVisible=!1;var a={};t.listLoading=!1,t.getList(a,t.pageNumber,t.pageSize)}else t.$message({type:"warning",message:e.data.data})}).catch(function(e){t.listLoading=!1})})},resetForm:function(e){"add"==this.dialogStatus&&(this.ruleForm2.name="",this.$refs[e].resetFields()),"edit"==this.dialogStatus&&(this.ruleForm2.name="",this.$refs[e].resetFields()),this.dialogVisible=!1},selfErrorClose:function(e){if(void 0!=this.tabOptions&&0!=this.tabOptions.length){for(var t=0;t<this.listTech.length;t++)e.techId==this.listTech[t].techId&&(this.listTech[t].techChecked=!1);for(var a=0;a<this.middleA.length;a++)e.techId==this.middleA[a].techId&&this.middleA.remove(this.middleA[a]);for(var i=0;i<this.middleB.length;i++)e.techId==this.middleB[i].techId&&this.middleB.remove(this.middleB[i]);this.tabOptions.remove(e)}else console.log(this.middleA)},submitForm2:function(){var e=[];if(void 0!=this.middleA&&0!=this.middleA.length)for(var t=0;t<this.middleA.length;t++)1==this.middleA[t].techChecked&&e.push(this.middleA[t]);this.tabOptions=e,this.ordertech=!1},resetForm2:function(){this.ordertech=!1},getList:function(e,t,i){var s=this;this.listLoading=!0;var n=e;a.i(l.e)(n,t,i).then(function(e){if(1===e.data.code){if(s.getListdata=e.data.data.list,void 0!=e.data.data.list)for(var t=0;t<s.getListdata.length;t++)s.getListdata[t].index=t+1;s.total=e.data.data.count}s.listLoading=!1}).catch(function(e){s.listLoading=!1})},handleSizeChange:function(e){this.pageSize=e;var t={name:this.localSearch};this.getList(t,this.pageNumber,this.pageSize)},handleCurrentChange:function(e){this.pageNumber=e;var t={};this.getList(t,this.pageNumber,this.pageSize)},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var i={id:e.id};a.i(l.f)(i).then(function(e){if(1===e.data.code){t.$message({type:"success",message:"删除成功!"});var a={};t.getList(a,t.pageNumber,t.pageSize)}else t.$message({type:"warning",message:e.data.data})}).catch(function(){return console.log("未知错误")})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},orderTech:function(){if(this.ordertech=!0,"edit"==this.dialogStatus){for(var e=0;e<this.listTech.length;e++)this.listTech[e].techChecked=!1;if(0!=this.middleB.length)for(var t=0;t<this.middleB.length;t++)for(var a=0;a<this.listTech.length;a++)this.listTech[a].techId==this.middleB[t].techId&&(this.listTech[a].techChecked=!0);else for(var i=0;i<this.middleA.length;i++)for(var s=0;s<this.listTech.length;s++)this.listTech[s].techId==this.middleA[i].techId&&(this.listTech[s].techChecked=!0)}},searchTeh:function(){var e=this,t={techName:this.techName,techStationId:this.techStationId};a.i(l.a)(t).then(function(t){if(1===t.data.code){e.listTech=t.data.data.techs;for(var a=0;a<e.middleA.length;a++)for(var i=0;i<e.listTech.length;i++)e.listTech[i].techId==e.middleA[a].techId&&(e.listTech[i].techChecked=!0)}}).catch(function(e){})}},mounted:function(){this.getList()}}},dnU6:function(e,t,a){var i=a("h9Qf");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("b6f1f2f0",i,!0)},h9Qf:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".techNameStyle[data-v-b3cea6e0]{width:80px;height:25px;line-height:25px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.padBot20[data-v-b3cea6e0]{padding-bottom:20px}.width200[data-v-b3cea6e0]{width:200px}.width220[data-v-b3cea6e0]{width:220px}.width300[data-v-b3cea6e0]{width:300px}.selfMarLef10[data-v-b3cea6e0]{margin-left:10px}.selfInmpotInf[data-v-b3cea6e0]{font-size:12px;margin-top:10px;color:red}.selfFLORight[data-v-b3cea6e0]{float:right}.selfFLOLeft[data-v-b3cea6e0]{float:left}.width120[data-v-b3cea6e0]{width:120px}.height70[data-v-b3cea6e0]{height:70px}.selfFooter[data-v-b3cea6e0]{text-align:center;margin-top:30px}.selfTdStyle[data-v-b3cea6e0]{background:#eef1f6;height:60px}.imgStyle[data-v-b3cea6e0]{display:block}.selfOVerflow[data-v-b3cea6e0]{float:left}.selfOVerflow1[data-v-b3cea6e0],.selfOVerflow[data-v-b3cea6e0]{margin-top:20px;width:100%;margin-bottom:20px;height:300px;overflow-y:scroll}.selfBottonSt[data-v-b3cea6e0]{float:left;width:500px}.selfTableSt[data-v-b3cea6e0]{width:500px;margin:0;float:left}.selfst1[data-v-b3cea6e0]{background:none}.selfst2[data-v-b3cea6e0]{float:left;width:500px}.selfst3[data-v-b3cea6e0]{margin-top:30px}.techPag[data-v-b3cea6e0]{float:right;margin-top:20px}.showRules[data-v-b3cea6e0]{font-size:12px;color:red;width:100%;height:30px;line-height:30px;display:inline-block}.active[data-v-b3cea6e0]{background:#ddd}.selfTable[data-v-b3cea6e0],.selfTable tr td[data-v-b3cea6e0],.selfTable tr th[data-v-b3cea6e0]{border:1px solid #eee}.selfTable[data-v-b3cea6e0]{min-height:25px;line-height:25px;text-align:center;border-collapse:collapse;padding:2px}.techWrap[data-v-b3cea6e0]{border:1px solid #ccc;border-top:none;margin-top:-23.5px;padding-top:10px}.tabWrap[data-v-b3cea6e0]{width:100px;margin-right:20px;margin-left:10px;font-size:12px;display:inline-block;height:25px;text-align:center;line-height:25px;border-radius:12px;border:1px solid #bfcbd9;position:relative}.closePic[data-v-b3cea6e0]{cursor:pointer;color:#bfcbd9;font-size:12px;position:absolute;margin-left:80px;top:0}.closePic[data-v-b3cea6e0]:hover{color:#333}.bgWhite[data-v-b3cea6e0]{background-color:#fff;padding:20px}.bgbot70[data-v-b3cea6e0]{padding-bottom:70px}.btn_pad[data-v-b3cea6e0]{margin:0 0 20px 20px}.btn_right[data-v-b3cea6e0]{float:right}.tech-order-jnsk[data-v-b3cea6e0]{width:300px;height:36px;border:1px solid #bfcbd9;position:relative;line-height:36px}.tech-order-btnsk[data-v-b3cea6e0]{color:#4c70e8;border:none;outline:none;cursor:pointer;margin-left:10px}.skill-delte[data-v-b3cea6e0]{border:none;background:none;width:100px;height:50px;color:red;outline:none;cursor:pointer}.role-table[data-v-b3cea6e0]{list-style:none;border:1px solid #e0e0e0;border-bottom:none;padding:0;position:relative}.header[data-v-b3cea6e0]{height:40px;line-height:40px;border-bottom:1px solid #e7e7e7;background:#f8f8f9;text-align:center}.vertical-line[data-v-b3cea6e0]{width:1px;height:100%;background:#ddd;position:absolute;left:30%;top:0}.left[data-v-b3cea6e0]{width:30%;float:left;padding-left:10px;text-align:left;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.one[data-v-b3cea6e0]{padding-left:20px}.right[data-v-b3cea6e0]{width:70%;float:left;padding-left:10px}.item-icon[data-v-b3cea6e0]{margin-left:-5px;padding:5px}.line[data-v-b3cea6e0]{clear:both;width:100%;height:1px;background:#e0e0e0}.h40[data-v-b3cea6e0]{height:39px;line-height:39px}[v-cloak][data-v-b3cea6e0]{display:none}",""])},mW4B:function(e,t,a){"use strict";function i(e){a("dnU6")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("czMV"),l=a("4GzL"),n=a("VU/8"),o=i,c=n(s.a,l.a,o,"data-v-b3cea6e0",null);t.default=c.exports}});