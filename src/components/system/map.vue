<template>
  <section class="content">
    <el-amap :vid="'amap'" :center="center" :zoom="zoom" :map-manager="amapManager" ref="map" :events="events">
      <el-amap-marker v-for="(marker,index) in markers" :position="marker.position" :key="index" ></el-amap-marker>
      <el-amap-polygon v-for="(polygon, index) in polygons" :path="polygon.path" :events="polygon.events" :fillOpacity="polygon.fillOpacity" :strokeColor="polygon.strokeColor" :strokeStyle="polygon.strokeStyle" :fillColor="polygon.fillColor"></el-amap-polygon>
    </el-amap>
    <div id="panel">
      <div class="amap_lib_placeSearch" style="z-index: 9999">
        <div style="background-color: #e5ecf9;">
          <div style="display: inline-block;margin-left:7px;" id="areaTitle">
          </div>
          <div style="display: inline-block;margin-left:7px;">
            <input type="checkbox" id="showOtherStoreArea" onchange="showOtherStoreArea()">其他门店范围
          </div>
          <div style="display: inline-block;float:right;margin-right:7px">
            <a class="link" id="close">收缩</a> <a class="link" id="open">展开</a>
          </div>
        </div>
        <div class="amap_lib_placeSearch_list">
          <ul>
          </ul>
        </div>
        <div class="amap_lib_placeSearch_page">
          <div id="pageDiv">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
  .content {
    width: 100%;
    height: 600px;
    position:relative;
  }
  #panel {
    margin: 0;
    padding: 0;
    z-index: 999;
    position: absolute;
    background-color: white;
    max-height: 100%;
    overflow-y: auto;
    top: 0;
    right: 0;
    width: 280px;
  }
</style>
<script>
    import {amapManager} from 'vue-amap';
    export default {
        data() {
          return{
            zoom:14,
            //icon:"require('../../assets/img/logo.png')",
            markers:[],
            amapManager,
            center: [116.63942,40.137844],
            events: {
              init: (o) => {
                console.log(o.getCenter())
                console.log(this.$refs.map.$$getInstance())
                o.getCity(result => {
                  console.log(result)
                })
              },
            },


            polygons: [
              {
                path: [[116.63942, 40.137844], [116.626964,40.137425], [116.626192,40.130141], [116.638176, 40.129542]],
                 fillOpacity: 0.3,
                 strokeStyle: 'solid',
                 fillColor: '#FFFF00',
                 strokeColor: '#00BFFF',
              }
            ]
          }

        },

        components: {

        },
        methods: {



        },
        mounted() {

          this.markers=[
            {"position":[116.63942,40.137844]},
            {"position":[116.638176,40.129542]}
          ];

        }

    }
</script>
