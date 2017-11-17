<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索站点名" v-model="listQuery.title">
      </el-input>

      <el-select clearable style="width: 200px" class="filter-item" v-model="listQuery.importance" placeholder="请选择城市">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-button class="filter-item  btn_left" type="primary" v-waves  @click="handleFilter">搜索</el-button>
      <el-button class="filter-item  btn_right" type="primary" v-waves  @click="handleCreate">新增</el-button>
      <el-button class="filter-item  btn_right" type="primary" v-waves  @click="handleSetRange">设置范围</el-button>
      <el-button class="filter-item  btn_right" type="primary" v-waves  @click="handleSetMaster">设置站长</el-button>
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

      <el-table-column align="center" label="编号" >
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="服务站名称" align="center" >
        <template scope="scope">
          <span class="">呼家楼服务站</span>          
        </template>
      </el-table-column>

      <el-table-column  label="服务站类型" align="center" >
        <template scope="scope">
          <span class="">直营</span>          
        </template>
      </el-table-column>

      <el-table-column  label="所属城市" align="center" >
        <template scope="scope">
          <span class="">北京市</span>          
        </template>
      </el-table-column>

      <el-table-column  label="服务站电话" align="center" >
        <template scope="scope">
          <span class="">010-66668888</span>          
        </template>
      </el-table-column>

      <el-table-column  label="员工数量" align="center" >
        <template scope="scope">
          <span class="">12</span>          
        </template>
      </el-table-column>

      <el-table-column  label="阿姨数量" align="center" >
        <template scope="scope">
          <span class="">52</span>          
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态">
       <template scope="scope">
          <span>可用</span>
        </template>
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
      <el-form class="small-space" :model="temp" label-position="left" label-width="90px" style='width: 500px; margin-left:20px;'>

        <el-form-item label="服务站名称" >
          <el-input 
          :maxlength="15" 
          :minlength="2" 
          style='width: 400px;' 
          placeholder="请输入2-15位的服务站名称"></el-input>
        </el-form-item>
        <el-form-item label="服务站类型">
          <el-select style='width: 400px;' class="filter-item" v-model="temp2.stationType">
            <el-option v-for="item in stationType" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所在区域">
          <el-select style='width: 120px;' class="filter-item" v-model="temp2.province"  placeholder="请选择">
            <el-option v-for="item in province" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select style='width: 120px; margin-left:17px;' class="filter-item" v-model="temp2.city" placeholder="请选择">
            <el-option v-for="item in city" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select style='width: 120px; margin-left:17px;' class="filter-item" v-model="temp2.county" placeholder="请选择">
            <el-option v-for="item in county" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="详细地址" >
          <el-input :maxlength="100" :minlength="6" style='width: 400px;' placeholder="请输入6-100位的详细地址"></el-input>
        </el-form-item>

        <el-form-item label="服务站电话" >
          <el-input style='width: 400px;' placeholder="可选格式：11位手机号、座机（区号-电话号码）"></el-input>
        </el-form-item>

        
        <el-form-item label="状态">
          <el-select class="filter-item" v-model="temp2.stationState" >
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

    <el-dialog title="设置站长" :visible.sync="dialogTempVisible">
      <el-form :model="temp">
        <el-form-item label="服务站长">
          <el-select class="filter-item" v-model="temp.master" >
            <el-option v-for="item in master" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTempVisible = false">保 存</el-button>
        <el-button @click="dialogTempVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    
    <el-dialog title="门店范围" :visible.sync="dialogRangeVisible">
      <div class="map-box">
            <div id="map-scope-container" style="width:100%;height:400px;">
              <el-amap vid="amapDemo"></el-amap>
            </div>
            <div class="button-group">

                <input type="button" class="button" value="绘制服务区域" id="line"/>
            </div>
            <div id="panel">
                <div class="amap_lib_placeSearch" style="z-index: 9999">
                    <div style="background-color: #e5ecf9;">
                        <div style="display: inline-block;margin-left:7px;" id="areaTitle">
                        </div>
                        <div style="display: inline-block;margin-left:7px;">
                            <input type="checkbox" id="showOtherStoreArea" onchange="showOtherStoreArea()">其他门店范围
                        </div>
                        <div style="display: inline-block;float:right;margin-right:7px">
                            <a class="link" id="close">收缩</a> <a class="link" id="open">展开</a>
                        </div>
                    </div>
                    <div class="amap_lib_placeSearch_list">
                        <ul>
                        </ul>
                    </div>
                    <div class="amap_lib_placeSearch_page">
                        <div id="pageDiv">
                        </div>
                    </div>
                </div>
            </div>

        </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogRangeVisible = false">保 存</el-button>
        <el-button @click="dialogRangeVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import waves from '@/directive/waves/index.js' // 水波纹指令
import { parseTime } from '@/utils'
//挂载数据

const stationType = ['直营', '加盟']  //服务站类型

const stationState = ['启用', '停用']   //服务站状态

const master = ['张三','李四']   //站长
//临时挂载三级联动
const province = ['北京', '上海']
const city = ['海淀', '朝阳']
const county = ['海淀', '朝阳']


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
      stationType:stationType,
      stationState:stationState,
      dialogFormVisible: false,
      dialogTempVisible: false,
      dialogRangeVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      tableKey: 0,
      province: province,
      city: city,
      county: county,
      master:master,
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
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total
      //   this.listLoading = false
      // })
    },
    handleFilter() {
      console.log("搜索")
      this.listQuery.page = 1
      this.getList()
    },
    handleSetMaster() {
      console.log("设置站长")
      this.dialogTempVisible = true
    },
    handleSetRange() {
      console.log("设置范围")
      this.dialogRangeVisible = true
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
    resetTemptwo() {
      this.temp2 = {
        stationType: '请选择',
        stationState: ''
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
    // 初始化地图
    init(){
        var map = new AMap.Map('container', {
            center: [117.000923, 36.675807],
            zoom: 6
        });
        map.plugin(["AMap.ToolBar"], function() {
            map.addControl(new AMap.ToolBar());
        });
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
</style>