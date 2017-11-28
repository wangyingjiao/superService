<template>
    <div class="allmap" >     
       <div class="map" ref="map"  style="height:100%;-webkit-transition: all 0.5s ease-in-out;transition: all 0.5s ease-in-out;">  
          
	   </div>
       <div class="actionArea">
			<button type="button" class="button-large" @click="savePointer()">区域坐标</button>
			<button type="button" class="button-large" @click="draw()">画多边形</button>
			<button type="button" class="button-large" @click="clearAll()">清除多边形</button>
	<div ref="gdMap" class="mapWrap">

	</div>				
	   </div>

    <div class="pickerBox">
        <input class="pickerInput" ref="pickerInput"  value='' placeholder="输入关键字选取地点">		    
    </div>
			
    </div>
</template>
<script>
export default {
  data() {
    return {
       mainObj:{},
	   maskObj:[],
	   inputvalue:'',
    };
  },
  mounted() {
	 this.initMap();
	 this.initMap1();
  },
  methods: {
    initMap() {
		var id=this.$refs.map		
		var map = new BMap.Map(id);  
		var poi = new BMap.Point(113.948913,22.530844);  
		map.centerAndZoom(poi, 16);  
		map.enableScrollWheelZoom();
		//var opts = {offset: new BMap.Size(400,0)} 
        map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT})); 		
        this.mainObj=map
		var styleOptions = {  
			strokeColor:"blue",    //边线颜色。  
			fillColor:"blue",      //填充颜色。当参数为空时，圆形将没有填充效果。  
			strokeWeight: 3,       //边线的宽度，以像素为单位。  
			strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。  
			fillOpacity: 0.1,      //填充的透明度，取值范围0 - 1。  
			strokeStyle: 'solid' //边线的样式，solid或dashed。  
		}
		//实例化鼠标绘制工具  
		var drawingManager = new BMapLib.DrawingManager(map, {  
			isOpen: false, //是否开启绘制模式  
			enableDrawingTool: true, //是否显示工具栏
            enableCalculate :true,			
			drawingToolOptions: {  
				anchor: BMAP_ANCHOR_TOP_RIGHT, //位置  
				offset: new BMap.Size(5, 5), //偏离值
				drawingModes : [BMAP_DRAWING_POLYGON, BMAP_DRAWING_CIRCLE],			
			},  
			circleOptions: styleOptions, //圆的样式  	 
			polygonOptions: styleOptions, //多边形的样式  
	 
		}); 
		var overlays = [];		
        var obj={};					   		  
		//添加鼠标绘制工具监听事件，用于获取绘制结果  
		//drawingManager.addEventListener('overlaycomplete', overlaycomplete);
		drawingManager.addEventListener("overlaycomplete", function(e) {
		    if(e.drawingMode == 'circle' ){
			   overlays.push(e.overlay);
			   //e.overlay.getRadius();//圆的半径    
			}else{
				overlays.push(e.overlay);			
				var path = e.overlay.getPath();// 返回多边型的点数组
				  for (var prop in path) {
					if (path.hasOwnProperty(prop)) {
					  obj[prop] = path[prop];
					}
				  } 						    
			}
			//alert(e.calculate)图形的面积
			e.label.hide();
	   });
       this.maskObj=overlays;		
       this.dotarr=obj;	   
	},
	initMap1(){
		var id=this.$refs.gdMap;
		var inputname=this.$refs.pickerInput;
		var map = new AMap.Map(id, {
				zoom: 10
		});
		AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {                         
				var poiPicker = new PoiPicker({
						city:'北京',
						input: inputname
				});
				//初始化poiPicker
				poiPickerReady(poiPicker);
		});
		function poiPickerReady(poiPicker) {
				window.poiPicker = poiPicker;
				var marker = new AMap.Marker();
				var infoWindow = new AMap.InfoWindow({
						offset: new AMap.Pixel(0, -20)
				});
				//选取了某个POI
				poiPicker.on('poiPicked', function(poiResult) {
						var source = poiResult.source,
								poi = poiResult.item,
								info = {
										source: source,
										id: poi.id,
										name: poi.name,
										location: poi.location.toString(),
										address: poi.address
								};
								inputname.value=info.name
								alert(info.location);
				});
		}						
	},
		
	savePointer(){	   
	    alert(this.dotarr);
	},
	draw(){
	   
			
    },
    clearAll() {  
        for(var i = 0; i < this.maskObj.length; i++){  
            this.mainObj.removeOverlay(this.maskObj[i]);  
        }  
        this.maskObj.length = 0     
    }	
  }
};
</script>
<style>
.allmap{
   width:100%;
   height:400px;
}
.map{
   width:800px;
   height:200px;
   display:block;
}
.actionArea{
	position:absolute;
	bottom:30px;
	left:720px;
}
.mapWrap{
	width:0px;
	height:0px;
	display:block;
}
</style>