<template>
<div>
  <div class="filter-container bgWhite">
      <el-select clearable style="width: 200px" class="filter-item" v-model="listQuery.importance" placeholder="请选择城市">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入分类名称" v-model="listQuery.title">
      </el-input>
      <button class="button-large btn_right" @click="handleFilter">搜索</button>
    </div>
  <div class="app-container calendar-list-container">
    <button class="button-small btn_right btn_pad" @click="handleCreate">新增</button>

    <el-table 
    :key='tableKey' 
    :data="list" 
    v-loading="listLoading" 
    stripe
    fit 
    highlight-current-row 
    element-loading-text="正在加载" 
    style="width: 100%" >

      <el-table-column align="center" label="编号" type="index" width="100">
      </el-table-column>

      <el-table-column  label="分类名称" align="center" prop="name">
      </el-table-column>

      <el-table-column  label="城市" align="center" prop="cityName">
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button  size="small" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button  size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" class="diatable">
      <el-form class="small-space" :rules="rules" :model="temp" label-position="left" label-width="100px" style='width: 500px; margin-left:20px;'>

        <el-form-item label="服务站名称"  prop="name" >
          <el-input        
          style='width: 400px;' 
          placeholder="请输入2-15位的服务站名称"></el-input>
        </el-form-item>
        
        <el-form-item label="定向城市">      
            <el-checkbox v-model="city" label="北京" border='true' size="medium"></el-checkbox>
            <el-checkbox v-model="city" label="北京" size="medium"></el-checkbox>
            <el-checkbox v-model="city" label="北京" border size="medium"></el-checkbox>
            <el-checkbox v-model="city" label="北京" border size="medium"></el-checkbox>
            <el-checkbox v-model="city" label="北京" border size="medium"></el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer"> 
        <button class="button-large" @click="cleaning">保 存</button>    
        <button class="button-cancel" @click="dialogFormVisible = false">取 消</button>    
        <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="create">保 存</el-button>
        <el-button v-else type="primary" @click="update">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button> -->
      </div>
    </el-dialog>

  </div>
</div>
</template>

<script>
import { getClass, addClean} from "@/api/serviceManage";
import waves from '@/directive/waves/index.js' // 水波纹指令
import { parseTime } from '@/utils'
//挂载数据





const city = ['海淀', '朝阳']



export default {
  name: 'table_demo',
  directives: {
    waves
  },
  data() {
    return {
      list: [],
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
      },
      rules: {
         name: [
            { required: true, message: '请输入 2 到 10 位的分类名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
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
      getClass().then(res=>{
        console.log(res)
        this.list = res.data.data.list
      })
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
    cleaning(){
      console.log("保存")
      var obj={
         "citys": [
            {
              "cityId": "bj",
              "cityName": "北京"
            }
          ],
          "majorSort": "1",
          "name": "擦地板1"
      }
      addClean(obj).then(res=>console.log(res))
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
<style scoped="scoped">
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
/* .diatable .el-form-item__label{
  font-size: 12px;
  color: red
} */
</style>