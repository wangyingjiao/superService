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
     
        <button @click="open">上传</button>
      </div>
</template>

<script>
import Cookies from "js-cookie";
import { getSign } from "@/api/sign";

export default {
  data() { 
    return {
      testvalue:'yes',
      value:'ddeeeeeeeeeeeee月月儿科可',
      picList:[],
      testArr:[],
      dialogVisible:false,
      dialogImageUrl:'',
      picFile:[]		
    };
  },
  methods: {
    open(){
      this.$refs.upload.submit();
    },
    handPic(file,fileList) {
     if (file.raw.type == 'image/gif' || file.raw.type=='image/jpg' || file.raw.type=='image/png' || file.raw.type=='image/jpeg') {
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
      }else{
        fileList.splice(fileList.indexOf(file),1)
         this.$message.error('请上传正确的图片格式');
         return false
      }
    },
    handleRemovePic(file,fileList) {
        fileList.splice(fileList.indexOf(file),0)
    },
    picUpload(file) {
        // 图片上传 
        let pro = new Promise((resolve, rej) => {
        var res = JSON.parse(Cookies.get("sign"));
        var timestamp = Date.parse(new Date()) / 1000;
          if (res.expire - 3 > timestamp) {
            resolve(res);
          } else {
            this.$http.get("/apiservice/oss/getSign").then(res => {
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
              data.dir + "/" + y + "/" + m + "/" + d + "/" + file.file.uid +'.jpg'
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
            })
            .catch(error => {
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