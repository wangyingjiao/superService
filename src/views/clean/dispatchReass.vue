<template>
    <div class="tableWarp">
        <!-- <el-table :data="tableData" stripe style="width: 100%" border>
            <el-table-column prop="headImage" label="头像" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名"  align="center"></el-table-column>
            <el-table-column prop="sex" label="性别"  align="center"></el-table-column>
            <el-table-column prop="telephone" label="电话"  align="center"></el-table-column>
            <el-table-column prop="jobNature" label="岗位性质"  align="center"></el-table-column>
            <el-table-column prop="time" label="派单时间"  align="center"></el-table-column>
        </el-table> -->
       <!-- <el-upload
            action="http://openservice.oss-cn-beijing.aliyuncs.com"
            list-type="picture"
            :file-list="picList"
            :http-request="picUpload"            
            >
            
            <i class="el-icon-plus"></i>
        </el-upload> -->
        <el-upload
            action="http://openservice.oss-cn-beijing.aliyuncs.com"
            list-type="picture-card"
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
export default{
    name:"",
    data(){
        return{
            dialogImageUrl: '',
            dialogVisible: false,
            picList: [],
            tableData:[
                {headImage:"123","name":"123","sex":"123","telephone":"123","jobNature":"123","time":"123"},
                {headImage:"123","name":"123","sex":"123","telephone":"123","jobNature":"123","time":"123"},
                {headImage:"123","name":"123","sex":"123","telephone":"123","jobNature":"123","time":"123"},
                {headImage:"123","name":"123","sex":"123","telephone":"123","jobNature":"123","time":"123"}
            ]
        }
    },
    methods:{
        picUpload(file) {
            // 图片上传
            let pro = new Promise((resolve, rej) => {
                // console.log(JSON.parse(Cookies.get("sign")), "测试1111");
                var res = JSON.parse(Cookies.get("sign"));
                var timestamp = Date.parse(new Date()) / 1000;
                if (res.expire - 3 > timestamp) {
                // console.log("签名没过期");
                resolve(res);
                } else {
                this.$http.get("/api/oss/getSign").then(res => {
                    // console.log(res, "签名过期");
                    Cookies.set("sign", JSON.stringify(res.data));
                    resolve(res.data);
                });
                }
            });
            // console.log(file,"-----------------file-__________")
            // console.log(pro,"___________________--")
            var that = this
            pro.then(success=>{
                var data = success;
                var ossData = new FormData();
                var date = new Date();
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                ossData.append("name", file.file.name);
                ossData.append(
                    "key",
                    data.dir + "/" + y + "/" + m + "/" + d + "/" + file.file.name
                )
                ossData.append("policy", data.policy);
                ossData.append("OSSAccessKeyId", data.accessid);
                ossData.append("success_action_status", 201);
                ossData.append("signature", data.signature);
                // 添加文件
                ossData.append("file", file.file, file.file.name);
                // console.log(success,"success-------")
                // console.log(success.host+"/"+ossData.get("key"),"----------------------")
                this.$http
                    .post(data.host,ossData,{
                        headers:{
                            "Content-Type": "multipart/form-data; boundary={boundary}"
                        }
                    })
                    .then(res=>{
                        this.picList.push(ossData.get("key"))
                    })
                    console.log(this.picList,"this.picList----")
            })
            // var that = this;
            // pro.then(success => {
            //     var data = success;
            //     var ossData = new FormData();
            //     var date = new Date();
            //     var y = date.getFullYear();
            //     var m = date.getMonth() + 1;
            //     var d = date.getDate();
            //     ossData.append("name", file.file.name);
            //     ossData.append(
            //     "key",
            //     data.dir + "/" + y + "/" + m + "/" + d + "/" + file.file.name
            //     );
            //     ossData.append("policy", data.policy);
            //     ossData.append("OSSAccessKeyId", data.accessid);
            //     ossData.append("success_action_status", 201);
            //     ossData.append("signature", data.signature);
            //     // 添加文件
            //     ossData.append("file", file.file, file.file.name);
            //     //this.ossData = ossData;
            //     console.log(ossData.get("name"));
            //     console.log(ossData.get("key"));

            //     that.$http
            //     .post(data.host, ossData, {
            //         headers: {
            //         "Content-Type": "multipart/form-data; boundary={boundary}"
            //         }
            //     })
            //     .then(res => {
            //         console.log(this.picList);
            //         this.picFile.push(ossData.get("key"));
            //         console.log(this.picFile, "picfile");
            //     })
            //     .catch(error => {
            //         console.log(error, "错误");
            //     });
            // });
            },
    },
    computed: {
        sign() {
            return getSign();
        },
        btnShow() {
            return this.$store.state.user.buttonshow;
        },
  },
}
</script>

<style spend>
    .tableWarp{
        width: 100%;
        background: #ffffff;
        padding: 20px 30px;
    }
    .el-upload-list__item is-ready{
        float: left !important;
    }
    .el-upload-list__item-name{
        display: none !important;
    }
    .el-upload-list__item{
        width: 0;
    }
</style>
