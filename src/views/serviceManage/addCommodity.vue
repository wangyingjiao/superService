<template>
    <div>
        <el-table :data="basicForm.commoditys" border style="width: 100%"  v-show="basicForm.commoditys.length>0">
            <el-table-column prop="name" align="center" label="商品名称"> </el-table-column>
            <el-table-column prop="unit" align="center" label="商品单位"> </el-table-column>
            <el-table-column prop="type" align="center" label="计量方式"> 
                <template scope="scope">
                    <span v-show="scope.row.type=='num'">按数量</span>
                    <span v-show="scope.row.type=='area'">按面积</span>
                    <span v-show="scope.row.type=='house'">按居室</span>
                </template>
            </el-table-column>
            <el-table-column prop="price" align="center" label="价格"> 
                <template scope="scope">
                    <span>{{scope.row.price+'元/'+scope.row.unit}}</span>  
                </template>  
            </el-table-column>
            <el-table-column prop="convertHours" align="center" label="折算时长">
                <template scope="scope">
                    <span>{{scope.row.convertHours+'小时 / 每人 / '+scope.row.unit}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="起步人数">
                <template scope="scope">
                    <span>{{scope.row.startPerNum!=0? scope.row.startPerNum : 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="cappingPerNum" align="center" label="封顶人数"> 
                <template scope="scope">
                    <span>{{scope.row.cappingPerNum!=0?scope.row.cappingPerNum:''}}</span>
                </template>
            </el-table-column>
             <el-table-column prop="minPurchase" align="center" label="起购数量"> 
                <template scope="scope">
                    <span>{{scope.row.minPurchase!=0? scope.row.minPurchase : 1}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center"> 
                <template scope="scope">
                    <span class="tableSer" @click="handleEdit(scope.$index, scope.row)">编辑</span>
                    <span class="tableSer" style="color:red"  @click="tableHandleDelete(scope.$index, scope.row)">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <el-form 
            :model="goods_info"
            ref="goods_info"
            label-position="left"
            label-width="90px" 
            style='padding:20px 0 0 20px'
        >
            <el-form-item label="商品单位:" prop="unit">
                <el-input 
                style="width:70%"
                placeholder="请输入单位名称（1-6位）"
                v-model="goods_info.unit"></el-input>
            </el-form-item>
            <el-form-item label="计量方式:" prop="type">
                <el-select class="filter-item" v-model="goods_info.type" placeholder="请选择" style="width:70%">
                    <el-option v-for="(item,key) in measure" :key="key" :label="item" :value="key"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="价格:" prop="price">
                <el-input v-model="goods_info.price" style="width:70%">
                    <template slot="append">元 / {{goods_info.unit || "单位"}}</template>
                </el-input>
            </el-form-item>
            <el-form-item label="折算时长:" prop="convertHours">
                <el-input v-model="goods_info.convertHours" style="width:70%">
                    <template slot="append">小时 / 每人 / {{goods_info.unit || "单位"}}</template>                
                </el-input>
                <el-popover
                    ref="popover1"
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    content="请录入1单位所需服务时长（以小时为单位）例如：擦玻璃计量单位为平米，1单位（即1平米）所需服务时长为0.25小时每人">
                </el-popover>
                <span  v-popover:popover1 class="iconfont doubt">&#xe62a;</span>
            </el-form-item>
            <el-form-item label="起步人数:" class="seize" prop="startPerNum">
                    <el-input
                        placeholder="请输入起步人数(默认为1)"
                        style="width:70%"
                        v-model="goods_info.startPerNum">
                    </el-input>
            </el-form-item>
             <el-form-item label="封顶人数:" class="seize" prop="cappingPerNum">
                <el-input
                    placeholder="请输入封顶人数"
                    style="width:70%"
                    v-model="goods_info.cappingPerNum">
                </el-input>
            </el-form-item>
            <el-form-item label="起购数量:" class="seize" prop="minPurchase">
                <el-input
                    placeholder="请输入起购数量（默认为1）"
                    style="width:70%"
                    v-model="goods_info.minPurchase">
                </el-input>
            </el-form-item>
        </el-form>


        <div slot="footer" class="dialog-footer" style="text-align:center">
            <input v-if="handleEditFlag" type="button" class="button-large btn-color" @click="submitForm('goods_info')" value="保 存">
            <input v-else type="button" class="button-large btn-color" @click="submitForm('goods_info')" value="添 加">
            <input type="button" class="button-cancel btn-color" @click="resetForm('ser')" value="取 消">
        </div>
    </div>
</template>

<script>
export default {
  name: "table_demo",
  props: ["measure"],
  data() {
    return {
      handleEditFlag: false, //商品的添加/编辑
      basicForm: {
        name: "",
        sortId: "",
        majorSort: "all",
        commoditys: [],
        sysTags: [],
        customTags: []
      },
      goods_info: {
        name: "",
        unit: "",
        type: "",
        price: "",
        convertHours: "",
        startPerNum: "",
        cappingPerNum: "",
        minPurchase: ""
      }
    };
  },
  methods: {
    //商品添加/编辑
    submitForm(formName) {
      var obj = Object.assign({}, this.goods_info);
      obj.startPerNum = this.goods_info.startPerNum;
      obj.minPurchase = this.goods_info.minPurchase;
      obj.cappingPerNum = this.goods_info.cappingPerNum;
      this.basicForm.commoditys.push(obj);
    }
  }
};
</script>
