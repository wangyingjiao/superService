<template>
<div>
  <div class="filter-container tabStyle">
    <el-tabs v-model="tabs" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="保洁" name="clean"></el-tab-pane>
      <el-tab-pane label="家修" name="repair"></el-tab-pane>
    </el-tabs>
      <el-select clearable class="search" filterable  v-model="search.sortId" placeholder="所属分类">
        <el-option v-for="(item,index) in searchSortList" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>

      <el-input class="search" placeholder="请输入搜索的项目名称" v-model="search.name">
      </el-input> 
	  <el-input class="search" placeholder="请输入搜索的商品名称" v-model="search.goodsName">
      </el-input> 
	  <el-input class="search" placeholder="请输入搜索的对接编码" v-model="search.sortIdandGoodsId">
      </el-input> 
      <button class="button-large el-icon-search btn_search btn-color" @click="serGetList"> 搜索</button>
  </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_pad btn-color" v-if="btnShow.indexOf('project_insert')>-1" style="width:80px" @click="handleCreate('basic')">新增</button>
    <button class="button-small btn_pad btn-color" v-if="btnShow.indexOf('project_insert')>-1" style="width:80px" @click="buttDetails">对接详情</button>

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
      <el-table-column align="center" label="编号" width="100">
        <template scope="scope">
          {{scope.row.num+(pageNumber-1)*pageSize}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="图片">
        <template scope="scope" >
          <span v-if="scope.row.pictures != undefined"><img :src="imgSrc + scope.row.pictures[0]+picWidth60" class="imgList"/></span>
        </template>
      </el-table-column>

      <el-table-column  label="项目名称" align="center" prop="name">
      </el-table-column>

      <el-table-column  label="所属分类" align="center" prop="sortName">
      </el-table-column>

      <el-table-column  label="商品名称" align="center">
        <template scope="scope">
          <div 
            class="branch"  
            v-for="(item,index) in scope.row.commoditys" 
            :key="index">
            <el-tooltip placement="left" :disabled="item.name.length <= 10" :content="item.name">
                <span class="proName">{{item.name}}</span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="价格/单位" align="center">
        <template scope="scope">
          <div
          class="branch"  
            v-for="(item,index) in scope.row.commoditys" 
            :key="index"
          >
          <el-tooltip placement="left" :disabled="(item.unit+item.price).length <= 10" :content="item.price+'元 / '+item.unit">
            <span class="proName">{{item.price+"元"}} / {{item.unit}}</span>
          </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <!-- <el-table-column label="对接编码" align="center">
        <template scope="scope">
          <div class="branch" v-for="(item,index) in scope.row.commoditys" :key="index">
            <el-tooltip placement="left" :disabled="(scope.row.sortId+item.id).length <= 10" :content="scope.row.sortId+'_'+item.id">
              <span class="proName">{{scope.row.sortId+"_"+item.id}}</span>
            </el-tooltip>
          </div>
        </template>  
      </el-table-column>

      <el-table-column  label="对接商品ID" align="center" prop="jointGoodsCode">
        <template scope="scope">
          <div class="branch" v-for="(item,index) in scope.row.commoditys" :key="index">
            <el-tooltip placement="left" :content="item.jointGoodsCode">
                <span class="proName">{{item.jointGoodsCode}}</span>
             </el-tooltip>
          </div>
        </template>
      </el-table-column> -->
      <!-- <el-table-column align="center" label="" min-width="200px">
          <template scope="scope">
            <div
              class="branch"  
              v-for="(item,index) in scope.row.commoditys" 
              :key="index">
                <el-button class="el-icon-edit ceshi3" v-if="btnShow.indexOf('project_update')>-1" @click="handleUpdate(scope.row)"></el-button>
                <el-button class="el-icon-delete ceshi3" v-if="btnShow.indexOf('project_delete')>-1" @click="handleDelete(scope.row)"></el-button>
            </div>
          </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="200px" class-name="operationTab">
        <template scope="scope">
            <el-button class="el-icon-edit ceshi3" v-if="btnShow.indexOf('project_update')>-1" @click="handleUpdate(scope.row)"></el-button>
            <el-button class="el-icon-delete ceshi3" v-if="btnShow.indexOf('project_delete')>-1" @click="handleDelete(scope.row)"></el-button>
            <el-tooltip class="item" effect="dark" content="对接商品" placement="left"  v-if="scope.row.flag!='yes'">
              <el-button class="ceshi3 iconfont senddata" @click="handleSendData(scope.row)">&#xe641;</el-button>
            </el-tooltip>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center">
        <!-- 商品 -->
        <el-table-column align="center" label="" min-width="250">
             <template scope="scope">
            <div
              class="branch"  
              v-for="(item,index) in scope.row.commoditys" 
              :key="index">
              <span class="commEd">删除商品</span>
              <span @click="docking=true" class="commEd">已对接E店</span>
                <!-- <el-button class="el-icon-edit ceshi3" v-if="btnShow.indexOf('project_update')>-1" @click="handleUpdate(scope.row)"></el-button>
                <el-button class="el-icon-delete ceshi3" v-if="btnShow.indexOf('project_delete')>-1" @click="handleDelete(scope.row)"></el-button> -->
            </div>
          </template>
        </el-table-column>
        <!-- 项目 -->
        <el-table-column align="center" label="" min-width="200">
          <template scope="scope">
            <span class="probtn" v-if="btnShow.indexOf('project_update')>-1" @click="handleUpdate(scope.row)">编辑</span>
            <span class="probtn" v-if="btnShow.indexOf('project_delete')>-1" @click="handleDelete(scope.row)">删除项目</span>
            <!-- <el-button class="el-icon-edit ceshi3" v-if="btnShow.indexOf('project_update')>-1" @click="handleUpdate(scope.row)"></el-button>
            <el-button class="el-icon-delete ceshi3" v-if="btnShow.indexOf('project_delete')>-1" @click="handleDelete(scope.row)"></el-button> -->
            <!-- <el-tooltip class="item" effect="dark" content="对接商品" placement="left"  v-if="scope.row.flag!='yes'">
              <el-button class="ceshi3 iconfont senddata" @click="handleSendData(scope.row)">&#xe641;</el-button>
            </el-tooltip> -->
        </template>
        </el-table-column>
      </el-table-column>

    </el-table>

    <div v-if="!listLoading" class="pagination-container clearfix">
       <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
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
                </el-form-item>
				<div class="el-upload__tip prompt-img">*为了保证浏览效果，请上传大于750px*750px的正方形图片，且不超过4张</div>

				<el-form-item label="图文详情：">
					<div class="upload-demo upload_box form_item">
						<imgService @imgclick = "imgTextClick" :piclist = "pictureDetails" :type="'picture'" :min='0' :max='8'></imgService>
					</div>
                   
                </el-form-item>
				 <div class="el-upload__tip prompt-img">*最多4张; 为了保证浏览效果,请上传大于750px*10px且小于750px*6000px的图片</div>

                <el-form-item label="系统标签：" prop="sysTags">
                   <div class="custom form_item">
                        <span class="tech-order-btn" @click="SystemLabel = true"> &#10010; 请选择</span>
                    </div>
                    <div class="labelList form_item" v-if="(labelClickArr!=undefined && labelClickArr.length>0) || (alreadyArr!=undefined && alreadyArr.length>0)">
                        <div v-for="(item,index) in labelClickArr.concat(alreadyArr)" :key="index" class="selfTabsaa system-label" style="border-radius:20px;">
                          <el-tooltip placement="left" :disabled="item.length <=5" :content="item">
                              <div>
                                  <span class="selfTabContent" style="border:none !important;border-radius:0px;margin-top:5px;margin-right:0px">{{item}}</span>
                                  <span @click="AlreadyLabel(item)" class="el-icon-close systemClose selfCloseSty" style="border:none;margin-top:5px;margin-right:0px"></span>
                              </div>
                          </el-tooltip>
                        </div>                        
                    </div>
                    
                </el-form-item>
				<div class="el-upload__tip prompt-img">* 最多设置3个系统标签</div>

                <el-form-item label="自定义标签：" class="labelDav">
                    <div class="custom">
                        <span class="tech-order-btn" @click="addLabel = true"> &#10010; 添加</span>
                    </div>
                    <div class="labelList" v-show="customArr != undefined && customArr.length>0">
                        <span v-for="(item,index) in customArr" :key="index">{{item}}   
                          <i @click="deleteLabel(index)" class="el-icon-close systemClose"></i>
                        </span>
                    </div>
					<div style="margin-top:20px" class="el-upload__tip">* 最多设置3个自定义标签</div>
                </el-form-item> 
            
              </el-form>
              <h3 class="tit"> 商品信息</h3><hr/>
    <!-- 商品信息表格 -->
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
                      <span>{{scope.row.convertHours+'小时 / '+scope.row.unit}}</span>
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
                      <span class="tableSer" v-if="!scope.row.id" style="color:red"  @click="tableHandleDelete(scope.$index, scope.row)">删除</span>
                    </template>
                  </el-table-column>
                </el-table>
          <!-- 商品信息表格 。。。。。。。。完成 -->
              <div class="add_Btn" @click="addCommodity">
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
              <div class="already">
                  <div class="selfTitle1">当前选择标签：</div>
                  <div v-for="(item,index) in labelClickArr" :key="index" class="selfTabsaa">
                    <el-tooltip placement="left" :disabled="item.length <= 4" :content="item">
                        <div>
                            <span class="selfTabContent" style="" style="border:none;">{{item}}</span>
                            <span @click="SelectedLabel(item)" class="el-icon-close systemClose selfCloseSty" style="border:none;"></span>
                        </div>
                    </el-tooltip>
                  </div>
                </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" v-show="alreadyArr.length>0">
            <div class="already">
                  <div class="selfTitle1">已添加标签：</div>
                  <div v-for="(item,index) in alreadyArr" :key="index" class="selfTabsaa">
                    <el-tooltip placement="left" :disabled="item.length <= 4" :content="item">
                        <div>
                          <span class="selfTabContent" style="" style="border:none;">{{item}}</span>
                          <span @click="AlreadyLabel(item)" class="el-icon-close systemClose selfCloseSty" style="border:none;margin-top:2px;"></span>
                        </div>
                    </el-tooltip>
                  </div>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
              <div style="overflow:hidden">
                  <ul>
                      <li v-for="item in systemOptions" :key="item.value" @click="systemClick(item)" :class="{'activeSystem_1':item.value==systemClickId}">
                        <span class="projectLabel">{{item.label}}</span>
                        <i class="el-icon-arrow-right"></i>
                      </li>
                  </ul>
                  <ul v-show="systemOptions2 !== undefined && systemOptions2.length>0">
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
                            <!-- <span>{{item.label}}</span> -->
                            <input type="button"
                                    class="cursor" 
                                    style="width:85px;height:30px;line-height:30px;overflow:hidden;" 
                                   :value="item.label" @click="labelClick(item)"
                                    :class="{'techTime-green':labelClickArr.indexOf(item.label)!=-1 || JSON.stringify(alreadyArr).indexOf(JSON.stringify(item.label))!=-1}"
                                    :disabled="JSON.stringify(alreadyArr).indexOf(JSON.stringify(item.label))!=-1">
                        </el-tooltip>
                      </div>        
                    <!--  -->
                  </div>
              </div>
          </el-col>
        </el-row>
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
                <el-form-item label="折算时长:" prop="convertHours" class="doubtf">
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
             
                <el-form-item label="起步人数:" class="seize" prop="startPerNum">
                  <el-input
                    placeholder="请输入起步人数(默认为1)"
                   
                    v-model="goods_info.startPerNum"></el-input>
                </el-form-item>

                <el-form-item label="封顶人数:" class="seize" prop="cappingPerNum">
                  <el-input
                    placeholder="请输入封顶人数"
                    
                    v-model="goods_info.cappingPerNum"></el-input>
                </el-form-item>

                <el-form-item label="起购数量:" class="seize" prop="minPurchase">
                  <el-input
                    placeholder="请输入起购数量（默认为1）"
                    
                    v-model="goods_info.minPurchase"></el-input>
                </el-form-item>
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
      <el-dialog title="商品对接E店详情" :close-on-click-modal="false" :visible.sync="docking" class="dockingDialog" @close="closeingLabel">
        <el-table :data="dockingData" stripe border style="width: 100%">
          <el-table-column prop="date" align="center" label="商品名称"></el-table-column>
          <el-table-column prop="name" align="center" label="对接编码"></el-table-column>
          <el-table-column prop="address" align="center" label="E店名称">
            <template scope="scope">
              <div class="branch" v-for="(item,index) in scope.row.address" :key="index">
                  <el-tooltip placement="left" :disabled="item.length<=10" :content="item">
                      <span>{{item}}</span>
                   </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="id" align="center" label="对接商品ID">
            <template scope="scope">
              <div class="branch" v-for="(item,index) in scope.row.id" :key="index">
                <el-tooltip placement="left" :disabled="item.length<=10" :content="item">
                  <span>{{item}}</span>
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
import Cookies from "js-cookie";
import { getSign } from "@/api/sign";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
import {
  Taxonomy,
  Orienteering,
  ServerAdd,
  ServerDelete,
  ServerEdit,
  serverEditPre,
  sortList,
  serGasqSort,
  sendData,
  deleteGoodsData
} from "@/api/serviceManage";
import imgService from "../../components/upload/upload.vue";
import addCommodity from "./addCommodity.vue";
// import imgService from './returnvisit.vue'
// var without = require('lodash.without')
//挂载数据
var arr = [];

var dockingData=[{
          date: '2016-05-02',
          name: '王小虎',
          address:['上海市普陀区金沙江路 1518 弄','上海市普陀区金沙江路 1518 弄','上海市普陀区金沙江路 1518 弄'],
          id:['123123123123123','123123123123123','123123123123123']
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address:['上海市普陀区金沙江路 1518 弄','上海市普陀区金沙江路 1518 弄','上海市普陀区金沙江路 1518 弄'],
          id:['123123123123123','123123123123123','123123123123123']
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address:['上海市普陀区金沙江路 1518 弄','上海市普陀区金沙江路 1518 弄','上海市普陀区金沙江路 1518 弄'],
          id:['123123123123123','123123123123123','123123123123123']
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address:['上海市普陀区金沙江路 1518 弄','上海市普陀区金沙江路 1518 弄','上海市普陀区金沙江路 1518 弄'],
          id:['123123123123123','123123123123123','123123123123123']
        }]



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
      pageNumber: 1,
      addCommodityFlag: false,
      editName: {},
      customArr: [],
      jointCode: false,
      dockingData:dockingData,
      alreadyArr: [],
      labelClickArr: [],
      systemClickId: null,
      systemClick2Id: null,
      systemClick3Id: null,
      docking:false,
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
        customTags: []
      },
      basicRles: {
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
        sortId: "",
        name: "",
        sortIdandGoodsId: "",
        goodsName: ""
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
    this.handleClick({ name: "all" });
    //系统标签
    serGasqSort()
      .then(data => {
        this.systemOptions = data.data.data;
      })
      .catch(error => {});
    //是否 计量方式 全部 保洁 家修
    var dict = require("../../../static/dict.json");
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
    sign: function() {
      return getSign();
    },
    btnShow() {
      return JSON.parse(localStorage.getItem("btn"));
    }
  },
  methods: {
    //对接详情
    buttDetails(){
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
    //商品添加/编辑
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = Object.assign({}, this.goods_info);
          obj.startPerNum = this.goods_info.startPerNum;
          obj.minPurchase = this.goods_info.minPurchase;
          obj.cappingPerNum = this.goods_info.cappingPerNum;
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
        if (item.id) {
          deleteGoodsData({ id: item.id })
            .then(data => {
              if (data.data.code == 1) {
                this.$message({
                  message: data.data.data,
                  type: "success"
                });
                this.handleEditFlag = false;
                this.basicForm.commoditys.splice(index, 1);
              } else {
              }
            })
            .catch(error => {
              this.$message({
                message: data.data.data,
                type: "error"
              });
              return false;
            });
        } else {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.handleEditFlag = false;
          this.basicForm.commoditys.splice(index, 1);
        }
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
        if (this.search.sortIdandGoodsId) {
          obj.sortIdandGoodsId = this.search.sortIdandGoodsId;
        }
      }
      getProject(obj, _page, _size)
        .then(res => {
          this.total = res.data.data.count;
          this.pageNumber = res.data.data.pageNo;
          this.pageSize = res.data.data.pageSize;
          this.listQuery.page = res.data.data.pageNo;
          this.listTable = res.data.data.list;
          if (this.listTable != undefined && this.listTable.length > 0) {
            for (var i = 0; i < this.listTable.length; i++) {
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
      if (this.search.sortIdandGoodsId) {
        obj.sortIdandGoodsId = this.search.sortIdandGoodsId;
      }

      this.listLoading = true;
      this.getList(this.pageNumber, this.pageSize, obj);
    },
    handleCreate(formName) {
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
            if (dataUpdate.commoditys != undefined) {
              for (var i = 0; i < dataUpdate.commoditys.length; i++) {
                if (dataUpdate.commoditys[i].jointGoodsCode) {
                  this.jointCode = true;
                  break;
                } else {
                  this.jointCode = false;
                }
              }
            }
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
      this.search.name = "";
      this.search.goodsName = "";
      this.search.sortIdandGoodsId = "";
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
        this.getList(this.pageNumber, this.pageSize);
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
                  this.cancel("basic");
                  this.basicForm.majorSort = "all";
                  this.search.sortId = "";
                  this.search.name = "";
                  this.search.goodsName = "";
                  this.search.sortIdandGoodsId = "";
                  this.tabs = "all";
                  this.listQuery.page = 1;
                  this.getList(1, this.pageSize);
                  this.picFile = [];
                  this.pictureDetails = [];
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
    addCommodity
  }
};
</script>
<style>
.selfTitle1 {
  display: inline-block;
  float: left;
}
.selfTabsaa {
  display: inline-block;
  margin-top: 10px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #4c70e8;
  margin-left: 10px;
  cursor: pointer;
}
.selfTabsaa .el-tooltip {
  height: 30px;
  padding: 0 5px;
  /* padding:0 5px; */
}
.system-label {
  border: 1px solid #bfcbd9;
}
.selfTabContent {
  float: left;
  width: 70px;
  display: inline-block;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
}
.selfCloseSty {
  border: none;
}
.el-radio-group {
  width: 100%;
}
.btn_right {
  float: right;
  width: 100px;
}
.btn_left {
  width: 100px;
}
.checkRightBox {
  border: solid 1px #dcdcdc;
  padding: 10px;
}
.checkAllBox {
  padding: 10px 0;
}
.checkBox1 {
  padding: 10px 0;
  border-top: solid 1px #dcdcdc;
  border-bottom: solid 1px #dcdcdc;
}
.checkBox2 {
  padding: 10px 0;
}
.checkBox3 {
  padding: 10px 0;
  border-top: solid 1px #dcdcdc;
}
.bgWhite {
  background-color: #ffffff;
  padding: 20px 20px 20px 20px;
}
.btn_right {
  float: right;
}
.goods_info {
  font-size: 12px;
}
.projectTableStyle th > .cell {
  text-align: -webkit-center;
}
.projectTabel .el-table .cell,
.projectTabel .el-table th > div {
  padding-left: 10px;
  padding-right: 10px;
}
.projectTabel .el-table__row .operationTab {
  text-align: left;
}
.projectTabel .operationTab .cell {
  width: 166px;
  margin: 0 auto;
}
.upload_box {
  /* text-align: center; */
  box-sizing: border-box;
  /* padding: 10px; */
  border: 1px #ccc dashed;
}
.upload_box .el-upload .el-button {
  background-color: #4c70e8;
  border-color: #4c70e8;
  border-radius: 0px;
}
.font_small {
  color: #cccccc;
  font-size: 12px;
  line-height: 20px;
  width: 400px;
}
.content-rowspan div {
  line-height: 30px;
  border-bottom: 1px solid #dfe6ec;
}
.content-rowspan div:last-child {
  border-bottom: 0;
}
.tabBox .codeClean .el-radio-button__inner {
  background-color: #eef1f6 !important;
  color: #bbb !important;
}
.add_Btn {
  width: 100px;
  height: 30px;
  margin: 20px 0 10px 0;
  color: #ffffff;
  line-height: 30px;
  background-color: #4c70e8;
  cursor: pointer;
}
.btn_Span1 {
  font-size: 20px;
  line-height: 30px;
  width: 30px;
  height: 30px;
  background-color: #3a5fcd;
  font-weight: bolder;
  text-align: center;
}

.doubt {
  position: absolute;
  right: -30px;
  top: 0;
  font-size: 25px;
  vertical-align: middle;
  cursor: pointer;
  color: #bfcbd9;
}
.btn_Span2 {
  width: 70px;
  height: 30px;
  text-align: center;
}
.branch,
.branchSpan {
  padding: 0 10px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
}
.branch {
  border-bottom: 1px solid #dfe6ec;
}
.el-table__row .cell .branch:last-child {
  border-bottom: none;
}
.branch:nth-of-type(even) {
  /* background-color: #f5f5f5; */
}
.projectTabel .el-table__row .cell,.dockingDialog .el-table__row .cell {
  padding: 0;
  /* display: flex; */
}
.dockingDialog .el-table__row .cell div{
   overflow: hidden;
   white-space: nowrap;
   text-overflow: inherit;
}

.tabBox {
  overflow: hidden;
  width: 100%;
  border: 1px #eee solid;
  background-color: #f9f9f9;
}
.tabLeft {
  width: 15%;
}
.tabLeft .tabBtn {
  display: block;
  width: 100%;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.tabBtnclick {
  background-color: #6d8dfc;
  color: #ffffff;
}
.tabLeft .el-radio-button__inner {
  text-align: left;
  padding-left: 25%;
  background: #f9f9f9;
}

.systemClose {
  transform: scale(0.7);
  opacity: 0.75;
  cursor: pointer;
  float: right;
  line-height: 30px;
  display: inline-block;
  height: 30px;
}
/* #diatable .el-upload__tip{
	margin:0 0 10px 90px;
} */
/* .el-upload__tip{
	margin: 10px;
	margin-left: 0;
} */
.prompt-img {
  margin: 0 0 10px 90px;
}

.bgWhite .el-switch.is-checked .el-switch__core {
  background-color: #4c70e8;
  border: 1px solid #4c70e8;
}

.tabRight {
  width: 85%;
  height: 100%;
  border-left: 1px #eee solid;
  background-color: #ffffff;
  padding: 10px 25px 60px 25px;
  /* margin-right: 10px; */
}
.el-radio-button {
  width: 100%;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  width: 100%;
  color: #fff;
  background-color: #4c70e8;
  border-color: #4c70e8;
  box-shadow: -1px 0 0 0 #4c70e8;
}
.el-upload .el-button span {
  color: #ffffff;
}

.el-upload .el-upload-list li .el-upload-list__item-name {
  display: none;
}
.senddata {
  margin-left: 10px;
}
.tit {
  font-size: 14px;
  font-weight: bold;
  padding: 10px 0 8px 0;
}
.upload-demo .el-upload--picture-card {
  width: 112px;
  height: 112px;
  line-height: 112px;
}
.upload-back {
  display: inline-block;
  background: url("../../../static/icon/sctp.png") no-repeat;
  background-size: 100%;
  background-position: 33.33333% 33.33333%;
  width: 50px;
  height: 50px;
}
/* .bgWhite .el-popover{
  text-align: center;
} */
.question {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: inline-block;
  background: url("../../../static/icon/问号.png") no-repeat;
  background-size: 100%;
  vertical-align: middle;
  cursor: pointer;
}
.upload-back::before {
  content: "点击上传";
  font-size: 12px;
  line-height: 110px;
}
.table-pro,
.table-pro tr th,
.table-pro tr td {
  border: 1px solid #dececb;
}
.table-pro {
  width: 350px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
  padding: 2px;
}
.table-pro tr td:nth-child(1),
.table-pro tr th:nth-child(1) {
  background: #ccc;
  padding: 0 10px;
}
.table-input {
  border: none;
  outline: none;
  text-align: center;
}
.basic {
  padding: 0 20px;
}
.send > label::before {
  content: "*";
  margin-right: 4px;
  color: red;
}
.seize > label::before {
  content: "";
  margin-right: 8px;
  color: red;
}
.upload-demo .el-upload-list__item-thumbnail {
  width: 100px;
  height: 100px;
}
.upload-demo .el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
.tech-center {
  margin: 0px 20px 10px 0;
  display: flex;
  justify-content: center;
}
.tabStyle .search {
  /* width: 15%; */
  margin-right: 0;
}
.tabStyle .el-select {
  margin-left: 1%;
}
.tabStyle .button-large {
  margin-left: 0;
}
.tabStyle .el-input {
  margin-left: 1%;
}
.selfCheckBoxsday {
  width: 30px;
  height: 24px;
  line-height: 24px;
  /* border: 1px solid #bfcbd9; */
  display: inline-block;
  /* text-align: center; */
  position: relative;
  /* margin-left: 20px; */
  font-size: 12px;
  cursor: pointer;
}
.proName {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.cityClass {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  overflow: hidden;
}
.cityClass > div:nth-child(1),
.cityClass > div:nth-child(5n) {
}
.main-container .techTime-green {
  background-size: 15px 15px;
  border: solid 1px #4c70e8;
  background: url("../../../static/icon/Selected.png") no-repeat;
  background-size: 20px 20px;
  background-position: bottom right;
}

hr {
  border: 0.5px solid #eee;
}
/* .image-text .el-dialog__body,
.image-text .el-dialog__header {
  padding: 0;
}
.image-text .el-dialog__header{
  height: 0;
} */
.bgWhite .el-dialog__footer {
  margin-top: 0;
}
.image-text-header {
  overflow: hidden;
  width: 100%;
  /* height: 44px; */
  background: #f3f7f9;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  font-weight: bolder;
  line-height: 44px;
  padding: 0 20px;
}
.image-text-header p:nth-child(1) {
  float: left;
  font-size: 14px;
  font-weight: 700;
  color: #1f2d3d;
}
/* .image-text p:nth-child(2) {
  float: right;
}
.image-text p:nth-child(2) span {
  margin: 0 5px;
} */
.image-text-body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
.image-text-body .img-upload .avatar-uploader-icon {
  position: absolute;
  top: 0;
  right: 10px;
  line-height: 45px;
  z-index: 100;
}
.image-border {
  width: 100%;
  /* background: rgb(182, 180, 180); */
  box-sizing: border-box;
  /* padding: 100px 20px; */
  margin: 10px 0;
}

/* .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
} */
/* .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
} */
/* .avatar {
  width: 178px;
  height: 178px;
  display: block;
} */
.sortInput {
  width: 40px;
  text-align: center;
  /* outline:none;  */
  border: none;
  /* background: red */
}
/* .sortInput:nth-child(2n){
  background: #FAFAFA
} */
.el-table__body tr:nth-child(2n) .sortInput {
  background: #fafafa;
}
.imgText .el-upload-list__item {
  height: 100%;
}
.imgText .el-upload-list__item-name {
  display: none;
}
.imgText .el-upload-list__item-thumbnail {
  height: 100%;
  width: 100%;
}
.imgList {
  /* width: 60px;
  height: 60px; */
  margin-top: 5px;
}
.upload-demo .el-upload-list__item-preview {
  display: none !important;
}
.el-icon-plus {
  text-align: center;
  font-size: 20px;
}
.el-upload--picture {
  width: 100%;
}
.el-upload-list {
  width: 100%;
  height: 100%;
}
.imgText .el-icon-plus {
  position: absolute;
  top: 0;
  line-height: 44px;
  right: 15px;
  z-index: 1000;
}
.tableSer {
  padding: 5px 10px;
  cursor: pointer;
  color: #6d8dfc;
}
.tableSer:nth-of-type(3) {
  color: red;
}
.details {
  font-size: 18px;
  font-weight: 900;
  text-align: center;
  line-height: 80px;
  padding-top: 30px;
}
.tabRight .bottimPro .el-form-item__content {
  /* margin-left: 0; */
  width: 100%;
  display: flex;
  justify-content: center;
}
.tabRight .bottimPro .el-form-item__content input:nth-child(2) {
  margin-left: 30px;
}
.custom {
  width: 100%;
  height: 36px;
  border: 1px solid #bfcbd9;
}
.custom span {
  line-height: 36px;
}
.tech-order-btn {
  background: #fff;
  color: #4c70e8;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 10px;
}
.labelName .el-dialog--small {
  width: 30%;
}
.labelName .el-dialog__header,
.systemLabel .el-dialog__header {
  padding: 0 0 0 20px;
  height: 45px;
  background: #f3f7f9;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  line-height: 45px;
}
.labelName .el-form-item__label {
  width: 80px;
  text-align: center;
}
.labelName .el-form-item__content {
  margin-left: 90px;
}
.labelName .dialog-footer,
.systemLabel .dialog-footer,.dockingDialog .dialog-footer{
  display: flex;
  justify-content: center;
}
.labelName .dialog-footer input:nth-child(2),
.systemLabel .dialog-footer input:nth-child(2) {
  margin-left: 20px;
}
.labelName .el-dialog__body {
  padding: 30px 20px 10px 20px;
}
.systemLabel .el-dialog__body {
  padding-top: 0;
}
.labelList {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #bfcbd9;
  border-top: 0;
}
.labelList span {
  display: inline-block;
  border: 1px solid #bfcbd9;
  /* padding: 0 10px; */
  border-radius: 20px;
  line-height: 20px;
  margin-right: 10px;
}
.labelDav .labelList span {
  padding: 0 5px;
  line-height: 30px;
}
.labelList span i {
  font-size: 12px;
  margin-left: 5px;
}
.systemLabel ul {
  width: 23%;
  float: left;
  height: 300px;
  overflow-y: auto;
  border: 1px solid #e8e8e8;
}
.systemLabel ul:nth-of-type(2) {
  border-left: 0;
}
.top-start {
  min-width: 100px;
  text-align: center;
}
.systemLabel ul:nth-of-type(3) {
  border-left: 0;
}
.systemLabel ul li {
  width: 100%;
  padding: 0 5px;
  height: 29px;
  border-bottom: 1px dashed #e8e8e8;
  line-height: 29px;
  list-style: none;
}
.systemLabel ul li i {
  float: right;
  line-height: 29px;
  width: 10%;
  color: #bebebe;
}
.labelSystem {
  overflow-y: auto;
  float: left;
  border: 1px solid #e8e8e8;
  width: 31%;
  height: 300px;
  border-left: 0;
}
.image-text-body .img-content {
  width: 100%;
}
.image-text-body .image-border .img-list .img-content {
  margin-top: 20px;
}
.image-text-body .img-list .img-content .layer {
  height: 50px !important;
  line-height: 50px !important;
  margin: 5px auto;
  width: 600px;
  border-radius: 2px;
}
.labelSystem input {
  background: #fff;
  padding: 0 10px 0 5px;
  float: left;
  display: block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #4c70e8;
  margin: 5px;
  /* width: 95%; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.activeSystem_1,
.activeSystem_2,
.activeSystem_3 {
  background: #e0f1fb;
}
.already {
  /* height: 50px; */
  line-height: 50px;
  word-break: keep-all;
}
.alreadyUl {
  width: 100%;
}
.already span {
  border: 1px solid #e8e8e8;
  /* line-height:20px; */
  /* padding: 5px;
  margin-right: 5px; */
}
.already span i {
  font-weight: bolder;
  margin-left: 5px;
}
.cursor {
  cursor: pointer;
  word-wrap: break-word;
  color: #48576a;
}
.projectLabel {
  cursor: pointer;
  width: 90%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.labelDav .el-form-item__label {
  padding-right: 0;
}
.addCommidtyClass .el-dialog__body .el-table {
  margin-top: 0;
  margin-bottom: 20px;
}
.diatable > .el-dialog--small {
  width: 75%;
}
.commEd{
  border: 1px solid #4c70e8;
  padding: 5px 15px;
  color: #4c70e8;
  border-radius:5px; 
  cursor: pointer;
  margin: 0 10px;
}
.probtn{
  border: 1px solid #4c70e8;
  padding: 5px 15px;
  color: #4c70e8;
  border-radius:5px; 
  cursor: pointer;
  margin: 0 10px;
  line-height: 26px;
}

</style>