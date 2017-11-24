<template>
<div>
  <div class="filter-container bgWhite">

      <el-select clearable style="width: 200px" class="filter-item" v-model="listQuery.importance" placeholder="请选择">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入搜索的内容" v-model="listQuery.title">
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
    highlight-current-row 
    element-loading-text="正在加载" 
    style="width: 100%" >

      <el-table-column align="center" label="机构编号" >
        <template scope="scope">
          <span>1</span>
        </template>
      </el-table-column>

      <el-table-column  label="机构名称" align="center" min-width="150px" prop="name" >
      </el-table-column>

      <el-table-column  label="机构电话" align="center" min-width="200px" prop="office400">
      </el-table-column>

      <el-table-column  label="机构地址" align="center" min-width="200px" prop="officeUrl">
      </el-table-column>

      <el-table-column  label="负责人姓名" align="center" width ="150" prop="masterName">
      </el-table-column>

      <el-table-column  label="负责人手机号" align="center" min-width="200px">
        <template scope="scope">
          <span class="">{{scope.row.phone}}</span>          
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button  size="small" @click="handleUpdate(scope.row)">编辑
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
      <el-form class="small-space" :model="temp" label-position="left" label-width="100px" style='width: 500px; margin-left:20px;'>

        <el-form-item label="机构名称" >
          <el-input 
          :maxlength="15" 
          :minlength="2" 
          v-model="temp.name"
          style='width: 400px;' 
          placeholder="请正确填写机构名称（2-15个字）"></el-input>
        </el-form-item>

        <el-form-item label="机构电话" >
          <el-input 
            style='width: 400px;' 
            v-model="temp.phone"
            placeholder="请输入服务机构电话,格式:座机(区号+号码)如:010-66668888"></el-input>
        </el-form-item>

        <el-form-item label="负责人姓名" >
          <el-input 
          :maxlength="15" 
          :minlength="2" 
          style='width: 400px;' 
          v-model="temp.primaryPersonName"
          placeholder="请输入2-15位的负责人姓名"></el-input>
        </el-form-item>
 
        <el-form-item label="负责人手机号" >
          <el-input 
            @blur="phoneBlur" 
            style='width: 400px;' 
            placeholder="请输入11位手机号" 
            v-model="temp.primaryPersonPhone"></el-input>
        </el-form-item>

        <el-form-item label="所在区域" v-model="temp.areaId">
          <el-select style='width: 120px;' class="filter-item" v-model="temp.province"  placeholder="请选择">
            <el-option v-for="item in province" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select style='width: 120px; margin-left:15px;' class="filter-item" v-model="temp.city" placeholder="请选择">
            <el-option v-for="item in city" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select style='width: 120px; margin-left:15px;' class="filter-item" v-model="temp.county" placeholder="请选择">
            <el-option v-for="item in county" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="详细地址" >
          <el-input 
             :maxlength="100" 
             :minlength="6" 
             style='width: 400px;' 
             v-model="temp.address"
             placeholder="请输入6-100位的详细地址"></el-input>
        </el-form-item>

        <el-form-item label="服务范围类型">
          <el-select 
            style='width: 400px;' 
            class="filter-item" 
            v-model="temp.serviceAreaType" 
            placeholder="请选择">
            <el-option v-for="item in stationType" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="服务城市" >
          <el-select 
            style='width: 400px;' 
            v-model="temp.cityIds" 
            multiple 
            placeholder="请选择">
            <el-option-group
              v-for="group in serviceCity"
              :key="group.label"
              :label="group.label">  
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item label="机构网址" >
          <el-input 
            style='width: 400px;' 
            v-model="temp.officeUrl"
            placeholder="请输入机构网址"></el-input>
        </el-form-item>

        <el-form-item label="机构传真" >
          <el-input 
            style='width: 400px;' 
            v-model="temp.fax"
            placeholder="请输入机构传真号"></el-input>
        </el-form-item>

        <el-form-item label="400客服电话" >
          <el-input 
            style='width: 400px;' 
            v-model="temp.office400"
            placeholder="允许格式：400XXXXXXX"></el-input>
        </el-form-item>

        <el-form-item label="备注" >
          <el-input 
            type="textarea" 
            :rows="2" 
            v-model="temp.remark"></el-input>
        </el-form-item>
        

        
        
      </el-form>
      <div slot="footer" class="dialog-footer">       
        <el-button type="primary" @click="create">保 存</el-button>
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
    
  </div>
  </div>
</div>
</template>

<script>
import { getMech, addMech, getSerarea, getSerstation } from "@/api/base";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { parseTime } from "@/utils";
//挂载数据
//临时挂载三级联动
const province = ["北京", "上海"];
const city = ["海淀", "朝阳"];
const county = ["海淀", "朝阳"];
const optionsBox = [
  {
    label: "北京市",
    options: [
      {
        value: "朝阳",
        label: "朝阳区"
      },
      {
        value: "海淀",
        label: "海淀区"
      }
    ]
  },
  {
    label: "河北市",
    options: [
      {
        value: "邯郸",
        label: "邯郸市"
      },
      {
        value: "廊坊",
        label: "廊坊市"
      },
      {
        value: "石家庄",
        label: "石家庄市"
      },
      {
        value: "Dalian",
        label: "大连"
      }
    ]
  }
];

export default {
  name: "table_demo",
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
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      temp: {
        address: "",
        areaId: "",
        fax: "",
        name: "",
        office400: "",
        officeUrl: "",
        phone: "",
        primaryPersonName: "",
        primaryPersonPhone: "",
        remark: "",
        serviceAreaType: "",
        cityIds: [],
        province: "",
        city: "",
        county: ""
      },
      importanceOptions: ["请选择", "机构名称", "负责人姓名", "负责人手机号"],
      stationType: [],
      stationState: ["启用", "停用"],
      dialogFormVisible: false,
      dialogTempVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      tableKey: 0,
      province: province,
      city: city,
      county: county,
      master: ["张三", "李四"],
      textarea: "",
      serviceCity: optionsBox
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
  mounted() {
    getSerarea().then(res => {
      this.stationType = res.data;
    });
  },
  methods: {
    getList() {
      this.listLoading = false;
      getMech().then(res => {
        console.log(res);
        this.list=res.data.data
        
      });
    },
    handleFilter() {
      console.log("搜索");
      this.listQuery.page = 1;
      this.getList();
    },
    handleSetMaster() {
      console.log("设置站长");
      this.dialogTempVisible = true;
    },
    handleSetRange() {
      console.log("设置范围");
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
      //this.temp.id = 1
      var ceshi = {
        address: "北京市",
        areaId: "12",
        fax: "123",
        name: "国安社区5",
        office400: "4000900123",
        officeUrl: "北京",
        phone: "13264532323",
        primaryPersonName: "张三",
        primaryPersonPhone: "13265451212",
        remark: "1",
        serviceAreaType: "1",
        cityIds: ["123", "123", "123"]
      };
      var obj = {
        address: this.temp.address,
        areaId: this.temp.address,
        fax: this.temp.address,
        name: this.temp.address,
        office400: this.temp.address,
        officeUrl: this.temp.address,
        phone: this.temp.phone,
        primaryPersonName: this.temp.address,
        primaryPersonPhone: this.temp.address,
        remark: this.temp.address,
        serviceAreaType: "1",
        cityIds: ["123", "123", "123"]
      };
      addMech(ceshi).then(res => {
        console.log(res);
        if (res.data.code) {
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: res.data.data,
            type: "success",
            duration: 2000
          })
        }else{
          this.$notify({
            title: "失败",
            message: res.data.data,
            type: "error",
            duration: 2000
          })
        }
      });
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
    phoneBlur() {
      console.log(this.temp.primaryPersonPhone);
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(this.temp.primaryPersonPhone)) {
        console.log("错误");
        this.temp.primaryPersonPhone = "";
        this.$notify({
          title: "手机号有误",
          message: "请正确输入手机号",
          type: "warning",
          duration: 2000
        });
      }
    },
    resetTemp() {
      this.temp = {
        address: "",
        areaId: "",
        fax: "",
        name: "",
        office400: "",
        officeUrl: "",
        phone: "",
        primaryPersonName: "",
        primaryPersonPhone: "",
        remark: "",
        serviceAreaType: "",
        cityIds: [],
        province: "",
        city: "",
        county: ""
      };
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
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