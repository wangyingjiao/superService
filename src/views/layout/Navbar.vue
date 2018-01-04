<template>
  <el-menu class="navbar" mode="horizontal">
    <div style="width:100%;float:left;background:#fff;position:relative">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <ul class="nav-ul">
        <li style="cursor: pointer;">
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
        </li>
        <li>
          <div>
            <img src="../../../static/icon/客户管理1.png" alt="">
          </div>
          <div>{{username}}</div>
        </li>
        <li style="cursor: pointer;"  @click="logout">
          <div>
            <img src="../../../static/icon/客户管理1.png" alt="">
          </div>
          <div>退出</div>
        </li>
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
    handleCommand(command){
      console.log(command,'点击时触发')
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
  margin-bottom: 20px;
  background: #eef1f6;
  overflow: hidden;
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
</style>
