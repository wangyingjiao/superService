<template>
      <div class="addorder-container"> 
          <div @click="btnTime" class="btnTime">{{timeValue}}
            <i v-on:mouseover.prevent="iconTime = false" v-if="iconTime"  class="el-icon-time iCon"></i>
            <i @click="iconRem" v-on:mouseover.prevent="iconTime = true" v-on:mouseout.prevent="iconTime = true" v-if="!iconTime" class="el-icon-close iCon"></i>
          </div>
          <!-- <el-collapse-transition> -->
            <div class="timeList" v-if="timeShow">
              <ul>
                <li v-for="(item,index) in TimePicker" :key="index">
                    <input :class="[{'inputBtnIndex':timeClassId==index},'inputBtn']" :disabled='startTimeArr.indexOf(item)>-1' type="button" :value="item" @click="timePickerFous(item,index)">
                </li>
              </ul>
            </div>
          <!-- </el-collapse-transition> -->
        <!-- <el-upload
          action="http://openservice.oss-cn-beijing.aliyuncs.com"
          list-type="picture-card"
          :on-change="handPic"
          :on-remove="handleRemovePic"
          :auto-upload="false"
          ref="upload"
          :http-request="(val)=>picUpload(val)" 
          > 
          <i class="el-icon-plus"></i>
        </el-upload> -->
     
        <!-- <button @click="open">上传</button> -->
      </div>
</template>

<script>
export default {
  data() { 
    return {
      timeShow:false,
      iconTime:true,
      startTime:'08:00',
      timeClassId:null,
      endTime:'16:30',
      timeAee:[],
      timeValue:'',
      TimePicker :[
        '00:00',
        '00:30',
        '01:00',
        '01:30',
        '02:00',
        '02:30',
        '03:00',
        '03:30',
        '04:00',
        '04:30',
        '05:00',
        '05:30',
        '06:30',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30',
        '24:00',
      ]
    };
  },
  computed:{
    startTimeArr(){
      var arr = []
      var startTime = this.startTime
      var endTime = this.endTime
      var TimePicker_i = this.TimePicker
      for(var i = 0;i<TimePicker_i.length;i++){
        if(this.stringTime(TimePicker_i[i])*1<this.stringTime(startTime)*1 || this.stringTime(endTime)*1 < this.stringTime(TimePicker_i[i])*1){
          this.timeAee.push(TimePicker_i[i])
        }
      }
      return this.timeAee
    },
  },
  methods:{
    iconRem(){
      this.timeValue = '';
      this.timeClassId = null;
    },
    btnTime(){
      this.timeShow = !this.timeShow
    },
    timePickerFous(item,index){
      this.timeValue = item
      this.timeClassId = index
      this.timeShow = false
    },
    stringTime(time){
        var s = '';
        var hour = time.split(':')[0];
        var min = time.split(':')[1];
        s = Number(hour*3600) + Number(min*60)
        return s;
    }
  }
}
// import Cookies from "js-cookie";
    // import { getSign } from "@/api/sign";

    // export default {
    //   data() { 
    //     return {
    //       testvalue:'yes',
    //       value:'ddeeeeeeeeeeeee月月儿科可',
    //       picList:[],
    //       testArr:[],
    //       dialogVisible:false,
    //       dialogImageUrl:'',
    //       picFile:[]		
    //     };
    //   },
    //   methods: {
    //     open(){
    //       this.$refs.upload.submit();
    //     },
    //     handPic(file,fileList) {
    //      if (file.raw.type == 'image/gif' || file.raw.type=='image/jpg' || file.raw.type=='image/png' || file.raw.type=='image/jpeg') {
    //           var date = new Date();
    //           var y = date.getFullYear();
    //           var m = date.getMonth() + 1;
    //           var d = date.getDate();
    //           var src = this.sign.dir + "/" + y + "/" + m + "/" + d + "/" + file.name;
    //           if(fileList.length>4){
    //           this.$message({
    //             type: "warning",
    //             message: "最多上传4张图片"
    //             });
    //           fileList.splice(fileList.indexOf(file),1)
    //         }
    //       }else{
    //         fileList.splice(fileList.indexOf(file),1)
    //          this.$message.error('请上传正确的图片格式');
    //          return false
    //       }
    //     },
    //     handleRemovePic(file,fileList) {
    //         fileList.splice(fileList.indexOf(file),0)
    //     },
    //     picUpload(file) {
    //         let pro = new Promise((resolve, rej) => {
    //         var res = JSON.parse(Cookies.get("sign"));
    //         var timestamp = Date.parse(new Date()) / 1000;
    //           if (res.expire - 3 > timestamp) {
    //             resolve(res);
    //           } else {
    //             this.$http.get("/apiservice/oss/getSign").then(res => {
    //               Cookies.set("sign", JSON.stringify(res.data));
    //               resolve(res.data);
    //             });
    //           }
    //         });
    //         var that = this;
    //         pro.then(success => {
    //             var data = success;
    //             var ossData = new FormData();
    //             var date = new Date();
    //             var s = date.getTime()
    //             var y = date.getFullYear();
    //             var m = date.getMonth() + 1;
    //             var d = date.getDate();
    //             ossData.append("name", file.file.name);
    //             ossData.append(
    //               "key",
    //               data.dir + "/" + y + "/" + m + "/" + d + "/" + file.file.uid +'.jpg'
    //             );
    //             ossData.append("policy", data.policy);
    //             ossData.append("OSSAccessKeyId", data.accessid);
    //             ossData.append("success_action_status", 201);
    //             ossData.append("signature", data.signature);
    //             ossData.append("file", file.file, file.file.name);
    //             that.$http
    //               .post(data.host, ossData, {
    //               headers: {
    //               "Content-Type": "multipart/form-data; boundary={boundary}"
    //               }
    //             })
    //             .then(res => {
    //               this.testArr.push(ossData.get("key"));
    //             })
    //             .catch(error => {
    //             });
    //         });
    //     },
    //   },
    //   computed: {
    //     sign: function() {
    //       return getSign();
    //     }
    //   },
    //   mounted() {}
// };
</script>
<style   scoped>
.addorder-container{
  width: 15%;
}
li{
  list-style: none;
}
.timeList{
  width: 100%;
  margin:5px 0;
  border:1px solid #d1dbe5;
  box-shadow:0 2px 6px #ccc;
  background: #fff;
  border-radius:2px;
  line-height: 20px;
  height: 185px;
  overflow: hidden;
  overflow-y: auto;
}

.timeList ul,.timeList ul li,.timeList ul li input{
  width: 100%;
}
.inputBtn{
  text-align: left;
  background-color:#e4e8f1;
  cursor:pointer;
  box-sizing: border-box;
  font-size: 14px;
  padding:15px 20px;
  border: none;
  background: #fff;
}
.inputBtn:hover{
  background: #eef1f6;
}
.inputBtnIndex{
  color: #fff;
  background: #20a0ff !important;
}
.iCon{
  font-size: 14px;
  color:#bfcbd9;
  float: right;
  line-height: 30px;
  cursor: pointer;
}
.btnTime{
  border: 1px solid #bfcbd9;
  box-sizing:border-box;
  height:36px;
  width: 100%;
  line-height: 30px;
  background: #fff;
  outline: 0;
  padding: 3px 10px ;
  transition:border-color .2s cubic-bezier(.645,.045,.355,1);
}
.btnTime:hover{
  border: 1px solid #000;
}
/* .flip-container {
  perspective: 1000;
}
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
.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;

  position: relative;
}

.front, .back {
  backface-visibility: hidden;

  position: absolute;
  top: 0;
  left: 0;
}

.front {
  z-index: 2;
}

.back {
  transform: rotateY(180deg);
} */
</style>