<template>
<div>1111111</div>
</template>

<script>
export default {
  name: "log",
  data() {
    return {};
  },
  created: function() {
    console.log(1);
  },
  mounted: function() {
    console.log(2);
  },
  activated: function() {
    console.log(3);
  },
  deactivated: function() {
    console.log(4);
  }
};
</script>
<style>
.btn_right {
  float: right;
  width: 100px;
}
.btn_left {
  width: 100px;
}
.ele-date {
  margin: 0 10px;
}
.bottom0 {
  margin-bottom: 0px;
}
.bgWhite {
  background-color: #ffffff;
  padding: 20px 20px 20px 20px;
}
.tool {
  width: 155px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
