<template>
<div>
  <div class="filter-container bgWhite">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="0"></el-tab-pane>
      <el-tab-pane label="保洁" name="1"></el-tab-pane>
      <el-tab-pane label="家修" name="2"></el-tab-pane>
    </el-tabs>
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
      <button class="button-large btn_right" @click="handleFilter">搜索</button>
  </div>
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
    <button class="button-small btn_right btn_pad" @click="handleCreate">新增</button>

    <el-table 
    :key='tableKey' 
    :data="list" 
    v-loading="listLoading" 
    stripe
    fit 
    border
    highlight-current-row 
    element-loading-text="正在加载" 
    style="width: 100%" >
      <el-table-column align="center" type="index" label="排序号" width="100">
      </el-table-column>

      <el-table-column align="center" label="图片" prop="picture">
        <template scope="scope">
          <span><img :src='scope.row.picture'/></span>
        </template>
      </el-table-column>

      <el-table-column  label="项目名称" align="center" prop="name">
      </el-table-column>

      <el-table-column  label="商品名称         价格单位" align="center" min-width="150" style="padding:0">
        <template scope="scope">
          <div 
             class="branch"  
             v-for="(item,index) in scope.row.commoditys" 
             :key="index">
                  {{item.name}}&nbsp;&nbsp;&nbsp;{{item.price}}/{{item.unit}}
          </div>
        </template>
      </el-table-column>

      <el-table-column  label="所属分类" align="center" prop="sortName">
      </el-table-column>

      <el-table-column label="城市" align="center" prop="cityName">
      </el-table-column>

      <el-table-column  label="状态" align="center" >
        <template scope="scope">
          <span class="">上架</span>          
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="100px">
        <template scope="scope">
          <div style="display:flex;justify-content: center;">
              <div class="site-div" @click="handleUpdate(scope.row)">
                <div class="back-icon-bg"></div>
                <div>编辑</div>
              </div>
              <div class="site-div" @click="handleUpdate(scope.row)">
                <div class="back-icon-bg"></div>
                <div>上传</div>
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

    <el-dialog 
      :title="textMap[dialogStatus]" 
      :visible.sync="dialogFormVisible" 
      :show-close= false
      class="diatable">
        <el-tabs tabPosition='right' >
            <el-tab-pane label="保洁">
              <el-form class="small-space" :model="temp" label-position="left" label-width="90px" style='width: 500px; margin-left:20px;'>
                <h3>基本信息</h3><hr/><br/>
                <el-form-item label="所属分类">
                  <el-select class="filter-item" v-model="temp.sption1" >
                    <el-option v-for="item in option1" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="服务图片">
                  <el-upload
                    class="upload-demo upload_box"
                    action="http://gemini-wlcb.oss-cn-beijing.aliyuncs.com"
                    :data="sign"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList2"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div class="el-upload__tip">请选择上传的图片，且不超过4张</div>
                  </el-upload>
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
                    <el-checkbox v-model="city" label="南京" size="medium"></el-checkbox>
                    <el-checkbox v-model="city" label="天津" border size="medium"></el-checkbox>
                    <el-checkbox v-model="city" label="上海" border size="medium"></el-checkbox>
                    <el-checkbox v-model="city" label="青岛" border size="medium"></el-checkbox>
                    <div class="font_small">*定向城市指改服务项目的适用城市。默认不填，代表适用于本机构/所属分类设置的所有城市</div>
                </el-form-item>
                <el-form-item label="是否上架">
                    <el-switch
                      v-model="val"
                      on-text="是"
                      off-text="否">
                    </el-switch>
                </el-form-item>

                <el-form-item label="排序号">
                    <el-input 
                      style='width: 400px;' 
                      placeholder="请输入排序号（值越小越靠前）"></el-input>
                </el-form-item>
              </el-form>
              <h3>商品信息</h3><hr/><br/>
              <el-table
                border 
                :data="list"
                class="goods_info">
                <el-table-column align="center" label="商品名称">
                  <template scope="scope">
                    123
                  </template>
                </el-table-column>
                <el-table-column align="center" label="商品单位">
                  <template>
                    123
                  </template>
                </el-table-column>
                <el-table-column align="center" label="计量方式">
                  <template>
                    测试
                  </template>
                </el-table-column>
                <el-table-column align="center" label="价格">
                  <template>
                    测试
                    
                  </template>
                </el-table-column>
                <el-table-column align="center" label="折算时长">
                  <template>
                    123
                  </template>
                </el-table-column>
                <el-table-column label="派人数量" class="123" class-name="234">
                   <el-table-column align="center" width="100%" label="临界值">
                     <template scope="scope">
                      <div class="content-rowspan">
                        <div><=1</div>
                        <div><=1</div>
                        <div><=1</div>
                        <div><=1</div>
                      </div>
                    
                    </template>

                   </el-table-column>
                   <el-table-column align="center" width="100%" label="人数">
                     <template>
                      123
                     </template>
                   </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="起购数量">
                  <template>
                    123
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template>
                    123
                  </template>
                </el-table-column>
              </el-table>
              <div class="add_Btn">
                <span class="fl btn_Span1">+</span>
                <span class="fl btn_Span2">添加商品</span>
              </div>
              <el-form 
                :model="goods_info"
                ref="goods_info"
                label-position="left"
                label-width="80px" 
                style='width: 500px; margin-left:50px;'
                :rules="rules">
                <el-form-item label="活动名称" prop="name">
                  <el-input
                    placeholder="请输入活动名称（2-10位）"
                    v-model="goods_info.name"></el-input>
                </el-form-item>

                <el-form-item label="商品单位" prop="unit">
                  <el-input 
                    placeholder="请输入活动名称（2-10位）"
                    v-model="goods_info.unit"></el-input>
                </el-form-item>

                <el-form-item label="计量方式" prop="metering">
                  <el-select class="filter-item" v-model="goods_info.metering" placeholder="可用">
                     <el-option v-for="item in option1" :key="item" :label="item" :value="item">
                     </el-option>
                  </el-select>
                </el-form-item>
                
                <el-form-item label="价格" prop="price">
                  <el-input v-model="goods_info.price"></el-input>
                </el-form-item>
                <el-form-item label="折算时长" prop="time">
                  <el-input v-model="goods_info.time"></el-input>
                </el-form-item>

                <el-form-item label="派人数量" prop="peoNum">
                  <el-input v-model="goods_info.peoNum"></el-input>
                </el-form-item>
                <el-form-item label="起够数量" prop="num">
                  <el-input 
                    placeholder="请输入起购数量（默认为1）"
                    v-model="goods_info.num"></el-input>
                </el-form-item>

                <el-form-item>
                  <button class="button-large" @click="submitForm('goods_info')">添 加</button>    
                  <button class="button-cancel" @click="resetForm('goods_info')">取 消</button> 
                </el-form-item>
              </el-form>
              
            </el-tab-pane>

            <el-tab-pane label="家修">teb切换</el-tab-pane>
        </el-tabs>
      <hr>
      <div slot="footer" class="dialog-footer">
        <button class="button-large" @click="create">保 存</button>    
        <button class="button-cancel" @click="dialogFormVisible = false">取 消</button>
      </div>
    </el-dialog>

  </div>
</div>
</div>
</div>
</template>

<script>
import { getProject, addProject } from "@/api/serviceManage";
import { getSign } from "@/api/sign";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
//挂载数据

const city = ["海淀", "朝阳"];
const option1 = ["北京", "北京"];

export default {
  name: "table_demo",
  directives: {
    waves
  },
  data() {
    return {
      sign: getSign(),
      list: [],
      total: null,
      listLoading: true,
      val: true,
      rules: {
        name: [
          { required: true, message: "请输入名称(2-10位)", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "请输入名称(2-10位)", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        metering: [{ required: true, message: "请输入名称(2-10位)", trigger: "blur" }]
      },
      goods_info: {
        name: "",
        unit: "",
        metering: "",
        price: "",
        time: "",
        peoNum: "",
        num: ""
      },
      listQuery: {
        page: 1,
        limit: 6,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      fileList2: [
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      temp: {
        option1: "",
        val: true
      },
      importanceOptions: [1, 2, 3],
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      tableKey: 0,
      city: city,
      option1: option1,
      activeName: '0'
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      var obj = {
        "majorSort": this.activeName
      }
      getProject(obj)
        .then(res => {
          console.log(res.data);
          this.list = res.data.data.list;
          this.listLoading = false;
          //this.total = res.data.data.count;
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    handleFilter() {
      console.log("搜索");
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log("未知方法");
      this.listQuery.page = val;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      console.log("编辑");
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    handleDelete(row) {
      console.log("删除");
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
    },
    create() {
      var obj = {
        citys: [
          {
            cityId: "1",
            cityName: "北京"
          },
          {
            cityId: "2",
            cityName: "山东"
          }
        ],
        commoditys: [
          {
            name: "日常保洁",
            unit: "小时",
            meterage: "按居室",//计量方式
            price: "19",
            convertTime: "10",//折算时长
            minimum: 1,//起购数量
            persons: [//派人
              {
                critical: ">10",
                quantity: 1
              },
              {
                critical: ">20",
                quantity: 2
              }
            ]
          }
        ],
        majorSort: "1",
        sortId: "00ea9c6db7f242c49eb40b43b38ad7b7",
        sortName: "日常保洁",//所属分类
        name: "保洁家修1",//项目名称（验重）
        picture: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=989127825,4177828898&fm=58&s=E152CC32C521590358D4D5DE020050B0&bpow=121&bpoh=75",
        description: "服务描述测试",
        sale: "1",//是否上架
        sortNum: 1//排序号
      }
      addProject(obj).then(res=>{
        console.log(res)
      })
    },
    update() {
      this.temp.timestamp = +this.temp.timestamp;
      for (const v of this.list) {
        if (v.id === this.temp.id) {
          const index = this.list.indexOf(v);
          this.list.splice(index, 1, this.temp);
          break;
        }
      }
      this.dialogFormVisible = false;
      this.$notify({
        title: "成功",
        message: "编辑成功",
        type: "success",
        duration: 2000
      });
    },
    handleClick(tab, event) {
      this.getList()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    resetTemp() {
      this.temp = {};
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("保存表格测试");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.btn_right {
  float: right;
  width: 100px;
}
.btn_left {
  width: 100px;
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
  background-color: #eef1f6;
}
.bgWhite {
  background-color: #ffffff;
  padding: 20px;
}
.btn_pad {
  margin: 0px 0px 10px 20px;
}
.btn_right {
  float: right;
}
.goods_info {
  font-size: 12px;
}
.el-table th > .cell {
  text-align: -webkit-center;
}
.el-table .cell,
.el-table th > div {
  padding-left: 10px;
  padding-right: 10px;
}
.upload_box {
  max-width: 400px;
  box-sizing: border-box;
  padding: 10px;
  border: 1px #785 dashed;
}
.upload_box .el-upload .el-button {
  background-color: #4c70e8;
  border-color: #4c70e8;
  border-radius: 0px;
}
.font_small {
  color: #cccccc;
  font-size: 12px;
}
.content-rowspan div {
  line-height: 30px;
  border-bottom: 1px solid #cccccc;
}
.content-rowspan div:last-child {
  border-bottom: 0;
}
.add_Btn {
  width: 100px;
  height: 30px;
  margin-top: 20px;
  color: #ffffff;
  line-height: 30px;
  background-color: #4c70e8;
  cursor: pointer;
}
.btn_Span1 {
  width: 30px;
  height: 30px;
  background-color: #6d8dfc;
  text-align: center;
}
.btn_Span2 {
  width: 70px;
  height: 30px;
  text-align: center;
}
.branch {
  width: 100%;
  height: 45px;
  line-height: 45px;
}
.branch:nth-of-type(even) {
  background-color: #f5f5f5;
}
.el-table .cell {
  padding: 0;
}
</style>