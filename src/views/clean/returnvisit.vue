<template>
    <div class="allmap" >     
		<div ref="gdMap" class="mapWrap">
			<div class="buttonWrap">
				<input type="button" class="mapButton" value="绘制多边形" ref="polygon"/>
				<input type="button" class="mapButton" value="绘制圆" ref="circle"/>
				<!--<input type="button" class="mapButton" value="清除" ref="remove"/>-->			
			</div>              
		</div>		
		<div class="pickerBox">
			<div class="headerWrap">
               <h3>服务范围信息</h3>
			   <div style="height:25px;line-height:25px;margin-top:10px;"><span style="display:inline-block;">服务范围个数:</span><span class="overlay-number">{{number}}</span><span style="display:inline-block;margin-left:20px;color:blue;cursor:pointer;" @click="removeOverlay">全部删除</span></div>
			</div>
			<div class="bottomContent">
				<p >请输入地址:<input class="pickerInput" ref="pickerInput"  value='' placeholder="输入关键字选取地点"></p>
				<div>
					<el-table
						:data="tableData"
						border
						style="width: 100%">
						<el-table-column
						label="服务范围"
						align="center"
						width='120'
						prop="index"
						>
						</el-table-column>
						<el-table-column
						prop="radius"
						align="center"
						width='180'
						label="圆形半径"
						>
						</el-table-column>
						<el-table-column
						align="center"
						width="100"						
						label="操作">
							<template scope="scope">
									<el-button type="button" @click="Delete(scope.row)" >删除</el-button>
							</template>						
						</el-table-column>
					</el-table>
				</div>
			</div>						
			
				    
		</div>
		
    </div>
</template>
<script>
export default {
  data() {
    return {
	   inputvalue:'',
	   overlays:[],//覆盖物对象
	   overlaysObj:[],//覆盖物对象
	   myMap:{},//地图对象
	   number:'0',
	   tableData:[],
	   index:0,
    };
  },
  mounted() {
	 this.initMap1();
  },
  methods: {
	initMap1(){
		var that=this;
		var id=this.$refs.gdMap;
		var inputname=this.$refs.pickerInput;
		var map = new AMap.Map(id, {
				zoom: 15
		});
		that.myMap=map;
		var number='';
		var styleOptions = {  
			strokeColor:"blue",    //边线颜色。  
			fillColor:"blue",      //填充颜色。当参数为空时，圆形将没有填充效果。  
			strokeWeight: 3,       //边线的宽度，以像素为单位。  
			strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。  
			fillOpacity: 0.1,      //填充的透明度，取值范围0 - 1。  
			strokeStyle: 'solid' //边线的样式，solid或dashed。  
		}		
		var mouseTool = new AMap.MouseTool(map);
		var polygon=this.$refs.polygon
		var circle=this.$refs.circle
		//var remove=this.$refs.remove
		AMap.event.addDomListener(polygon, 'click', function() {
			 mouseTool.polygon(styleOptions);
		   
		}, false);		
		AMap.event.addDomListener(circle, 'click', function() {
			mouseTool.circle(styleOptions);			
		}, false);
		AMap.event.addListener(mouseTool, "draw", function callback(e) {
			var eObject = e.obj;//obj属性就是鼠标事件完成所绘制的覆盖物对象。
			that.index++
			that.testalert(eObject,that.index);					
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
										district:poi.district,
										name: poi.name,
										location: poi.location.toString(),
										address: poi.address
								};
								inputname.value=info.district+info.name;
								marker.setMap(map);
								infoWindow.setMap(map);
								marker.setPosition(poi.location);
								infoWindow.setPosition(poi.location);
								infoWindow.setContent(inputname.value);
								infoWindow.open(map, marker.getPosition());
								
				});
		}						
	},
	testalert(obj,index){
		    //获取多边形轮廓线节点数组。其中lat和lng是经纬度参数
			var path=''
			//圆半径，单位:米
			var radius=''
			var row = {};
			//覆盖物对象
			var overlays=this.myMap.getAllOverlays();						
			if(obj.CLASS_NAME === 'AMap.Polygon'){				
				 path=obj.getPath();
				 row.path =path;
				 row.radius='---'
				 row.center=''		
			}
			if(obj.CLASS_NAME === 'AMap.Circle'){				
				 radius=obj.getRadius();
				 row.radius =(radius*1000).toFixed(3)+'公里';
				 row.path=''
				 row.center=obj.getCenter();				
			}
			row.index="范围"+index;
			row.type=obj.CLASS_NAME;
			row.id=obj._amap_id;								
			this.tableData.push(row);				
			this.number=overlays.length;       		
	},
	//删除地图所有的覆盖物
	removeOverlay(){
		var overlays=this.myMap.getAllOverlays();
		this.tableData=[];
		this.myMap.remove(overlays)
		this.number='0';
		this.index=0;
	},
	//
	Delete(row){
		var overlays=this.myMap.getAllOverlays();
		for(var i=0;i<overlays.length;i++){
			if(overlays[i]._amap_id==row.id){
				this.myMap.remove(overlays[i]);				
				
			}
		}
		for(var j=0;j<this.tableData.length;j++){
			if(overlays[j]._amap_id==row.id){
				this.tableData.del(j)			
				
			}						
		}
		if(this.number>0){
			this.number=this.number-1;
		}else{
			this.number=0;
		}		
	}

		
	
  }
};
</script>
<style lang="scss" scoped>
.allmap{
   width:100%;
   .mapWrap{
		width:80%;
		height:500px;
		float:left;
		.buttonWrap{
			position: absolute;
			z-index: 9999;
			top:460px;
			right:20px;
			.mapButton{
				width:80px;
				height: 25px;
				line-height:25px;
				color:#fff;
				text-align:center;
				font-size:12px;
				border:none;
				outline:none;
				background: #4c70e8;
			}
		}
	}
	.pickerBox {
		float:left;
        width: 20%;
		height:500px;
		background:#fff;
		border-left:1px dashed #ccc;
		font-size:12px;
		.headerWrap{
			border-bottom:1px dashed #ccc;
			padding:10px 5px;
			.overlay-number{
				display:inline-block;
				width:30px;
				text-align:center;
				color:red;
			}
		}
		.bottomContent{
			padding:20px 5px;
			.el-table th>.cell{
				font-size:12px;
			}
			.pickerInput {
				width: 150px;
				padding: 5px 5px;
   		    }
		}

    }

}


    

</style>