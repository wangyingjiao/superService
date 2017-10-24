<template>
    <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse">
      <sidebar-item :routes='this.menu'></sidebar-item>
    </el-menu>
</template>


<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  data(){
    return {
      menu:[]
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted(){
    this.menu=JSON.parse(sessionStorage.getItem("menu"));
  }
}
</script>
