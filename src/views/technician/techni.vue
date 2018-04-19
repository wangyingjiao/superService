<template>
  <div class="tech">
    <div class="tech-index">
      <div class="serch-box">
        <div class="serch-input">
			<el-select class="search" v-model="techniSearch.orgId" filterable placeholder="选择机构" @change="orgNameChange(techniSearch.orgId)">
                <el-option v-for="item in organizations" :key="item.id" :label="item.name" :value="item.id"></el-option>	
            </el-select>
          <el-select class="search" filterable v-model="techniSearch.stationId" clearable placeholder="选择服务站">
            <el-option v-for="(item,index) in server" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="techniSearch.jobNature" clearable placeholder="岗位性质" class="search">
              <el-option v-for="(item,key) in station" :key="key" :label="item" :value="key">
              </el-option>
          </el-select>

          <el-input v-model.trim ="chooContent" placeholder="输入要搜索的内容" class="search searchHeader">
              <el-select  v-model="techniSearch.chooses" clearable placeholder="请选择"  slot="prepend">
                <el-option v-for="item in choose" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
          </el-input>

           <button class="search-button el-icon-search btn_search btn-color serch-btn" @click="techniSearchs"> 搜索</button>
      </div>
      <!-- <div class="serch-btn">
        <button class="search-button el-icon-search btn_search btn-color" @click="techniSearchs"> 搜索</button>
      </div> -->
      </div>
      <div class="serch-ski">
        <!-- <el-form-item label="选择技能：" prop="skillIds"> -->
          <el-row>
            <el-col :span="10">
              <el-select v-model="roomSel2Arr" multiple placeholder="请选择技能" class="search" filterable >
                <el-option
                v-for="(item,index) in sexTypeo"
                :key="index"
                :label="item.name"
                :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
      </div>
    </div>
    <div class="tech-section">
      <div class="tech-section-right">
        <button class="button-small  btn_pad btn-color" style="margin:0px" v-if="btnShow.indexOf('techni_insert') > -1"  @click="handleCreate">新增</button>
      </div>
    <p class="p-show" v-show="techniList.length<=0 && !listLoadingTech">暂无数据</p>
    <div v-loading="listLoadingTech"
    element-loading-text="正在加载"  class="projectTabel listTechni">
      <ul class="tech-section-ul">
        <li v-for="(item,$index) of techniList" v-on:mouseover="mouser(item,$index)" v-on:mouseout="mousout(item,$index)" :key="$index">
          <div class="tech-xiu-div">
            <div class="tech-xiu-div-one">
              <div class="headImag"><img  :src="imgSrc+item.headPic+picWidth100" alt=""></div>
              <div class="tech-mouse-div">
                <span class="tech-mouse">{{item.jobName}}</span>
                <span class="tech-mouse">{{item.jobStateName}}</span>
              </div>
            </div>
            <div class="tech-xiu-div-two">
              <h4 class="header-h4">{{item.name}}</h4>
              <div>
                  <img src="../../../static/icon/性别年龄.png" alt="" >              
                  <div class="sexAge">{{item.sexname+' '+item.age+"岁"}}</div>
              </div>
              <div>
                <img src="../../../static/icon/服务站.png" alt="" >              
                <div class="sexAge">{{item.stationName}}</div>
              </div>
              <div>
                <img src="../../../static/icon/工龄.png" alt="" >              
                <div class="sexAge">{{item.workTimeName}}</div>
              </div>
              <div>
                <img src="../../../static/icon/电话.png" alt="" style="padding:0 2px">              
                <div class="sexAge">{{item.phone}}</div>
              </div>
            </div>
          </div>
          <!-- 鼠标移入 --> 
          <div class="tech-section-ul-posi" v-show="item.ismouse">
            <div class="mousehover" v-on:mouseover.prevent="dataDetails1" v-on:mouseout.prevent="hiddenDetail1"  @click="appPassword(item)" v-if="btnShow.indexOf('techni_app') > -1">
             <div class="flip-container" v-on:mouse="this.classList.toggle('hover');">
                <div class="flipper">
                  <div class="front">
                    <img src="../../../static/icon/密码.png" alt="">
                  </div>
                  <div class="back">
                    <img src="../../../static/icon/密码hov.png">
                  </div>
                </div>
              </div>
              
             
            </div>
            <div v-on:mouseover.prevent="dataDetails2" v-on:mouseout.prevent="hiddenDetail2" v-if="item.jobName=='全职' && btnShow.indexOf('techni_holiday') > -1 && item.jobStatus!='leave'" class="mousehover"  @click="vacation(item)">
              <div class="flip-container" v-on:mouse="this.classList.toggle('hover');">
                <div class="flipper">
                  <div class="front">
                    <img src="../../../static/icon/休假.png" alt="">
                  </div>
                  <div class="back">
                    <img src="../../../static/icon/休假hov.png">
                  </div>
                </div>
              </div>
             
            </div>
            <div class="mousehover" v-on:mouseover.prevent="dataDetails3" v-on:mouseout.prevent="hiddenDetail3"  @click="technician(item)" v-if="btnShow.indexOf('techni_update') > -1">
             <div class="flip-container" v-on:mouse="this.classList.toggle('hover');">
                <div class="flipper">
                  <div class="front">
                    <img src="../../../static/icon/修改.png" alt="">
                  </div>
                  <div class="back">
                    <img src="../../../static/icon/修改hov.png">
                  </div>
                </div>
              </div>

            </div>
            <div class="mousehover" v-on:mouseover.prevent="dataDetails4" v-on:mouseout.prevent="hiddenDetail4"  @click="techDelete(item)" v-if="btnShow.indexOf('techni_delete') > -1">
              <div class="flip-container" v-on:mouse="this.classList.toggle('hover');">
                <div class="flipper">
                  <div class="front">
                    <img src="../../../static/icon/删除.png" alt="">
                  </div>
                  <div class="back">
                    <img src="../../../static/icon/删除hov.png">
                  </div>
                </div>
              </div>

            </div>
          </div>
        </li>
      </ul>
    </div>

       <!-- </el-table> -->
    <!-- 密码弹出层 -->
      <el-dialog title="设置技师APP端登录密码" :close-on-click-modal="false" :visible.sync="password" custom-class="tech-section-lages tect-pass" style="top：10%">
        <div class="mobel">
          <p>手机：</p>
          <p>{{passwordModule}}</p>
        </div>
        <div class="passBox">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="设置密码：" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码长度为6-10位,同时包含字母与数字"></el-input>
            </el-form-item>
            <el-form-item label="重复密码：" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <input type="button" class="button-large" style="margin-right:10px;" @click="passwordPrese('ruleForm2')" value="保存">
                <input type="button" class="button-cancel" @click="passwordCancel('ruleForm2')" value="取消">
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    <!-- 休息弹出层 -->
      <el-dialog title="休假" :visible.sync="flags" :close-on-click-modal="false" custom-class="tech-section-lages tech-vacation" style="top:10%;">
        <ul class="tech-section-xiu">
          <li class="mobel">
            <p>姓名:</p>
            <p>{{vacationName}}</p>
          </li>
        </ul>
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="开始时间:" required>
                <el-col :span="11">
                  <el-form-item prop="startDate">
                    <el-date-picker type="date" placeholder="选择日期" 
                    v-model="ruleForm.startDate" style="width: 100%;" :editable='false' format="yyyy-MM-dd" @change="startDateChange" :picker-options="pickerOptionsTech"
                   ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="startTime">
                    	<el-time-select
                          :editable='false'
                          v-model="ruleForm.startTime"
                          :picker-options="timeFlag?{
                            start: '00:00',
                            step: '00:30',
                            end: '24:00',
                            minTime:startEnd.startNew,
                            maxTime:startEnd.endNew
                          }:{
                            start: '00:00',
                            step: '00:30',
                            end: '24:00',
                            maxTime:startEnd.endNew
                          }"
                          placeholder="选择时间">
                      </el-time-select>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="结束时间:" required>
                <el-col :span="11">
                  <el-form-item prop="endDate">
                    <el-date-picker type="date" placeholder="选择日期" :editable='false' v-model="ruleForm.endDate" style="width: 100%;" format="yyyy-MM-dd" @change="endDateChange"
                        :picker-options="pickerOptionsTech"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="endTime">
                    <el-time-select
                          :editable='false'
                          v-model="ruleForm.endTime"
                          :picker-options="{
                            start: '00:00',
                            step: '00:30',
                            end: '24:00',
                            minTime:ruleForm.startTime || startEnd.startNew,
                            maxTime:startEnd.endNew
                          }"
                          placeholder="选择时间">
                    </el-time-select>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="备注:" prop="desc">
                 <el-col :span="21">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                 </el-col>
              </el-form-item>
          </el-form>
        </div>
          <div>
            <div style="display:flex;justify-content: center;width:100%">
              <button class="button-large" style="margin-right:10px;" @click="vacationPreser('ruleForm')">保存</button>
              <button class="button-cancel" @click="vacationCancel('ruleForm')">取消</button>
            </div>
          </div>
        <!-- </el-form> -->
      </el-dialog>
    <!-- 选择技能 -->
      <!-- <el-collapse-transition>
        <div class="tech-psoition" v-if="position">
          <div style="display:inline-block;margin-left:28px;" class="tech-positon-odvi">
            <div class="selfCheckBox positionbox" ref="sexOption" @click="roomSel2(item)" v-for="(item,$index) in sexTypeo" :class="{'tech-green':roomSel2Arr.indexOf(item.id)!=-1}" :key="$index">
              <el-tooltip placement="top" :disabled="item.name.length <= 5" :content="item.name">
                <span>{{item.name}}</span>
              </el-tooltip>
              <div :class="{'triangle-bottomright':item.show===true}"></div>
            </div>
          </div>
          <div class="tech-pos-btn">
            <button @click="hiddenDiv" class="button-large" style="margin-right:40px;">确定</button>
            <button @click="hiddenDiv" class="button-cancel btn-color-cancel">关闭</button>
          </div>
        </div>
      </el-collapse-transition> -->

    </div>
    <!-- 分页 -->
      <div v-show="!listLoading" class="pagination-container fy clearfix">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.sync"
          :page-sizes="[6,12,18,24]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    <!-- 编辑技师 -->
      <el-dialog title="编辑技师" :visible.sync="dialogVisibleEdit" custom-class="tech-section-lage" class="tech-edit" :close-on-click-modal="false">
        <techni-edit :areaOptions="areaOptions" :technicianData="technicianData" ref="techniEditDlog"
                      :sex="sex" :choose="Choose" :workyear="workyear" @dialogvisibleedit="dialogVisibleEditClick"
                      :station="station" :statu="statu" :sextypeo="sexTypeo" :sexTypes = "sexTypes"
                      :marriage="marriage" :education="education" :relation = "relation" @getlist="handleCurrentChange"
                      :listquer="listQuery" :servery="servery" :startend="startEnd" :organizations="organizations"
                      :dialogvisibleedit="dialogVisibleEdit"
                      ></techni-edit>
        <div slot="footer" class="dialog-footer selfFooter" style="text-align:center">
              <button class="button-cancel closeThe btn-color-cancel" @click="closeThef">关 闭</button>
          </div>
      </el-dialog>
    <!-- 弹出层 新增技师-->
      <el-dialog @close="handleClose('personal')" title="新增技师" :close-on-click-modal="false" :visible.sync="dialogVisible" custom-class="tech-section-lage" class="tech-qj">
        <div class="techniAdd techtabBox">
          <!-- 个人资料 -->
          <h3 class="tech-tc-prson">个人资料</h3>
          <el-form :model="personal"  ref="personal"  label-width="100px" :rules="rulesPer">
            <ul class="tech-ul">
              <!-- 新的 -->
                  <el-row :gutter="60">
                    <el-col :span="12">
                        <el-form-item label="姓名：" prop="name">
                            <el-input placeholder="请输入2~15位姓名" v-model="personal.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号：" prop="phone">
                            <el-input placeholder="请输入11位手机号" v-model="personal.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="性别：" prop="sex">
                            <el-select v-model="personal.sex" clearable placeholder="请选择" style="width:100%">
                                <el-option v-for="(item,key,index) in sex" :key="index" :label="item" :value="key">
                                </el-option>
                            </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="头像：" prop="headPic">
                            <el-upload
                                class="avatar-headPic"
                                :action="imgSrc"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload"
                                :http-request="(val)=>picUpload(val,'head')"
                                >
                                <img v-if="personal.headPic" :src=" imgSrc +personal.headPic+picWidth120">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <p style="width:100%; color:rgb(131,145,165); font-size:12px; line-height:35px">*为了浏览效果,建议上传大于240*240的正方形图片</p>
                        </el-form-item>
                    </el-col>  
                  </el-row>
                  <el-row :gutter="60">
                      <el-col :span="12">
                          <el-form-item label="现住地址：" prop="area">
                              <el-cascader
                              style="width:100%"
                                  @change="nowAdd"
                                  :options="areaOptions"
                                  :show-all-levels="true"
                                  v-model="personal.area"
                              ></el-cascader>
                          </el-form-item>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="出生日期：" required>
                              <el-form-item prop="birtStr">
                                  <el-date-picker
                                      :default-value="new Date('1960-01-01')"
                                      :editable='false'
                                      type="date" placeholder="选择日期" 
                                      v-model="personal.birtStr" 
                                      style="width:100%"
                                      format="yyyy-MM-dd"
                                      @change="dateChange"
                                      :picker-options="pickerOptions0"
                                      >
                                  </el-date-picker>
                              </el-form-item>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row :gutter="60">
                      <el-col :span="12">
                          <el-form-item prop="address">
                            <el-input placeholder="请输入6-100位详细地址" v-model="personal.address"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="民族：" class="seize">
                            <el-select v-model="personal.nation" filterable clearable placeholder="请选择" style="width:100%">
                                <el-option v-for="item in ethnics" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row :gutter="60">
                      <el-col :span="12">
                          <el-form-item label="身份证号：" prop="idCard">
                              <el-input placeholder="请输入正确的身份证号" v-model="personal.idCard"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="服务状态：" class="seize">
                              <el-switch
                                v-model="personal.status"
                                :width="100"
                                on-text="提供服务"
                                off-text="暂停服务"
                                on-value="yes"
                                off-value="no">
                              </el-switch>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <div class="idBox">
                      <!-- <el-col :span="6"> -->
                          <el-form-item label="身份证：">
                              <el-upload
                                  class="avatar-uploader"
                                  :action="imgSrc"
                                  :show-file-list="false"
                                  :http-request="(val)=>picUpload(val,'id')"
                                  :before-upload="beforeAvatarUpload"
                                  >
                                  <div class="upload-head"><span>上传正面</span></div>
                                  <img v-if="personal.idCardPicBefor" :src="imgSrc + personal.idCardPicBefor+picWidth300" class="avatar">
                              </el-upload>
                          </el-form-item>
                      <!-- </el-col> -->
                      <!-- <el-col :span="5"> -->
                          <!-- <el-form-item  label="身份证反面："> -->
                              <el-upload
                                  class="avatar-uploader"
                                  :action="imgSrc"
                                  :show-file-list="false"
                                  :http-request="(val)=>picUpload(val,'at')"
                                  :before-upload="beforeAvatarUpload"
                                  >
                                  <div class="upload-head"><span>上传反面</span></div>
                                  <img v-if="personal.idCardPicAfter" :src="imgSrc+personal.idCardPicAfter+picWidth300" class="avatar avatarBack">
                              </el-upload>
                          <!-- </el-form-item> -->
                      <!-- </el-col> -->
                  </div>
              <!-- 新的结束  -->
            
              
              <!-- 服务信息 -->
              <h3 class="tech-tc-prson">服务信息</h3>
              <ul class="tech-ul tech-service">
                <div style="overflow:hidden">
					<div class="server-left" style="margin-right:6%">
                      <el-form-item v-if="techUserType=='sys'" label="所属机构：" prop="orgId">
                        <el-select v-model="personal.orgId" filterable clearable placeholder="请选择" style="width:100%" @change="orderChange(personal.orgId)">
                            <el-option v-for="(item,index) in organizations" :key="index" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                      </el-form-item>
                  </div>
                  <div class="server-left">
                        <el-form-item label="所属服务站：" prop="stationId">
                          <el-select v-model="personal.stationId" filterable clearable placeholder="请选择" style="width:100%">
                              <el-option v-for="(item,index) in serveryAdd" :key="index" :label="item.name" :value="item.id">
                              </el-option>
                          </el-select>
                        </el-form-item>
                  </div>
                  <div class="server-right">
                      <el-form-item label="岗位状态：" prop="jobStatus">
                        <el-select v-model="personal.jobStatus" clearable placeholder="请选择" style="width:100%">
                          <el-option v-for="(item,key) in statu" :key="key" :label="item" :value="key">
                          </el-option>
                        </el-select>
                      </el-form-item>
                  </div>
                  <div class="server-left">
					            <el-form-item label="工作年限：" prop="workTime">
                            <el-select v-model="personal.workTime" clearable placeholder="请选择" style="width:100%">
                              <el-option v-for="(item,key) in workyear" :key="key" :label="item" :value="key">
                              </el-option>
                            </el-select>
                      </el-form-item>
                  </div>
                </div>


                <!-- <el-row :gutter="60">
                    <el-col :span="12">
                      <el-form-item label="所属服务站：" prop="stationId">
                            <el-select v-model="personal.stationId" filterable clearable placeholder="请选择" style="width:100%">
                                <el-option v-for="(item,index) in servery" :key="index" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="岗位状态：" prop="jobStatus">
                            <el-select v-model="personal.jobStatus" clearable placeholder="请选择" style="width:100%">
                              <el-option v-for="(item,key) in statu" :key="key" :label="item" :value="key">
                              </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="12">
                      <el-form-item label="工作年限：" prop="workTime">
                          <el-select v-model="personal.workTime" clearable placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,key) in workyear" :key="key" :label="item" :value="key">
                            </el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <el-row>
                  <el-col :span="17">
                      <el-form-item label="选择技能：" prop="skillIds">
                        <el-select v-model="personal.skillIds" multiple placeholder="请选择技能" style="width:100%" filterable >
                          <el-option
                          v-for="(item,index) in sexTypeoAdd"
                          :key="index"
                          :label="item.name"
                          :value="item.id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="17">
                      <el-form-item label="岗位性质：" prop="jobNature">
                            <el-select v-model="personal.jobNature" clearable placeholder="请选择" style="width:100%" @change="jobNatureTable">
                                <el-option v-for="(item,key) in station" :key="key" :label="item" :value="key">
                                </el-option>
                            </el-select>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="personal.jobNature!='part_time'">
                  <el-col :span="17" class="addTime">
                    <el-form-item label="工作时间：" prop="workTimes">
                          <div class="tech-order-jn" style="width:100%">
                            <span class="tech-order-btn" @click="addtime"> &#10010; 添加时间</span>
                          </div>
                          <el-collapse-transition>
                              <div class="tech-order-jn-sons wirkTimes" v-show="isB">
                                <div style="margin:0 10px;">
                                  <p style="padding:10px 0;">新增日期</p>
                                  <div>

                                    <div style="display:flex;">
                                      <div class="selfCheckBoxsday">日期</div>
                                      <input type="button" class="selfCheckBoxs tech-order-posis"
                                        :disabled="disbArr.indexOf(item.id)!=-1" ref="sexOption" 
                                        @click="roomSel1(item)" :key="$index" v-for="(item,$index) in sexDay" 
                                        :class="[{'tech-green':roomSelNum.indexOf(item.id)!=-1},{'tech-dir':disbArr.indexOf(item.id)!=-1}]"
                                        :value="item.name"
                                      >
                                    </div>
                                  </div>
                                  <div style="margin-top:10px;">
                                    <div class="selfCheckBoxsday">时段</div>
                                    <el-time-select placeholder="起始时间" @change="endEmpty" :editable="false" v-model="startTime" :picker-options="addtimeFlag?{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '24:00',
                                        minTime:startEnd.startNew,
                                        maxTime:startEnd.endNew 
                                      }:{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '24:00',
                                        maxTime:startEnd.endNew 
                                      }" class="tech-daytim">
                                    </el-time-select>
                                    <el-time-select placeholder="结束时间" :editable="false" v-model="endTime" :picker-options="{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '24:00',
                                        minTime:startTime || startEnd.startNew,
                                        maxTime:startEnd.endNew
                                      }">
                                    </el-time-select>
                                  </div>
                                </div>
                                <div style="margin:10px 10px 10px;">
                                  <span class="button-large btn-styl" @click="techClick">确认</span>
                                  <input type="button" class="button-cancel btn-styl" style="margin-left:20px" @click="addtimeno" value="取消">
                                </div>
                              </div>
                          </el-collapse-transition>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="17" v-show="teachArr.length>0">
                      <el-form-item>
                        <ul class="working" style="width:100%">
                          <li v-for="(item,index) in teachArr" :key="index">
                            <div>
                              <div class="woking-div">
                                <div><span v-for="(data,i) in item.weeks" :key="i">{{data.name+"、"}}</span></div>
                                <div class="time">{{item.startTime+"~"+item.endTime}}</div>
                              </div>
                            </div>
                            <div>
                              <i class="i-delete el-icon-close" @click="deletes(item,index)"></i>
                            </div>
                          </li>
                        </ul>
                      </el-form-item>
                    </el-col>
                </el-row>
              </ul>
          </ul>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer selfFooter" style="text-align:center;">
            <button  class="btn-color button-large" @click="submitFormPer('personal')" :disabled="btnState">保存</button>
            <button class="button-cancel btn-color-cancel" @click="handleClose('personal')">取消</button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import {
  addTech,
  getTech,
  getStrong,
  getHeight,
  getMatrimony,
  ChooseTheCity,
  serviceStation,
  Technician,
  technicianEditId,
  technicianDelete,
  appPassWord,
  addVacation,
  serviceTechnicianInfo,
  listDataAll,
  listByOffice,
  listByOrgId
} from "@/api/tech";
import { getSign } from "@/api/sign";
import techniEdit from "./techniEdit.vue";
import { userType} from '../../utils/auth'
// import { Whether } from "@/api/serviceManage";
import Cookies from "js-cookie";

let listByOrgIdData = (item)=>{
  return new Promise((resolve,reject)=>{
     listByOrgId({orgId:item}).then(({data})=>{
        resolve(data.data)
      }).catch(error=>{
        console.log(error,"errorppppppppp")
      })
  })
}

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
      if (value) {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("密码长度为6-10位，同时包含字母与数字"));
        }
      } else {
        callback(new Error("请输入密码"));
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //身份证号
    var TECHIDCARD = (rule, value, callback) => {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (value) {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("身份证号格式错误"));
        }
      } else {
        callback(new Error("请输入身份证号"));
      }
    };
    //手机号
    var TECHPHONE = (rule, value, callback) => {
      var reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if (value) {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("手机号码有误，请重填"));
        }
      } else {
        callback(new Error("请输入手机号"));
      }
    };
    //现住地址
    var ADDRESS = (rule, value, callback) => {
      if (this.personal.area != undefined && this.personal.area.length > 0) {
        callback();
      } else {
        callback(new Error("请选择现住地址"));
      }
    };
    //选择技能
    var SKILLIDS = (rule, value, callback) => {
      if (value.length > 0) {
        callback();
      } else {
        callback(new Error("请选择技能"));
      }
    };
    //工作时间
    var WORKTIMES = (rule, value, callback) => {
      if (this.teachArr.length > 0 && this.teachArr != undefined) {
        callback();
      } else {
        callback(new Error("请选择工作时间"));
      }
    };
    //头像图片
    var HEADPIC = (rule, value, callback) => {
      if (
        this.personal.headPic.length > 0 &&
        this.personal.headPic != undefined
      ) {
        callback();
      } else {
        callback(new Error("请上传头像"));
      }
    };

    //休假结束日期
    var ENDDATE = (rule, value, callback) => {
      var t1 = Date.parse(this.ruleForm.startDate);
      var t2 = Date.parse(value);
      var c1 = Date.parse("2008-08-08 " + this.ruleForm.startTime);
      var c2 = Date.parse("2008-08-08 " + this.ruleForm.endTime);
      if (value) {
        if (t2 >= t1) {
          if (t2 == t1) {
            if (c2 > c1) {
              callback();
            } else {
              callback(new Error("结束时间不能小于开始时间"));
            }
          } else {
            callback();
          }
        } else {
          callback(new Error("结束时间不能小于开始时间"));
        }
      } else {
        callback(new Error("请选择结束日期"));
      }
    };

    return {
      serveryAdd:[],
      startEnd: { start: "09:00", end: "18:00" },
      btnState: false,
      timeFlag: true,
      addtimeFlag: true,
      pageNumber: "",
      //搜索
      techniSearch: {
        stationId: "",
        jobNature: "",
        skillIds: [],
		chooses: "name",
		orgId:''
	  },
	  organizations:[],
      ruleForm: {
        startTime: "",
        startDate: "",
        endTime: "",
        endDate: "",
        desc: ""
      },
      rules: {
        startTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        endDate: [{ required: true, validator: ENDDATE, trigger: "change" }],
        startDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        endTime: [{ required: true, message: "请选择时间", trigger: "change" }],
        desc: [
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ]
      },
      ruleForm2: {
        pass: "",
        checkPass: ""
      },
      rules2: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      // 个人资料验证
      personal: {
        orgId:'',//服务机构
        name: "", //姓名
        idCard: "", //身份证
        phone: "", //手机
        sex: "", //性别
        address: "", //详细地址
        nation: "", //民族
        birthDate: "", //生日
        birtStr: "", //生日  假的
        jobNature: "", //岗位性质
        stationId: "", //
        jobStatus: "", //岗位状态
        workTime: "", //工作年限
        skillIds: [], //技能List
        area: [],
        status: "yes", //状态
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区
        idCardPicBefor: "", //身份证照片
        idCardPicAfter: "", //身份证反面
        headPic: "", //头像
        workTimes: [
          //工作时间
          { startTime: "", endTime: "", weeks: [] } //开始时间,结束时间，星期几
        ]
      },
      Choose: [],
      mouserFlag: false,
      rulesPer: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        // 身份证
        idCard: [{ required: true, validator: TECHIDCARD, trigger: "blur" }],
        //手机号
        phone: [{ required: true, validator: TECHPHONE, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birtStr: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        jobNature: [
          { required: true, message: "请选择岗位性质", trigger: "change" }
        ],
        stationId: [
          { required: true, message: "请选择服务站", trigger: "change" }
        ],
        jobStatus: [
          { required: true, message: "请选择岗位状态", trigger: "change" }
        ],
        workTime: [
          { required: true, message: "请选择工作年限", trigger: "change" }
        ],
        skillIds: [{ required: true, validator: SKILLIDS, trigger: "change" }],
        orgId:[{required: true, message: "请选择机构", trigger: "change"}],
        area: [{ required: true, validator: ADDRESS, trigger: "change" }],
        workTimes: [{ required: true, validator: WORKTIMES, trigger: "blur" }],
        headPic: [{ required: true, validator: HEADPIC, trigger: "blur" }],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          {
            min: 6,
            max: 100,
            message: "请输入6~100位详细地址",
            trigger: "blur"
          }
        ]
      },
      server: [],
      infoname: [],
      chooContent: "",
      servery: [],
      marriage: {},
      station: {},
      choose: [
        {
          value: "name",
          label: "姓名"
        },
        {
          value: "phone",
          label: "手机"
        }
      ],
      sex: {},
      ethnics: [],
      passwordModule: "",
      strong: {},
      statu: {},
      education: {},
      height: [],
      place: [],
      workyear: {},
      technicianData: [],
      sexTypes: {},
      sexTypeo: [],
      sexTypeoAdd:[],
      sexDay: [
        {
          name: "星期一",
          id: 1
        },
        {
          name: "星期二",
          id: 2
        },
        {
          name: "星期三",
          id: 3
        },
        {
          name: "星期四",
          id: 4
        },
        {
          name: "星期五",
          id: 5
        },
        {
          name: "星期六",
          id: 6
        },
        {
          name: "星期日",
          id: 7
        }
      ],
      relation: {},
      key: false,
      isA: false,
      passwordId: null,
      isB: false,
      isTab: false,
      sexLen: "",
      flagso: false,
      flags: false,
      password: false,
      flage: false,
      tableKey: "",
      textarea3: "",
      radio8: "1",
      workyears: "",
      status: "",
      area: [],
      techniList: [],
      vacationName: "",
      strongs: "",
      roomSel2Arr: [],
      heights: "",
      ethnic: "",
      chooses: "",
      startTime: "09:00",
      endTime: "05:00",
      startTimes: "",
      endTimes: "",
      position: false,
      listLoading: false,
      picFile: [],
      listLoadingTech: true,
      list: [1, 2, 3],
      total: null,
      listLoading: false,
      roomSel1Arr: [],
      disbArr: [],
      roomSelNum: [],
      teachArr: [],
      listQuery: {
        page: 1,
        limit: 12,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
        sync: 1
      },
      dialogVisible: false,
      dialogVisibleEdit: false,
      storeEnd: {
        endDate: "",
        storeDate: ""
      },
      hoverState1: true,
      hoverState2: true,
      hoverState3: true,
      hoverState4: true
    };
  },
  components: {
    techniEdit
  },
  computed: {
    pickerOptions0() {
      var data = new Date();
      var year = data.getFullYear();
      var month = data.getMonth() + 1;
      var day = data.getDate();
      var str = year + "," + month + "," + day;
      var time1 = Date.parse(new Date("1950,1,1"));
      var time2 = Date.parse(new Date(str));
      return {
        disabledDate(time) {
          return time.getTime() < time1 || time.getTime() > time2;
        }
      };
    },
    
    pickerOptionsTech() {
      //当前时间
      // var data = new Date();
      // var year = data.getFullYear();
      // var month = data.getMonth() + 1;
      // var day = data.getDate();
      // var str = year + "," + month + "," + day;
      //前2个月
      var dt = new Date();
      dt.setMonth(dt.getMonth() - 3);
      var dtstr = dt.toLocaleString();
      var dtarr = dtstr.split(" ")[0].split("/");
      var time2 = Date.parse(new Date(dtarr[0], dtarr[1], dtarr[2]));
      return {
        disabledDate(time) {
          return time.getTime() < time2;
        }
      };
    },
    techUserType(){
      return userType()
    },
    //权限
    btnShow() {
      return JSON.parse(localStorage.getItem("btn"));
    },
    areaOptions() {
      return this.$store.state.user.area;
    },
    sign: function() {
      return getSign();
    },
    //开始时间
    startEndTime() {
      var t1 = Date.parse("2008-08-08 " + "09:00");
      var tt = t1 - 1800000;
      var str = new Date(tt);
      var start = str.toLocaleString().replace(/:\d{1,2}$/, " ");
      if (start.length == 17) {
        var startTime = start.substring(start.length - 6, start.length);
      } else {
        var startTime = start.substring(start.length - 5, start.length);
      }
      return startTime;
    },
    //结束时间
    suspendEndTime() {
      var t1 = Date.parse("2008-08-08 " + "12:00");
      var tt = t1 + 1800000;
      var str = new Date(tt);
      var start = str.toLocaleString().replace(/:\d{1,2}$/, " ");
      if (start.length == 17) {
        var startTime = start.substring(start.length - 6, start.length);
      } else {
        var startTime = start.substring(start.length - 5, start.length);
      }
      return startTime;
    }
  },
  methods: {
    listByOrgIdData(item){
      return new Promise((res,rej)=>{
          listByOrgIdData(item).then(data=>{
            res(data)
          }).catch(error=>{
            rej(error)
          })
      })
    },
    orderChange(item){
      this.personal.stationId = ''
      if(this.personal.skillIds.length>0){
        this.personal.skillIds = []
      }
      if(item){
        this.listByOrgIdData(item).then(data=>{
          this.serveryAdd = data.stations
          this.sexTypeoAdd =  data.skils
        })
      }
    },
    orgNameChange(item){
      // if(this.techUserType=='station' || this.techUserType=='org'){
      //    return
      // }
      this.techniSearch.stationId = ''
      this.roomSel2Arr = []
      this.listByOrgIdData(item).then(data=>{
            this.server = data.stations
            this.sexTypeo = data.skils
            this.servery = data.stations
      })
    },
    //机构
    listDataAll(){
      return new Promise((resolve,reject)=>{
         listDataAll({}).then(({data})=>{
           console.log(data.data,"data------")
            let list = data.data.list
            if(list[0].id=='0'){
              list = list.slice(1)
            }
          resolve(list)
        }).catch(error=>{
          resolve(error)
        })
      })
    },
    endEmpty() {
      if (this.startTime != this.startEnd.start) {
        this.endTime = "";
      }
    },
    closeThef() {
      this.$refs["techniEditDlog"].closeThe();
      // this.techniSearchs()
    },
    //鼠标滑过
    dataDetails1(a) {
      this.hoverState1 = false;
    },
    hiddenDetail1(val) {
      this.hoverState1 = true;
    },
    dataDetails2(a) {
      this.hoverState2 = false;
    },
    hiddenDetail2(val) {
      this.hoverState2 = true;
    },
    dataDetails3(a) {
      this.hoverState3 = false;
    },
    hiddenDetail3(val) {
      this.hoverState3 = true;
    },
    dataDetails4(a) {
      this.hoverState4 = false;
    },
    hiddenDetail4(val) {
      this.hoverState4 = true;
    },
    //全职兼职切换
    jobNatureTable() {
      if (this.personal.jobNature == "part_time") {
        this.roomSelNum = [];
        this.roomSel1Arr = [];
        this.teachArr = [];
        // this.roomSelNum = [];
        this.disbArr = [];
      }
    },
    beforeAvatarUpload(file) {
      if (
        file.type == "image/jpg" ||
        file.type == "image/png" ||
        file.type == "image/jpeg"
      ) {
      } else {
        this.$message.error("请上传正确的图片格式");
        return false;
      }
    },
    //新增按钮
    handleCreate() {
      this.dialogVisible = true;
      this.personal.status = "yes";
      //服务时间
      this.serviceTech();
      //所属服务站
      var stationLocal = localStorage.getItem("station");
      var stationObj = JSON.parse(stationLocal);
      // this.personal.stationId = stationObj.id != 0 ? stationObj.id : "";     //待处理
      // serviceStation({})
      //   .then(data => {
      //     var stationLocal = localStorage.getItem("station");
      //     var stationObj = JSON.parse(stationLocal);
      //     // var obj = data.data.data;
      //     this.servery = stationObj.id != 0 ? obj : obj.slice(1);
      //     this.personal.stationId = stationObj.id != 0 ? stationObj.id : "";
      //   })
      //   .catch(error => {});
    },
    picUpload(file, flag) {
      var type = file.file.name.split(".");
      let pro = new Promise((resolve, rej) => {
        var res = JSON.parse(Cookies.get("sign"));
        var timestamp = Date.parse(new Date()) / 1000;
        if (res.expire - 3 > timestamp) {
          resolve(res);
        } else {
          this.$http.get("/apiservice/oss/getSign").then(res => {
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
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var s = date.getTime();
        ossData.append("name", file.file.name);
        ossData.append(
          "key",
          data.dir +
            "/" +
            y +
            "/" +
            m +
            "/" +
            d +
            "/" +
            s +
            "." +
            type[type.length - 1]
        );
        ossData.append("policy", data.policy);
        ossData.append("OSSAccessKeyId", data.accessid);
        ossData.append("success_action_status", 201);
        ossData.append("signature", data.signature);
        // 添加文件
        ossData.append("file", file.file, file.file.name);
        that.$http
          .post(data.host1, ossData, {
            headers: {
              "Content-Type": "multipart/form-data; boundary={boundary}"
            }
          })
          .then(res => {
            if (flag == "head") {
              this.personal.headPic = ossData.get("key");
              // this.$refs['personal'].validate(valid => {})  //验证头像
            } else if (flag == "at") {
              this.personal.idCardPicAfter = ossData.get("key");
            } else {
              this.personal.idCardPicBefor = ossData.get("key");
            }
          })
          .catch(error => {
            if (flag == "head") {
              this.personal.headPic = ossData.get("key");
            } else if (flag == "at") {
              this.personal.idCardPicAfter = ossData.get("key");
            } else {
              this.personal.idCardPicBefor = ossData.get("key");
            }
            return false;
          });
      });
    },
    //搜索
    techniSearchs(page, size) {
      console.log(2)
      var _page = typeof page == "string" ? page : this.listQuery.page;
      var _size = size || this.listQuery.limit;
      this.listQuery.sync = 1;
      var obj = {};
      console.log(this.techniSearch.orgId,"this.techniSearch.orgName----")
      if(this.techniSearch.orgId){
        obj.orgId = this.techniSearch.orgId
      }
      if (this.techniSearch.stationId) {
        obj.stationId = this.techniSearch.stationId;
      }
      if (this.techniSearch.jobNature) {
        obj.jobNature = this.techniSearch.jobNature;
      }
      if (this.techniSearch.chooses) {
        obj[this.techniSearch.chooses] = this.chooContent;
      }
      if (!(this.roomSel2Arr === undefined || this.roomSel2Arr.length == 0)) {
        obj.skillIds = this.roomSel2Arr;
      }
      this.getList(_page, _size, obj,'sear');
    },
    startDateChange(val) {
      this.storeEnd.storeDate = val;
    },
    endDateChange(val) {
      this.storeEnd.endDate = val;
    },
    //休假取消
    vacationCancel(formName) {
      this.$refs[formName].resetFields();
      this.flags = false;
    },
    //休假保存
    vacationPreser(formName) {
      var t1 = this.ruleForm.startTime;
      var t2 = this.ruleForm.endTime;
      var c1 = Date.parse("2008-08-08 " + t1);
      var c2 = Date.parse("2008-08-08 " + t2);
      this.$refs[formName].validate(val => {
        if (val) {
          var obj = {};
          obj.techId = this.passwordId;
          obj.endTime =
            this.storeEnd.endDate + " " + this.ruleForm.endTime + ":00";
          obj.startTime =
            this.storeEnd.storeDate + " " + this.ruleForm.startTime + ":00";
          obj.remark = this.ruleForm.desc;
          addVacation(obj)
            .then(data => {
              if (data.data.code == 1) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.vacationCancel("ruleForm");
              } else {
              }
            })
            .catch(error => {
              return false;
            });
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
    //休假
    vacation(item) {
      serviceTechnicianInfo()
        .then(data => {
          this.startEnd = data.data.data;
          if (this.startEnd.end == "23:59") {
            this.startEnd.end = "24:00";
          }
          if (this.startEnd.start == "00:00") {
            this.timeFlag = false;
          } else {
            this.timeFlag = true;
          }
          if (this.startEnd.endNew.slice(0, 2) == "00") {
            if (this.startEnd.endNew == "00:00") {
              this.startEnd.endNew = "24:00";
            } else {
              this.startEnd.endNew = "24:10";
            }
          }

          this.ruleForm.startTime = data.data.data.start;
          this.ruleForm.endTime = data.data.data.end;
        })
        .catch(error => {});
      this.flags = true;
      this.passwordId = item.id;
      this.vacationName = item.name;
    },
    //修改密码取消
    passwordCancel(formName) {
      this.$refs[formName].resetFields();
      this.password = false;
    },
    //修改密码保存
    passwordPrese(formName) {
      this.$refs[formName].validate(val => {
        if (val) {
          appPassWord({
            id: this.passwordId,
            appLoginPassword: this.ruleForm2.checkPass
          })
            .then(data => {
              if (data.data.code == 1) {
                this.$message({
                  message: data.data.data,
                  type: "success"
                });
                this.passwordCancel("ruleForm2");
                this.password = false;
              } else {
              }
            })
            .catch(error => {
              this.$message.error(data.data.data);
              return false;
            });
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
    //修改app密码
    appPassword(item) {
      this.passwordModule = item.phone;
      this.password = true;
      this.passwordId = item.id;
    },

    // 服务机构时间
    serviceTech() {
      serviceTechnicianInfo()
        .then(data => {
          this.startEnd = data.data.data;
          if (this.startEnd.end == "23:59") {
            this.startEnd.end = "24:00";
          }
          if (this.startEnd.endNew.slice(0, 2) == "00") {
            if (this.startEnd.endNew == "00:00") {
              this.startEnd.endNew = "24:00";
            } else {
              this.startEnd.endNew = "24:10";
            }
          }
          if (this.startEnd.start == "00:00") {
            this.addtimeFlag = false;
          } else {
            this.addtimeFlag = true;
          }
          this.startTime = data.data.data.start;
          this.endTime = data.data.data.end;
        })
        .catch(error => {});
    },

    //技师编辑获取ID
    technician(item) {
      this.listLoadingTech = true;
      technicianEditId({ id: item.id })
        .then(data => {
          if (data.data.code == 1) {
            this.listLoadingTech = false;
            this.technicianData = data.data.data;
            this.dialogVisibleEdit = true;
          } else {
            this.listLoadingTech = false;
          }
        })
        .catch(error => {
          this.$message({
            message: data.data.data,
            type: "error"
          });
          this.listLoadingTech = false;
          return false;
        });

      this.serviceTech();

      //所属服务站
      // serviceStation({})
      //   .then(data => {
      //     var stationLocal = localStorage.getItem("station");
      //     var stationObj = JSON.parse(stationLocal);
      //     var obj = data.data.data;
      //     this.servery = stationObj.id != 0 ? obj : obj.slice(1);
      //   })
      //   .catch(error => {});
    },
    //现住地址
    nowAdd(val) {
      this.personal.provinceCode = val[0]; //省
      this.personal.cityCode = val[1]; //市
      this.personal.areaCode = val[2]; //区
    },
    handleClose(formName) {
      this.personal.orgId = ''
      this.$refs[formName].resetFields();
      this.personal.address = "";
      this.personal.nation = "";
      this.personal.idCardPicBefor = "";
      this.personal.idCardPicAfter = "";
      this.personal.headPic = "";
      this.teachArr = [];
      this.teachArr = [];
      this.roomSelNum = [];
      this.disbArr = [];
      this.addtimeno();
      this.dialogVisible = false;
    },
    // 工作时间删除
    deletes(item, index) {
      this.disbArr = [];
      // this.roomSelNum = [];
      var arr = [].concat(this.teachArr);
      arr.splice(index, 1);
      this.teachArr = arr;
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].weeks.length; j++) {
          this.disbArr.push(arr[i].weeks[j].id * 1);
          // this.roomSelNum.push(arr[i].weeks[j].id * 1);
        }
      }
      // this.teachArr.splice(index, 1);
    },
    handleCurrentChange(val) {
      if (val != null || val != undefined) {
        this.listQuery.page = val;
      }
      this.pageNumber = val;

      var obj = {};
      if (this.techniSearch.stationId) {
        obj.stationId = this.techniSearch.stationId;
      }
      if (this.techniSearch.jobNature) {
        obj.jobNature = this.techniSearch.jobNature;
      }
      if (this.techniSearch.chooses) {
        obj[this.techniSearch.chooses] = this.chooContent;
      }
      if (!(this.roomSel2Arr === undefined || this.roomSel2Arr.length == 0)) {
        obj.skillIds = this.roomSel2Arr;
      }

      if(this.techniSearch.orgId){
        obj.orgId = this.techniSearch.orgId
      }

      if (
        this.techniSearch.skillIds === undefined ||
        this.techniSearch.skillIds.length == 0
      ) {
        delete this.techniSearch.skillIds;
      }
      // obj.orgId?this.orderChange(obj.orgId):''
      this.getList(val, this.listQuery.limit, obj);
    },
    handleSizeChange(val) {
      this.listQuery.sync = 1;
      this.listQuery.limit = val;
      var obj = {};
      if (this.techniSearch.stationId) {
        obj.stationId = this.techniSearch.stationId;
      }
      if (this.techniSearch.jobNature) {
        obj.jobNature = this.techniSearch.jobNature;
      }
      if (this.techniSearch.chooses) {
        obj[this.techniSearch.chooses] = this.chooContent;
      }
      if (!(this.roomSel2Arr === undefined || this.roomSel2Arr.length == 0)) {
        obj.skillIds = this.roomSel2Arr;
      }
      this.getList(this.listQuery.page, val, obj);
    },
    order() {
      this.position = true;
    },
    hiddenDiv() {
      this.position = false;
    },
    //数组去重
    remove(num, arr, val) {
      for (var i = 0; i < num.length; i++) {
        if (num[i] == val) {
          num.splice(i, 1);
          arr.splice(i, 1);
          break;
        }
      }
    },
    roomSel1(item) {
      if (this.roomSelNum.indexOf(item.id) == -1) {
        this.roomSelNum.push(item.id);
        this.roomSel1Arr.push(item);
      } else {
        this.remove(this.roomSelNum, this.roomSel1Arr, item.id);
      }
      item.show = !item.show;
    },
    //排序
    by(name) {
      return function(o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
          a = o[name];
          b = p[name];
          if (a === b) {
            return 0;
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1;
          }
          return typeof a < typeof b ? -1 : 1;
        } else {
          throw "error";
        }
      };
    },
    techClick() {
      var c1 = Date.parse("2008-08-08 " + this.startTime);
      var c2 = Date.parse("2008-08-08 " + this.endTime);
      if (this.startTime && this.endTime && this.roomSel1Arr.length > 0) {
        if (c2 > c1) {
          var obj = {};
          obj.startTime = this.startTime;
          obj.endTime = this.endTime;
          this.roomSel1Arr = this.roomSel1Arr.sort(this.by("id"));
          obj.weeks = [].concat(this.roomSel1Arr);
          this.disbArr = this.disbArr.concat(this.roomSelNum);
          this.teachArr.push(obj);
          this.isB = false;
          this.startTime = "";
          this.endTime = "";
        } else {
          this.$message({
            type: "warning",
            message: "结束时间不能小于开始时间"
          });
          return false;
        }
      } else {
        this.$message.error("请选择日期、时段");
        return false;
      }
      if (this.disbArr.length > 0) {
        this.disbArr.map(item => {
          if (this.roomSelNum.indexOf(item) != -1) {
            this.remove(this.roomSelNum, this.roomSel1Arr, item);
          }
        });
      }
    },
    //删除技师
    techDelete(item) {
      this.$confirm("此操作将永久删除该技师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning"
      })
        .then(() => {
          technicianDelete({ id: item.id })
            .then(data => {
              if (data.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.handleCurrentChange(this.listQuery.page);
                this.dialogVisibleEditClick();
              } else {
              }
            })
            .catch(error => {
              this.$message.error("删除失败!");
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
    roomSel2(index) {
      if (this.roomSel2Arr.indexOf(index.id) != -1) {
        this.remove(this.roomSel2Arr, [], index.id);
      } else {
        this.roomSel2Arr.push(index.id);
      }
      this.techniSearch.skillIds = this.roomSel2Arr;
      this.isA = index;
    },
    // 添加技能
    orderson() {
      this.flage = true;
    },
    // 添加时间
    addtime() {
      this.isB = true;
      this.startTime = this.startEnd.start;
      this.endTime = this.startEnd.end;
    },
    addtimeno() {
      this.roomSelNum = [];
      this.roomSel1Arr = [];
      this.isB = false;
    },
    mouser(item, index) {
      if (!item.ismouse) {
        item.ismouse = true;
        this.$set(this.techniList, index, item);
      }
    },
    mousout(item, index) {
      if (item.ismouse) {
        item.ismouse = false;
        this.$set(this.techniList, index, item);
      }
    },
    dateChange(val) {
      this.personal.birthDate = val;
    },
    //个人资料保存
    submitFormPer(formName) {
      this.$refs[formName].validate(val => {
        if (val) {
          var loading = this.$loading({
            lock: true,
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
            target: document.querySelector(".tabBox ")
          });
          this.btnState = true;
          for (var i = 0; i < this.teachArr.length; i++) {
            if (this.teachArr[i].endTime == "24:00") {
              this.teachArr[i].endTime = "23:59:59";
            }
          }
          if (this.teachArr.endTime == "24:00") {
            this.teachArr.endTime = "23:59";
          }
          this.personal.workTimes = this.teachArr;
          Technician(this.personal)
            .then(data => {
              if (data.data.code == 1) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                if (this.listQuery.sync != 1) {
                  this.listQuery.sync = 1;
                } else {
                  this.techniSearchs()
                  // this.getList(1, this.listQuery.limit);
                }
                loading.close();
                this.btnState = false;
                this.dialogVisible = false;
                this.techniSearch.stationId = "";
                this.techniSearch.jobNature = "";
                this.techniSearch.chooses = "";
                this.chooContent = "";
                this.roomSel2Arr = [];
              } else {
                loading.close();
                var str = data.data.data;
                if (typeof str == "string") {
                  this.$message({
                    message: str,
                    type: "warning"
                  });
                } else {
                  this.$message({
                    message: str[0],
                    type: "warning"
                  });
                }
                this.btnState = false;
                return false;
              }
            })
            .catch(error => {
              loading.close();
              this.btnState = false;
              return false;
            });
        } else {
          this.btnState = false;
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
    dialogVisibleEditClick() {
      this.dialogVisibleEdit = false;
    },
    getList(num, size, obj,str) {
      //技师编辑获取ID

      //选择城市

      this.listLoadingTech = true;
      ChooseTheCity(num, size, obj)
        .then(data => {
          if (data.data.code == 1) {
            this.listLoadingTech = false;
            this.Choose = data.data.data.cityCodes;
            this.total = data.data.data.page.count;
            if(str == 'sear'){
              this.infoname = data.data.data.page.list || [];
            }else{
              this.infoname = data.data.data.page.list || [];
              if(this.techUserType){
                this.sexTypeo = data.data.data.skillInfos;
                this.sexTypeoAdd = data.data.data.skillInfos;
                if(data.data.data.stations[0].id=='0'){
                  this.server = data.data.data.stations.slice(1)
                  this.servery = data.data.data.stations.slice(1)
                  this.serveryAdd = data.data.data.stations.slice(1)
                }else{
                  this.server = data.data.data.stations;
                  this.servery = data.data.data.stations;
                  this.serveryAdd = data.data.data.stations;
                }
                if(this.techUserType=='station'){
                  this.techniSearch.stationId = this.server[0].id
                  this.personal.stationId =  this.server[0].id
                }
              }
            }
            var i = 0,
              len = this.infoname.length,
              date = new Date(),
              year = date.getFullYear(),
              birth = 0,
              _infoname = this.infoname;
            for (i = 0; i < len; i++) {
              //遮罩
              _infoname[i].ismouse = false;
              // 性别
              _infoname[i].sexname = _infoname[i].sex == "male" ? "男" : "女";
              // 岗位性质
              _infoname[i].jobName =
                _infoname[i].jobNature == "full_time" ? "全职" : "兼职";
              // 岗位状态
              _infoname[i].jobStateName =
                _infoname[i].jobStatus == "online" ? "在岗" : "离岗";
              //工作年限
              if (_infoname[i].workTime == "0") {
                _infoname[i].workTimeName = "1年以下";
              } else if (_infoname[i].workTime == "11") {
                _infoname[i].workTimeName = "10年以上";
              } else {
                _infoname[i].workTimeName = _infoname[i].workTime + "年";
              }
            }
            this.techniList = this.infoname;
          } else {
            this.listLoadingTech = false;
            return false;
          }
        })
        .catch(error => {
          this.listLoadingTech = false;
          return false;
        });
    }
  },
  mounted() {
    //根据服务机构获取的第一条数据请求列表
    let tabData = async ()=>{
      try{
        let organizations = await this.listDataAll()
        this.organizations = organizations
        this.techniSearch.orgId = this.organizations[0].id
        this.techniSearchs()
      }
      catch(error){
      }
    }
    if(this.techUserType=='org' ||this.techUserType=='station'){
      this.listDataAll().then(data=>{
        this.organizations = data
        this.techniSearch.orgId = this.organizations[0].id
        this.getList(1, 12, {});
      })
    }else{
      tabData()
    }
    // tabData()
    this.sign; //获取签名
    // this.getList(1, 12, {});
    //性别,工作年限,岗位性质，岗位状态
    var dict = require("../../../static/dict.json");
    this.sex = dict.sex;
    this.workyear = dict.work_time;
    this.station = dict.job_natrue;
    this.statu = dict.job_status;
    this.sexTypes = dict.assess_grade;
    this.marriage = dict.matrimony;
    this.education = dict.education;
    this.relation = dict.relation;
    getTech().then(res => {
      this.ethnics = res.data;
      this.ethnic = res.data[32].label;
    });
    getStrong().then(res => {
      this.strong = res.data;
      this.strongs = res.data[22].value;
    });
    getHeight().then(res => {
      this.height = res.data;
      this.heights = res.data[18].value;
    });
  },
  filters: {
    trim(value) {
      return value.trim();
    }
  }
};
</script>
<style>
.server-left{
  width: 47%;
  float: left;
}
.server-right{
  width: 47%;
  float: right;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
* {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tech-index {
  border-bottom: 1px solid #e8e8e8;
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  overflow: hidden;
  /* display: flex; */
  /* justify-content: space-between;
  align-items: center; */
}
.tech-index .serch-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tech-index .serch-input {
  width: 100%;
  float: left;
}
.tech-index .serch-btn {
  float: right;
  /* width: 8%; */
}

.tech-index .serch-ski {
  margin-top: 10px;
}
.tech-index .serch-ski .search {
  width: 99%;
}
.tech-index .serch-ski .search .el-input {
  /* width: 42%; */
}

.tech {
  position: relative;
}

.tech-btn {
  background: #fff;
  border: 1px solid #4c70e8;
  color: #4c70e8;
  cursor: pointer;
  /* border: none; */
  outline: none;
  height: 36px;
  font-size: 12px;
  text-align: center;
  width: 8%;
  min-width: 60px;
}
@media screen and (min-width: 1200px) {
  .tech-btn {
    width: 80px;
  }
}

.tech-btn-right {
  margin-left: 300px;
}

.wirkTimes .tech-dir {
  border: 1px solid #a7a7a7 !important;
  background: url("../../../static/icon/eee.png") no-repeat;
  background-size: 15px 15px;
  background-position: bottom right;
}

.tech-section {
  /* margin: 20px; */
  background: #fff;
  box-sizing: border-box;
  padding: 20px 20px 0px 20px;
}

.tech-section-right {
  display: flex;
  justify-content: flex-end;
  /* margin-top: 45px; */
}

.listTechni .tech-section-ul {
  margin: 20px 0 0 0;
  display: flex;
  flex-wrap: wrap;
}

.tech-table {
  margin: 20px;
  padding-bottom: 0px;
}

.tech-section-ul li {
  width: 32%;
  height: 200px;
  /* background: #fff; */
  background-image: url("../../../static/icon/员工卡背景.png") no-repeat;
  background-size: 100%;
  position: relative;
  margin: 0 2% 30px 0;
  background-color: #f8fafd;
  box-shadow: 0 3px 6px 0 #dfe4ed;
  border-radius: 8px;
  /* border: 1px solid #e8e8e8; */
  /* box-shadow: 2px 4px 6px #e8e8e8; */
}
.tech-section-ul li:nth-child(3n) {
  margin-right: 0;
}

.tech-section-ul .tech-section-ul-posi {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  /* justify-content: space-around; */

  align-items: center;
}
.tech-section-ul-posi {
  justify-content: space-around;
}

.fy {
  /* margin: 0 20px; */
}

.tech-section-lage {
  /* margin: 0px; */
  padding: 0px;
  left: 40px;
  width: 60%;
}
.tech-qj .tech-section-lage > div {
  margin: 0px;
}
.tech-tc-prson {
  margin: 0px 20px;
  padding: 0px 20px 10px 0;
  border-bottom: #eee solid 1px;
  font-size: 14px;
  font-weight: 700;
  color: black;
}
.tech-ul .tech-tc-prson {
  margin: 0;
}

.tech-ul {
  padding: 20px 40px 10px 25px;
  /* border-bottom: solid 20px #f3f1f1; */
}

.tech-ul > li {
  display: flex;
  justify-content: space-between;
  /* padding-bottom: 20px; */
}
.tech-ul .el-form-item__label {
  text-align: left;
}
.tech-center {
  display: flex;
  justify-content: center;
}

.tech-ul li > div {
  width: 400px;
  display: flex;
  align-items: center;
  font-size: 12px;
  /* justify-content: center */
}
#confirmation .dialog-footer {
  justify-content: center;
}

.idBox {
  overflow: hidden;
}
.idBox .el-form-item {
  float: left;
}
.idBox > .avatar-uploader {
  margin-left: 20px;
  float: left;
}

.tech-ul li div > p {
  display: flex;
}
.avatar-headPic .el-upload--text {
  overflow: hidden;
  width: 120px;
  height: 120px;
}
.addTime .el-form-item {
  margin-bottom: 0;
}
.avatar-headPic .el-upload--text img {
  /* width: 120px;
  height: 120px; */
}
.tech-span {
  color: red;
  width: 10px;
  /* display: block; */
  margin-right: 4px;
}

.tech-ul li div p:nth-of-type(1) {
  width: 100px;
}

/* .el-button{
    border-radius:0px;
  } */

.tech-family-btn {
  border-radius: 0px;
}

.tech-fourth {
  cursor: pointer;
  border: none;
  outline: none;
  height: 36px;
  font-size: 12px;
  text-align: center;
  width: 100px;
  color: #4c70e8;
  background: #fff;
  border: 1px solid #4c70e8;
}

.tech-fourth-rigth {
  cursor: pointer;
  border: none;
  outline: none;
  height: 36px;
  font-size: 12px;
  text-align: center;
  width: 100px;
  color: red;
  background: #fff;
  border: 1px solid red;
  /* margin-left: 40px; */
}

.el-textarea__inner {
  border-radius: 0px;
}

.tech-section-lage {
  width: 80%;
}

/* .el-upload-list {
  width: 80px;
  height: 100px;
} */
.el-upload--text {
  width: 100%;
}

.tech-psoition {
  width: 100%;
  /* height: 320px; */
  background: #fff;
  position: absolute;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 3px 3px 5px #e8e8e8;
  top: 77px;
  left: 0;
  z-index: 1;
  /* animation: show 1s; */
  /* transition-duration: 5s; */

  /* animation: show 1s; */
  /* -moz-animation: show 1s; */
  /* Firefox */
  /* -webkit-animation: show 1s; */
  /* Safari 和 Chrome */
  /* -o-animation: show 1s; */
}

/* @keyframes show {
  25%{
    height: 25%;
  }
  50% {
    height: 50%;
  }
  75% {
    height: 75;
  }
  100% {
    height: 100%;
  }
}  */

@keyframes hidden {
  0% {
    height: 320px;
  }
  50% {
    height: 200px;
  }
  100% {
    height: 100px;
  }
}

.positionbox {
  margin: 20px;
  /* overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */
  float: left;
}
.positionbox span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  padding: 0 4px;
}

.tech-positon-odvi {
  display: flex;
  justify-content: space-between;
}

.tech-pos-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.searchHeader .el-input-group__prepend .el-input__inner {
  width: 100px;
  text-align: center;
}
.tech .searchHeader {
  width: 25%;
}
.searchHeader .el-input__inner {
  /* width: 250px; */
}

.tech-green {
  border: solid 1px #4c70e8 !important;
  background: url("../../../static/icon/Selected.png") no-repeat;
  background-size: 15px 15px;
  background-position: bottom right;
}
/* .tech-green::after{
    content:"✔";
    width: 10px;
    height: 10px;
    margin-top:6px;
    margin-left:0px;  */
/* border-bottom:10px solid green;
    border-left:10px solid transparent;
    color: #fff;
    margin-top: 3px; */
/* border-bottom:10px solid green;
    border-left:10px solid transparent;
    width: 10px;
    height: 10px;
    margin-top:12px;
    margin-left:0px; 
    color: #fff; */
/* } */

.tallys {
  color: #fff;
  font-size: 12px;
  position: absolute;
  margin-top: 10px;
  margin-left: 35px;
}

.techniAdd .tech-ul {
  border-bottom: none;
}

.tech-qj .selfFooter {
  padding: 0px 0;
}

.triangle-bottomrights {
  width: 0;
  height: 0;
  border-bottom: 15px solid green;
  border-left: 15px solid transparent;
  position: absolute;
  margin-top: 17px;
  margin-left: 32px;
}

.tech-order-btn {
  background: #fff;
  color: #4c70e8;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 10px;
}

.sexAge {
  margin-left: 5px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tech-order-jn {
  width: 300px;
  height: 38px;
  border: 1px solid #bfcbd9;
  position: relative;
  line-height: 38px;
}

.tech-order-jn-son,
.tech-order-jn-sons {
  /* height: 100px; */
  width: 100%;
  border: 1px solid #bfcbd9;
  /* border-top: none; */
  /* display: flex; */
  /* position: absolute; */
  background: #fff;
  float: left;
  /* z-index: 2;
  top: 35px;
  left: -1px; */
}
.wirkTimes {
  width: 100%;
  border-top: none;
  min-width: 450px;
}
.wirkTimes .el-input__inner {
  border: 1px solid #bfcbd9 !important;
}

.tech-order-jn-sont {
  width: 545px;
  height: 40px;
  /* margin-top: 15px; */
  border: 1px solid #bfcbd9;
  /* display: flex; */
  /* position: absolute; */
  background: #fff;
  z-index: 1;
  top: 35px;
  left: -1px;
}

.tech-order-posi {
  margin: 15px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
}

.tech-order-posis {
  background-color: #fff;
  border: 1px solid #bfcbd9;
  margin: 0 5px;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
  padding: 0 7px;
  justify-content: center;
  overflow: hidden;
}

.seize .el-switch.is-checked .el-switch__core {
  background-color: #4c70e8;
  border: 1px solid #4c70e8;
}

.tallyo {
  color: #fff;
  font-size: 12px;
  position: absolute;
  margin-top: 10px;
  margin-left: 35px;
}

.tallyos {
  color: #fff;
  font-size: 12px;
  position: absolute;
  margin-top: 10px;
  margin-left: 35px;
}

.tallyose {
  color: #fff;
  /* color: red; */
  font-size: 6px;
  position: absolute;
  margin-top: 6px;
  margin-left: 22px;
}

.triangle-bottomrighto {
  width: 0;
  height: 0;
  border-bottom: 15px solid green;
  border-left: 15px solid transparent;
  position: absolute;
  margin-top: 17px;
  margin-left: 32px;
}

.header-h4 {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #333333;
  letter-spacing: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* word-wrap:break-word */
}

.triangle-bottomrightos {
  width: 0;
  height: 0;
  border-bottom: 15px solid green;
  border-left: 15px solid transparent;
  position: absolute;
  margin-top: 17px;
  margin-left: 32px;
}

.triangle-bottomrightose {
  width: 0;
  height: 0;
  border-bottom: 10px solid green;
  border-left: 10px solid transparent;
  position: absolute;
  margin-top: 12px;
  margin-left: 19px;
}

.btn-styl {
  height: 25px;
  width: 60px;
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

.tech-daytim {
  margin-left: 2px;
}

.tech-section-lages {
  width: 40%;
  left: 5%;
  /* padding-right: 30px; */
}

.tech-section-xiu {
}

.tech-section-xiu > li {
  display: flex;
  padding: 10px;
  font-size: 12px;
}

.tech-section-xiu > li > div:nth-of-type(1) {
  width: 120px;
  height: 35px;
  line-height: 35px;
}

.tech-section-xiu > li > div:nth-of-type(2) {
  line-height: 35px;
}

.tech-xiu-div {
  width: 100%;
  height: 100%;
  padding: 20px 0px;
  display: flex;
  justify-content: space-around;
}

.tech-xiu-div-one {
  margin: 10px 0;
  width: 50%;
  text-align: center;
  /* display: flex;
     justify-content: center; */
}

.avatarBack {
  /* position: absolute;
  left: 450px; */
  margin-left: 200px;
}

.tech-xiu-div-two {
  margin: 10px 0;
  width: 50%;
  /* text-align: center; */
}

.tech-xiu-div-two > div {
  margin-top: 14px;
  display: flex;
}

.tech-mouse {
  width: 46px;
  height: 21px;
  line-height: 21px;
  background: #e0c998;
  border-radius: 3px;
  display: block;
  text-align: center;
}

.tech-mouse-div {
  margin-top: 10px;
  /* width: 120px; */
  display: inline-block;
  display: flex;
  justify-content: center;
}
.tech-index .el-select .el-tag {
  line-height: 23px;
}
.tech-mouse-div > span:nth-of-type(1) {
  /* border: 1px solid #707cd2; */
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #333333;
  letter-spacing: 0;
}

.tech-mouse-div > span:nth-of-type(2) {
  margin-left: 5px;
  /* border: 1px solid #707cd2; */
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #333333;
  letter-spacing: 0;
}

.tech-vacation .mobel {
  margin-bottom: 22px;
  display: flex;
}
.tect-pass .mobel {
  height: 36px;
  font-size: 12px;
}
.tect-pass .mobel > p:nth-child(1) {
  width: 100px;
  text-align: right;
  padding-right: 12px;
  box-sizing: border-box;
  float: left;
}
.tech-vacation .mobel > p:nth-child(1) {
  width: 100px;
  text-align: right;
  padding-right: 21px;
}
.line {
  text-align: center;
}
.tech-service {
  padding: 20px 0 10px 0;
}
.tech-service .tech-order-jn {
  margin-left: 0;
}
.working {
  border: 1px solid #bfcbd9;
  border-top: none;
  /* width: 400px; */
  box-sizing: border-box;
  padding: 0 0 0 20px;
}
.working > li {
  position: relative;
  border-bottom: 1px solid #f2f2f2;
  padding-top: 15px;
}

.woking-div {
  display: flex;
  flex-direction: column;
}
.i-delete {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
.time {
  /* padding: 10px 0; */
}
#confirmation {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.button-large-fourth,
.button-cancel-fourth {
  margin-right: 40px;
  /* display: block; */
  line-height: 34px;
}
.button-cancel-fourth {
  cursor: pointer;
  border: none;
  height: 34px;
  font-size: 12px;
  text-align: center;
  width: 100px;
  border: 1px solid #4c70e8;
}
.el-input__icon {
  /* display: none; */
}
.el-pagination {
  text-align: right;
}
.p-show {
  text-align: center;
  color: rgb(102, 102, 102);
}
.tech-qj .avatar {
  /* width: 100%;
  height: 100%; */
  float: left;
  margin-top: 10px;
}
.passBox .el-form-item__content {
  display: flex;
  justify-content: center;
  margin-left: 0 !important;
}
.passBox .el-form-item__content button {
  /* padding: 10px 30px; */
}
.passBox .el-form-item__content button:nth-child(1) {
  color: #fff;
}
.headImag {
  width: 100px;
  height: 100px;
  background: url("../../../static/icon/头像背景.png") no-repeat;
  background-size: 100%;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
}
.headImag img {
  /* width: 100px;
  height: 100px; */
  /* overflow: hidden; */
}
.button-large {
  display: inline-block;
  line-height: 25px;
  margin: 0 0 0 35px;
}
.mousehover {
  width: 24%;
  height: 50px;
  overflow: hidden;
}
.mousehover img {
  display: block;
  width: 100%;
  max-width: 50px;
  margin: 0 auto;
}
.upload-head,
.upload-id {
  cursor: pointer;
  height: 36px;
  font-size: 12px;
  text-align: center;
  width: 100px;
  color: #4c70e8;
  background: #fff;
  border: 1px solid #4c70e8;
  line-height: 36px;
}
.upload-id {
  border: 1px solid red;
  color: red;
}
.tech-qj .avatar-uploader .el-upload {
  border: none;
  border-radius: 0;
  width: 100px;
}
.uploadHead .el-form-item__content {
  margin-left: 0 !important;
}
.mousehover:hover {
  cursor: pointer;
}
.tech-service .el-select .el-tag {
  line-height: 23px;
}
.page {
  padding-right: 20px;
  padding-bottom: 30px;
  background: #fff;
}
.avatar-headPic {
  line-height: 0;
}
.avatar-headPic .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 120px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
/* //动画 */
.flip-container {
  perspective: 1000;
  -webkit-perspective: 1000;
}
/* flip the pane when hovered */
.flip-container:hover .flipper,
.flip-container.hover .flipper {
  transform: rotateY(180deg);
}

.flip-container,
.front,
.back {
  overflow: hidden;
  margin: 0 auto;
  width: 50px;
  height: 50px;
}
.front img,
.back img {
  width: 100%;
}
/* flip speed goes here */
.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;

  position: relative;
}

/* hide back of pane during swap */
.front,
.back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* Chrome 和 Safari */
  -moz-backface-visibility: hidden; /* Firefox */
  -ms-backface-visibility: hidden; /* Internet Explorer */

  position: absolute;
  top: 0;
  left: 0;
}

/* front pane, placed above back */
.front {
  z-index: -2;
}

/* back, initially hidden pane */
.back {
  transform: rotateY(180deg);
}
/* 动画结束 */
</style>

<!--
// 身份证图片
// 头像图片
-->

