webpackJsonp([35],{Vc3t:function(e,t,a){"use strict";function i(){var e={};return o.a.get("sign")?e=JSON.parse(o.a.get("sign")):r.a.get("/apiservice/oss/getSign").then(function(t){var a=t.data;o.a.set("sign",s()(a)),e=JSON.parse(o.a.get("sign"))}),e}t.a=i;var n=a("mvHQ"),s=a.n(n),r=a("Vo7i"),l=a("lbHh"),o=a.n(l)},gYh8:function(e,t,a){var i=a("rMCB");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("0ad1ade7",i,!0)},rMCB:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".el-icon-delete[data-v-ef58605a]{cursor:pointer}.img-list[data-v-ef58605a]{overflow:hidden;width:100%}.img-list .img-content[data-v-ef58605a]{background-color:#fff;float:left;text-align:left;position:relative;display:inline-block;padding:5px;margin:0 20px 0 0;border:1px solid #d1dbe5;border-radius:4px;transition:all .3s;box-shadow:0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04)}.img-list .img-upload[data-v-ef58605a]{float:left;display:table;text-align:center}.img-upload .uploader .el-upload--picture-card[data-v-ef58605a]{width:112px;height:112px;line-height:112px}.img-list .uploader[data-v-ef58605a]{width:100%;display:table-cell;vertical-align:middle}.img-list .img-progress[data-v-ef58605a]{text-align:center;padding-top:50px}.img-list .img-content img[data-v-ef58605a]{display:block;margin:0 auto;border-radius:4px}.img-list .img-content .name[data-v-ef58605a]{margin-top:10px}.img-list .img-content .name>div[data-v-ef58605a]{width:90%;text-overflow:ellipsis;overflow:hidden;height:25px;line-height:25px}.img-list .img-content:hover .del[data-v-ef58605a],.img-list .img-content:hover .layer[data-v-ef58605a]{opacity:1}.img-list .img-content .del[data-v-ef58605a],.img-list .img-content .layer[data-v-ef58605a]{opacity:0;transition:all .3s}.img-list .img-content .del[data-v-ef58605a]{position:absolute;bottom:10px;right:10px;color:#8492a6;cursor:pointer;font-size:1.1em}.img-list .img-content .layer[data-v-ef58605a]{line-height:112px;position:absolute;left:0;right:0;top:0;height:112px;color:#fff;text-align:center;z-index:5;background-color:rgba(0,0,0,.4)}.img-list .img-content .layer i[data-v-ef58605a]{font-size:1.6em}",""])},"sD/I":function(e,t,a){"use strict";function i(e){a("gYh8")}Object.defineProperty(t,"__esModule",{value:!0});var n=a("wyOv"),s=a("vVe4"),r=a("VU/8"),l=i,o=r(n.a,s.a,l,"data-v-ef58605a",null);t.default=o.exports},vVe4:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"img-list"},[e._l(e.imagelist,function(t,i){return a("div",{key:i,staticClass:"img-content"},[a("img",{attrs:{src:"picture"==e.type?e.imgSrc+t.url+e.picWidth600:e.imgSrc+t.url+e.picWidth100}}),e._v(" "),a("div",{staticClass:"layer"},[a("i",{staticClass:"el-icon-delete",on:{click:function(a){e.handleFileRemove(t,i)}}})])])}),e._v(" "),e.pass||0===e.progress?e._e():a("div",{staticClass:"img-content img-progress"},[a("el-progress",{attrs:{type:"circle",percentage:e.progress,status:e.proStatus}})],1),e._v(" "),e.imgFlag?a("div",{staticClass:"img-upload"},[a("el-upload",{ref:"upload",staticClass:"uploader",attrs:{accept:"image/*","list-type":e.type,"show-file-list":!1,action:e.params.action,data:e.params.data,"on-change":e.uploadOnChange,"http-request":e.uploadOnSuccess,"before-upload":e.beforeUpload,"on-error":e.uploadOnError,"on-progress":e.uploadOnProgress}},[a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):e._e()],2)},n=[],s={render:i,staticRenderFns:n};t.a=s},wyOv:function(e,t,a){"use strict";var i=a("mvHQ"),n=a.n(i),s=a("//Fk"),r=a.n(s),l=a("lbHh"),o=a.n(l),g=a("Vc3t");t.a={name:"upload-list",data:function(){return{progress:0,pass:null,isEnlargeImage:!1,imgFlag:!0,enlargeImage:"",imagelist:[],params:{action:"http://jsonplaceholder.typicode.com/posts/",data:{}}}},computed:{proStatus:function(){return this.pass?"success":0==this.pass?"exception":""},sign:function(){return a.i(g.a)()}},watch:{piclist:{immediate:!0,handler:function(e,t){this.imagelist=e,e.length>3?this.imgFlag=!1:this.imgFlag=!0},deep:!0}},props:["piclist","type","min","max"],methods:{uploadOnProgress:function(e,t){this.progress=Math.floor(e.percent)},beforeUpload:function(e){if("image/gif"!=e.type&&"image/jpg"!=e.type&&"image/png"!=e.type&&"image/jpeg"!=e.type)return this.$message.error("请上传正确的图片格式"),!1;if(this.imagelist.length>=4)return this.$message({type:"error",message:"最多上传4张图片"}),!1;var t=this;return new r.a(function(a,i){var n=new Image,s=new FileReader;document.createElement("canvas");s.onload=function(e){n.src=e.target.result},n.onload=function(e){var s=n.width,r=n.height,l=t.min,o=t.max;s>=750&&r/s>=l&&r/s<=o?a(!0):(t.$message.error("上传图片不符合要求"),i(!1))},s.readAsDataURL(e)})},uploadOnChange:function(e){"ready"==e.status?(this.pass=null,this.progress=0):"fail"==e.status&&this.$message.error("图片上传出错，请刷新重试！")},uploadOnSuccess:function(e,t,a,i){var s=this,l=e.file.name.split("."),g=this;new r.a(function(e,t){var a=JSON.parse(o.a.get("sign")),i=Date.parse(new Date)/1e3;a.expire-3>i?e(a):s.$http.get("/apiservice/oss/getSign").then(function(t){o.a.set("sign",n()(t.data)),e(t.data)})}).then(function(t){var a=t,i=new FormData,n=new Date,r=(n.getTime(),n.getFullYear()),o=n.getMonth()+1,c=n.getDate();i.append("name",e.file.name),i.append("key",a.dir+"/"+r+"/"+o+"/"+c+"/"+e.file.uid+"."+l[l.length-1]),i.append("policy",a.policy),i.append("OSSAccessKeyId",a.accessid),i.append("success_action_status",201),i.append("signature",a.signature),i.append("file",e.file,e.file.name),g.$http.post(a.host,i,{header:{"Content-Type":"multipart/form-data; boundary={boundary}"}}).then(function(e){var t=i.get("key");s.imagelist.push({url:t}),s.$emit("imgclick",s.imagelist)}).catch(function(e){var t=i.get("key");s.imagelist.push({url:t}),s.imagelist.length>3&&(s.imgFlag=!1),s.$emit("imgclick",s.imagelist)})})},uploadOnError:function(e,t){this.pass=!1},handleFileEnlarge:function(e){e&&(this.enlargeImage=e,this.isEnlargeImage=!this.isEnlargeImage)},handleFileName:function(e,t){var a=this,i=this;this.$prompt("请输入新文件名：","提示：",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){var n=e.value;if(!n)return!1;a.$message.success("操作成功"),i.imagelist[t].name=n}).catch(function(){})},handleFileRemove:function(e,t){if(!e.url)return!1;this.imagelist.splice(t,1),this.imagelist.length<4&&(this.imgFlag=!0),this.$emit("imgclick",this.imagelist)}}}}});