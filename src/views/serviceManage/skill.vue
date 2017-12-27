<template>
  <div class="box">
    <div class="filter-container bgWhite padBot20">
      <el-input   class="filter-item width200" placeholder="请输入搜索的技能名称" v-model="localSearch"></el-input>
      <button @click="search" class="search-button btn_right el-icon-search"> 搜索</button>
    </div>
    <div class="app-container calendar-list-container">
      <div class="">
        <div class="bgWhite bgbot70" >
          <button class="button-small btn_right btn_pad ceshi ceshi5" style="margin-top: -5px;" v-if="btnShow.indexOf('skill_insert') != -1" @click="add('add')">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>
          <div style="padding-top:15px;">
              <el-table  :data="getListdata" v-loading="listLoading" stripe  highlight-current-row element-loading-text="正在加载"
                style="width: 100% ;">
                      <el-table-column align="center" label="编号" width="100">
                          <template scope="scope">
                            {{scope.row.index+(pageNumber-1)*pageSize}}
                          </template>
                      </el-table-column>
                      <el-table-column label="技能名称" align="center" prop="name"></el-table-column>
                      <el-table-column label="技师个数" align="center" prop="techNum"> </el-table-column>
                      <el-table-column align="center" label="操作" min-width="100px">
                        <template scope="scope">
                            <el-button class="el-icon-edit"  v-if="btnShow.indexOf('skill_update') != -1" @click="add('edit',scope.row)"></el-button>
                            <el-button class="el-icon-delete" v-if="btnShow.indexOf('skill_delete') != -1" @click="handleDelete(scope.row)"></el-button>
                        </template>
                      </el-table-column>
              </el-table>
              <div v-show="!listLoading" class="pagination-container techPag">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync='jumpPage'
                  layout="total, sizes, prev, pager, next, jumper" :page-size="pageSize" :total="total">
                </el-pagination>
              </div>
          </div>          
        </div>
        <!-- 弹出层新增技能 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" :modal-append-to-body="false" :close-on-click-modal="false">
          <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="130px" class="demo-ruleForm" label-position="left">
            <el-form-item label="技能名称" prop="name">
              <el-input  v-model.trim="ruleForm2.name"  class="width300"  placeholder="请输入2-15位技能名称"></el-input>
            </el-form-item>
            <el-form-item label="选择服务" prop="serItems" required>            
              <div class="tech-order-jnsk selfBottonSt">
                  <div class="tech-order-btnsk"  @click="choseServer">&#10010 请选择</div>
              </div>
              <el-table :data="ruleForm2.serItems"  v-loading="listLoading"  border class="selfTableSt" >
                  <el-table-column prop="name" label="项目名称" width="100" height="30" align="center">
                  </el-table-column>
                  <el-table-column prop="serItemCommoditys" label="商品名称" width="180" align="center">
                  </el-table-column>
                  <el-table-column  label="操作" align="center">
                    <template scope="scope">
                      <button class="skill-delte" @click="staticDelete(scope.row)">删除</button>
                    </template>
                  </el-table-column>
                </el-table>
                <div  v-if="!ruleForm2.serItems || showRUles"  class="showRules">
                  <span v-show="spanFlag">请选择服务</span>
                </div>
            </el-form-item>
            <el-form-item label="选择技师" prop="technicians" class="selfst3">
             <div class="tech-order-jnsk selfst2">
                  <div class="tech-order-btnsk selfst1"  @click="orderTech"> &#10010 请选择</div>
            </div>
            </el-form-item>
            <el-form-item label=""> 
                  <div class="tabWrap" v-for="item in tabOptions" :key="item.techId">
                    {{item.techName}}
                    <div class="closePic" @click="errorClose(item)">&#10005</div>
                  </div>              
            </el-form-item>           
          </el-form>
    
          <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large"   @click="submitForm('ruleForm2')">保存</button>
              <button class="button-cancel"  @click="resetForm('ruleForm2')">取消</button>
          </div>          
        </el-dialog>
        <!-- 选择服务弹出层 -->
        <el-dialog title="选择服务" :visible.sync="flagserver"   :close-on-click-modal="false">
              <div style="float:left">
                <el-input placeholder="输入要搜索的项目名称" class="width220"  v-model="xingmu"></el-input>
                <span v-show="promShow" class="selfInmpotInf">{{promInf}}</span>
              </div>
              <div class="selfFLORight"><button class="button-large" @click="quiry">查询</button></div>
              <div class="selfOVerflow">
                <ul class="role-table">
                  <li class="header">
                    <div class="left">项目名称</div>
                    <div class="right">商品名称</div>
                  </li>
                  <div class="vertical-line"></div>
                  <li  v-for="item in listorderServer" :key="item.id" ref="tableItem" >
                    <div class="left h40">
                      <el-checkbox @click.native="handleOneCheckAll($event,item)" v-cloak  v-model="item.itemChecked"> {{item.name}}</el-checkbox>
                    </div>
                    <div class="right h40">
                      <el-checkbox-group v-model="item.checkedCities" @change="handleOneCheckedCitiesChange(item)">
                        <el-checkbox  v-for="m in item.commoditys" :label="m.id" :key="m.id" v-cloak> {{m.name}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
 
                    <div class="line"></div>
                  </li>
                </ul>				                 
              </div>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <button class="button-large"   @click="submitForm1()">保存</button>
                    <button class="button-cancel"  @click="resetForm1()">取消</button>
                </div>                    
        </el-dialog>

        <!-- 选择技师弹出层 -->
        <el-dialog title="选择服务人员" :visible.sync="ordertech" :modal="false" :modal-append-to-body="false" :close-on-click-modal="false">
              <div class="selfFLOLeft width120">
                <el-input placeholder="输入要搜索的姓名" v-model="techName" class="width120"></el-input>                
              </div>
              <div class="selfFLOLeft selfMarLef10">
                <el-select clearable placeholder="请选择服务站" v-model="techStationId">
                  <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <span v-show="promShow1" class="selfInmpotInf">{{promInf1}}</span>
              </div>
              <div  class="selfFLORight"><button class="button-large" @click="searchTeh">查询</button></div>              
              <div class="selfFLOLeft selfOVerflow1">
                    <div class="table-d">
                      <table width="100%" class="selfTable">
                        <tr>
                          <td  class="selfTdStyle" align="center" width="8%">选择</td>
                          <td  class="selfTdStyle"  align="center" width="28%">头像</td>
                          <td  class="selfTdStyle"  align="center" width="28%">姓名</td>
                          <td  class="selfTdStyle"  align="center" width="10%">性别</td>
                          <td  class="selfTdStyle"  align="center" width="26%">服务站</td>							
                        </tr>
                        <tr v-for="item in listTech" :key="item.techId"  ref="tableItem1">
                          <td  align="center"><el-checkbox  v-model="item.techChecked"></el-checkbox></td>
                          <td  class="height100" align="center"><div class="userHeaderStyle"><img :src="item.headPic" style="width:100%;height:100%;"/></div></td>
                          <td  align="center">{{item.techName}}</td>
                          <td  align="center">
                            <span v-if="item.techSex =='male'">男</span>
                            <span v-if="item.techSex =='female'">女</span>									
                          </td>
                          <td  align="center">{{item.techStationName}}</td>							
                        </tr>
                      </table>
                    </div>            
              </div>             
              <div slot="footer" class="dialog-footer selfFooter">
                  <button class="button-large"   @click="submitForm2()">保存</button>
                  <button class="button-cancel"  @click="resetForm2()">取消</button>
              </div>           
        </el-dialog>

      </div>
    </div>
  </div>
</template>
<script>
  import {
    getListdata,
    orderServer,
    saveServer,
    techDelet,
    editTech,
    upDataTech
  } from '@/api/skill'
  //挂载数据
  export default {
    name: '',
    data() {
      var checkName = (rule, value, callback) => {
          if (!value) {
              callback(new Error('请输入2-15位技能名称'));
          }else{
            if(value.length>=2 && value.length<=15){
                callback()
            }else{
              callback(new Error('请输入2-15位技能名称'));
            }
              
          }			
      };      
      return {
        jumpPage:1,
        title:'新增技能',
        btnShow: this.$store.state.user.buttonshow,
        showRUles:false,
        promShow:false,
        promShow1:false, 
		    checkAll:false,      
        localSearch:'',
        tabOptions:[],
        techShow:false,
        techName:'',
        techStationId:'',
        rules: {
          name: [
          { required: true, validator:checkName, trigger: 'blur' },
          ]
        },
        ruleForm2: {
          name:'',
          serItems:[],
          technicians:[],    
        },
        commodityse: {},
        options: [],
        checkbox: false,
        getListdata: [],
        ordertech: false,
        xingmu: '',
        listTech:[],
        listorderServer:[],       
        checked: false,
        multipleSelection:[],
        multipleSelection1:[],
        ortech: false,
        total: null,
        pageSize:10,
        pageNumber:1,
        listLoading: false,
        dialogVisible: false,
        flagserver: false,
        dialogFormVisible: false,
        dialogStatus: 'add',
        id:'',
        promInf:'搜索内容不存在!',
        promInf1:'搜索内容不存在!',
        middleA:[],
        spanFlag:true
      }
    },
    computed: {
      showRUles1: function () {
        return true
      }
   },  
    methods: {   
		// 二级数据变化的时候
		handleOneCheckedCitiesChange(item) {            		
      let checkedCount = item.checkedCities.length;//二级选中的数量
      item.itemChecked = checkedCount !=0
		},
		//全选操作
      handleOneCheckAll(event,item) {
          let arr = [];
          for (let a = 0; a < item.commoditys.length; a++) {
              arr.push(item.commoditys[a].id)
          }
          item.checkedCities = event.target.checked ? arr : [];
      },	  
      //全局搜索按钮
      search(){
        var obj={
              name:this.localSearch,
        }
        this.pageNumber=1;
        this.jumpPage=1;
        this.getList(obj,this.pageNumber,this.pageSize);
      },
      //全局新增按钮
      add(status,row){     
            var obj={}
            this.listLoading = true;
            //服务列表获取             
            orderServer(obj).then(res => {      
              if (res.data.code === 1) {            
                  this.listorderServer=res.data.data.items;              
                  this.options=res.data.data.stations 
                  this.listTech=res.data.data.techs
                  this.dialogVisible = true;
                  this.$nextTick( () => {
                      if(this.ruleForm2.serItems == undefined){
                        this.spanFlag=false;
                      }else{
                        this.spanFlag=true;
                      }
                  })                                                                              
              }         
              this.listLoading = false;
            }).catch(res=>{
                
            });         
          this.dialogStatus=status;       
          this.showRUles=true;          
          this.tabOptions=[];
          this.ruleForm2.serItems=[];                  		  		                          
         if(this.dialogStatus =='add'){
           this.title='新增技能'
           //新增操作                     
           this.ruleForm2={};           
           this.id=''                      
         }else if(this.dialogStatus =='edit'){
           this.title='编辑技能'
           this.showRUles=false;
           //编辑操作           
           this.id=row.id;
            var obj = {
                id:this.id
            }
            editTech(obj).then(res => {
                this.ruleForm2.name=res.data.data.info.name
                this.middleA=res.data.data.info.items;
                this.selectionreturn(); 
                this.ruleForm2.serItems=res.data.data.info.items                             
                var obj1=this.ruleForm2.serItems;
                if(obj1.length){                    
                    for(var i=0;i<obj1.length;i++){                
                          var comLen=obj1[i].commoditys.length;
                          var objName=''
                          for(var j=0; j<comLen;j++){ 
                                if(obj1[i].commoditys[j].name){
                                    objName+=','+obj1[i].commoditys[j].name;
                                }                                                      
                        }
                        if(objName){
                          this.ruleForm2.serItems[i].serItemCommoditys=objName.substring(1); 
                        }                                                                                          
                    } 
                }
                if(res.data.data.info.technicians != undefined){
                    this.tabOptions=res.data.data.info.technicians;
                    this.selectionreturn1();
                }
                        
            }).catch(res=>{
                
            });                      
         }         
      },
      //服务数据回显二级选中
      selectionreturn(){
           if(this.middleA.length != undefined){
              for(let a=0;a<this.listorderServer.length;a++){
                for(let b=0;b<this.middleA.length;b++){
                    if(this.middleA[b].id == this.listorderServer[a].id){
                      this.listorderServer[a].itemChecked=true;
                      for(let c=0;c<this.listorderServer[a].commoditys.length;c++){
                        for(let d=0;d<this.middleA[b].commoditys.length;d++){
                          if(this.middleA[b].commoditys[d].id ==this.listorderServer[a].commoditys[c].id ){
                                this.listorderServer[a].checkedCities.push(this.middleA[b].commoditys[d].id)
                          }
                        }
                      }
                    }
                }
              }
           }         
      },
      //技师数据回显二级选中
      selectionreturn1(){
        if(this.tabOptions.length != undefined){
            for(let a=0;a<this.listTech.length;a++){
              for(let b=0;b<this.tabOptions.length;b++){
                  if(this.tabOptions[b].techId == this.listTech[a].techId){
                    this.listTech[a].techChecked=true;
                  }
              }
            }
        }                                        
      },      
      //新增或编辑弹窗保存
      submitForm(formName) {
        this.spanFlag=true;
        this.ruleForm2.technicians=this.tabOptions                  	   
        this.$refs[formName].validate((valid) => {
          if (valid) {
                if( this.ruleForm2.serItems != undefined &&  this.ruleForm2.serItems.length != 0){                       
                        var obj={
                          id:this.id,
                          name:this.ruleForm2.name,
                          technicians:this.ruleForm2.technicians,
                          items:this.ruleForm2.serItems
                        }
                        if(this.dialogStatus =='add'){
                            saveServer(obj).then(res => {
                                if(res.data.code === 1){
                                    this.$message({
                                      type: 'success',
                                      message: '新增成功!'
                                    });
                                    this.dialogVisible = false;	
                                    var obj1={}
                                    this.listLoading = false
                                    this.pageNumber=1;
                                    this.jumpPage=1;
                                    this.getList(obj1,this.pageNumber,this.pageSize);                                    
                                }else{
                                  this.$message({
                                      type: 'warning',
                                      message: res.data.data
                                  });
                                }	

                            }).catch(res=>{
                                this.listLoading = false
                            });
                        }
                        if(this.dialogStatus =='edit'){
                            upDataTech(obj).then(res => {
                                if(res.data.code === 1){
                                    this.$message({
                                      type: 'success',
                                      message: '编辑成功!'
                                    });
                                    this.dialogVisible = false;	
                                    var obj1={}
                                    this.listLoading = false
                                    this.getList(obj1,this.pageNumber,this.pageSize);                                  
                                }else{
                                  this.$message({
                                      type: 'warning',
                                      message: res.data.data
                                  });
                                }
                            }).catch(res=>{
                              this.listLoading = false
                            });
                        }                  

                }else{
                  this.ruleForm2.serItems=[]
                  this.showRUles=true;
                }

            																															
          } else {            
            return false;
          }
        });								
			},
			//新增或编辑弹窗cancel
      resetForm(formName) {
        this.spanFlag=true;        
        if(this.dialogStatus == 'add'){
             this.ruleForm2.name='';
             this.ruleForm2={};
             this.$refs[formName].resetFields();             
        }
        if(this.dialogStatus == 'edit'){             
             this.ruleForm2.name='';
             this.ruleForm2={};
             this.$refs[formName].resetFields();                            
        }         
        this.dialogVisible = false;					
      },
      //新增或编辑弹窗选择服务回传表格删除
      staticDelete(row){
           if(this.ruleForm2.serItems !=undefined && this.ruleForm2.serItems.length !=0){
                for(let a=0 ;a<this.listorderServer.length;a++){
                    if(row.id ==this.listorderServer[a].id ){
                       this.listorderServer[a].itemChecked=false
                       for(let b=0;b<this.listorderServer[a].commoditys.length;b++){
                         this.listorderServer[a].checkedCities=[];
                       }
                    }
                }                            
               this.ruleForm2.serItems.remove(row);
           }                                 
      },
      //新增或编辑弹窗选择技师回传TAB删除
      errorClose(obj){
          if(this.tabOptions !=undefined && this.tabOptions.length !=0){
                for(let a=0 ;a<this.listTech.length;a++){
                    if(obj.techId ==this.listTech[a].techId ){
                       this.listTech[a].techChecked=false
                    }
                }                                       
                this.tabOptions.remove(obj);
          }           
      },
      //选择服务弹窗保存
      submitForm1() {
      //先遍历数据中选中的再保存
      if(this.listorderServer != undefined && this.listorderServer.length !=0){
                this.showRUles=false;
                var arr=[];
                for(var i=0 ;i<this.listorderServer.length;i++){             
                    if(this.listorderServer[i].itemChecked){
                          if(this.listorderServer[i].commoditys.length ==this.listorderServer[i].checkedCities.length){
                                arr.push(this.listorderServer[i]);
                          }else{
                              var obj1={ };
                              var obj=[];
                              for(var a=0 ;a<this.listorderServer[i].commoditys.length;a++){
                                  for(var b=0 ;b<this.listorderServer[i].checkedCities.length;b++){
                                    if(this.listorderServer[i].commoditys[a].id==this.listorderServer[i].checkedCities[b]){
                                        obj.push(this.listorderServer[i].commoditys[a])
                                        obj1=Object.assign({},this.listorderServer[i])
                                        obj1.commoditys=obj
                                        arr.push(obj1);
                                    }
                                  }
                              }               
                          }
                    }
                }
      }

        this.ruleForm2.serItems=arr;
        var obj1=this.ruleForm2.serItems;
        if(obj1.length){
            for(var i=0;i<obj1.length;i++){                
                  var comLen=obj1[i].commoditys.length;
                  var objName=''
                  for(var j=0; j<comLen;j++){ 
                        if(obj1[i].commoditys[j].name){
                            objName+=','+obj1[i].commoditys[j].name;
                        }                                                      
                }
                if(objName){
                  this.ruleForm2.serItems[i].serItemCommoditys=objName.substring(1); 
                }                                                                                          
            } 
        }        
        this.flagserver = false				
      },
      //选择服务弹窗cancel
      resetForm1() {        
         this.flagserver = false
      },
      //选择技师弹出层保存
      submitForm2() {
		    //先遍历数据中选中的再保存
        var arr=[];
        if(this.listTech != undefined &&  this.listTech.length != 0){
            for(let a=0;a<this.listTech.length;a++){
                if(this.listTech[a].techChecked == true){
                  arr.push(this.listTech[a]);
                }
            }
        }
        this.tabOptions=arr
        this.ordertech = false;		
      },
      //选择技师弹出层cancel
      resetForm2() {
         this.ordertech = false;	
      },                   
      //表格数据获取
      getList(pramsObj,pageNo,pageSize) {
        this.listLoading = true;
		  	var obj = pramsObj;
        getListdata(obj,pageNo,pageSize).then(res => {
           if(res.data.code === 1){
           this.getListdata = res.data.data.list;
           if(res.data.data.list != undefined){
              for(var a=0;a<this.getListdata.length;a++){
                this.getListdata[a].index=a+1;
              }
           }                     
           this.total = res.data.data.count;           
          }
          this.listLoading = false
        }).catch(res=>{
            this.listLoading = false
			  });                
      },
      handleSizeChange(val) {
        this.pageSize=val;        
				 var obj={
           name:this.localSearch,
				 }
				this.getList(obj,this.pageNumber,this.pageSize);        
      },          
      handleCurrentChange(val) {
        this.pageNumber=val;
        var obj={
        }
	      this.getList(obj,this.pageNumber,this.pageSize);   
      },         
      //总数据删除
      handleDelete(row) { 
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            id: row.id
          }
          techDelet(obj).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            var obj={
                }
	          this.getList(obj,this.pageNumber,this.pageSize); 
            } else {
              this.$message({
                type: 'warning',
                message: '分类下有服务项目，不可删除'
              });
            }
          }).catch(() => console.log("未知错误"))

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //选择服务按钮
      choseServer() {
            this.flagserver = true;                    	 		                                 
      },           
      //选择技师按钮
      orderTech() {
        this.ordertech = true;
      },
      //选择服务弹出层查询按钮      
      quiry() {          
          this.$nextTick( () => {
            //前端定位
            var falg=0;
            var len = this.listorderServer.length;
              for(var i=0;i<len;i++){
                if(this.listorderServer[i].name.indexOf(this.xingmu) >0){
                      falg=1;
                      this.$refs.tableItem[i].scrollIntoView()
                      this.$refs.tableItem[i].style.backgroundColor='#eee'                    
                }else{
                  this.$refs.tableItem[i].style.backgroundColor='#fff' 
                }                   
              }             
              if(falg ==0){
                this.promShow=true;
                var that=this;
                setTimeout(function(){
                  that.promShow=false;                  
                },2000);
                
              }else{
                this.promShow=false;
              }
        })                             
      },
      //选择技师弹出层查询按钮
      searchTeh(){        
            this.$nextTick( () => {
              //前端定位
              var falg1=0;              
                    var len = this.listTech.length;
                      for(var i=0;i<len;i++){
                        if(this.listTech[i].techName == this.techName.trim() || this.listTech[i].techStationId== this.techStationId ){
                            falg1=1;
                              this.$refs.tableItem1[i].scrollIntoView()
                              this.$refs.tableItem1[i].style.background='#eee'                    
                        }else{
                          this.$refs.tableItem1[i].style.background='#fff' 
                        }                   
                      } 
                              
                if(falg1 ==0){
                  var that=this
                  this.promShow1=true;
                  setTimeout(function(){
                    that.promShow1=false;                  
                  },2000);
                }else{ 
                  this.promShow1=false;
                }
            })             
         

      }
    },
    mounted() {
       this.getList();			
    }
  }

</script>
<style  scoped>
   .padBot20{padding-bottom:20px;}
   .width200{width:200px;}
   .width220{width:220px;}
   .width300{width:300px;}
   .selfMarLef10{margin-left:10px;}
   .selfInmpotInf{font-size: 12px; margin-top: 10px; color: red;}
   .selfFLORight{float:right}
   .selfFLOLeft{float:left;} 
   .width120{width:120px;}
   .height100{height:100px;}
   .selfFooter{text-align:center;margin-top:30px;}
   .selfTdStyle{background: #F8F8F9;height:30px;}
   .userHeaderStyle{width:85px;height:90px;line-height:90px;border:1px solid #ccc;}
   .selfOVerflow{float:left;margin-top:20px;width:100%;margin-bottom:20px;height:300px;overflow-y:scroll;}
   .selfOVerflow1{margin-top:20px;width:100%;margin-bottom:20px;height:300px;overflow-y:scroll;}
   .selfBottonSt{float:left;width:500px;}
   .selfTableSt{width:500px;margin:0px;float:left}
   .selfst1{background:none;}
   .selfst2{float:left;width:500px;}
   .selfst3{margin-top:30px;}
   .techPag{float:right;margin-top:20px;}
   .showRules{font-size:12px;color:red;width:100%;height:30px;line-height:30px;display:inline-block;}
   .active{background:#ddd}
   .selfTable,.selfTable tr th, .selfTable tr td { border:1px solid #eee; }
   .selfTable { min-height: 25px; line-height: 25px; text-align: center; border-collapse: collapse; padding:2px;} 
   .tabWrap{width:100px;margin-right:20px;font-size:12px;display:inline-block;height:25px;text-align:center;line-height:25px;border-radius:12px;border:1px solid #bfcbd9;position:relative;}
   .closePic{cursor:pointer;color:#bfcbd9;font-size:12px;position:absolute;margin-left:80px;top:0px;}
    .bgWhite {
      background-color: #ffffff;
      padding: 20px;
    }
    .bgbot70{
      padding-bottom:70px;
    }
    .btn_pad {
      margin: 0px 0px 10px 20px;
    }

    .btn_right {
      float: right;
    }

    .tech-order-jnsk {
      width: 400px;
      height: 36px;
      border: 1px solid #bfcbd9;
      position: relative;
      line-height: 36px;
    }

    .tech-order-btnsk {
      color: #4c70e8;
      border: none;
      outline: none;
      cursor: pointer;
      margin-left: 10px;
    }
  .skill-delte{
    border: none;
    background: none;
    width:100px;
    height:50px;
    color: red;
    outline: none;
    cursor: pointer;
  }

  .role-table {
      list-style:none;
      border: 1px solid #e0e0e0;
      border-bottom: none;
      padding: 0;
      position: relative;
  }

  .header {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e7e7e7;
      background: #F8F8F9;
      text-align: center;
  }

  .vertical-line {
      width: 1px;
      height: 100%;
      background: #ddd;
      position: absolute;
      left: 30%;
      top: 0
  }

  .left {
      width: 30%;
      float: left;
      padding-left: 10px;
    text-align:left;
      user-select: none;
      cursor: pointer;
  }

  .one {
      padding-left: 20px;
  }

  .right {
      width: 70%;
      float: left;
      padding-left: 10px;
  }

  .item-icon {
      margin-left: -5px;
      padding: 5px;
  }

  .line {
      clear: both;
      width: 100%;
      height: 1px;
      background: #e0e0e0;
  }
  .h40{
      height: 39px;
      line-height: 39px;
  }
  [v-cloak] {
      display: none;
  }			
</style>

