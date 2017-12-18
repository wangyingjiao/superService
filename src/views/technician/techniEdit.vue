<template>
      <div>
        <!-- 个人资料 -->
        <h3 class="tech-tc-prson">个人资料</h3>
        <el-form :model="personalEDit"  ref="personalEDit"  label-width="100px" :rules="rulesPerEdit">
            <ul class="tech-ul">
                <li>
                    <div>
                       <p>
                            <el-form-item label="姓名:" prop="techName">
                                <el-input placeholder="请输入2~15位姓名" style="width:300px" v-model="personalEDit.techName"></el-input>
                            </el-form-item>
					    </p>
                    </div>
                    <div>
                        <p>
                            <el-form-item label="身份证号:" prop="techIdCard">
                                <el-input placeholder="请输入正确的身份证号" style="width:300px" v-model="personalEDit.techIdCard"></el-input>
                            </el-form-item>
					    </p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>
                            <el-form-item label="手机号:" prop="techPhone">
                                <el-input placeholder="请输入11为手机号" style="width:300px" v-model="personalEDit.techPhone"></el-input>
                            </el-form-item>
					    </p>
                    </div>
                    <div>
                       <p><span class="tech-span"></span>现住地址:</p>
                        <p>
                            <el-select v-model="area" clearable placeholder="请选择" style="width:300px">
                            <el-option v-for="item in areas" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                            </el-select>
                        </p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>
                            <el-form-item label="性别:" prop="techSex">
                                <el-select v-model="personalEDit.techSex" clearable placeholder="请选择" style="width:300px">
                                    <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </p>
                    </div>
                    <div>
                    <p></p>
                    <p>
                        <el-input placeholder="请输入6-20位详细地址" style="width:300px" v-model="addrDetailInfo"></el-input>
                    </p>
                    </div>
                </li>
                <li>
                    <div>
                    <p><span class="tech-span"></span>民族:</p>
                    <p>
                        <el-select v-model="personalEDit.techNation" clearable placeholder="请选择" style="width:300px">
                        <el-option v-for="item in ethnics" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                        </el-select>
                    </p>
                    </div>
                    <div>
                        <p>
						<el-form-item label="出生日期:" prop="techBirthDate">
							<el-date-picker v-model="personalEDit.techBirthDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0" style="width:300px" @change="dateChange"
							format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
					</p>
                    </div>
                </li>
                <li>
                    <div>
                    <p></p>
                    <p>
                        <!-- <button class="tech-fourth">上传头像</button> -->
                        <el-upload class="upload-demo" action="http://gemini-wlcb.oss-cn-beijing.aliyuncs.com" :on-preview="handlePreview" :on-remove="handleRemove"
                        :file-list="fileList2" list-type="picture" :data="sign">
                        <el-button class="tech-fourth"><span>*</span>上传头像</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                        </el-upload>
                        <!-- <button class="tech-fourth-rigth">上传身份证</button> -->
                        <el-upload class="upload-demo" action="http://gemini-wlcb.oss-cn-beijing.aliyuncs.com" :on-preview="handlePreview" :on-remove="handleRemove"
                        :file-list="fileList2" list-type="picture" style="margin-left:40px;" :data="sign">
                        <el-button class="tech-fourth-rigth">上传身份证</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                        </el-upload>
                    </p>
                    </div>
                </li>
                <li>
                    <div>
                    <p></p>
                    <p>
                        <span class="button-large-fourth" @click="submitForm('personalEDit')">保存并创建</span>
                    </p>
                    </div>
                </li>
            </ul>
        </el-form>
        
        <!-- 服务信息 -->
        <h3 class="tech-tc-prson">服务信息</h3>
        <el-form :model="perServer" :rules="rulesServer" ref="perServer" label-width="100px" class="demo-ruleForm">
            <ul class="tech-ul">
                <li>
                    <div>
                        <p>
                            <el-form-item label="选择城市:" prop="serviceCityName">
                                <el-select v-model="perServer.serviceCityName" clearable placeholder="请选择" style="width:300px">
                                    <el-option v-for="item in caty" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                                </el-select>
                            </el-form-item>
                        </p>
                    </div>
                    <div>
                        <p>
                            <el-form-item label="岗位性质:" prop="jobNatrue">
                                <el-select v-model="perServer.jobNatrue" clearable placeholder="请选择" style="width:300px">
                                    <el-option v-for="item in station" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </p>
                    </div>
                </li>
                <li>
                    <div>
                        <p>
                            <el-form-item label="所属服务站:" prop="stationName">
                                <el-select v-model="perServer.stationName" clearable placeholder="请选择" style="width:300px">
                                    <el-option v-for="item in servery" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </p>
                    </div>
                    <div>
                        <p>
                            <el-form-item label="岗位状态:" prop="jobStatus">
                                <el-select v-model="perServer.jobStatus" clearable placeholder="请选择" style="width:300px">
                                    <el-option v-for="item in statu" :key="item.value" :label="item.label" :value="item.value">
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
                                <el-select v-model="perServer.workTime" clearable placeholder="请选择" style="width:300px">
                                    <el-option v-for="item in workyear" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </p>
                    </div>
                    <div>
                        <p>
                            <el-form-item label="选择技能:" prop="skills">
                                <el-select v-model="perServer.skills" multiple placeholder="请选择" style="width:300px">
                                    <el-option
                                    v-for="(item,index) in sexTypeo"
                                    :key="index"
                                    :label="item.sexName"
                                    :value="item.sexName">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </p>
                    </div>
                </li>
                <!-- <li v-show="flagso">
                    <div>
                    <p><span class="tech-span"></span></p>
                    <div class="tech-order-jn-sont">
                    </div>
                    </div>
                </li> -->
                <li class="hours">
                    <div>
                        <p><span class="tech-span">*</span>工作时间:</p>
                        <div class="tech-order-jn">
                            <button class="tech-order-btn" @click="addtime"> &#10010; 添加时间</button>
                            <div class="tech-order-jn-sons" v-show="isB">
                            <div style="margin:0 10px;">
                                <p>新增日期</p>
                                <div>

                                <div style="display:flex;">
                                    <div class="selfCheckBoxsday">日期</div>
                                    <div class="selfCheckBoxs tech-order-posis" ref="sexOption" @click="roomSel1(item)" v-for="(item,$index) in sexDay" :key="$index" :class="{'techTime-green':item.show===true}">
                                    {{item.sexName}}
                                    <!-- <div :class="{'triangle-bottomrightose':item.show===true}"></div>
                                    <div class="tallyose">&#10004</div> -->
                                    </div>
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
                    </div>
                    
                    <div v-show="teachArr.length>0">
                        <ul class="working">
                            <li v-for="(item,index) in teachArr" :key="index">
                            <div>
                                <div class="woking-div">
                                <div><span v-for="(data,i) in item.week" :key="i">{{data.sexName+"、"}}</span></div>
                                <div class="time">{{item.start+"~"+item.end}}</div>
                                </div>
                            </div>
                            <div>
                                <i class="i-delete" @click="deletes(index)">X</i>
                            </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <!-- <li>
                    <div>
                    <p><span class="tech-span"></span>级别:</p>
                    <div style="display:flex;justify-content:space-between;width:545px; overflow:hidden;">
                        <div class="selfCheckBox tech-selfbox tech-center" ref="sexOption" @click="roomSel2($index,item)" v-for="(item,$index) in sexTypes"
                        :class="{'tech-green':isA==$index}" style="margin:0">
                        {{item.sexName}}
                        <div :class="{'triangle-bottomrights':isA==$index}"></div>
                        <div class="tallys">&#10004</div>
                        </div>
                    </div>
                    </div>
                </li> -->
                <!-- <li>
                    <div>
                    <p><span class="tech-span"></span>经验描述:</p>
                    <p>
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3" style="width:545px;">
                        </el-input>
                    </p>
                    </div>
                </li> -->
                <li>
                    <div>
                    <p></p>
                    <p>
                        <span class="button-large-fourth" @click="submitForm('perServer')">保存信息</span>
                    </p>
                    </div>
                </li>
            </ul>
        </el-form>
        <!-- 补充个人资料 -->
        <h3 class="tech-tc-prson">补充个人资料</h3>
        <ul class="tech-ul">
          <li>
            <div>
              <p>邮箱:</p>
              <p>
                <el-input placeholder="请输入正确的邮箱地址" style="width:300px"></el-input>
              </p>
            </div>
            <div>
              <p>学历:</p>
              <p>
                <el-select v-model="educations" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in education" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p>身高:</p>
              <p>
                <el-select v-model="heights" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in height" :key="item.value" :label="item.value" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <p>体重:</p>
              <p>
                <el-select v-model="strongs" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in strong" :key="item.value" :label="item.value" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p>婚姻状况:</p>
              <p>
                <el-select v-model="marriages" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in marriage" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <p>籍贯:</p>
              <p>
                <el-select v-model="places" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in place" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </p>
            </div>
          </li>
          <li>
              <div>
                  <p>入职日期:</p>
                  <p>
                    <el-date-picker
                        style="width:300px;"
                        v-model="value1"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions0">
                    </el-date-picker>
                  </p>
              </div>
          </li>
          <li>
              <div class="level">
                  <p>级别:</p>
                  <p>
                    <div style="display:flex;justify-content:space-between;width:545px; overflow:hidden;">
                        <div class="selfCheckBox tech-selfbox tech-center" ref="sexOption" @click="roomSel2($index,item)" v-for="(item,$index) in sexTypes"
                        :class="{'tech-green':isA==$index}" :key="$index">
                        {{item.sexName}}
                        <!-- <div :class="{'triangle-bottomrights':isA==$index}"></div>
                        <div class="tallys">&#10004</div> -->
                        </div>
                    </div>
                  </p>
              </div>
                 <!-- <li>
                    <div>
                    <p><span class="tech-span"></span>级别:</p>
                    <div style="display:flex;justify-content:space-between;width:545px; overflow:hidden;">
                        <div class="selfCheckBox tech-selfbox tech-center" ref="sexOption" @click="roomSel2($index,item)" v-for="(item,$index) in sexTypes"
                        :class="{'tech-green':isA==$index}" style="margin:0">
                        {{item.sexName}}
                        <div :class="{'triangle-bottomrights':isA==$index}"></div>
                        <div class="tallys">&#10004</div>
                        </div>
                    </div>
                    </div>
                </li> -->
                <!-- <li>
                    <div>
                    <p><span class="tech-span"></span>经验描述:</p>
                    <p>
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3" style="width:545px;">
                        </el-input>
                    </p>
                    </div>
                </li> -->
          </li>
          <li>
              <div style="flex:1">
                  <p>经验描述:</p>
                  <p>
                     <el-input type="textarea" v-model="input" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" style="width:545px;"></el-input>
                  </p>
              </div>
          </li>
          <li>
            <div>
              <p></p>
              <p>
                    <span class="button-large-fourth" @click="submitForm('perServer')">保存信息</span>
              </p>
            </div>
          </li>

        </ul>
        <!--家庭成员（选填） -->
        <h3 class="tech-tc-prson">家庭成员（选填）</h3>
        <div class="tech-table" v-show="techTable">
          <el-table :key='tableKey' :data="list" stripe v-loading="listLoading" element-loading-text="正在加载" fit highlight-current-row
            style="width: 100%" v-show="isTab">

            <el-table-column align="center" label="关系">
              <template scope="scope">
                <span>同事</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="姓名">
              <template scope="scope">
                <span>张三</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="手机号">
              <template scope="scope">
                <span>1111</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="单位">
              <template scope="scope">
                <span>呼家楼</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="职务">
              <template scope="scope">
                <span>无</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template scope="scope">
                <el-button size="small" type="primary" @click="handleModifyStatus(scope.row,'deleted')">编辑
                </el-button>
                <el-button size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
                </el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <div style="padding:25px">
          <el-button type="primary" icon="plus" @click="showTabl" class="tech-family-btn">家庭成员</el-button>
        </div>
        <el-form :model="perFamily"  ref="perFamily"  label-width="100px" :rules="rulesFamily">
            <ul class="tech-ul" v-show="flagso" style="padding-left:50px">
                <li>
                    <div>
                        <!-- <p><span class="tech-span">*</span>关系:</p> -->
                        <p>
                            <el-form-item label="关系:" prop="relation">
                                <el-select v-model="perFamily.relation" clearable placeholder="请选择" style="width:200px">
                                    <el-option v-for="(item,$index) in bind" :key="item.value" :label="item.label" :value="item.value">
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
                            <el-form-item label="手机号:">
                                <el-input placeholder="请输入11位手机号" style="width:200px" v-model="perFamily.memberPhone"></el-input>
                            </el-form-item>
                        </p>
                    </div>
                </li>
                <li>
                    <div>
                    <!-- <p><span class="tech-span"></span>单位:</p> -->
                    <p>
                        <el-form-item label="单位:">
                            <el-input placeholder="请输入工作单位名称" style="width:200px" v-model="perFamily.memberUnit"></el-input>
                        </el-form-item>
                    </p>
                    </div>
                </li>
                <li>
                    <div>
                    <p>
                         <el-form-item label="职务:">
                            <el-input placeholder="请输入职务" style="width:200px" v-model="perFamily.memberJob"></el-input>
                        </el-form-item>
                    </p>
                    </div>
                </li>
                <li>
                    <div>
                    <p></p>
                    <p>
                        <button class="button-large" @click="savrTable('perFamily')">保存</button>
                        <button class="button-cancel" style="margin-left:20px">取消</button>
                    </p>
                    </div>
                </li>
            </ul>
        </el-form>
        <!--其他信息 -->
        <h3 class="tech-tc-prson">其他信息</h3>
        <ul class="tech-ul">
            <li>
                <div>
                    <p></p>
                    <p>
                        <!-- <button class="tech-fourth">上传头像</button> -->
                        <el-upload class="upload-demo" action="http://gemini-wlcb.oss-cn-beijing.aliyuncs.com" :on-preview="handlePreview" :on-remove="handleRemove"
                        :file-list="fileList2" list-type="picture" :data="sign">
                        <el-button class="tech-fourth"><span></span>上传证件照</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                        </el-upload>
                        <!-- <button class="tech-fourth-rigth">上传身份证</button> -->
                        <el-upload class="upload-demo" action="http://gemini-wlcb.oss-cn-beijing.aliyuncs.com" :on-preview="handlePreview" :on-remove="handleRemove"
                        :file-list="fileList2" list-type="picture" style="margin-left:40px;" :data="sign">
                        <el-button class="tech-fourth-rigth">上传生活照</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                        </el-upload>
                    </p>
                </div>
            </li>
            <li>
                <div style="flex:1">
                  <p>备注:</p>
                  <p>
                     <el-input type="textarea" v-model="input" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请简单描述一下" style="width:545px;"></el-input>
                  </p>
              </div>
            </li>
            <li>
                <div>
                    <p></p>
                    <p>
                        <span class="button-large-fourth" @click="submitForm('perServer')">保存信息</span>
                    </p>
                </div>
            </li>
        </ul>
      </div>

      <!-- <span slot="footer" class="dialog-footer"></span> -->
</template>
<script>
import {
  addTech,
  getTech,
  getArea,
  getEducations,
  getStrong,
  getHeight,
  getMatrimony
} from "@/api/tech";
import { getSign } from "@/api/sign";

export default {
  data() {
    return {
        roomSel1Arr:[],
        teachArr:[],
        perFamily:{
            relation:'',
            memberName:'',
            memberPhone:'',
            memberUnit:'',
            memberJob:''
        },
        rulesFamily:{
            relation:[
                { required: true, message: "请输入关系", trigger: "change" }
            ],
            memberName:[
                { required: true, message: "请输入名字", trigger: "blur" },
                { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
            ]
        },
      // 个人资料
      techTable:false,
      personalEDit: {
        techName: "",
        techIdCard: "",
        techPhone: "",
        techSex: "",
        techNation: "",
        techBirthDate: ""
      },
      rulesPerEdit: {
        techName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        // 身份证
        techIdCard: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        techPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        techSex: [{ required: true, message: "请输入性别", trigger: "change" }],
        techBirthDate: [
          { type: "date", required: true, message: "请选择日期", trigger: "blur" }
        ]
      },
      //服务信息
      perServer:{
          serviceCityName:'',
          jobNatrue:'',
          stationName:'',
          jobStatus:'',
          workTime:'',
          skills:''
      },
      rulesServer:{
          serviceCityName:[
				{ required: true, message: '请选择城市', trigger: 'change' }
			],
			jobNatrue:[
				{ required: true, message: '请选择岗位', trigger: 'change' }
			],
			stationName:[
				{ required: true, message: '请选择服务站', trigger: 'change' }
			],
			jobStatus:[
				{ required: true, message: '请选择岗位状态', trigger: 'change' }
			],
			workTime:[
				{ required: true, message: '请选择工作年限', trigger: 'change' }
			],
			skills:[
				{ required: true, message: '请选择技能', trigger: 'blur' }
			]
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

      servery: [
        {
          value: "选项1",
          label: "呼家楼"
        },
        {
          value: "选项2",
          label: "双桥"
        },
        {
          value: "选项3",
          label: "百子湾"
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
      marriage: [],
      station: [
        {
          value: "选项1",
          label: "全职"
        },
        {
          value: "选项2",
          label: "兼职"
        }
      ],
      choose: [
        {
          value: "选项1",
          label: "姓名"
        },
        {
          value: "选项2",
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

      sex: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ],
      ethnics: [],
      areas: [],
      strong: {},
      statu: [
        {
          value: "选项1",
          label: "在职"
        },
        {
          value: "选项2",
          label: "离职"
        }
      ],
      education: [],
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

      workyear: [
        {
          value: "选项1",
          label: "1年以下"
        },
        {
          value: "选项2",
          label: "1年"
        },
        {
          value: "选项3",
          label: "2年"
        },
        {
          value: "选项4",
          label: "10年"
        },
        {
          value: "选项5",
          label: "10年以上"
        }
      ],

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
          return time.getTime() > Date.now();
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
      sexTypes: [
        {
          sexName: "技能一",
          key: 1
        },
        {
          sexName: "技能二",
          key: 2
        },
        {
          sexName: "技能三",
          key: 3
        },
        {
          sexName: "技能四",
          key: 4
        },
        {
          sexName: "技能五",
          key: 5
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
          sexName: "星期一",
          show: false
        },
        {
          sexName: "星期二",
          show: false
        },
        {
          sexName: "星期三",
          show: false
        },
        {
          sexName: "星期四",
          show: false
        },
        {
          sexName: "星期五",
          show: false
        },
        {
          sexName: "星期六",
          show: false
        },
        {
          sexName: "星期日",
          show: false
        }
      ],
      sign: getSign(),
      key: false,
      isA: false,
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
      area: "",
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
      list: [1, 2, 3],
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
  methods: {
    handlePreview(file){},
    deletes(index){
        this.teachArr.splice(index,1)
    },
      //个人,服务保存
    submitForm(formName){
       this.$refs[formName].validate((valid) => {
			  if(valid){
				alert('true')
			  }else{
                  alert('false')
				  return false;
			  }
		  })
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
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
    roomSel1(item) {
        this.roomSel1Arr.push(item);
        console.log(this.roomSel1Arr,"this.roomSel1Arr-------")
        console.log(this.teachArr,"this.arr-----")
        item.show = !item.show;
      //  console.log(item)
    },
    techClick(){
      var obj = {};

      obj.start = this.startTime;
      obj.end = this.endTime
      obj.week = [].concat( this.roomSel1Arr )
		  this.teachArr.push(obj)
		  console.log(this.teachArr,"this.teachArr--12323--")
		   this.isB  = false;
	  },
    roomSel2(index, obj) {
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
    addtimes() {
      this.isB = false;
    },
    addtimeno() {
      this.isB = false;
    },
    mouser(item) {
      item.ismouse = true;
    },
    mousout(item) {
      item.ismouse = false;
    },
    savrTable(formName) {
        this.$refs[formName].validate((valid)=>{
            if(valid){
                alert("true")
            }else{
                alert('false')
                return false
            }
        })
      this.isTab = true;
    },
    dateChange(val) {
      this.value1 = val;
    },
    create() {
      var time = String(this.value1);
      var obj = {
        techName: this.techName,
        techldCard: this.techldCard,
        techPhone: this.techPhone,
        techSex: this.sexs,
        techNation: this.ethnic,
        addrDetailInfo: this.addrDetailInfo,
        techBirthDate: this.value1,
        images: [
          {
            id: "",
            imgType: "",
            imgUrl: ""
          }
        ]
      };
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
    getTech().then(res => {
      this.ethnics = res.data;
      this.ethnic = res.data[32].label;
    });
    getArea().then(res => {
      console.log(res);
      this.areas = res.data.data;
      this.place = res.data.data;
    });
    getEducations().then(res => {
      this.education = res.data;
      this.educations = res.data[2].value;
    });
    getStrong().then(res => {
      this.strong = res.data;
      this.strongs = res.data[22].value;
    });
    getHeight().then(res => {
      this.height = res.data;
      this.heights = res.data[18].value;
    });
    getMatrimony().then(res => {
      if (res.status == 200) {
        this.marriage = res.data;
        this.marriages = res.data[0].label;
        // console.log(this.marriage)
      } else {
        console.log("错误");
      }
    });
  }
};
</script>
<style scoped>
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
  margin-left: 40px;
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
  justify-content: space-between;
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
  display: block;
}

.tech-ul li div p:nth-of-type(1) {
  width: 100px;
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

.tech-green,.techTime-green {
    border: solid 1px green;
    background:url('../../../static/icon/Selected.png') no-repeat;
    background-size:20px 20px;
    background-position: bottom right;
}
.techTime-green{
     background-size:15px 15px;
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

.tech-daytim {
  margin-left: 2px;
}

.tech-section-lages {
  width: 45%;
  left: 5%;
}

.tech-section-xiu {
  padding: 10px 30px;
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
.working{
    border: 1px solid #F2F2F2;
    width: 400px;
    box-sizing: border-box;
    padding: 0 0 0 20px;;
}
.working>li{
  position: relative;
  border-bottom:1px solid #F2F2F2; 
  padding-top:15px; 
}
.woking-div{
  display: flex;
  flex-direction:column;
}
.i-delete{
  position: absolute;
  right:20px;
  top: 20px; 
}
.time{
  padding: 10px 0;
}
#confirmation{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.button-large-fourth{
    display: block;
    text-align:center;
    line-height: 34px;
}
.level{
    flex: 1;
}
.hours{
    align-items: flex-start;
}
</style>
