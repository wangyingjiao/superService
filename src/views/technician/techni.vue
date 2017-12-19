<template>
  <div class="tech">
    <div class="tech-index">
      <div>
        <el-select v-model="servers" clearable placeholder="选择服务站">
          <el-option v-for="item in server" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="stations" clearable placeholder="岗位性质" style="margin-left:40px;">
          <el-option v-for="item in station" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="chooses" clearable placeholder="请选择" style="margin-left:40px;">
          <el-option v-for="item in choose" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="输入要搜索的内容" style="width:200px;margin-left:5px;"></el-input>
        <button class="tech-btn" @click="order">选择技能1</button>
      </div>

      <div>
        <button class="search-button el-icon-search"> 搜索</button>
      </div>
    </div>
    <div class="tech-section">
      <div class="tech-section-right">
        <button class="button-small  btn_pad ceshi ceshi5" @click="dialogVisible = true">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增</button>
      </div>
      <ul class="tech-section-ul">
        <li v-for="(item,$index) in infoname" @mousemove="mouser(item)" @mouseout="mousout(item)">
          <div class="tech-xiu-div">
            <div class="tech-xiu-div-one">
              <div style="width:89px;height:89px;background:red;display:inline-block;border-radius:50%;"></div>
              <div style="margin-top:10px;">
                <span>男</span>
                <span>32</span>
              </div>
              <div class="tech-mouse-div">
                <span class="tech-mouse">全职</span>
                <span class="tech-mouse">在职</span>
              </div>
            </div>
            <div class="tech-xiu-div-two">
              <h4>{{item.name}}</h4>
              <div>              
                  <img src="../../../static/icon/服务机构.png" alt="" style="width:15px;height:15px;">              
                  <div style="margin-left:5px;">国安社区</div>
              </div>
              <div>
                <img src="../../../static/icon/服务站.png" alt="" style="width:15px;height:15px;">              
                <div style="margin-left:5px;">呼家楼</div>
              </div>
              <div>
                <img src="../../../static/icon/工作经验.png" alt="" style="width:15px;height:15px;">              
                <div style="margin-left:5px;">3年</div>
              </div>
              <div>
                <img src="../../../static/icon/手机.png" alt="" style="width:15px;height:15px;">              
                <div style="margin-left:5px;">15660061100</div>
              </div>
            </div>
          </div>

          <!-- 鼠标移入 --> 
          <div class="tech-section-ul-posi" v-show="item.ismouse">
            <div style="margin-right:20px;" @click="password = true">
              <img src="../../../static/icon/密码.png" alt="" style="width:30px">
            </div>
            <div  @click="flags = true">
              <img src="../../../static/icon/xiuxi.jpg" alt="" style="width:30px">
            </div>
            <div style="margin-left:20px;" @click="dialogVisibleEdit = true">
              <img src="../../../static/icon/修改.png" alt="" style="width:30px">
            </div>
            <div style="margin-left:20px;" @click="techDelete">
              <img src="../../../static/icon/删除.jpg" alt="" style="width:30px">
            </div>
          </div>
        </li>
      </ul>

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
					<el-button type="primary">保存</el-button>
					<el-button >取消</el-button>
				</el-form-item>
			</el-form>
		</div>
      </el-dialog>
      <!-- 休息弹出层 -->
      <el-dialog title="休假" :visible.sync="flags" custom-class="tech-section-lages" style="top:10%;">
        <ul class="tech-section-xiu">
          <li class="mobel">
            <p>姓名:</p>
            <p>李阿姨</p>
          </li>
          <li>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="开始时间" required>
					<el-col :span="11">
						<el-form-item prop="date1">
							<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
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
			</el-form>
          </li>
          <li>
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="结束时间" required>
					<el-col :span="11">
						<el-form-item prop="date1">
							<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
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
			</el-form>
          </li>
          <li>
            <!-- <div>备注</div>
            <div>
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3" style="width:493px;">
              </el-input>
            </div> -->
          </li>
          <li>
            <div style="display:flex;justify-content: center;width:100%">
              <button class="button-large" style="margin-right:10px;">保存</button>
              <button class="button-cancel">取消</button>
            </div>
          </li>

        </ul>
      </el-dialog>
      <!-- 选择技能 -->
      <div class="tech-psoition" v-show="position">

        <div style="display:inline-block;margin-left:28px;" class="tech-positon-odvi">
          <div class="selfCheckBox positionbox" ref="sexOption" @click="roomSel1(item)" v-for="(item,$index) in sexType" :class="{'tech-green':item.show===true}">
            {{item.sexName}}
            <div :class="{'triangle-bottomright':item.show===true}"></div>
            <div class="tally">&#10004</div>
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 编辑技师 -->
	<el-dialog title="新增技师" :visible.sync="dialogVisibleEdit" custom-class="tech-section-lage" class="tech-qj">
		<techni-edit></techni-edit>
	</el-dialog>
    <!-- 弹出层 新增技师-->
    <el-dialog @close="handleClose('personal')" title="新增技师" :visible.sync="dialogVisible" custom-class="tech-section-lage" class="tech-qj">
      <div>
        <!-- 个人资料 -->
        <h3 class="tech-tc-prson">个人资料</h3>
		<el-form :model="personal"  ref="personal"  label-width="100px" :rules="rulesPer">
			<ul class="tech-ul">
				<li>
					<div>
					<!-- <p><span class="tech-span"></span>姓名:</p> -->
					<p>
						<el-form-item label="姓名:" prop="techName">
							<el-input placeholder="请输入2~15位姓名" style="width:300px" v-model="personal.techName"></el-input>
						</el-form-item>
					</p>
					</div>
					<div>
					<!-- <p><span class="tech-span"></span>身份证号:</p> -->
					<p>
						<el-form-item label="身份证号:" prop="techIdCard">
							<el-input placeholder="请输入正确的身份证号" style="width:300px" v-model="personal.techIdCard"></el-input>
						</el-form-item>
					</p>
					</div>
				</li>
				<li>
					<div>
					<!-- <p><span class="tech-span"></span>手机号:</p> -->
					<p>
						<el-form-item label="手机号:" prop="techPhone">
							<el-input placeholder="请输入11为手机号" style="width:300px" v-model="personal.techPhone"></el-input>
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
					<!-- <p><span class="tech-span"></span>性别:</p> -->
					<p>
						<el-form-item label="性别:" prop="techSex">
							<el-select v-model="personal.techSex" clearable placeholder="请选择" style="width:300px">
								<el-option v-for="(item,$index) in sex" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</p>
					</div>
					<div>
					<p></p>
					<p>
						<el-input placeholder="请输入6-20位详细地址" style="width:300px" v-model="personal.addrDetailInfo"></el-input>
					</p>
					</div>
				</li>
				<li>
					<div>
					<p><span class="tech-span"></span>民族:</p>
					<p>
						<el-select v-model="personal.techNation" clearable placeholder="请选择" style="width:300px">
							<el-option v-for="item in ethnics" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</p>
					</div>
					<div>
					<!-- <p><span class="tech-span"></span>出生日期:</p> -->
					<p>
						<el-form-item label="出生日期:" prop="techBirthDate">
							<el-date-picker v-model="personal.techBirthDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0" style="width:300px" @change="dateChange"
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
						<el-button class="tech-fourth"><span></span>上传头像</el-button>
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

        <!-- 服务信息 -->
        <h3 class="tech-tc-prson">服务信息</h3>
        <ul class="tech-ul tech-service">
          <li>
            <div>
              <!-- <p><span class="tech-span">*</span>选择城市:</p> -->
              	<p>
					<el-form-item label="选择城市:" prop="serviceCityName">
						<el-select v-model="personal.serviceCityName" clearable placeholder="请选择" style="width:300px">
							<el-option v-for="item in caty" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
						</el-select>
					</el-form-item>
              </p>
            </div>
            <div>
              <!-- <p><span class="tech-span">*</span>岗位性质:</p> -->
              <p>
				<el-form-item label="岗位性质:" prop="jobNatrue">
					<el-select v-model="personal.jobNatrue" clearable placeholder="请选择" style="width:300px">
						<el-option v-for="item in station" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
              </p>
            </div>
          </li>
          <li>
            <div>
              <!-- <p><span class="tech-span">*</span>所属服务站:</p> -->
              <p>
				<el-form-item label="所属服务站:" prop="stationName">
					<el-select v-model="personal.stationName" clearable placeholder="请选择" style="width:300px">
						<el-option v-for="item in servery" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
              </p>
            </div>
            <div>
              <!-- <p><span class="tech-span">*</span>岗位状态:</p> -->
              <p>
				  	<el-form-item label="岗位状态:" prop="jobStatus">
						<el-select v-model="personal.jobStatus" clearable placeholder="请选择" style="width:300px">
							<el-option v-for="item in statu" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
              </p>
            </div>
          </li>
          <li>
            <div>
              <!-- <p><span class="tech-span">*</span>工作年限:</p> -->
				<p>
					<el-form-item label="工作年限:" prop="workTime">
						<el-select v-model="personal.workTime" clearable placeholder="请选择" style="width:300px">
							<el-option v-for="item in workyear" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</p>
            </div>
          </li>
          <li>
            <div>
              <!-- <p id="skill"><span class="tech-span">*</span>选择技能:</p> -->
			  	<p>
					<el-form-item label="选择技能:" prop="skills">
						<el-select v-model="personal.skills" multiple placeholder="请选择" style="width:300px">
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
          <li v-show="flagso">
            <div>
              <p><span class="tech-span"></span></p>
              <div class="tech-order-jn-sont">
              </div>
            </div>
          </li>
          <li>
            <div>
              <!-- <p><span class="tech-span">*</span>工作时间:</p> -->
			          <div style="width:100px"><span class="tech-span">*</span>工作时间:</div>
                <div class="tech-order-jn">
                  <button class="tech-order-btn" @click="addtime"> &#10010 添加时间</button>
                  <div class="tech-order-jn-sons" v-show="isB">
                    <div style="margin:0 10px;">
                      <p>新增日期</p>
                      <div>

                        <div style="display:flex;">
                          <div class="selfCheckBoxsday">日期</div>
                          <div class="selfCheckBoxs tech-order-posis" ref="sexOption" @click="roomSel1(item)" v-for="(item,$index) in sexDay" :class="{'tech-green':item.show===true}">
                            {{item.sexName}}
                            <!-- <div :class="{'triangle-bottomrightose':item.show===true}"></div> -->
                            <!-- <div class="tallyose">&#10004</div> -->
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
          <li id="confirmation">
                <button class="button-large-fourth" @click="submitFormPer('personal')">保存信息</button>
                <el-button @click="handleClose('personal')">取消</el-button>
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
    getMatrimony
  } from "@/api/tech";
  import {
    getSign
  } from "@/api/sign";
  import techniEdit from './techniEdit.vue'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
		  console.log(value.length,"------")
        if (value === '') {
         	 callback(new Error('请输入密码'));
        } else if(value.length<8){
			callback(new Error('至少8个字符'));
		} else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
		ruleForm: {
          date1: '',
          date2: '',
		},
		rules: {
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'blur' }
          ],
        },
		ruleForm2: {
          pass: '',
          checkPass: '',
        },
        rules2: {
          pass: [
            {required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur' }
          ],
		},
		// 个人资料验证
		personal:{
			techName: '',
			techIdCard: '',
			techPhone: '',
			techSex:'',
			addrDetailInfo:'',
			techNation:'',
			techBirthDate:'',
			serviceCityName:'',
			jobNatrue:'',
			stationName:'',
			jobStatus:'',
			workTime:'',
			skills:''
			
		},
		rulesPer:{
			techName:[
				{ required: true, message: '请输入姓名', trigger: 'blur' },
            	{ min: 3, max: 5, message: '长度在 2 到 15 个字符', trigger: 'blur' }
			],
			// 身份证
			techIdCard:[
				{required: true, message: '请输入身份证号', trigger: 'blur'},
			],
			techPhone:[
				{required: true, message: '请输入手机号', trigger: 'blur'},
				{ min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
			],
			techSex:[
				{ required: true, message: '请输入性别', trigger: 'change' }
			],
			techBirthDate:[
				{ type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
			],
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
        server: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],

        infoname: [{
          value: '选项1',
          name: '李阿姨',
          addres: '国安社区',
          year: '3年',
          phone: '17188996644',
          ismouse: false,
        }, {
          value: '选项1',
          name: '王阿姨',
          addres: '国安社区',
          year: '3年',
          phone: '17188996644',
          ismouse: false,
        }, {
          value: '选项1',
          name: '赵阿姨',
          addres: '国安社区',
          year: '3年',
          phone: '17188996644',
          ismouse: false,
        }],

        servery: [{
          value: '选项1',
          label: '呼家楼'
        }, {
          value: '选项2',
          label: '双桥'
        }, {
          value: '选项3',
          label: '百子湾'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        marriage: [],
        station: [{
          value: '选项1',
          label: '全职'
        }, {
          value: '选项2',
          label: '兼职'
        }],
        choose: [{
          value: '选项1',
          label: '姓名'
        }, {
          value: '选项2',
          label: '手机'
        }],

        card: [{
          value: '选项1',
          label: '中国建行'
        }, {
          value: '选项2',
          label: '中国银行'
        }],

        sex: [{
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }],
        ethnics: [],
        areas: [],
        strong:{},
        statu: [{
          value: '选项1',
          label: '在职'
        }, {
          value: '选项2',
          label: '离职'
        }],
        education: [],
        height: [],
        place: [],
        caty: [{
          value: '选项1',
          label: '北京'
        }, {
          value: '选项2',
          label: '天津'
        }, {
          value: '选项3',
          label: '上海'
        }, {
          value: '选项4',
          label: '重庆'
        }, {
          value: '选项5',
          label: '河北'
        }, {
          value: '选项6',
          label: '山西'
        }, {
          value: '选项7',
          label: '辽宁'
        }, {
          value: '选项8',
          label: '河南'
        }],

        workyear: [{
          value: '选项1',
          label: '1年以下'
        }, {
          value: '选项2',
          label: '1年'
        }, {
          value: '选项3',
          label: '2年'
        }, {
          value: '选项4',
          label: '10年'
        }, {
          value: '选项5',
          label: '10年以上'
        }],

        bind: [{
          value: '选项1',
          label: '夫妻'
        }, {
          value: '选项2',
          label: '父母'
        }, {
          value: '选项3',
          label: '母女'
        }, {
          value: '选项4',
          label: '母子'
        }, {
          value: '选项5',
          label: '兄弟姐妹'
        }, {
          value: '选项6',
          label: '亲戚'
        }],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        sexType: [{
            sexName: '技能一',
            show: false
          },
          {
            sexName: '技能二',
            show: false
          },
          {
            sexName: '技能三',
            show: false
          },
          {
            sexName: '技能四',
            show: false
          },
          {
            sexName: '技能五',
            show: false
          },
          {
            sexName: '技能六',
            show: false
          },
          {
            sexName: '技能七',
            show: false
          },
          {
            sexName: '技能八',
            show: false
          },
          {
            sexName: '技能一',
            show: false
          },
          {
            sexName: '技能二',
            show: false
          },
          {
            sexName: '技能三',
            show: false
          },
          {
            sexName: '技能四',
            show: false
          },
          {
            sexName: '技能五',
            show: false
          },
          {
            sexName: '技能六',
            show: false
          },
          {
            sexName: '技能七',
            show: false
          },
          {
            sexName: '技能八',
            show: false
          },
          {
            sexName: '技能四',
            show: false
          },
          {
            sexName: '技能五',
            show: false
          },
          {
            sexName: '技能六',
            show: false
          },
          {
            sexName: '技能七',
            show: false
          },
          {
            sexName: '技能八',
            show: false
          },
          {
            sexName: '技能八',
            show: false
          }
        ],
        sexTypes: [{
            sexName: '技能一',
            key: 1
          },
          {
            sexName: '技能二',
            key: 2
          },
          {
            sexName: '技能三',
            key: 3
          },
          {
            sexName: '技能四',
            key: 4
          },
          {
            sexName: '技能五',
            key: 5
          }
        ],
        sexTypeo: [{
            sexName: '技能一',
            show: false
          },
          {
            sexName: '技能二',
            show: false
          },
          {
            sexName: '技能三我我',
            show: false
          },
          {
            sexName: '技能四',
            show: false
          },
          {
            sexName: '技能五',
            show: false
          }
        ],
        sexDay: [{
            sexName: '星期一',
            show: false
          },
          {
            sexName: '星期二',
            show: false
          },
          {
            sexName: '星期三',
            show: false
          },
          {
            sexName: '星期四',
            show: false
          },
          {
            sexName: '星期五',
            show: false
          },
          {
            sexName: '星期六',
            show: false
          },
          {
            sexName: '星期日',
            show: false
          },
        ],
        sign: getSign(),
        key: false,
        isA: false,
        isB: false,
        isTab: false,
        sexLen: '',
        binds: '',
        flagso: false,
        flags: false,
        password:false,
        flage:false,
        tableKey: '',
        cards: '',
        textarea3: '',
        radio8: '1',
        workyears: '',
        status: '',
        servers1: '',
        stationes: '',
        catys: '',
        area: '',
        places: '',
        marriages: '',
        strongs: '',
        heights: '',
        educations: '',
        sexs: '',
        ethnic: '',
        servers: '',
        stations: '',
        chooses: '',
        input: '',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        startTime: '',
        endTime: '',
        startTimes: '',
        endTimes: '',
        fileList2: [
          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        position: false,
        listLoading: false,
        list: [1, 2, 3],
        total: null,
		listLoading: false,
		roomSel1Arr:[],
		teachArr:[],
        listQuery: {
          page: 1,
          limit: 6,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        dialogVisible: false,
        dialogVisibleEdit:false,
      }
    },
    components:{
      techniEdit
    },
    methods: {
      handlePreview(file){},
     handleClose(formName){
       this.$refs[formName].resetFields();
       this.teachArr = [];
     },
      // 工作时间删除
      deletes(index){
        this.teachArr.splice(index,1)
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      showTabl() {
        this.flagso = !this.flagso
      },
      order() {
        this.position = true
      },
      hiddenDiv() {
        this.position = false
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
    techDelete(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
      addtimeno() {
        this.isB = false;
      },
      mouser(item) {
        item.ismouse = true;
      },
      mousout(item) {
        item.ismouse = false;
      },
      savrTable() {
        this.isTab = true;
      },
      dateChange(val) {
        this.value1 = val;
	  },
	  //个人资料保存
	  submitFormPer(formName){
		  this.$refs[formName].validate((valid) => {
			  if(valid){
				
			  }else{
				  return false;
			  }
		  })
	  }
    //   create() {
    //     var time = String(this.value1);
    //     var obj = {
    //       'techName': this.techName,
    //       'techldCard': this.techldCard,
    //       'techPhone': this.techPhone,
    //       'techSex': this.sexs,
    //       'techNation': this.ethnic,
    //       'addrDetailInfo': this.addrDetailInfo,
    //       'techBirthDate': this.value1,
    //       'images': [{
    //         'id': '',
    //         'imgType': '',
    //         'imgUrl': '',
    //       }]
    //     }
        // addTech(obj).then(res => {
        //   console.log(res)
        // })
        // this.techName = '',
        //   console.log(obj),
        //   console.log(time)
        // console.log(d)
    //   },
    //   handleRemove(file, fileList) {
    //     console.log(file, fileList);
    //   },
    //   handlePreview(file) {
    //     console.log(file);
    //   }
     },
    mounted() {
      getTech().then(res => {
        this.ethnics = res.data;
        this.ethnic=res.data[32].label
      });
      getEducations().then(res =>{
        this.education=res.data
        this.educations=res.data[2].value
      });
      getStrong().then(res =>{
        this.strong=res.data
        this.strongs=res.data[22].value
      });
      getHeight().then(res =>{
        this.height=res.data
        this.heights=res.data[18].value 
      });
      getMatrimony().then(res =>{ 
        if(res.status==200){
          this.marriage=res.data
          this.marriages=res.data[0].label
          // console.log(this.marriage)
        }else{
          console.log("错误")
        }
      })
    }
  }

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
  .tech-section-lage>div{
    margin: 0px;
    padding: 0px;
  }

  .tech-section-lage>div:nth-of-type(1){
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

  .tech-ul>li {
    display: flex;
    justify-content: space-between;
    /* padding-bottom: 20px; */
  }
 .tech-ul .el-form-item__label{
	 text-align: left;
 }
  .tech-center {
    display: flex;
    justify-content: center;
  }


  .tech-ul li>div {
	  width: 400px;
    display: flex;
    align-items: center;
    font-size: 12px;
  }

  .tech-ul li div>p {
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

  .tech-family-btn{
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

  .el-upload-list{
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
      height: 100px
    }
    50% {
      height: 200px
    }
    100% {
      height: 320px
    }
  }

  @keyframes hidden {
    0% {
      height: 320px
    }
    50% {
      height: 200px
    }
    100% {
      height: 100px
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

  .tech-green {
    border: solid 1px green;
     background:url('../../../static/icon/Selected.png') no-repeat;
    background-size:15px 15px;
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
	padding-right: 30px;
  }

  .tech-section-xiu {
    padding: 10px 30px;
  }

  .tech-section-xiu>li {
    display: flex;
    padding: 10px;
  }

  .tech-section-xiu>li>div:nth-of-type(1) {
    width: 120px;
    height: 35px;
    line-height: 35px;
  }

  .tech-section-xiu>li>div:nth-of-type(2) {
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

  .tech-xiu-div-two>div {
    margin-top: 14px;
    display: flex;
  }

  .tech-mouse{
    width: 50px;
    height: 20px;
    line-height: 18px;
    background: #fff;
    display: block;
    
    text-align: center;
  }
  
  .tech-mouse-div{
    margin-top: 10px;
    /* width: 120px; */
    display: inline-block;
    display: flex;
    justify-content: center;
  }
  .tech-mouse-div>span:nth-of-type(1){
    margin-right: 5px;
    border: 1px solid #707cd2;
    color: #707cd2;
  }

  .tech-mouse-div>span:nth-of-type(2){
    margin-left: 5px;
    border: 1px solid #ff7676;
    color: #ff7676;
  }

.mobel{
	margin-bottom:22px; 
	display: flex;
}
.mobel>p:nth-child(1){
	width: 100px;
	text-align: right;
	padding-right:12px; 
}
.line {
	text-align:center;
}
.tech-service{
	padding: 20px 0 10px 0;
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
  margin-right: 40px;
}
</style>
