<template>
    <div class="buttBox">
        <div class="buttDetails">
        <!-- tabs切换 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="已对接商品" name="yesDocking"></el-tab-pane>
                <el-tab-pane label="未对接商品" name="noDocking"></el-tab-pane>
            </el-tabs>
        <!-- tabs切换完成 -->
        <!-- 搜索 -->
            <div class="searchBox">
                <el-select class="butt-search" clearable v-model="search.eshopCode" placeholder="请选择" @change="searchEd(search.eshopCode)">
                    <el-option v-for="item in options" :key="item.eshopCode" :label="item.name" :value="item.eshopCode">
                    </el-option>
                </el-select>
                <el-select class="butt-search" clearable v-model="search.majorSort" placeholder="所属类型" @change="typeChange">
                    <el-option v-for="(item,key) in thisType" :key="key" :label="item" :value="key">
                    </el-option>
                </el-select>
                <el-select class="butt-search" clearable v-model="search.sortId" placeholder="所属分类">
                    <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-input class="butt-search" v-model="search.goodsName" placeholder="请输入商品名称"></el-input>
                <el-input class="butt-search" v-show="activeName!='noDocking'" v-model="search.selfCode" placeholder="请输入对接编码"></el-input>
                <button class="button-large el-icon-search btn_search btn-color" @click="searchBtt">搜索</button>
            </div>
        <!-- 搜索 完成 -->
        </div>
        <!-- table列表 分页-->
            <div class="btton-table">
                <div>
                    <span style="line-height:25px">当前查询的E店为：{{dockingEName.name}}</span>
                    <span v-if="activeName=='noDocking' && btnShow.indexOf('project_butt')==-1" class="notice">*对接平台未开启对接设置或者E店状态有误，请联系对接平台查找原因！</span>
                    <button v-if="activeName!='noDocking' && btnShow.indexOf('project_remove')>-1" class="button-small btn_pad btn-color" style="width:80px;" @click="toggleSelection">解除对接</button>
                    <button v-if="activeName=='noDocking' && eshopStatus =='yes' && btnShow.indexOf('project_butt')>-1" class="button-small btn_pad btn-color" style="width:80px;" @click="toggleSetUp">设置对接</button>
                     <!-- <button v-if="activeName!='noDocking'" class="button-small btn_pad btn-color" style="width:80px;" @click="toggleSelection">解除对接</button> -->
                    <!-- <button v-if="activeName=='noDocking' && eshopStatus =='yes'" class="button-small btn_pad btn-color" style="width:80px;" @click="toggleSetUp">设置对接</button> -->
                </div>
                <div>
                    <el-table ref="multipleTable" v-loading="listLoading"  :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column :selectable="selectable" type="selection" width="100" align="center"></el-table-column>
                        <el-table-column prop="newName" label="商品名称" align="center"></el-table-column>
                        <el-table-column prop="sortName" label="所属分类" align="center"></el-table-column>
                        <el-table-column prop="univalence" label="价格/单位" align="center"></el-table-column>
                        <el-table-column v-if="activeName!='noDocking'" prop="selfCode" label="对接编码" align="center">
                            <template scope="scope">
                                <el-tooltip placement="left" :disabled="scope.row.selfCode+''.length <= 20" :content="scope.row.selfCode">
                                    <span>{{scope.row.selfCode}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="activeName!='noDocking'" prop="jointGoodsCode" label="对接商品ID" align="center">
                            <template scope="scope">
                                <el-tooltip placement="left" :disabled="scope.row.jointGoodsCode+''.length <= 20" :content="scope.row.jointGoodsCode">
                                    <span>{{scope.row.jointGoodsCode}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="activeName!='noDocking'" prop="jointStatus" label="对接状态" align="center">
                            <template scope="scope">
                                <span v-if="scope.row.jointStatus=='butt_butt'">对接中</span>
                                <span v-if="scope.row.jointStatus=='butt_success'">对接成功</span>
                                <span v-if="scope.row.jointStatus=='butt_fail'">对接失败</span>
                                <span v-if="scope.row.jointStatus=='remove_fail'">解除失败</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            <!-- 分页 -->
                <div class="butt-pagin">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageSync"
                        :page-sizes="[5,10,15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            <!-- 分页完成 -->
            </div>
        <!-- table列表完成 分页-->
    </div>
</template>
<script>
import dict from '../../../static/dict.json'
import {
  Taxonomy,
  buttedConnList,
  noButtedConnList,
  deleteGoodsCode,
  JonitGoods,
  buttedList
} from "@/api/serviceManage";

  export default {
    data() {
      return {
        activeName: 'yesDocking',   //tab切换
        listLoading:true,
        dockingEName:{},
        eshopStatus:null,
        options:[],
        tableData3:[],
        multipleSelection:[],
        typeOptions:[],
        pageSync:1,
        pageSize:10,
        total:1,
        thisType:{},
        search:{
            eshopCode:'',
            majorSort:'',
            sortId:'',
            goodsName:'',
            selfCode:'',
        }
      };
    },
    watch:{

    },
    computed:{
        btnShow() {
            return JSON.parse(localStorage.getItem("btn"));
        }
    },
    methods: {
        //已对接api
        buttedConnListApi(obj,page,size){
            this.listLoading = true
            page = page || 1
            size = size || 10
            buttedConnList(obj,page,size).then(data=>{
                if(data.data.code){
                    this.listLoading = false
                    var arr = data.data.data.list
                    var i,len = arr.length
                    for( i = 0 ; i< len; i++){
                        if("jointGoodsCode" in arr[i]){
                            continue
                        }else{
                            arr[i].jointGoodsCode = ""
                        }
                    }
                    this.tableData3 = arr
                    this.total = data.data.data.count
                    console.log(this.tableData3,"data+++++")
                }else{
                  this.listLoading = false
                }
            }).catch(error=>{
                this.listLoading = false
            })
        },
        //未对接api
        noButtedConnListApi(obj,page,size){
            page = page || 1;
            size = size || 10;
            this.listLoading = true
            noButtedConnList(obj,page,size).then(data=>{
                if(data.data.code){
                    this.listLoading = false
                    this.tableData3 = data.data.data.page.list
                    this.total = data.data.data.page.count
                    this.eshopStatus = data.data.data.eshopStatus
                    console.log(data,"data+++++")
                }else{
                    this.listLoading = false
                    this.tableData3 = []
                }
            }).catch(error=>{
                this.listLoading = false
                console.log(error,"error-----")
            })
        },
        //当前查询的E店
        searchEd(val){  
            
        },
        //复选框禁选
        selectable(row,index){
            //通过id来禁止不能选择的项
            // return row.id !== 1
            //通过索引index来禁止不能选择的项
            // return index !== 2
            if(this.activeName == "yesDocking"){
                return row.jointStatus != 'butt_butt'
            }else{
                return true
            }
        },
        //搜索
        searchBtt(){
            //改变当前查询的E店：
            if(this.search.eshopCode){
                var i , options = this.options;
                for( i = 0 ; i < options.length ; i++){
                    if( options[i].eshopCode==this.search.eshopCode){
                        this.dockingEName = options[i]
                        break;
                    }
                }
            }else{
                this.dockingEName = {name:''}
            }
            //--改变当前查询的E店------------------：
            if(this.pageSync == 1){
                this.tablePageSize(this.search)
            }else{
                this.pageSync = 1
            }
        },
        // 搜索框清空
        searchEmpty(){
            // this.search.eshopCode = ''
            this.search.majorSort = ''
            this.search.sortId = ''
            this.search.goodsName = ''
            this.search.selfCode = ''
        },
        //切换，page，size判断当前是已对接还是未对接
        tablePageSize(obj,page,size){
            if(this.activeName == "yesDocking"){
                this.buttedConnListApi(obj,page,size)
            }else{
                this.noButtedConnListApi(obj,page,size)
            }
        },
        //tabs切换
        handleClick(tab, event) {
            // debugger;
            this.search.eshopCode = this.options[0].eshopCode || ''
            this.dockingEName = this.options[0] || {name:''}
            // this.$refs.multipleTable.clearSelection();
            //防止请求多次
            if(this.pageSync == 1){
                this.tablePageSize(this.search)
            }else{
                this.pageSync = 1
            }
            this.searchEmpty()  //清空搜索框
        },
        //复选框
        handleSelectionChange(val) {
            console.log(val)
            // val.forEach(row=>{
            //     //没有对接商品ID无法选中
            //     if(!row.jointGoodsCode){
            //         this.$refs.multipleTable.toggleRowSelection(row,false);
            //     }
            // })
            this.multipleSelection = val;
        },
        //对接设置、移除数据
        setUpDelete(data){
            var obj = {}
            var arr = this.multipleSelection
            var arrPost = [],i;
             for( i = 0 ; i<arr.length; i++){
                arrPost.push(arr[i][data])
            }
            obj.goodIds = arrPost
            obj.eshopCode = this.search.eshopCode
            return obj
        },
        //移除对接按钮
        toggleSelection(row, selected){
            var obj = this.setUpDelete('id')
            console.log(obj,"移除")
            if(obj.goodIds.length<=0){
                return
            }
            this.listLoading = true
            deleteGoodsCode(obj).then(data=>{
                console.log(data,"移除对接成功")
                if(data.data.code==1){
                    this.listLoading = false
                    this.$message({
                        type: "success",
                        message: data.data.data
                    });
                    this.tablePageSize(this.search,this.pageSync, this.pageSize)
                }else{
                    this.listLoading = false
                }
            })
            .catch(error=>{
                this.listLoading = false
                console.log(error,"移除对接失败")
            })
        },
        //设置对接按钮
        toggleSetUp(){
            var obj = this.setUpDelete('id')
            console.log(obj,"设置")
            if(obj.goodIds.length<=0){
                return
            }
            this.listLoading = true
            JonitGoods(obj).then(data=>{
                console.log(data,"设置对接成功")
                if(data.data.code==1){
                    this.listLoading = false
                    this.$message({
                        type: "success",
                        message: data.data.data
                    });
                    this.tablePageSize(this.search,this.pageSync, this.pageSize)
                }else{
                    this.listLoading = false
                }
            })
            .catch(error=>{
                this.listLoading = false
                console.log(error,"设置对接失败")
            })
        },
        //一页展示几条
        handleSizeChange(page){
            this.pageSize = page
            this.tablePageSize(this.search,this.pageSync, this.pageSize)
        },
        // 分页
        handleCurrentChange(val){
            this.pageSync = val
            this.tablePageSize(this.search,this.pageSync, this.pageSize)
        },
        //所属类型
        typeChange(){
            //切换类型，请求分类数据
            //清空分类数据，重新请求
            this.search.sortId = ""
            if(this.search.majorSort){
                Taxonomy({majorSort:this.search.majorSort})
                    .then(data=>{
                        this.typeOptions = data.data.data
                    })
                    .catch(error => {});
            }else{
                this.typeOptions = []
            }
        }
    },
    mounted(){
        //默认已对接商品数据
        // this.handleClick()
        //check默认选中第一个
        // this.$refs.multipleTable.toggleRowSelection(this.tableData3[0]); 
        //所属类型select
        this.thisType = dict.ser_sort
        delete this.thisType.all
        //对接E店默认选中第一个
        //先请求E店列表获取第一条数据的id，在请求table列表数据，
        let promise = new Promise((resolve,reject)=>{
            buttedList().then(data=>{
                console.log(data,"data")
                if(data.data.code==1){
                    if(data.data.data){
                        this.options = data.data.data || []
                        this.search.eshopCode = data.data.data[0].eshopCode || ''
                        resolve(this.search)
                        this.dockingEName = data.data.data[0] || {name:''}  //当前E店
                    }else{
                        this.dockingEName = {name:''}
                    }
                }else{
                    // this.$message({
                    //     type: "warning",
                    //     message: data.data.data
                    // });
                }
            }).catch(error=>{
                console.log(error,"error")
            })
        })
        //获取E店数据请求table列表
        promise.then(success=>{
            this.buttedConnListApi(success)
        })
    }
  };
</script>

<style scoped>
    .buttDetails{
        background: #fff;
        border-bottom:1px solid #eee;
    }
    .buttDetails .el-select {
        margin-left: 1%;
    }
    .buttDetails .butt-search{
        width: 13%;
        margin-left: 1%;
    }
    .searchBox{
        padding:0 20px 20px 0px;
    }
    .btton-table{
        overflow:hidden;
        box-sizing: border-box;
        padding: 20px;
        background: #fff;
    }
    .butt-pagin{
        margin-top: 20px;
        float: right;
    }
    .notice{
        color: red;
        margin-left:6%; 
    }
    .buttBox .el-table .cell{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
