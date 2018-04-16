<template>
    <div id="refund">
        <div class="refund-search">
           	<el-select class="select-width" v-model="search.orgId" placeholder="选择机构">
                <el-option v-for="item in organizations" :key="item.id" :label="item.label" :value="item.id"></el-option>	
            </el-select>
            <el-select class="search-right select-width" v-model="search.stationId" placeholder="选择服务站">
                <el-option v-for="item in organizations" :key="item.id" :label="item.label" :value="item.id"></el-option>	
            </el-select>
            <el-input v-model.trim ="chooContent" placeholder="输入要搜索的内容" class="search-right search-width">
	              		<el-select  v-model="chooses" clearable placeholder="请选择"  slot="prepend">
	                		<el-option v-for="item in choose" :key="item.value" :label="item.label" :value="item.value">
	                		</el-option>
	              		</el-select>
            </el-input>
            <button class="search-button el-icon-search btn_search btn-color serch-btn" @click="searchClick(search)"> 搜索</button>
        </div>
        <div class="refund-table" v-loading.body="loading">
            <div>
                <el-table :data="tableData" border  stripe style="width: 100%">
                    <el-table-column align="center" :render-header="renderHeader">
                        <template scope="scope">
                            <div>
                                <div>{{scope.row.orgName}}</div>
                                <div>{{scope.row.stationName}}</div> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="orderNumber"  label="订单编号"></el-table-column>
                    <el-table-column align="center" prop="refundNumber" label="退款编号"></el-table-column>
                    <el-table-column align="center" prop="refundAccountReality" label="退款金额"></el-table-column>
                    <el-table-column align="center" prop="finishTime" label="退款时间"></el-table-column>
                    <el-table-column align="center" prop="refundName" label="用户姓名"></el-table-column>
                    <el-table-column align="center" prop="refundPhone" label="用户电话"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template scope="scope">
                            <el-button class="ceshi3" type="button" @click="handleRead(scope.row.orderNumber)">查看</el-button> 
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
import { listDataRefund,formDataRefund } from "@/api/order";
import information from './refundInformation.vue'

//列表数据
var getData = (obj,page,size)=>{
    return new Promise((res,rej)=>{
        listDataRefund(obj,page,size)
            .then(data=>{
                res(data)
            })
            .catch(error=>{
                rej(error)
            })
    })
}

//退款详情
var refundDetails = (id)=>{
    return new Promise((res,rej)=>{
        formDataRefund({'id':id})
            .then(data=>{
                res(data)
            })
            .catch(error=>{
                rej(error)
            })
    }) 
}

    let organizations = [
        {label:'选择退款状态',id:'1'},
        {label:'退款成功',id:'2'},
        {label:'已取消',id:'3'},
        {label:'退款中',id:'4'}
    ]
    let choose = [
        {label:'订单编号',value:'orderNumber'},
        {label:'退款编号',value:'refundNumber'},
        {label:'用户姓名',value:'refundName'},
        {label:'用户电话',value:'refundPhone'}
    ]
    let tableData = [
        {orderNumber:'10170829144443318882',refundNumber:'20170829144443318882',refundAccountReality:'￥300',orgName:'机构mm',stationName:'服务站MM',finishTime:'2017-10-17 18:00:09',refundName:'张三',refundPhone:'15801655090'},
        {orderNumber:'20170829144443318882',refundNumber:'20170829144443318882',refundAccountReality:'￥300',orgName:'机构mm',stationName:'服务站MM',finishTime:'2017-10-17 18:00:09',refundName:'利索',refundPhone:'15801655090'},
        {orderNumber:'30170829144443318882',refundNumber:'20170829144443318882',refundAccountReality:'￥300',orgName:'机构mm',stationName:'服务站MM',finishTime:'2017-10-17 18:00:09',refundName:'玛瑙',refundPhone:'15801655090'},
        {orderNumber:'40170829144443318882',refundNumber:'20170829144443318882',refundAccountReality:'￥300',orgName:'机构mm',stationName:'服务站MM',finishTime:'2017-10-17 18:00:09',refundName:'李娇',refundPhone:'15801655090'},
        {orderNumber:'50170829144443318882',refundNumber:'20170829144443318882',refundAccountReality:'￥300',orgName:'机构mm',stationName:'服务站MM',finishTime:'2017-10-17 18:00:09',refundName:'呼叫',refundPhone:'15801655090'},
        {orderNumber:'60170829144443318882',refundNumber:'20170829144443318882',refundAccountReality:'￥300',orgName:'机构mm',stationName:'服务站MM',finishTime:'2017-10-17 18:00:09',refundName:'咯考',refundPhone:'15801655090'},
        {orderNumber:'70170829144443318882',refundNumber:'20170829144443318882',refundAccountReality:'￥300',orgName:'机构mm',stationName:'服务站MM',finishTime:'2017-10-17 18:00:09',refundName:'胡凯',refundPhone:'15801655090'},
    ]

    export default{
        data(){
            return{
                organizations:organizations,
                search:{
                    orgId:'',
                    stationId:''
                },
                chooContent:'',
                choose:choose,
                loading:true,
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
            renderHeader(h){
                let a = true
                return [ h('p',['机构名称']), a ? h('p',['服务站名称']) : '']
            },
            //搜索
            searchClick(item){
                let obj = {}
                obj.orgId = this.search.orgId
                obj.stationId = this.search.stationId
                if(this.chooses){
                    obj[this.chooses] = this.chooContent
                }
                this.search = obj
                this.searchData()
            },
            //列表数据
            searchData(){
                this.loading = true
                getData(this.search,this.pageSync,this.pageSize)
                    .then(data=>{
                        this.loading = false
                        console.log(data)
                    })
                    .catch(error=>{
                        this.loading = false
                        console.log(error)
                    })
            },
            handleSizeChange(){},
            handleCurrentChange(){},
            //点击查看退款详情
            handleRead(id){
                this.loading = false
                let refund = async (id) => {
                    try{
                        let refundDate = await refundDetails(id)
                        console.log(refundDate,"refundDate----")
                        if(refundDate.data.code == 1){
                            this.informationData = refundDate
                            this.loading = true
                            this.dialogvisible = true
                        }else{
                            this.loading = true
                        }
                    }
                    catch(error){
                        this.loading = true
                    }
                }
                return refund(id)
            },
            handleReadClose(){
                this.dialogvisible = false
            }
        },
        components: {
           information
        },
        mounted(){
            console.log(this.$route.query.orderNumber)
            let orderNumber =  this.$route.query.orderNumber
            if(orderNumber){
                this.chooses = "orderNumber"
                this.chooContent = orderNumber;
            }
            this.searchClick()
        }
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

