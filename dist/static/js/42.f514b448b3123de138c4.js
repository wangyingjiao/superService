webpackJsonp([42],{"5hWI":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o("W6Tp"),s=o("HGTA"),n=o("VU/8"),r=n(a.a,s.a,null,null,null);t.default=r.exports},HGTA:function(e,t,o){"use strict";var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("el-table",{directives:[{name:"show",rawName:"v-show",value:e.basicForm.commoditys.length>0,expression:"basicForm.commoditys.length>0"}],staticStyle:{width:"100%"},attrs:{data:e.basicForm.commoditys,border:""}},[o("el-table-column",{attrs:{prop:"name",align:"center",label:"商品名称"}}),e._v(" "),o("el-table-column",{attrs:{prop:"unit",align:"center",label:"商品单位"}}),e._v(" "),o("el-table-column",{attrs:{prop:"type",align:"center",label:"计量方式"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("span",{directives:[{name:"show",rawName:"v-show",value:"num"==t.row.type,expression:"scope.row.type=='num'"}]},[e._v("按数量")]),e._v(" "),o("span",{directives:[{name:"show",rawName:"v-show",value:"area"==t.row.type,expression:"scope.row.type=='area'"}]},[e._v("按面积")]),e._v(" "),o("span",{directives:[{name:"show",rawName:"v-show",value:"house"==t.row.type,expression:"scope.row.type=='house'"}]},[e._v("按居室")])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"price",align:"center",label:"价格"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("span",[e._v(e._s(t.row.price+"元/"+t.row.unit))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"convertHours",align:"center",label:"折算时长"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("span",[e._v(e._s(t.row.convertHours+"小时 / 每人 / "+t.row.unit))])]}}])}),e._v(" "),o("el-table-column",{attrs:{align:"center",label:"起步人数"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("span",[e._v(e._s(0!=t.row.startPerNum?t.row.startPerNum:1))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"cappingPerNum",align:"center",label:"封顶人数"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("span",[e._v(e._s(0!=t.row.cappingPerNum?t.row.cappingPerNum:""))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"minPurchase",align:"center",label:"起购数量"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("span",[e._v(e._s(0!=t.row.minPurchase?t.row.minPurchase:1))])]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"操作",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("span",{staticClass:"tableSer",on:{click:function(o){e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),o("span",{staticClass:"tableSer",staticStyle:{color:"red"},on:{click:function(o){e.tableHandleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),o("el-form",{ref:"goods_info",staticStyle:{padding:"20px 0 0 20px"},attrs:{model:e.goods_info,"label-position":"left","label-width":"90px"}},[o("el-form-item",{attrs:{label:"商品单位:",prop:"unit"}},[o("el-input",{staticStyle:{width:"70%"},attrs:{placeholder:"请输入单位名称（1-6位）"},model:{value:e.goods_info.unit,callback:function(t){e.goods_info.unit=t},expression:"goods_info.unit"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"计量方式:",prop:"type"}},[o("el-select",{staticClass:"filter-item",staticStyle:{width:"70%"},attrs:{placeholder:"请选择"},model:{value:e.goods_info.type,callback:function(t){e.goods_info.type=t},expression:"goods_info.type"}},e._l(e.measure,function(e,t){return o("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),o("el-form-item",{attrs:{label:"价格:",prop:"price"}},[o("el-input",{staticStyle:{width:"70%"},model:{value:e.goods_info.price,callback:function(t){e.goods_info.price=t},expression:"goods_info.price"}},[o("template",{slot:"append"},[e._v("元 / "+e._s(e.goods_info.unit||"单位"))])],2)],1),e._v(" "),o("el-form-item",{attrs:{label:"折算时长:",prop:"convertHours"}},[o("el-input",{staticStyle:{width:"70%"},model:{value:e.goods_info.convertHours,callback:function(t){e.goods_info.convertHours=t},expression:"goods_info.convertHours"}},[o("template",{slot:"append"},[e._v("小时 / 每人 / "+e._s(e.goods_info.unit||"单位"))])],2),e._v(" "),o("el-popover",{ref:"popover1",attrs:{placement:"top-start",width:"200",trigger:"hover",content:"请录入1单位所需服务时长（以小时为单位）例如：擦玻璃计量单位为平米，1单位（即1平米）所需服务时长为0.25小时每人"}}),e._v(" "),o("span",{directives:[{name:"popover",rawName:"v-popover:popover1",arg:"popover1"}],staticClass:"iconfont doubt"},[e._v("")])],1),e._v(" "),o("el-form-item",{staticClass:"seize",attrs:{label:"起步人数:",prop:"startPerNum"}},[o("el-input",{staticStyle:{width:"70%"},attrs:{placeholder:"请输入起步人数(默认为1)"},model:{value:e.goods_info.startPerNum,callback:function(t){e.goods_info.startPerNum=t},expression:"goods_info.startPerNum"}})],1),e._v(" "),o("el-form-item",{staticClass:"seize",attrs:{label:"封顶人数:",prop:"cappingPerNum"}},[o("el-input",{staticStyle:{width:"70%"},attrs:{placeholder:"请输入封顶人数"},model:{value:e.goods_info.cappingPerNum,callback:function(t){e.goods_info.cappingPerNum=t},expression:"goods_info.cappingPerNum"}})],1),e._v(" "),o("el-form-item",{staticClass:"seize",attrs:{label:"起购数量:",prop:"minPurchase"}},[o("el-input",{staticStyle:{width:"70%"},attrs:{placeholder:"请输入起购数量（默认为1）"},model:{value:e.goods_info.minPurchase,callback:function(t){e.goods_info.minPurchase=t},expression:"goods_info.minPurchase"}})],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},slot:"footer"},[e.handleEditFlag?o("input",{staticClass:"button-large btn-color",attrs:{type:"button",value:"保 存"},on:{click:function(t){e.submitForm("goods_info")}}}):o("input",{staticClass:"button-large btn-color",attrs:{type:"button",value:"添 加"},on:{click:function(t){e.submitForm("goods_info")}}}),e._v(" "),o("input",{staticClass:"button-cancel btn-color",attrs:{type:"button",value:"取 消"},on:{click:function(t){e.resetForm("ser")}}})])],1)},s=[],n={render:a,staticRenderFns:s};t.a=n},W6Tp:function(e,t,o){"use strict";var a=o("woOf"),s=o.n(a);t.a={name:"table_demo",props:["measure"],data:function(){return{handleEditFlag:!1,basicForm:{name:"",sortId:"",majorSort:"all",commoditys:[],sysTags:[],customTags:[]},goods_info:{name:"",unit:"",type:"",price:"",convertHours:"",startPerNum:"",cappingPerNum:"",minPurchase:""}}},methods:{submitForm:function(e){var t=s()({},this.goods_info);t.startPerNum=this.goods_info.startPerNum,t.minPurchase=this.goods_info.minPurchase,t.cappingPerNum=this.goods_info.cappingPerNum,this.basicForm.commoditys.push(t)}}}}});