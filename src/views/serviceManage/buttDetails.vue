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
                <orgSearch v-if="userType" ref="orgSearch" @orgsearch="orgSearch" :clearable="true"></orgSearch>
                <el-select class="butt-search" filterable v-model="search.eshopCode" placeholder="请选择E店" @change="searchEd(search.eshopCode)">
                    <el-option v-for="item in options" :key="item.eshopCode" :label="item.name" :value="item.eshopCode">
                    </el-option>
                </el-select>
                <el-select class="butt-search" clearable v-model="search.majorSort" placeholder="所属类型" @change="typeChange">
                    <el-option v-for="(item,key) in thisType" :key="key" :label="item" :value="key">
                    </el-option>
                </el-select>
                <el-select class="butt-search" filterable clearable v-model="search.sortId" placeholder="所属分类">
                    <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-input class="butt-search" v-model="search.goodsName" placeholder="请输入对接商品名称"></el-input>
                <el-input class="butt-search" v-show="activeName!='noDocking'" v-model="search.selfCode" placeholder="请输入对接编码"></el-input>
                <button class="button-large el-icon-search btn_search btn-color" @click="searchBtt">搜索</button>
            </div>
        <!-- 搜索 完成 -->
        </div>
        <!-- table列表 分页-->
            <div class="btton-table">
                <div>
                    <span v-if="nameFlag" style="line-height:25px;  margin-right: 6%;">当前查询的E店为：{{dockingEName.name}}</span>
                    <span class="e-prompt">对接相关的请求的交互结果非实时数据，最终的交互结果需耐心等待一段时间</span>
                    <button v-if="activeName!='noDocking' && btnShow.indexOf('project_remove')>-1" class="button-small btn_pad btn-color" style="width:80px;" @click="toggleSelection">解除对接</button>
                    <button :disabled="eshopStatus =='no'" v-if="activeName=='noDocking' && btnShow.indexOf('project_butt')>-1" :class="['button-small','btn_pad','btn-color',{'disabled':eshopStatus =='no'}]" style="width:80px;" @click="toggleSetUp">设置对接</button>
                </div>
                <div style="color:#b7b5b5;margin-top:20px;font-size:13px;" v-if="userType">请选择搜索条件：服务机构、对接E店查询数据</div>
                <div>
                  <span v-if="activeName=='noDocking' && (btnShow.indexOf('project_butt')==-1 || eshopStatus =='no')" class="notice">*对接平台未开启对接设置或者E店状态有误，请联系对接平台查找原因！</span>
                </div>
                <!-- v-if="tableFlag || tableData3.length>0" -->
                <div>
                    <el-table ref="multipleTable" v-loading="listLoading"  :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <div slot="empty">
                          <span v-if="!tableFlag"></span>
                          <span v-else>暂无数据</span>
                        </div>
                        <el-table-column :selectable="selectable" type="selection" width="100" align="center"></el-table-column>
                        <el-table-column prop="newName" label="对接商品名称" align="center" min-width="130">
                            <template scope="scope">
                                    <el-tooltip placement="left" :disabled="scope.row.newName.length <= 13" :content="scope.row.newName">
                                        <span>{{scope.row.newName}}</span>
                                    </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sortName" label="所属分类" align="center" min-width="120">
                           <template scope="scope">
                              <el-tooltip placement="left" :disabled="scope.row.sortName.length < 10" :content="scope.row.sortName">
                                <span> {{scope.row.sortName}}</span>
                              </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="univalence" label="价格/单位" align="center" min-width="120">
                            <template scope="scope">
                              <el-tooltip placement="left" :disabled="scope.row.univalence.length < 10" :content="scope.row.univalence">
                                <span> {{scope.row.univalence}}</span>
                              </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column min-width="130" v-if="activeName!='noDocking'" prop="selfCode" label="对接编码" align="center">
                            <template scope="scope">
                                <el-tooltip placement="left" :disabled="scope.row.selfCode+''.length <= 13" :content="scope.row.selfCode">
                                    <span>{{scope.row.selfCode}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column min-width="130" v-if="activeName!='noDocking'" prop="jointGoodsCode" label="对接商品ID" align="center">
                            <template scope="scope">
                                <el-tooltip placement="left" :disabled="scope.row.jointGoodsCode+''.length <= 13" :content="scope.row.jointGoodsCode">
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
import dict from "../../../static/dict.json";
import {
  Taxonomy,
  buttedConnList,
  noButtedConnList,
  deleteGoodsCode,
  JonitGoods,
  buttedList
} from "@/api/serviceManage";
import { userType} from '../../utils/auth'
import orgSearch from '../../components/Hamburger/orgSearch.vue'
import { listDataAll } from "@/api/tech";
export default {
  data() {
    return {
      orgList:[],
      activeName: "yesDocking", //tab切换
      listLoading: false,
      tableFlag:false,
      dockingEName: {},
      eshopStatus: null,
      options: [],
      selfCodeNo:'',
      tableData3: [],
      multipleSelection: [],
      typeOptions: [],
      nameFlag:false,
      pageSync: 1,
      pageSize: 10,
      total: 0,
      thisType: {},
      search: {
        orgId:'',
        eshopCode: "",
        majorSort: "",
        sortId: "",
        goodsName: "",
        selfCode: ""
      }
    };
  },
  watch: {},
  computed: {
    btnShow() {
      if (JSON.parse(localStorage.getItem("btn"))) {
        return JSON.parse(localStorage.getItem("btn"));
      }
    },
    userType(){
      let _userType = userType()
      if(_userType=='org' || _userType=='station'){
        return false
      }else{
        return true
      }
    }
  },
  components: {
      orgSearch
  },
  methods: {
    orgSearch(item){
      this.search.orgId = item
      this.search.eshopCode = ''
      this.options = []
      this.promise({orgId:item})
    },
    //已对接api
    buttedConnListApi(obj, page, size) {
      this.listLoading = true;
      page = page || 1;
      size = size || 10;
      buttedConnList(obj, page, size)
        .then(data => {
          if (data.data.code) {
            this.listLoading = false;
            this.total = data.data.data.count;
            if ("list" in data.data.data) {
              this.tableData3 = data.data.data.list;
              this.nameFlag = true
            } else {
              this.tableData3 = [];
              this.nameFlag = false
            }
            // this.listLoading = false
            // var arr = data.data.data.list
            // var i,len = arr.length
            // for( i = 0 ; i< len; i++){
            //     if("jointGoodsCode" in arr[i]){
            //         continue
            //     }else{
            //         arr[i].jointGoodsCode = ""
            //     }
            // }
            // this.tableData3 = data.data.data.list
            // this.total = data.data.data.count
          } else {
            this.listLoading = false;
            this.nameFlag = false
          }
        })
        .catch(error => {
          this.listLoading = false;
          this.nameFlag = false
        });
    },
    //未对接api
    noButtedConnListApi(obj, page, size) {
      page = page || 1;
      size = size || 10;
      this.listLoading = true;
      noButtedConnList(obj, page, size)
        .then(data => {
          if (data.data.code) {
            this.listLoading = false;
            this.tableData3 = data.data.data.page.list;
            if(this.tableData3.length>0){
              this.nameFlag = true
            }else{
              this.nameFlag = false
            }
            this.total = data.data.data.page.count;
            this.eshopStatus = data.data.data.eshopStatus;
          } else {
            this.listLoading = false;
            this.nameFlag = false
            this.tableData3 = [];
          }
        })
        .catch(error => {
          this.listLoading = false;
          this.nameFlag = false
        });
    },
    //当前查询的E店
    searchEd(val) {},
    //复选框禁选
    selectable(row, index) {
      //通过id来禁止不能选择的项
      // return row.id !== 1
      //通过索引index来禁止不能选择的项
      // return index !== 2
      if (this.activeName == "yesDocking") {
        return row.jointStatus != "butt_butt";
      } else {
        return true;
      }
    },
    eshopCodeData(){
      if (this.search.eshopCode) {
        var i,
          options = this.options;
        for (i = 0; i < options.length; i++) {
          if (options[i].eshopCode == this.search.eshopCode) {
            this.dockingEName = options[i];
            break;
          }
        }
      } else {
        this.dockingEName = { name: "" };
      }
    },
    //搜索
    searchBtt() {
      if(this.userType){
        if(!(this.search.orgId && this.search.eshopCode)){
          this.$message({
            message: '请选择服务机构与对接E店',
            type: 'warning'
          });
          return
        }
      }
      //改变当前查询的E店：
      this.eshopCodeData()
      //--改变当前查询的E店------------------：
      this.tableFlag = true
      if (this.pageSync == 1) {
        this.tablePageSize(this.search, this.pageSync, this.pageSize);
      } else {
        this.pageSync = 1;
      }
    },
    // 搜索框清空
    searchEmpty() {
      if(this.activeName == 'noDocking'){
        this.selfCodeNo = this.search.selfCode
        delete this.search.selfCode
      }else{
         this.search.selfCode = this.selfCodeNo
      }
    },
    //切换，page，size判断当前是已对接还是未对接
    tablePageSize(obj, page, size) {
      if (!obj.eshopCode) {
        this.tableData3 = [];
        this.total = 0;
        return;
      }
      if (this.activeName == "yesDocking") {
        this.buttedConnListApi(obj, page, size);
      } else {
        this.noButtedConnListApi(obj, page, size);
      }
    },
    //tabs切换
    handleClick(tab, event) {
      // debugger;
      // if (this.options[0]) {
      //   this.search.eshopCode = this.options[0].eshopCode;
      // } else {
      //   this.search.eshopCode = "";
      // }
      // this.dockingEName = this.options[0] || { name: "" };
      // this.$refs.multipleTable.clearSelection();
      //防止请求多次
      this.eshopCodeData()
      this.pageSize = 10;
      if (this.pageSync == 1) {
        this.tablePageSize(this.search);
      } else {
        this.pageSync = 1;
      }
      this.searchEmpty(); //清空搜索框
    },
    //复选框
    handleSelectionChange(val) {
      // val.forEach(row=>{
      //     //没有对接商品ID无法选中
      //     if(!row.jointGoodsCode){
      //         this.$refs.multipleTable.toggleRowSelection(row,false);
      //     }
      // })
      this.multipleSelection = val;
    },
    //对接设置、移除数据
    setUpDelete(data) {
      var obj = {};
      var arr = this.multipleSelection;
      var arrPost = [],
        i;
      for (i = 0; i < arr.length; i++) {
        arrPost.push(arr[i][data]);
      }
      obj.goodIds = arrPost;
      obj.eshopCode = this.search.eshopCode;
      if(this.userType){
        obj.orgId = this.search.orgId
      }
      return obj;
    },
    //移除对接按钮
    toggleSelection(row, selected) {
      var obj = this.setUpDelete("id");

      if (obj.goodIds.length <= 0) {
        return;
      }
      this.listLoading = true;
      deleteGoodsCode(obj)
        .then(data => {
          if (data.data.code == 1) {
            this.listLoading = false;
            this.$message({
              type: "success",
              message: data.data.data
            });
            this.tablePageSize(this.search, this.pageSync, this.pageSize);
          } else {
            this.listLoading = false;
          }
        })
        .catch(error => {
          this.listLoading = false;
        });
    },
    //设置对接按钮
    toggleSetUp() {
      var obj = this.setUpDelete("id");
      if (obj.goodIds.length <= 0) {
        return;
      }
      this.listLoading = true;
      JonitGoods(obj)
        .then(data => {
          if (data.data.code == 1) {
            this.listLoading = false;
            this.$message({
              type: "success",
              message: data.data.data
            });
            this.tablePageSize(this.search, this.pageSync, this.pageSize);
          } else {
            this.listLoading = false;
          }
        })
        .catch(error => {
          this.listLoading = false;
        });
    },
    //一页展示几条
    handleSizeChange(page) {
      this.pageSize = page;
      this.tablePageSize(this.search, this.pageSync, this.pageSize);
    },
    // 分页
    handleCurrentChange(val) {
      this.pageSync = val;
      this.tablePageSize(this.search, this.pageSync, this.pageSize);
    },
    //所属类型
    typeChange() {
      //切换类型，请求分类数据
      //清空分类数据，重新请求
      this.search.sortId = "";
      if (this.search.majorSort) {
        Taxonomy({ majorSort: this.search.majorSort })
          .then(data => {
            this.typeOptions = data.data.data;
          })
          .catch(error => {});
      } else {
        this.typeOptions = [];
      }
    },
    promise(obj){
       return new Promise((resolve, reject)=>{
        buttedList(obj)
          .then(data => {
            if (data.data.code == 1) {
              this.listLoading = false;
              if (data.data.data) {
                this.options = data.data.data || [];
                if(!this.userType){
                  this.search.eshopCode = data.data.data[0].eshopCode || "";
                  this.dockingEName = data.data.data[0] || { name: "" }; //当前E店
                }
                // this.search.eshopCode = data.data.data[0].eshopCode || "";
                resolve(this.search);
                // this.dockingEName = data.data.data[0] || { name: "" }; //当前E店
              } else {
                this.dockingEName = { name: "" };
              }
            } else {
              this.listLoading = false;
            }
          })
          .catch(error => {
            this.listLoading = false;
          });
      });
    }
  },
  mounted() {
    //所属类型select
    this.thisType = dict.ser_sort;
    delete this.thisType.all;
   
    //获取E店数据请求table列表
    let tabData = async ()=>{
      try{
        if(this.userType){
          this.$refs['orgSearch'].listDataAll()
        }else{
          let _promise = await this.promise({orgId:''})
          this.buttedConnListApi(_promise);
        }
      }
      catch(error){
      }
    }
    tabData()
  },
  filters: {
    capitalize(value) {
      return value.replace(".00", "元 ");
    }
  }
};
</script>

<style scoped>
.buttDetails {
  background: #fff;
  border-bottom: 1px solid #eee;
}
.buttDetails .el-select {
  margin-left: 1%;
}
.buttDetails .butt-search {
  width: 13%;
  margin-left: 1%;
}
.searchBox {
  padding: 0 20px 20px 0px;
}
.btton-table {
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
}
.butt-pagin {
  margin-top: 20px;
  float: right;
}
.notice {
  display: block;
  color: red;
  margin-top: 10px;
}
.e-prompt {
  font-size: 13px;
  color: #b7b5b5;
}
/* .buttBox .el-table .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
} */
.buttBox .disabled {
  background: #ccc;
  border-color: #ccc;
  cursor: not-allowed;
}
</style>
