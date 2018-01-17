<template>
    <div class="addorder-container"> 
        <el-upload
            action="http://openservice.oss-cn-beijing.aliyuncs.com"
            list-type="picture-card"
            :on-change="handPic"
            :on-remove="handleRemovePic"
            :auto-upload="false"
            ref="upload"
            :http-request="(val)=>picUpload(val)"            
            >            
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <button @click="open">上传</button>
        <div class="flipy">上传</div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import { getSign } from "@/api/sign";



export default {
  data() { 
    return { 
      picList:[],
      testArr:[],
      dialogVisible:false,
      dialogImageUrl:''     		
    };
  },
  methods:{
    open(){
      this.$refs.upload.submit();
    },
     handPic(file,fileList) {
      // if (file.type == 'image/gif' || file.type=='image/jpg' || file.type=='image/png' || file.type=='image/jpeg') {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var src = this.sign.dir + "/" + y + "/" + m + "/" + d + "/" + file.name;
        if(fileList.length>4){
          this.$message({
            type: "warning",
            message: "最多上传4张图片"
          });
          fileList.splice(fileList.indexOf(file),1)
        }
    },
      handleRemovePic(file,fileList) {
        fileList.splice(fileList.indexOf(file),0)
      },
      picUpload(file) {
        console.log(file.file.uid)
        // 图片上传    
        let pro = new Promise((resolve, rej) => {
          console.log(JSON.parse(Cookies.get("sign")), "测试1111");
          var res = JSON.parse(Cookies.get("sign"));
          var timestamp = Date.parse(new Date()) / 1000;
          //console.log(timestamp)
          if (res.expire - 3 > timestamp) {
            console.log("签名没过期");
            resolve(res);
          } else {
            this.$http.get("/apiservice/oss/getSign").then(res => {
              console.log(res, "签名过期");
              Cookies.set("sign", JSON.stringify(res.data));
              resolve(res.data);
            });
          }
        });
        var that = this;
        pro.then(success => {
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
            data.dir + "/" + y + "/" + m + "/" + d + "/" + s +'.jpg'
          );
          ossData.append("policy", data.policy);
          ossData.append("OSSAccessKeyId", data.accessid);
          ossData.append("success_action_status", 201);
          ossData.append("signature", data.signature);
          // 添加文件
          ossData.append("file", file.file, file.file.name);
            that.$http
              .post(data.host, ossData, {
                headers: {
                  "Content-Type": "multipart/form-data; boundary={boundary}"
                }
              })
              .then(res => {
                this.testArr.push(ossData.get("key"));
                console.log(this.testArr,"this.testArr------")  
                console.log('aaaaa')
              })
              .catch(error => {
                console.log('错误-------------上传图片失败--')
                // this.picFile.push(ossData.get("key"));
                console.log(error, "错误");
              });
        });
      },
  },
  computed: {
    sign: function() {
      return getSign();
    },
  },
  mounted() {

  }
};
</script>
<style   scoped>
/*水平翻转*/
.flipx {
    -moz-transform:scaleX(-1);
    -webkit-transform:scaleX(-1);
    -o-transform:scaleX(-1);
    transform:scaleX(-1);
    /*IE*/
    filter:FlipH;
}
/*垂直翻转*/
.flipy {
    -moz-transform:scaleY(-1);
    -webkit-transform:scaleY(-1);
    -o-transform:scaleY(-1);
    transform:scaleY(-1);
    /*IE*/
    filter:FlipV;
}
/*水平翻转*/
.flipx { transform: rotateY(180deg); }

/*垂直翻转*/
.flipy { transform: rotateX(180deg); }
</style>