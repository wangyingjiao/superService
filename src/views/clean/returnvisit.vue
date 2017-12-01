<template>
    <div class="allmap" >
		<button type="type" @click="showdialog" style="">打开地图</button>
		<el-dialog
			title="服务范围选择"
			:visible.sync="severSelectdialogVisible"
			width="100%"
			size="full"
			:show-close="false"
			>
				<div ref="gdMap" class="mapWrap">             
				</div>
				<div class="buttonWrap">
					<input type="button" class="mapButton" value="绘制多边形" ref="polygon"/>
					<input type="button" class="mapButton" value="绘制圆" ref="circle"/>
					<button type="button" class="mapButton" @click="saveOverlays">保存</button>
					<button class="mapButton"  @click="closeMap">关闭</button>			
				</div> 		
				<div class="pickerBox">
					<div class="headerWrap">
					<h3>服务范围信息<span v-if="showPromit" style="color:red;margin-left:30px;">{{promitInf}}</span></h3>
					<div style="height:25px;line-height:25px;margin-top:10px;"><span style="display:inline-block;">服务范围个数:</span><span class="overlay-number">{{number}}</span><span style="display:inline-block;margin-left:20px;color:blue;cursor:pointer;" @click="removeOverlay">全部删除</span></div>
					</div>
					<div class="bottomContent">
						<p >请输入地址:<input class="pickerInput" ref="pickerInput"  value='' placeholder="输入关键字选取地点"></p>
						<div>
							<el-table
								:data="tableData"
								border
								style="width: 100%"
								max-height="250">
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
								width='160'
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
	    </el-dialog>     

		
    </div>
</template>
<script>
export default {
  data() {
    return {
	   severSelectdialogVisible: false,
	   inputvalue:[],
	   myMap:{},//地图对象
	   number:'0',
	   tableData:[],
	   index:0,
	   promitInf:'',
	   showPromit:false,
    };
  },
  mounted() {
	 
  },
  methods: {
	showdialog(){
		this.severSelectdialogVisible=true;
		this.$nextTick(() => {
		   this.initMap1();
		})		
	},
	initMap1(){
		var that=this;
		var id=this.$refs.gdMap;
		var inputname=this.$refs.pickerInput;
		var map = new AMap.Map(id, {
			    center:new AMap.LngLat(116.368904,39.913423),
				zoom: 15
		});
        map.plugin(["AMap.Scale"],function(){
			var scale = new AMap.Scale();
			map.addControl(scale);   
		});
		map.plugin(["AMap.ToolBar"],function(){
			//加载工具条
			var tool = new AMap.ToolBar();
			map.addControl(tool);    
		});
		that.myMap=map;
		var styleOptions = {  
			strokeColor:"blue",    //边线颜色。  
			fillColor:"blue",      //填充颜色。当参数为空时，圆形将没有填充效果。  
			strokeWeight:1,       //边线的宽度，以像素为单位。  
			strokeOpacity: 0.1,    //边线透明度，取值范围0 - 1。  
			fillOpacity: 0.3,      //填充的透明度，取值范围0 - 1。  
			strokeStyle: 'solid' //边线的样式，solid或dashed。  
		}		
		var mouseTool = new AMap.MouseTool(map);
		var polygon=this.$refs.polygon
		var circle=this.$refs.circle
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
								that.inputvalue.push(info.location);
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
				 row.type='Polygon';
				 row.path =path;
				 row.radius='---'
				 row.center=''		
			}
			if(obj.CLASS_NAME === 'AMap.Circle'){				
				 radius=obj.getRadius();
				 row.type='Circle';
				 row.radius =(radius*1000).toFixed(3)+'公里';
				 row.path=''
				 row.center=obj.getCenter();				
			}
			row.index="范围"+index;		
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
	},
	saveOverlays(){
		 if(this.tableData == ''){
			   this.promitInf='请选择一个服务区域';
	           this.showPromit=true;
		 }else if(this.tableData.length >1){
			   this.promitInf='只能选择一个服务区域';
	           this.showPromit=true;			 
		 }else{
			this.promitInf='';
			this.showPromit=false;			 
			//搜索的经纬度
			//this.inputvalue
			//区域对象
			//this.tableData[0]
		 }
	},
	closeMap(){
		this.tableData=[];
		this.number='0';
		this.index=0;
		this.promitInf='';
		this.showPromit=false;				
        this.severSelectdialogVisible = false;
	}	
  }
};
</script>
<style  scoped>
	.allmap{
		margin-top:80px;
		width:100%;
	}   
	.mapButton{
		width:80px;
		height: 25px;
		line-height:25px;
		color:#fff;
		text-align:center;
		font-size:12px;
		border:none;
		border-radius:0px;
		outline:none;
		background: #4c70e8;
		cursor: pointer;
	} 
	.mapButton:hover{
		background: #6d8dfc;
	}  
   .mapWrap{
		width:70%;
		height:500px;
		float:left;
	}
	.buttonWrap{
		position: absolute;
		z-index: 9999;
		bottom:10%;
		right:35%;

	}	
	.pickerBox {
		float:left;
        width: 30%;
		height:500px;
		background:#fff;
		border-left:1px dashed #ccc;
		font-size:12px;
    }
	.headerWrap{
		border-bottom:1px dashed #ccc;
		padding:10px 5px;
	}
	.overlay-number{
		display:inline-block;
		width:30px;
		text-align:center;
		color:red;
	}		
	.bottomContent{
		padding:20px 5px;
	}
	.el-table th>.cell{
		font-size:12px;
	}
	.pickerInput {
		width: 150px;
		padding: 5px 5px;
	}			
</style>