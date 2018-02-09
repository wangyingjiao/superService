<template>
  <div>
    <div id="container"></div>
    <div id="myPageTop">
      <input id="tipinput"/>
    </div>
	</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    init() {
      //地图加载
      var map = new AMap.Map("container", {
        resizeEnable: true
      });
      //输入提示
      var autoOptions = {
        input: "tipinput",
        city: "022",
        citylimit: true
      };
      var auto = new AMap.Autocomplete(autoOptions);
      var placeSearch = new AMap.PlaceSearch({
        map: map
      }); //构造地点查询类
      AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
      function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name); //关键字查询查询
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
#container {
  width: 0px;
  height: 0px;
  margin: 0px;
  font-size: 13px;
}
</style>