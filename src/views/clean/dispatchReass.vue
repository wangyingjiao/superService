<template>
    <div class="tableWarp">
        <el-table :data="reassList"  style="width: 100%" border>
            <el-table-column prop="headPic" label="头像" align="center">
                <template scope="scope">
                    <div>
                        <img class="head-image" :src="scope.row.headPic" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="sex" label="性别" align="center">
            </el-table-column>
            <el-table-column prop="phone" label="电话" align="center">
            </el-table-column>
            <el-table-column prop="jobNature" label="岗位性质" align="center">
            </el-table-column>
            <el-table-column prop="createDate" label="派单时间" align="center">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { staffList, addStaff, getStaff ,addMech,Reassignment,reassId} from "@/api/staff";
export default {
  name: "",
  data() {
    return {
        reassList:[
            {
                headPic:'http://openservice.oss-cn-beijing.aliyuncs.com/openservice/2017/12/29/%E5%A4%B4%E5%83%8F.jpg',
                name:'123',
                sex:'男',
                phone:'15711445668',
                jobNature:'全职',
                createDate:'2017-05-10'
            },
            {
                headPic:'http://openservice.oss-cn-beijing.aliyuncs.com/openservice/2017/12/29/%E5%A4%B4%E5%83%8F.jpg',
                name:'123',
                sex:'男',
                phone:'15711445668',
                jobNature:'全职',
                createDate:'2017-05-10'
            },
            {
                headPic:'http://openservice.oss-cn-beijing.aliyuncs.com/openservice/2017/12/29/%E5%A4%B4%E5%83%8F.jpg',
                name:'123',
                sex:'男',
                phone:'15711445668',
                jobNature:'全职',
                createDate:'2017-05-10'
            }
        ]
    }
  },
  methods:{
      reassClick(id){
          reassId({"orderId":id}).then(data=>{
              console.log(data,"-----")
          }).catch(error=>{
              console.log(error)
          })
      }
  },
  mounted(){
    //  console.log(this.$route.params.id,"this.$route.params")
    //  this.reassClick(this.$route.params.id)
  }
};
</script>

<style spend>
    .tableWarp{
        width: 100%;
        background: #ffffff;
        padding: 20px 30px;
    }
    .head-image{
        width: 50px;
        height: 50px;
        margin-top: 5px;
    }
    
</style>
