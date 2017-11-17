<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select clearable style="width: 200px" class="filter-item" v-model="listQuery.importance" placeholder="所属分类">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable style="width: 200px" class="filter-item" v-model="listQuery.importance" placeholder="定向城市">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索的项目名称" v-model="listQuery.title">
      </el-input>

     

      <el-button class="filter-item  btn_left" type="primary" v-waves  @click="handleFilter">搜索</el-button>
      <el-button class="filter-item  btn_right" type="primary" v-waves  @click="handleCreate">新增</el-button>
    </div>

    <el-table 
    :key='tableKey' 
    :data="list" 
    v-loading="listLoading" 
    stripe
    fit 
    highlight-current-row 
    element-loading-text="正在加载" 
    style="width: 100%" >

      <el-table-column align="center" label="排序号" >
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="图片" >
        <template scope="scope">
          <span><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=263865229,1163281087&fm=58"/></span>
        </template>
      </el-table-column>

      <el-table-column  label="项目名称" align="center" >
        <template scope="scope">
          <span class="storey">日常保洁</span>                     
        </template>
      </el-table-column>

      <el-table-column  label="商品名称  价格单位" align="center" >
        <template scope="scope">
          <span class="storey">日常保洁 19元/小时</span>                     
        </template>
      </el-table-column>

      <el-table-column  label="所属分类" align="center" >
        <template scope="scope">
          <span class="">日常保洁</span>          
        </template>
      </el-table-column>

      <el-table-column  label="城市" align="center" >
        <template scope="scope">
          <span class="">北京市</span>          
        </template>
      </el-table-column>

      <el-table-column  label="状态" align="center" >
        <template scope="scope">
          <span class="">上架</span>          
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="100px">
        <template scope="scope">
          <el-button  size="small" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button  size="small" @click="handleUpdate(scope.row)">上传
          </el-button>
          <el-button icon="el-icon-delete"  size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
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
        <el-tabs tabPosition='right' style="height: 200px;">
            <el-tab-pane label="保洁">
              <el-form class="small-space" :model="temp" label-position="left" label-width="90px" style='width: 500px; margin-left:20px;'>
                <h3>基本信息</h3><hr/><br/>
                <el-form-item label="状态">
                  <el-select class="filter-item" v-model="temp.sption1" >
                    <el-option v-for="item in option1" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                
                <el-form-item label="项目名称" >
                  <el-input 
                  :maxlength="10" 
                  :minlength="2" 
                  style='width: 400px;' 
                  placeholder="请输入2-10位的服务站名称"></el-input>
                </el-form-item>
                
                <el-form-item label="定向城市">      
                    <el-checkbox v-model="city" label="北京" border='true' size="medium"></el-checkbox>
                    <el-checkbox v-model="city" label="北京" size="medium"></el-checkbox>
                    <el-checkbox v-model="city" label="北京" border size="medium"></el-checkbox>
                    <el-checkbox v-model="city" label="北京" border size="medium"></el-checkbox>
                    <el-checkbox v-model="city" label="北京" border size="medium"></el-checkbox>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="家修">家修</el-tab-pane>
        </el-tabs>
      
      <div slot="footer" class="dialog-footer">       
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">保 存</el-button>
        <el-button v-else type="primary" @click="update">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

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
</style>