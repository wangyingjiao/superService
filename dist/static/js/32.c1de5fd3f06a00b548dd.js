webpackJsonp([32],{"/eu3":function(t,e,a){"use strict";var i=a("3cXf"),n=a.n(i),s=a("rVsN"),r=a.n(s),o=a("Z7nP"),l=a.n(o),c=a("Vc3t");e.a={name:"upload-list",data:function(){return{progress:0,pass:null,isEnlargeImage:!1,imgFlag:!0,enlargeImage:"",imagelist:[],params:{action:"http://jsonplaceholder.typicode.com/posts/",data:{}}}},computed:{proStatus:function(){return this.pass?"success":0==this.pass?"exception":""},sign:function(){return a.i(c.a)()}},watch:{piclist:{immediate:!0,handler:function(t,e){this.imagelist=t,t.length>3?this.imgFlag=!1:this.imgFlag=!0},deep:!0}},props:["piclist","type","min","max"],methods:{uploadOnProgress:function(t,e){this.progress=Math.floor(t.percent)},beforeUpload:function(t){if("image/gif"!=t.type&&"image/jpg"!=t.type&&"image/png"!=t.type&&"image/jpeg"!=t.type)return this.$message.error("请上传正确的图片格式"),!1;if(this.imagelist.length>=4)return this.$message({type:"error",message:"最多上传4张图片"}),!1;var e=this;return new r.a(function(a,i){var n=new Image,s=new FileReader;document.createElement("canvas");s.onload=function(t){n.src=t.target.result},n.onload=function(t){var s=n.width,r=n.height,o=e.min,l=e.max;s>=750&&r/s>=o&&r/s<=l?a(!0):(e.$message.error("上传图片不符合要求"),i(!1))},s.readAsDataURL(t)})},uploadOnChange:function(t){"ready"==t.status?(this.pass=null,this.progress=0):"fail"==t.status&&this.$message.error("图片上传出错，请刷新重试！")},uploadOnSuccess:function(t,e,a,i){var s=this,o=t.file.name.split("."),c=this;new r.a(function(t,e){var a=JSON.parse(l.a.get("sign")),i=Date.parse(new Date)/1e3;a.expire-3>i?t(a):s.$http.get("/apiservice/oss/getSign").then(function(e){l.a.set("sign",n()(e.data)),t(e.data)})}).then(function(e){var a=e,i=new FormData,n=new Date,r=(n.getTime(),n.getFullYear()),l=n.getMonth()+1,g=n.getDate();i.append("name",t.file.name),i.append("key",a.dir+"/"+r+"/"+l+"/"+g+"/"+t.file.uid+"."+o[o.length-1]),i.append("policy",a.policy),i.append("OSSAccessKeyId",a.accessid),i.append("success_action_status",201),i.append("signature",a.signature),i.append("file",t.file,t.file.name),c.$http.post(a.host,i,{header:{"Content-Type":"multipart/form-data; boundary={boundary}"}}).then(function(t){var e=i.get("key");s.imagelist.push({url:e}),s.$emit("imgclick",s.imagelist)}).catch(function(t){var e=i.get("key");s.imagelist.push({url:e}),s.imagelist.length>3&&(s.imgFlag=!1),s.$emit("imgclick",s.imagelist)})})},uploadOnError:function(t,e){this.pass=!1},handleFileEnlarge:function(t){t&&(this.enlargeImage=t,this.isEnlargeImage=!this.isEnlargeImage)},handleFileName:function(t,e){var a=this,i=this;this.$prompt("请输入新文件名：","提示：",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){var n=t.value;if(!n)return!1;a.$message.success("操作成功"),i.imagelist[e].name=n}).catch(function(){})},handleFileRemove:function(t,e){if(!t.url)return!1;this.imagelist.splice(e,1),this.imagelist.length<4&&(this.imgFlag=!0),this.$emit("imgclick",this.imagelist)}}}},JX1h:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"img-list"},[t._l(t.imagelist,function(e,i){return a("div",{key:i,staticClass:"img-content"},[a("img",{attrs:{src:"picture"==t.type?t.imgSrc+e.url+t.picWidth600:t.imgSrc+e.url+t.picWidth100}}),t._v(" "),a("div",{staticClass:"layer"},[a("i",{staticClass:"el-icon-delete",on:{click:function(a){t.handleFileRemove(e,i)}}})])])}),t._v(" "),t.pass||0===t.progress?t._e():a("div",{staticClass:"img-content img-progress"},[a("el-progress",{attrs:{type:"circle",percentage:t.progress,status:t.proStatus}})],1),t._v(" "),t.imgFlag?a("div",{staticClass:"img-upload"},[a("el-upload",{ref:"upload",staticClass:"uploader",attrs:{accept:"image/*","list-type":t.type,"show-file-list":!1,action:t.params.action,data:t.params.data,"on-change":t.uploadOnChange,"http-request":t.uploadOnSuccess,"before-upload":t.beforeUpload,"on-error":t.uploadOnError,"on-progress":t.uploadOnProgress}},[a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):t._e()],2)},n=[],s={render:i,staticRenderFns:n};e.a=s},Vc3t:function(t,e,a){"use strict";function i(){var t={};return l.a.get("sign")?t=JSON.parse(l.a.get("sign")):r.a.get("/apiservice/oss/getSign").then(function(e){var a=e.data;l.a.set("sign",s()(a)),t=JSON.parse(l.a.get("sign"))}),t}e.a=i;var n=a("3cXf"),s=a.n(n),r=a("Vo7i"),o=a("Z7nP"),l=a.n(o)},"sD/I":function(t,e,a){"use strict";function i(t){a("u36o")}Object.defineProperty(e,"__esModule",{value:!0});var n=a("/eu3"),s=a("JX1h"),r=a("J0+h"),o=i,l=r(n.a,s.a,o,"data-v-54a2c21a",null);e.default=l.exports},u36o:function(t,e,a){var i=a("zHvi");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("XkoO")("08bd7242",i,!0)},zHvi:function(t,e,a){e=t.exports=a("acE3")(!1),e.push([t.i,".el-icon-delete[data-v-54a2c21a]{cursor:pointer}.img-list[data-v-54a2c21a]{overflow:hidden;width:100%}.img-list .img-content[data-v-54a2c21a]{background-color:#fff;float:left;text-align:left;position:relative;display:inline-block;padding:5px;margin:0 20px 0 0;border:1px solid #d1dbe5;border-radius:4px;transition:all .3s;box-shadow:0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04)}.img-list .img-upload[data-v-54a2c21a]{float:left;display:table;text-align:center}.img-upload .uploader .el-upload--picture-card[data-v-54a2c21a]{width:112px;height:112px;line-height:112px}.img-list .uploader[data-v-54a2c21a]{width:100%;display:table-cell;vertical-align:middle}.img-list .img-progress[data-v-54a2c21a]{text-align:center;padding-top:50px}.img-list .img-content img[data-v-54a2c21a]{display:block;margin:0 auto;border-radius:4px}.img-list .img-content .name[data-v-54a2c21a]{margin-top:10px}.img-list .img-content .name>div[data-v-54a2c21a]{width:90%;text-overflow:ellipsis;overflow:hidden;height:25px;line-height:25px}.img-list .img-content:hover .del[data-v-54a2c21a],.img-list .img-content:hover .layer[data-v-54a2c21a]{opacity:1}.img-list .img-content .del[data-v-54a2c21a],.img-list .img-content .layer[data-v-54a2c21a]{opacity:0;transition:all .3s}.img-list .img-content .del[data-v-54a2c21a]{position:absolute;bottom:10px;right:10px;color:#8492a6;cursor:pointer;font-size:1.1em}.img-list .img-content .layer[data-v-54a2c21a]{line-height:112px;position:absolute;left:0;right:0;top:0;height:112px;color:#fff;text-align:center;z-index:5;background-color:rgba(0,0,0,.4)}.img-list .img-content .layer i[data-v-54a2c21a]{font-size:1.6em}",""])}});