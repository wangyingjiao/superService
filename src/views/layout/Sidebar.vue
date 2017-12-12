<template>
  <el-menu mode="vertical" theme="dark" :default-active="$route.path">
    <sidebar-item  :menu="menu"></sidebar-item>
  </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
     routes() {
       return this.$router.options.routes
    },
    menu() {
      return this.$store.state.user.menu
    }
  },
  methods:{
     test(){
       console.log(this.$store.state.user.menu);
     }
  },
  mounted() {
  //this.test();
    
  }  
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
}
</style>
