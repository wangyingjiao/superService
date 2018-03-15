<template>
    <div>
        <div class="buttDetails">
        <!-- tabs切换 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="已对接商品" name="yesDocking"></el-tab-pane>
                <el-tab-pane label="未对接商品" name="noDocking"></el-tab-pane>
            </el-tabs>
        <!-- tabs切换完成 -->
        <!-- 搜索 -->
            <div class="searchBox">
                <el-select class="butt-search" clearable v-model="search.ed" placeholder="请选择" @change="searchEd(search.ed)">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select class="butt-search" clearable v-model="search.type" placeholder="所属类型" @change="typeChange">
                    <el-option v-for="(item,key) in thisType" :key="key" :label="item" :value="key">
                    </el-option>
                </el-select>
                <el-select class="butt-search" clearable v-model="search.sortId" placeholder="所属分类">
                    <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-input class="butt-search" v-model="search.name" placeholder="请输入商品名称"></el-input>
                <el-input class="butt-search" v-show="activeName!='noDocking'" v-model="search.jointGoodsCode" placeholder="请输入对接编码"></el-input>
                <button class="button-large el-icon-search btn_search btn-color" @click="searchBtt">搜索</button>
            </div>
        <!-- 搜索 完成 -->
        </div>
        <!-- table列表 分页-->
            <div class="btton-table">
                <div>
                    <span style="line-height:25px">当前查询的E店为：{{dockingEName}}</span>
                    <button v-if="activeName!='noDocking'" class="button-small btn_pad btn-color" style="width:80px;" @click="toggleSelection">解除对接</button>
                    <button v-else class="button-small btn_pad btn-color" style="width:80px;" @click="toggleSelection">设置对接</button>
                </div>
                <div>
                    <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column :selectable="selectable" type="selection" width="100" align="center"></el-table-column>
                        <el-table-column prop="commoditys" label="商品名称" align="center"></el-table-column>
                        <el-table-column prop="sortId" label="所属分类" align="center"></el-table-column>
                        <el-table-column prop="price" label="价格/单位" align="center"></el-table-column>
                        <el-table-column prop="sortIds" label="对接编码" align="center"></el-table-column>
                        <el-table-column prop="jointGoodsCode" label="对接商品ID" align="center"></el-table-column>
                        <el-table-column prop="button" label="对接状态" align="center"></el-table-column>
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
} from "@/api/serviceManage";

var options = [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]

var tableData3 = [{
            commoditys:'商品名称1',
            sortId:'所属分类',
            price:'价格/单位',
            sortIds:'对接编码',
            jointGoodsCode:'对接商品ID',
            button:'对接状态'
        }, {
            commoditys:'商品名称2',
            sortId:'111',
            price:'价格/单位',
            sortIds:'对接编码',
            jointGoodsCode:'对接商品ID',
            button:'对接状态'
        }, {
            commoditys:'商品名称3',
            sortId:'所属分类',
            price:'价格/单位',
            sortIds:'对接编码',
            jointGoodsCode:'',
            button:'对接状态'
        }, {
            commoditys:'商品名称4',
            sortId:'所属分类',
            price:'价格/单位',
            sortIds:'对接编码',
            jointGoodsCode:'对接商品ID',
            button:'对接状态'
        }, {
            commoditys:'商品名称5',
            sortId:'所属分类',
            price:'价格/单位',
            sortIds:'对接编码',
            jointGoodsCode:'',
            button:'对接状态'
        }, {
            commoditys:'商品名称6',
            sortId:'所属分类',
            price:'价格/单位',
            sortIds:'对接编码',
            jointGoodsCode:'对接商品ID',
            button:'对接状态'
        }, {
            commoditys:'商品名称7',
            sortId:'所属分类',
            price:'价格/单位',
            sortIds:'对接编码',
            jointGoodsCode:'对接商品ID',
            button:'对接状态'
}]

  export default {
    data() {
      return {
        activeName: 'yesDocking',   //tab切换
        dockingEName:'',
        options:options,
        tableData3:tableData3,
        multipleSelection:[],
        typeOptions:[],
        pageSync:1,
        pageSize:10,
        total:100,
        thisType:{},
        search:{
            ed:'',
            type:'',
            sortId:'',
            name:'',
            jointGoodsCode:'',
        }
      };
    },
    watch:{

    },
    computed:{
     
    },
    methods: {
        //当前查询的E店
        searchEd(val){  
        
        },
        //复选框禁选
        selectable(row,index){
            //通过id来禁止不能选择的项
            // return row.id !== 1
            //通过索引index来禁止不能选择的项
            // return index !== 2
            return row.jointGoodsCode
        },
        //搜索
        searchBtt(){
            //改变当前查询的E店：
            if(this.search.ed){
                var i , options = this.options;
                for( i = 0 ; i < options.length ; i++){
                    if( options[i].value==this.search.ed){
                        this.dockingEName = options[i].label
                        break;
                    }
                }
            }else{
                this.dockingEName = ''
            }
            //--改变当前查询的E店------------------：
            console.log(this.search,"search---")
        },
        // 搜索框清空
        searchEmpty(){
            this.search.ed = ''
            this.search.type = ''
            this.search.sortId = ''
            this.search.name = ''
            this.search.jointGoodsCode = ''
        },
        //tabs切换
        handleClick(tab, event) {
            // console.log(tab.name, event);
            console.log(this.activeName)
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
        //移除对接按钮
        toggleSelection(row, selected){
            console.log(this.multipleSelection)
        },
        //一页展示几条
        handleSizeChange(page){
            console.log(page)
        },
        // 分页
        handleCurrentChange(val){
           console.log(val,"val")
           this.tableData3 = [{
                commoditys:'商品名称11',
                sortId:'所属分类',
                price:'价格/单位',
                sortIds:'对接编码',
                jointGoodsCode:'对接商品ID',
                button:'对接状态'
            }, {
                commoditys:'商品名称22',
                sortId:'111',
                price:'价格/单位',
                sortIds:'对接编码',
                jointGoodsCode:'对接商品ID',
                button:'对接状态'
            }, {
                commoditys:'商品名称33',
                sortId:'所属分类',
                price:'价格/单位',
                sortIds:'对接编码',
                jointGoodsCode:'',
                button:'对接状态'
            }, {
                commoditys:'商品名称44',
                sortId:'所属分类',
                price:'价格/单位',
                sortIds:'对接编码',
                jointGoodsCode:'对接商品ID',
                button:'对接状态'
            }, {
                commoditys:'商品名称55',
                sortId:'所属分类',
                price:'价格/单位',
                sortIds:'对接编码',
                jointGoodsCode:'对接商品ID',
                button:'对接状态'
            }, {
                commoditys:'商品名称66',
                sortId:'所属分类',
                price:'价格/单位',
                sortIds:'对接编码',
                jointGoodsCode:'对接商品ID',
                button:'对接状态'
            }, {
                commoditys:'商品名称77',
                sortId:'所属分类',
                price:'价格/单位',
                sortIds:'对接编码',
                jointGoodsCode:'对接商品ID',
                button:'对接状态'
            }]
        },
        //所属类型
        typeChange(){
            //切换类型，请求分类数据
            //清空分类数据，重新请求
            this.search.sortId = ""
            if(this.search.type){
                Taxonomy({majorSort:this.search.type})
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
        this.handleClick()
        //check默认选中第一个
        this.$refs.multipleTable.toggleRowSelection(this.tableData3[0]); 
        //所属类型select
        this.thisType = dict.ser_sort
        //对接E店默认选中第一个
        this.search.ed = this.options[0].value
        //当前E店
        this.dockingEName = this.options[0].label
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
</style>
