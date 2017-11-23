<template>
  <div class="box">
      <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索的技能名称" v-model="listQuery.title">
      </el-input>
      <button class="button-large btn_right"  @click="handleFilter"> 搜索</button>   
    </div>
  <div class="app-container calendar-list-container">
    <div class="">
      <div class="bgWhite">
    <button class="button-small btn_right btn_pad"  @click="handleCreate"> 新增</button>
    <el-table 
    :key='tableKey' 
    :data="list" 
    v-loading="listLoading" 
    stripe
    fit 
    highlight-current-row 
    element-loading-text="正在加载" 
    style="width: 100%" >

      <el-table-column align="center" label="编号" type="index" width= "100">
      </el-table-column>

      <el-table-column  label="技能名称" align="center" >
        <template scope="scope">
          <span class="storey">日常保洁</span>                     
        </template>
      </el-table-column>

      <el-table-column  label="技师个数" align="center" >
        <template scope="scope">
          <span class="">1个</span>          
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="100px">
        <template scope="scope">
          <el-button  size="small" @click="handleUpdate(scope.row)">编辑
          </el-button>

          <el-button icon="el-icon-delete"  size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    </div>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" class="diatable">
      <el-form class="small-space" label-position="left" label-width="80px" style='width: 500px; margin-left:20px;'>

        <el-form-item label="技能名称">
        <el-input style='width: 400px' :maxlength="15" :minlength="2" placeholder="请输入2-15位的技能名称">123</el-input>
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
  </div>
</template>

<script>

import waves from '@/directive/waves/index.js' // 水波纹指令
import { parseTime } from '@/utils'
//挂载数据





const city = ['海淀', '朝阳']
const option1 = ['北京', '北京']



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
        option1:''
      },  
      importanceOptions: [1, 2, 3],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      tableKey: 0,
      city: city,
      option1:option1
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
      console.log("搜索")
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      console.log("未知方法")
      this.listQuery.page = val
      this.getList()
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
    handleUpdate(row) {
      console.log("编辑")
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      console.log("删除")
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
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
    

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },

  }
}
</script>
<style>
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
body{
    background-color:#f5f5f5;
}
.bgWhite{
    background-color: #ffffff;
    padding: 20px
}
.btn_pad{
    margin:0px 0px 10px 20px;
}
.btn_right{
  float:right;
}
</style>