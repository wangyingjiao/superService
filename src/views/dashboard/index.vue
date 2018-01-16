<template>
  <div class="dashboard-container">
    <div class='hollebg'>
      
      <img src="../../../static/icon/holle.png" alt="">
      </div>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  width: 100%;
   height: 100%;
 .hollebg{
   width: 100%;
   height: 100%;
   img{
     width: 100%;
     height: 100%;
   }
 }
}
</style>
