<template>
      <div class="techniEdit tabBox">
        <!-- 个人资料 -->
          <h3 class="tech-tc-prson">个人资料</h3>
          <el-form :model="personalEDit"  ref="personalEDit"  label-width="100px" :rules="rulesPerEdit">
              <ul class="tech-ul">
                <!-- 新的  -->
                <el-row :gutter="60">
                    <el-col :span="12">
                        <el-form-item label="姓名:" prop="name">
                            <el-input placeholder="请输入2~15位姓名" v-model="personalEDit.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号:" prop="phone">
                            <el-input placeholder="请输入11位手机号" v-model="personalEDit.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="性别:" prop="sex">
                          <el-select v-model="personalEDit.sex" clearable placeholder="请选择" style="width:100%">
                              <el-option v-for="(item,key) in sex" :key="key" :label="item" :value="key">
                              </el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="头像：" prop="headPic">
                        <el-upload
                            class="avatar-header"
                            :action="imgSrc"
                            :show-file-list="false"
                            :http-request="(val)=>picUpload(val,'head')"
                            :before-upload="beforeAvatarUpload"
                            >
                            <img v-if="personalEDit.headPic" :src="imgSrc+personalEDit.headPic+picWidth120" class="header-img">
                          </el-upload>
                          <p style="width:100%; color:rgb(131,145,165); font-size:12px; line-height:35px">*为了浏览效果,建议上传大于240*240的正方形图片</p>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                  <el-col :span="12">
                      <el-form-item label="现住地址:" prop="area">
                                    <el-cascader
                                        :options="areaOptions"
                                        :show-all-levels="true"
                                        v-model="personalEDit.area"
                                        style="width:100%"
                                    ></el-cascader>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="出生日期:" prop="birthDate">
                          <el-date-picker v-model="personalEDit.birthDate" :editable='false' type="date" placeholder="选择日期" style="width:100%" @change="dateChange"
                          format="yyyy-MM-dd" :picker-options="pickerOptions0">
                          </el-date-picker>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="12">
                        <el-form-item prop="address">
                          <el-input placeholder="请输入6-100位详细地址"  v-model="personalEDit.address"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="民族:">
                            <el-select v-model="personalEDit.nation" filterable clearable placeholder="请选择" style="width:100%">
                              <el-option v-for="item in ethnics" :key="item.value" :label="item.label" :value="item.value">
                              </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="60">
                  <el-col :span="12">
                     <el-form-item label="身份证号:" prop="idCard">
                        <el-input placeholder="请输入正确的身份证号" v-model="personalEDit.idCard"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="服务状态：" class="seize">
                            <el-switch
                              v-model="personalEDit.status"
                              :width="100"
                              on-text="提供服务"
                              off-text="暂停服务"
                              on-value="yes"
                              off-value="no">
                            </el-switch>
                        </el-form-item>
                  </el-col>
                </el-row>
                <div class="idBoxEdit">
                  <!-- <el-col :span="5"> -->
                    <el-form-item label="身份证：">
                        <el-upload
                                class="avatar-uploader"
                                :action="imgSrc"
                                :show-file-list="false"
                                :http-request="(val)=>picUpload(val,'id')"
                                :before-upload="beforeAvatarUpload"
                                >
                                <div class="upload-head"><span>上传正面</span></div>
                                <img v-if="personalEDit.idCardPicBefor" :src="imgSrc+personalEDit.idCardPicBefor+picWidth300" class="avatar">
                          </el-upload>
                    </el-form-item>
                  <!-- </el-col> -->
                  <!-- <el-col :span="5"> -->
                    <!-- <el-form-item label="身份证反面："> -->
                        <el-upload
                                class="avatar-uploader"
                                :action="imgSrc"
                                :show-file-list="false"
                                :http-request="(val)=>picUpload(val,'after')"
                                :before-upload="beforeAvatarUpload"
                                >
                                <div class="upload-head"><span>上传反面</span></div> 
                                <img v-if="personalEDit.idCardPicAfter" :src="imgSrc+personalEDit.idCardPicAfter+picWidth300" class="avatar avatarBack">
                          </el-upload>
                    <!-- </el-form-item> -->
                  <!-- </el-col> -->
                </div>
                <el-row>
                  <el-col :span="24">
                       <li>
                          <div>
                            <p></p>
                            <p>
                                  <span class="button-large-fourth btn-color" @click="perSubmitForm('personalEDit')">保存信息</span>
                            </p>
                          </div>
                        </li>
                  </el-col>
                </el-row>
                <!-- 新的完成 -->
              </ul>
            </el-form>
        <!--个人信息 完成-->
        
        <!-- 服务信息 -->
          <h3 class="tech-tc-prson">服务信息</h3>
          <el-form :model="perServer" :rules="rulesServer" ref="perServer" label-width="100px" class="demo-ruleForm">
              <ul class="tech-ul">
                <el-row :gutter="60">
                      <el-col :span="12">
                        <el-form-item label="所属服务站:" prop="stationId">
                          <el-select v-model="perServer.stationId" filterable clearable placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in servery" :key="index" :label="item.name" :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="岗位状态:" prop="jobStatus">
                            <el-select v-model="perServer.jobStatus" clearable placeholder="请选择" style="width:100%">
                                <el-option v-for="(item,key) in statu" :key="key" :label="item" :value="key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row :gutter="60">
                      <el-col :span="12">
                        <el-form-item label="工作年限:" prop="workTime">
                          <el-select v-model="perServer.workTime" clearable placeholder="请选择" style="width:100%">
                              <el-option v-for="(item,key) in workyear" :key="key" :label="item" :value="key">
                              </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>  
                    </el-row>
                    <el-row :gutter="60">
                      <el-col :span="12">
                      </el-col>
                    </el-row>
                    <el-row :gutter="60">
                      <el-col :span="17">
                        <el-form-item label="选择技能:" prop="skillIds">
                          <el-select v-model="perServer.skillIds" multiple placeholder="请选择" style="width:100%">
                            <el-option
                            v-for="item in sextypeo"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="60">
                      <el-col :span="17">
                        <el-form-item label="岗位性质:" prop="jobNature">
                          <el-select v-model="perServer.jobNature" clearable placeholder="请选择" style="width:100%" @change="jobStatusTable">
                            <el-option v-for="(item,key) in station" :key="key" :label="item" :value="key">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row class="workHours-time" :gutter="60" v-if="perServer.jobNature!='part_time'">
                      <el-col :span="17" class="workHours">
                        <el-form-item label="工作时间：" class="workHours-input" prop="workTimes">
                            <div class="tech-order-jn">
                                <span class="tech-order-btn" @click="addtime"> &#10010; 添加时间</span>
                            </div>
                            <el-collapse-transition>
                              <div class="tech-order-jn-sons" v-show="isB">
                                <div style="margin:0 10px;">
                                    <p style="padding:10px 0;">新增日期</p>
                                    <div>
                                      <div style="display:flex;">
                                          <div class="selfCheckBoxsday">日期</div>
                                          <input type="button" class="selfCheckBoxs tech-order-posis"
                                              ref="sexOption" @click="roomSel1(item)"
                                              v-for="(item,$index) in sexDay" :key="$index"
                                              :class="[{'techTime-green':roomSelNum.indexOf(item.id)!=-1},{'tech-dir':disbArr.indexOf(item.id)!=-1}]"
                                              :disabled="disbArr.indexOf(item.id)!=-1"
                                              :value="item.name">
                                      </div>
                                    </div>
                                    <div class="startTime">
                                      <div class="selfCheckBoxsday">时段</div>
                                      <el-time-select placeholder="起始时间" @change="endEmpty" :editable="false" v-model="startTime" :picker-options="startend.start=='00:00'?{
                                          start: '00:00',
                                          step: '00:30',
                                          end: '24:00',
                                          maxTime:startend.endNew
                                          }:{
                                            start: '00:00',
                                            step: '00:30',
                                            end: '24:00',
                                            minTime:startend.startNew,
                                            maxTime:startend.endNew
                                          }" class="tech-daytim">
                                      </el-time-select>
                                      <el-time-select placeholder="结束时间" :editable="false" v-model="endTime" :picker-options="{
                                          start: '00:00',
                                          step: '00:30',
                                          end: '24:00',
                                          minTime:startTime || startend.startNew,
                                          maxTime:startend.endNew
                                          }">
                                      </el-time-select>
                                    </div>
                                </div>
                                <div style="margin:10px">
                                    <span class="button-large btn-styl" @click="techClick">确认</span>
                                    <input type="button" class="button-cancel btn-styl" style="margin-left:20px" @click="addtimeno" value="取消">
                                </div>
                              </div>
                            </el-collapse-transition>
                        </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="weekDate" :gutter="60" v-if="perServer.workTimes!=undefined && perServer.workTimes.length>0  && perServer.jobNature!='part_time'">
                    <el-col :span="17">
                      <el-form-item>
                        <ul class="working">
                          <li v-for="(item,index) in perServer.workTimes" :key="index">
                          <div>
                            <div class="woking-div">
                            <div><span v-for="(data,i) in item.weeks" :key="i">{{data.name+","}}</span></div>
                            <div class="time">{{item.startTimeStr+"~"+item.endTimeStr}}</div>
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
                  <li class="serverPres">
                      <div>
                      <p></p>
                      <p>
                          <span class="button-large-fourth perServer btn-color" @click="submitForm('perServer')">保存信息</span>
                      </p>
                      </div>
                  </li>
              </ul>
          </el-form>
        <!--服务信息 完成-->

        <!-- 补充个人资料 -->
          <h3 class="tech-tc-prson">补充个人资料</h3>
          <el-form :model="supplement" :rules="ruleSupp" ref="supplement" label-width="100px" class="demo-ruleForm">
            <ul class="tech-ul">
              <el-row :gutter="60">
                  <el-col :span="12">
                    <el-form-item label="邮箱:" prop="email"> 
                      <el-input placeholder="请输入正确的邮箱地址" v-model="supplement.email"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="学历:">
                      <el-select v-model="supplement.education" clearable placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,key,index) in education" :key="index" :label="item" :value="key">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="60">
                  <el-col :span="12">
                    <el-form-item label="身高:">
                      <el-select v-model="supplement.height" filterable clearable placeholder="请选择" style="width:100%">
                        <el-option v-for="item in height" :key="item.value" :label="item.value" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="体重:">
                      <el-select v-model="supplement.weight" filterable clearable placeholder="请选择" style="width:100%">
                        <el-option v-for="item in strong" :key="item.value" :label="item.value" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="60">
                  <el-col :span="12">
                    <el-form-item label="婚姻状况:">
                      <el-select v-model="supplement.marryStatus" clearable placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,key,index) in marriage" :key="index" :label="item" :value="key">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="籍贯:">
                      <el-select v-model="supplement.nativeProvinceCode" clearable placeholder="请选择" style="width:100%">
                        <el-option v-for="(item,index) in areaOptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="60">
                <el-col :span="12">
                  <el-form-item label="入职日期:">
                    <el-date-picker
                      :editable="false"
                      style="width:100%"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                      @change="eneryDate"
                     >
                    </el-date-picker>
                  </el-form-item>
                </el-col>

              </el-row>
              <li>
                  <div class="level">
                      <p>级别:</p>
                      <p>
                        <div style="display:flex;justify-content:space-between;width:545px; overflow:hidden;">
                            <div class="selfCheckBox tech-selfbox tech-center" ref="sexOption" @click="roomSel2(index,key)" v-for="(item,key,index) in sexTypes"
                            :class="{'tech-green':isA==index+1}" :key="key">
                            {{item}}
                            </div>
                        </div>
                      </p>
                  </div>
              </li>
              <el-row :gutter="60">
                <el-col :span="18">
                  <el-form-item label="经验描述:" prop="description">
                                <el-input type="textarea" v-model="supplement.description" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请简单介绍一下" style="width:100%"></el-input>
                              </el-form-item>
                </el-col>
              </el-row>
              <li>
                <div>
                  <p></p>
                  <p>
                        <span class="button-large-fourth btn-color" @click="supplSub('supplement')">保存信息</span>
                  </p>
                </div>
              </li>

            </ul>
          </el-form>
        <!-- 补充个人资料 完成-->

        <!--家庭成员（选填） -->
          <h3 class="tech-tc-prson">家庭成员（选填）</h3>
          <div class="tech-table" v-show="familyList.length>0">
            <el-table :key='tableKey' border v-show="familyList.length>0" :data="familyList" stripe v-loading="listLoading" element-loading-text="正在加载" fit highlight-current-row
              style="width: 100%">

              <el-table-column align="center" label="关系" prop="relation">
                <template scope="scope">
                  <span v-if="scope.row.relation=='parent'">父母</span>
                  <span v-if="scope.row.relation=='siblings'">兄弟姐妹</span>
                  <span v-if="scope.row.relation=='children'">子女</span>
                  <span v-if="scope.row.relation=='spouse'">夫妻</span>
                  <span v-if="scope.row.relation=='relative'">亲戚</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="姓名" prop="memberName">
              </el-table-column>

              <el-table-column align="center" label="手机号" prop="memberPhone">
              </el-table-column>

              <el-table-column align="center" label="单位" prop="memberCompany">
              </el-table-column>
              <el-table-column align="center" label="职务" prop="memberJob">
              </el-table-column>

              <el-table-column align="center" label="操作">
                <template scope="scope">
                  <span class="operation"  @click="handleModifyStatus(scope.row,scope,'deleted')">编辑</span>
                  <span class="operation" @click="handleModifyDelete(scope.row,scope,'deleted')">删除</span>
                </template>
              </el-table-column>

            </el-table>
          </div>
          <div class="perTech">
            <div style="padding:0 25px 10px 25px">
              <div class="add_Btn" @click="showTabl">
                  <span v-if="!flagso" class="fl btn_Span1">+</span>
                  <span v-else class="fl btn_Span1">-</span>
                  <span class="fl btn_Span2">家庭成员</span>
                </div>
            </div>
            <el-form :model="perFamily"  ref="perFamily"  label-width="100px" :rules="rulesFamily">
              <el-collapse-transition>
                <ul class="ferFamilyClass tech-ul" v-show="flagso" style="padding-left:50px">
                    <li>
                        <div>
                            <p>
                                <el-form-item label="关系:" prop="relation">
                                    <el-select v-model="perFamily.relation" clearable placeholder="请选择" style="width:250px">
                                        <el-option v-for="(item,key,index) in relation" :key="index" :label="item" :value="key">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div>
                        <p>
                            <el-form-item label="名字:" prop="memberName">
                  <el-input placeholder="请输入2~15位姓名" style="width:250px" v-model="perFamily.memberName"></el-input>
                </el-form-item>
                        </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>
                                <el-form-item label="手机号:" prop="memberPhone">
                                    <el-input placeholder="请输入11位手机号" style="width:250px" v-model="perFamily.memberPhone"></el-input>
                                </el-form-item>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div>
                        <p>
                            <el-form-item label="单位:" prop= "memberCompany">
                                <el-input placeholder="请输入工作单位名称" style="width:250px" v-model="perFamily.memberCompany"></el-input>
                            </el-form-item>
                        </p>
                        </div>
                    </li>
                    <li>
                        <div>
                        <p>
                            <el-form-item label="职务:" prop="memberJob">
                                <el-input placeholder="请输入职务" style="width:250px" v-model="perFamily.memberJob"></el-input>
                            </el-form-item>
                        </p>
                        </div>
                    </li>
                    <li>
                        <div>
                        <p></p>
                        <p>
                            <input type="button" class="button-large" @click="savrTable('perFamily')" value="保存">
                            <input type="button" class="button-cancel" @click="familyTable('perFamily')" style="margin-left:20px" value="取消">
                        </p>
                        </div>
                    </li>
                </ul>
              </el-collapse-transition>
            </el-form>
          </div>
        <!--家庭成员（选填） 完成-->

        <!--其他信息 -->
          <h3 class="tech-tc-prson">其他信息</h3>
          <ul class="tech-ul ofterinfo">
             <li style=" padding-bottom:0">
                  <div style="width:100%;">
                    <p>备注:</p>
                    <p style="width:100%;margin-left:10px">
                      <el-form :model="otherInfo" style="width:60%"  ref="otherInfo" :rules="otherInfoRuls">
                        <el-form-item prop="remark"> 
                          <el-input type="textarea" v-model="otherInfo.remark" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请简单描述一下"></el-input>
                        </el-form-item>
                      </el-form>
                    </p>
                  </div> 
              </li>
              <li>
                  <div>
                      <p></p>
                      <p>
                          <el-upload
                            class="avatar-uploader"
                            :action="imgSrc"
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                            :http-request="(val)=>picUpload(val,'cert')"
                            >
                            <div class="upload-head"><span>上传证件照</span></div>
                            <img v-if="otherInfo.jobPic" :src="imgSrc+otherInfo.jobPic+picWidth100" class="remarkImg">
                          </el-upload>
                          <el-upload
                            class="avatar-uploader"
                            :action="imgSrc"
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                            :http-request="(val)=>picUpload(val,'life')"
                            style="margin-left:20px;" 
                            >
                            <div class="upload-id"><span>上传生活照</span></div>
                            <img v-if="otherInfo.lifePic" :src="imgSrc+otherInfo.lifePic+picWidth100" class="remarkImg">
                          </el-upload>
                      </p>
                  </div>
              </li>
              <li>
                  <div>
                      <p></p>
                      <p>
                          <span class="button-large-fourth btn-color" @click="sumitFormSub('otherInfo')">保存信息</span>
                      </p>
                  </div>
              </li>
          </ul>
        <!--其他信息完成 -->
      </div>
</template>
<script>
import {
  addTech,
  getTech,
  getEducations,
  getStrong,
  getHeight,
  serviceStation,
  getMatrimony,
  technicianEdit,
  technicianServer,
  technicianPlus,
  technicianOther,
  familyAdd,
  familyDelete
} from "@/api/tech";

import { getSign } from "@/api/sign";
import Cookies from "js-cookie";


var loading;
export default {
  data() {
    //身份证
    var TECHIDCARD = (rule,value,callback) =>{
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
      if(value){
        if(reg.test(value)){
          callback()
        }else{
          callback(new Error('身份证号格式错误'))
        }
      }else{
        callback(new Error('请输入身份证号'))
      }
    };
    //手机
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
    var AREA = (rule, value, callback) => {
      callback();
    };

    //出生日期
    var BIRTHDATE = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请选择日期"));
      }
    };

    //现住地址
    var SKILLIDS = (rule, value, callback) => {
      if (value!=undefined && value.length) {
        callback();
      } else {
        callback(new Error("请选择技能"));
      }
    };
    //邮箱
    var EMAIL = (rule,value,callback)=>{
      var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      if(value){
        if(value.length>=6 && value.length<=30){
          if(reg.test(value)){
            callback()
          }else{
            callback(new Error('请输入0-30位的邮箱'))
          }
        }else{
          callback(new Error('请输入0-30位的邮箱'))
        }
      }else{
        callback()
      }
    }
    //家庭成员手机号
    var MEMBERPHONE = (rule,value,callback)=>{
      if(value){
        if (!/^1[34578]\d{9}$/.test(value)) {
            callback(new Error('请输入正确的手机号'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    }
    //工作时间
    var WORKTIMES = (rule,value,callback) =>{
      if(this.perServer.workTimes != undefined && this.perServer.workTimes.length>0){
        callback()
      }else{
        callback(new Error('请添加工作时间'))
      }
    }
    //详细地址
    var ADDRESS = (rule,value,callback) =>{
      if(value){
        if(value.length>=6 && value.length<=100){
          callback()
        }else{
          callback(new Error('请输入6到100位的详细地址'))
        }
      }else{
        callback(new Error('请输入详细地址'))
      }
    }

    return {
      roomSelNum:[],
      techniEditId: "",
      roomSel1Arr: [],
      //其他信息
      otherInfo:{
        jobPic:'',
        lifePic:'',
        remark:''
      },
      otherInfoRuls:{
        remark:[
          { min: 2, max: 200, message: "长度在 1 到 200 个字符", trigger: "blur" }
        ]
      },
      perFamily: {
        relation: "",
        memberName: "",
        memberPhone: "",
        memberCompany: "",
        memberJob: ""
      },
      rulesFamily: {
        relation: [{ required: true, message: "请选择关系", trigger: "change" }],
        memberName: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        memberPhone:[
          {validator:MEMBERPHONE,trigger:'blur'}
        ],
        memberCompany:[
          { min: 0, max: 50, message: "请输入0-50位的单位名称", trigger: "blur"}
        ],
        memberJob:[
          {min: 2, max: 50, message: "请输入0-50位的职务名称", trigger: "blur"}
        ]

      },
      //补充个人资料
      supplement: {
        email: "",
        education: "",
        weight: "",
        height: "",
        marryStatus: "",
        nativeProvinceCode: "",
        inJobTime: "",
        jobLevel: "",
        description: ""
      },
      //补充个人治疗邮箱
      ruleSupp:{
        email:[
          {validator:EMAIL,trigger:"blur"}
        ],
        description:[
          { message: "请输入名字", trigger: "blur" },
          { min: 2, max: 200, message: "长度在 1 到 200 个字符", trigger: "blur" }
        ]
      },
      // 个人资料
      techTable: false,
      personalEDit: {
        name: "",
        idCard: "",
        phone: "",
        sex: "",
        phone: "",
        birthDate: "",
        area: [],
        address: "",
        idCardPicBefor: "",
        idCardPicAfter:'',
        headPic: "",
        status:'',
        nation:''
      },
      rulesPerEdit: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        // 身份证
        idCard: [{ required: true, validator: TECHIDCARD, trigger: "blur" }],
        phone: [{ required: true, validator: TECHPHONE, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birthDate: [
          { required: true, validator: BIRTHDATE, trigger: "change" }
        ],
        area: [{ required: true, validator: AREA, trigger: "change" }],
        address:[
          {required:true,validator:ADDRESS,trigger:'blur'}
        ],
        headPic:[
          {required:true,message:'请选择头像',trigger:'blur'}
        ]
      },
      //服务信息
      perServer: {
        stationCityCode: "",
        jobNature: "",
        stationId: "",
        jobStatus: "",
        workTime: "",
        skillIds: "",
        workTimes:[]
      },
      rulesServer: {
        stationCityCode: [
          { required: true, message: "请选择城市", trigger: "change" }
        ],
        jobNature: [{ required: true, message: "请选择岗位性质", trigger: "change" }],
        stationId: [{ required: true, message: "请选择服务站", trigger: "change" }],
        jobStatus: [{ required: true, message: "请选择岗位状态", trigger: "change" }],
        workTime: [{ required: true, message: "请选择工作年限", trigger: "change" }],
        skillIds: [{ required: true, validator: SKILLIDS, trigger: "change" }],
        workTimes:[{required:true,validator:WORKTIMES, trigger: "change"}]
      },
      ethnics: [],
      strong: {},
      height: [],
      place: [],
      caty: [],
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
      scopeId: null,
      key: false,
      isA: null,
      isB: false,
      flagso: false,
      flags: false,
      flage: false,
      tableKey: "",
      familyFlag: false,
      status: "",
      area: [],
      strongs: "",
      heights: "",
      ethnic: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      startTime: "",
      endTime: "",
      disbArr:[],
      startTimes: "",
      endTimes: "",
      techName: "",
      techldCard: "",
      techPhone: "",
      position: false,
      listLoading: false,
      familyList: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 6,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      dialogVisible: false
    };
  },
  watch: {
    technicianData: {
      immediate: true,
      handler(val, oldval) {
        //获取技师id
        this.techniEditId = val.id;
        this.disbArr = [];

        /*
        **个人资料
        **
        */


        this.personalEDit.name = val.name
        this.personalEDit.idCard = val.idCard
        this.personalEDit.phone = val.phone
        this.personalEDit.area = [val.provinceCode, val.cityCode, val.areaCode];
        this.personalEDit.sex = val.sex
        this.personalEDit.address = val.address
        this.personalEDit.nation = val.nation || ''
        this.personalEDit.techBirthDate = val.birthDate;
        this.personalEDit.status = val.status
        this.personalEDit.headPic = val.headPic
        this.personalEDit.idCardPicBefor = val.idCardPicBefor || ''
        this.personalEDit.idCardPicAfter = val.idCardPicAfter || ''
        this.personalEDit.birthDate = val.birthDate

        /*
        **其他信息
        **
        */
        
        this.otherInfo.jobPic = val.jobPic
        this.otherInfo.lifePic = val.lifePic
        this.otherInfo.remark = val.remark



        /*
        ** 服务信息
        ** 
        **/


        this.perServer.stationId = val.stationId
        this.perServer.jobNature = val.jobNature
        this.perServer.jobStatus = val.jobStatus
        this.perServer.skillIds = val.skillIds || []
        this.perServer.workTime = val.workTime+''
        this.perServer.workTimes = val.workTimes
        // //工作时间默认选中
        var work = this.perServer.workTimes || [],
            i,j,weeks_i,num;
        if(work.length>0){
          for(i = 0 ; i<work.length;i++){
            if(work[i].endTimeStr == "23:59"){
              work[i].endTimeStr = "24:00"
            }
            weeks_i = work[i].weeks
            for( j =0 ; j<weeks_i.length ; j++){
              num = weeks_i[j].id*1
              if(num == 1){
                weeks_i[j].name = "星期一"
              }else if(num == 2){
                weeks_i[j].name = "星期二"
              }else if(num == 3){
                weeks_i[j].name = "星期三"
              }else if(num == 4){
                weeks_i[j].name = "星期四"
              }else if(num == 5){
                weeks_i[j].name = "星期五"
              }else if(num == 6){
                weeks_i[j].name = "星期六"
              }else{
                weeks_i[j].name = "星期日"
              }
              this.disbArr.push(weeks_i[j].id*1)
            } 
          }
        }


        /*
        ** 补充个人信息
        ** 无法直接给supplement复制val,会无法重新复制
        **/
        this.supplement.weight = val.weight? val.weight+'' : "";
        this.supplement.email = val.email || "";
        this.supplement.education = val.education || "";
        this.supplement.height = val.height? val.height+'' : "";
        this.supplement.marryStatus = val.marryStatus || "";
        this.supplement.nativeProvinceCode = val.nativeProvinceCode || "";
        this.value1 = val.inJobTime || "";
        this.isA = val.jobLevel * 1 || null;
        this.supplement.description = val.description || "";

        this.familyList = val.familyMembers ? [].concat(val.familyMembers) : [];
      },
      deep: true
	},
  },
  props: [
	"listquer",
    "areaOptions",
    "technicianData",
    "sex",
    "choose",
    "workyear",
    "station",
    "statu",
    "sextypeo",
    "sexTypes",
    "marriage",
    "education",
    "relation",
    "servery",
    "startend"
  ],
  methods: {
    endEmpty(){
      if(this.startTime != this.startend.start){
         this.endTime = ''
      }
    },
    //全职兼职切换
    jobStatusTable(){
      if(this.perServer.jobNature == 'part_time'){
        this.perServer.workTimes = []
        this.roomSel1Arr = []
        this.roomSelNum = []
        this.disbArr = []
      }
    },
    //图片格式限制
    beforeAvatarUpload(file){
       if(file.type=='image/jpg' || file.type=='image/png' || file.type=='image/jpeg'){
        }else{
        this.$message.error('请上传正确的图片格式');
        return false
      }
    },
    //关闭弹窗
    closeThe(){
        this.flagso = false
        this.familyTable('perFamily')
        this.$emit("dialogvisibleedit")
        this.$emit("getlist",this.listquer.page)
        this.familyFlag = false
        this.$refs['personalEDit'].resetFields()
        this.$refs['perServer'].resetFields()
        this.isB = false
    },
    //其他信息保存
    sumitFormSub(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          loading = this.$loading({
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target: document.querySelector('.tabBox ')
          })
          this.otherInfo.id = this.techniEditId;
          technicianOther(this.otherInfo).then(data=>{
           if(data.data.code==1){
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                loading.close();
              }else{
               loading.close();
              }
          }).catch(error=>{
            loading.close();
            this.$message.error('保存失败')
            return false
          })
        }else{
          return false
        }
      })
    },
    //上传图片
    picUpload(file,flag){
      var type = file.file.name.split('.')
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
      pro.then(success=>{
        var data = success;
        var ossData = new FormData();
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var s = date.getTime()
        ossData.append("name",file.file.name);
        ossData.append(
          "key",
          data.dir + "/" + y + "/" + m + "/" + d + "/" + s + '.'+type[type.length-1]
        );
        ossData.append("policy", data.policy);
        ossData.append("OSSAccessKeyId", data.accessid);
        ossData.append("success_action_status", 201);
        ossData.append("signature", data.signature);
        // 添加文件
        ossData.append("file", file.file, file.file.name);
		
		that.$http
			.post(data.host,ossData,{
				headers:{
					"Content-Type": "multipart/form-data; boundary={boundary}"
				}
			})
			.then(res=>{
				if(flag == "head"){
					this.personalEDit.headPic = ossData.get("key")
				}else if(flag == "life"){
					this.otherInfo.lifePic = ossData.get("key")
				}else if(flag == 'cert'){
					this.otherInfo.jobPic = ossData.get("key")
				}else if(flag == 'after'){
          this.personalEDit.idCardPicAfter = ossData.get("key")
        }else{
					this.personalEDit.idCardPicBefor = ossData.get("key")
				}
      })
      .catch(error=>{
        if(flag == "head"){
					this.personalEDit.headPic = ossData.get("key")
				}else if(flag == "life"){
					this.otherInfo.lifePic = ossData.get("key")
				}else if(flag == 'cert'){
					this.otherInfo.jobPic = ossData.get("key")
				}else if(flag == 'after'){
          this.personalEDit.idCardPicAfter = ossData.get("key")
        }else{
					this.personalEDit.idCardPicBefor = ossData.get("key")
        }
        return false
      })
      })
    },
    familyTable(formName) {
      this.$refs[formName].resetFields();
    },
    eneryDate(val) {
      this.supplement.inJobTime = val;
    },
    //补充个人资料
    supplSub(formName) {
      this.$refs[formName].validate(valid=>{
        if(valid){
          loading = this.$loading({
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target: document.querySelector('.tabBox ')
          })
           var obj = {},
              _supplement = this.supplement;
            obj.id = this.techniEditId;
            obj.email = _supplement.email;
            obj.education = _supplement.education || null;
            obj.weight = _supplement.weight || null;
            obj.height = _supplement.height || null;
            obj.marryStatus = _supplement.marryStatus || null;
            obj.nativeProvinceCode = _supplement.nativeProvinceCode;
            obj.inJobTime = _supplement.inJobTime || null;
            obj.jobLevel = _supplement.jobLevel;
            obj.description = _supplement.description;
            technicianPlus(obj).then(data=>{
              if(data.data.code==1){
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                loading.close();
              }else{
               loading.close();
              }
            }).catch(error=>{
              loading.close();
              this.$message.error('保存失败')
              return false
            })
        }else{
          return false
        }
      })
    },
    //提交信息
    technicianEdit(obj){
      technicianEdit(obj)
        .then(data => {
          if (data.data.code==1) {
            this.$message({
              message: data.data.data,
              type: "success"
            });
            loading.close();
          } else {
            loading.close();
          }
        })
        .catch(error => {
          loading.close();
          return false
        });
    },
    chooseChange(value) {
      this.perServer.stationId = "";
      serviceStation({ cityCode: value })
        .then(data => {
          this.servery = data.data.data;
        })
        .catch(error => {
        });
    },

    //工作时间删除
    deletes(item,index) {
      this.disbArr = []
      // this.roomSelNum = []
      var arr = [].concat(this.perServer.workTimes)
      arr.splice(index,1)
      this.perServer.workTimes = arr

      for(var i =0 ; i<arr.length ; i++){
        for(var j =0 ; j<arr[i].weeks.length ; j++){
          this.disbArr.push(arr[i].weeks[j].id*1)
        }
      }
    },
    //个人资料保存
    perSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          loading = this.$loading({
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target: document.querySelector('.tabBox ')
          })
          var obj = {},
            _personalEDit = this.personalEDit;
          obj.id = this.techniEditId;
          obj.name = _personalEDit.name;
          obj.idCard = _personalEDit.idCard;
          obj.phone = _personalEDit.phone;
          obj.provinceCode = _personalEDit.area[0];
          obj.cityCode = _personalEDit.area[1];
          obj.areaCode = _personalEDit.area[2];
          obj.address = _personalEDit.address;
          obj.sex = _personalEDit.sex;
          obj.nation = _personalEDit.nation;
          obj.birthDate = _personalEDit.birthDate;
          obj.idCardPicBefor = _personalEDit.idCardPicBefor;
          obj.idCardPicAfter = _personalEDit.idCardPicAfter;
          obj.headPic = _personalEDit.headPic;
          obj.status = _personalEDit.status;
          this.technicianEdit(obj)
        } else {
          return false;
        }
      });
    },
    //服务保存
    submitForm(formName) {
      this.$refs[formName].validate(valid=>{
        if(valid){
          loading = this.$loading({
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target: document.querySelector('.tabBox ')
          })
            var obj = {},
          _perServer = this.perServer;
          obj.id = this.techniEditId
          obj.stationId = _perServer.stationId
          obj.jobNature = _perServer.jobNature
          obj.jobStatus = _perServer.jobStatus
          obj.workTime = _perServer.workTime
          if(_perServer.workTimes!=undefined && _perServer.workTimes.length>0){
            for(var i =0; i<_perServer.workTimes.length; i++){
              if(_perServer.workTimes[i].endTimeStr){
                _perServer.workTimes[i].endTime = _perServer.workTimes[i].endTimeStr
                _perServer.workTimes[i].startTime = _perServer.workTimes[i].startTimeStr
                if( _perServer.workTimes[i].endTime=='24:00'){
                  _perServer.workTimes[i].endTime = '23:59'
                }
              }
            }
          }
          obj.workTimes = _perServer.workTimes
          obj.skillIds = _perServer.skillIds
          technicianServer(obj).then(data=>{
            if(data.data.code==1){
              this.$message({
                message: data.data.data,
                type: "success"
              })
              loading.close();
            }else{
             loading.close();
            }
          }).catch(error=>{
            loading.close();
            this.$message.error('保存失败')
            return false
          })
          // this.technicianEdit(obj)
        }else{
          return false
        }
      })
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
    },
    //家庭表格删除
    handleModifyDelete(row, scope, name) {
      familyDelete({ id: row.id })
        .then(data => {
          if (data.data.code == 1) {
            this.familyList.splice(scope.$index, 1);
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.familyFlag = false
          } else {
           
          }
        })
        .catch(error => {
          this.$message.error("删除失败");
          return false;
        });
    },
    //家庭表格编辑
    handleModifyStatus(row, scope, status) {
      this.scopeId = scope.$index;
      this.flagso = true;
      this.perFamily = Object.assign({}, row);
      this.familyFlag = true;
    },
    showTabl() {
      this.flagso = !this.flagso;
    },
    order() {
      this.position = true;
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
      if(this.roomSelNum.indexOf(item.id) == -1){
        this.roomSelNum.push(item.id)
        this.roomSel1Arr.push(item)
      }else{
        this.remove(this.roomSelNum,this.roomSel1Arr,item.id)
      }
    },
    //排序
    by(property){
      return function(obj1,obj2){
          var value1 = obj1[property];
          var value2 = obj2[property];
          return value1 - value2;     // 升序
      }
    },
    techClick() {
      var c1 = Date.parse('2008-08-08 '+this.startTime);
      var c2 = Date.parse('2008-08-08 '+this.endTime);
      if(this.startTime && this.endTime && this.roomSel1Arr.length>0){
        if(c2>c1){
            var obj = {};
            var arr = []
            obj.startTimeStr = this.startTime
            obj.endTimeStr = this.endTime
            this.roomSel1Arr = this.roomSel1Arr.sort(this.by("id"))
            obj.weeks = [].concat(this.roomSel1Arr);
            for(var i = 0; i<obj.weeks.length; i++){
              this.disbArr.push(obj.weeks[i].id)
            }
            arr.push(obj)
            if(this.perServer.workTimes!=undefined&&this.perServer.workTimes.length>0){
              this.perServer.workTimes = this.perServer.workTimes.concat(arr)
            }else{
              this.perServer.workTimes = [].concat(arr)
            }
            this.isB = false;
            this.startTime = ''
            this.endTime = ''
        }else{
           this.$message({
              type: "warning",
              message: "结束时间不能小于开始时间"
            });
            return false
        }
      }else{
          this.$message.error("请选择日期、时段")
          return false
      }

      if (this.disbArr.length > 0) {
        this.disbArr.map(item => {
          if (this.roomSelNum.indexOf(item) != -1) {
            this.remove(this.roomSelNum, this.roomSel1Arr, item);
          }
        });
      }

    },
    roomSel2(index, key) {
      this.supplement.jobLevel = key;
      this.isA = key;
    },
    skill() {
      this.flage = false;
      this.flagso = true;
    },
    // 添加时间
    addtime() {
      this.isB = true;
      this.startTime = this.startend.start
      this.endTime = this.startend.end
    },
    addtimes() {
      this.isB = false;
    },
    addtimeno() {
      this.roomSel1Arr = []
      this.roomSelNum = []
      this.isB = false;
    },
    //家庭成员
    savrTable(formName) {
      var arr = [];
      var obj = Object.assign({}, this.perFamily);
      if(!this.familyFlag){
        if(obj.id){
          delete obj.id
        }
      }
      arr.push(obj);
      this.$refs[formName].validate(valid => {
        if (valid) {
           loading = this.$loading({
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target: document.querySelector('.tabBox ')
          })
          familyAdd({ id: this.techniEditId, familyMembers: arr })
            .then(data => {
              if (data.data.code==1) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                loading.close();
                this.familyList = data.data.data
                this.familyFlag = false;
                this.$refs[formName].resetFields();
              } else {
               loading.close();
              }
            })
            .catch(error => {
              loading.close();
              this.$message.error("保存失败");
              return false;
            });
        } else {
          return false;
        }
      });
    },
    dateChange(val) {
      this.personalEDit.birthDate = val;
    },
  },
  mounted() {
    this.startTime = this.startend.start
    this.endTime = this.startend.end
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
  computed:{
    sign(){
      return getSign();
    },
    pickerOptions0(){
          var data = new Date();
          var year = data.getFullYear();
          var month = data.getMonth() + 1;
          var day = data.getDate();
          var str = year+','+month+','+day
          var time1 = Date.parse(new Date('1950,1,1'))
          var time2 = Date.parse(new Date(str))
          return {
            disabledDate(time){
              return time.getTime() <time1 || time.getTime() > time2
            }
          }
      },
  }
};
</script>
<style>
* {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tech-section-lage .el-form-item__content{
	line-height: 20px;
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

/* .tech-index {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
} */

/* .tech {
  position: relative;
} */

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

.tech-section {
  /* margin: 20px; */
}
.perServer{
  margin-top: 10px;
}

.tech-section-right {
  display: flex;
  justify-content: flex-end;
  /* margin-top: 45px; */
}

/* .tech-section-ul {
  margin: 20px 0;
  display: flex; */
  /* justify-content: space-between; */
/* } */
/* 
.tech-table {
  margin: 20px;
  padding-bottom: 20px;
}

.tech-section-ul li {
  width: 32%;
  height: 200px;
  background: #fff;
  position: relative;
}

.tech-section-ul-posi {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
} */

.fy {
  /* margin: 0 20px; */
}

.tech-section-lage {
  /* margin: 0px; */
  padding: 0px;
  /* left: 40px; */
  width: 80%;
}
.tech-section-lage > div {
  margin: 0px;
  padding: 0px;
}
.tech-section-lage .el-dialog__footer{
  padding: 20px 0;
}
.perTech{
  border-bottom: 20px solid #f3f1f1;
}
.perTech .tech-ul{border-bottom: none;}

.tech-section-lage > div:nth-of-type(1) {
  padding: 0px 20px 0 20px;
  font-size: 14;
  font-weight: 700;
}
.tech-order-jn-sons .tech-dir{
  border: 1px solid #a7a7a7;
  background: url("../../../static/icon/eee.png") no-repeat;
  background-size: 15px 15px;
  background-position: bottom right;
}
.tech-edit .btn_Span1{
  font-size: 20px;
  line-height: 30px;
}

.tech-tc-prson {
  margin: 0px 20px;
  padding: 30px 20px 10px 0;
  border-bottom: #eee solid 1px;
  font-size: 14px;
  font-weight: 700;
  color: black;
}

.tech-ul {
  padding: 20px 40px 10px 25px;
  border-bottom: solid 20px #f3f1f1;
}

.tech-ul > li {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}

.tech-center {
  display: flex;
  justify-content: center;
}

.tech-ul li > div {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.tech-ul li div > p {
  display: flex;
}

.tech-span {
  color: red;
  width: 10px;
  /* display: block; */
}

.tech-ul li div p:nth-of-type(1) {
  width: 100px;
}

.remarkImg{
  /* width: 100px;
  height: 100px; */
  margin-top: 10px;
}
/* .el-button{
    border-radius:0px;
  } */

.tech-family-btn {
  border-radius: 0px;
  color: #fff;
  font-size: 16px;
  padding: 5px;
}
.tech-service{
  border-bottom: 0;
}

.avatarBack{
  /* position: absolute;
  left: 450px; */
  margin-left: 200px;
}

.tech-edit .tech-fourth {
  cursor: pointer;
  border: none;
  outline: none;
  height: 36px;
  font-size: 12px;
  text-align: center;
  width: 100px;
  color: #4c70e8 !important;
  background: #fff;
  border: 1px solid #4c70e8;
}

.seize .el-form-item__content{
  line-height: 38px;
}

.tech-edit .tech-fourth-rigth {
  cursor: pointer;
  border: none;
  outline: none;
  height: 36px;
  font-size: 12px;
  text-align: center;
  width: 100px;
  color: red !important;
  background: #fff;
  border: 1px solid red;
  /* margin-left: 40px; */
}
.weekDate+.serverPres .perServer{
  margin-top: 0px;
}
.workHours-time+.serverPres{
  margin-top: 20px;
}

.el-textarea__inner {
  border-radius: 0px;
}

.tech-edit .avatar-uploader .el-upload{
  border: none;
  border-radius: 0;
  width: 100px;
}

/* .el-upload-list {
  width: 80px;
  height: 100px;
} */
/* .tech-psoition {
  width: 100%;
  height: 320px;
  background: #fff;
  position: absolute;
  top: 77px;
  left: 0;
  z-index: 1;
  animation: show 1s;
  -moz-animation: show 1s;
  -webkit-animation: show 1s;
  -o-animation: show 1s;
} */
.avatar-header .el-upload--text{
  width: 120px;
  height: 120px;
  overflow: hidden;
}
.avatar-header .header-img{
  /* width: 120px;
  height: 120px;  */
}

@keyframes show {
  0% {
    height: 100px;
  }
  50% {
    height: 200px;
  }
  100% {
    height: 320px;
  }
}

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
}

.idBoxEdit{
  overflow: hidden;
}
.idBoxEdit .el-form-item{
  float: left;
}
.idBoxEdit>.avatar-uploader{
  margin-left: 20px;
  float: left;
}

.tech-positon-odvi {
  display: flex;
  justify-content: space-between;
}

.tech-pos-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.tech-green,
.techTime-green {
  border: solid 1px #4c70e8 !important;
  background: url("../../../static/icon/Selected.png") no-repeat;
  background-size: 15px 15px;
  background-position: bottom right;
}
.techTime-green {
  background-size: 15px 15px;
}

.tallys {
  color: #fff;
  font-size: 12px;
  position: absolute;
  margin-top: 10px;
  margin-left: 35px;
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
.startTime{
  margin-top:10px;
}

.btn_Span1 {
  width: 30px;
  height: 30px;
  background-color: #3A5FCD;
  font-weight: bolder;
  text-align: center;
}
.btn_Span2 {
  width: 70px;
  height: 30px;
  text-align: center;
}
.startTime .el-input__inner{
    border: 1px solid #bfcbd9 !important;
}

.tech-order-jn {
  width: 100%;
  height: 38px;
  border: 1px solid #bfcbd9;
  position: relative;
  line-height: 38px;
  /* margin-left:17px */
}

.tech-order-jn-son,
.tech-order-jn-sons {
  width: 100%;
  /* height: 100px; */
  border: 1px solid #bfcbd9;
  border-top: none;
  /* display: flex; */
  /* position: absolute; */
  background: #fff;
  /* z-index: 2; */
  /* top: 35px; */
  /* left: -1px; */
}

.tech-order-jn-sont {
  width: 545px;
  height: 40px;
  /* margin-top: 15px; */
  border: 1px solid #bfcbd9;
  /* border-top: none; */
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
  cursor: pointer;
  margin: 0 5px;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  /* height: 24px; */
  line-height: 26px;
  padding: 0 7px;
  justify-content: center;
  overflow: hidden;
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

.level .selfCheckBox:nth-of-type(1){
	margin-left:0; 
}

.tech-daytim {
  margin-left: 2px;
}

.tech-section-lages {
  width: 45%;
  left: 5%;
}

.tech-section-xiu {
  /* padding: 10px 30px; */
}

.tech-section-xiu > li {
  display: flex;
  padding: 10px;
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
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
}

.tech-xiu-div-one {
  width: 50%;
  text-align: center;
  /* display: flex;
     justify-content: center; */
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

/* .tech-mouse {
  width: 50px;
  height: 20px;
  line-height: 18px;
  background: #fff;
  display: block;

  text-align: center;
}

.tech-mouse-div {
  margin-top: 10px;
  display: inline-block;
  display: flex;
  justify-content: center;
}
.tech-mouse-div > span:nth-of-type(1) {
  margin-right: 5px;
  border: 1px solid #707cd2;
  color: #707cd2;
}

.tech-mouse-div > span:nth-of-type(2) {
  margin-left: 5px;
  border: 1px solid #ff7676;
  color: #ff7676;
} */
/* .working {
  border: 1px solid #f2f2f2;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 0 20px;
}
.working > li {
  position: relative;
  border-bottom: 1px solid #f2f2f2;
  padding-top: 15px;
} */
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
  padding: 10px 0;
}
#confirmation {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.button-large-fourth {
  /* display: block; */
  display:inline-block;
  widows: 20%;
  text-align: center;
  line-height: 34px;
}
.closeThe{
  /* margin: 20px 0;
  height: 30px;
  line-height: 30px; */
}
.level {
  flex: 1;
}
.level p:nth-child(1){
  padding-left: 10px;
}
.hours {
  align-items: flex-start;
}
.operation {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: red;
}
.operation:nth-child(1) {
  color: #4c70e8;
}
.tech-edit .avatar{
  /* width: 100%;
  height: 100%; */
  float: left;
  margin-top: 10px;
}
.el-form-item{
	margin-bottom: 22px;
}
.workHours{
	display: flex;
  /* height: 36px; */
	/* margin-bottom: 20px; */
}
.workHours .workHours-input{
  margin-bottom: 0;
  width: 100%;
}
.ferFamilyClass>li{
	padding-bottom: 0;
}
.upload-head,.upload-id{
  cursor:pointer;
  height: 36px;
  font-size: 12px;
  text-align: center;
  width: 100px;
  color: #4c70e8;
  background: #fff;
  border: 1px solid #4c70e8;
  line-height: 36px;
}
.upload-id{
  border: 1px solid red;
  color: red;
}
.ofterinfo{
  border-bottom: 0;
}
.techniFooter{
  text-align: center;
  padding:30px 0 ; 
}
.techniFooter .button-large-fourth{
  display: inline-block;
  width: 20%;
}
</style>
