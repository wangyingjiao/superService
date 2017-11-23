<template>
<div>
  <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索手机号" v-model="listQuery.title">
      </el-input>

      <el-select clearable style="width: 200px" class="filter-item" v-model="listQuery.importance" placeholder="请选择岗位名称">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <button class="button-large btn_right" @click="handleFilter">搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    
    <button class="button-small btn_right btn_pad" @click="handleCreate">新增</button>
    <el-table
      :key='tableKey'
      :data="list"
      stripe
      v-loading="listLoading"
      element-loading-text="正在加载"
      fit
      highlight-current-row
      style="width: 100%">

      <el-table-column align="center" label="编号" >
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="岗位名称" align="center" >
        <template scope="scope">
          <span class="">管理者</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态">
       <template scope="scope">
          <span>可用</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <div style="display:flex;justify-content: center;">
              <div class="site-div" @click="handleUpdate(scope.row)">
                <div class="back-icon-bg"></div>
                <div>编辑状态</div>
              </div>
              <div class="site-div" @click="handleModifyStatus(scope.row,'deleted')">
                <div class="back-icon-del"></div>
                <div>删除</div>
              </div>
            </div>

        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" class="diatable">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 500px; margin-left:20px;'>

        <el-form-item label="岗位名称">
          <el-input :maxlength="15" :minlength="2" style='width: 400px;' placeholder="请输入2-15位的岗位名称">123</el-input>
        </el-form-item>
        <el-form-item label="等级">
          <el-select style='width: 400px;' class="filter-item" v-model="temp2.stationLv" placeholder="请选择">
            <el-option v-for="item in stationLv" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="权限">
           <div class="checkRightBox" style='width: 400px;'>
            <div class="checkAllBox">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </div>
              <el-checkbox-group v-model="checkedPowers" @change="handleCheckedPowersChange">
                <div class="checkBox1">
                <el-checkbox v-for="power in powers1" :label="power" :key="power" class="check">{{power}}</el-checkbox>
                </div>
                <div class="checkBox2">
                <el-checkbox v-for="power in powers2" :label="power" :key="power" class="check">{{power}}</el-checkbox>
                </div>
                <div class="checkBox3">
                <el-checkbox v-for="power in powers3" :label="power" :key="power" class="check">{{power}}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-select style='width: 400px;' class="filter-item" v-model="temp2.stationState" placeholder="可用">
            <el-option v-for="item in stationState" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">保 存</el-button>
        <el-button v-else type="primary" @click="update">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</div>
</template>

<script>
import { fetchList, fetchPv } from '@/api/article'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { parseTime } from '@/utils'

const mechanism = [
      { key: '1', display_name: '日常保洁' },
      { key: '2', display_name: '除尘除螨' },
      { key: '3', display_name: '家电清洗' },
      { key: '4', display_name: '擦玻璃' }
]

const servicestation = [
      { key: '1', display_name: '呼家楼服务站' },
      { key: '2', display_name: '其他' }
]

const peostate = [
      { key: '1', display_name: '可用' },
      { key: '2', display_name: '不可用' }
]

const powerOptions = ['机构管理', '服务机构', '服务站', '服务管理', '服务类型', '服务属性', '服务项目', '单位管理', '服务人员管理', '人员管理', '增加人员', '技能管理']
const powerOptions1 = ['机构管理', '服务机构', '服务站']
const powerOptions2 = ['服务管理', '服务类型', '服务属性', '服务项目', '单位管理', ]
const powerOptions3 = ['服务人员管理', '人员管理', '增加人员', '技能管理']

const stationLv = ['一级', '二级', '三级', '四级', '五级', '六级', '七级', '八级', '九级', '十级']
const stationState = ['可用', '不可用']
// arr to obj
const mechanismKeyValue = mechanism.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  name: 'table_demo',
  directives: {
    waves
  },
  data() {
    return {
      list: [1,2,3],
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
        id: undefined,
        password: '',
        password2: '',
        mechanism: '',
        servicestation: '',
        station: '',
        peostate: '',
      },
      temp2: {
        stationName: '',
        stationLv: '',
        stationState: ''
      },
      importanceOptions: [1, 2, 3],
      mechanism,
      servicestation,
      station:[1, 2, 3],
      peostate,
      stationName: '',
      stationLv:stationLv,
      stationState:stationState,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogPvVisible: false,
      pvData: [],
      showAuditor: false,
      tableKey: 0,
      checkAll: true,
      checkedPowers: [],
      powers: powerOptions,
      powers1: powerOptions1,
      powers2: powerOptions2,
      powers3: powerOptions3,
      isIndeterminate: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return mechanismKeyValue[type]
    }
  },
  created() {
    //this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      // this.listQuery.page = 1
      // this.getList()
    },
    handleSizeChange(val) {
      // this.listQuery.limit = val
      // this.getList()
    },
    handleCurrentChange(val) {
      // this.listQuery.page = val
      // this.getList()
    },
    timeFilter(time) {
      if (!time[0]) {
        this.listQuery.start = undefined
        this.listQuery.end = undefined
        return
      }
      this.listQuery.start = parseInt(+time[0] / 1000)
      this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
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
    addstation() {
      this.resetTemptwo()
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleCheckAllChange(event) {
      this.checkedPowers = event.target.checked ? powerOptions : []
      this.isIndeterminate = false
      },
    handleCheckedPowersChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.powers.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.powers.length
      },
    create() {
      this.temp.id = 1
      this.temp.password = 'abc'
      this.temp.password2 = 'abc'
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
        id: undefined,
        password: '',
        password2: '',
        mechanism: '',
        servicestation: '',
        station: '',
        peostate: ''
      }
    },
    resetTemptwo() {
      this.temp2 = {
        stationName: '',
        stationLv: '请选择',
        stationState: ''
      }
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style>
.btn_right{
  float:right;
  width:100px;
}
.btn_left{
  width:100px;
}
.checkRightBox{
  border: solid 1px #dcdcdc;
  padding: 10px;
}
.checkAllBox{
  padding: 10px 0;
}
.checkBox1{
  padding: 10px 0;
  border-top: solid 1px #dcdcdc;
  border-bottom: solid 1px #dcdcdc;
}
.checkBox2{
  padding: 10px 0;
}
.checkBox3{
  padding: 10px 0;
  border-top: solid 1px #dcdcdc;
}
.checkBox1 .el-checkbox{
   margin-left: 0px;
   margin-right: 15px 
}
.checkBox2 .el-checkbox{
   margin-left: 0px;
   margin-right: 15px
}
.checkBox3 .el-checkbox{
   margin-left: 0px;
   margin-right: 15px
}
body{
    background-color:#f5f5f5;
}
.bgWhite{
    background-color: #ffffff;
    padding: 20px
}
.btn_pad{
    margin:30px 0px 10px 20px;
}
.btn_right{
  float:right;
}
</style>
