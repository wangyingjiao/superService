<template>
  <div class="tech">
    <div class="tech-index">
      <div>
        <el-select v-model="techniSearch.stationId" clearable placeholder="选择服务站">
          <el-option v-for="(item,index) in server" :key="index" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="techniSearch.jobNature" clearable placeholder="岗位性质" style="margin-left:20px;">
          <!-- <el-option v-for="item in station" :key="item.value" :label="item.label" :value="item.value">
          </el-option> -->
						<el-option v-for="(item,key) in station" :key="key" :label="item" :value="key">
						</el-option>
        </el-select>
        <el-select v-model="techniSearch.chooses" clearable placeholder="请选择" style="margin-left:20px;">
          <el-option v-for="item in choose" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="chooContent" placeholder="输入要搜索的内容" style="width:200px;margin-left:20px;"></el-input>
        <button class="tech-btn" @click="order">选择技能</button>
      </div>

      <div>
        <button class="search-button el-icon-search" @click="techniSearchs"> 搜索</button>
      </div>
    </div>
    <div class="tech-section">
      <div class="tech-section-right">
        <button class="button-small  btn_pad ceshi ceshi5" v-if="btnShow.indexOf('techni_insert') > -1"  @click="dialogVisible = true">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>
      </div>
       <!-- <el-table 
          v-loading="listLoadingTech" 
          style="width: 100%" > -->
    <p class="p-show" v-show="techniList.length<=0 && !listLoadingTech">暂无数据</p>
    <div v-loading="listLoadingTech">
      <ul class="tech-section-ul">
        <li v-for="(item,$index) of techniList" @mousemove="mouser(item,$index)" @mouseout="mousout(item,$index)" :key="$index">
          <div class="tech-xiu-div">
            <div class="tech-xiu-div-one">
              <div class="headImag"><img :src="item.headPic" alt=""></div>
              <div style="margin-top:10px;">
                <span>{{item.sexname}}</span>
                <span>{{item.age}}</span>
              </div>
              <div class="tech-mouse-div">
                <span class="tech-mouse">{{item.jobName}}</span>
                <span class="tech-mouse">{{item.jobStateName}}</span>
              </div>
            </div>
            <div class="tech-xiu-div-two">
              <h4>{{item.name}}</h4>
              <div>              
                  <img src="../../../static/icon/服务机构.png" alt="" style="width:15px;height:15px;">              
                  <div style="margin-left:5px;">{{item.orgName}}</div>
              </div>
              <div>
                <img src="../../../static/icon/服务站.png" alt="" style="width:15px;height:15px;">              
                <div style="margin-left:5px;">{{item.stationName}}</div>
              </div>
              <div>
                <img src="../../../static/icon/工作经验.png" alt="" style="width:15px;height:15px;">              
                <div style="margin-left:5px;">{{item.workTimeName}}</div>
              </div>
              <div>
                <img src="../../../static/icon/手机.png" alt="" style="width:15px;height:15px;">              
                <div style="margin-left:5px;">{{item.phone}}</div>
              </div>
            </div>
          </div>

          <!-- 鼠标移入 --> 
          <div class="tech-section-ul-posi" v-show="item.ismouse">
            <div style="margin-right:20px;" @click="appPassword(item)">
              <img src="../../../static/icon/密码.png" alt="" style="width:30px">
            </div>
            <div  @click="vacation(item)">
              <img src="../../../static/icon/xiuxi.jpg" alt="" style="width:30px">
            </div>
             <!-- dialogVisibleEdit = true -->
            <div style="margin-left:20px;" @click="technician(item)">
              <img src="../../../static/icon/修改.png" alt="" style="width:30px">
            </div>
            <div style="margin-left:20px;" @click="techDelete(item)">
              <img src="../../../static/icon/删除.jpg" alt="" style="width:30px">
            </div>
          </div>
        </li>
      </ul>
    </div>
       <!-- </el-table> -->
      <!-- 密码弹出层 -->
      <el-dialog title="设置技师APP端登录密码" :visible.sync="password" custom-class="tech-section-lages" style="top：10%">
		<div class="mobel">
			<p>手机：</p>
			<p>15711445668</p>
		</div>
		<div class="passBox">
			<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				<el-form-item label="设置密码：" prop="pass">
					<el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="重复密码：" prop="checkPass">
					<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="passwordPrese('ruleForm2')">保存</el-button>
					<el-button @click="passwordCancel('ruleForm2')">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
      </el-dialog>
      <!-- 休息弹出层 -->
      <el-dialog title="休假" :visible.sync="flags" custom-class="tech-section-lages" style="top:10%;">
        <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> -->
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
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startDate" style="width: 100%;" format="yyyy-MM-dd" @change="startDateChange"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="startTime">
                    	<el-time-select
                          v-model="ruleForm.startTime"
                          :picker-options="{
                            start: '00:00',
                            step: '00:30',
                            end: '24:00'
                          }"
                          placeholder="选择时间">
                      </el-time-select>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="结束时间:" required>
                <el-col :span="11">
                  <el-form-item prop="endDate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endDate" style="width: 100%;" format="yyyy-MM-dd" @change="endDateChange"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="endTime">
                    <el-time-select
                          v-model="ruleForm.endTime"
                          :picker-options="{
                            start: '00:00',
                            step: '00:30',
                            end: '24:00'
                          }"
                          placeholder="选择时间">
                    </el-time-select>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="备注:" prop="desc">
                 <el-col :span="23">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                 </el-col>
              </el-form-item>
          </el-form>
        </div>
          <!-- <li>
				<el-form-item label="开始时间" required>
					<el-col :span="11">
						<el-form-item prop="date1">
							<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 200px;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-form-item prop="date2">
							<el-time-select
								v-model="ruleForm.date2"
								:picker-options="{
									start: '00:00',
									step: '00:30',
									end: '24:00'
								}"
								placeholder="选择时间">
							</el-time-select>
						</el-form-item>
					</el-col>
				</el-form-item>
			
          </li> -->
          <!-- <li> -->
			  <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> -->
				<!-- <el-form-item label="结束时间" required>
					<el-col :span="11">
						<el-form-item prop="date1">
							<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date3" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-form-item prop="date2">
							<el-time-select
								v-model="ruleForm.date4"
								:picker-options="{
									start: '00:00',
									step: '00:30',
									end: '24:00'
								}"
								placeholder="选择时间">
							</el-time-select>
						</el-form-item>
					</el-col>
				</el-form-item> -->
			<!-- </el-form> -->
          <!-- </li>
          <li> -->
            <!-- <div>备注</div>
            <div>
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3" style="width:493px;">
              </el-input>
            </div> -->
          <!-- </li> -->
          <div>
            <div style="display:flex;justify-content: center;width:100%">
              <button class="button-large" style="margin-right:10px;" @click="vacationPreser('ruleForm')">保存</button>
              <button class="button-cancel" @click="vacationCancel('ruleForm')">取消</button>
            </div>
          </div>
        <!-- </el-form> -->
      </el-dialog>
      <!-- 选择技能 -->
      <div class="tech-psoition" v-if="position">

        <div style="display:inline-block;margin-left:28px;" class="tech-positon-odvi">
          <div class="selfCheckBox positionbox" ref="sexOption" @click="roomSel2(item)" v-for="(item,$index) in sexTypeo" :class="{'tech-green':roomSel2Arr.indexOf(item.id)!=-1}" :key="$index">
            {{item.name}}
            <div :class="{'triangle-bottomright':item.show===true}"></div>
            <div class="tally">&#10004;</div>
          </div>
        </div>
        <div class="tech-pos-btn">
          <button @click="hiddenDiv" class="button-large" style="margin-right:40px;">确定</button>
          <button @click="hiddenDiv" class="button-cancel">取消</button>
        </div>
      </div>

    </div>
    <!-- 分页 -->
    <div v-show="!listLoading" class="pagination-container fy">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.sync"
        :page-sizes="[6,12,18,24]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 编辑技师 -->
	<el-dialog title="编辑技师" :visible.sync="dialogVisibleEdit" custom-class="tech-section-lage" class="tech-qj">
		<techni-edit :areaOptions="areaOptions" :technicianData="technicianData" 
                  :sex="sex" :choose="Choose" :workyear="workyear"
                  :station="station" :statu="statu" :sextypeo="sexTypeo" :sexTypes = "sexTypes"
                  :marriage="marriage" :education="education" :relation = "relation" @getlist="getList"
                  ></techni-edit>
	</el-dialog>
    <!-- 弹出层 新增技师-->
    <el-dialog @close="handleClose('personal')" title="新增技师" :visible.sync="dialogVisible" custom-class="tech-section-lage" class="tech-qj">
      <div>
        <!-- 个人资料 -->
        <h3 class="tech-tc-prson">个人资料</h3>
		<el-form :model="personal"  ref="personal"  label-width="100px" :rules="rulesPer">
			<ul class="tech-ul">
        <el-row :gutter="80">
          <el-col :span="12">
              <el-form-item label="姓名:" prop="name">
                <el-input placeholder="请输入2~15位姓名" v-model="personal.name"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="身份证号:" prop="idCard">
                <el-input placeholder="请输入正确的身份证号" v-model="personal.idCard"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="12">
              <el-form-item label="手机号:" prop="phone">
                <el-input placeholder="请输入11为手机号" v-model="personal.phone"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="现住地址:" prop="area">
                <el-cascader
                    @change="nowAdd"
                    :options="areaOptions"
                    :show-all-levels="true"
                    v-model="personal.area"
                ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
				<!-- <li>
					<div>
					<p>
						<el-form-item label="姓名:" prop="name">
							<el-input placeholder="请输入2~15位姓名" style="width:300px" v-model="personal.name"></el-input>
						</el-form-item>
					</p>
					</div>
					<div>
					<p>
						<el-form-item label="身份证号:" prop="idCard">
							<el-input placeholder="请输入正确的身份证号" style="width:300px" v-model="personal.idCard"></el-input>
						</el-form-item>
					</p>
					</div>
				</li> -->
				<!-- <li>
					<div>
					<p>
						<el-form-item label="手机号:" prop="phone">
							<el-input placeholder="请输入11为手机号" style="width:300px" v-model="personal.phone"></el-input>
						</el-form-item>
					</p>
					</div>
					<div>
					<p>
            <el-form-item label="现住地址:" prop="area">
              <el-cascader
                  @change="nowAdd"
                  :options="areaOptions"
                  :show-all-levels="true"
                  v-model="personal.area"
                  style='width: 300px;' 
              ></el-cascader>
            </el-form-item>
					</p>
					</div>
				</li> -->
				<li>
					<div>
					<p>
						<el-form-item label="性别:" prop="sex">
							<el-select v-model="personal.sex" clearable placeholder="请选择" style="width:300px">
								<el-option v-for="(item,key,index) in sex" :key="index" :label="item" :value="key">
								</el-option>
							</el-select>
						</el-form-item>
					</p>
					</div>
					<div>
					<p>
              <el-form-item label="">
                <el-input placeholder="请输入6-20位详细地址" style="width:300px" v-model="personal.address"></el-input>
              </el-form-item>
					</p>
					</div>
				</li>
				<li>
					<div>
					<p>
             <el-form-item label="民族:">
              <el-select v-model="personal.nation" clearable placeholder="请选择" style="width:300px">
                <el-option v-for="item in ethnics" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
             </el-form-item>
					</p>
					</div>
					<div>
					<p>
						<el-form-item label="出生日期:" prop="birtStr">
              <el-date-picker 
                  type="date" placeholder="选择日期" 
                  v-model="personal.birtStr" 
                  style="width: 300px;" format="yyyy-MM-dd"
                  @change="dateChange"
                  :picker-options="pickerOptions0">
               </el-date-picker>
						</el-form-item>
					</p>
					</div>
				</li>
        <li>
          <div>
            <p>
              <el-form-item label="状态：" class="seize">
                    <el-switch
                      v-model="personal.status"
                      on-text="上线"
                      off-text="暂停"
                      on-value="yes"
                      off-value="no">
                    </el-switch>
                </el-form-item>
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
              :http-request="(val)=>picUpload(val,'head')"
              >
              <el-button class="tech-fourth"><span></span>*上传头像</el-button>
              <img v-if="personal.headPic" :src="personal.headPic" class="avatar">
            </el-upload>

             <el-upload
              class="avatar-uploader"
              action="http://openservice.oss-cn-beijing.aliyuncs.com"
              :show-file-list="false"
              :http-request="(val)=>picUpload(val,'id')"
              style="margin-left:20px;" 
              >
              <el-button class="tech-fourth-rigth"><span></span>上传身份证</el-button>
              <img v-if="personal.idCardPic" :src="personal.idCardPic" class="avatar">
            </el-upload>
					</p>
					</div>
				</li>

        <!-- 服务信息 -->
        <h3 class="tech-tc-prson">服务信息</h3>
        <ul class="tech-ul tech-service">
          <li>
            <div>
              	<p>
					<el-form-item label="选择城市:" prop="serviceCityName">
						<el-select v-model="personal.serviceCityName" clearable placeholder="请选择" style="width:300px" @change="chooseChange">
							<el-option v-for="item in Choose" :key="item.cityCode" :label="item.cityName" :value="item.cityCode">
						</el-option>
						</el-select>
					</el-form-item>
              </p>
            </div>
            <div>
              <p>
				<el-form-item label="岗位性质:" prop="jobNature">
					<el-select v-model="personal.jobNature" clearable placeholder="请选择" style="width:300px">
						<el-option v-for="(item,key) in station" :key="key" :label="item" :value="key">
						</el-option>
					</el-select>
				</el-form-item>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p>
                <el-form-item label="所属服务站:" prop="stationId">
                  <el-select v-model="personal.stationId" clearable placeholder="请选择" style="width:300px">
                    <el-option v-for="(item,index) in servery" :key="index" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </p>
            </div>
            <div>
              <p>
                  <el-form-item label="岗位状态:" prop="jobStatus">
                      <el-select v-model="personal.jobStatus" clearable placeholder="请选择" style="width:300px">
                        <el-option v-for="(item,key) in statu" :key="key" :label="item" :value="key">
                        </el-option>
                      </el-select>
                  </el-form-item>
              </p>
            </div>
          </li>
          <li>
            <div>
                <p>
                  <el-form-item label="工作年限:" prop="workTime">
                    <el-select v-model="personal.workTime" clearable placeholder="请选择" style="width:300px">
                      <el-option v-for="(item,key) in workyear" :key="key" :label="item" :value="key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </p>
            </div>
            <div>
              <p>
                <el-form-item label="选择技能:" prop="skillIds">
                  <el-select v-model="personal.skillIds" multiple placeholder="请选择1" style="width:300px">
                    <el-option
                    v-for="(item,index) in sexTypeo"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </p>
            </div>
          </li>
          <li v-show="flagso">
            <div>
              <p><span class="tech-span"></span></p>
              <div class="tech-order-jn-sont">
              </div>
            </div>
          </li>
          <li v-if="personal.jobNature!='part_time'">
            <div>
              <el-form-item label="工作时间:" prop="workTimes">
                <div class="tech-order-jn">
                  <button class="tech-order-btn" @click="addtime"> &#10010; 添加时间</button>
                  <div class="tech-order-jn-sons" v-show="isB">
                    <div style="margin:0 10px;">
                      <p>新增日期</p>
                      <div>

                        <div style="display:flex;">
                          <div class="selfCheckBoxsday">日期</div>
                          <button class="selfCheckBoxs tech-order-posis" :disabled="disbArr.indexOf(item.id)!=-1" ref="sexOption" @click="roomSel1(item)" :key="$index" v-for="(item,$index) in sexDay" :class="{'tech-green':roomSelNum.indexOf(item.id)!=-1 || disbArr.indexOf(item.id)!=-1}">
                            {{item.name}}
                          </button>
                        </div>
                      </div>
                      <div style="margin-top:10px;">
                        <div class="selfCheckBoxsday">时段</div>
                        <el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{
                            start: '00:00',
                            step: '00:30',
                            end: '24:00'
                          }" class="tech-daytim">
                        </el-time-select>
                        <el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{
                            start: '00:00',
                            step: '00:30',
                            end: '24:00',
                            minTime: startTime
                          }">
                        </el-time-select>
                      </div>
                    </div>
                    <div style="margin:0px 10px 10px;">
                      <button class="button-large btn-styl" @click="techClick">确认</button>
                      <button class="button-cancel btn-styl" style="margin-left:20px" @click="addtimeno">取消</button>
                    </div>
                  </div>
                </div>
              </el-form-item>
              </div>

            <div v-show="teachArr.length>0">
              <ul class="working">
                <li v-for="(item,index) in teachArr" :key="index">
                  <div>
                    <div class="woking-div">
                      <div><span v-for="(data,i) in item.weeks" :key="i">{{data.name+"、"}}</span></div>
                      <div class="time">{{item.startTime+"~"+item.endTime}}</div>
                    </div>
                  </div>
                  <div>
                    <i class="i-delete" @click="deletes(index)">X</i>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li id="confirmation">
                <span class="button-large-fourth" @click="submitFormPer('personal')">保存信息</span>
                <span class="button-cancel-fourth" @click="handleClose('personal')">取消</span>
          </li>
        </ul>
		 </ul>
		</el-form>
      </div>

      <!-- <span slot="footer" class="dialog-footer"></span> -->
    </el-dialog>
  </div>
</template>
<script>
import {
  addTech,
  getTech,
  getEducations,
  getStrong,
  getHeight,
  getMatrimony,
  ChooseTheCity,
  serviceStation,
  Technician,
  technicianEditId,
  technicianDelete,
  appPassWord,
  addVacation
} from "@/api/tech";
import { getSign } from "@/api/sign";
import techniEdit from "./techniEdit.vue";
import { Whether } from "@/api/project";
import Cookies from "js-cookie";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
        callback(new Error("至少8个字符"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
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
    //身份证
    var TECHIDCARD = (rule, value, callback) => {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
      };
      var tip = "";
      var pass = true;
      if (
        !value ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
          value
        )
      ) {
        tip = "身份证号格式错误";
        callback(new Error(tip));
        pass = false;
      } else if (!city[value.substr(0, 2)]) {
        tip = "地址编码错误";
        callback(new Error(tip));
        pass = false;
      } else {
        if (value.length == 18) {
          value = value.split("");
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = value[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != value[17]) {
            tip = "校验位错误";
            callback(new Error(tip));
            pass = false;
          }
        }
      }

      if (pass) {
        callback();
      }
    };
    //手机号
    var TECHPHONE = (rule, value, callback) => {
      if (value) {
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error("手机号码有误，请重填"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入手机号"));
      }
    };
    //现住地址
    var ADDRESS = (rule, value, callback) => {
      console.log(rule, value, "value----现住地址");
      callback();
      // if(value.length>0){
      //   callback()
      // }else{
      //   callback(new Error("请选择现住地址"))
      // }
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
      if (this.teachArr.length > 0) {
        callback();
      } else {
        callback(new Error("请选择工作时间"));
      }
    };

    return {
      backId:'',//身份证头像
      headerBack:'',//头像
      //搜索
      techniSearch:{
        stationId:'',
        jobNature:'',
        skillIds:[],
        chooses:''
      },
      ruleForm: {
        startTime:'',
        startDate:'',
        endTime:'',
        endDate:'',
        desc:''
      },
      rules: {
        startTime: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        endDate:[
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        startDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        endTime:[
          {required: true, message: '请选择时间', trigger: 'change' }
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
        status: "", //状态
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区
        idCardPic: "", //身份证照片
        headPic: "", //头像
        workTimes: [
          //工作时间
          { startTime: "", endTime: "", weeks: [] } //开始时间,结束时间，星期几
        ],
        serviceCityName: "" //选择城市  不需要
      },
      Choose: [],
      mouserFlag: false,
      rulesPer: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        // 身份证
        idCard: [
          // { required: true, trigger: "blur" }
          {required:true, validator:TECHIDCARD ,trigger:'blur'}
        ],
        //手机号
        phone: [{ required: true, validator: TECHPHONE, trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "change" }],
        birtStr: [
          { type: "date", required: true, message: "请选择日期", trigger: "blur" }
        ],
        serviceCityName: [
          { required: true, message: "请选择城市", trigger: "change" }
        ],
        jobNature: [{ required: true, message: "请选择岗位", trigger: "change" }],
        stationId: [{ required: true, message: "请选择服务站", trigger: "change" }],
        jobStatus: [{ required: true, message: "请选择岗位状态", trigger: "change" }],
        workTime: [{ required: true, message: "请选择工作年限", trigger: "change" }],
        skillIds: [{ required: true, validator: SKILLIDS, trigger: "change" }],
        area: [{ required: true, validator: ADDRESS, trigger: "change" }],
        workTimes: [{ required: true, validator: WORKTIMES, trigger: "blur" }]
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
      infoname: [],
      chooContent:'',
      // infoname: [{
      //   value: '选项1',
      //   name: '李阿姨',
      //   addres: '国安社区',
      //   year: '3年',
      //   phone: '17188996644',
      //   ismouse: false,
      // }, {
      //   value: '选项1',
      //   name: '王阿姨',
      //   addres: '国安社区',
      //   year: '3年',
      //   phone: '17188996644',
      //   ismouse: false,
      // }, {
      //   value: '选项1',
      //   name: '赵阿姨',
      //   addres: '国安社区',
      //   year: '3年',
      //   phone: '17188996644',
      //   ismouse: false,
      // }],

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

      sex: {},
      ethnics: [],
      areas: [],
      strong: {},
      statu: {},
      education: {},
      height: [],
      place: [],
      caty: [
        {
          value: "选项1",
          label: "北京"
        },
        {
          value: "选项2",
          label: "天津"
        },
        {
          value: "选项3",
          label: "上海"
        },
        {
          value: "选项4",
          label: "重庆"
        },
        {
          value: "选项5",
          label: "河北"
        },
        {
          value: "选项6",
          label: "山西"
        },
        {
          value: "选项7",
          label: "辽宁"
        },
        {
          value: "选项8",
          label: "河南"
        }
      ],

      workyear: {},

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
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
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
      technicianData: [],
      sexTypes: {},
      sexTypeo: [],
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
      passwordId:null,
      isB: false,
      isTab: false,
      sexLen: "",
      binds: "",
      flagso: false,
      flags: false,
      password: false,
      flage: false,
      tableKey: "",
      cards: "",
      textarea3: "",
      radio8: "1",
      workyears: "",
      status: "",
      servers1: "",
      stationes: "",
      catys: "",
      area: [],
      techniList: [],
      places: "",
      marriages: "",
      vacationName:'',
      strongs: "",
      roomSel2Arr:[],
      heights: "",
      educations: "",
      sexs: "",
      ethnic: "",
      servers: "",
      stations: "",
      chooses: "",
      input: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      startTime: "",
      endTime: "",
      startTimes: "",
      endTimes: "",
      fileList2: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      position: false,
      listLoading: false,
      picFile:[],
      listLoadingTech:true,
      list: [1, 2, 3],
      total: null,
      listLoading: false,
      roomSel1Arr: [],
      disbArr: [],
      roomSelNum: [],
      yesNo: {},
      Duplicate: null,
      teachArr: [],
      listQuery: {
        page: 1,
        limit: 6,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
        sync:1
      },
      dialogVisible: false,
      dialogVisibleEdit: false,
      storeEnd:{
        endDate:'',
        storeDate:''
      }
    };
  },
  components: {
    techniEdit
  },
  computed: {
    //权限
    btnShow() {
      // console.log(this.$store.state.user.buttonshow,"this.$store.state.user.buttonshow")
      return this.$store.state.user.buttonshow;
    },
    areaOptions() {
      console.log(this.$store.state.user.area, "this.$store.state.user.area");
      return this.$store.state.user.area;
    },
    sign(){
      return getSign();
    }
  },
  methods: {
    picUpload(file,flag){
      let pro = new Promise((resolve, rej) => {
        console.log(JSON.parse(Cookies.get("sign")), "测试1111");
        var res = JSON.parse(Cookies.get("sign"));
        var timestamp = Date.parse(new Date()) / 1000;
        if (res.expire - 3 > timestamp) {
          console.log("签名没过期");
          resolve(res);
        } else {
          this.$http.get("/api/oss/getSign").then(res => {
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
        ossData.append("name",file.file.name);
        ossData.append(
          "key",
          data.dir + "/" + y + "/" + m + "/" + d + "/" + file.file.name
        );
        ossData.append("policy", data.policy);
        ossData.append("OSSAccessKeyId", data.accessid);
        ossData.append("success_action_status", 201);
        ossData.append("signature", data.signature);
        // 添加文件
        ossData.append("file", file.file, file.file.name);
        //this.ossData = ossData;
        console.log(ossData.get("name"),"ossData-----");
        console.log(ossData.get("key"),"ossData------");
        if(flag == "head"){
          this.personal.headPic = success.host+"/"+ossData.get("key")
        }else{
          this.personal.idCardPic = success.host+"/"+ossData.get("key")
        }
        
        // console.log(this.headerBack,"this.headerBack")
      })
    },
    //搜索
    techniSearchs(){
      console.log(this.techniSearch,"techniSearch--------")
      var obj = {}
      if(this.techniSearch.stationId){
        obj.stationId = this.techniSearch.stationId
      }
      if(this.techniSearch.jobNature){
        obj.jobNature = this.techniSearch.jobNature
      }
      if(this.techniSearch.chooses){
        obj[this.techniSearch.chooses] = this.chooContent
      }
      if(this.roomSel2Arr.length>0){
        obj.skillIds = this.roomSel2Arr
      }
      console.log(obj,"------------------")
      this.getList(1,6,obj)
    },
    startDateChange(val){
      this.storeEnd.storeDate = val
    },
    endDateChange(val){
      this.storeEnd.endDate = val
    },
    //休假取消
    vacationCancel(formName){
      this.$refs[formName].resetFields();
    },
    //休假保存
    vacationPreser(formName){
      this.$refs[formName].validate(val=>{
        if(val){
          var obj = {}
            obj.techId = this.passwordId
            obj.startTime = this.storeEnd.storeDate+" "+this.ruleForm.startTime+":00"
            obj.endTime = this.storeEnd.endDate+" "+this.ruleForm.endTime+":00"
            obj.remark = this.ruleForm.desc
            console.log(obj)
            addVacation(obj).then(data=>{
              console.log(data,"data---休假")
              if(data.data.code){
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.flags = false
              }else{
                this.$message.error(data.data.data)
                return false
              }
            }).catch(error=>{
              console.log(error,"error-----")
              return false
            })
        }else{
          this.$message.error("保存失败")
          return false
        }
      })
      //  console.log(this.ruleForm,"this.ruleForm")
      //  console.log(this.storeEnd,"storeEnd----")
    },
    //休假
    vacation(item){
      this.flags = true
      this.passwordId = item.id
      this.vacationName = item.name
    },
    //修改密码取消
    passwordCancel(formName){
      this.$refs[formName].resetFields();
    },
    //修改密码保存
    passwordPrese(formName){
      this.$refs[formName].validate(val=>{
        if(val){
          appPassWord({"id":this.passwordId,"appLoginPassword":this.ruleForm2.checkPass}).then(data=>{
            if(data.data.code){
              this.$message({
                message: "设置密码成功",
                type: "success"
              });
              this.passwordCancel('ruleForm2')
              this.password = false
            }else{
              this.$message.error("设置失败")
              return false
            }
          }).catch(error=>{
            this.$message.error("设置失败")
              return false
            console.log(error,"error---app密码错误")
          })
        }else{
          return false
        }
      })
    },
    //修改app密码
    appPassword(item){
      this.password = true
      this.passwordId = item.id
      // console.log(item,"item-----")
    },

    //技师编辑获取ID
    technician(item) {
      // console.log(item,"item-------")
      technicianEditId({ id: item.id })
        .then(data => {
          this.technicianData = data.data.data;
          this.dialogVisibleEdit = true;
        })
        .catch(error => {
          console.log(error, "error---技师编辑");
        });
    },
    //现住地址
    nowAdd(val) {
      this.personal.provinceCode = val[0]; //省
      this.personal.cityCode = val[1]; //市
      this.personal.areaCode = val[2]; //区
    },
    //选择城市
    chooseChange(value) {
      console.log(value, "value------");
      this.personal.stationId = "";
      serviceStation({ cityCode: value })
        .then(data => {
          // console.log(data,"所属服务区---------")
          this.servery = data.data.data;
        })
        .catch(error => {
          console.log(error, "error---techni.vue-----1071");
        });
    },
    handlePreview(file) {},
    handleClose(formName) {
      this.$refs[formName].resetFields();
      this.teachArr = [];
    },
    // 工作时间删除
    deletes(index) {
      this.teachArr.splice(index, 1);
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
       this.getList(val,this.listQuery.limit,{});
      console.log(val)
    },
    handleSizeChange(val) {
      this.listQuery.sync = 1
      this.listQuery.limit = val;
      this.getList(this.listQuery.page,val,{});
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
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
      if (this.roomSelNum.indexOf(item.id) == -1) {
        this.roomSelNum.push(item.id);
        this.roomSel1Arr.push(item);
      } else {
        this.remove(this.roomSelNum, this.roomSel1Arr, item.id);
      }
      //  console.log(this.roomSel1Arr,"this.roomSel1Arr-------")
      // console.log(this.roomSelNum,"this.roomSelNum-----")
      item.show = !item.show;
      //  console.log(item)
    },
    techClick() {
      if (this.disbArr.length > 0) {
        this.disbArr.map(item => {
          if (this.roomSelNum.indexOf(item) != -1) {
            this.remove(this.roomSelNum, this.roomSel1Arr, item);
          }
        });
      }
      var obj = {};
      obj.startTime = this.startTime + ":00";
      obj.endTime = this.endTime + ":00";
      obj.weeks = [].concat(this.roomSel1Arr);
      this.disbArr = this.disbArr.concat(this.roomSelNum);
      this.teachArr.push(obj);
      this.isB = false;
      console.log(this.teachArr, "this.teachArr--12323--");
    },
    techDelete(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(item,"item----")
          technicianDelete({"id":item.id}).then(data=>{
            this.$message({
              type: "success",
              message: "删除成功!"
            });
             this.getList(1,6,{})
          }).catch(error=>{
            console.log(error,"error,----删除失败")
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    roomSel2(index) {
      if(this.roomSel2Arr.indexOf(index.id)!=-1){
        this.remove(this.roomSel2Arr,[],index.id)
      }else{
        this.roomSel2Arr.push(index.id)
      }
      console.log(this.roomSel2Arr,"roomSel2Arr---------")
      this.isA = index;
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
    },
    addtimeno() {
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
    savrTable() {
      this.isTab = true;
    },
    dateChange(val) {
      this.personal.birthDate = val;
    },
    //个人资料保存
    submitFormPer(formName) {
      this.$refs[formName].validate(val=>{
        if(val){
          // this.personal.workTimes.workTime = this.disbArr
          this.personal.workTimes = this.teachArr;
          Technician(this.personal).then(data=>{
            if(data.data.code){
              this.$message({
                message:"保存成功",
                type:"success"
              })
               this.dialogVisible = false;
               this.this.techniList = [];
               this.getList(1,6,{})
            }else{
              this.$message({
                message:data.data.data,
                type:"warning"
              })
              return false
            }
          }).catch(error=>{
            console.log(error,"error---techni----添加保存")
            return false
          })
        }else{
          console.log(val,"false")
          return false
        }
      })
      // this.personal.workTimes.workTime = this.disbArr
      // this.personal.workTimes = this.teachArr
      // console.log(this.personal,"this.personal----")
      // this.$refs[formName].validate(val => {
      //   console.log(val, "val---");
      //   if (val) {
      //     this.personal.workTimes = this.teachArr;
      //     delete this.personal.birtStr;
      //     delete this.personal.area;
    },
    getList(num,size,obj){
          //技师编辑获取ID
    // console.log(this.areaOptions,"areaOptions----")
    //选择城市
        this.listLoadingTech = true
        ChooseTheCity(num,size,obj)
          .then(data => {
            this.listLoadingTech = false
            console.log(data, "选择城市---------");
            this.Choose = data.data.data.cityCodes;
            this.sexTypeo = data.data.data.skillInfos;
            this.infoname = data.data.data.page.list || [];
            this.server = data.data.data.stations
            this.total = data.data.data.page.count
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
              // 年龄
              // _infoname[i].birthDate?_infoname[i].birthDateName = year - _infoname[i].birthDate.slice(0,4)*1+1:''
              // 岗位性质
              _infoname[i].jobName =
                _infoname[i].jobNature == "full_time" ? "全职" : "兼职";
              // 岗位状态
              _infoname[i].jobStateName =
                _infoname[i].jobStatus == "online" ? "在职" : "离职";
              //工作年限
              if (_infoname[i].workTime == "0") {
                _infoname[i].workTimeName = "1年以下";
              } else if (_infoname[i].workTime == "11") {
                _infoname[i].workTimeName = "10年以上";
              } else {
                _infoname[i].workTimeName = _infoname[i].workTime + "年";
              }
              console.log(birth, "birth----");
            }
            this.techniList = this.infoname;
            console.log(this.techniList, "this.techniList----------");
          })
          .catch(error => {
            console.log(error, "error-----thechni.vue-----1211");
          });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  mounted() {
    this.getList(1,6,{})
    //性别,工作年限,岗位性质，岗位状态
    Whether()
      .then(({ data }) => {
        console.log(data, "xxxxxxx");
        this.sex = data.sex;
        this.workyear = data.work_time;
        this.station = data.job_natrue;
        this.statu = data.job_status;
        this.sexTypes = data.assess_grade;
        this.marriage = data.matrimony;
        this.education = data.education;
        this.relation = data.relation;
      })
      .catch(error => {
        console.log(error, "error-----techni.vue--1255");
      });
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
    // getMatrimony().then(res =>{
    //   if(res.status==200){
    //     // this.marriage=res.data
    //     // this.marriages=res.data[0].label
    //     // console.log(this.marriage)
    //   }else{
    //     console.log("错误")
    //   }
    // })
  }
};
</script>
<style>
* {
  list-style: none;
  margin: 0;
  padding: 0;
}

body {
  background: #eef1f6;
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
  margin-left: 20px;
  cursor: pointer;
  /* border: none; */
  outline: none;
  height: 36px;
  font-size: 12px;
  text-align: center;
  width: 80px;
}

.tech-btn-right {
  margin-left: 300px;
}

.tech-section {
  margin: 20px;
}

.tech-section-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 45px;
}

.tech-section-ul {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
}

.tech-table {
  margin: 20px;
  padding-bottom: 20px;
}

.tech-section-ul li {
  width: 32%;
  height: 200px;
  background: #fff;
  position: relative;
  margin: 0 2% 10px 0;
}
.tech-section-ul li:nth-child(3n) {
  margin-right: 0;
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
}

.fy {
  margin: 0 20px;
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
  padding: 20px 20px 0 20px;
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
}

.tech-ul li div > p {
  display: flex;
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

.el-upload-list {
  width: 80px;
  height: 100px;
}
.el-upload{
  width: 100px;
}
.tech-psoition {
  width: 100%;
  height: 320px;
  background: #fff;
  position: absolute;
  top: 77px;
  left: 0;
  z-index: 1;
  transition-duration: 5s;

  /* animation: show 1s; */
  /* -moz-animation: show 1s; */
  /* Firefox */
  /* -webkit-animation: show 1s; */
  /* Safari 和 Chrome */
  /* -o-animation: show 1s; */
}

/* @keyframes show {
  0% {
    height: 100px;
  }
  50% {
    height: 200px;
  }
  100% {
    height: 320px;
  }
} */

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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

.tech-green {
  border: solid 1px green;
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

.tech-order-jn {
  width: 300px;
  height: 36px;
  border: 1px solid #bfcbd9;
  position: relative;
  line-height: 36px;
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
  justify-content: space-around;
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

.mobel {
  margin-bottom: 22px;
  display: flex;
}
.mobel > p:nth-child(1) {
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
.working {
  border: 1px solid #f2f2f2;
  width: 400px;
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
.button-large-fourth,
.button-cancel-fourth {
  margin-right: 40px;
  display: block;
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
  display: none;
}
.el-pagination{
  padding-bottom: 50px;
  text-align: right;
}
.p-show{
  text-align: center;
  color: rgb(102, 102, 102)
}
.avatar{
  width: 100px;
  height: 100px;
  margin-top: 10px;
}
.passBox .el-form-item__content{
  display: flex;
  justify-content: center;
  margin-left: 0 !important;
}
.passBox .el-form-item__content button{
  padding: 10px 30px;
}
.passBox .el-form-item__content button:nth-child(1){
  color: #fff
}
.headImag{
  width:89px;
  height:89px;
  display:inline-block;
  border-radius:50%;
  overflow: hidden;
}
.headImag img{
  width: 89px;
  height: 89px;
  overflow: hidden;
}
</style>

<!--
// 身份证图片
// 头像图片
-->

