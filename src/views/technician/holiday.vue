<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">

      <el-select  clearable style="width: 200px" class="filter-item bottom0" v-model="listQuery.importance" placeholder="请选择">
        <el-option v-for="item in seOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item bottom0" placeholder="请输入搜索内容" v-model="listQuery.title">
      </el-input>

      <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始"
      end-placeholder="结束">
    </el-date-picker>

      <el-button class="filter-item  btn_left" type="primary" v-waves  @click="handleFilter">搜索</el-button>
    </div>

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

      <el-table-column align="center" label="姓名" >
        <template scope="scope">
          <span>张三</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="手机号" >
        <template scope="scope">
          <span>1111</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="服务站" >
        <template scope="scope">
          <span>呼家楼</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="开始时间" >
        <template scope="scope">
          <span>2017-10-17 13:00</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="结束时间" >
        <template scope="scope">
          <span>2017-10-17 13:00</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="备注" >
        <template scope="scope">
          <span>无</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <div class="site-div" @click="handleModifyStatus(scope.row,'deleted')">
                <div class="back-icon-del"></div>
                <div>删除</div>
          </div>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import waves from '@/directive/waves/index.js' // 水波纹指令
import { parseTime } from '@/utils'


// arr to obj
export default {
  name: 'table_demo',
  directives: {
    waves
  },
  data() {
    return {
      list: [1,2,3],
      total: null,
      listLoading: true,
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
        servicestation: '',
        station: '',
        peostate: '',
      }, 
      seOptions: ['姓名', '手机号'],
      date: '',
      tableKey: 0,
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
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
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
    
    addstation() {
      this.resetTemptwo()
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
    resetTemp() {
      this.temp = {
        id: undefined,
        password: '',
        password2: '',
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
<style scoped>
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
.check:nth-child(5){
   margin-left: 0px;
}
.checkBox3{
  padding: 10px 0;
  border-top: solid 1px #dcdcdc;
}
.ele-date{
  margin:0 10px
}
.bottom0{
  margin-bottom: 0px
}
</style>
