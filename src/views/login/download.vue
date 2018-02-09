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
            <a href="https://imgcdn.guoanshequ.com/openservice/2018/2/8/1518073284027.apk">
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
      margin-top: 20%;
      img {
        width: 100%;
      }
      p {
        margin-top: 1rem;
        width: 100%;
        text-align: center;
        font-family: SourceHanSansCN-Normal;
        font-size: 0.9rem;
        color: #666666;
        letter-spacing: 0;
      }
    }
    .footer{
        width: 90%;
        margin: 0 auto;
        margin-bottom: 2rem;
        overflow: hidden;
        a{
            display: block;
            width: 80%;
            margin: 0 auto;
            margin-top: 15%;
            background-color: #fff;
            img{
              display: block;
              width: 100%;
            }
        }
    }
  }
}
</style>
