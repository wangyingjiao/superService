<template>
  <div class="box">
    <div class="filter-container bgWhite" style="padding-bottom:20px;">
      <el-input  style="width: 200px;" class="filter-item" placeholder="请输入搜索的技能名称" v-model="localSearch">
      </el-input>
      <button @click="search" class="search-button btn_right el-icon-search"> 搜索</button>
    </div>
    <div class="app-container calendar-list-container">
      <div class="">
        <div class="bgWhite">
          <button class="button-small btn_right btn_pad ceshi ceshi5" style="margin-top: -5px;" v-if="qunxian.indexOf('ser_add') != -1" @click="add('add')">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>
          <div style="padding-top:15px;">
              <el-table  :data="getListdata" v-loading="listLoading" stripe  highlight-current-row element-loading-text="正在加载"
                style="width: 100% ;">
                      <el-table-column align="center" label="编号" width="100" type="index"></el-table-column>
                      <el-table-column label="技能名称" align="center" prop="name"></el-table-column>
                      <el-table-column label="技师个数" align="center" prop="techNum"> </el-table-column>
                      <el-table-column align="center" label="操作" min-width="100px">
                        <template scope="scope">
                            <el-button class="el-icon-edit"  @click="add('edit',scope.row)"></el-button>
                            <el-button class="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
                        </template>
                      </el-table-column>
              </el-table>
              <div v-show="!listLoading" class="pagination-container" style="float:right;margin-top:20px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                  layout="total, sizes, prev, pager, next, jumper" :page-size="pageSize" :total="total">
                </el-pagination>
              </div>
          </div>          
        </div>
        <!-- 弹出层新增技能 -->
        <el-dialog title="新增技能" :visible.sync="dialogVisible" :modal-append-to-body="false" :close-on-click-modal="false">
          <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="130px" class="demo-ruleForm" label-position="left">
            <el-form-item label="技能名称" prop="name">
              <el-input  v-model="ruleForm2.name"  style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="选择服务" prop="serItems">
              <el-select  style="width:130px;display:none;" class="filter-item" multiple v-model="ruleForm2.serItems"  placeholder="请选择市" @change="cityChange">
										<el-option v-for="item in ruleForm2.serItems" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
							</el-select>
              <div class="tech-order-jnsk" style="float:left;width:500px;" >
                  <button class="tech-order-btnsk"  @click="choseServer">&#10010 请选择</button>
              </div>
              <el-table :data="ruleForm2.serItems"  border style="width:500px;margin:0px;float:left" >
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
            </el-form-item>
            <el-form-item label="选择技师" prop="technicians">
             <div class="tech-order-jnsk" style="float:left;width:500px;">
                  <div class="tech-order-btnsk" style="background:none;"  @click="orderTech"> &#10010 请选择</div>
            </div>
            </el-form-item>
            <el-form-item label=""> 
                  <div class="tabWrap" v-for="item in tabOptions" :key="item.technicianId">
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
                <el-input placeholder="输入要搜索的项目名称" style="width:220px" v-model="xingmu"></el-input>
                <span v-show="promShow" style="font-size: 12px; margin-top: 10px; color: red;">{{promInf}}</span>
              </div>
              <div style="float:right"><button class="button-large" @click="quiry">查询</button></div>
              <div style="float:left;margin-top:20px;width:100%;margin-bottom:20px;height:300px;overflow-y:scroll;">
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
              <div style="float:left;width:120px">
                <el-input placeholder="输入要搜索的姓名" v-model="techName" style="width:120px"></el-input>                
              </div>
              <div style="float:left;margin-left:10px;">
                <el-select clearable placeholder="请选择服务站" v-model="techStationId">
                  <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <span v-show="promShow1" style="font-size: 12px; margin-top: 10px; color: red;">{{promInf1}}</span>
              </div>
              <div style="float:right"><button class="button-large" @click="searchTeh">查询</button></div>              
              <div style="float:left;margin-top:20px;width:100%;margin-bottom:20px;height:300px;overflow-y:scroll;">
                    <div class="table-d">
                      <table width="100%" class="selfTable">
                        <tr>
                          <td  style="background: #F8F8F9;height:30px;" align="center" width="8%">选择</td>
                          <td  style="background: #F8F8F9;height:30px;" align="center" width="28%">头像</td>
                          <td  style="background: #F8F8F9;height:30px;" align="center" width="28%">姓名</td>
                          <td  style="background: #F8F8F9;height:30px;" align="center" width="10%">性别</td>
                          <td  style="background: #F8F8F9;height:30px;" align="center" width="26%">服务站</td>							
                        </tr>
                        <tr v-for="item in listTech" :key="item.techId"  ref="tableItem1">
                          <td style="height:30px;" align="center"><el-checkbox  v-model="item.techChecked"></el-checkbox></td>
                          <td style="height:30px;" align="center">{{item.headPic}}</td>
                          <td style="height:30px;" align="center">{{item.techName}}</td>
                          <td style="height:30px;" align="center">
                            <span v-if="item.techSex =='male'">男</span>
                            <span v-if="item.techSex =='female'">女</span>									
                          </td>
                          <td style="height:30px;" align="center">{{item.techStationName}}</td>							
                        </tr>
                      </table>
                    </div>            
              </div>             
              <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:30px;">
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
    Skillserver,
    getListser,
    orderServer,
    saveServer,
    techDelet,
    editTech
  } from '@/api/skill'
  //挂载数据
  export default {
    name: '',
    data() {
      return {
        promShow:false,
        promShow1:false, 
		    checkAll:false,      
        qunxian:["ser_add","ser_edit"],
        localSearch:'',
        //tabName
        tabOptions:[],
        techShow:false,
        techName:'',
        techStationId:'',
        rules: {
          name: [
          { required: true, message: '请输入技能名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
          ],
          serItems:[
            { type:'array',required: true, message: '请选择技能', trigger: 'change' },           
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
        list: [1, 2, 3],
        listTech: {},
        listTech1:{},
        listorderServer:[],
        listorderServer1: {
        },        
        checked: false,
        multipleSelection:[],
        multipleSelection1:[],
        ortech: false,
        total: null,
        pageSize:10,
        pageNumber:1,
        pageNumber1:1,
        pageNumber2:1,
        listLoading: false,
        dialogVisible: false,
        flagserver: false,
        dialogFormVisible: false,
        dialogStatus: 'add',
        aa:[],
        test:[],
        originData:[],
        id:'',
        promInf:'搜索内容不存在!',
        promInf1:'搜索内容不存在!',
      }
    },
    methods: {     
      cityChange(value){
        
	  },
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
        this.getList(obj,this.pageNumber,this.pageSize);
      },
      //全局新增按钮
      add(status,row){
          this.dialogVisible = true;
          this.dialogStatus=status;
          var obj={}
          this.getOrderserver(obj);          		  		         
          this.originData=[];
          this.tabOptions=[];                  
         if(this.dialogStatus =='add'){
           //新增操作
            this.ruleForm2={};
            this.id='';            
            this.ruleForm2.name='';
         }else if(this.dialogStatus =='edit'){
           //编辑操作           
           this.id=row.id;
            var obj = {
                id:this.id
            }
            editTech(obj).then(res => {
                let info=''
                info=res.data.data.info
                this.ruleForm2.name=info.name
                this.tabOptions=info.technicians
                this.ruleForm2.serItems=info.items 
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
            }).catch(res=>{
                
            });                      
         }         
      },
      //服务数据回显二级选中
      selectionreturn(){
                                     
         
      },
      //技师数据回显二级选中
      selectionreturn1(){
                                                
      },      
      //新增或编辑弹窗保存
      submitForm(formName) {
        this.ruleForm2.technicians=this.tabOptions                  	   
        this.$refs[formName].validate((valid) => {
          if (valid) {
                var obj={
                  id:this.id,
                  name:this.ruleForm2.name,
                  technicians:this.ruleForm2.technicians,
                  items:this.ruleForm2.serItems
                }
                saveServer(obj).then(res => {
                  this.dialogVisible = false;	
                  var obj1={}
                  this.listLoading = false
                  this.getList(obj1,this.pageNumber,this.pageSize);
                }).catch(res=>{
                    this.listLoading = false
                });
            																															
          } else {            
            return false;
          }
        });								
			},
			//新增或编辑弹窗cancel
      resetForm(formName) {
        
        if(this.dialogStatus == 'add'){
             this.ruleForm2.name='';
             this.ruleForm2={};
             this.$refs[formName].resetFields();             
        }
        if(this.dialogStatus == 'edit'){             
             this.ruleForm2.name='';                          
        }         
        this.dialogVisible = false;	
        
        
				
      },
      //新增或编辑弹窗选择服务回传表格删除
      staticDelete(row){
           if(this.ruleForm2.serItems.length){
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
          if(this.tabOptions.length){
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
      if(this.listorderServer.length){
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
        if(this.listTech.length){
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
          this.getListdata = res.data.data.list
          this.listLoading = false
          this.total = res.data.data.count;
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
              this.getList()
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
      //服务列表获取
      getOrderserver(pramsObj){              
		    var obj = pramsObj;
        orderServer(obj).then(res => {      
          if (res.data.code === 1) {            
              this.listorderServer=res.data.data.items;              
              this.options=res.data.data.stations 
              this.listTech=res.data.data.techs                                                             
          }else{

          }          
          
        }).catch(res=>{
            
		    });

      },
      //服务列表获取
      getOrderserver1(){              
		    var obj = {};
        orderServer(obj).then(res => {      
          if (res.data.code === 1) {
              this.listorderServer1=res.data.data.items;                           
              this.options1=res.data.data.stations; 
              this.listTech1=res.data.data.techs;                                                              
          }else{

          }          
          
        }).catch(res=>{
            
		    });

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
                      if(this.listorderServer[i].name == this.xingmu){
                          falg=1;
                            this.$refs.tableItem[i].scrollIntoView()
                            this.$refs.tableItem[i].style.backgroundColor='#eee'                    
                      }else{
                        this.$refs.tableItem[i].style.backgroundColor='#fff' 
                      }                   
                    }             
                    if(falg ==0){
                      this.promShow=true;
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
                              if(this.listTech[i].techName == this.techName || this.listTech[i].techStationId== this.techStationId ){
                                  falg1=1;
                                    this.$refs.tableItem1[i].scrollIntoView()
                                    this.$refs.tableItem1[i].style.background='#eee'                    
                              }else{
                                this.$refs.tableItem1[i].style.background='#fff' 
                              }                   
                            } 
                                   
                      if(falg1 ==0){
                        this.promShow1=true;
                      }else{ 
                          this.promShow1=false;
                      }
                  })             
         

      }
    },
    mounted() {
       this.getList();
       this.getOrderserver1();			
    }
  }

</script>
<style  scoped>
   .active{background:#ddd}
   .selfTable,.selfTable tr th, .selfTable tr td { border:1px solid #eee; }
   .selfTable { min-height: 25px; line-height: 25px; text-align: center; border-collapse: collapse; padding:2px;} 
   .tabWrap{width:100px;margin-right:20px;font-size:12px;display:inline-block;height:25px;text-align:center;line-height:25px;border-radius:12px;border:1px solid #bfcbd9;position:relative;}
   .closePic{cursor:pointer;color:#bfcbd9;font-size:12px;position:absolute;margin-left:80px;top:0px;}
    .bgWhite {
      background-color: #ffffff;
      padding: 20px;
      padding-bottom: 70px;
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
      background: #fff;
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

