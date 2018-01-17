<template>
  <div class="dashboard-container">
    <!-- <div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition enter-active-class="animated bounceInLeft" leave-active-class="animated flipInX">
    <p v-if="show">hello</p>
  </transition>
</div> -->
    <div class='hollebg'>
      
      <img src="../../../static/icon/hello(2).png" alt="">
      </div>  
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "dashboard",
  data(){
    return{
      show: true
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
  .hollebg {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
