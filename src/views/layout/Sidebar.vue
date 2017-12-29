<template>
  <el-menu ref="menu1" mode="vertical" theme="dark" :default-active="$route.path">
    <sidebar-item  :menu="menu"></sidebar-item>
  </el-menu>
</template>

<script>
import { Loading } from 'element-ui'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
     routes() {
       return this.$router.options.routes
    },
    menu() {
      let loadingInstance = Loading.service({fullscreen: true });
      if(this.$store.state.user.menu.length > 0 ){
          loadingInstance.close();
       }else{
          loadingInstance = Loading.service({fullscreen: true });  
       }     
       setTimeout(() => {
         loadingInstance.close();
       }, 1000);
      return this.$store.state.user.menu
    }
  },
  methods:{
  },
  mounted() {
   
  }  
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
}
</style>
