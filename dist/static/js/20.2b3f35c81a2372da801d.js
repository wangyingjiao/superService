webpackJsonp([20],{JG8R:function(e,t,a){"use strict";var r,i=a("mMlH");a("WLEV");t.a={name:"customermanage",data:function(){var e=function(e,t,a){if(!t)return a(new Error("请输入11位手机号码"));/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(t)?a():a(new Error("请输入11位手机号码"))},t=function(e,t,a){t?/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(t)?t.length>=5&&t.length<=50?a():a(new Error("请输入5-50位邮箱地址")):a(new Error("请输入正确的邮箱")):a()},r=function(e,t,a){t&&t.length>=2&&t.length<=15?a():a(new Error("请输入2-15位客户姓名"))},i=function(e,t,a){t&&t.length>=1&&t.length<=100?a():a(new Error("请输入1-100位详细地址"))};return{titlevar:"新增客户",submitFlag:!1,jumpPage:1,btnShow:JSON.parse(localStorage.getItem("btn")),testvalue:"",areaOptions:this.$store.state.user.area,listLoading:!1,ruleForm:{name:"",phone:"",address:"",email:"",sex:"",provinceCode:"",cityCode:"",areaCode:"",areaCodes:[],addrLongitude:"",addrLatitude:""},rules:{name:[{required:!0,validator:r,trigger:"blur"}],phone:[{required:!0,validator:e,trigger:"blur"}],address:[{required:!0,validator:i,trigger:"blur"}],email:[{required:!1,validator:t,trigger:"blur"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}],areaCodes:[{type:"array",required:!0,message:"请选择区域",trigger:"change"}]},dict:a("fIj0"),sex:"",sexName:"",tableData:[],organizationOptions:[],dialogTableVisible:!1,customName:"",customPhone:"",pagetotal1:0,pageSize1:10,pageNumber:1,mymap:{},testFlag:void 0}},methods:{loadingClick:function(){r=this.$loading({lock:!0,spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)",target:document.querySelector(".el-dialog__body")})},submitForm:function(e,t){var o=this,s=this;this.submitFlag=!0,setTimeout(function(){s.submitFlag=!1},1e3),this.$refs[e].validate(function(s){if(!s){for(var n=o.$refs[e]._data.fields,l=[],c=0;c<n.length;c++)""!=n[c].validateMessage&&l.push(n[c].validateMessage);return o.$message({type:"error",message:l[0]}),!1}if(o.loadingClick(),o.ruleForm.provinceCode=o.ruleForm.areaCodes[0],o.ruleForm.cityCode=o.ruleForm.areaCodes[1],o.ruleForm.areaCode=o.ruleForm.areaCodes[2],"add"==t){o.ruleForm.id="";var u=o.ruleForm;a.i(i.a)(u).then(function(e){if(1===e.data.code){r.close(),o.$message({type:"success",message:"新增成功!"}),o.$refs.ruleForm.resetFields(),o.customName="",o.customPhone="",o.dialogTableVisible=!1;var t={};o.pageNumber=1,o.jumpPage=1,o.getData(t,o.pageNumber,o.pageSize1)}else r.close()}).catch(function(e){r.close()})}else{var d=o.ruleForm;a.i(i.b)(d).then(function(e){if(1===e.data.code){r.close(),o.$message({type:"success",message:"编辑成功!"}),o.$refs.ruleForm.resetFields(),o.dialogTableVisible=!1;var t={name:o.customName,phone:o.customPhone};o.getData(t,o.pageNumber,o.pageSize1)}else r.close()}).catch(function(e){r.close()})}})},resetForm:function(e){this.$refs[e].resetFields(),this.ruleForm.provinceCode="",this.ruleForm.cityCode="",this.ruleForm.areaCode="",this.ruleForm.sex="",this.dialogTableVisible=!1},localSearch:function(){var e={name:this.customName,phone:this.customPhone};this.pageNumber=1,this.jumpPage=1,this.getData(e,this.pageNumber,this.pageSize1)},handleSizeChange1:function(e){this.pageNumber=1,this.jumpPage=1,this.pageSize1=e;var t={name:this.customName,phone:this.customPhone};this.getData(t,this.pageNumber,this.pageSize1)},handleCurrentChange1:function(e){this.pageNumber=e;var t={name:this.customName,phone:this.customPhone};this.getData(t,this.pageNumber,this.pageSize1)},selectBut:function(e){var t=this;if(this.testFlag=e.id,this.dialogTableVisible=!0,this.areaOptions=this.$store.state.user.area,void 0==e.id)this.titlevar="新增客户",this.ruleForm.provinceCode="",this.ruleForm.cityCode="",this.ruleForm.areaCode="",this.ruleForm.sex="";else{this.titlevar="编辑客户";var r={id:e.id};a.i(i.c)(r).then(function(e){if(1===e.data.code){t.ruleForm=e.data.data;var a=e.data.data.address;t.ruleForm.address=a;var r=[];r.push(e.data.data.provinceCode),r.push(e.data.data.cityCode),r.push(e.data.data.areaCode),t.ruleForm.areaCodes=r}}).catch(function(e){})}},lookInf:function(e){var t=e.id;this.$router.push({path:"/clean/addorder",query:{coustomerId:t}})},Delete:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1}).then(function(){var r={id:e.id};a.i(i.d)(r).then(function(e){if(1===e.data.code){t.$message({type:"success",message:"删除成功!"});var a={name:t.customName,phone:t.customPhone};t.getData(a,t.pageNumber,t.pageSize1)}}).catch(function(){t.getData(obj1,t.pageNumber,t.pageSize1)})}).catch(function(){t.$message({type:"warning",message:"已取消删除"})})},getData:function(e,t,r){var o=this;this.listLoading=!0;var s=e;a.i(i.e)(s,t,r).then(function(e){if(1===e.data.code){if(o.pagetotal1=e.data.data.page.count,o.tableData=e.data.data.page.list,o.pageNumber=e.data.data.page.pageNo,o.jumpPage=e.data.data.page.pageNo,o.pageSize1=e.data.data.page.pageSize,void 0!=e.data.data.page.list)for(var t=0;t<o.tableData.length;t++)o.tableData[t].index=t+1;o.organizationOptions=e.data.data.orgList,o.listLoading=!1}else o.listLoading=!1}).catch(function(e){o.listLoading=!1})}},mounted:function(){this.getData({},1,10),this.sex=this.dict.sex}}},U5aE:function(e,t,a){var r=a("g8kr");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("XkoO")("2be3646a",r,!0)},WLEV:function(e,t,a){"use strict";function r(e,t,a){return b.a.post("/apiservice/a/service/station/serviceStation/listData?pageNo="+t+"&pageSize="+a,e)}function i(e){return b.a.post("/apiservice/a/service/station/serviceStation/saveData",e)}function o(e){return b.a.post("/apiservice/a/service/station/serviceStation/upData",e)}function s(e){return b.a.post("/apiservice/a/service/station/serviceStation/deleteStation",e)}function n(e){return b.a.post("/apiservice/a/service/station/serviceStation/getManager",e)}function l(e){return b.a.post("/apiservice/a/service/station/serviceStation/setManager",e)}function c(e,t,a){return b.a.post("/apiservice/a/sys/organization/listData?pageNo="+t+"&pageSize="+a,e)}function u(e){return b.a.post("/apiservice/a/sys/organization/saveData",e)}function d(e){return b.a.post("/apiservice/a/sys/organization/formData",e)}function p(e){return b.a.post("/apiservice/a/sys/organization/upData",e)}function m(e){return b.a.post("/apiservice/a/service/station/serviceStation/getStoreList",e)}function g(e){return b.a.post("/apiservice/a/service/station/serviceStation/saveStationStore",e)}function f(e){return b.a.post("/apiservice/a/service/station/serviceStation/setScope",e)}function h(e){return b.a.post("/apiservice/a/sys/organization/getEShopByCode",e)}function v(e){return b.a.post("/apiservice/a/sys/organization/deleteEshop",e)}t.b=r,t.f=i,t.i=o,t.e=s,t.c=n,t.h=l,t.a=c,t.n=u,t.k=d,t.o=p,t.d=m,t.g=g,t.j=f,t.l=h,t.m=v;var b=a("Vo7i")},"dw/A":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"addorder-container"},[a("div",{staticClass:"fist-bar"},[a("el-input",{staticClass:"search",attrs:{placeholder:"请输入搜索的手机号"},model:{value:e.customPhone,callback:function(t){e.customPhone=t},expression:"customPhone"}}),e._v(" "),a("el-input",{staticClass:"search",attrs:{placeholder:"请输入搜索的姓名"},model:{value:e.customName,callback:function(t){e.customName=t},expression:"customName"}}),e._v(" "),a("button",{staticClass:"search-button btn_search",on:{click:e.localSearch}},[a("i",{staticClass:"el-icon-search"}),e._v(" 搜索")])],1),e._v(" "),a("div",{staticClass:"second-bar"},[-1!=e.btnShow.indexOf("customer_insert")?a("button",{staticClass:"add-button selfPosi3 marginTop20",attrs:{type:"button"},on:{click:function(t){e.selectBut("")}}},[e._v("新增")]):e._e(),e._v(" "),a("div",{staticClass:"tableWarp"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData}},[a("el-table-column",{attrs:{align:"center",label:"编号",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t\t\t\t\t\t"+e._s(t.row.index+(e.pageNumber-1)*e.pageSize1)+"\n\t\t\t\t\t\t")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"name",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"phone",label:"手机号"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"性别"},scopedSlots:e._u([{key:"default",fn:function(t){return["male"==t.row.sex?a("span",[e._v("男")]):e._e(),e._v(" "),"female"==t.row.sex?a("span",[e._v("女")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"地址",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{placement:"left",disabled:t.row.address.length<28,content:t.row.address}},[a("div",{staticClass:"selfToolTip"},[e._v(e._s(t.row.address))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"300",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[-1!=e.btnShow.indexOf("order_insert")?a("el-button",{staticClass:"ceshi3",attrs:{type:"button"},on:{click:function(a){e.lookInf(t.row)}}},[e._v("下单")]):e._e(),e._v(" "),-1!=e.btnShow.indexOf("customer_update")?a("el-button",{staticClass:"ceshi3",attrs:{type:"button"},on:{click:function(a){e.selectBut(t.row)}}},[e._v("编辑")]):e._e(),e._v(" "),-1!=e.btnShow.indexOf("customer_delete")?a("el-button",{staticClass:"ceshi3",attrs:{type:"button"},on:{click:function(a){e.Delete(t.row)}}},[e._v("删除")]):e._e()]}}])})],1),e._v(" "),e.listLoading?e._e():a("div",{staticClass:"selfStyle"},[a("el-pagination",{attrs:{"current-page":e.jumpPage,"page-sizes":[5,10,15,20],"page-size":e.pageSize1,layout:"total, sizes, prev, pager, next, jumper",total:e.pagetotal1},on:{"size-change":e.handleSizeChange1,"current-change":e.handleCurrentChange1,"update:currentPage":function(t){e.jumpPage=t}}})],1)],1)]),e._v(" "),a("el-dialog",{attrs:{title:e.titlevar,visible:e.dialogTableVisible,"show-close":!1,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm padding10Prent",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"160px","label-position":"left"}},[a("el-form-item",{attrs:{label:"姓名:",prop:"name"}},[a("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:"请输入2-15位客户姓名"},model:{value:e.ruleForm.name,callback:function(t){e.ruleForm.name="string"==typeof t?t.trim():t},expression:"ruleForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"性别:",prop:"sex"}},[a("el-select",{staticClass:"filter-item ",staticStyle:{width:"100%"},attrs:{placeholder:"请选择性别"},model:{value:e.ruleForm.sex,callback:function(t){e.ruleForm.sex=t},expression:"ruleForm.sex"}},e._l(e.sex,function(e,t,r){return a("el-option",{key:r,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号:",prop:"phone"}},[a("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:"请输入11位手机号"},model:{value:e.ruleForm.phone,callback:function(t){e.ruleForm.phone=t},expression:"ruleForm.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所在区域:",prop:"areaCodes"}},[a("el-cascader",{ref:"allDeress",staticStyle:{width:"100%"},attrs:{options:e.areaOptions,"show-all-levels":!0},model:{value:e.ruleForm.areaCodes,callback:function(t){e.ruleForm.areaCodes=t},expression:"ruleForm.areaCodes"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"详细地址:",prop:"address"}},[a("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:"输入详细地址"},model:{value:e.ruleForm.address,callback:function(t){e.ruleForm.address="string"==typeof t?t.trim():t},expression:"ruleForm.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱:",prop:"email"}},[a("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:"请输入常用邮箱"},model:{value:e.ruleForm.email,callback:function(t){e.ruleForm.email="string"==typeof t?t.trim():t},expression:"ruleForm.email"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},[void 0==e.testFlag?a("button",{staticClass:"button-large",attrs:{disabled:e.submitFlag},on:{click:function(t){e.submitForm("ruleForm","add")}}},[e._v("确 定")]):e._e(),e._v(" "),void 0!=e.testFlag?a("button",{staticClass:"button-large",attrs:{disabled:e.submitFlag},on:{click:function(t){e.submitForm("ruleForm","up")}}},[e._v("确 定")]):e._e(),e._v(" "),a("button",{staticClass:"button-cancel",on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("取 消")])])],1)],1)},i=[],o={render:r,staticRenderFns:i};t.a=o},fIj0:function(e,t){e.exports={assess_grade:{1:"一级",2:"二级",3:"三级",4:"四级",5:"五级"},del_flag:{0:"正常",1:"删除"},education:{primary:"小学",middle:"初中",special:"中专",high:"高中",junior:"大专",university:"本科及以上"},ethnic:{10:"朝鲜族",11:"满族",12:"侗族",13:"瑶族",14:"白族",15:"土家族",16:"哈尼族",17:"哈萨克族",18:"傣族",19:"黎族",20:"僳僳族",21:"佤族",22:"畲族",23:"高山族",24:"拉祜族",25:"水族",26:"东乡族",27:"纳西族",28:"景颇族",29:"柯尔克孜族",30:"土族",31:"达斡尔族",32:"仫佬族",33:"羌族",34:"布朗族",35:"撒拉族",36:"毛难族",37:"仡佬族",38:"锡伯族",39:"阿昌族",40:"普米族",41:"塔吉克族",42:"怒族",43:"乌孜别克族",44:"俄罗斯族",45:"鄂温克族",46:"崩龙族",47:"保安族",48:"裕固族",49:"京族",50:"塔塔尔族",51:"独龙族",52:"鄂伦春族",53:"赫哲族",54:"门巴族",55:"珞巴族",56:"基诺族","01":"汉族","09":"布依族","07":"彝族","02":"蒙古族","04":"藏族","03":"回族","06":"苗族","05":"维吾尔族","08":"壮族"},job_natrue:{full_time:"全职",part_time:"兼职"},job_status:{online:"在岗",leave:"离岗"},matrimony:{unmarried:"未婚",married:"已婚",divorce:"离婚",widowed:"丧偶"},meterage:{house:"按居室",area:"按面积",num:"按数量"},order_majorSort:{clean:"保洁",repair:"家修"},order_source:{score:"积分商城",store:"门店",app:"app",wechat:"微信",tv:"电视",callcenter:"400呼叫中心",web:"PC"},order_status:{dispatched:"已派单",finish:"已完成",success:"已成功",waitdispatch:"待派单",cancel:"已取消",whole:"全部"},order_type:{common:"普通订单",group_split_yes:"组合并拆单",group_split_no:"组合不拆单"},pay_method:{online:"在线",offline:"货到付款"},pay_platform:{cash:"现金",wx_pub_qr:"微信扫码",alipay:"支付宝",balance:"余额",alipay_qr:"支付宝扫码",wx:"微信",pos:"银行卡"},pay_status:{payed:"已支付",waitpay:"待支付"},cancel_type:{customer:"客户来电取消",tech:"无可派技师",other:"其它原因"},relation:{spouse:"夫妻",parent:"父母",children:"子女",siblings:"兄弟姐妹",relative:"亲戚"},return_status:{refunded:"退款成功",failure:"退款失败",cancel:"已取消",refunding:"申请退款中"},service_area_type:{map:"地图",store:"门店"},service_station_type:{self:"直营",join:"加盟"},service_status:{wait_service:"待服务",started:"已上门",finish:"已完成",cancel:"已取消"},ser_sort:{clean:"保洁",repair:"家修",all:"全部"},sex:{male:"男",female:"女"},source:{own:"本机构",other:"第三方"},sys_log_type:{visit:"接入日志",error:"异常日志"},tech_status:{1:"派单",2:"未派单"},work_time:{0:"1年以下",1:"1年",2:"2年",3:"3年",4:"4年",5:"5年",6:"6年",7:"7年",8:"8年",9:"9年",10:"10年",11:"10年以上"},yes_no:{yes:"是",no:"否"},send_type:{save_order:"更新订单信息",del_goods:"删除商品",save_goods:"保存商品"},butt_status:{butt_butt:"对接中",butt_success:"对接成功",butt_fail:"对接失败",remove_fail:"解除失败"},dock_platform:{gasq:"国安社区"}}},g8kr:function(e,t,a){t=e.exports=a("acE3")(!1),t.push([e.i,".selfAddressGao[data-v-8e7a19be]{width:332px;max-height:290px;overflow:hidden}.selfpanel[data-v-8e7a19be]{width:350px;max-height:290px;overflow-y:auto}.selfToolTip[data-v-8e7a19be]{width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.tableWarp[data-v-8e7a19be]{width:100%;background:#fff;padding:20px 20px 70px}.selfStyle[data-v-8e7a19be]{margin-top:20px;float:right}.width400[data-v-8e7a19be]{width:400px}.ceshi3[data-v-8e7a19be]{font-size:12px}.mapDiv[data-v-8e7a19be]{float:left;margin-top:100px}.addorder-container[data-v-8e7a19be]{width:100%;float:left;background:#eef1f6}.selfPosi[data-v-8e7a19be]{width:200px;margin-left:20px}.selfPosi1[data-v-8e7a19be]{width:200px;margin-left:30px}.selfPosi2[data-v-8e7a19be],.selfPosi3[data-v-8e7a19be]{float:right;margin-right:20px}.selfPosi3[data-v-8e7a19be]{margin-top:10px;margin-bottom:20px}.padding10Prent[data-v-8e7a19be]{width:100%;padding:0 10%}.marginTop20[data-v-8e7a19be]{margin-top:20px}.fist-bar[data-v-8e7a19be]{padding:20px;background:#fff;border-bottom:1px solid #eee}.second-bar[data-v-8e7a19be]{background:#eef1f6}.mapWrap[data-v-8e7a19be]{width:0;height:0;display:block}.pickerInput[data-v-8e7a19be]{width:50%;height:36px;font-size:12px;padding:0 10px;border:none;border:1px solid #bfcbd9;outline:none}.pickerInput[data-v-8e7a19be]:hover{border-color:#8391a5}.amap-ui-poi-picker-sugg[data-v-8e7a19be]{width:180px;overflow:hidden}.amap-ui-poi-picker-sugg-list[data-v-8e7a19be]{width:180px}.sugg-item[data-v-8e7a19be]{width:180px!important}",""])},mMlH:function(e,t,a){"use strict";function r(e,t,a){return l.a.post("/apiservice/a/service/order/orderCustomInfo/listData?pageNo="+t+"&pageSize="+a,e)}function i(e){return l.a.post("/apiservice/a/service/order/orderCustomInfo/deleteSortInfo",e)}function o(e){return l.a.post("/apiservice/a/service/order/orderCustomInfo/saveData",e)}function s(e){return l.a.post("/apiservice/a/service/order/orderCustomInfo/formData",e)}function n(e){return l.a.post("/apiservice/a/service/order/orderCustomInfo/upData",e)}t.e=r,t.d=i,t.a=o,t.c=s,t.b=n;var l=a("Vo7i")},vayR:function(e,t,a){"use strict";function r(e){a("U5aE")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("JG8R"),o=a("dw/A"),s=a("J0+h"),n=r,l=s(i.a,o.a,n,"data-v-8e7a19be",null);t.default=l.exports}});