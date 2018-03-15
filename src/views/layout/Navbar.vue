<template>
  <el-menu class="navbar" mode="horizontal">
    <div style="width:100%;float:left;background:#fff;position:relative">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <ul class="nav-ul">
        <li class="liBtn" style="cursor: pointer; margin-right:20px;padding:10px;">                    
          <el-dropdown trigger="click" menu-align='start'>
            <span>
              <div><i class="iconfont color scan" >&#xe61a;</i><span class="scanText">下载国安好帮手</span></div>
            </span>
            <el-dropdown-menu slot="dropdown" class="hoverStyle">
              <el-dropdown-item ><vue-qr class="qrcode" bgSrc='../../../static/icon/bgw.png' :dotScale = '1' logoSrc='../../../static/icon/wx_logo.png' :margin=0 :logoScale =0.25 :text="appSrc" :logoMargin=2 ></vue-qr><p class="Scandown">扫描二维码下载</p></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>                    
        </li>        
        <li class="liBtn liUser">
          <div ref="username"><i class="iconfont color" >&#xe669;</i>&nbsp;&nbsp;{{name}}</div>
        </li>
        <li class="liBtn" style="cursor: pointer; margin-right:20px;padding:10px;"  @click="logout">
          
          <div class="out"><i class="iconfont color">&#xe639;</i>&nbsp;&nbsp;退出</div>
          
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
import VueQr from "vue-qr";

export default {
  components: {
    TabsView,
    Hamburger,
    VueQr
  },
  data() {
    return {
      appSrc: "",
      flag: false,
      username: ""
    };
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"])
  },
  created() {
    var src1 = window.location.href;
    var src2 = this.$route.path;
    var src3 = src1.replace(src2, "/download");
    this.appSrc = src3;
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        this.$router.push({ path: "/login" });
        this.$store.state.app.visitedViews = [];
        // location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.hoverStyle .el-dropdown-menu__item:not(.is-disabled):hover {
  background: #fff;
  color: #000;
}
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
  .color {
    color: #4c70e8;
  }
}
.nav-ul li img {
  margin-top: 7px;
  display: block;
  height: 14px;
  float: left;
}
.nav-ul li .scan {
  font-size: 24px;
  float: left;
}
.scanText {
  height: 30px;
  line-height: 30px;
  display: block;
  float: left;
  margin-left: 5px;
}
.Scandown {
  text-align: center;
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
.out {
  background-color: #4c70e8;
  color: #fff;
  .color {
    color: #fff !important;
  }
}
.qrcode {
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
  padding: 5px;
}
</style>
