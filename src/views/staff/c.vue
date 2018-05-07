<template>

  <div>
    <Layout class="margin1"></Layout>
    <div class="margin2">
      1111111
     <el-input></el-input>
     </div>
  </div>
</template>
<script>
import Layout from '../../views/layout/Layout'
export default {
  name: "log1",
  components:{
   Layout
  },
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
.margin2{
  margin-left: 300px;
}
</style>
