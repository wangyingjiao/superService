<template>
  <div class="tech">
    <div class="tech_fs">
      <div>
        <el-select v-model="value1" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value2" clearable placeholder="请选择">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value3" clearable placeholder="请选择">
          <el-option v-for="item in options2" :key="item.values" :label="item.labels" :value="item.values">
          </el-option>
        </el-select>
        <el-input v-model="input" placeholder="请输入内容" style="width:200px"></el-input>
        <el-button size="small" @click="show()">选择技能</el-button>
      </div>
      <div>
        <el-button class="filter-item btn" type="primary" v-waves>搜索</el-button>

      </div>
    </div>
    <div class="tech_new">
      <el-button class="filter-item btn" type="primary" @click="handleCreate">新增</el-button>
    </div>
    <div class="back_parent">
      <div class="tech_back">
        888
        <!-- <img src="../../../static/img/timg.jpg" alt=""> -->
        <div class="tech_cen">

        </div>
      </div>
      <div class="tech_back">
        55
      </div>
      <div class="tech_back">
        333
      </div>
    </div>
    <div class="block">

    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" class="diatable">
      <el-form class="small-space" :model="temp" label-position="left" label-width="90px" style='width: 500px; margin-left:20px;'>
        <p class="tech_font">个人资料</p>
        <div class="tech_table">
          <table>
            <tr>
              <td class="tech_td"><span class="tech_red">*</span>姓名</td>
              <td style="width:300px">
                <el-input v-model="input" placeholder="请输入2~15位姓名" class="inpt"></el-input>
              </td>
            </tr>
            <tr>
              <td><span class="tech_red">*</span>手机号</td>
              <td>
                <el-input v-model="input" placeholder="请输入11位手机号"></el-input>
              </td>
            </tr>
            <tr>
              <td><span class="tech_red">*</span>性别</td>
              <td>
                <el-select v-model="sexs" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>&nbsp;&nbsp;民族</td>
              <td>
                <el-select v-model="nations" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in nation" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <el-button type="primary" plain><span class="tech_red">*</span>上传头像</el-button>
                <el-button type="danger" plain>上传身份证</el-button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>

              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <el-button type="primary">保存并创建</el-button>

              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td class="tech_td"><span class="tech_red">*</span>身份证号</td>
              <td>
                <el-input v-model="input" placeholder="请输入正确的身份证号"></el-input>
              </td>
            </tr>
            <tr>
              <td><span class="tech_red">*</span>现在地址</td>
              <td style="width:300px">
                <el-input v-model="input" placeholder="请输入11位手机号"></el-input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <el-input v-model="input" placeholder="请输入6~20位详细地址"></el-input>
              </td>
            </tr>
            <tr>
              <td>&nbsp;&nbsp;出生日期</td>
              <td class="tech_dis">
                <div class="block">
                  <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0" style="width:300px">
                  </el-date-picker>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <!-- 补充个人资料  -->
        <p class="tech_font">补充个人资料</p>
        <div class="tech_table">
          <table>
            <tr>
              <td class="tech_td">邮箱:</td>
              <td style="width:300px">
                <el-input v-model="input" placeholder="请输入正确的邮箱" class="inpt"></el-input>
              </td>
            </tr>
            <tr>
              <td>身高:</td>
              <td>
                <el-input v-model="input" placeholder="请输入11位手机号"></el-input>
              </td>
            </tr>
            <tr>
              <td>婚姻状况:</td>
              <td>
                <el-select v-model="sexs" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <el-button type="primary">保存信息</el-button>

              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td class="tech_td">学历:</td>
              <td>
                <el-select v-model="educations" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in education" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>体重:</td>
              <td style="width:300px">
                <el-select v-model="sexs" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>

            <tr>
              <td>籍贯:</td>
              <td class="tech_dis">
                <el-select v-model="sexs" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
          </table>
        </div>

        <!-- 服务信息 -->
        <p class="tech_font">服务信息</p>
        <div class="tech_table">
          <table>
            <tr>
              <td class="tech_td"><span>*</span>选择城市:</td>
              <td style="width:300px">
                <el-input v-model="input" placeholder="请输入正确的邮箱" class="inpt"></el-input>
              </td>
            </tr>
            <tr>
              <td><span>*</span>所属服务站:</td>
              <td>
                <el-input v-model="input" placeholder="请输入11位手机号"></el-input>
              </td>
            </tr>
            <tr>
              <td><span>*</span>工作年限:</td>
              <td>
                <el-select v-model="sexs" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td class="tech_td"><span>*</span>岗位性质:</td>
              <td>
                <el-select v-model="sexs" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td><span>*</span>岗位状态:</td>
              <td style="width:300px">
                <el-select v-model="sexs" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>

            <tr>
              <td><span>*</span>入职日期:</td>
              <td class="tech_dis">
                <el-select v-model="sexs" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td class="tech_td"><span>*</span>选择技能:</td>
              <td>
                <el-select v-model="sexs" clearable placeholder="请选择" style="width:500px">
                  <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="tech_td"><span>*</span>工作时间:</td>
              <td>
                <el-select v-model="sexs" clearable placeholder="请选择" style="width:500px">
                  <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="tech_td">级别:</td>
              <td>
                <div>
                  <el-radio v-model="radio8" label="1" border size="medium">五级</el-radio>
                  <el-radio v-model="radio8" label="2" border size="medium">四级</el-radio>
                  <el-radio v-model="radio8" label="3" border size="medium">三级</el-radio>
                  <el-radio v-model="radio8" label="4" border size="medium">二级</el-radio>
                  <el-radio v-model="radio8" label="5" border size="medium">一级</el-radio>
                </div>
              </td>
            </tr>
            <tr>
              <td class="tech_td"><span>*</span>经验描述:</td>
              <td>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                </el-input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <el-button type="primary">保存信息</el-button>

              </td>
            </tr>
          </table>
        </div>
        <!-- APP登陆账号 -->
        <p class="tech_font">APP登陆账号</p>
        <div class="tech_table">
          <table>
            <tr>
              <td class="tech_td"><span>*</span>手机号:</td>
              <td style="width:300px">
                <el-input v-model="input" placeholder="请输入11位手机号" class="inpt"></el-input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <el-button type="primary">保存信息</el-button>

              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td class="tech_td"><span>*</span>密码:</td>
              <td style="width:300px">
                <el-input v-model="input" placeholder="默认为手机后四位" class="inpt" type="password"></el-input>
              </td>
            </tr>
          </table>
        </div>
        <!-- 银行信息 -->
        <p class="tech_font">银行信息</p>
        <div class="tech_table">
          <table>
            <tr>
              <td class="tech_td">卡类型:</td>
              <td style="width:300px">
                <el-input v-model="input" placeholder="请输入11位手机号" class="inpt"></el-input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <el-button type="primary">保存信息</el-button>

              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td class="tech_td">银行账号:</td>
              <td style="width:300px">
                <el-input v-model="input" placeholder="默认为手机后四位" class="inpt" type="password"></el-input>
              </td>
            </tr>
          </table>
        </div>
        <!-- 家庭成员 -->
        <p class="tech_font">家庭成员(选填)</p>
        <div class="tech_table">
          <el-table :key='tableKey' :data="list" stripe v-loading="listLoading" element-loading-text="正在加载" fit highlight-current-row
            style="width: 100%" v-show="false">

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
          <div style="width:100%">
            <el-button type="primary" icon="plus" @click="showTabl">家庭成员</el-button>
          </div>
          <table v-show="flags">
            <tr>
              <td class="tech_td"><span>*</span>关系:</td>
              <td style="width:300px">
                <el-select v-model="sexs" clearable placeholder="请选择" style="width:300px">
                  <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="tech_td"><span>*</span>名字:</td>
              <td style="width:300px">
                <el-input v-model="input" placeholder="请输入11位手机号" class="inpt"></el-input>
              </td>
            </tr>
            <tr>
              <td class="tech_td">手机号:</td>
              <td style="width:300px">
                <el-input v-model="input" placeholder="请输入11位手机号" class="inpt"></el-input>
              </td>
            </tr>
            <tr>
              <td class="tech_td">单位:</td>
              <td style="width:300px">
                <el-input v-model="input" placeholder="请输入11位手机号" class="inpt"></el-input>
              </td>
            </tr>
            <tr>
              <td class="tech_td">职务:</td>
              <td style="width:300px">
                <el-input v-model="input" placeholder="请输入11位手机号" class="inpt"></el-input>
              </td>
            </tr>
            <tr>
              <td class="tech_td"></td>
              <td style="width:300px">
                <el-button type="primary">保存</el-button>
                <el-button type="primary" plain>取消
                </el-button>
              </td>
            </tr>
          </table>
        </div>
        <!-- 其他信息 -->
        <p class="tech_font">其他信息</p>
        <div class="tech_table">
          <table>
            <tr>
              <td class="tech_td"></td>
              <td style="width:300px">
                <el-button type="primary" plain>*上传证件照</el-button>
                <el-button type="danger" plain>上传生活照</el-button>
              </td>
            </tr>
            <tr>
              <td class="tech_td"></td>
              <td style="width:300px">

              </td>
            </tr>
            <tr>
              <td class="tech_td">备注:</td>
              <td style="width:300px">
                <el-input type="textarea" :rows="2" placeholder="请简单描述一下" v-model="textarea" style="width:500px">
                </el-input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <el-button type="primary">保存信息</el-button>

              </td>
            </tr>
          </table>
        </div>



      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">保 存</el-button>
        <el-button v-else type="primary" @click="update">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div> -->

    </el-dialog>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- <div class="tech_position">
        
      </div> -->
  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js'
  import {parseTime} from '@/utils'
  export default {
    name: 'table_demo',
    directives: {
      waves
    },
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        input: '',
        flags: false,
        textarea: '',
        radio8: '1',
        value1: '',
        value2: '',
        value3: '',
        sexs: '',
        years: '',
        days: '',
        motheds: '',
        nations: '',
        educations:'',

        sex: [{
          value: '选项1',
          label: '男'
        }, {
          value: '选项2',
          label: '女'
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
        nation: [{
          value: '选项1',
          label: '汉族'
        }, {
          value: '选项2',
          label: '维吾尔族'
        }],
        options: [{
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

        options1: [{
          value: '选项1',
          label: '我可以'
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
        options2: [{
          values: '选项1',
          labels: '我e'
        }, {
          values: '选项2',
          labels: '双皮奶'
        }, {
          values: '选项3',
          labels: '蚵仔煎'
        }, {
          values: '选项4',
          labels: '龙须面'
        }, {
          values: '选项5',
          labels: '北京烤鸭'
        }],
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
        temp: {
          master: '',
        },
        temp2: {
          stationType: '',
          stationState: '',
          province: '',
          city: '',
          county: '',
        },
        importanceOptions: [1, 2, 3],
        stationType: stationType,
        stationState: stationState,
        dialogFormVisible: false,
        dialogTempVisible: false,
        dialogRangeVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '新增技师'
        },
        tableKey: 0,
        province: province,
        city: city,
        county: county,
        master: master,
      }
    },
    methods: {
      show() {
        alert(1)
      },
      showTabl() {
        this.flags = !this.flags
      },
      add() {
        this.flag = !this.flag
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      create() {
        this.temp.id = 1
        this.list.unshift(this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '增加成功',
          type: 'success',
          duration: 2000
        })
      },
      update() {
        this.temp.timestamp = +this.temp.timestamp
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1, this.temp)
            break
          }
        }
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '编辑成功',
          type: 'success',
          duration: 2000
        })
      },
      resetTemp() {
        this.temp = {

        }
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
    }
  }

</script>
<style>
  .tech {
    padding: 20px;
  }

  .tech_fs {
    /* padding: 10px; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background: #999; */
  }

  .tech_position {
    /* display: none; */
    position: absolute;
    top: 100px;
    left: 190px;
    bottom: 0;
  }

  .tech_back {
    width: 440px;
    height: 200px;
    background: #f3f1f1;
    position: relative;
  }

  .back_parent {
    display: flex;
    justify-content: space-between;
    /* margin-top: 0px; */
  }

  .tech_cen {
    position: absolute;
    width: 440px;
    height: 200px;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
  }

  .tech_new {
    padding: 10px 0;
    display: flex;
    flex-direction: row-reverse;
  }

  .btn {
    width: 100px;
  }

  .el-dialog__body {
    padding: 0px !important;
  }

  .tech_font {
    font-size: 16px;
    margin: 0;
    padding: 10px 0;
    border-bottom: 1px solid #f3f1f1;
    width: 920px;
    font-weight: 600;
  }

  .tech_table {
    display: flex;
    width: 920px;
    margin-top: 10px;
    padding-right: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .tech_td {
    width: 100px;
  }

  tr {
    padding: 40px 0;
    height: 60px;
    /* display: flex; */
    /* align-items: center; */
  }

  table input select {
    width: 260px;
  }

  .el-dialog--small {
    width: 60%;
  }

  .tech_red {
    color: red;
  }

</style>
