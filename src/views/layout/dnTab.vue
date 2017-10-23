<template>
   <div class="dn-tabs is-closable" :class="[type?type:'']">
     <slot></slot>
     <a href="javascript:;" class="el-tag__close el-icon-close" v-if="closable" @click="handleClose"></a>
   </div>
</template>
<style scope lang="scss">
  a:hover{
    color:#20a0ff;
  }
  .dn-tabs{
    padding: 0 16px;
    margin-top:5px;
    height: 45px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    color: #8391a5;
    position: relative;
    border: 1px solid #d1dbe5;
    border-bottom-color: #fff;
    border-radius: 4px 4px 0 0;

  }
  .primary{
    border: 1px solid #20a0ff;
    border-bottom-color: #fff;
    color:#20a0ff
  }


</style>
<script>

    export default{
       props: {
          type: String,
          closable: Boolean,
          name: String
        },
       methods:{
        handleClose(event){
          this.$emit('close',event)
        }
       }

    }
</script>
