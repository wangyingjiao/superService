<template>
  <div class="box">
    <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索的技能名称" v-model="listQuery.title">
      </el-input>
      <button class="button-large btn_right" @click="handleFilter"> 搜索</button>
    </div>
    <div class="app-container calendar-list-container">
      <div class="">
        <div class="bgWhite">
          <button class="button-small btn_right btn_pad" @click="dialogVisible = true"> 新增</button>
          <el-table :key='tableKey' :data="getListdata" v-loading="listLoading" stripe fit highlight-current-row element-loading-text="正在加载"
            style="width: 100%">

            <el-table-column align="center" label="编号" width="100" type="index">
            </el-table-column>

            <el-table-column label="技能名称" align="center">
              <template scope="scope">
                {{ scope.row.name}}
              </template>
            </el-table-column>

            <el-table-column label="技师个数" align="center">
              <template scope="scope">
                {{ scope.row.name}}
              </template>
            </el-table-column>


            <el-table-column align="center" label="操作" min-width="100px">
              <template scope="scope">
                <div style="display:flex;justify-content: center;">
                  <div class="site-div" @click="handleUpdate(scope.row)">
                    <div class="back-icon-bg"></div>
                    <div>编辑状态</div>
                  </div>
                  <div class="site-div" @click="handleDelete(scope.row)">
                    <div class="back-icon-del"></div>
                    <div>删除</div>
                  </div>
                </div>
              </template>
            </el-table-column>

          </el-table>
        </div>

        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
            :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <!-- 弹出层新增技师 -->
        <el-dialog title="新增技师" :visible.sync="dialogVisible" size="small">
          <ul class="skill-ul">
            <li>
              <div class="clearfix">
                <p style="float:left"><span class="tech-spansk">*</span>技能名称:</p>
                <p style="float:left">
                  <el-input placeholder="请输入2~15位技能名称" style="width:300px"></el-input>
                </p>
              </div>
            </li>
            <li style="margin-bottom:0px;">
              <div class="clearfix">
                <p style="float:left"><span class="tech-spansk">*</span>选择服务:</p>
                <div class="tech-order-jnsk" style="float:left">
                  <button class="tech-order-btnsk" @click="choseServer"> &#10010 请选择</button>
                </div>
              </div>
            </li>
            <li style="margin:0">
              <div class="clearfix">
                <p style="float:left;"><span class="tech-spansk"></span>&nbsp;</p>

                <el-table :data="list" border style="width: 400px;margin:0px;float:left">
                  <el-table-column prop="date" label="项目名称" width="100" height="30" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="商品名称" width="180" align="center">
                  </el-table-column>
                  <el-table-column prop="address" label="操作" align="center">
                    <template scope="scope">
                      <button>删除</button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <p style="float:left"><span class="tech-spansk">*</span>选择技师:</p>
                <div class="tech-order-jnsk" style="float:left">
                  <button class="tech-order-btnsk" @click="orderTech"> &#10010 请选择</button>
                </div>
              </div>
            </li>
            <li v-show="ortech">
              <div class="clearfix">
                <p style="float:left"><span class="tech-spansk"></span>&nbsp;</p>
                <div class="tech-order-jnsk" style="float:left">

                </div>
              </div>
            </li>
            <li style="margin:40px 0;">
              <div class="clearfix">
                <p style="float:left"><span class="tech-spansk"></span>&nbsp;</p>
                <div style="float:left">
                  <button class="selfCheckBox">保存</button>
                  <button class="selfCheckBox">取消</button>
                </div>
              </div>
            </li>
          </ul>
        </el-dialog>
        <!-- 选择服务弹出层 -->
        <el-dialog title="选择服务" :visible.sync="flagserver" style="width:60%;left:200px;overflow:hidden">
          <ul class="skill-server-ul">
            <li class="clearfix">
              <div style="float:left">
                <el-input placeholder="输入要搜索的项目名称" style="width:220px" v-model="xingmu"></el-input>
              </div>
              <div style="float:right"><button class="selfCheckBox" @click="quiry">查询</button></div>
              <li>
                <el-table ref="multipleTable" :data="listorderServer "  border tooltip-effect="dark" style="width: 100%;margin:0;" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="" align="center">
                  </el-table-column>
                  <el-table-column label="项目名称" align="center">
                    <template scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>
                  <el-table-column label="商品名称" align="center">
                    <template scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>
                </el-table>
                </el-table>
              </li>
              <li>
                <div v-show="!listLoading" class="pagination-container">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                    :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                  </el-pagination>
                </div>
              </li>
              <li>
                <div>
                  <button class="selfCheckBox" @click="serversave">确定</button>
                  <button class="selfCheckBox" @click="serversave">取消</button>
                </div>
              </li>
          </ul>
        </el-dialog>

        <!-- 选择技师弹出层 -->
        <el-dialog title="选择服务人员" :visible.sync="ordertech" style="left:120px;">
          <ul class="skill-server-ul">
            <li class="clearfix">
              <div style="float:left;width:120px">
                <el-input placeholder="输入要搜索的姓名" style="width:120px"></el-input>
              </div>
              <div style="float:left;margin-left:10px;">
                <el-select clearable placeholder="请选择服务站">
                  <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div style="float:right"><button class="selfCheckBox">查询</button></div>
              <li>
                <el-table ref="multipleTable" :data="listTech" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55" align="center"  v-model="checkbox">
                  </el-table-column>
                  <el-table-column label="头像" width="120" align="center">
                    <template scope="scope">{{ scope.row.imgUrl}}</template>
                  </el-table-column>
                  <el-table-column  label="姓名" width="120" align="center">
                    <template scope="scope">{{ scope.row.techName}}</template>
                  </el-table-column>
                  <el-table-column  label="性别" show-overflow-tooltip align="center">
                    <template scope="scope">{{ scope.row.techSex}}</template>
                  </el-table-column>
                  <el-table-column  label="服务站" show-overflow-tooltip align="center">
                    <template scope="scope">{{ scope.row.techStationName}}</template>
                  </el-table-column>
                </el-table>
              </li>
              <li>
                <div v-show="!listLoading" class="pagination-container fy">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                    :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                  </el-pagination>
                </div>
              </li>
              <li>
                <div>
                  <button class="selfCheckBox" @click="techorde">确认</button>
                  <button class="selfCheckBox" @click="serversave">取消</button>
                </div>
              </li>
          </ul>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>

  import waves from '@/directive/waves/index.js' // 水波纹指令
  import {
    parseTime
  } from '@/utils'
  import {
    getListdata,
    Skillserver,
    getListser,
    orderServer,
    techDelet
  } from '@/api/skill'

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
        commodityse: {},
        options: [],
        checkbox:false,
        getListdata: [],
        ordertech: false,
        xingmu: '',
        list: [1, 2, 3],
        listTech: {},
        listorderServer: {},
        checked: false,
        ortech: false,
        total: null,
        listLoading: true,
        dialogVisible: false,
        flagserver: false,
        listQuery: {
          page: 1,
          limit: 6,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        temp: {
          option1: ''
        },
        importanceOptions: [1, 2, 3],
        dialogFormVisible: false,
        dialogStatus: '新增技能',
        textMap: {
          update: '编辑',
          create: '添加'
        },
        tableKey: 0,
        city: city,
        option1: option1
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
      // console.log(this.activeName) 
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row)
          var obj = {
            id:row.id
          }
          techDelet(obj).then(res=>{
            console.log(res)
            if(res.data.code === 1){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getList()
            }else{
              this.$message({
                  type: 'warning',
                  message: '分类下有服务项目，不可删除'
                });
            }
          }).catch(()=>console.log("未知错误"))
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
      choseServer() {
        this.flagserver = true
      },
      serversave() {
        this.flagserver = false
      },
      orderTech() {
        this.ordertech = true
      },
      // 选择服务人员全选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      quiry() {
        // console.log(this.xingmu)
      }
    },
    mounted() {
      getListdata().then(res => {
        this.getListdata = res.data.data.list
      });
      Skillserver().then(res => {
        this.listTech = res.data.data.list
      });
      getListser().then(res => {
        this.options = res.data;
      });
      orderServer().then(res => {
        this.listorderServer = res.data.data.list
      })

    }
  }

</script>
<style scoped>
  * {
    list-style: none;
  }

  .checkRightBox {
    border: solid 1px #dcdcdc;
    padding: 10px;
  }

  .checkAllBox {
    padding: 10px 0;
  }

  .checkBox1 {
    padding: 10px 0;
    border-top: solid 1px #dcdcdc;
    border-bottom: solid 1px #dcdcdc;
  }

  .checkBox2 {
    padding: 10px 0;
  }

  .checkBox3 {
    padding: 10px 0;
    border-top: solid 1px #dcdcdc;
  }

  body {
    background-color: #f5f5f5;
  }

  .bgWhite {
    background-color: #ffffff;
    padding: 20px
  }

  .btn_pad {
    margin: 0px 0px 10px 20px;
  }

  .btn_right {
    float: right;
  }

  .skill-ul {
    padding: 0 30px;
  }

  .skill-ul>li {
    margin: 20px 0;
  }


  .skill-ul>li>div>p:nth-child(1) {
    width: 120px;
  }

  .skill-ul>li>div>p {
    display: flex;
    line-height: 36px;
  }

  .tech-order-jnsk {
    width: 400px;
    height: 36px;
    border: 1px solid #bfcbd9;
    position: relative;
    line-height: 36px;
  }

  .tech-order-btnsk {
    background: #fff;
    color: #4c70e8;
    border: none;
    outline: none;
    cursor: pointer;
    margin-left: 10px;
  }

  .tech-spansk {
    color: red;
  }


  .clearfix:after {
    content: " ";
    display: block;
    clear: both;
    height: 0;
  }

  .clearfix {
    zoom: 1;
  }

  .skill-server-ul {
    padding: 0 20px;
  }

  .skill-server-ul>li {
    margin: 10px 0;
  }

</style>
