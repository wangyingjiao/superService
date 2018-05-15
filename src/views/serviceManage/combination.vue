<template>
    <div class="combinatuin">
        <slot name="title"></slot>
        <el-form 
                label-position="left" 
                :model="basicForm" 
                label-width="90px" 
                ref="basic" 
                :rules="basicRles"
                >
            <el-form-item label="服务类型：" prop="type">
            </el-form-item>
         </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                basicForm:{
                    type:''
                },
                basicRles:{
                    type:[
                        { required: true, message: "请输入项目名称", trigger: "blur" }
                    ]
                }
            };
        },
        watch: {},
        computed: {},
        components: {},
        methods: {},
        mounted(){},
    };
</script>
<style scoped>
    .combinatuin{
        padding: 0 20px;
    }
</style>

