<template>
    <div class="content">
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item class="right">
                    <el-button type="primary" @click="handleAdd" id="addABC">新增角色</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-dialog title="门店详细信息" v-model="addFormVisible" :close-on-click-modal="false">

            <el-form :model="roleForm" :rules="addRules" ref="roleForm"  label-width="100px" >

                <el-form-item prop="roleName" label="门店名称:" >
                    <el-input type="text" v-model="roleForm.roleName" id="roleName" auto-complete="off" placeholder="门店名称"></el-input>
                </el-form-item>
                <el-form-item prop="roleCode" label="门店编码:" >
                    <el-input type="text" v-model="roleForm.roleCode" auto-complete="off" placeholder="门店编码"></el-input>
                </el-form-item>
                <div class="map-box">
                    <div id="map-container"> </div>
                    <div id="pickerBox">
                        <input id="pickerInput" placeholder="输入关键字选取地点" value="" autocomplete="off"/>

                    </div>
                </div>

            </el-form>

            <div slot="footer" class="dialog-footer">

                <el-button @click.native="clearSubmit" id="clearSubmit">取消</el-button>
                <el-button type="primary"  @click.native.prevent="handleSubmit2" :loading="logining">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
    #map-container{
    width: 100%;
    height:400px;
}
.map-box{position:relative;}
 #pickerBox {
        position: absolute;
        z-index: 9999;
        top: 50px;
        right: 30px;
        width: 300px;
        border:1px solid #666;
        height:35px;
        line-height:35px;
        background:#fff;
        border-radius:5px;
    }

    #pickerInput {
        width: 290px;
        padding: 5px 5px;
        background:#fff;
    }
    .amap-sug-result{z-index: 9999; position: static;}


</style>
<script>
    import AMap from 'AMap'
    import AMapUI from 'AMapUI'
    let mapObj,pro
    export default{
        data(){
            return{
                 addFormVisible: false,//新增界面是否显示
                 logining: false,
			     listLoading: false,
			     markers:[],
                 //新增角色
                 roleForm: {
                    roleName:'',
                    roleCode:''

                 },
                 addRules: {
                    roleName: [
                      { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ],
                    roleCode: [
                      { required: true, message: '请输入角色编码', trigger: 'blur' }
                    ]
                 },
            }
        },
        methods:{
            handleAdd(){
                 this.addFormVisible = true;
                  //$("#pickerInput").val('');
                  //this.markers=[];
            },
            clearSubmit(){
                this.addFormVisible = false;
            },
            placeSearch_CallBack(data) {
                var poiArr = data.poiList.pois;
                //添加marker
                var marker = new AMap.Marker({
                    map: mapObj,
                    position:[poiArr[0].location.lat,poiArr[0].location.lng]
                });
                mapObj.setCenter(marker.getPosition());
            },
            init(){

            var that=this, markerInfo=null;

            /*eslint-disable no-undef*/
                mapObj = new AMap.Map('map-container', {
                  center: [117.000923, 36.675807],
                  zoom: 6
                });
                mapObj.plugin(['AMap.ToolBar', 'AMap.MapType','AMap.PlaceSearch','AMap.Autocomplete','AMap.ContextMenu'], function () {
                  mapObj.addControl(new AMap.ToolBar())
                 /* mapObj.addControl(new AMap.MapType({showTraffic: false, showRoad: false}))*/
                });
                //以下是创建右键菜单
                 var contextMenu = new AMap.ContextMenu();
                 //右键添加Marker标记
                 contextMenu.addItem("创建门店", function(e) {
                    if(markerInfo){
                       markerInfo.setMap(null);
                       markerInfo = null;
                    }
                    markerInfo = new AMap.Marker({
                        map: mapObj,
                         //基点位置
                        position: mapObj.contextMenuPositon,
                        icon: new AMap.Icon({
                          size: new AMap.Size(40, 53),  //图标大小
                          image: "https://gemini.guoanshequ.wang/gemini/static/img/icon/store.png",
                          imageOffset: new AMap.Pixel(0, 0)
                        })
                    });
                    that.markers.push(markerInfo);
                    console.log(that.markers);


                 }, 0);
                 mapObj.on('rightclick', function(e) {
                        contextMenu.open(this, e.lnglat);
                        this.contextMenuPositon = e.lnglat;
                 });
                 AMap.event.addDomListener(document.getElementById('clearSubmit'), 'click', function() {
                        console.log(mapObj);
                        //that.markers=[];
                        console.log(that.markers.length);
                 }, false);




                //以下是搜索框功能
                var auto=new AMap.Autocomplete({input:"pickerInput"});
                var placeSearch = new AMap.PlaceSearch({
                    map: mapObj,
                    pageSize:1,
                });  //构造地点查询类
                 AMap.event.addListener(auto, "select",function(e){
                     // debugger;
                      placeSearch.setCity(e.poi.adcode);
                      placeSearch.search(e.poi.name);  //关键字查询查询

                 });//注册监听，当选中某条记录时会触发


                //以下是初始化定位插件
                mapObj.plugin(['AMap.Geolocation'], function () {
                  let geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, //  是否使用高精度定位，默认:true
                    timeout: 10000, //  超过10秒后停止定位，默认：无穷大
                    maximumAge: 0, // 定位结果缓存0毫秒，默认：0
                    convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true, //  显示定位按钮，默认：true
                    buttonPosition: 'LB',  // 定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,  //  定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy: true  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                  })
                  mapObj.addControl(geolocation)
                  geolocation.getCurrentPosition()
                  AMap.event.addListener(geolocation, 'complete', (result) => {
                    mapObj.setCenter(result.position)
                  })  //  返回定位信息
                  AMap.event.addListener(geolocation, 'error', (result) => {
                    console.log(result)
                  })  //  返回定位出错信息
                })
        }
        },
        /*created(){
             this.init();
        },*/
        mounted(){
           //this.init();

        },
        updated(){
           this.init();
           $("#pickerBox").append($(".amap-sug-result"));

        }
    }
</script>
