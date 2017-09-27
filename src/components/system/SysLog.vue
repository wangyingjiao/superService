<template>
  <section class="content">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.operate" placeholder="操作板块"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table style="margin:20px 0;"
              ref="multipleTable"
              :data="syslogList"
              border
              v-loading="listLoading"
              @selection-change="selsChange"
              tooltip-effect="dark"

    >
      <el-table-column
              prop="id"
              label="ID"
              width="80"
              align="center">
      </el-table-column>
      <el-table-column
              prop="userName"
              label="用户名"
              width="120"
              align="center">
      </el-table-column>
      <el-table-column
              prop="menuName"
              label="操作板块"
              align="center"
      >
      </el-table-column>
      <el-table-column
              prop="operate"
              label="操作备注"
              align="center"
      >
      </el-table-column>
      <el-table-column
              prop="operateTime"
              label="操作时间"
              width="200"
              align="center"
              :formatter="dateFormat">
      </el-table-column>
      <el-table-column
              prop="userIp"
              label="用户IP"
              align="center"
      >
      </el-table-column>
      <el-table-column
              prop="location"
              label="登陆位置"
              align="center"
      >
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>



  </section>
</template>
<style scoped lang="scss">
  .form-inline .control-label {
    padding-top: 7px;
    margin-bottom: 0;
    text-align: right;
  }
</style>
<script>
    import moment from 'moment';
    import { requestSyslogList} from '../../api/api';
    export default {
        data() {
          return{
             filters: {
					name: '',
					operate:''
				},
			 total: 0,
			 page: 1,
			 listLoading: false,
             syslogList:[]
          }

        },

        components: {

        },
        methods: {
           //格式化日期
          dateFormat: function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                  return "";
                }
                //console.log(date);
                return moment(date).format("YYYY-MM-DD HH:mm:ss");

              },
          //查询方法
          getUsers(){
          let para = {
              page: this.page,
              userName: this.filters.name,
              operate: this.filters.operate
          };
          this.listLoading = true;
           requestSyslogList(para).then(res => {
           this.listLoading = false;
           let { msg, code ,data} = res;
           if(code !==1){
              this.$message({
                message: msg,
                type: 'error'
              });
           }else{
              this.total=data.total;
              this.syslogList=data.list;
           }
             console.log(res)
           });
          },
           selsChange(sels){
            this.sels = sels;
          },
          //分页方法
          handleCurrentChange(val) {
              this.page = val;
              this.getUsers();
          },

        },
        mounted() {
          this.getUsers();
        }

    }
</script>
