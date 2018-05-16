<template>
<div id="project">
  <div class="filter-container tabStyle">
    <el-tabs v-model="tabs" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="保洁" name="clean"></el-tab-pane>
      <el-tab-pane label="家修" name="repair"></el-tab-pane>
    </el-tabs>
      <orgSearch :widths="'20%'" @orgsearch="orgSearch" ref="orgSearch"></orgSearch>
      <el-select clearable class="search" filterable  v-model="search.sortId" placeholder="所属分类">
        <el-option v-for="(item,index) in searchSortList" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>

      <el-input class="search" placeholder="请输入搜索的项目名称" v-model="search.name">
      </el-input> 
	  <el-input class="search" placeholder="请输入搜索的商品名称" v-model="search.goodsName">
      </el-input> 
      <button class="button-large el-icon-search btn_search btn-color" @click="serGetList"> 搜索</button>
  </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_pad btn-color" v-if="btnShow.indexOf('project_insert')>-1" style="width:80px" @click="handleCreate('basic')">新增单一商品</button>
     <button class="button-small btn_pad btn-color" v-if="btnShow.indexOf('project_insert')>-1" style="width:80px" @click="handleCreateCom('basic')">新增组合商品</button>
    <span v-if="techUserType=='sys'">
      <button class="button-small btn_pad btn-color" v-if="btnShow.indexOf('project_send')>-1" style="width:80px" @click="buttDetails">对接详情</button>
    </span>
    <span v-else>
      <button class="button-small btn_pad btn-color" v-if="btnShow.indexOf('project_send')>-1 && orgStatus=='yes'" style="width:80px" @click="buttDetails">对接详情</button>
    </span>
    <!-- btnShow.indexOf('project_send')>-1 && -->
    <el-table 
    :key='tableKey' 
    :data="listTable" 
    v-loading="listLoading" 
    fit 
    stripe
    border
    highlight-current-row 
    class="projectTabel"
    element-loading-text="正在加载" 
    style="width: 100%;" >
      <el-table-column align="center" label="编号" width="70">
        <template scope="scope">
          {{scope.row.num+(pageNumber-1)*pageSize}}
        </template>
      </el-table-column>

       <el-table-column v-if="techUserType=='sys'"  label="服务机构" align="center" prop="orgName" min-width="130">
         <template scope="scope">
           <div>
             <el-tooltip placement="left" :disabled="scope.row.orgName.length <= 9" :content="scope.row.orgName">
                <span style="padding:0 5px;" :class="{'proName':scope.row.orgName.length>=10}">{{scope.row.orgName}}</span>
             </el-tooltip>
           </div>
         </template>
      </el-table-column>

      <el-table-column align="center" label="图片">
        <template scope="scope" >
          <span v-if="scope.row.pictures != undefined"><img :src="imgSrc + scope.row.pictures[0]+picWidth60" class="imgList"/></span>
        </template>
      </el-table-column>

      <el-table-column  label="项目名称" align="center" prop="name" min-width="130">
          <template scope="scope">
            <div>
              <el-tooltip placement="left" :disabled="scope.row.name.length <= 9" :content="scope.row.name">
                  <span style="padding:0 5px;" :class="{'proName':scope.row.name.length>=10}">{{scope.row.name}}</span>
              </el-tooltip>
            </div>
         </template>
      </el-table-column>

      <el-table-column  label="所属分类" align="center" min-width="130">
          <template scope="scope">
            <div>
              <el-tooltip placement="left" :disabled="scope.row.sortName!=undefined && scope.row.sortName.length <= 9" :content="scope.row.sortName">
                  <span class='proName'>{{scope.row.sortName}}</span>
              </el-tooltip>
            </div>
          </template>
      </el-table-column>

      <el-table-column  label="商品分类" align="center">
          <template scope="scope">
              <span>{{scope.row.goodsType == 'single' ? '单一' : '组合'}}</span>
          </template>
      </el-table-column>

      <el-table-column  label="商品名称" align="center" min-width="150">
        <template scope="scope">
          <div 
            class="branch"  
            v-for="(item,index) in scope.row.commoditys" 
            :key="index">
            <el-tooltip placement="left" :disabled="item.name.length <= 9" :content="item.name">
                <span :class="{'proName':item.name.length>=10}">{{item.name}}</span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="价格/单位" align="center" min-width="120">
        <template scope="scope">
          <div
          class="branch"  
            v-for="(item,index) in scope.row.commoditys" 
            :key="index"
          >
          <el-tooltip placement="left" :disabled="(item.unit+item.doublePrice).length <= 9" :content="item.doublePrice+'元 / '+item.unit">
            <span class="proName">{{item.doublePrice+"元"}} / {{item.unit}}</span>
          </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <!-- 商品 -->
        <!-- 删除商品与已对接E店的一列
        element无法根据内容大小，所以判断两种，有E店和无E店 -->
        <!-- :min-width="btnShow.indexOf('project_send')>-1?250:100" -->
        <!-- <el-table-column align="center" v-if="techUserType=='sys'"  label="" :width="btnShow.indexOf('project_send')>-1?250:150">
             <template scope="scope">
            <div
              class="branch"  
              v-for="(item,index) in scope.row.commoditys" 
              :key="index">
              <button v-if="btnShow.indexOf('project_delete')>-1" class="commEd ceshi3" @click="deletGood(item)">删除商品</button>
              <span v-if="techUserType=='sys'">
                <button v-show="btnShow.indexOf('project_send')>-1" class="commEd ceshi3" @click="dockingE(item)">已对接E店</button>
              </span>
              <span v-else>
                <button v-show="btnShow.indexOf('project_send')>-1 && orgStatus=='yes'" class="commEd ceshi3" @click="dockingE(item)">已对接E店</button>
              </span>
            </div>
          </template>
        </el-table-column> -->
        <!-- :width="btnShow.indexOf('project_send')>-1 && orgStatus=='yes'?550:150" -->
        <el-table-column align="center" label=""  width="250">
             <template scope="scope">
            <div
              class="branch"  
              v-for="(item,index) in scope.row.commoditys" 
              :key="index">
              <button v-if="btnShow.indexOf('project_delete')>-1" class="commEd ceshi3" @click="deletGood(item)">删除商品</button>
              <!-- 全系统用户不需要判断是否有对接E店 -->
              <span v-if="techUserType=='sys'">
                <button v-show="btnShow.indexOf('project_send')>-1" class="commEd ceshi3" @click="dockingE(item)">已对接E店</button>
              </span>
              <span v-else>
                <button v-show="btnShow.indexOf('project_send')>-1 && orgStatus=='yes'" class="commEd ceshi3" @click="dockingE(item)">已对接E店</button>
              </span>
            </div>
          </template>
        </el-table-column>
        <!-- 项目 -->
        <el-table-column align="center" label="" width="200">
          <template scope="scope">
            <span class="probtn ceshi3" v-if="btnShow.indexOf('project_update')>-1" @click="handleUpdate(scope.row)">编辑</span>
            <span class="probtn ceshi3" v-if="btnShow.indexOf('project_delete')>-1" @click="handleDelete(scope.row)">删除项目</span>
        </template>
        </el-table-column>
      </el-table-column>

    </el-table>

    <div v-if="!listLoading" class="pagination-container clearfix">
       <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <combination @comlist="comList" ref='combination'></combination>
    <!-- 添加，编辑弹框 -->
    <el-dialog 
      :title="textMap[dialogStatus]" 
      :visible.sync="dialogFormVisible" 
      :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
       @close="emptyingForm"
      class="diatable">
      <div class="tabBox">
          <div class="tabLeft fl" ref="refTab">
          <el-radio-group v-model="basicForm.majorSort" @change="houseClick"> 
            <el-radio-button label="1" style="display:none"></el-radio-button>
            <el-radio-button :disabled="jointCode"  class="tableCleaning" size='large' label="clean">保洁</el-radio-button>
            <el-radio-button :disabled="jointCode"  style="width:100%;" label="repair">家修</el-radio-button>
            <el-radio-button label="2" style="display:none"></el-radio-button>
          </el-radio-group>
        </div>
         <div class="tabRight fl">
			 <h3 class="tit">基本信息</h3><hr/><br/>
              <el-form 
                class="small-space basic" 
                :model="basicForm" 
                label-position="left" 
                label-width="90px" 
                 ref="basic" 
                :rules="basicRles" >
                <el-form-item label="所属机构：" class="seize" prop="orgId" v-if="techUserType=='sys'">
                    <el-select :disabled="textMap[dialogStatus]=='编辑服务项目'" filterable v-model="basicForm.orgId" style="width:100%" class="form_item">
                      <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="所属分类：" class="seize" prop="sortId">
                  <el-select :disabled="jointCode"  filterable   v-model="basicForm.sortId" style="width:100%" class="form_item">
                    <el-option v-for="item in sortList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="项目名称：" prop="name">
                  <el-input
                  class="form_item"
                  v-model="basicForm.name"
                  placeholder="请输入2-10位的项目名称"></el-input>
                </el-form-item>

                <el-form-item label="banner图：" prop="picture">
					<div class="upload-demo upload_box form_item">
						<imgService @imgclick = "imgClick" :piclist = "picList" :type="'picture-card'" :min='0.9' :max='1.1'></imgService>
					</div>
				<div class="pro-hint">*为了保证浏览效果，请上传大于750px*750px的正方形图片，且不超过4张</div>
                </el-form-item>

				<el-form-item label="图文详情：">
					<div class="upload-demo upload_box form_item">
						<imgService @imgclick = "imgTextClick" :piclist = "pictureDetails" :type="'picture'" :min='0' :max='8'></imgService>
					</div>
                   
				 <div class="pro-hint">*最多4张; 为了保证浏览效果,请上传大于750px*10px且小于750px*6000px的图片</div>
                </el-form-item>

                <el-form-item label="系统标签：" prop="sysTags">
                   <div class="custom form_item">
                        <span class="tech-order-btn" @click="SystemLabel = true"> &#10010; 请选择</span>
                    </div>
                    <div class="labelList form_item label-sty" v-if="(labelClickArr!=undefined && labelClickArr.length>0) || (alreadyArr!=undefined && alreadyArr.length>0)">
                        <!-- <div v-for="(item,index) in labelClickArr.concat(alreadyArr)" :key="index" class="selfTabsaa system-label" style="border-radius:20px;">
                          <el-tooltip placement="left" :disabled="item.length <=5" :content="item">
                              <div>
                                  <span class="selfTabContent" style="border:none !important;border-radius:0px;margin-top:5px;margin-right:0px">{{item}}</span>
                                  <span @click="AlreadyLabel(item)" class="el-icon-close systemClose selfCloseSty" style="border:none;margin-top:5px;margin-right:0px"></span>
                              </div>
                          </el-tooltip>
                        </div>                         -->
                        <div v-for="(item,index) in labelClickArr.concat(alreadyArr)" :key="index" class="sys-label">
                          <el-tooltip placement="left" :disabled="item.length <=8" :content="item">
                              <div>
                                  <span class="sys-text">{{item}}</span>
                                  <span class="sys-close" @click="AlreadyLabel(item)"></span>
                              </div>
                          </el-tooltip>
                        </div>                       
                    </div>
                    
				            <div class="pro-hint">* 最多设置3个系统标签</div>
                </el-form-item>

                <el-form-item label="自定义标签：" class="labelDav">
                    <div class="custom">
                        <span class="tech-order-btn" @click="addLabel = true"> &#10010; 添加</span>
                    </div>
                    <div class="labelList label-sty" v-show="customArr != undefined && customArr.length>0">
                      <div v-for="(item,index) in customArr" :key="index" class="sys-label">
                        <el-tooltip placement="left" :disabled="item.length <=8" :content="item">
                          <div>
                              <span class="sys-text">{{item}}</span>
                              <span class="sys-close" @click="deleteLabel(index)"></span>
                          </div>
                        </el-tooltip>
                      </div>
                        <!-- <span v-for="(item,index) in customArr" :key="index">{{item}}   
                          <i @click="deleteLabel(index)" class="el-icon-close systemClose"></i>
                        </span> -->
                    </div>
					          <div class="pro-hint">* 最多设置3个自定义标签</div>
                </el-form-item> 
            
              <!-- <combination>
                  <div slot="title">
                    <h3 slot="title" class="tit"> 组合商品信息</h3><hr/>
                  </div>
              </combination> -->
                  <!-- 组合商品信息 -->
                    <div style="margin:0 -20px" class="combinationType-info">
                        <h3 class="tit">商品信息</h3><hr/>
                        <div v-if="false">
                            <div style="padding:20px 20px">
                                <el-form-item label="服务类型：" prop="type" class="combination-name">
                                    <div :class="combinationType==1?'type-border-alive':'type-border'" @click="typeAlive(1)">
                                        <i :class="combinationType==1?'type-alive':'type-single'"></i>
                                        <p>单次服务</p>
                                    </div>
                                    <div style="margin-left:50px" :class="combinationType==2?'type-border-alive':'type-border'" @click="typeAlive(2)">
                                        <i :class="combinationType==2?'type-alive':'type-single'"></i>
                                        <p>多次服务</p>
                                    </div>
                                </el-form-item>
                            </div>
                            <div style="padding:0 20px;">
                                <el-form-item label="商品信息：" prop="commodityInfo" class="combination-name">
                                    <input style="margin-left:0" type="button" class="button-cancel btn-color-cancel" value="选择商品" @click="choiceCommodity">
                                </el-form-item>
                            </div>
                            <div style="padding:0 20px" v-if="basicForm.combinationCommodities == undefined ||basicForm.combinationCommodities.length>0">
                                <el-table :data="basicForm.combinationCommodities" border style="width: 100%;">
                                    <el-table-column prop="itemName" align="center" label="项目名称"> </el-table-column>
                                    <el-table-column prop="name" align="center" label="商品名称"> </el-table-column>
                                    <el-table-column prop="company" align="center" label="原价/单位">
                                        <template scope="scope">
                                            <span>{{'¥'+scope.row.unit+' / '+scope.row.price}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" align="center" label="组合商品售价">
                                        <template scope="scope">
                                          <span><el-input v-model="scope.row.combinationPrice"></el-input></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" align="center" label="数量">
                                        <template scope="scope">
                                            <span ><el-input-number class="selfINputNumStyle" v-model="scope.row.combinationNum" :min='1'  :max="999999"></el-input-number></span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" align="center" label="操作">
                                        <template scope="scope">
                                            <span style="color:#FF7676;" @click="deleteInformation(scope.row)">删除</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div style="padding:20px">
                              <!-- 组合商品价格：{{informationCalculation}} -->
                                <el-form-item label="组合商品名称：" class="combination-name">
                                    <el-input
                                      style="width:60%"
                                      v-model="basicForm.combinationName"
                                      placeholder="请输入1-24位的组合商品名称"></el-input>
                                </el-form-item>
                                <el-form-item label="组合商品价格：" class="combination-name">
                                    <span v-if="handleCreateFlag=='combination'">{{'¥ '+informationCalculation}}</span>
                                </el-form-item>
                                <el-form-item label="商品单位：" class="combination-name">
                                    <el-input
                                      style="width:60%"
                                      v-model="basicForm.combinationName"
                                      placeholder="请输入1-6位的组合商品单位"></el-input>
                                </el-form-item>
                                <div>
                                    <el-form-item label="折算时长：" class="combination-name">
                                        <el-input
                                          style="width:60%"
                                          v-model="basicForm.combinationName"
                                          placeholder="请输入2-10位的项目名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="起步人数：" class="combination-name">
                                    <el-input
                                          style="width:60%"
                                          v-model="basicForm.combinationName"
                                          placeholder="请输入2-10位的项目名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="封顶人数：" class="combination-name">
                                    <el-input
                                          style="width:60%"
                                          v-model="basicForm.combinationName"
                                          placeholder="请输入2-10位的项目名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="起够数量：" class="combination-name">
                                    <el-input
                                          style="width:60%"
                                          v-model="basicForm.combinationName"
                                          placeholder="请输入2-10位的项目名称"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </div>
                  <!-- 组合商品信息 完成-->
               </el-form>
    <!-- 商品信息表格 -->
                <el-table v-if="true" :data="basicForm.commoditys" border style="width: 100%"  v-show="basicForm.commoditys.length>0">
                  <el-table-column prop="name" align="center" label="商品名称"> </el-table-column>
                  <el-table-column prop="unit" align="center" label="商品单位"> </el-table-column>
                  <el-table-column prop="type" align="center" label="计量方式"> 
                    <template scope="scope">
                      <span v-show="scope.row.type=='num'">按时长或数量</span>
                      <span v-show="scope.row.type=='area'">按面积</span>
                      <span v-show="scope.row.type=='house'">按居室</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price" align="center" label="价格"> 
                    <template scope="scope">
                      <span>{{scope.row.price+'元/'+scope.row.unit}}</span>  
                    </template>  
                  </el-table-column>
                  <el-table-column v-if="sordFlag" prop="convertHours" align="center" label="折算时长">
                    <template scope="scope">
                      <span>{{scope.row.convertHours+'小时 / '+scope.row.unit}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="sordFlag" align="center" label="起步人数">
                    <template scope="scope">
                      <span>{{scope.row.startPerNum!=0? scope.row.startPerNum : 1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="sordFlag" prop="cappingPerNum" align="center" label="封顶人数"> 
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
                      <span class="tableSer" v-if="!scope.row.id" style="color:red"  @click="tableHandleDelete(scope.$index, scope.row)">删除</span>
                    </template>
                  </el-table-column>
                </el-table>
          <!-- 商品信息表格 。。。。。。。。完成 -->
              <div class="add_Btn" @click="addCommodity" v-if="true">
                <span class="fl btn_Span1">+</span>
                <span class="fl btn_Span2">添加商品</span>
              </div>
          </div>
          </div>
		  <!-- </div> -->
              <div slot="footer" class="dialog-footer" style="text-align:center">
                <input type="button" class="button-large btn-color" :disabled="btnState" @click="subForm('basic')" value="保 存">
                <input type="button" class="button-cancel btn-color-cancel" @click="cancel('basic')" value="取 消">
              </div>
            </el-dialog>
    <!-- 商品信息 完成 -->
    <!--自定义标签 -->
      <el-dialog title="设置自定义标签" :close-on-click-modal="false" :visible.sync="addLabel" class="labelName" @close="closeingLabel">
        <el-form :model="labelObj" :rules="labelRules" ref="labelObj">
          <el-form-item label="标签名称" :label-width="formLabelWidth" prop="labelName">
            <el-input v-model="labelObj.labelName" placeholder="中文、英文、数字(1~10)"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <input type="button" class="button-large" @click="CustomLabel('labelObj')" value="确 定">
          <input type="button" class="button-cancel" @click="addLabel = false" value="取 消">
        </div>
      </el-dialog>
    <!-- 自定义标签结束-->
    <!--系统标签-->
      <el-dialog title="选择标签" :close-on-click-modal="false" :visible.sync="SystemLabel" class="systemLabel" @close="closeingLabel">
        <el-row>
          <el-col :span="24">
              <div style="line-height:60px">
                  <div class="selfTitle1">当前选择标签：</div>
                  <div class="labelList label-current" v-show="labelClickArr != undefined && labelClickArr.length>0">
                       <div v-for="(item,index) in labelClickArr" :key="index" class="sys-label sys-label-dialog">
                           <el-tooltip placement="left" :disabled="item.length <=6" :content="item">
                              <div>
                                  <span class="sys-text">{{item}}</span>
                                  <span class="sys-close" @click="SelectedLabel(item)"></span>
                              </div>
                           </el-tooltip>
                       </div>
                  </div>
                  <!-- <div v-for="(item,index) in labelClickArr" :key="index" class="selfTabsaa">
                    <el-tooltip placement="left" :disabled="item.length <= 4" :content="item">
                        <div>
                            <span class="selfTabContent" style="" style="border:none;">{{item}}</span>
                            <span @click="SelectedLabel(item)" class="el-icon-close systemClose selfCloseSty" style="border:none;"></span>
                        </div>
                    </el-tooltip>
                  </div> -->
              </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-show="alreadyArr.length>0">
            <div style="line-height:32px">
                  <div class="selfTitle1">已添加标签：</div>
                  <div class="labelList label-already" v-show="alreadyArr != undefined && alreadyArr.length>0">
                      <div v-for="(item,index) in alreadyArr" :key="index" class="sys-label sys-label-dialog">
                           <el-tooltip placement="left" :disabled="item.length <=6" :content="item">
                              <div>
                                  <span class="sys-text">{{item}}</span>
                                  <span class="sys-close" @click="AlreadyLabel(item)"></span>
                              </div>
                           </el-tooltip>
                       </div>
                  </div>
                  <!-- <div v-for="(item,index) in alreadyArr" :key="index" class="selfTabsaa">
                    <el-tooltip placement="left" :disabled="item.length <= 4" :content="item">
                        <div>
                          <span class="selfTabContent" style="" style="border:none;">{{item}}</span>
                          <span @click="AlreadyLabel(item)" class="el-icon-close systemClose selfCloseSty" style="border:none;margin-top:2px;"></span>
                        </div>
                    </el-tooltip>
                  </div> -->
            </div>
          </el-col>
        </el-row>

       
              <div class="sys-label-choice" style="overflow:hidden;margin-top:22px">
                <div class="over-fl label-num">
                    <div style="width:87%;float:left">
                        <div class="sys-title">
                            分类一
                        </div>
                        <ul class="innerbox">
                            <li v-for="item in systemOptions" :key="item.value" @click="systemClick(item)" :class="{'activeSystem_1':item.value==systemClickId}">
                              <span class="projectLabel">{{item.label}}</span>
                            </li>
                        </ul>
                    </div>
                    <div style="float:left">
                        <div class="sys-arrow">

                        </div>
                    </div>
                </div>
                <!-- 标题2 -->
                <div class="over-fl label-num" v-show="systemOptions2 !== undefined && systemOptions2.length>0">
                    <div style="width:87%;float:left">
                        <div class="sys-title">
                            分类二
                        </div>
                        <ul class="innerbox">
                            <li v-for="item in systemOptions2" :key="item.value" @click="systemClick2(item)" :class="{'activeSystem_2':item.value==systemClick2Id}">
                              <span class="projectLabel">{{item.label}}</span>
                            </li>
                        </ul>
                    </div>
                    <div style="float:left">
                        <div class="sys-arrow">

                        </div>
                    </div>
                </div>
                <!-- 标题三 -->
                <div class="over-fl label-num" v-show="systemOptions3 !== undefined && systemOptions3.length>0">
                    <div style="width:87%;float:left">
                        <div class="sys-title">
                            分类三
                        </div>
                        <ul class="innerbox">
                            <li v-for="item in systemOptions3" :key="item.value" @click="systemClick3(item)" :class="{'activeSystem_3':item.value==systemClick3Id}">
                              <span class="projectLabel">{{item.label}}</span>
                            </li>
                        </ul>
                    </div>
                    <div style="float:left">
                        <div class="sys-arrow">

                        </div>
                    </div>
                </div>
                <!-- 标签名 -->
                 <div class="over-fl label-num label-name" v-show="systemOptions4 !== undefined && systemOptions4.length>0">
                    <div style="width:100%;float:left">
                        <div class="sys-title">
                            标签名称
                        </div>
                        <div style="height:296px;overflow-y:auto;" class="innerbox">
                          <div class="labelSystem">
                           <div class="label-input" v-for="(item,key) in systemOptions4"  style="" :key="key">
                              <el-tooltip placement="left" :disabled="item.label.length<4" :content="item.label">
                                <input type="button"
                                        class="cursor" 
                                        style="width:85px;height:30px;line-height:30px;overflow:hidden;" 
                                      :value="item.label" @click="labelClick(item)"
                                        :class="{'techTime-green':labelClickArr.indexOf(item.label)!=-1 || JSON.stringify(alreadyArr).indexOf(JSON.stringify(item.label))!=-1}"
                                        :disabled="JSON.stringify(alreadyArr).indexOf(JSON.stringify(item.label))!=-1">
                              </el-tooltip>
                            </div>        
                          </div>
                        </div>
                    </div>
                </div>
                  <!-- <ul>
                      <li v-for="item in systemOptions" :key="item.value" @click="systemClick(item)" :class="{'activeSystem_1':item.value==systemClickId}">
                        <span class="projectLabel">{{item.label}}</span>
                        <i class="el-icon-arrow-right"></i>
                      </li>
                  </ul> -->
                  <!-- <ul v-show="systemOptions2 !== undefined && systemOptions2.length>0">
                      <li v-for="item in systemOptions2" :key="item.value" @click="systemClick2(item)" :class="{'activeSystem_2':item.value==systemClick2Id}">
                        <span class="projectLabel">{{item.label}}</span><i class="el-icon-arrow-right"></i>
                      </li>
                  </ul>
                  <ul v-show="systemOptions3 !== undefined && systemOptions3.length>0">
                      <li v-for="item in systemOptions3" :key="item.value" @click="systemClick3(item)" :class="{'activeSystem_3':item.value==systemClick3Id}">
                        <span class="projectLabel">{{item.label}}</span><i class="el-icon-arrow-right"></i>
                      </li>
                  </ul>
                  <div></div>
                  <div class="labelSystem" v-if="systemOptions4 !== undefined && systemOptions4.length>0">
                      <div  v-for="(item,key) in systemOptions4"  style="margin-left:5px;" :key="key">
                          <el-tooltip placement="left" :disabled="item.label.length<4" :content="item.label">
                            <input type="button"
                                    class="cursor" 
                                    style="width:85px;height:30px;line-height:30px;overflow:hidden;" 
                                   :value="item.label" @click="labelClick(item)"
                                    :class="{'techTime-green':labelClickArr.indexOf(item.label)!=-1 || JSON.stringify(alreadyArr).indexOf(JSON.stringify(item.label))!=-1}"
                                    :disabled="JSON.stringify(alreadyArr).indexOf(JSON.stringify(item.label))!=-1">
                        </el-tooltip>
                      </div>        
                  </div> -->
              </div>
       
        <div slot="footer" class="dialog-footer">
          <input type="button" class="button-cancel" @click="SystemLabel = false" value="关 闭">
        </div>
      </el-dialog>
    <!-- 系统标签结束 -->

    <!-- 商品添加 -->
	    <el-dialog :title='handleEditFlag?"编辑商品":"添加商品"' :visible.sync="addCommodityFlag" :close-on-click-modal="false" class="addCommidtyClass">
              <el-form 
                :model="goods_info"
                ref="goods_info"
                label-position="left"
                label-width="100px" 
                class="dia_form"
                :rules = "goods"
                 >
                <el-form-item label="商品名称:" prop="name">
                  <el-input
                    placeholder="请输入商品名称（1-24位）"
                    
                    v-model="goods_info.name"></el-input>
                </el-form-item>
                <el-form-item label="商品单位:" prop="unit">
                  <el-input 
                    
                    placeholder="请输入单位名称（1-6位）"
                    v-model="goods_info.unit"></el-input>
                </el-form-item>

                <el-form-item label="计量方式:" prop="type">
                  <el-select class="form_item" v-model="goods_info.type" placeholder="请选择" >
                     <el-option v-for="(item,key) in measure" :key="key" :label="item" :value="key"></el-option>
                  </el-select>
                </el-form-item>
                
                <el-form-item label="价格:" prop="price">
                  <el-input v-model="goods_info.price" >
                     <template slot="append">元 / {{goods_info.unit || "单位"}}</template>
                  </el-input>
                </el-form-item>
                <el-form-item v-if="sordFlag" label="折算时长:" prop="convertHours" class="doubtf">
                  <el-input v-model="goods_info.convertHours" style="width:100%" >
                    <template slot="append">小时 / {{goods_info.unit || "单位"}}</template>                
                  </el-input>
                  <el-popover
                      ref="popover1"
                      placement="top-start"
                      trigger="hover"
                      content="请录入1单位所需服务时长（以小时为单位）例如：擦玻璃计量单位为平米，1单位（即1平米）所需服务时长为0.25小时每人">
                    </el-popover>
                   <span  v-popover:popover1 class="iconfont doubt">&#xe62a;</span>
                </el-form-item>
             
                <el-form-item v-if="sordFlag" label="起步人数:" class="seize" prop="startPerNum">
                  <el-input
                    placeholder="请输入起步人数(默认为1)"
                   
                    v-model="goods_info.startPerNum"></el-input>
                </el-form-item>

                <el-form-item v-if="sordFlag" label="封顶人数:" class="seize" prop="cappingPerNum">
                  <el-input
                    placeholder="请输入封顶人数"
                    
                    v-model="goods_info.cappingPerNum"></el-input>
                </el-form-item>

                <el-form-item label="起购数量:" class="seize" prop="minPurchase">
                  <el-input
                    placeholder="请输入起购数量（默认为1）"
                    
                    v-model="goods_info.minPurchase"></el-input>
                </el-form-item>
                <div v-if="dialogStatus != 'update'" class="pro-wing">*注意事项：通用分类下的商品保存时，会将计量方式自动保存为按时长或数量，折算时长、起步人数自动保存为0</div>
              </el-form>
			   <div slot="footer" class="dialog-footer" style="text-align:center">
				 	<input v-if="handleEditFlag" type="button" class="button-large btn-color" @click="submitForm('goods_info')" value="保 存">
                  	<input v-else type="button" class="button-large btn-color" @click="submitForm('goods_info')" value="添 加">
                  	<!-- <input type="button" class="button-cancel btn-color" @click="resetForm('ser')" value="取 消"> -->
					<input type="button" class="button-cancel btn-color-cancel" @click="resetForm()" value="取 消">
				</div>
			</el-dialog>
        <!-- <el-dialog title="添加商品" :visible.sync="addCommodityFlag">
			<addCommodity :measure="measure"></addCommodity>
        </el-dialog> -->
    <!-- 商品添加完成 -->
    <!-- 对接E店 -->
      <el-dialog title="商品对接E店详情" :close-on-click-modal="false" :visible.sync="docking" class="dockingDialog">
        <el-table :data="dockingData" stripe border style="width: 100%">
          <el-table-column prop="name" align="center" label="商品名称"></el-table-column>
          <el-table-column class-name="joCode" prop="jointCode" align="center" label="对接编码">
            <template scope="scope">
              <el-tooltip placement="left" :disabled="scope.row.jointCode.length<=20" :content="scope.row.jointCode">
                <span>{{scope.row.jointCode}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="address" align="center" label="E店名称">
            <template scope="scope">
              <div class="branch" v-for="(item,index) in scope.row.commodityEshops" :key="index">
                  <el-tooltip placement="left" :disabled="item.eshopName.length<=10" :content="item.eshopName">
                      <span>{{item.eshopName}}</span>
                   </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="id" align="center" label="对接商品ID">
            <template scope="scope">
              <div class="branch" v-for="(item,index) in scope.row.commodityEshops" :key="index">
                <el-tooltip placement="left" :disabled="item.jointGoodsCode.length<=10" :content="item.jointGoodsCode">
                  <span>{{item.jointGoodsCode}}</span>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <input type="button" class="button-cancel" @click="docking = false" value="关 闭">
        </div>
      </el-dialog>
    <!-- 对接E店完成 -->

    <!-- 组合商品信息——选择商品 -->
      <el-dialog title="选择商品" :close-on-click-modal="false" :visible.sync="combinationTypeDialog" class="dockingDialog">
          <div>
              <el-input class="commodity-search" v-model="orgStatus" placeholder="请输入内容"></el-input>
              <el-input class="commodity-search" v-model="orgStatus" placeholder="请输入内容"></el-input>
              <input type="button" class="button-large btn-color" style="float:right" value="查 询">
          </div>
          <div style="padding-top:25px">
              <p>已选择商品：</p>
              <transition name="el-zoom-in-bottom">
                <div class="labelList label-current" v-if="commodityArr != undefined && commodityArr.length>0">
                  <div v-for="(item,index) in commodityArr" :key="index" class="sys-label sys-label-dialog">
                      <el-tooltip placement="left" :disabled="item.name.length <=5" :content="item.name">
                        <div>
                            <span class="sys-text">{{item.name}}</span>
                            <span class="sys-close" @click="commodityDelete(item)"></span>
                        </div>
                      </el-tooltip>
                  </div>
                </div>
              </transition>
          </div>
          <div>
              <el-table height="360" :data="commodityDate" border style="width: 100%">
                  <el-table-column prop="name" align="center" label="选择">
                      <template scope="scope">
                          <el-checkbox v-if="combinationType==1" v-model="scope.row.check" @change="selectCommodity(scope.row)"></el-checkbox>
                          <el-radio v-else class="radio" v-model="radio" :label="scope.row.id" @change.native="selectCommoditySingle(scope.row)">&nbsp;</el-radio>
                      </template>
                  </el-table-column>
                  <el-table-column prop="itemName" align="center" label="项目名称"> </el-table-column>
                  <el-table-column prop="name" align="center" label="商品名称"> </el-table-column>
                  <el-table-column prop="unit" align="center" label="单价/单位">
                      <template scope="scope">
                          <span>{{'¥'+scope.row.unit+' / '+scope.row.price}}</span>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
          <div slot="footer" class="dialog-footer" style="text-align:center" >
                <input type="button" class="button-large btn-color" @click="commodityPreservation" value="保 存">
                <input type="button" class="button-cancel btn-color-cancel" @click="ommodityCancel" value="取 消">
          </div>
      </el-dialog>
    <!-- 组合商品信息——选择商品 完成 -->

  </div>
</div>
</div>
</template>



<script>
// ----------------

import {
  getProject,
  addProject,
  delProject,
  getInfoPic
} from "@/api/serviceManage";
import { listDataAll } from "@/api/tech"
import Cookies from "js-cookie";
import { getSign } from "@/api/sign";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { userType} from '../../utils/auth'
import { parseTime } from "@/utils";
import orgSearch from '../../components/Hamburger/orgSearch.vue'
import combination from './combination'
import {
  Taxonomy,
  Orienteering,
  ServerAdd,
  ServerDelete,
  ServerEdit,
  serverEditPre,
  alreadyButted,
  serGasqSort,
  deleteGoodsData
} from "@/api/serviceManage";
import imgService from "../../components/upload/upload.vue";
import addCommodity from "./addCommodity.vue";
import dict from "../../../static/dict.json"
// var without = require('lodash.without')
//挂载数据
var arr = [];
var informationTables = [
  {label:'日常保洁1',name:'一居室',company:'￥120 /一居室',price:'11',num:'1'},
  {label:'深度保洁1',name:'平米保洁',company:'￥20 /平米',price:'12',num:'2'},
  {label:'日常保洁2',name:'一居室',company:'￥120 /一居室',price:'13',num:'3'},
  {label:'深度保洁2',name:'平米保洁1',company:'￥201 /平米',price:'14',num:'4'},
]
var informationTable = [
  {check:false,itemName:'日常保洁1',name:'居室保洁1',unit:'100',price:"间",id:'1',combinationPrice:'0',combinationNum:'1'},
  {check:false,itemName:'日常保洁2',name:'居室保洁2',unit:'200',price:"间",id:'2',combinationPrice:'0',combinationNum:'1'},
  {check:false,itemName:'日常保洁3',name:'居室保洁3',unit:'300',price:"间",id:'3',combinationPrice:"0",combinationNum:'1'},
  {check:false,itemName:'日常保洁4',name:'居室保洁4',unit:'400',price:"间",id:"4",combinationPrice:'0',combinationNum:'1'},
  {check:false,itemName:'日常保洁5',name:'居室保洁5',unit:'500',price:"间",id:'5',combinationPrice:'0',combinationNum:'1'},
  {check:false,itemName:'日常保洁6',name:'居室保洁6',unit:'600',price:"间",id:'6',combinationPrice:'0',combinationNum:'1'}
]
var commodityDate = [
  {check:false,itemName:'日常保洁1',name:'居室保洁1',unit:'100',price:"间",id:'1'},
  {check:false,itemName:'日常保洁2',name:'居室保洁2',unit:'200',price:"间",id:'2'},
  {check:false,itemName:'日常保洁3',name:'居室保洁3',unit:'300',price:"间",id:'3'},
  {check:false,itemName:'日常保洁4',name:'居室保洁4',unit:'400',price:"间",id:"4"},
  {check:false,itemName:'日常保洁5',name:'居室保洁5',unit:'500',price:"间",id:'5'},
  {check:false,itemName:'日常保洁6',name:'居室保洁6',unit:'600',price:"间",id:'6'}
]
export default {
  name: "project",
  directives: {
    waves
  },
  data() {
    //价格
    var PRICE = (rule, value, callback) => {
      var val = value + "";
      var reg = /^\d+(\.\d{1,2})?$/;
      if (val) {
        if (val * 1 <= 99999999) {
          if (reg.test(val)) {
            callback();
          } else {
            callback(new Error("不能为特殊字符，小数保留后两位"));
          }
        } else {
          callback(new Error("不能大于99999999元"));
        }
      } else {
        callback(new Error("请输入价格"));
      }
    };
    //折算时长
    var CONVERTHOURS = (rule, value, callback) => {
      var reg = /^d*(?:.d{0,2})?$/;
      if (value) {
        if (this.goods_info.type == "num") {
          if (value >= 0.01 && value <= 1.5) {
            var con = this.converFilter(value);
            con ? callback() : callback(new Error("请精确到小数后两位"));
          } else {
            callback(new Error("请正确输入(0.01~1.5小时)"));
          }
        }

        if (this.goods_info.type == "area") {
          if (value >= 0.01 && value <= 0.5) {
            var con = this.converFilter(value);
            con ? callback() : callback(new Error("请精确到小数后两位"));
          } else {
            callback(new Error("请正确输入(0.01~0.5小时)"));
          }
        }

        if (this.goods_info.type == "house") {
          if (value >= 2 && value <= 12) {
            var con = this.converFilter(value);
            con ? callback() : callback(new Error("请精确到小数后两位"));
          } else {
            callback(new Error("请正确输入(2~12小时)"));
          }
        }
      } else {
        callback(new Error("请输入折算时长"));
      }
    };
    var PERSONS = (rule, value, callback) => {
      var reg = /^\d+$/;
      if (value.length > 0) {
        for (var i = 0; i < value.length; i++) {
          if (reg.test(value[i].cappingPerNum)) {
            if (reg.test(value[i].startPerNum)) {
              callback();
            } else {
              callback(new Error("人数必须为数字值"));
            }
          } else {
            callback(new Error("临界值必须为数字值"));
          }
        }
      } else {
        callback(new Error("请输入派人数量"));
      }
    };
    //服务图片
    var PICTURE = (rule, value, callback) => {
      if (this.picFile != undefined && this.picFile.length > 0) {
        if (this.picFile[0] == "") {
          callback(new Error("第一张商品banner图还没上传"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请添加banner图"));
      }
    };
    //系统标签
    var SYSTAGS = (rule, value, callback) => {
      var arr = this.labelClickArr.concat(this.alreadyArr);
      if (arr != undefined && arr.length > 0) {
        callback();
      } else {
        callback(new Error("请选择系统标签"));
      }
    };
    //自定义标签
    var LABELNAME = (rule, value, callback) => {
      var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
      if (value) {
        if (value.length >= 1 && value.length <= 10) {
          if (this.customArr.indexOf(value) != -1) {
            callback(new Error("已有该自定义标签名称"));
          } else {
            if (reg.test(value)) {
              callback();
            } else {
              callback(new Error("不能输入特殊字符"));
            }
          }
        } else {
          callback(new Error("自定义标签长度1~10位"));
        }
      } else {
        callback(new Error("请输入自定义标签"));
      }
    };
    //封顶人数
    var CAPPINPERNUM = (rule, value, callback) => {
      var reg = /^\d+$/;
      if (value) {
        if (value * 1 <= 30) {
          if (reg.test(value)) {
            if (value * 1 >= this.goods_info.startPerNum * 1) {
              if (value == 0) {
                callback(new Error("封顶人数最小值为1"));
              } else {
                callback();
              }
            } else {
              callback(new Error("起步人数不能大于封顶人数"));
            }
          } else {
            callback(new Error("请输入数字"));
          }
        } else {
          callback(new Error("封顶人数最高30人"));
        }
      } else {
        callback();
      }
    };
    //起步人数
    var STARTPERNUM = (rule, value, callback) => {
      var reg = /^\d+$/;
      if (value) {
        if (value * 1 <= 30) {
          if (reg.test(value)) {
            if (value == 0) {
              callback(new Error("起步人数最小值为1"));
            } else {
              callback();
            }
          } else {
            callback(new Error("请输入数字"));
          }
        } else {
          callback(new Error("起步人数最高30人"));
        }
      } else {
        callback();
      }
    };
    //起购数量
    var MINPURCHASE = (rule, value, callback) => {
      var reg = /^\d+$/;
      if (value) {
        if (value * 1 <= 999999) {
          if (reg.test(value)) {
            if (value == 0) {
              callback(new Error("起购数量最小值为1"));
            } else {
              callback();
            }
          } else {
            callback(new Error("请输入数字"));
          }
        } else {
          callback(new Error("起购数量应在999999以内"));
        }
      } else {
        callback();
      }
    };
    //商品名称
    var NAME = (rule, value, callback) => {
      var editName = this.editName;
      var arr = this.basicForm.commoditys;
      if (value) {
        if (value.length >= 1 && value.length <= 24) {
          if (this.handleEditFlag) {
            if (editName.name == value) {
              callback();
            } else {
              var flag = this.filtersName(value);
              if (flag) {
                callback();
              } else {
                callback(new Error("商品名称重复"));
              }
            }
          } else {
            if (arr != undefined && arr.length > 0) {
              var flag = this.filtersName(value);
              if (flag) {
                callback();
              } else {
                callback(new Error("商品名称重复"));
              }
            } else {
              callback();
            }
          }
        } else {
          callback(new Error("长度在 1 到 24 个字符"));
        }
      } else {
        callback(new Error("请输入商品名称(1-24位)"));
      }
    };
    return {
      commodityArr:[],
      handleCreateFlag:'',
      radio:'',
      commodityDate:[],
      informationPrice:['11','22','33','44'],
      combinationTypeDialog:false,
      combinationType:1,
      sordFlag:true,
      orgStatus: "",
      pageNumber: 1,
      addCommodityFlag: false,
      editName: {},
      customArr: [],
      orgList:[],
      jointCode: false,
      dockingData: [],
      alreadyArr: [],
      labelClickArr: [],
      orgNameList:[],
      systemClickId: null,
      systemClick2Id: null,
      systemClick3Id: null,
      docking: false,
      systemOptions: [],
      systemOptions2: [],
      imgNumber: 0,
      systemOptions3: [],
      systemOptions4: [],
      SystemLabel: false,
      labelObj: {
        labelName: ""
      },
      formLabelWidth: "90px",
      addLabel: false,
      btnState: false,
      tabs: "all",
      editId: "",
      total: null,
      houseStr: "",
      whole: {},
      addDetailsImg: 0,
      personsTime: false,
      //   addComm: false,
      critical: "",
      quantity: "",
      persons: [],
      commoditys: [],
      handleEditFlag: false,
      handleEditIndex: null,
      measure: [],
      listTable: [],
      listLoading: true,
      sortList: [],
      searchSortList: [],
      goods_info: {
        name: "",
        unit: "",
        type: "",
        price: "",
        convertHours: "",
        startPerNum: "",
        cappingPerNum: "",
        minPurchase: ""
      },
      goods: {
        name: [{ required: true, validator: NAME, trigger: "blur" }],
        unit: [
          { required: true, message: "请输入商品单位", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择计量方式", trigger: "change" }
        ],
        price: [{ required: true, validator: PRICE, trigger: "blur" }],
        convertHours: [
          { required: true, validator: CONVERTHOURS, trigger: "blur" }
        ],
        startPerNum: [{ validator: STARTPERNUM, trigger: "blur" }],
        cappingPerNum: [{ validator: CAPPINPERNUM, trigger: "blur" }],
        minPurchase: [{ validator: MINPURCHASE, trigger: "blur" }]
      },
      labelRules: {
        labelName: [
          {
            required: true,
            validator: LABELNAME,
            trigger: "blur"
          }
        ]
      },
      basicForm: {
        name: "",
        sortId: "",
        majorSort: "all",
        commoditys: [],
        sysTags: [],
        customTags: [],
        orgId:'',
        type:'',  //服务分类
        combinationCommodities:[], //组合订单----商品信息
        combinationName:'',   //组合商品名称
        combinationPrice:'',     //组合商品价格
        commodityCompany:'',   //商品单位
      },
      basicRles: {
        type:[
          { required: true, message: "请选择服务类型", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "请输入2-10位的项目名称",
            trigger: "blur"
          }
        ],
        picture: [{ required: true, validator: PICTURE, trigger: "blur" }],
        sortId: [
          { required: true, message: "请选择所属分类", trigger: "blur" }
        ],
        orgId:[{ required: true, message: "请选择所属机构", trigger: "blur" }],
        info: [
          { required: true, message: "请输入2-10位的项目名称", trigger: "blur" }
        ],
        sysTags: [
          {
            required: true,
            validator: (rule, value, callback) => {
              var arr = this.labelClickArr.concat(this.alreadyArr);
              if (arr != undefined && arr.length > 0) {
                callback();
              } else {
                callback(new Error("请选择系统标签"));
              }
            },
            trigger: "change"
          }
        ]
      },
      listQuery: {
        sort: "+id",
        page: 1
      },
      search: {
        orgId:'',
        sortId: "",
        name: "",
        // sortIdandGoodsId: "",
        goodsName: "",
      },
      pageSize: 10,
      fileList: [],
      picFile: [],
      imgText: [],
      picList: [],
      pictureDetails: [],

      temp: {
        val: true
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑服务项目",
        create: "新增服务项目"
      },
      tableKey: 0,
      city: ["1", "2", "3"]
    };
  },
  created() {
    //所属分类
    // this.handleClick({ name: "all" });
    //系统标签
    serGasqSort()
      .then(data => {
        this.systemOptions = data.data.data;
      })
      .catch(error => {});
    //是否 计量方式 全部 保洁 家修
    // var dict = require("../../../static/dict.json");
    this.measure = dict.meterage;
    this.whole = dict.ser_sort;

    // Whether()
    //   .then(({ data }) => {
    //     this.measure = data.meterage;
    //     this.whole = data.ser_sort;
    //   })
    //   .catch(error => {});

    this.sign; //获取签名
  },
  computed: {
    informationCalculation(){
      let num = this.basicForm.combinationCommodities,
          i,
          numDate,
          bate = 0,
          list;
      if(this.basicForm.combinationCommodities.length > 0){
        let len = this.basicForm.combinationCommodities.length
        for( i = len ; i-- ;){
          numDate = num[i]
          list = numDate.combinationNum * numDate.combinationPrice
          bate += list
        }
        return bate
      }else{
        return '0'
      }
    },
    techUserType(){
      return userType()
    },
    sign: function() {
      return getSign();
    },
    btnShow() {
      return JSON.parse(localStorage.getItem("btn"));
    }
  },
  methods: {
    //组合商品信息--选择商品--保存
    commodityPreservation(){
      let {commodityArr,basicForm} = this,
          i,len = commodityArr.length,arr = [].concat(commodityArr);

      basicForm.combinationCommodities = commodityArr
      this.combinationTypeDialog = false;
    },
    //组合商品信息--选择商品--单选
    selectCommoditySingle(item){
      this.$set(this.commodityArr,0,item)
      console.log(this.radio,"radio-----")
    },
    //组合商品信息--选择商品--删除商品
    commodityDelete(item){
      let { commodityArr,commodityDate,combinationType } = this,
          len = commodityArr.length,
          lon = commodityDate.length,
          i,j;
      //删除商品的数组
      for( i = len ; i-- ;){
        if(commodityArr[i].name == item.name){
          commodityArr.remove(commodityArr[i])
          break;
        }
      }
      if(combinationType == 1){
        //商品列表的checkbox修改
        for( j = lon ; j--;){
          if(commodityDate[j].name == item.name){
            commodityDate[j].check = false
            break;
          }
        }
      }else{
        this.radio = '';
      }
    },
    //组合商品信息--选择商品--复选框
    selectCommodity(item){
      if(item.check){
        this.commodityArr.push(item)
      }else{
        let i , len = this.commodityArr.length;
        for(i = len ; i-- ;){
          if(this.commodityArr[i].id == item.id){
             this.commodityArr.remove(this.commodityArr[i]);
          }
        }
      }
      console.log(this.commodityArr,"this.commodityArr-------")
    },
    ommodityCancel(){
      this.combinationTypeDialog = false;
    },
    choiceCommodity(){
        let i , len = commodityDate.length;
        for( i = len ; i-- ;){
          commodityDate[i].combinationPrice = '0'
          commodityDate[i].combinationNum = '1'
        }
        this.commodityDate = commodityDate
        this.combinationTypeDialog = true;
    },
    deleteInformation(item){
      this.commodityDelete(item)
    },
    //服务分类
    typeAlive(num){
      this.combinationType = num
      this.commodityArr = []
      this.basicForm.combinationCommodities = []
    },
    orgSearch(item){
      this.search.orgId = item
    },
    //删除商品
    deletGood(item) {
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        customClass: "deleteCom",
        type: "warning"
      })
        .then(() => {
          deleteGoodsData({ id: item.id, itemId: item.itemId })
            .then(data => {
              if (data.data.code == 1) {
                this.$message({
                  type: "success",
                  message: data.data.data
                });
                this.handleCurrentChange(this.listQuery.page);
              } else {
              }
            })
            .catch(error => {});
        })
        .catch(() => {
          // return
        });
    },
    //已对接E店
    dockingE(item) {
      if (item.jointEshopFlag == "yes") {
        alreadyButted({ id: item.id })
          .then(data => {
            if (data.data.code == 1) {
              var arr = data.data.data;
              if ("commodityEshops" in arr) {
                for (var i = 0; i < arr.commodityEshops.length; i++) {
                  if ("jointGoodsCode" in arr.commodityEshops[i]) {
                    continue;
                  } else {
                    arr.commodityEshops[i].jointGoodsCode = "";
                  }
                }
              }
              // this.dockingData[0] = arr

              this.$set(this.dockingData, 0, arr);
              this.docking = true;
            } else {
              this.$message({
                type: "warning",
                message: data.data.data
              });
            }
          })
          .catch(error => {
            return false;
          });
      } else {
        this.dockingData = [];
        this.docking = true;
      }
    },
    //对接详情
    buttDetails() {
      this.$router.push({ path: "/service/buttDetails/" });
    },
    returnImg(item) {
      var arr = [];
      for (var i = 0; i < item.length; i++) {
        arr.push(item[i].url);
      }
      return arr;
    },
    imgClick(item) {
      this.picFile = item;
      //当点击保存时，会提示请上传图片，当上传图片后，提示不会消失
      //上传图片成功触发表单验证
      // this.$refs['basic'].validate(valid => {})
    },
    imgTextClick(item) {
      this.imgText = item;
    },
    //对接商品
    handleSendData(row) {
      var obj = { id: row.id };
      sendData(obj)
        .then(data => {
          if (data.data.code == 1) {
            this.$message({
              type: "success",
              message: data.data.data
            });
          }
          if (data.data.code == 3) {
            this.$message({
              type: "warning",
              message: data.data.data
            });
          }
          this.getList(this.pageNumber, this.pageSize);
        })
        .catch(error => {
          return false;
        });
    },
    //添加商品
    addCommodity() {
      this.addCommodityFlag = true;
      this.resetForm("ser");
      this.handleEditFlag = false;
    },
    converFilter(val) {
      var reg = /^\d+(\.\d{1,2})?$/;
      var con = reg.test(val) ? true : false;
      return con;
    },
    filtersName(value) {
      var flag = true;
      var arr = this.basicForm.commoditys;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name == value) {
          flag = false;
          break;
        } else {
          flag = true;
        }
      }
      if (flag) {
        return flag;
      } else {
        return flag;
      }
    },
    //保洁家修切换
    tableProject(obj, id) {
      Taxonomy(obj)
        .then(data => {
          this.sortList = data.data.data;
          if (id) {
            this.basicForm.sortId = id;
          }
        })
        .catch(error => {
          return false;
        });
    },
    //系统标签已添加标签删除
    AlreadyLabel(item) {
      if (this.labelClickArr.indexOf(item) != -1) {
        this.SelectedLabel(item);
      } else {
        this.remove(this.alreadyArr, item);
      }
    },
    //系统标签当前选择标签删除
    SelectedLabel(item) {
      this.remove(this.labelClickArr, item);
    },
    //四级标签点击
    labelClick(item) {
      if (this.labelClickArr.indexOf(item.label) == -1) {
        if (this.labelClickArr.length + this.alreadyArr.length > 2) {
          this.$message({
            message: "最多设置3个系统标签",
            type: "error"
          });
          return false;
        }
        this.labelClickArr.push(item.label);
        // this.$refs['basic'].validate(valid => {})
      } else {
        this.remove(this.labelClickArr, item.label);
      }
    },
    //系统列表一级列表事件
    systemClick(item) {
      this.systemClickId = item.value;
      this.systemOptions2 = item.children;
      this.systemOptions3 = [];
      this.systemOptions4 = [];
    },
    //系统列表二级列表事件
    systemClick2(item) {
      this.systemClick2Id = item.value;
      this.systemOptions3 = item.children;
      this.systemOptions4 = [];
    },
    systemClick3(item) {
      this.systemClick3Id = item.value;
      this.systemOptions4 = item.children;
    },
    //自定义弹框关闭的回调
    closeingLabel() {
      this.labelObj.labelName = "";
    },
    //自定义标签删除
    deleteLabel(index) {
      this.customArr.splice(index, 1);
    },
    //自定义标签
    CustomLabel(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.customArr.length > 2) {
            this.$message({
              message: "最多设置3个自定义标签",
              type: "error"
            });
            return false;
          } else {
            this.customArr.push(this.labelObj.labelName);
            this.labelObj.labelName = "";
          }
          this.addLabel = false;
        } else {
          var errArr = this.$refs[formName]._data.fields;
          var errMes = [];
          for (var i = 0; i < errArr.length; i++) {
            if (errArr[i].validateMessage != "") {
              errMes.push(errArr[i].validateMessage);
            }
          }
          this.$message({
            type: "error",
            message: errMes[0]
          });
          return false;
        }
      });
    },
    //价格没有小数点补填00
    returnFloat(value) {
      var value = Math.round(parseFloat(value) * 100) / 100;
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + "0";
        }
        return value;
      }
    },
    //商品添加/编辑
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = Object.assign({}, this.goods_info);
          obj.startPerNum = this.goods_info.startPerNum || 0;
          obj.minPurchase = this.goods_info.minPurchase;
          obj.cappingPerNum = this.goods_info.cappingPerNum || 0;
          obj.convertHours = this.goods_info.convertHours || 0;
          obj.price = this.returnFloat(this.goods_info.price);
          if (this.handleEditFlag) {
            this.$set(this.basicForm.commoditys, this.handleEditIndex, obj);
            this.resetForm("ser");
            this.handleEditFlag = false;
            this.addCommodityFlag = false;
          } else {
            if ("id" in obj) {
              delete obj.id;
            }
            if ("jointGoodsCode" in obj) {
              delete obj.jointGoodsCode;
            }
            this.basicForm.commoditys.push(obj);
            this.resetForm("ser");
            this.addCommodityFlag = false;
          }
        } else {
          var errArr = this.$refs[formName]._data.fields;
          var errMes = [];
          for (var i = 0; i < errArr.length; i++) {
            if (errArr[i].validateMessage != "") {
              errMes.push(errArr[i].validateMessage);
            }
          }
          this.$message({
            type: "error",
            message: errMes[0]
          });
          return false;
        }
      });
    },
    //表格编辑
    handleEdit(index, val) {
      this.addCommodityFlag = true;
      this.handleEditFlag = true;
      this.handleEditIndex = index;
      this.editName = Object.assign({}, val);
      this.goods_info = Object.assign({}, val);
      this.goods_info.startPerNum = this.goods_info.startPerNum
        ? this.goods_info.startPerNum
        : "";
      this.goods_info.cappingPerNum = this.goods_info.cappingPerNum
        ? this.goods_info.cappingPerNum
        : "";
      this.goods_info.minPurchase = this.goods_info.minPurchase
        ? this.goods_info.minPurchase
        : "";
      //   this.addComm = true;
    },
    //表格删除
    tableHandleDelete(index, item) {
      if (this.basicForm.commoditys.length <= 1) {
        this.$message.error("商品信息不能为空");
        return false;
      } else {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.handleEditFlag = false;
        this.basicForm.commoditys.splice(index, 1);
      }
    },
    houseClick(val) {
      this.basicForm.sortId = "";
      this.tableProject({ majorSort: val });
      this.houseStr = val;
    },
    //数组去重
    remove(arr, val, key) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][key]) {
          if (arr[i].value == val) {
            arr.splice(i, 1);
            break;
          }
        } else {
          if (arr[i] == val) {
            arr.splice(i, 1);
            break;
          }
        }
      }
    },
    serGetList() {
      this.pageNumber = 1;
      this.getList(this.pageNumber);
      this.listQuery.page = 1;
    },
    getList(page, size, getObj) {
      var _page = page || this.pageNumber;
      var _size = size || this.pageSize;
      this.listLoading = true;
      var obj = {};
      if (getObj) {
        obj = getObj;
      } else {
        var obj = {};
        if (this.basicForm.majorSort) {
          obj.majorSort = this.tabs;
        }
        if (this.search.sortId) {
          obj.sortId = this.search.sortId;
        }
        if (this.search.name) {
          obj.name = this.search.name;
        }
        if (this.search.goodsName) {
          obj.goodsName = this.search.goodsName;
        }
        if(this.search.orgId){
          obj.orgId = this.search.orgId
        }
        // if (this.search.sortIdandGoodsId) {
        //   obj.sortIdandGoodsId = this.search.sortIdandGoodsId;
        // }
      }
      getProject(obj, _page, _size)
        .then(res => {
          this.orgStatus = res.data.data.orgStatus;
          this.total = res.data.data.page.count;
          this.pageNumber = res.data.data.page.pageNo;
          this.pageSize = res.data.data.page.pageSize;
          this.listQuery.page = res.data.data.page.pageNo;
          this.listTable = res.data.data.page.list;
          let i,
            len = this.listTable.length;
          if (this.listTable != undefined && this.listTable.length > 0) {
            for (i = 0; i < len; i++) {
              this.listTable[i].num = i + 1;
            }
          }
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    // 搜索
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList(1, this.pageSize);
      this.pageNumber = 1;
      this.listQuery.page = 1;
    },
    handleCurrentChange(val) {
      this.pageNumber = val;

      this.listLoading = true;
      this.getList(this.pageNumber, this.pageSize);
    },
    handleCreateCom(){
      this.$refs['combination'].dialogFormVisibleClick()
    },
    handleCreate(formName,str) {
      this.measure = dict.meterage;    //计量方式 ，防止收通用订单影响
      this.sordFlag = true;
      this.basicForm.sortId = "";
      this.imgNumber = 0;
      this.tableProject({ majorSort: "clean" });
      this.alreadyArr = [];
      this.dialogFormVisible = true;
      this.basicForm.name = "";
      this.dialogStatus = "create";
      this.basicForm.majorSort = "clean";
    },
    //编辑方法
    handleUpdate(row) {
      if(row.goodsType == "combined"){
        // this.listLoading = true;
        this.$refs['combination'].combinationEdit(row.id)
        return;
      }
      this.handleCreateFlag = 'single'
      this.resetForm();
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.basicForm.majorSort = "clean";
      this.picList = [];
      this.editId = row.id;
      this.listLoading = true;
      ServerEdit({ id: this.editId })
        .then(data => {
          if (data.data.code == 1) {
            var dataUpdate = data.data.data;
            this.jointCode = true;
            // if (dataUpdate.commoditys != undefined) {
            let i,
              len = dataUpdate.commoditys.length;
            for (i = 0; i < len; i++) {
              dataUpdate.commoditys[i].price = this.returnFloat(
                dataUpdate.commoditys[i].price
              );
            }
              if(dataUpdate.sortId < 100){
               this.sordFlag = false
               this.measure = { "num": "按时长或数量"}
               this.goods_info.type = "num"
              }else{
                this.sordFlag = true
                this.measure = dict.meterage;
              }
            // }
            this.listLoading = false;
            this.dialogFormVisible = true;
            var arr = data.data.data;
            if (arr.pictures != undefined) {
              this.picFile = arr.pictures;
              //banner传给upload组件
              this.picList = this.picFile;
              // this.imgNumber = arr.pictures.length;
              // for (var i = 0; i < arr.pictures.length; i++) {
              //   var obj = {
              //     url:arr.pictures[i]
              //   }
              //   this.picList.push(arr.pictures[i]);
              // }
            }
            if (arr.pictureDetails != undefined) {
              this.imgText = arr.pictureDetails;
              //详情图片传给upload组件
              this.pictureDetails = this.imgText;
              // for(var i = 0;i<arr.pictureDetails.length; i++){
              // var obj = {
              // 	url:arr.pictureDetails[i]
              // }
              // 	this.pictureDetails.push(arr.pictureDetails[i])
              // }
            } else {
              this.pictureDetails = ["", "", "", ""];
            }
            this.tableProject({ majorSort: arr.majorSort }, arr.sortId);
            this.basicForm = arr;
            this.customArr = arr.customTags || [];
            this.alreadyArr = arr.sysTags || [];
          } else {
            this.listLoading = false;
            return false;
          }
        })
        .catch(error => {
          this.listLoading = false;
          return false;
        });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        customClass: "deleteCom",
        type: "warning"
      })
        .then(() => {
          var obj = {
            id: row.id
          };
          ServerDelete(obj)
            .then(res => {
              if (res.data.code) {
                if (res.data.code == 1) {
                  this.$message({
                    type: "success",
                    message: res.data.data
                  });
                }
                if (res.data.code == 3) {
                  this.$message({
                    type: "warning",
                    message: res.data.data
                  });
                }
                this.handleCurrentChange(this.listQuery.page);
              } else {
                // this.$message({
                //   type: "error",
                //   message: res.data.data
                // });
                // return false
              }
            })
            .catch(error => {
              return false;
            });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    handleClick(tab, event) {
      this.search.sortId = "";
      // this.search.name = "";
      // this.search.goodsName = "";
      // this.search.sortIdandGoodsId = "";
      var size = this.pageSize;
      this.pageNumber = 1;
      Taxonomy({ majorSort: tab.name })
        .then(data => {
          this.searchSortList = data.data.data;
        })
        .catch(error => {});
      this.getList(1, size);
      this.listQuery.page = 1;
    },
    //取消
    cancel(fromName) {
      if (this.dialogStatus == "update") {
        // this.getList(this.pageNumber, this.pageSize);
      }
      this.dialogFormVisible = false;
    },
    //保存
    subForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.basicForm.commoditys.length <= 0) {
            this.$message({
              message: "请添加商品",
              type: "error"
            });
            return false;
          }
          this.btnState = true;
          var arr = [];
          var obj = Object.assign({}, that.basicForm);
          obj.pictures = this.picFile; //服务图片缩略图.
          obj.pictureDetails = this.imgText;
          obj.sysTags = this.labelClickArr; //添加 系统标签
          obj.customTags = this.customArr;
          var loading = this.$loading({
            lock: true,
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
            target: document.querySelector(".tabBox ")
          });
          //==update 是编辑   create是添加
          if (this.dialogStatus == "update") {
            that.basicForm.sysTags = this.alreadyArr.concat(this.labelClickArr);
            that.basicForm.customTags = this.customArr;
            that.basicForm.pictures = this.picFile;
            that.basicForm.pictureDetails = this.imgText;
            serverEditPre(that.basicForm)
              .then(data => {
                this.btnState = false;
                if (data.data.code) {
                  if (data.data.code == 3) {
                    this.$message({
                      message: data.data.data,
                      type: "warning"
                    });
                  }
                  if (data.data.code == 1) {
                    this.$message({
                      message: data.data.data,
                      type: "success"
                    });
                  }
                  loading.close();
                  this.resetForm();
                  this.dialogFormVisible = false;
                  this.getList(this.pageNumber, this.pageSize);
                  this.picFile = [];
                  this.pictureDetails = [];
                  this.picList = [];
                  this.imgNumber = 0;
                } else {
                  loading.close();
                  this.btnState = false;
                  this.imgNumber = 0;
                }
              })
              .catch(error => {
                loading.close();
                this.btnState = false;
                this.imgNumber = 0;
              });
          } else {
            if ("id" in obj) {
              delete obj.id;
            }
            if ("pictureDetail" in obj) {
              delete obj.pictureDetail;
            }
            // if("pictureDetails" in obj){
            //   delete obj.pictureDetails
            // }
            ServerAdd(obj)
              .then(data => {
                this.btnState = false;
                if (data.data.code) {
                  if (data.data.code == 1) {
                    this.$message({
                      message: data.data.data,
                      type: "success"
                    });
                  }
                  if (data.data.code == 3) {
                    this.$message({
                      message: data.data.data,
                      type: "warning"
                    });
                  }
                  //loading取消
                  loading.close();
                  this.comList()
                } else {
                  loading.close();
                  this.btnState = false;
                }
              })
              .catch(error => {
                loading.close();
                this.btnState = false;
              });
          }
        } else {
          var errArr = this.$refs[formName]._data.fields;
          var errMes = [];
          for (var i = 0; i < errArr.length; i++) {
            if (errArr[i].validateMessage != "") {
              errMes.push(errArr[i].validateMessage);
            }
          }
          this.$message({
            type: "error",
            message: errMes[0]
          });
          return false;
        }
      });
    },
    //组合商品新增成功刷新列表
    comList(){
      this.cancel("basic");
      this.basicForm.majorSort = "all";
      this.search.sortId = "";
      this.search.name = "";
      this.search.goodsName = "";
      this.$refs['orgSearch'].orgEmpty()
      this.orgSearch()
      this.tabs = "all";
      this.listQuery.page = 1;
      this.getList(1, this.pageSize);
      this.picFile = [];
      this.pictureDetails = [];
    },
    resetForm(ser) {
      if (this.$refs["goods_info"]) {
        this.$refs["goods_info"].resetFields();
      }
      if (ser == "ser") {
        this.addCommodityFlag = true;
      } else {
        this.addCommodityFlag = false;
        // this.addComm = false
      }
      this.goods_info.name = "";
      this.goods_info.unit = "";
      this.goods_info.type = "";
      this.goods_info.price = "";
      this.goods_info.convertHours = "";
      this.goods_info.minPurchase = "";
      this.goods_info.startPerNum = "";
      this.goods_info.cappingPerNum = "";
    },
    //弹框关闭回调
    emptyingForm() {
      if (this.$refs["goods_info"]) {
        this.$refs["goods_info"].resetFields();
      }
      this.$refs["basic"].resetFields();
      this.jointCode = false;
      this.imgNumber = 0;
      this.basicForm.commoditys = [];
      //清空banner和图文详情图
      this.picFile = ["", "", "", ""]; //清空图片
      this.pictureDetails = ["", "", "", ""];
      this.imgText = ["", "", "", ""];
      this.picList = ["", "", "", ""]; //清空图片
      this.alreadyArr = [];
      this.labelClickArr = [];
      this.customArr = [];
      this.systemOptions2 = [];
      this.systemOptions3 = [];
      this.systemOptions4 = [];
    },
    resetEmpty(txt) {
      if (txt == "ser") {
        this.$refs["goods_info"].resetFields();
        this.goods_info.minPurchase = "";
        this.goods_info.startPerNum = "";
        this.goods_info.cappingPerNum = "";
      } else {
        this.$refs["goods_info"].resetFields();
        this.$refs["basic"].resetFields();
        this.goods_info.minPurchase = "";
        this.basicForm.sortNum = ""; //排序号好清空
        this.basicForm.cityCodes = []; //定向城市
        this.goods_info.minPurchase = ""; //起够数量
        this.basicForm.commoditys = []; //商品信息表格
        this.picFile = []; //清空图片
        this.pictureDetails = [];
        this.picList = []; //清空图片
        this.dialogFormVisible = false;
      }
    }
  },
  components: {
    imgService,
    addCommodity,
    orgSearch,
    combination
  },
  mounted(){

    let list = async ()=>{
      try{
        let _list = await this.$refs['orgSearch'].listDataAll()
        this.orgList = _list
        this.handleClick({ name: "all" });
      }
      catch(error){
      }
    }

    list()
  },
  filters:{
    rmb(value) {
      return '¥'+value
    }
  }
};
</script>
<style>
  @import './prokect.css';
</style>