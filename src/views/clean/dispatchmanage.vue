<template>
    <div class="addorder-container">
		<!-- 搜索开始 -->
		<div class="filter-container bgWhite">
      <el-select clearable class="search"  v-model="mechanism" filterable placeholder="选择机构" @change="orgChange">
          <el-option v-for="item in mechanismOptions" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
      </el-select>
      <el-select clearable class="search"  v-model="payType" filterable placeholder="选择服务站">
          <el-option v-for="item in payTypeOptions" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
      </el-select>      
			<el-input  style="width:30%" placeholder="请输入搜索内容" v-model.trim="techName">
        <el-select  clearable slot="prepend" class="width120"  v-model="technicianName" placeholder="请选择">
          <el-option v-for="item in technicianOptions" :key="item.key" :label="item.technicianName" :value="item.key">
          </el-option>
        </el-select>             
      </el-input>      
		  <button class="button-large btn_search" @click="localSearch"><i class="el-icon-search"></i>&nbsp;搜索</button>
  </div>
	<!-- 搜索结束 -->
		<div class="second-bar">
			<div class="tableWarpaa addStyle">
					<el-table :data="tableData" border style="width:100%" class="dispatchTaleSelf">
					  <el-table-column  align="center" min-width="220"  label="订单编号">
							<template scope="scope" >
								<div @click="lookInf(scope.row.id)" class="dispatchNumberStyle">
										{{scope.row.orderNumber}}
								</div>
							</template>
						</el-table-column>
            <el-table-column  v-if="userType == 'sys' || userType == 'platform'" align="center" min-width="150" :render-header="renderHeader"  >
                  <template scope="rowObj">
                      <el-tooltip placement="left" v-if="rowObj.row.orgName != undefined" :disabled="rowObj.row.orgName.length < 10" :content="rowObj.row.orgName">
                        <p :class=" rowObj.row.orgName.length < 10 ? '' : 'selfToolTip1' ">{{rowObj.row.orgName}}</p>
                      </el-tooltip>
                      <el-tooltip placement="left" v-if="rowObj.row.stationName != undefined"  :disabled="rowObj.row.stationName.length < 10"  :content="rowObj.row.stationName">
                        <p :class=" rowObj.row.stationName.length < 10 ? '' : 'selfToolTip1'">{{rowObj.row.stationName}}</p>
                      </el-tooltip>                      
                  </template>                    
            </el-table-column>
            <el-table-column  v-if="userType == 'org'" align="center" min-width="150" label="服务站"   >
                  <template scope="rowObj">
                      <el-tooltip placement="left" v-if="rowObj.row.stationName != undefined"  :disabled="rowObj.row.stationName.length < 9" :content="rowObj.row.stationName">
                        <p :class=" rowObj.row.stationName.length < 10 ? '' : 'selfToolTip1'">{{rowObj.row.stationName}}</p>
                      </el-tooltip>
                  </template>                    
            </el-table-column>
					  <el-table-column align="center"  min-width="94" label="订单状态">
							<template scope="scope" >
								<div  class="dispatchNumberStyle1">
                    <span v-if="scope.row.orderStatus =='cancel'">已取消</span>
                    <span v-if="scope.row.orderStatus =='dispatched'">已派单</span>
                    <span v-if="scope.row.orderStatus =='finish'">已完成</span>
                    <span v-if="scope.row.orderStatus =='close'">已关闭</span>
                    <span v-if="scope.row.orderStatus =='stop'">已暂停</span>
                    <span v-if="scope.row.orderStatus =='success'">已成功</span>
                    <span v-if="scope.row.orderStatus =='waitdispatch'">待派单</span>
								</div>
							</template>							
						</el-table-column>
					  <el-table-column align="center"  min-width="94" label="服务状态">
							<template scope="scope" >
								<div  class="dispatchNumberStyle1">
                  <span v-if="scope.row.serviceStatus =='wait_service'">待服务</span>
                  <span v-if="scope.row.serviceStatus =='started'">已上门</span>
                  <span v-if="scope.row.serviceStatus =='finish'">已完成</span>
                  <span v-if="scope.row.serviceStatus =='cancel'">已取消</span>
								</div>
							</template>							
						</el-table-column>                                    
					  <el-table-column align="center"  min-width="160" label="服务时间">
							<template scope="scope" >
								<div  class="dispatchNumberStyle1">
										{{scope.row.serviceTime}}
								</div>
							</template>							
						</el-table-column>
					  <el-table-column align="center"  min-width="120" label="建议服务时长">
							<template scope="scope" >
								<div  class="dispatchNumberStyle1">
										{{scope.row.serviceHour}}
								</div>
							</template>							
						</el-table-column>
					  <el-table-column align="center"  min-width="170" label="服务内容">
              <template scope="scope">
                <el-tooltip placement="left" v-if="scope.row.orderContent != undefined" :disabled="scope.row.orderContent.length < 11" :content="scope.row.orderContent">
                  <div :class=" scope.row.orderContent.length <= 11 ? '' : 'selfToolTip'">{{scope.row.orderContent}}</div>
                </el-tooltip>
              </template>							
						</el-table-column>                        
					  <el-table-column  align="center" label="头像">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">
											<img class="head-images" :src="imgSrc+item.headPic+picWidth60" alt="">
										</div>						
								</template>
					  </el-table-column>

					  <el-table-column align="center" label="姓名">
								<template scope="scope">										
                  <div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">
                    <el-tooltip  placement="left" v-if="item.techName != undefined"  :disabled="item.techName.length < 6 " :content="item.techName">
                        <div :class=" item.techName.length < 6 ? '' : 'techNameStyle1'">{{item.techName}}</div>
                    </el-tooltip>
                  </div>																										
								</template>
					  </el-table-column>

					  <el-table-column align="center" label="性别">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">
											<span class="fontSize12" v-if="item.techSex =='male'">男</span>
                      <span class="fontSize12" v-if="item.techSex =='female'">女</span>
										</div>						
								</template>
					  </el-table-column>

					  <el-table-column align="center" label="电话">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">{{item.techPhone}}</div>						
								</template>
					  </el-table-column>

					  <el-table-column align="center" label="岗位性质">
								<template scope="scope">
										<div class="selfTd" v-for="(item,index) in scope.row.techList" :key="index">
												<span class="fontSize12" v-if="item.jobNature =='part_time'">兼职</span>
												<span class="fontSize12" v-if="item.jobNature =='full_time'">全职</span>
										</div>						
								</template>
					  </el-table-column>
            <el-table-column align="center" :render-header="renderHeader1"    ref="selfcolumn" width="100" fixed="right">
                <template scope="scope">
                  <div class="selfTd"  v-for=" item in scope.row.techList" :key="item.name" >
                    <el-button class="ceshi3" type="button" v-if="btnShow.indexOf('dispatch_insert') >= 0" @click="gaiPai(scope.row.id,item)">改派</el-button>
                  </div>						
                </template>
            </el-table-column>
						<el-table-column  align="center" :render-header="renderHeader2" class="aa" width="100" fixed="right">
		
							<el-table-column  align="center" width="100">
								<template scope="scope">
									<div>
										<el-button class="ceshi3" type="button" v-if="btnShow.indexOf('dispatch_info') >= 0" @click="godispatchReass(scope.row.id)">
											改派记录
										</el-button>
									</div>
								</template>	
							</el-table-column>			  
						</el-table-column>
				</el-table>				
				<div v-if="!listLoading" class="dispatchMangFooter">
					<el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page.sync='jumpPage'
					:page-sizes="[5,10,15,20]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="pagetotal1">
					</el-pagination>
				</div>										
			</div>
		</div>
		<!--技师选择弹窗开始-->
		<el-dialog title="选择技师" :visible.sync="dialogTableVisible" class="selfDialogWidth" :close-on-click-modal="false">
			<el-input placeholder="输入要搜索的姓名" style="width:252px;" v-model="techName2" class="dispatchTechNameSearch"></el-input> 
			<button class="button-large FloatRight marginRight15" @click="searchTeh">查询</button>
      <div class="NowTabs">当前选择标签：</div>
			<!-- <el-collapse-transition> -->
        <transition name="el-zoom-in-bottom">
				<div class="selfpromMessageTab" v-if="middleA.length !=0">
					<div  class="tabWrap1" v-for="item in middleA" :key="item.techId">
						<el-tooltip placement="left" v-if="item.techName != undefined" :disabled="item.techName.length < 6" :content="item.techName">
              <div v-if="item.techName.length !=6" class="techNameStyle">{{item.techName}}</div>
              <div v-if="item.techName.length ==6" class="techNameStyle">{{item.techName}}一</div>
            </el-tooltip>
					</div>                         
				</div>
			<!-- </el-collapse-transition>  -->
        </transition>                                             	
			<div class="selfTableWrapONE">
				<div class="table-d">
					<table  class="selfTable">
					<tr class="tableHeader">
						<td  class="selfTableHEADTD" align="center" width="73px">选择</td>
						<td  class="selfTableHEADTD" align="center" width="158px">头像</td>
						<td  class="selfTableHEADTD" align="center" width="170px">姓名</td>
						<td  class="selfTableHEADTD" align="center" width="73px">性别</td>
						<td  class="selfTableHEADTD" align="center" width="161px">岗位性质</td>							
					</tr>
					<div class="paddingTop60">
							<tr v-for="item in listTech" :key="item.techId"  ref="tableItem1" class="selfTdStyle1">
								<td width="72px" class="fontSize12"  align="center"><el-checkbox  v-model="item.techChecked" @change="ChangeTech(item)"></el-checkbox></td>
								<td  width="157px" class="height70" align="center"><img class="imgStyle" :src="imgSrc+item.headPic+picWidth60"/></td>
								<td width="172px" class="fontSize12" align="center"><el-tooltip placement="left" v-if="item.techName != undefined" :disabled="item.techName.length < 10" :content="item.techName"><div :class=" item.techName.length < 10 ? '' : 'selftechNameStyle' ">{{item.techName}}</div></el-tooltip></td>
								<td  width="72px" class="fontSize12" align="center">
									<span class="fontSize12" v-if="item.techSex =='male'">男</span>
									<span class="fontSize12" v-if="item.techSex =='female'">女</span>									
								</td>
								<td width="160px" class="fontSize12"  align="center">
											<span class="fontSize12" v-if="item.jobNature =='part_time'">兼职</span>
											<span class="fontSize12" v-if="item.jobNature =='full_time'">全职</span>
								</td>							
							</tr>
					</div>
					</table>
					<div v-if="listTech.length == 0  || listTech.length == undefined" class="selfTabProm">暂无数据</div>
				</div>            
			</div> 	  	  
			<div slot="footer" class="dialog-footer" style="text-align:center">
				<button class="button-large" :disabled="techSaveFlag" @click="submitForm2()">保存</button>
				<button class="button-cancel" @click="cancelForm2()">取 消</button>
			</div>
		</el-dialog>
		<!--技师选择弹窗结束-->		
  </div>
</template>

<script>
import {
  dispatchTechData1,
  dispatchTechSave1,
  Reassignment
} from "@/api/order";
import { getFuwu, getSList } from "@/api/staff";
export default {
  name: "dispatchmanage",
  data() {
    return {
      userType:'',
      mechanismOptions: [],
      mechanism: "",
      payTypeOptions: [],
      payType: "",            
      btnShow: [],
      techSaveFlag: false,
      listTech: [],
      techName: "",
      middleA: [],
      tableData: [],
      //全局搜索下拉选项
      technicianOptions: [
        { key: "1", technicianName: "技师姓名" },
        { key: "2", technicianName: "技师手机号" },
        { key: "3", technicianName: "订单编号" }
      ],
      dialogTableVisible: false, //选择技师弹窗开关
      technicianName: "1", //技师姓名
      technicianName1: "", //技师姓名
      pagetotal1: null, //表格总页数
      pageSize1: 10, //表格每页条数
      pageNumber: 1,
      jumpPage: 1,
      aa: "",
      orderId: "",
      listLoading: true,
      techName1: "",
      techName2: "",
      techPhone1: "",
      orderNumber1: ""
    };
  },
  created(){
    if (JSON.parse(localStorage.getItem("btn"))) {
      this.btnShow = JSON.parse(localStorage.getItem("btn"));
    }
  },
  methods: {
    //时间转化成xx小时XX分钟
    formatDuring(mss) {
      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = (mss % (1000 * 60)) / 1000;
      if (hours == 0 && seconds == 0) {
        return minutes + "分钟";
      } else if (hours == 0 && seconds != 0) {
        return minutes + 1 + "分钟";
      } else if (seconds == 0 && minutes == 0) {
        return hours + "小时";
      } else {
        return hours + "小时" + minutes + "分钟";
      }
    },    
    renderHeader (h) {
      return [h('p', {}, ['服务机构']),h('p', {}, ['服务站'])]
    }, 
    renderHeader1 (h) {
      return [h('p', {style:'font-size:14px;text-align:right;'}, ['操'])]
    },
    renderHeader2 (h) {
      return [h('p', {style:'font-size:14px;text-align:left;'}, ['作'])]
    },              
    //机构变化事件
    orgChange(val) {
      this.payType = "";
      this.payTypeOptions = [];
      if (val != "") {
        var obj = {
          orgId: val
        };
        getFuwu(obj).then(res => {
          if (res.data.code === 1) {
            if(res.data.data){
              if (res.data.data[0].id == 0) {
                res.data.data.remove(res.data.data[0]);
              }
              this.payTypeOptions = res.data.data;
              if(this.userType =='station'){
                this.payType=this.payTypeOptions[0].id
              }else{
              }
            }

          } else {

          }
        });
      }
    }, 
    // 服务机构
    getoffice() {
      getSList({}).then(res => {
        if(res.data.data.list != undefined){
          if (res.data.data.list[0].id == '0' ) {
            res.data.data.list.remove(res.data.data.list[0]);
          }
          if(res.data.data.list.length >=2){
              if(res.data.data.list[1].id == '0'){
                res.data.data.list.remove(res.data.data.list[1]);
                res.data.data.list.remove(res.data.data.list[0]);
              }
          }                    
            this.mechanismOptions = res.data.data.list;
            if(this.userType == 'org' || this.userType == 'station'){
               this.mechanism=this.mechanismOptions[0].id
            }
        }
      });
    },           
    //跳转改派记录页
    godispatchReass(id) {
      window.localStorage.setItem("orderId1", id);
      this.$router.push({ path: "/clean/dispatchReass/", query: { id: id } });
    },
    //选择技师弹出层查询按钮
    searchTeh() {
      var obj = {
        id: this.orderId,
        techName: this.techName2
      };
      dispatchTechData1(obj)
        .then(res => {
          if (res.data.code === 1) {
            if (res.data.data != undefined) {
              this.listTech = res.data.data;
              for (var c = 0; c < this.middleA.length; c++) {
                for (var d = 0; d < this.listTech.length; d++) {
                  // this.$set(this.listTech[d], "techChecked", false);
                  if (this.listTech[d].techId == this.middleA[c].techId) {
                    this.listTech[d].techChecked = true;
                  }
                }
              }
            } else {
              this.listTech = [];
            }
          }
        })
        .catch(res => {});
    },
    //存储选择技师对象
    ChangeTech(obj) {
      if (obj.techChecked) {
        this.middleA.push(obj);
      } else {
        for (var a1 = 0; a1 < this.middleA.length; a1++) {
          if (this.middleA[a1].techId == obj.techId) {
            this.middleA.remove(this.middleA[a1]);
          }
        }
      }
    },
    //选择技师弹出层保存
    submitForm2() {
      this.techSaveFlag = true;
      //先遍历数据中选中的再保存
      var arr = [];
      if (this.middleA != undefined && this.middleA.length != 0) {
        for (let a = 0; a < this.middleA.length; a++) {
          if (this.middleA[a].techChecked == true) {
            arr.push(this.middleA[a].techId);
          }
        }
      }
      if (arr.length != 0) {
        var obj1 = {
          id: this.orderId,
          dispatchTechId: this.aa,
          techIdList: arr
        };
        dispatchTechSave1(obj1)
          .then(res => {
            this.techSaveFlag = false;
            if (res.data.code === 1) {
              this.$message({
                type: "success",
                message: "改派成功!"
              });
              if (this.technicianName == "1") {
                this.techName1 = this.techName;
                this.techPhone1 = "";
                this.orderNumber1 = "";
              } else if (this.technicianName == "2") {
                this.techPhone1 = this.techName;
                this.orderNumber1 = "";
                this.techName1 = "";
              } else if (this.technicianName == "3") {
                this.orderNumber1 = this.techName;
                this.techName1 = "";
                this.techPhone1 = "";
              } else {
                this.techName1 = "";
                this.techPhone1 = "";
                this.orderNumber1 = "";
              }
              var obj = {
                techName: this.techName1,
                techPhone: this.techPhone1,
                orderNumber: this.orderNumber1
              };
              this.reassList(obj, this.pageNumber, this.pageSize1);
              this.middleA = [];
              this.listTech = [];
              this.dialogTableVisible = false;
            }
          })
          .catch(res => {
            this.techSaveFlag = false;
          });
      }
      if (arr.length == 0) {
        this.techSaveFlag = false;
        this.dialogTableVisible = false;
      }
    },
    //选择技师弹出层取消
    cancelForm2() {
      this.middleA = [];
      this.listTech = [];
      this.dialogTableVisible = false;
    },
    //改派技师
    gaiPai(id, obj) {
      this.techName2 = "";
      this.aa = obj.techId;
      this.orderId = id;
      var obj1 = {
        id: id
      };
      dispatchTechData1(obj1)
        .then(res => {
          if (res.data.code === 1) {
            this.dialogTableVisible = true;
            if (res.data.data != undefined) {
              this.listTech = res.data.data;
              // for (var d = 0; d <this.listTech.length; d++) {
              // 		this.$set(this.listTech[d],'techChecked',false)
              // }
            } else {
              this.listTech = [];
            }
          }
        })
        .catch(res => {});
    },
    //查看跳转到订单详情页
    lookInf(id) {
      window.localStorage.setItem("orderId", id);
      this.$router.push({ path: "/clean/orderinfo", query: { id: id } });
    },
    //列表渲染
    reassList(pramsObj, pageNo, pageSize) {
      this.listLoading = true;
      var obj = pramsObj;
      Reassignment(obj, pageNo, pageSize)
        .then(res => {
          if (res.data.code === 1) {
            this.pagetotal1 = res.data.data.count;
            this.tableData = res.data.data.list;
            //建议服务时长转化格式
            for(var i=0;i < res.data.data.list.length;i++){
                if(this.tableData[i].serviceHour != undefined){
                  this.tableData[i].serviceHour=this.formatDuring(
                        res.data.data.list[i].serviceHour* 3600000
                  );
                }

            }
            


            this.pageNumber = res.data.data.pageNo;
            this.jumpPage = res.data.data.pageNo;
            this.pageSize1 = res.data.data.pageSize;            
            this.listLoading = false;
          } else {
            this.listLoading = false;
          }
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    //全局搜索按钮
    localSearch() {
      if (this.technicianName == "1") {
        this.techName1 = this.techName;
        this.techPhone1 = "";
        this.orderNumber1 = "";
      } else if (this.technicianName == "2") {
        this.techPhone1 = this.techName;
        this.orderNumber1 = "";
        this.techName1 = "";
      } else if (this.technicianName == "3") {
        this.orderNumber1 = this.techName;
        this.techName1 = "";
        this.techPhone1 = "";
      } else {
        this.techName1 = "";
        this.techPhone1 = "";
        this.orderNumber1 = "";
      }
      var obj = {
        techName: this.techName1,
        techPhone: this.techPhone1,
        orderNumber: this.orderNumber1,
        orgId: this.mechanism,
        stationId: this.payType        
      };
      this.pageNumber = 1;
      this.jumpPage = 1;
      this.reassList(obj, this.pageNumber, this.pageSize1);
    },
    //表格页数改变
    handleSizeChange1(val) {
      this.pageNumber = 1;
      this.jumpPage = 1;
      this.pageSize1 = val;
      if (this.technicianName == "1") {
        this.techName1 = this.techName;
        this.techPhone1 = "";
        this.orderNumber1 = "";
      } else if (this.technicianName == "2") {
        this.techPhone1 = this.techName;
        this.orderNumber1 = "";
        this.techName1 = "";
      } else if (this.technicianName == "3") {
        this.orderNumber1 = this.techName;
        this.techName1 = "";
        this.techPhone1 = "";
      } else {
        this.techName1 = "";
        this.techPhone1 = "";
        this.orderNumber1 = "";
      }
      var obj = {
        techName: this.techName1,
        techPhone: this.techPhone1,
        orderNumber: this.orderNumber1,
        orgId: this.mechanism,
        stationId: this.payType         
      };
      this.reassList(obj, this.pageNumber, this.pageSize1);
    },
    //表格当前页改变
    handleCurrentChange1(val) {
      this.pageNumber = val;
      if (this.technicianName == "1") {
        this.techName1 = this.techName;
        this.techPhone1 = "";
        this.orderNumber1 = "";
      } else if (this.technicianName == "2") {
        this.techPhone1 = this.techName;
        this.orderNumber1 = "";
        this.techName1 = "";
      } else if (this.technicianName == "3") {
        this.orderNumber1 = this.techName;
        this.techName1 = "";
        this.techPhone1 = "";
      } else {
        this.techName1 = "";
        this.techPhone1 = "";
        this.orderNumber1 = "";
      }
      var obj = {
        techName: this.techName1,
        techPhone: this.techPhone1,
        orderNumber: this.orderNumber1,
        orgId: this.mechanism,
        stationId: this.payType         
      };
      this.reassList(obj, this.pageNumber, this.pageSize1);
    }
  },
  mounted() {
    this.reassList({}, 1, 10);
    this.getoffice();
    this.userType=localStorage.getItem("type")
  }
};
</script>
<style scoped>
.selfToolTip {
  margin:0 auto;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.selfToolTip1 {
  margin:0 auto;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.dispatchNumberStyle {
  cursor: pointer;
  padding-left: 18px;
  padding-right: 18px;
}
.dispatchNumberStyle1 {
  padding-left: 18px;
  padding-right: 18px;
}
.dispatchNumberStyle:hover {
  color: #1d85fe;
}
.width120 {
  width: 120px;
}
.FloatRight {
  float: right;
}
.selfpromMessageTab {
  position: relative;
  width: 100%;
  margin-top: 20px;
  margin-left: 10px;
}
.NowTabs{
  color:#576475;float:left;width:100%;font-size:14px;margin-top:15px;margin-bottom:10px;margin-left: 15px;
}
.techNameStyle {
  width: 83px;
  display:inline-block;
  font-size:14px;
  overflow: hidden;
  margin-left: -9px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tabWrap1 {
  width: 145px;
  padding: 0 5px;
  font-size: 10px;
  display: inline-block;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin:3px 6px 3px 8px;
  background:#f2f7fd;
  color:#7a838a;
  font-size:14px;
  position: relative;
  border:1px solid #d8e1ff;
}
.selfTableWrapONE {
  margin-top: 20px;
  overflow: hidden;
  width: 660px;
  height: 280px;
  position: relative;
}
.table-d {
  width: 677px;
  overflow-y: scroll;
  height: 276px;
  margin-left: 15px;
}
.selfTable,
.selfTable tr th,
.selfTable tr td {
  border: 1px solid #eee;
}
.selfTable {
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
  padding: 2px;
}
.height70 {
  height: 70px;
}
.imgStyle {
  display: block;
}
.slide-enter-active {
  transition: all 0.8s ease;
}
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-active {
  transform: translateY(-10px);
  opacity: 0;
}
.tableHeader {
  position: absolute;
  z-index: 99999;
  top: 0px;
}
.selfTdStyle1 {
  vertical-align: middle;
  height: 70px;
  line-height: 70px;
}
.selftechNameStyle {
  width: 147px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fontSize12 {
  font-size: 12px;
}
.selfTabProm {
  width: 100%;
  text-align: center;
  height: 200px;
  line-height: 200px;
}
.bgWhite {
  background-color: #ffffff;
  padding: 20px 20px 20px 20px;
}
.el-table_1_column_8 {
  border-right: none;
}
.selfTd {
  text-align: center;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #dfe6ec;
}
.techNameStyle1 {
  height: 60px;
  line-height: 60px;
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  margin: 0 auto;
}
.selfTd:last-child {
  border: none;
}
.addorder-container {
  width: 100%;
  float: left;
  background: #eef1f6;
}
.fist-bar {
  padding: 20px;
  background: #fff;
  margin-right: 20px;
}
.width120 {
  width: 120px;
}
.paddingTop60 {
  padding-top: 44px;
}
.marginRight15 {
  margin-right: 15px;
}
.dispatchTechNameSearch {
  width: 180px;
  margin-left: 15px;
}
.dispatchMangFooter {
  margin-top: 20px;
  padding-bottom: 0px;
}
.second-bar {
  padding-top: 0px;
  padding-bottom: 20px;
  background: #eef1f6;
  margin-left: 0px;
  margin-right: 0px;
  height: 500px;
}
.addStyle {
  width: 100%;
  background: #fff;
  padding: 20px 20px;
}
.tableWarpaa .el-pagination {
  text-align: right;
}
.techDialog .el-pagination {
  text-align: center;
  padding: 0;
}
.techDialog .dialog-footer {
  padding-bottom: 50px;
}
.tableWarpaa tr > td:nth-child(1) {
  padding: 0 20px;
}
.head-images {
  width: 50px;
  height: 50px;
  margin-top: 5px;
}

.addorder-container .pagination-container {
  padding: 20px 0;
}
.addorder-container .dialog-footer {
  display: flex;
  justify-content: center;
}
.addorder-container .dialog-footer .button-cancel {
  margin-left: 20px;
}
.selfTableHEADTD {
  background: #eef1f6;
  height: 46px;
  border: none !important;
}
</style>