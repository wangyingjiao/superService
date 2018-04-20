<template>
        <el-select :class="[{'search':flag},{'schedule':schedule}]" clearable filterable  v-model="orgId" placeholder="选择机构" @change="orgChange">
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
            "schedule"
        ],
        methods:{
            orgChange(){
                this.$emit("orgsearch",this.orgId)
            },
            listDataAll(){
                return new Promise((res,rej)=>{
                    listDataAll({}).then(data=>{
                        let _data = data.data.data.list
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
                            this.orgId = _data[0].id
                        }else{
                        }
                        this.orgNameList = _data
                        res(this.orgNameList)
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