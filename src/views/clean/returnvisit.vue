<template>
	<div class="img-list">
		<div class="img-content" v-for="(item,key) in imagelist" :key="key">
			<img :src="imgWhole.imgPath + item.url + imgWhole.imgSuffix">
			<!-- 删除icon -->
			<div class="layer">
				<i @click="handleFileRemove(item,key)" class="el-icon-delete"></i>
			</div>
		</div>
		<div v-if="!pass && progress !== 0" class="img-content img-progress">
			<el-progress type="circle" :percentage="progress" :status="proStatus"></el-progress>
		</div>
		<div class="img-upload">
			<el-upload class="uploader" accept="image/*"
			  ref="upload"
			  list-type="picture-card"
			  :show-file-list="false"
			  :action="params.action"
			  :data="params.data"
			  :on-change="uploadOnChange"
			  :http-request="uploadOnSuccess"
        :before-upload="beforeUpload"
			  :on-error="uploadOnError"
			  :on-progress="uploadOnProgress">
        <i class="el-icon-plus avatar-uploader-icon"></i>
			  	<!-- <el-button type="primary">点击上传</el-button> -->
			</el-upload>
		</div>
	</div>
</template>

<script>
import Cookies from "js-cookie";
import { getSign } from "@/api/sign";
export default{
	name: 'upload-list',
	data(){
		return {
			progress: 0,//上传进度
			pass: null,//是否上传成功
      isEnlargeImage: false,//放大图片
      imgPath:"",
      enlargeImage: '',//放大图片地址
      imagelist:[],
			// imagelist: [{
			// 	url: 'http://img.hb.aicdn.com/723f8754f412debce188626d09cc0a1b2be6b7a6751a3-ICEp1E_fw658',
			// 	name: 'lemon'
			// },{
			// 	url: 'http://img.hb.aicdn.com/38ab9e558bcba041be979f03bfd31bd67bf1e6f35815a-8PD8Eo_fw658',
			// 	name: 'lemon2'
			// },{
			// 	url: 'http://img.hb.aicdn.com/0cd0dcc93f5b918e191dd84791101435136c7f9811e31-LRzYAQ_fw658',
			// 	name: 'lemon3'
			// }],
			params: {
				action: 'http://jsonplaceholder.typicode.com/posts/',
				data: {}
      },
      imgWhole:{
        imgPath:'https://imgcdn.guoanshequ.com/',
        imgSuffix:'?x-oss-process=image/resize,m_fill,h_100,w_100'
      }
		}
	},
	computed: {
		proStatus(){//上传状态
			if(this.pass){
				return 'success'
			}else if(this.pass == false){
				return 'exception'
			}else{
				return ''
			}
    },
    sign() {
      console.log("-------------------------------")
      return getSign();
    },
	},
	methods: {
    beforeUpload(file){
      //判断图片格式
        if(file.type == 'image/gif' || file.type == 'image/jpg' || file.type=='image/png' || file.type == 'image/jpeg'){
          if(this.imagelist.length>=4){
              this.$message({
                type: "error",
                message: "最多上传4张图片"
              });
              return false;
          }
        }else{
          this.$message.error('请上传正确的图片格式');
          return false
        }
      // 判断图片大小
        var _this = this
        let imgCallback = new Promise((resolve,reject)=>{
          var img = new Image()
          var reader = new FileReader()
          var canvas = document.createElement("canvas") 
          reader.onload = function(e){
            img.src = e.target.result
          } 
          img.onload = function (e){
            var width = img.width
            var height = img.height
            if(width>=750 && height/width>=0.9 && height/width<=1.1){
              resolve(true)
            }else{
              _this.$message.error('为了保证浏览效果，请上传大于750px*750px的正方形图片')
              reject(false)
            }
          } 
          reader.readAsDataURL(file)
        })
        return imgCallback
    },
		uploadOnProgress(e,file){//开始上传
			console.log(e.percent,file)
			this.progress = Math.floor(e.percent)
		},
		uploadOnChange(file){
			console.log("——————————change——————————")
			// console.log(file)
			if(file.status == 'ready'){
				console.log("ready")
				this.pass = null;
				this.progress = 0;
			}else if(file.status == 'fail'){
				this.$message.error("图片上传出错，请刷新重试！")
			}
		},
    uploadOnSuccess(file){//上传附件
     var type = file.file.name.split('.')
      let pro = new Promise((resolve,rej)=>{
        console.log(JSON.parse(Cookies.get("sign")), "测试1111");
        var res = JSON.parse(Cookies.get("sign"));
        var timestamp = Date.parse(new Date()) / 1000;
        if(res.expire - 3 > timestamp){
          resolve(res);
        }else{
          this.$http.get('/apiservice/oss/getSign').then(res=>{
             Cookies.set("sign", JSON.stringify(res.data));
             resolve(res.data);
          })
        }
      })
      var that = this;
      pro.then(success=>{
        var data = success;
        var ossData = new FormData();
        var date = new Date();
        var s = date.getTime()
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        ossData.append("name", file.file.name);
        ossData.append(
          "key",
          data.dir + "/" + y + "/" + m + "/" + d + "/" + file.file.uid +'.'+type[type.length-1]
        );
        ossData.append("policy", data.policy);
        ossData.append("OSSAccessKeyId", data.accessid);
        ossData.append("success_action_status", 201);
        ossData.append("signature", data.signature);
        ossData.append("file", file.file, file.file.name);
        that.$http
          .post(data.host, ossData,{
            header:{
              "Content-Type": "multipart/form-data; boundary={boundary}"
            }
          })
          .then(res=>{
            var str = ossData.get("key")
            this.imagelist.push({url:str})
            console.log(this.imagelist,"this.imagelist------------")
          })
          .catch(error=>{
            var str = ossData.get("key")
            this.imagelist.push({url:str})
            console.log(this.imagelist,"this.imagelist------------")
          })
      })
		},
		uploadOnError(e,file){
			console.log("——————————error——————————")
			console.log(e)
			this.pass = false;
		},
		handleFileEnlarge(_url){//放大图片
			console.log(_url)
			if(_url){
				this.enlargeImage = _url;
				this.isEnlargeImage = !this.isEnlargeImage;
			}
		},
		handleFileName(file,i){//修改名字
			console.log(file,i)
			let that = this;
			this.$prompt("请输入新文件名：","提示：",{
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(({ value }) => {
				console.log(value)
				if(!value){
					return false;
				}
				//可添加ajax
				this.$message.success("操作成功")
				that.imagelist[i].name = value
			}).catch(() => {})
		},
		handleFileRemove(file,i){//删除图片
			console.log(file,i)
			if(!file.url){
				return false;
      }
      this.imagelist.splice(i,1)
			// let that = this;
			// this.$confirm('是否删除此附件？','提示',{
			// 	confirmButtonText: '确定',
			// 	cancelButtonText: '取消',
			// 	type: 'warning'
			// }).then(() => {
			// 	//可添加ajax
			// 	this.$message.success("删除成功")
			// 	this.$message({
			// 		type: 'success',
			// 		message: '删除成功',
			// 		onClose: () => {
			// 			that.imagelist.splice(i,1)
			// 		}
			// 	})
			// }).catch((meg) => console.log(meg))
		}
	}
}
</script>

<style>
*{
	box-sizing: border-box;
}
.img-list{
	overflow:hidden;
	width:100%;
}
.img-list .img-content{
  background-color: #fff;
	float:left;
	text-align:left;
	position:relative;
	display:inline-block;
	/* width:200px;
	height:200px; */
	padding:5px;
	margin:5px 20px 20px 0;
	border:1px solid #d1dbe5;
	border-radius:4px;
	transition:all .3s;
	box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
.img-list .img-upload{
	float:left;
	/* width:200px;
	height:270px; */
	display:table;
	text-align:center;
}
.img-upload .uploader .el-upload--picture-card{
  width: 112px;
  height: 112px;
  line-height: 112px;
  margin-top: 5px;
}
.img-list .uploader{
	width:100%;
	display:table-cell;
	vertical-align:middle;
}
.img-list .img-progress{
	text-align:center;
	padding-top:50px;
}
.img-list .img-content img{
	display:block;
	margin:0 auto;
	border-radius:4px;
}
.img-list .img-content .name{
	margin-top:10px;
}
.img-list .img-content .name>div{
	width:90%;
	text-overflow:ellipsis;
	overflow:hidden;
	height:25px;
	line-height:25px;
}
.img-list .img-content:hover .del,
.img-list .img-content:hover .layer{
	opacity:1;
}
.img-list .img-content .del,
.img-list .img-content .layer{
	opacity:0;
	transition:all .3s;
}
.img-list .img-content .del{
	position:absolute;
	bottom:10px;
	right:10px;
	color:#8492a6;
	cursor:pointer;
	font-size:1.1em;
}
.img-list .img-content .layer{
  line-height: 112px;
	position:absolute;
	left:0;
	right:0;
	top:0;
	height:112px;
	color:#fff;
	text-align:center;
	z-index:5;
	background-color:rgba(0,0,0,.4);
}
.img-list .img-content .layer i{
	font-size:1.6em;
	/* margin-top:80px; */
}
</style>