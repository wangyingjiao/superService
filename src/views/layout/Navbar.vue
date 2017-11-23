<template>
  <el-menu class="navbar" mode="horizontal">
    <div style="width:100%;float:left;background:#fff;position:relative">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <!-- <el-dropdown class="avatar-container" trigger="click">
		  <div class="avatar-wrapper">
			<i class="el-icon-caret-bottom"></i>
		  </div>
      
		  <el-dropdown-menu class="user-dropdown" slot="dropdown" v-show="show">
			<router-link class='inlineBlock' to="/">
			  <el-dropdown-item>
				首页
			  </el-dropdown-item>
			</router-link>
			<el-dropdown-item divided><span @click="logout" style="display:block;">退出</span></el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>	 -->
      <ul class="nav-ul">
        <li style="cursor: pointer;" @click="addpage">
          <div>+</div>
          <div>新增</div>
        </li>
        <li>
          <div>
            <img src="../../../static/icon/客户管理1.png" alt="">
          </div>
          <div>李四</div>
        </li>
        <li style="cursor: pointer;" @click="outhome">
          <div>
            <img src="../../../static/icon/客户管理1.png" alt="">
          </div>
          <div>退出</div>
          <div class="nar-home" style="height:80px;" v-show="flag">
            <router-link to="/" tag="div">
                  <p>首页</p> 
              <p><span @click="logout" style="display:block;">退出</span></p>
            </router-link>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            
            
          </el-dropdown-menu>
        </li>
      </ul>
      <ul style="position:absolute;width: 50px;height: 200px;top:52px;z-index: 1;right: 240px;" class="nav-posi" v-show="show">
        <li>新增订单</li>
        <li>新增技师</li>
        <li>新增服务站</li>
        <li>新增员工</li>
        <li>新增客户</li>
      </ul>
    </div>

    <div style="width:100%;float:left;height:28px;line-height:28px;margin-top:2px;background:#fff;padding-left:10px;margin-left:0px;">
    </div>
    <tabs-view style="position:relative;margin-top:-59px;margin-left:20px;"></tabs-view>
  </el-menu>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import TabsView from './TabsView'
  import Hamburger from '@/components/Hamburger'

  export default {
    components: {
      TabsView,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ])
    },
    data() {
      return {
        show: false,
        flag:false
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
      outhome(){
        this.flag=!this.flag  
      },
      addpage(){
        this.show=!this.show  
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
 *{
   margin: 0px;
   padding: 0px;
 }
  .navbar {
    height: 88px;
    line-height: 88px;
    border-radius: 0px !important;
    margin-bottom: 20px;
    background: #eef1f6;
    .hamburger-container {
      line-height: 50px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
   
  }

  .nav-ul {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: flex-end;
  }

  .nav-ul li {
    display: flex;
    margin: 0 20px;
  }

  .nav-ul li div {
    height: 50px;
    margin: 0 5px;
    line-height: 50px;
  }

  .nav-posi {
    // border: 1px solid;
    width: 100px;
  }

  .nav-posi>li {
    background: #f3f1f1;
    height: 40px;
    width: 100px;
    text-align: center;
    line-height: 40px;
     cursor: pointer; 
  }
  .nar-home{
    position: absolute;
    background:#fff;
    right: 20px;
    top: 52px;
    bottom: 0px;  
    z-index: 1;
    cursor: pointer;  
  }
  .nar-home p{
    width: 80px;
    height: 40px;
    line-height: 30px;
    // background: red;
    text-align: center;
  }
   .nar-home p:nth-child(1){
     border-bottom: 1px solid #f3f1f1;
   }
   
   .nar-home p:hover{
     color: red;
   }

   .nav-posi>li:hover{
     color: red;
   }




</style>
