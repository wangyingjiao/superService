<template>
	<div class="img-list">
		<div v-for="(item,index) in imgSrcUpload" :key="index">
		 <el-upload
					class="avatar-headPic img-content"
					:action="imgSrc"
					:show-file-list="false"
					:before-upload="beforeUpload"
					:http-request="(file)=>uploadOnSuccess(file,index)"
					>
					<img v-if="item!=''" :src="imgSrc+item+picWidth100">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					<div v-if="item" class="layer">
						<i @click="handleFileRemove($event,item,index)" class="el-icon-delete"></i>
					</div>
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
			imgSrcUpload:['','','',''],
			imgSrcUpload1:'',
			imgSrcUpload2:'',
			imgSrcUpload3:'',
			progress: 0,//上传进度
			pass: null,//是否上传成功
      isEnlargeImage: false,//放大图片
      imgFlag:true,
      enlargeImage: '',//放大图片地址
      imagelist:[],
			params: {
				action: 'http://jsonplaceholder.typicode.com/posts/',
				data: {}
      },
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
      return getSign();
    },
  },
  watch:{
    piclist:{
      immediate: true,
       handler(val, oldval) {
				 val.map((item,index)=>{
					 this.$set(this.imgSrcUpload,index,item)
				 })
         this.imagelist = val
         if(val.length>3){
           this.imgFlag = false
         }else{
           this.imgFlag = true
         }
       },
       deep: true
    }
  },
  props:[
    'piclist',
    'type',
    'min',
    'max'
  ],
	methods: {
    uploadOnProgress(e,file){//开始上传
			this.progress = Math.floor(e.percent)
		},
    beforeUpload(file){
      //判断图片格式
        if(file.type == 'image/gif' || file.type == 'image/jpg' || file.type=='image/png' || file.type == 'image/jpeg'){
          // if(this.imagelist.length>=4){
          //     this.$message({
          //       type: "error",
          //       message: "最多上传4张图片"
          //     });
          //     return false;
          // }
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
            var {min,max} = _this
            if(width >= 750 && height/width >= min && height/width <= max){
              resolve(true)
            }else{
              _this.$message.error('上传图片不符合要求')
              reject(false)
            }
          } 
          reader.readAsDataURL(file)
        })
        return imgCallback
    },
		uploadOnChange(file){
			if(file.status == 'ready'){
				this.pass = null;
				this.progress = 0;
			}else if(file.status == 'fail'){
				this.$message.error("图片上传出错，请刷新重试！")
			}
		},
		uploadOnSuccess(file,index){//上传附件
     var type = file.file.name.split('.')
      let pro = new Promise((resolve,rej)=>{
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
						that.$set(that.imgSrcUpload,index,str)
            that.$emit('imgclick',that.imgSrcUpload)
          })
          .catch(error=>{
						this.$message.error('上传失败')
						return false
          })
      })
		},
		uploadOnError(e,file){
			this.pass = false;
		},
		handleFileEnlarge(_url){//放大图片
			if(_url){
				this.enlargeImage = _url;
				this.isEnlargeImage = !this.isEnlargeImage;
			}
		},
		handleFileName(file,i){//修改名字
			let that = this;
			this.$prompt("请输入新文件名：","提示：",{
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(({ value }) => {
				if(!value){
					return false;
				}
				//可添加ajax
				this.$message.success("操作成功")
				that.imagelist[i].name = value
			}).catch(() => {})
		},
		handleFileRemove(e,file,index){//删除图片
			e.stopPropagation()
			this.$set(this.imgSrcUpload,index,'')
      this.$emit('imgclick',this.imgSrcUpload)
		}
  },
}
</script>

<style>
.upload-demo .avatar-headPic .el-upload--text{
	width: 100%;
	height: 100%;
}
.upload-demo .avatar-headPic .avatar-uploader-icon{
	line-height: 1;
	border: none;
	font-size: 20px;
	width: 20px;
	height: 20px;
	color: #8c939d;
}
#diatable	.el-form-item__content{
	line-height: 0;
}
/* *{
	box-sizing: border-box;
} */
.el-icon-delete{
	cursor: pointer;
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
	width:110px;
	height:112px;
	line-height:110px;
	text-align: center;
	padding:5px;
	margin:0px 20px 0px 0;
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
	width: 110px;
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