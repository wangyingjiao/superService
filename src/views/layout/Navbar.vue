<template>
  <el-menu class="navbar" mode="horizontal">
    <div style="width:100%;float:left;background:#fff;position:relative">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <ul class="nav-ul">
        <!-- <li style="cursor: pointer;">
          <div>+</div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              新增
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">新增订单</el-dropdown-item>
              <el-dropdown-item command="b">新增技师</el-dropdown-item>
              <el-dropdown-item command="c">新增服务站</el-dropdown-item>
              <el-dropdown-item command="d">新增员工</el-dropdown-item>
              <el-dropdown-item command="e">新增客户</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li> -->
        <li class="liBtn liUser">
          <img src="../../../static/icon/loginuser.png"><div>  &nbsp;&nbsp;{{username}}</div>
        </li>
        <li class="liBtn" style="cursor: pointer; margin-right:20px;padding:10px;"  @click="logout">
          
          <div class="logoutbtn"><i class="iconfont">&#xe60f;</i>&nbsp;&nbsp;退出</div>
          
        </li>
        <!-- <li class="liBtn">
          <el-dropdown @command="handleCommand" menu-align="start" >
            <span class="el-dropdown-link">
              <i class="iconfont">&#xe60f;</i>
              <span>退出</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li> -->
      </ul>
      
    </div>
    <tabs-view style="position:relative;    margin-left: -0px;background: #fff;margin-top: 2px;"></tabs-view>
  </el-menu>

</template>

<script>
import { mapGetters } from "vuex";
import TabsView from "./TabsView";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    TabsView,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"])
  },
  data() {
    return {
      flag: false,
      username: localStorage.getItem("name")
    };
  },
  methods: {
    handleCommand(command) {
      console.log(command, "点击时触发");
      if (command == "logout") {
        this.logout();
      }
    },
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
* {
  margin: 0px;
  padding: 0px;
}
.navbar {
  height: 88px;
  line-height: 88px;
  overflow: hidden;
  border-radius: 0px !important;
  margin-bottom: 12px;
  background: #eef1f6;
  overflow: hidden;
  .hamburger-container {
    line-height: 50px;
    height: 50px;
    float: left;
    padding: 0 15px;
  }
}

.nav-ul {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: flex-end;
}

.nav-ul li {
  cursor: default;
  display: flex;
  margin: 0 0px;
}

.nav-ul li div {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 3px;
  float: left;
}
.nav-ul li img {
  margin-top: 7px;
  display: block;
  height: 14px;
  float: left;

}
.logoutbtn{
  background-color: #4C70E8;
  color: #fff;
}

.nav-ul li .el-dropdown-link {
  display: block;
  height: 50px;
  width: 100%;
  padding: 0 20px;
}

.nav-posi {
  // border: 1px solid;
  width: 100px;
}

.nav-posi > li {
  background: #f3f1f1;
  height: 40px;
  width: 100px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.nar-home {
  position: absolute;
  background: #fff;
  right: 20px;
  top: 52px;
  bottom: 0px;
  z-index: 1;
  cursor: pointer;
}
.nar-home p {
  width: 80px;
  height: 40px;
  line-height: 30px;
  // background: red;
  text-align: center;
}
.nar-home p:nth-child(1) {
  border-bottom: 1px solid #f3f1f1;
}

.nar-home p:hover {
  color: red;
}

.nav-posi > li:hover {
  color: red;
}
@font-face {
  font-family: "iconfont"; /* project id 531557 */
  src: url("//at.alicdn.com/t/font_531557_e35rupzk1xhnz5mi.eot");
  src: url("//at.alicdn.com/t/font_531557_e35rupzk1xhnz5mi.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_531557_e35rupzk1xhnz5mi.woff") format("woff"),
    url("//at.alicdn.com/t/font_531557_e35rupzk1xhnz5mi.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_531557_e35rupzk1xhnz5mi.svg#iconfont")
      format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.liBtn {
  color: #48576a;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
}
// .liBtn:hover {
//   border-radius: 2px;
//   box-shadow: 0 1px 2px rgba(129, 129, 129, 0.12);
//   border-left: 1px solid #fff;
//   border-right: 1px solid #fff;
//   background-color: #eef1f6;
// }
.liUser {
  padding: 0 20px;
}
.el-dropdown-menu {
  border-radius: 2px;
}
</style>
