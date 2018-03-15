<template>
  <div class="appBox">
      <div class="marginAuto">
        <div class="header">
            <img class="logo" src="../../../static/icon/app_logo.png" alt="">
            <img class="word" src="../../../static/icon/app_word.png" alt="">
        </div>
        <div class="main">
            <img src="../../../static/icon/app_bg.png" alt="">
            <p>用心服务 洁净万家</p>
        </div>
        <div class="footer">
            <a v-if="!isWeixin" :href=apkSrc >
               <img src="../../../static/icon/app_btn.png" alt="">
            </a>
            <div v-else @click="wxClick">
              <img  src="../../../static/icon/app_btn.png" alt="">
            </div>
        </div>
      </div>
      <div v-if="isShow" class="wxtip"  @click="noShow">
        <span class="wxtip-icon">
          <img src="../../../static/icon/weixin-tip.png" />
        </span>
        <p class="wxtip-txt">点击右上角按钮<br/>选择浏览器去下载APP</p>
	    </div>
  </div>
</template>

<script>
import { getNewest } from "@/api/set";
import { isvalidUsername } from "@/utils/validate";

export default {
  name: "download",
  data() {
    return {
      apkSrc: "",
      isWeixin: false,
      isShow: false
    };
  },
  mounted() {
    var ua = navigator.userAgent;
    var isWeixin = !!/MicroMessenger/i.test(ua);
    if (isWeixin) {
      this.isWeixin = true;
      this.wxClick();
    } else {
      this.isWeixin = false;
    }
    getNewest().then(res => {
      this.apkSrc =
        "https://imgcdn.guoanshequ.com/" + res.data.data.refreshAddress;
    });
  },
  methods: {
    wxClick() {
      this.isShow = true;
    },
    noShow() {
      this.isShow = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/app.scss";

.appBox {
  overflow: hidden;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  .marginAuto {
    width: 80%;
    height: 100vh;
    margin: 0 auto;
    .header {
      width: 80%;
      margin: 0 auto;
      margin-top: 1.32rem;
      text-align: center;
      .logo {
        height: 1.6rem;
      }
      .word {
        margin-left: 0.1rem;
        height: 1.6rem;
      }
    }
    .main {
      width: 90%;
      margin: 0 auto;
      margin-top: 1.1rem;
      img {
        width: 100%;
      }
      p {
        margin-top: 0.5rem;
        width: 100%;
        text-align: center;
        font-family: SourceHanSansCN-Normal;
        font-size: 0.9rem;
        color: #666666;
        letter-spacing: 0;
      }
    }
    .footer {
      width: 90%;
      margin: 0 auto;
      margin-top: 1.2rem;
      overflow: hidden;
      a,
      div {
        display: block;
        width: 80%;
        margin: 0 auto;
        background-color: #fff;
        img {
          display: block;
          width: 100%;
        }
      }
    }
  }
}
.wxtip {
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
  // display: none;
}
.wxtip-icon {
  width: 5rem;
  height: 5rem;
  display: block;
  position: absolute;
  right: 2rem;
  top: 3rem;
  img {
    width: 100%;
  }
}
.wxtip-txt {
  padding-top: 14rem;
  color: #eee;
  font-size: 0.8rem;
  line-height: 1.5;
}
</style>
