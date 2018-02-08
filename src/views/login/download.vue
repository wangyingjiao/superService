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

<style rel="stylesheet/scss" scoped lang="scss">
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
      margin-top: 12%;
      padding: 0 4%;
      .logo {
        height: 6rem;
      }
      .word {
        height: 6rem;
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
        margin-top: 6rem;
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
        margin-bottom: 10%;
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
