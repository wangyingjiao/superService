<template>
    <el-input
            disabled
            v-bind:value="value"
            v-on:change="$emit('input', $event.target.value)">
            <el-button @click="minus" slot="prepend"><i class="el-icon-minus"></i></el-button>
            <el-button @click="pius" slot="append"><i class="el-icon-plus"></i></el-button>
            </el-input>
</template>
<script>
export default {
  name: "inputNum",
  data() {
    return {};
  },
  props: ['text','value'],
  created() {
  },
  methods: {
      minus(){
     this.$emit('input', this.value-1)
    //  console.log($event.target.value)
      },
      pius(){
         this.$emit('input', this.value+1)
      }
  }
};
</script>
<style>
</style>
