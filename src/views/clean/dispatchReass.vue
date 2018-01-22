<template>
    <div class="tableWarp">
        <!-- 表格开始 -->
        <el-table :data="reassList"  style="width: 100%" border>
            <el-table-column prop="headPic" label="头像" align="center">
                <template scope="scope">
                    <div>
                        <img class="head-image" :src="imgSrc+scope.row.headPic+picWidth60" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="techName" label="姓名" align="center">
            </el-table-column>
            <el-table-column label="性别" align="center">
                <template scope="scope">
                    <span class="fontSize12" v-if="scope.row.techSex =='male'">男</span>
                    <span class="fontSize12" v-if="scope.row.techSex =='female'">女</span>						
                </template>                
            </el-table-column>
            <el-table-column prop="techPhone" label="电话" align="center">
            </el-table-column>
            <el-table-column label="岗位性质" align="center">
                <template scope="scope">
                    <span class="fontSize12" v-if="scope.row.jobNature =='part_time'">兼职</span>
                    <span class="fontSize12" v-if="scope.row.jobNature =='full_time'">全职</span>					
                </template>                
            </el-table-column>
            <el-table-column prop="createDate" label="派单时间" align="center">
            </el-table-column>
        </el-table>
        <!-- 表格结束 -->
    </div>
</template>

<script>
import {reassId} from "@/api/order";
export default {
  name: "",
  data() {
    return {
        reassList:[]
    }
  },
  methods:{
      //列表获取
      reassClick(id){
          var obj={
              orderId:id
          }
          reassId(obj).then(res=>{
            if(res.data.code === 1){
                this.reassList=res.data.data
            }              
          }).catch(res=>{

          })
      }
  },
  mounted(){
    var orderId=window.localStorage.getItem("orderId1")
    if(this.$route.query.id == undefined){
      this.reassClick(orderId)
    }else{
      this.reassClick(this.$route.query.id)
    }      
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
