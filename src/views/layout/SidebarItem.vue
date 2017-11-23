<template>
  <div>
    <!-- <template v-for="item in menu">
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        
        <template slot="title">
           {{item.name}}
           
        </template>
        <template v-for="child in item" v-if='!child.hidden'>
          <router-link v-else class="menu-indent" :to="item.href>
            <el-menu-item :index="item.path+'/'+child.path">
                 123
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template> -->

    <div class="slde-bcak-log">
       <!-- <img src="../../../static/icon/logo.png" alt=""> -->
    </div>
     <el-submenu index="1">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <span class="side-span"> <img src="../../../static/icon/员工管理1.png" alt=""></span>
          <span>员工管理</span>
        </template>
        <router-link to="/sys/user/index">
          <el-menu-item style="padding-left:60px" index="1-1">员工列表</el-menu-item>
        </router-link>
        <router-link to="/sys/role/list">
          <el-menu-item style="padding-left:60px" index="1-2">岗位设置</el-menu-item>
        </router-link>      
              
        
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <!-- <img src="../../../static/icon/基础管理1.png" alt=""> -->
          <span class="side-span"> <img src="../../../static/icon/基础管理1.png" alt=""></span>
          <span>基础管理</span>
        </template>     
        
        <router-link to="/base/mechanism">
          <el-menu-item style="padding-left:60px" index="2-1">服务机构</el-menu-item>
        </router-link>
        <router-link to="/base/site">
          <el-menu-item style="padding-left:60px" index="2-2">服务站</el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <!-- <img src="../../../static/icon/人员管理1.png" alt=""> -->
          <span class="side-span"> <img src="../../../static/icon/人员管理1.png" alt=""></span>
          <span>服务技师管理</span>
        </template>  
         <router-link to="/technician/techni">
          <el-menu-item style="padding-left:60px" index="1-5">技师管理</el-menu-item>
        </router-link>    
        <router-link to="/technician/holiday">
          <el-menu-item style="padding-left:60px" index="1-5">休假管理</el-menu-item>
        </router-link> 
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <!-- <img src="../../../static/icon/服务管理1.png" alt=""> -->
          <span class="side-span"> <img src="../../../static/icon/服务管理1.png" alt=""></span>
          <span>服务管理</span>
        </template>     
        <router-link to="/service/class">
          <el-menu-item style="padding-left:60px" index="1-5">服务分类</el-menu-item>
        </router-link>
        <router-link to="/service/project">
          <el-menu-item style="padding-left:60px" index="1-5">服务项目</el-menu-item>
        </router-link>
        <router-link to="/service/skill">
          <el-menu-item style="padding-left:60px" index="1-5">技能管理</el-menu-item>
        </router-link> 
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
        <!-- <img src="../../../static/icon/保洁1.png" alt=""> -->
        <span class="side-span"> <img src="../../../static/icon/保洁1.png" alt="" class="side-img"></span>
          <span>保洁订单</span>
        </template>     
        <router-link to="/clean/ordermanage">
          <el-menu-item style="padding-left:60px" index="1-5">订单管理</el-menu-item>
        </router-link>
        <router-link to="/clean/addorder">
          <el-menu-item style="padding-left:60px" index="1-5">新增订单</el-menu-item>
        </router-link>
        <router-link to="/clean/dispatchmanage">
          <el-menu-item style="padding-left:60px" index="1-5">派单管理</el-menu-item>
        </router-link>
        <router-link to="/clean/returnvisit">
          <el-menu-item style="padding-left:60px" index="1-5">回访记录</el-menu-item>
        </router-link>		
      </el-submenu>	  
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
  display: block;
  text-indent: 10px;
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

