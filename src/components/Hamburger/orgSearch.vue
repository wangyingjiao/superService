<template>
        <el-select :style="{'width':widths}" :class="[{'search':flag},{'schedule':schedule}]" 
                    :clearable="!flag" filterable  v-model="orgId" placeholder="选择机构" @change="orgChange">
            <el-option v-for="(item,index) in orgNameList" :key="index" :label="item.name" :value="item.id">
            </el-option>
      </el-select>
</template>

<script>
    import { listDataAll } from "@/api/tech"

    export default{
        data(){
            return{
                orgNameList:[],
                orgId:''
            }
        },
        props:[
            'searchorgid',
            "flag",
            "schedule",
            "refundflag",
            "widths"
        ],
        methods:{
            orgChange(){
                this.$emit("orgsearch",this.orgId)
            },
            listDataAll(){
                return new Promise((res,rej)=>{
                    listDataAll({}).then(data=>{
                        console.log(data,"datayyyyyyy")
                        let _data = data.data.data.list
                        if(data.data.code==1){
                            if(_data.length>0){
                                if(_data[0].id=='0'){
                                     _data.remove(_data[0])
                                }
                                if(_data[1]!==undefined){
                                    if(_data[1].id=='0'){
                                          _data.remove(_data[1])
                                          _data.remove(_data[0])
                                    }
                                }
                                if(this.refundflag!=undefined){
                                    if(this.refundflag){
                                        this.orgId = _data[0].id
                                    }
                                }else{
                                    this.orgId = _data[0].id
                                }
                            }else{
                            }
                            this.orgNameList = _data
                            res(this.orgNameList)
                        }else{

                        }
                    }).catch(error=>{
                        rej(error)
                        console.log(error,"error____+++++++")
                    })
                })
            }
        },
        computed:{
         
        },
        mounted(){
        }
    }
</script>

<style scoped>
    .schedule{
        width:15%;
        margin-right:1%;
    }
</style>