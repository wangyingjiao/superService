<template>
    <div class="addorder-container"> 
        <div class="flip-container" v-on:mouse="this.classList.toggle('hover1');">
  <div class="flipper">
    <div class="front">
      <img src="http://img0.imgtn.bdimg.com/it/u=1060021971,3692248015&fm=27&gp=0.jpg" alt="">
    </div>
    <div class="back">
      背面内容
      <img src="http://img2.imgtn.bdimg.com/it/u=3561648708,880870854&fm=27&gp=0.jpg">
    </div>
  </div>
</div>
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
  methods: {
    open() {
      this.$refs.upload.submit();
    },
    handPic(file, fileList) {
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
    }
  },
  mounted() {}
};
</script>
<style   scoped>
.flip-container {
  perspective: 1000;
}
  /* flip the pane when hovered */
  .flip-container:hover .flipper, .flip-container.hover1 .flipper {
    transform: rotateY(180deg);
  }

.flip-container, .front, .back {
  overflow: hidden;
  width: 50px;
  height: 50px;
}
.front img,.back img{
  width: 100%;
}
/* flip speed goes here */
.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;

  position: relative;
}

/* hide back of pane during swap */
.front, .back {
  backface-visibility: hidden;

  position: absolute;
  top: 0;
  left: 0;
}

/* front pane, placed above back */
.front {
  z-index: 2;
}

/* back, initially hidden pane */
.back {
  transform: rotateY(180deg);
}
</style>