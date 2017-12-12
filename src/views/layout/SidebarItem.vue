<template>
  <div>
    <div class="slde-bcak-log">
       <!-- <img src="../../../static/icon/logo.png" alt=""> -->
    </div>    
     <template v-for="item in menu">
        <el-submenu :index="item.id">        
              <template slot="title">
                <img v-if="item.icon != ''" :src="'../../../static/icon/'+item.icon+'.png'" alt="" class="side-img">
                {{item.name}}          
              </template>          
              <el-menu-item v-for="child in item.subMenus" :index="child.id">
                  <router-link  class="menu-indent" :to="child.href"  >
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
  methods:{
    show(){
      console.log(this.$store.state.user.menu)
      console.log(this.menu)
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.svg-icon {
  margin-right: 10px;
}
.hideSidebar .menu-indent {
  
}
.side-span{
  display: inline-block;
  width: 23px;
  // height: 1px;
  text-align: right;
}
.side-img{
  margin-bottom: 5px;
}
.slde-bcak-log{
  width: 160px;
  height: 50px;
  margin-left:20px;
  background-image: url(../../../static/icon/logo.png);
  // background-size: 100%;
  background-repeat: no-repeat;
  background-position: left center; 
}
</style>

