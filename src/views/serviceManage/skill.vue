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
                      <el-table-column label="技师个数" align="center" prop="technicianNum"> </el-table-column>
                      <el-table-column align="center" label="操作" min-width="100px">
                        <template scope="scope">
                            <el-button class="el-icon-edit" @click="add('edit',scope.row)"></el-button>
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
                  <el-table-column prop="itemName" label="项目名称" width="100" height="30" align="center">
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
                  <button class="tech-order-btnsk" @click="orderTech"> &#10010 请选择</button>
            </div>
            </el-form-item>
            <el-form-item label="" > 
                  <div class="tabWrap" v-for="item in tabOptions" :key="item.technicianId">
                    {{item.technicianName}}
                    <div class="closePic"  @click="errorClose(item)">&#10005</div>
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
              </div>
              <div style="float:right"><button class="button-large" @click="quiry">查询</button></div>
              <div style="float:left;margin-top:20px;width:100%;">
                <el-table ref="multipleTable" :data="listorderServer" border  style="width: 100%;" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="" align="center">
                  </el-table-column>
                  <el-table-column label="项目名称" align="center" prop="itemName">
                       
                  </el-table-column>
                  <el-table-column label="商品名称" align="center" prop="serItemCommoditys">                    
                  </el-table-column>                 
                </el-table>
                <div  class="pagination-container" style="float:right;margin-top:20px;margin-bottom:20px;">
                  <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" 
                    :page-sizes="[10,20,30, 50]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper"
                    :total="total1">
                  </el-pagination>
                </div>                  
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
              </div>
              <div style="float:right"><button class="button-large" @click="searchTeh">查询</button></div>              
              <div style="float:left;margin-top:20px;width:100%;">
                  <el-table ref="multipleTable1" :data="listTech" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange1">
                    <el-table-column type="selection" width="55" align="center" v-model="checkbox">
                    </el-table-column>
                    <el-table-column label="头像" width="120" align="center" prop="imgUrl">  
                    </el-table-column>
                    <el-table-column label="姓名" width="120" align="center" prop="technicianName">
                    </el-table-column>
                    <el-table-column label="性别" show-overflow-tooltip align="center" >
                        <template scope="scope">
                            <span v-if="scope.row.techSex =='1'">男</span>
                            <span v-if="scope.row.techSex =='2'">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="服务站" show-overflow-tooltip align="center" prop="techStationName">
                    </el-table-column>
                  </el-table>
                  <div  class="pagination-container" style="float:right;margin-top:20px;margin-bottom:20px;">
                    <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" 
                      :page-sizes="[10,20,30, 50]"  :page-size="pageSize2" layout="total, sizes, prev, pager, next, jumper"
                      :total="total2">
                    </el-pagination>
                  </div>                
              </div>             
              <div slot="footer" class="dialog-footer" style="text-align:center;">
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
    techDelet
  } from '@/api/skill'
  //挂载数据
  export default {
    name: '',
    data() {
      return {       
        qunxian:["ser_add","ser_edit"],
        localSearch:'',
        //tabName
        tabOptions:[
        ],
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
        listorderServer: {
        },
        listorderServer1: {
        },        
        checked: false,
        multipleSelection:[],
        multipleSelection1:[],
        ortech: false,
        total: null,
        pageSize:10,
        total1:null,
        pageSize1:10,
        total2:null,
        pageSize2:10,
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
      }
    },
    methods: {     
      cityChange(value){
        
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
          this.$nextTick(() => {
              this.getOrderserver();
          })
          this.$nextTick(() => {
              this.getorderTech(); 
          })         
          this.originData=[];
          this.tabOptions=[]                  
         if(this.dialogStatus =='add'){
           //新增操作
            this.ruleForm2={};
            this.id='';
             
            this.ruleForm2.name='';
         }else if(this.dialogStatus =='edit'){
           //编辑操作
           this.ruleForm2={};
           this.id=row.id;
           this.ruleForm2.name=row.name; 
           this.ruleForm2.serItems=row.serItems         
           if(this.ruleForm2.serItems.length){
                  var obj1=row.serItems;
                  for(var i=0;i<obj1.length;i++){                
                        var comLen=obj1[i].serItemCommoditys.length;
                        var objName=''
                        for(var j=0; j<comLen;j++){ 
                              if(obj1[i].serItemCommoditys[j].commodityName){
                                  objName+=','+obj1[i].serItemCommoditys[j].commodityName;
                              }                                                      
                      }
                      if(objName){
                        this.ruleForm2.serItems[i].serItemCommoditys=objName.substring(1); 
                      }                                                                                          
                  }   
           }                    
           this.tabOptions=row.technicians           
         }         
      },
      //服务数据回显二级选中
      selectionreturn(){
        if(this.ruleForm2.serItems.length){
           this.listorderServer.forEach((row) => {
                for(var i=0 ;i<this.ruleForm2.serItems.length;i++){
                      if(row.itemId == this.ruleForm2.serItems[i].itemId){                   
                        this.$nextTick(() => {                         
                          this.$refs.multipleTable.toggleRowSelection(row);  
                        })
                        
                      }
                }
           })           
        }                                      
         
      },
      //技师数据回显二级选中
      selectionreturn1(){
        if(this.tabOptions.length){
           this.listTech.forEach((row) => {
                for(var i=0 ;i<this.tabOptions.length;i++){
                      if(row.technicianId == this.tabOptions[i].technicianId){                   
                        this.$nextTick(() => {                         
                          this.$refs.multipleTable1.toggleRowSelection(row);  
                        })
                        
                      }
                }
           })
        }                                                
      },      
      //新增或编辑弹窗保存
      submitForm(formName) {
        this.ruleForm2.technicians=this.tabOptions 
        if(this.ruleForm2.serItems.length){
          for(var i=0;i<this.ruleForm2.serItems.length;i++){
              var id=this.ruleForm2.serItems[i].itemId
              for(var j = 0; j< this.listorderServer1.length; j++){
                var id1=this.listorderServer1[j].itemId;
                if(id==id1){              
                    this.originData.push(this.listorderServer1[j]); 
                }
              }         
          } 
        }     
             	   
        this.$refs[formName].validate((valid) => {
          if (valid) {
                var obj={
                  id:this.id,
                  name:this.ruleForm2.name,
                  technicians:this.ruleForm2.technicians,
                  serItems:this.originData
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
               this.ruleForm2.serItems.remove(row);
           }                                 
      },
      //新增或编辑弹窗选择技师回传TAB删除
      errorClose(obj){
          if(this.tabOptions.length){
             this.tabOptions.remove(obj);
          }           
      },
      //选择服务弹窗保存
      submitForm1() {
        if(this.dialogStatus == 'add'){
           this.ruleForm2.serItems=this.multipleSelection;
           this.$refs.multipleTable.clearSelection();
        }
        if(this.dialogStatus == 'edit'){
          this.ruleForm2.serItems=this.multipleSelection;         
          this.$refs.multipleTable.clearSelection();         
        } 
         
        this.flagserver = false				
      },
      //选择服务弹窗cancel
      resetForm1() {
        if(this.dialogStatus == 'add'){
          
        }
        if(this.dialogStatus == 'edit'){
          this.$refs.multipleTable.clearSelection();
        }        
         this.$refs.multipleTable.clearSelection();
         this.flagserver = false
      },
      //选择技师弹出层保存
      submitForm2() {	
        this.tabOptions=this.multipleSelection1;
        this.$refs.multipleTable1.clearSelection(); 
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
      handleSizeChange1(val) {
        this.pageSize1=val;        
				 var obj={
           itemName:this.xingmu,
				 }
				this.getOrderserver(obj,this.pageNumber1,this.pageSize1);   
      },
      handleSizeChange2(val) {
        this.pageSize2=val;        
				 var obj={
         }
         this.getorderTech(obj,this.pageNumber2,this.pageSize2);  
      },            
      handleCurrentChange(val) {
        this.pageNumber=val;
				 var obj={
				 }
				this.getList(obj,this.pageNumber,this.pageSize);   
      },
       handleCurrentChange1(val) {
         this.pageNumber1=val;
				 var obj={
           name:this.xingmu,
				 }
				this.getOrderserver(obj,this.pageNumber1,this.pageSize1);   
      },
      handleCurrentChange2(val) {
        this.pageNumber2=val;
				 var obj={
				 }
				this.getorderTech(obj,this.pageNumber2,this.pageSize2);    
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
        this.$nextTick(() => {
            this.getOrderserver();
        })
        this.$nextTick(() => {   
            this.selectionreturn()
        })                                 
      },
      //服务列表获取
      getOrderserver(pramsObj,pageNo,pageSize){              
		  	var obj = pramsObj;
        orderServer(obj,pageNo,pageSize).then(res => {      
          if (res.data.code === 1) {               
              this.listorderServer=res.data.data.list;                                         
              var obj1=res.data.data.list;
             if(res.data.data.list.length){
                for(var i=0;i<obj1.length;i++){                
                        var comLen=obj1[i].serItemCommoditys.length;
                        var objName=''
                      for(var j=0; j<comLen;j++){                           
                                objName+=','+obj1[i].serItemCommoditys[j].commodityName;
                                
                      }
                      this.listorderServer[i].serItemCommoditys=objName.substring(1);                                                                      
                  } 
              }

              this.$nextTick(() => {
                 this.getdata();
              })                           
          }else{

          }          
          
        }).catch(res=>{
            
			  });

      },
      //存储原服务数据
      getdata(pramsObj,pageNo,pageSize){
  		  	var obj = pramsObj;
        orderServer(obj,pageNo,pageSize).then(res => {      
          if (res.data.code === 1) {               
              this.listorderServer1=res.data.data.list;                                                                   
          }else{

          }          
          
        }).catch(res=>{
            
			  });         
      },
      
      //选择技师按钮
      orderTech() {
        this.ordertech = true;
         this.$nextTick(() => {
              this.getorderTech(); 
         })
        this.$nextTick(() => {   
            this.selectionreturn1()
        }) 
      },
      //技师列表获取
      getorderTech(pramsObj,pageNo,pageSize){
        getListser().then(res => {
          this.options = res.data;
        });                 
		  	var obj = pramsObj;
        Skillserver(obj,pageNo,pageSize).then(res => {
          if (res.data.code === 1) {
                this.listTech=res.data.data.list
                this.total2=res.data.data.count;                            
          }else{

          }          
          
        }).catch(res=>{
            
			  });

      },      
      // 选择服务全选
      handleSelectionChange(val) {
        this.multipleSelection = val;
        if(val.length == 0 && this.ruleForm2.serItems.length){
              this.listorderServer.forEach((row) => {
                  for(var i=0 ;i<this.ruleForm2.serItems.length;i++){
                        if(row.itemId == this.ruleForm2.serItems[i].itemId){                   
                          this.$nextTick(() => {                         
                            this.$refs.multipleTable.toggleRowSelection(row);  
                          })                       
                        }
                  } 
                })
        }      
      },
      // 选择技师全选
      handleSelectionChange1(val) {
        this.multipleSelection1 = val;
        if(val.length == 0 && this.tabOptions.length){
           this.listTech.forEach((row) => {
                for(var i=0 ;i<this.tabOptions.length;i++){
                      if(row.technicianId == this.tabOptions[i].technicianId){                   
                        this.$nextTick(() => {                         
                          this.$refs.multipleTable1.toggleRowSelection(row);  
                        })
                        
                      }
                }
           })           
        }
      },
      //选择服务弹出层查询按钮      
      quiry() {
				 var obj={
           itemName:this.xingmu,
				 }
				this.getOrderserver(obj,this.pageNumber1,this.pageSize1);           
      },
      //选择技师弹出层查询按钮
      searchTeh(){
          var obj={
              technicianName:this.techName,
              techStationId:this.techStationId
				   }
           this.getorderTech(obj,this.pageNumber2,this.pageSize2); 
      }
    },
    mounted() {
      this.getList();
    }
  }

</script>
<style scoped>
  .tabWrap{width:100px;margin-right:20px;font-size:12px;display:inline-block;height:25px;text-align:center;line-height:25px;border-radius:12px;border:1px solid #bfcbd9;position:relative;}
  .closePic{cursor:pointer;color:#bfcbd9;font-size:12px;position:absolute;margin-left:80px;top:0px;}
  .checkRightBox {
    border: solid 1px #dcdcdc;
    padding: 10px;
  }

  .checkAllBox {
    padding: 10px 0;
  }

  .checkBox1 {
    padding: 10px 0;
    border-top: solid 1px #dcdcdc;
    border-bottom: solid 1px #dcdcdc;
  }

  .checkBox2 {
    padding: 10px 0;
  }

  .checkBox3 {
    padding: 10px 0;
    border-top: solid 1px #dcdcdc;
  }

  body {
    background-color: #f5f5f5;
  }

  .bgWhite {
    background-color: #ffffff;
    padding: 20px;
    padding-bottom: 70px;
  }

  .btn_pad {
    margin: 0px 0px 15px 20px;
  }

  .btn_right {
    float: right;
  }

  .skill-ul {
    padding: 0 30px;
  }

  .skill-ul>li {
    margin: 20px 0;
  }


  .skill-ul>li>div>p:nth-child(1) {
    width: 120px;
  }

  .skill-ul>li>div>p {
    display: flex;
    line-height: 36px;
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

  .tech-spansk {
    color: red;
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


  .clearfix:after {
    content: " ";
    display: block;
    clear: both;
    height: 0;
  }

  .clearfix {
    zoom: 1;
  }

  .skill-server-ul {
    padding: 0 20px;
  }

  .skill-server-ul>li {
    margin: 10px 0;
  }
.role-table {
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
