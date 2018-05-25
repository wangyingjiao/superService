<template>
    <el-input
    class="inputNum"
            disabled
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
            >
            <el-button v-if="value<=minNum " class="butMin butDis" @click="dis" slot="prepend"><i class="el-icon-minus"></i></el-button>
            <el-button v-if="value>minNum " class="butMin " @click="minus" slot="prepend"><i class="el-icon-minus"></i></el-button>
            <el-button v-if="value<maxNum " class="butMax" @click="pius"  slot="append"><i class="el-icon-plus"></i></el-button>
            <el-button v-if="maxNum<=value" @click="dis" class="butMax butDis" slot="append"><i class="el-icon-plus"></i></el-button>
            </el-input>
</template>
<script>
export default {
  name: "inputNum",
  data() {
    return {
      maxNum: 9999,
      minNum: -9999
    };
  },
  props: ["text", "value", "min", "max", "change"],
  created() {
    this.maxNum = this.max != undefined ? this.max : 9999;
    this.minNum = this.min != undefined ? this.min : -9999;
  },
  methods: {
    dis(val) {
      console.log(val);
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
.butDis {
  background-color: #eef1f6 !important;
}
.butDis:hover {
  background-color: #eef1f6 !important;
}
</style>
