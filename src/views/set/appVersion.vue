<template>
<div>
  <!-- 搜索开始 -->
    <div class="filter-container bgWhite">
      <el-input @keyup.enter.native="handleFilter" style="width:30%;margin-right:2%" placeholder="请输入搜索内容" v-model="search.val">
        <el-select  clearable slot="prepend" style="width:90px" v-model="search.type" placeholder="请选择">
          <el-option v-for="item in seOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-input>

       <button class="button-large el-icon-search btn_search" @click="handleFilter"> 搜索</button>
    </div>
    <!-- 搜索结束 -->
  <div class="app-container calendar-list-container">
    <div class="bgWhite">
      <button class="button-small btn_pad" @click="handleCreate">新增</button>
    <!-- 表格 -->
    <el-table 
      :key='tableKey' 
      :data="list" 
      v-loading="listLoading" 
      element-loading-text="正在加载" 
      fit 
      tooltip-effect='light'
      highlight-current-row 
      style="width: 100%">

      <el-table-column align="center" label="ID" prop="id">
      </el-table-column>

      <el-table-column align="center" label="版本号" prop="versionNumber">
      </el-table-column>

      <el-table-column align="center" label="build号" prop="build">      
      </el-table-column>

      <el-table-column align="center" label="强更状态" prop="forcedUpdate">      
      </el-table-column>

      <el-table-column align="center"  width="150px" label="更新提示语" prop="upgradeContent">     
        <template scope="scope">
           <el-tooltip placement="left" :disabled="scope.row.upgradeContent.length < 5" :content="scope.row.upgradeContent">
             <div class="tool" >{{scope.row.upgradeContent}}</div>
           </el-tooltip>
        </template> 
      </el-table-column>

      <el-table-column align="center"  width="150px" label="更新地址" prop="refreshAddress">   
        <template scope="scope">
           <el-tooltip placement="left" :disabled="scope.row.refreshAddress.length < 5" :content="scope.row.refreshAddress">
             <div class="tool" >{{scope.row.refreshAddress}}</div>
           </el-tooltip>
        </template>    
      </el-table-column>

    
      <el-table-column align="center" label="创建时间" prop="createDate">      
      </el-table-column>
      
     

      <el-table-column align="center" label="更新时间" prop="updateDate">      
      </el-table-column>
      
      

      <el-table-column align="center" width="150" label="操作">
        <template scope="scope">
            <!-- <el-button class="el-icon-edit ceshi3"   @click="handleUpdate(scope.row)"></el-button> -->
            <el-button class="el-icon-delete ceshi3"   @click="handleDelete(scope.row)"></el-button>
          </template>
      </el-table-column>

    </el-table>

    <!-- 分页器 -->
    <div v-if="!listLoading" class="pagination-container clearfix">
      <el-pagination class="fr mt20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 弹窗 -->
    <el-dialog 
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible" 
      :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
       class="diatable">
          <el-form        
            class="small-space dia_form" 
            ref="temp" 
            :rules="rules" 
            :model="temp" 
            label-position="left" 
            label-width="100px"
            >
          <el-form-item label="版本号:" prop="versionNumber">
            <el-input        
           class="form_item"
            placeholder="请输入2-10位的版本号" v-model.trim="temp.versionNumber"></el-input>
          </el-form-item>

          <el-form-item label="build号:" prop="build">
            <el-input        
           class="form_item"
           
            placeholder="请输入build号" v-model.trim="temp.build"></el-input>
          </el-form-item>

          <el-form-item label="强更状态:" prop="forcedUpdate">
             <el-radio v-model="temp.forcedUpdate" label="yes">是</el-radio>
             <el-radio v-model="temp.forcedUpdate" label="no">否</el-radio>
          </el-form-item>
            
          <el-form-item label="更新提示语:" prop="upgradeContent">
            <el-input     
            type="textarea"   
           class="form_item"
            placeholder="请输入不超过200位的提示语" v-model.trim="temp.upgradeContent"></el-input>
          </el-form-item>

          <el-form-item label="更新地址:" prop="refreshAddress">
            <el-input        
           class=""
            placeholder="请输入更新地址" v-model.trim="temp.refreshAddress"></el-input>
           
              <el-upload
                      :show-file-list="false"
                      action="'https://imgcdn.guoanshequ.com/'"
                      :file-list="fileList"
                      :http-request="uploadSectionFile"> <!--此处使用自定义上传实现http-request-->
                  <el-button size="small" type="primary">点击上传</el-button>
                  <!-- <el-tag type="gray">{{sectionFileName}}</el-tag> -->
                  <div slot="tip" class="el-upload__tip">请等待进度条100%之后再提交表单</div>
              </el-upload>
              <el-progress v-show="showProgress" :text-inside="true" :stroke-width="18"
                          :percentage="uploadPercent"></el-progress>
          
          </el-form-item>
          

           

          </el-form>
      
      <div slot="footer" class="dialog-footer" style="text-align: center;">   
        <button class="button-large" :loading="true" :disabled="btnState"  v-if="dialogStatus == 'update'"  @click="update('temp')">保 存</button>     
        <button class="button-large" :loading="true" v-else :disabled="btnState" @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>

  </div>
  </div>
</div>
</template>

<script>
import {
  getApp,
  addApp,
  handleUpApp,
  upApp,
  delApp,
  getNewest
} from "@/api/set";
import util from "@/utils/date";
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "appVersion",
  directives: {
    waves
  },
  data() {
    // 数字验证
    var validateBuild = (rule, value, callback) => {
      if (value) {
        if (!/^[0-9]*$/.test(value)) {
          callback(new Error("build号只能为数字类型"));
        } else {
          callback();
        }
      } else {
        callback(new Error("build号不能为空"));
      }
    };
    return {
      btnState: false,
      list: [],
      total: null,
      listLoading: true,
      showProgress: true,
      uploadPercent: 0,
      i: 0,
      Form: { fileList: "" },
      fileList: [],
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined
      },
      pageNumber: 1,
      pageSize: 10,
      total: 1,
      // 搜索数据
      search: {
        type: "",
        val: "",
        startTime: "",
        endTime: ""
      },
      seOptions: [
        { label: "版本号", value: "versionNumber" },
        { label: "build号", value: "build" }
      ],
      textMap: {
        update: "编辑",
        create: "新增"
      },
      rowId: "",
      dialogFormVisible: false,
      dialogStatus: "",
      temp: {
        versionNumber: "",
        build: "",
        forcedUpdate: "",
        upgradeContent: "",
        refreshAddress: ""
      },
      rules: {
        versionNumber: [
          { required: true, message: "版本号不能为空", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        build: [
          { required: true, validator: validateBuild, trigger: "blur" },
          { min: 1, max: 15, message: "build号为1 - 15位数字", trigger: "blur" }
        ],
        forcedUpdate: [
          { required: true, message: "强更状态不能为空", trigger: "change" }
        ],
        upgradeContent: [
          { required: true, message: "更新提示语不能为空", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ],
        refreshAddress: [
          { required: true, message: "更新地址不能为空", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ]
      },
      tableKey: 0,
      isIndeterminate: true
    };
  },
  created() {
    this.getList();
    getNewest().then(res=>{
      console.log(res.data)
    }).catch(err=>{

    })
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true;
      var obj = {};
      if (this.search.type == "versionNumber") {
        var versionNumber = {
          versionNumber: this.search.val
        };
        obj = Object.assign(obj, versionNumber);
      } else if (this.search.type == "build") {
        var build = {
          build: this.search.val
        };
        obj = Object.assign(obj, build);
      } else if (this.search.type == "requestUri") {
        var requestUri = {
          requestUri: this.search.val
        };
        obj = Object.assign(obj, requestUri);
      } else if (this.search.type == "params") {
        var params = {
          params: this.search.val
        };
        obj = Object.assign(obj, params);
      }

      getApp(obj, this.pageNumber, this.pageSize)
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.data.count;
            this.list = res.data.data.list;
            this.pageNumber = res.data.data.pageNo;
            this.pageSize = res.data.data.pageSize;
            this.listQuery.page = res.data.data.pageNo;
            if (this.list != undefined) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].index = i + 1;
              }
            }
            this.listLoading = false;
          } else {
            this.listLoading = false;
          }
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    // 搜索
    handleFilter() {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.getList();
    },
    // 条数改变
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.pageNumber = 1;
      this.pageSize = val;
      this.getList();
    },
    // 页数改变
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getList();
    },
    // 点击新增
    handleCreate() {
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    // 点击编辑时
    handleUpdate(row) {
      this.listLoading = true;
      this.dialogStatus = "update";
      var obj = {
        id: row.id
      };
      // 请求回显的数据
      handleUpApp(obj).then(res => {
        this.listLoading = true;
        if (res.data.code == 1) {
          var data = res.data.data;
          // 强制类型转换
          data.build = String(data.build);
          this.listLoading = false;
          this.rowId = row.id;
          this.temp = Object.assign({}, data);
          this.dialogFormVisible = true;
        } else {
          this.listLoading = false;
        }
      });
    },
    // 点击删除时
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false
      })
        .then(() => {
          var obj = {
            id: row.id
          };
          delApp(obj)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList();
              }
            })
            .catch(() => {
              this.listLoading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    uploadSectionFile: function(param) {
      console.log(param);
      //自定义文件上传
      var fileObj = param.file;
      // 接收上传文件的后台地址
      var FileController = "https://imgcdn.guoanshequ.com/";
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("file", fileObj);
      // 其他参数
      form.append(
        "policy",
        "eyJleHBpcmF0aW9uIjoiMjAxOC0wMy0wOVQwOTo1OTozNy4zMzlaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJvcGVuc2VydmljZSJdXX0="
      );
      form.append("OSSAccessKeyId", "LTAIXHANaNGE30fM");
      form.append("success_action_status", 201);
      form.append("signature", "0Ik00jU8MR5qAxZWaQAta5k2rs0=");
      form.append("file", param.file, param.file.name);
      // XMLHttpRequest 对象
      var xhr = new XMLHttpRequest();
      xhr.open("post", FileController, true);
      xhr.upload.addEventListener("progress", this.progressFunction, false); //监听上传进度
      xhr.onload = function() {
        this.Form.fileList = xhr.response; //接收上传到阿里云的文件地址
        this.$message({
          message: "恭喜你，上传成功!",
          type: "success"
        });
      };
      xhr.send(form);
    },
    progressFunction: function() {
      if (this.i == 0) {
        //控制上传中状态只执行一次上传
        this.showStatus();
        this.showProgress = true;
        this.i = 1;
      }
    },
    showStatus: function() {
      var intervalId = setInterval(function() {
        this.$http.get(
          "/file/item/percent",
          {},
          function(data) {
            var percent = data;
            if (percent >= 100) {
              clearInterval(intervalId);
              percent = 100; //不能大于100
              this.uploadPercent = percent;
              this.resetPercent(); //在文章开头的上篇文章中有此函数,用于重置后台的上传进度
            }
            this.uploadPercent = percent;
          },
          "json"
        );
      }, 1000);
    },
    // 新增保存
    create(formName) {
      var obj = {
        versionNumber: this.temp.versionNumber,
        build: this.temp.build,
        forcedUpdate: this.temp.forcedUpdate,
        upgradeContent: this.temp.upgradeContent,
        refreshAddress: this.temp.refreshAddress
      };

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          addApp(obj)
            .then(res => {
              this.btnState = false;

              if (res.data.code === 1) {
                this.dialogFormVisible = false;
                this.resetSearch();
                this.resetTemp();
                this.$refs[formName].resetFields();
                this.handleFilter();
                this.$message({
                  type: "success",
                  message: "新增成功"
                });
              } else {
              }
            })
            .catch(err => {
              this.btnState = false;
            });
        } else {
          var errArr = this.$refs[formName]._data.fields;
          var errMes = [];
          for (var i = 0; i < errArr.length; i++) {
            if (errArr[i].validateMessage != "") {
              errMes.push(errArr[i].validateMessage);
            }
          }
          this.$message({
            type: "error",
            message: errMes[0]
          });
          return false;
        }
      });
    },
    // 编辑保存
    update(formName) {
      var obj = {
        id: this.rowId,
        versionNumber: this.temp.versionNumber,
        build: this.temp.build,
        forcedUpdate: this.temp.forcedUpdate,
        upgradeContent: this.temp.upgradeContent,
        refreshAddress: this.temp.refreshAddress
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          upApp(obj)
            .then(res => {
              this.btnState = false;
              if (res.data.code === 1) {
                this.resetTemp();
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
                this.getList();
                this.$message({
                  type: "success",
                  message: "编辑成功"
                });
              }
            })
            .catch(err => {
              this.btnState = false;
            });
        } else {
          //当表单验证不通过时抛出第一个错误
          var errArr = this.$refs[formName]._data.fields;
          var errMes = [];
          for (var i = 0; i < errArr.length; i++) {
            if (errArr[i].validateMessage != "") {
              errMes.push(errArr[i].validateMessage);
            }
          }
          this.$message({
            type: "error",
            message: errMes[0]
          });
          return false;
        }
      });
    },
    // 清空表单
    resetForm(formName) {
      this.resetTemp();
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    // 清空搜索数据
    resetSearch() {
      this.search = {
        type: "",
        val: "",
        startTime: "",
        endTime: ""
      };
    },
    // 清空v-modal
    resetTemp() {
      this.temp = {
        versionNumber: "",
        build: "",
        forcedUpdate: "",
        upgradeContent: "",
        refreshAddress: ""
      };
    }
  }
};
</script>
<style>
.btn_right {
  float: right;
  width: 100px;
}
.btn_left {
  width: 100px;
}
.ele-date {
  margin: 0 10px;
}
.bottom0 {
  margin-bottom: 0px;
}
.bgWhite {
  background-color: #ffffff;
  padding: 20px 20px 20px 20px;
}
.tool {
  width: 115px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
