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
            <el-form-item label="选择分类" prop="staffClass">
              <el-select v-model="ruleForm2.staffClass" multiple filterable placeholder="请选择分类" style="width:300px;"  class="selfTabs">
                <el-option
                  v-for="item in Options2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :disabled="item.flag">
                </el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="选择技师" prop="technicians" class="selfst3">
             <div class="tech-order-jnsk selfst2">
                  <div class="tech-order-btnsk selfst1"  @click="orderTech"> &#10010 请选择</div>
            </div>
            </el-form-item>
            <el-form-item label=""> 
                  <div class="tabWrap" v-for="item in tabOptions" :key="item.techId">
                    <div class="techNameStyle">{{item.techName}}</div>
                    <div class="closePic" @click="selfErrorClose(item)">&#10005</div>
                  </div>              
            </el-form-item>           
          </el-form>
    
          <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large"  :disabled="submitFlag"  @click="submitForm('ruleForm2')">保存</button>
              <button class="button-cancel"  @click="resetForm('ruleForm2')">取消</button>
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
                          <td  align="center"><el-checkbox  v-model="item.techChecked" @change="testTech(item)"></el-checkbox></td>
                          <td  class="height110" align="center"><img class="imgStyle" :src="item.headPic+'?x-oss-process=image/resize,m_fill,h_100,w_100'"/></td>
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
        Options2:[],        
        submitFlag:false,
        jumpPage:1,
        title:'新增技能',
        btnShow: this.$store.state.user.buttonshow,
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
          ],
          staffClass: [
            { required: true,type:'array',message:'请选择分类', trigger: 'change' },
          ]          
        },
        ruleForm2: {
          name:'',
          staffClass:[],//选择分类下拉对象
          technicians:[],    
        },
        commodityse: {},
        options: [],
        checkbox: false,
        getListdata: [],
        ordertech: false,
        xingmu: '',
        listTech:[],       
        checked: false,
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
        promInf1:'搜索内容不存在!',
        middleA:[]
      }
    },
    computed: {
   },  
    methods: {   	  
      //全局搜索按钮
      search(){
        var obj={
              name:this.localSearch,
        }
        this.pageNumber=1;
        this.jumpPage=1;
        this.getList(obj,this.pageNumber,this.pageSize);
      },
      testTech(obj){
        if(obj.techChecked){
           this.middleA.push(obj)
        }else{
          this.middleA.remove(obj)
        }
        console.log(this.middleA)
      },
      //全局新增按钮
      add(status,row){     
            var obj={}
            this.middleA=[];
            this.listLoading = true;
            //服务技师与分类、服务站获取             
            orderServer(obj).then(res => {      
              if (res.data.code === 1) {            
                  this.Options2=res.data.data.list;
                  this.options=res.data.data.stations 
                  this.listTech=res.data.data.techs
                  this.dialogVisible = true;                                                                             
              }         
              this.listLoading = false;
            }).catch(res=>{
                
            });         
          this.dialogStatus=status;                 
          this.tabOptions=[];                 		  		                          
         if(this.dialogStatus =='add'){
           this.title='新增技能'
           //新增操作                                
           this.id=''                      
         }else if(this.dialogStatus =='edit'){
           this.title='编辑技能'
           //编辑操作           
           this.id=row.id;
            var obj = {
                id:this.id
            }
            editTech(obj).then(res => {
                if (res.data.code === 1) {
                  this.ruleForm2.name=res.data.data.info.name;
                  if(res.data.data.info.sortIds != undefined){
                      var ids=res.data.data.info.sortIds
                      this.selectionreturn(ids);//分类回显
                  }                                           
                  if(res.data.data.info.technicians != undefined){
                      this.tabOptions=res.data.data.info.technicians;
                      this.selectionreturn1();
                  }
                }         
            }).catch(res=>{
                
            });                      
         }         
      },
      //服务数据回显二级选中
      selectionreturn(ids){
        this.ruleForm2.staffClass= ids      
      },
      //技师数据回显二级选中
      selectionreturn1(){
        if(this.tabOptions.length != undefined){
            for(let a=0;a<this.listTech.length;a++){
              for(let b=0;b<this.tabOptions.length;b++){
                  if(this.tabOptions[b].techId == this.listTech[a].techId){
                    this.listTech[a].techChecked=true;
                    this.testTech(this.listTech[a]);
                  }
              }
            }
        }                                        
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
                          sortIds:this.ruleForm2.staffClass
                        }
                        if(this.dialogStatus =='add'){
                            saveServer(obj).then(res => {
                                if(res.data.code === 1){
                                    this.$message({
                                      type: 'success',
                                      message: '新增成功!'
                                    });
                                    this.$refs['ruleForm2'].resetFields();
                                    this.middleA=[]; 
                                    this.dialogVisible = false;
                                    this.localSearch='';	
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
                                    this.$refs['ruleForm2'].resetFields();
                                    this.middleA=[];
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
          } else {            
            return false;
          }
        });								
			},
			//新增或编辑弹窗cancel
      resetForm(formName) {       
        if(this.dialogStatus == 'add'){
             this.ruleForm2.name='';
             this.$refs[formName].resetFields();             
        }
        if(this.dialogStatus == 'edit'){             
             this.ruleForm2.name='';
             this.$refs[formName].resetFields();                            
        }         
        this.dialogVisible = false;					
      },
      //新增或编辑弹窗选择技师回传TAB删除
      selfErrorClose(obj){
          if(this.tabOptions !=undefined && this.tabOptions.length !=0){
                for(let a=0 ;a<this.listTech.length;a++){
                    if(obj.techId ==this.listTech[a].techId ){
                       this.listTech[a].techChecked=false
                    }
                }                                       
                this.tabOptions.remove(obj);
          }           
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
                message: res.data.data
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
      //选择技师按钮
      orderTech() {
        this.ordertech = true;
      },
      //选择技师弹出层查询按钮
      searchTeh(){
            console.log(this.middleA) 
            var obj={
                techName:this.techName,
                techStationId:this.techStationId
            }
            //服务技师获取             
            orderServer(obj).then(res => {      
              if (res.data.code === 1) {            
                  this.listTech=res.data.data.techs;
                  console.log(this.listTech);
                  for(let b=0;b<this.listTech.length;b++){
                      for(let a=0;a<this.middleA.length;a++){
                          if(this.listTech[a].techStationId == this.middleA[b].techStationId){
                               console.log("aaa");
                               this.listTech[a].techChecked=true;
                          }
                      } 
                  }                                                                           
              }         
            }).catch(res=>{
                
            });                                
      }
    },
    mounted() {
       this.getList();			
    }
  }

</script>
<style  scoped>
   .techNameStyle{width:80px;height:25px;line-height:25px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
   .padBot20{padding-bottom:20px;}
   .width200{width:200px;}
   .width220{width:220px;}
   .width300{width:300px;}
   .selfTabs .el-select .el-tag{
     line-height:23px;
   }
   .selfMarLef10{margin-left:10px;}
   .selfInmpotInf{font-size: 12px; margin-top: 10px; color: red;}
   .selfFLORight{float:right}
   .selfFLOLeft{float:left;} 
   .width120{width:120px;}
   .height110{height:110px;}
   .selfFooter{text-align:center;margin-top:30px;}
   .selfTdStyle{background: #F8F8F9;height:30px;}
   .imgStyle{display:block;}
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
      width: 300px;
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

