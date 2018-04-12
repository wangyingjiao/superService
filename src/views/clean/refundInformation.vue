<template>
    <div class="refundInformation">
        <!-- <el-dialog title="退款详情" :close-on-click-modal="false" :visible.sync="dialogvisible"> -->
            <!-- 退款信息 -->
                <div class="refund-infor">
                    <div class="refund-header infor">退款信息</div>
                    <div class="over-flow">
                        <div class="refund-left">
                            <div>退款编号：<span>{{open.id}}</span></div>
                            <div>退款状态：<span>awdawdawd</span></div>
                            <div>退款编号：<span>awdawdawd</span></div>
                        </div>
                       <div class="refund-right">
                            <div>订单编号：<span>11111111111111</span></div>
                            <div>退款方式：<span>awdawdawd</span></div>
                            <div>退款原因：<span>awdawdawd</span></div>
                       </div>
                    </div>
                </div>
            <!-- 退款信息完成 -->

            <!-- 退货商品信息 -->
                <div class="order-infor">
                   <div class="refund-header infor">退款商品信息</div>
                    <div class="over-flow">
                        <div class="refund-left">
                            <div>退款金额：<span>￥388</span></div>
                        </div>
                       <div class="refund-right">
                            <div>退款差额：<span>多退 ￥30</span></div>
                       </div>
                    </div>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column align="center" prop="serviceItems" label="服务项目"> </el-table-column>
                        <el-table-column align="center" prop="name" label="商品名称"> </el-table-column>
                        <el-table-column align="center" prop="num" label="退货数量"> </el-table-column>
                        <el-table-column align="center" prop="company" label="单位"> </el-table-column>
                        <el-table-column align="center" prop="unitPrice" label="交易单价"> </el-table-column>
                        <el-table-column align="center" prop="subtotal" label="小计"> </el-table-column>
                    </el-table>
                </div>
            <!-- 退货商品信息完成 -->
        <!-- </el-dialog> -->
    </div>
</template>

<script>
    let tableData=[
        {serviceItems:'灯具清洁',name:'大灯',num:'3',company:'个',unitPrice:'￥200',subtotal:'￥900'},
        {serviceItems:'灯具清洁',name:'小灯',num:'4',company:'个',unitPrice:'￥100',subtotal:'￥900'},
        {serviceItems:'居室保洁',name:'一居室',num:'1',company:'接',unitPrice:'￥300',subtotal:'￥900'},
    ]
    export default{
        data(){
            return{
                tableData:tableData,
                id:null
            }
        },
        methods:{
            resetForm(){
                this.$emit('close')
            },
            had(id){
              
            }
        },
        watch:{
            // refundid(val){
            //     console.log(val,"opopopop")
            // }
        },
        computed:{
            open(){
               return this.informationdata
            }
        },
        mounted(){
            this.opd
        },
        props:[
            'dialogvisible',
            'informationdata'
        ]
    }
</script>

<style scoped>
    .refundInformation{
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
    .refundInformation .refund-infor,.refundInformation .order-infor{
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
        width: 40%;
    }
    .refund-left{
    }
    .refund-right{
        /* margin-left: 20%; */
    }
    .refund-left div,.refund-right div{
        padding: 10px 0 15px 0;
    }
    .refund-left div span,.refund-right div span{
        padding-left: 40px;
    }
</style>

