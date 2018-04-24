<template>
    <div id="refundInformation">
            <!-- 退款信息 -->
                <div class="refund-infor">
                    <div class="refund-header infor">退款信息</div>
                    <div class="over-flow">
                        <div class="refund-left">
                            <div>退款编号：<span>{{infor.refundNumber}}</span></div>
                            <div>退款状态：
                                <span v-if="infor.refundStatus=='refunding'">申请退款中</span>
                                <span v-if="infor.refundStatus=='cancel'">已取消</span>
                                <span v-if="infor.refundStatus=='refunded'">退款成功</span>
                                <span v-if="infor.refundStatus=='failure'">退款失败</span>
                            </div>
                            <div>退款时间：<span>{{infor.finishTime}}</span></div>
                        </div>
                       <div class="refund-right">
                            <div>订单编号：<span>{{infor.orderNumber}}</span></div>
                            <div>退款方式：
                                <span v-if="infor.refundMethod=='cash'">现金</span>
                                <span v-if="infor.refundMethod=='weixin'">微信</span>
                                <span v-if="infor.refundMethod=='alipay'">支付宝</span>
                                <span v-if="infor.refundMethod=='bank_card'">银行卡</span>
                            </div>
                            <div class="refundReason">
                                <div>退款原因：</div>
                                <div>{{infor.refundReason}}</div>
                            </div>
                       </div>
                    </div>
                </div>
            <!-- 退款信息完成 -->

            <!-- 退货商品信息 -->
                <div class="order-infor">
                   <div class="refund-header infor">退款商品信息</div>
                    <div class="over-flow">
                        <div class="refund-left">
                            <div>退款金额：<span>{{'￥'+infor.refundAccountReality}}</span></div>
                        </div>
                       <div class="refund-right">
                            <div>退款差额：<p class="type-p" v-if="infor.refundDifferenceType">{{infor.refundDifferenceType=='less'?'少退':'多退'}}</p> 
                                          <p class="type-p" v-if="infor.refundDifference">{{'￥'+infor.refundDifference}}</p></div>
                       </div>
                    </div>
                    <el-table :data="infor.refundGoodsList" border style="width: 100%">
                        <el-table-column align="center" prop="itemName" label="服务项目"> </el-table-column>
                        <el-table-column align="center" prop="goodsName" label="商品名称"> </el-table-column>
                        <el-table-column align="center" prop="goodsNum" label="退货数量"> </el-table-column>
                        <el-table-column align="center" prop="goodsUnit" label="单位"> </el-table-column>
                        <el-table-column align="center" label="交易单价">
                            <template scope="scope">
                                <span>{{'￥'+scope.row.payPrice}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="小计">
                            <template scope="scope">
                                <span>{{'￥'+scope.row.payPriceSum}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            <!-- 退货商品信息完成 -->
    </div>
</template>

<script>

    export default{
        data(){
            return{

            }
        },
        methods:{
        
        },
        computed:{
            infor(){
                return this.informationdata.data.data
            }
        },
        mounted(){

        },
        props:[
            'informationdata'
        ]
    }
</script>

<style scoped>
    .refundReason div{
        float:left;
    }
    .refundReason div:nth-child(2){
        width:80%;
        padding-left:20px;
         text-indent:2em;
    }
    #refundInformation{
        font-size: 12px;
    }
    .infor{
        font-weight: 600;
        border-bottom: 1px solid #eef1f6;
        padding: 10px 0 10px 0; 
    }
    .over-flow{
        overflow: hidden;
        padding-top:10px; 
        color: #333333;
    }
    #refundInformation .refund-infor,#refundInformation .order-infor{
        font-size: 12px;
        color: #333333;
        padding: 10px 30px;
        background: #fff;
    }
    .order-infor{
        margin-top: 10px;
    }
    .refund-left,.refund-right{
        float: left;
        width: 50%;
    }
    .refund-left{
    }
    .refund-right{
        /* margin-left: 20%; */
    }
    .refund-left div,.refund-right div{
        padding: 10px 0 14px 0;
    }
    .refund-left div span,.refund-right div span{
        padding-left: 40px;
    }
    .type-p{
        display:inline-block
    }
</style>

