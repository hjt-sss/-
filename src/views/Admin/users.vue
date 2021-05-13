<template>
   <div>
     <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="注册日期"></el-table-column>
      <el-table-column prop="username" label="用户姓名"></el-table-column>
      <el-table-column prop="email" label="用户邮箱"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size='small' @click="handleToFreeze(scope.row)">{{scope.row.isFreeze ? '已冻结' : '未冻结'}}</el-button>
          <el-button size='small' type="danger" @click="handleToDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[]
    };
  },
  mounted(){
    this.getUserList()
  },
  methods:{
    getUserList(){
      this.$http.get('/api/userList').then(res => {
        if (res.data.status == 0) {
          this.tableData = res.data.data.userList
        } else {
          this.tableData = []
        }
      })
    },
    handleToFreeze(val){
      let params = {}
      params.email = val.email
      params.isFreeze = !val.isFreeze
      this.$http.post('/api/updateFreeze',params).then(res => {
        if (res.data.status == 0) {
          this.$message.success(res.data.msg)
          this.getUserList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleToDelete(val){
      this.$http.post('/api/deleteUser',{email: val.email}).then(res => {
        if (res.data.status == 0) {
          this.$message.success(res.data.msg)
          this.getUserList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>

</style>