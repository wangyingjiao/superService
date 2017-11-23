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
        <button class="tech-btn" @click="order">选择技能</button>
      </div>
     
      <div><button class="button-large">搜索</button></div>
    </div>
    <div class="tech-section">
      <div class="tech-section-right">
        <button class="button-small" @click="dialogVisible = true">新增</button>
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
              <div style="margin-top:10px;">
                <button>全职</button>
                <button>在职</button>
              </div>
            </div>
            <div class="tech-xiu-div-two">
              <h4>{{item.name}}</h4>
              <div>
                <span></span>
                <span>国安社区</span>
              </div>
              <div>
                <span></span>
                <span>呼家楼</span>
              </div>
              <div>
                <span></span>
                <span>3年</span>
              </div>
              <div>
                <span></span>
                <span>15660061199</span>
              </div>
            </div>
          </div>

          <!-- 鼠标移入 -->
          <div class="tech-section-ul-posi" v-show="item.ismouse">
            <div style="margin-right:20px;" @click="flags = true">
              <img src="../../../static/icon/休1.png" alt="">
              <!-- <button>休假</button> -->
            </div>
            <div>
              <img src="../../../static/icon/编辑1.png" alt="">
            </div>
            <div style="margin-left:20px;">
              <img src="../../../static/icon/删除1.png" alt="">
            </div>
          </div>
        </li>
      </ul>

      <!-- 休息弹出层 -->
      <el-dialog title="休假" :visible.sync="flags" custom-class="tech-section-lages" style="top:10%;">
        <ul class="tech-section-xiu">
          <li>
            <div>姓名</div>
            <div>李阿姨</div>
          </li>
          <li>
            <div><span>*</span>开始时间</div>
            <div style="display:flex">
              <el-date-picker v-model="value3" type="date" placeholder="年/月/日" :picker-options="pickerOptions0" style="width:300px">
              </el-date-picker>
              <el-time-select placeholder="起始时间" v-model="startTimes" :picker-options="{
                          start: '00:00',
                          step: '00:30',
                          end: '24:00'
                        }">
              </el-time-select>
            </div>
          </li>
          <li>
            <div><span>*</span>结束时间</div>
            <div style="display:flex">
              <el-date-picker v-model="value4" type="date" placeholder="年/月/日" :picker-options="pickerOptions0" style="width:300px">
              </el-date-picker>
              <el-time-select placeholder="结束时间" v-model="endTimes" :picker-options="{
                          start: '00:00',
                          step: '00:30',
                          end: '24:00',
                          minTime: startTimes
                        }">
              </el-time-select>
            </div>
          </li>
          <li>
            <div>备注</div>
            <div>
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3" style="width:493px;">
              </el-input>
            </div>
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
    <!-- 弹出层 -->
    <el-dialog title="新增技师" :visible.sync="dialogVisible" custom-class="tech-section-lage">
      <div>
        <!-- 个人资料 -->
        <h3 class="tech-tc-prson">个人资料</h3>
        <ul class="tech-ul">
          <li>
            <div>
              <p><span class="tech-span">*</span>姓名:</p>
              <p>
                <el-input placeholder="请输入2~15位姓名" style="width:300px" v-model="techName"></el-input>
              </p>
            </div>
            <div>
              <p><span class="tech-span">*</span>身份证号:</p>
              <p>
                <el-input placeholder="请输入正确的身份证号" style="width:300px" v-model="techldCard"></el-input>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p><span class="tech-span">*</span>手机号:</p>
              <p>
                <el-input placeholder="请输入11为手机号" style="width:300px" v-model="techPhone"></el-input>
              </p>
            </div>
            <div>
              <p><span class="tech-span">*</span>现住地址:</p>
              <p>
                <el-select v-model="area" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in areas" :key="item.value" :label="item.name" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p><span class="tech-span">*</span>性别:</p>
              <p>
                <el-select v-model="sexs" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="(item,$index) in sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <p></p>
              <p>
                <el-input placeholder="请输入正确的身份证号" style="width:300px"></el-input>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p><span class="tech-span">*</span>民族:</p>
              <p>
                <el-select v-model="ethnic" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in ethnics" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <p><span class="tech-span">*</span>出生日期:</p>
              <p>
                <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0" style="width:300px" @change="dateChange" format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p></p>
              <p>
                <button class="tech-fourth"><span>*</span>上传头像</button>
                <button class="tech-fourth-rigth">上传身份证</button>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p></p>
              <p>
                <button class="tech-fourth"><span>*</span>上传位置</button>
                <button class="tech-fourth-rigth">上传位置</button>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p></p>
              <p>
                <button class="button-large-fourth" @click="create()">保存并创建</button>
              </p>
            </div>
          </li>
        </ul>
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
                  <el-option v-for="item in height" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <p>体重:</p>
              <p>
                <el-select v-model="strongs" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in strong" :key="item.value" :label="item.label" :value="item.value">
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
                  <el-option v-for="item in place" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p></p>
              <p>
                <button class="button-large-fourth">保存信息</button>
              </p>
            </div>
          </li>

        </ul>
        <!-- 服务信息 -->
        <h3 class="tech-tc-prson">服务信息</h3>
        <ul class="tech-ul">
          <li>
            <div>
              <p><span class="tech-span">*</span>选择城市:</p>
              <p>
                <el-select v-model="catys" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in caty" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <p><span class="tech-span">*</span>岗位性质:</p>
              <p>
                <el-select v-model="stationes" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in station" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p><span class="tech-span">*</span>所属服务站:</p>
              <p>
                <el-select v-model="servers1" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in servery" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <p><span class="tech-span">*</span>岗位状态:</p>
              <p>
                <el-select v-model="status" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in statu" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p><span class="tech-span">*</span>工作年限:</p>
              <p>
                <el-select v-model="workyears" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in workyear" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <p><span class="tech-span"></span>入职时间:</p>
              <p>
                <el-date-picker v-model="value2" type="date" placeholder="年/月/日" :picker-options="pickerOptions0" style="width:300px">
                </el-date-picker>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p><span class="tech-span">*</span>选择技能:</p>
              <div class="tech-order-jn">
                <button class="tech-order-btn" @click="orderson"> &#10010 选择技能</button>
                <div class="tech-order-jn-son" v-show="flags">
                  <div style="display:flex;">
                    <div class="selfCheckBox tech-order-posi" ref="sexOption" @click="roomSel1(item)" v-for="(item,$index) in sexTypeo" :class="{'tech-green':item.show===true}">
                      {{item.sexName}}
                      <div :class="{'triangle-bottomrighto':item.show===true}"></div>
                      <div class="tallyo">&#10004</div>
                    </div>
                  </div>
                  <div style="text-align:center;margin:10px 0;">
                    <button class="button-large" @click="skill">确认</button>
                    <button class="button-cancel" style="margin-left:20px" @click="skillq">取消</button>
                  </div>
                </div>
              </div>
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
              <p><span class="tech-span">*</span>工作时间:</p>
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
                          <div :class="{'triangle-bottomrightose':item.show===true}"></div>
                          <div class="tallyose">&#10004</div>
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
                    <button class="button-large btn-styl" @click="addtimes">确认</button>
                    <button class="button-cancel btn-styl" style="margin-left:20px" @click="addtimeno">取消</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
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
          </li>
          <li>
            <div>
              <p><span class="tech-span"></span>经验描述:</p>
              <p>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3" style="width:545px;">
                </el-input>
                <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> -->
              </p>
            </div>
          </li>
          <li>
            <div>
              <p></p>
              <p>
                <button class="button-large-fourth">保存信息</button>
              </p>
            </div>
          </li>
        </ul>
        <!-- APP账号登陆 -->
        <h3 class="tech-tc-prson">APP账号登陆</h3>
        <ul class="tech-ul">
          <li>
            <div>
              <p><span class="tech-span">*</span>手机号:</p>
              <p>
                <el-input placeholder="请输入11位手机号" style="width:300px"></el-input>
              </p>
            </div>
            <div>
              <p>密码:</p>
              <p>
                <el-input placeholder="默认为手机号后4位" style="width:300px" type="password"></el-input>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p></p>
              <p>
                <button class="button-large-fourth">保存信息</button>
              </p>
            </div>
          </li>
        </ul>
        <!-- 银行信息 -->
        <h3 class="tech-tc-prson">银行信息</h3>
        <ul class="tech-ul">
          <li>
            <div>
              <p><span class="tech-span"></span>卡类型:</p>
              <p>
                <el-select v-model="cards" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in card" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <p>银行账号:</p>
              <p>
                <el-input placeholder="请输入正确的银行卡号" style="width:300px" type="password"></el-input>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p></p>
              <p>
                <button class="button-large-fourth">保存信息</button>
              </p>
            </div>
          </li>
        </ul>
        <!--家庭成员（选填） -->
        <h3 class="tech-tc-prson">家庭成员（选填）</h3>
        <div class="tech-table">
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
        <div class="tech-table" style="padding:none;">
          <el-button type="primary" icon="plus" @click="showTabl">家庭成员</el-button>
        </div>
        <ul class="tech-ul" v-show="flagso">
          <li>
            <div>
              <p><span class="tech-span">*</span>关系:</p>
              <p>
                <el-select v-model="binds" clearable placeholder="请选择" style="width:230px">
                  <el-option v-for="item in bind" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p><span class="tech-span">*</span>名字:</p>
              <p>
                <el-input placeholder="请输入2~15位名字" style="width:230px"></el-input>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p><span class="tech-span"></span>手机号:</p>
              <p>
                <el-input placeholder="请输入11位手机号" style="width:230px"></el-input>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p><span class="tech-span"></span>单位:</p>
              <p>
                <el-input placeholder="请输入工作单位名称" style="width:230px"></el-input>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p><span class="tech-span"></span>职务:</p>
              <p>
                <el-input placeholder="请输入职务" style="width:230px"></el-input>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p></p>
              <p>
                <button class="button-large" @click="savrTable">保存</button>
                <button class="button-cancel" style="margin-left:20px">取消</button>
              </p>
            </div>
          </li>
        </ul>
        <!--其他信息 -->
        <h3 class="tech-tc-prson">其他信息</h3>
        <ul class="tech-ul">

          <li>
            <div>
              <p></p>
              <p>
                <button class="tech-fourth"><span>*</span>上传头像</button>
                <button class="tech-fourth-rigth">上传身份证</button>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p></p>
              <p>
                <button class="tech-fourth"><span>*</span>上传位置</button>
                <button class="tech-fourth-rigth">上传位置</button>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p><span class="tech-span"></span>备注:</p>
              <p>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3" style="width:545px;">
                </el-input>
              </p>
            </div>
          </li>
          <li>
            <div>
              <p></p>
              <p>
                <button class="button-large-fourth">保存信息</button>
              </p>
            </div>
          </li>
        </ul>
      </div>

      <!-- <span slot="footer" class="dialog-footer"></span> -->
    </el-dialog>
  </div>
</template>
<script>
  import {
    addTech,
    getTech,
    getArea
  } from "@/api/tech";

  export default {
    data() {
      return {
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
        marriage: [{
          value: '选项1',
          label: '未婚'
        }, {
          value: '选项2',
          label: '已婚'
        }, {
          value: '选项3',
          label: '丧偶'
        }, {
          value: '选项4',
          label: '离婚'
        }],
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
        statu: [{
          value: '选项1',
          label: '在职'
        }, {
          value: '选项2',
          label: '离职'
        }],
        education: [{
          value: '选项1',
          label: '小学'
        }, {
          value: '选项2',
          label: '初中'
        }, {
          value: '选项3',
          label: '中专'
        }, {
          value: '选项4',
          label: '高中'
        }, {
          value: '选项5',
          label: '大专'
        }, {
          value: '选项6',
          label: '本科及以上'
        }],
        strong: [{
          value: '选项1',
          label: '30kg'
        }, {
          value: '选项2',
          label: '40kg'
        }, {
          value: '选项3',
          label: '50kg'
        }, {
          value: '选项4',
          label: '60kg'
        }, {
          value: '选项5',
          label: '70kg'
        }, {
          value: '选项6',
          label: '80kg'
        }],
        height: [{
          value: '选项1',
          label: '130cm'
        }, {
          value: '选项2',
          label: '140cm'
        }, {
          value: '选项3',
          label: '150cm'
        }, {
          value: '选项4',
          label: '160cm'
        }, {
          value: '选项5',
          label: '170cm'
        }, {
          value: '选项6',
          label: '180cm'
        }, {
          value: '选项7',
          label: '190cm'
        }, {
          value: '选项8',
          label: '200cm'
        }],
        place: [{
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
        key: false,
        isA: false,
        isB: false,
        isTab: false,
        sexLen: '',
        binds: '',
        flagso: false,
        flags: false,
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
        techName: '',
        techldCard: '',
        techPhone: '',
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
          sort: '+id'
        },
        dialogVisible: false,
      }
    },
    methods: {
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
        item.show = !item.show;
        //  console.log(item)
      },
      roomSel2(index, obj) {
        this.isA = index;
      },
      // 添加技能
      orderson() {
        this.flags = true;
      },
      skill() {
        this.flags = false;
        this.flagso = true;
      },
      skillq() {
        this.flags = false;
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
      savrTable() {
        this.isTab = true;
      },
      dateChange(val){
         this.value1=val;
      },
      create() {
        var time =String(this.value1);
        var obj = {
          'techName': this.techName,
          'techldCard': this.techldCard,
          'techPhone': this.techPhone,
          'techSex': this.sexs,
          'techNation':this.ethnic,
          'techBirthDate': this.value1
        }
        addTech(obj).then(res =>{
          console.log(res)
        })
        this.techName = '',
          console.log(obj),
          console.log(time)
          // console.log(d)
      }
    },
    mounted() {
      getTech().then(res => {
        // console.log(res)  
        this.ethnics = res.data;
      });
      getArea().then(res => {
        // console.log(res)  
        this.areas = res.data.data;
        // console.log(this.areas)
      });
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
    left: 40px;
    width: 60%;
  }

  .el-dialog__header {
    background: #f3f1f1;
    padding: 20px;
  }

  .el-dialog__body {
    margin: 0;
    padding: 0;
  }

  .tech-tc-prson {
    margin: 10px 20px;
    padding: 10px 0px;
    border-bottom: #f3f1f1 solid 1px;
  }

  .tech-ul {
    padding: 10px 40px 10px 20px;
    border-bottom: solid 20px #f3f1f1;
  }

  .tech-ul>li {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }

  .tech-center {
    display: flex;
    justify-content: center;
  }


  .tech-ul li>div {
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
    display: block;
  }

  .tech-ul li div p:nth-of-type(1) {
    width: 100px;
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
    margin-left: 40px;
  }

  .el-textarea__inner {
    border-radius: 0px;
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
    width: 545px;
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

  .tech-section-xiu>li {
    display: flex;
    padding: 10px;
  }

  .tech-section-xiu>li>div:nth-of-type(1) {
    width: 120px;
    height: 35px;
    line-height: 35px;
  }

  .tech-section-xiu>li>d iv:nth-of-type(2) {
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
  }

</style>
