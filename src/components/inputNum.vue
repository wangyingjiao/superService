<template>
    <el-input
    class="inputNum"
            disabled
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
            >
            <el-button v-if="value<=min " class="butMin butDis" @click="dis" slot="prepend"><i class="el-icon-minus"></i></el-button>
            <el-button v-if="value>min " class="butMin " @click="minus" slot="prepend"><i class="el-icon-minus"></i></el-button>
            <el-button v-if="value<max " class="butMax" @click="pius"  slot="append"><i class="el-icon-plus"></i></el-button>
            <el-button v-if="max<=value" @click="dis" class="butMax butDis" slot="append"><i class="el-icon-plus"></i></el-button>
            </el-input>
</template>
<script>
export default {
  name: "inputNum",
  data() {
    return {};
  },
  props: ["text", "value", "min", "max", "change"],
  created() {},
  methods: {
    dis(val){
       console.log(val)
    },
    minus() {
      this.$emit("input", this.value - 1);
      this.$emit("change", this.value - 1);
    },
    pius() {
      this.$emit("input", parseInt(this.value) + 1);
      this.$emit("change", parseInt(this.value) + 1);
    }
  }
};
</script>
<style >
.inputNum input {
  text-align: center;
}
.inputNum .el-input-group__append,
.inputNum .el-input-group__prepend {
  padding: 0 5px;
  overflow: hidden;
}
.butDis{
  background-color:#eef1f6 !important;
}
.butDis:hover{
  background-color:#eef1f6 !important;
}
</style>
