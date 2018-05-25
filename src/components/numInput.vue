<template>
    <el-input
    class="inputNum"
            disabled
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
            >
            <el-button v-if="!minIsshow" class="butMin butDis" @click="dis" slot="prepend"><i class="el-icon-minus"></i></el-button>
            <el-button v-if="minIsshow" class="butMin " @click="minus" slot="prepend"><i class="el-icon-minus"></i></el-button>
            <el-button v-if="maxIsshow" class="butMax" @click="pius"  slot="append"><i class="el-icon-plus"></i></el-button>
            <el-button v-if="!maxIsshow" @click="dis" class="butMax butDis" slot="append"><i class="el-icon-plus"></i></el-button>
            </el-input>
</template>
<script>
export default {
  name: "inputNum",
  data() {
    return {
      minIsshow: false,
      maxIsshow: false
    };
  },
  watch: {},
  props: ["text", "value", "min", "max", "change"],
  mounted() {
    if (this.value) {
      this.minIsshow = true;
      this.maxIsshow = true;
      if (this.min != undefined) {
        if (this.value > this.min) {
          this.minIsshow = true;
        } else {
          this.minIsshow = false;
        }
      }
      if (this.max != undefined) {
        if (this.value < this.max) {
          this.maxIsshow = true;
        } else {
          this.maxIsshow = false;
        }
      }
    } else {
      this.minIsshow = false;
      this.maxIsshow = false;
    }
  },
  methods: {
    dis(val) {
      console.log(val);
    },
    minus() {
      this.maxIsshow = true;
      if (this.value - 1 <= this.min) {
        this.minIsshow = false;
      }
      this.$emit("input", this.value - 1);
      this.$emit("change", this.value - 1);
    },
    pius() {
      this.minIsshow = true;
      if (this.value + 1 >= this.max) {
        this.maxIsshow = false;
      }
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
