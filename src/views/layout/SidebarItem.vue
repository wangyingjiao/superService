<template>
  <div class="sidebar">
    <div class="slde-bcak-log">
       <!-- <img src="../../../static/icon/logo.png" alt=""> -->
    </div>
     <template>
        <el-submenu v-for="item in menu" :index="item.id" :key="item.id">        
              <template slot="title">
                
                <img v-if="item.icon != ''" :src="'../../../static/icon/'+item.icon+'.png'" alt="" class="side-img">
              
                {{item.name}}          
              </template>    
              <el-menu-item v-for="child in item.subMenus" :index="child.id" :key="child.id">
                  <router-link  class="menu-indent" :to="{path:child.href}">
                    <span style="display:inline-block;width:160px;">{{child.name}}</span>
                  </router-link>  
              </el-menu-item>         
        </el-submenu>
    </template>     	  
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    menu: {
      type: Array
    }
  },
  created() {
  },
  methods: {
    show() {
      console.log(this.$store.state.user.menu);
      console.log(this.menu);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.svg-icon {
  margin-right: 10px;
}
.side-span {
  display: inline-block;
  width: 23px;
  // height: 1px;
  text-align: right;
}
.side-img {
  width: 22px;
  margin-bottom: 5px;
  margin-right: 10px;
}
.slde-bcak-log {
  width: 160px;
  height: 50px;
  margin-left: 20px;
  background-image: url(../../../static/icon/logo.png);
  // background-size: 100%;
  background-repeat: no-repeat;
  background-position: left center;
}
.sidebar{
  width: 190px;
}
.sidebar .el-submenu {
  color: #A5B6C8;
  background-color:  #2f323e;
  }
.sidebar .el-submenu .el-submenu__title{
  color: #A5B6C8;
}
.el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title{
  color: #A5B6C8;
  background-color:  #2f323e;
}
.sidebar-container{
  background-color:#2f323e !important;
}
.el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
  background-color: #2f323e;
  color: #ffffff;
}
.el-menu--dark .el-submenu .el-menu .el-menu-item:hover{
  background-color: #2f323e;
}
.is-opened .el-submenu__title{
  color: #ffffff !important;
}
// .sidebar-wrapper .el-menu{
//   min-width: 90%;
// }
// .app-wrapper .sidebar-container[data-v-31373d3a] {
//     transition: all .28s ease-out;
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0px;
//     overflow: hidden;
//     overflow-y: scroll;
// }
.menu-indent span{
  padding-left: 32px;
}
</style>

