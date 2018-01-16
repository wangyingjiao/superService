<template>
      <div class="techniEdit">
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
                            action="http://openservice.oss-cn-beijing.aliyuncs.com"
                            :show-file-list="false"
                            :http-request="(val)=>picUpload(val,'head')"
                            :before-upload="beforeAvatarUpload"
                            >
                            <img v-if="personalEDit.headPic" :src="'https://openservice.oss-cn-beijing.aliyuncs.com/'+personalEDit.headPic" class="header-img">
                          </el-upload>
                          <p style="width:100%; color:#ccc; font-size:12px;">*为了浏览效果,建议上传大于240*240的正方形图片</p>
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
                          <el-date-picker v-model="personalEDit.birthDate" type="date" placeholder="选择日期" style="width:100%" @change="dateChange"
                          format="yyyy-MM-dd" :picker-options="pickerOptions0">
                          </el-date-picker>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="60">
                    <el-col :span="12">
                        <el-form-item prop="address">
                          <el-input placeholder="请输入6-20位详细地址"  v-model="personalEDit.address"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="民族:">
                            <el-select v-model="personalEDit.nation" clearable placeholder="请选择" style="width:100%">
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
                      <el-form-item label="状态：" class="seize">
                            <el-switch
                              v-model="personalEDit.status"
                              on-text="上线"
                              off-text="暂停"
                              on-value="yes"
                              off-value="no">
                            </el-switch>
                        </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="60">
                  <el-col :span="12">
                    <el-form-item label="身份证正面：">
                        <el-upload
                                class="avatar-uploader"
                                action="http://openservice.oss-cn-beijing.aliyuncs.com"
                                :show-file-list="false"
                                :http-request="(val)=>picUpload(val,'id')"
                                :before-upload="beforeAvatarUpload"
                                >
                                <div class="upload-head"><span>点击上传</span></div>
                                <img v-if="personalEDit.idCardPicBefor" :src="'https://openservice.oss-cn-beijing.aliyuncs.com/'+personalEDit.idCardPicBefor" class="avatar">
                          </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="身份证反面：">
                        <el-upload
                                class="avatar-uploader"
                                action="http://openservice.oss-cn-beijing.aliyuncs.com"
                                :show-file-list="false"
                                :http-request="(val)=>picUpload(val,'after')"
                                :before-upload="beforeAvatarUpload"
                                >
                                <div class="upload-head"><span>点击上传</span></div>
                                <img v-if="personalEDit.idCardPicAfter" :src="'https://openservice.oss-cn-beijing.aliyuncs.com/'+personalEDit.idCardPicAfter" class="avatar">
                          </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                      <span class="button-large-fourth" style="margin-left:100px;" @click="perSubmitForm('personalEDit')">保存信息</span>
                  </el-col>
                </el-row>
                <!-- 新的完成 -->
                <!-- <el-row :gutter="60">
                    <el-col :span="12">
                      <el-form-item label="姓名:" prop="name">
                        <el-input placeholder="请输入2~15位姓名" v-model="personalEDit.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="身份证号:" prop="idCard">
                        <el-input placeholder="请输入正确的身份证号" v-model="personalEDit.idCard"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row> -->
                <!-- <el-row :gutter="60">
                  <el-col :span="12">
                    <el-form-item label="手机号:" prop="phone">
                      <el-input placeholder="请输入11位手机号" v-model="personalEDit.phone"></el-input>
                    </el-form-item>
                  </el-col>
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
                </el-row> -->
                <!-- <el-row :gutter="60">
                    <el-col :span="12">
                      <el-form-item label="性别:" prop="sex">
                        <el-select v-model="personalEDit.sex" clearable placeholder="请选择" style="width:100%">
                          <el-option v-for="(item,key) in sex" :key="key" :label="item" :value="key">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="address">
                        <el-input placeholder="请输入6-20位详细地址"  v-model="personalEDit.address"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="60">
                      <el-col :span="12">
                        <el-form-item label="民族:">
                          <el-select v-model="personalEDit.nation" clearable placeholder="请选择" style="width:100%">
                            <el-option v-for="item in ethnics" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="出生日期:" prop="birthDate">
                          <el-date-picker v-model="personalEDit.birthDate" type="date" placeholder="选择日期" style="width:100%" @change="dateChange"
                          format="yyyy-MM-dd" :picker-options="pickerOptions0">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row :gutter="60">
                    <el-col :span="12">
                        <el-form-item label="状态：" class="seize">
                            <el-switch
                              v-model="personalEDit.status"
                              on-text="上线"
                              off-text="暂停"
                              on-value="yes"
                              off-value="no">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                  </el-row>
                  <li>
                      <div>
                      <p></p>
                      <p>
                        <el-upload
                            class="avatar-uploader"
                            action="http://openservice.oss-cn-beijing.aliyuncs.com"
                            :show-file-list="false"
                            :http-request="(val)=>picUpload(val,'head')"
                            :before-upload="beforeAvatarUpload"
                            >
                              <div class="upload-head"><span>*上传头像</span></div>
                            <img v-if="personalEDit.headPic" :src="'https://openservice.oss-cn-beijing.aliyuncs.com/'+personalEDit.headPic" class="avatar">
                          </el-upload>
                          <el-upload
                            class="avatar-uploader"
                            action="http://openservice.oss-cn-beijing.aliyuncs.com"
                            :show-file-list="false"
                            :http-request="(val)=>picUpload(val,'id')"
                            :before-upload="beforeAvatarUpload"
                            style="margin-left:20px;" 
                            >
                            <div class="upload-id"><span>上传身份证</span></div>
                            <img v-if="personalEDit.idCardPicBefor" :src="'https://openservice.oss-cn-beijing.aliyuncs.com/'+personalEDit.idCardPicBefor" class="avatar">
                          </el-upload>
                      </p>
                      </div>
                  </li>
                  <li>
                    <div>
                      <p></p>
                      <p>
                          <span class="button-large-fourth" @click="perSubmitForm('personalEDit')">保存信息</span>
                      </p>
                    </div>
                  </li> -->
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
                        <!-- <el-form-item label="选择城市:" prop="stationCityCode">
                          <el-select v-model="perServer.stationCityCode" clearable placeholder="请选择" style="width:100%" @change="chooseChange">
                            <el-option v-for="item in choose" :key="item.cityCode" :label="item.cityName" :value="item.cityCode">
                            </el-option>
                          </el-select>
                        </el-form-item> -->
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="岗位性质:" prop="jobNature">
                          <el-select v-model="perServer.jobNature" clearable placeholder="请选择" style="width:100%" @change="jobStatusTable">
                            <el-option v-for="(item,key) in station" :key="key" :label="item" :value="key">
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
                        <!-- <el-form-item label="所属服务站:" prop="stationId">
                          <el-select v-model="perServer.stationId" filterable clearable placeholder="请选择" style="width:100%">
                            <el-option v-for="(item,index) in servery" :key="index" :label="item.name" :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item> -->
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
                        <!-- <el-form-item label="工作年限:" prop="workTime">
                          <el-select v-model="perServer.workTime" clearable placeholder="请选择" style="width:100%">
                              <el-option v-for="(item,key) in workyear" :key="key" :label="item" :value="key">
                              </el-option>
                          </el-select>
                        </el-form-item> -->
                      </el-col>
                    </el-row>
                    <el-row :gutter="60">
                      <el-col :span="12">
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
                    <el-row class="workHours-time" :gutter="60" v-if="perServer.jobNature!='part_time'">
                      <el-col :span="18" class="workHours">
                        <!-- <p style="width:100px; line-height:36px;"><span class="tech-span">*</span>工作时间:</p> -->
                        <el-form-item label="工作时间：" class="workHours-input" prop="workTimes">
                          <div class="tech-order-jn">
                              <span class="tech-order-btn" @click="addtime"> &#10010; 添加时间</span>
                              <div class="tech-order-jn-sons" v-show="isB">
                              <div style="margin:0 10px;">
                                  <p>新增日期</p>
                                  <div>
                                    <div style="display:flex;">
                                        <div class="selfCheckBoxsday">日期</div>
                                        <!-- <button class="selfCheckBoxs tech-order-posis" ref="sexOption" @click="roomSel1(item)" v-for="(item,$index) in sexDay" :key="$index" 
                                        :class="{'techTime-green':roomSelNum.indexOf(item.id)!=-1 || disbArr.indexOf(item.id)!=-1}" :disabled="disbArr.indexOf(item.id)!=-1">
                                        {{item.name}}
                                      </button> -->
                                        <input type="button" class="selfCheckBoxs tech-order-posis"
                                            ref="sexOption" @click="roomSel1(item)"
                                            v-for="(item,$index) in sexDay" :key="$index"
                                            :class="{'techTime-green':roomSelNum.indexOf(item.id)!=-1 || disbArr.indexOf(item.id)!=-1}"
                                            :disabled="disbArr.indexOf(item.id)!=-1"
                                            :value="item.name">
                                    </div>
                                  </div>
                                  <div class="startTime">
                                    <div class="selfCheckBoxsday">时段</div>
                                    <el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '24:00',
                                        minTime:startend.start,
                                        maxTime:startend.end
                                        }" class="tech-daytim">
                                    </el-time-select>
                                    <el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{
                                        start: '00:00',
                                        step: '00:30',
                                        end: '24:00',
                                        minTime:startTime || startend.start,
                                        maxTime:startend.end
                                        }">
                                    </el-time-select>
                                  </div>
                              </div>
                              <div style="margin:0px 10px 10px;">
                                  <span class="button-large btn-styl" @click="techClick">确认</span>
                                  <input type="button" class="button-cancel btn-styl" style="margin-left:20px" @click="addtimeno" value="取消">
                                  <!-- <span class="button-cancel btn-styl" style="margin-left:20px" @click="addtimeno">取消</span> -->
                              </div>
                              </div>
                          </div>
                        </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="weekDate" :gutter="60" v-if="perServer.workTimes!=undefined && perServer.workTimes.length>0  && perServer.jobNature!='part_time'">
                    <el-col :span="18">
                      <el-form-item>
                        <ul class="working">
                          <li v-for="(item,index) in perServer.workTimes" :key="index">
                          <div>
                            <div class="woking-div">
                            <div><span v-for="(data,i) in item.weeks" :key="i">{{data.name+","}}</span></div>
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
                  <li class="serverPres">
                      <div>
                      <p></p>
                      <p>
                          <span class="button-large-fourth perServer" @click="submitForm('perServer')">保存信息</span>
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
                      <el-select v-model="supplement.height" clearable placeholder="请选择" style="width:100%">
                        <el-option v-for="item in height" :key="item.value" :label="item.value" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="体重:">
                      <el-select v-model="supplement.weight" clearable placeholder="请选择" style="width:100%">
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
                      style="width:100%"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                      @change="eneryDate"
                     >
                      <!-- :picker-options="pickerOptions0" -->
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
                        <span class="button-large-fourth" @click="supplSub('supplement')">保存信息</span>
                  </p>
                </div>
              </li>

            </ul>
          </el-form>
        <!-- 补充个人资料 完成-->

        <!--家庭成员（选填） -->
          <h3 class="tech-tc-prson">家庭成员（选填）</h3>
          <div class="tech-table" v-show="familyList.length>0">
            <!-- v-show="techTable" -->
            <el-table :key='tableKey' border v-show="familyList.length>0" :data="familyList" stripe v-loading="listLoading" element-loading-text="正在加载" fit highlight-current-row
              style="width: 100%">
              <!-- v-show="isTab" -->

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
                  <!-- <el-button size="small" @click="handleModifyStatus(scope.row,scope,'deleted')">编辑
                  </el-button>
                  <el-button size="small" type="danger" @click="handleModifyDelete(scope.row,scope,'deleted')">删除
                  </el-button> -->
                </template>
              </el-table-column>

            </el-table>
          </div>
          <div style="padding:25px">
            <el-button type="primary" icon="plus" @click="showTabl" class="tech-family-btn">家庭成员</el-button>
          </div>
          <el-form :model="perFamily"  ref="perFamily"  label-width="100px" :rules="rulesFamily">
              <ul class="tech-ul ferFamilyClass" v-show="flagso" style="padding-left:50px">
                  <li>
                      <div>
                          <!-- <p><span class="tech-span">*</span>关系:</p> -->
                          <p>
                              <el-form-item label="关系:" prop="relation">
                                  <el-select v-model="perFamily.relation" clearable placeholder="请选择" style="width:200px">
                                      <el-option v-for="(item,key,index) in relation" :key="index" :label="item" :value="key">
                                      </el-option>
                                  </el-select>
                              </el-form-item>
                          </p>
                      </div>
                  </li>
                  <li>
                      <div>
                      <!-- <p><span class="tech-span">*</span>名字:</p> -->
                      <p>
                          <el-form-item label="名字:" prop="memberName">
                <el-input placeholder="请输入2~15位姓名" style="width:200px" v-model="perFamily.memberName"></el-input>
              </el-form-item>
                      </p>
                      </div>
                  </li>
                  <li>
                      <div>
                      <!-- <p><span class="tech-span"></span>手机号:</p> -->
                          <p>
                              <el-form-item label="手机号:" prop="memberPhone">
                                  <el-input placeholder="请输入11位手机号" style="width:200px" v-model="perFamily.memberPhone"></el-input>
                              </el-form-item>
                          </p>
                      </div>
                  </li>
                  <li>
                      <div>
                      <!-- <p><span class="tech-span"></span>单位:</p> -->
                      <p>
                          <el-form-item label="单位:" prop= "memberCompany">
                              <el-input placeholder="请输入工作单位名称" style="width:200px" v-model="perFamily.memberCompany"></el-input>
                          </el-form-item>
                      </p>
                      </div>
                  </li>
                  <li>
                      <div>
                      <p>
                          <el-form-item label="职务:" prop="memberJob">
                              <el-input placeholder="请输入职务" style="width:200px" v-model="perFamily.memberJob"></el-input>
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
          </el-form>
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
                            action="http://openservice.oss-cn-beijing.aliyuncs.com"
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                            :http-request="(val)=>picUpload(val,'cert')"
                            >
                            <!-- <el-button class="tech-fourth"><span></span>上传证件照</el-button> -->
                            <div class="upload-head"><span>上传证件照</span></div>
                            <img v-if="otherInfo.jobPic" :src="'https://openservice.oss-cn-beijing.aliyuncs.com/'+otherInfo.jobPic" class="remarkImg">
                          </el-upload>
                          <el-upload
                            class="avatar-uploader"
                            action="http://openservice.oss-cn-beijing.aliyuncs.com"
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                            :http-request="(val)=>picUpload(val,'life')"
                            style="margin-left:20px;" 
                            >
                            <!-- <el-button class="tech-fourth-rigth"><span></span>上传生活照</el-button> -->
                            <div class="upload-id"><span>上传生活照</span></div>
                            <img v-if="otherInfo.lifePic" :src="'https://openservice.oss-cn-beijing.aliyuncs.com/'+otherInfo.lifePic" class="remarkImg">
                          </el-upload>
                      </p>
                  </div>
              </li>
              <li>
                  <div>
                      <p></p>
                      <p>
                          <span class="button-large-fourth" @click="sumitFormSub('otherInfo')">保存信息</span>
                      </p>
                  </div>
              </li>
          </ul>
        <!--其他信息完成 -->

        <!--关闭按钮-->
          <div class="techniFooter">
            <span class="button-large-fourth" @click="closeThe('perServer')">关闭</span>
          </div>
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
    //身份证
      // var TECHIDCARD = (rule, value, callback) => {
      //   var city = {
      //     11: "北京",
      //     12: "天津",
      //     13: "河北",
      //     14: "山西",
      //     15: "内蒙古",
      //     21: "辽宁",
      //     22: "吉林",
      //     23: "黑龙江 ",
      //     31: "上海",
      //     32: "江苏",
      //     33: "浙江",
      //     34: "安徽",
      //     35: "福建",
      //     36: "江西",
      //     37: "山东",
      //     41: "河南",
      //     42: "湖北 ",
      //     43: "湖南",
      //     44: "广东",
      //     45: "广西",
      //     46: "海南",
      //     50: "重庆",
      //     51: "四川",
      //     52: "贵州",
      //     53: "云南",
      //     54: "西藏 ",
      //     61: "陕西",
      //     62: "甘肃",
      //     63: "青海",
      //     64: "宁夏",
      //     65: "新疆",
      //     71: "台湾",
      //     81: "香港",
      //     82: "澳门",
      //     91: "国外 "
      //   };
      //   var tip = "";
      //   var pass = true;
      //   if (
      //     !value ||
      //     !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
      //       value
      //     )
      //   ) {
      //     tip = "身份证号格式错误";
      //     callback(new Error(tip));
      //     pass = false;
      //   } else if (!city[value.substr(0, 2)]) {
      //     tip = "身份证号格式错误";
      //     callback(new Error(tip));
      //     pass = false;
      //   } else {
      //     if (value.length == 18) {
      //       value = value.split("");
      //       var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //       var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
      //       var sum = 0;
      //       var ai = 0;
      //       var wi = 0;
      //       for (var i = 0; i < 17; i++) {
      //         ai = value[i];
      //         wi = factor[i];
      //         sum += ai * wi;
      //       }
      //       var last = parity[sum % 11];
      //       if (parity[sum % 11] != value[17]) {
      //         tip = "身份证号格式错误";
      //         callback(new Error(tip));
      //         pass = false;
      //       }
      //     }
      //   }
      //   if (pass) {
      //     callback();
      //   }
    // };
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
      console.log(rule, value, "value----现住地址");
      callback();
      // if(value.length>0){
      //   callback()
      // }else{
      //   callback(new Error("请选择现住地址"))
      // }
    };

    //出生日期
    var BIRTHDATE = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请输入出生日期"));
      }
    };

    //现住地址
    var SKILLIDS = (rule, value, callback) => {
      console.log(value, "value------");
      if (value!=undefined && value.length) {
        callback();
      } else {
        callback(new Error("请选择技能"));
      }
    };
    //邮箱
    var EMAIL = (rule,value,callback)=>{
      var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
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
        if(value.length>=6 && value.length<=20){
          callback()
        }else{
          callback(new Error('请输入6到20位的详细地址'))
        }
      }else{
        callback(new Error('请输入详细地址'))
      }
    }

    return {
      roomSelNum:[],
      techniEditId: "",
      roomSel1Arr: [],
      teachArr: [],
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
        sex: [{ required: true, message: "请输入性别", trigger: "change" }],
        birthDate: [
          { required: true, validator: BIRTHDATE, trigger: "change" }
        ],
        area: [{ required: true, validator: AREA, trigger: "change" }],
        address:[
          // {required:true,message:"请输入详细地址",trigger:'blur'},
          // { min: 6, max: 20, message: "请输入6~20位详细地址", trigger: "blur" }
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
        jobNature: [{ required: true, message: "请选择岗位", trigger: "change" }],
        stationId: [{ required: true, message: "请选择服务站", trigger: "change" }],
        jobStatus: [{ required: true, message: "请选择岗位状态", trigger: "change" }],
        workTime: [{ required: true, message: "请选择工作年限", trigger: "change" }],
        skillIds: [{ required: true, validator: SKILLIDS, trigger: "change" }],
        workTimes:[{required:true,validator:WORKTIMES, trigger: "change"}]
      },
      server: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],

      infoname: [
        {
          value: "选项1",
          name: "李阿姨",
          addres: "国安社区",
          year: "3年",
          phone: "17188996644",
          ismouse: false
        },
        {
          value: "选项1",
          name: "王阿姨",
          addres: "国安社区",
          year: "3年",
          phone: "17188996644",
          ismouse: false
        },
        {
          value: "选项1",
          name: "赵阿姨",
          addres: "国安社区",
          year: "3年",
          phone: "17188996644",
          ismouse: false
        }
      ],

      card: [
        {
          value: "选项1",
          label: "中国建行"
        },
        {
          value: "选项2",
          label: "中国银行"
        }
      ],
      ethnics: [],
      areas: [],
      strong: {},
      height: [],
      place: [],
      caty: [],

      bind: [
        {
          value: "选项1",
          label: "夫妻"
        },
        {
          value: "选项2",
          label: "父母"
        },
        {
          value: "选项3",
          label: "母女"
        },
        {
          value: "选项4",
          label: "母子"
        },
        {
          value: "选项5",
          label: "兄弟姐妹"
        },
        {
          value: "选项6",
          label: "亲戚"
        }
      ],
      sexType: [
        {
          sexName: "技能一",
          show: false
        },
        {
          sexName: "技能二",
          show: false
        },
        {
          sexName: "技能三",
          show: false
        },
        {
          sexName: "技能四",
          show: false
        },
        {
          sexName: "技能五",
          show: false
        },
        {
          sexName: "技能六",
          show: false
        },
        {
          sexName: "技能七",
          show: false
        },
        {
          sexName: "技能八",
          show: false
        },
        {
          sexName: "技能一",
          show: false
        },
        {
          sexName: "技能二",
          show: false
        },
        {
          sexName: "技能三",
          show: false
        },
        {
          sexName: "技能四",
          show: false
        },
        {
          sexName: "技能五",
          show: false
        },
        {
          sexName: "技能六",
          show: false
        },
        {
          sexName: "技能七",
          show: false
        },
        {
          sexName: "技能八",
          show: false
        },
        {
          sexName: "技能四",
          show: false
        },
        {
          sexName: "技能五",
          show: false
        },
        {
          sexName: "技能六",
          show: false
        },
        {
          sexName: "技能七",
          show: false
        },
        {
          sexName: "技能八",
          show: false
        },
        {
          sexName: "技能八",
          show: false
        }
      ],
      sexTypeo: [
        {
          sexName: "技能一",
          show: false
        },
        {
          sexName: "技能二",
          show: false
        },
        {
          sexName: "技能三我我",
          show: false
        },
        {
          sexName: "技能四",
          show: false
        },
        {
          sexName: "技能五",
          show: false
        }
      ],
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
      scopeItem: {},
      key: false,
      isA: null,
      isB: false,
      isTab: false,
      sexLen: "",
      binds: "",
      flagso: false,
      flags: false,
      password: false,
      flage: false,
      tableKey: "",
      familyFlag: false,
      cards: "",
      textarea3: "",
      radio8: "1",
      workyears: "",
      status: "",
      servers1: "",
      stationes: "",
      catys: "",
      area: [],
      places: "",
      marriages: "",
      strongs: "",
      heights: "",
      educations: "",
      sexs: "",
      ethnic: "",
      servers: "",
      stations: "",
      chooses: "",
      addrDetailInfo: "",
      input: "",
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
      fileList2: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      position: false,
      listLoading: false,
      familyList: [],
      total: null,
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
        console.log(
          val,
          "------------------------w-a-t-c-h--------------------------------"
        );
        //获取技师id
        this.techniEditId = val.id;
        this.disbArr = [];

        /*
        **个人资料
        **
        */
        // this.personalEDit = Object.assign({}, val);
        // this.personalEDit.area = [val.provinceCode, val.cityCode, val.areaCode];
        // this.personalEDit.birthDate = val.birthDate
        // if("nation" in val){
          
        // }else{
        //   this.personalEDit.nation = ''
        // }
        // console.log(this.personalEDit,"this.personalEDit---")
        // this.personalEDit.techBirthDate = val.birthDate;
        // console.log( this.personalEDit," this.personalEDit-----")


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
        
        // this.perServer = Object.assign({}, val);
        // this.servery = val.stations;
        // this.perServer.workTime = val.workTime+''
        // this.perServer.skillIds = val.skillIds || [];


        this.perServer.stationId = val.stationId
        this.perServer.jobNature = val.jobNature
        this.perServer.jobStatus = val.jobStatus
        this.perServer.skillIds = val.skillIds || []
        this.perServer.workTime = val.workTime+''
        this.perServer.workTimes = val.workTimes
        // this.perServer.serviceCityName = val.stationCityCode;
        console.log(this.perServer,"this.perServer----------------------____________++++++++++++===")
        // this.perServer.stationId = val.stationId
        // //工作时间默认选中
        var work = val.workTimes || [],
            i,j,weeks_i,num;
        if(work.length>0){
          for(i = 0 ; i<work.length;i++){
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
        // this.perServer.workTimes = work
        console.log(this.perServer.workTimes,"this.perServer.workTimes-------")


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
    //全职兼职切换
    jobStatusTable(){
      if(this.perServer.jobNature == 'part_time'){
        this.perServer.workTimes = []
        this.roomSelNum = []
        this.disbArr = []
      }
    },
    //图片格式限制
    beforeAvatarUpload(file){
       if(file.type=='image/jpg' || file.type=='image/png' || file.type=='image/jpeg'){
        console.log(file.type,"file.type-----------")
        }else{
         console.log(file.type,"file.type-----------+++++++++")
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
          this.otherInfo.id = this.techniEditId;
          // this.technicianEdit(this.otherInfo)
          technicianOther(this.otherInfo).then(data=>{
           if(data.data.code){
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              }else{
                this.$message.error(data.data.data)
                return false
              }
          }).catch(error=>{
            this.$message.error('保存失败')
            return false
            console.log(error)
          })
        }else{
          return false
        }
      })
    },
    //上传图片
    picUpload(file,flag){
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
          data.dir + "/" + y + "/" + m + "/" + d + "/" + s + '.jpg'
        );
        ossData.append("policy", data.policy);
        ossData.append("OSSAccessKeyId", data.accessid);
        ossData.append("success_action_status", 201);
        ossData.append("signature", data.signature);
        // 添加文件
        ossData.append("file", file.file, file.file.name);
        //this.ossData = ossData;
        // console.log(ossData.get("name"),"ossData-----");
        // console.log(ossData.get("key"),"ossData------");
		
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
        
        // console.log(this.headerBack,"this.headerBack")
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
            console.log(obj, "objobjobj-------");
            technicianPlus(obj).then(data=>{
              if(data.data.code){
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              }else{
                this.$message.error(data.data.data)
                return false
              }
            }).catch(error=>{
              this.$message.error('保存失败')
              return false
              console.log(error)
            })
            // this.technicianEdit(obj)
        }else{
          return false
        }
      })
    },
    //提交信息
    technicianEdit(obj){
      technicianEdit(obj)
        .then(data => {
          if (data.data.code) {
            this.$message({
              message: "保存成功",
              type: "success"
			});
			// this.$emit("dialogvisibleedit")
            // this.$emit("getlist",this.listquer.page)
          } else {
             this.$message.error(data.data.data);
            return false;
          }
          // console.log(data,"-----------datathis.supplement----")
        })
        .catch(error => {
          console.log(error, "error------techniEdit");
          return false
        });
    },
    chooseChange(value) {
      this.perServer.stationId = "";
      serviceStation({ cityCode: value })
        .then(data => {
          console.log(data,"data-------")
          this.servery = data.data.data;
        })
        .catch(error => {
          console.log(error, "error---techni.vue-----1071");
        });
    },

    handlePreview(file) {},
    //工作时间删除
    deletes(item,index) {
      this.disbArr = []
      this.roomSelNum = []
      var arr = [].concat(this.perServer.workTimes)
      arr.splice(index,1)
      this.perServer.workTimes = arr

      // for(var i = 0; i<item.weeks.length; i++){
      //   this.remove(this.roomSelNum,this.disbArr,item.weeks[i].id)
      // }

      for(var i =0 ; i<arr.length ; i++){
        for(var j =0 ; j<arr[i].weeks.length ; j++){
          this.disbArr.push(arr[i].weeks[j].id*1)
          this.roomSelNum.push(arr[i].weeks[j].id*1)
        }
      }

      // disbArr
      // console.log(this.disbArr,"this.disbArr-----")
      // for(var i = 0; i<item.weeks.length; i++){
      //   if(this.disbArr.indexOf(item.weeks[i].id*1)!=-1){
      //     this.disbArr.splice(i+1,1)
      //   }
      //   // this.remove(this.disbArr,item.weeks[i].id*1)
      //   // this.remove(this.disbArr,item.weeks[i].id)
      //   // if(this.disbArr.indexOf(item.weeks[i].id*1)>-1){
      //   //   this.disbArr.splice(index,1)
      //   // }
      // }
      console.log(this.disbArr,"this.disbArr222222-----------")
    },
    //个人资料保存
    perSubmitForm(formName) {
      // console.log(this.personalEDit,"personalEDit-------")
      this.$refs[formName].validate(valid => {
        if (valid) {
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
          console.log(obj, "obj-----");
          this.technicianEdit(obj)
        } else {
          // this.$message.error("保存失败");
          return false;
        }
      });
    },
    //服务保存
    submitForm(formName) {
      this.$refs[formName].validate(valid=>{
        if(valid){
            var obj = {},
          _perServer = this.perServer;
          obj.id = this.techniEditId
          obj.stationId = _perServer.stationId
          obj.jobNature = _perServer.jobNature
          obj.jobStatus = _perServer.jobStatus
          obj.workTime = _perServer.workTime
          obj.workTimes = _perServer.workTimes
          obj.skillIds = _perServer.skillIds
          console.log(obj,"this.perServer--------")
          technicianServer(obj).then(data=>{
            if(data.data.code){
              this.$message({
                message: "保存成功",
                type: "success"
              })
            }else{
              this.$message.error(data.data.data)
              return false
            }
          }).catch(error=>{
            this.$message.error('保存失败')
            return false
            console.log(error,"error-----------")
          })
          // this.technicianEdit(obj)
        }else{
          return false
        }
      })
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     // alert('true')
      //   } else {
      //     alert("false");
      //     return false;
      //   }
      // });
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      // this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      // this.getList();
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
            this.$message.error(data.data.data);
            return false;
          }
        })
        .catch(error => {
          console.log(error, "error----家庭表格删除");
          this.$message.error("删除失败");
          return false;
        });
    },
    //家庭表格编辑
    handleModifyStatus(row, scope, status) {
      this.scopeId = scope.$index;
      // alert(this.scopeId)
      this.flagso = true;
      this.perFamily = Object.assign({}, row);
      console.log(this.perFamily, "row-------");
      this.familyFlag = true;
      // this.$message({
      //   message: "操作成功",
      //   type: "success"
      // });
      // row.status = status;
    },
    showTabl() {
      this.flagso = !this.flagso;
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
      // console.log(item,"item----")
      if(this.roomSelNum.indexOf(item.id) == -1){
        this.roomSelNum.push(item.id)
        this.roomSel1Arr.push(item)
      }else{
        this.remove(this.roomSelNum,this.roomSel1Arr,item.id)
      }
      // this.roomSel1Arr.push(item);
      // console.log(this.roomSel1Arr, "this.roomSel1Arr-------");
      // console.log(this.teachArr, "this.arr-----");
      // item.show = !item.show;
      //  console.log(item)
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
            obj.startTime = this.startTime
            obj.endTime = this.endTime
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
      console.log(index, key);
      this.isA = key;
    },
    // 添加技能
    orderson() {
      this.flage = true;
    },
    skill() {
      this.flage = false;
      this.flagso = true;
    },
    skillq() {
      this.flage = false;
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
    mouser(item) {
      item.ismouse = true;
    },
    mousout(item) {
      item.ismouse = false;
    },
    //家庭成员
    savrTable(formName) {
      var arr = [];
      var obj = Object.assign({}, this.perFamily);
      // arr.push(obj);
      if(!this.familyFlag){
        if(obj.id){
          delete obj.id
        }
      }
      arr.push(obj);
      this.$refs[formName].validate(valid => {
        if (valid) {
          familyAdd({ id: this.techniEditId, familyMembers: arr })
            .then(data => {
              if (data.data.code) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.familyList = data.data.data
                console.log(data,"-------------------------------------------____________________________________++++++++++++++++++")
                // if (this.familyFlag) {
                //   console.log(obj,"obj----------------")
                //   alert("编辑")
                //   this.$set(this.familyList, this.scopeId, obj);
                // } else {
                //   console.log(obj,"obj----------------")
                //   alert("添加")
                //   this.familyList.push(obj);
                // }
                this.familyFlag = false;
                this.$refs[formName].resetFields();
              } else {
                this.$message.error(data.data.data);
                return false;
              }
            })
            .catch(error => {
              this.$message.error("保存失败");
              return false;
              console.log(error, "error-----techniEdit");
            });
        } else {
          return false;
        }
      });
      // this.isTab = true;
    },
    dateChange(val) {
      // console.log(val,"------------")
      this.personalEDit.birthDate = val;
    },
    create() {
      // var time = String(this.value1);
      // var obj = {
      //   techName: this.techName,
      //   techldCard: this.techldCard,
      //   techPhone: this.techPhone,
      //   techSex: this.sexs,
      //   techNation: this.ethnic,
      //   addrDetailInfo: this.addrDetailInfo,
      //   techBirthDate: this.value1,
      //   images: [
      //     {
      //       id: "",
      //       imgType: "",
      //       imgUrl: ""
      //     }
      //   ]
      // };
      // addTech(obj).then(res => {
      //   console.log(res)
      // })
      (this.techName = ""), console.log(obj), console.log(time);
      // console.log(d)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
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

.tech-index {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  left: 40px;
  width: 60%;
}
.tech-section-lage > div {
  margin: 0px;
  padding: 0px;
}

.tech-section-lage > div:nth-of-type(1) {
  padding: 0px 20px 0 20px;
  font-size: 14;
  font-weight: 700;
}

.tech-tc-prson {
  margin: 0px 20px;
  padding: 30px 20px 10px 0;
  border-bottom: #f3f1f1 solid 1px;
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
  width: 100px;
  height: 100px;
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
}

/* .el-upload-list {
  width: 80px;
  height: 100px;
} */
.tech-psoition {
  width: 100%;
  height: 320px;
  background: #fff;
  position: absolute;
  top: 77px;
  left: 0;
  z-index: 1;
  animation: show 1s;
  -moz-animation: show 1s;
  /* Firefox */
  -webkit-animation: show 1s;
  /* Safari 和 Chrome */
  -o-animation: show 1s;
}
.avatar-header .el-upload--text{
  width: 100px;
}
.avatar-header .header-img{
  width: 100px;
  height: 100px;
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
  border: solid 1px green;
  background: url("../../../static/icon/Selected.png") no-repeat;
  background-size: 20px 20px;
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
.startTime .el-input__inner{
    border: 1px solid #bfcbd9 !important;
}

.tech-order-jn {
  width: 100%;
  height: 36px;
  border: 1px solid #bfcbd9;
  position: relative;
  line-height: 36px;
  /* margin-left:17px */
}

.tech-order-jn-son,
.tech-order-jn-sons {
  width: 545px;
  /* height: 100px; */
  border: 1px solid #bfcbd9;
  border-top: none;
  /* display: flex; */
  position: absolute;
  background: #fff;
  z-index: 2;
  top: 35px;
  left: -1px;
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

.selfCheckBox:nth-of-type(1){
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

.tech-mouse {
  width: 50px;
  height: 20px;
  line-height: 18px;
  background: #fff;
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
.tech-mouse-div > span:nth-of-type(1) {
  margin-right: 5px;
  border: 1px solid #707cd2;
  color: #707cd2;
}

.tech-mouse-div > span:nth-of-type(2) {
  margin-left: 5px;
  border: 1px solid #ff7676;
  color: #ff7676;
}
.working {
  border: 1px solid #f2f2f2;
  width: 100%;
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
  display: block;
  text-align: center;
  line-height: 34px;
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
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.el-form-item{
	margin-bottom: 22px;
}
.workHours{
	display: flex;
  height: 36px;
	/* margin-bottom: 20px; */
}
.workHours .workHours-input{
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
}
.techniFooter span{
  display: inline-block;
  width: 20%;
  margin-bottom: 30px;
}
</style>
