<template>
  <div class="box">
    <div class="filter-container bgWhite">
      <el-input  style="width: 200px;" class="filter-item" placeholder="请输入搜索的技能名称" v-model="localSearch">
      </el-input>
      <button @click="search" class="search-button btn_right el-icon-search"> 搜索</button>
    </div>
    <div class="app-container calendar-list-container">
      <div class="">
        <div class="bgWhite">
          <button class="button-small btn_right btn_pad ceshi ceshi5"  style="width:80px" @click="add('add')">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>
          <el-table  :data="getListdata" v-loading="listLoading" stripe  highlight-current-row element-loading-text="正在加载"
            style="width: 100%">
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
        </div>
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
             layout="total, sizes, prev, pager, next, jumper" :page-size="pageSize" :total="total">
          </el-pagination>
        </div>
        <!-- 弹出层新增技能 -->
        <el-dialog title="新增技能" :visible.sync="dialogVisible" :modal-append-to-body="false" :close-on-click-modal="false">
          <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="130px" class="demo-ruleForm" label-position="left">
            <el-form-item label="技能名称" prop="name">
              <el-input  v-model="ruleForm2.name"  style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="选择服务" prop="serItems" required>
              <div class="tech-order-jnsk" style="float:left;width:500px;">
                  <button class="tech-order-btnsk" @click="choseServer">&#10010 请选择</button>
              </div>
              <el-table :data="ruleForm2.serItems" border style="width:500px;margin:0px;float:left" >
                  <el-table-column prop="name" label="项目名称" width="100" height="30" align="center">
                  </el-table-column>
                  <el-table-column prop="commoditys" label="商品名称" width="180" align="center">
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
          </el-form>
          <div v-if="techShow" >
            <div class="tabWrap" v-for="item in tabOptions" :key="item.id">
              {{item.techName}}
              <div class="closePic"  @click="errorClose(item)">&#10005</div>
            </div>
          </div>     
          <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large"   @click="submitForm('ruleForm2')">保存</button>
              <button class="button-cancel"  @click="resetForm('ruleForm2')">取消</button>
          </div>          
        </el-dialog>
        <!-- 选择服务弹出层 -->
        <el-dialog title="选择服务" :visible.sync="flagserver"   :close-on-click-modal="false">
          <ul class="skill-server-ul">
            <li class="clearfix">
              <div style="float:left">
                <el-input placeholder="输入要搜索的项目名称" style="width:220px" v-model="xingmu"></el-input>
              </div>
              <div style="float:right"><button class="button-large" @click="quiry">查询</button></div>
              <li>
                <el-table ref="multipleTable" :data="listorderServer" border  style="width: 100%;margin:0;" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="" align="center">
                  </el-table-column>
                  <el-table-column label="项目名称" align="center" prop="name">
                  </el-table-column>
                  <el-table-column label="商品名称" align="center" prop="commoditys">                    
                  </el-table-column>
                </el-table>                
              </li>
              <li>
                <div  class="pagination-container">
                  <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" 
                    :page-sizes="[10,20,30, 50]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper"
                    :total="total1">
                  </el-pagination>
                </div>
              </li>
          </ul>
           <div slot="footer" class="dialog-footer" style="text-align:center;">
              <button class="button-large"   @click="submitForm1()">保存</button>
              <button class="button-cancel"  @click="resetForm1()">取消</button>
           </div>                    
        </el-dialog>

        <!-- 选择技师弹出层 -->
        <el-dialog title="选择服务人员" :visible.sync="ordertech" :modal="false" :modal-append-to-body="false" :close-on-click-modal="false">
          <ul class="skill-server-ul">
            <li class="clearfix">
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
              <li>
                <el-table ref="multipleTable1" :data="listTech" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange1">
                  <el-table-column type="selection" width="55" align="center" v-model="checkbox">
                  </el-table-column>
                  <el-table-column label="头像" width="120" align="center" prop="imgUrl">  
                  </el-table-column>
                  <el-table-column label="姓名" width="120" align="center" prop="techName">
                  </el-table-column>
                  <el-table-column label="性别" show-overflow-tooltip align="center" prop="techSex">
                  </el-table-column>
                  <el-table-column label="服务站" show-overflow-tooltip align="center" prop="techStationName">
                  </el-table-column>
                </el-table>
              </li>
              <li>
                <div  class="pagination-container fy">
                  <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" 
                    :page-sizes="[10,20,30, 50]"  :page-size="pageSize2" layout="total, sizes, prev, pager, next, jumper"
                    :total="total2">
                  </el-pagination>
                </div>
              </li>
          </ul>
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
    parseTime
  } from '@/utils'
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
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
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
        temp: {
          option1: ''
        },
        importanceOptions: [1, 2, 3],
        dialogFormVisible: false,
        dialogStatus: 'add',
        test:[]
      }
    },
    methods: {
      testfunction(){
        console.log(this.$store.state.user.buttonshow)
        this.test=this.$store.state.user.buttonshow;
          console.log(this.test[3].subMenus[0].name);

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
         if(this.dialogStatus =='add'){
           //新增操作
           this.ruleForm2={};
            this.ruleForm2.name='';
         }else if(this.dialogStatus =='edit'){
           //编辑操作
           this.ruleForm2={};
            this.ruleForm2.name=row.name;

           
         }
         
         
      },
      //新增或编辑弹窗保存
      submitForm(formName) {
        if(this.dialogStatus == 'add'){

        }
        if(this.dialogStatus == 'edit'){
 
        }          	   
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;																																
          } else {            
            return false;
          }
        });								
			},
			//新增或编辑弹窗cancel
      resetForm(formName) {
        if(this.dialogStatus == 'add'){
             this.ruleForm2.name='';
        }
        if(this.dialogStatus == 'edit'){
             this.ruleForm2.name='';
        }         
        this.dialogVisible = false;	
        this.$refs[formName].resetFields();
        this.ruleForm2={};
				
      },
      //新增或编辑弹窗选择服务回传表格删除
      staticDelete(row){
           this.ruleForm2.serItems.remove(row);
      },
      //新增或编辑弹窗选择技师回传TAB删除
      errorClose(obj){
          this.tabOptions.remove(obj); 
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
        this.techShow=true;			
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
           name:this.xingmu,
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
        this.getOrderserver();        
      },
      //服务列表获取
      getOrderserver(pramsObj,pageNo,pageSize){        
		  	var obj = pramsObj;
        orderServer(obj,pageNo,pageSize).then(res => {
          if (res.data.code === 1) {
              this.listorderServer=res.data.data.list
              var obj1=res.data.data.list;
              for(var i=0;i<obj1.length;i++){                
                    var comLen=obj1[i].commoditys.length;
                    var objName=''
                    for(var j=0; j<comLen;j++){
                            objName+=','+obj1[i].commoditys[j].name;
                  }
                  this.listorderServer[i].commoditys=objName.substring(1);
                  this.total1=res.data.data.count;                  
              }            
          }else{

          }          
          
        }).catch(res=>{
            
			  });

      },
      //选择技师按钮
      orderTech() {
        this.ordertech = true;
        this.getorderTech();
      },
      //技师列表获取
      getorderTech(pramsObj,pageNo,pageSize){        
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
      },
      // 选择技师全选
      handleSelectionChange1(val) {
        this.multipleSelection1 = val;
      },
      //选择服务弹出层查询按钮      
      quiry() {
				 var obj={
           name:this.xingmu,
				 }
				this.getOrderserver(obj,this.pageNumber1,this.pageSize1);           
      },
      //选择技师弹出层查询按钮
      searchTeh(){
          var obj={
              techName:this.techName,
              techStationId:this.techStationId
				   }
           this.getorderTech(obj,this.pageNumber2,this.pageSize2); 
      }
    },
    mounted() {
      this.testfunction();
      this.getList();
      Skillserver().then(res => {
        this.listTech = res.data.data.list
      });
      getListser().then(res => {
        this.options = res.data;
      });
      orderServer().then(res => {
        this.listorderServer = res.data.data.list
      })

    }
  }

</script>
<style scoped>
  * {
    list-style: none;
  }
  .tabWrap{width:100px;margin-right:20px;font-size:12px;display:inline-block;height:25px;text-align:center;line-height:25px;border-radius:12px;border:1px solid #bfcbd9;position:relative;}
  .closePic{cursor:pointer;color:#bfcbd9;font-size:12px;position:absolute;margin-left:80px;margin-top:-25px;}
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
    padding: 15px 20px 20px 20px;
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

</style>
