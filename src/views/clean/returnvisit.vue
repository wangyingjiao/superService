<template>
    <div class="addorder-container"> 
         <el-upload
            action="http://openservice.oss-cn-beijing.aliyuncs.com"
            list-type="picture-card"
            :before-upload="handPic"
            :on-remove="handleRemovePic"
            :file-list="picList"
            :http-request="picUpload"            
            >                         
            <i class="el-icon-plus"></i>
          </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import { getSign } from "@/api/sign";



export default {
  data() { 
    return { 
      picList:[],
      dialogVisible:false,
      dialogImageUrl:'',
      picFile:[]		
    };
  },
  methods:{
    handPic(file) {
      if (file.type == 'image/gif' || file.type=='image/jpg' || file.type=='image/png' || file.type=='image/jpeg') {
        this.imgFlag = true
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var src = this.sign.dir + "/" + y + "/" + m + "/" + d + "/" + file.name;
        console.log(this.picFile,"this.picFile------")
        if (this.picFile.length >= 2) {
          this.$message({
            type: "warning",
            message: "最多上传4张图片"
          });
          return false;
        }
      }else{
        this.imgFlag = false
        this.$message.error('请上传正确的图片格式');
        return false
      }
      //服务图片
      // console.log(file, "上传前");
      // console.log(this.picFile);
    },
    handleRemovePic(file,fileList) {
      alert("dwadawd")
      //删除服务图片
      // console.log(fileList,'文件');
      // console.log(file, "删除一张图片");
      // console.log(this.picFile,'imgtext')
      // console.log(this.picList,'filelist')
      if(this.imgFlag){
        var str = "";
        var index = file.url.lastIndexOf("/");
        str = file.url.substring(index + 1, file.url.length);
        var src = ''
        if (file.name != undefined) {
          src = file.name;
        } else {
          src = str;
        }
        console.log(src,'src');
        let newarr = []
        for(var i = 0;i<this.picFile.length;i++){
          var index = this.picFile[i].lastIndexOf("/");
          var newstr = ''
          newstr = this.picFile[i].substring(index + 1, this.picFile[i].length);
          newarr.push(newstr)
        }
        console.log(newarr,'截取')
        var delIndex = newarr.indexOf(src)
        console.log(delIndex,"delIndex-----")
        if(delIndex == -1){

        }else{
          this.picFile.del(delIndex);         
        }
        console.log(delIndex,"delIndex------")
        // console.log(newarr,src,"newarr---------------------------")
        // console.log(delIndex,'删除图片的下标')
      }else{
        return false
      }
      // console.log(this.picFile);
    },
    picUpload(file) {
      // 图片上传
      let pro = new Promise((resolve, rej) => {
        console.log(JSON.parse(Cookies.get("sign")), "测试1111");
        var res = JSON.parse(Cookies.get("sign"));
        var timestamp = Date.parse(new Date()) / 1000;
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
        //this.ossData = ossData;
        // console.log(ossData.get("name"));
        // console.log(ossData.get("key"));
        // console.log(that.$http,"that.$http")
          that.$http
            .post(data.host, ossData, {
              headers: {
                "Content-Type": "multipart/form-data; boundary={boundary}"
              }
            })
            .then(res => {
              console.log(this.picList);
              this.picFile.push(ossData.get("key"));
              console.log(this.picFile, "picfile");
            })
            .catch(error => {
              console.log('错误-------------上传图片失败--')
              this.picFile.push(ossData.get("key"));
              console.log(error, "错误");
            });
      });
    },
  },
  computed: {
    sign: function() {
      console.log("-------------------------------")
      return getSign();
    },
  },
  mounted() {

  }
};
</script>
<style   scoped>

</style>