<template>
    <div id="refund">
        <div class="refund-search">
            <orgSearch :widths="'17%'" ref="orgSearch" @orgsearch="orgSearch" :refundflag="refundflag"></orgSearch>
            <el-select class="search-right" filterable clearable v-model="search.stationId" placeholder="选择服务站">
                <el-option v-for="item in server" :key="item.id" :label="item.name" :value="item.id"></el-option>	
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
                <el-table :data="tableData"  stripe style="width: 100%">
                    <el-table-column v-if="techUserType!='station'" align="center" :render-header="renderHeader">
                        <template scope="scope">
                            <div>
                                <div v-if="techUserType!='org'">{{scope.row.orgName}}</div>
                                <div>{{scope.row.stationName}}</div> 
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="orderNumber" min-width="130" label="订单编号"></el-table-column>
                    <el-table-column align="center" prop="refundNumber"  min-width="130" label="退款编号"></el-table-column>
                    <el-table-column align="center" label="退款金额">
                        <template scope="scope">
                            <span>{{'￥'+scope.row.refundAccountReality}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="finishTime" label="退款时间"></el-table-column>
                    <el-table-column align="center" prop="refundName" label="用户姓名"></el-table-column>
                    <el-table-column align="center" prop="refundPhone" label="用户电话"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template scope="scope">
                            <el-button class="ceshi3" type="button" v-if="btnShow.indexOf('refund_info') > -1" @click="handleRead(scope.row.id)">查看</el-button> 
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
import orgSearch from '../../components/Hamburger/orgSearch.vue'
import information from './refundInformation.vue'
import { userType} from '../../utils/auth'
import {listDataAll,listByOffice} from "@/api/tech";

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

    let choose = [
        {label:'订单编号',value:'orderNumber'},
        {label:'退款编号',value:'refundNumber'},
        {label:'用户姓名',value:'refundName'},
        {label:'用户电话',value:'refundPhone'}
    ]

    export default{
        data(){
            return{
                refundflag:true,
                server:[],
                search:{
                    orgId:'',
                    stationId:''
                },
                chooContent:'',
                choose:choose,
                loading:false,
                chooses:'',
                tableData:[],
                informationData:{},
                pageSync:1,
                pageSize:10,
                total:null,
                dialogvisible:false,
                refundId:null
            }
        },
        methods:{
            orgSearch(item){
                this.search.orgId = item
                this.orgChange(item)
            },
            orgChange(id){
                this.search.stationId = ''
                if(!id){
                    this.server = []
                    return
                }
                listByOffice({orgId:id}).then(data=>{
                    let dataList = data.data.data
                    if(data.data.code=='1'){
                        if(dataList[0].id=="0"){
                            dataList = dataList.slice(1)
                        }
                        this.server = dataList
                        if(userType()=='station'){
                            this.search.stationId = dataList[0].id
                        }
                    }
                }).catch(error=>{
                })
            },
            //机构
            listDataAll(){
                return new Promise((res,rej)=>{
                    listDataAll({}).then(data=>{
                        let list = data.data.data.list
                        if(list[0].id=='0'){
                            list = list.slice(1)
                        }
                        res(list)
                    }).catch(error=>{
                        rej(error)
                    })
                })
            },
            renderHeader(h){
                if(this.techUserType=='station'){
                    return
                }else{
                    return [this.techUserType!='org'?h('p',['机构名称']):'',  h('p',['服务站名称']) ]
                }
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
                        if(data.data.code=='1'){
                            this.loading = false
                            let dataList = data.data.data
                            this.tableData = dataList.list
                            this.total = dataList.count
                        }else{
                            this.loading = false
                        }
                    })
                    .catch(error=>{
                        this.loading = false
                    })
            },
            handleSizeChange(val){
                this.pageSize = val;
				if(this.pageSync == 1){
					this.searchData()
				}else{
					this.pageSync = 1
				}
            },
            handleCurrentChange(val){
                this.pageSync = val
				this.searchData()
            },
            //点击查看退款详情
            handleRead(id){
                this.loading = true
                let refund = async (id) => {
                    try{
                        let refundDate = await refundDetails(id)
                        if(refundDate.data.code == 1){
                            this.informationData = refundDate
                            this.loading = false
                            this.dialogvisible = true
                        }else{
                            this.loading = false
                        }
                    }
                    catch(error){
                        this.loading = false
                    }
                }
                return refund(id)
            },
            handleReadClose(){
                this.dialogvisible = false
            }
        },
        components: {
           information,
           orgSearch
        },
        computed: {
            techUserType(){
                return  userType()
            },
            btnShow() {
                return JSON.parse(localStorage.getItem("btn"));
            },
        },
        mounted(){
            let list = async ()=>{
                try{
                    if(this.$router.currentRoute.query.ordernumber){
                        this.chooContent = this.$router.currentRoute.query.ordernumber
                        this.chooses = 'orderNumber'
                        this.refundflag = false
                    }
                    await this.$refs['orgSearch'].listDataAll()
                    this.searchClick()
                }
                catch(error){
                }
                
            }
            list()
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
        width:17%;
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

