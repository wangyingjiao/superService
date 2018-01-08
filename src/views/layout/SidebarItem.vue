<template>
  <div>
    <div class="slde-bcak-log">
       <!-- <img src="../../../static/icon/logo.png" alt=""> -->
    </div>    
     <template >
        <el-submenu v-for="item in menu" :index="item.id" :key="item.id">        
              <template slot="title">
                <img v-if="item.icon != ''" :src="'../../../static/icon/'+item.icon+'.png'" alt="" class="side-img">
                {{item.name}}          
              </template>          
              <el-menu-item v-for="child in item.subMenus" :index="child.id" :key="child.id">
                  <router-link  class="menu-indent" :to="{path:child.href}">
                    <span style="display:inline-block;width:160px;">•&nbsp;&nbsp;&nbsp;&nbsp;{{child.name}}</span>
                  </router-link>   
              </el-menu-item>               
        </el-submenu>
    </template>     	  
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  data(){
    return{}
  },
  computed:{
      menu:function(){
        return JSON.parse(localStorage.getItem('menu'))
      }
  },
  // created(){
  //   this.menu = JSON.parse(localStorage.getItem('menu'))
  //       console.log(this.menu,'11111111111111111111111111111111')
  // },
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

