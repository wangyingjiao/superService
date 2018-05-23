<template>
<div>
  
    <el-dialog 
      title="审核休假"
      :visible.sync="dialogForm" 
      :show-close= "false"
       :close-on-click-modal="false"
       :close-on-press-escape="false"
       >
          <el-form        
            class="small-space dia_form"
            ref="temp" 
            :rules="rules" 
            :model="temp" 
            label-position="left" 
            label-width="100px"
            >
          <el-form-item v-if="failReasonState" label="未通过原因:">
            <p style="width:100%;word-wrap:break-word;font-size: 12px;color: #8391a5;">{{temp.failReason}}</p>
          </el-form-item>
          <el-form-item label="审核休假:" prop="reviewStatus">
            <el-select class="form_item"  v-model="temp.reviewStatus" >
              <el-option v-for="item in holidayState" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="temp.reviewStatus == 'no'&& !failReasonState" label="未通过原因:" prop="failReason">
            <el-input 
            class="form_item"
              type="textarea" 
              :rows="2" 
              placeholder="请输入1 - 100 位未通过原因"
              v-model="temp.failReason"></el-input>
          </el-form-item>

         
          </el-form>
      
      <div slot="footer" class="dialog-footer" style="text-align: center;">   
        
        <button class="button-large" :disabled="btnState" @click="create('temp')">保 存</button>    
        <button class="button-cancel" @click="resetForm('temp')">取 消</button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import {
  getHolidayById,
  reviewedHoliday
} from "@/api/tech";
import util from "@/utils/date";
import waves from "@/directive/waves/index.js"; // 水波纹指令

export default {
  name: "reviewHoliday",
  directives: {
    waves
  },
  data() {
    return {
      dialogForm: true,
      btnState: false,
      failReasonState: false,
      rules: {
        reviewStatus: [
          { required: true, message: "请选择审核状态", trigger: "change" }
        ],
        failReason: [
          {
            required: true,
            message: "请输入1 - 100位未通过原因",
            trigger: "blur"
          },
          {
            min: 0,
            max: 100,
            message: "未通过原因长度不超过100个字符",
            trigger: "blur"
          }
        ]
      },
      temp: {
        rowId: "",
        reviewStatus: "",
        failReason: ""
      },
      holidayState: [
        { label: "通过", value: "yes" },
        { label: "不通过", value: "no" }
      ]
    };
  },
  created() {},
  methods: {
    handleCheck(row) {
      this.temp.rowId = row.id;
      if (row.reviewStatus == "yes") {
        this.temp.reviewStatus = "yes";
        this.dialogForm = true;
      } else if (row.reviewStatus == "no") {
        this.listLoading = true;
        this.temp.reviewStatus = "";
        getHolidayById({ id: row.id })
          .then(res => {
            this.listLoading = false;
            if (res.data.code == "1") {
              this.holidayState = [{ label: "通过", value: "yes" }];
              this.temp.failReason = res.data.data.failReason;
              this.failReasonState = true;
              this.dialogForm = true;
            }
          })
          .catch(err => {
            this.listLoading = false;
          });
      } else {
        this.dialogForm = true;
      }
    },
    // 删除
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
          delHoliday(obj)
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
              this.$message({
                type: "error",
                message: "删除失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnState = true;
          if (this.temp.reviewStatus == "yes") {
            this.$confirm(
              "审核通过后不可再修改其审核状态，是否继续？",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnClickModal: false
              }
            )
              .then(() => {
                var obj = {
                  id: this.temp.rowId,
                  reviewStatus: this.temp.reviewStatus
                };
                if (obj.reviewStatus == "no") {
                  obj.failReason = this.temp.failReason;
                }
                reviewedHoliday(obj)
                  .then(res => {
                    this.btnState = false;
                    if (res.data.code === 1) {
                      this.resetForm(formName);
                      this.$message({
                        type: "success",
                        message: "审核成功"
                      });
                      this.getList();
                      this.dialogForm = false;
                    } else {
                    }
                  })
                  .catch(err => {
                    this.btnState = false;
                  });
              })
              .catch(() => {
                this.btnState = false;
              });
          } else {
            var obj = {
              id: this.temp.rowId,
              reviewStatus: this.temp.reviewStatus,
              failReason: this.temp.failReason
            };
            reviewedHoliday(obj)
              .then(res => {
                this.btnState = false;
                if (res.data.code === 1) {
                  this.resetTemp();
                  this.$refs[formName].resetFields();
                  this.$message({
                    type: "success",
                    message: "审核成功"
                  });
                  this.getList();
                  this.dialogForm = false;
                } else {
                }
              })
              .catch(err => {
                this.btnState = false;
              });
          }
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
    handleClick() {
      this.getList();
    },
    resetForm(formName) {
      this.holidayState = [
        { label: "通过", value: "yes" },
        { label: "不通过", value: "no" }
      ];
      this.resetTemp();
      this.$refs[formName].resetFields();
      this.failReasonState = false;
      this.dialogForm = false;
    },
    resetTemp() {
      this.temp = {
        rowId: "",
        reviewStatus: "",
        failReason: ""
      };
    },
    resetSearch() {
      this.search = {
        type: "techName",
        val: "",
        time: ""
      };
    }
  }
};
</script>
<style>
</style>
