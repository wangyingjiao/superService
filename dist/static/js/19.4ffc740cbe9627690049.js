webpackJsonp([19],{"8Q9n":function(e,n,o){var t=o("Er7I");"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);o("rjj0")("5e7ce56e",t,!0)},"Cy+P":function(e,n,o){"use strict";var t=function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",{staticClass:"login-container"},[e._m(0),e._v(" "),o("div",{staticClass:"formBox"},[o("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{autoComplete:"on",model:e.loginForm,rules:e.loginRules,"label-position":"left","label-width":"0px"}},[o("p",{staticClass:"title"},[e._v("国安社区自营服务平台")]),e._v(" "),o("p",{staticClass:"etitle"},[e._v("SERVICE MANAGEMENT SYSTEM")]),e._v(" "),o("el-form-item",{attrs:{prop:"username"}},[o("span",{staticClass:"svg-container svg-container_login"},[o("icon-svg",{attrs:{"icon-class":"yonghuming"}})],1),e._v(" "),o("el-input",{staticClass:"username",attrs:{name:"username",type:"text",autoComplete:"on",placeholder:"登录账号(手机号)"},model:{value:e.loginForm.username,callback:function(n){e.loginForm.username=n},expression:"loginForm.username"}})],1),e._v(" "),o("el-form-item",{attrs:{prop:"password"}},[o("span",{staticClass:"svg-container"},[o("icon-svg",{attrs:{"icon-class":"mima"}})],1),e._v(" "),o("el-input",{staticClass:"password",attrs:{name:"password",type:"password",autoComplete:"on",placeholder:"密码(6-20位数字、字母组合)"},nativeOn:{keyup:function(n){if(!("button"in n)&&e._k(n.keyCode,"enter",13))return null;e.handleLogin(n)}},model:{value:e.loginForm.password,callback:function(n){e.loginForm.password=n},expression:"loginForm.password"}})],1),e._v(" "),o("el-form-item",{staticClass:"loginitem"},[o("el-button",{staticClass:"loginbtn",attrs:{type:"primary",loading:e.loading},nativeOn:{click:function(n){n.preventDefault(),e.handleLogin(n)}}},[e._v("\n        登          录\n      ")])],1),e._v(" "),o("div",{staticClass:"tips"})],1)],1)])},i=[function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",[o("a",{staticStyle:{display:"block",width:"100px",height:"100px","line-height":"100px","bachground-color":"red",color:"#fff"},attrs:{href:"https://download.guoanshequ.com/android/servicepersonnel.apk"}},[e._v("下载APP")])])}],r={render:t,staticRenderFns:i};n.a=r},E4LH:function(e,n,o){"use strict"},Er7I:function(e,n,o){n=e.exports=o("FZ+f")(!1),n.push([e.i,".login-container{position:relative;width:100%;height:100%;height:100vh;background-color:#1f3264;background:url("+o("M0OA")+") no-repeat}.login-container input:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px #1f3264 inset!important;-webkit-text-fill-color:#fff!important}.login-container input{background:transparent;border:0;-webkit-appearance:none;border-radius:0;padding:12px 5px 12px 15px;color:#fff;height:50px}.login-container .el-input{display:inline-block;height:50px;width:85%}.login-container .password input,.login-container .username input{margin-left:5px}.login-container .password input:hover,.login-container .username input:hover{cursor:pointer}.login-container .tips{font-size:14px;color:#fff;margin-bottom:10px}.login-container .svg-container{padding:6px 5px 6px 15px;color:#265dc3;vertical-align:middle;width:30px;display:inline-block}.login-container .svg-container_login{font-size:20px}.login-container .title{height:40px;font-size:28px}.login-container .etitle,.login-container .title{font-weight:400;line-height:40px;color:#fff;text-align:center;font-family:PingFangSC-Regular}.login-container .etitle{font-size:17px;margin-bottom:20px}.login-container .loginitem div{line-height:32px}.login-container .loginbtn{color:#fff;font-size:14px;font-weight:600;width:100%;border:0 solid #cde19e;background-image:linear-gradient(-163deg,#cde19e,#00a8e1)}.login-container .login-form{position:absolute;bottom:50%;left:65%;margin-bottom:-177px;width:400px;padding:35px 35px 15px;background-color:#1f3264;border-radius:3px}.login-container .el-form-item{border:1px solid hsla(0,0%,100%,.1);border-radius:5px;color:#454545}",""])},M0OA:function(e,n,o){e.exports=o.p+"static/img/bg.f97d16a.png"},"T+/8":function(e,n,o){"use strict";function t(e){o("8Q9n")}Object.defineProperty(n,"__esModule",{value:!0});var i=o("m1D0"),r=o("Cy+P"),a=o("VU/8"),l=t,s=a(i.a,r.a,l,null,null);n.default=s.exports},m1D0:function(e,n,o){"use strict";o("E4LH");n.a={name:"login",data:function(){return{loginForm:{username:"",password:""},loginRules:{username:[{required:!0,message:"登录账号不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"}]},loading:!1}},methods:{handleLogin:function(){var e=this;localStorage.removeItem("name"),localStorage.removeItem("dataScope"),localStorage.removeItem("orgId"),localStorage.removeItem("userId"),localStorage.removeItem("menu"),this.$refs.loginForm.validate(function(n){if(!n)return!1;e.loading=!0,e.$store.dispatch("LoginByUsername",e.loginForm).then(function(n){e.loading=!1,e.$router.push({path:"/"})}).catch(function(){e.loading=!1})})}}}}});