<template>
    <div id="refund">
        <div class="refund-search">
           	<el-select class="select-width" v-model="search.orgId" placeholder="选择机构">
                <el-option v-for="item in organizations" :key="item.id" :label="item.label" :value="item.id"></el-option>	
            </el-select>
            <el-select class="search-right select-width" v-model="search.orgId" placeholder="选择服务站">
                <el-option v-for="item in organizations" :key="item.id" :label="item.label" :value="item.id"></el-option>	
            </el-select>
            <el-input v-model.trim ="chooContent" placeholder="输入要搜索的内容" class="search-right search-width">
	              		<el-select  v-model="chooses" clearable placeholder="请选择"  slot="prepend">
	                		<el-option v-for="item in choose" :key="item.id" :label="item.label" :value="item.id">
	                		</el-option>
	              		</el-select>
            </el-input>
            <button class="search-button el-icon-search btn_search btn-color serch-btn" @click="searchClick(search)"> 搜索</button>
        </div>
        <div class="refund-table">
            <div>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column align="center" prop="refundMode" label="服务机构"></el-table-column>
                    <el-table-column align="center" prop="refundType" label="服务站"></el-table-column>
                    <el-table-column align="center" prop="orderId"  label="订单编号"></el-table-column>
                    <el-table-column align="center" prop="refundId" label="退款编号"></el-table-column>
                    <el-table-column align="center" prop="refundNum" label="退款金额"></el-table-column>
                    <el-table-column align="center" prop="time" label="退款时间"></el-table-column>
                    <el-table-column align="center" prop="name" label="用户姓名"></el-table-column>
                    <el-table-column align="center" prop="phone" label="用户电话"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template scope="scope">
                            <el-button class="ceshi3" type="button" @click="handleRead(scope.row.orderId)">查看</el-button> 
                        </template>    
                    </el-table-column>
                </el-table>
            </div>
            <div class="schedult-pagin">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageSync"
                    :page-sizes="[5,10,15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 退款信息 -->
        <el-dialog title="退款详情" :close-on-click-modal="false" :visible.sync="dialogvisible" custom-class="refun-dialog">
            <information :informationdata="informationData"></information>
             <div slot="footer" class="dialog-footer" style="text-align: center;">   
                <button class="button-cancel" @click="handleReadClose('temp')">关 闭</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import information from './refundInformation.vue'
    let organizations = [
        {label:'选择退款状态',id:'1'},
        {label:'退款成功',id:'2'},
        {label:'已取消',id:'3'},
        {label:'退款中',id:'4'}
    ]
    let choose = [
        {label:'订单编号',id:'1'},
        {label:'退款编号',id:'2'},
        {label:'客户姓名',id:'3'},
        {label:'客户点好',id:'4'}
    ]
    let tableData = [
        {orderId:'10170829144443318882',refundId:'20170829144443318882',refundNum:'￥300',refundMode:'微信',refundType:'退款成功',time:'2017-10-17 18:00:09',name:'张三',phone:'15801655090'},
        {orderId:'20170829144443318882',refundId:'20170829144443318882',refundNum:'￥300',refundMode:'微信',refundType:'退款成功',time:'2017-10-17 18:00:09',name:'利索',phone:'15801655090'},
        {orderId:'30170829144443318882',refundId:'20170829144443318882',refundNum:'￥300',refundMode:'微信',refundType:'退款成功',time:'2017-10-17 18:00:09',name:'玛瑙',phone:'15801655090'},
        {orderId:'40170829144443318882',refundId:'20170829144443318882',refundNum:'￥300',refundMode:'微信',refundType:'退款成功',time:'2017-10-17 18:00:09',name:'李娇',phone:'15801655090'},
        {orderId:'50170829144443318882',refundId:'20170829144443318882',refundNum:'￥300',refundMode:'微信',refundType:'退款成功',time:'2017-10-17 18:00:09',name:'呼叫',phone:'15801655090'},
        {orderId:'60170829144443318882',refundId:'20170829144443318882',refundNum:'￥300',refundMode:'微信',refundType:'退款成功',time:'2017-10-17 18:00:09',name:'咯考',phone:'15801655090'},
        {orderId:'70170829144443318882',refundId:'20170829144443318882',refundNum:'￥300',refundMode:'微信',refundType:'退款成功',time:'2017-10-17 18:00:09',name:'胡凯',phone:'15801655090'},
    ]

    export default{
        data(){
            return{
                organizations:organizations,
                search:{
                    orgId:''
                },
                chooContent:'',
                choose:choose,
                chooses:'',
                tableData:tableData,
                informationData:{},
                pageSync:1,
                pageSize:10,
                total:100,
                dialogvisible:false,
                refundId:null
            }
        },
        methods:{
            //搜索
            searchClick(item){},
            handleSizeChange(){},
            handleCurrentChange(){},
            handleRead(id){
                this.refundId = id
                this.informationData = {label:'订单编号',id:id},
                this.dialogvisible = true
            },
            handleReadClose(){
                this.dialogvisible = false
            }
        },
        components: {
           information
        },
    }
</script>

<style>
    .refun-dialog .el-dialog__body{
        padding: 0;
        color: black;
        background: #eef1f6;
    }
    #refund .el-dialog--small{
        width: 60%;
    }
    .refund-search,.refund-table{
        padding: 20px;
        background: #fff;
        overflow: hidden;
    }   
    .refund-search{
         border-bottom: 1px solid #eee;
    }
    .search-right{
        margin-left: 1%;
    }
    .search-width{
        width: 30%;
	}
	.search-width .el-input-group__prepend .el-input__inner {
	  width: 100px;
	  text-align: center;
	}
    .schedult-pagin {
	  margin: 20px 0;
	  float: right;
	}
</style>

