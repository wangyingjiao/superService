<template>
<div>
  <div class="filter-container tabStyle">
    <el-tabs v-model="tabs" @tab-click="handleClick">
      <!-- <el-tab-pane v-for="(item,key,index) in whole" :key="index" :label="item" :name="index"></el-tab-pane> -->
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="保洁" name="clean"></el-tab-pane>
      <el-tab-pane label="家修" name="repair"></el-tab-pane>
    </el-tabs>
      <el-select clearable class="search"  filterable  v-model="search.sortId" placeholder="所属分类"  @change="(val)=>open(val,1)">
        <el-option v-for="(item,index) in searchSortList" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>

      <!-- <el-select clearable style="width: 200px; margin-left:20px" class="filter-item" v-model="search.cityCode" placeholder="定向城市" @change="cjw">
        <el-option v-for="(item,index) in serverCityArr" :key="index" :label="item.cityName" :value="item.cityCode">
        </el-option>
      </el-select> -->

      <el-input class="search" placeholder="请输入搜索的项目名称" v-model="search.name">
      </el-input>
      <button class="button-large el-icon-search btn_search" @click="getList"> 搜索</button>
  </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_pad" v-if="btnShow.indexOf('project_insert')>-1" style="width:80px" @click="handleCreate('basic')">新增</button>

    <el-table 
    :key='tableKey' 
    :data="listTable" 
    v-loading="listLoading" 
    fit 
    border
    highlight-current-row 
    element-loading-text="正在加载" 
    style="width: 100%;" >
      <el-table-column align="center" label="编号" width="100">
        <template scope="scope">
          {{scope.row.num+(pageNumber-1)*pageSize}}
        </template>
         <!-- <template scope="scope">
          <input type="text" v-model="scope.row.sortNum" class="sortInput" @blur="indexBlur(scope.row)">
        </template> -->
      </el-table-column>

      <el-table-column align="center" label="图片">
        <template scope="scope" >
          <span v-if="scope.row.pictures != undefined"><img :src="imgSrc + scope.row.pictures[0]+'?x-oss-process=image/resize,m_fill,h_60,w_60'" class="imgList"/></span>
        </template>
      </el-table-column>

      <el-table-column  label="项目名称" align="center" prop="name">
      </el-table-column>

      <el-table-column  label="商品名称" align="center">
        <template scope="scope">
          <div 
            class="branch"  
            v-for="(item,index) in scope.row.commoditys" 
            :key="index">
              {{item.name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="价格/单位" align="center">
        <template scope="scope">
          <div
          class="branch"  
            v-for="(item,index) in scope.row.commoditys" 
            :key="index"
          >{{item.price+"元"}} / {{item.unit}}</div>
        </template>
      </el-table-column>

      <el-table-column  label="所属分类" align="center" prop="sortName">
      </el-table-column>

      <!-- <el-table-column label="城市" align="center" prop="cityName">
        <template scope="scope">
          <span class="branchSpan" ref="branchee" v-for="(item,index) in scope.row.citys" :key="index">{{item.cityName}}&nbsp;</span>
        </template>
      </el-table-column> -->

      <el-table-column  label="状态" align="center" >
        <template scope="scope">
          <span v-show="scope.row.sale == 'no'">下架</span>
          <span v-show="scope.row.sale == 'yes'">上架</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="200px">
        <template scope="scope">
            <el-button class="el-icon-upload ceshi3" v-if="btnShow.indexOf('project_detail')>-1" @click="handleUplode(scope.row)"></el-button>
            <el-button class="el-icon-edit ceshi3" v-if="btnShow.indexOf('project_update')>-1" @click="handleUpdate(scope.row)"></el-button>
            <el-button class="el-icon-delete ceshi3" v-if="btnShow.indexOf('project_delete')>-1" @click="handleDelete(scope.row)"></el-button>
          </template>
      </el-table-column>

    </el-table>

    <div v-if="!listLoading" class="pagination-container">
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
      id="diatable">
      <div class="tabBox">
          <div class="tabLeft fl" ref="refTab">
          <!-- <span class="tabBtn tabBtnclick" @click="refbtn1" ref="refbtn1">保洁</span>
          <span class="tabBtn" @click="refbtn2" ref="refbtn2">家修</span> -->
          <el-radio-group v-model="basicForm.majorSort" @change="houseClick"> 
            <el-radio-button label="1" style="display:none"></el-radio-button>
            <el-radio-button class="tableCleaning" size='large' label="clean">保洁</el-radio-button>
            <el-radio-button style="width:100%;" label="repair">家修</el-radio-button>
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
                  <el-select  filterable   v-model="basicForm.sortId" style="width:100%" class="form_item" @change="(val)=>open(val,2)">
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

                <!-- <el-form-item label="定向城市：" class="seize"> 
                   <div class="cityClass">
                        <div :class="{'techTime-green':basicForm.cityCodes.indexOf(item.cityCode)!=-1}" class="selfCheckBox tech-selfbox tech-center" v-for="(item,index) in cityArr" :key="index" @click="clickClick(item)">
                          {{item.cityName}}
                        </div>
                    </div>     
                    <ul>
                    </ul>
                </el-form-item> -->

                <el-form-item label="服务图片：" prop="picture">
                  <div class="upload-demo upload_box form_item">
                      <el-upload
                          action="http://openservice.oss-cn-beijing.aliyuncs.com"
                          list-type="picture-card"
                          :on-preview="handlePreview"
                          :before-upload="handPic"
                          :on-remove="handleRemovePic"
                          :file-list="picList"
                          :http-request="picUpload"            
                          >
                          
                          <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                  </div>
      
                    <div class="el-upload__tip">*请选择上传的图片，且不超过4张</div>
                </el-form-item>

                <el-form-item label="服务描述：" prop="description">
                  <el-input
                  :rows="4"
                  class="form_item"
                  v-model="basicForm.description"
                  type="textarea"
                  placeholder="服务内容；服务流程；服务保障"></el-input>
                </el-form-item>

                <el-form-item label="系统标签：" prop="sysTags">
                   <div class="custom form_item">
                        <span class="tech-order-btn" @click="SystemLabel = true"> &#10010; 请选择</span>
                    </div>
                    <div class="labelList form_item" v-show="(labelClickArr!=undefined && labelClickArr.length>0) || (alreadyArr!=undefined && alreadyArr.length>0)">
                        <!-- <span v-for="item in alreadyArr.concat(labelClickCon)" :key="item.value">{{item.label}}
                          <i @click="AlreadyLabel(item)" class="cursor" style="font-weight: bolder;">X</i>
                        </span> -->
                        <span v-for="(item,index) in labelClickArr.concat(alreadyArr)" :key="index">
                            {{item}}
                            <i @click="AlreadyLabel(item)" class="cursor" style="font-weight: bolder;">X</i>
                        </span>
                    </div>
                    <div class="el-upload__tip">* 最多设置3个系统标签</div>
                </el-form-item>

                <el-form-item label="自定义标签：" class="labelDav">
                    <div class="custom">
                        <span class="tech-order-btn" @click="addLabel = true"> &#10010; 添加</span>
                    </div>
                    <div class="labelList" v-show="basicForm.customTags != undefined && basicForm.customTags.length>0">
                        <span v-for="(item,index) in basicForm.customTags" :key="index">{{item}}   
                          <i @click="deleteLabel(index)" class="cursor" style="font-weight: bolder;">X</i>
                        </span>
                    </div>
                     <div class="el-upload__tip">* 最多设置3个自定义标签</div>
                </el-form-item> 
            
                <el-form-item label="是否上架：" class="seize">
                    <el-switch
                      @change="isNo"
                      v-model="basicForm.sale"
                      on-text="是"
                      off-text="否"
                      on-value="yes"
                      off-value="no">
                    </el-switch>
                </el-form-item>

                <!-- <el-form-item label="排序号：" class="seize">
                    <el-input
                      v-model="basicForm.sortNum"
                      style="width:90%"
                      placeholder="请输入排序号（值越小越靠前）"></el-input>
                </el-form-item> -->
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
                      <span>{{scope.row.convertHours+'小时/'+scope.row.unit}}</span>
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
          <!-- 商品信息表格 。。。。。。。。完成 -->
              <div class="add_Btn" @click="addComm = !addComm">
                <span class="fl btn_Span1">+</span>
                <span class="fl btn_Span2">添加商品</span>
              </div>
              <el-form 
                v-show="addComm"
                :model="goods_info"
                ref="goods_info"
                label-position="left"
                label-width="90px" 
                style='padding:20px 0 0 20px'
                :rules = "goods"
                 >
                <el-form-item label="商品名称:" prop="name">
                  <el-input
                    placeholder="请输入商品名称（1-36位）"
                    style="width:70%"
                    v-model="goods_info.name"></el-input>
                </el-form-item>

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
                    <template slot="append">小时 / {{goods_info.unit || "单位"}}</template>
                  </el-input>
                </el-form-item>
             
                <el-form-item label="起步人数:" class="seize" prop="startPerNum">
                  <el-input
                    placeholder="请输入起步人数(默认为1)"
                    style="width:70%"
                    v-model="goods_info.startPerNum"></el-input>
                </el-form-item>

                <el-form-item label="封顶人数:" class="seize" prop="cappingPerNum">
                  <el-input
                    placeholder="请输入封顶人数"
                    style="width:70%"
                    v-model="goods_info.cappingPerNum"></el-input>
                </el-form-item>


                <!-- <el-form-item label="派人数量:" class="send" prop="persons">
                   <table class="table-pro" style="width:70%">
                     <tr>
                       <th @click="addTable">+</th>
                       <th>临界值</th>
                       <th>人数</th>
                     </tr>
                     <tr v-for="(item,index) in goods_info.persons" :key="index">
                        <td @click="tableDelete(index)">-</td>
                        <td>
                          <input class="table-input" type="text" v-model="item.critical">
                        </td>
                        <td>
                          <input class="table-input" type="text" v-model="item.quantity">
                        </td>
                     </tr>
                   </table>
                </el-form-item> -->

                <el-form-item label="起购数量:" class="seize" prop="minPurchase">
                  <el-input
                    placeholder="请输入起购数量（默认为1）"
                    style="width:70%"
                    v-model="goods_info.minPurchase"></el-input>
                </el-form-item>

                <el-form-item class="seize bottimPro" style="width:70%">
                  <input v-if="handleEditFlag" type="button" class="button-large" @click="submitForm('goods_info')" value="保 存">
                  <input v-else type="button" class="button-large" @click="submitForm('goods_info')" value="添 加">
                  <input type="button" class="button-cancel" @click="resetForm('ser')" value="取 消">
                </el-form-item>
              </el-form>
          </div>
          </div>
              <div slot="footer" class="dialog-footer" style="text-align:center">
                <input type="button" class="button-large" :disabled="btnState" @click="subForm('basic')" value="保 存">
                <input type="button" class="button-cancel" @click="cancel('basic')" value="取 消">
              </div>
            </el-dialog>
    <!-- 商品信息 完成 -->
    <!--自定义标签 -->
      <el-dialog title="设置自定义标签" :visible.sync="addLabel" class="labelName" @close="closeingLabel">
        <el-form :model="labelObj" :rules="labelRules" ref="labelObj">
          <el-form-item label="标签名称" :label-width="formLabelWidth" prop="labelName">
            <el-input v-model="labelObj.labelName" placeholder="中午、英文、数字(2~10位)"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <input type="button" class="button-large" @click="CustomLabel('labelObj')" value="确 定">
          <input type="button" class="button-cancel" @click="addLabel = false" value="取 消">
        </div>
      </el-dialog>
    <!-- 自定义标签结束-->

    <!--系统标签-->
      <el-dialog title="选择标签" :visible.sync="SystemLabel" class="systemLabel" @close="closeingLabel">
        <el-row>
          <el-col :span="24">
              <div class="already">
                  当前选择标签：
                  <!-- <span v-for="item in labelClickCon" :key="item.value">{{item.label}}
                    <i @click="SelectedLabel(item)" class="cursor" style="font-weight: bolder;">x</i>
                  </span> -->
                  <span v-for="(item,index) in labelClickArr" :key="index">{{item}}
                    <i @click="SelectedLabel(item)" class="cursor" style="font-weight: bolder;">x</i>
                  </span>
                </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" v-show="alreadyArr.length>0">
            <div class="already">
                  已添加标签：
                  <!-- <span v-for="item in alreadyArr" :key="item.value">{{item.label}}
                    <i @click="AlreadyLabel(item)" class="cursor" style="font-weight: bolder;">x</i>
                  </span> -->
                  <span v-for="(item,index) in alreadyArr" :key="index">
                    {{item}}
                    <i @click="AlreadyLabel(item)" class="cursor" style="font-weight: bolder;">x</i>
                  </span>
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
                  <div class="labelSystem" v-show="systemOptions4 !== undefined && systemOptions4.length>0">
                    <!-- <span v-for="item in systemOptions4" :key="item.value" @click="labelClick(item)" :class="{'techTime-green':labelClickArr.indexOf(item.value)!=-1}" class="cursor">
                      {{item.label}}
                    </span> -->
                    <!-- <input type="button" :disabled="JSON.stringify(alreadyArr).indexOf(JSON.stringify(item))!=-1" 
                            v-for="item in systemOptions4" :key="item.value" @click="labelClick(item)" 
                            :class="{'techTime-green':labelClickArr.indexOf(item.label)!=-1 || JSON.stringify(alreadyArr).indexOf(JSON.stringify(item))!=-1}" 
                            class="cursor" :value="item.label"> -->
                    <input type="button" v-for="item in systemOptions4" class="cursor"
                            :key="item.value" :value="item.label" @click="labelClick(item)"
                            :class="{'techTime-green':labelClickArr.indexOf(item.label)!=-1 || JSON.stringify(alreadyArr).indexOf(JSON.stringify(item.label))!=-1}"
                            :disabled="JSON.stringify(alreadyArr).indexOf(JSON.stringify(item.label))!=-1">
                  </div>
              </div>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <input type="button" class="button-large" @click="SystemLabel = false" value="确 定">
          <input type="button" class="button-cancel" @click="SystemLabel = false" value="关 闭">
        </div>
      </el-dialog>
    <!-- 系统标签结束 -->

    <!-- 图文详情 -->
      <div class="image-text">
          <el-dialog :visible.sync="ImageText" :close-on-click-modal="false">
            <div class="image-text-header">
                <p>添加详情</p>
                <!-- <span class="el-icon-plus" @click="addImage"> -->
                <!-- <p></span><span class="el-icon-close" @click="ImageText = false"></span></p> -->
            </div>
            <div class="image-text-body">
                <p style="color:rgb(179, 179, 179); font-size:12px;">最多4张; 为了保证浏览效果,请上传大于750px*10px且小于750px*6000px的图片</p>
                <div v-if="imgText.length==0" class="details">点击右上角加号按钮,添加图文详情</div>
                <div class="image-border" v-for="(item,index) in ImageTextArr" :key="index">
                   <el-upload
                          action="https://openservice.oss-cn-beijing.aliyuncs.com"
                          class="imgText"
                          list-type="picture"
                          ref="upload"
                          accept="image"              
                          :on-remove="handleRemove"
                          :file-list="fileList"
                          :limit="3"
                          :before-upload="handleBefore"
                          :http-request="upload"   
                          >
                          <i class="el-icon-plus"></i>
                      </el-upload>
                      <!-- <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog> -->
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align:center">
              <input type="button" class="button-large" @click="subImgText('a')" value="保 存">
              <input type="button" class="button-cancel" @click="resImgText('a')" value="取 消">
            </div>
        </el-dialog>
      </div>
    <!-- 图文详情 完成 -->

  </div>
</div>
</div>
</template>

<script>
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
  Whether,
  ServerAdd,
  ServerDelete,
  ServerEdit,
  serverEditPre,
  sortList,
  serGasqSort
} from "@/api/project";
// var without = require('lodash.without')
//挂载数据
const option1 = ["北京", "北京"];
var arr = [];
var systemOptions = [
  {
    value:'1',
    label:'推荐商品',
    children:[
      {
        value:'1-1',
        label:'推荐商品',
        children:[
          {
            value:'1-1-1',
            label:'戴尔电脑',
            children:[
              {
                value:'1-1-1-1',
                label:'戴尔电脑a'
              },
              {
                value:'1-1-1-2',
                label:'戴尔电脑b'
              },
              {
                value:'1-1-1-3',
                label:'戴尔电脑c'
              },
              {
                value:'1-1-1-4',
                label:'戴尔电脑c戴尔电脑c'
              },
              {
                value:'1-1-1-5',
                label:'戴尔电脑c戴尔电脑c戴尔电脑c'
              },
              {
                value:'1-1-1-6',
                label:'戴尔电脑c'
              }
            ]
          },
          {
            value:'1-1-2',
            label:'苹果手机',
            children:[
              {
                value:'1-1-2-1',
                label:'iP5'
              },
              {
                value:'1-1-2-2',
                label:'iP6'
              },
              {
                value:'1-1-2-3',
                label:'iP7'
              }
            ]
          },
          {
            value:'1-1-3',
            label:'充电器'
          }
        ]
      },
      {
        value:'1-2',
        label:'精致生活',
        children:[
          {
            value:'1-1-1',
            label:'戴尔电脑1'
          },
          {
            value:'1-1-2',
            label:'苹果手机2'
          },
          {
            value:'1-1-3',
            label:'充电器3'
          }
        ]
      }
    ]
  },
  {
    value:'2',
    label:'秋红分类',
    children:[
      {
        value:'2-1',
        label:'春天',
        children:[
          {
            value:'2-1-1',
            label:'风筝',
            children:[
              {
                value:'2-1-1-1',
                label:'1111'
              },
              {
                value:'2-1-1-2',
                label:'1112'
              }
            ]
          },
          {
            value:'2-1-2',
            label:'运动鞋',
          }
        ]
      },
      {
        value:'2-2',
        label:'冬天',
        children:[
          {
            value:'2-2-1',
            label:'火锅'
          },
          {
            value:'2-2-2',
            label:'羽绒服'
          }
        ]
      }
    ]
  },
  {
    value:'3',
    label:'肉畜分类',
    children:[
      {
        value:'3-1',
        label:'羊肉',
        children:[
          {
            value:'3-1-1',
            label:'羊杂'
          },
          {
            value:'3-1-2',
            label:'羊肉卷'
          }
        ]
      },
      {
        value:'3-2',
        label:'猪肉',
        children:[
          {
            value:'3-2-1',
            label:'猪头肉'
          },
          {
            value:'3-2-2',
            label:'猪鼻孔'
          }
        ]
      }
    ]
  }
]
export default {
  name: "table_demo",
  directives: {
    waves
  },
  data() {
    // var UNIT = (rule, value, callback) => {
    //   var reg = /^\d+$/;
    //   if (value) {
    //     callback()
    //     // if (value.length >= 1 && value.length <= 5) {
    //     //   if (reg.test(value)) {
    //     //     callback();
    //     //   } else {
    //     //     callback(new Error("商品单位必须为数字值"));
    //     //   }
    //     // } else {
    //     //   callback(new Error("长度在 1 到 5 个字符"));
    //     // }
    //   } else {
    //     callback(new Error("请输入商品单位"));
    //   }
    // };
    //价格
    var PRICE = (rule, value, callback) => {
      var val = value+''
      var reg = /^\d+(\.\d{1,2})?$/;
      if (val) {
        if(val.length>=1 && val.length<=8){
          if(reg.test(val)){
            callback()
          }else{
            callback(new Error("不能为特殊字符，小数保留后两位"));
          }
        }else{
          callback(new Error('不能大于99999999元'))
        }
      } else {
        callback(new Error("请输入价格"));
      }
    };
    //折算时长
    var CONVERTHOURS = (rule, value, callback) => {
      var reg = /^\d+$/;
      if (value) {
          if(this.goods_info.type == 'num'){
            // console.log(value)
            if(value>=0.01 && value<=1.5){
              callback();
            }else{
              callback(new Error('请正确输入(0.01~1.5小时)'))
            }
          }

         if(this.goods_info.type == 'area'){
            if(value>=0.01 && value<=0.5){
              callback()
            }else{
              callback(new Error('请正确输入(0.01~0.5小时)'))
            }
          }

        if(this.goods_info.type == 'house'){
            if(value>=2 && value<=12){
                callback()
            }else{
              callback(new Error('请正确输入(2~12小时)'))
            }
      }
     }else {
        callback(new Error("请输入折算时长"));
      }
    };
    var PERSONS = (rule, value, callback) => {
      var reg = /^\d+$/;
      console.log(rule, "rule-------");
      console.log(value, "value---------111");
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
    var PICTURE = (rule,value,callback)=>{
      // callback()
      console.log(this.picFile,"this.picFile-----------------[][][]")
      if(this.picFile !=undefined && this.picFile.length>0){
        callback()
      }else{
        callback(new Error("请添加服务图片"))
      }
    }
    //系统标签
    var SYSTAGS = (rule,value,callback)=>{
      var arr = this.labelClickArr.concat(this.alreadyArr)
      if(arr!=undefined && arr.length>0){
        callback()
      }else{
        callback(new Error('请选择系统标签'))
      }
    }
    //自定义标签 
    var LABELNAME = (rule,value,callback)=>{
      var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
      if(value){
        if(value.length>=2 && value.length<=10){
          if(this.basicForm.customTags.indexOf(value) != -1){
            callback(new Error('已有该自定义标签名称'))
          }else{
             if(reg.test(value)){
              callback()
            }else{
              callback(new Error('不能输入特殊字符'))
            }
          }
        }else{
          callback(new Error('自定义标签长度2~10位'))
        }
      }else{
        callback(new Error('请输入自定义标签'))
      }
    }
    //封定人数
    var CAPPINPERNUM = (rule,value,callback)=>{
      var reg = /^\d+$/;
        if(value){
          if(reg.test(value)){
            if(value*1>=this.goods_info.startPerNum*1){
               callback()
            }else{
              callback(new Error('起步人数不能大于封顶人数'))
            }
          }else{
            callback(new Error('请输入数字'))
          }
        }else{
          callback()
        }
    }
    //起步人数
    var STARTPERNUM = (rule,value,callback)=>{
      var reg = /^\d+$/;
      if(value){
          if(reg.test(value)){
            callback()
          }else{
            callback(new Error('请输入数字'))
          }
      }else{
         callback()
      }
      // console.log(value,"value-------------------")
      // if(this.goods_info.cappinPerNum){
      //    if(this.goods_info.cappinPerNum*1>=value*1){
      //       callback()
      //     }else{
      //       callback(new Error('起步人数不能大于封顶人数'))
      //     }
      // }else{
      //   callback()
      // }
     
    }
    //起够数量
    var MINPURCHASE = (rule,value,callback) =>{
      var reg = /^\d+$/;
      if(value){
        if(reg.test(value)){
          callback()
        }else{
          callback(new Error('请输入数字'))
        }
      }else{
        callback()
      }
    }
    //商品名称
    var NAME = (rule,value,callback) =>{
      console.log(rule,"rule--------------")
      console.log(this.editName,"this.editName--------")
      var arr = this.basicForm.commoditys
      if(value){
        if(value.length>=1 && value.length<=36){
          if(this.handleEditFlag){
            if(value == this.editName.name){
              callback()
            }else{
              callback(new Error('商品名称重复'))
            }
          }else{
            if(arr!=undefined && arr.length>0){
              for(var i=0; i<arr.length; i++){
                if(arr[i].name == value){
                  callback(new Error('商品名称重复'))
                  break;
                }else{
                  callback()
                }
              }
            }else{
              callback()
            }
            // if(JSON.stringify(this.basicForm.commoditys).indexOf(JSON.stringify(value))!=-1){
            //   callback(new Error('商品名称重复'))
            // }else{
            //   callback()
            // }
          }
        }else{
          callback(new Error("长度在 1 到 36 个字符"))
        }
      }else{
        callback(new Error('请输入商品名称(1-36位)'))
      }
    }
    return {
      editIndex:{
        falge:false,
        id:null
      },
      pageNumber:1,
      alreadyArr:[],
      labelClickCon:[],
      labelClickArr:[],
      systemClickId:null,
      systemClick2Id:null,
      imgFlag:true,
      systemClick3Id:null,
      systemOptions:[],
      systemOptions2:[],
      systemOptions3:[],
      systemOptions4:[],
      SystemLabel:false,
      CustomLabelList:[],
      labelObj:{
        labelName:'',
      },
      formLabelWidth: '90px',
      addLabel:false,
      tableData:[],
      btnState:false,
      ossData: new FormData(),
      ImageTextArr: [{ imageUrl: "" }],
      ImageText: false,
      tabs: "all",
      editId: "",
      total: null,
      editName:'',
      houseStr: "",
      whole: {},
      serverCityArr: [],
      wholeTable: {},
      directional: [],
      cityArr: [],
      personsTime: false,
      addComm: false,
      critical: "",
      quantity: "",
      commoditysObj: {},
      persons: [],
      commoditys: [],
      imageUrl: "",
      dialogImageUrl: "",
      handleEditFlag:false,
      handleEditIndex:null,
      dialogVisible: false,
      Imagestext:true,
      measure: [
      ],
      listTable: [],
      listLoading: true,
      whether: true,
      sortList: [],
      searchSortList:[],
      goods_info:{
        name:'',
        unit:'',
        type:'',  
        price:'',
        convertHours:'',
        startPerNum:'',
        cappingPerNum:'',
        minPurchase:''
      },
      goods: {
        name: [
          // { required: true, message: "请输入商品名称(2-10位)", trigger: "blur" },
          // { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
          {required:true,validator:NAME,trigger:'blur'}
        ],
        unit: [
          { required: true, message:"请输入商品单位", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择计量方式", trigger: "change" }
        ],
        price: [
          { required: true, validator: PRICE, trigger: "blur" },
          // { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ],
        convertHours: [
          { required: true, validator: CONVERTHOURS, trigger: "blur" }
        ],
        startPerNum:[
          {validator:STARTPERNUM,trigger:'blur'}
        ],
        cappingPerNum:[
          {validator:CAPPINPERNUM,trigger:'blur'}
        ],
        minPurchase:[{validator:MINPURCHASE,trigger:'blur'}]
        // persons: [{ require: true, validator: PERSONS, trigger: "change" }]
      },
      labelRules:{
        labelName:[
          {
            required:true,validator:LABELNAME,trigger:'blur'
          }
          // { required: true, message: "请输入标签名称(2-10位)", trigger: "blur" },
          // { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      },
      basicForm: {
        name: "",
        // picture: "123123132", //服务图片
        sortId: "",
        sale: "yes",
        // sortNum: "",
        majorSort: "all",
        commoditys: [],
        // cityCodes: [],
        description: "",
        sysTags:[],
        customTags:[]
      },
      basicRles: {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 2, max: 10, message: "请输入2-10位的项目名称", trigger: "blur" }
        ],
        picture: [
           { required: true, validator:PICTURE, trigger:"blur"}
          ],
        sortId:[{required:true,message:'请选择所属分类',trigger:'change'}],
        info: [{ required: true, message: "请输入2-10位的项目名称", trigger: "blur" }],
        description: [
            { required: true, message: "请输入服务描述", trigger: "blur" },
            { min: 0, max: 255, message: "服务描述长度介于0和255之间", trigger: "blur" }
          ],
        sysTags:[{required:true,validator:SYSTAGS,trigger:'blur'}]
      },
      // goods_info: {
      //   name: "",
      //   unit: "",
      //   type: "",
      //   price: "",
      //   time: "",
      //   peoNum: "",
      //   num: "",
      //   persons: [],
      //   minPurchase: ""
      // },
      listQuery: {
        sort: "+id",
        page: 1
      },
      search: {
        sortId: "",
        name: ""
      },
      pageSize: 10,
      fileList: [
        // {
        //   url:
        //     "http://openservice.oss-cn-beijing.aliyuncs.com//openservice/2017/11/22/qwe.jpg?x-oss-process=image/resize,h_1200"
        // }
      ],
      picFile: [],
      imgText: [],
      picList: [],
      temp: {
        option1: "",
        val: true
      },
      importanceOptions: [1, 2, 3],
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑服务项目",
        create: "新增服务项目"
      },
      tableKey: 0,
      city: ["1", "2", "3"],
      option1: []
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  created() {
    //所属分类
    // this.tableProject({majorSort:"all"})
    this.handleClick({name:'all'})
    //系统标签
    serGasqSort()
      .then(data=>{
        this.systemOptions = data.data.data
        console.log(data,"系统标签-----------")
      }).catch(error=>{
        console.log(error,"系统标签错误-------")
      })
    //是否 计量方式 全部 保洁 家修
    Whether()
      .then(({ data }) => {
        console.log(data, "-------------data--------------");
        this.measure = data.meterage;
        this.whole = data.ser_sort;
      })
      .catch(error => {
        console.log(error, "error-----project");
      });

    // this.orient({}, 0); // 所属分类
    this.getList(1, 10); //搜索 ，分页
    this.sign   //获取签名
  },
  computed: {
    sign: function() {
      console.log("-------------------------------")
      return getSign();
    },
    btnShow() {
      return JSON.parse(localStorage.getItem('btn'));
    },
  },
  methods: {
    //保洁家修切换
    tableProject(obj,id){
      Taxonomy(obj)
      .then(data => {
        console.log(data,"clean++++++++++===============")
        this.sortList = data.data.data;
        if(id){
          this.basicForm.sortId = id
        }
      })
      .catch(error => {
        console.log(error, "error-----project");
      });
    },
    //系统标签已添加标签删除
    AlreadyLabel(item){
      if(this.labelClickArr.indexOf(item)!=-1){
        this.SelectedLabel(item)
      }else{
        this.remove(this.alreadyArr,item)
      }
    },
    //系统标签当前选择标签删除
    SelectedLabel(item){
      this.remove(this.labelClickArr, item);
      // this.remove(this.labelClickCon, item);
    },
    //四级标签点击
    labelClick(item){
         if(this.labelClickArr.indexOf(item.label) == -1){
           if(this.labelClickArr.length+this.alreadyArr.length>2){
             this.$message({
               message:'最多设置3个系统标签',
               type:'warning'
             })
             return false
           }
           this.labelClickArr.push(item.label)
         }else{
           this.remove(this.labelClickArr, item.label);
         }

         console.log(this.labelClickArr,"this.labelClickArr------------------")
        //  if(this.labelClickArr.indexOf(item.label)==-1){
        //     if((this.alreadyArr.length + this.labelClickArr.length)>2){
        //       this.$message({
        //         message:'最多设置3个系统标签',
        //         type:'warning'
        //       });
        //       return false
        //     }else{
        //       this.labelClickArr.push(item.label)
        //       this.labelClickCon.push(item)
        //     }
        //   }else{
        //     this.remove(this.labelClickArr, item.value);
        //     this.remove(this.labelClickCon, item.value,'value');
        //   }
      // }
    },
    //系统列表一级列表事件
    systemClick(item){
      this.systemClickId = item.value
      this.systemOptions2 = item.children
      this.systemOptions3 = [];
      this.systemOptions4 = [];
      console.log(item,"item-------")
    },
    //系统列表二级列表事件
    systemClick2(item){
      this.systemClick2Id = item.value
      this.systemOptions3 = item.children
       this.systemOptions4 = [];
    },
    systemClick3(item){
      this.systemClick3Id = item.value
      this.systemOptions4 = item.children
    },
    //自定义弹框关闭的回调
    closeingLabel(){
      this.labelObj.labelName = ''
    },
    //自定义标签删除
    deleteLabel(index){
      this.basicForm.customTags.splice(index,1)
    },
    //自定义标签
    CustomLabel(formName){
      this.$refs[formName].validate(valid => {
        if(valid){
          if(this.basicForm.customTags.length>2){
            this.$message({
              message: '最多设置3个自定义标签',
              type: 'warning'
            });
            return false
          }else{
            this.basicForm.customTags.push(this.labelObj.labelName)
            this.labelObj.labelName = ''
          }
          this.addLabel = false
        }else{
          return false
        }
      })
    },
    //服务图片验证
    handPic(file) {
      if (file.type == 'image/gif' || file.type=='image/jpg' || file.type=='image/png' || file.type=='image/jpeg') {
        this.imgFlag = true
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var src = this.sign.dir + "/" + y + "/" + m + "/" + d + "/" + file.name;
        console.log(this.picFile,"this.picFile------")
        if (this.picFile.indexOf(src) > -1) {
          this.$message({
            type: "warning",
            message: "此图片已经上传"
          });
          return false;
        }
        if (this.picFile.length >= 4) {
          this.$message({
            type: "warning",
            message: "最多上传4张图片"
          });
          return false;
        }
      }else{
        this.imgFlag = false
        this.$message.error('请上传正确的图片格式');
        return false
      }
      //服务图片
      // console.log(file, "上传前");
      // console.log(this.picFile);
    },
    //删除图片
    handleRemove(file, fileList) {//删除图文
      // console.log(file, "删除一张图片");
      // console.log(fileList,'文件')
      // console.log(this.imgText,'imgtext')
      // console.log(this.fileList,'filelist')
      // alert("123123")
      if(this.Imagestext){
          var str = "";
          var index = file.url.lastIndexOf("/");
          str = file.url.substring(index + 1, file.url.length);
          
          let newarr = []
          for(var i = 0;i<this.imgText.length;i++){
            var index = this.imgText[i].lastIndexOf("/");
            var newstr = ''
            newstr = this.imgText[i].substring(index + 1, this.imgText[i].length);
            newarr.push(newstr)
          }
          // console.log(str);
          // console.log(newarr,'截取')
          var delIndex = newarr.indexOf(str)
          if(delIndex==-1){

          }else{
               this.imgText.del(delIndex);
          }
          //console.log(delIndex,'删除图片的下标')
         
          //console.log(this.imgText);
      }else{
          return false
      }
    },
    handleRemovePic(file,fileList) {
      // alert("dwadawd")
      //删除服务图片
      // console.log(fileList,'文件');
      // console.log(file, "删除一张图片");
      // console.log(this.picFile,'imgtext')
      // console.log(this.picList,'filelist')
      if(this.imgFlag){
        var str = "";
        var index = file.url.lastIndexOf("/");
        str = file.url.substring(index + 1, file.url.length);
        var src = ''
        if (file.name != undefined) {
          src = file.name;
        } else {
          src = str;
        }
        console.log(src,'src');
        let newarr = []
        for(var i = 0;i<this.picFile.length;i++){
          var index = this.picFile[i].lastIndexOf("/");
          var newstr = ''
          newstr = this.picFile[i].substring(index + 1, this.picFile[i].length);
          newarr.push(newstr)
        }
          //console.log(newarr,'截取')
        var delIndex = newarr.indexOf(src)
        if(delIndex == -1){

        }else{
          this.picFile.del(delIndex);
        }
        console.log(delIndex,"delIndex------")
        // console.log(newarr,src,"newarr---------------------------")
        // console.log(delIndex,'删除图片的下标')
      }else{
        return false
      }
      // console.log(this.picFile);
    },
    handleBefore(file) {
      // console.log(file,"file,++++++++++")
      if(file.type == 'image/gif' || file.type=='image/jpg' || file.type=='image/png' || file.type=='image/jpeg'){
        this.Imagestext = true
        // console.log(this.imgText, "imgtext");
        // console.log(file);
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var src = this.sign.dir + "/" + y + "/" + m + "/" + d + "/" + file.name;
        if (this.imgText.indexOf(src) > -1) {
          this.$message({
            type: "warning",
            message: "此图片已经上传"
          });
          return false;
        }
        console.log(this.imgText.length,"-------------------------------------------------------------------------------------")
        if(this.imgText.length>=4){
          this.$message({
            type:'warning',
            message:'最多上传4张图片'
          })
          // this.Imagestext = false
          // alert("true")
          return false
        }else{
          this.Imagestext = true
        }
      }else{
        this.Imagestext = false
        this.$message.error('请上传正确的图片格式');
        return false
      }
      // 去重
    },
    subImgText(a) {
      // console.log(this.imgText);
      var obj = {
        id: this.editId,
        pictureDetails: this.imgText
      };
      // console.log(obj,"obj-------")
      if(this.imgText.length>0){
        sortList(obj).then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.ImageText = false;
            this.$message({
              type: "success",
              message: "图片上传成功"
            });
          }
        });
      }else{
          this.$message({
            type:'warning',
            message:'请上传图片'
          })
          return false
      }
      console.log(obj);
    }, // 保存图文
    resImgText(a) {
      // console.log(a);
      console.log(this.$refs.upload);
      this.fileList = [];
      this.ImageText = false;
    }, // 关闭图文
    upload(file) {
      // console.log(file,"file-----------")
      // 图文上传
      let pro = new Promise((resolve, rej) => {
        var res = JSON.parse(Cookies.get("sign"));
        var timestamp = Date.parse(new Date()) / 1000;
        if (res.expire - 3 > timestamp) {
          console.log("签名没过期");
          resolve(res);
        } else {
          this.$http.get("/apiservice/oss/getSign").then(res => {
            console.log(res, "签名过期");
            Cookies.set("sign", JSON.stringify(res.data));
            resolve(res.data);
          });
        }
      });
      var that = this;
      pro.then(success => {
        var data = success;
        var ossData = new FormData();
        var date = new Date();
        var s = date.getTime()
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        ossData.append("name", file.file.name);
        ossData.append(
          "key",
          data.dir + "/" + y + "/" + m + "/" + d + "/" +s+'.jpg'
        );
        ossData.append("policy", data.policy);
        ossData.append("OSSAccessKeyId", data.accessid);
        ossData.append("success_action_status", 201);
        ossData.append("signature", data.signature);
        // 添加文件
        ossData.append("file", file.file, file.file.name);
        //this.ossData = ossData;
        // console.log(ossData.get("name"));
        // console.log(ossData.get("key"));
        that.$http
          .post(data.host, ossData, {
            headers: {
              "Content-Type": "multipart/form-data; boundary={boundary}"
            }
          })
          .then(res => {
            // console.log(this.fileList);
            this.imgText.push(ossData.get("key"));
            console.log(this.imgText,"this.imgText-------------")
            // console.log(this.imgText, "imgtext");
          })
          .catch(error => {
            console.log(error, "错误");
          });
      });
    },
    picUpload(file) {
      // 图片上传
      let pro = new Promise((resolve, rej) => {
        console.log(JSON.parse(Cookies.get("sign")), "测试1111");
        var res = JSON.parse(Cookies.get("sign"));
        var timestamp = Date.parse(new Date()) / 1000;
        if (res.expire - 3 > timestamp) {
          console.log("签名没过期");
          resolve(res);
        } else {
          this.$http.get("/apiservice/oss/getSign").then(res => {
            console.log(res, "签名过期");
            Cookies.set("sign", JSON.stringify(res.data));
            resolve(res.data);
          });
        }
      });
      var that = this;
      pro.then(success => {
        var data = success;
        var ossData = new FormData();
        var date = new Date();
        var s = date.getTime()
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        ossData.append("name", file.file.name);
        ossData.append(
          "key",
          data.dir + "/" + y + "/" + m + "/" + d + "/" + s +'.jpg'
        );
        ossData.append("policy", data.policy);
        ossData.append("OSSAccessKeyId", data.accessid);
        ossData.append("success_action_status", 201);
        ossData.append("signature", data.signature);
        // 添加文件
        ossData.append("file", file.file, file.file.name);
        //this.ossData = ossData;
        // console.log(ossData.get("name"));
        // console.log(ossData.get("key"));
        // console.log(that.$http,"that.$http")
          that.$http
            .post(data.host, ossData, {
              headers: {
                "Content-Type": "multipart/form-data; boundary={boundary}"
              }
            })
            .then(res => {
              console.log(this.picList);
              this.picFile.push(ossData.get("key"));
              // console.log(this.picFile,"this.picFile------------------")
              console.log(this.picFile, "picfile");
            })
            .catch(error => {
              console.log('错误-------------上传图片失败--')
              this.picFile.push(ossData.get("key"));
              console.log(error, "错误");
            });
      });
    },
    //编号失焦事件
    indexBlur(item) {
      // console.log(item, "----------itemmmmmmmmm");
      sortList({ id: item.id, sortNum: item.sortNum })
        .then(data => {
          // console.log(data, "更新排序----------");
          this.getList(1, 10);
        })
        .catch(error => {
          console.log(error, "更新排序错误----");
        });
    },
    addImage() {
      this.ImageTextArr.push({ imageUrl: "" });
    },
    handleAvatarSuccess(res, file, index) {
      this.ImageTextArr[index]["imageUrl"] = URL.createObjectURL(file.raw);
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(
        this.ImageTextArr[0]["imageUrl"],
        "this.ImageTextArr[0]['imageUrl']---"
      );
      console.log(this.imageUrl, "this.imageurl------");
    },
    cjw(val) {
      console.log(val, "------------------");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid=>{
        if(valid){
           var obj = Object.assign({},this.goods_info)
              obj.startPerNum = this.goods_info.startPerNum
              obj.minPurchase = this.goods_info.minPurchase
              obj.cappingPerNum = this.goods_info.cappingPerNum
          if(this.handleEditFlag){
            this.$set(this.basicForm.commoditys,this.handleEditIndex,obj)
            this.resetForm('ser')
            this.handleEditFlag = false
          }else{
            // var obj = Object.assign({},this.goods_info)
            //   obj.startPerNum = this.goods_info.startPerNum || 1
            //   obj.minPurchase = this.goods_info.minPurchase ||1
              console.log(obj,"obj---------------")
              this.basicForm.commoditys.push(obj)
              this.resetForm('ser')
          }
        }else{
          return false
        }
      })
      console.log(this.basicForm.commoditys,"this.basicForm.commoditys-------")
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     if (this.goods_info.persons.length > 0) {
      //       this.personsTime = false;
      //     } else {
      //       this.personsTime = true;
      //       return false;
      //     }
      //     console.log("保存表格测试");

      //     console.log(this.goods_info.persons, "this.persons----");
      //     var obj = {};
      //     var goods = this.goods_info;
      //     obj.name = goods.name;
      //     obj.unit = goods.unit;
      //     obj.type = goods.type;
      //     obj.price = goods.price;
      //     obj.convertHours = goods.convertHours;
      //     obj.minPurchase = goods.minPurchase;
      //     obj.persons = goods.persons;
      //     this.basicForm.commoditys.push(obj);
      //     // arr = []
      //     goods.persons = [];
      //     this.goods_info.minPurchase = "";
      //     this.resetForm("ser");
      //     console.log(obj, "obj-----");
      //   } else {
      //     if (this.persons.length > 0) {
      //       this.personsTime = false;
      //     } else {
      //       this.personsTime = true;
      //     }
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    //所属分类搜索
    // queryClass(val){
    //   console.log(val,'----queryClass----')
    //    Orienteering({"sortId":val}).then(data=>{
    //     this.serverCityArr = data.data.data
    //   }).catch(error=>{
    //     console.log(error,"error-----project")
    //   })
    // },
    //表格编辑
    handleEdit(index, val) {
      this.handleEditFlag = true
      this.handleEditIndex = index
      console.log(index,"index------------")
      console.log(val,"val--------------")
      this.editName = Object.assign({},val)
      this.goods_info = Object.assign({},val)
      this.goods_info.startPerNum = this.goods_info.startPerNum? this.goods_info.startPerNum : ''
      this.goods_info.cappingPerNum = this.goods_info.cappingPerNum?this.goods_info.cappingPerNum : ''
      this.goods_info.minPurchase = this.goods_info.minPurchase? this.goods_info.minPurchase : ''
      // this.basicForm.commoditys.splice(index,1)
      // this.tableData[index] = this.goods_info
      // console.log(this.goods_info, "this.goods_info.name");
      // console.log(val, "this.commoditys.name");
      this.addComm = true;
      // this.goods_info = val;
      // this.basicForm.commoditys.splice(index, 1);
    },
    //表格删除
    tableHandleDelete(index, item) {
      // this.basicForm.commoditys.splice(index, 1);
      this.handleEditFlag = false
      this.basicForm.commoditys.splice(index,1)
    },
    houseClick(val) {
      this.basicForm.sortId = ''
      this.tableProject({majorSort:val})
      // this.$refs['basic'].resetFields()  //基本信息重置
      // this.basicForm.sortNum = ''  //排序号好清空
      // this.basicForm.cityCodes = '' //定向城市
      // this.resetForm('goods_info')  //添加商品
      // this.goods_info.minPurchase = '' //起够数量
      // this.basicForm.commoditys = [] //商品信息表格
      this.houseStr = val;
      console.log(val, "val----");
    },
    isNo(bl) {
      console.log(bl, "adawd");
    },
    //数组去重
    remove(arr, val,key) {
      console.log(arr,"arr--------------")
      console.log(val,"val----------")
      for (var i = 0; i < arr.length; i++) {
        if(arr[i][key]){
          if(arr[i].value == val){
            arr.splice(i, 1);
            break;
          }
        }else{
          if(arr[i] == val){
            arr.splice(i, 1);
            break;
          }
        }
      }
    },
    clickClick(item) {
      var arr = this.basicForm.cityCodes;
      if (arr.indexOf(item.cityCode) == -1) {
        arr.push(item.cityCode);
      } else {
        this.remove(arr, item.cityCode);
      }
      console.log(arr, "arr--------");
      item.haveItem = !item.haveItem;
    },
    open(val, id) {
      console.log(val, "val----");
      console.log(id, "id-----");
      // this.orient({ sortId: val }, id);
      // console.log(id,'------------')
    },
    tableDelete(id) {
      this.goods_info.persons.splice(id, 1);
    },
    addTable() {
      // arr.push({critical:'',quantity:''})
      if (this.goods_info.persons.length >= 4) {
        this.$notify({
          title: "警告",
          message: "派人数量最多4个",
          type: "warning"
        });
      } else {
        this.goods_info.persons.push({ critical: "", quantity: "" });
      }
      this.personsTime = false;
    },
    getList(page, size,getObj) {
      var _page = page || this.pageNumber
      var _size = size || this.pageSize
      this.listLoading = true;
      var obj = {};
      if(getObj){
        obj = getObj
      }else{
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
      }
      this.listQuery.page = 1
        getProject(obj, _page, _size)
          .then(res => {
            console.log(res.data, "res.data-------");
            this.total = res.data.data.count;
            this.listTable = res.data.data.list;
            if(this.listTable!=undefined && this.listTable.length>0){
              // var num = page == 1? page : page-1+'1';
              for(var i = 0 ;i<this.listTable.length ; i++){
                this.listTable[i].num = i+1
              }
            }
            console.log(this.listTable,"listTable")
            this.listLoading = false;
            //this.total = res.data.data.count;
          })
          .catch(res => {
            this.listLoading = false;
          });
    },
    // 搜索
    handleFilter() {
      var obj = {};
      obj.majorSort = this.basicForm.majorSort;
      obj.sortId = this.search.sortId;
      obj.cityCode = this.search.cityCode;
      obj.name = this.search.name;
      console.log(obj, "搜索--------");
    },
    handleSizeChange(val) {
      // alert(val)
      this.listQuery.page = 1
      this.pageSize = val;
      // this.getList();
      // var obj = Object.assign({},this.search)
      // obj.majorSort = this.basicForm.majorSort
      // console.log(this.basicForm.majorSort,'this.basicForm.majorSort-----------')
      this.getList(this.pageNumber, this.pageSize)
      // getProject(obj, this.pageNumber, this.pageSize).then(res => {
      //   this.listTable = res.data.data.list;
      //   this.total = res.data.data.count;
      //   this.listLoading = false;
      // });
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

      this.listLoading = true;
      console.log(obj,"_______")
      this.getList(this.pageNumber, this.pageSize,obj)
      // getProject(obj, this.pageNumber, this.pageSize).then(res => {
      //   console.log(res.data.data.list,"res.data.data.list----------------------------res.data.data.list-------------------------")
      //   this.listTable = res.data.data.list;
      //   // var num = 0;
      //   this.listLoading = false;
      //   this.total = res.data.data.count;
      // });
    },
    handleCreate(formName) {
      // this.$refs[formName].resetFields();
      // this.resetTemp();
      // this.picList = []
       this.tableProject({majorSort:"clean"})
      this.alreadyArr = []
      this.dialogFormVisible = true;
      // this.cancel()
      this.basicForm.name = ''
      this.basicForm.description = ''
      this.dialogStatus = "create";
      this.basicForm.majorSort = "clean";
    },
    //编辑方法
    handleUpdate(row) {
      // console.log(row,"------row`````");
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.basicForm.majorSort = "clean";
      this.picList = []
      this.editId = row.id;
      ServerEdit({ id: this.editId })
        .then(data => {
          this.dialogFormVisible = true;   
          // this. alreadyArr = [{ value:'1-1-1-1',label:'戴尔电脑a' },{value:'2-1-1-1', label:'1111'},{value:'1-1-2-1',label:'iP5'}]
          // console.log(data, "data-----编辑");
          // this.basicForm = data.data.data
          var arr = data.data.data;
          console.log(arr,"arr--------------")
          for (var i = 0; i < arr.commoditys.length; i++) {
            if (arr.commoditys[i].id) {
              delete arr.commoditys[i].id;
            }
            // for (var j = 0; j < arr.commoditys[i].persons.length; j++) {
            //   if (arr.commoditys[i].persons[j].id) {
            //     delete arr.commoditys[i].persons[j].id;
            //   }
            // }
          }
          if (data.data.data.pictures != undefined) {
            this.picFile = data.data.data.pictures;
            for (var i = 0; i < data.data.data.pictures.length; i++) {
              console.log(data.data.data.pictures, "tupian");
              var obj = {
                url:
                  "https://openservice.guoanshequ.com/" +
                  data.data.data.pictures[i]
              };
              this.picList.push(obj);
            }
          }
          this.tableProject({majorSort:arr.majorSort},arr.sortId)
          this.basicForm = arr;
          this.basicForm.customTags = arr.customTags || []
          console.log(this.basicForm, "basicForm------");
          this.alreadyArr = arr.sysTags || []
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleUplode(row) {
      this.basicForm.sortId = ''
      this.imgText = []
      // console.log("上传");
      this.editId = row.id;
      this.picList = [];
      this.fileList = [];
      this.editId = row.id;
      this.listLoading = true;
      ServerEdit({ id: this.editId })
        .then(res => {
          console.log(res,"res---------------");
          if (res.data.code == 1) {
            var data = res.data.data;
            this.listLoading = false;

            if (data.pictureDetails != undefined) {
              this.imgText = data.pictureDetails;
              for (var i = 0; i < data.pictureDetails.length; i++) {
                var obj = {
                  url:
                    "https://openservice.guoanshequ.com/" +
                    data.pictureDetails[i]
                };
                this.fileList.push(obj);
              }
            }
            this.ImageText = true;
            // console.log(this.fileList, "编辑图文");
            // console.log(this.imgText, "编辑图文");
          }
          // console.log(res, "列表信息");
        })
        .catch(err => {
          console.log(err);
          this.listLoading = false;
          this.$message({
            type: "warning",
            message: "获取数据失败"
          });
        });
    },
    handleDelete(row) {
      console.log(row, "-----row---");
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(row);
          var obj = {
            id: row.id
          };
          ServerDelete(obj)
            .then(res => {
              console.log(res);
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList(this.pageNumber, this.pageSize);
              } else {
                this.$message({
                  type: "warning",
                  message: "删除失败"
                });
              }
            })
            .catch(() => console.log("未知错误"));
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    create() {
      var obj = {
        citys: [
          {
            cityId: "1",
            cityName: "北京"
          },
          {
            cityId: "2",
            cityName: "山东"
          }
        ],
        commoditys: [
          {
            name: "日常保洁",
            unit: "小时",
            meterage: "按居室", //计量方式
            price: "19",
            convertHours: "10", //折算时长
            minPurchase: 1, //起购数量
            persons: [
              //派人
              {
                critical: ">10",
                quantity: 1
              },
              {
                critical: ">20",
                quantity: 2
              }
            ]
          }
        ],
        majorSort: "1",
        sortId: "00ea9c6db7f242c49eb40b43b38ad7b7",
        sortName: "日常保洁", //所属分类
        name: "保洁家修1", //项目名称（验重）
        pictures:
          "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=989127825,4177828898&fm=58&s=E152CC32C521590358D4D5DE020050B0&bpow=121&bpoh=75",
        description: "服务描述测试",
        sale: "1", //是否上架
        sortNum: 1 //排序号
      };
      addProject(obj).then(res => {
        console.log(res);
      });
    },
    update() {
      this.temp.timestamp = +this.temp.timestamp;
      for (const v of this.list) {
        if (v.id === this.temp.id) {
          const index = this.list.indexOf(v);
          this.list.splice(index, 1, this.temp);
          break;
        }
      }
      this.dialogFormVisible = false;
      this.$notify({
        title: "成功",
        message: "编辑成功",
        type: "success",
        duration: 2000
      });
    },
    handleClick(tab, event) {
      console.log(tab.name, event, "-------tab");
      this.search.sortId = ''
      this.search.name = ''
      var size = this.pageSize;
       Taxonomy({majorSort:tab.name})
        .then(data => {
          console.log(data,"clean++++++++++===============")
          this.searchSortList = data.data.data;
        })
        .catch(error => {
        console.log(error, "error-----project");
      });
      // this.tableProject({majorSort:tab.name})
      this.getList(1, size);
      this.listQuery.page = 1;
    },
    
    handleAvatarSuccess1(res, file) {
      console.log(res, "触发事件");
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      console.log(this.dialogImageUrl, "dialogImageUrl-----");
      console.log(res.path, "res----");
      console.log(file.raw, "file----");
    },
    handlePreview(file) {
      console.log(file);
    },
    resetTemp() {
      this.temp = {};
    },
    //取消
    cancel(fromName) {
       this.dialogFormVisible = false;
      // console.log(fromName,"-----")
      // this.dialogFormVisible = false;
      // this.resetEmpty()
      // var str = "basic"
      // this.$refs[str].resetFields(); //基本信息重置
      // this.basicForm.sortNum = ""; //排序号好清空
      // this.basicForm.cityCodes = []; //定向城市
      // this.resetForm("goods_info"); //添加商品
      // this.goods_info.minPurchase = ""; //起够数量
      // this.basicForm.commoditys = []; //商品信息表格
      // this.picFile = [] //清空图片
      // this.picList = [] //清空图片
      // this.dialogFormVisible = false;
    },
    //保存
    subForm(formName) {
      var that = this;
      console.log(this.picFile, "选中的图片列表");
      this.$refs[formName].validate(valid => {
        // console.log(this.basicForm, "basicForm------");
        if (valid) {
          this.btnState = true
          var arr = []
          var obj = Object.assign({},that.basicForm)
              obj.pictures = this.picFile; //服务图片缩略图.
              obj.sysTags = this.labelClickArr //添加 系统标签
              // obj.customTags = this.CustomLabelList; //添加 自定义标签
          // obj.majorSort = that.basicForm.majorSort; //所属分类
          // obj.sortId = that.basicForm.sortId; //所属分类编号
          // obj.commoditys = that.basicForm.commoditys; //商品信息
          // obj.name = that.basicForm.name; //项目名称
          // obj.pictures = this.picFile; //服务图片缩略图
          // obj.description = that.basicForm.description; //服务描述
          // obj.sale = that.basicForm.sale; //是否上架
          // obj.sortNum = that.basicForm.sortNum; //排序号
          // obj.cityCodes = that.basicForm.cityCodes; //定向城市
          console.log(obj, "-----------------------------------");
          //==update 是编辑   create是添加
          if (this.dialogStatus == "update") {
            // that.basicForm.id = this.editId
            console.log(that.basicForm, "that.basicForm----");
            that.basicForm.sysTags = this.alreadyArr.concat(this.labelClickArr)
            serverEditPre(that.basicForm)
              .then(data => {
                 this.btnState = false
                if (data.data.code) {
                  this.$message({
                    message: data.data.data,
                    type: "success"
                  });
                  this.dialogFormVisible = false;
                  this.getList(this.pageNumber, this.pageSize);
                  this.picFile = [];
                  this.picList = [];
                } else {
                  this.$message({
                    message: data.data.data,
                    type: "warning"
                  });
                   this.btnState = false
                }
              })
              .catch(error => {
                 this.btnState = false
                console.log(error, "error---project---857");
              });
          } else {
            console.log(obj);
            if("id" in obj){
              delete obj.id
            }
            ServerAdd(obj)
              .then(data => {
                this.btnState = false
                console.log(data, "添加成功");
                if (data.data.code) {
                  this.$message({
                    message: data.data.data,
                    type: "success"
                  });
                  this.cancel("basic");
                  this.basicForm.majorSort = 'all';
                  this.search.sortId = '';
                  this.search.name ='';
                  this.tabs = 'all';
                  this.getList(1, 10);
                  this.listQuery.page = 1
                  this.picFile = [];
                } else {
                  this.$message({
                    message: data.data.data,
                    type: "warning"
                  });
                  this.btnState = false
                }
              })
              .catch(error => {
                this.btnState = false
                console.log(error, "error--project--770");
              });
          }
        } else {
          // this.$message.error("不能为空");
          return false;
        }
      });
    },
    resetForm(ser) {
      // this.resetEmpty(ser)
      this.$refs["goods_info"].resetFields()
      this.goods_info.minPurchase = "";
      this.goods_info.startPerNum = '';
      this.goods_info.cappingPerNum = ''
      // this.addComm = false;
      // this.dialogFormVisible = false;
      // this.goods_info.persons = [];
      // var str = formName || "goods_info";
      // if(this.basicForm.commoditys.length>0 && this.dialogStatus != "update"){
      //   console.log("--------")
      //    this.$refs[str].resetFields();
      // }
      // this.goods_info.persons = [];
      // this.goods_info.minPurchase = "";
    },
    emptyingForm(){
      this.$refs["goods_info"].resetFields()
      this.$refs["basic"].resetFields()
      this.addComm = false
      // this.goods_info = {}
      this.basicForm.commoditys = [];
      this.picFile = [] //清空图片
      this.picList = [] //清空图片this.alreadyArr.concat(this.labelClickArr)
      this.alreadyArr = []
      this.labelClickArr = []
      this.basicForm.customTags = []
      this.systemOptions2 = [];
      this.systemOptions3 = [];
      this.systemOptions4 = [];
    },
    resetEmpty(txt){
      if(txt == "ser"){
        this.$refs["goods_info"].resetFields()
        this.goods_info.minPurchase = "";
        this.goods_info.startPerNum = '';
        this.goods_info.cappingPerNum = ''
      }else{
        this.$refs["goods_info"].resetFields()
        this.$refs["basic"].resetFields()
        this.goods_info.minPurchase = "";
        this.basicForm.sortNum = ""; //排序号好清空
        this.basicForm.cityCodes = []; //定向城市
        this.goods_info.minPurchase = ""; //起够数量
        this.basicForm.commoditys = []; //商品信息表格
        this.picFile = [] //清空图片
        this.picList = [] //清空图片
        this.dialogFormVisible = false;
      }
    }
  }
};
</script>
<style>

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
.el-table th > .cell {
  text-align: -webkit-center;
}
.el-table .cell,
.el-table th > div {
  padding-left: 10px;
  padding-right: 10px;
}
.upload_box {
  /* text-align: center; */
  box-sizing: border-box;
  padding: 10px;
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
  width: 30px;
  height: 30px;
  background-color: #3A5FCD;
  text-align: center;
}
.btn_Span2 {
  width: 70px;
  height: 30px;
  text-align: center;
}
.branch,
.branchSpan {
  width: 100%;
  height: 45px;
  line-height: 45px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.branch{
  border-bottom: 1px solid #dfe6ec
}
.el-table__row .cell .branch:last-child{
  border-bottom: none;
}
.branch:nth-of-type(even) {
  /* background-color: #f5f5f5; */
}
.el-table .cell {
  padding: 0;
}
.tabBox {
  overflow: hidden;
  width: 100%;
  border: 1px #f5f5f5 solid;
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

.tabRight {
  width: 85%;
  height: 100%;
  border-left: 1px #f5f5f5 solid;
  padding-top: 10px;
  background-color: #ffffff;
  padding: 10px;
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
.tit {
  font-weight: bold;
  padding: 10px 0 5px 0;
}
.el-upload--picture-card {
  width: 148px;
}
.upload-back {
  display: inline-block;
  background: url("../../../static/icon/sctp.png") no-repeat;
  background-size: 100%;
  background-position: 33.33333% 33.33333%;
  width: 50px;
  height: 50px;
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
.tech-center {
  margin: 0px 20px 10px 0;
  display: flex;
  justify-content: center;
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
  border: solid 1px green;
  background: url("../../../static/icon/Selected.png") no-repeat;
  background-size: 20px 20px;
  background-position: bottom right;
}

hr {
  border: .5px solid #f1f1f1
}
.image-text .el-dialog__body,
.image-text .el-dialog__header {
  padding: 0;
}
.image-text .el-dialog__header{
  height: 0;
}
.bgWhite .el-dialog__footer{
  margin-top: 0;
}
.image-text-header {
  overflow: hidden;
  width: 100%;
  /* height: 44px; */
  background: rgb(228, 225, 225);
  font-size: 16px;
  font-weight: bolder;
  line-height: 44px;
  padding: 0 20px;
}
.image-text-header p:nth-child(1) {
  float: left;
}
.image-text p:nth-child(2) {
  float: right;
}
.image-text p:nth-child(2) span {
  margin: 0 5px;
}
.image-text-body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
.image-border {
  width: 100%;
  /* background: rgb(182, 180, 180); */
  box-sizing: border-box;
  /* padding: 100px 20px; */
  margin: 10px 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
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
.imgList{
  /* width: 60px;
  height: 60px; */
  margin-top: 5px;
}
.upload-demo .el-upload-list__item-preview{
  display: none !important;
}
.el-icon-plus{
  text-align: center;
  font-size: 20px;
}
.el-upload--picture{
  width: 100%;
}
.el-upload-list{
  width: 100%;
  height: 100%;
}
.imgText .el-icon-plus{
  position: absolute;
  top: 0;
  line-height: 44px;
  right: 30px;
}
.tableSer{
  padding: 5px 10px;
  cursor: pointer;
  color: #6d8dfc
}
.tableSer:nth-of-type(3){
  color: red
}
.details{
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  line-height: 80px;
  padding-top: 30px;
}
.tabRight .bottimPro .el-form-item__content{
  /* margin-left: 0; */
  width: 100%;
  display: flex;
  justify-content:center;
}
.tabRight .bottimPro .el-form-item__content input:nth-child(2){
  margin-left: 30px;
}
.custom{
  width: 100%;
  height: 36px;
  border: 1px solid #bfcbd9;
}
.custom span{
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
.labelName .el-dialog--small{
  width: 30%;
}
.labelName .el-dialog__header,.systemLabel .el-dialog__header{
  padding: 0 0 0 10px;
  height: 40px;
  background: #dddcdc;
  line-height: 40px;
}
.labelName .el-form-item__label{
  width: 80px;
  text-align: center;
}
.labelName .el-form-item__content{
  margin-left: 90px;
}
.labelName .dialog-footer,.systemLabel .dialog-footer{
  display: flex;
  justify-content: center;
}
.labelName .dialog-footer input:nth-child(2),.systemLabel .dialog-footer input:nth-child(2){
  margin-left: 20px;
}
.labelName .el-dialog__body{
  padding: 30px 20px 10px 20px;
}
.systemLabel .el-dialog__body{
  padding-top:0; 
}
.labelList{
  width:100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #bfcbd9;
  border-top: 0;
}
.labelList span{
  display: inline-block;
  border: 1px solid #bfcbd9;
  padding: 0 10px;
  border-radius: 20px;
  line-height: 20px;
  margin-right: 10px;
}
.labelList span i{
  font-size: 1px;
  margin-left: 5px;
}
.systemLabel ul{
  width: 23%;
  float: left;
  height: 300px;
  overflow-y: auto;
  border: 1px solid  #E8E8E8;
}
.systemLabel ul:nth-of-type(2){
  border-left:0;
}
.systemLabel ul:nth-of-type(3){
   border-left: 0;
}
.systemLabel ul li{
  width:100%;
  padding: 0 5px;
  height: 29px;
  border-bottom: 1px dashed  #E8E8E8;
  line-height: 29px;
  list-style: none
}
.systemLabel ul li i{
  float: right;
  line-height: 29px;
  width: 10%;
  color: #BEBEBE
}
.labelSystem{
  float: left;
  border: 1px solid rgb(190, 187, 187);
  width: 31%;
  height: 300px;
  border-left: 0;
}
.labelSystem input{
  background: #fff;
  padding: 0 10px 0 5px;
  float: left;
  display: block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid rgb(190, 187, 187);
  margin: 5px;
  /* width: 95%; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.activeSystem_1,.activeSystem_2,.activeSystem_3{
  background: #e0f1fb;
}
.already{
  height: 50px;
  line-height: 50px;
}
.already span{
  border: 1px solid #E8E8E8;
  padding: 5px;
  margin-right: 5px;
}
.already span i{
  font-weight: bolder;
  margin-left: 5px;
}
.cursor{
    cursor: pointer;
}
.projectLabel{
  width: 90%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
.labelDav .el-form-item__label{
  padding-right: 0;
}

</style>