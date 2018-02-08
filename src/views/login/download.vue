<template>
  <div class="appBox">
      <button @click="aaa">111111111111111111111111</button>
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
            <a href="#">
                <img src="../../../static/icon/app_btn.png" alt="">
            </a>
        </div>
      </div>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";

export default {
  name: "download",
  data() {
    return {};
  },
  methods: {
      aaa(){
          console.log(window.location.href)
      }
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
@import "src/styles/app.scss";
.appBox {
  overflow: hidden;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  .marginAuto {
    width: 80%;
    margin: 0 auto;
    .header {
      width: 76%;
      margin: 0 auto;
      margin-top: 12%;
      padding: 0 4%;
      .logo {
        width: 16%;
      }
      .word {
        width: 76%;
      }
    }
    .main {
      width: 90%;
      margin: 0 auto;
      margin-top: 10%;
      img {
        width: 100%;
      }
      p {
        margin-top: 5%;
        width: 100%;
        text-align: center;
        font-family: SourceHanSansCN-Normal;
        font-size: 3.2rem;
        color: #666666;
        letter-spacing: 0;
      }
    }
    .footer{
        width: 75%;
        margin: 0 auto;
        a{
            display: block;
            width: 100%;
            margin-top: 10%;
            background-color: aqua;
        }
    }
  }
}
</style>
